from flask import Blueprint, jsonify, abort
from app.models.lists import db, List
from ..forms.list_form import ListForm
from .auth_routes import validation_errors_to_error_messages

list_routes = Blueprint("lists", __name__)


# Create Route
# Logged in User can create a List on their Board
@list_routes.route("/boards/<int:board_id>/lists", methods=["POST"])
def create_lists(board_id):
    form = ListForm()
    if form.validate_on_submit():
        board_id = board_id
        name = form.name.data
        new_list = List(board_id=board_id, name=name)
        db.session.add(new_list)
        db.commit()
        return jsonify(new_list.to_dict()), 201
    abort(400, {"message": "Body validation error"})
  



# Read Route
# Logged in User can view a List on their Board
@list_routes.route("/boards/<int:board_id>/lists")
def read_lists(board_id):
    lists = List.query.filter(List.board_id == board_id)
    new_dict = {}
    if lists:
        current_lists = [list for list in lists if list.board_id == board_id]

        for i in range(len(current_lists)):
            new_dict[i] = {"id":current_lists[i].id, "name":current_lists[i].name, "created_at" : current_lists[i].created_at, "updated_at": current_lists[i].updated_at }

        print("_____________new dict", new_dict)
        return jsonify(new_dict)
    return 'Board list not found'



# Update Route
# Logged in User can update a List on their Board
@list_routes.route("/lists/<int:list_id>", methods=["PUT"])
def update_lists(list_id):
    form = ListForm()
    list = List.query.get(List.id == list_id)
    if list:
        if form.validate_on_submit():
            name = form.name.data
            form.name = name
            db.commit()
            return jsonify(list.to_dict())
    abort(400, {"message": "Body validation error"})



# Delete Route
# Logged in User can delete a List on their Board
@list_routes.route("/lists/<int:list_id>", methods=["DELETE"])
def delete_lists(list_id):
    list = List.filter(List.id == list_id).delete()
    db.session.commit()
    return jsonify({"message": "Successfully Deleted"})

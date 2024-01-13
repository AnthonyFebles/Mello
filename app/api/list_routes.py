from flask import Blueprint, jsonify, abort, request
from flask_login import current_user, login_required
from app.models.lists import db, List
from ..forms.list_form import ListForm
from .auth_routes import validation_errors_to_error_messages

list_routes = Blueprint("lists", __name__)


# @app.route("/students")
# def get_students():
#     students = Student.query.all()
#     return {"students": [student.to_dict() for user in users]}


# @app.route("/students/<int:id>")
# def get_user_by_id(id):
#     student = Student.query.get(1)
#     return student.to_dict()

# @app.route("/cohorts/<int:id>")
# def get_cohort(id):
#     cohort = Cohort.query.get(id)
#     return cohort.to_dict()



# Create Route
# Logged in User can create a List on their Board
@list_routes.route("/boards/<int:board_id>/lists", methods=["POST"])
@login_required
def create_lists(board_id):
    form = ListForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        board_id = board_id
        name = form.name.data
        new_list = List(board_id=board_id, name=name)
        db.session.add(new_list)
        db.session.commit()
        return jsonify(new_list.to_dict()), 201
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
  



# Read Route
# Logged in User can view a List on their Board
@list_routes.route("/boards/<int:board_id>/lists")
@login_required
def read_lists(board_id):
    lists = List.query.filter(List.board_id == board_id)
    
    # new_dict = {}
    if len([list for list in lists]) > 0:
        if lists[0].boards.user_id is not current_user.id:
            abort(400, {"message": "Unauthorized"})
        return {"lists": [list.to_dict() for list in lists if list.board_id == board_id]}
    

#  if needed cards and board in to_dict()
        # current_lists = [list.to_dict() for list in lists if list.board_id == board_id]
        # for i in range(len(current_lists)):
        #     new_dict[i] = {"id":current_lists[i].id, "name":current_lists[i].name, "created_at" : current_lists[i].created_at, "updated_at": current_lists[i].updated_at }

        # print("_____________new dict", new_dict)
        # return jsonify(new_dict)
    

    return {'errors': "list not found"}



# Update Route
# Logged in User can update a List on their Board
@list_routes.route("/lists/<int:list_id>", methods=["PUT"])
@login_required
def update_lists(list_id):
    
    form = ListForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    current_list = List.query.get(list_id)
    
    if current_list.boards.user_id is not current_user.id :
        abort(400, {"message": "Unauthorized"})
        
    if current_list:
        if form.validate_on_submit():
            name = form.name.data
            list.name = name
            db.session.commit()
            return jsonify(current_list.to_dict())
        
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



# Delete Route
# Logged in User can delete a List on their Board
@list_routes.route("/lists/<int:list_id>", methods=["DELETE"])
@login_required
def delete_lists(list_id):
    
    current_list = List.query.get(list_id)
    
    if not current_list :
        abort(400, {"message": "List not found"})
    
    if current_list.boards.user_id is not current_user.id :
        abort(400, {"message": "Unauthorized"})
    
    db.session.delete(current_list)
    db.session.commit()
    return jsonify({"message": "Successfully Deleted"})

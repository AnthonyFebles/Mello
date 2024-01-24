from flask import Blueprint, jsonify, abort, request
from flask_login import current_user, login_required

from app.models.boards import Board, db
from ..forms.board_form import BoardForm
from app.api.auth_routes import validation_errors_to_error_messages


board_routes = Blueprint("boards", __name__)


# Create Route
# Logged in User should be able to create a Board
@board_routes.route("/boards", methods = ["POST"])
@login_required
def create_boards():

    # Create a new instance of our BoardForm from our Forms
    form = BoardForm()

    # CSRF Token authentication
    form['csrf_token'].data = request.cookies['csrf_token']

    # If the form is validated on submit
    if form.validate_on_submit():
        new_user_board = Board(
            user_id=current_user.id,
            name=form.name.data,
            # visibility=form.visibility.data,
            color=form.color.data,
            # users=[current_user],
            owner=current_user
        )

        # Then once we create a new instance of our board we can
        # add to the db via commit
        db.session.add(new_user_board)
        db.session.commit()

        # If all validations are good, return a created status code
        # along with a jsonified new user board.
        return jsonify(new_user_board.to_dict()), 201

    # if the validation fails, return an error response
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    # abort(400, {"message": "Body validation Error"})

# ! Read Routes

# Logged in User can see the details of each Board in its own page
@board_routes.route("/boards/<int:boardId>")
@login_required
def each_board_details(boardId):
    # Query to get the specific Board based on the ID
    board = Board.query.get(boardId)

    # Edge Cases for Errors
    if not board:
        abort(404, {"message": "Board not found"})

    if board.user_id != current_user.id:
        abort(403, {"message": "Unauthorized"})

    return jsonify(board.to_dict()), 200


# Logged in User should be able to see their Boards in one place
@board_routes.route("/boards")
@login_required
def read_boards():

    # Get every board that exists in our db where the user_id is equal to our
    # current user's id
    user_boards = Board.query.filter(Board.user_id == current_user.id).all()

    # Then we get each Board's detail with the information from the to_dict function
    # for each board in the user's list of boards.
    board_details = [board.to_dict() for board in user_boards]

    # Then we return the board_details jsonified with a status code of 200.
    return jsonify(board_details), 200




# Update Route
# Logged in User should be able to update their Boards
@board_routes.route("/boards/<int:boardId>", methods=["PUT"])
@login_required
def update_boards(boardId):

    # Query to get our Board first
    user_board = Board.query.get(boardId)

    # Check if the board belong to the current user
    if not user_board:
        # If the board doesn't belong to the current user, throw a 404 error
        abort(404, {"message" : "Board could not be found"})

    # Create a new instance of our BoardForm
    form = BoardForm()

    # CSRF Token authentication
    form['csrf_token'].data = request.cookies['csrf_token']

    # Check if the form validates on submit
    if form.validate_on_submit():
        # If it does validate, then update the board form info
        name = form.name.data
        user_board.name=name

        description = form.description.data
        user_board.description=description

        # visibility=form.visibility.data,
        color = form.color.data
        user_board.color=color

        # Commit the updates to the database
        db.session.commit()

        # Return a jsonified updated user_board in dictionary format with
        # 200 status code
        return jsonify(user_board.to_dict()), 200

    # Return any validation errors that may have occurred
    return jsonify(form.errors), 400



# Delete Route
# Logged in User should be able to delete their Boards
@board_routes.route("/boards/<int:boardId>", methods=["DELETE"])
@login_required
def delete_boards(boardId):
    # Allows us to grab the user's board based on the BoardId provided
    user_board = Board.query.get(boardId)

    # print(user_board.to_dict())

    # Conditional that checks if the board that exists belongs to the current user
    if not user_board:
        # Something with an error message
        # abort(404, {"message": "Board not Found"})
        return jsonify({"message": "Board does not exist"}), 400

    if user_board.user_id == current_user.id:
        # Commit the deletion to the db
        db.session.delete(user_board)
        db.session.commit()

    # Return a successful deletion response
    return jsonify({"message": "Board has been Deleted successfully" }), 200

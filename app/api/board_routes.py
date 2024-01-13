from flask import Blueprint, jsonify, abort
from flask_login import current_user, login_required

from app.models.boards import Board, db
from ..forms.board_form import BoardForm


board_routes = Blueprint("boards", __name__)


# Create Route
# Logged in User should be able to create a Board
@board_routes.route("/boards", methods = ["POST"])
@login_required
def create_boards():
    # Create a new instance of our BoardForm from our Forms
    form = BoardForm()

    # If the form is validated on submit
    if form.validate_on_submit():
        new_user_board = Board(
            user_id=current_user.id,
            name=form.board_title.data,
            visibility=form.visibility.data,
            background=form.background_img.data,
        )

        # Then once we create a new instance of our board we can 
        # add to the db via commit
        db.session.add(new_user_board)
        db.session.commit()

        # If all validations are good, return a created status code
        # along with a jsonified new user board.
        return jsonify(new_user_board.to_dict()), 201
    
    # if the validation fails, return an error response
    abort(400, {"message": "Body validation Error"})


# Read Routes

# # Create another route for /boards
# # Logged in User should see
# @bp.route("/boards")


# Create another route for /boards/:boardId for GET
# Logged in User can see the details of each Board
@board_routes.route("/boards/<int:boardId>")
@login_required
def each_board_details():
    pass


# Logged in User should be able to see their Boards in one place
@board_routes.route("/boards")
@login_required
def read_boards():
    # user_boards = []
    # if current_user.is_authenticated():
    #     query = boards.query.filter(boards.user_id == current_user.id)
    return jsonify({"message": "Hello from /boards"})



# Update Route
# Logged in User should be able to update their Boards
@board_routes.route("/boards/<int:boardId>", methods= ["PUT"])
@login_required
def update_boards():
    pass


# Delete Route
# Logged in User should be able to delete their Boards
@board_routes.route("/boards/<int:boardId>", methods= ["DELETE"])
# @login_required
def delete_boards(boardId):
    # Allows us to grab the user's board based on the BoardId provided
    user_board = Board.query.get(boardId)
    
    # Conditional that checks if the board that exists belongs to the current user
    if not user_board:
        # Something with an error message
        abort(404, {"message": "Board not Found"})
    
    # Commit the deletion to the db
    db.session.delete(boardId)
    db.session.commit()

    # Return a successful deletion response
    return jsonify({"message": "Board has been Deleted successfully" }), 200

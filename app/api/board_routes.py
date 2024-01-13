from flask import Blueprint, jsonify, abort
from flask_login import current_user, login_required

from app.models import boards, db
from ..forms.board_form import BoardForm



bp = Blueprint("boards", __name__)


# Create Route
# Logged in User should be able to create a Board
@bp.route("/boards", methods = ["POST"])
@login_required
def create_boards():
    pass



# Read Routes

# Create another route for /boards
# Logged in User should see
@bp.route("/boards")


# Create another route for /boards/:boardId for GET
# Logged in User can see each board that they have
@bp.route("/boards/<int:boardId>")
@login_required
def each_board_details():
    pass


# Logged in User should be able to see their Boards in one place
@bp.route("/boards/session")
@login_required
def read_boards():
    user_boards = []
    if current_user.is_authenticated():
        query = boards.query.filter(boards.user_id == current_user.id)


# Update Route
# Logged in User should be able to update their Boards
@bp.route("/boards/<int:boardId>", methods= ["PUT"])
@login_required
def update_boards():
    pass


# Delete Route
# Logged in User should be able to delete their Boards
@bp.route("/boards/<int:boardId>", methods= ["DELETE"])
@login_required
def delete_boards(boardId):
    # Allows us to grab the user's board based on the BoardId provided
    user_board = boards.query.get(boardId)
    
    # Conditional that checks if the board that exists belongs to the current user
    if not user_board:
        # Something with an error message
        abort(404, {"message": "Board not Found"})
    
    # Commit the deletion to the db
    db.session.delete(boardId)
    db.session.commit()

    # Return a successful deletion response
    return jsonify({"message": "Board has been Deleted successfully" })

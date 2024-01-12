from flask import Blueprint
from flask_login import current_user, login_required

from app.models import boards, lists, cards, comments

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


# Logged in User should be able to see their Boards in one place
@bp.route("/boards/session")
@login_required
def read_boards():
    user_boards = []
    if current_user.is_authenticated():
        query = boards.query.filter(boards.user_id == current_user.id)



# Update Route
# Logged in User should be able to update their Boards
@bp.route("/boards/:boardId", methods= ["PUT"])
@login_required
def update_boards():
    pass


# Delete Route
# Logged in User should be able to delete their Boards
@bp.route("/boards/:boardId", methods= ["DELETE"])
@login_required
def delete_boards():
    pass


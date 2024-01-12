from flask import Blueprint

bp = Blueprint("boards", __name__)


# Create Route
# Logged in User should be able to create a Board
@bp.route("/boards", methods = ["POST"])
def create_boards():
    pass


# Read Route
# Logged in User should be able to see their Boards
@bp.route("/boards/session")
def read_boards():
    pass


# Update Route
# Logged in User should be able to update their Boards
@bp.route("/boards/:boardId", methods= ["PUT"])
def update_boards():
    pass


# Delete Route
# Logged in User should be able to delete their Boards
@bp.route("/boards/:boardId", methods= ["DELETE"])
def delete_boards():
    pass


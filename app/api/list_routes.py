from flask import Blueprint

bp = Blueprint("lists", __name__)


# Create Route
# Logged in User can create a List on their Board
@bp.route("/boards/:boardId/lists", methods=["POST"])
def create_lists():
    pass


# Read Route
# Logged in User can view a List on their Board
@bp.route("/boards/:boardId/lists")
def read_lists():
    pass


# Update Route
# Logged in User can update a List on their Board
@bp.route("/lists/:listId", methods=["PUT"])
def update_lists():
    pass


# Delete Route
# Logged in User can delete a List on their Board
@bp.route("/lists/:listId", methods=["DELETE"])
def delete_lists():
    pass

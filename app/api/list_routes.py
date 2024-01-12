from flask import Blueprint

bp = Blueprint("lists", __name__)


# Create Route
# Logged in User can create a List on their Board
@bp.route("/boards/<int:board_id>/lists", methods=["POST"])
def create_lists(board_id):
    pass


# Read Route
# Logged in User can view a List on their Board
@bp.route("/boards/<int:board_id>/lists")
def read_lists(board_id):
    pass


# Update Route
# Logged in User can update a List on their Board
@bp.route("/lists/<int:list_id>", methods=["PUT"])
def update_lists(list_id):
    pass


# Delete Route
# Logged in User can delete a List on their Board
@bp.route("/lists/<int:list_id>", methods=["DELETE"])
def delete_lists(list_id):
    pass

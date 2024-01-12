from flask import Blueprint

bp = Blueprint("comments", __name__)


# Create Route
# Logged in User should be able to create a comment on a Card
@bp.route("/cards/:cardId/comments", methods=["POST"])
def create_comments():
    pass


# Read Route
# Logged in User should be able to view their comments in a Card
@bp.route("/cards/:cardId/comments")
def read_comments():
    pass


# Update Route
# Logged in User should be able to update their comments in a Card
@bp.route("/comments/:commentId", methods=["PUT"])
def update_comments():
    pass


# Delete Route
# Logged in User should be able to delete their comments
@bp.route("/comments/:commentId", methods=["DELETE"])
def delete_boards():
    pass


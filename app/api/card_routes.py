from flask import Blueprint

bp = Blueprint("cards", __name__)


# Create Route
# Logged in Users can add a new card to a List
@bp.route("/lists/:listId/cards", methods=["POST"])
def create_cards():
    pass


# Read Route
# Logged in Users can view all of their cards in a List
@bp.route("/lists/:listId/cards")
def read_cards():
    pass


# Update Route
# Logged in Users can update their cards in a List
@bp.route("/cards/:cardId", methods=["PUT"])
def update_cards():
    pass


# Delete Route
# Logged in Users can delete their cards in a List
@bp.route("/cards/:cardId", methods=["DELETE"])
def delete_cards():
    pass

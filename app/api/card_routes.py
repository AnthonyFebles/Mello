from flask import Blueprint
from app.models.cards import Card

# bp = Blueprint("cards", __name__)
card_routes = Blueprint("cards", __name__, url_prefix="/api/users/<userId>/boards/<boardId>/lists/<listId>/cards")


@card_routes.route("/")
def get_cards(userId, boardId, listId):
    card_query = Card.query.filter(Card.listId == listId).all()
    cards = [card.to_dict() for card in card_query]
    return {"cards": cards}


# # Create Route
# # Logged in Users can add a new card to a List
# @card_routes.route("/", methods=["POST"])
# def create_cards():
#     pass


# # Read Route
# # Logged in Users can view all of their cards in a List
# @card_routes.route("/lists/:listId/cards")
# def read_cards():
#     pass


# # Update Route
# # Logged in Users can update their cards in a List
# @card_routes.route("/cards/:cardId", methods=["PUT"])
# def update_cards():
#     pass


# # Delete Route
# # Logged in Users can delete their cards in a List
# @card_routes.route("/cards/:cardId", methods=["DELETE"])
# def delete_cards():
#     pass

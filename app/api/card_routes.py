from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models.cards import Card
from app.forms.card_form import CardForm
from app.models import db
from app.api.auth_routes import validation_errors_to_error_messages


card_routes = Blueprint(
    "cards", __name__, url_prefix="/api/boards/<boardId>/lists/<listId>/cards"
)


@card_routes.route("/")
def get_cards(boardId, listId):
    card_query = Card.query.filter(Card.listId == listId).all()
    cards = [card.to_dict_no_list() for card in card_query]
    return {"cards": cards}


@card_routes.route("/", methods=["POST"])
@login_required
def create_card(boardId, listId):
    cardForm = CardForm()
    cardForm["csrf_token"].data = request.cookies["csrf_token"]

    if cardForm.validate_on_submit():
        new_card = Card(
            listId=listId,
            name=cardForm.name.data,
            description=cardForm.description.data,
            # users=[current_user],
        )

        db.session.add(new_card)
        db.session.commit()

        return new_card.to_dict()

    return {"errors": validation_errors_to_error_messages(cardForm.errors)}, 401


@card_routes.route("/<cardId>", methods=["PUT"])
@login_required
def update_card(boardId, listId, cardId):
    card = Card.query.get(cardId)

    if card:
        card.name = request.json.get("name", card.name)
        card.description = request.json.get("description", card.description)

        db.session.commit()

        return card.to_dict_no_list()

    return {"errors": "Card not found"}, 404


@card_routes.route("/<cardId>", methods=["DELETE"])
@login_required
def delete_card(boardId, listId, cardId):
    card = Card.query.get(cardId)

    if card:
        db.session.delete(card)
        db.session.commit()

        return {"message": "Card deleted"}

    return {"errors": "Card not found"}, 404

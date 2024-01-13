from flask import Blueprint, jsonify, abort, request, session
from flask_login import current_user, login_required

from app.models.comments import Comment, db
from app.forms.comment_form import CommentForm

comments_routes = Blueprint("comments", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# Create Route
# Logged in User should be able to create a comment on a Card
@comments_routes.route("/cards/<int:cardId>/comments", methods=["POST"])
@login_required
def create_comments(cardId):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_comment = Comment(
        user_id=current_user.id,
        card_id= cardId,
        comment= form.comment.data
        )
        db.session.add(new_comment)
        db.session.commit()
    
        return new_comment.to_dict()
    
    new_comment = Comment(
        user_id=current_user.id,
        card_id=cardId,
        comment=form.comment.data
    )

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



# Read Route
# Logged in User should be able to view their comments in a Card
@comments_routes.route("/cards/:cardId/comments")
def read_comments():
    pass


# Update Route
# Logged in User should be able to update their comments in a Card
@comments_routes.route("/comments/:commentId", methods=["PUT"])
def update_comments():
    pass


# Delete Route
# Logged in User should be able to delete their comments
@comments_routes.route("/comments/:commentId", methods=["DELETE"])
def delete_boards():
    pass


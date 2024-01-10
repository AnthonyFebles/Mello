from flask import Blueprint

bp = Blueprint('boards', __name__)


# GET ROUTE (Read)
# Logged in User can view all of their boards
@bp.route("/session")
def get_boards():
    pass


# POST ROUTE (Create)
# Logged in User can create a board
@bp.route("/boards")
def post_boards():
    pass


# UPDATE ROUTE (Update)
# Logged in User can update any of their boards
@bp.route("/boards/:boardId")
def update_boards():
    pass


# DELETE ROUTE (Delete)
# Logged in User can delete any of their boards
@bp.routes("/boards/:boardId")
def delete_boards():
    pass


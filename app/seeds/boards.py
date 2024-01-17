from sqlalchemy.sql import text
from app.models import db, Board, environment, SCHEMA

def seed_boards():
    board1 = Board(
        user_id="1", color="blue", name="board_1", description="board_1 description"
    )
    board2 = Board(
        user_id="2", color="red", name="board_2", description="board_2 description"
    )
    board3 = Board(
        user_id="3", color="green", name="board_3", description="board_3 description"
    )

    db.session.add(board1)
    db.session.add(board2)
    db.session.add(board3)
    db.session.commit()

def undo_boards():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM boards"))

    db.session.commit()

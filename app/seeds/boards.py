from sqlalchemy.sql import text
from app.models import db, Board, environment, SCHEMA

def seed_boards():
    board1 = Board(
        userId="1", color="blue", name="board_1", description="board_1 description"
    )
    board2 = Board(
        userId="2", color="red", name="board_2", description="board_2 description"
    )
    board3 = Board(
        userId="3", color="green", name="board_3", description="board_3 description"
    )

    db.session.addAll([board1, board2, board3])
    db.session.commit()

def undo_boards():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM boards"))

    db.session.commit()

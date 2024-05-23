from sqlalchemy.sql import text
from app.models import db, Board, environment, SCHEMA


def seed_boards():
    board1 = Board(
        user_id="1", color="https://imgur.com/BdTGQmT.jpeg", name="App Academy"
    )
    board2 = Board(
        user_id="2", color="https://imgur.com/LCD7Cke.jpeg", name="board_2"
    )
    board3 = Board(
        user_id="3", color="https://imgur.com/A4Y76t2.jpeg", name="board_3"
    )
    board4 = Board(
        user_id="1", color="https://imgur.com/Gaf7yTG.jpeg", name="Home"
    )

    db.session.add(board1)
    db.session.add(board2)
    db.session.add(board3)
    db.session.add(board4)
    db.session.commit()


def undo_boards():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM boards"))

    db.session.commit()

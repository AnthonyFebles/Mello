from sqlalchemy.sql import text
from app.models import db, Board, environment, SCHEMA

def seed_boards():
    board1 = Board(
        user_id="1", color="https://th.bing.com/th/id/OIG.rt3EmryUoYQKIjK86m_p?pid=ImgGn", name="App Academy"
    )
    board2 = Board(
        user_id="2", color="https://th.bing.com/th/id/OIG.fEHxWkIYkumMxQZLmYc5?w=1024&h=1024&rs=1&pid=ImgDetMain", name="board_2"
    )
    board3 = Board(
        user_id="3", color="https://th.bing.com/th/id/OIG.Tm4j5l5hso8iB85_iqNf?w=1024&h=1024&rs=1&pid=ImgDetMain", name="board_3"
    )
    board4 = Board(
        user_id="1", color="https://th.bing.com/th/id/OIG.idCzopGsrbq9HoGGWuLq?w=1024&h=1024&rs=1&pid=ImgDetMain", name="Home"
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

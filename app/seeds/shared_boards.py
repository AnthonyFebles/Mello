from app.models.users import db, environment, SCHEMA, shared_boards
from sqlalchemy.sql import text

#  Adds shared_boards to the database


def seed_shared_boards():

    sBoard1 = shared_boards.insert().values(user_id="1", board_id="1")
    sBoard2 = shared_boards.insert().values(user_id="1", board_id="2")
    sBoard3 = shared_boards.insert().values(user_id="2", board_id="1")
    sBoard4 = shared_boards.insert().values(user_id="2", board_id="2")
    sBoard5 = shared_boards.insert().values(user_id="3", board_id="1")
    sBoard6 = shared_boards.insert().values(user_id="3", board_id="2")
    sBoard7 = shared_boards.insert().values(user_id="3", board_id="3")


    db.session.execute(sBoard1)
    db.session.execute(sBoard2)
    db.session.execute(sBoard3)
    db.session.execute(sBoard4)
    db.session.execute(sBoard5)
    db.session.execute(sBoard7)
    db.session.execute(sBoard6)


    db.session.commit()


def undo_shared_boards():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.shared_boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shared_boards"))

    db.session.commit()

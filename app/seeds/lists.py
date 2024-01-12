from app.models import db, List, environment, SCHEMA
from sqlalchemy.sql import text

#  Adds Lists to the database 

def seed_lists():

    groceries = List(board_id=1, name="Groceries")

    toDo = List(board_id=1, name="To-Do")

    work = List(board_id=1, name="Work")


    db.session.add(groceries)
    db.session.add(toDo)
    db.session.add(work)

    db.commit()
    

def undo_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM lists"))

    db.session.commit()
from app.models import db, List, environment, SCHEMA
from sqlalchemy.sql import text

#  Adds Lists to the database 

def seed_lists():

    groceries = List(board_id=1, name="Groceries")

    toDo = List(board_id=1, name="To-Do")

    work = List(board_id=1, name="Work")
    
    groceries2 = List(board_id=2, name="Groceries")

    toDo2 = List(board_id=2, name="To-Do")

    work2 = List(board_id=2, name="Work")
    
    groceries3 = List(board_id=3, name="Groceries")

    toDo3 = List(board_id=3, name="To-Do")

    work3 = List(board_id=3, name="Work")


    db.session.add(groceries)
    db.session.add(toDo)
    db.session.add(work)
    db.session.add(groceries3)
    db.session.add(toDo3)
    db.session.add(work3)
    db.session.add(groceries2)
    db.session.add(toDo2)
    db.session.add(work2)

    db.session.commit()
    

def undo_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM lists"))

    db.session.commit()
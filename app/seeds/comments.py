from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    first = Comment(
        user_id = "1", card_id = "1" , comment = "this is a comment"
    )
    second = Comment(
        user_id = "1", card_id = "2" , comment = "this is a comment too"
    )
    third = Comment(
        user_id = "2", card_id = "3" , comment = "this is a comment three"
    )
    fourth = Comment(
        user_id = "2", card_id = "4" , comment = "this is a comment as well "
    )
    fifth = Comment(
        user_id = "3", card_id = "5" , comment = "this is a comment yup"
    )
    six = Comment(
        user_id = "3", card_id = "6" , comment = "this is a comment I think?"
    )
    
    db.session.add(first)
    db.session.add(second)
    db.session.add(third)
    db.session.add(fourth)
    db.session.add(fifth)
    db.session.add(six)
    db.session.commit()
    

def undo_comments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()

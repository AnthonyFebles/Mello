from app.models import db, Label, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    label_1 = Label(
        cardId="1", color="blue", name="Urgent"
    )
    label_2 = Label(
        cardId="2", color="red", name="Important"
    )
    label_3 = Label(
        cardId="3", color="green", name="Not Important"
    )

    db.session.add(label_1)
    db.session.add(label_2)
    db.session.add(label_3)
    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()

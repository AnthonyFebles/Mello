from app.models import db, Card, environment, SCHEMA
from sqlalchemy.sql import text


def seed_cards():
    first = Card(
        listId="1", name="first", description="1 card"
    )
    second = Card(
        listId="1", name="second", description="1 card part 2"
    )
    third = Card(
        listId="1", name="third", description="2 card"
    )
    fourth = Card(
        listId="1", name="fourth", description="2 card the second coming"
    )
    fifth = Card(
        listId="1", name="fifth", description="3 card"
    )
    six = Card(
        listId="1", name="sixth", description="3 card electric kazoo"
    )

    db.session.add(first)
    db.session.add(second)
    db.session.add(third)
    db.session.add(fourth)
    db.session.add(fifth)
    db.session.add(six)
    db.session.commit()


def undo_cards():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.cards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cards"))

    db.session.commit()

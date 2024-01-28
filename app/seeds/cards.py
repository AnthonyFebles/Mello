from app.models import db, Card, environment, SCHEMA
from sqlalchemy.sql import text


def seed_cards():
    first = Card(
        listId="1", name="Pass group project", description="1 card"
    )
    second = Card(
        listId="1", name="Graduate", description="1 card part 2"
    )
    third = Card(
        listId="1", name="Get a job", description="This is a card description"
    )
    fourth = Card(
        listId="1", name="Become rich!", description="$$$$$$$$$"
    )
    fifth = Card(
        listId="2", name="Why is Render being dumb?", description="2 card"
    )
    sixth = Card(
        listId="2", name="What about second breakfast?", description="2 card the second coming"
    )
    seventh = Card(
        listId="3", name="People", description="3 card"
    )
    eighth = Card(
        listId="3", name="Information", description="3 card electric kazoo"
    )
    ninth = Card(
        listId="3", name="Tools", description="3 card"
    )
    tenth = Card(
        listId="4", name="Airbnb", description="4 card"
    )

    db.session.add(first)
    db.session.add(second)
    db.session.add(third)
    db.session.add(fourth)
    db.session.add(fifth)
    db.session.add(sixth)
    db.session.add(seventh)
    db.session.add(eighth)
    db.session.add(ninth)
    db.session.add(tenth)
    db.session.commit()


def undo_cards():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.cards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cards"))

    db.session.commit()

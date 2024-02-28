from app.models import db, Card, environment, SCHEMA
from sqlalchemy.sql import text


def seed_cards():
    first = Card(
        listId="1", name="Pass group project", description="1 card", cover='#226e4f'
    )
    second = Card(
        listId="1", name="Graduate", description="1 card part 2", cover='#7f5f01'
    )
    third = Card(
        listId="1", name="Get a job", description="This is a card description", cover='#a64800'
    )
    fourth = Card(
        listId="1", name="Become rich!", description="$$$$$$$$$", cover='#ae2f24'
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
    eleventh = Card(
        listId="11", name="Clean Litter Box", description="Somebody's gotta do it"
    )
    card12 = Card(
        listId="11", name="Take Out The Trash", description="Somebody's gotta do it"
    )
    card13 = Card(
        listId="11", name="Fold Laundry", description="Somebody's gotta do it"
    )
    card14 = Card(
        listId="12", name="Put the Trash Out", description="Somebody's gotta do it"
    )
    card15 = Card(
        listId="12", name="Mow The Lawn", description="Somebody's gotta do it"
    )
    card16 = Card(
        listId="12", name="Touch Grass", description="Good for you"
    )
    card17 = Card(
        listId="11", name="Mop The Floor", description="Somebody's gotta do it"
    )
    card18 = Card(
        listId="13", name="Watch Lord of The Rings Trilogy", description="Director's Cut"
    )
    card19 = Card(
        listId="13", name="Wash Clothes", description="Somebody's gotta do it"
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
    db.session.add(eleventh)
    db.session.add(card12)
    db.session.add(card13)
    db.session.add(card14)
    db.session.add(card15)
    db.session.add(card16)
    db.session.add(card17)
    db.session.add(card18)
    db.session.add(card19)
    db.session.commit()


def undo_cards():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.cards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cards"))

    db.session.commit()

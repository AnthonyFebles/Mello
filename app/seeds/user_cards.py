# from app.models.users import db, environment, SCHEMA, user_cards
# from sqlalchemy.sql import text

# #  Adds user_cards to the database

# def seed_user_cards():
    
#     if environment == "production":
#         db.session.execute(
#         f"INSERT INTO {SCHEMA}.user_cards(user_id, card_id) VALUES (1,1)")
#         db.session.execute(
#         f"INSERT INTO {SCHEMA}.user_cards(user_id, card_id) VALUES (1,2)")
#         db.session.execute(
#         f"INSERT INTO {SCHEMA}.user_cards(user_id, card_id) VALUES (2,1)")
#         db.session.execute(
#         f"INSERT INTO {SCHEMA}.user_cards(user_id, card_id) VALUES (2,2)")
#         db.session.execute(
#         f"INSERT INTO {SCHEMA}.user_cards(user_id, card_id) VALUES (3,1)")
#         db.session.execute(
#         f"INSERT INTO {SCHEMA}.user_cards(user_id, card_id) VALUES (3,2)")
#         db.session.execute(
#         f"INSERT INTO {SCHEMA}.user_cards(user_id, card_id) VALUES (3,3)")
#         db.session.execute(
#         f"INSERT INTO {SCHEMA}.user_cards(user_id, card_id) VALUES (1,5)")
#         db.session.execute(
#         f"INSERT INTO {SCHEMA}.user_cards(user_id, card_id) VALUES (1,6)")

#         db.session.commit()
#     else:
#         uCard1 = user_cards.insert().values(user_id="1", card_id="1")
#         uCard2 = user_cards.insert().values(user_id="1", card_id="2")
#         uCard3 = user_cards.insert().values(user_id="2", card_id="1")
#         uCard4 = user_cards.insert().values(user_id="2", card_id="2")
#         uCard5 = user_cards.insert().values(user_id="3", card_id="1")
#         uCard6 = user_cards.insert().values(user_id="3", card_id="2")
#         uCard7 = user_cards.insert().values(user_id="3", card_id="3")
#         uCard8 = user_cards.insert().values(user_id="1", card_id="6")
#         uCard9 = user_cards.insert().values(user_id="1", card_id="5")

#         db.session.execute(uCard1)
#         db.session.execute(uCard2)
#         db.session.execute(uCard3)
#         db.session.execute(uCard4)
#         db.session.execute(uCard5)
#         db.session.execute(uCard7)
#         db.session.execute(uCard6)
#         db.session.execute(uCard8)
#         db.session.execute(uCard9)

#         db.session.commit()


# def undo_user_cards():
#     if environment == "production":
#         db.session.execute(
#             f"TRUNCATE table {SCHEMA}.user_cards RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM user_cards"))

#     db.session.commit()

from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class List(db.Model):
    __tablename__ = 'lists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    board_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("boards.id")))
    name = db.Column(db.String(80), nullable = False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    board = db.relationship("Board", back_populates="lists")
    cards = db.relationship("Card", back_populates="list")

    def to_dict(self):
        return {
            'id': self.id,
            'board_id': self.board_id,
            'name': self.name,
            'board': self.board,
            'cards': self.cards
        }

from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Card(db.Model):
    __tablename__ = 'cards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    listId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('lists.id')), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    comments = db.relationship("Comment", back_populates="card")
    list = db.relationship("List", back_populates="cards")

    def to_dict(self):
        return {
            'id': self.id,
            'listId': self.listId,
            'description': self.description,
            'comments': self.comments,
            'list': self.list
        }

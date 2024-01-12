from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Board(db.Model):
    __tablename__ = 'boards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    color = db.Column(db.String(30), nullable=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    users = db.relationship('User', backref='boards')
    lists = db.relationship('List', backref='board')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'color': self.color,
            'name': self.name,
            'description': self.description,
            'users': self.users,
            'lists': self.lists
        }

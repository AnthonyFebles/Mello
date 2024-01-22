from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .users import shared_boards

class Board(db.Model):
    __tablename__ = 'boards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False, name='boards_user_id_constraint')
    color = db.Column(db.String(255), nullable=True)
    name = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    users = db.relationship('User', secondary=shared_boards ,back_populates='used_boards')
    owner = db.relationship('User', back_populates='owned_boards')
    lists = db.relationship('List', back_populates='boards', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'color': self.color,
            'name': self.name,
            'users': [user.to_dict() for user in self.users],
            'owner': self.owner.to_dict(),
            'lists': [list.to_dict() for list in self.lists]
        }

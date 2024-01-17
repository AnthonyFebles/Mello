from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

shared_boards = db.Table('shared_boards', db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('board_id', db.Integer, db.ForeignKey(add_prefix_for_prod('boards.id')), primary_key=True)
)

user_cards = db.Table('user_cards', db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('card_id', db.Integer, db.ForeignKey(add_prefix_for_prod('cards.id')), primary_key=True)
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    used_boards = db.relationship('Board', secondary=shared_boards ,back_populates='users')
    owned_boards = db.relationship('Board', back_populates='owner', cascade='all, delete-orphan')
    cards = db.relationship('Card', secondary=user_cards, back_populates='users')
    comments = db.relationship('Comment', back_populates='users', cascade='all, delete-orphan')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name':self.last_name,
            'username': self.username,
            'email': self.email,
            # 'used_boards': self.used_boards,
            # 'owned_boards': self.owned_boards,
            # 'comments': self.comments,
        }

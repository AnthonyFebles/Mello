from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
#   Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    card_id = db.Column(db.Integer, db.ForeignKey("cards.id"))

    comment = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    # Relationships
    
    card = db.relationship("Card", back_populates="comments")

    user = db.relationship("User", back_populates="comments")


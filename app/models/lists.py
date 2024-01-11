from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class List(db.Model):
    __tablename__ = 'lists'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    board_id = db.Column(db.Integer, db.ForeignKey("boards.id"))
    name = db.Column(db.String(80), Nullable = False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    board = db.relationship("Board", back_populates="lists")
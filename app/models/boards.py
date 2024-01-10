from .db import db, environment, SCHEMA, add_prefix_for_prod


class Board(db.Model):
    __tablename__ = 'boards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, nullable=False)
    color = db.Column(db.String(30), nullable=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'color': self.color,
            'name': self.name,
            'description': self.description,
        }

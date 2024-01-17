from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class CardForm(FlaskForm):
    name = StringField("Title", validators=[DataRequired(), Length(max=50)])
    description = StringField("Description", validators=[DataRequired(), Length(max=255)])

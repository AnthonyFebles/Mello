from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Length

class BoardForm(FlaskForm):
    name = StringField("Board Title", validators=[DataRequired(), Length(max=20)])
    visibility = BooleanField("Visibility")
    color = StringField("Background Image", validators=[Length(max=255)])

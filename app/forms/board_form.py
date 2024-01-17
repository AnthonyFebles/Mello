from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SubmitField
from wtforms.validators import DataRequired, Length

class BoardForm(FlaskForm):
    name = StringField("Board Title", validators=[DataRequired(), Length(max=20)])
    visibility = BooleanField("Visibility")
    description = StringField("Description", validators=[DataRequired(), Length(max=255)])
    color = StringField("Background Image", validators=[Length(max=255)])
    create_button = SubmitField("Create")




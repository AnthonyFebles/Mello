from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SubmitField
from wtforms.validators import DataRequired, Length

class BoardForm(FlaskForm):
    board_title = StringField("Board Title", validators=[DataRequired(), Length(max=20)])
    visibility = BooleanField("Visibility")
    background_img = StringField("Background Image", validators=[DataRequired(), Length(max=255)])
    create_button = SubmitField("Create")




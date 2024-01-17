from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length

class CardForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired(), Length(max=50)])
    description = StringField("Description", validators=[DataRequired(), Length(max=255)])
    submit = SubmitField("Submit")

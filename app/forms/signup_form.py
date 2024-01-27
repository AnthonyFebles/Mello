from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length, Email
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')
    

    def valid_email(form, field):
        # Checking for valid Email
        email = field.data
        if "@" not in email:
            raise ValidationError("Email Invalid.")


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired(), Length(max=50)])
    last_name = StringField('last_name', validators=[DataRequired(), Length(max=50)])
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), Length(max=35), Email(), user_exists])
    password = StringField('password', validators=[DataRequired()])

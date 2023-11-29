from flask_sqlalchemy import SQLAlchemy
import os
from sqlalchemy.ext.hybrid import hybrid_property
import bcrypt
from sqlalchemy.sql import func

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(500), unique=False, nullable=False)
    money_register = db.relationship('MoneyRegister', back_populates='user')
    type_of_categories = db.relationship("TypeOfCategories", back_populates='user')

    def __repr__(self):
        return f'<User {self.email}>'

    @hybrid_property
    def full_name(self):
        return f'{self.first_name} {self.last_name}'

    def verify_password(self, password):
        return bcrypt.verify(password, self.password_hash)

    def serialize(self):
        return {
            "id": self.id,
            "user_name": self.user_name,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
        }
    

class MoneyRegister(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    time_created = db.Column(db.DateTime(timezone=True), server_default=func.now())
    time_updated = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    time_selected = db.Column(db.Date, unique=False, nullable=False)
    tipo_movimiento = db.Column(db.String(500), unique=False, nullable=False)
    tipo_categoria = db.Column(db.String(500), unique=False, nullable=False)
    monto = db.Column(db.Float, unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship("User", back_populates='money_register')

    def __repr__(self):
        return '<MoneyRegister %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "time_selected": self.time_selected,
            "tipo_movimiento": self.tipo_movimiento,
            "tipo_categoria": self.tipo_categoria,
            "monto": self.monto,
        }

class TypeOfCategories(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    movement_type = db.Column(db.String(120), nullable=False)
    category = db.Column(db.String(120), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship("User", back_populates='type_of_categories')

    def __repr__(self):
        return f'<TypeOfCategories {self.movement_type} - {self.category}>'

    def serialize(self):
        return {
            "id": self.id,
            "movement_type": self.movement_type,
            "category": self.category,
        }


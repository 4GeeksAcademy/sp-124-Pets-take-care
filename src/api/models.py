from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from datetime import date
from sqlalchemy import Date

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True)
    name:Mapped[str] = mapped_column(String(120), nullable=False)
    last_name:Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(120), nullable=False, unique=True)
    password: Mapped[str] = mapped_column(nullable=False)
    phone: Mapped[str] = mapped_column(String(120), nullable=True)
    address: Mapped[str] = mapped_column(String(120), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)


    def serialize(self):
            return {
                "id": self.id,
                "name": self.name,
                "last_name": self.last_name,
                "email": self.email,
                "phone": self.phone,
                "address": self.address,
                "is_active": self.is_active
                # do not serialize the password, its a security breach
            }

class Sitter(db.Model):
    __tablename__ = "sitter"

    id: Mapped[int] = mapped_column(primary_key=True)
    name:Mapped[str] = mapped_column(String(120), nullable=False)
    last_name:Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(120), nullable=False, unique=True)
    password: Mapped[str] = mapped_column(nullable=False)
    confirm_password:Mapped[str] = mapped_column(nullable=False)
    phone: Mapped[str] = mapped_column(String(120), nullable=True)
    studies: Mapped[bool] = mapped_column(Boolean(), nullable=True)
    studies_comment: Mapped[str] = mapped_column(String(120), nullable=True)
    address: Mapped[str] = mapped_column(String(120), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=True)


    def serialize(self):
            return {
                "id": self.id,
                "name": self.name,
                "last_name":self.last_name,
                "email": self.email,
                "phone": self.phone,
                "studies": self.studies,
                "studies_comment": self.studies_comment,
                "address": self.address,
                "is_active": self.is_active

                # do not serialize the password, its a security breach
            }
    
class Skill(db.Model):
    __tablename__ = "skill"

    id: Mapped[int] = mapped_column(primary_key=True)
    skill:Mapped[str] = mapped_column(String(120), nullable=False)

    def serialize(self):
            return {
                "id": self.id,
                "skill": self.skill
                # do not serialize the password, its a security breach
            }


class Pet(db.Model):
    __tablename__ = "pet"

    id: Mapped[int] = mapped_column(primary_key=True)
    name:Mapped[str] = mapped_column(String(120), nullable=False)
    species:Mapped[str] = mapped_column(String(120), nullable=False)
    race: Mapped[str] = mapped_column(String(120), nullable=True)
    gender: Mapped[str] = mapped_column(String(120), nullable=True)
    color:Mapped[str] = mapped_column(String(120), nullable=True)
    has_nie: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    nie: Mapped[str] = mapped_column(String(120), nullable=True)
    special_care: Mapped[bool] = mapped_column(Boolean(), nullable=True)
    birth_date: Mapped[date] = mapped_column(Date, nullable=True)
    type_food: Mapped[str] = mapped_column(String(120), nullable=True)
    sterilized: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    


    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "species":self.species,
            "race": self.race,
            "gender": self.gender,
            "color": self.color,
            "nie": self.nie,
            "birth_date": self.birth_date.isoformat() if self.birth_date else None,
            "type_food": self.type_food,
            "special_care": self.special_care,
            "sterilized": self.sterilized,

            # do not serialize the password, its a security breach
        }

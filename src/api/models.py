from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Numeric
from sqlalchemy.orm import Mapped, mapped_column
from datetime import date
from sqlalchemy import Date
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from typing import List

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    last_name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(
        String(120), nullable=False, unique=True)
    password: Mapped[str] = mapped_column(nullable=False)
    phone: Mapped[str] = mapped_column(String(120), nullable=True)
    address: Mapped[str] = mapped_column(String(120), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    pets: Mapped[List["Pet"]] = relationship("Pet", back_populates="user")

    def __repr__(self):
        return f"<User id={self.id} name={self.name}> email={self.email}>"

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
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    last_name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(120), nullable=False, unique=True)
    password: Mapped[str] = mapped_column(nullable=False)
    confirm_password: Mapped[str] = mapped_column(nullable=False)
    phone: Mapped[str] = mapped_column(String(120), nullable=True)
    studies: Mapped[bool] = mapped_column(Boolean(), nullable=True)
    studies_comment: Mapped[str] = mapped_column(String(120), nullable=True)
    address: Mapped[str] = mapped_column(String(120), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=True)

    sitterpets: Mapped[List["SitterPet"]] = relationship(back_populates="sitter")
    sitter_skills: Mapped[List["SitterSkills"]] = relationship(back_populates="sitter", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Sitter id={self.id} name={self.name} email={self.email}>"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
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
    skill: Mapped[str] = mapped_column(String(120), nullable=False)

    skills_sitter: Mapped[List["SitterSkills"]] = relationship(back_populates="skills", cascade="all, delete-orphan")

    def serialize(self):
        return {
            "id": self.id,
            "skill": self.skill
            # do not serialize the password, its a security breach
        }

class Pet(db.Model):
    __tablename__ = "pet"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    species: Mapped[str] = mapped_column(String(120), nullable=False)
    race: Mapped[str] = mapped_column(String(120), nullable=True)
    gender: Mapped[str] = mapped_column(String(120), nullable=True)
    color: Mapped[str] = mapped_column(String(120), nullable=True)
    has_nie: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    nie: Mapped[str] = mapped_column(String(120), nullable=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)
    special_care: Mapped[bool] = mapped_column(Boolean(), nullable=True)
    birth_date: Mapped[date] = mapped_column(Date, nullable=True)
    type_food: Mapped[str] = mapped_column(String(120), nullable=True)
    sterilized: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    sitterpets: Mapped[List["SitterPet"]] = relationship(back_populates="pet")
    user: Mapped["User"] = relationship("User", back_populates="pets")

    def __repr__(self):
        return f"<Pet id={self.id} name={self.name} species={self.species}>"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "species": self.species,
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

class SitterPet(db.Model):
    __tablename__ = "sitterpet"

    id: Mapped[int] = mapped_column(primary_key=True)
    sitter_id: Mapped[int] = mapped_column(
        ForeignKey("sitter.id"), nullable=False)
    pet_id: Mapped[int] = mapped_column(ForeignKey("pet.id"), nullable=False)

    sitter: Mapped["Sitter"] = relationship(back_populates="sitterpets")
    pet: Mapped["Pet"] = relationship(back_populates="sitterpets")

    def serialize(self):

        return {
            "sitter_name": self.sitter.name,
            "pet_name": self.pet.name
        }
    
class Services(db.Model):
    __tablename__ = "services"

    id: Mapped[int] = mapped_column(primary_key=True)
    service_name: Mapped[str] = mapped_column(String(120), nullable=False)
    duration_minutes: Mapped[int] = mapped_column(nullable=False)
    cost: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "service_name": self.service_name,
            "duration_minutes": self.duration_minutes,
            "cost": float(self.cost)
            # do not serialize the password, its a security breach
        }
    
class SitterSkills(db.Model):
    __tablename__ = "sitterskills"

    id: Mapped[int] = mapped_column(primary_key=True)


    sitter_id: Mapped[int] = mapped_column(ForeignKey("sitter.id"), nullable=False)
    skill_id: Mapped[int] = mapped_column(ForeignKey("skill.id"), nullable=False)

    sitter: Mapped["Sitter"] = relationship(back_populates="sitter_skills")
    skills: Mapped["Skill"] = relationship(back_populates="skills_sitter")

    def serialize(self):

        return {
            "sitter_name": self.sitter.name,
            "skill_name": self.skills.skill
        }
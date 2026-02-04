from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)


    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
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

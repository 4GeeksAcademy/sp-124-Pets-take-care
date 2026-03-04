"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Sitter, Pet, Skill, SitterPet, Services, SitterSkills, Appointment, UserAdmin, AppointmentSitter
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from datetime import datetime

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/signup/sitters", methods=["POST"])
def signup_sitter():

    body = request.get_json()
    if not body:
        return jsonify({"msg": "Request body is required"}), 400

    name = body.get("name", None)
    last_name = body.get("last_name", None)
    email = body.get("email", None)
    password = body.get("password", None)

    if not email or not password or not name or not last_name:
        return jsonify({"msg": "All fields are required"}), 400

    sitter = db.session.execute(select(Sitter).where(
        Sitter.email == email)).scalar_one_or_none()
    if sitter:
        return jsonify({"msg": "user already exist"}), 401

    sitter = Sitter(name=body["name"],
                    last_name=body["last_name"],
                    email=body["email"],
                    password=body["password"],
                    )

    db.session.add(sitter)
    db.session.commit()
    response_body = {
        "msg": "Created sitter"}
    return jsonify(response_body), 201


@api.route('/sitters', methods=['GET'])
def get_sitters():

    sitters = db.session.execute(select(Sitter)).scalars().all()

    results_sitters = list(map(lambda sitter: sitter.serialize(), sitters))

    return jsonify(results_sitters), 200


@api.route('/sitters/<int:sitter_id>', methods=['GET'])
def get_sitter(sitter_id):

    sitter = db.session.get(Sitter, sitter_id)

    if sitter is None:
        return jsonify({"message": "Sitter not found"}), 404

    return jsonify(sitter.serialize()), 200


@api.route('/sitters/<int:sitter_id>', methods=['PUT'])
def put_sitter(sitter_id):

    body = request.get_json()
    if body is None:
        return jsonify({"message": "Request body is required"}), 400

    sitter = db.session.get(Sitter, sitter_id)
    if sitter is None:
        return jsonify({"message": "Sitter not found"}), 404

    sitter.name = body.get("name", sitter.name)
    sitter.last_name = body.get("last_name", sitter.last_name)
    sitter.email = body.get("email", sitter.email)
    sitter.password = body.get("password", sitter.password)
    sitter.phone = body.get("phone", sitter.phone)
    sitter.studies = body.get("studies", sitter.studies)
    sitter.studies_comment = body.get(
        "studies_comment", sitter.studies_comment)
    sitter.address = body.get("address", sitter.address)
    sitter.is_active = body.get("is_active", sitter.is_active)

    db.session.commit()

    return jsonify({"msg": "Sitter updated successfully"}), 200


@api.route('/sitters/<int:sitter_id>', methods=['DELETE'])
def delete_sitter(sitter_id):

    sitter = db.session.execute(
        select(Sitter)
        .where(Sitter.id == sitter_id,)).scalar_one_or_none()

    if sitter is None:
        return jsonify({"msg": "Sitter not found"}), 404

    db.session.delete(sitter)
    db.session.commit()

    return jsonify({"msg": "Sitter deleted"}), 200


@api.route("/clients", methods=["POST"])
def create_clients():

    body = request.get_json()
    if not body:
        return jsonify({"msg": "Request body is required"}), 400

    name = body.get("name", None)
    last_name = body.get("last_name", None)
    email = body.get("email", None)
    password = body.get("password", None)
    phone = body.get("phone", None)
    address = body.get("address", None)
    if not email or not password or not name or not last_name:
        return jsonify({"msg": "All fields are required"}), 400

    user = db.session.execute(select(User).where(
        User.email == email)).scalar_one_or_none()
    if user:
        return jsonify({"msg": "user already exist"}), 401

    user = User(name=body["name"],
                last_name=body["last_name"],
                email=body["email"],
                password=body["password"],
                phone=phone,
                address=address
                )

    db.session.add(user)
    db.session.commit()
    response_body = {
        "msg": "Created user"
    }

    return jsonify(response_body), 201


@api.route("/clients", methods=["GET"])
def get_clients():
    users = db.session.execute(select(User)).scalars().all()

    result = list(map(lambda user: user.serialize(), users))

    return jsonify(result), 200


@api.route('/clients/<int:client_id>', methods=['GET'])
def get_client(client_id):

    user = db.session.get(User, client_id)

    if user is None:
        return jsonify({"message": "Client not found"}), 404

    return jsonify(user.serialize()), 200


@api.route('/clients/<int:client_id>', methods=['PUT'])
def put_client(client_id):

    body = request.get_json()
    user = db.session.get(User, client_id)
    if user is None:
        return jsonify({"message": "Client not found"}), 404

    user.name = body.get("name", user.name)
    user.last_name = body.get("last_name", user.last_name)
    user.email = body.get("email", user.email)
    user.password = body.get("password", user.password)
    user.phone = body.get("phone", user.phone)
    user.address = body.get("address", user.address)

    db.session.commit()
    return jsonify({"msg": "user updated successfully"}), 200


@api.route('/clients/<int:client_id>', methods=['DELETE'])
def delete_client(client_id):

    user = db.session.execute(
        select(User)
        .where(User.id == client_id,)).scalar_one_or_none()

    if user is None:
        return jsonify({"msg": "Client not found"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"msg": "Client deleted"}), 200


@api.route("/skills", methods=["POST"])
def create_skills():

    body = request.get_json()
    if not body:
        return jsonify({"msg": "Request body is required"}), 400

    skill = body.get("skill", None)
    if not skill:
        return jsonify({"msg": "All fields are required"}), 400

    skill = db.session.execute(select(Skill).where(
        Skill.skill == skill)).scalar_one_or_none()
    if skill:
        return jsonify({"msg": "Skill already exist"}), 401

    skill = Skill(skill=body["skill"])

    db.session.add(skill)
    db.session.commit()
    response_body = {
        "msg": "Created skill"
    }

    return jsonify(response_body), 201


@api.route("/skills", methods=["GET"])
def get_skills():
    skills = db.session.execute(select(Skill)).scalars().all()

    result = list(map(lambda skill: skill.serialize(), skills))

    return jsonify(result), 200


@api.route('/skills/<int:skill_id>', methods=['GET'])
def get_skill(skill_id):

    skill = db.session.get(Skill, skill_id)

    if skill is None:
        return jsonify({"message": "Skill not found"}), 404

    return jsonify(skill.serialize()), 200


@api.route('/skills/<int:skill_id>', methods=['PUT'])
def put_skill(skill_id):

    body = request.get_json()
    skill = db.session.get(Skill, skill_id)
    if skill is None:
        return jsonify({"message": "Skill not found"}), 404

    skill.skill = body.get("skill", skill.skill)
    db.session.commit()
    return jsonify({"msg": "Skill updated successfully"}), 200


@api.route('/skills/<int:skills_id>', methods=['DELETE'])
def delete_skill(skills_id):

    skill = db.session.execute(
        select(Skill)
        .where(Skill.id == skills_id,)).scalar_one_or_none()

    if skill is None:
        return jsonify({"msg": "Skill not found"}), 404

    db.session.delete(skill)
    db.session.commit()
    return jsonify({"msg": "Skill deleted"}), 200


@api.route('/pets', methods=['GET'])
def get_pets():

    pets = db.session.execute(select(Pet)).scalars().all()

    results_pets = list(map(lambda pet: pet.serialize(), pets))

    return jsonify(results_pets), 200


@api.route('/pets/<int:pet_id>', methods=['GET'])
def get_pet(pet_id):

    pet = db.session.get(Pet, pet_id)

    if pet is None:
        return jsonify({"message": "Pet not found"}), 404

    return jsonify(pet.serialize()), 200


@api.route("/signup/pets", methods=["POST"])
def add_pet():
    body = request.get_json()
    if not body:
        return jsonify({"msg": "Request body is required"}), 400

    name = body.get("name")
    species = body.get("species")
    has_nie = body.get("has_nie", False)
    nie = body.get("nie")
    sterilized = body.get("sterilized", False)
    user_id = body.get("user_id")

    if not name or not species:
        return jsonify({"msg": "name and species fields are required"}), 400

    pet = Pet(
        name=name,
        species=species,
        has_nie=has_nie,
        nie=nie,
        sterilized=sterilized,
        user_id=user_id
    )

    db.session.add(pet)
    db.session.commit()

    return jsonify({
        "msg": "Pet added"
    }), 201


@api.route('/pets/<int:pet_id>', methods=['PUT'])
def put_pet(pet_id):

    body = request.get_json()
    if body is None:
        return jsonify({"message": "Request body is required"}), 400

    pet = db.session.get(Pet, pet_id)
    if pet is None:
        return jsonify({"message": "Pet not found"}), 404

    pet.name = body.get("name", pet.name)
    pet.species = body.get("species", pet.species)
    pet.breed = body.get("breed", pet.breed)
    pet.gender = body.get("gender", pet.gender)
    pet.color = body.get("color", pet.color)
    pet.nie = body.get("nie", pet.nie)
    pet.birth_date = body.get("birth_date", pet.birth_date)
    pet.type_food = body.get("type_food", pet.type_food)
    pet.special_care = body.get("special_care", pet.special_care)
    pet.sterilized = body.get("sterilized", pet.sterilized)

    db.session.commit()

    return jsonify({"msg": "Pet updated successfully"}), 200


@api.route('/pets/<int:pet_id>', methods=['DELETE'])
def remove_pet(pet_id):

    pet = db.session.execute(
        select(Pet)
        .where(Pet.id == pet_id,)).scalar_one_or_none()

    if pet is None:
        return jsonify({"msg": "Pet not found"}), 404

    db.session.delete(pet)
    db.session.commit()

    return jsonify({"msg": "pet deleted"}), 200


@api.route("/sitters/<int:sitter_id>/pets/<int:pet_id>", methods=["POST"])
def add_pet_to_sitter(sitter_id, pet_id):

    sitter = Sitter.query.get(sitter_id)
    if not sitter:
        return {"msg": "Sitter not found"}, 404

    pet = Pet.query.get(pet_id)
    if not pet:
        return {"msg": "Pet not found"}, 404

    already_exist = SitterPet.query.filter_by(
        sitter_id=sitter_id,
        pet_id=pet_id
    ).first()

    if already_exist:
        return {"msg": "this sitter already has this pet in their care"}, 400

    care = SitterPet(
        sitter_id=sitter_id,
        pet_id=pet_id
    )

    db.session.add(care)
    db.session.commit()
    response_body = {
        "msg": "Pet assigned to sitter"
    }

    return jsonify(response_body), 201


@api.route("/sitters/<int:sitter_id>/pets/<int:pet_id>", methods=['DELETE'])
def remove_pet_from_sitter(sitter_id, pet_id):

    sitter_care_pet = SitterPet.query.filter_by(
        sitter_id=sitter_id,
        pet_id=pet_id
    ).first()

    if not sitter_care_pet:
        return {"msg": "this sitter doesn't take care of this pet"}, 400

    db.session.delete(sitter_care_pet)
    db.session.commit()

    return jsonify({"msg": "pet removed from sitter"}), 200


@api.route("/sitterpets", methods=["GET"])
def get_sitterpets():

    sitterpets = db.session.execute(select(SitterPet)).scalars().all()

    result = list(map(lambda sitterpet: sitterpet.serialize(), sitterpets))

    return jsonify(result), 200


@api.route('/sitters/<int:sitter_id>/pets', methods=['GET'])
def get_pets_sitter(sitter_id):

    sitterpets = db.session.scalars(
        select(SitterPet).where(
            SitterPet.sitter_id == sitter_id)
    ).all()

    result = [sp.serialize() for sp in sitterpets]

    return jsonify(result), 200


@api.route("/services", methods=["POST"])
def create_services():

    body = request.get_json()

    if not body:
        return jsonify({"msg": "Request body is required"}), 400

    service_name = body.get("service_name", None)
    duration_minutes = body.get("duration_minutes", None)
    cost = body.get("cost", None)

    if service_name is None or duration_minutes is None or cost is None:
        return jsonify({"msg": "All fields are required"}), 400

    services = db.session.execute(select(Services).where(
        Services.service_name == service_name)).scalar_one_or_none()
    if services:
        return jsonify({"msg": "service already exist"}), 401
    services = Services(service_name=body["service_name"],
                        duration_minutes=body["duration_minutes"],
                        cost=body["cost"])

    db.session.add(services)
    db.session.commit()
    response_body = {
        "msg": "Created service"
    }

    return jsonify(response_body), 201


@api.route("/services", methods=["GET"])
def get_services():
    services = db.session.execute(select(Services)).scalars().all()

    result = list(map(lambda service: service.serialize(), services))

    return jsonify(result), 200


@api.route('/services/<int:service_id>', methods=['GET'])
def get_service(service_id):

    service = db.session.get(Services, service_id)

    if service is None:
        return jsonify({"message": "Service not found"}), 404

    return jsonify(service.serialize()), 200


@api.route('/services/<int:service_id>', methods=['PUT'])
def put_service(service_id):

    body = request.get_json()
    service = db.session.get(Services, service_id)
    if service is None:
        return jsonify({"message": "Service not found"}), 404

    service.service_name = body.get("service_name", service.service_name)
    service.duration_minutes = body.get(
        "duration_minutes", service.duration_minutes)
    service.cost = body.get("cost", service.cost)

    db.session.commit()
    return jsonify({"msg": "service updated successfully"}), 200


@api.route('/services/<int:service_id>', methods=['DELETE'])
def delete_service(service_id):

    service = db.session.execute(
        select(Services)
        .where(Services.id == service_id,)).scalar_one_or_none()

    if service is None:
        return jsonify({"msg": "Service not found"}), 404

    db.session.delete(service)
    db.session.commit()
    return jsonify({"msg": "Service deleted"}), 200


@api.route("/sitters/<int:sitter_id>/skills/<int:skill_id>", methods=["POST"])
def add_skill_to_sitter(sitter_id, skill_id):

    sitter = Sitter.query.get(sitter_id)
    if not sitter:
        return {"msg": "Sitter not found"}, 404

    skill = Skill.query.get(skill_id)
    if not skill:
        return {"msg": "Skill not found"}, 404

    already_exist = SitterSkills.query.filter_by(
        sitter_id=sitter_id,
        skill_id=skill_id
    ).first()

    if already_exist:
        return {"msg": "this sitter already has this skill in their habilities"}, 400

    hability = SitterSkills(
        sitter_id=sitter_id,
        skill_id=skill_id
    )

    db.session.add(hability)
    db.session.commit()
    response_body = {
        "msg": "Skill assigned to sitter"
    }

    return jsonify(response_body), 201


@api.route("/sitters/<int:sitter_id>/skills/<int:skill_id>", methods=['DELETE'])
def remove_skill_from_sitter(sitter_id, skill_id):

    sitterskills = SitterSkills.query.filter_by(
        sitter_id=sitter_id,
        skill_id=skill_id
    ).first()

    if not sitterskills:
        return {"msg": "this sitter doesn't have those habilities"}, 400

    db.session.delete(sitterskills)
    db.session.commit()

    return jsonify({"msg": "Skill removed from sitter"}), 200


@api.route("/sitterskills", methods=["GET"])
def get_sitterskills():

    sitterskills = db.session.execute(select(SitterSkills)).scalars().all()

    result = list(
        map(lambda sitterskill: sitterskill.serialize(), sitterskills))

    return jsonify(result), 200


@api.route('/sitters/<int:sitter_id>/skills', methods=['GET'])
def get_skills_sitter(sitter_id):

    sitterskills = db.session.scalars(
        select(SitterSkills).where(
            SitterSkills.sitter_id == sitter_id)
    ).all()

    result = [ss.serialize() for ss in sitterskills]

    return jsonify(result), 200

    ## ====================================================================##
    ## =======================##LOGING SITTER##============================##


@api.route("/sitters/login", methods=["POST"])
def login_sitter():
    email = request.json.get("email")
    password = request.json.get("password")

    if not email or not password:
        return jsonify({"msg": "Missing credentials"}), 400

    sitter = db.session.execute(
        select(Sitter).where(
            Sitter.email == email)).scalar_one_or_none()

    if sitter is None:
        return jsonify({"msg": "Bad username or password"}), 401

    if password != sitter.password:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=str(sitter.id))

    return jsonify({"sitter_token": access_token,
                   "sitter": sitter.serialize()}), 200

    ## =======================##LOGING SITTER##============================##
    ## ====================================================================##


@api.route("/clients/login", methods=["POST"])
def login_client():
    email = request.json.get("email")
    password = request.json.get("password")

    if not email or not password:
        return jsonify({"msg": "Missing credentials"}), 400

    client = db.session.execute(
        select(User).where(
            User.email == email)).scalar_one_or_none()

    if client is None:
        return jsonify({"msg": "Client not found"}), 404

    if password != client.password:
        return jsonify({"msg": "Wrong password"}), 401

    access_token = create_access_token(identity=str(client.id))

    return jsonify({"client_token": access_token}), 200

## ====================================================================##
    ## =======================##APPOINTMETS##============================##


@api.route('/appointments', methods=['GET'])
def get_appointmenst():

    appointments = db.session.execute(select(Appointment)).scalars().all()

    results_appointments = list(
        map(lambda appointmen: appointmen.serialize(), appointments))

    return jsonify(results_appointments), 200


@api.route('/appointments/<int:id>', methods=['GET'])
def get_appointment(id):

    appointment = db.session.get(Appointment, id)

    if appointment is None:
        return jsonify({"message": "appointment not found"}), 404

    return jsonify(appointment.serialize()), 200


@api.route("/appointments", methods=["POST"])
def add_appointment():

    body = request.get_json()

    if not body:
        return jsonify({"msg": "Request body is required"}), 400

    user_id = body.get("user_id")
    pet_id = body.get("pet_id")
    service_id = body.get("service_id")
    status = body.get("status")
    date_str = body.get("appointment_date")
    time_str = body.get("appointment_time")

    if not all([user_id, pet_id, service_id, status, date_str, time_str]):
        return jsonify({"msg": "All fields are required"}), 400

    try:
        appointment_date = datetime.strptime(date_str, "%Y-%m-%d").date()
        appointment_time = datetime.strptime(time_str, "%H:%M").time()
    except ValueError:
        return jsonify({"msg": "Invalid date or time format"}), 400

    new_appointment = Appointment(
        user_id=user_id,
        pet_id=pet_id,
        service_id=service_id,
        appointment_date=appointment_date,
        appointment_time=appointment_time,
        status=status
    )

    db.session.add(new_appointment)
    db.session.commit()

    return jsonify({"msg": "New appointment created"}), 201


@api.route('/appointments/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_appointment(id):

    appointment = db.session.get(Appointment, id)

    if not appointment:
        return jsonify({"message": "appointment not found"}), 404

    db.session.delete(appointment)
    db.session.commit()

    return jsonify({"msg": "appointment deleted"}), 200


@api.route('/appointments/<int:id>', methods=['PUT'])
def update_appointment(id):

    appointment = db.session.get(Appointment, id)

    if not appointment:
        return jsonify({"message": "appointment not found"}), 404

    body = request.get_json()
    if not body:
        return jsonify({"msg": "no data provided"}), 400

    if "status" in body:
        appointment.status = body["status"]

    if "pet_id" in body:
        pet = db.session.get(Pet, body["pet_id"])
        if not pet:
            return jsonify({"msg": "pet not found"}), 400
        appointment.pet_id = body["pet_id"]

    if "service_id" in body:
        service = db.session.get(Services, body["service_id"])
        if not service:
            return jsonify({"msg": "service not found"}), 400
        appointment.service = body["service_id"]

    if "appointment_date" in body:
        try:
            date_obj = datetime.strptime(
                body["appointment_date"], "%Y-%m-%d").date()
            appointment.appointment_date = date_obj
        except:
            return jsonify({"msg": "incorrect date"}), 400

    if "appointment_time" in body:
        try:
            time_obj = datetime.strptime(
                body["appointment_time"], "%H:%M").time()
            appointment.appointment_time = time_obj

        except:
            return jsonify({"msg": "incorrect time"}), 400

    db.session.commit()

    return jsonify({"msg": "appointment updated"}), 200

## ====================================================================##
    ## =======================##APPOINTMETS##============================##


@api.route("/admin/login", methods=["POST"])
def login_admin():
    email = request.json.get("email")
    password = request.json.get("password")

    if not email or not password:
        return jsonify({"msg": "Missing credentials"}), 400

    admin = db.session.execute(
        select(UserAdmin).where(
            UserAdmin.email == email)).scalar_one_or_none()

    if admin is None:
        return jsonify({"msg": "Admin not found"}), 404

    if password != admin.password:
        return jsonify({"msg": "Wrong password"}), 401

    access_token = create_access_token(identity=admin.id)

    return jsonify({"admin_token": access_token}), 200

## ====================================================================##

# get todos los appointment sitters


@api.route('/appointments/sitters', methods=['GET'])
def get_appointments_sitters():

    appointments = db.session.execute(
        select(AppointmentSitter)).scalars().all()

    appointments_serialized = [appointment.serialize()
                               for appointment in appointments]

    return jsonify({"appointments": appointments_serialized}), 200


# get de un appointment sitter

@api.route('/appointments/sitters/<int:id>', methods=['GET'])
def get_appointment_sitters(id):

    application = db.session.get(AppointmentSitter, id)

    if application is None:
        return jsonify({"message": "appointment not found"}), 404

    return jsonify(application.serialize()), 200


# post de un nuevo appointment sitter

@api.route("/appointments/sitters/new", methods=["POST"])
def add_appointment_sitter():

    body = request.get_json()

    appointment_id = body.get("appointment_id")
    sitter_id = body.get("sitter_id")

    if not appointment_id or not sitter_id:
        return jsonify({"msg": "appointment_id and sitter_id are required"}), 400

    appointment_sitter = AppointmentSitter(
        appointment_id=appointment_id,
        sitter_id=sitter_id)

    db.session.add(appointment_sitter)
    db.session.commit()

    return jsonify({"msg": "Appointment Sitter created"}), 200


# put editar un appointment sitter

@api.route("/appointments/sitters/edit/<int:id>", methods=["PUT"])
def update_appointment_sitter(id):

    appointment_sitter = db.session.get(AppointmentSitter, id)

    if appointment_sitter is None:
        return jsonify({"msg": "Application not found"}), 404

    body = request.get_json()

    new_status = body.get("status")

    if not new_status:
        return jsonify({"msg": "status is required"}), 400

    allowed_status = ["applied", "selected", "rejected", "withdrawn"]

    if new_status not in allowed_status:
        return jsonify({"msg": "Invalid status"}), 400

    appointment_sitter.status = new_status

    db.session.commit()

    return jsonify({
        "msg": "Application updated",
        "application": appointment_sitter.serialize()
    }), 200


# delete eliminar un appointment sitter

@api.route('/appointments/sitters/<int:id>', methods=['DELETE'])
def delete_appointment_sitter(id):

    appointment_sitter = db.session.get(AppointmentSitter, id)

    if not appointment_sitter:
        return jsonify({"message": "appointment not found"}), 404

    db.session.delete(appointment_sitter)
    db.session.commit()

    return jsonify({"msg": "sitter's appointment deleted"}), 200
    ## =========================CLIENT LOGGED===========================##


@api.route("/clients/pets", methods=["GET"])
@jwt_required()
def get_pets_by_id():
    client_id = (get_jwt_identity())

    pets_client = db.session.execute(select(Pet).where(
        Pet.user_id == client_id)).scalars().all()

    serialized = [pet.serialize() for pet in pets_client]

    return jsonify(serialized), 200


@api.route('/clients/pets/<int:pet_id>', methods=['GET'])
@jwt_required()
def get_pet_by_id(pet_id):

    client_id = int(get_jwt_identity())
    pet = db.session.get(Pet, pet_id)

    if pet is None:
        return jsonify({"message": "Pet not found"}), 404

    if pet.user_id != client_id:
        return jsonify({"msg": "not found"}), 404

    return jsonify(pet.serialize()), 200


@api.route("/clients/pets/newpet", methods=['POST'])
@jwt_required()
def new_pet_by_id():
    client_id = int(get_jwt_identity())

    body = request.get_json()
    if not body:
        return jsonify({"msg": "Request body is required"}), 400

    name = body.get("name")
    species = body.get("species")
    has_nie = body.get("has_nie", False)
    nie = body.get("nie")
    sterilized = body.get("sterilized", False)

    if not name or not species:
        return jsonify({"msg": "name and species fields are required"}), 400

    pet = Pet(
        name=name,
        species=species,
        has_nie=has_nie,
        nie=nie,
        sterilized=sterilized,
        user_id=client_id
    )

    db.session.add(pet)
    db.session.commit()

    return jsonify(pet.serialize()), 201

@api.route("/clients/pets/<int:pet_id>", methods=['DELETE'])
@jwt_required()
def remove_pet_by_id(pet_id):
    client_id = int(get_jwt_identity())

    pet = db.session.execute(
        select(Pet)
        .where(
            Pet.id == pet_id,
            Pet.user_id == client_id
        )
    ).scalar_one_or_none()

    if pet is None:
        return jsonify({"msg": "Pet not found"}), 404

    db.session.delete(pet)
    db.session.commit()

    return jsonify({"msg": "pet deleted"}), 204

@api.route("/clients/pets/<int:id>", methods=['PUT'])
@jwt_required()
def edit_pet_by_id(id):

    client_id = int(get_jwt_identity())

    body = request.get_json()
    if not body:
        return jsonify({"msg": "Request body is required"}), 400

    pet = db.session.get(Pet, id)
    if not pet:
        return jsonify({"msg": "pet not found"}), 404

    if pet.user_id != client_id:
        return jsonify({"msg": "pet not found"}), 404

    if "name" in body:
        pet.name = body["name"]

    if "species" in body:
        pet.species = body["species"]

    if "breed" in body:
        pet.breed = body["breed"]

    if "gender" in body:
        pet.gender = body["gender"]

    if "color" in body:
        pet.color = body["color"]

    if "nie" in body:
        pet.nie = body["nie"]

    if "birth_date" in body:
        try:
            date_obj = datetime.strptime(body["birth_date"], "%Y-%m-%d").date()
            pet.birth_date = date_obj
        except:
            return jsonify({"msg": "incorrect date"}), 400

    if "type_food" in body:
        pet.type_food = body["type_food"]

    if "special_care" in body:
        pet.special_care = body["special_care"]

    if "about_pet" in body:
        pet.about_pet = body["about_pet"]

    db.session.commit()

    return jsonify({"msg": "Pet updated successfully"}), 200

@api.route("/sitter/appointments/<string:postulated>", methods=['GET'])
@jwt_required()
def get_appointment_list(postulated):

    sitter_id = get_jwt_identity()

    appointments_sitters = db.session.execute(select(AppointmentSitter).where(AppointmentSitter.sitter_id == sitter_id, AppointmentSitter.status == "applied")).scalars().all()

    sitter_appointments = [appointment_sitter.appointment_id for appointment_sitter in appointments_sitters]

    if postulated != "true":
        appointments = db.session.execute(select(Appointment).where(Appointment.id.notin_(sitter_appointments), Appointment.status != "selected", Appointment.status != "rejected")).scalars().all()
        return jsonify({"appointments": [appointment.serialize() for appointment in appointments]})
        
    appointments = db.session.execute(select(Appointment).where(Appointment.id.in_(sitter_appointments), Appointment.status != "rejected")).scalars().all()
    return jsonify({"appointments": [appointment.serialize() for appointment in appointments]})
    
@api.route ("/appointments/asigned", methods=["GET"])
@jwt_required()
def get_appointments_asigned():

    sitter_id = get_jwt_identity()

    appointments_sitters = db.session.execute(select(AppointmentSitter).where(AppointmentSitter.sitter_id == sitter_id, AppointmentSitter.status == "selected")).scalars().all()

    sitter_appointments = [appointment_sitters.appointment_id for appointment_sitters in appointments_sitters]

    appointments = db.session.execute(select(Appointment).where(Appointment.id.in_(sitter_appointments), Appointment.status == "selected")).scalars().all()
    return jsonify ({"appointments": [appointment.serialize() for appointment in appointments]}), 200

@api.route ("/appointments/background", methods=["GET"])
@jwt_required()
def get_appointments_background():

    sitter_id = get_jwt_identity()

    appointments_sitters = db.session.execute(select(AppointmentSitter).where(AppointmentSitter.sitter_id == sitter_id, AppointmentSitter.status != "selected")).scalars().all()

    sitter_appointments = [appointment_sitters.appointment_id for appointment_sitters in appointments_sitters]

    appointments = db.session.execute(select(Appointment).where(Appointment.id.in_(sitter_appointments), Appointment.status != "selected")).scalars().all()
    
    return jsonify ({"appointments": [appointment.serialize() for appointment in appointments]})

@api.route("/sitter/appointment-sitter/new", methods=["POST"])
@jwt_required()
def add_own_appointment_sitter():

    body = request.get_json()

    appointment_id = body.get("appointment_id")
    sitter_id = get_jwt_identity()

    if not appointment_id or not sitter_id:
        return jsonify({"msg": "appointment_id and sitter_id are required"}),400

    exist_as = db.session.execute(select(AppointmentSitter).where(
        AppointmentSitter.appointment_id == appointment_id,
        AppointmentSitter.sitter_id == sitter_id
    )).scalar_one_or_none()

    if exist_as:
        exist_as.status = "applied"
        db.session.commit()
        return jsonify ({"msg": "appointmentsitter applied"}), 200

    appointment_sitter = AppointmentSitter(appointment_id=appointment_id, sitter_id=sitter_id)

    db.session.add(appointment_sitter)
    db.session.commit()

    return jsonify({"msg": "Appointment Sitter created"}),200


@api.route("/sitter/appointment-sitter/<int:appointment_id>", methods=["DELETE"])
@jwt_required()
def delete_own_appointment_sitter(appointment_id):

    sitter_id = get_jwt_identity()

    if not appointment_id or not sitter_id:
        return jsonify({"msg": "appointment_id and sitter_id are required"}),400

    appointment_sitter = db.session.execute(select(AppointmentSitter).where(AppointmentSitter.sitter_id == sitter_id, AppointmentSitter.appointment_id == appointment_id)).scalar_one_or_none()

    db.session.delete(appointment_sitter)
    db.session.commit()

    return jsonify({"deleted": "true"}),200




    ## =========================CLIENT LOGGED===========================##

# Este endpoint me da los appointments en los que el sitter no se ha postulado


# @api.route("/sitter/appointments/<string:postulated>", methods=['GET'])
# @jwt_required()
# def get_appointment_list(postulated):

#     sitter_id = get_jwt_identity()

#     appointments_sitters = db.session.execute(select(AppointmentSitter).where(
#         AppointmentSitter.sitter_id == sitter_id, AppointmentSitter.status == "applied")).scalars().all()

#     sitter_appointments = [
#         appointment_sitter.appointment_id for appointment_sitter in appointments_sitters]

#     if postulated != "true":
#         appointments = db.session.execute(select(Appointment).where(Appointment.id.notin_(
#             sitter_appointments), Appointment.status == "applied")).scalars().all()

#         return jsonify({"appointments": [appointment.serialize() for appointment in appointments]})

#     appointments = db.session.execute(select(Appointment).where(
#         Appointment.id.in_(sitter_appointments))).scalars().all()
#     return jsonify({"appointments": [appointment.serialize() for appointment in appointments]})


# @api.route("/appointments/asigned", methods=["GET"])
# @jwt_required()
# def get_appointments_asigned():

#     sitter_id = get_jwt_identity()

#     appointments_sitters = db.session.execute(select(AppointmentSitter).where(
#         AppointmentSitter.sitter_id == sitter_id, AppointmentSitter.status == "selected")).scalars().all()

#     sitter_appointments = [
#         appointment_sitters.appointment_id for appointment_sitters in appointments_sitters]

#     appointments = db.session.execute(select(Appointment).where(Appointment.id.in_(
#         sitter_appointments), Appointment.status != "applied")).scalars().all()
#     return jsonify({"appointments": [appointment.serialize() for appointment in appointments]}), 200


# @api.route("/sitter/appointment-sitter/new", methods=["POST"])
# @jwt_required()
# def add_own_appointment_sitter():

#     body = request.get_json()

#     appointment_id = body.get("appointment_id")
#     sitter_id = get_jwt_identity()

#     if not appointment_id or not sitter_id:
#         return jsonify({"msg": "appointment_id and sitter_id are required"}), 400

#     appointment_sitter = AppointmentSitter(
#         appointment_id=appointment_id, sitter_id=sitter_id)

#     db.session.add(appointment_sitter)
#     db.session.commit()

#     return jsonify({"msg": "Appointment Sitter created"}), 200


# @api.route("/sitter/appointment-sitter/<int:appointment_id>", methods=["DELETE"])
# @jwt_required()
# def delete_own_appointment_sitter(appointment_id):

#     sitter_id = get_jwt_identity()

#     if not appointment_id or not sitter_id:
#         return jsonify({"msg": "appointment_id and sitter_id are required"}), 400

#     appointment_sitter = db.session.execute(select(AppointmentSitter).where(
#         AppointmentSitter.sitter_id == sitter_id, AppointmentSitter.appointment_id == appointment_id)).scalar_one_or_none()

#     db.session.delete(appointment_sitter)
#     db.session.commit()

#     return jsonify({"deleted": "true"}), 200


@api.route("/clients/appointments", methods=["GET"])
@jwt_required()
def get_appointments_by_id():
    client_id = (get_jwt_identity())

    appointments = db.session.execute(select(Appointment).where(
        Appointment.user_id == client_id)).scalars().all()

    serialized = [app.serialize() for app in appointments]

    return jsonify(serialized), 200


@api.route('/clients/appointments/<int:id>', methods=['GET'])
@jwt_required()
def get_appointment_info(id):
    client_id = int(get_jwt_identity())

    appointment = db.session.get(Appointment, id)

    if appointment is None:
        return jsonify({"msg": "None"}), 404
    if appointment.user_id != client_id:
        return jsonify({"msg": "not found"}), 404

    return jsonify(appointment.serialize()), 200


@api.route('/clients/appointments/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_appointment_user(id):
    client_id = int(get_jwt_identity())

    appointment = db.session.execute(
        select(Appointment)
        .where(
            Appointment.id == id,
            Appointment.user_id == client_id
        )
    ).scalar_one_or_none()

    if appointment is None:
        return jsonify({"msg": "not found"}), 404

    db.session.delete(appointment)
    db.session.commit()

    return jsonify({"msg": "appointment deleted"}), 200


@api.route("/clients/appointments", methods=['POST'])
@jwt_required()
def new_appointment():
    client_id = int(get_jwt_identity())

    body = request.get_json()
    if not body:
        return jsonify({"msg": "Request body is required"}), 400

    # name = body.get("name")
    date = body.get("appointment_date")
    time = body.get("appointment_time")
    status = body.get("status", "applied")
    pet_id = body.get("pet_id")
    service_id = body.get("service_id")

    if not all([date, time, status, pet_id, service_id]):
        return jsonify({"msg": "All fields are required"}), 400

    try:
        appointment_date = datetime.strptime(date, "%Y-%m-%d").date()
        appointment_time = datetime.strptime(time, "%H:%M").time()
    except ValueError:
        return jsonify({"msg": "Invalid date or time format"}), 400

    pet = db.session.get(Pet, pet_id)
    if not pet or pet.user_id != client_id:
        return jsonify({"msg": "Invalid pet"}), 403

    appointment = Appointment(
        user_id=client_id,
        appointment_date=appointment_date,
        appointment_time=appointment_time,
        pet_id=pet_id,
        service_id=service_id,
        status=status

    )
    db.session.add(appointment)
    db.session.commit()

    return jsonify({"msg": "New appointment created"}), 201


@api.route('/clients/appointments/<int:id>', methods=['PUT'])
@jwt_required()
def edit_appointment(id):
    client_id = int(get_jwt_identity())

    body = request.get_json()
    if not body:
        return jsonify({"msg": "Request body is required"}), 400

    appointment = db.session.get(Appointment, id)
    if not appointment:
        return jsonify({"msg": "appointment not found"}), 404
    if appointment.user_id != client_id:
        return jsonify({"msg": "appointment not found"}), 404

    if "appointment_date" in body:
        try:
            date_obj = datetime.strptime(
                body["appointment_date"], "%Y-%m-%d").date()
            appointment.appointment_date = date_obj
        except ValueError:
            return jsonify({"msg": "incorrect date"}), 400

    if "appointment_time" in body:
        try:
            time_obj = datetime.strptime(
                body["appointment_time"], "%H:%M").time()
            appointment.appointment_time = time_obj
        except ValueError:
            return jsonify({"msg": "incorrect time"}), 400

    if "status" in body:
        appointment.status = body["status"]

    if "pet_id" in body:
        appointment.pet_id = body["pet_id"]

    if "service_id" in body:
        appointment.service_id = body["service_id"]

    db.session.commit()

    return jsonify({"msg": "appointment updated successfully"}), 200


@api.route("/appointment/requests/<int:appointment_id>", methods=["GET"])
@jwt_required()
def get_appointment_requests(appointment_id):

    client_id = int(get_jwt_identity())

    appointment = db.session.get(Appointment, appointment_id)
    if not appointment:
        return jsonify({"msg": "Appointment not found"}), 404
    
    if appointment.user_id != client_id:
        return jsonify({"msg": "Not authorized"}), 403

    appointment_sitters = db.session.execute(
        select(AppointmentSitter).where(
        AppointmentSitter.appointment_id == appointment_id, 
        AppointmentSitter.status == "applied"
        )
        ).scalars().all()

    return jsonify({"requests": [appointment_sitter.serialize() for appointment_sitter in appointment_sitters]}), 200

@api.route("/appointment/request/<int:appointment_id>/sitters/<int:sitter_id>", methods=["GET"])
@jwt_required()
def get_sitter_profile( appointment_id, sitter_id):

    client_id = int(get_jwt_identity());
    appointment = db.session.get(Appointment, appointment_id)
    if not appointment or appointment.user_id != client_id:
        return jsonify({"msg":"Not authorized"}), 403 
    
    applied = db.session.execute(
        select(AppointmentSitter).where(
            AppointmentSitter.appointment_id == appointment_id,
            AppointmentSitter.sitter_id == sitter_id
        )
    ).scalar_one_or_none()

    if not applied:
        return jsonify({"msg": "Not found"}), 403 

    sitter = db.session.get(Sitter, sitter_id)
    if not sitter:
        return jsonify({"msg": "Sitter not found"}), 404 
    
    return jsonify(sitter.serialize()), 200 




@api.route("/appointment-sitter/<int:app_sitter_id>/select", methods=['PUT'])
@jwt_required()
def select_sitter(app_sitter_id):

    client_id = int(get_jwt_identity())

    app_sitter = db.session.get(AppointmentSitter, app_sitter_id)
    if not app_sitter:
        return jsonify({"msg": "Application not found"}), 404

    appointment = app_sitter.appointment
    if not appointment:
        return jsonify({"msg": "Appointment not found"}), 404

    if appointment.user_id != client_id:
        return jsonify({"msg": "Unauthorized"}), 403

    all_requests = AppointmentSitter.query.filter_by(
        appointment_id=appointment.id
    ).all()

    for r in all_requests:
        if r.id == app_sitter_id:
            r.status = "selected"
        else:
            r.status = "rejected"

    appointment.status = "selected"

    db.session.commit()

    return jsonify({"msg": "Sitter selected successfully"}), 200


@api.route("/appointment-sitter/<int:app_sitter_id>/reject", methods=['PUT'])
@jwt_required()
def reject_sitter(app_sitter_id):
    client_id = int(get_jwt_identity())
    app_sitter = db.session.get(AppointmentSitter, app_sitter_id)

    if not app_sitter:
        return jsonify({"msg": "Application not found"}), 404

    appointment = app_sitter.appointment
    if not appointment:
        return jsonify({"msg": "Appointment not found"}), 404
    if appointment.user_id != client_id:
        return jsonify({"msg": "Unauthorized"}), 403

    app_sitter.status = "rejected"
    db.session.commit()

    return jsonify({"msg": "Sitter rejected"}), 200

@api.route("/sitter/profile", methods=["GET"])
@jwt_required()
def get_sitter_by_id():
    sitter_id = int(get_jwt_identity())

    sitter = db.session.get(Sitter, sitter_id)

    if not sitter:
        return jsonify({"msg": "Sitter not found"}), 404
    
    return jsonify(sitter.serialize()), 200

@api.route("/sitter/profile/edit", methods=["PUT"])
@jwt_required()
def put_sitter_by_id():
    sitter_id = int(get_jwt_identity())

    sitter = db.session.get(Sitter, sitter_id)

    if not sitter:
        return jsonify({"msg": "Sitter not found"}), 404
    
    body = request.get_json()
    fields = {"name", "last_name", "email", "address", "phone", "studies", "studies_comment"}
    if not fields.intersection(body.keys()):
        return jsonify({"msg": "You must send at least one of this: name, last_name, email, address, phone, studies, studies_comment"}), 400


    exist_email = db.session.execute(select(Sitter).where(Sitter.email == body.get("email"), Sitter.id != sitter_id)).scalar_one_or_none()
    if exist_email:
        return jsonify({"msg": "Introduced email already exist"}), 400

    name = body.get("name")
    sitter.name = name if name else sitter.name
    last_name = body.get("last_name")
    sitter.last_name = last_name if last_name else sitter.last_name
    email = body.get("email")
    sitter.email = email if email else sitter.email
    address = body.get("address")
    sitter.address = address if address else sitter.address
    phone = body.get("phone")
    sitter.phone = phone if phone else sitter.phone
    studies = body.get("studies")
    sitter.studies = studies if studies else sitter.studies
    studies_comment = body.get("studies_comment")
    sitter.studies_comment = studies_comment if studies_comment else sitter.studies_comment

    db.session.commit()

    return jsonify({"msg": "Sitter profile update"}), 200

@api.route("/sitter/appointment-sitter/withdrawn/<int:id>", methods=["PUT"])
@jwt_required()
def withdraw_appointment_asigned(id):

    sitter_id = int(get_jwt_identity())
    appointment_sitter = db.session.execute(select(AppointmentSitter).where(
        AppointmentSitter.appointment_id == id,
        AppointmentSitter.sitter_id == sitter_id
    )).scalar_one_or_none()
    appointment = db.session.get(Appointment, id)
    if not appointment_sitter and not appointment:
        return jsonify({"msg": "AppointmentSitter not found or appointment not found"}), 404
    
    appointment.status = "rejected"
    appointment_sitter.status = "withdrawn"


    db.session.commit()
    return jsonify(appointment_sitter.serialize()), 200

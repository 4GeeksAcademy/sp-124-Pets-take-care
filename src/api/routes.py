"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Sitter, Pet, Skill, SitterPet
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select

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
    confirm_password = body.get("confirm_password", None)

    if not email or not password or not name or not last_name or not confirm_password:
        return jsonify({"msg": "All fields are required"}), 400

    sitter = db.session.execute(select(Sitter).where(
        Sitter.email == email)).scalar_one_or_none()
    if sitter:
        return jsonify({"msg": "user already exist"}), 401

    sitter = Sitter(name=body["name"],
                    last_name=body["last_name"],
                    email=body["email"],
                    password=body["password"],
                    confirm_password=body["confirm_password"],
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
    sitter.confirm_password = body.get(
        "confirm_password", sitter.confirm_password)
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
    is_active = body.get("is_active", None)
    if not email or not password or not name or not last_name or not is_active:
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
                address=address,
                is_active=body["is_active"])

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
    user.is_active = body.get("is_active", user.is_active)

    db.session.commit()
    return jsonify({"msg": "user updated successfully"}), 200


@api.route('/clients/<int:client_id>', methods=['DELETE'])
def delete_clien(client_id):

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

    pet = db.session.get(Pet, pet_id )

    if pet is None:
       return jsonify({"message": "Pet not found"}), 404

    return jsonify(pet.serialize()), 200

@api.route("/signup/pets", methods=["POST"])
def add_pet():
    body = request.get_json()
    if not body:
        return jsonify({"msg": "Request body is required"}), 400
    
    name = body.get("name", None)
    species = body.get("species", None)
    race = body.get("race", None)
    gender = body.get("gender", None)
    color = body.get("color", None)
    nie =  body.get("nie", None)
    birth_date =  body.get("birth_date", None)
    type_food =  body.get("type_food", None)
    special_care = body.get("special_care", None)
    sterilized = body.get("sterilized", None)
    

    
    if not name or not species:
        return jsonify({"msg": "name and species fields are required"}), 400
    
    pet = db.session.execute(select(Pet).where(Pet.nie == nie)).scalar_one_or_none()
    if pet:
        return jsonify({"msg": "pet already exist"}), 409
    
    pet = Pet(name=body["name"],
                  species=body["species"],
                  has_nie=body["has_nie"],
                  sterilized=body["sterilized"]
                ) 
    
    db.session.add(pet)
    db.session.commit() 
    response_body = {
        "msg": "Pet added"
    }          
      
    return jsonify(response_body), 201

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
    pet.race = body.get("race", pet.race)
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
        .where( Pet.id == pet_id,)).scalar_one_or_none()
   
    if pet is None:
     return jsonify({"msg": "Pet not found"}), 404

   
    db.session.delete(pet)
    db.session.commit()


    return jsonify({"msg": "pet deleted"}), 200


@api.route("/sitter/<int:sitter_id>/pet/<int:pet_id>", methods=["POST"])
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
                sitter_id= sitter_id,
                pet_id= pet_id
                ) 
    
    db.session.add(care)
    db.session.commit() 
    response_body = {
        "msg": "Pet assigned to sitter"
    }          
      
    return jsonify(response_body), 201


@api.route("/sitter/<int:sitter_id>/pet/<int:pet_id>", methods=['DELETE'])
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
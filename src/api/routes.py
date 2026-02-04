"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Sitter
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
    
    sitter = db.session.execute(select(Sitter).where(Sitter.email == email)).scalar_one_or_none()
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
        "msg": "Created sitter"
    }          
      
    return jsonify(response_body), 201


@api.route('/sitters', methods=['GET'])
def get_sitters():

    sitters = db.session.execute(select(Sitter)).scalars().all()

    results_sitters = list(map(lambda personaje: personaje.serialize(), sitters))

    return jsonify(results_sitters), 200


@api.route('/sitters/<int:sitter_id>', methods=['GET'])
def get_sitter(sitter_id):

    sitter = db.session.get(Sitter, sitter_id )

    if sitter is None:
       return jsonify({"message": "Sitter not found"}), 404

    return jsonify(sitter.serialize()), 200

@api.route('/sitters/<int:sitter_id>', methods=['PUT'])
def put_sitter(sitter_id):

    body = request.get_json()
    if body is None:
        return jsonify({"message": "Request body is required"}), 400
    
    sitter = db.session.get(Sitter, sitter_id )
    if sitter is None:
       return jsonify({"message": "Sitter not found"}), 404
    
   

    sitter.name = body.get("name", sitter.name)
    sitter.last_name = body.get("last_name", sitter.last_name)
    sitter.email = body.get("email", sitter.email)
    sitter.password = body.get("password", sitter.password)
    sitter.confirm_password = body.get("confirm_password", sitter.confirm_password)
    sitter.phone = body.get("phone", sitter.phone)
    sitter.studies = body.get("studies", sitter.studies)
    sitter.studies_comment = body.get("studies_comment", sitter.studies_comment)
    sitter.address = body.get("address", sitter.address)
    sitter.is_active = body.get("is_active", sitter.is_active)

    db.session.commit()

    return jsonify({"msg": "Sitter updated successfully"}), 200

@api.route('/sitters/<int:sitter_id>', methods=['DELETE'])
def delete_sitter(sitter_id):


    sitter = db.session.execute(
        select(Sitter)
        .where( Sitter.id == sitter_id,)).scalar_one_or_none()
   
    if sitter is None:
     return jsonify({"msg": "Sitter not found"}), 404

   
    db.session.delete(sitter)
    db.session.commit()


    return jsonify({"msg": "Sitter deleted"}), 200


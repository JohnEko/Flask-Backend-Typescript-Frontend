from flask_restx import Resource, Namespace, fields
from flask import Flask, request, jsonify
from flask_jwt_extended import jwt_required
from config import DevConfig
from models import Student


student_ns=Namespace("student", description="This is a student namespace")


student_model = student_ns.model(
        "Student",
        {
          "id":fields.Integer(),
          "name":fields.String(),
          "course":fields.String()
    
        }

)

@student_ns.route('/hello')
class HelloResource(Resource):
    def get(self):
        return {"message": "Hello World"}


@student_ns.route('/student')
class StudentsResource(Resource):
    @student_ns.marshal_list_with(student_model)
    def get(self):
        """Get all students"""
        students=Student.query.all()

        return students

    @student_ns.marshal_with(student_model)
    @student_ns.expect(student_model)
    @jwt_required()
    def post(self):
        """Create post student"""
        data = request.get_json()
        reg_student = Student(
            name = data.get('name'),
            course = data.get("course")
            )

        reg_student.save()
        return reg_student,201

@student_ns.route('/student/<int:id>')
class StudentResource(Resource):
    @student_ns.marshal_with(student_model)
    def get(self,id):
        """Get each student by id"""
        student = Student.query.get_or_404(id)

        return student,200
    
    @student_ns.marshal_with(student_model)
    @jwt_required()
    def put(self,id):
        """Update student info"""
        update_student = Student.query.get_or_404(id)

        update_data = request.get_json()
        update_student.update(update_data.get('name'), update_data.get('course'))
       
        return update_student,200

    @student_ns.marshal_with(student_model)
    @jwt_required()
    def delete(self, id):
        """Delete student from db"""
        delete_student = Student.query.get_or_404(id)
        delete_student.delete()
       
        return delete_student
        
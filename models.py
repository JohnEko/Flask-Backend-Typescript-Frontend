from exts import db

"""
class Students:
    id:int primary key
    name:str
    course:str (text)

"""

class Student(db.Model):
    id=db.Column(db.Integer(),primary_key=True)
    name=db.Column(db.String(), nullable=False)
    course=db.Column(db.Text(), nullable=False)

    def __repr__(self): 
        return f'<Student {self.name}>'




"""
class User:
    id:int primary key
    name:str
    course:str (text)

"""
#Creating user model#
class User(db.Model):
    id=db.Column(db.Integer(),primary_key=True)
    username=db.Column(db.String(25), nullable=False, unique=True)
    email=db.Column(db.String(80), nullable=False)
    password=db.Column(db.Text(), nullable=False)

    def __repr__(self):

        return f"<User {self.username} >"
    


    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, name, course):
        self.name=name
        self.course=course

        db.session.commit()







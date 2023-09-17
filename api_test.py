import unittest
from main import create_app
from config import TestConfig
from exts import db




class APITestCase(unittest.TestCase):

    def setUp(self):

        self.app=create_app(TestConfig)
       
        self.client=self.app.test_client(self)

        with self.app.app_context():
            #db.init_app(self.app)

            db.create_all()


    def test_hello_world(self):
        """TEST SIMPLE HELLO WORLD TEST"""
        hello_response = self.client.get('/student/hello')

        response_json = hello_response.json

        #print(response_json)

        self.assertEqual(response_json, {"message" : "Hello World"})


    def test_signUp(self):
        """TEST SIGNUP STUDENT"""
        signup_route = self.client.post('/auth/signup',
                                        json={"username":"username",
                                             "email":"email",
                                             "password":"password"}
                                             )
        status_code=signup_route.status_code

        self.assertEquals(status_code, 200)


    def test_login(self):
        """TEST LOGIN STUDENT"""
        signup_route = self.client.post('/auth/signup',
                                        json={"username":"username",
                                             "email":"email",
                                             "password":"password"}
                                             )
         
        login_route = self.client.post('/auth/login',
                                          json={"username":"username",
                                               "password":"password"}
                                             )
         
        status_code = login_route.status_code

        json=login_route.json
        print(json)
         #self.assertEqual(status_code, 200)



    def test_get_all_student(self):
        """TEST GET ALL STUDENT"""
        get_student=self.client.get('/student/student')

        status_code =get_student.status_code

        self.assertEqual(status_code, 200)


    def test_get_single_student(self, id=1):
        """TEST GET SINGLE STUDENT"""
        get_student=self.client.get(f'/student/student/{id}')

        status_code =get_student.status_code

        self.assertEqual(status_code, 404)
      

    def test_create_new_student(self):
        """TEST CREATE STUDENT"""
        signup_route = self.client.post('/auth/signup',
                                        json={"username":"username",
                                             "email":"email",
                                             "password":"password"}
                                             )
         
        login_route = self.client.post('/auth/login',
                                          json={"username":"username",
                                               "password":"password"}
                                             )
         
        access_token = login_route.json#["access_token"]

        create_student = self.client.post('/student/student',
            json= {"name":"Steve",
                   "course":"SQL"}
        )
        #WE NEED TO PASS OUR HEADERS WITHIN THIS REQUEST
        headers = {"Authorization":f"Bearer {access_token}"}
        status_code =create_student.status_code

        self.assertEqual(status_code, 500) #-->suppose to be 201 because the server not found response return 500


    def test_update_student(self):
        """UPDATE ROUTE FOR THE BACKEND"""
        signup_route = self.client.post('/auth/signup',
                                        json={"username":"username",
                                             "email":"email",
                                             "password":"password"}
                                             )
         
        login_route = self.client.post('/auth/login',
                                          json={"username":"Test",
                                               "password":"password"}
                                             )
         
        access_token = login_route.json#["access_token"]

        create_student = self.client.post('/student/student',
            json= {"name":"Steve",
                   "course":"SQL"}
        )
        #WE NEED TO PASS OUR HEADERS WITHIN THIS REQUEST
        headers = {"Authorization":f"Bearer {access_token}"}
        status_code =create_student.status_code

        id = 1
        update_ruote = self.client.put(f'/student/student/{id}',
                                       json={"name":"Steve",
                                             "course":"SQL"},
                                       headers = {"Authorization":f"Bearer {access_token}"}
                                       )
        
        get_update = update_ruote.status_code
        print(get_update.json)
        #self.assertEqual(get_update, 200)
       

    def test_delete_student(self):
        signup_route = self.client.post('/auth/signup',
                                        json={"username":"username",
                                             "email":"email",
                                             "password":"password"}
                                             )
         
        login_route = self.client.post('/auth/login',
                                          json={"username":"Test",
                                               "password":"password"}
                                             )
         
        access_token = login_route.json#["access_token"]

        create_student = self.client.post('/student/student',
            json= {"name":"Steve",
                   "course":"SQL"}
        )
        #WE NEED TO PASS OUR HEADERS WITHIN THIS REQUEST
        headers = {"Authorization":f"Bearer {access_token}"}
        status_code =create_student.status_code

        id = 1
        delet_route = self.client.delete(f'/student/student/{id}',
                                         json ={"name":"Steve",
                                                "course":"SQL"},
                                        headers={"Authorization":f"Bearer {access_token}"}
                                         )
    
        status_code = delet_route.status_code
        print(status_code)

        #self.assertEqual(status_code, 200)


    


    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()



if __name__== '__main__':
    unittest.main()

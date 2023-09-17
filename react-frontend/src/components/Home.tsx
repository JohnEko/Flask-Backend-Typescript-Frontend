import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Modal, Form, Button} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import { useAuth } from '../auth'
import Student from './Student'
// import CreateStudentPage from './CreateStudent'


const LoggeInHome =()=>{
const[student, setStudent] = useState([]);
const[show, setShow] =useState(false);
const{register, watch, handleSubmit, reset, setValue, formState: {errors} } = useForm();
const[StudentId, setStudentId]=useState(0);


// fetching the student information from the API backend
useEffect(
    ()=>{
        fetch('/student/student')
        .then(res=>res.json())
        .then(data=>{
            // console.log(data)
            setStudent(data)
        
        })
        .catch(err=>console.log(err))
    }, []
);

// Function to get the student from API AND DELETE THEM AND UPDATE THE SERVER
const getAllStudent=()=>{
    fetch('/student/student')
    .then(res=>res.json())
    .then(data=>{
        // console.log(data)
        setStudent(data)
    
    })
    .catch(err=>console.log(err))
}


const closeModal=()=>{
    setShow(false)

}
// Getting the student id information
const showModal=(id:any)=>{
    setShow(true)
    setStudentId(id)
    

    student.map(
        (student:any)=>{
            if(student.id==id){
                setValue('title', student.title)
                setValue('description', student.description)
                // console.log(student)
            }
        }
    )
    

}
// Updating the student data
let token = localStorage.getItem('REACT_TOKEN_AUTH_KEY')as string;
console.log(token)

const updateStudent=(data:any)=>{
    console.log(data)
//    this helps you to access your token from local storage and we can use
// the fatech function to send the data to our API
   

    const requestOption={
        method : 'PUT',
        header:{
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${JSON.parse(token)}`
        },
        body:JSON.stringify(data)
    }
    fetch('/student/student/${studentId}', requestOption)
    .then(res=>res.json())
    .then(data=>{console.log(data)
        // to reload the page when an update take place
        const reload = window.location.reload()
        console.log(reload) //check it later
        
    })
    .catch(err=>console.log(err))


    
}
// Deleting from the server AND UPDATE THE SERVER INSTANTLY

const deleteStudent = (id:any)=>{
    // console.log(id)
    const requestOption={
        method : 'DELETE',
        header:{
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${JSON.parse(token)}`
        },
       
    }
    fetch('/student/student/${Iid}', requestOption)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        getAllStudent()
    
    })

    .catch(err=>console.log(err))
    
}

    return(
        <div className='student container'>
            <Modal
                show = {show}
                size = "lg"
                onHide = {closeModal}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>
                        Student record Updated
                    </Modal.Title>
                    <Modal.Body>
                    <form>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text"
                     {...register('title',{required:true, maxLength:25})} 
                     />
                     {errors.title && <p style={{color:'red'}}>
                        <small>Title is Require</small></p>}
                    {errors.username?.type === "maxLength" && <p style={{color:'red'}}>
                        <small>Title should not be more than 25 characters</small></p>}


                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="texteraa"
                    {...register('description',{required:true, maxLength:255})} 
                     />
                </Form.Group>
                {errors.description && <p style={{color:'red'}}>
                        <small>dDescription is Require</small></p>}
                    {errors.username?.type === "maxLength" && <p style={{color:'red'}}>
                        <small>Description should not be more than 255 characters</small></p>}

                
                <br/>

                <Form.Group>
                    <Button variant='primary' onClick={handleSubmit(updateStudent)}>Save</Button>

                </Form.Group>




            </form>

                    </Modal.Body>

                  </Modal.Header>

            </Modal>
            <h1>Student portal</h1>
            {
                student.map(
                    (student:any, index)=>(
                        <Student title={student}
                        key={index}
                         description={student}
                         onDelete={()=>{deleteStudent(student.id)}}
                        onClick={()=>{showModal(student.id)}}
                        
                        />
                      
                       
                        
                    )
                )
            }

        </div>
    )
}




const LoggedOutHome =()=>{
    return(
        <div className='home'>
            <h1 className='heading'> Student Portal</h1>
            <Link to='/signup' className="btn btn-primary btn-lg">Get Started</Link>

        </div>
    )
}

const HomePage=({LoggeInHome, LoggedOutHome} : {LoggeInHome:any, LoggedOutHome:any})=>{
    const [logged]=useAuth()
    return(
        <div>
            {logged?<LoggeInHome/>:<LoggedOutHome/>}
        </div>
    )


}

export default HomePage
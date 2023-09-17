import React from 'react'
import { Form, Button } from 'react-bootstrap'
import {useForm} from 'react-hook-form'


const CreateStudentPage=()=>{
const {register, watch, handleSubmit, reset, formState: {errors} } = useForm();

const createStudent=(data:any)=>{
    console.log(data)

    const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY') as string;
    console.log(token)



    const requestOption={
        method : 'POST',
        header:{
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${JSON.parse(token)}`
        },
        body:JSON.stringify(data)
    }
    fetch('/student/student', requestOption)
    .then(res=>res.json())
    .then(data=>{reset(data)})
    .catch(err=>console.log(err))
}

    return(
        <div className='container'>
            <h1>Create Student</h1>
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
                    <Button variant='primary' onClick={handleSubmit(createStudent)}>Save</Button>

                </Form.Group>




            </form>

        </div>

    )


}

export default CreateStudentPage
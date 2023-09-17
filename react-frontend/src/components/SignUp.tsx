import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert';
import {Form, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {useForm} from 'react-hook-form'




function SignUp (){
    const {register, watch, handleSubmit, reset, formState: {errors} } = useForm();

    const [show, setShow]= useState(true)
    const[ServerResponse, setServerResponse]=useState('')

    const submitForm =(data:any)=>{
        if (data.password == data.confirmPassword){
            
            const body={
                username:data.username,
                email:data.email,
                password:data.password
            }

            const requestOption = {
                method: "POST",
                headers: {
                    'content-type':'application/json'
                },
                body:JSON.stringify(body)
            }
            fetch('/auth/signup', requestOption)
            .then(response=>response.json())
            .then(data=>{
                console.log(data)
                setServerResponse(data.message)
                console.log(ServerResponse)

                setShow(true)
            })
            .catch(err=>console.log(err))
            reset()

        }
        else {
            alert("Give a match Password");
        }
  
    }
    



    return(
        <div className='container'>
            <div className='form'>
                {show?
                <>
                <Alert variant="Success" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>User created successfully</Alert.Heading>
                    <p>
                    {ServerResponse}
                    </p>
                
                </Alert>
                <h1>Sign Up</h1>
               
                </>
                :
                <h1>Sign Up</h1>
                }
                <form>
                    <Form.Group>
                        
                        <Form.Label>Username</Form.Label>
                        <Form.Control type='text' 
                         placeholder="Username"
                         {...register("username", {required: true,  minLength:7, maxLength:25})}
                         />
                         
                        { errors.username && <p style={{color:"red"}}><small>Username is required</small></p>}
                       
                        {errors.Username?.type=="maxLength" && <p style={{color:"red"}}><small>Max Username is 25</small></p>}
                    </Form.Group>
                    <br/>
                    
                    <Form.Group>
                   
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='text' 
                        placeholder='Email'
                        {...register("email",{required:true,  minLength:8, maxLength:25})}
                        />
            
                        { errors.email && <p style={{color:"red"}}><small>Email is required</small></p>}
                        
                        {errors.email?.type=='maxLength' && <p style={{color:"red"}}><small>Max character is 80</small></p>}
                    </Form.Group>
                    
                    <br/>
                    <Form.Group>
                   
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' 
                         placeholder='Password'
                         {...register("password",{required:true,  minLength:8, maxLength:15})}
                         />
                         
                         { errors.password && <p style={{color:"red"}}><small>Password is required</small></p>}
                      
                         {errors.password?.type=='minLength' && <p style={{color:"red"}}><small>Min Password is 8</small></p>}
                    </Form.Group>
                   
                    <br/>
                    <Form.Group>
                        <Form.Label>ConfirmPassword</Form.Label>
                        <Form.Control type='password' 
                         placeholder='Confirm Password'
                         {...register("ConfirmPassword",{required:true,  minLength:7, maxLength:15})}
                         />
                       
                         { errors.ConfirmPassword && <p style={{color:"red"}}><small>ConfirmPassword is required</small></p>}
                         
                         {errors.ConfirmPassword?.type=='minLength' && <p style={{color:"red"}}><small>Min character is 8</small></p>}
                    </Form.Group>
                    
                    <br/>

                    <Form.Group>
                        <Button as='sub' variant='primary' onClick={handleSubmit(submitForm)}>SignUp</Button>
                    </Form.Group>
                    <Form.Group>
                        <small>This Account exist <Link to='/login'>Login to your Account</Link></small>
                    </Form.Group>


                   

                </form>

            </div>
    

        </div>



    )


}

export default SignUp
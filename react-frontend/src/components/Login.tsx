import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { login } from '../auth'
import { useNavigate} from 'react-router-dom'

function LoginPage (){

    const {register, handleSubmit, reset, formState:{errors}} = useForm()
    
    const navigate =useNavigate()
   

    const LoginSubmit=(data:any)=>{
        
        console.log(data) 

        const requestOption={
            method :"POST",
            headers:{
                'content-type' : 'application/json'
            },
            body:JSON.stringify(data)
            
        }
        fetch('/auth/login', requestOption)
        .then(res=>res.json())
        .then(data=>{console.log(data.access_token)
            login(data.access_token)

            navigate('/')
        })


        reset()
    }
    return(
        <div className='loginpage'>
            <h1>Login Page</h1>
            <form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type='text' 
                         placeholder="Username"
                         {...register('username',{required:true, maxLength:25})}
                         />
                    </Form.Group>
                    {errors.username && <p style={{color:'red'}}>
                        <small>Username is Require</small></p>}
                    {errors.username?.type === "maxLength" && <p style={{color:'red'}}>
                        <small>Username should not be more than 25 characters</small></p>}

                    <br/>
        
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' 
                         placeholder='Password'
                         {...register('password',{required:true, maxLength:8})}
                         />
                    </Form.Group>
                    {errors.password && <p style={{color:'red'}}>
                        <small>Password is Require</small></p>}
                    {errors.password?.type === "maxLength" && <p style={{color:'red'}}>
                        <small>Password should not be less than 8 characters</small></p>}
                    <br/>
                   
                    <Form.Group>
                        <Button as='sub' variant='primary' onClick={handleSubmit(LoginSubmit)}>Login</Button>
                    </Form.Group>

                    <Form.Group>
                        <small>You do not have an account <Link to='/signup'>Login</Link></small>
                    </Form.Group>

                   

                </form>

            </div>
    



    )


}

export default LoginPage

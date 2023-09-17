import 'bootstrap/dist/css/bootstrap.min.css'
//import React ,{ useEffect, useState } from 'react'
import React from 'react'
// import './App.css'
import './styles/main.css'
import Navbar from './components/Navbars'
import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom'
import HomePage from './components/Home'
import LoginPage from './components/Login'
import SignUpPage from './components/SignUp'
import Create_Student from './components/CreateStudent'

function App(){

  return(
    <Router>
      <div className=''>
        <Navbar/>
        <Routes>
            <Route path="/create_student" element={<Create_Student />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/signup" element={<SignUpPage />}></Route>
            <Route path="/" element={<HomePage />} ></Route>

        </Routes>
      </div>
    </Router>
  )


}

export default App





  //const [message, setMessage] = useState([{}]);
//   //Get the data from the webpage or API
//   useEffect(()=>{
//           fetch('/student/hello')
//           .then(response=>response.json())
//           .then(data => {
//                   console.log(data) //Get our data
//                   setMessage(data.message) //set our data  
//                   }
//           ).catch(err=>console.log(err))
//       },[])
//   // the message is the state variable and setMessage is the message that we get from the state variables
//   const [message,setMessage]=useState([]);
//   return (
//     //show the message on the web page
//       <div className='container'>
//          <h1>{message}</h1>
//       </div>
//   )
// }
// export default App

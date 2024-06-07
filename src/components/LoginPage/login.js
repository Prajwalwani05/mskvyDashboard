import React, {useState} from 'react'
import axios from 'axios' 
import { useNavigate } from 'react-router-dom'
import Loader from "../Common/Loader/loader";
import bgVideo from '../../images/bgBack.mp4';

const Login = () => {

    const navigate = useNavigate();
    const [user , setUser] = useState({
        username : "",
        password : ""
    })
    const [error , setError] = useState(null);
    const [success , setSuccess] = useState(null);
    const [loading , setLoading] = useState(false);

    function addUser(e) {
        e.preventDefault();
        
        if(!user.username || !user.password){
            setError("Please fill all the fields!");
            setSuccess(null);
            return;
        }
        setLoading(true);
        axios.post('/api/DistrictWiseSummary/login', {
            LOGIN_ID: user.username,
            PASSWORD: user.password
        } , 
        {
            headers: { 'Content-Type': 'application/json' }
        }
        )
        .then((response) => {
            // Check if response status is 200
            if (response.status === 200) {
                // Data is now available here
                console.log("DATA>>>", response.data);
                setSuccess("Login successful!");
                setError(null);
                setTimeout(() => {
                    navigate('/home');
                }, 200);
                // Redirect to another page after successful login
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch((error) => {
            console.log(error);
            setError(`Invalid credentials! 🥺`);
            setSuccess(null);
        })
        .finally(()=>{
            setLoading(false);
        })
        
    }
    
  return (
    <>
    {
        loading ? <Loader></Loader>
        :
        <>
    <div className="signin">
        
        <div className="container">
        <h3>Welcome back!👋</h3>
        <h2>Sign in to your account</h2>
        <br />
        <form onSubmit={addUser}>
            <label htmlFor="username">Login Id</label>
            <input type="text" name="username" id="username" onChange={(e)=>{setUser({...user , username : e.target.value})}} />

            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={(e)=>{setUser({...user , password : e.target.value})}} />
            <div className='btnDiv'>
            <button className="submitBtn" type="submit">Continue</button>
            </div>
        </form>
        {setError && <h4 className="error">{error}</h4>}
        {setSuccess && <h4 className="success">{success}</h4>}
        </div>
  </div>
  <div className='video-background'>
  {/* <video autoPlay loop muted>
      <source src={bgVideo}  type='video/mp4'/>
      Your browser does not support the video tag.
  </video> */}
</div>
        </>
         
    }
    </>
  )
}

export default Login;
import React , { useRef , useEffect , useState }  from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link  } from 'react-router-dom' 
import img3 from '../img3.jpg'; 
import '../Login.css';
    
const Login = () => { 

    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const bouttonRef = useRef(null)

    const data = { email : '' ,  password : '' }

    const [loginData, setloginData] = useState(data); 

    useEffect(() => {
        emailRef.current.focus();
    }, [] )

    const onFirstKey = (e) => {
        if ( e.key === 'Enter' ) {
            passwordRef.current.focus() ; 
        }

    }

    const onSecondKey = (e) => {
        if ( e.key === 'Enter'  ) {
            bouttonRef.current.focus() ; 
        }

    }

    const handleChange = (e) => {   
        setloginData({ ...loginData , [e.target.id] : e.target.value }); 
    } 

    const { email , password } = loginData ; 

    console.log(email);
    console.log(password);

    const btn =  email === 'admin' && password === 'admin'
     ? <Link to ="/employees" ref={bouttonRef}><button  type="button" className="btn btn-outline-warning btn-lg">Sign in</button></Link> : 
       <Link to ="/Calendar"  ref={bouttonRef}><button  type="button" className="btn btn-outline-warning btn-lg">Sign in</button></Link> ; 
   

    return (
            <div className="sign-up">
                
                    <div className="form-sign-up">
                    
                    <h2> Welcome back,</h2> 

                    <div className="inputBox">
                            <label htmlFor="email"><h4>email</h4></label>
                            <input className="input" id="email" value={email}  ref={emailRef} 
                            onChange={handleChange} onKeyDown ={onFirstKey}  type="email"  required 
                            />      
                    </div>

                    <div className="inputBox">
                        <label htmlFor="password"><h4>password</h4></label>
                        <input  className="input" id="password" value={password}  ref={passwordRef} 
                        onChange={handleChange} onKeyDown ={onSecondKey}  type="password" required 
                        />   
                    </div>


                    <div>
                            {btn}
                    </div>

                </div>

                <div>
                    <img className="img3" src = {img3} alt = "" />
                </div>

            </div>

 )
}

export default Login

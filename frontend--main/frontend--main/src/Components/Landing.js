import React  from 'react' 
import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <div className ="Landing">
  
            <h1 className="big-Title">Welcome to KaisenSN</h1>

            <div className ="div1">

                <Link to ="/Login" >
                    <button type="button" className="btn btn-outline-warning btn-lg">Login</button>
                </Link>
      
            </div>

        </div>
    )
}

export default Landing

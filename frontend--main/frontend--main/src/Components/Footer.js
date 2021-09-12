import React from 'react'
import { BsPhone } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";

function Footer() {
    return (

        <div className="bg-Footer">
        
                    <p className ="icon"><BsPhone/>         +33 (0) 637191797  </p>     
                    <p className ="icone"><AiOutlineHome/>   14 rue des ormeaux 75029   </p>  
                    <p className ="icone"><AiOutlineMail/>   contacte@kaizensn.com  </p>
 
        </div>
        
    )
}

export default Footer

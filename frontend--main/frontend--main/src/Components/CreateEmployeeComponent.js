import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'
import img3 from '../img3.jpg'

export default class CreateEmployeeComponent extends Component {

    constructor(props) {
        super(props)

        this.firstRef  = React.createRef(null);
        this.lastRef  = React.createRef(null);
        this.emailRef = React.createRef(null);
        this.passwordRef = React.createRef(null);
        this.password2Ref = React.createRef(null);
        this.buttonRef = React.createRef(null);
        
        this.state = {
            id: this.props.match.params.id, // to get id from the route
            firstName: '' ,
            lastName: '' , 
            emailId: ''  ,
            password : '' , 
            confirmPassword : '' 

        }
    }

    componentDidMount() {

        this.firstRef.current.focus() ;

        if(this.state.id === '_add'){
            return
        }

        else {
            EmployeeService.getEmployeeById(this.state.id).then((res) => {
                let employee= res.data;
                this.setState({
                    firstName : employee.firstName ,
                    lastName : employee.lastName , 
                    emailId : employee.emailId , 
                    password : employee.password
                });
            });    
        }
    }
    
    changeFirstNameHandler = (e) => {
        this.setState({ firstName : e.target.value })
    }
    changeLastNameHandler = (e) => {
        this.setState({ lastName : e.target.value })
    }
    changeEmailHandler = (e) => {
        this.setState({ emailId  : e.target.value })
    }
    changePasswordHandler = (e) => {
        this.setState({ password  : e.target.value })
    }
    changeConfirmPasswordHandler = (e) => {
        this.setState({ confirmPassword  : e.target.value })
    }

    saveOrUpdateEmployee = () => {

        let employee = { firstName : this.state.firstName  , lastName : this.state.lastName , emailId : this.state.emailId , password : this.state.password  } ; 

        if (this.state.id === '_add' ){                    
            EmployeeService.createEmployee(employee).then( res =>{
                this.props.history.push('/employees'); 
            });

        }else{
            EmployeeService.updateEmployee(employee , this.state.id).then((res) => {
                this.props.history.push('/employees');
        });

        }
       
    }

    onFirstKey = (e) => {
                this.setState({
                    reef : !this.state.reef
                });
                if ( e.key === 'Enter'  ) {
                    this.lastRef.current.focus() ; 
                    

                }
            }

    onSecondKey = (e) => {
            if ( e.key === 'Enter'  ) {
                this.emailRef.current.focus() ; 
            }
        }
    onThirdKey = (e) => {
            if ( e.key === 'Enter'  ) {
                this.passwordRef.current.focus() ; 
            }
        }

    onFourthKey = (e) => {
            if ( e.key === 'Enter'  ) {
                this.password2Ref.current.focus() ; 
            }
        }
    
    getTitle(){
            if(this.state.id === '_add' ){
                return <h3 className="text-center">Add Employee</h3>
            } else {
                return <h3 className="text-center">Update Employee</h3>
            }
        }

    //cancel = () => {     
        //this.props.history.push('/employees');
    //}

    render() {

        return (
            <div className="sign-up">
                <div className="form-sign-up">
                              
                            { this.getTitle() }
                
                                <form>

                                    <div className="inputBox">
                                        <label htmlFor="firstName" ><h4>First Name:</h4>  </label>
                                        <input  className="form-control"  placeholder="First Name"
                                        onKeyDown={this.onFirstKey} value={this.state.firstName}
                                        ref={this.firstRef} onChange={this.changeFirstNameHandler} />
                                    </div>

                                    <div className="inputBox">
                                        <label><h4>Last Name:</h4></label>
                                        <input  className="form-control" placeholder="Last Name"
                                         onKeyDown={this.onSecondKey} value={this.state.lastName}  
                                         ref={this.lastRef} onChange={this.changeLastNameHandler} />
                                    </div>

                                    <div className="inputBox">
                                        <label><h4>Email</h4></label>
                                        <input className="form-control" placeholder="email"
                                        onKeyDown={this.onThirdKey} value={this.state.emailId}
                                        ref={this.emailRef} onChange={this.changeEmailHandler} />
                                    </div>

                                    <div className="inputBox">
                                        <label><h4>Password</h4></label>
                                        <input className="form-control" placeholder="password" 
                                        onKeyDown={this.onFourthKey}  value={this.state.password}
                                        ref={this.passwordRef} onChange={this.changePasswordHandler} />
                                    </div>

                                    <div className="inputBox">
                                        <label><h4>Confirm password</h4></label>
                                        <input className="form-control"  placeholder="ConfirmPassword"
                                        value={this.state.confirmPassword} 
                                        ref={this.password2Ref} onChange={this.changeConfirmPasswordHandler} />
                                    </div>
                                    
                                    { this.state.firstName === '' || this.state.lastName === '' || this.state.emailId === '' || this.state.password === '' || this.state.password !== this.state.confirmPassword  ? 
                                        <button type="button" onClick={e => e.preventDefault()} className="btn btn-outline-warning" disabled
                                        > Save </button> : 
                                        <button type="button" className="btn btn-outline-warning" 
                                        onClick={this.saveOrUpdateEmployee} > Save </button> }

                                    {/*<button  className="btn btn-outline-danger" onClick={this.cancel} style={{marginLeft : "10px"}}>cancel</button>*/}

                                </form>   
                </div>
                <div>
                        <img className="img3" src = {img3} alt = "" />
                </div>               
            </div>
        )
    }
}



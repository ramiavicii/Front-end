import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'

export default class EmployeesComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            employees : []
        }
    }
    componentDidMount() {

        EmployeeService.getEmployee().then((res) => {

            this.setState({ employees : res.data })
        });      
    }

    addEmployee = () =>{
        this.props.history.push('/add-employee/_add');
    }

    editEmployee = (id) => {
        this.props.history.push(`/add-employee/${id}`);

    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then(res => {
            this.setState({employees : this.state.employees.filter(employee => employee.id !== id )});
        })
    }
    
    
    render() {
        return (
            <div>
                <h2 className="text-center">Employees List</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addEmployee}>Add Employee</button>

                </div>

                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> Employee First Name</th>
                                <th> Employee Last Name </th> 
                                <th> Employee Email Id  </th>
                                <th> password </th>
                                <th> Actions </th>      
                            </tr>
                        </thead>
                        <tbody>

                            {
                                this.state.employees.map((employee) => (
                                    <tr key = {employee.id}>
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.emailId}</td>
                                        <td>{employee.password}</td>
                                        <td>
                                            <button onClick={() => this.editEmployee(employee.id)} className="btn btn-info">Update</button>
                                            <button style={{marginLeft: "10px"}} onClick={() => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete</button>
                                        </td>  
                                    </tr>)
                                )
                            }

                        </tbody>

                    </table>

                </div>
                
            </div>
        )
    }
}

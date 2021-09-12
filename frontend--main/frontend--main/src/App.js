import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './Components/Landing';
import Footer from  './Components/Footer' ; 
import Login from   './Components/Login';
import Calendar from './Components/Calendar';
import EmployeesComponent from './Components/EmployeesComponent';
import CreateEmployeeComponent from './Components/CreateEmployeeComponent';
import { Route , BrowserRouter as Router } from 'react-router-dom' ; 
import './App.css';

function App() {

  return (

    <Router>

      <Route exact path="/" component={Landing}/>
      <Route exact path="/" component={Footer} />
      <Route path="/Login" component ={Login}  />
      <Route path="/Calendar" component ={Calendar } />
      <Route path="/employees" component ={EmployeesComponent }  />
      <Route path="/add-employee/:id" component ={CreateEmployeeComponent }  />


    </Router>
  );
}

export default App;  

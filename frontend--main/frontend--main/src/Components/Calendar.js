import React, { Component } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { MdError } from 'react-icons/md';
import { BsFillPlusCircleFill} from 'react-icons/bs'
import 'bootstrap/dist/css/bootstrap.min.css';
import causesService from '../services/CausesService'
import MissionService from '../services/MissionService'
import moment from 'moment'
import './Calendar.css' 

//var check = moment( 'YYYY/MM/DD');
class Calendar extends Component {

    state = {
        dateContext : moment() , 
        today : moment() , 
        showMonthPopup : false ,
        showYearNav : false ,  
        Ligne : [] , 
        cause : '' , 
        dateRate : '' ,
        NbrJrsTravaillés : 0 ,
        etat : false , 
        endDate : '' , 
        startDate : '' , 
        nameMission : '' , 
        ListMission : [] 
    }

    weekdays = moment.weekdays() ; // [ "sunday" , "monday " ... , "saturday"]
    weekdayShort = moment.weekdaysShort() ;  // [ "sun" , "mon " ... , "sat"]
    months = moment.months() ;  // ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]


    year = () => { return this.state.dateContext.format ("Y") ;} // retourne l'année actuelle 
    month = () => { return this.state.dateContext.format("MMMM") ;} // retourne le moins actuel 
    daysInMonth = () => { return this.state.dateContext.daysInMonth() ;} // retourne le nombre de jours dans le moins actuel . 
    currentDate = () => { return this.state.dateContext.get("date") ;}
    currentDay = () => { return this.state.dateContext.format("D") ;} // retourne le jour actuel 

    
    // firstDay of the month return l'une des 7 valeurs 0,1,3,4,5,6, ( 0 = sunday , 1 = monday ... , 6 = saturday )

    
    firstDayOfMonth = () => {
        let dateContext = this.state.dateContext ;  
        let firstDay = moment(dateContext).startOf('month').format('d') ; 
        return firstDay ;
    }

    // changer month of date 
    setMonth = (month) => {
        let monthNo = this.months.indexOf(month); 
        let dateContext = Object.assign({} , this.state.dateContext ) ; 
        dateContext = moment(dateContext).set("month" , monthNo ) ; 

        this.setState ({
            dateContext : dateContext 
        })

    }
    // donner à la date le moins precedent ! 
    prevMonth = () => {
        let dateContext = Object.assign ( {} , this.state.dateContext ) ; 
        dateContext = moment(dateContext).subtract(1,"month" ) ; 
        this.setState ({
            dateContext : dateContext 
        }); 
        this.props.onPrevMonth && this.props.onPrevMonth() ; 
    }
    // donner à la date le moins suivant ! 
    nextMonth = () => {
        let dateContext = Object.assign ({} , this.state.dateContext ); 
        dateContext = moment(dateContext).add(1,"month" ) ; 
        this.setState ({
            dateContext : dateContext 
        });
        this.props.onNextMonth && this.props.onNextMonth() ; 
    }

    onSelectChange = ( e , data ) => { 
        this.setMonth(data); 
        this.props.onMonthChange && this.props.onMonthChange() ; 
    }

    SelectedList = (props) => {
        let popup = props.data.map((data) => {
            return (
                <div key ={data}>
                    <a href="#" onClick={(e) => {this.onSelectChange ( e, data ) }}>
                        {data}
                    </a> 
                </div>
            ); 

        }) ; 

        return (
            <div className="month-popup">
                {popup}
            </div>
        )
    }

    onChangeMonth = (e, month ) => {

        this.setState ({
            showMonthPopup : !this.state.showMonthPopup 
        });  
    }

    MonthNav = () => {
        return ( 
            <span className ="label-month"
            onClick={(e) => {this.onChangeMonth(e,this.month())}}>
                {this.month()}
                {this.state.showMonthPopup && <this.SelectedList data={this.months}/> }
            </span> 
        )
    }

    showYearEditor = () => {
        this.setState({
            showYearNav : true 
        }); 
    }

    setYear = (year) => {
        let dateContext = Object.assign({} , this.state.dateContext) ; 
        dateContext = moment(dateContext).set("year" , year) ; 
        this.setState ({
            dateContext : dateContext 
        })
    }

    onYearChange = (e) => {
        this.setYear(e.target.value); 
        this.props.onYearChange && this.props.onYearChange(e, e.target.value );
    }
    onKeyUpYear = (e) => {
        if (e.which === 13 || e.which === 27 ){
            this.setYear(e.target.value) ; 
            this.setState({
                showYearNav : false 
            });
        }
    }

    YearNav = () => {
        return (
            this.state.showYearNav ? 
            <input
                defaultValue = {this.year()}
                className ="editor-year"
                ref={(yearInput) => { this.yearInput = yearInput }}
                onKeyUp = {(e) => this.onKeyUpYear(e)}
                onChange = {(e) => this.onYearChange(e)}
                type="number"
                placeholder="year" />
            :
            <span className="label-year" onDoubleClick={(e) => {this.showYearEditor()}}>
                {this.year()}
            </span>
        )
    }

    addRow = ( e , day ) => {

        var month = this.state.dateContext.format('M');
        var year  = this.state.dateContext.format('YYYY');
        alert( `le ${day}` );    
        var Ligne = this.state.Ligne
        Ligne.push( `le ${day}/${month}/${year} `) 
        this.setState({Ligne: Ligne})

        this.setState({
            NbrJrsTravaillés : this.state.NbrJrsTravaillés + 1 
        }) ;  
    }

    handleChangeCause = (e) =>{
        this.setState({
            cause : e.target.value 
        });
    }

    handleChangeDate = (e) => {
        this.setState({
            dateRate : e.target.value
        });
        //console.log(this.state.dateRate);
    }

    saveCauses = (e) => {

        let cause = {causes : this.state.cause , joursRatés : this.state.dateRate };
            causesService.createCause(cause).then(res =>{
            });
    }

    handleMission = () => {
        
        //let Mission = { endDate : this.state.endDate  , nameMission : this.state.nameMission , startDate : this.state.startDate } ; 
        let Mission = {} ; 
        this.state.ListMission.push(Mission); 
        this.setState({ListMission : this.state.ListMission});
    }

    handleChangeNameMission = (e) => {
        this.setState ({
            nameMission : e.target.value
        }); 
    }

    handleChangeStartDate = (e) => {
        this.setState ({
            startDate : e.target.value
        }); 
    }

    handleChangeEndDate = (e) => {

        this.setState ({
            endDate : e.target.value
        }); 
    }

    saveMission = (e) => {

        let Mission = { endDate : this.state.endDate  , nameMission : this.state.nameMission , startDate : this.state.startDate } ; 
            MissionService.createMisssion(Mission).then(res =>{
            });
    }

    render(){

        // Map the weekdays i.e Sun ? Mon , tue etc as <td> 
        let weekdays = this.weekdayShort.map((day) => {
            return (
                <td key={day} className="week-day" >{day}</td>
            )
        }) ;
        // c 'est une liste de ( <td></td>) qui renferme une chaine vide sa longeur est de 0 jusqu'a le first day of month 
        let blanks = [] ; 
        for ( let i = 0 ; i < this.firstDayOfMonth() ; i++ ) {
            blanks.push(<td key={ i * 80 } className="emptySlot"> {""} </td>)
        }
        
        let daysInMonth = [] ; 
        for( let d=1 ; d <= this.daysInMonth() ; d++ ){
            let className =  (d == this.currentDay() ? "day current-day" : "day"); 
            daysInMonth.push(
                <td key={d} className={className} >
                    <span  onClick={(e) => this.addRow (e, d)} > {d} </span>
                </td>
            ) ; 
        } 

        var totalSlots = [ ... blanks, ... daysInMonth] ; 
        let rows = [] ; 
        let cells = [] ; 

        totalSlots.forEach(( row , i ) => {
            if (i % 7 !== 0) {
                cells.push(row) ;      
            } else { 
                let insertRow = cells.slice() ; 
                rows.push(insertRow); 
                cells = [] ;
                cells.push(row) ; 

            } 
            if ( i === totalSlots.length - 1) {
                let insertRow = cells.slice() ; 
                rows.push(insertRow) ; 
            }
        }); 

        let trElems = rows.map(( d , i ) => {
            return (
                <tr key = { i*100 }>
                    {d}
                </tr>
            ); 
        })

        var month = this.state.dateContext.format('M');

        const resultat = this.state.etat === true && 
        <p className="bilan"> 
        {`Merci d'avoir valider le tableau du ${month} éme moins . parmis ${this.state.dateContext.daysInMonth()}
         jours vous avez ratez ${this.state.NbrJrsTravaillés} 
        jours  vous receverez un mail dans quelques instants !  `}
        </p>

        return (
            <div>   
                
            <div className="calendar-container" style={{position : "relative" , margin : "50px auto " , width :"800px"  }}>
                <table className="calendar" >
                    <thead>
                        <tr className ="calendar-header " >
                            <td >  
                                <i >
                                    < AiOutlineArrowLeft onClick={ (e) => {this.prevMonth()}} />
                                </i>
                            </td>
                            <td colSpan="5">
                                <this.MonthNav/>
                                {" "} 
                                <this.YearNav/>   
                            </td>
                            <td >                                                
                                <i>                      
                                    <AiOutlineArrowRight onClick={(e) => {this.nextMonth()}} />
                                </i>
                            </td>
                        </tr>
                    </thead> 
                    <tbody>
                        <tr>
                        {weekdays}
                        </tr>
                        {trElems}
                    </tbody>
                </table>
            </div> 
            <div>
            <div className="rque">
                <MdError  style = {{ color :"red"  , fontSize:"30px" , paddingLeft : "10px"}} />
                <p style = {{ color :"#ff9900" , paddingLeft : "30px"   }}> 
                priére de faire l'enregistrement ligne par ligne  
                </p>  
                <MdError  style = {{ color :"red"  , fontSize:"30px" , paddingLeft : "10px"}} />
            </div>
           
            
            <table className="table-warning table table-hover">
                <thead>
                    <tr>
                        <th scope="col">les jours ratés </th>
                        <th scope="col" colSpan="3" >les causes d'abcense </th>
                        <th scope="col"> enregistrer le jours ratés</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.Ligne.map((r) =>(
             
                        <tr key={r} >
                            <th><input className="inputCss" value={r} onChange={this.handleChangeDate} /></th>
                            <th><input className="inputCss" onChange={this.handleChangeCause}/></th>
                            <th colSpan="3" > 
                                <button className="btn btn-warning inputCss" onClick={this.saveCauses} >Save</button>
                            </th>
                        </tr>
                    ))}

                </tbody>
            </table>          
            </div>
            <button  type="button" style={{display: "block" , 
                    margin : "auto"}} className=" position-relative btn btn-warning"
                    onClick={() => {this.setState({ etat : true  }) }} >Finish
            </button>

            {resultat}

            <button  type="button" style={{ marginLeft : "20px"  }} className=" position-relative btn btn-warning"
                onClick={this.handleMission} ><BsFillPlusCircleFill style={{ marginRight : "10px"}}/> Add Mission </button>

            <table className="table-warning table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Name Mission </th>
                        <th scope="col">start Date  </th>
                        <th scope="col"> end Date </th>
                        <th scope="col"> saving mission </th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.ListMission.map((M) =>(
             
                        <tr key={M} >
                            <th><input className="inputCss" onChange={this.handleChangeNameMission} /></th>
                            <th><input className="inputCss" onChange={this.handleChangeStartDate}/></th>
                            <th><input className="inputCss" onChange={this.handleChangeEndDate}/></th>
                            <th  > 
                                <button className="btn btn-warning inputCss" onClick={this.saveMission} >Save</button>
                            </th>
                        </tr>
                    ))}

                </tbody>
            </table>          
            </div>

        )
    }
}

export default Calendar


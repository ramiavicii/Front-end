import axios from "axios";

const CAUSES_API_BASE_URL = "http://localhost:8080/api/v1"; 

class CausesService { 

    getCause() {
        return axios.get(CAUSES_API_BASE_URL + "/getCauses") ; 
    }
    createCause(cause){
        return axios.post(CAUSES_API_BASE_URL + "/CreateCauses" , cause);
    }
    
}

export default new CausesService()
import axios from "axios";

const CAUSES_API_BASE_URL = "http://localhost:8080/api/v1"; 

class MissionService { 

    getMission() {
        return axios.get(CAUSES_API_BASE_URL + "/missions") ; 
    }
    createMisssion(mission){
        return axios.post(CAUSES_API_BASE_URL + "/createMissions" , mission);
    }
    
}

export default new MissionService()
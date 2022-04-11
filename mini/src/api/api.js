import axios from "axios";

const apis =  axios.create({
    
    baseURL: "http://localhost:3001/"
    
})

export default apis;
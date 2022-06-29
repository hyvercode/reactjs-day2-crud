import axios from "axios";

export default axios.create({
    baseURL: "https://rmsv1.herokuapp.com/rms-service",
    responseType: "json"
})

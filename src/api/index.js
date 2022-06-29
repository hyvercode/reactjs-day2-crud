import axios from "axios";
import {getToken} from "../helpers/Common";

export default axios.create({
    baseURL: "https://rmsv1.herokuapp.com/rms-service",
    responseType: "json"
})
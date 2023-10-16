import axios from "axios";


export default axios.create({
    baseURL: "https://iangebra-001-site1.atempurl.com/api/v1",
    headers: {
        "Content-Type": "application/json"
    }
});
import axios from "axios";

const axiosEdunova = axios.create({

    baseURL: "https://iangebra-001-site1.atempurl.com/api/v1",
    headers: {
        "Content-Type": "application/json",
        'Authorization' : 'Bearer ' + localStorage.getItem('Bearer')
    }
});

axiosEdunova.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        localStorage.setItem('Bearer','');
        window.location.href = '/';
      }
    });
  
export default axiosEdunova;
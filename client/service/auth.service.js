import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService{
    register(email, password) {
        return axios.post(API_URL + "signup", {
          email,
          password
        });
      }
    
      login(email, password) {
        return axios
          .post(API_URL + "signin", {
            email,
            password
          })
          .then(response => {
            if (response.data.accessToken) {
              localStorage.setItem("user", JSON.stringify(response.data));
            }
    
            return response.data;
          });
      }

      getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
      }
    
}

export default new AuthService();
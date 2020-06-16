import axios from 'axios';

axios.defaults.baseURL = process.env.NODE_ENV == 'production'?"/":"http://localhost:8000";
function setAuthorizationToken(token){
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export {axios,setAuthorizationToken};

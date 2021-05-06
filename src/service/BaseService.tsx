import axios from 'axios';



export class BaseService  
{
    protected instance = axios.create({
        baseURL: "http://localhost:3000/"
    }); 
}


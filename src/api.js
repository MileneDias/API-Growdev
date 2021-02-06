import axios from 'axios';

class API{
    constructor(){
        this.urlBase = 'https://growdev-test-node.herokuapp.com'; 

    }

    get(url){
        const api = axios.create({
            baseURL: this.urlBase,
        });

        return api.get(url);
    }

    post(url, dados){
        const api = axios.create({
            baseURL: this.urlBase,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        }); 
        
        return api.post(url, dados);
    }

    postAutenticado(url, dados, token){
        const api = axios.create({
            baseURL: this.urlBase,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }); 
        
        return api.post(url, dados);
    }


    
    getAutenticado(url, token) {
        const api = axios.create({
            baseURL: this.urlBase,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`

            },            
        });

        return api.get(url);
    } 
    
    delete(url, token){
        const api = axios.create({
            baseURL: this.urlBase,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }); 
        
        return api.delete(url);
    }
}

export default new API();
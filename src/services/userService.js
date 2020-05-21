import api from './apiClient'


export const checkLoginStatus = (token)=>{
    return api.get('/user',{
        headers:{
            'Authorization':'Bearer '+token 
        }
    })
}
export const login = (payload)=>{
    return api.post('login',payload);
}


export const register = (payload)=>{
    return api.post('register',payload)
}
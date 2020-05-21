import * as userService from '@/services/userService'

import {setToken,getToken} from '@/store/localStorage'

export const state = {
    user: {},
    accessToken: '',

}

export const mutations = {
    SET_USER_INFO(state,payload){
        state.user = payload;
    }
}

export const actions = {
    setUserInfo({commit},payload) {
        commit('SET_USER_INFO',payload)
    },
    login({dispatch}, payload) {
        return new Promise((resolve,reject)=>{
            userService.login(payload)
            .then(res => {
                if (res.data && typeof res.data === 'string') {
                    setToken(res.data)
                    userService.checkLoginStatus(res.data)
                        .then(user=>{
                            dispatch('setUserInfo',user.data)
                            resolve(true)
                        })
                        .catch(error=>reject(error))
                }
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    loggedIn({dispatch}){
        return new Promise((resolve,reject)=>{
            const token = getToken(); 
            if(token){
                userService.checkLoginStatus(token)
                    .then(res=>{
                        if(res.data.id){
                            dispatch('setUserInfo',res.data)
                            resolve(true)
                            return;
                        }
                    }).catch(()=>{
                        setToken('')
                        reject(false)
                    })
            return;   
            }
   
            reject(false)
        })
    },
    logout({dispatch}){
        setToken('')
        dispatch('setUserInfo',{})
    }
    
}

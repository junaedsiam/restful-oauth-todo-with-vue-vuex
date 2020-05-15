import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 10000,
    headers: {
      'Accept': 'application/json',
      'X-Requested-With':'XMLHttpRequest'
    }
  });
export const getTodos =()=>{
    return instance.get('todos')
}

export const addTodo =(payload)=>{
    return instance.post('todos',payload)
}

export const removeTodo =(payload)=>{
    return instance.delete(`todo/${payload}`,payload)
}

export const updateTodo = (payload)=>{
  return instance.put(`todo/${payload.id}`,payload)

}

export const markAllDone = ()=>{
  return instance.put(`todo/mark-all`,{})
}

export const deleteDone = ()=>{
  return instance.delete('todo/delete-done',{})
}

export const clearAll = ()=>{
  return instance.delete('todo/clear-all',{})
}
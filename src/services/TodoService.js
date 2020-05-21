import api from './apiClient'
import { getToken } from '@/store/localStorage'

const setBearerToken = ()=>{
  const token = getToken()
  api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

export const getTodos = () => {
  setBearerToken();
  return api.get('todos')
}

export const addTodo = (payload) => {
  return api.post('todos', payload)
}

export const removeTodo = (payload) => {
  return api.delete(`todo/${payload}`, payload)
}

export const updateTodo = (payload) => {
  return api.put(`todo/${payload.id}`, payload)

}

export const markAllDone = () => {
  return api.put(`todo/mark-all`, {})
}

export const deleteDone = () => {
  return api.delete('todo/delete-done', {})
}

export const clearAll = () => {
  return api.delete('todo/clear-all', {})
}
import axios from 'axios';
import apiClient from './apiClient';

export async function registerUser(payload: any) {
    try {
        const register = await apiClient({method: "post", url:"/auth/register/", data: payload})
        console.log('register:', register)
    } catch (err) {

    } finally {

    }

}
export async function loginUser(payload: any) {
    try {
        const response = await apiClient({method: "post", url:"/auth/login/", data: payload})
        const token = response?.data?.accessToken
        const user = JSON.stringify(response?.data?.user)
        localStorage.setItem("token", token)
        localStorage.setItem("user", user)
        return {statusText: response.statusText, status: response.status}
    } catch (err) {

    } finally {

    }

}

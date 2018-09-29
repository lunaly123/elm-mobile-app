import axios from "axios"

axios.defaults.baseURL = 'https://easy-mock.com/mock/5baba5e600c17a2d8a77f59c'

export function getGoods(){
    return axios.get('/goods')
}
export function getRatings(){
    return axios.get('/ratings')
}
export function getSeller(){
    return axios.get('/seller')
}

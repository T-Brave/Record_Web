import axios from './index';

const login = (data) => {
    return axios.request({
        url:'/api/login?t='+ new Date().getTime(),
        method:'post',
        data: data
    })
}

const editpassword = (data) => {
    return axios.request({
        url:'/api/editpassword?t='+ new Date().getTime(),
        method:'post',
        data: data
    })
}

export {
    login,
    editpassword
}
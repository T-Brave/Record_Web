import axios from './index';

const getUserList = () => {
    return axios.request({
        url:'/api/userlist?t='+ new Date().getTime(),
        method:'post'
    })
}

const deleteUser = (data) => {
    return axios.request({
        url:'/api/deleteuser?t='+ new Date().getTime(),
        method:'post',
        data: data
    })
}

const adduser = (data) => {
    return axios.request({
        url:'/api/edituser?t='+ new Date().getTime(),
        method:'post',
        data: data
    })
}

export {
    getUserList,
    deleteUser,
    adduser
}
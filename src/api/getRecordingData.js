import axios from './index';

const getFileFloder = () => {
    return axios.request({
        url:'/api/serverid?t='+ new Date().getTime(),
        method:'post'
    })
}

const getFilesList = (data) => {
    return axios.request({
        url:'/api/getfileslist?t='+ new Date().getTime(),
        method:'post',
        data: data
    })
}

const deleteFile = (data) => {
    return axios.request({
        url:'/api/deletefile?t='+ new Date().getTime(),
        method:'post',
        data: data
    })
}

const editfile = (data) => {
    return axios.request({
        url:'/api/editfile?t='+ new Date().getTime(),
        method:'post',
        data: data
    })
}

export {
    getFileFloder,
    getFilesList,
    deleteFile,
    editfile
}
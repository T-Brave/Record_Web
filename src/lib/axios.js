import axios from 'axios';
import { baseURL } from "../config";
//这里设置默认的HTTP请求中的Content-Type
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers['Content-Type'] = 'application/json';
class HttpRequest {
    constructor(baseUrl = baseURL) {
        this.baseUrl = baseURL;
        this.queue = {};
    }
    getInsideConfig(){
        const config = {
            baseURL:this.baseUrl
        }
        return config;
    }
    interceptors(instance,url){
        instance.interceptors.request.use(config => {
            if (!Object.keys(this.queue).length){
                //
            };
            this.queue[url] = true;
            config.data = config.data;
            return config;
        },error => {
           return Promise.reject(error);
        });
        instance.interceptors.response.use(res => {
            delete this.queue[url];
            const {
                data,
                status
            } = res;
            return {
                data,
                status
            }
        },error => {
            delete this.queue[url];
            return Promise.reject(error);
        })
    }
    request(options){
        const instance = axios.create();
        options = Object.assign(this.getInsideConfig(),options);
        this.interceptors(instance,options.url);
        return instance(options);
    }
}

export default HttpRequest;

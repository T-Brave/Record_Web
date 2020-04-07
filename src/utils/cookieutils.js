/**
 * 添加 cookie
 * @param name 名称
 * @param value 值
 * @param expiresHours 过期时间
 */
export function addCookie(name, value, expiresHours) {
    let cookieString = `${name}=${escape(value)}`;
    // 判断是否设置过期时间,0代表关闭浏览器时失效
    if (expiresHours > 0) {
        const date = new Date();
        date.setTime(date.getTime() + expiresHours * 1000);
        cookieString = `${cookieString};expires=${date.toUTCString()}`;
    }
    document.cookie = cookieString;
}

/**
 * 修改 cookie
 * @param name 名称
 * @param value 值
 * @param expiresHours 过期时间
 */
export function editCookie(name, value, expiresHours) {
    let cookieString = `${name}=${escape(value)}`;
    if (expiresHours > 0) {
        const date = new Date();
        date.setTime(date.getTime() + expiresHours * 1000); // 单位是毫秒
        // @ts-ignore
        cookieString = `${cookieString};expires=${date.toUTCString()}`;
    }
    document.cookie = cookieString;
}

/**
 * 根据名字获取cookie的值
 * @param name
 */
export function getCookieValue(name) {
    const strCookie = document.cookie;
    const arrCookie = strCookie.split('; ');
    for (const cookie of arrCookie) {
        const arr = cookie.split('=');
        if (arr[0] === name) {
            // console.log('unescape(arr[1])', unescape(arr[1]));
            return unescape(arr[1]);
        }
    }
}
/**
 * 根据名字删除cookie
 * @param name
 */
export function delCookie(key) {
    var date = new Date();
    date.setTime(date.getTime() - 1);
    var delValue = getCookieValue(key);
    if (!!delValue) {
        document.cookie = key+'='+delValue+';expires='+date.toGMTString();
    }
}
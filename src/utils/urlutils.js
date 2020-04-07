/**
 * 获取url中的参数
 * @param name 要获取的参数名称
 * @returns {string|null} 返回数据
 */
export function getUrlParam(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	let r = window.location.search.substr(1).match(reg);
	if (r != null)
		return decodeURI(r[2]);
	return null;
}
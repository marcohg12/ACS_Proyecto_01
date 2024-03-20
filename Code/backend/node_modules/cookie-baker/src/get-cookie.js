export const getCookie = (key, isString) => {
    const results = new RegExp(key + '=(.*?)(;|$)', 'g').exec(document.cookie)

    if (isString) {
        return results && results[1] ? results[1] : null
    }

    return results && results[1] ? JSON.parse(results[1]) : null
}
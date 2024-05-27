export const setCookie = (key, value, expires) => {
    const result =
        key +
        '=' +
        JSON.stringify(value) +
        ';path=/;expires=' +
        expires.toUTCString()
    document.cookie = result
}
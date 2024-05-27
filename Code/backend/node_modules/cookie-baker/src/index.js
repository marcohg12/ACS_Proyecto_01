import { setCookie } from './set-cookie'
import { getCookie } from './get-cookie'

const addDays = days => {
    const date = new Date()
    const additionalDays = 1000 * 60 * 60 * 24 * days
    date.setTime(date.getTime() + additionalDays)
    return date
}

window.cookieFactory = () => {
    const cookie = {
        getCookie: (key, isString, markAsErasable) => {
            isString = isString || false
            markAsErasable = markAsErasable || false
            const value = getCookie(key, isString)

            if (markAsErasable) {
                this.remove(key)
            }

            return value
        },
        setCookie: (key, value, days) => {
            days = days || 365
            setCookie(key, value, addDays(days))
        },
        deleteCookie: key => {
            setCookie(key, null, addDays(-7))
        }
    }

    return cookie
}

export default cookieFactory()

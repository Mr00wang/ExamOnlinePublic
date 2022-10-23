/*
进行user保存
 */
import store from 'store'
const USER_KEY = 'user_key';
const STUDENT_KEY = 'student_key';
const ANSWER_KEY = 'answer_key';
export default {
    /*
    保存user
     */
    saveUser (user) {
        // localStorage.setItem(USER_KEY, JSON.stringify(user))
        store.set(USER_KEY, user)
    },
    /*
    读取user
     */
    getUser () {
        // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
        return store.get(USER_KEY) || {}
    },
    /*
    删除user
     */
    removeUser () {
        // localStorage.removeItem(USER_KEY)
        store.remove(USER_KEY)
    },
    /*
    保存user
     */
    saveStudent (student) {
        // localStorage.setItem(USER_KEY, JSON.stringify(user))
        store.set(STUDENT_KEY, student)
    },
    /*
    读取user
     */
    getStudent () {
        // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
        return store.get(STUDENT_KEY) || {}
    },
    /*
    删除user
     */
    removeStudent () {
        // localStorage.removeItem(USER_KEY)
        store.remove(STUDENT_KEY)
    },
    /*
   保存user
    */
    saveAnswer (answer) {
        // localStorage.setItem(USER_KEY, JSON.stringify(user))
        store.set(ANSWER_KEY, answer)
    },
    /*
    读取user
     */
    getAnswer () {
        // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
        return store.get(ANSWER_KEY) || {}
    },
    /*
    删除user
     */
    removeAnswer () {
        // localStorage.removeItem(USER_KEY)
        store.remove(ANSWER_KEY)
    }
}
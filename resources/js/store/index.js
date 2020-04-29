import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        accessToken: localStorage.getItem('access_token') || null
    },

    getters: {
       isLoggedIn(state) {
        console.log('It is ' + state.accessToken)
        return state.accessToken !== null && state.accessToken !== ''
       }
    },


    actions: {
        loadMovies(context, payload) {
            return new Promise((resolve, reject) => {
                axios.post('/movies?page=' + payload.page)
                .then(response => {
                    resolve(response)
                })
                .catch(errors => {
                    reject(errors)
                })
            })
        },
        movieDetails(context, payload) {
            return new Promise((resolve, reject) => {
                axios.get('/movies/' + payload.id)
                .then(response => {
                    resolve(response)
                })
                .catch(errors => {
                    reject(errors)
                })
            })
        },
        login(context, payload) {
            return new Promise((resolve, reject) => {
                axios.post('/login',  payload)
                .then(response => {
                    resolve(response)
                })
                .catch(errors => {
                    reject(errors)
                })
            })
        },
        register(context, payload) {
            return new Promise((resolve, reject) => {
                axios.post('/register',  payload)
                .then(response => {
                    resolve(response)
                })
                .catch(errors => {
                    reject(errors)
                })
            })
        },
        setUserAccess(context, payload) {
            localStorage.setItem('access_token', payload.access_token)
            context.commit('mutateAccessToken', payload.access_token)
        },
        unsetUserAccess(context, payload) {
            localStorage.removeItem('access_token')
            context.commit('mutateAccessToken', null)
        }, 
        postComment(context, payload) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.accessToken
            console.log(context.state.accessToken)
            // console.log(axios.defaults.headers.common)
            return new Promise((resolve, reject) => {
                axios.post('/movie/' + payload.movieId + '/comment/new', {
                    comment: payload.comment
                })
                .then(response => {
                    resolve(response)
                })
                .catch(errors => {
                    reject(errors)
                })
            })
        },
        logout(context, payload) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.accessToken
            return new Promise((resolve, reject) => {
                axios.post('/logout')
                .then(response => {
                    resolve(response)
                })
                .catch(errors => {
                    reject(errors)
                })
            })
        }
    },

    mutations: {
        mutateAccessToken(state, accessToken) { 
            state.accessToken = accessToken
        }
    },
    
})
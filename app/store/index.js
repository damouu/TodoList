import Vue from 'nativescript-vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: null,
        tokenExpiration: null,
        TachesTodos: [],
        user: null
    },
    mutations: {
        suppressionDansLesTodos(state, todo) {
            state.TachesTodos.splice(state.TachesTodos.indexOf(todo), 1);
        },
        ajoutDansLesTodos(state, todo) {
            if (state.TachesTodos.length === 0) {
                state.TachesTodos.push(todo);
            } else {
                state.TachesTodos.unshift(todo);
            }
        },
        InfosUtilisateur(state, user) {
            state.user = user;
        },
        receptionDuToken(state, token, expiration) {
            state.token = token;
            state.tokenExpiration = expiration;
        },
    },
});

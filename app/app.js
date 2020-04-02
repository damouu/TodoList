import Vue from "nativescript-vue";
import store from './store';
import Home from "./components/Home";
import axios from "axios";
import {decode, encode} from 'base-64';

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}

global.axios = axios.create({
    baseURL: 'https://api.todolist.sherpa.one/users'
});

global.isOnline = false;

global.isSignedIn = false;

global.bus = new Vue({});

global.connectivity = require('tns-core-modules/connectivity');

global.updateUser = context => {
    global.axios.get(`/${context.$store.state.user.uuid}`)
        .then(response => {
            context.$store.commit('saveUser', response.data);
        }).catch(err => {
        alert({
            title: "Error",
            message: err.message,
            okButtonText: "OK"
        });
    });
};

new Vue({
    store,
    template: `
        <Frame>
            <Home />
        </Frame>`,

    components: {
        Home
    }
}).$start();

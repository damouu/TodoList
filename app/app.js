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

require('./bootstrap');

window.Vue = require('vue');

import Vue from 'vue'

import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)


Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('message', require('./components/Message').default);


const app = new Vue({
    el: '#app',
    data: {
        message: '',
        chat: {
            message: [],
            user: [],
        }
    },
    methods: {
        send() {
            if(this.message.length > 0) {

                this.chat.message.push(this.message);
                this.chat.user.push("you");

                axios.post('/send', { message: this.message})
                    .then(res => {
                        console.log(res);
                        //this.chat.message.push(this.message);
                        this.message = '';
                    })
                    .catch(error => console.log(error));
            }

        }
    },
    mounted() {
        Echo.private('chat-channel')
            .listen('ChatEvent', (e) => {
                this.chat.message.push(e.message);
                this.chat.user.push(e.user);
            });
    }
});

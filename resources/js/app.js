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
            color: [],
        }
    },
    methods: {
        send() {
            if(this.message.length > 0) {

                this.chat.message.push(this.message);
                this.chat.user.push("you");
                this.chat.color.push("success");

                axios.post('/send', { message: this.message})
                    .then(res => {
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
                this.chat.color.push("secondary");
            });
    }
});

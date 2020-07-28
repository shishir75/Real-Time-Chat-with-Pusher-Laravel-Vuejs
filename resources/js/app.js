require('./bootstrap');

window.Vue = require('vue');

import Vue from 'vue'

import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

// For Toast Notification
import Toaster from 'v-toaster';
import 'v-toaster/dist/v-toaster.css';
Vue.use(Toaster, {timeout: 5000});

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
            time: [],
        },
        typing: '',
        numberOfUsers: 0,
    },
    methods: {
        send() { // sending data
            if(this.message.length > 0) {

                this.chat.message.push(this.message);
                this.chat.user.push("you");
                this.chat.color.push("success");
                this.chat.time.push(this.getTime());

                axios.post('/send', { message: this.message})
                    .then(res => {
                        this.message = '';
                    })
                    .catch(error => console.log(error));
            }
        },
        getTime() {
            let time = new Date();
            return time.getHours() + ':' + time.getMinutes();
        }
    },
    watch: {
        message() {
            Echo.private('chat-channel')
                .whisper('typing', {
                    name: this.message
                });
        }
    },
    mounted() { // receiving data
        Echo.private('chat-channel')
            .listen('ChatEvent', (e) => {
                this.chat.message.push(e.message);
                this.chat.user.push(e.user);
                this.chat.color.push("secondary");
                this.chat.time.push(this.getTime());
            })
            .listenForWhisper('typing', (e) => {
                if(e.name != '') {
                    this.typing = 'someone is typing...';
                } else {
                    this.typing = '';
                }

            });

        Echo.join(`chat-channel`)
            .here((users) => {
                this.numberOfUsers = users.length;
                console.log(users);
            })
            .joining((user) => {
                this.numberOfUsers++;
                this.$toaster.success(user.name +' just join the room')
                //console.log(user.name);
            })
            .leaving((user) => {
                this.numberOfUsers--;
                this.$toaster.error(user.name +' just leave the room')
                //console.log(user.name);
            });
    }
});

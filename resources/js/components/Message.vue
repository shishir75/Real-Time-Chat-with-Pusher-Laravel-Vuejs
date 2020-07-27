<template>
    <div>
        <li class="list-group-item" :class="className">
            <slot></slot>
            <span id="time">{{ time }}</span>
            <small class="badge float-right" :class="badgeColor">{{ user }}</small>
        </li>

    </div>
</template>

<script>
    export default {
        name: "Message",
        props: ['color', 'user', 'time'],
        computed: {
            className() {
                return 'list-group-item-' + this.color;
            },

            badgeColor() {
                return 'badge-' +this.color;
            }
        }
    }
</script>

<style scoped>
    #time {
        font-size: 10px;
        margin-top: 15px;
        margin-left: 5px;
        color: black;
    }
</style>

<template>
    <div>
        <li class="list-group-item" :class="className"><slot></slot></li>
        <small class="badge float-right" :class="badgeColor">{{ user }}</small>
    </div>
</template>

<script>
    export default {
        name: "Message",
        props: ['color', 'user'],
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

</style>

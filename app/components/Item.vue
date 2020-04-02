<template>
    <Label :class="{todoDone: item.done}" :text="item.content" class="taches-todo"
           @tap="allerPageinfoTacheTodo"></Label>
</template>

<script>
    import infoTacheTodo from "./infoTacheTodo";

    export default {
        props: [
            "item"
        ],
        methods: {
            allerPageinfoTacheTodo() {
                this.$navigateTo(infoTacheTodo, {props: {item: this.item}})
            }
        }
    }
</script>

<style scoped>
    .taches-todo {
        font-size: 40em;
        color: greenyellow;
        margin-top: 240px;
        text-align: center;
    }

</style>

<template>
    <Page>
        <ActionBar title="information tache"></ActionBar>
        <StackLayout>
            <Label :class="{tachesTodoRealise: item.done}" class="taches-todo" :text="item.content"></Label>
            <Switch class="position-switch" v-model="item.done" @checkedChange="ClickSurButtonSwitch"/>
            <Button text="Supprimer" class="button-supprimer" @tap="AfficherFenetreModalSuppression"/>
            <Button text="Modifier" class="button-modifier" @tap="AfficherFenetreModalModification"/>
        </StackLayout>
    </Page>
</template>

<script>
    import fenetreModalSuppression from "./fenetreModalSuppression";
    import fenetreModalModification from "./fenetreModalModification";

    export default {
        components: {
            fenetreModalModification,
            fenetreModalSuppression
        },
        props: [
            "item"
        ],
        methods: {
            AfficherFenetreModalModification() {
                this.$showModal(fenetreModalModification, {props: {item: this.item}});
            },
            ClickSurButtonSwitch() {
                this.$store.commit('updateState');
            },
            AfficherFenetreModalSuppression() {
                this.$showModal(fenetreModalSuppression, {props: {item: this.item}});
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

    .tachesTodoRealise {
        font-size: 40em;
        color: red;
        margin-top: 240px;
        text-align: center;
    }

    .position-switch {
        margin-right: 600px;
    }

    .button-supprimer {
        margin-top: 130px;
        background-color: #D51A1A;
        color: white;
        font-size: 20em;
    }

    .button-modifier {
        color: white;
        margin-top: 130px;
        background-color: orange;
        font-size: 20em;
    }
</style>

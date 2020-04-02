<template>
    <Page>
        <StackLayout>
            <ListPicker class="fenetre-modal-filtrer-tache" v-model="currentFilter" :items="filters"></ListPicker>
            <Button class="fenetre-modal-filtrer-button" text="Close" @tap="$modal.close()"/>
        </StackLayout>
    </Page>
</template>

<script>
    export default {
        props: [
            "list"
        ],
        data() {
            return {
                currentFilter: 0,
                filters: ["Toute", "A faire", "realise"]
            }
        },
        watch: {
            currentFilter: function (filter) {
                this.list.changeFilter(filter);
            }
        }
    }
</script>

<style scoped>

    .fenetre-modal-filtrer-tache {
        height: 700px;
        width: 2000px;
        background-color: lightcoral;
        font-size: 20em;
        font-size: 20em;
    }

    .fenetre-modal-filtrer-button {
        color: antiquewhite;
        background-color: violet;
    }

</style>

<template>
    <Page>
        <StackLayout>
            <Label class="fenetre-modal-modifier-tache fenetre-modal-modifier-text"
                   text="Modification sur cette tache"/>
            <TextField class="fenetre-modal-modifier-tache coleur-button-modifier" v-model="item.content"/>
            <Button class="fenetre-modal-modifier-tache coleur-button-modifier fenetre-modal-modifier-text"
                    text="Modifier"
                    @tap="modifierTacheTodo"/>
        </StackLayout>
    </Page>
</template>

<script>
    import TacheTodo from "../classes/TacheTodo";

    export default {
        props: [
            "item"
        ],
        methods: {
            modifierTacheTodo(newTodo) {
                if (global.isOnline && newTodo.uuid) {
                    this.modifierTacheTodoOnline(new TacheTodo(this.NouvelleTacheNom, false));
                } else {
                    this.modifierTacheTodoOffLine(new TacheTodo(this.NouvelleTacheNom, false));
                }
                this.$modal.close();
            },
            modifierTacheTodoOnline(newTodo) {
                global.axios.patch(`/${this.$store.state.user.uuid}/todos/${newTodo.uuid}`, {
                    content: newTodo.content,
                    done: newTodo.done
                }).then(response => {
                    this.$store.commit('updateSate');
                    global.updateUser(this);
                }).catch(err => {
                    alert({
                        title: "Error",
                        message: err.message,
                        okButtonText: "OK"
                    });
                });
            },
            modifierTacheTodoOffLine() {
                this.$store.commit('updateState');
            }
        }
    }
</script>

<style scoped>
    .fenetre-modal-modifier-tache {
        height: 300px;
        width: 1200px;
    }

    .coleur-button-modifier {
        color: white;
        background-color: darkorange;
    }

    .fenetre-modal-modifier-text {
        font-size: 20em;
        text-align: center;
    }
</style>

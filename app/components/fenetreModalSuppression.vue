<template>
    <Page>
        <StackLayout>
            <Label class="fenetre-modal-supression-tache fenetre-modal-supression-text" text="supprimer cette tache?"/>
            <Button class="fenetre-modal-supression-tache fenetre-modal-supression-text" text="Supprimer"
                    @tap="suppressionTacheTodo"/>
        </StackLayout>
    </Page>
</template>

<script>
    export default {
        props: [
            "item"
        ],
        methods: {
            suppressionTacheTodo() {
                if (global.isOnline) {
                    this.suppressionTacheTodoOnline(this.item);
                } else {
                    this.suppressionTacheTodoOffLine(this.item);
                }
                this.$modal.close();
            },
            suppressionTacheTodoOnline(todo) {
                global.axios.delete(`/${this.$store.state.user.uuid}/todos/${todo.uuid}`)
                    .then(response => {
                        this.$store.commit('suppressionDansLesTodos', todo);
                        global.updateUser(this);
                    }).catch(err => {
                    alert({
                        title: "Error",
                        message: err.message,
                        okButtonText: "OK"
                    });
                });
            },
            suppressionTacheTodoOffLine(todo) {
                this.$store.commit('suppressionDansLesTodos', todo);
            }
        }
    }
</script>

<style scoped>
    .fenetre-modal-supression-tache {
        height: 300px;
        width: 1200px;
        background-color: red;
    }

    .fenetre-modal-supression-text {
        font-size: 20em;
        text-align: center;
    }

</style>

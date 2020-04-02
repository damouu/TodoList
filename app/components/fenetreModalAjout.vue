<template>
    <Page>
        <StackLayout>
            <Label class="fenetre-modal-ajout-text" text="Nom de la nouvelle tache"/>
            <TextField class="fenetre-modal-ajout-tache" v-model="NouvelleTacheNom"/>
            <Button class="fenetre-modal-ajout-tache fenetre-modal-ajout-text" text="Ajouter"
                    @tap="ajouterNouvelleTacheTodo"/>
        </StackLayout>
    </Page>
</template>

<script>
    import TacheTodo from "../classes/TacheTodo";

    export default {
        data() {
            return {
                NouvelleTacheNom: ""
            }
        },
        methods: {
            ajouterNouvelleTacheTodo() {
                if (global.isOnline) {
                    this.ajouterNouvelleTacheTodoOnline(new TacheTodo(this.NouvelleTacheNom, false));
                } else {
                    this.ajouterNouvelleTacheTodoOffLine(new TacheTodo(this.NouvelleTacheNom, false));
                }
                this.$modal.close();
            },
            ajouterNouvelleTacheTodoOnline(todo) {
                global.axios.post(`/${this.$store.state.user.uuid}/todos/`, {content: todo.content})
                    .then(response => {
                        this.$store.commit('ajoutDansLesTodos', response.data.todo);
                        global.updateUser(this);
                    }).catch(err => {
                    alert({
                        title: "Error",
                        message: err.message,
                        okButtonText: "OK"
                    });
                });
            },
            ajouterNouvelleTacheTodoOffLine(todo) {
                this.$store.commit('ajoutDansLesTodos', todo);
            }
        }
    }
</script>

<style scoped>
    .fenetre-modal-ajout-tache {
        height: 300px;
        width: 1200px;
        background-color: darkslateblue;
    }

    .fenetre-modal-ajout-text {
        font-size: 20em;
        text-align: center;
    }
</style>

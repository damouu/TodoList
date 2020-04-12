<template>
    <Page>
        <ActionBar title="les taches TodoList"></ActionBar>
        <GridLayout>
            <StackLayout orientation="vertical">
                <Label class="label-information" text="voici vos taches todo"/>
                <Item v-for="todo in listeTacheTodoFiltre" :item="todo"></Item>
            </StackLayout>
            <Button class="button-filtre-TacheTodo" text="filtrer" @tap="AllerfenetreModalFiltre"/>
            <Button class="button-nouvelle-TacheTodo" text="Creer" @tap="AllerfenetreModalAjout"/>
        </GridLayout>
    </Page>
</template>

<script>
    import fenetreModalAjout from "./fenetreModalAjout";
    import Item from './Item';
    import fenetreModalFiltrer from "./fenetreModalFiltrer";
    import TacheTodo from "../classes/TacheTodo";

    export default {
        components: {
            fenetreModalFiltrer,
            fenetreModalAjout,
            Item
        },
        data() {
            return {
                listeTacheTodoFiltre: this.$store.state.TachesTodos,
                niveauFiltre: 0,
            }
        },
        methods: {
            AllerfenetreModalFiltre() {
                this.$showModal(fenetreModalFiltrer, {props: {list: this}});
            },

            changeFilter(filter) {
                this.niveauFiltre = filter;
            },
            AllerfenetreModalAjout() {
                this.$showModal(fenetreModalAjout);
            },
            syncTodos() {
                let TachesTodos = this.$store.state.TachesTodos;
                let distantTodos = this.$store.state.user.todos;
                let nbTodosToAdd = 0;
                let nbTodosAdded = 0;
                let nbTodosToDelete = 0;
                let nbTodosDeleted = 0;
                let nbTodosToModify = 0;
                let nbTodosModified = 0;

                distantTodos.forEach(distantTodo => {
                    if (TachesTodos.findIndex(localTodo => localTodo.uuid === distantTodo.uuid) === -1) {
                        nbTodosToDelete++;
                    }
                });
                TachesTodos.forEach(localTodo => {
                    if (!localTodo.uuid) {
                        nbTodosToAdd++
                    }

                    if (distantTodos.findIndex(distantTodo => (distantTodo.uuid === localTodo.uuid) && (distantTodo.content !== localTodo.content || distantTodo.done !== localTodo.done)) !== -1) {
                        nbTodosToModify++
                    }
                });
                if (nbTodosToAdd === 0 && nbTodosToDelete === 0 && nbTodosToModify === 0) {
                    global.bus.$emit('syncDone');
                } else {
                    TachesTodos.forEach(localTodo => {
                        if (!localTodo.uuid) {
                            global.axios.post(`/${this.$store.state.user.uuid}/todos/`, {content: localTodo.content})
                                .then(response => {
                                    nbTodosAdded++;
                                    if (nbTodosAdded === nbTodosToAdd) {
                                        if (nbTodosDeleted === nbTodosToDelete && nbTodosModified === nbTodosToModify) {
                                            global.bus.$emit('syncDone');
                                        }
                                    }
                                }).catch(err => {
                                alert({
                                    title: "Error",
                                    message: err.message,
                                    okButtonText: "OK"
                                });
                            });
                        }

                        if (distantTodos.findIndex(distantTodo => (distantTodo.uuid === localTodo.uuid) && (distantTodo.content !== localTodo.content || distantTodo.done !== localTodo.done)) !== -1) {
                            global.axios.patch(`/${this.$store.state.user.uuid}/todos/${localTodo.uuid}`, {
                                content: localTodo.content,
                                done: localTodo.done
                            }).then(response => {
                                nbTodosModified++;
                                if (nbTodosModified === nbTodosToModify) {
                                    if (nbTodosAdded === nbTodosToAdd && nbTodosDeleted === nbTodosToDelete) {
                                        global.bus.$emit('syncDone');
                                    }
                                }
                            }).catch(err => {
                                alert({
                                    title: "Error",
                                    message: err.message,
                                    okButtonText: "OK"
                                });
                            });
                        }
                    });

                    distantTodos.forEach(distantTodo => {
                        if (TachesTodos.findIndex(localTodo => localTodo.uuid & distantTodo.uuid & localTodo.uuid === distantTodo.uuid) === -1) {
                            global.axios.delete(`/${this.$store.state.user.uuid}/todos/${distantTodo.uuid}`)
                                .then(response => {
                                    nbTodosDeleted++;
                                    if (nbTodosDeleted === nbTodosToDelete) {
                                        if (nbTodosAdded === nbTodosToAdd && nbTodosModified === nbTodosToModify) {
                                            global.bus.$emit('syncDone');
                                        }
                                    }
                                }).catch(err => {
                                alert({
                                    title: "Error",
                                    message: err.message,
                                    okButtonText: "OK"
                                });
                            });
                        }
                    });
                }
            },
        },
        created() {
            global.bus.$on('ajouterNouvelleTacheTodo', todo => this.ajouterNouvelleTacheTodo(todo));
            global.bus.$on('suppressionTacheTodo', todo => this.suppressionTacheTodo(todo));
            global.bus.$on('modifierTacheTodo', newTodo => this.modifierTacheTodo(newTodo));
            global.bus.$on('syncDone', () => global.updateUser(this));
            global.bus.$on('connection restored while signed in', () => this.syncTodos());
        },
        mounted() {
            if (global.isOnline) {
                global.axios.get(`/${this.$store.state.user.uuid}/todos`)
                    .then(response => {
                        let todos = response.data.todos;
                        todos.forEach(todo => {
                            this.$store.commit('ajoutDansLesTodos', (new TacheTodo(todo.content, todo.done, todo.uuid)));
                        });
                    }).catch(err => {
                    alert({
                        title: "Error",
                        message: err.message,
                        okButtonText: "OK"
                    });
                });
            }
        },
        watch: {
            niveauFiltre: function (filter) {
                if (filter === 0) {
                    this.listeTacheTodoFiltre = this.$store.state.TachesTodos;
                } else if (filter === 1) {
                    this.listeTacheTodoFiltre = this.$store.state.TachesTodos.filter(todo => todo.done === false);
                } else if (filter === 2) {
                    this.listeTacheTodoFiltre = this.$store.state.TachesTodos.filter(todo => todo.done === true);
                }
            }
        }
    }
</script>

<style scoped>
    .button-filtre-TacheTodo {
        height: 85;
        width: 85;
        background-color: lightcoral;
        horizontal-align: left;
        vertical-align: bottom;
    }

    .button-nouvelle-TacheTodo {
        height: 85;
        width: 85;
        background-color: darkslateblue;
        horizontal-align: right;
        vertical-align: bottom;
    }

    .label-information {
        font-size: 25em;
        margin-top: 240px;
        margin-left: 40%;
        text-align: center;
        width: 70%;
        margin-right: 40%;
        color: crimson;
        text-decoration: underline;
    }
</style>

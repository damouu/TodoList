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
            <Button class="button-nouveau-Password" text="Reset Password" @tap="AllerfenetreModalResetPassword"/>
        </GridLayout>
    </Page>
</template>

<script>
    import fenetreModalAjout from "./fenetreModalAjout";
    import Item from './Item';
    import fenetreModalFiltrer from "./fenetreModalFiltrer";
    import TacheTodo from "../classes/TacheTodo";
    import fenetreModalResetPassword from "./fenetreModalResetPassword"

    export default {
        components: {
            fenetreModalFiltrer,
            fenetreModalAjout,
            fenetreModalResetPassword,
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
            AllerfenetreModalResetPassword() {
                this.$showModal(fenetreModalResetPassword);
            },
            SynchronisationTacheTodo() {
                let TachesTodos = this.$store.state.TachesTodos;
                let TacheTodoACreer = 0;
                let TacheTodoNouvelle = 0;

                TachesTodos.forEach(TacheTodoLocale => {
                    if (!TacheTodoLocale.uuid) {
                        TacheTodoNouvelle++
                    }
                });
                if (TacheTodoNouvelle === 0) {
                    global.bus.$emit('syncDone');
                } else {
                    TachesTodos.forEach(TacheTodoLocale => {
                        if (!TacheTodoLocale.uuid) {
                            global.axios.post(`/${this.$store.state.user.uuid}/todos/`, {content: TacheTodoLocale.content})
                                .then(response => {
                                    this.$store.commit('suppressionDansLesTodos', TacheTodoLocale);
                                    this.$store.commit('ajoutDansLesTodos', (new TacheTodo(response.data.todo.content, response.data.todo.done, response.data.todo.uuid)));
                                    TacheTodoACreer++;
                                    if (TacheTodoACreer === TacheTodoNouvelle) {
                                        global.bus.$emit('syncDone');
                                    }
                                })
                        }
                    });
                }
                alert("synchronisation effectuée.")
            },
        },
        created() {
            global.bus.$on('ajouterNouvelleTacheTodo', todo => this.ajouterNouvelleTacheTodo(todo));
            global.bus.$on('suppressionTacheTodo', todo => this.suppressionTacheTodo(todo));
            global.bus.$on('modifierTacheTodo', newTodo => this.modifierTacheTodo(newTodo));
            global.bus.$on('connection restored while signed in', () => this.SynchronisationTacheTodo());
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

    .button-nouveau-Password {
        height: 85;
        width: 85;
        background-color: greenyellow;
        horizontal-align: center;
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

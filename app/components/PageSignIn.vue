<template>
    <Page>
        <ActionBar title="TodoListe APP"></ActionBar>
        <FlexboxLayout class="page">
            <Label class="sign-in-label" text="Page de connection"/>
            <Label class="label_form" text="saisisez votre adresse email"/>
            <TextField class="input" hint="adresse email" keyboardType="email" autocorrect="false"
                       autocapitalizationType="none" v-model="email" returnKeyType="next" fontSize="18"/>
            <Label class="label_form" text="saisisez votre mot de passe"/>
            <TextField ref="password" class="input" hint="mot de passe" secure="true" v-model="password"
                       fontSize="18"/>
            <Button text="se connecter" @tap="seConnecter" class="btn btn-primary"/>
            <Button text="creer un nouveau compte" @tap="allerPageSignUp" class="btn btn-primary"/>
        </FlexboxLayout>
    </Page>
</template>

<script>
    import ListeTacheTodo from "./ListeTacheTodo";
    import PageSignUp from "./PageSignUp";

    export default {
        data() {
            return {
                email: "",
                password: ""
            }
        },
        methods: {
            seConnecter() {
                if (this.email && this.password) {
                    global.axios.post('/signin', {}, {
                        auth: {
                            username: this.email,
                            password: this.password
                        }
                    }).then(response => {
                        global.isSignedIn = true;
                        global.axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
                        this.$store.commit('receptionDuToken', response.data.token, response.data.expiration);
                        this.$store.commit('InfosUtilisateur', response.data.user);
                        this.$navigateTo(ListeTacheTodo);
                    }).catch(err => {
                        alert({
                            title: "probleme de connection",
                            message: "email ou mot de passe incorrect.",
                            okButtonText: "ok"
                        });
                    });
                } else {
                    alert({
                        title: "erreur d'enregistrement",
                        message: "veuillez remplir tous les champs.",
                        okButtonText: "OK"
                    });
                }
            }, allerPageSignUp() {
                this.$navigateTo(PageSignUp);
            },

        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>

<template>
    <Page>
        <FlexboxLayout class="page">
            <Label class="sign-up-label" text=" Page creation d'un compte"/>
            <TextField class="input" hint="prénom " autocorrect="false" autocapitalizationType="none"
                       v-model="prénom " returnKeyType="next" fontSize="20"/>
            <Label class="sign-up-form" text="Veuillez saisir votre prenom"/>
            <TextField class="input" hint="nom" autocorrect="false" autocapitalizationType="none"
                       v-model="nom" returnKeyType="next" fontSize="20"/>
            <Label class="sign-up-form" text="Veuillez saisir votre nom"/>
            <TextField class="input" hint="Email" keyboardType="email" autocorrect="false"
                       autocapitalizationType="none" v-model="email" returnKeyType="next" fontSize="20"/>
            <Label class="sign-up-form" text="Veuillez saisir votre adresse email."/>
            <Label class="login-label sign-up-label" @tap="allerAsignIn"/>
            <Button text="creer mon compte" @tap="signUp" class="btn btn-primary"/>
        </FlexboxLayout>
    </Page>
</template>

<script>
    import PageSignIn from "./PageSignIn";
    import fenetreModalSignUp from "./fenetreModalSignUp";

    export default {
        data() {
            return {
                email: "",
                prénom: "",
                nom: ""
            }
        },
        methods: {
            signUp() {
                let params = {
                    prénom: this.prénom,
                    nom: this.nom,
                    email: this.email
                };
                if (this.prénom && this.nom && this.email) {
                    global.axios.post('/users/signup', params)
                        .then(response => {
                            this.$showModal(fenetreModalSignUp, {props: {user: response.data}});
                        }).catch(err => {
                        alert({
                            title: "Error",
                            message: err.message,
                            okButtonText: "OK"
                        });
                    })
                } else {
                    alert({
                        title: "erreur d'enregistrement",
                        message: "veuillez remplir tous les champs.",
                        okButtonText: "OK"
                    });
                }
            }, allerAsignIn() {
                this.$navigateTo(PageSignIn);
            },
        },
        created() {
            global.bus.$on('passwordNoted', () => this.allerAsignIn());
        }
    }
</script>

<style scoped>
</style>

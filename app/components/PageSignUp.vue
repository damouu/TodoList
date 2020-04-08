<template>
    <Page>
        <FlexboxLayout class="page">
            <Label class="sign-up-label" text=" Page creation d'un compte"/>
            <TextField class="input" hint="firstname " autocorrect="false" autocapitalizationType="none"
                       v-model="firstname " returnKeyType="next" fontSize="20"/>
            <Label class="sign-up-form" text="Veuillez saisir votre prenom"/>
            <TextField class="input" hint="lastname" autocorrect="false" autocapitalizationType="none"
                       v-model="lastname" returnKeyType="next" fontSize="20"/>
            <Label class="sign-up-form" text="Veuillez saisir votre lastname"/>
            <TextField class="input" hint="Email" keyboardType="email" autocorrect="false"
                       autocapitalizationType="none" v-model="email" returnKeyType="next" fontSize="20"/>
            <Label class="sign-up-form" text="Veuillez saisir votre adresse email."/>
            <TextField class="input" hint="gender" keyboardType="gender" autocorrect="false"
                       autocapitalizationType="none" v-model="gender" returnKeyType="next" fontSize="20"/>
            <Label class="sign-up-form" text="Veuillez preciser votre genre."/>
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
                firstname: "",
                gender: "",
                lastname: ""
            }
        },
        methods: {
            signUp() {
                if (this.firstname && this.lastname && this.email && this.gender) {
                    global.axios.post('/signup', {
                        "firstname": this.firstname,
                        "lastname": this.lastname,
                        "email": this.email,
                        "gender": this.gender
                    })
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

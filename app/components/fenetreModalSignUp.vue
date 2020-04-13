<template>
    <Page>
        <StackLayout>
            <Label class="fenetre-modal-SignUp"
                   :text="'Votre compte a bien été crée.'"></Label>
            <Label class="fenetre-modal-SignUp"
                   :text="'Votre mot de passe est: '+ ' '+user.password"></Label>
            <Button text="se connecter" @tap="allerPageSignIn" class="btn btn-primary"/>
        </StackLayout>
    </Page>
</template>

<script>
    import PageSignIn from "./PageSignIn";

    export default {
        name: "SignUpModal",
        props: [
            "user"
        ],
        methods: {
            allerPageSignIn() {
                this.$navigateTo(PageSignIn);
                this.$modal.close();
            },
        }
    }
</script>

<style scoped>

    .fenetre-modal-SignUp {
        height: 300px;
        font-size: 15em;
        width: 2000px;
        background-color: darkslateblue;
    }

</style>

<template>
    <Page>
        <StackLayout>
            <Label class="fenetre-modal-SignUp"
                   :text="'Votre mot de passe: '+ ' '+user.password"></Label>
            <Button text="Je me connect" @tap="passwordNoted"/>
        </StackLayout>
    </Page>
</template>

<script>
    export default {
        name: "SignUpModal",
        props: [
            "user"
        ],
        methods: {
            passwordNoted() {
                global.bus.$emit('passwordNoted');
                this.$modal.close();
            }
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

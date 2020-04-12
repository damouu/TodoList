<template>
    <Page>
        <StackLayout>
            <Label class="fenetre-modal-SignUp"
                   :text="'Votre mot de passe: '+ ' '+user.password"></Label>
        </StackLayout>
    </Page>
</template>

<script>
    export default {
        name: "SignUpModal",
        props: [
            "user"
        ],
        methods: {}
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

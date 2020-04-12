<template>
    <Page>
        <StackLayout>
            <Label class="fenetre-modal-reset-password-text" text="Reset password ?"/>
            <Button class="fenetre-modal-reset-password fenetre-modal-reset-password-text" text="Reset"
                    @tap="ResetPassword"/>
        </StackLayout>
    </Page>
</template>

<script>
    export default {
        methods: {
            ResetPassword() {
                global.axios.post(`/${this.$store.state.user.uuid}/reset/password`)
                    .then(response => {
                        alert({
                            title: "Votre nouveau mot de passe.",
                            message: response.data.password,
                            okButtonText: "OK"
                        });
                        this.$modal.close();
                    }).catch(err => {
                    alert({
                        title: "Error",
                        message: err.message,
                        okButtonText: "OK"
                    });
                });
                this.$modal.close();
            },
        }
    }
</script>

<style scoped>
    .fenetre-modal-reset-password {
        height: 300px;
        width: 1200px;
        background-color: greenyellow;
    }

    .fenetre-modal-reset-password-text {
        font-size: 20em;
        text-align: center;
    }
</style>

<template>
    <Page>
        <StackLayout>
            <Label :text="'Your password is: '+user.password+', make sure to remember it!'"></Label>
            <Button text="Go to Sign In" @tap="passwordNoted"/>
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

</style>

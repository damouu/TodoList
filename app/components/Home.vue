<template>
    <PageSignIn></PageSignIn>
    <!-- <ListeTacheTodo></ListeTacheTodo> -->
</template>

<script>
    import PageSignIn from "./PageSignIn";
    import ListeTacheTodo from "./ListeTacheTodo";

    export default {
        components: {
            PageSignIn,
            ListeTacheTodo
        },
        methods: {
            getConnectionType(connectionType) {
                switch (connectionType) {
                    case global.connectivity.connectionType.none:
                        global.bus.$emit('no connection');
                        break;
                    case global.connectivity.connectionType.wifi:
                        global.bus.$emit('wifi connection');
                        break;
                    case global.connectivity.connectionType.mobile:
                        global.bus.$emit('mobile connection');
                        break;
                    default:
                        break;
                }
            },

            onConnectionTypeChange(isOnline, message) {
                global.isOnline = isOnline;
                console.log("isOnline: " + global.isOnline);
                alert({
                    title: "Information",
                    message: message,
                    okButtonText: "OK"
                });
            }
        },
        created() {
            global.connectivity.startMonitoring(connectionType => {
                this.getConnectionType(connectionType);
            });

            global.bus.$on('no connection', () => {
                this.onConnectionTypeChange(false, "No connection detected");
            });

            global.bus.$on('wifi connection', () => {
                this.onConnectionTypeChange(true, "WiFi connection detected");
                if (global.isSignedIn) {
                    global.bus.$emit('connection restored while signed in');
                }
            });

            global.bus.$on('mobile connection', () => {
                this.onConnectionTypeChange(true, "Mobile data connection detected");
                if (global.isSignedIn) {
                    global.bus.$emit('connection restored while signed in');
                }
            });
        },
    };
</script>

<style scoped lang="scss">
    @import '~@nativescript/theme/scss/variables/blue';

    // Custom styles
    .fas {
        @include colorize($color: accent);
    }

    .info {
        font-size: 20;
        horizontal-align: center;
        vertical-align: center;
    }
</style>

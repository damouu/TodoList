<template>
    <PageSignIn></PageSignIn>
</template>

<script>
    import PageSignIn from "./PageSignIn";

    export default {
        components: {
            PageSignIn,
        },
        methods: {
            TypeConnectionDetecte(connectionType) {
                switch (connectionType) {
                    case global.connectivity.connectionType.mobile:
                        global.isOnline = true;
                        alert({
                            title: "Connection",
                            message: "Connection reseau mobile détecté",
                            okButtonText: "OK"
                        });
                        break;
                    case global.connectivity.connectionType.wifi:
                        global.isOnline = true;
                        alert({
                            title: "Connection",
                            message: "Connection WIFI détecté",
                            okButtonText: "OK"
                        });
                        break;
                    case global.connectivity.connectionType.none:
                        global.isOnline = false;
                        alert({
                            title: "Connection",
                            message: "Aucune connection détecté",
                            okButtonText: "OK"
                        });
                        break;
                    default:
                        break;
                }
            },

        },
        created() {
            global.connectivity.startMonitoring(connectionType => {
                this.TypeConnectionDetecte(connectionType);
            });
        },
    };
</script>

<style scoped lang="scss">
    @import '~@nativescript/theme/scss/variables/blue';

    .fas {
        @include colorize($color: accent);
    }

    .info {
        font-size: 20;
        horizontal-align: center;
        vertical-align: center;
    }
</style>

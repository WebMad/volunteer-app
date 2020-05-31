<template>
    <div class="map" v-if="coords">
        <yandex-map style="width: 100%;height: 200px;" :coords="coords" zoom="16">
            <ymap-marker :coords="coords" marker-id="1"></ymap-marker>
        </yandex-map>
    </div>
</template>

<script>
    import {yandexMap, ymapMarker} from 'vue-yandex-maps'

    export default {
        name: "Map",
        components: {
            yandexMap, ymapMarker
        },
        data() {
            return {
                coords: null,
            }
        },
        props: [
            'address',
        ],
        created() {
            this.$http.get(encodeURI('http://citron.webmadness.ru/api/geocode?search=' + this.address)).then(response => {
                let data = JSON.parse(response.data);
                this.coords = [data.items[0].position.lat, data.items[0].position.lng];
                console.log(data);
            })
        }
    }
</script>

<style scoped>

</style>
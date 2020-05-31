<template>
    <div class="events">
        <b-container class="mb-4">
            <b-input-group>
                <b-input placeholder="поиск по городу" v-model="city" @keyup="searchCity"></b-input>
                <b-button @click="searchEvents" class="ml-1" variant="success">Искать</b-button>
            </b-input-group>
            <b-list-group>
                <b-list-group-item @click="selectCity(city_option.address.city)" v-for="city_option in city_options"
                                   v-bind:key="city_option.id">{{ city_option.address.city }}
                </b-list-group-item>
            </b-list-group>
        </b-container>
        <b-container v-if="events.length !== 0">
            <b-card v-for="event in events" v-bind:key="event.id" style="margin-bottom: 10px;">
                <b-card-body>
                    <h4>{{ event.title }}</h4>
                    <p>{{ event.description }}</p>
                    <p>Дата начала: {{ event.date_start }}</p>
                    <p>Дата окончания: {{ event.date_end }}</p>
                    <p>Город: {{ event.city }}</p>
                    <p>Адрес: {{ event.address }}</p>
                    <Map v-if="event.city || event.address" :address="event.city + ' ' + event.address"></Map>
                    <router-link v-if="event" :to="'/events/' + event.id" class="text-right">перейти...</router-link>
                </b-card-body>
            </b-card>
        </b-container>
        <b-container v-else>
            <b-card>
                <b-card-body>
                    <center>Нет событий</center>
                </b-card-body>
            </b-card>
        </b-container>
    </div>
</template>

<script>
    import Map from '../components/Map'

    export default {
        name: "Events",
        components: {
            Map
        },
        data() {
            return {
                events: [],
                city_options: [],
                city: "",
            }
        },
        methods: {
            searchCity() {
                if (this.city) {
                    this.$http.get('/discover?search=' + this.city).then(response => {
                        this.city_options = JSON.parse(response.data).items.slice(0, 5);
                    })
                } else {
                    this.city_options = [];
                }
            },
            selectCity(city) {
                this.city_options = [];
                this.city = city;
            },
            searchEvents() {
                this.events = [];
                if (this.city) {
                    this.$http.get('/city-vacancy?city=' + this.city).then(response => {
                        this.events = response.data.data.reverse();
                    });
                } else {
                    this.$http.get('/vacancy').then(response => {
                        this.events = response.data.data.reverse();
                    })
                }
            }
        },
        created() {
            this.searchEvents();
        }
    }
</script>

<style scoped>

</style>
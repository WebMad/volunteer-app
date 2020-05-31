<template>
    <b-container>
        <b-card style="margin-bottom: 10px;" v-if="event">
            <b-card-body>
                <div class="actions float-right">
                    <b-button variant="danger" @click="closeEvent" v-if="event.status === 1">завершить</b-button>
                    <span v-else-if="event.status === 2 || event.status === 3">отменен</span>
                </div>
                <h4>{{ event.title }}</h4>
                <p>{{ event.description }}</p>
                <p>Дата начала: {{ event.date_start }}</p>
                <p>Дата окончания: {{ event.date_end }}</p>
                <p>Город: {{ event.city }}</p>
                <p>Адрес: {{ event.address }}</p>
                <p v-if="event.user">Контактное лицо: {{ event.user.last_name }} {{ event.user.first_name }} {{
                    event.user.middle_name }}</p>
                <Map v-if="event.city || event.address" :address="event.city + ' ' + event.address"></Map>
                <div class="offers-container" v-if="event.status === 1 && event.offers.length !== 0">
                    <h4 class="mt-4">Уже откликнулись</h4>
                    <div class="offers">
                        <b-list-group>
                            <b-list-group-item v-for="offer in event.offers" v-bind:key="offer.id" text-variant="white">
                                <span class="float-left"><b>{{ offer.user.last_name }} {{ offer.user.first_name }} {{ offer.user.middle_name }}</b>: {{offer.description}}</span>
                                <span class="float-right" v-if="event.user && event.user.id === getUser.id">
                                    <b-button-group v-if="offer.result === 0">
                                        <b-button variant="success"
                                                  @click="acceptOffer(offer.id)">Принять</b-button>
                                        <b-button variant="danger"
                                                  @click="denyOffer(offer.id)">Отклонить</b-button>
                                    </b-button-group>
                                    <span style="color: green" v-else-if="offer.result === 1">
                                        Принят
                                    </span>
                                    <span style="color: red" v-else-if="offer.result === 2">
                                        Отклонен
                                    </span>
                                </span>
                            </b-list-group-item>
                        </b-list-group>
                    </div>
                </div>
                <div class="send-offer" v-if="checkOffer()">
                    <h4 class="mt-4">Оставить отклик</h4>
                    <form action="" @submit.prevent="sendOffer">
                        <div class="form-group">
                            <label>Дополнительная информация</label>
                            <textarea class="form-control" v-model="description"
                                      placeholder="Напишите немного о том, чем вы можете помочь в данном мероприятии и т.п."></textarea>
                        </div>
                        <button class="btn btn-success btn-flat m-auto w-100">
                            готово
                        </button>
                    </form>
                </div>
                <div class="send-offer mt-3" v-else-if="event.status === 1">
                    <center>Вы уже оставили отклик</center>
                </div>
            </b-card-body>
        </b-card>
    </b-container>
</template>

<script>
    import Map from '../components/Map'
    import {mapGetters} from "vuex";

    export default {
        name: "Event",
        props: [
            'id'
        ],
        components: {
            Map
        },
        data() {
            return {
                event: null,
                description: "",
            };
        },
        created() {
            this.getEvent();
        },
        computed: {
            ...mapGetters('auth', ['getUser'])
        },
        methods: {
            checkOffer() {
                let result = true;
                this.event.offers.forEach(offer => {
                    if (offer.user.id === this.getUser.id) {
                        result = false;
                    }
                })
                return result;
            },
            getEvent() {
                this.$http.get('vacancy/' + this.id).then(response => {
                    this.event = response.data.data;
                })
            },
            sendOffer() {
                this.$http.post('/offer', {
                    description: this.description,
                    users_id: this.getUser.id,
                    vacancies_id: this.event.id,
                }).then(() => {
                    alert('Отклик оставлен!');
                    this.getEvent();
                })
            },
            acceptOffer(offer_id) {
                this.$http.get('offer-actions/' + offer_id + '/accept').then(() => {
                    this.getEvent();
                })
            },
            denyOffer(offer_id) {
                return offer_id;
            },
            closeEvent() {
                this.$http.get('close-vacancy/' + this.id).then(() => {
                    this.getEvent();
                });
            }
        }
    }
</script>

<style scoped>

</style>
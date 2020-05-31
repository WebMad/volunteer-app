<template>
    <b-container>
        <h3>Создать событие</h3>
        <form action="" @submit.prevent="createEvent">
            <div class="form-group">
                <label>Заголовок</label>
                <input type="text" v-model="title" required class="form-control" placeholder="Введите заголовок">
            </div>
            <div class="form-group">
                <label>Описание события</label>
                <textarea v-model="description" required class="form-control" placeholder="Введите описание события"></textarea>
            </div>
            <div class="form-group">
                <label>Дата начала</label>
                <b-input-group>
                    <b-form-datepicker required v-model="date_start"></b-form-datepicker>
                    <b-form-timepicker required v-model="time_start"></b-form-timepicker>
                </b-input-group>
            </div>
            <div class="form-group">
                <label>Дата окончания</label>
                <b-input-group>
                    <b-form-datepicker required v-model="date_end"></b-form-datepicker>
                    <b-form-timepicker required v-model="time_end"></b-form-timepicker>
                </b-input-group>
            </div>
            <div class="form-group">
                <label>Город</label>
                <input type="text" v-model="city" class="form-control" @keyup="searchCity"
                       placeholder="Поиск города">
                <b-list-group>
                    <b-list-group-item @click="selectCity(city_option.address.city)" v-for="city_option in city_options"
                                       v-bind:key="city_option.id">{{ city_option.address.city }}
                    </b-list-group-item>
                </b-list-group>
            </div>
            <div class="form-group">
                <label>Адрес</label>
                <input type="text" v-model="address" required class="form-control" placeholder="Введите адрес">
            </div>
            <button class="btn btn-success btn-flat m-auto w-100">
                сохранить
            </button>
        </form>
    </b-container>
</template>

<script>
    export default {
        name: "CreateEvent",
        data() {
            return {
                title: "",
                description: '',
                date_start: '',
                time_start: '',
                date_end: '',
                time_end: '',
                city: '',
                address: '',
                city_options: [],
            }
        },
        methods: {
            createEvent() {
                this.$http.post('/vacancy', {
                    title: this.title,
                    description: this.description,
                    date_start: this.date_start + ' ' + this.time_start,
                    date_end: this.date_end + ' ' + this.time_end,
                    city: this.city,
                    address: this.address,
                }).then(() => {
                    alert('Событие создано!')
                    this.$router.push('/');
                })
            },
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
        }
    }
</script>

<style scoped>

</style>
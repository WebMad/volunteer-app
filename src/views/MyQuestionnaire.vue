<template>
    <b-container>
        <form v-if="questionnaire" action="" @submit.prevent="sendQuestionnaire">
            <div class="form-group">
                <label>Дата рождения</label>
                <input type="date" v-model="questionnaire.birth_date" class="form-control" placeholder="28">
            </div>
            <div class="form-group">
                <label>Ваш город</label>
                <input type="text" v-model="questionnaire.city" class="form-control" @keyup="searchCity"
                       placeholder="Поиск города">
                <b-list-group>
                    <b-list-group-item @click="selectCity(city_option.address.city)" v-for="city_option in city_options"
                                       v-bind:key="city_option.id">{{ city_option.address.city }}
                    </b-list-group-item>
                </b-list-group>
            </div>
            <div class="form-group">
                <label>Опыт волонтерства (в месяцах)</label>
                <input type="number" v-model="questionnaire.experience" class="form-control" min="0" placeholder="6">
            </div>
            <div class="form-group">
                <label>О себе</label>
                <b-textarea placeholder="Расскажите немного о себе" v-model="questionnaire.about"></b-textarea>
            </div>
            <div class="form-group">
                <label>Где до этого вы принимали участие?</label>
                <b-textarea placeholder="Перечислите мероприятия, где вы были в качестве волонтера"
                            v-model="questionnaire.experience_about"></b-textarea>
            </div>
            <button class="btn btn-success btn-flat m-auto w-100">
                сохранить
            </button>
        </form>
    </b-container>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "MyQuestionnaire",
        data() {
            return {
                questionnaire: null,
                city_options: [],
                city: "",
            }
        },
        computed: {
            ...mapGetters('auth', ['getUser'])
        },
        created() {
            this.$http.get('questionnaire').then(response => {
                this.questionnaire = response.data.data
                this.questionnaire.birth_date = this.formatDate(this.questionnaire.birth_date);
            })
        },
        methods: {
            sendQuestionnaire() {
                this.$http.put('questionnaire/' + this.questionnaire.id, {
                    birth_date: this.questionnaire.birth_date,
                    experience: this.questionnaire.experience,
                    about: this.questionnaire.about,
                    experience_about: this.questionnaire.experience_about,
                    city: this.questionnaire.city,
                }).then(() => {
                    alert('Данные сохранены!')
                });
            },
            searchCity() {

                if (this.questionnaire.city) {
                    this.$http.get('/discover?search=' + this.questionnaire.city).then(response => {
                        this.city_options = JSON.parse(response.data).items.slice(0, 5);
                    })
                } else {
                    this.city_options = [];
                }
            },
            selectCity(city) {
                this.city_options = [];
                this.questionnaire.city = city;
            },
            formatDate(date) {
                let start_date = new Date(date),
                    month = '' + (start_date.getMonth() + 1),
                    day = '' + start_date.getDate(),
                    year = start_date.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;

                return [year, month, day].join('-');
            }
        }
    }
</script>

<style scoped>

</style>
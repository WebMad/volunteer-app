<template>
    <div class="filling-que">
        <b-container>
            <h2></h2>
            <form action="" @submit.prevent="login">
                <div class="form-group">
                    <label>Дата рождения</label>
                    <input type="date" v-model="date_of_birth" class="form-control" placeholder="28">
                </div>
                <div class="form-group">
                    <label>Область деятельности (выберите несколько)</label>
                    <b-form-select v-model="selected_field_of_activities" :options="fields_of_activities" multiple/>
                </div>
                <div class="form-group">
                    <label>Опыт волонтерства (в месяцах)</label>
                    <input type="number" v-model="exp" class="form-control" placeholder="6">
                </div>
                <div class="form-group">
                    <label>О себе</label>
                    <b-textarea placeholder="Расскажите немного о себе" v-model="about"></b-textarea>
                </div>
                <div class="form-group">
                    <label>Где до этого вы принимали участие?</label>
                    <b-textarea placeholder="Перечислите мероприятия, где вы были в качестве волонтера"
                                v-model="past_events"></b-textarea>
                </div>
                <button class="btn btn-success btn-flat m-auto w-100">
                    сохранить
                </button>
            </form>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: "FillingQue",
        data() {
            return {
                date_of_birth: "",
                exp: "",
                about: "",
                past_events: "",
                selected_field_of_activities: [],
                fields_of_activities: [],
            };
        },
        methods: {
            sendQue() {
                this.$http.post();
            }
        }
    }
</script>

<style scoped>

</style>
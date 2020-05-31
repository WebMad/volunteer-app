<template>
    <b-container>
        <h4>Мой профиль</h4>
        <p>Фамилия: <span>{{ getUser.last_name }}</span></p>
        <p>Имя: <span>{{ getUser.first_name }}</span></p>
        <p>Отчество: <span>{{ getUser.middle_name }}</span></p>
        <p>Email: <span>{{ getUser.email }}</span></p>
        <p>Роль: <span>{{ getUser.role_id === 1 ? 'Заявитель' : 'Волонтер' }}</span></p>
    </b-container>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "MyProfile",
        computed: {
            ...mapGetters('auth', ['getUser'])
        },
        created() {

        },
        methods: {}
    }
</script>

<style scoped>

</style>
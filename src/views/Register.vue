<template>
    <div class="d-flex align-content-center flex-wrap">
        <div class="container">
            <div class="login-content">
                <div class="login-logo">
                    <router-link to="/">
                        Регистрация
                    </router-link>
                </div>
                <div class="login-form">
                    <span style="color: red;">{{ this.err_msg }}</span>
                    <form action="" @submit.prevent="register">
                        <div class="form-group">
                            <label>Фамилия<span class="text-danger">*</span></label>
                            <input type="text" class="form-control" placeholder="Иванов" v-model="last_name">
                        </div>
                        <div class="form-group">
                            <label>Имя<span class="text-danger">*</span></label>
                            <input type="text" class="form-control" placeholder="Иван" v-model="first_name">
                        </div>
                        <div class="form-group">
                            <label>Отчетство<span class="text-danger">*</span></label>
                            <input type="text" class="form-control" placeholder="Иванович" v-model="middle_name">
                        </div>
                        <div class="form-group">
                            <label>Номер телефона<span class="text-danger">*</span></label>
                            <input type="text" class="form-control" placeholder="8 800 555 35 35" v-model="phone">
                        </div>
                        <div class="form-group">
                            <label>Логин<span class="text-danger">*</span></label>
                            <input type="text" class="form-control" placeholder="imdoctor" v-model="login">
                        </div>
                        <div class="form-group">
                            <label>Электронная почта<span class="text-danger">*</span></label>
                            <input type="text" class="form-control" placeholder="Email" v-model="email">
                        </div>
                        <div class="form-group">
                            <label>Пароль<span class="text-danger">*</span></label>
                            <input type="password" class="form-control" placeholder="dorothy123" v-model="password">
                        </div>
                        <div class="form-group">
                            <label>Повторите пароль<span class="text-danger">*</span></label>
                            <input type="password" class="form-control" placeholder="dorothy123"
                                   v-model="password_confirmation">
                        </div>
                        <div class="form-group">
                            <label>Роль<span class="text-danger">*</span></label>
                            <b-form-select :options="roles" v-model="role_id"></b-form-select>
                        </div>
                        <button class="btn btn-success btn-flat m-auto w-100">
                            Создать аккаунт
                        </button>
                    </form>
                    <div class="register-link mt-2 pt-2 text-center">
                        <p>
                            Уже есть аккаунт?
                            <router-link to="/login">Войдите</router-link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapMutations} from "vuex";

    export default {
        name: "Register",
        data() {
            return {
                login: "",
                first_name: "",
                middle_name: "",
                last_name: "",
                phone: "",
                role_id: 1,
                roles: [
                    {value: 1, text: 'заявитель'},
                    {value: 2, text: 'волонтер'},
                ],
                email: "",
                password: "",
                password_confirmation: "",
                err_msg: "",
            }
        },
        methods: {
            ...mapMutations('auth', ['setToken', 'setUser']),
            register() {
                this.err_msg = "";
                if (this.login && this.email && this.password && this.password_confirmation) {
                    if (this.password === this.password_confirmation) {
                        this.$http.post('auth/register', {
                            login: this.login,
                            last_name: this.last_name,
                            first_name: this.first_name,
                            middle_name: this.middle_name,
                            phone: this.phone,
                            password: this.password,
                            role_id: this.role_id,
                            password_confirmation: this.password_confirmation,
                            email: this.email
                        }).then(response => {
                            if (response.data.msg === 'Register success') {
                                this.$http.post('auth/login', {
                                    login: this.login,
                                    password: this.password,
                                }).then(response => {
                                    this.setToken(response.data.token);
                                    this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
                                    this.$http.get('auth/user').then(response => {
                                        this.setUser(response.data.data);
                                        this.$router.push('/');
                                    });
                                });
                            } else {
                                this.err_msg = 'Произошла ошибка'
                            }
                        })
                    } else {
                        this.err_msg = "Пароли не совпадают"
                    }
                } else {
                    this.err_msg = "Не все поля заполнены"
                }
            }
        }
    }
</script>

<style scoped>
    .container {

    }

    .login-logo {
        text-align: center;
        font-size: 24px;
        margin: 20px auto 20px;
    }
</style>
<template>
    <div class="d-flex align-content-center flex-wrap">
        <div class="container">
            <div class="login-content">
                <div class="login-logo">
                    <router-link to="/">
                        Авторизация
                    </router-link>
                </div>
                <div class="login-form">
                    <span style="color: red;">{{ this.err_msg }}</span>
                    <form action="" @submit.prevent="sendLogin">
                        <div class="form-group">
                            <label>Логин<span class="text-danger">*</span></label>
                            <input type="text" v-model="login" class="form-control" placeholder="Логин">
                        </div>
                        <div class="form-group">
                            <label>Пароль<span class="text-danger">*</span></label>
                            <input type="password" v-model="password" class="form-control" placeholder="Password">
                        </div>
                        <button class="btn btn-success btn-flat m-auto w-100">
                            ВОЙТИ
                        </button>
                    </form>
                    <div class="register-link mt-2 pt-2 text-center">
                        <p>
                            Нет аккаунта?
                            <router-link to="/register">Зарегистрируйтесь</router-link>
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
        name: "Login",
        data() {
            return {
                login: "",
                password: "",
                err_msg: "",
            }
        },
        methods: {
            ...mapMutations('auth', [
                'setToken',
                'setUser'
            ]),
            sendLogin() {
                this.err_msg = "";
                this.$http.post('auth/login', {
                    login: this.login,
                    password: this.password,
                }).then(response => {
                    if (response.data.msg !== "Login failed") {
                        this.setToken(response.data.token);
                        this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
                        this.$http.get('auth/user').then(response => {
                            this.setUser(response.data.data);
                            this.$router.push('/');
                        });
                    } else {
                        this.err_msg = "Неверный логин или пароль"
                    }
                })
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
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
                    <form action="" @submit.prevent="login">
                        <div class="form-group">
                            <label>Электронная почта<span class="text-danger">*</span></label>
                            <input type="text" class="form-control" placeholder="Email">
                        </div>
                        <div class="form-group">
                            <label>Пароль<span class="text-danger">*</span></label>
                            <input type="password" class="form-control" placeholder="Password">
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
    export default {
        name: "Login"
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
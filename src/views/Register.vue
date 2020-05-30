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
                    <form action="" @submit.prevent="login">
                        <div class="form-group">
                            <label>Электронная почта<span class="text-danger">*</span></label>
                            <input type="text" class="form-control" placeholder="Email">
                        </div>
                        <div class="form-group">
                            <label>Пароль<span class="text-danger">*</span></label>
                            <input type="password" class="form-control" placeholder="Password">
                        </div>
                        <div class="form-group">
                            <label>ФИО<span class="text-danger">*</span></label>
                            <input type="text" class="form-control" placeholder="ФИО">
                        </div>
                        <div class="form-group">
                            <label>Место проживания<span class="text-danger">*</span></label>
                            <input type="text" class="form-control" placeholder="г. Москва, ул. Новосельская, д22, кв75">
                        </div>
                        <div class="form-group">
                            <label>Дата рождения<span class="text-danger">*</span></label>
                            <input type="date" class="form-control" placeholder="18.04.2000">
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
    export default {
        name: "Register"
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
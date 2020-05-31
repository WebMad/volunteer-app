<template>
  <div id="app">
    <b-navbar toggleable="" v-if="isAuth" type="dark" variant="dark">
      <b-navbar-brand>Volunteer</b-navbar-brand>
      <b-navbar-toggle target="navbar-toggle-collapse">
        <template v-slot:default="{ expanded }">
          <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
          <b-icon v-else icon="chevron-bar-down"></b-icon>
        </template>
      </b-navbar-toggle>

      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/">Главная</b-nav-item>
          <b-nav-item to="/events">События</b-nav-item>
          <b-nav-item to="/events/create" v-if="getUser.role_id === 1">Создать событие +</b-nav-item>
          <b-nav-item to="/questionnaire">Моя анкета</b-nav-item>
          <b-nav-item to="/profile">Мой профиль</b-nav-item>
          <b-nav-item to="/logout">Выход</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div style="margin-top: 10px">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  name: 'App',
  components: {
  },
  computed: {
    ...mapGetters("auth", ['isAuth', 'getUser'])
  }
}
</script>

<style>
</style>

const auth = {
    namespaced: true,
    state: () => ({
        user: null,//TODO: изменить на null
        token: null
    }),
    mutations: {
    },
    actions: {},
    getters: {
        getUser(state) {
            return state.user;
        },
        isAuth(state) {
            return !!state.user;
        }
    },
}

export default auth
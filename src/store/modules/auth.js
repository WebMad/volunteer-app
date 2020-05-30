const auth = {
    namespaced: true,
    state: () => ({
        user: null,
        token: null
    }),
    mutations: {
        logout(state) {
            state.token = null;
            state.user = null;
        },
        setToken(state, token) {
            state.token = token
        },
        setUser(state, user) {
            state.user = user
        },
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
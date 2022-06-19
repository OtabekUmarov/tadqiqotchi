export const state = () => ({
    isSidebar: false,
})
export const getters = {
    isSidebar(state) {
        return state.isSidebar
    }
}
export const mutations = {
    setState(state, { payload, key }) {
        state[key] = payload
    }
}
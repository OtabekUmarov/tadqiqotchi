
export const state = () => ({
    list: [],
    loading: true,
    count: 0,
})

export const getters = {
    loading: state => state.loading,
    list: state => state.list,
    count: state => state.count,
}
export const mutations = {
    setState(state, { key, payload }) {
        state[key] = payload
    }
}
export const actions = {
    getList({ commit }, { params }) {
        return new Promise(async (resolve, reject) => {
            try {
                commit("setState", { key: "loading", payload: true })
                const { data } = await this.$axios.get("/admin/log/list/", { params })
                const { results, count } = data || {}
                commit("setState", { key: `list`, payload: results })
                commit("setState", { key: `count`, payload: count })
                commit("setState", { key: "loading", payload: false })
                resolve(data)
            } catch (_) {
                commit("setState", { key: `list`, payload: [] })
                commit("setState", { key: "loading", payload: false })
                reject(false)
            }
        })
    },
}
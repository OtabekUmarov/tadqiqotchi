
export const state = () => ({
    list: [],
    detail: {},
    loading: true,
    count: 0,
})

export const getters = {
    loading: state => state.loading,
    detail: state => state.detail,
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
                const { data } = await this.$axios.get("/advisor/task/list/", { params })
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
    async postDetail(_, { form }) {
        try {
            let res = await this.$axios.post('/advisor/task/create/', form)
            return res
        } catch (e) {
            return e
        }
    },
}
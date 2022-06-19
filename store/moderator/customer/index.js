export const state = () => ({
    list: [],
    detail: {},
    loading: false,
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
                const { data } = await this.$axios.get("/admin/applicant/moderator/customer/list/", { params })
                const { results, count } = data || {}
                commit("setState", { key: `list`, payload: results })
                commit("setState", { key: `count`, payload: count })
                commit("setState", { key: "loading", payload: false })
                resolve(data)
            } catch (_) {
                commit("setState", { key: "loading", payload: false })
                reject(false)
            }
        })
    },
    // getDetail({ commit }, { id }) {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             commit("setState", { key: "loading", payload: true })
    //             let res = await this.$axios.get(`/example/detail/${id}/`)
    //             commit("setState", { key: "detail", payload: res.data })
    //             commit("setState", { key: "loading", payload: false })
    //             resolve(res && res.data)
    //         } catch (_) {
    //             commit("setState", { key: "loading", payload: false })
    //             reject(false)
    //         }
    //     })
    // },
}
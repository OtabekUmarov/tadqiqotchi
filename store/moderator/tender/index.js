import statusList from "@/constants/moderatorTenderStatus";
export const state = () => ({
    list: [],
    detail: {},
    loading: false,
    count: 0,
    statusList,
})
export const getters = {
    loading: state => state.loading,
    detail: state => state.detail,
    list: state => state.list,
    count: state => state.count,
    statusList: state => state.statusList,
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
                const { data } = await this.$axios.get("/admin/applicant/moderator/tender/list/", { params })
                const { results, count } = data || {}
                results.forEach(app => {
                    statusList.forEach(status => {
                        if (app.status == status.key) {
                            app.customStatus = status
                        }
                    })
                });
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
    getDetail({ commit }, { id }) {
        return new Promise(async (resolve, reject) => {
            try {
                commit("setState", { key: "loading", payload: true })
                const { data } = await this.$axios.get(`/admin/applicant/moderator/tender/${id}/detail/`)
                statusList.find(status => {
                    if (data.status == status.key)
                        data.customStatus = status
                })
                commit("setState", { key: "detail", payload: data })
                commit("setState", { key: "loading", payload: false })
                resolve(data)
            } catch (_) {
                commit("setState", { key: "loading", payload: false })
                reject(false)
            }
        })
    },
    async putStatus(_, { form, id }) {
        try {
            let res = await this.$axios.patch(`/admin/applicant/moderator/tender/${id}/update/status/`, form)
            Promise.resolve(true)
            return res
        } catch (e) {
            Promise.reject(false)
        }
    },
}
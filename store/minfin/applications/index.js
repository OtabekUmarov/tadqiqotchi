import statusList from "@/constants/minfinApplicationStatus";

export const state = () => ({
    list: [],
    loading: false,
    count: 0,
    statusList
})

export const getters = {
    loading: state => state.loading,
    list: state => state.list,
    count: state => state.count,
    statusList: state => state.statusList
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
                const { data } = await this.$axios.get("/admin/applicant/minfin_moderator/tender-application/list/", { params })
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
    async approve(_, { status, id }) {
        try {
            let res = await this.$axios.patch(`/admin/applicant/minfin_moderator/tender-application/${id}/update/`, { status })
            Promise.resolve(true)
            return res
        } catch (e) {
            Promise.reject(false)
        }
    },
    async putStatus(_, { status, id }) {
        try {
            let res = await this.$axios.patch(`/admin/applicant/minfin_moderator/tender-application/${id}/update/`, { status })
            Promise.resolve(true)
            return res
        } catch (e) {
            Promise.reject(false)
        }
    },
}
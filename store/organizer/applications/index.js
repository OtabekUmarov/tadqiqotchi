import statusList from "@/constants/organizerApplicationStatus";
export const state = () => ({
    list: [],
    detail: {},
    loading: false,
    statusList,
    count: 0,
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
                let { data } = await this.$axios.get("/admin/applicant/organizer/tender-aplication/list/", { params })
                let { results, count } = data || {}
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
                let { data } = await this.$axios.get(`/admin/applicant/organizer/tender-aplication/${id}/detail/`)
                statusList.find(status => {
                    if (data.status == status.key) 
                    data.customStatus = status
                })
                commit("setState", { key: `detail`, payload: data })
                commit("setState", { key: "loading", payload: false })
                resolve(data)
            } catch (_) {
                commit("setState", { key: "loading", payload: false })
                commit("setState", { key: `detail`, payload: {} })
                reject(false)
            }
        })
    },
    
    async approve(_, { status, id }) {
        try {
            let res = await this.$axios.patch(`/admin/applicant/organizer/tender-aplication/${id}/update/status/`, {status})
            Promise.resolve(true)
            return res
        } catch (e) {
            Promise.reject(false)
        }
    },
    async reject(_, { form, id }) {
        try {
            let res = await this.$axios.patch(`/admin/applicant/organizer/tender-aplication/${id}/update/status/`, form)
            Promise.resolve(true)
            return res
        } catch (e) {
            Promise.reject(false)
        }
    },
    async postState(_, { form}) {
        try {
            let res = await this.$axios.post(`/admin/applicant/organizer/tender/statement/create/`, form)
            Promise.resolve(true)
            return res
        } catch (e) {
            Promise.reject(false)
        }
    },
}
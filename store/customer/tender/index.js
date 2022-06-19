import statusList from "@/constants/customerTenderStatus";

export const state = () => ({
    list: [],
    detail: {},
    loading: true,
    protocolLoading: true,
    count: 0,
    statusList,
})

export const getters = {
    loading: state => state.loading,
    protocolLoading: state => state.protocolLoading,
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
                const { data } = await this.$axios.get("/admin/applicant/customer/tender/list/", { params })
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
                commit("setState", { key: `list`, payload: [] })
                commit("setState", { key: "loading", payload: false })
                reject(false)
            }
        })
    },
    getDetail({ commit }, { id }) {
        return new Promise(async (resolve, reject) => {
            try {
                commit("setState", { key: "loading", payload: true })
                let {data} = await this.$axios.get(`/admin/applicant/customer/tender/${id}/detail/`)

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
    getDetailProtocol({ commit }, { id }) {
        return new Promise(async (resolve, reject) => {
            try {
                commit("setState", { key: "protocolLoading", payload: true })
                let res = await this.$axios.get(`/admin/applicant/customer/tender-protocol/${id}/detail/`)
                commit("setState", { key: "protocolLoading", payload: false })
                resolve(res && res.data)
            } catch (_) {
                commit("setState", { key: "protocolLoading", payload: false })
                reject(false)
            }
        })
    },
    getProtocolList({ commit }, { id }) {
        return new Promise(async (resolve, reject) => {
            try {
                commit("setState", { key: "protocolLoading", payload: true })
                let res = await this.$axios.get(`/admin/applicant/customer/tender-protocol/${id}/detail/`)
                commit("setState", { key: "protocolLoading", payload: false })
                resolve(res && res.data)
            } catch (_) {
                commit("setState", { key: "protocolLoading", payload: false })
                reject(false)
            }
        })
    },
    getDetailProtocolParticipant(_, { id }) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.$axios.get(`/admin/applicant/customer/participant/tender-application/${id}/detail/`)
                resolve(res && res.data)
            } catch (_) {
                reject(false)
            }
        })
    },
    async postDetail(_, { form }) {
        try {
            let res = await this.$axios.post('/admin/applicant/customer/tender/create/', form)
            Promise.resolve(true)
            return res
        } catch (e) {
            Promise.reject(false)
        }
    },
    async postContract(_, { form }) {
        try {
            let res = await this.$axios.post('/admin/applicant/customer/tender/contract/create/', form)
            return res
        } catch (e) {
            console.log(e.response)
            return e
        }
    },
    getOrganizerList(_, { params }) {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await this.$axios.get("/admin/applicant/organizer/list/", { params })
                resolve(data)
            } catch (_) {
                reject(false)
            }
        })
    },
    async approve(_, { status, id }) {
        try {
            let res = await this.$axios.patch(`/admin/applicant/customer/tender/${id}/update/status/`, {status})
            Promise.resolve(true)
            return res
        } catch (e) {
            Promise.reject(false)
        }
    },
    async reject(_, { form, id }) {
        try {
            let res = await this.$axios.patch(`/admin/applicant/customer/tender/${id}/update/status/`, form)
            Promise.resolve(true)
            return res
        } catch (e) {
            Promise.reject(false)
        }
    },
}
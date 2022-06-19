import statusList from "@/constants/participantTenderStatus";
export const state = () => ({
    list: [],
    detail: {},
    listLoading: false,
    detailLoading: false,
    formLoading: false,
    count: 0,
    statusList,
})
export const getters = {
    listLoading: state => state.listLoading,
    detailLoading: state => state.detailLoading,
    formLoading: state => state.formLoading,
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
    getList({ commit }, { params, myList }) {
        return new Promise(async(resolve, reject) => {
            try {
                commit("setState", { key: "listLoading", payload: true })
                commit("setState", { key: "detailLoading", payload: true })
                commit("setState", { key: `list`, payload: [] })
                let url = myList ? "/admin/applicant/participant/my-tender/list/" : "/admin/applicant/participant/tender/list/"
                const { data } = await this.$axios.get(url, { params })
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
                commit("setState", { key: "listLoading", payload: false })
                resolve(data)
            } catch (_) {
                commit("setState", { key: "listLoading", payload: false })
                reject(false)
            }
        })
    },
    getDetail({ commit }, { id, myDetail }) {
        return new Promise(async(resolve, reject) => {
            try {
                commit("setState", { key: "detailLoading", payload: true })
                let url = myDetail ? `/admin/applicant/participant/my-tender/${id}/detail/` : `/admin/applicant/participant/tender/${id}/detail/`;
                const { data } = await this.$axios.get(url)
                statusList.find(status => {
                    if (data.status == status.key)
                        data.customStatus = status
                })
                commit("setState", { key: "detail", payload: data })
                commit("setState", { key: "detailLoading", payload: false })
                resolve(data)
            } catch (_) {
                commit("setState", { key: `detail`, payload: {} })
                commit("setState", { key: "detailLoading", payload: false })
                reject(false)
            }
        })
    },
    async postDetail(_, { form }) {
        try {
            let res = await this.$axios.post('/admin/applicant/participant/tender-aplication/create/', form)
            Promise.resolve(res)
            return res
        } catch (e) {
            Promise.reject(false)
        }
    },
    async setStatus(_, { id, status }) {
        try {
            let res = await this.$axios.patch(`/admin/applicant/participant/my-tender/${id}/update/status/`, { status })
            Promise.resolve(true)
            return res
        } catch (e) {
            Promise.reject(false)
        }
    }
}
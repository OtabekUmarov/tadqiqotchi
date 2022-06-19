import statusList from "@/constants/organizerTenderStatus";
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
                const { data } = await this.$axios.get("/admin/applicant/organizer/tender/list/", { params })
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
                commit("setState", { key: `detail`, payload: {} })
                const { data } = await this.$axios.get(`/admin/applicant/organizer/tender/${id}/detail/`)
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
    async postDetail({dispatch}, { form, id }) {
        try {
            let res = await this.$axios.patch(`/admin/applicant/organizer/tender/${id}/update/`, form)
            Promise.resolve(true)
            dispatch("getDetail", { id })
            return res
        } catch (e) {
            Promise.reject(false)
        }
    },
    async getRegionList() {
        try {
            const {data} = await this.$axios.get("/admin/common/region/list/")
            return data
        } catch (err) {
            console.log(err)
        }
    },
    async getDistrictList(_,{id}) {
        try {
            const {data} = await this.$axios.get("/admin/common/district/list/", {
                params: {
                    region: id
                }
            })
            return data
        } catch (err) {
            console.log(err)
        }
    },
    async StateList() {
        try {
            let {data} = await this.$axios.get(`/admin/applicant/organizer/tender/statement/list/`)
            return data
        } catch (e) {
            console.log(e)
        }
    },
    async minimumScoreList() {
        try {
            let {data} = await this.$axios.get(`/admin/applicant/organizer/tender-participant-rating-category/list/`)
            return data
        } catch (e) {
            console.log(e)
        }
    },
    async salaryValue() {
        try {
            let {data} = await this.$axios.get(`/admin/applicant/organizer/minimum-salary/last/`)
            return data
        } catch (e) {
            console.log(e)
        }
    },
}
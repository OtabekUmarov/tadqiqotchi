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
                const { data } = await this.$axios.get("/admin/applicant/moderator/minimum-salary/list/", { params })
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
    async postDetail(_, { form }) {
        try {
            let res = ''
            if (form.id) {
                let id = form.id
                delete form.id
                res = await this.$axios.put(`/admin/applicant/moderator/minimum-salary/${id}/update/`, form)
            } else {
              res = await this.$axios.post('/admin/applicant/moderator/minimum-salary/create/', form) }
            Promise.resolve(true)
            return res
        } catch (e) {
            Promise.reject(false)
        }
    },
    async deleteDetail(_, { id }) {
        try {
            await this.$axios.delete("/admin/applicant/moderator/minimum-salary/" + id + "/delete/")
            Promise.resolve(true)
        } catch (e) {
            console.log(e)
            Promise.reject(false)
        }
    },
  }
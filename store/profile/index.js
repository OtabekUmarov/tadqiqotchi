
export const state = () => ({
  detail: {},
  loading: true,
})

export const getters = {
  loading: state => state.loading,
  detail: state => state.detail,
}
export const mutations = {
  setState(state, { key, payload }) {
      state[key] = payload
  }
}

export const actions = {
  getDetail({ commit }) {
    return new Promise(async (resolve, reject) => {
        try {
            commit("setState", { key: "loading", payload: true })
            const { data } = await this.$axios.get(`/user/detail/`)
            commit("setState", { key: "detail", payload: data })
            commit("setState", { key: "loading", payload: false })
            resolve(data)
        } catch (_) {
            commit("setState", { key: "loading", payload: false })
            reject(false)
        }
    })
  },
  async postDetail(_, { form, id }) {
      try {
          delete form.password
          delete form.username
          delete form.role
          let res = await this.$axios.patch('/user/update/'+ id + '/', form)
          return res
      } catch (e) {
          return e
      }
  },
}

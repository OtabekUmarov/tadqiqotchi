export const state = () => ({
  eriList: [],
  regionList: [],
  districtList: [],
})

export const getters = {
  eriList: state => state.eriList,
  regionList: state => state.regionList,
  districtList: state => state.districtList,
}

export const mutations = {
  setState(state, { key, payload }) {
      state[key] = payload
  }
}

export const actions = {
  getEriList({ commit }) {
      return new Promise(async(resolve, reject) => {
          try {
              const {data} = await this.$axios.get("/admin/common/district/list/")
              const { results } = data || {}
              commit("setState", { key: `eriList`, payload: results })
              resolve(true)
          } catch (_) {
              reject(false)
          }
      })
  },
  getRegionList({ commit }) {
      return new Promise(async(resolve, reject) => {
          try {
              const {data} = await this.$axios.get("/admin/common/region/list/")
              commit("setState", { key: `regionList`, payload: data })
              resolve(true)
          } catch (_) {
              reject(false)
          }
      })
  },
  getDistrictList({ commit }) {
      return new Promise(async(resolve, reject) => {
          try {
              const {data} = await this.$axios.get("/admin/common/district/list/")
              const { results } = data || {}
              commit("setState", { key: `districtList`, payload: results })
              resolve(true)
          } catch (_) {
              reject(false)
          }
      })
  },

}
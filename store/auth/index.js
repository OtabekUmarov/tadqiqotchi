export const state = () => ({
  access: "",
  auth_user: '',
  role: null,
  user_info: null,
  none_auth: false,
  user_error: ''
})

export const getters = {
  access(state) {
    return state.access
  },
  auth_user(state) {
    return state.auth_user
  },
  user_info(state) {
    return state.user_info
  },
  role(state) {
    return state.role
  },
  none_auth(state) {
    return state.none_auth
  },
  user_error(state) {
    return state.user_error
  }
}

export const mutations = {
  setState(state, {key, payload}) {
    state[key] = payload
    key == 'access' && payload && localStorage.setItem(key, payload)
    key == 'access' && !payload && localStorage.removeItem(key)
    key == 'user_info' && !payload && localStorage.removeItem(key)
    key == 'user_info' && payload && localStorage.setItem(key, JSON.stringify(payload))
    // key == 'auth_user' && payload && localStorage.setItem(key, JSON.stringify(payload))
    key == 'auth_user' && payload && localStorage.setItem(key,payload)
    key == 'auth_user' && !payload && localStorage.removeItem(key)
    key == 'role' && payload && localStorage.setItem(key, payload)
    key == 'role' && !payload && localStorage.removeItem(key)
  }
}

export const actions = {
  async login({commit, dispatch}, payload) {
    try {
      await this.$axios.post('https://shaffof-api.mdg.uz/authapp/access/', payload).then(res => {
        const access_token = res.data.access
        const token_split = access_token.split(".")
        const fields_str = JSON.parse(atob(token_split[1]))
        console.log("fields_str", fields_str)
        if  (fields_str.sent_role == 'Customer') {
          fields_str.sent_role = 'Admin'
        }
        commit('setState', {key: "auth_user", payload: fields_str.sent_role})
        commit('setState', {key: "user_error", payload: ''})
        commit('setState', {key: "user_info", payload: fields_str})
        commit('setState', {key: "access", payload: access_token})
        commit('setState', {key: "role", payload: fields_str.sent_role})
        dispatch('smartRouting', fields_str)
        console.log(res)
        return res
      })
      .catch(err => {
        let error = err.response.data.detail
        if(error == 'sent role does not fit user role' || error == 'No active account found with the given credentials') {
          console.log("sent role does not fit user role")
          commit('setState', {key: "user_error", payload: "Bunday foydalanuvchi topilmadi"})
        }
        return err.response
      })
    } catch(err) {
      commit('setState', {key: "none_auth", payload: true})
      console.log(err)
      return err
    }
  },
  smartRouting({state}, {sent_role}) {
    console.log("sent_role", sent_role)
    state.role == sent_role ;
    if(sent_role == "Admin"){
      this.$router.push('/cabinet/admin')
    }else if(sent_role == 'Participant'){
      this.$router.push('/cabinet/participant')
    }else if(sent_role == 'Organizer'){
      this.$router.push('/cabinet/organizer')
    } else if(sent_role == 'Moderator'){
      this.$router.push('/cabinet/moderator')
    } else if(sent_role == 'Minfin_moderator'){
      this.$router.push('/cabinet/minfin-moderator')
    }
  },
  newValues({commit}){
    commit('setState', {key: "access", payload: localStorage.getItem('access') || "" })
    commit('setState', {key: "auth_user", payload: JSON.parse(localStorage.getItem('auth_user')) || {} })
    commit('setState', {key: "role", payload: localStorage.getItem('role') || null })
  },
  async logout({ commit }) {
    await this.$axios.post("https://shaffof-api.mdg.uz/authapp/logout/").then(res => {
      console.log(res.data.status);
    })
    commit('setState', {key: "auth_user", payload: ''})
    commit('setState', {key: "access", payload: ''})
    commit('setState', {key: "role", payload: ''})
    commit('setState', {key: "user_info", payload: ''})
    // localStorage.removeItem("tokens")
  }
}

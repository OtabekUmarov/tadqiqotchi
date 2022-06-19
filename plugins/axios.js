export default function ({ app, $axios,  redirect  }) {
  // const axiosInstance = $axios.create({
  //   // baseURL: process.env.VUE_APP_BASE_URL,
  //   // baseURL: "http://167.172.170.110:8001/api/v1",
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  // })
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    console.log(code)
    if (code === 401) {
      redirect('/auth/sign-in')
    }
  })
  $axios.onRequest(config => {
    const access = localStorage.getItem('access')
    console.log("config", config)
      $axios.setHeader(
          "Authorization",
          access ? `Bearer ${access}` : ""
      );
      $axios.setHeader(
          "Accept-Language",
          app.i18n._vm.locale          
      );
      return config
  });

  $axios.onResponse(config => {
      return config
  })
  // const access = localStorage.getItem('access')
  // access && $axios.setHeader('Authorization', `Bearer ${access}`)
}

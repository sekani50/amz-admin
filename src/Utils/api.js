import axios from "./useAxios";

//credentials for verfication
export const credentials = (token, payload) => {
  return axios.post("/associate/setup", payload, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
}

///associate/captcha
export const captchaAnswer = (token, payload) => {
  return axios.post("/associate/captcha", payload, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
}

//get product
export const getProducts = (token, payload) => {
  return axios.post('/admin/products', payload, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
}

//get metrics  
export const getMetrics = (token) => {
  return axios.get('/products/metric', {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
}

///admin/users
export const getUsers = (token, payload) => {
  return axios.post('/admin/users', payload, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
}


//post videos  
export const getVideos = (token, payload) => {
  return axios.post('/admin/videos', payload, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
}


export const getVideoMetric = (token) => {
  return axios.get('/admin/video/metrics', {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
}

// /admin/user/:user
export const updateUser = (token, id) => {
  return axios.put(`/admin/user/:${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
}


// /password/change
export const changePassword = (token, payload) => {
  return axios.put(`/password/change`, payload, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
}

// /password/forgot
export const sendMail = (token, payload) => {
  return axios.post(`/password/forgot`, payload, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
}


// 
export const getCredentials = (token) => {
  return axios.get('/associate/credentials', {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
}
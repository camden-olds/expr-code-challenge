import axios from 'axios'
import swal from 'sweetalert2'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
})

instance.interceptors.response.use(function (response) {
  return response
  }, 
  function (err) {
    console.log(err)
    swal.fire({
      title: 'An Error Occurred',
      text: 'An error has ocurred while processing your request. Please check the console',
      icon: 'error'
    })
    return Promise.reject(err)
  }
)

export default instance
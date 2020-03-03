import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  addFavorite(restaurantId) {
    // axios.post 若無放送 data ，記得放 null
    return apiHelper.post(`/favorite/${restaurantId}`, null, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  deleteFavorite(restaurantId) {
    return apiHelper.delete(`/favorite/${restaurantId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  addLike(restaurantId) {
    // axios.post 若無放送 data ，記得放 null
    return apiHelper.post(`/like/${restaurantId}`, null, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  deleteLike(restaurantId) {
    return apiHelper.delete(`/like/${restaurantId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getCurrentUser() {
    return apiHelper.get('/get_current_user', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  get({ userId }) {
    return apiHelper.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getTopUsers() {
    return apiHelper.get('/users/top', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
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
  },
  addFollowing(followingId) {
    // axios.post 若無放送 data ，記得放 null
    return apiHelper.post(`/following/${followingId}`, null, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  deleteFollowing(followingId) {
    return apiHelper.delete(`/following/${followingId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
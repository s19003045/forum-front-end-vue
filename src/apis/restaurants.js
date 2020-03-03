import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token') //此處為箭頭函式！！省略 return
// 不可使用 const getToken = localStorage.getItem('token')  ，不然再 vue 實例中使用 getRestaurants 時會失

export default {
  getRestaurants({ page, categoryId }) {
    const searchParams = new URLSearchParams({ page, categoryId })
    return apiHelper.get(`/restaurants?${searchParams.toString()}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getRestaurantsFeeds() {
    return apiHelper.get(`/restaurants/feeds`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getTopRestaurants() {
    return apiHelper.get(`/restaurants/top`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },

}
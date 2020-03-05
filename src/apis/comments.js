import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  deleteComment(commentId) {
    return apiHelper.delete(`/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  createComment({ text, restaurantId }) {
    return apiHelper.post(`/comments`, { text, restaurantId }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
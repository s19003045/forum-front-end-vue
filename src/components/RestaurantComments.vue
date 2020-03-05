<template>
  <div>
    <h2 class="my-4">所有評論：</h2>
    <div>
      <div v-for="comment in restaurantComments" :key="comment.id">
        <blockquote class="blockquote mb-0">
          <button
            v-if="currentUser.isAdmin"
            type="button"
            class="btn btn-danger float-right"
            @click.prevent.stop="handleDeleteButtonClick(comment.id)"
          >Delete</button>
          <h3>
            <router-link :to="{name:'users',params:{id:comment.User.id}}">{{ comment.User.name }}</router-link>
          </h3>
          <p>{{ comment.text }}</p>
          <footer class="blockquote-footer">{{ comment.createdAt | fromNow }}</footer>
        </blockquote>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
// import store
import { mapState } from "vuex";
// import API
import commentsAPI from "../apis/comments";
// import utils
import { fromNowFilter } from "../utils/mixins";
import { Toast } from "../utils/helpers";

export default {
  mixins: [fromNowFilter],
  props: {
    restaurantComments: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  methods: {
    async handleDeleteButtonClick(commentId) {
      try {
        const { data, statusText } = await commentsAPI.deleteComment(commentId);

        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        // 觸發父層事件 - $emit( '事件名稱' , 傳遞的資料 )
        this.$emit("after-delete-comment", commentId);

        Toast.fire({
          icon: "success",
          title: "已成功刪除該筆評論"
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "刪除該筆評論失敗，請稍後再試"
        });
      }
    }
  }
};
</script>
<template>
  <form @submit.prevent.stop="handleSubmit">
    <div class="form-group">
      <label for="text">留下評論：</label>
      <input type="hidden" name="restaurantId" v-model="restaurantId" />
      <textarea v-model="text" class="form-control" rows="3" name="text" />
    </div>
    <div class="text-right">
      <button type="submit" class="btn btn-primary mr-0">Submit</button>
    </div>
  </form>
</template>

<script>
// import API
import commentsAPI from "../apis/comments";
// import utils
import { Toast } from "../utils/helpers";
// import modules
import uuid from "uuid/v4";

export default {
  props: {
    restaurantId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      text: ""
    };
  },
  methods: {
    async handleSubmit() {
      // TODO: 向 API 發送 POST 請求
      try {
        const { data, statusText } = await commentsAPI.createComment({
          text: this.text,
          restaurantId: this.restaurantId
        });

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        // 觸發父層事件 - $emit( '事件名稱' , 傳遞的資料 )
        this.$emit("after-create-comment", {
          commentId: uuid(), // 尚未串接 API 暫時使用隨機的 id
          restaurantId: this.restaurantId,
          text: this.text
        });

        this.text = ""; // 將表單內的資料清空
        Toast.fire({
          icon: "success",
          title: "已成功新增評論"
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "新增該筆評論失敗，請稍後再試"
        });
      }
    }
  }
};
</script>
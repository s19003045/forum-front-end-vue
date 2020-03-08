<template>
  <div class="row">
    <div class="mt-5 col col-md-6 mx-auto">
      <form action method="POST" enctype="multipart/form-data" @submit.prevent.stop="handleSubmit">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            name="name"
            id="name"
            placeholder="Enter Name"
            v-model="user.name"
          />
        </div>
        <div class="form-group">
          <label for="image">Image</label>
          <img
            v-if="previewImage"
            :src="previewImage"
            width="300"
            height="300"
            class="d-block img-thumbnail mb-3"
          />
          <input
            type="file"
            class="form-control-file"
            accept="image/*"
            id="image"
            name="image"
            @change="handleFileChange"
          />
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
// import componets

// import store
import { mapState } from "vuex";
// import APIs
import usersAPI from "../apis/users";
// import utils
import { Toast } from "../utils/helpers";

// import utils
export default {
  data() {
    return {
      user: {},
      isProcessing: true,
      previewImage: null,
      imageFile: null
    };
  },
  computed: {
    ...mapState(["currentUser"])
  },
  created() {
    this.user = {
      ...this.user,
      ...this.currentUser
    };
    this.previewImage = this.user.image;
  },
  methods: {
    handleFileChange(e) {
      this.imageFile = e.target.files[0];
      const reader = new FileReader();

      // 將讀取到的檔案轉成 URL
      reader.readAsDataURL(this.imageFile);

      // 準備開始讀取
      reader.onloadstart = e => {
        Toast.fire({
          position: "center",
          icon: "warning",
          title: "讀取中...",
          timer: 500
        });
      };
      // 讀取失敗
      reader.onerror = e => {
        Toast.fire({
          position: "center",
          icon: "error",
          title: "讀取被中斷，請稍後再試"
        });
      };
      // 讀取完成
      reader.onload = e => {
        this.previewImage = e.target.result;
        Toast.fire({
          position: "center",
          icon: "success",
          title: "檔案讀取結束，可以點擊 submit 上傳了",
          timer: 1000
        });
      };
    },
    async handleSubmit(e) {
      try {
        const form = e.target;
        const formData = new FormData(form);

        // 打 API, 並夾帶 formData
        const response = await usersAPI.putUser({
          userId: this.user.id,
          formData: formData
        });

        const { data, statusText } = response;
        if (statusText !== "OK") {
          throw new Error(statusText);
        } else {
          Toast.fire({
            icon: "success",
            title: "使用者資料編輯成功"
          });
        }
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "使用者資料編輯失敗，請稍後再試"
        });
      }
    }
  }
};
</script>
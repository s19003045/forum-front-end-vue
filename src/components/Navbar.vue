<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark mb-5">
    <router-link class="navbar-brand" to="/">餐廳評論網</router-link>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>

    <div id="navbarSupportedContent" class="navbar-collapse collapse">
      <div class="ml-auto d-flex align-items-center">
        <!-- is user is admin -->
        <router-link v-if="currentUser.isAdmin" to="#" class="text-white mr-3">管理員後台</router-link>

        <!-- is user is login -->
        <template v-if="isAuthenticated">
          <router-link
            v-if="isAuthenticated"
            :to="{name:'users',params:{id:currentUser.id}}"
            class="text-white mr-3"
          >{{ currentUser.name || '使用者' }} 您好</router-link>

          <!-- <router-link
            :to="{name:'logout'}"
            @click.prevent.stop="logout"
            type="button"
            class="btn btn-sm btn-outline-success my-2 my-sm-0"
          >登出</router-link>-->
          <button
            @click.prevent.stop="logout"
            type="button"
            class="btn btn-sm btn-outline-success my-2 my-sm-0"
          >登出</button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
// import store
import { mapState } from "vuex";
import store from "../store";
// import utils
import { Toast } from "../utils/helpers";

import router from "../router";

export default {
  name: "NavbarVue",
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  methods: {
    logout() {
      // 清除 store 中的 currentUser 及 isAuthenticated 改成 false
      this.$store.commit("revokeAuthentication");

      Toast.fire({
        icon: "success",
        title: "你已成功登出"
      });
      // 連結至 /logout 此路由，相當於：<router-link :to="{name:'logout'}"></router-link>
      router.push({ name: "logout" });
    }
  }
};
</script>
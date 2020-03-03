<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">美食達人</h1>
    <hr />
    <div class="row text-center">
      <div v-for="user in users" :key="user.id" class="col-3">
        <router-link :to="{name:'users',params:{id:user.id}}">
          <img :src="user.image" width="140px" height="140px" />
        </router-link>
        <h2>{{user.name}}</h2>
        <span class="badge badge-secondary">追蹤人數：{{user.FollowerCount}}</span>
        <p class="mt-3">
          <button
            v-if="user.isFollowed"
            @click.prevent.stop="deleteFollowing(user.id)"
            type="button"
            class="btn btn-danger"
          >取消追蹤</button>
          <button
            v-else
            @click.prevent.stop="addFollowing(user.id)"
            type="button"
            class="btn btn-primary"
          >追蹤</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from "../components/NavTabs";
import usersAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  components: {
    //複數 components
    NavTabs
  },
  data() {
    return {
      users: []
    };
  },
  created() {
    this.fetchTopUsers();
  },
  methods: {
    async fetchTopUsers() {
      try {
        const { data, statusText } = await usersAPI.getTopUsers();

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.users = data.users;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得美食達人，請稍後再試"
        });
      }
    },
    async addFollowing(userId) {
      try {
        const { data, statusText } = await usersAPI.addFollowing(userId);

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.users = this.users
          .map(user => {
            if (user.id !== userId) {
              return user;
            }
            return {
              ...user,
              isFollowed: true,
              FollowerCount: user.FollowerCount + 1
            };
          })
          .sort((a, b) => {
            return b.FollowerCount - a.FollowerCount;
          });

        Toast.fire({
          icon: "success",
          title: "已成功加入追蹤清單"
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法將該使用者加入追蹤清單，請稍後再試"
        });
      }
    },
    async deleteFollowing(userId) {
      try {
        const { data, statusText } = await usersAPI.deleteFollowing(userId);

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.users = this.users
          .map(user => {
            if (user.id !== userId) {
              return user;
            }
            return {
              ...user,
              isFollowed: false,
              FollowerCount: user.FollowerCount - 1
            };
          })
          .sort((a, b) => {
            return b.FollowerCount - a.FollowerCount;
          });

        Toast.fire({
          icon: "success",
          title: "已成功從追蹤清單中移除"
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法將該使用者從追蹤清單中移除，請稍後再試"
        });
      }
    }
  }
};
</script>
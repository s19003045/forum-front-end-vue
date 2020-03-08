<template>
  <div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="user.image" width="300px" height="300px" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ user.name }}</h5>
          <p class="card-text">{{ user.email }}</p>
          <ul class="list-unstyled list-inline">
            <li>
              <strong>{{ user.commentsLength }}</strong> 已評論餐廳
            </li>
            <li>
              <strong>{{ user.favoritedRestaurantsLength }}</strong> 收藏的餐廳
            </li>
            <li>
              <strong>{{ user.followingsLength }}</strong> followings (追蹤者)
            </li>
            <li>
              <strong>{{ user.followersLength }}</strong> followers (追隨者)
            </li>
          </ul>
          <p v-if="currentUser.id===user.id">
            <router-link :to="{name:'user-edit',params:{id:currentUser.id}}">
              <button type="submit" class="btn btn-primary">edit</button>
            </router-link>
          </p>
          <p v-else-if="user.isFollowed" class="mt-3">
            <button
              type="button"
              class="btn btn-danger"
              @click.prevent.stop="deleteFollowing(user.id)"
            >取消追蹤</button>
          </p>
          <p v-else class="mt-3">
            <button
              type="button"
              class="btn btn-primary"
              @click.prevent.stop="addFollowing(user.id)"
            >追蹤</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initialUser: {
      type: Object,
      required: true
    },
    currentUser: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      user: this.initialUser
    };
  },
  watch: {
    // 監測 initialUser 的變化
    initialUser: function() {
      this.user = {
        ...this.user,
        ...this.initialUser
      };
    }
    // currentUser: function(data) {
    //   this.currentUser = this.data;
    // }
  },
  methods: {
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
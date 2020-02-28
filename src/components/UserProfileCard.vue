<template>
  <div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="user.image" width="300px" height="300px" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{user.name}}</h5>
          <p class="card-text">{{user.email}}</p>
          <ul class="list-unstyled list-inline">
            <li>
              <strong>{{user.Comments.length}}</strong> 已評論餐廳
            </li>
            <li>
              <strong>{{user.FavoritedRestaurants.length}}</strong> 收藏的餐廳
            </li>
            <li>
              <strong>{{user.Followings.length}}</strong> followings (追蹤者)
            </li>
            <li>
              <strong>{{user.Followers.length}}</strong> followers (追隨者)
            </li>
          </ul>
          <p v-if="currentUser.id===user.id">
            <a href="/users/2/edit">
              <button type="submit" class="btn btn-primary">edit</button>
            </a>
          </p>
          <p v-else-if="user.isFollowed" class="mt-3">
            <button @click.prevent.stop="toggleFollow" type="button" class="btn btn-danger">取消追蹤</button>
          </p>
          <p v-else class="mt-3">
            <button @click.prevent.stop="toggleFollow" type="button" class="btn btn-primary">追蹤</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    currentUser: {
      type: Object,
      required: true
    }
  },
  methods: {
    toggleFollow() {
      // TODO: 打 API

      this.user.isFollowed = !this.user.isFollowed;
    }
  }
};
</script>
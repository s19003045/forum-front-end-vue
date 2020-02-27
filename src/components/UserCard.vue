<template>
  <div class="col-3">
    <a href="#">
      <img :src="user.image" width="140px" height="140px" />
    </a>
    <h2>User</h2>
    <span class="badge badge-secondary">追蹤人數：{{user.FollowerCount}}</span>
    <p class="mt-3">
      <button
        v-if="user.isFollowed"
        @click.prevent.stop="toggleFollow"
        type="button"
        class="btn btn-danger"
      >取消追蹤</button>
      <button v-else @click.prevent.stop="toggleFollow" type="button" class="btn btn-primary">追蹤</button>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    initialUser: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      user: this.initialUser
    };
  },
  methods: {
    toggleFollow() {
      this.user.isFollowed = !this.user.isFollowed;
    }
  }
};
</script>
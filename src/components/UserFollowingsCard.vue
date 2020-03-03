<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ userFollowings.length }}</strong> followings (追蹤者)
    </div>
    <div class="card-body">
      <span
        v-for="userFollowing in userFollowings"
        :key="userFollowing.id"
        class="px-1"
      >
        <router-link :to="{name:'users',params:{id:userFollowing.id}}">
          <img
            :src="userFollowing.image || 'https://loremflickr.com/320/240/restaurant,food/?random=66.19683181847653'"
            width="60"
            height="60"
            class="avatar"
          >
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userFollowings: {
      type: Array,
      required: true
    }
  }
};
</script>
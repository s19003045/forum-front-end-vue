<template>
  <div class="card">
    <div class="card-header">
      <strong>{{userFollowers.length}}</strong> followers (追隨者)
    </div>
    <div class="card-body">
      <span v-for="userFollower in userFollowers" :key="userFollower.id" class="px-1">
        <router-link :to="{name:'users',params:{id:userFollower.id}}">
          <img
            :src="userFollower.image || 'https://loremflickr.com/320/240/restaurant,food/?random=66.19683181847653'"
            width="60"
            height="60"
            class="avatar"
          />
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userFollowers: {
      type: Array,
      required: true
    }
  }
};
</script>
<template>
  <div class="card">
    <div class="card-header">
      <strong>{{userComments.length}}</strong> 已評論餐廳
    </div>
    <div class="card-body">
      <span v-for="userComment in userComments" :key="userComment.id" class="px-1 my-1">
        <router-link :to="{name:'restaurant',params:{id:userComment.Restaurant.id}}">
          <img
            :src="userComment.Restaurant.image || 'https://loremflickr.com/320/240/restaurant,food/?random=66.19683181847653'"
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
    userComments: {
      type: Array,
      required: true
    }
  }
};
</script>
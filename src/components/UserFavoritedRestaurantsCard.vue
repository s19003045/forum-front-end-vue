<template>
  <div class="card">
    <div class="card-header">
      <strong>2</strong> 收藏的餐廳
    </div>
    <div class="card-body">
      <span
        v-for="userFavoritedRestaurant
 in userFavoritedRestaurants"
        :key="userFavoritedRestaurant.id"
        class="px-1"
      >
        <router-link :to="{name:'restaurant',params:{id:userFavoritedRestaurant.id}}">
          <img
            :src="userFavoritedRestaurant.image || 'https://loremflickr.com/320/240/restaurant,food/?random=66.19683181847653'"
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
    userFavoritedRestaurants: {
      type: Array,
      required: true
    }
  }
};
</script>
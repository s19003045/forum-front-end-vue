<template>
  <div class="container py-5">
    <h1>{{ restaurant.name }}</h1>
    <h5>[{{ restaurant.categoryName }}]</h5>
    <hr />

    <div class="row">
      <div class="col-4">
        <ul class="list-group">
          <li class="list-group-item d-flex justify-content-between align-items-center">
            關於此餐廳的評論數
            <span class="badge badge-primary badge-pill">{{ restaurant.commentsLength }}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            多少人收藏此家餐廳
            <span
              class="badge badge-primary badge-pill"
            >{{ restaurant.favoritedUsersLength }}</span>
          </li>
        </ul>
        <div class="mt-3">
          <a href="#" @click="$router.back()">回上一頁</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import restaurantsAPI from "../apis/restaurants";
import { Toast } from "../utils/helpers";

export default {
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryName: "",
        commentsLength: 0,
        favoritedUsersLength: 0,
        likedUsersLength: 0
      },
      isLoading: true
    };
  },
  created() {
    const { id: restaurantId } = this.$route.params;
    this.fetchRestaurant(restaurantId);
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      try {
        this.isLoading = true;
        const {
          data: { restaurant },
          statusText
        } = await restaurantsAPI.getRestaurant({
          restaurantId
        });

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.restaurant = {
          ...this.restaurant,
          id: restaurant.id,
          name: restaurant.name,
          categoryName: restaurant.Category.name,
          commentsLength: restaurant.Comments.length,
          favoritedUsersLength: restaurant.FavoritedUsers.length,
          likedUsersLength: restaurant.LikedUsers.length
        };
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得餐廳資料，請稍後再試"
        });
      }
    }
  }
};
</script>
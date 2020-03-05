<template>
  <div class="col-md-6 col-lg-4">
    <div class="card mb-4">
      <img
        class="card-img-top"
        :src="restaurant.image"
        alt="Card image cap"
        width="286px"
        height="180px"
      />
      <div class="card-body">
        <p class="card-text title-wrap">
          <router-link :to="{name:'restaurant',params:{id:restaurant.id}}">{{ restaurant.name }}</router-link>
        </p>
        <span class="badge badge-secondary">{{ restaurant.Category.name }}</span>
        <p class="card-text text-truncate">{{ restaurant.description }}</p>
      </div>
      <div class="card-footer">
        <button
          v-if="restaurant.isFavorited"
          type="button"
          class="btn btn-danger btn-border favorite mr-2"
          @click.stop.prevent="deleteFavorite(restaurant.id)"
        >移除最愛</button>
        <button
          v-else
          type="button"
          class="btn btn-primary btn-border favorite mr-2"
          @click.stop.prevent="addFavorite(restaurant.id)"
        >加到最愛</button>

        <button
          v-if="restaurant.isLiked"
          type="button"
          class="btn btn-danger like mr-2"
          @click.stop.prevent="deleteLike(restaurant.id)"
        >Unlike</button>
        <button
          v-else
          type="button"
          class="btn btn-primary like mr-2"
          @click.stop.prevent="addLike(restaurant.id)"
        >Like</button>
      </div>
    </div>
  </div>
</template>

<script>
import usersAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  props: {
    initialRestaurant: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      restaurant: this.initialRestaurant
    };
  },
  methods: {
    async addFavorite(restaurantId) {
      try {
        const { data, statusText } = await usersAPI.addFavorite(restaurantId);

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.restaurant = {
          ...this.restaurant, // 保留餐廳原有資料
          isFavorited: true
        };
        Toast.fire({
          icon: "success",
          title: "已成功加入我的最愛清單"
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法將餐廳加入最愛清單，請稍後再試"
        });
      }
    },
    async deleteFavorite(restaurantId) {
      try {
        const { data, statusText } = await usersAPI.deleteFavorite(
          restaurantId
        );

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.restaurant = {
          ...this.restaurant, // 保留餐廳原有資料
          isFavorited: false
        };
        Toast.fire({
          icon: "success",
          title: "已成功從我的最愛清單中移除"
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法將餐廳從我的最愛清單中移除，請稍後再試"
        });
      }
    },
    async addLike(restaurantId) {
      try {
        const { data, statusText } = await usersAPI.addLike(restaurantId);

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.restaurant = {
          ...this.restaurant, // 保留餐廳原有資料
          isLiked: true
        };
        Toast.fire({
          icon: "success",
          title: "已成功加至我的Like清單"
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法將餐廳加至我的Like清單，請稍後再試"
        });
      }
    },
    async deleteLike(restaurantId) {
      try {
        const { data, statusText } = await usersAPI.deleteLike(restaurantId);

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.restaurant = {
          ...this.restaurant, // 保留餐廳原有資料
          isLiked: false
        };
        Toast.fire({
          icon: "success",
          title: "已成功從我的Like清單中移除"
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法將餐廳從我的Like清單中移除，請稍後再試"
        });
      }
    }
  }
};
</script>
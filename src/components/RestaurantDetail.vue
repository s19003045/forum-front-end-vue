<template>
  <div class="row">
    <div class="col-md-12 mb-3">
      <h1>{{ restaurant.name }}</h1>
      <p class="badge badge-secondary mt-1 mb-3">{{ restaurant.categoryName }}</p>
    </div>
    <div class="col-lg-4">
      <img
        class="img-responsive center-block"
        :src="restaurant.image"
        style="width: 250px;margin-bottom: 25px;"
      />
      <div class="contact-info-wrap">
        <ul class="list-unstyled">
          <li>
            <strong>Opening Hour:</strong>
            {{ restaurant.openingHours }}
          </li>
          <li>
            <strong>Tel:</strong>
            {{ restaurant.tel }}
          </li>
          <li>
            <strong>Address:</strong>
            {{ restaurant.address }}
          </li>
        </ul>
      </div>
    </div>
    <div class="col-lg-8">
      <p>{{ restaurant.description }}</p>
      <router-link
        class="btn btn-primary btn-border mr-2"
        :to="{name:'restaurant-dashboard',params:{id:restaurant.id}}"
      >Dashboard</router-link>

      <button
        v-if="restaurant.isFavorited"
        type="button"
        class="btn btn-danger btn-border mr-2"
        @click.prevent.stop="deleteFavorite(restaurant.id)"
      >移除最愛</button>
      <button
        v-else
        type="button"
        class="btn btn-primary btn-border mr-2"
        @click.prevent.stop="addFavorite(restaurant.id)"
      >加到最愛</button>
      <button
        v-if="restaurant.isLiked"
        type="button"
        class="btn btn-danger like mr-2"
        @click.prevent.stop="deleteLike(restaurant.id)"
      >Unlike</button>
      <button
        v-else
        type="button"
        class="btn btn-primary like mr-2"
        @click.prevent.stop="addLike(restaurant.id)"
      >Like</button>
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
  watch: {
    initialRestaurant(restaurant) {
      this.restaurant = {
        ...this.restaurant,
        ...restaurant
      };
    }
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
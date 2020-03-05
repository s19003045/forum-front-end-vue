<template>
  <div class="container py-5">
    <!-- 使用 NavTabs 元件 -->
    <NavTabs />
    <h1 class="mt-5">人氣餐廳</h1>
    <hr />
    <div
      v-for="restaurant in restaurants"
      :key="restaurant.id"
      class="card mb-3"
      style="max-width: 540px;margin: auto;"
    >
      <div class="row no-gutters">
        <div class="col-md-4">
          <a href="#">
            <img class="card-img" :src="restaurant.image" />
          </a>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ restaurant.name }}</h5>
            <span class="badge badge-secondary">收藏數：{{ restaurant.FavoriteCount }}</span>
            <p class="card-text">{{ restaurant.description }}</p>
            <router-link
              :to="{name:'restaurants',params:{id:restaurant.id}}"
              class="btn btn-primary mr-2"
            >Show</router-link>

            <button
              v-if="restaurant.isFavorited"
              type="button"
              class="btn btn-danger mr-2"
              @click.prevent.stop="deleteFavorite(restaurant.id)"
            >移除最愛</button>
            <button
              v-else
              type="button"
              class="btn btn-primary"
              @click.prevent.stop="addFavorite(restaurant.id)"
            >加到最愛</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from "../components/NavTabs";
import restaurantsAPI from "../apis/restaurants";
import usersAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  components: {
    //複數 components
    NavTabs
  },
  data() {
    return {
      restaurants: []
    };
  },
  created() {
    this.fetchRestaurants();
  },
  methods: {
    async fetchRestaurants() {
      try {
        const { data, statusText } = await restaurantsAPI.getTopRestaurants();

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.restaurants = data.restaurants;
        Toast.fire({
          icon: "success",
          title: "成功取得資料"
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "取得資料失敗，請稍後再試"
        });
      }
    },
    async addFavorite(restaurantId) {
      try {
        const { data, statusText } = await usersAPI.addFavorite(restaurantId);

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.restaurants = this.restaurants
          .map(restaurant => {
            if (restaurant.id !== restaurantId) {
              return restaurant;
            }

            return {
              ...restaurant,
              isFavorited: true,
              FavoriteCount: restaurant.FavoriteCount + 1
            };
          })
          .sort((a, b) => {
            return b.FavoriteCount - a.FavoriteCount;
          });

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

        this.restaurants = this.restaurants
          .map(restaurant => {
            if (restaurant.id !== restaurantId) {
              return restaurant;
            }

            return {
              ...restaurant,
              isFavorited: false,
              FavoriteCount: restaurant.FavoriteCount - 1
            };
          })
          .sort((a, b) => {
            return b.FavoriteCount - a.FavoriteCount;
          });

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
    }
  }
};
</script>
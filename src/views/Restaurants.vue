<template>
  <div class="container py-5">
    <!-- 使用 NavTabs 元件 -->
    <NavTabs />
    <h1 class="mt-5">首頁 - 餐廳列表</h1>
    <!-- 餐廳類別標籤 RestaurantsNavPills -->
    <RestaurantsNavPills :categories="categories" />
    <div class="row">
      <!-- 餐廳卡片 RestaurantCard-->
      <RestaurantCard
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :initial-restaurant="restaurant"
      />
    </div>
    <!-- 分頁標籤 RestaurantPagination -->
    <RestaurantPagination
      v-if="totalPage > 1"
      :total-page="totalPage"
      :current-page="currentPage"
      :category-id="categoryId"
    />
  </div>
</template>

<script>
import restaurantsAPI from "../apis/restaurants";
import { Toast } from "../utils/helpers";

export default {
  components: {
    //複數 components
    NavTabs: () => import("../components/NavTabs"), //此為 ES6(ES2015) 表示法,
    RestaurantsNavPills: () => import("../components/RestaurantsNavPills"),
    RestaurantCard: () => import("../components/RestaurantCard"),
    RestaurantPagination: () => import("../components/RestaurantPagination")
  },
  data() {
    return {
      categories: [],
      categoryId: -1,
      currentPage: 1,
      restaurants: [],
      totalPage: -1
    };
  },
  created() {
    this.fetchRestaurants({
      page: 1,
      categoryId: ""
    });
  },
  methods: {
    async fetchRestaurants({ page, categoryId }) {
      try {
        const response = await restaurantsAPI.getRestaurants({
          page,
          categoryId
        });

        const { data, status, statusText } = response;
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.categories = data.categories;
        this.categoryId = data.categoryId;
        this.currentPage = data.page;
        this.restaurants = data.restaurants;
        this.totalPage = data.totalPage.length;

        Toast.fire({
          icon: "success",
          title: `status:${status}`
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得餐廳資料，請稍後再試"
        });
      }
    }
  }
};
</script>
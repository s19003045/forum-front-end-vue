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
// import axios from "axios";
// const baseURL = "https://sheltered-sea-38412.herokuapp.com/api";
// const getToken = localStorage.getItem("token");

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
      categoryId: "",
      currentPage: 1,
      restaurants: [],
      totalPage: 0
    };
  },
  created() {
    const { page, categoryId } = this.$route.query;
    this.fetchRestaurants({ page, categoryId });
  },
  // 使用 beforeRouteUpdate 方法取得使用者路由變化
  beforeRouteUpdate(to, from, next) {
    const { page, categoryId } = to.query;
    this.fetchRestaurants({ page, categoryId });
    // axios.get(`${baseURL}/restaurants?page=${page}&categoryId=2`, {
    //   Authorization: `Bearer ${getToken}`
    // });
    next();
  },
  methods: {
    // STEP 1：直接在 fetchRestaurants 的地方帶入預設值
    async fetchRestaurants({ page = 1, categoryId = "" }) {
      try {
        // STEP 2：直接把 response 內需要的屬性透過解構賦值拿出來
        const { data, statusText } = await restaurantsAPI.getRestaurants({
          page,
          categoryId
        });

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.categories = data.categories;
        this.categoryId = data.categoryId;
        this.currentPage = data.page;
        this.restaurants = data.restaurants;
        this.totalPage = data.totalPage.length;
      } catch (error) {
        console.log(error.response);
        Toast.fire({
          icon: "error",
          title: "無法取得餐廳資料，請稍後再試"
        });
      }
    }
  }
};
</script>
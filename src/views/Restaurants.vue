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
// 載入 components
import NavTabs from "../components/NavTabs";
import RestaurantsNavPills from "../components/RestaurantsNavPills";
import RestaurantCard from "../components/RestaurantCard";
import RestaurantPagination from "../components/RestaurantPagination";
// 載入 apis
import restaurantsAPI from "../apis/restaurants";
// 載入 utils
import { Toast } from "../utils/helpers";

export default {
  components: {
    //複數 components
    NavTabs,
    RestaurantsNavPills,
    RestaurantCard,
    RestaurantPagination
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
        Toast.fire({
          icon: "error",
          title: "無法取得餐廳資料，請稍後再試"
        });
      }
    }
  }
};
</script>
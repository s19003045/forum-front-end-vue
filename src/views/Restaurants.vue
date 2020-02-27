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
const dummyData = {
  restaurants: [
    {
      id: 51,
      name: "發大財0121牛排",
      tel: "12345678",
      address: "高雄市",
      opening_hours: "08:00",
      description: "123",
      image: "https://i.imgur.com/CaeM9rg.jpg",
      viewCounts: 27,
      createdAt: "2019-11-22T06:50:58.472Z",
      updatedAt: "2020-02-11T03:49:29.072Z",
      CategoryId: 6,
      Category: {
        id: 6,
        name: "美式料理",
        createdAt: "2019-11-20T06:25:42.917Z",
        updatedAt: "2019-11-20T06:25:42.917Z"
      },
      isFavorited: false,
      isLiked: true
    },
    {
      id: 144,
      name: "麥當當",
      tel: "123",
      address: "麥當勞總部",
      opening_hours: "03:33",
      description: "",
      image: "https://i.imgur.com/CaeM9rg.jpg",
      viewCounts: 33,
      createdAt: "2020-02-16T05:09:24.297Z",
      updatedAt: "2020-02-16T05:09:24.297Z",
      CategoryId: 6,
      Category: {
        id: 6,
        name: "美式料理",
        createdAt: "2019-11-20T06:25:42.917Z",
        updatedAt: "2019-11-20T06:25:42.917Z"
      },
      isFavorited: false,
      isLiked: false
    },
    {
      id: 14,
      name: "Rahul Kilback",
      tel: "1-573-027-3190",
      address: "13538 Lula Roads",
      opening_hours: "08:00",
      description: "Ut ea repellat cumque illo sint. Possimus a magni ",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=66.19683181847653",
      viewCounts: 77,
      createdAt: "2019-11-20T06:25:42.925Z",
      updatedAt: "2020-02-16T05:36:07.120Z",
      CategoryId: 7,
      Category: {
        id: 7,
        name: "複合式料理",
        createdAt: "2019-11-20T06:25:42.917Z",
        updatedAt: "2019-11-20T06:25:42.917Z"
      },
      isFavorited: true,
      isLiked: true
    },
    {
      id: 30,
      name: "Vince Kassulke",
      tel: "(302) 097-9821 x641",
      address: "82815 Vivianne Inlet",
      opening_hours: "08:00",
      description: "nihil",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=60.72153192006735",
      viewCounts: 112,
      createdAt: "2019-11-20T06:25:42.928Z",
      updatedAt: "2020-02-16T05:35:03.543Z",
      CategoryId: 3,
      Category: "hello",
      isFavorited: false,
      isLiked: false
    },
    {
      id: 29,
      name: "Mrs. Deonte Schmeler",
      tel: "694-889-1934",
      address: "4833 Ila Causeway",
      opening_hours: "08:00",
      description: "Ut officia pariatur quam perferendis quia nihil ex",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=33.27090568354101",
      viewCounts: 9,
      createdAt: "2019-11-20T06:25:42.928Z",
      updatedAt: "2020-02-16T05:35:11.396Z",
      CategoryId: 4,
      Category: "美式",
      isFavorited: false,
      isLiked: false
    },
    {
      id: 24,
      name: "Tracy Kling",
      tel: "602.671.9831",
      address: "4776 Hazle Freeway",
      opening_hours: "08:00",
      description: "Libero fugit omnis inventore quasi maxime magnam a",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=28.34397872340968",
      viewCounts: 6,
      createdAt: "2019-11-20T06:25:42.927Z",
      updatedAt: "2020-02-16T05:34:58.076Z",
      CategoryId: 5,
      Category: "泰式",
      isFavorited: false,
      isLiked: false
    }
  ],
  categories: [
    {
      id: 6,
      name: "美式料理",
      createdAt: "2019-11-20T06:25:42.917Z",
      updatedAt: "2019-11-20T06:25:42.917Z"
    },
    {
      id: 7,
      name: "複合式料理",
      createdAt: "2019-11-20T06:25:42.917Z",
      updatedAt: "2019-11-20T06:25:42.917Z"
    },
    {
      id: 109,
      name: "cool",
      createdAt: "2019-12-17T11:36:08.937Z",
      updatedAt: "2019-12-17T11:36:08.937Z"
    },
    {
      id: 110,
      name: "ccc",
      createdAt: "2020-01-12T16:58:30.105Z",
      updatedAt: "2020-01-20T12:30:43.772Z"
    }
  ],
  categoryId: 1,
  page: 3,
  totalPage: [1, 2, 3, 4, 5],
  prev: 1,
  next: 2
};

// 載入 components 有二種方法：
// 方法一：
// import NavTabs from "../components/NavTabs";
// export default {
//   components: {
//     //複數 components
//     NavTabs //此為 ES6(ES2015) 表示法
//   }
// };
// 方法二：(需要在 .eslintrc 設定 babel-eslint 為 "parserOptions" 之一)，並做如下設定，才可以使用 ES6 語法
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
    this.fetchRestaurants();
  },
  methods: {
    fetchRestaurants() {
      this.categories = dummyData.categories;
      this.categoryId = dummyData.categoryId;
      this.currentPage = dummyData.page;
      this.restaurants = dummyData.restaurants;
      this.totalPage = dummyData.totalPage.length;
    }
  }
};
</script>
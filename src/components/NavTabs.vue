<template>
  <ul class="nav nav-tabs mb-4">
    <!-- 必須加入 :key="tab.id"，否則會報錯 -->
    <!-- In 2.2.0+, when using v-for with a component, a key is now required. -->
    <li v-for="tab in tabs" :key="tab.id" class="nav-item">
      <!-- 官方文件中提到，router-link 中連結屬性 ，:to 或 to 皆可以，但測試時發現 to 有問題 -->
      <!-- <router-link :to="tab.path" class="nav-link">{{ tab.title }}</router-link> -->
      <router-link :to="tab.path" class="nav-link">{{ tab.title }}</router-link>
    </li>
  </ul>
</template>

<script>
import uuid from "uuid/v4"; // UUID v4：亂數隨機產生。
export default {
  data() {
    // data 屬性必須使用 function
    return {
      tabs: [
        {
          id: uuid(),
          title: "首頁",
          path: "/restaurants"
        },
        {
          id: uuid(),
          title: "最新動態",
          path: "/restaurants/feeds"
        },
        {
          id: uuid(),
          title: "TOP 10 人氣餐廳",
          path: "/restaurants/top"
        },
        {
          id: uuid(),
          title: "美食達人",
          path: "/users/top"
        }
      ]
    };
  }
};
</script>
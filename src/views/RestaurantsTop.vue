<template>
  <div class="container py-5">
    <!-- 使用 NavTabs 元件 -->
    <NavTabs />
    <h1 class="mt-5">人氣餐廳</h1>
  </div>
</template>

<script>
// 載入 components 有二種方法：
// 方法一：
// import NavTabs from "../components/NavTabs";
// export default {
//   components: {
//     //複數 components
//     NavTabs //此為 ES6(ES2015) 表示法
//   }
// };
// 方法二：(需要在 .eslintrc 設定 babel-eslint 為 "parserOptions" 之一)
export default {
  components: {
    //複數 components
    NavTabs: () => import("../components/NavTabs") //此為 ES6(ES2015) 表示法
  }
};
</script>
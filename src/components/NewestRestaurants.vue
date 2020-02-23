<template>
  <div class="card">
    <div class="card-header">最新餐廳</div>
    <div class="card-body">
      <div v-for="restaurant in restaurants" v-bind:key="restaurant.id">
        <h4>
          <a href="#">{{restaurant.name}}</a>
          <small>{{restaurant.Category.name}}</small>
        </h4>
        <p>{{restaurant.description}}</p>
        {{restaurant.createdAt | fromNow}}
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
// import moment from "moment";
export default {
  props: {
    restaurants: {
      type: Array,
      required: true
    }
  }
  // local 註冊 filter
  // filters: {
  //   fromNow(datetime) {
  //     if (!datetime) {
  //       return "-";
  //     }
  //     // 使用 moment 提供的 fromNow 方法
  //     return moment(datetime).fromNow();
  //   }
  // }
};
</script>

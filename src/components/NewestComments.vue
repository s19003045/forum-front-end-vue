<template>
  <div class="card">
    <div class="card-header">最新評論</div>
    <div class="card-body">
      <div v-for="comment in comments" v-bind:key="comment.id">
        <h4>
          <a href="#">{{comment.User.name}}</a>
        </h4>
        <p>{{comment.text}}</p>by
        <a href>{{comment.User.name}}</a>
        at {{comment.createdAt | fromNow}}
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
      required: true
    }
  }
};
</script>
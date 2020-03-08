<template>
  <div class="album py-5 bg-light">
    <div class="container">
      <!-- UserProfileCard -->
      <UserProfileCard :initial-user="user" :current-user="currentUser" />

      <div class="row">
        <div class="col-md-4">
          <!-- UserFollowingsCard -->
          <UserFollowingsCard :user-followings="userFollowings" />
          <br />
          <!-- UserFollowersCard -->
          <UserFollowersCard :user-followers="userFollowers" />
        </div>
        <div class="col-md-8">
          <!-- UserCommentsCard -->
          <UserCommentsCard :user-comments="userComments" />
          <br />
          <!-- UserFavoritedRestaurantsCard -->
          <UserFavoritedRestaurantsCard :user-favorited-restaurants="userFavoritedRestaurants" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import store
import { mapState } from "vuex";
// import components
import UserProfileCard from "../components/UserProfileCard";
import UserFollowingsCard from "../components/UserFollowingsCard";
import UserFollowersCard from "../components/UserFollowersCard";
import UserCommentsCard from "../components/UserCommentsCard";
import UserFavoritedRestaurantsCard from "../components/UserFavoritedRestaurantsCard";
// import APIs
import usersAPI from "../apis/users";
// import utils
import { Toast } from "../utils/helpers";

export default {
  components: {
    UserProfileCard,
    UserFollowingsCard,
    UserFollowersCard,
    UserCommentsCard,
    UserFavoritedRestaurantsCard
  },
  data() {
    return {
      user: {
        id: -1,
        name: "",
        email: "",
        image: "",
        followingsLength: 0,
        followersLength: 0,
        commentsLength: 0,
        favoritedRestaurantsLength: 0
      },
      isFollowed: false,
      userFollowings: [],
      userFollowers: [],
      userComments: [],
      userFavoritedRestaurants: []
    };
  },
  computed: {
    ...mapState(["currentUser"])
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchUser(userId);
  },
  beforeRouteUpdate(to, from, next) {
    const { id: userId } = this.$route.params;
    this.fetchUser(userId);
    next();
  },
  methods: {
    async fetchUser(userId) {
      try {
        const { data, statusText } = await usersAPI.get({ userId });

        if (statusText != "OK") {
          throw new Error(statusText);
        }

        const { profile, isFollowed } = data;

        this.user = {
          ...this.user,
          id: profile.id,
          image: profile.image,
          name: profile.name,
          email: profile.email,
          followingsLength: profile.Followings.length,
          followersLength: profile.Followers.length,
          commentsLength: profile.Comments.length,
          favoritedRestaurantsLength: profile.FavoritedRestaurants.length
        };

        this.isFollowed = isFollowed;

        this.userFollowings = profile.Followings;
        this.userFollowers = profile.Followers;
        this.userComments = profile.Comments.map(comment => comment.Restaurant);
        this.userFavoritedRestaurants = profile.FavoritedRestaurants;

        Toast.fire({
          icon: "success",
          title: "成功取得使用者資料"
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "取得使用者資料失敗"
        });
      }
    }
  }
};
</script>
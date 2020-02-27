<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">美食達人</h1>
    <hr />
    <div class="row text-center">
      <UserCard v-for="user in users" :key="user.id" :initial-user="user" />
    </div>
  </div>
</template>

<script>
const dummyData = {
  users: [
    {
      id: 5,
      name: "lib4",
      email: "lib4@example.com",
      password: "$2a$10$wgBCTWhLICljONe9dThbB.IQYVrg0yo6ryzQfQIGXQWrUVx0y5gbq",
      isAdmin: null,
      image: null,
      createdAt: "2019-11-20T07:25:42.952Z",
      updatedAt: "2019-11-20T07:25:42.952Z",
      Followers: [
        {
          id: 1,
          name: "root1",
          email: "root@example.com",
          password:
            "$2a$10$alLLwv1Kn0tC9euHs6Llwen8uif7jQfU9DPaybXRuGn83ZfKzW56G",
          isAdmin: true,
          image: null,
          createdAt: "2019-11-20T06:25:42.456Z",
          updatedAt: "2019-11-25T06:53:28.542Z",
          Followship: {
            followerId: 1,
            followingId: 5,
            createdAt: "2020-01-06T13:29:19.347Z",
            updatedAt: "2020-01-06T13:29:19.347Z"
          }
        },
        {
          id: 2,
          name: "user1",
          email: "user1@example.com",
          password:
            "$2a$10$ESv6iQjQ8oEe3/XGjw00PuSh1kjmG6Dkhd4YXa50boTlncJDxljAy",
          isAdmin: false,
          image: null,
          createdAt: "2019-11-20T06:25:42.685Z",
          updatedAt: "2019-11-21T09:55:30.970Z",
          Followship: {
            followerId: 2,
            followingId: 5,
            createdAt: "2019-12-08T15:35:54.743Z",
            updatedAt: "2019-12-08T15:35:54.743Z"
          }
        }
      ],
      FollowerCount: 2,
      isFollowed: false
    },
    {
      id: 2,
      name: "user1",
      email: "user1@example.com",
      password: "$2a$10$ESv6iQjQ8oEe3/XGjw00PuSh1kjmG6Dkhd4YXa50boTlncJDxljAy",
      isAdmin: false,
      image: null,
      createdAt: "2019-11-20T06:25:42.685Z",
      updatedAt: "2019-11-21T09:55:30.970Z",
      Followers: [
        {
          id: 1,
          name: "root1",
          email: "root@example.com",
          password:
            "$2a$10$alLLwv1Kn0tC9euHs6Llwen8uif7jQfU9DPaybXRuGn83ZfKzW56G",
          isAdmin: true,
          image: null,
          createdAt: "2019-11-20T06:25:42.456Z",
          updatedAt: "2019-11-25T06:53:28.542Z",
          Followship: {
            followerId: 1,
            followingId: 2,
            createdAt: "2020-01-21T12:52:03.002Z",
            updatedAt: "2020-01-21T12:52:03.002Z"
          }
        },
        {
          id: 2,
          name: "user1",
          email: "user1@example.com",
          password:
            "$2a$10$ESv6iQjQ8oEe3/XGjw00PuSh1kjmG6Dkhd4YXa50boTlncJDxljAy",
          isAdmin: false,
          image: null,
          createdAt: "2019-11-20T06:25:42.685Z",
          updatedAt: "2019-11-21T09:55:30.970Z",
          Followship: {
            followerId: 2,
            followingId: 2,
            createdAt: "2019-12-08T15:48:13.364Z",
            updatedAt: "2019-12-08T15:48:13.364Z"
          }
        }
      ],
      FollowerCount: 2,
      isFollowed: true
    },
    {
      id: 11,
      name: "root2",
      email: "root234@example.com",
      password: "$2a$10$vsMynB05b9ehsom/gnRtcOvBlYDj2oIKnf83.kGOumqoB2DGXPPSK",
      isAdmin: null,
      image: null,
      createdAt: "2019-11-22T08:36:56.461Z",
      updatedAt: "2019-11-22T08:36:56.461Z",
      Followers: [
        {
          id: 1,
          name: "root1",
          email: "root@example.com",
          password:
            "$2a$10$alLLwv1Kn0tC9euHs6Llwen8uif7jQfU9DPaybXRuGn83ZfKzW56G",
          isAdmin: true,
          image: null,
          createdAt: "2019-11-20T06:25:42.456Z",
          updatedAt: "2019-11-25T06:53:28.542Z",
          Followship: {
            followerId: 1,
            followingId: 11,
            createdAt: "2020-01-06T13:29:14.283Z",
            updatedAt: "2020-01-06T13:29:14.283Z"
          }
        },
        {
          id: 2,
          name: "user1",
          email: "user1@example.com",
          password:
            "$2a$10$ESv6iQjQ8oEe3/XGjw00PuSh1kjmG6Dkhd4YXa50boTlncJDxljAy",
          isAdmin: false,
          image: null,
          createdAt: "2019-11-20T06:25:42.685Z",
          updatedAt: "2019-11-21T09:55:30.970Z",
          Followship: {
            followerId: 2,
            followingId: 11,
            createdAt: "2019-12-08T15:47:59.381Z",
            updatedAt: "2019-12-08T15:47:59.381Z"
          }
        }
      ],
      FollowerCount: 2,
      isFollowed: true
    }
  ]
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
// 方法二：(需要在 .eslintrc 設定 babel-eslint 為 "parserOptions" 之一)
export default {
  components: {
    //複數 components
    NavTabs: () => import("../components/NavTabs"), //此為 ES6(ES2015) 表示法
    UserCard: () => import("../components/UserCard")
  },
  data() {
    return {
      users: []
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      this.users = dummyData.users;
    }
  }
};
</script>
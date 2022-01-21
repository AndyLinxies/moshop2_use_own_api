<template>
  <div>
    <div class="flex">
      <SideBar />
      <div>
        <div
          class=" ml-10 mt-10  mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800"
        >
          <img
            class="object-cover"
            :src="`http://127.0.0.1:8000/storage/img/${userInfo.picture}`"
            alt="avatar"
          />

          <div class="py-5 text-center">
            <p class="block text-2xl font-bold text-gray-800 dark:text-white">
              Full name: {{ userInfo.firstName }} {{ userInfo.lastName }}
            </p>
            <p class="text-sm text-gray-700 dark:text-gray-200">
              Email: {{ userInfo.email }}
            </p>

            <div data-app>
                <RegisterModal :edituser='true' />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";

// import UserEditModal from "../components/UserEditModal.vue";
import SideBar from "../components/sideBar.vue";
import RegisterModal from '../components/RegisterModal.vue'
export default {
  name: "profile",

  components: {
    SideBar,RegisterModal
  },
  data() {
    return {
      showEditModal: false,
    };
  },
  mounted() {
    this.$store.dispatch("userInfos");

  },
  computed: {
    ...mapFields(["userInfo"]),
  },
};
</script>

<style></style>

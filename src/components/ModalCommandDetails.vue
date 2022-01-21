<template>
  <div>
    <div>
      <div
        v-if="showModalCommandDetail"
        class="w-full overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
      >
        <div class="relative w-auto my-6 mx-auto max-w-6xl">
          <!--content-->
          <div
            class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
          >
            <!--header-->
            <div
              class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t"
            >
              <h3 class="text-3xl font-semibold">Command Detail </h3>
              <button
                class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              >
                <span
                  class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"
                >
                  ×
                </span>
              </button>
            </div>
            <!--body-->
            <div class="relative p-6 flex-auto mod">
                <div
        v-for="(item, i) in orderItems"
        :key="i"
        class="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 mb-10"
      >
        <div class="px-4 py-2">
          <h1
            class="text-2xl font-bold text-gray-800 uppercase dark:text-white"
          >
            {{ item.nomProduit }}
          </h1>
          <p
            v-if="item.descriptionProduit"
            class="mt-1 text-sm text-gray-600 dark:text-gray-400"
          >
            <!-- {{ item.product.description.substring(0, 80) + "..." }} -->
            {{ item.descriptionProduit}}
          </p>
        </div>
        <img
          width="300px"
          class="object-cover w-full h-48"
          :src="`http://127.0.0.1:8000/storage/img/${item.imageProduit}`"
          alt="product"
        />

        <div class="flex items-center justify-between px-4 py-2 bg-green-900">
          <h1 class="text-lg font-bold text-white">
            ${{ item.prixProduit }}
          </h1>
          
        </div>
      </div>
<!-- Fin card -->
            </div>
            <!--footer-->
            <div
              class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b"
            >
              <button
                class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                v-on:click="showModalCommandDetail = false"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="showModalCommandDetail"
        class="opacity-25 fixed inset-0 z-40 bg-black"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
// import axios from "axios";
// import { mapState} from 'vuex'

export default {
  name: "ModalCommandDetails",
  computed: {
    ...mapFields([ "showModalCommandDetail","orderID","orderItems"]),
    
  },

  methods: {
    
  },
};
</script>
<style>
.mod{
    width: 800px;
}
</style>

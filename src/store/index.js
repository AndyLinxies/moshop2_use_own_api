import Vue from 'vue'
import Vuex from 'vuex'
import { getField, updateField } from 'vuex-map-fields';
import axios from "axios";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items:[],
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    picture:'',
    connectionToken: '',
    userID: localStorage.getItem('userID'),
    userInfo:{},
    showModal: false,
    showProductModal:false,
    personalProduct:{
    },
    
    prodID:"",
    cartInfo:{},
    orderID:"",
    showModalCommandDetail:false,
    //les produits d'une commande en detail
    orderItems:[],
    //pershop
    showEditModal: false,
    shopPersoName: "",
    personalShopProducts: "",
    cartProductArr: [],
    //LoginModal
    dialog: false,
    //
    itemID:"",
    //user infos
    infos:"",
    //
    product_of_panier:[],
    commandArr:[]
  },

  mutations: {
    updateField,
    getProducts(state,res){
      state.items=res
    },

    handleLoginClick(){
    
    console.log('login clicked');
    },

    handleRegisterClick(){
    
    console.log('Register clicked');
    },

    // updateConnectionToken(state){
    //   state.connectionToken=localStorage.getItem('token')
    // },

    updateUserInfo(state,res){
      state.userInfo=res
      console.log(state.userInfo);
      
    },

    //modal
    toggleModal: function(state){
      state.showModal = !state.showModal;
    },

    //log out
    logOut(state){
      console.log("log out clicked");
      state.connectionToken=""
      localStorage.removeItem('token')
      localStorage.removeItem('userID')
    },

    ShowaddProductModal(state){
      state.showProductModal=!state.showProductModal
    },

    updateProdID(state,value){
      state.prodID=value
    },
    
    updateOrderItems(state,detailArr){
      state.orderItems=detailArr;
    },

    //persShop
    updatePersShop(state,items){
      // state.shopPersoName = items.name;
      state.personalShopProducts = items;
    },


  },
  actions: {
    //User Infos
    userInfos({commit}) {
      axios
        .get("http://127.0.0.1:8000/api/dashboard/profile", {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('token2')
          },
        })
        .then((response) => {
      
        console.log(response.data.data)
        localStorage.setItem('userID',response.data.data.id)
          commit("updateUserInfo",response.data.data)
      
        });
    },

    //Panier
    getCartProducts({state}) {
      axios
        .get("http://127.0.0.1:8000/api/dashboard/panier", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem('token2'),
          },
        })
        .then((response) => {
          console.log(response.data.data);
          state.product_of_panier = response.data.data;
        });
    },

    //Add a product to personal shop
    personalShop({commit}) {
      axios
        .get("http://127.0.0.1:8000/api/dashboard/personal-shop", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token2"),
          },
        })
        .then((response) => {
          console.log(response.data);
        
          commit("updatePersShop", response.data.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },

    //Add item to cart
    addToCartRequest({state} ){
      axios
      .post(
        `http://127.0.0.1:8000/api/dashboard/ajoutPanier/produit/${state.cartInfo.productID}`,
        state.cartInfo,
        {headers: {
          "Authorization": "Bearer " + localStorage.getItem('token2'),
        }}
      )
      .then((response) => {
        console.log(response);

      })
      .catch((error) => {
        console.log(error.response);

      })
    },
    
    //Order details
    getOrderDetail({commit,state}) {
      axios
        .get(`http://127.0.0.1:8000/api/dashboard/commandeDetail/${state.orderID}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token2"),
          },
        })
        .then((response) => {
          console.log(response.data.data);
          // state.orderItems=response.data.data
          commit("updateOrderItems", response.data.data);

        })
        .catch((error) => {
          console.log(error.response);
        });
    },

  },
  getters: {
    getField,
  }
})

<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="success" dark v-bind="attrs" v-on="on"> Login </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <!-- Email -->
              <v-col cols="12">
                <v-text-field
                  v-model="email"
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>
              <!-- Password -->
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                  v-model="password"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="login"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import axios from "axios";

export default {
name: 'LoginModal',
  data() {
    return {
      formData: new FormData(),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
      },
      loginErr: "",
      loginSuccess: "",
      ResploginErr: "",
    };
  },
  methods: {
    login() {
      console.log("Save login");
      this.formData.append("email", this.email);
      this.formData.append("password", this.password);

      axios
        .post(
          "http://127.0.0.1:8000/api/dashboard/login",
          this.formData,
          this.headers
        )
        .then((response) => {
          console.log(response.data);
          this.loginSuccess = response.data.message;
          this.userInfo = response.data.user
          localStorage.setItem('token2',response.data.token)
          this.$router.push('/dashboard/profile');
          //Un nouveau Token est généré
        })
        .catch((error) => {
          console.log(error.response);
        //   this.loginErr = error.response.data.error;
        //   this.ResploginErr = error.response.data.error.responseText;
        });
    },
  },
  computed: {
    ...mapFields(["email", "password","dialog","userInfo"]),
  },
};
</script>

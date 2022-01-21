<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          {{ edituser ? "Edit User Informations" : "Register" }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{
            edituser ? "Edit User Informations" : "Register"
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <!-- First Name -->
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="First name*"
                  required
                  v-model="firstName"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4"> </v-col>
              <!-- Last Name -->
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="lastName"
                  label="Last name*"
                  required
                ></v-text-field>
              </v-col>
              <!-- Email -->
              <v-col cols="12">
                <v-text-field
                  v-model="email"
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>
              <!-- Password -->
              <v-col v-if="!edituser" cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                  v-model="password"
                ></v-text-field>
              </v-col>
              <!-- Picture -->
              <v-col cols="12">
                <input
                  type="file"
                  @change="uploadFile"
                  ref="file"
                  truncate-length="15"
                  label="Picture*"
                />
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
          <v-btn color="blue darken-1" text @click="handleRegister">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import axios from "axios";

export default {
  name: "RegisterModal",
  props: {
    edituser: Boolean,
  },
  data: () => ({
    dialog: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "multipart/form-data",
    },
    formData: new FormData(),
    errorMessage: "",
    successMessage: "",
  }),
  methods: {
    uploadFile() {
      this.Images = this.$refs.file.files[0];
    },
    handleRegister() {
      console.log("save Register");
      if (this.edituser) {
        this.formData.append("firstName", this.firstName);
        this.formData.append("lastName", this.lastName);
        this.formData.append("email", this.email);
        this.formData.append("_method", "put");
        this.formData.append("picture", this.Images);
        axios
          .post(
            `http://127.0.0.1:8000/api/dashboard/profile/${this.userID}/update`,
            this.formData,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token2"),
              },
            }
          )
          .then((response) => {
            console.log(response);
            this.$store.dispatch("userInfos");
            // this.successMessage=response.data.message
            // this.$store.dispatch("userInfos");
          })
          .catch((error) => {
            console.log(error.response);
            // this.errorMessage=error.response.data.error.messages.errors
          });
      } else {
        this.formData.append("firstName", this.firstName);
        this.formData.append("lastName", this.lastName);
        this.formData.append("email", this.email);
        this.formData.append("picture", this.Images);
        this.formData.append("password", this.password);
        axios
          .post(
            "http://127.0.0.1:8000/api/register",
            this.formData,
            this.headers
          )
          .then((response) => {
            console.log(response.data);
            this.successMessage = response.data.message;
            this.connectionToken = response.data.token;
            this.dialog = true;
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userID", response.data.id);
          })
          .catch((error) => {
            console.log(error);
            // this.errorMessage=error.response.data.error.messages.errors
          });
      }
    },
  },
  computed: {
    ...mapFields([
      "firstName",
      "lastName",
      "email",
      "password",
      "picture",
      "connectionToken",
      "userID",
      "token",
    ]),
  },
};
</script>

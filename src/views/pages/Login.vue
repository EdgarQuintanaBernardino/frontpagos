<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.prevent="login(item)">
                  <center>
                    <img
                      src="../../assets/icons/LyBFlow.jpeg"
                      alt="Logo LyBFlow"
                      :height="80"
                    />
                    <h2>Iniciar sesión</h2>
                    <p class="text-muted">Ingresa con tus credenciales</p>
                  </center>
                  <CInput
                    :disabled="peticion"
                    placeholder="Correo registrado"
                    autocomplete="username email"
                    v-model="$v.item.email.$model"
                  >
                    <template #prepend-content>
                      <b-icon icon="mailbox" aria-hidden="true"></b-icon>
                    </template>
                  </CInput>
                  <CInput
                    :disabled="peticion"
                    placeholder="Password"
                    type="password"
                    autocomplete="curent-password"
                    v-model="$v.item.password.$model"
                  >
                    <template #prepend-content>
                      <b-icon icon="unlock" aria-hidden="true"></b-icon>
                    </template>
                  </CInput>
                  <CRow>
                    <CCol col="12" class="text-center">
                      <b-button
                        :variant="colorlogin"
                        type="submit"
                        block
                        :disabled="$v.$invalid || peticion"
                        v-if="!peticion"
                        >{{ msj }}
                      </b-button>
                    </CCol>
                    <!-- <CCol col="4"></CCol> -->
                    <!-- <b-col cols="4"></b-col> -->
                    <!-- <CCol col="4" class="text-center"> -->
                    <!-- <b-col cols="4"> -->
                    <!-- <pacman-loader
                        v-if="peticion"
                        :color="color"
                      ></pacman-loader> -->
                    <!-- <Loader></Loader> -->
                    <!-- </CCol> -->
                    <!-- </b-col> -->
                    <!-- <b-col cols="4"> </b-col> -->
                    <!-- <CCol col="4"></CCol> -->
                    <CCol col="12" class="text-right">
                      <!-- <CButton color="link" class="px-0" :disabled="true"
                        >¿Olvidaste tu contraseña?</CButton
                      > -->
                      <CButton
                        class="btn btn-ligth mt-3"
                        to="register"
                        style="float:left"
                      >
                        <b-icon-person></b-icon-person> Crear cuenta</CButton
                      >
                    </CCol>
                  </CRow>
                  <Loader v-if="peticion"></Loader>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import "regenerator-runtime/runtime";
// import PacmanLoader from "vue-spinner/src/PacmanLoader.vue";
import repologin from "./repologin.js";
import Service from "@/services/SessionStorage";
import alertas from "@/assets/repositoriosjs/alertas.js";
import { required, minLength, email } from "vuelidate/lib/validators";
import Loader from "../media/Loader.vue";

export default {
  data: () => {
    return {
      variable: "cil-lock-locked",
      item: {
        password: null,
        email: null
      },
      userId: "",
      color: "#fdd901",
      peticion: false
    };
  },
  computed: {
    colorlogin() {
      if (this.$v.$invalid) {
        return "dark";
      } else {
        return "primary";
      }
    },
    msj() {
      if (this.$v.$invalid) {
        return "Ingresa correo y contraseña válido";
      } else {
        return "Entrar";
      }
    }
  },
  validations: {
    item: {
      password: {
        required,
        minLength: minLength(6)
      },
      email: {
        required,
        email
      }
    }
  },
  methods: {
    resetlogin() {
      this.item.password = "";
      this.item.email = "";
    },
    coderesponse(result, self, alert) {
      return result.data.code == 200
        ? self.success(result.data, self, alert)
        : result.data.code == 403
        ? self.denegado(alert)
        : result.data.code == 401
        ? self.credentialinvalid(alert)
        : result.data.code == 202
        ? self.pendiente(alert) ///pendiente
        : self.error500(alert);
    },
    pendiente(alert) {
      alert.pending();
    },
    success(result, self, alert) {
      let service = Service(); //local storage
      result.roles = result.user.menuroles;
      if (result.roles.length > 0) {
        result.user.photo == null || result.user.photo == ""
          ? ""
          : (result.user.photo = self.$prefijoamazon + result.user.photo);
        self.$store.commit("setUserAction", result);
        self.$store.commit("set", "fotouser", result.user.photo);
        self.$store.commit(
          "setmetodo",
          result.sistema.metodo == 2 ? true : false
        );
        result.token = self.CryptoJS.AES.encrypt(
          result.token.toString(),
          self.$keysecret
        ).toString();
        service.logininicial(result);
        result.nuevo == 1 || result.nuevo == null || result.nuevo == "NULL"
          ? self.$router.push(`/settings`)
          : self.$router.push(`/`);
      } else {
        self.sinroles(alert);
      }
    },
    denegado(alert) {
      alert.denegado();
    },
    sinroles(alert) {
      alert.sinroles();
      return false;
    },
    credentialinvalid(alert) {
      alert.invalid();
    },
    error500(alert) {
      alert.errorservidor();
    },
    async login(item) {
      let self = this;
      let alert = alertas();
      self.peticion = true;
      let dao = repologin(); //store
      try {
        let result = await dao.login(item);

        self.coderesponse(result, self, alert);
      } catch (error) {
        alert.invalid();
      } finally {
        self.peticion = false;
        self.resetlogin();
      }
    }
  },

  name: "Login",
  created() {
    let service = Service();
    service.logout();
    this.resetlogin();
    this.$store.commit("setUserAction", null);
  },
  components: {
    // PacmanLoader,
    Loader
  }
};
</script>

<style scoped>
.btn-primary {
  color: #fff;
  /* background-color: rgb(31, 104, 172); Color azul*/
  background-color: rgba(0, 129, 194, 255);
  /* background-color: teal; */
  border-color: #005a5a;
}
.btn-primary:hover {
  color: #fff;
  background-color: rgba(0, 145, 194, 255);
  border-color: #005a5a;
}

/* Color para boton info en bootstrap */
.btn-info {
  color: #fff;
  /* background-color: rgb(31, 104, 172); */
  background-color: #229ca5;
  border-color: #005a5a;
}
.btn-info:hover {
  color: #fff;
  background-color: #3b9c96;
  border-color: #005a5a;
}
</style>

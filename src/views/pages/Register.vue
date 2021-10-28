<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm @submit.prevent="register" method="POST">
                <h1>Registrate</h1>
                <p class="text-muted">Crea tu cuenta</p>
                <CInput
                  placeholder="Nombre de usuario"
                  autocomplete="username"
                  v-model="name"
                >
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput
                  placeholder="Email"
                  prepend="@"
                  autocomplete="email"
                  v-model="email"
                />
                <CInput
                  placeholder="Contraseña"
                  type="password"
                  prependHtml="<i class='cui-lock-locked'></i>"
                  autocomplete="new-password"
                  v-model="password"
                >
                  <template #prepend-content
                    ><CIcon name="cil-lock-locked"
                  /></template>
                </CInput>
                <CInput
                  placeholder="Repite la contraseña"
                  type="password"
                  prependHtml="<i class='cui-lock-locked'></i>"
                  autocomplete="new-password"
                  class="mb-4"
                  v-model="password_confirmation"
                >
                  <template #prepend-content
                    ><CIcon name="cil-lock-locked"
                  /></template>
                </CInput>
                <CButton
                  type="submit"
                  color="success"
                  block
                  :disabled="desabilitar"
                  >Registrar</CButton
                >
              </CForm>
            </CCardBody>
            <CCardFooter class="p-4">
              <!-- <CRow>
                <CCol col="6">
                  <CButton block color="facebook">
                    Facebook
                  </CButton>
                </CCol>
                <CCol col="6">
                  <CButton block color="twitter">
                    Twitter
                  </CButton>
                </CCol>
              </CRow> -->
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import axios from "axios";
import respuestas from "@/assets/repositoriosjs/respuestas.js";

export default {
  data() {
    return {
      vartemp: "",
      desabilitado: true,
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    };
  },
  methods: {
    register() {
      var self = this;
      axios
        .post(this.$apiAdress + "/api/register", {
          name: self.name,
          email: self.email,
          password: self.password,
          password_confirmation: self.password_confirmation
        })
        .then(function(response) {
          self.name = "";
          self.email = "";
          self.password = "";
          self.password_confirmation = "";
          if (response.status === 200) {
            let result = respuestas();
            result.verifyRegister(response);
            self.$router.push({ path: "/login" });
          }
        })
        .catch(function(error) {
          let result = respuestas();
          result.verifyRegister(error.response);
        });
    }
  },
  computed: {
    desabilitar() {
      return this.name.trim().length === 0 ||
        this.email.trim().length === 0 ||
        this.password.trim().length === 0 ||
        this.password_confirmation.trim().length === 0 ||
        this.password != this.password_confirmation
        ? true
        : false;
    }
  }
};
</script>

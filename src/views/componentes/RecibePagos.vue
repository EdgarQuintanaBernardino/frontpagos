<template>
  <b-overlay :show="Deshabilitado" rounded="sm">
    <template v-slot:overlay>
      <div class="text-center">
        <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
        <p id="cancel-label">Please wait...</p>
      </div>
    </template>
    <b-form-group>
      <b-form-radio
        :style="darkMode ? 'background-color:#393a42' : null"
        v-model="TipoEmpresa"
        @change="reciboPagos()"
        value="0"
      >
        Recibo Pagos
      </b-form-radio>
      <b-form-radio
        :style="darkMode ? 'background-color:#393a42' : null"
        v-model="TipoEmpresa"
        @change="reciboPagos()"
        value="1"
      >
        No Recibo Pagos
      </b-form-radio>
    </b-form-group>
  </b-overlay>
</template>

<script>
import { mapState } from "vuex";
import repoupdateprofileuser from "@/assets/repositoriosjs/repoupdateprofileuser.js";

export default {
  data() {
    return {
      TipoEmpresa: "",
      Pagos: "",
      Deshabilitado: false
    };
  },

  mounted() {
    this.form = this.$store.state.usuario;
    this.TipoEmpresa = this.form.Recibir;
  },

  computed: {
    ...mapState(["darkMode"])
  },
  methods: {
    async reciboPagos() {
      try {
        this.Deshabilitado = true;
        this.Pagos = this.TipoEmpresa;
        console.log(this.Pagos);
        const repo = repoupdateprofileuser();
        await repo.consPrivacidadPerfil(this.Pagos).then(() => {
          // this.show = true;
        });
      } catch (error) {
        console.log(error);
      } finally {
        // this.show = false;
        this.Deshabilitado = false;
      }
    }
  }
};
</script>

<style></style>

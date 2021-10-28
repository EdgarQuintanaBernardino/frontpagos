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
        v-model="TipoEmpresa"
        @change="tipoPrivacidad()"
        value="0"
      >
        Cuenta Privada
      </b-form-radio>
      <b-form-radio
        v-model="TipoEmpresa"
        @change="tipoPrivacidad()"
        value="1"
      >
        Cuenta Pública
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
      form: [],
      TipoEmpresa: "",
      Privacidad: "",
      Deshabilitado: false
    };
  },
  mounted() {
    this.form = this.$store.state.usuario;
    this.TipoEmpresa = this.form.Privacidad;
  },
  computed: {
    ...mapState(["darkMode"])
  },
  methods: {
    async tipoPrivacidad() {
      try {
        this.Deshabilitado = true;
        this.Privacidad = this.TipoEmpresa;
        console.log(this.Privacidad);
        const repo = repoupdateprofileuser();
        await repo.consPrivacidadPerfil(this.Privacidad).then(() => {
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

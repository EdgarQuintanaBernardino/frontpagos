<template>
  <div class="row d-flex">
    <div class="input-group col col-md-5 mt-3 ml-5">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">Usuario</span>
      </div>
      <input
        type="text"
        aria-label="Nombre"
        class="form-control"
        v-model="pagina.Usuario"
      />
    </div>
    <div class="input-group col col-md-5 mt-3 ml-5">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">URL</span>
      </div>
      <input
        type="url"
        aria-label="Url"
        class="form-control col-12"
        v-model="pagina.Url"
        data-toggle="tooltip"
        data-placement="top"
        title="Ejemplo: https://mx.linkedin.com/company/evoluci%C3%B3n-web-mx"
      />
    </div>
    <div class="input-group col-12 col col-md-5 mt-3 ml-5 mb-2">
      <div class="input-group-prepend">
        <span class="input-group-text">Plataforma</span>
      </div>
      <b-form-select
        v-model.number="pagina.Tipo"
        :options="options"
      ></b-form-select>
    </div>
    <div class="input-group col col-12 col-md-5 mt-3 ml-5 mb-2">
      <div class="input-group-prepend">
        <span class="input-group-text" :maxlength="10" id="basic-addon1">
          Suscriptores
        </span>
      </div>
      <input
        type="text"
        maxlength="10"
        :onkeypress="'return(event.charCode >= 48 && event.charCode <= 57)'"
        aria-label="Nombre"
        class="form-control"
        v-model="pagina.Suscriptores"
      />
    </div>
    <b-button
      pill
      type="submit"
      class="btn btn-dark btn-block col col-12 col-md-11 ml-5 col-sm- mt-3 mb-3"
      :disabled="bloquear"
    >
      Guardar
    </b-button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    pagina: Object,
  },
  data() {
    return {
      selected: null,
      options: [
        { value: 1, text: "Youtube" },
        { value: 2, text: "Facebook" },
        { value: 3, text: "Snapchat" },
        { value: 4, text: "Linkedin" },
        { value: 5, text: "Instagram" },
        { value: 6, text: "Tiktok" },
        { value: 7, text: "Twitter" },
      ],
      prueba: 0,
    };
  },
  components: {},
  computed: {
    ...mapState(["TiposRedes"]),
    bloquear() {
      try {
        return this.pagina.Usuario.trim().length === 0 ||
        this.pagina.Url.trim().length === 0 ||
        this.pagina.Tipo === 0 ||
        this.pagina.Suscriptores < 1
        ? true
        : false;
        }catch(error)
        {
          //
          return false
        }
    },
  },
};
</script>


<template>
  <div class="row mt-3 ml-3">
    <b-overlay :show="Deshabilitado" rounded="sm">
      <template v-slot:overlay>
        <div class="text-center">
          <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
          <p id="cancel-label">Please wait...</p>
        </div>
      </template>
      <b-row class="">
        <h5>¿Eres influencer?</h5>
        <CSwitch
          class="mx-1 ml-3 "
          color="success"
          variant="3d"
          :disabled="Deshabilitado"
          :checked="usuario.influencer"
          id="chek1"
          @update:checked="val => actualizar()"
        />
      </b-row>
      <b-row>
        <div v-if="this.$store.state.usuario.Is_Influencer === 1">
          <b-button
            block
            pill
            size="md"
            variant="outline-success"
            class="mt-2 mb-4"
            ><router-link
              to="/influencer"
              style="text-decoration: none; color: inherit"
              >Agregar mis redes sociales</router-link
            >
          </b-button>
        </div>
      </b-row>
    </b-overlay>
  </div>
</template>

<script>
import repoupdateprofileuser from "@/assets/repositoriosjs/repoupdateprofileuser.js";
import localstorage from "@/services/SessionStorage.js";
export default {
  data() {
    return {
      usuario: {
        influencer: false
      },
      Deshabilitado: false
    };
  },
  props: {
    IsInfluencer: Number
  },
  mounted: function() {
    this.usuario.influencer =
      this.$store.state.usuario.Is_Influencer === 1 ? true : false;
  },

  methods: {
    muestraRedes(form) {
      this.$emit("form", form);
    },
    async actualizar() {
      this.Deshabilitado = true;
      const repo = repoupdateprofileuser();
      const storage = localstorage();
      this.usuario.influencer = !this.usuario.influencer;
      if (this.usuario.influencer) {
        this.usuario.influencer = true;
      } else {
        this.usuario.influencer = false;
      }
      try {
        await repo.updateInfluencer(this.usuario).then(res => {
          if (res.status == 200) {
            this.$store.state.usuario.Is_Influencer =
              this.usuario.influencer === true ? 1 : 2;
            storage.setUser(this.$store.state.usuario);
            this.Deshabilitado = false;
          }
        console.log('aqui '+res)
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.showanimation = false;
      }
    }
  },
};
</script>

<style scoped>
router-link {
  text-decoration: none;
}
</style>

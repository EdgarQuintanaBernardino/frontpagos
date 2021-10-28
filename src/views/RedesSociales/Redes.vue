<template>
  <div>
    <div v-if="mostrarVideos === false">
      <CCard>
        <CCardHeader>
          <router-link
            to="/profile"
            style="text-decoration: none; color: inherit"
          >
            <b-button
              class="btn navbar-brand float-left"
              variant="secondary"
              fill
              ><b-icon icon="arrow-left-circle-fill"></b-icon> Datos
              personales</b-button
            ></router-link
          >
          <b-button
            class="btn navbar-brand float-right"
            variant="secondary"
            fill
            @click="mostrarForm(1)"
            >Nueva red social <b-icon icon="plus-circle-fill"></b-icon>
          </b-button>
        </CCardHeader>
        <CCardBody>
          <h2 class="color1 mb-4 mt-2">Redes sociales cargadas</h2>
          <div>
            <b-modal ref="my-modal" hide-footer centered size="lg">
              <template> <h3 class="mb-2">Redes Sociales</h3> </template>
              <form @submit.prevent="guardar">
                <Formulario :pagina="Pagina" />
              </form>
            </b-modal>
            <Tabla
              @edit="editar($event)"
              @delete="deletePagina($event)"
              @cambiaVista="cambiaVista($event)"
            />
          </div>
        </CCardBody>
      </CCard>
    </div>
    <div v-if="mostrarVideos === true">
      <form>
        <VideosRedes :videoId="videoSeleccionado" @regresa="regresa($event)" />
      </form>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Tabla from "./Tabla";
import Formulario from "./Formulario";
import repoupdateprofileuser from "@/assets/repositoriosjs/repoupdateprofileuser.js";
import respuestas from "@/assets/repositoriosjs/respuestas.js";
import VideosRedes from "../RedesSociales/VideosRedes.vue";

export default {
  name: "HelloWorld",
  data() {
    return {
      videoSeleccionado: [],
      mostrarVideos: false,
      crear: false,
      texto: "Nuevo",
      claseBtn: "success",
      Pagina: {
        id: -1,
        Usuario: "",
        Url: "",
        Tipo: 0,
        Estatus: 0,
        Suscriptores: "",
      },
      Form: 1,
      Plataforma: 0,
    };
  },
  props: {
    msg: String,
  },
  computed: {
    ...mapState(["Paginas"]),
    ...mapState(["TiposRedes"]),
  },
  methods: {
    cambiaVista(videos) {
      this.mostrarVideos = true;
      this.videoSeleccionado = videos;
      localStorage.setItem("mostrarVideos", JSON.stringify(this.mostrarVideos));
      localStorage.setItem(
        "videoSeleccionado",
        JSON.stringify(this.videoSeleccionado)
      );
    },
    regresa(regresa) {
      this.mostrarVideos = regresa;
      localStorage.setItem("mostrarVideos", JSON.stringify(this.mostrarVideos));
      localStorage.setItem(
        "videoSeleccionado",
        JSON.stringify(this.videoSeleccionado)
      );
    },
    mostrarForm(crear) {
      this.crear = !this.crear;
      if (this.crear) {
        this.texto = "Cancelar";
      } else {
        this.texto = "Nuevo";
        this.limpiaInput();
        this.showModal(false);
      }
      if (crear === 1) {
        this.showModal(true);
      }
    },
    editar(objPagina) {
      this.Pagina = objPagina;
      this.showModal(true);
      if (!this.crear) {
        this.mostrarForm();
      }
    },
    showModal(op) {
      if (op) {
        this.$refs["my-modal"].show();
      } else {
        this.$refs["my-modal"].hide();
      }
    },
    cambiaForm(form) {
      this.$emit("form", form);
    },
    limpiaInput() {
      this.Pagina = {
        id: -1,
        Usuario: "",
        Url: "",
        Tipo: 0,
        Estatus: 0,
        Suscriptores: "",
      };
    },
    async guardar() {
      if (this.Pagina.id === -1) {
        try {
          const repo = repoupdateprofileuser();
          await repo.createRedSocial(this.Pagina).then((res) => {
            let result = respuestas();
            result.verifyresponseRedSocial(res);
            if (res.data.code == 200) {
              this.consRedes();
              this.showModal(false);
              this.consRedes();
            }
          });
        } catch (error) {
          //
        } finally {
          this.showanimation = false;
        }
      } else {
        try {
          const repo = repoupdateprofileuser();
          await repo.editRedSocial(this.Pagina).then((res) => {
            let result = respuestas();
            result.verifyresponseUpdateRedSocial(res);
            if (res.data.code == 200) {
              this.showModal(false);
              this.consRedes();
            }
          });
        } catch (error) {
          // console.log(error);
        } finally {
          this.showanimation = false;
        }
      }
      this.limpiaInput();
      this.mostrarForm();
    },
    async consTiposRedes() {
      try {
        const repo = repoupdateprofileuser();
        await repo.TiposRedSocial().then((res) => {
          this.$store.commit("setTiposRedes", res.data.data);
        });
      } catch (error) {
        // console.log(error);
      } finally {
        this.showanimation = false;
      }
    },
    async consRedes() {
      try {
        const repo = repoupdateprofileuser();
        await repo.ConsRedSociales().then((res) => {
          this.$store.commit("setRedes", res.data.data);
        });
      } catch (error) {
        // console.log(error);
      } finally {
        this.showanimation = false;
      }
    },
  },
  mounted() {
    this.consTiposRedes();
    this.consRedes();
  },
  created() {
    let data = localStorage.getItem("mostrarVideos");
    if (data != null) {
      this.mostrarVideos = JSON.parse(data);
    }
    let data2 = localStorage.getItem("videoSeleccionado");
    if (data2 != null) {
      this.videoSeleccionado = JSON.parse(data2);
    }
  },
  components: {
    Tabla,
    Formulario,
    VideosRedes,
  },
};
</script>

<style scoped>
router-link {
  text-decoration: none;
}
h3 {
  text-align: center;
  color: rgb(21, 102, 139);
}
.color1 {
  text-align: center;
}
</style>

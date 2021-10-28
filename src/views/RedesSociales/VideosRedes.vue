<template>
  <CCard>
    <CCardHeader>
      <b-row class="col col-12 col-md-12">
        <div class="col col-12 col-md-2 mt-4 ml-5">
          <b-button
            @click="paginaAnterior()"
            class="btn navbar-brand float-left"
            variant="primary"
            pill
            size="md"
          >
            <b-icon icon="arrow-left-circle-fill"> </b-icon> Anterior
          </b-button>
        </div>
        <b-col>
          <div class="col col-12 col-md-8 text-center my-3">
            <h1>
              {{ Titulo }}
              <img :src="Imagen" />
            </h1>
          </div>
        </b-col>
      </b-row>
    </CCardHeader>
    <!-- Formulario cargar nuevo video -->
    <div class="container col col-11">
      <form class="px-3" @submit.prevent="createVideo()">
        <div class="Videos mb-1">
          <b-row class="col col-12 col-md-5 mt-4">
            <b-col lg="0" class="pb-4" col-2></b-col>
            <b-col col-10></b-col>
          </b-row>
        </div>
        <div class="mt-1 mb-4"></div>
        <div class="row d-flex">
          <div class="input-group col col-12 col-md-5 mt-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">Nombre</span>
            </div>
            <input
              type="text"
              aria-label="Nombre"
              class="form-control"
              v-model="Video.Nombre"
            />
          </div>
          <div class="input-group col col-12 col-md-7 mt-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">URL</span>
            </div>
            <input
              type="url"
              aria-label="Nombre"
              class="form-control"
              v-model="Video.Url"
            />
          </div>
          <div class="input-group col col-12 col-md-12">
            <b-button
              pill
              type="submit"
              class="btn btn-dark btn-block mt-3 mb-4"
              :disabled="bloquear(true)"
              >Agregar Video
            </b-button>
          </div>
        </div>
      </form>
      <!--Tabla donde se cargan los videos de las redes sociales-->
      <h4>Videos cargados</h4>
      <div class="table-responsive mb-5">
        <table class="table table-striped table-hover table-sm text-center">
          <thead>
            <tr>
              <th scope="col">Nombre del video</th>
              <th scope="col">URL</th>
              <th scope="col">Estatus</th>
              <th scope="col">Editar / Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in Videos" :key="item.Id">
              <td>{{ item.Nombre }}</td>
              <td>{{ item.Url }}</td>
              <td>{{ estatus(item.Estatus) }}</td>
              <td>
                <b-button-group>
                  <!-- Editar modal -->
                  <b-button
                    :disabled="item.Estatus === 1 ? true : false"
                    type="button"
                    class="mr-3"
                    v-b-modal.modal-center
                    variant="primary"
                    @click="newTarea(item.Id)"
                  >
                    <b-icon icon="pencil"></b-icon>Editar</b-button
                  >
                  <b-button
                    type="button"
                    class="btn btn-danger"
                    @click="deleteItem(item.Id)"
                  >
                    <b-icon icon="trash"></b-icon>Eliminar
                  </b-button>
                </b-button-group>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Ventana modal edicion de datos en video -->
        <div v-if="VideoTemporal.length > 0">
          <b-modal
            ref="my-modal"
            id="modal-center"
            centered
            size="lg"
            hide-footer
          >
            <template> <h4>Actualiza tus datos</h4> </template>
            <!-- Formulario cargar nuevo video en ventana modal -->
            <form class="px-3 mt-4" @submit.prevent="updateVideos()">
              <div class="row d-flex">
                <div class="input-group col col-12 col-md-5">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"
                      >Nombre</span
                    >
                  </div>
                  <input
                    type="text"
                    aria-label="Nombre"
                    class="form-control"
                    v-model="VideoTemporal[0].Nombre"
                  />
                </div>
                <div class="input-group col col-12 col-md-7">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">URL</span>
                  </div>
                  <input
                    type="url"
                    aria-label="Nombre"
                    class="form-control"
                    v-model="VideoTemporal[0].Url"
                  />
                </div>
                <button
                  type="submit"
                  class="btn btn-dark btn-block mt-3 mb-4"
                  :disabled="bloquear(false)"
                >
                  Actualizar
                </button>
              </div>
            </form>
          </b-modal>
        </div>
      </div>
    </div>
  </CCard>
</template>
<script>
import { mapState } from "vuex";
import repoupdateprofileuser from "@/assets/repositoriosjs/repoupdateprofileuser.js";
import respuestas from "@/assets/repositoriosjs/respuestas.js";

export default {
  props: {
    Plataforma: Array,
    videoId: Object,
  },
  data() {
    return {
      Op: 0,
      plataforma1: true,
      OpTitle: " ",
      Videos: [],
      Video: {
        Id: "",
        Nombre: "",
        Url: "",
        Estatus: "",
        Id_Red: "",
      },
      VideoTemporal: {
        Id: "",
        Nombre: "",
        Url: "",
        Estatus: "",
        Id_Red: "",
      },
    };
  },
  components: {},
  async mounted() {
    await this.consRedes();
    const paginaSelect = this.Paginas.filter(
      (ele) => ele.Id == this.videoId.Id
    );
    this.Op = paginaSelect[0].Tipo;
    await this.TablaVideos();
    this.Video.Id_Red = parseInt(this.videoId.Id);
  },
  computed: {
    // Imagen que se va a mostrar dependiendo de la red social y cambiamos en el caso de darkMode,64px X 64px
    Imagen() {
      let mode = "";
      if (this.darkMode) {
        mode = "_dark";
      }
      switch (this.Op) {
        case 1:
          return require("../../assets/img/YouTubeVideos" + mode + ".png");
        case 2:
          return require("../../assets/img/Facebook-lg" + mode + ".png");
        case 3:
          return require("../../assets/img/SnapChatVideos" + mode + ".png");
        case 4:
          return require("../../assets/img/Linkedin-lg" + mode + ".png");
        case 5:
          return require("../../assets/img/Instagram" + mode + ".png");
        case 6:
          return require("../../assets/img/TikTokVideos" + mode + ".png");
        case 7:
          return require("../../assets/img/TwitterVideos" + mode + ".png");
      }
      return null;
    },
    // Titulos que se van a usar dependiendo de la red social
    Titulo() {
      switch (this.Op) {
        case 1:
          return "YouTube";
        case 2:
          return "Facebook";
        case 3:
          return "SnapChat";
        case 4:
          return "Linkedin";
        case 5:
          return "Instagram";
        case 6:
          return "TikTok";
        case 7:
          return "Twitter";
      }
      return null;
    },
    ...mapState(["Paginas"]),
    ...mapState(["RedLoad"]),
    ...mapState(["darkMode"]),
  },
  methods: {
    paginaAnterior() {
      this.$emit("regresa", false);
    },
    async consRedes() {
      try {
        const repo = repoupdateprofileuser();
        await repo.ConsRedSociales().then((res) => {
          this.$store.commit("setRedes", res.data.data);
        });
      } catch (error) {
        //
      } finally {
        this.showanimation = false;
      }
    },
    // Funcion para pintar los videos de las redes sociales
    async TablaVideos() {
      try {
        this.Video.Id_Red = parseInt(this.videoId.Id);
        const repo = repoupdateprofileuser();
        await repo.VideosRedSocial(this.Video).then((res) => {
          this.Videos = res.data.data.map(function (obj) {
            let VideoTemp = {};
            VideoTemp.Id = obj.id;
            VideoTemp.Url = obj.Url;
            VideoTemp.Nombre = obj.Nombre;
            VideoTemp.Estatus = obj.Status_Id;
            VideoTemp.Id_Red = obj.Id_Red;
            return VideoTemp;
          });
        });
      } catch (error) {
        //
      } finally {
        this.showanimation = false;
      }
    },
    // Funcion para crear un nuevo videos de las redes sociales
    async createVideo() {
      try {
        this.Video.Id_Red = parseInt(this.videoId.Id);
        const repo = repoupdateprofileuser();
        await repo.addVideoRedSocial(this.Video).then((res) => {
          this.Videos = res.data.data.map(function (obj) {
            let VideoTemp = {};
            VideoTemp.Id = obj.id;
            VideoTemp.Url = obj.Url;
            VideoTemp.Nombre = obj.Nombre;
            VideoTemp.Estatus = obj.Status_Id;
            VideoTemp.Id_Red = obj.Id_Red;
            return VideoTemp;
          });
          this.limpiarCampos();
          let result = respuestas();
          result.verifyresponseVideos(res);
          if (res.data.code == 200) {
            //
          }
        });
      } catch (error) {
        //
      } finally {
        this.showanimation = false;
      }
    },
    cambiaForm(frm) {
      this.$emit("form", frm);
    },
    //Evento para bloquear el boton si hay campos vacios en ambos botones (Crear/Editar)
    bloquear(op) {
      if (op) {
        return this.Video.Nombre.trim().length === 0 ||
          this.Video.Url.trim().length === 0
          ? true
          : false;
      } else {
        return this.VideoTemporal[0].Nombre === "" ||
          this.VideoTemporal[0].Url.trim().length === 0
          ? true
          : false;
      }
    },
    // Funcion para limpiar los campos del formulario de Videos de redes sociales
    limpiarCampos() {
      this.Video = {
        Id: "",
        Nombre: "",
        Url: "",
        Estatus: 0,
      };
    },
    // Funcion para borrar los videos de las redes sociales
    async deleteItem(id) {
      try {
        const repo = repoupdateprofileuser();
        this.Video.Id = id;
        await repo.deleteVideoRed(this.Video).then((res) => {
          let result = respuestas();
          result.verifyresponseDeleteVideos(res);
          if (res.data.code == 200) {
            this.Videos = this.Videos.filter((item) => item.Id != id);
          }
        });
      } catch (error) {
        //
      } finally {
        this.showanimation = false;
      }
    },
    // Temporal guardar datos del video al momento de actualizar
    newTarea(id) {
      this.VideoTemporal = this.Videos.filter((item) => item.Id == id).map(
        function (obj) {
          let newObj = {};
          newObj.Id = obj.Id;
          newObj.Nombre = obj.Nombre;
          newObj.Url = obj.Url;
          newObj.Id_Red = parseInt(obj.Id_Red);
          return newObj;
        }
      );
    },
    // Funcion para actualizar los datos del video de las redes sociales
    async updateVideos() {
      try {
        const repo = repoupdateprofileuser();
        await repo.editVideoRed(this.VideoTemporal[0]).then((res) => {
          let result = respuestas();
          result.verifyresponseUpdateVideos(res);
          if (res.data.code === 200) {
            // Pintamos los datos del video del lado del Front
            this.Videos = res.data.data.map(function (obj) {
              let newObj = {};
              newObj.Id = obj.id;
              newObj.Nombre = obj.Nombre;
              newObj.Url = obj.Url;
              newObj.Estatus = obj.Status_Id;
              newObj.Id_Red = parseInt(obj.Id_Red);
              return newObj;
            });
            // Cerramos la ventana modal de edición
            this.$refs["my-modal"].hide();
          }
        });
      } catch (error) {
        //
      } finally {
        this.showanimation = false;
      }
    },
    estatus(id) {
      const idEntero = parseInt(id);
      switch (idEntero) {
        case 1:
          return "Aceptado";
        case 2:
          return "Pendiente";
        case 3:
          return "Denegado";
      }
    },
  },
};
</script>
<style scoped>
h4 {
  text-align: center;
  color: rgb(93, 93, 93);
}
/* Alineacion de texto de videos */
.Videos {
  text-align: center;
}
</style>

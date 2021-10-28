<template>
  <div>
    <!-- Modal para aceptar las politocas de privacidad -->
    <div>
      <b-modal
        ref="my-modal"
        hide-footer
        title="POLITICA DE PRIVACIDAD"
        size="lg"
      >
        <div class="d-block text-center">
          <!--Componente de politicas de privacidad -->
          <Politica></Politica>
          <!-- Boton para aceptar las politicas de privacidad -->
          <b-button
            class="mt-2"
            variant="outline-info"
            block
            @click="aceptarPoliticas(paginaModal, 1)"
          >
            Acepto y carga videos
            <b-icon icon="cloud-upload-fill"></b-icon>
          </b-button>
          <b-button
            class="mt-2"
            variant="outline-success"
            block
            @click="aceptarPoliticas(paginaModal, 2)"
          >
            Acepto
            <b-icon icon="hand-thumbs-up"></b-icon>
          </b-button>
          <b-button
            class="mt-2"
            variant="outline-danger"
            block
            @click="hideModal(1)"
          >
            No acepto
            <b-icon icon="hand-thumbs-down"></b-icon>
          </b-button>
        </div>
      </b-modal>
    </div>
    <!-- Modal para cancelar las politocas de privacidad -->
    <div>
      <b-modal
        ref="cancelar"
        hide-footer
        title="CANCELAR POLITICAS DE PRIVACIDAD"
        size="lg"
      >
        <div class="d-block text-center">
          <!--Componente de politicas -->
          <Politica></Politica>
          <!-- Boton para cancelar las politicas de privacidad -->
          <b-button
            class="mt-2"
            variant="outline-danger"
            block
            @click="cancelarPoliticas(paginaModal)"
          >
            Cancelar Politicas
            <b-icon icon="exclamation-circle"></b-icon>
          </b-button>
          <b-button
            class="mt-2"
            variant="outline-info"
            block
            @click="hideModal(2)"
          >
            Regresar
            <b-icon
              icon="arrow-counterclockwise"
              animation="spin-reverse"
              font-scale="1"
            ></b-icon>
          </b-button>
        </div>
      </b-modal>
    </div>
    <!-- Tabla de redes cargadas -->
    <CDataTable
      :items="Paginas"
      :fields="Titulos"
      :table-filter="{
        lazy: true,
        placeholder: 'Buscar en toda la Tabla',
        label: 'Buscar:'
      }"
      pagination
      :items-per-page="5"
      hover
    >
      <template #Tipo="{ item }">
        <td>
          <img :src="imagen(item.Tipo)" width="35" height="35" />
        </td>
      </template>
      <template #Suscriptores="{ item }">
        <td>
          {{ item.Suscriptores }}
        </td>
      </template>
      <template #Estatus="{ item }">
        <td>
          {{ estatus(item.Estatus) }}
        </td>
      </template>
      <template v-slot:row-details="row">
        <keep-alive>
          <component
            v-bind:is="Videos(row.item.Id)"
            v-bind:row="row"
          ></component>
        </keep-alive>
      </template>
      <template #Cargar="{ item }">
        <td>
          <b-button-group>
            <!-- Botones pagina de inicio -->
            <b-button
              class="mr-1"
              variant="success"
              @click="
                editar(
                  item.Id,
                  item.Usuario,
                  item.Url,
                  item.Tipo,
                  item.Estatus,
                  item.Suscriptores
                )
              "
            >
              <b-icon icon="pencil-square"></b-icon>
            </b-button>
            <div>
              <b-button
                :disabled="
                  item.Politica === 0 || item.Estatus !== 1 ? true : false
                "
                variant="info"
                @click="routerNet(item)"
                data-toggle="collapse"
                :data-target="`#${item.id}`"
                aria-expanded="false"
                data-parent="#videos"
                aria-controls="collapseExample"
              >
                <b-icon icon="cloud-upload-fill"></b-icon>
              </b-button>
            </div>
          </b-button-group>
        </td>
      </template>
      <template #Aceptar="{ item }">
        <td>
          <b-button
            class="mr-1"
            v-b-tooltip.hover
            :disabled="item.Estatus !== 1 ? true : false"
            :title="
              item.Politica === 1 ? 'Cancelar Politicas' : 'Aceptar Politicas'
            "
            @click="showModal(item.Id, item.Politica === 0 ? true : false)"
            :variant="item.Politica === 1 ? 'danger' : 'success'"
          >
            <b-icon
              :icon="item.Politica === 1 ? 'dash-circle-fill' : 'shield-check'"
            >
            </b-icon>
          </b-button>
        </td>
      </template>
      <template #Eliminar="{ item }">
        <td>
          <!-- Boton para eliminar alguna de las redes sociales -->
          <b-button
            class="mr-1"
            @click="deletePagina(item.Id)"
            variant="danger"
          >
            <b-icon icon="trash-fill"> </b-icon>
          </b-button>
        </td>
      </template>
    </CDataTable>
  </div>
</template>
<script>
import { mapState } from "vuex";
import VideosRedes from "../RedesSociales/VideosRedes.vue";
import Politica from "./Politica.vue";
import repoupdateprofileuser from "@/assets/repositoriosjs/repoupdateprofileuser.js";
import respuestas from "@/assets/repositoriosjs/respuestas.js";

export default {
  props: {
    videoSeleccionado: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      mostrarVideos: true,
      paginaModal: -1,
      OpenModal: false,
      crear: false,
      Titulos: [
        { key: "Id", label: "No.", sortable: true },
        "Usuario",
        { key: "Url", label: "URL", sortable: true },
        { key: "Tipo", label: "Tipo", sortable: true, filter: false },
        { key: "Suscriptores", sortable: false, filter: false },
        { key: "Estatus", sortable: true, filter: false },
        {
          key: "Cargar",
          label: "Editar/Subir",
          sortable: false,
          filter: false
        },
        { key: "Aceptar", label: "Politica ", sortable: false, filter: false },
        { key: "Eliminar", sortable: false, filter: false }
      ],
      Pagina: {
        Id: -1,
        Usuario: "",
        Url: "",
        Tipo: 0,
        Estatus: 0
      },
      Video: {
        Form: 0,
        Plataforma: 0
      },
      Imagen: "",
      Items: []
    };
  },
  components: {
    VideosRedes,
    Politica
  },
  computed: {
    ...mapState(["Paginas"]),
    ...mapState(["RedLoad"]),
    ...mapState(["darkMode"])
  },
  methods: {
    // Metodos dentro de la tabla de redes sociales
    async consRedes() {
      try {
        const repo = repoupdateprofileuser();
        await repo.ConsRedSociales().then(res => {
          this.$store.commit("setRedes", res.data.data);
        });
      } catch (error) {
        // console.log(error);
      } finally {
        this.showanimation = false;
      }
    },
    async deletePagina(index) {
      try {
        const repo = repoupdateprofileuser();
        this.Pagina.Id = index;
        await repo.deleteRedSocial(this.Pagina).then(res => {
          let result = respuestas();
          result.verifyresponseDeleteRedSocial(res);
          if (res.data.code == 200) {
            this.consRedes();
          }
        });
      } catch (error) {
        // console.log(error);
      } finally {
        this.showanimation = false;
      }
    },
    editar(index, nombre, url, tipo, est, subs) {
      this.limpiaInput();
      this.Pagina.Id = index;
      this.Pagina.Usuario = nombre;
      this.Pagina.Url = url;
      this.Pagina.Tipo = tipo;
      this.Pagina.Estatus = est;
      this.Pagina.Suscriptores = subs;
      this.$emit("edit", this.Pagina);
    },
    limpiaInput() {
      this.Pagina = {
        Id: -1,
        Usuario: "",
        Url: "",
        Tipo: 0,
        Estatus: 0,
        Suscriptores: ""
      };
    },
    // Elementos dentro de la tabla
    estatus(estatus) {
      switch (estatus) {
        case 1:
          return "Aceptado";
        case 2:
          return "Pendiente";
        case 3:
          return "Denegado";
      }
    },
    imagen(Id_Tipo) {
      let mode = "";
      if (this.darkMode) {
        mode = "_dark";
      }
      switch (Id_Tipo) {
        case 1:
          return require("../../assets/img/YouTube" + mode + ".png");
        case 2:
          return require("../../assets/img/Facebook2" + mode + ".png");
        case 3:
          return require("../../assets/img/Snapchat" + mode + ".png");
        case 4:
          return require("../../assets/img/Linkedin" + mode + ".png");
        case 5:
          return require("../../assets/img/Instagram2" + mode + ".png");
        case 6:
          return require("../../assets/img/TikTok1" + mode + ".png");
        case 7:
          return require("../../assets/img/Twitter" + mode + ".png");
      }
    },
    //Ventana modal del modulo POLITICAS DE PRIVACIDAD
    showModal(id, modal) {
      this.paginaModal = id;
      if (modal) {
        this.$refs["my-modal"].show();
      } else {
        this.$refs["cancelar"].show();
      }
    },
    //Politicas de privacidad
    async aceptarPoliticas(id, op) {
      try {
        const repo = repoupdateprofileuser();
        this.Pagina.Id = id;
        this.Pagina.Politica = 1;
        await repo.aceptarPolitica(this.Pagina).then(res => {
          let result = respuestas();
          result.verifyresponsePolitica(res);
          if (res.data.code == 200) {
            if (op === 1) {
              this.routerNet(this.Pagina);
            }
            if (op === 2) {
              this.$refs["my-modal"].hide();
              this.consRedes();
            }
          }
        });
      } catch (error) {
        // console.log(error);
      } finally {
        this.showanimation = false;
      }
    },
    async cancelarPoliticas(id) {
      try {
        const repo = repoupdateprofileuser();
        this.Pagina.Id = id;
        this.Pagina.Politica = 0;
        await repo.aceptarPolitica(this.Pagina).then(res => {
          let result = respuestas();
          result.verifyresponseCancelaPolitica(res);
          if (res.data.code == 200) {
            this.hideModal(2);
            this.consRedes();
          }
        });
      } catch (error) {
        // console.log(error);
      } finally {
        this.showanimation = false;
      }
    },
    //Enruta dependiendo de la red social que se cargue y cierra la ventana modal
    routerNet(videos) {
      this.$refs["my-modal"].hide();
      this.$emit("cambiaVista", videos);
      this.consRedes();
    },
    hideModal(op) {
      if (op === 1) {
        this.$refs["my-modal"].hide();
      } else {
        this.$refs["cancelar"].hide();
      }
    }
  }
};
</script>
<style scoped>
td {
  word-wrap: break-word;
  max-width: 200px;
}
</style>

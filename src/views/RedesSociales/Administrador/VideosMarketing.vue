<template>
  <div>
    <b-overlay :show="show" rounded="sm">
      <template v-slot:overlay>
        <div class="text-center">
          <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
          <p id="cancel-label">Please wait...</p>
        </div>
      </template>
      <CCard>
        <CCardHeader>
          <div>
            <h3>
              Solicitudes de videos
              <b-icon icon="camera-video-fill"></b-icon>
            </h3>
          </div>
        </CCardHeader>
        <div>
          <CCardBody>
            <b-row>
              <b-col>
                <div>
                  <div class="mb-3">
                    <h5>Filtrar por</h5>
                  </div>
                  <b-button
                    class="ml-2 mt-2 mb-4"
                    variant="secondary"
                    @click="consVideosEstatus(2)"
                    >Videos Pendientes<b-icon icon="hourglass-split"></b-icon
                  ></b-button>
                  <b-button
                    class="ml-2 mt-2 mb-4"
                    variant="success"
                    @click="consVideosEstatus(1)"
                    >Videos aceptados <b-icon icon="check-all"></b-icon
                  ></b-button>
                  <b-button
                    class="ml-2 mt-2 mb-4"
                    variant="danger"
                    @click="consVideosEstatus(3)"
                    >Videos rechazados<b-icon icon="x"></b-icon
                  ></b-button>
                </div>
                <div>
                  <div>
                    <h5 class="mt-4">
                      {{ Titulo }}
                      <b-icon :icon="Icono"></b-icon>
                    </h5>
                  </div>
                  <CDataTable
                    class="mt-4"
                    hover
                    :items="this.VideosRedes"
                    :fields="TitulosVideos"
                    column-filter
                    :columnFilter="{ external: true, lazy: true }"
                    :table-filter="{
                      external: true,
                      lazy: true,
                      placeholder: 'Buscar en toda la Tabla',
                      label: 'Buscar:',
                    }"
                    :items-per-page="5"
                    :sorter="{ external: true, resetable: true }"
                    @pagination-change="changeItemsLimit"
                    :column-filter-value.sync="columnFilter"
                    :table-filter-value.sync="tableFilter"
                    :items-per-page-select="{
                      label: 'Registros por pagina:',
                      values: ['5', '10', '20', '50'],
                    }"
                    :noItemsView="{
                      noResults: 'No hay resultados de filtrado disponibles',
                      noItems: 'No hay registros disponibles',
                    }"
                    :loading="loading"
                  >
                    <template #Nombre="{ item }">
                      <td>
                        {{ item.Nombre }}
                      </td>
                    </template>
                    <template #Url="{ item }">
                      <td>
                        <a :href="`${item.Url}`" target="_blank">{{
                          item.Url
                        }}</a>
                      </td>
                    </template>
                    <template #Status_Id="{ item }">
                      <td>
                        <CBadge :color="getBadge_color(item.Status_Id)">
                          {{ getBadge(item.Status_Id) }}
                        </CBadge>
                      </td>
                    </template>
                    <template #Id_Red="{ item }">
                      <td>
                        <img
                          :src="imagen(item.red.Id_Tipo)"
                          width="35"
                          height="35"
                        />
                      </td>
                    </template>
                    <template #Acciones="{ item }">
                      <td>
                        {{ selected }}
                        <b-form-select
                          :style="darkMode ? 'background-color:#393a42' : null"
                          v-model="item.Status_Id"
                          @change="cambiaEstado(item.id)"
                          ><b-form-select-option
                            v-for="op in options"
                            :key="op.value"
                            :value="op.value"
                            :disabled="op.value === Refresca"
                            >{{ op.text }}</b-form-select-option
                          >
                        </b-form-select>
                      </td>
                    </template>

                  </CDataTable>
                  <!-- :pages="datosall.maxPages" -->
                    <CPagination
                      :active-page.sync="activePage"
                      :pages="2"
                    />
                </div>
              </b-col>
            </b-row>
          </CCardBody>
        </div>
      </CCard>
    </b-overlay>
  </div>
</template>

<script>
const TitulosVideos = [
  { key: "Nombre", style: "width:20%", sorter: false },
  { key: "Url", label: "URL", style: "width:20%", sorter: false },
  {
    key: "Status_Id",
    label: "Estatus Actual",
    style: "width:20%",
    sorter: false,
  },
  { key: "Id_Red", label: "Red Social", style: "width:20%", sorter: false },
  {
    key: "Acciones",
    label: "Cambiar estatus",
    style: "widht:20%",
    filter: false,
  },
];

import { mapState } from "vuex";
import repoupdateprofileuser from "@/assets/repositoriosjs/repoupdateprofileuser.js";

export default {
  data() {
    return {
      // Paginacion de tabla
      activePage: 1,
      maxPages: 25,
      sorter: { column: "", asc: false },
      tableFilter: "",
      columnFilter: {},
      itemsLimit: 5,
      loading: false,
      acciones: [1, 2, 3],
      resuelve: 6,
      itemsporpagina: 5,
      details: [],
      userin: [],
      // Opciones para el reloj
      show: false,
      tempo: null,
      selected: null,

      Icono: "hourglass-split",
      Titulo: " Videos Pendientes",
      VideosRedes: [],
      TitulosVideos,
      collapseDuration: 0,
      // Opciones select cambiar estatus
      options: [
        { value: 2, text: "Pendiente" },
        { value: 1, text: "Aceptado" },
        { value: 3, text: "Rechazado" },
      ],
      // Variable para cambiar el estado del video
      Refresca: null,
      Video: {
        id: "",
        Url: "",
        Nombre: "",
        Status_Id: "",
        Id_Red: " ",
      },
    };
  },
  computed: {
    ...mapState(["Paginas"]),
    ...mapState(["darkMode"]),
  },
  async mounted() {
    this.consVideosEstatus(2);
    this.Refresca = 2;
  },
  watch: {
    loadingin() {
      this.loading = this.loadingin;
    },
    activePage() {
      this.getitemsback();
    },
    sorter: {
      handler() {
        this.eventsorter();
      },
      deep: true,
    },
    tableFilter() {
      this.getitemsback();
    },
    columnFilter() {
      this.getitemsback();
    },
  },
  methods: {
    //Paginacion eventos
    changeItemsLimit(val) {
      this.itemsLimit = val;
      this.getitemsback();
    },
    eventsorter() {
      this.getitemsback();
    },
    // Falta el endPoint para hacer la paginacion
    async getitemsback() {
      try {
        this.show = true;
        this.items = [];
        const repo = repoupdateprofileuser();
        await repo
          .getVideosPag({
            sorter: this.sorter,
            tableFilter: this.tableFilter,
            columnFilter: this.columnFilter,
            itemsLimit: this.itemsLimit,
            currentpage: this.currentpage,
          })
          .then(() => {
            //   let response=validaciones.validafriends(res);
            // let response = res.data;
            // console.log(response);
            // this.items = response.data;
          });
      } catch (error) {
        //
      } finally {
        this.show = false;
      }
    },
    // Metodos para la tabla de las redes sociales por aceptar
    getBadge(Estatus) {
      switch (Estatus) {
        case 1:
          return "Aceptado";
        case 2:
          return "Pendiente";
        case 3:
          return "Rechazado";
      }
    },
    getBadge_color(color) {
      switch (color) {
        case 1:
          return "success";
        case 2:
          return "secondary";
        case 3:
          return "danger";
      }
    },
    imagen(Id_Tipo) {
      let mode = "";
      if (this.darkMode) {
        mode = "_dark";
      }
      switch (Id_Tipo) {
        case 1:
          return require("../../../assets/img/YouTube" + mode + ".png");
        case 2:
          return require("../../../assets/img/Facebook2" + mode + ".png");
        case 3:
          return require("../../../assets/img/Snapchat" + mode + ".png");
        case 4:
          return require("../../../assets/img/Linkedin" + mode + ".png");
        case 5:
          return require("../../../assets/img/Instagram2" + mode + ".png");
        case 6:
          return require("../../../assets/img/TikTok1" + mode + ".png");
        case 7:
          return require("../../../assets/img/Twitter" + mode + ".png");
      }
    },
    async consVideosEstatus(op) {
      try {
        const repo = repoupdateprofileuser();
        await repo.VideosRedes(op).then((res) => {
          this.VideosRedes = res.data.data;
          if (op === 1) {
            this.Titulo = "Videos Aceptados";
            this.Icono = "check-all";
            this.Refresca = 1;
            return;
          }
          if (op === 2) {
            this.Titulo = "Videos Pendientes";
            this.Icono = "hourglass-split";
            this.Resfresca = 2;
            return;
          }
          if (op === 3) {
            this.Titulo = "Videos Rechazados";
            this.Icono = "x ";
            this.Refresca = 3;
            return;
          }
        });
      } catch (error) {
        //
      } finally {
        this.showanimation = false;
      }
    },
    // Cambia el estado del video
    async cambiaEstado(Tipo) {
      try {
        let cambiaStatus = {};
        cambiaStatus.Video_Id = Tipo;
        let tempo = this.VideosRedes.filter((tipo) => tipo.id === Tipo)[0]
          .Status_Id;
        cambiaStatus.Id_Status = tempo;
        const repo = repoupdateprofileuser();
        await repo.CambiaVideosRedes(cambiaStatus).then(() => {
          this.show = true;
        });
      } catch (error) {
        // console.log(error);
      } finally {
        await this.consVideosEstatus(this.Refresca);
        this.show = false;
      }
    },
  },
};
</script>
<style scoped>
td {
  word-wrap: break-word;
  max-width: 200px;
}
</style>

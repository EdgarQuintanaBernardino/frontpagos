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
              Solicitudes de redes sociales
              <b-icon icon="globe"></b-icon>
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
                    @click="consRedesEstatus(2)"
                    >Redes Sociales Pendientes<b-icon
                      icon="hourglass-split"
                    ></b-icon
                  ></b-button>
                  <b-button
                    class="ml-2 mt-2 mb-4"
                    variant="success"
                    @click="consRedesEstatus(1)"
                    >Redes sociales aceptadas <b-icon icon="check-all"></b-icon
                  ></b-button>
                  <b-button
                    class="ml-2 mt-2 mb-4"
                    variant="danger"
                    @click="consRedesEstatus(3)"
                    >Redes sociales rechazadas<b-icon icon="x"></b-icon
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
                    :items="this.TiposRedes"
                    :fields="fields"
                    :columnFilter="{ external: true, lazy: true }"
                    :table-filter="{
                      external: true,
                      lazy: true,
                      placeholder: 'Buscar en toda la Tabla',
                      label: 'Buscar:'
                    }"
                    :items-per-page="5"
                    :sorter="{ external: true, resetable: true }"
                    @pagination-change="changeItemsLimit"
                    :column-filter-value.sync="columnFilter"
                    :table-filter-value.sync="tableFilter"
                    :items-per-page-select="{
                      label: 'Registros por pagina:',
                      values: ['5', '10', '20', '50']
                    }"
                    :noItemsView="{
                      noResults: 'No hay resultados de filtrado disponibles',
                      noItems: 'No hay registros disponibles'
                    }"
                    :loading="loading"
                  >
                    <template #Url="{ item }">
                      <td>
                        <a :href="`${item.Url}`" target="_blank">{{
                          item.Url
                        }}</a>
                      </td>
                    </template>
                    <template #Tipo="{ item }">
                      <td>
                        <img
                          :src="imagen(item.Id_Tipo)"
                          width="35"
                          height="35"
                        />
                      </td>
                    </template>
                    <template #Estatus="{ item }">
                      <td>
                        <CBadge
                          id="tooltip-target-1"
                          :color="getBadge_color(item.Id_Status)"
                        >
                          {{ getBadge(item.Id_Status) }}
                        </CBadge>
                        <b-tooltip target="tooltip-target-1" placement="bottom" triggers="hover" >
                          Privacidad: <b>Empresa Privada</b>
                        </b-tooltip>
                      </td>
                    </template>
                    <template #Acciones="{ item }">
                      <td>
                        {{ selected }}
                        <b-form-select
                          :style="darkMode ? 'background-color:#393a42' : null"
                          v-model="item.Id_Status"
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
                  <CPagination :active-page.sync="activePage" :pages="1" />
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
// Titulos de la Tabla de redes sociales rechazadas
const fields = [
  { key: "Usuario", _style: "width:10%", sorter: false },
  { key: "Url", label: "URL", _style: "width:30%", sorter: false },
  { key: "Tipo", _style: "width:10%", filter: false, sorter: false },
  { key: "Suscriptores", _style: "width:15%", sorter: false },
  {
    key: "Estatus",
    label: "Estatus Actual",
    _style: "width:10%",
    filter: false
  },
  {
    key: "Acciones",
    label: "Cambiar Estatus",
    style: "widht:10%",
    filter: false
  }
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
      //Guardar valor respuesta peticion cambio de estatus
      tempo: null,
      // Variable para actualizar la tabla
      Refresca: null,
      // Opciones para cambiar el titulo e icono
      Icono: "hourglass-split",
      Titulo: "Redes Sociales Pendientes",
      TiposRedes: [],
      selected: null,
      // Opciones para cambiar de estado
      options: [
        { value: 2, text: "Pendiente" },
        { value: 1, text: "Aceptado" },
        { value: 3, text: "Rechazado" }
      ],
      collapse: false,
      innerCollapse: false,
      fields,
      collapseDuration: 0
    };
  },
  computed: {
    ...mapState(["Paginas"]),
    ...mapState(["darkMode"])
  },
  async mounted() {
    await this.consRedesEstatus(2);
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
      deep: true
    },
    tableFilter() {
      this.getitemsback();
    },
    columnFilter() {
      this.getitemsback();
    }
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
    // Manda la peticion al back
    async getitemsback() {
      try {
        this.show = true;
        this.items = [];
        const repo = repoupdateprofileuser();
        await repo
          .getRedesPag({
            sorter: this.sorter,
            tableFilter: this.tableFilter,
            columnFilter: this.columnFilter,
            itemsLimit: this.itemsLimit,
            currentpage: this.currentpage
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
    // Cambiar la imagen de la tabla
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
    // Consulta las redes sociales de acuerdo al estado de la red
    async consRedesEstatus(op) {
      try {
        const repo = repoupdateprofileuser();
        await repo.TiposRedes(op).then(res => {
          // console.log(res);
          this.TiposRedes = res.data.data;
          // console.log(res);
          if (op === 1) {
            this.Titulo = "Redes Sociales Aceptadas";
            this.Icono = "check-all";
            this.Refresca = 1;
            return;
          }
          if (op === 2) {
            this.Titulo = "Redes Sociales Pendientes";
            this.Icono = "hourglass-split";
            this.Refresca = 2;
            return;
          }
          if (op === 3) {
            this.Titulo = "Redes Sociales Rechazadas";
            this.Icono = "x ";
            this.Refresca = 3;
            return;
          }
        });
      } catch (error) {
        // console.log(error);
      } finally {
        this.showanimation = false;
      }
    },
    // Manda la petición para cambiar el estado de la red social
    async cambiaEstado(Tipo) {
      try {
        let cambiaStatus = {};
        cambiaStatus.Red_Id = Tipo;
        let tempo = this.TiposRedes.filter(tipo => tipo.id === Tipo)[0]
          .Id_Status;
        cambiaStatus.Id_Status = tempo;
        const repo = repoupdateprofileuser();
        await repo.CambiaTiposRedes(cambiaStatus).then(() => {
          this.show = true;
        });
      } catch (error) {
        // console.log(error);
      } finally {
        await this.consRedesEstatus(this.Refresca);
        this.show = false;
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

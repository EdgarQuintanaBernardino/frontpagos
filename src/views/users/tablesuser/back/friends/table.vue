<template>
  <CRow>
    <CCol sm="12">
      <CCard>
        <CCardHeader v-if="datosall.header">
          <h3>
            {{ datosall.headername }}
            <b-badge :variant="datosall.badgevariant" pill>{{
              datosall.totalRow
            }}</b-badge>
            <b-btn
              :style="datosall.btnstyle"
              :variant="datosall.btnvariant"
              @click.prevent="addin()"
              v-if="datosall.btnadd"
            >
              <b-icon
                :icon="datosall.iconadd"
                :animation="datosall.animation"
                :font-scale="datosall.fontscale"
                :class="datosall.classicon"
              ></b-icon
              >{{ datosall.namebtn }}
            </b-btn>
          </h3>
        </CCardHeader>

        <CCardBody>
          <CDataTable
            :items="datosall.items"
            :fields="datosall.columns"
            index-column
            hover
            footer
            table-column
            :itemsPerPage="datosall.totalfilasmostradas"
            :sorter="{ external: true, resetable: true }"
            :columnFilter="{ external: true, lazy: true }"
            :table-filter="{
              external: true,
              lazy: true,
              placeholder: 'Buscar en toda la Tabla',
              label: 'Buscar:'
            }"
            @pagination-change="changeItemsLimit"
            :sorter-value.sync="sorter"
            :column-filter-value.sync="columnFilter"
            :table-filter-value.sync="tableFilter"
            :items-per-page-select="{
              label: 'Registros por pagina:',
              values: ['5', '10', '20', '50']
            }"
            :loading="loading"
            :noItemsView="{
              noResults: 'No hay resultados de filtrado disponibles',
              noItems: 'No hay registros disponibles'
            }"
          >
            <template #actions="row">
              <b-container fluid>
                <b-row class="justify-content-md-center">
                  <b-col
                    cols="12"
                    :xl="datosall.resuelve"
                    v-for="permi in getacciones"
                    :key="permi"
                  >
                    <b-button
                      v-if="permi == 1"
                      size="md"
                      block
                      @click.prevent="info(row.item)"
                      variant="outline-primary"
                      class="mr-1 mb-1 mt-2"
                    >
                      <b-icon icon="pencil"></b-icon>Editar
                    </b-button>
                    <b-button
                      v-if="permi == 2"
                      size="md"
                      variant="outline-success"
                      block
                      class="mr-1 mb-1  mt-2"
                      @click="relationcuenta(row.item)"
                    >
                      <b-iconstack font-scale="1" animation="cylon">
                        <b-icon
                          stacked
                          icon="unlock"
                          animation="throb"
                          variant="success"
                          scale="0.75"
                        ></b-icon>
                      </b-iconstack>
                      <span class="font-lg"> Roles</span>
                    </b-button>
                    <b-button
                      v-if="permi == 3"
                      size="md"
                      variant="danger"
                      block
                      @click="deleteevent(row.item)"
                      class="mr-1 mb-1 mt-2"
                    >
                      <b-icon icon="lock-fill"></b-icon>Bloquear
                    </b-button>
                  </b-col>
                </b-row>
              </b-container>
            </template>
            <template #roles="row">
              <b-row class="text-center">
                <b-col
                  cols="12"
                  class="mb-2"
                  v-for="rol in row.item.roles"
                  :key="rol.id"
                >
                  <b-badge variant="info" pill v-if="rol.name == 'user'">{{
                    rol.name
                  }}</b-badge>
                  <b-badge
                    variant="success"
                    pill
                    v-else-if="rol.name == 'admin'"
                    >{{ rol.name }}</b-badge
                  >
                  <b-badge variant="success" pill v-else>{{
                    rol.name
                  }}</b-badge>
                </b-col>
              </b-row>
            </template>
            <template #name="{item}">
              <b-row>
                <b-col sm="12" class="mb-2 text-center">
                  <b-img
                    rounded="circle"
                    :src="
                      `https://pagosfile.s3-us-west-2.amazonaws.com/${item.photo}`
                    "
                    width="50px"
                    height="50px"
                    v-if="item.photo"
                    alt="not found"
                  ></b-img>
                  <b-img
                    rounded="circle"
                    src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/profile/sinfoto.png"
                    width="50px"
                    height="50px"
                    v-else
                  ></b-img>
                </b-col>
                <b-col sm="12" class="mb-2 text-center">
                  <b-button
                    size="sm"
                    v-b-toggle.sidebar-backdrop
                    variant="ligth"
                    @click="showuser(item)"
                    v-b-tooltip.hover.v-secondary
                    title="Ver detalles"
                  >
                    <!-- <b-icon icon="eye"></b-icon><br/> -->
                    {{ item.name }}
                  </b-button>
                </b-col>
              </b-row>
            </template>
          </CDataTable>
          <CPagination
            :pages="datosall.maxPages"
            :active-page.sync="activePage"
          />
        </CCardBody>
      </CCard>
    </CCol>
    <sidebarcustom :userin="userin"></sidebarcustom>
  </CRow>
</template>

<style>
.lazyTable {
  display: block;
  height: 450px;
  overflow-y: scroll;
}

.lazyTable tr {
  height: 50px;
}
</style>

<script>
import sidebarcustom from "@/views/windowmodal/sidebarcustom";
export default {
  components: { sidebarcustom },
  name: "generic",
  props: ["loadingin", "iddeletein", "datosallin", "idedit"],
  data() {
    return {
      datosall: {
        placeholder: "generic",
        columns: []
      },
      lazyTableFields: [],
      items: [],
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
      userin: []
    };
  },
  watch: {
    idedit: function(newval) {
      this.actualizaregistro(newval);
    },
    datosallin: function(newval) {
      this.datosall = newval;
    },
    iddeletein: function(newval) {
      this.datosall.items = this.datosall.items.filter(
        itemin => itemin.id != newval.id
      );
      this.$emit("deletedetabla", newval);
    },
    loadingin() {
      this.loading = this.loadingin;
    },
    activePage() {
      this.eventdispatch();
    },
    sorter: {
      handler() {
        this.eventsorter();
      },
      deep: true
    },
    tableFilter() {
      this.eventdispatch();
    },
    columnFilter() {
      this.eventdispatch();
    }
  },

  methods: {
    eventsorter() {
      this.eventdispatch();
    },
    relationcuenta(row) {
      this.$emit("roles", row);
    },
    actualizaregistro(item) {
      let datosnuevos = [];
      for (let i = 0; i < this.datosall.items.length; i++) {
        this.datosall.items[i].id == item[0].id
          ? datosnuevos.push(item[0])
          : datosnuevos.push(this.datosall.items[i]);
      }
      this.datosall.items = datosnuevos;
    },
    addin() {
      this.$emit("add");
    },
    deleteevent(item) {
      this.$emit("deleteevento", item);
    },
    showuser(item) {
      this.userin = item;
    },
    info(item) {
      this.$emit("info", item);
    },
    changeItemsLimit(val) {
      this.itemsLimit = val;
      this.eventdispatch();
    },

    makeFilter() {
      this.eventdispatch();
      // this.getNotes();
    },
    eventdispatch() {
      this.$emit("getparams", {
        currentpage: this.activePage,
        itemsLimit: this.itemsLimit,
        columnFilter: this.columnFilter,
        tableFilter: this.tableFilter,
        sorter: this.sorter
      });
    }
  },
  mounted: function() {
    // this.getNotes();
  },
  computed: {
    getacciones() {
      return this.datosall.acciones;
    },
    resuelve1() {
      return 6;
    }
  }
};
</script>

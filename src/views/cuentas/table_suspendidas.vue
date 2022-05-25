<template>
  <div>
    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardHeader
            v-if="datosallin.header"
            class="d-flex flex-wrap"
            style="overflow:hidden;"
          >
            <div class="col-lg-5 col-xs-12 mt-1">
              <h4>
                {{ datosallin.headername }}
                <b-badge :variant="datosallin.badgevariant" pill>{{
                  datosallin.totalRow
                }}</b-badge>
              </h4>
            </div>

            <div class="col-xs-12 col-sm-12 col-lg-12 col-xl-7  mt-1">
              <b-button-group style="float:right">
                <b-btn @click="cambiatabla" variant="ligth"
                  ><b-icon
                    icon="arrow-left-square"
                    font-scale="1"
                    :class="datosall.classicon"
                  ></b-icon
                  >Regresar</b-btn
                >
              </b-button-group>
            </div>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              :items="datosallin.items"
              :fields="datosallin.columns"
              index-column
              hover
              footer
              table-column
              :itemsPerPage="datosallin.totalfilasmostradas"
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
                <b-button
                  size="md"
                  block
                  @click="restaurar(row.item)"
                  variant="outline-primary"
                  class="mr-1 mb-1 mt-2"
                  >Restaurar
                </b-button>
              </template>

              <template #nickname="{ item }">
                <td>{{ item.nickname }}</td>
              </template>
              <template #tipo="{ item }">
                <td>{{ item.tipo.tipo }}</td>
              </template>
              <template #clabe="{ item }">
                <td>
                  {{ item.tipo.tipo === "Efectivo" ? "No aplica" : item.clabe }}
                </td>
              </template>
              <template #banco="{ item }">
                <td>
                  {{
                    item.tipo.tipo === "Efectivo"
                      ? "No aplica"
                      : item.banco.banco
                  }}
                </td>
              </template>
              <template #numero_cuenta="{ item }">
                <td>
                  {{
                    item.tipo.tipo === "Efectivo"
                      ? "No aplica"
                      : item.numero_cuenta
                  }}
                </td>
              </template>
              <template #num_tarjeta="{ item }">
                <td>
                  {{
                    item.tipo.tipo === "Efectivo"
                      ? "No aplica"
                      : item.num_tarjeta
                  }}
                </td>
              </template>
              <template #moneda="{ item }">
                <td>{{ item.moneda.moneda }}</td>
              </template>
            </CDataTable>
            <CPagination
              :pages="datosallin.maxPages"
              :active-page.sync="activePage"
            />
          </CCardBody>
        </CCard>
      </CCol>
      <sidebarcustom :userin="userin"></sidebarcustom>
    </CRow>
  </div>
</template>

<script>
import sidebarcustom from "@/views/empresas/sidebarcustom";
// import repo from "@/assets/repositoriosjs/repoupdateprofileuser.js";
// import respuestas from "@/assets/repositoriosjs/respuestas.js";

export default {
  components: { sidebarcustom },
  props: ["loadingin", "iddeletein", "datosallin", "idedit"],
  data() {
    return {
      datosall: {
        placeholder: "generic",
        columns: []
      },
      CuentasSus: 0,
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

  methods: {
    restaurar(item) {
      this.$emit("restaurar", item);
    },
    cambiatabla() {
      this.$emit("tablasus");
    },
    eventsorter() {
      this.eventdispatch();
    },
    relationcuenta(row) {
      this.$emit("roles", row);
    },
    actualizaregistro(item) {
      let datosnuevos = [];
      for (let i = 0; i < this.datosall.items.length; i++) {
        this.datosall.items[i].id == item.id
          ? datosnuevos.push(item)
          : datosnuevos.push(this.datosall.items[i]);
      }
      this.datosall.items = datosnuevos;
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
  computed: {
    getacciones() {
      return this.datosall.acciones;
    },
    resuelve1() {
      return 6;
    }
  },
  watch: {
    idedit: function(newval) {
      this.actualizaregistro(newval);
    },
    datosallin: function(newval) {
      // console.log(oldval);
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
  mounted() {}
};
</script>

<style></style>

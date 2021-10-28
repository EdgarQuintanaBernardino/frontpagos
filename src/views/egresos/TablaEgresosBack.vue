<template>
  <div>
    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardHeader v-if="datosall.header">
            <h5>
              <div>
                <b-nav  pills class="d-flex">
                  <b-nav-item @click="navEgresos(1)" :active="nav==1" class="mt-1">Pagos Recibidos</b-nav-item>
                  <b-nav-item @click="navEgresos(2)" :active="nav==2" class="mt-1">Pagos en Tramite</b-nav-item>
                  <b-nav-item @click="navEgresos(3)" :active="nav==3" class="mt-1">Pagos Pendientes</b-nav-item>
                  <b-nav-item @click="navEgresos(4)" :active="nav==4" class="mt-1">Pagos Rechazados</b-nav-item>
                  <b-nav-form class="ml-auto">
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
                  </b-nav-form>
                </b-nav>
              </div>
            </h5>
          </CCardHeader>
          <div>
            <b-form-group
              v-if="false"
              style="border: 2px dotted gray"
              class="p-3"
              v-slot="{ ariaDescribedby }"
            >
              <span class="text-center">Columnas que desea visualizar</span>
              <b-form-checkbox-group
                v-model="selected"
                :options="columnscomputed"
                :aria-describedby="ariaDescribedby"
                switches
              ></b-form-checkbox-group>
            </b-form-group>
          </div>

          <b-container fluid>
            <!-- User Interface controls -->

            <b-row>
              <b-col lg="6" class="my-1 mt-4">
                <h4 class="typo__label text-center">
                  Columnas que desea visualizar
                </h4>
                <multiselect
                  v-model="selected"
                  tag-placeholder="Add this as new tag"
                  placeholder="Columna a visualizar"
                  label="label"
                  track-by="key"
                  :options="columns"
                  :multiple="true"
                  :taggable="true"
                  @input="onChange"
                ></multiselect>
              </b-col>
              <b-col lg="6" class="">
                <b-form-group
                  label-for="per-page-select"
                  label-cols-sm="6"
                  label-cols-md="4"
                  label-cols-lg="3"
                  label-align-sm="right"
                  label-size="sm"
                  class="mb-0"
                >
                  <h4 class="text-center">Registros Mostrados</h4>
                  <b-form-select
                    :style="darkMode ? 'background-color:#393a42' : null"
                    id="per-page-select"
                    v-model="itemsLimit"
                    :options="pageOptions"
                    @change="eventdispatch"
                  ></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>

            <filtros />

            <!-- Main table element -->
            <b-row>
              <b-col cols="12">
                <b-form-group class="table-responsive">
                  <tablecomplete
                    :selectedin="selected"
                    :datosalltable="datosall"
                    @edit="addin"
                  />
                </b-form-group>
                <b-col sm="7" md="12" class="my-1">
                  <b-pagination
                    v-model="activePage"
                    :total-rows="datosall.totalRow"
                    :per-page="itemsLimit"
                    @change="eventdispatch"
                    align="fill"
                    size="sm"
                    class="my-0"
                  ></b-pagination>
                </b-col>
              </b-col>
            </b-row>

            <!-- Info modal -->
            <b-modal
              :id="infoModal.id"
              :title="infoModal.title"
              ok-only
              @hide="resetInfoModal"
            >
              <pre>{{ infoModal.content }}</pre>
            </b-modal>
          </b-container>
        </CCard>
      </CCol>
      <sidebarcustom :userin="userin"></sidebarcustom>
    </CRow>
  </div>
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

    <style type="text/css" scoped>
thead tr th {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: rgb(230, 126, 34);
}

.table-responsive {
  height: 600px;
  overflow: scroll;
}
</style>
<script>
import { BFormSelect } from "bootstrap-vue";
import { mapState } from "vuex";
import HorizontalScroll from "vue-horizontal-scroll";
import draggable from "vuedraggable";
import Multiselect from "vue-multiselect";
import _ from "lodash";
import "vue-horizontal-scroll/dist/vue-horizontal-scroll.css";
import sidebarcustom from "@/views/empresas/sidebarcustom";
import Vue from "vue";
import filtros from "./componentes/filtros";
import tablecomplete from "./componentes/tablecomplete.vue";

export default {
  components: {
    BFormSelect,
    sidebarcustom,
    HorizontalScroll,
    draggable,
    Multiselect,
    filtros,
    tablecomplete,
  },
  name: "generic",
  props: ["loadingin", "iddeletein", "datosallin", "idedit"],

  //Parte de data gustavo
  data() {
    return {
      navEgresosAct: false,
      nav:0,
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, 25, 50, 100],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },

      ////
      columns: [
        {
          key: "clear",
          label: "Quitar Todos",
          sortable: true,
          class: "text-center",
        },
        {
          key: "all",
          label: "Seleccionar Todo",
          sortable: true,
          class: "text-center",
        },
        { key: "usersin", label: "Enviado a", sortable: true },
        { key: "concepto", label: "Concepto", sortable: true },
        { key: "comentario", label: "Comentario", class: "text-center" },
        { key: "cuenta", label: "Cuenta Bancaria", class: "text-center" },
        {
          key: "monto_bruto",
          label: "Monto",
          sortable: true,
          class: "text-center",
        },
        {
          key: "moneda",
          label: "Moneda",
          sortable: true,
          class: "text-center",
        },
        { key: "iva", label: "Iva", sortable: true, class: "text-center" },
        {
          key: "monto_solicitado",
          label: "Monto Neto",
          sortable: true,
          class: "text-center",
        },
        { key: "links", label: "Links", class: "text-center" },
        {
          key: "creado",
          label: "Fecha Límite",
          sortable: true,
          class: "text-center",
        },
        { key: "archivos", label: "Archivos", class: "text-center" },
        { key: "status", label: "Status Pago", class: "text-center" },
        { key: "actions", label: "Acciones", class: "text-center" },
        // { key: "id_propio", label: "Id", class: "text-center" },
        //{ key: "usuarios", label: "Usuarios", class: "text-center" }, ///todos los usuarios
        // { key: "titulo", label: "Tipo", class: "text-center" },
        // { key: "visto", label: "Visto", class: "text-center" },
        // { key: "recurrente", label: "Recurrente", class: "text-center" },
        // { key: "proyecto", label: "Proyecto", class: "text-center" },
        // { key: "tag", label: "Tags", class: "text-center" },
        // { key: "ticket", label: "Chat", class: "text-center" },
        // {
        //   key: "status_factura",
        //   label: "Status Factura",
        //   class: "text-center",
        // },
      ],
      selected: [], // Must be an array reference!
      options: [
        { name: "Vue.js", code: "vu" },
        { name: "Javascript", code: "js" },
        { name: "Open Source", code: "os" },
      ],
      headervar: false,
      datosall: {
        placeholder: "generic",
        columns: [],
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
      userin: [],
    };
  },
  watch: {
    idedit: function (newval, oldval) {
      this.actualizaregistro(newval);
    },
    datosallin: function (newval, oldval) {
      this.datosall = newval;
    },
    iddeletein: function (newval, oldval) {
      this.datosall.items = this.datosall.items.filter(
        (itemin) => itemin.id != newval.id
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
      deep: true,
    },

    columnFilter() {
      this.eventdispatch();
    },
  },

  methods: {
    navEgresos(num){
      this.nav = num
      this.$emit('cambiatabla',num);
    },
    tableFilterin() {
      this.eventdispatch();
    },
    onChange(value) {
      let clear = value.filter((e) => e.key == "clear");
      let all = value.filter((e) => e.key == "all");
      if (clear.length > 0) {
        this.selected = [];
      }
      if (all.length > 0) {
        this.selected = this.columns.filter((e) => {
          return e.key != "clear" && e.key != "all";
        });
      }
    },
    getreplicas(array) {
      if (array) {
        array.forEach((element) => {
          let fecha = new Date(element.created_at);
          let nuevo = fecha.toDateString("es-ES");

          element.created_at = nuevo;
        });
        return array;
      } else {
        return [];
      }
    },
    showticket(item) {
      this.$emit("showtickets", item);
    },

    buclecuentauser(users) {
      if (users.length > 0) {
        let nuevos2 = _.groupBy(users, "id");
        return nuevos2;
      } else {
        return users;
      }
    },
    buclecuenta(archivo) {
      if (archivo.length > 0) {
        let nuevos2 = _.groupBy(archivo, "gettipo.tipo");
        return nuevos2;
      } else {
        return archivo;
      }
    },
    ordenar(item) {
      // console.log("ordena por"+item)
      // console.log(item)
    },
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
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
    addin() {
      // console.log("sillego==")
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
      let columnas = this.filter;
      console.log(this.filter);
      console.log(this.Filter_Columns);

      this.$emit("getparams", {
        currentpage: this.activePage,
        itemsLimit: this.itemsLimit,
        columnFilter: this.Filter_Columns,
        tableFilter: this.filter,
        sorter: this.sorter,
      });
    },

    agregarElementos() {
      //Agregra elemeos a un array
      elementos.parametros.push(selectedOption);
      elementos.criterios.push(criterios);
    },
  },

  mounted: function () {
    // this.getNotes();
  },
  computed: {
    ...mapState(["darkMode"]),
    //Primera
    availableFilter() {
      return this.name ? this.name.parameters : false;
    },
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
    sortOptions() {
      // Create an options list from our fields
      return this.columns
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
    columnsalldates() {
      return this.columns.filter(
        (opt) => this.selected.indexOf(opt.label) != -1
      );
    },
    columnscomputed() {
      return this.columns.map((e) => e.label);
    },
    getacciones() {
      return this.datosall.acciones;
    },
    resuelve1() {
      return 6;
    },
  },
};
</script>

<template>
  <div>
    <!-- <b-modal
      id="modal-pagos-add"
      ref="modal-pagos"
      @show="eventdetected"
      @hidden="resetModal"
      size="lg"
      :title="this.$parent.config.titulo + ' Pago'"
      hide-footer
      header-text-variant="light"
      header-bg-variant="primary"
      header-text-size="xl"
    > -->
    <CModal
      id="modal-pagos-add"
      ref="modal-pagos"
      size="lg"
      :title="this.$parent.config.titulo + ' Pago'"
      hide-footer
      header-text-variant="light"
      header-bg-variant="primary"
      header-text-size="xl"
      :show.sync="warningModal"
    >
      <div>
        <!-- Header -->
        <b-row>
          <b-col>
            <b-progress :max="max" height="3rem">
              <b-progress-bar :value="value" variant="success">
                <h4>
                  Paso <strong>{{ value.toFixed(2) / 50 }}</strong>
                </h4>
              </b-progress-bar>
            </b-progress>
          </b-col>
        </b-row>
      </div>
      <!-- Formulario -->
      <div class="col-12">
        <PasoUno v-if="value === 50" />
        <PasoDos v-if="value === 100">
          
        </PasoDos>
      </div>
      <template #footer-wrapper>
        <!-- Footer -->
        <div class="m-2">
          <hr />
          <b-row>
            <b-col cols="12" class="text-center mt-1">
              <b-button
                class="col-12"
                variant="success"
                @click="next"
                v-if="value != 100"
                >Siguiente</b-button
              >
              <b-button
                v-if="value === 100"
                class="mr-1 col-5"
                variant="success"
                @click="back"
                >Regresar</b-button
              >
              <b-button
                v-if="value === 100"
                class="ml-1 col-5"
                @click="end"
                id="end-btn"
                variant="primary"
                >Finalizar</b-button
              >
            </b-col>
          </b-row>
        </div>
      </template>
      <!-- </b-modal> -->
    </CModal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Multiselect from "vue-multiselect";
import repo from "@/assets/repositoriosjs/repoupdateprofileuser";
import PasoUno from "@/views/ingresos/componentes/PasoUno";
import PasoDos from "@/views/ingresos/componentes/PasoDos";
import Archivos from "@/views/ingresos/componentes/ArchivosV2";

export default {
  data() {
    return {
      warningModal: false,
      value: 50,
      max: 100,
    };
  },
  components: {
    PasoUno,
    PasoDos,
    Archivos,
  },
  methods: {
    next() {
      if (this.value === 50) {
        this.value = 100;
      }
    },
    back() {
      if (this.value === 100) {
        this.value = 50;
      }
    },
    end() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs["modal-pagos"].toggle("#end-btn");
    },
    async eventdetected() {
      this.options = this.$parent.myallusers;
      this.selected = [];
      this.tableshow = false;
    },
    resetModal() {
      ///reset para primera ventana
      this.resetfirstwindow();
      // this.resetsecondwindow();
      this.$emit("reload", "");
    },
    resetsecondwindow() {
      // this.form.shared.tipo = "unico";
      // this.form.shared.users.showcomplete = [];
      // this.form.shared.users.value = [];
      // this.form.shared.users.emails = [];
      // this.form.shared.users.alloption = [];
      // this.form.shared.users.detalle = [];
      // this.items = [];
      // this.form.sends = [];
    },

    resetfirstwindow() {
      this.value = 50;
      //   this.next = false;
      //   this.form.inicio = {
      //     concepto: "",
      //     fecha: this.fecha(),
      //     bruto: "",
      //     moneda: "Pesos",
      //     iva: "0",
      //     monto: "",
      //     comentario: "",
      //     id: "",
      //   };
      //   this.solicitudtemp = [];
    },
  },
};
</script>

<style>
</style>
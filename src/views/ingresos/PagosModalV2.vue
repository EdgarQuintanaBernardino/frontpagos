<template>
  <div>
    <b-modal
      id="modal-pagos-add"
      ref="modal-pagos"
      @show="eventdetected"
      @hidden="resetModal"
      size="xl"
      :title="this.$parent.config.titulo + ' Pago'"
      hide-footer
      header-text-variant="light"
      header-bg-variant="primary"
      header-text-size="xl"
    >
      <b-form autocomplete="off">
        <b-overlay :show="animationall" rounded="sm">
          <template v-slot:overlay>
            <div class="text-center">
              <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
              <p id="cancel-label">Please wait...</p>
            </div>
          </template>
          <CCol>
            <CCard>
              <CCardBody>
                <form-wizard
                  color="#e67e22"
                  error-color="#a94442"
                  title=""
                  subtitle=""
                  finishButtonText="Finalizar"
                  :start-index="tabIndex"
                >
                  <template slot="footer" slot-scope="props">
                    <div class="wizard-footer-left">
                      {{ props }}
                      <wizard-button
                        v-if="props.activeTabIndex > 0 && !props.isLastStep"
                        @click.native="props.prevTab()"
                        :style="props.fillButtonStyle"
                        ><span class="ti-control-backward"></span
                        >Regresar</wizard-button
                      >
                    </div>
                    <div class="wizard-footer-right">
                      <wizard-button
                        v-if="!props.isLastStep"
                        @click.native="props.nextTab()"
                        class="wizard-footer-right go-next"
                        :style="props.fillButtonStyle"
                        ><span class="ti-control-forward"></span
                        >Siguiente</wizard-button
                      >
                      <wizard-button
                        v-else
                        @click.native="secondsend()"
                        class="wizard-footer-right finish-button"
                        :style="props.fillButtonStyle"
                      >
                        <span class="ti-wand"></span>
                        {{props.isLastStep ? "Finalizar" : "Siguiente"}}</wizard-button
                      >
                    </div>
                  </template>
                  <hr />
                  <tab-content
                    title="Primer Paso"
                    icon="ti-money"
                    :before-change="validateone"
                  >
                    <NuevoPago class="mb-3" />
                  </tab-content>
                  <tab-content title="Paso 2">
                    <Modalidad/>
                    Hola
                  </tab-content>
                </form-wizard>
              </CCardBody>
            </CCard>
          </CCol>
        </b-overlay>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import "regenerator-runtime/runtime";
import { mapState } from "vuex";
import { required, minLength } from "vuelidate/lib/validators";
import repocreate from "@/assets/repositoriosjs/repoupdateprofileuser";
import Swal from "sweetalert2";
import repo from "@/assets/repositoriosjs/repoupdateprofileuser";
import { mapActions, mapMutations } from "vuex";
import NuevoPago from "./componentes/NuevoPago.vue";
import Modalidad from "./componentes/Modalidad.vue";

import Vue2Filters from "vue2-filters";
// import Multiselect from "vue-multiselect";
// import repoupdateprofileuser from "../../assets/repositoriosjs/repoupdateprofileuser";

export default {
  data() {
    return {
        debug: false,
        datoseditar: [],
        range: "",
        mensaje: true,
        mensajeok: "Sin cambios",
        mensajealert: "",
        toglecuenta: false,
        items: [],
        animationall: false,
        tabIndex: 0,
        form: {
        existsolicitudes: [], /////////para edit vamos a tomar esto como parametro!
        sends: [],
        recurrencia: {
          tipo: [],
          hora: "",
          tiempo: "",
          inicia: "",
        },
        inicio: {
          concepto: "",
          fecha: "",
          bruto: "",
          moneda: "Pesos",
          iva: "0",
          monto: "",
          comentario: "",
          id: "",
        },
        shared: {
          tipo: "unico",
          users: {
            showcomplete: [],
            value: [],
            emails: [],
            alloption: [],
            detalle: [],
          },
        },
        tags: {
          yourtags: [],
          tagsnuevos: [],
          showtags: [],
        },

        id: "",
        tittle: "",
        value: [],
        cuentas: [],
        links: [],
        linksold: [],
        selectedproyect: [],
      },
    };
  },
  components: {
    NuevoPago, 
    Modalidad,
  },
  validations: {
    items: { required, minLength: minLength(1) },
    form: {
      concepto: { required, minLength: minLength(7) },
      value: { required },

      shared: {
        tipo: required,

        users: {
          showcomplete: required,
        },
      },
      inicio: {
        concepto: { required, minLength: minLength(7) },
        bruto: { required },
        moneda: { required },
      },
      cuentas: { required },
      bruto: { required },
    },
  },
  watch: {
    toglecuenta: function (newval, oldval) {},
    tipor: function (newval, oldval) {
      this.revisarecurrencia(newval);
    },
  },
  methods: {
    async eventdetected() {
      this.options = this.$parent.myallusers;
      //console.log(this.$parent.myallusers)
      this.selected = [];
      //this.optionsc=this.$parent.myallcuentas;
      //  this.optionsempresas = this.$parent.empresasall.map((e) => e.nombre);
      // this.optionsproyectos = this.$parent.proyectosall.map((e) => e.nombre);
      // if (this.$store.state.flagpago == 1) {

      this.tableshow = false;
      //  this.resetModal();

      // } else {
      //   this.updateModaledit();

      // }
    },
    resetModal() {
      ///reset para primera ventana
      this.resetfirstwindow();
      this.resetsecondwindow();
      this.$emit("reload", "");
    },
    resetsecondwindow() {
      //   this.form.shared.tipo = "unico";
      //   this.form.shared.users.showcomplete = [];
      //   this.form.shared.users.value = [];
      //   this.form.shared.users.emails = [];
      //   this.form.shared.users.alloption = [];
      //   this.form.shared.users.detalle = [];
      //   this.items = [];
      //   this.form.sends = [];
    },
    resetfirstwindow() {
      this.next = false;
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
    validateone(acces = false) {
      if (!this.debug) {
        this.next = false;
        if (acces) {
          return acces;
        } else {
          if (!this.$v.form.inicio.$invalid) {
            /// si es valido el form
            if (this.solicitudtemp.id) {
              ///si tenemos ya una solicitud en curso
              return this.updatesolicitud();
            } else {
              ////si es nueva se crea
              return this.firstsend();
            }
          } else {
            //// formulario no completo
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Formulario incompleto",
              showConfirmButton: false,
              timer: 1000,
            });
            return !this.$v.form.inicio.$invalid; //// resulta del formulario
          }
        }
      } else {
        return true;
      }
    },
    async updatesolicitud() {
      this.animationall = true;
      this.form.inicio.id = this.solicitudtemp.id;
      try {
        let repoitems = repo();
        await repoitems.updatesolicitud(this.form).then((res) => {
          if (res.id) {
            this.solicitudtemp = res;
            this.next = true;
          } else {
            this.next = false;
          }
        });
      } catch (err) {
        console.log(err);
      } finally {
        this.animationall = false;
        return this.next;
      }
    },
    async firstsend() {
      this.animationall = true;
      try {
        let repoitems = repo();
        await repoitems.addsolicitud(this.form.inicio).then((res) => {
          if (res.id) {
            this.solicitudtemp = res;
            this.form.inicio.id = res.id;
            this.form.id = res.id;
            this.next = true;
          } else {
            this.next = false;
          }
        });
      } catch (err) {
        console.log(err);
      } finally {
        this.animationall = false;
        return this.next;
      }
    },
  },
  computed: {},
};
</script>

<style>
</style>
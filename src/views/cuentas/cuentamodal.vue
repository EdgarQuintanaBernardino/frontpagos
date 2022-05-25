<template>
  <div>
    <b-modal
      id="modal-prevent-cuentapoli"
      ref="modal-cuenta"
      @show="eventdetected"
      @hidden="resetModal"
      size="xl"
      hide-footer
    >
      <template #modal-header>
        <h5>
          <b-icon
            icon="credit-card-fill"
            aria-hidden="true"
            class="mr-1"
          ></b-icon>
          {{ tittlemodal.titulo }} Cuenta
        </h5>
        <div>
          <b-button
            class="float-right btn-sm"
            variant="danger"
            @click="closeModal()"
            ><b-icon icon="x"></b-icon
          ></b-button>
        </div>
      </template>
      <b-form autocomplete="off">
        <b-overlay :show="animationall" rounded="sm">
          <template v-slot:overlay>
            <div class="text-center">
              <b-icon
                icon="stopwatch"
                font-scale="3"
                animation="cylon"
              ></b-icon>
              <p id="cancel-label">Please wait...</p>
            </div>
          </template>
          <CCol>
            <CCard>
              <!-- <CCardHeader class="bg-info">
                <h2 class="text-center text-white">
                  {{ tittlemodal.titulo }} Cuenta
                </h2>
              </CCardHeader> -->
              <CCardBody>
                <b-row v-if="this.empresas.length > 0">
                  <!-- <b-col cols="12" md="12" class="mb-3">
                    <label>
                      <span>Nombre de la cuenta</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="person-lines-fill"></b-icon>
                      </b-input-group-prepend>
                      <b-input
                        v-model="$v.form.name.$model"
                        placeholder="Nombre de la Cuenta"
                      >
                      </b-input>
                    </b-input-group> </b-col
                  >-->
                  <b-col cols="12" md="6">
                    <label>
                      <span>Tipo de cuenta</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="person-lines-fill"></b-icon>
                      </b-input-group-prepend>
                      <!-- <b-form-select
                        :options="CuentasCompleto"
                        v-model="form.tipo"

                        text-field="tipo"
                      ></b-form-select> -->
                      <b-form-select v-model="form.tipo">
                        <b-form-select-option
                          v-for="item in CuentasCompleto"
                          :key="item.tipo_id"
                          :value="item"
                          :label="item.tipo"
                        />
                      </b-form-select>
                    </b-input-group>
                    <!-- <span
                      class="text-danger d-block"
                      style="float: right"
                      v-if="form.name.length == 0"
                      >campo requerido**</span
                    >
                    <span
                      class="text-danger d-block"
                      style="float: right"
                      v-if="form.name.length < 1 && form.name.length > 0"
                      >Minímo 6 caracteres</span
                    >
                    <span
                      class="text-success d-block"
                      style="float: right"
                      v-if="form.name.length >= 1"
                      >Perfecto!</span
                    > -->
                  </b-col>
                  <b-col
                    cols="12"
                    md="6"
                    v-if="
                      this.form.tipo.tipo_id != 5 || this.form.tipo.tipo_id == 6
                    "
                  >
                    <label>
                      <span>Número de Tarjeta</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="credit-card"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        min="0"
                        v-model="form.num_tarjeta"
                        type="number"
                        placeholder="Número de tarjeta"
                        maxlength="16"
                        oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);value=this.value.replace('e','')"
                      ></b-form-input>
                    </b-input-group>
                  </b-col>
                  <b-col cols="12" md="6" v-else></b-col>
                  <b-col cols="12" md="6" v-if="this.form.tipo.tipo_id == 6">
                    <label>
                      <span>Especifica tipo de cuenta</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="check"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        v-model="form.tipo.tipo"
                        type="text"
                        placeholder="Especifica tipo de cuenta"
                        maxlength="16"
                      ></b-form-input>
                    </b-input-group>
                  </b-col>
                  <b-col
                    cols="12"
                    md="6"
                    class="mt-3"
                    v-if="this.form.tipo.tipo_id != 5"
                  >
                    <label>
                      <span>Número de Cuenta</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="credit-card2-front"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        v-model="form.numerocuenta"
                        type="number"
                        placeholder="Número de cuenta"
                        maxlength="20"
                        oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);value=this.value.replace('e','')"
                      ></b-form-input>
                    </b-input-group>
                  </b-col>
                  <b-col
                    cols="12"
                    md="6"
                    class="mt-3"
                    v-if="this.form.tipo.tipo_id != 5"
                  >
                    <label>
                      <span>Cuenta CLABE</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="lock-fill"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        type="number"
                        v-model="form.clabe"
                        placeholder="Cuenta CLABE"
                        maxlength="18"
                        oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);value=this.value.replace('e','')"
                      ></b-form-input>
                    </b-input-group>
                  </b-col>
                  <b-col
                    cols="6"
                    lg="6"
                    class="mt-3"
                    v-if="this.form.tipo.tipo_id != 5"
                  >
                    <label>
                      <span>Fecha de corte</span>
                    </label>
                    <b-input-group size="md">
                      <b-form-datepicker></b-form-datepicker>
                    </b-input-group>
                    <!-- <datalist id="bancos">
                      <option v-for="item in bancos" :key="item">
                        {{ item }}
                      </option>
                    </datalist> -->
                  </b-col>
                  <b-col
                    cols="6"
                    lg="6"
                    class="mt-3"
                    v-if="this.form.tipo.tipo_id != 5"
                  >
                    <label>
                      <span>Banco</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="building"></b-icon>
                      </b-input-group-prepend>
                      <b-form-select v-model="form.banco">
                        <b-form-select-option
                          v-for="item in bancos"
                          :key="item.banco_id"
                          :value="item"
                          :label="item.banco"
                        />
                      </b-form-select>
                    </b-input-group>
                    <!-- <datalist id="bancos">
                      <option v-for="item in bancos" :key="item">
                        {{ item }}
                      </option>
                    </datalist> -->
                  </b-col>
                  <b-col
                    cols="12"
                    lg="12"
                    class=""
                    v-if="
                      this.form.tipo.tipo_id != 5 &&
                        this.form.banco.banco_id == 90
                    "
                  >
                    <label>
                      <span>Especifica el banco</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="check"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        v-model="form.banco.banco"
                        type="text"
                        placeholder="Especifica el banco"
                        maxlength="16"
                      ></b-form-input>
                    </b-input-group>
                  </b-col>
                  <b-col cols="12" md="6" class="text-center mt-3">
                    <label>
                      <span class="text-info">Alias de la Cuenta</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="person-lines-fill"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        v-model="form.alias"
                        placeholder="Alias y/o NickName de la Cuenta"
                      ></b-form-input>
                    </b-input-group>
                  </b-col>
                  <b-col cols="12" md="6" class="text-center mt-3">
                    <label>
                      <span class="text-info">Moneda</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="person-lines-fill"></b-icon>
                      </b-input-group-prepend>
                      <b-form-select v-model="form.moneda">
                        <b-form-select-option
                          v-for="item in monedas"
                          :key="item.id"
                          :value="item"
                          :label="item.moneda"
                        />
                      </b-form-select>
                      <!-- <b-form-select
                        :options="monedas"
                        text-field="nombre"
                        value-field="id"
                        placeholder="Tipo de Moneda"
                        v-model="form.moneda"
                      ></b-form-select> -->

                      <!-- <datalist id="monedas">
                        <option v-for="item in monedas" :key="item">
                          {{ item }}
                        </option>
                      </datalist> -->
                    </b-input-group>
                  </b-col>
                  <b-col
                    cols="12"
                    md="6"
                    class=""
                    v-if="this.form.moneda.moneda_id == 14"
                  ></b-col>
                  <b-col
                    cols="12"
                    md="6"
                    class=""
                    v-if="this.form.moneda.moneda_id == 14"
                  >
                    <label>
                      <span>Especifica la moneda</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="plus-square"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        v-model="form.moneda.moneda"
                        type="text"
                        placeholder="Especifica la moneda"
                        maxlength="16"
                      ></b-form-input>
                    </b-input-group>
                  </b-col>
                  <b-col
                    cols="12"
                    class="text-center mt-3"
                    v-if="this.$store.state.flagcuenta != 9"
                  >
                    <label>
                      <h5 class="text-info">Tus Empresas</h5>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="star"></b-icon>
                      </b-input-group-prepend>
                      <b-form-select
                        v-model="form.empresa"
                        :options="empresas"
                      ></b-form-select>
                    </b-input-group>
                  </b-col>
                </b-row>

                <div class="mt-4">
                  <div id="btnin">
                    <b-button
                      block
                      variant="success"
                      :hidden="$v.$invalid || btnadios"
                      @click.prevent="empresacreate(form)"
                      v-if="
                        this.$parent.config.showreset &&
                          this.form.empresa.length > 0 &&
                          this.empresas.length > 0
                      "
                    >
                      <h5>
                        <b-icon
                          icon="person-badge"
                          aria-hidden="true"
                          class="mr-3"
                        ></b-icon
                        >Agrega Cuenta
                      </h5>
                    </b-button>
                    <b-button
                      block
                      variant="outline-primary"
                      @click.prevent="redirectaempresas()"
                      v-if="this.empresas.length == 0"
                      pill
                    >
                      <h3>
                        <b-icon
                          icon="building"
                          aria-hidden="true"
                          class="mr-3"
                        ></b-icon
                        >No tienes Empresas, Agrega una Aquí
                      </h3>
                    </b-button>
                    <b-button
                      block
                      variant="success"
                      @click.prevent="empresaupdate()"
                      v-if="
                        !this.$parent.config.showreset &&
                          !$v.$invalid &&
                          this.empresas.length > 0 &&
                          this.form.empresa != ''
                      "
                    >
                      <h5>
                        <b-icon
                          icon="check-circle"
                          aria-hidden="true"
                          class="mr-3"
                        ></b-icon
                        >Actualiza Cuenta
                      </h5>
                    </b-button>
                    <h2
                      class="text-danger text-center"
                      v-if="
                        !$v.$invalid &&
                          this.empresas.length > 0 &&
                          this.form.empresa == ''
                      "
                    >
                      Selecciona una Empresa para Continuar
                    </h2>
                  </div>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
          <!-- <b-row>
            <b-col cols="12">
              <b-button
                variant="outline-danger"
                block
                @click="hideModal"
                pill
                size="sm"
              >
                <h4><b-icon icon="door-closed" class="mr-3"></b-icon>Cerrar</h4>
              </b-button>
            </b-col>
          </b-row> -->
        </b-overlay>
      </b-form>
      <!-- <template #modal-footer>
        <div>
          <b-button variant="danger" @click="hideModal">
            Cancelar
          </b-button>
        </div>
      </template> -->
    </b-modal>
  </div>
</template>

<script>
import "regenerator-runtime/runtime";
// import Multiselect from "vue-multiselect";
import { required, minLength } from "vuelidate/lib/validators"; //between
import repocreate from "@/assets/repositoriosjs/repoupdateprofileuser.js";
// import Swal from "sweetalert2";
import alertas from "@/assets/repositoriosjs/alertas";

export default {
  name: "modalcuenta",
  data() {
    return {
      empresas: [],
      showanimation: false,
      animationall: false,
      CuentasCompleto: [],
      form: {
        id: "",
        tittle: "",
        name: "Cuenta",
        banco: { banco_id: 0, banco: "" },
        clabe: "",
        numerocuenta: "",
        alias: "",
        moneda: "",
        empresa: "",
        padre_id: "",
        num_tarjeta: "",
        tipo: { tipo_id: 0, tipo: "" }
      },
      monedas: [],
      // monedas: [
      // "Pesos Mexicanos - MXN",
      // "Dolares - USD",
      // "Euros - EUR",
      // "Soles - PEN",
      // "Qetzal - GTQ",
      // "Libra esterlina - GBP",
      // "Franco suizo - CHF",
      // "Yen japonés - JPY",
      // "Dólar hongkonés - HKD",
      // "Dólar canadiense - CAD",
      // "Yuan chino - CNY",
      // "Dólar australiano - AUD",
      // "Real brasileño - BRL",
      //  ],
      // bancos: ["BANAMEX","BANCOMEXT","BANOBRAS","BBVA BANCOMER","SANTANDER","BANJERCITO","HSBC","BAJIO","IXE","INBURSA","INTERACCIONES","MIFEL","SCOTIABANK","BANREGIO","INVEX","BANSI","AFIRME",
      //   "BANORTE",
      //   "THE ROYAL BANK ",
      //   "AMERICAN EXPRESS",
      //   "BAMSA",
      //   "TOKYO",
      //   "JP MORGAN ",
      //   "BMONEX ",
      //   "VE POR MAS",
      //   "ING",
      //   "DEUTSCHE",
      //   "CREDIT SUISSE",
      //   "AZTECA",
      //   "AUTOFIN",
      //   "BARCLAYS",
      //   "COMPARTAMOS",
      //   "BANCO FAMSA ",
      //   "BMULTIVA ",
      //   "ACTINVER ",
      //   "WAL-MART ",
      //   "NAFIN",
      //   "INTERBANCO",
      //   "BANCOPPEL",
      //   "ABC CAPITAL",
      //   "UBS BANK ",
      //   "CONSUBANCO",
      //   "VOLKSWAGEN",
      //   "CIBANCO",
      //   "BBASE",
      //   "BANSEFI",
      //   "HIPOTECARIA FEDERAL",
      //   "MONEXCB",
      //   "GBM",
      //   "MASARI",
      //   "VALUE",
      //   "ESTRUCTURADORES",
      //   "TIBER",
      //   "VECTOR",
      //   "B&B",
      //   "ACCIVAL",
      //   "MERRILL LYNCH",
      //   "FINAMEX",
      //   "VALMEX",
      //   "UNICA",
      //   "MAPFRE",
      //   "PROFUTURO",
      //   "CB ACTINVER ",
      //   "OACTIN ",
      //   "SKANDIA ",
      //   "CBDEUTSCHE",
      //   "ZURICH ",
      //   "ZURICHVI ",
      //   "SU CASITA ",
      //   "CB INTERCAM",
      //   "CI BOLSA",
      //   "BULLTICK CB ",
      //   "STERLING",
      //   "FINCOMUN",
      //   "HDI SEGUROS",
      //   "ORDER",
      //   "AKALA ",
      //   "CB JPMORGAN",
      //   "STP",
      //   "TELECOMM ",
      //   "EVERCORE ",
      //   "SKANDIA",
      //   "SEGMTY",
      //   "ASEA",
      //   "KUSPIT",
      //   "SOFIEXPRESS",
      //   "UNAGRA",
      //   "OPCIONES",
      //   "EMPRESARIALES",
      //   "DEL NOROESTE ",
      //   "CLS",
      //   "INDEVAL",
      //   "LIBERTAD",
      //   "Otro",
      // ],
      bancos: [],
      update: true,
      btnadios: false
    };
  },
  components: {
    // Multiselect
    // Swal,
  },
  validations() {
    if (this.form.tipo.tipo_id != 5) {
      return {
        form: {
          // num_tarjeta: { required: this.form.numerocuenta.length==0 && this.form.clabe.length==0 ? required : false },
          tipo: { required },
          alias: { required, minLength: minLength(3) },
          moneda: { required },
          banco: { required }
        }
      };
    } else {
      return {
        form: {
          // name: { required, minLength: minLength(1) }
          // name: { minLength: minLength(1) },
          tipo: { required },
          alias: { required, minLength: minLength(3) },
          moneda: { required }
        }
      };
    }
  },
  async created() {
    await this.getTiposCuentas();
    await this.getBancos();
    await this.getMonedas();
  },
  methods: {
    closeModal() {
      this.$bvModal.hide("modal-prevent-cuentapoli");
    },
    addTag() {
      // console.log(newTag);
      // const tag = {
      //   id:this.CuentasCompleto.length+1,
      //   tipo: newTag,
      // }
      // this.CuentasCompleto.push(tag);
      // this.form.tipo_id = tag;
    },
    async getTiposCuentas() {
      try {
        const repo = repocreate();
        await repo.consTiposCuentas().then(res => {
          this.CuentasCompleto = res.data.map(elem => {
            let newObj = {};
            newObj.tipo_id = elem.id;
            newObj.tipo = elem.tipo;
            return newObj;
          });
        });
      } catch (error) {
        // console.log(error);
      } finally {
        this.showanimation = false;
      }
    },
    async getBancos() {
      try {
        const repo = repocreate();
        await repo.consBancos().then(res => {
          // this.bancos = res.data.map(ele => ele);
          this.bancos = res.data.map(elem => {
            let newObj = {};
            newObj.banco_id = elem.id;
            newObj.banco = elem.nombre;
            return newObj;
          });
        });
      } catch (error) {
        // console.log(error);
      } finally {
        this.showanimation = false;
      }
    },
    async getMonedas() {
      try {
        const repo = repocreate();
        await repo.consMonedas().then(res => {
          this.monedas = res.data.map(elem => {
            let newObj = {};
            newObj.moneda_id = elem.id;
            newObj.moneda = elem.nombre;
            return newObj;
          });
        });
      } catch (error) {
        // console.log(error);
      } finally {
        this.showanimation = false;
      }
    },
    updateModaledit() {
      console.log(this.regresacuentaedit);
      this.form.id = this.regresacuentaedit.id;
      this.form.name = this.regresacuentaedit.nombre_cuenta;
      this.form.alias = this.regresacuentaedit.nickname;
      this.form.clabe = this.regresacuentaedit.clabe;

      this.form.banco = this.regresacuentaedit.banco;
      this.form.numerocuenta = this.regresacuentaedit.numero_cuenta;
      this.form.moneda = this.regresacuentaedit.moneda;
      this.form.tipo = this.regresacuentaedit.tipo;
      this.form.num_tarjeta = this.regresacuentaedit.num_tarjeta;
      if (this.regresacuentaedit.hasOwnProperty("empresas")) {
        if (this.regresacuentaedit.empresas.length > 0) {
          this.form.empresa = this.regresacuentaedit.empresas[0].nombre;
        }
      }
      // this.form = this.regresacuentaedit;
      console.log(this.form);
    },
    async eventdetected() {
      let nombres = [];
      this.resetModal();
      // this.bancos = this.bancos.sort();
      console.log(this.$parent.myallcompanies);
      if (this.$parent.myallcompanies.length > 0) {
        let empresass = this.$parent.myallcompanies;
        nombres = empresass.map(item => item.nombre);
        this.empresas = nombres;
        // this.form.empresa = nombres[0];
      }
      if (!this.$parent.config.showreset) {
        this.updateModaledit();
      }
    },
    hideModal() {
      this.$refs["modal-cuenta"].hide();
      this.getTiposCuentas();
      /// console.log("maestra")
    },
    resetModal() {
      this.form = {
        name: "Cuenta",
        banco: {},
        clabe: "",
        numerocuenta: "",
        alias: "",
        moneda: {},
        empresa: "",
        tipo: {}
      };
      this.$emit("updateCuentas");
    },
    redirectaempresas() {
      this.hideModal();
      this.$router.push(`/empresas`);
    },

    async empresacreate() {
      this.animationall = true;
      this.btnadios = true;
      this.update = false;
      this.form.name = "Cuenta";
      if (this.$v.$invalid) {
        return false;
      }
      const repo = repocreate();
      try {
        console.log(this.form);
        await repo.adcuenta(this.form).then(res => {
          console.log(res);
          this.resetModal();
          this.$emit("updateCuentas");
          this.$emit("adduserevent", res.data[0]);
          this.hideModal();
        });
      } catch (error) {
        let res = alertas();
        console.log(error);
        res.errorgenerico();
      } finally {
        this.update = true;
        this.btnadios = false;
        this.animationall = false;
      }
    },
    async empresaupdate() {
      this.animationall = true;
      this.btnadios = true;
      this.update = false;
      if (this.$v.$invalid) {
        return false;
      }
      let repo = repocreate();
      try {
        console.log(this.form);
        await repo.updatecuenta(this.form).then(res => {
          this.resetModal();
          this.$emit("edituser", res.data[0]);
          console.log(res.data[0]);
          this.$store.commit("setcuentas", res.data[0].cuentas);
          this.hideModal();
        });
      } catch (error) {
        // console.log(error);
        let alert = alertas();
        alert.errorgenerico();
      } finally {
        this.animationall = false;
        this.$forceUpdate();
        this.update = true;
        this.btnadios = false;
      }
    }
  },
  computed: {
    // llenarbancos() {},
    // optionbanco() {
    //   if (this.form.banco == "OTRO") {
    //   } else {
    //   }
    // },
    regresacuentaedit() {
      return this.$parent.user;
    },
    tittlemodal() {
      return this.$parent.config;
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css" scoped></style>

<template>
  <b-row>
    <b-col cols="12" class="text-center">
      <label class="text-danger">**Campos Requeridos**</label>
    </b-col>
    <div class="text-center col-lg-6 col-xs-12">
      <div class="text-center mt-1 col-xs-12">
        <!-- <b-col cols="6" class="text-center mt-1 col-xs-12"> -->
        <label><h4>Concepto</h4></label>
        <!-- </b-col> -->
      </div>
      <b-input-group size="md" class="d-flex justify-content-center">
        <!-- <b-input-group-prepend is-text>
          <b-icon icon="plus-square"></b-icon>
        </b-input-group-prepend> -->
        <b-form-input
          v-model="form.concepto"
          placeholder="Concepto del Pago"
          :state="form.concepto.length >= 7"
        ></b-form-input>
      </b-input-group>
    </div>
    <div class="text-center col-md-12 col-sm-12 col-lg-6 col-xs-12">
      <div class="text-center mt-1 col-xs-12">
        <label><h4 class="">Comentario y/o descripción</h4></label>
      </div>
      <b-form-textarea
        id="textarea-rows"
        placeholder="Comentario"
        rows="2"
        v-model="form.comentario"
        :state="form.comentario.length >= 7"
      ></b-form-textarea>
    </div>
    <!-- <b-col cols="6" class="text-center">
      <b-form-datepicker
        id="datepicker-full-width"
        menu-class="w-100"
        calendar-width="100%"
        locale="es-MX"
        class="mb-2"
        :min="minimo"
      ></b-form-datepicker> 
    </b-col>-->
    <!-- FIN CAMPOS 1 -->
    <!-- TITULOS 2 INICIO -->
    <b-col cols="12" class="text-center mt-1">
      <label><h4 class="">Selección de Empresa y Cuenta Bancaria</h4></label>
    </b-col>
    <b-col cols="12 mt-1">
      <b-card>
        <b-tabs content-class="mt-3" fill>
          <b-tab title="Propia" active>
            <b-row>
              <b-col cols="12" class="text-center mb-1" lg="6">
                <b-form-select
                  v-model="form.empresaPropia"
                  :options="optionsEmpresaPropia"
                  :style="darkMode ? 'background-color:#393a42' : null"
                ></b-form-select>
              </b-col>
              <!-- <div class="col-6 d-flex flex-column"> -->
              <b-col
                cols="12"
                class="text-center col-12 col-lg-6"
                lg="6"
                sm="12"
              >
                <!-- <label class="typo__label">Tagging</label> -->
                <multiselect
                  v-model="form.seleccionCuentasEmpresaPropia"
                  tag-placeholder="Agregar nuevo"
                  placeholder="Selecciona una o mas cuentas"
                  label="name"
                  track-by="code"
                  :options="optionsCuentasEmpresaPropia"
                  :multiple="true"
                  :taggable="true"
                  @tag="addTagEP"
                  class="h2"
                  aria-required="true"
                ></multiselect>
                <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
              </b-col>
              <!-- </div> -->
            </b-row>
          </b-tab>
          <b-tab title="Externa">
            <b-row>
              <b-col cols="12" class="text-center mb-1" lg="6">
                <b-form-select
                  v-model="form.empresaExterna"
                  :options="optionsEmpresaExterna"
                  aria-required="true"
                  :style="darkMode ? 'background-color:#393a42' : null"
                ></b-form-select>
              </b-col>
              <b-col
                cols="12"
                class="text-center col-12 col-lg-6"
                lg="6"
                sm="12"
              >
                <!-- <label class="typo__label">Tagging</label> -->
                <multiselect
                  v-model="form.seleccionCuentasEmpresaExterna"
                  tag-placeholder="Agregar nuevo"
                  placeholder="Selecciona una o mas cuentas"
                  label="name"
                  track-by="code"
                  :options="optionsCuentasEmpresaPropia"
                  :multiple="true"
                  :taggable="true"
                  @tag="addTagEE"
                  class="h2"
                ></multiselect>
                <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Ceder" disabled>
            <b-row>
              <b-col cols="6" class="text-center">
                <!-- <label class="typo__label">Tagging</label> -->
                <multiselect
                  v-model="form.seleccionCuentasCedidas"
                  tag-placeholder="Agregar nuevo"
                  placeholder="Ingresa la empresa a ceder"
                  label="name"
                  track-by="code"
                  :options="optionsCuentasCedidas"
                  :multiple="true"
                  :taggable="true"
                  @tag="addTagCe"
                  class="h2"
                ></multiselect>
                <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
              </b-col>
            </b-row>
          </b-tab>
        </b-tabs>
      </b-card>
    </b-col>
    <div class="text-center col-lg-3 col-xs-12">
      <div class="text-center mt-1 col-xs-12">
        <!-- <b-col cols="3" class="text-center mt-1"> -->
        <label><h4 class="">Monto</h4></label>
        <!-- </b-col> -->
      </div>
      <b-input-group
        size="md"
        prepend="$"
        class="d-flex justify-content-center"
      >
        <b-form-input
          v-model="form.monto"
          :min="0"
          type="number"
          @change="calculaMontoNeto"
          v-on:keyup.prevent="calculaMontoNeto"
          :class="{
            'is-valid': this.form.monto > 0,
            'is-invalid': this.form.monto <= 0,
          }"
          oninput="javascript:value=this.value.replace('e','');
                   if(this.value.length>=20)this.value=this.value.substr(0,15);"
        ></b-form-input>
      </b-input-group>
    </div>
    <div class="text-center col-lg-3 col-xs-12">
      <div class="text-center mt-1 col-xs-12">
        <!-- <b-col cols="3" class="text-center mt-1"> -->
        <label><h4 class="">Moneda</h4></label>
        <!-- </b-col> -->
      </div>
      <b-form-select
        v-model="moneda"
        :options="optionsMoneda"
        disabled-field="true"
        disabled
        :style="darkMode ? 'background-color:#393a42' : null"
      ></b-form-select>
    </div>
    <div class="text-center col-lg-3 col-xs-12">
      <div class="text-center mt-1 col-xs-12">
        <!-- <b-col cols="3" class="text-center mt-1"> -->
        <label><h4 class="">IVA %</h4></label>
        <!-- </b-col> -->
      </div>
      <b-form-select
        v-model="form.iva"
        :options="optionsIva"
        :state="form.iva >= 0"
        @change="calculaMontoNeto"
        :style="darkMode ? 'background-color:#393a42' : null"
      ></b-form-select>
    </div>
    <div class="text-center col-lg-3 col-xs-12">
      <div class="text-center mt-1 col-xs-12">
        <!-- <b-col cols="3" class="text-center mt-1"> -->
        <label><h4 class="">Monto Neto</h4></label>
        <!-- </b-col> -->
      </div>
      <b-input-group size="md" prepend="$">
        <b-form-input
          type="number"
          @wheel="$event.target.blur()"
          readonly
          v-model="form.montoNeto"
          placeholder="Total"
          oninput="javascript:value=this.value.replace('e','')"
        >
        </b-form-input>
      </b-input-group>
    </div>
    <!-- <b-col cols="3" class="text-center mt-1">
      <label><h4 class="">Moneda</h4></label>
    </b-col> -->
    <!-- <b-col cols="3" class="text-center mt-1">
      <label><h4 class="">IVA %</h4></label>
    </b-col> -->
    <!-- <b-col cols="3" class="text-center mt-1">
      <label><h4 class="">Monto Neto</h4></label>
    </b-col> -->
    <!-- FIN TITULOS 2 -->
    <!-- INICIO INPUTs 2 -->
    <!-- <b-col cols="3" class="text-center">
      <b-input-group size="md" prepend="$">
        <b-form-input
          v-model="form.monto"
          :min="0"
          type="number"
          @change="calculaMontoNeto"
          v-on:keyup.prevent="calculaMontoNeto"
          :class="{
            'is-valid': this.form.monto > 0,
            'is-invalid': this.form.monto <= 0,
          }"
          oninput="javascript:value=this.value.replace('e','');
                   if(this.value.length>=20)this.value=this.value.substr(0,15);"
        ></b-form-input>
      </b-input-group>
    </b-col> -->
    <!-- <b-col cols="3" class="text-center">
      <b-form-select
        v-model="moneda"
        :options="optionsMoneda"
        disabled-field="true"
        disabled
      ></b-form-select>
    </b-col> -->
    <!-- <b-col cols="3" class="text-center">
      <b-form-select
        v-model="form.iva"
        :options="optionsIva"
        :state="form.iva >= 0"
        @change="calculaMontoNeto"
      ></b-form-select>
    </b-col> -->
    <!-- <b-col cols="3" class="text-center">
      <b-input-group size="md" prepend="$">
        <b-form-input
          type="number"
          @wheel="$event.target.blur()"
          readonly
          v-model="form.montoNeto"
          placeholder="Total"
          oninput="javascript:value=this.value.replace('e','')"
        >
        </b-form-input>
      </b-input-group>
    </b-col> -->

    <div class="text-center col-lg-6 col-xs-12">
      <div class="text-center mt-1 col-xs-12">
        <!-- <b-col cols="6" class="text-center mt-1 col-xs-12"> -->
        <label><h4>Modalidad</h4></label>
        <!-- </b-col> -->
      </div>
      <b-form-group label="" v-slot="{ ariaDescribedby }">
        <b-form-radio-group
          id="btn-radios-2"
          v-model="form.modalidad"
          :options="optionsModalidad"
          :aria-describedby="ariaDescribedby"
          button-variant="primary"
          size="lg"
          name="radio-btn-outline"
          buttons
          class="mt-1 d-block"
          aria-required="true"
          @change="modalidadReplica()"
        ></b-form-radio-group>
      </b-form-group>
    </div>
    <div class="text-center col-lg-6 col-xs-12">
      <div class="text-center mt-1 col-xs-12">
        <!-- <b-col cols="6" class="text-center mt-1 col-xs-12"> -->
        <label><h4>Envío de pago a:</h4></label>
        <!-- </b-col> -->
      </div>
      <multiselect
        v-model="form.seleccionAmigo"
        tag-placeholder="Agregar nuevo"
        placeholder="Selecciona un amigo"
        label="name"
        track-by="code"
        :options="optionsAmigo"
        :multiple="true"
        :taggable="true"
        @tag="addTagAmigo"
        class="h2"
        aria-required="true"
      ></multiselect>
    </div>

    <!-- <b-col cols="6" class="text-center mt-3">
      <label><h4 class="">Modalidad</h4></label>
    </b-col> -->
    <!-- <b-col cols="6" class="text-center mt-3">
      <label><h4 class="">Envío de pago a:</h4></label>
    </b-col> -->
    <!--Texto original: ¿A quién se le solicita el pago?-->

    <!-- <b-col cols="6" class="text-center">
      <b-form-group label="" v-slot="{ ariaDescribedby }">
        <b-form-radio-group
          id="btn-radios-2"
          v-model="form.modalidad"
          :options="optionsModalidad"
          :aria-describedby="ariaDescribedby"
          button-variant="primary"
          size="lg"
          name="radio-btn-outline"
          buttons
          class="mt-1 d-block"
          aria-required="true"
          @change="modalidadReplica()"
        ></b-form-radio-group>
      </b-form-group>
    </b-col> -->
    <!-- <b-col cols="6" class="text-center mt-2">
      <multiselect
        v-model="form.seleccionAmigo"
        tag-placeholder="Agregar nuevo"
        placeholder="Selecciona un amigo"
        label="name"
        track-by="code"
        :options="optionsAmigo"
        :multiple="true"
        :taggable="true"
        @tag="addTagAmigo"
        class="h2"
        aria-required="true"
      ></multiselect>
    </b-col> -->

    <b-col cols="12" class="text-center mt-2">
      <label><h4 class="">Total Enviado</h4></label>
    </b-col>
    <b-col cols="12" class="text-center">
      <!-- <b-table-simple responsive small caption-top stacked>
        <b-tfoot>
          <b-tr>
            <b-td colspan="7" variant="secondary" class="text-right">
              Total Rows: <b>5</b>
            </b-td>
          </b-tr>
        </b-tfoot>
      </b-table-simple> -->

      <b-table
        sticky-header="200px"
        responsive
        striped
        hover
        :items="items"
      ></b-table>
    </b-col>

    <!-- TERMINAN INPUT  4 -->
  </b-row>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import Multiselect from "vue-multiselect";
import { mapState } from "vuex";

export default {
  data() {
    return {
      form: {
        concepto: "",
        comentario: "",
        empresaPropia: null,
        empresaExterna: null,
        monto: "",
        iva: 0,
        montoNeto: "",
        modalidad: null,
        cuentaBancaria: null,
        seleccionCuentasEmpresaPropia: [],
        seleccionCuentasEmpresaExterna: [],
        seleccionCuentasCedidas: [],
        seleccionAmigo: [],
      },
      fechaDePago: "",
      moneda: 0,
      proyecto: null,

      optionsMoneda: [
        { value: 0, text: "Pesos" },
        { value: 1, text: "Dolares" },
        { value: 3, text: "Euros" },
      ],
      optionsIva: [
        { value: 0, text: "0%" },
        { value: 8, text: "8%" },
        { value: 16, text: "16%" },
      ],
      optionsModalidad: [
        { text: "Unico", value: 1 },
        { text: "Replica", value: 2 },
        { text: "Dividir", value: 3 },
      ],
      tags: ["apple", "orange"],
      items: [
        {
          Usuario: "Dickerson",
          Porcentaje: "Macdonald",
          Monto_Bruto: 40,
          Iva: "100",
          Monto_Total: "1000",
        },
        {
          Usuario: "Larsen",
          Porcentaje: "Shaw",
          Monto_Bruto: 21,
          Iva: "100",
          Monto_Total: "1000",
        },
        {
          Usuario: "Geneva",
          Porcentaje: "Wilson",
          Monto_Bruto: 89,
          Iva: "100",
          Monto_Total: "1000",
        },
        {
          Usuario: "Jami",
          Porcentaje: "Carney",
          Monto_Bruto: 38,
          Iva: "100",
          Monto_Total: "1000",
        },
        {
          Usuario: "Jami",
          Porcentaje: "Carney",
          Monto_Bruto: 38,
          Iva: "100",
          Monto_Total: "1000",
        },
        {
          Usuario: "Jami",
          Porcentaje: "Carney",
          Monto_Bruto: 38,
          Iva: "100",
          Monto_Total: "1000",
        },
        {
          Usuario: "Jami",
          Porcentaje: "Carney",
          Monto_Bruto: 38,
          Iva: "100",
          Monto_Total: "1000",
        },
        {
          Usuario: "Jami",
          Porcentaje: "Carney",
          Monto_Bruto: 38,
          Iva: "100",
          Monto_Total: "1000",
        },
        {
          Usuario: "Jami",
          Porcentaje: "Carney",
          Monto_Bruto: 38,
          Iva: "100",
          Monto_Total: "1000",
        },
      ], //item de tabla
      filter: null,
      filterOn: [],
      optionsEmpresaPropia: [
        { text: null, text: "Selecciona una empresa", disabled: true },
        { text: "EmpresaP 1", value: 0 },
        { text: "EmpresaP 2", value: 1 },
        { text: "EmpresaP 3", value: 2 },
      ],
      optionsEmpresaExterna: [
        { text: null, text: "Selecciona una empresa", disabled: true },
        { text: "EmpresaE 1", value: 0 },
        { text: "EmpresaE 2", value: 1 },
        { text: "EmpresaE 3", value: 2 },
      ],
      // value: [{ name: "Javascript", code: "js" }],

      optionsCuentasEmpresaPropia: [
        { name: "Vue.js", code: "vu" },
        { name: "Javascript", code: "js" },
        { name: "Open Source", code: "os" },
        { name: "Option Extra", code: "op" },
      ],

      optionsCuentasEmpresaExterna: [
        { name: "Vue.js", code: "vu" },
        { name: "Javascript", code: "js" },
        { name: "Open Source", code: "os" },
        { name: "Option Extra", code: "op" },
      ],

      optionsCuentasCedidas: [
        { name: "Vue.js", code: "vu" },
        { name: "Javascript", code: "js" },
        { name: "Open Source", code: "os" },
        { name: "Option Extra", code: "op" },
      ],

      optionsAmigo: [
        { name: "Vue.js", code: "vu" },
        { name: "Javascript", code: "js" },
        { name: "Open Source", code: "os" },
        { name: "Option Extra", code: "op" },
      ],
      optionsProyecto: [
        { value: null, text: "Selecciona un proyecto" },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Selected Option" },
        { value: "d", text: "This one is disabled", disabled: true },
      ],
    };
  },

  methods: {
    addTagEP(newTag) {
      //addTagEmpresaPropia
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      };
      this.optionsCuentasEmpresaPropia.push(tag);
      this.form.seleccionCuentasEmpresaPropia.push(tag);
    },
    addTagEE(newTag) {
      //addTagEmpresaExterna
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      };
      this.optionsCuentasEmpresaExterna.push(tag);
      this.form.seleccionCuentasEmpresaExterna.push(tag);
    },
    addTagCe(newTag) {
      //addTagCedida
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      };
      this.optionsCuentasCedidas.push(tag);
      this.form.seleccionCuentasCedidas.push(tag);
    },
    addTagAmigo(newTag) {
      //addTagCedida
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      };
      this.optionsAmigo.push(tag);
      this.form.seleccionAmigo.push(tag);
    },
    formularioIncompleto() {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Formulario incompleto",
        showConfirmButton: false,
        timer: 1000,
      });
    },
    calculaMontoNeto() {
      let montoInicial = this.form.monto;
      let ivaSelec = this.form.iva;
      let montoTotalNeto = (montoInicial * (ivaSelec / 100 + 1)).toFixed(2);
      this.form.montoNeto = montoTotalNeto;
    },
  },
  components: {
    Multiselect,
  },
  validations: {
    form: {
      concepto: { required, minLength: minLength(7) },
      comentario: { required, minLength: minLength(7) },
      monto: { required },
      iva: { required },
      seleccionAmigo: { required },
      modalidad: { required },
    },
  },
  computed: {
    ...mapState(["darkMode"]),
  },
};
</script>

<style>
</style>
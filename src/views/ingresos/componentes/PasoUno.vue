<template>
  <div>
    <!-- Progress bar dentro del paso uno -->
    <b-row>
      <b-col cols="1"></b-col>
      <b-col cols="10" class="text-center">
        <b-progress :max="max" height="1.5rem">
          <b-progress-bar :value="value" variant="success">
            <span>
              <strong>PASO {{ value.toFixed(2) / 50 }}</strong>
            </span>
          </b-progress-bar>
        </b-progress>
        <!-- Texto titulo -->
        <h5 class="mt-3 mb-3">
          {{ tituloModal }}
        </h5>
      </b-col>
      <b-col cols="1"></b-col>
    </b-row>
    <!-- Primer paso value = 50 -->
    <b-row v-if="value == 50">
      <b-col cols="1"> </b-col>
      <!-- <b-col cols="5" class="text-center"> -->
      <div class="text-center col-lg-4 col-xs-12">
        <center class="mb-2 mt-2">
          <span>
            Concepto
          </span>
        </center>
        <b-input-group size="md">
          <b-form-input
            rows="2"
            v-model="form.concepto"
            placeholder="Concepto del Pago"
            :state="form.concepto.length >= 4"
          ></b-form-input>
          <b-input-group-append>
            <b-button
              variant="info"
              v-b-tooltip.hover
              title="El concepto debe de contener al menos 4 caracteres"
              ><b-icon icon="question-circle" aria-hidden="true"></b-icon
            ></b-button>
          </b-input-group-append>
        </b-input-group>
        <center class="mt-1 mb-1">
          <span>
            Descripción
          </span>
        </center>
        <b-input-group size="md" class="mt-2">
          <!--Comentarios y/o descripción -->
          <!-- <b-input-group-prepend is-text>
          Descripción
        </b-input-group-prepend> -->
          <b-form-textarea
            id="textarea-rows"
            placeholder="Comentarios"
            rows="2"
            v-model="form.comentario"
            :state="form.comentario.length >= 7"
          ></b-form-textarea>
          <b-input-group-append>
            <b-button
              variant="info"
              v-b-tooltip.hover
              title="La descripción o comentario debe de contener al menos 4 caracteres"
              ><b-icon icon="question-circle" aria-hidden="true"></b-icon
            ></b-button>
          </b-input-group-append>
        </b-input-group>
        <!-- Campo para ceder el pago -->
        <b-input-group size="md" class="text-center mt-2">
          <center class="mt-1 mb-2">
            <span>
              ¿Deseas ceder el pago a alguien más?
            </span>
            <b-button-group size="sm">
              <b-button
                variant="info"
                v-b-tooltip.hover
                title="¿Estas ayudando a realizar la transacción a alguien más ? Inicia la solictud con la información que tengas y cedele la propiedad para que esta persona tenga control y pueda concluir con el proceso"
                ><b-icon icon="question-circle" aria-hidden="true"></b-icon
              ></b-button>
            </b-button-group>
            <!-- <CSwitch
              v-b-tooltip.hover
              title="¿Estas ayudando a solicitar un pago de alguien más ? Cedele la transacción llenando todos los campos"
              color="success"
              labelOn="Si"
              labelOff="No"
              shape="pill"
              size="sm"
              class="ml-2 mt-1"
              @update:checked="val => OpCederFunct(val)"
            /> -->
            <b-form-group v-slot="{ ariaDescribedby }" class="mt-1">
              <!-- HabilitaDatos1 === -->
              <b-form-radio-group
                :disabled="false"
                id="btn-radios-2"
                v-model="form.Ceder"
                :options="optionsCeder"
                :aria-describedby="ariaDescribedby"
                button-variant="outline-success"
                size="sm"
                name="radio-btn-outline"
                buttons
                class="d-block"
                aria-required="true"
                @input="resetAccount"
              ></b-form-radio-group>
            </b-form-group>
          </center>
        </b-input-group>
      </div>

      <!-- </b-col> -->
      <!-- <b-col cols="6" v-if="form.Ceder === false"> -->
      <div class="text-center col-lg-6 col-xs-12" v-if="form.Ceder === false">
        <center class="mb-2 mt-2">
          <span>
            Selecciona una empresa y cuenta
          </span>
        </center>
        <b-card>
          <b-tabs content-class="mt-1">
            <!-- Uno -->
            <b-tab title="Empresa Propia" active>
              <b-row>
                <b-col cols="6" class="text-center">
                  <!-- dos -->
                  <b-form-select
                    class="mb-2 mt-2"
                    v-model="form.empresaPropia"
                    :options="optionsEmpresaPropia"
                    text-field="nombre"
                    :style="darkMode ? 'background-color:#393a42' : null"
                    @input="getCuentas()"
                    ><b-form-select-option value="null" disabled
                      >Selecciona una empresa</b-form-select-option
                    ></b-form-select
                  >
                  <b-button
                    block
                    variant="info"
                    v-b-tooltip.click
                    title="Selecciona una empresa de la cual eres propietario"
                    ><b-icon icon="question-circle" aria-hidden="true"></b-icon
                  ></b-button>
                  <b-link href="empresas">Agregar nueva empresa</b-link>
                </b-col>
                <b-col cols="6" class="text-center">
                  <!-- <b-input-group size="md" class="mt-2"> -->
                  <!-- <b-button block variant="info">Agregar nueva cuenta</b-button> -->
                  <b-form-select
                    class="mb-2 mt-2"
                    v-model="temporalCuenta"
                    :options="optionsCuentasEmpresaPropia"
                    text-field="nombre2"
                    :style="darkMode ? 'background-color:#393a42' : null"
                    @change="getTipoMoneda()"
                    ><b-form-select-option value="null" disabled
                      >Selecciona una cuenta</b-form-select-option
                    ></b-form-select
                  >
                  <b-button
                    block
                    variant="info"
                    v-b-tooltip.click
                    title="Selecciona una cuenta relacionada a la empresa seleccionada"
                    ><b-icon icon="question-circle" aria-hidden="true"></b-icon
                  ></b-button>
                  <b-link href="cuentas_bancarias">Agregar nueva cuenta</b-link>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab title="Empresa Externa">
              <b-row>
                <b-col cols="6" class="text-center">
                  <b-form-select
                    v-model="form.empresaPropia"
                    :options="this.$store.getters.getEmpresasExternas"
                    aria-required="true"
                    text-field="nombre"
                    :style="darkMode ? 'background-color:#393a42' : null"
                    v-b-tooltip.hover
                    @input="getCuentas()"

                    title="Selecciona una empresa externa"
                  ></b-form-select>
                </b-col>
                <b-col cols="6" class="text-center">
                  <b-form-select
                    v-model="form.empresaExterna"
                    :options="optionsEmpresaExterna"
                    aria-required="true"
                    text-field="nombre"
                    :style="darkMode ? 'background-color:#393a42' : null"
                    v-b-tooltip.hover
                    title="Selecciona una cuenta relacionada a la empresa seleccionada"
                  ></b-form-select>
                </b-col>
              </b-row>
            </b-tab>
          </b-tabs>
        </b-card>
        <!-- </b-col> -->
      </div>

      <!-- <b-col cols="6 mt-2" v-if="form.Ceder"> -->
      <div class="text-center col-lg-6 col-xs-12" v-if="form.Ceder">
        <center class="mb-2">
          <span>
            ¿ A quien cedes el pago ?
          </span>
        </center>
        <b-card>
          <b-tabs content-class="mt-2">
            <b-tab title="Selecciona un usuario ó agrega un e-mail">
              <b-row>
                <b-col cols="12" class="text-center">
                  <multiselect
                    v-model="form.seleccionCuentasCedidas"
                    :options="usuarios"
                    :multiple="false"
                    :close-on-select="true"
                    :clear-on-select="false"
                    :preserve-search="true"
                    placeholder="Selecciona los usuario(s) / escribe un email"
                    tag-placeholder="Agregar nuevo"
                    label="nombre"
                    track-by="id"
                    aria-required="true"
                    :allow-empty="true"
                    :taggable="true"
                    @tag="emailCederTag"
                  ></multiselect>
                </b-col>
              </b-row>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
      <!-- </b-col> -->
      <b-col cols="1"> </b-col>
    </b-row>

    <b-row v-if="value == 50">
      <b-col cols="1"> </b-col>
      <!-- <b-col cols="3" class="text-center"> -->
      <div class="text-center col-lg-3 col-xs-12">
        <center class="mb-2">
          <span>
            Monto
          </span>
        </center>
        <b-input-group size="md" prepend="$">
          <b-form-input
            :disabled="form.concepto.length < 4 || form.comentario.length < 6"
            v-model="form.monto"
            :min="0"
            type="number"
            @change="calculaMontoNeto"
            v-on:keyup.prevent="calculaMontoNeto"
            :class="{
              'is-valid': this.form.monto > 0,
              'is-invalid': this.form.monto <= 0
            }"
            oninput="javascript:value=this.value.replace('e','');
                   if(this.value.length>=20)this.value=this.value.substr(0,15);"
          ></b-form-input>
          <b-input-group-append>
            <b-button
              variant="info"
              v-b-tooltip.hover
              title="Monto neto antes de IVA"
              ><b-icon icon="question-circle" aria-hidden="true"></b-icon
            ></b-button>
          </b-input-group-append>
        </b-input-group>
      </div>
      <!-- </b-col> -->

      <!-- <b-col cols="2" class="text-center"> -->
      <div class="text-center col-lg-2 col-xs-12">
        <center class="mb-2">
          <span>
            Moneda
          </span>
        </center>
        <b-input-group size="md" v-if="form.Ceder == false">
          <b-form-input readonly v-model="moneda" disabled> </b-form-input>
          <b-input-group-append>
            <b-button
              variant="info"
              v-b-tooltip.hover
              title="El tipo de moneda esta ligado a las cuentas bancarias que registraste anteriormente, si deseas dar de alta una nueva cuenta da click aqui"
              ><b-icon icon="question-circle" aria-hidden="true"></b-icon
            ></b-button>
          </b-input-group-append>
        </b-input-group>
        <b-input-group size="md" v-if="form.Ceder">
          <b-form-select v-model="moneda">
            <b-form-select-option
              v-for="item in monedas"
              :key="item.id"
              :value="item.moneda"
              :label="item.moneda"
            />
          </b-form-select>
          <b-input-group-append>
            <b-button
              variant="info"
              v-b-tooltip.hover
              title="Si estas cediendo el pago, selecciona el tipo de moneda que deseas"
              ><b-icon icon="question-circle" aria-hidden="true"></b-icon
            ></b-button>
          </b-input-group-append>
        </b-input-group>
      </div>
      <!-- </b-col> -->

      <div class="text-center col-lg-2 col-xs-12">
        <!-- <b-col cols="2" class="text-center"> -->
        <center class="mb-2">
          <span>
            IVA
          </span>
        </center>
        <b-input-group size="md">
          <b-form-select
            :disabled="form.concepto.length < 4 || form.comentario.length < 6"
            v-model="form.iva"
            :options="optionsIva"
            @change="calculaMontoNeto"
            :style="darkMode ? 'background-color:#393a42' : null"
          ></b-form-select>
          <b-input-group-append>
            <b-button
              variant="info"
              v-b-tooltip.hover
              title="Selecciona si tu transacción incluye IVA para solicitar tu comprabante fiscal y llevar un mejor control de tus finanzas"
              ><b-icon icon="question-circle" aria-hidden="true"></b-icon
            ></b-button>
          </b-input-group-append>
        </b-input-group>
      </div>
      <!-- </b-col> -->

      <div class="text-center col-lg-3 col-xs-12">
        <!-- <b-col cols="3" class="text-center"> -->
        <center class="mb-2">
          <span>
            Monto Neto
          </span>
        </center>
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
          <b-input-group-append>
            <b-button
              variant="info"
              v-b-tooltip.hover
              title="El monto neto es despues de aplicar el IVA"
              ><b-icon icon="question-circle" aria-hidden="true"></b-icon
            ></b-button>
          </b-input-group-append>
        </b-input-group>
      </div>
      <!-- </b-col> -->
      <b-col cols="1"> </b-col>
    </b-row>

    <b-row v-if="value == 50">
      <b-col cols="1"> </b-col>

      <!-- <b-col cols="3"> -->
      <div class="text-center col-lg-3 col-xs-6">
        <center class="mb-2 mt-3">
          <b-form-checkbox
            :disabled="form.concepto.length < 4 || form.comentario.length < 6"
            id="checkbox-1"
            v-model="mostrarPrestamo"
            name="checkbox-1"
            size="md"
            @change="checkPrestamo"
          >
            ¿Es un prestamo?
            <b-button-group size="sm">
              <b-button
                class=""
                variant="info"
                v-b-tooltip.hover
                title="Si estas solicitado un préstamo haz check aqui para crear una transacción en automático de tus cuentas por pagar"
                ><b-icon icon="question-circle" aria-hidden="true"></b-icon
              ></b-button>
            </b-button-group>
          </b-form-checkbox>
        </center>
        <center class="mt-2">
          <b-dropdown variant="warning" :disabled="mostrarPrestamo == false">
            <template #button-content>
              Datos del Prestamo
            </template>
            <b-dropdown-item-button @click="estatusPrestamo(1)">
              <b-icon icon="check2-square" aria-hidden="true"></b-icon>
              {{ textPrestamo }}
            </b-dropdown-item-button>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item-button
              variant="danger"
              @click="estatusPrestamo(0)"
            >
              <b-icon icon="x-square" aria-hidden="true"></b-icon>
              Eliminar datos
            </b-dropdown-item-button>
          </b-dropdown>
        </center>
      </div>
      <!-- </b-col> -->

      <!-- <b-col cols="3" class="text-center"> -->
      <div class="text-center col-lg-3 col-xs-6">
        <center class="mb-2 mt-3">
          <span>
            Selecciona una modalidad
          </span>
          <b-button-group size="sm">
            <b-button
              variant="info"
              v-b-tooltip.hover
              title="Unico: Pago a una sola persona, Replica: El mismo pago a varias personas, Dividir: Divide el monto total entre las personas seleccionadas"
              ><b-icon icon="question-circle" aria-hidden="true"></b-icon
            ></b-button>
          </b-button-group>
        </center>
        <b-form-group v-slot="{ ariaDescribedby }">
          <!-- HabilitaDatos1 === -->
          <b-form-radio-group
            :disabled="form.concepto.length < 4 || form.comentario.length < 6"
            id="btn-radios-2"
            v-model="form.modalidad"
            :options="optionsModalidad"
            :aria-describedby="ariaDescribedby"
            button-variant="outline-info"
            size="md"
            name="radio-btn-outline"
            buttons
            class="d-block"
            aria-required="true"
          ></b-form-radio-group>
        </b-form-group>
      </div>
      <!-- </b-col> -->

      <!-- <b-col cols="4" class="text-center"> -->
      <div class="text-center col-lg-4 col-xs-12">
        <center class="mb-2 mt-3">
          <span>
            Usuario(s) a quien le solicito el pago
          </span>
          <b-button-group size="sm">
            <b-button
              class=""
              variant="info"
              v-b-tooltip.hover
              title="Usuarios a los que le estas solicitando el pago"
              ><b-icon icon="question-circle" aria-hidden="true"></b-icon
            ></b-button>
          </b-button-group>
        </center>
        <!-- HabilitaDatos1 ===  -->
        <multiselect
          :disabled="form.concepto.length < 4 || form.comentario.length < 6"
          v-model="form.seleccionAmigo"
          :options="usuarios"
          :multiple="!isDisable"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          placeholder="Selecciona los usuarios / agrega email"
          tag-placeholder="Agregar nuevo"
          label="nombre"
          track-by="id"
          aria-required="true"
          :allow-empty="false"
          :taggable="true"
          @tag="addTagAmigo2"
          :limit="3"
        >
        </multiselect>
      </div>
      <!-- </b-col> -->
      <b-col cols="1"> </b-col>
    </b-row>

    <b-row class="mt-2" v-if="value == 50">
      <b-col cols="1"> </b-col>
      <b-col cols="10" class="text-center">
        <center class="mb-2 mt-2">
          <h5>
            Total Solicitado
          </h5>
        </center>
        <b-table responsive :items="items" :fields="fields">
          <template #cell(bruto)="data">
            <span v-if="form.iva == 0">${{ data.item.monto }}</span>
            <span v-else>
              ${{ ((form.monto / 100) * data.item.range).toFixed(2) }}
            </span>
          </template>
          <template #cell(iva)="data">
            <span v-if="form.iva == 0">$0</span>
            <span v-else>
              ${{
                (
                  (((form.monto / 100) * form.iva) / 100) *
                  data.item.range
                ).toFixed(2)
              }}
            </span>
          </template>
          <template #cell(monto)="data">
            <!-- <span>$ {{data.item.monto}}</span> Este es si quieres dejar el monto estatico -->
            <!-- Este es si se quiere cambiar el monto desde el input -->
            <b-input-group size="md" prepend="$">
              <b-input
                type="number"
                min="0"
                :max="form.monto"
                :disabled="
                  form.modalidad == 1 ||
                    form.modalidad == 2 ||
                    items.length == 1
                "
                v-if="items[data.index]"
                oninput="javascript:value=this.value.replace('e',''); if(this.value.length>=20);"
                @input="validamontototal(data.item.monto, data.index)"
                v-model="items[data.index].monto"
              ></b-input>
            </b-input-group>
          </template>
          <template #cell(name)="data">
            <b class="text-info"> {{ data.item.name }} </b>
          </template>
          <template #cell(porcentaje)="data">
            <span>{{ Math.trunc(data.item.range) }} %</span>
          </template>
        </b-table>
        <b-alert :show="mensaje" variant="info"
          ><h5 class="text-dark">{{ this.mensajeok }}</h5></b-alert
        >
        <b-alert :show="!mensaje" variant="danger">
          <h5 class="text-dark">
            {{ mensajealert }} {{ this.diferencia }}
            <b-button @click="calculaporcentaje" variant="info"
              ><span class="ti-loop"></span> Original
            </b-button>
          </h5></b-alert
        >
      </b-col>
    </b-row>
    <!-- Opcion para compartir el pago con uno o mas usuarios -->
    <b-row v-if="value == 100 && form.Ceder == false">
      <b-col cols="3"> </b-col>
      <!-- <b-col cols="6"> -->
      <div class="text-center col-lg-6 col-xs-12">
        <center>
          <span>
            ¿Deseas compartir el pago?
          </span>
          <b-form-group v-slot="{ ariaDescribedby }" class="mt-1">
            <b-form-radio-group
              v-b-tooltip.hover
              title="Comparte tu ingreso para que otros los puedan ver, editar o eliminar"
              :disabled="false"
              id="btn-radios-2"
              v-model="form.compartir"
              :options="optionsCeder"
              :aria-describedby="ariaDescribedby"
              button-variant="outline-success"
              size="sm"
              name="radio-btn-outline"
              buttons
              class="d-block"
              aria-required="true"
            ></b-form-radio-group>
          </b-form-group>
        </center>
        <!-- </b-col> -->
      </div>
      <b-col cols="3"> </b-col>
    </b-row>

    <b-row v-if="value == 100 && form.Ceder == false">
      <b-col cols="1"> </b-col>
      <!-- <b-col cols="12 mt-1" v-if="form.compartir"> -->
      <div class="col-lg-10 col-xs-12" v-if="form.compartir">
        <b-card>
          <b-tabs content-class="mt-1">
            <b-tab title="Compartir Pago">
              <b-row>
                <!-- <b-col cols="6" class="text-center mt-2"> -->
                <div class="text-center col-lg-6 col-xs-12">
                  <multiselect
                    :limit="4"
                    v-model="form.permisosUsuario"
                    :options="usuarios"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    placeholder="Selecciona los usuario(s) / agrega un email"
                    tag-placeholder="Agregar nuevo"
                    label="nombre"
                    track-by="id"
                    aria-required="true"
                    :allow-empty="true"
                    :taggable="true"
                    @tag="emailCompartirPago"
                  ></multiselect>
                  <!-- </b-col> -->
                </div>

                <!-- <b-col cols="6" class="text-center mt-1"> -->
                <div class="text-center col-lg-6 col-xs-12">
                  <label>Permisos de los usuarios seleccionados</label>
                  <b-form-checkbox-group
                    v-model="form.permisosSeleccionados"
                    :options="permisosOptions"
                    class="mb-3"
                    value-field="item"
                    text-field="name"
                    disabled-field="notEnabled"
                  ></b-form-checkbox-group>
                </div>

                <!-- </b-col> -->
              </b-row>
            </b-tab>
          </b-tabs>
        </b-card>
        <!-- </b-col> -->
      </div>
      <b-col cols="1" class="text-center"> </b-col>
    </b-row>

    <b-row v-if="value == 100 && form.Ceder == false" class="">
      <b-col cols="1"></b-col>
      <!-- <b-col cols="5" class="text-center"> -->
      <div class="text-center col-lg-5 col-xs-12">
        <center class="mb-2 mt-2">
          <span>
            Etiqueta tu ingreso
          </span>
          <b-button-group size="sm">
            <b-button
              variant="info"
              v-b-tooltip.hover
              title="Etiqueta tu ingreso para obtener mejores filtros en tus búsquedas"
              ><b-icon icon="question-circle" aria-hidden="true"></b-icon
            ></b-button>
          </b-button-group>
        </center>
        <b-form-tags
          input-id="tags-pills"
          v-model="optionsTagIngreso"
          tag-variant="primary"
          tag-pills
          size="md"
          separator=" "
          placeholder="Presiona enter para agregar"
        ></b-form-tags>
        <!-- </b-col> -->
      </div>

      <!-- <b-col cols="5" class="text-center"> -->
      <div class="text-center col-lg-5 col-xs-12">
        <!-- <label
          ><span>
          </span></label
        > -->
        <center class="mb-2 mt-2">
          <span>
            Proyecto(s) al que se destina el pago
          </span>
          <b-button-group size="sm">
            <b-button
              variant="info"
              v-b-tooltip.hover
              title="Asigna este ingreso a un proyecto que tengas: Ejemplo (Gastos Personales, Remodelación casa)"
              ><b-icon icon="question-circle" aria-hidden="true"></b-icon
            ></b-button>
          </b-button-group>
        </center>
        <multiselect
          :limit="3"
          v-model="form.proyecto"
          :options="optionsProjects"
          :multiple="true"
          :close-on-select="true"
          :clear-on-select="false"
          :preserve-search="true"
          placeholder="Selecciona un proyecto"
          tag-placeholder="Agregar nuevo"
          label="nombre"
          track-by="value"
          aria-required="true"
          :allow-empty="true"
          :taggable="true"
        ></multiselect>
      </div>
      <!-- </b-col> -->
      <b-col cols="1"></b-col>
    </b-row>

    <b-row v-if="value == 100" class="mb-3">
      <b-col cols="1" class="text-center"></b-col>
      <!-- <b-col cols="5" class="text-center mt-3"> -->
      <div class="text-center col-lg-5 col-xs-12 mt-3">
        <!-- <label><span>Links de pago</span></label> -->
        <center class="mb-2">
          <span>
            Links de pago
          </span>
          <b-button-group size="sm">
            <b-button
              variant="info"
              v-b-tooltip.hover
              title="Agrega un link de alguna pasarela de pagos Ejemplos: (PayPal, Conekta, Mercado Pago)"
              ><b-icon icon="question-circle" aria-hidden="true"></b-icon
            ></b-button>
          </b-button-group>
        </center>
        <b-input-group>
          <b-form-input
            id="input-live"
            v-model="link"
            v-on:keyup.enter="addlink"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Ingresa link de pago"
            trim
            key
          ></b-form-input>
          <b-input-group-append>
            <b-button variant="info" @click.prevent="addlink()">
              <b-icon icon="plus-square" aria-hidden="true"> </b-icon>
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </div>
      <div
        class="text-center mt-3 col-lg-5 col-xs-12"
        v-if="form.isrecurrente == false"
      >
        <center class="mb-2">
          <span>
            Fecha límite de pago
          </span>
          <b-button-group size="sm">
            <b-button
              variant="info"
              v-b-tooltip.hover
              title="Añade una fecha límite en la que te deben de realizar el pago"
              ><b-icon icon="question-circle" aria-hidden="true"></b-icon
            ></b-button>
          </b-button-group>
        </center>
        <b-form-datepicker
          id="datepicker-full-width"
          menu-class="w-100"
          calendar-width="100%"
          locale="es-MX"
          class="mb-2"
          :min="minimoInicio"
          v-model="fechaLimite"
          :style="darkMode ? 'background-color:#393a42' : null"
        ></b-form-datepicker>
      </div>
      <b-col cols="1"></b-col>
    </b-row>
    <!-- Tabla con links de pagos -->
    <b-row class="mt-3 mb-1" v-if="value == 100">
      <b-col cols="1"></b-col>
      <!-- <b-col cols="10"> -->
      <div class="text-center col-lg-10 col-xs-12">
        <b-table
          v-if="this.form.links.length > 0"
          :items="form.links"
          :fields="fieldsLinks"
          striped
          responsive
          :sticky-header="true"
          :no-border-collapse="true"
        >
          <template #cell(link)="data">
            <b-link :href="data.item.link" target="_blank">{{
              data.item.link
            }}</b-link>
          </template>
          <template #cell(accion)="data">
            <b-button
              variant="outline-danger"
              @click.prevent="eliminalink(data.item, data.index)"
              >{{ data.item.accion }}</b-button
            >
          </template>
        </b-table>
        <!-- </b-col> -->
      </div>
      <b-col cols="1"></b-col>
    </b-row>
    <!-- Recurrencia en los pagos -->
    <b-row class="mb-2" v-if="value == 100">
      <b-col cols="3"></b-col>
      <!-- <b-col cols="3"> -->
      <div class="text-center col-lg-3 col-xs-12">
        <b-form-group>
          <b-form-checkbox
            v-if="mostrarPrestamo == false"
            id="checkbox-1"
            v-model="status"
            name="checkbox-1"
            @change="resetitems"
            value="Si, es pago recurrente"
            unchecked-value="No, es pago único"
            size="md"
          >
            Hacer recurrente el pago
            <b-button-group size="sm">
              <b-button
                variant="info"
                v-b-tooltip.hover
                title="Al hacer recurrente un pago se hará una solicitud en automático en las fechas que establescas"
                ><b-icon icon="question-circle" aria-hidden="true"></b-icon
              ></b-button>
            </b-button-group>
          </b-form-checkbox>
        </b-form-group>
      </div>

      <!-- </b-col> -->
      <!-- <b-col cols="3"> -->
      <div class="text-center col-lg-3 col-xs-12">
        <b-form-group>
          <!-- Check para hacer el monto variable  v-model="form.pagoVariable" value="accepted"
            unchecked-value="No"-->
          <b-form-checkbox
            v-if="mostrarPrestamo == false"
            v-model="variable"
            id="checkbox-2"
            name="checkbox-1"
            size="md"
            :disabled="form.isrecurrente == false"
          >
            Monto Variable
            <b-button-group size="sm">
              <b-button
                :disabled="form.isrecurrente == false"
                variant="info"
                v-b-tooltip.hover
                title="Al seleccionar monto variable se creará la solictud recurrente y te recordaremos para que actualices el monto de la fecha en curso"
                ><b-icon icon="question-circle" aria-hidden="true"></b-icon
              ></b-button>
            </b-button-group>
          </b-form-checkbox>
        </b-form-group>
      </div>
      <!-- </b-col> -->
      <b-col cols="3"></b-col>
    </b-row>

    <!-- Calendario para ver los pagos RECURRENTES -->
    <b-row v-if="value == 100 && mostrarPrestamo == false">
      <b-col cols="1"></b-col>
      <!-- <b-col cols="10" v-if="form.isrecurrente"> -->
      <div class="text-center col-lg-10 col-xs-12" v-if="form.isrecurrente">
        <b-card>
          <b-row>
            <b-col>
              <b-form-radio-group
                v-model="form.selectedTipoRecurrecia"
                :options="optionsRecurrencia"
                class="text-center mb-3"
                value-field="value"
                text-field="name"
                disabled-field="notEnabled"
                @change="calculapagos"
              ></b-form-radio-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="6" class="text-center mt-3">
              <label><h4>Iniciar Recurrencia</h4></label>
            </b-col>
            <b-col cols="6" class="text-center mt-3">
              <label><h4>Terminar Recurrencia</h4></label>
            </b-col>
            <b-col cols="6">
              <b-form-datepicker
                id="datepicker-sm 2"
                size="sm"
                locale="es-MX"
                class="mb-2"
                :min="minimoInicio"
                v-model="form.fechaInicio"
                @input="cambiafechainicial"
                :style="darkMode ? 'background-color:#393a42' : null"
              ></b-form-datepicker>
            </b-col>
            <b-col cols="6">
              <b-form-datepicker
                id="datepicker-sm 1"
                size="sm"
                locale="es-MX"
                class="mb-2"
                v-model="form.fechaFin"
                :min="minimofinish"
                :style="darkMode ? 'background-color:#393a42' : null"
                @input="cambiafecha"
              ></b-form-datepicker>
            </b-col>
          </b-row>
          <b-col
            cols="12"
            v-if="form.selectedTipoRecurrecia == 5"
            class="mt-2 text-center"
          >
            <label class=" w-100">
              <h4 class="">Días que se quieren fijar</h4>
            </label>
            <Calendar
              :step="0"
              :min-date="dayCalendar()"
              :attributes="attributes"
              @dayclick="onDayClick"
              class="w-100"
              style=""
            />
          </b-col>
          <b-col cols="12" class="mt-1">
            <label class="d-block ">
              <h4
                class=" text-center"
                style="padding-top: 10px; padding-bottom: 10px"
              >
                Cantidad de Pagos <strong>{{ total }}</strong>
              </h4>
            </label>
            <b-row>
              <b-col cols="12">
                <b-table
                  responsive
                  :current-page="currentPage"
                  :per-page="filasmostradas"
                  striped
                  hover
                  sticky-header
                  :items="itemsRec"
                  :fields="fieldsRec"
                >
                  <!-- <b-row> </b-row> -->
                </b-table>
                <b-pagination
                  v-model="currentPage"
                  :total-rows="itemsRec.length"
                  :per-page="perpage"
                  align="fill"
                  size="sm"
                  class="my-0"
                ></b-pagination>
              </b-col>
            </b-row>
          </b-col>
        </b-card>
      </div>
      <b-col cols="1"></b-col>
    </b-row>
    <!-- SECCION DE ARCHIVOS -->
    <!-- <b-row v-if="value == 100">
      <div class="col-12 mb-4">
        <div class="d-flex justify-content-center"> -->
    <!-- <span> Selecciona tus archivos </span> animation="cylon-vertical"  -->
    <!-- <CButton @click="warningModal = true" color="primary">
            Sube tus archivos
            <b-icon class="ml-2" icon="upload" font-scale="1"></b-icon>
          </CButton>
          <CModal
            title="Arrastra o da click según sea el documento"
            :show.sync="warningModal"
            size="lg"
          > -->
    <!-- Nombre del componente: ArchivosV2.vue -->
    <!-- <Archivos />
          </CModal>
        </div>
      </div> -->
    <!-- <b-col cols="12" class="text-center mt-1">
        <b-form-file
         v-model="file1"
         :state="Boolean(file1)"
         placeholder="Seleccionar..."
         drop-placeholder="Drop file here..."
        ></b-form-file>
      </b-col> -->
    <!--Boton-->
    <!-- <b-col cols="12" class="text-center mt-1">
      <b-button
        :class="visible ? null : 'collapsed'"
        :aria-expanded="visible ? 'true' : 'false'"
        aria-controls="collapse-4"
        @click="visible = !visible"
        block
        variant="outline-primary"
      >
        Pago Recurrente
      </b-button>
      <b-collapse id="collapse-4" v-model="visible" class="mt-2">
        <b-card class="border border-primary">
          <b-col cols="12" class="text-center">
            <label><h4 class="text-primary">Pago Recurrente</h4></label>
          </b-col>
          <b-row>
            <b-col>
              <b-form-radio-group
                v-model="selectedTipoRecurrecia"
                :options="options"
                class="mb-3"
                value-field="item"
                text-field="name"
                disabled-field="notEnabled"
              ></b-form-radio-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="6">
              <label><h4 class="text-primary">Iniciar Recurrencia</h4></label>
            </b-col>
            <b-col cols="6">
              <label><h4 class="text-primary">Terminar Recurrencia</h4></label>
            </b-col>
            <b-col cols="6">
              <b-form-datepicker
                id="datepicker-sm 2"
                placeholder="Seleccione una fecha"
                size="sm"
                locale="es-MX"
                class="mb-2"
                :min="minimo"
                v-model="fechaInicio"
              ></b-form-datepicker>
            </b-col>
            <b-col cols="6">
              <b-form-datepicker
                id="datepicker-sm 1"
                placeholder="Seleccione una fecha"
                size="sm"
                locale="es-MX"
                class="mb-2"
                v-model="fechaFin"
              ></b-form-datepicker>
            </b-col>
          </b-row>
          <b-col
            cols="12"
            v-if="selectedTipoRecurrecia == 'Dias del mes'"
            class="mt-2 text-center"
          >
            <label class="bg-info w-100">
              <h2 class="text-white">Días que se quieren fijar</h2>
            </label>
            <Calendar
              :attributes="attributes"
              @dayclick="onDayClick"
              class="w-100"
              style=""
            />
          </b-col>
          <b-col cols="12" class="mt-1">
            <label class="d-block bg-primary">
              <h2
                class="text-white text-center"
                style="padding-top: 10px; padding-bottom: 10px"
              >
                Fechas de Pago <strong>{{ total }}</strong>
              </h2>
            </label>
            <b-row>
              <b-col cols="12" lg="2"> </b-col>

              <b-col cols="12" lg="8">
                <b-table
                  responsive
                  :current-page="currentPage"
                  :per-page="filasmostradas"
                  striped
                  hover
                  sticky-header
                  :items="items"
                  :fields="fields"
                >
                  <b-row> </b-row>
                </b-table>
                <b-pagination
                  v-model="currentPage"
                  :total-rows="items.length"
                  :per-page="perpage"
                  align="fill"
                  size="sm"
                  class="my-0"
                ></b-pagination>
              </b-col>
              <b-col cols="12" lg="2"> </b-col>
            </b-row>
          </b-col>
        </b-card>
      </b-collapse>
    </b-col> -->
    <!--ARCHIVOS-->
    <!-- <div>
      <b-row>
        <b-col cols="12 mt-3">
          <b-container class="bv-example-row bv-example-row-flex-cols">
            <b-row>
              <b-col align-self="center" cols="12" class="text-center">
                <label class="d-block bg-primary">
                  <h2
                    class="text-white text-center"
                    style="padding-top: 10px; padding-bottom: 10px"
                  >
                    Arrastra o da click según sea el documento
                  </h2>
                </label>
              </b-col>
            </b-row> -->
    <!--INICIAN LOS DROPBOX -->
    <!-- <b-row>
              <b-col cols="12" lg="6" style="padding: 12px">
                <b-row>
                  <b-col cols="12">
                    <label class="d-block" style="background-color: #2d4262">
                      <h4
                        class="text-white text-center"
                        style="padding-top: 10px; padding-bottom: 10px"
                      >
                        Factura
                      </h4>
                    </label>
                  </b-col>
                  <b-col cols="6">
                    <b-overlay :show="upload" rounded="sm">
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
                      <vue2Dropzone
                        disabled="true"
                        ref="dzfactura"
                        id="dfactura"
                        :options="dropzoneOptionsfactura"
                        style="border: dashed #20948b 2px; color: black"
                        @vdropzone-success="vsuccess"
                        @vdropzone-complete="afterupload"
                        @vdropzone-queue-complete="vqueueComplete"
                        @vdropzone-processing="cargando"
                        @vdropzone-sending="sendingEvent"
                        v-on:vdropzone-removed-file="removeFile"
                        :duplicateCheck="true"
                        @vdropzone-error="errorfactura"
                      >
                      </vue2Dropzone>
                    </b-overlay>
                  </b-col>
                  <b-col cols="6">
                    <b-container fluid class="">
                      <b-row style="">
                        <b-col
                          cols="12"
                          md="6"
                          v-for="item in facturas"
                          :key="'facturas' + item.id"
                          class="mb-2"
                        >
                          <b-overlay
                            :show="item.reloj"
                            rounded="sm"
                            :id="item.id + 'reloj'"
                          >
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
                            <a :href="item.url" target="_blank"
                              ><img
                                src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/xml-file.png"
                                class=""
                                style="width: 60px; margin-bottom: 1px"
                                v-if="item.tipo == 'xml'"
                            /></a>
                            <a :href="item.url" target="_blank">
                              <img
                                src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/pdfimage.png"
                                class="ml-2 mb-1 mt-1"
                                style="width: 45px; height: 52px"
                                v-if="item.tipo == 'pdf'"
                            /></a>
                            <br />
                            <b-button
                              class="btn btn-danger ml-2"
                              d-block
                              sytle="display:block"
                              :id="item.id + 'btn'"
                              @click="deletefile(item)"
                              ><b-icon
                                icon="trash-fill"
                                scale="1"
                                style="color: white"
                              ></b-icon>
                            </b-button>
                          </b-overlay>
                        </b-col>
                      </b-row>
                    </b-container>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" lg="6" style="padding: 12px">
                <b-row>
                  <b-col cols="12">
                    <label class="d-block" style="background-color: #2d4262">
                      <h4
                        class="text-white text-center"
                        style="padding-top: 10px; padding-bottom: 10px"
                      >
                        Cotización
                      </h4>
                    </label>
                  </b-col>
                  <b-col cols="6">
                    <b-overlay :show="upload" rounded="sm">
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
                      <vue2Dropzone
                        disabled="true"
                        ref="dzcotizacion"
                        id="dcotizacion"
                        :options="dropzoneOptionscotizacion"
                        style="border: dashed #20948b 2px; color: black"
                        @vdropzone-success="vsuccesscotizacion"
                        @vdropzone-complete="afterupload"
                        @vdropzone-queue-complete="vqueueComplete"
                        @vdropzone-processing="cargando"
                        @vdropzone-sending="sendingEventcotizacion"
                        v-on:vdropzone-removed-file="removeFile"
                        :duplicateCheck="true"
                        @vdropzone-error="errorfactura"
                      >
                      </vue2Dropzone>
                    </b-overlay>
                  </b-col>
                  <b-col cols="6">
                    <b-container fluid class="">
                      <b-row style="">
                        <b-col
                          cols="12"
                          md="6"
                          v-for="item in cotizaciones"
                          :key="'cotizaciones' + item.id"
                          class="mb-2"
                        >
                          <b-overlay
                            :show="item.reloj"
                            rounded="sm"
                            :id="item.id + 'relojc'"
                          >
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
                            <a
                              :href="item.url"
                              target="_blank"
                              v-if="item.tipo == 'pdf'"
                            >
                              <img
                                src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/pdfimage.png"
                                class="ml-2 mb-1 mt-1"
                                style="width: 45px; height: 52px"
                              />{{ item.nameoriginal }}
                            </a>
                            <a
                              :href="item.url"
                              target="_blank"
                              v-if="item.tipo == 'image'"
                              class="ml-1"
                            >
                              <img
                                :src="item.url"
                                class="ml-2 mb-1 mt-1"
                                style="width: 45px; height: 52px"
                              />{{ item.nameoriginal }}
                            </a>
                            <a
                              :href="item.url"
                              target="_blank"
                              v-if="item.tipo == 'docx' || item.tipo == 'doc'"
                              class="ml-1"
                            >
                              <img
                                src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/word.jpg"
                                class="ml-2 mb-1 mt-1"
                                style="width: 45px; height: 52px"
                              />{{ item.nameoriginal }}
                            </a>
                            <a
                              :href="item.url"
                              target="_blank"
                              v-if="item.tipo == 'xlsx' || item.tipo == 'xls'"
                              class="ml-1"
                            >
                              <img
                                src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/excel.png"
                                class="ml-2 mb-1 mt-1"
                                style="width: 45px; height: 52px"
                              />{{ item.nameoriginal }}
                            </a>
                            <br />
                            <b-button
                              class="btn btn-danger ml-2"
                              d-block
                              sytle="display:block"
                              :id="item.id + 'btnc'"
                              @click="deletefilec(item)"
                              ><b-icon
                                icon="trash-fill"
                                scale="1"
                                style="color: white"
                              ></b-icon>
                            </b-button>
                          </b-overlay>
                        </b-col>
                      </b-row>
                    </b-container>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" lg="6" style="padding: 12px">
                <b-row>
                  <b-col cols="12">
                    <label class="d-block" style="background-color: #2d4262">
                      <h4
                        class="text-white text-center"
                        style="padding-top: 10px; padding-bottom: 10px"
                      >
                        Orden de Compra
                      </h4>
                    </label>
                  </b-col>
                  <b-col cols="6">
                    <b-overlay :show="upload" rounded="sm">
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
                      <vue2Dropzone
                        disabled="true"
                        ref="dzorden"
                        id="dorden"
                        :options="dropzoneOptionscotizacion"
                        style="border: dashed #20948b 2px; color: black"
                        @vdropzone-success="vsuccessorden"
                        @vdropzone-complete="afterupload"
                        @vdropzone-queue-complete="vqueueComplete"
                        @vdropzone-processing="cargando"
                        @vdropzone-sending="sendingEventorden"
                        v-on:vdropzone-removed-file="removeFile"
                        :duplicateCheck="true"
                        @vdropzone-error="errorfactura"
                      >
                      </vue2Dropzone>
                    </b-overlay>
                  </b-col>
                  <b-col cols="6">
                    <b-container fluid class="">
                      <b-row style="">
                        <b-col
                          cols="12"
                          md="6"
                          v-for="item in ordenes"
                          :key="'ordenes' + item.id"
                          class="mb-2"
                        >
                          <b-overlay
                            :show="item.reloj"
                            rounded="sm"
                            :id="item.id + 'relojo'"
                          >
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
                            <a
                              :href="item.url"
                              target="_blank"
                              v-if="item.tipo == 'pdf'"
                            >
                              <img
                                src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/pdfimage.png"
                                class="ml-2 mb-1 mt-1"
                                style="width: 45px; height: 52px"
                              />{{ item.nameoriginal }}
                            </a>
                            <a
                              :href="item.url"
                              target="_blank"
                              v-if="item.tipo == 'image'"
                              class="ml-1"
                            >
                              <img
                                :src="item.url"
                                class="ml-2 mb-1 mt-1"
                                style="width: 45px; height: 52px"
                              />{{ item.nameoriginal }}
                            </a>
                            <a
                              :href="item.url"
                              target="_blank"
                              v-if="item.tipo == 'docx' || item.tipo == 'doc'"
                              class="ml-1"
                            >
                              <img
                                src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/word.jpg"
                                class="ml-2 mb-1 mt-1"
                                style="width: 45px; height: 52px"
                              />{{ item.nameoriginal }}
                            </a>
                            <a
                              :href="item.url"
                              target="_blank"
                              v-if="item.tipo == 'xlsx' || item.tipo == 'xls'"
                              class="ml-1"
                            >
                              <img
                                src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/excel.png"
                                class="ml-2 mb-1 mt-1"
                                style="width: 45px; height: 52px"
                              />{{ item.nameoriginal }} |</a
                            >
                            <br />
                            <b-button
                              class="btn btn-danger ml-2"
                              d-block
                              sytle="display:block"
                              :id="item.id + 'btno'"
                              @click="deletefileo(item)"
                              ><b-icon
                                icon="trash-fill"
                                scale="1"
                                style="color: white"
                              ></b-icon>
                            </b-button>
                          </b-overlay>
                        </b-col>
                      </b-row>
                    </b-container>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" lg="6" style="padding: 12px">
                <b-row>
                  <b-col cols="12">
                    <label class="d-block" style="background-color: #2d4262">
                      <h4
                        class="text-white text-center"
                        style="padding-top: 10px; padding-bottom: 10px"
                      >
                        Comprobante de Pago
                      </h4>
                    </label>
                  </b-col>
                  <b-col cols="6">
                    <b-overlay :show="upload" rounded="sm">
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
                      <vue2Dropzone
                        disabled="true"
                        ref="dzcomprobante"
                        id="dcomprobante"
                        :options="dropzoneOptionscotizacion"
                        style="border: dashed #20948b 2px; color: black"
                        @vdropzone-success="vsuccesscomprobante"
                        @vdropzone-complete="afterupload"
                        @vdropzone-queue-complete="vqueueComplete"
                        @vdropzone-processing="cargando"
                        @vdropzone-sending="sendingEventcomprobante"
                        v-on:vdropzone-removed-file="removeFile"
                        :duplicateCheck="true"
                        @vdropzone-error="errorfactura"
                      >
                      </vue2Dropzone>
                    </b-overlay>
                  </b-col>
                  <b-col cols="6">
                    <b-container fluid class="">
                      <b-row style="">
                        <b-col
                          cols="12"
                          md="6"
                          v-for="item in comprobantes"
                          :key="'comprobantes' + item.id"
                          class="mb-2"
                        >
                          <b-overlay
                            :show="item.reloj"
                            rounded="sm"
                            :id="item.id + 'relojcp'"
                          >
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
                            <a
                              :href="item.url"
                              target="_blank"
                              v-if="item.tipo == 'pdf'"
                            >
                              <img
                                src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/pdfimage.png"
                                class="ml-2 mb-1 mt-1"
                                style="width: 45px; height: 52px"
                              />{{ item.nameoriginal }}</a
                            >
                            <a
                              :href="item.url"
                              target="_blank"
                              v-if="item.tipo == 'image'"
                              class="ml-1"
                            >
                              <img
                                :src="item.url"
                                class="ml-2 mb-1 mt-1"
                                style="width: 45px; height: 52px"
                              />{{ item.nameoriginal }}</a
                            >
                            <a
                              :href="item.url"
                              target="_blank"
                              v-if="item.tipo == 'docx' || item.tipo == 'doc'"
                              class="ml-1"
                            >
                              <img
                                src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/word.jpg"
                                class="ml-2 mb-1 mt-1"
                                style="width: 45px; height: 52px"
                              />{{ item.nameoriginal }}</a
                            >
                            <a
                              :href="item.url"
                              target="_blank"
                              v-if="item.tipo == 'xlsx' || item.tipo == 'xls'"
                              class="ml-1"
                            >
                              <img
                                src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/excel.png"
                                class="ml-2 mb-1 mt-1"
                                style="width: 45px; height: 52px"
                              />{{ item.nameoriginal }}</a
                            >
                            <br />
                            <b-button
                              class="btn btn-danger ml-2"
                              d-block
                              sytle="display:block"
                              :id="item.id + 'btncp'"
                              @click="deletefilecp(item)"
                              ><b-icon
                                icon="trash-fill"
                                scale="1"
                                style="color: white"
                              ></b-icon>
                            </b-button>
                          </b-overlay>
                        </b-col>
                      </b-row>
                    </b-container>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" style="padding: 12px">
                <b-row>
                  <b-col cols="12">
                    <label class="d-block" style="background-color: #2d4262">
                      <h4
                        class="text-white text-center"
                        style="padding-top: 10px; padding-bottom: 10px"
                      >
                        Archivos Extras
                      </h4>
                    </label>
                  </b-col>
                  <b-col cols="6">
                    <b-overlay :show="upload" rounded="sm">
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
                      <vue2Dropzone
                        disabled="true"
                        ref="dzextras"
                        id="dextras"
                        :options="dropzoneOptionsextras"
                        style="border: dashed #20948b 2px; color: black"
                        @vdropzone-success="vsuccessextras"
                        @vdropzone-complete="afterupload"
                        @vdropzone-queue-complete="vqueueComplete"
                        @vdropzone-processing="cargando"
                        @vdropzone-sending="sendingEventextras"
                        v-on:vdropzone-removed-file="removeFile"
                        :duplicateCheck="true"
                        @vdropzone-error="errorfactura"
                      >
                      </vue2Dropzone>
                    </b-overlay>
                  </b-col>
                  <b-col cols="6">
                    <b-container fluid class="">
                      <b-row style="">
                        <b-col
                          cols="12"
                          md="6"
                          v-for="item in extras"
                          :key="'extras' + item.id"
                          class="mb-2"
                        >
                          <b-overlay
                            :show="item.reloj"
                            rounded="sm"
                            :id="item.id + 'relojx'"
                          >
                            <template v-slot:overlay>
                              <div class="text-center">
                                <b-icon
                                  icon="stopwatch"
                                  font-scale="3"
                                  animation="cylon"
                                >
                                </b-icon>
                                <p id="cancel-label">Please wait...</p>
                              </div>
                            </template>
                            <a
                              :href="item.url"
                              target="_blank"
                              v-if="item.tipo == 'xml'"
                            >
                              <img
                                src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/xml-file.png"
                                class=""
                                style="width: 60px; margin-bottom: 1px"
                              />
                              {{ item.nameoriginal }}
                            </a>
                            <a
                              :href="item.url"
                              target="_blank"
                              v-if="item.tipo == 'pdf'"
                            >
                              <img
                                src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/pdfimage.png"
                                class="ml-2 mb-1 mt-1"
                                style="width: 45px; height: 52px"
                              />{{ item.nameoriginal }}
                            </a>
                            <a
                              :href="item.url"
                              target="_blank"
                              v-if="item.tipo == 'image'"
                              class="ml-1"
                            >
                              <img
                                :src="item.url"
                                class="ml-2 mb-1 mt-1"
                                style="width: 45px; height: 52px"
                              />{{ item.nameoriginal }}
                            </a>
                            <a
                              :href="item.url"
                              target="_blank"
                              v-if="item.tipo == 'docx' || item.tipo == 'doc'"
                              class="ml-1"
                            >
                              <img
                                src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/word.jpg"
                                class="ml-2 mb-1 mt-1"
                                style="width: 45px; height: 52px"
                              />{{ item.nameoriginal }}
                            </a>
                            <a
                              :href="item.url"
                              target="_blank"
                              v-if="item.tipo == 'xlsx' || item.tipo == 'xls'"
                              class="ml-1"
                            >
                              <img
                                src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/excel.png"
                                class="ml-2 mb-1 mt-1"
                                style="width: 45px; height: 52px"
                              />{{ item.nameoriginal }}
                            </a>
                            <br />
                            <b-button
                              class="btn btn-danger ml-2"
                              d-block
                              sytle="display:block"
                              :id="item.id + 'btnx'"
                              @click="deletefilex(item)"
                              ><b-icon
                                icon="trash-fill"
                                scale="1"
                                style="color: white"
                              ></b-icon>
                            </b-button>
                          </b-overlay>
                        </b-col>
                      </b-row>
                    </b-container>
                  </b-col>
                </b-row>
              </b-col>
            </b-row> -->
    <!-- </b-container> -->
    <!-- </b-col> -->
    <!-- </b-row> -->
    <!-- </div> -->
    <!-- </b-row> -->
    <!-- Terminan los componentes del paso dos -->
    <!-- Los botones van a cambiar dependiendo de value  -->
    <!-- :disabled="
            form.monto.length <= 0 ||
              form.modalidad == 0 ||
              form.seleccionAmigo.length <= 0
          " -->
    <b-row>
      <b-col cols="1"> </b-col>
      <b-col cols="10" class="text-center mt-4" v-if="value == 50">
        <b-button
          class="col-12"
          variant="success"
          @click="ValidateTab1()"
          :disabled="form.concepto.length < 4 || form.comentario.length < 6"
          >Siguiente
          <b-icon
            class="ml-2"
            icon="arrow-right-square-fill"
            animation="cylon"
            font-scale="1"
          ></b-icon>
        </b-button>
      </b-col>
      <b-col cols="5" v-if="value == 100">
        <b-button block variant="success" @click="backStep()">
          <b-icon
            class="mr-2"
            icon="arrow-left-square-fill"
            animation="cylon"
            font-scale="1"
          ></b-icon
          >Regresar</b-button
        >
      </b-col>
      <b-col cols="5" v-if="value == 100">
        <!-- Se deba de mandar un 2 para hacer todo el JSON de los datos, falta hacer validacion de campos llenos para avanzar -->
        <b-button
          block
          variant="primary"
          @click="Next(2)"
          v-if="edit_ingress == false"
          :disabled="loading"
          >Crear datos
          <b-icon
            class="ml-2"
            icon="arrow-right-square-fill"
            animation="cylon"
            font-scale="1"
          ></b-icon
        ></b-button>
        <b-button
          block
          variant="warning"
          @click="Next(2)"
          v-if="edit_ingress"
          :disabled="loading"
          >Editar ingreso
          <b-icon
            class="ml-2"
            icon="arrow-right-square-fill"
            animation="cylon"
            font-scale="1"
          ></b-icon
        ></b-button>
      </b-col>
      <b-col cols="1"> </b-col>
    </b-row>
    <!-- Ventana modal para pedir un prestamo -->
    <CModal
      size="lg"
      title="Datos del prestamo"
      hide-footer
      header-text-variant="light"
      header-bg-variant="primary"
      header-text-size="xl"
      :show.sync="prestamo"
      alignment="center"
    >
      <div>
        <b-row>
          <b-col cols="1"></b-col>
          <div class="col-lg-5 col-xs-12">
            <center class="mb-1"><span>Fecha de inicio de pagos</span></center>
            <b-form-datepicker
              :disabled="actualizaDataPrestamo"
              @input="calculaFechasPrestamo"
              id="datepicker-sm 23"
              size="md"
              locale="es-MX"
              class="mb-2"
              :min="minimoInicio"
              v-model="formPrestamo.fechaIncio"
              :style="darkMode ? 'background-color:#393a42' : null"
            ></b-form-datepicker>
          </div>
          <div class="text-center col-lg-2 col-sm-3 col-xs-12 ">
            <center class="mb-1">
              <span>
                No. Pagos
              </span>
            </center>
            <b-input-group size="md">
              <b-form-input
                :disabled="actualizaDataPrestamo"
                @input="calculaFechasPrestamo()"
                v-model="formPrestamo.duracion"
                :min="1"
                type="number"
              ></b-form-input>
            </b-input-group>
          </div>
          <div class="text-center col-lg-3 col-sm-9 col-xs-12">
            <center class="mb-1">
              <span>
                Cobros
              </span>
            </center>
            <b-form-select
              :disabled="actualizaDataPrestamo"
              @change="calculaFechasPrestamo()"
              v-model="formPrestamo.frecuencia2"
              :options="optionsFrecuencyPay"
              :style="darkMode ? 'background-color:#393a42' : null"
            ></b-form-select>
          </div>
          <b-col cols="1"></b-col>
        </b-row>

        <!-- <b-row>
          <b-col cols="1"></b-col> -->
        <!-- <b-col cols="2" class="text-center">
            <center class="mb-1">
              <span>
                Duración
              </span>
            </center>
            <b-input-group size="md">
              <b-form-input
                v-model="formPrestamo.duracion"
                :min="0"
                type="number"
              ></b-form-input>
            </b-input-group>
          </b-col> -->
        <!-- <b-col cols="4">
            <center class="mb-1">
              <span>
                Frecuencia
              </span>
            </center>
            <b-form-select
              v-model="formPrestamo.frecuencia1"
              :options="optionsFrecuency"
              :style="darkMode ? 'background-color:#393a42' : null"
            ></b-form-select>
          </b-col> -->
        <!-- <b-col cols="4">
            <center class="mb-1">
              <span>
                Cobros
              </span>
            </center>
            <b-form-select
              @change="calculaFechasPrestamo()"
              v-model="formPrestamo.frecuencia2"
              :options="optionsFrecuencyPay"
              :style="darkMode ? 'background-color:#393a42' : null"
            ></b-form-select>
          </b-col>
          <b-col cols="1"></b-col>
        </b-row> -->
        <b-row>
          <b-col cols="1" class="mt-1"></b-col>
          <b-col cols="10" class="mt-1">
            <b-row>
              <b-col cols="6" class="mt-1">
                <h5
                  class="text-center"
                  style="padding-top: 10px; padding-bottom: 10px"
                >
                  No. de pagos: <strong>{{ formPrestamo.duracion }}</strong>
                </h5>
              </b-col>
              <b-col cols="5" class="mt-1">
                <h5
                  class="text-center"
                  style="padding-top: 10px; padding-bottom: 10px"
                >
                  Total Solicitado <strong>${{ form.montoNeto }}</strong>
                </h5>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <b-table
                  responsive
                  :current-page="currentPage"
                  :per-page="filasmostradas"
                  striped
                  hover
                  sticky-header
                  :items="itemsPrestamo"
                  :fields="fieldsPrestamo"
                >
                  <b-row> </b-row>
                </b-table>
                <b-pagination
                  v-model="currentPage"
                  :total-rows="itemsPrestamo.length"
                  :per-page="perpage"
                  align="fill"
                  size="sm"
                  class="my-0"
                ></b-pagination>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="1" class="mt-4 mb-2"></b-col>
              <b-col cols="10" class="mt-4 mb-2">
                <h5 class="text-center">
                  Tu prestamo termina :
                  <strong>{{ lastDatePrestamo }}</strong>
                </h5>
              </b-col>
              <b-col cols="1" class="mt-4 mb-2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="12" class="mt-2">
                <b-button
                  :disabled="
                    formPrestamo.fechaIncio == '' ||
                      formPrestamo.duracion == 0 ||
                      formPrestamo.frecuencia2 == 0
                  "
                  v-if="actualizaDataPrestamo == false"
                  class="col-12"
                  variant="warning"
                  @click="solicitarPrestamo(1)"
                  >Solicitar Prestamo
                  <b-icon
                    class="ml-2"
                    icon="cash-stack"
                    font-scale="1"
                  ></b-icon>
                </b-button>
                <b-button
                  v-if="actualizaDataPrestamo"
                  class="col-12"
                  variant="info"
                  :disabled="false"
                  @click="solicitarPrestamo(0)"
                  >Actualizar datos
                  <b-icon
                    class="ml-2"
                    icon="cash-stack"
                    font-scale="1"
                  ></b-icon>
                </b-button>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="1" class="mt-1"></b-col>
        </b-row>
      </div>
      <template #footer>
        <CButton></CButton>
      </template>
    </CModal>
  </div>
</template>
<script>
import { required, minLength } from "vuelidate/lib/validators";
import { mapState } from "vuex";
import repoupdateprofileuser from "@/assets/repositoriosjs/repoupdateprofileuser.js";
import Multiselect from "vue-multiselect";
import Swal from "sweetalert2";
import moment from "moment";
import Calendar from "v-calendar/lib/components/calendar.umd";
import alertas from "../../../assets/repositoriosjs/alertas";
// import Archivos from "@/views/ingresos/componentes/ArchivosV2";

export default {
  components: {
    Multiselect,
    Calendar
    // Archivos
  },
  props: ["edit_ingress"],
  data() {
    return {
      loading: false,
      idEdit: -1,
      monedas: [],
      // Dias especificos en el calendario un solo mes con 31 dias
      maxDate: "",
      minDate: " ",
      temporalCuenta: [],
      actualizaDataPrestamo: false,
      lastDatePrestamo: "",
      mostrarPrestamo: false,
      is_Loan: false,
      formPrestamo: {
        fechaIncio: "",
        duracion: 1,
        frecuencia1: 0,
        frecuencia2: 1
      },
      textPrestamo: "Ver detalles",
      prestamo: false,
      // DATOS DEL PASO DOS
      // Ventana modal para subir archivos
      warningModal: false,
      optionsTagIngreso: [], //Arreglo para ir metiendo los tags
      // Texto ventana modal
      tituloModal: "Campos Requeridos",
      // Data para el progress bar
      max: 100,
      value: 50,
      link: "", // Paso dos, links de pago
      status: false, // Recurrencia en los pagos, "No, es pago único"
      variable: false,
      titulo_botonCeder: "Agregar correo electrónico",
      // ceder_pago: false,
      // ceder_email: "",
      // VarOld: false,
      InputUsuariosCeder: "",
      // OpCeder: false,
      // OpCompartir: false,
      HabilitaDatos1: false,
      permisosOptions: [
        { item: 2, name: "Ver" },
        { item: 3, name: "Editar" },
        { item: 5, name: "Eliminar" }
      ],
      usuarios: [],
      mensajeok: "En balance",
      mensaje: true,
      diferencia: 0,
      minimoInicio: "",
      // items: [],
      mensajealert: "",
      // JSON PRINCIPAL
      form: {
        id: "",
        concepto: "",
        comentario: "",
        empresaPropia: null,
        // empresaExterna: null,
        Ceder: false,
        // cederCorreo: [],
        monto: "",
        montoNeto: "",
        iva: 0,
        modalidad: 1,
        cuentaBancaria: null,
        seleccionCuentasEmpresaPropia: [],
        seleccionCuentasEmpresaExterna: [],
        seleccionCuentasCedidas: [],
        seleccionAmigo: [],
        permisosUsuario: [],
        permisosSeleccionados: [2],
        proyecto: [],
        links: [],
        isrecurrente: false, // Si el pago es recurrente true
        selectedTipoRecurrecia: 1,
        fechaInicio: "",
        fechaFin: "",
        tiempo: "",
        // pagoVariable: "",
        compartir: false
      },
      optionsRecurrencia: [
        { item: "Diario", name: "Diario", value: 1 },
        { item: "Semanal", name: "Semanal", value: 2 },
        { item: "Mensual", name: "Mensual", value: 3 },
        { item: "Bimestral", name: "Bimestral", value: 4 },
        { item: "Dias del mes", name: "Días del mes", value: 5 },
        { item: "Trimestral", name: "Trimestral", value: 6 },
        { item: "Semestral", name: "Semestral", value: 7 },
        { item: "Anual", name: "Anual", value: 8 }
      ],
      // Variables para hacer el calculo de la recurrencia
      days: [],
      itemsRec: [],
      // Items tabla prestamo
      itemsPrestamo: [],
      total: 0,
      diasData: null,
      hoy: "",
      fieldsLinks: ["link", "accion"],
      fieldsRec: ["Pago", "Tipo", "Fecha"],
      fieldsPrestamo: ["Pago", "Tipo", "Fecha", "Monto"],
      currentPage: 1,
      perpage: 10,
      filasmostradas: 10,
      fechaLimite: "", // Fecha limite de pago
      minimo: "", //Fecha minima para seleccionar en "Fecha limite"
      email: "",
      fechaDePago: "",
      moneda: "",
      proyecto: null,
      isDisable: false,
      // optionsMoneda: [
      //   { value: 0, text: "Pesos" },
      //   { value: 1, text: "Dolares" },
      //   { value: 3, text: "Euros" }
      // ],
      // optionsMoneda: "EFRE",
      optionsIva: [
        { value: 0, text: "0%" },
        { value: 8, text: "8%" },
        { value: 16, text: "16%" }
      ],
      optionsFrecuency: [
        { value: 1, text: "Dia(s)" },
        { value: 2, text: "Semana(s) " },
        { value: 3, text: "Mes(es)" },
        { value: 4, text: "Año(s)" }
      ],
      optionsFrecuencyPay: [
        { value: 1, text: "Diarios" },
        { value: 2, text: "Semanales " },
        { value: 3, text: "Mensuales" },
        { value: 4, text: "Bimestrales" },
        { value: 5, text: "Trimestrales" },
        { value: 6, text: "Semestrales" },
        { value: 7, text: "Anuales" }
      ],
      optionsModalidad: [
        { text: "Unico", value: 1 },
        { text: "Replica", value: 2 },
        { text: "Dividir", value: 3 }
      ],
      optionsCeder: [
        { text: "No", value: false },
        { text: "Si", value: true }
      ],
      fields: [
        //campos de tabla
        { key: "name", label: "Usuario" },
        { key: "porcentaje", label: "Porcentaje" },
        { key: "bruto", label: "Monto Bruto" },
        { key: "iva", label: "IVA" },
        { key: "monto", label: "Monto Neto" }
      ],

      filter: null,
      filterOn: [],
      optionsEmpresaPropia: [],
      optionsEmpresaExterna: [],
      optionsCuentasEmpresaPropia: [],
      optionsProjects: [],
      optionsCuentasEmpresaExterna: [
        { name: "Vue.js", code: "vu" },
        { name: "Javascript", code: "js" },
        { name: "Open Source", code: "os" },
        { name: "Option Extra", code: "op" }
      ],
      optionsCuentasCedidas: [
        { name: "Vue.js", code: "vu" },
        { name: "Javascript", code: "js" },
        { name: "Open Source", code: "os" },
        { name: "Option Extra", code: "op" }
      ],
      aux: [] //modalidad = replica
    };
  },
  methods: {
    resetAccount(op) {
      if (op == true) {
        this.form.empresaPropia = null;
        this.temporalCuenta = [];
      } else {
        this.form.seleccionCuentasCedidas = [];
      }
    },
    // Limpiar todo el formulario
    clearForm() {
      console.log("Aqui si llega");
      this.moneda = "";
      this.maxDate = "";
      this.minDate = " ";
      this.temporalCuenta = [];
      this.actualizaDataPrestamo = false;
      this.lastDatePrestamo = "";
      this.mostrarPrestamo = false;
      this.is_Loan = false;
      this.formPrestamo.fechaIncio = "";
      this.formPrestamo.duracion = 1;
      this.formPrestamo.frecuencia1 = 0;
      this.formPrestamo.frecuencia2 = 1;
      this.textPrestamo = "Ver detalles";
      this.prestamo = false;
      this.warningModal = false;
      this.optionsTagIngreso = [];
      this.tituloModal = "Campos Requeridos";
      this.max = 100;
      this.value = 50;
      this.link = "";
      this.status = false;
      this.variable = false;
      this.titulo_botonCeder = "Agregar correo electrónico";
      this.InputUsuariosCeder = "";
      this.HabilitaDatos1 = false;
      this.mensajeok = "En balance";
      this.mensaje = true;
      this.diferencia = 0;
      this.mensajealert = "";
      this.form.id = "";
      this.form.concepto = "";
      this.form.comentario = "";
      this.form.empresaPropia = null;
      this.form.Ceder = false;
      this.form.monto = "";
      this.form.montoNeto = "";
      this.form.iva = 0;
      this.form.modalidad = 1;
      this.form.cuentaBancaria = null;
      this.form.seleccionCuentasEmpresaPropia = [];
      this.form.seleccionCuentasEmpresaExterna = [];
      this.form.seleccionCuentasCedidas = [];
      this.form.seleccionAmigo = [];
      this.form.permisosUsuario = [];
      this.form.permisosSeleccionados = [2];
      this.form.proyecto = [];
      this.form.links = [];
      this.form.isrecurrente = false;
      this.form.selectedTipoRecurrecia = 1;
      this.form.fechaInicio = this.minimoInicio;
      this.form.fechaFin = this.minimofinish;
      this.form.tiempo = "";
      this.form.compartir = false;
      this.total = 0;
      this.itemsRec = [];
    },
    checkStatus() {
      console.log(this.form.modalidad);
    },
    getTipoMoneda() {
      // console.log(this.form.seleccionCuentasEmpresaPropia);
      // console.log("ID EMPRESA:" + this.form.empresaPropia);
      this.moneda = this.temporalCuenta.moneda;
      // console.log(this.moneda);
      this.form.seleccionCuentasEmpresaPropia = this.temporalCuenta.id;
      // console.log(this.form.seleccionCuentasEmpresaPropia);
    },
    solicitarPrestamo(op) {
      if (op == 1) {
        let newObj = {};
        newObj.Frecuency = this.formPrestamo.frecuencia2;
        newObj.Start = this.formPrestamo.fechaIncio;
        newObj.Quantity = this.formPrestamo.duracion;
        newObj.Frecuency_Pay = "1";
        console.log(newObj);
        // Mandamos a bloquear todos los campos y cambiamos de boton para solo actualizar y cerramos la ventana modal
        this.actualizaDataPrestamo = true;
        this.prestamo = false;
      } else {
        console.log("Actualiza datos");
        this.actualizaDataPrestamo = false;
      }
    },
    checkPrestamo() {
      if (this.mostrarPrestamo) {
        this.prestamo = true;
        this.is_Loan = true;
        this.form.modalidad = 1;
        this.optionsModalidad = [
          { text: "Unico", value: 1 },
          { text: "Replica", value: 2 }
        ];
        this.calculaFechasPrestamo();
      } else {
        this.is_Loan = false;
        this.optionsModalidad = [
          { text: "Unico", value: 1 },
          { text: "Replica", value: 2 },
          { text: "Dividir", value: 3 }
        ];
      }
    },
    calculaFechasPrestamo() {
      let pagos = this.form.montoNeto / this.formPrestamo.duracion;
      switch (this.formPrestamo.frecuencia2) {
        case 1:
          this.itemsPrestamo = [];
          for (let a = 1; a <= this.formPrestamo.duracion; a++) {
            let objet = {
              Pago: a,
              Tipo: "Diario",
              Fechainterna: this.conviertefecha(
                moment(this.formPrestamo.fechaIncio)
                  .add(a, "d")
                  .format("l")
              ),
              Fecha: moment(this.form.fechaInicio)
                .locale("es-mx")
                .add(a, "d")
                .format("L"),
              Monto: "$" + pagos.toFixed(2)
            };
            this.itemsPrestamo.push(objet);
          }
          if (this.formPrestamo.duracion.length == "") {
            this.lastDatePrestamo = "Llena el No. de Pagos";
          } else {
            this.lastDatePrestamo = this.itemsPrestamo[
              this.itemsPrestamo.length - 1
            ].Fecha;
          }
          break;
        case 2:
          this.itemsPrestamo = [];
          for (let a = 1; a <= this.formPrestamo.duracion; a++) {
            let objet = {
              Pago: a,
              Tipo: "Semanal",
              Fechainterna: this.conviertefecha(
                moment(this.formPrestamo.fechaIncio)
                  .add(a, "w")
                  .format("l")
              ),
              Fecha: moment(this.form.fechaInicio)
                .locale("es-mx")
                .add(a, "w")
                .format("L"),
              Monto: "$" + pagos.toFixed(2)
            };
            this.itemsPrestamo.push(objet);
          }
          if (this.formPrestamo.duracion.length == "") {
            this.lastDatePrestamo = "Llena el No. de Pagos";
          } else {
            this.lastDatePrestamo = this.itemsPrestamo[
              this.itemsPrestamo.length - 1
            ].Fecha;
          }
          break;
        case 3:
          this.itemsPrestamo = [];
          for (let a = 1; a <= this.formPrestamo.duracion; a++) {
            let objet = {
              Pago: a,
              Tipo: "Mensual",
              Fechainterna: this.conviertefecha(
                moment(this.formPrestamo.fechaIncio)
                  .add(a, "M")
                  .format("l")
              ),
              Fecha: moment(this.form.fechaInicio)
                .locale("es-mx")
                .add(a, "M")
                .format("L"),
              Monto: "$" + pagos.toFixed(2)
            };
            this.itemsPrestamo.push(objet);
          }
          if (this.formPrestamo.duracion.length == "") {
            this.lastDatePrestamo = "Llena el No. de Pagos";
          } else {
            this.lastDatePrestamo = this.itemsPrestamo[
              this.itemsPrestamo.length - 1
            ].Fecha;
          }
          break;
        case 4:
          this.itemsPrestamo = [];
          for (let a = 1; a <= this.formPrestamo.duracion; a++) {
            let objet = {
              Pago: a,
              Tipo: "Bimestral",
              Fechainterna: this.conviertefecha(
                moment(this.formPrestamo.fechaIncio)
                  .add(a * 2, "M")
                  .format("l")
              ),
              Fecha: moment(this.form.fechaInicio)
                .locale("es-mx")
                .add(a * 2, "M")
                .format("L"),
              Monto: "$" + pagos.toFixed(2)
            };
            this.itemsPrestamo.push(objet);
          }
          if (this.formPrestamo.duracion.length == "") {
            this.lastDatePrestamo = "Llena el No. de Pagos";
          } else {
            this.lastDatePrestamo = this.itemsPrestamo[
              this.itemsPrestamo.length - 1
            ].Fecha;
          }
          break;
        case 5:
          this.itemsPrestamo = [];
          for (let a = 1; a <= this.formPrestamo.duracion; a++) {
            let objet = {
              Pago: a,
              Tipo: "Trimestral",
              Fechainterna: this.conviertefecha(
                moment(this.formPrestamo.fechaIncio)
                  .add(a * 3, "M")
                  .format("l")
              ),
              Fecha: moment(this.form.fechaInicio)
                .locale("es-mx")
                .add(a * 3, "M")
                .format("L"),
              Monto: "$" + pagos.toFixed(2)
            };
            this.itemsPrestamo.push(objet);
          }
          if (this.formPrestamo.duracion.length == "") {
            this.lastDatePrestamo = "Llena el No. de Pagos";
          } else {
            this.lastDatePrestamo = this.itemsPrestamo[
              this.itemsPrestamo.length - 1
            ].Fecha;
          }
          break;
        case 6:
          this.itemsPrestamo = [];
          for (let a = 1; a <= this.formPrestamo.duracion; a++) {
            let objet = {
              Pago: a,
              Tipo: "Semestral",
              Fechainterna: this.conviertefecha(
                moment(this.formPrestamo.fechaIncio)
                  .add(a * 6, "M")
                  .format("l")
              ),
              Fecha: moment(this.form.fechaInicio)
                .locale("es-mx")
                .add(a * 6, "M")
                .format("L"),
              Monto: "$" + pagos.toFixed(2)
            };
            this.itemsPrestamo.push(objet);
          }
          if (this.formPrestamo.duracion.length == "") {
            this.lastDatePrestamo = "Llena el No. de Pagos";
          } else {
            this.lastDatePrestamo = this.itemsPrestamo[
              this.itemsPrestamo.length - 1
            ].Fecha;
          }
          break;
        case 7:
          this.itemsPrestamo = [];
          for (let a = 1; a <= this.formPrestamo.duracion; a++) {
            let objet = {
              Pago: a,
              Tipo: "Anual",
              Fechainterna: this.conviertefecha(
                moment(this.formPrestamo.fechaIncio)
                  .add(a, "y")
                  .format("l")
              ),
              Fecha: moment(this.form.fechaInicio)
                .locale("es-mx")
                .add(a, "y")
                .format("L"),
              Monto: "$" + pagos.toFixed(2)
            };
            this.itemsPrestamo.push(objet);
          }
          if (this.formPrestamo.duracion.length == "") {
            this.lastDatePrestamo = "Llena el No. de Pagos";
          } else {
            this.lastDatePrestamo = this.itemsPrestamo[
              this.itemsPrestamo.length - 1
            ].Fecha;
          }
          break;
        default:
      }
      // this.itemsRec = [];
      // for (let a = 1; a <= this.diferenciaRecurrencia(); a++) {
      //   let objet = {
      //     Pago: a,
      //     Tipo: "Diario",
      //     Fechainterna: this.conviertefecha(
      //       moment(this.form.fechaInicio)
      //         .add(a, "d")
      //         .format("l")
      //     ),
      //     Fecha: moment(
      //       this.conviertefecha(
      //         moment(this.form.fechaInicio)
      //           .add(a, "d")
      //           .format("l")
      //       )
      //     ).format("L")
      //   };
      //   this.itemsRec.push(objet);
      // }
      // this.total = this.diferenciaRecurrencia();
    },
    // cobrosPrestamo() {
    //   console.log(this.formPrestamo.frecuencia2);
    //   console.log(this.formPrestamo);
    // },
    // Regresa a vista de paso 1
    backStep() {
      this.value = 50;
      this.tituloModal = "Campos Requeridos";
    },
    ValidateTab1() {
      if (this.form.Ceder == false) {
        if (this.form.empresaPropia == null) {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Agrega una empresa para continuar",
            showConfirmButton: false,
            timer: 2000
          });
        } else if (this.temporalCuenta.length == 0) {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Agrega una cuenta bancaria para continuar",
            showConfirmButton: false,
            timer: 2000
          });
        } else if (this.form.monto.length == 0) {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Introduce un monto valido",
            showConfirmButton: false,
            timer: 2000
          });
        } else if (this.form.seleccionAmigo.length == 0) {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Selecciona al menos un usuario a quien solicitas el pago",
            showConfirmButton: false,
            timer: 2000
          });
        } else if (
          this.form.empresaPropia != null &&
          this.temporalCuenta.length != 0 &&
          this.form.monto.length != 0 &&
          this.form.seleccionAmigo.length != 0
        ) {
          // Avanzamos al tab 2
          this.Next(1);
        }
      } else if (this.form.Ceder == true) {
        console.log("Se esta cediendo el pago");
        if (this.form.seleccionCuentasCedidas.length == 0) {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Inidica a quien le estas cediendo el pago",
            showConfirmButton: false,
            timer: 2000
          });
        } else if (this.form.monto.length == 0) {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Introduce un monto valido",
            showConfirmButton: false,
            timer: 2000
          });
        } else if (this.moneda.length == 0) {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Selecciona un tipo de moneda para continuar",
            showConfirmButton: false,
            timer: 2000
          });
        } else if (this.form.seleccionAmigo.length == 0) {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Selecciona al menos un usuario a quien solicitas el pago",
            showConfirmButton: false,
            timer: 2000
          });
        } else if (
          this.form.seleccionCuentasCedidas.length != 0 &&
          this.form.monto.length != 0 &&
          this.form.seleccionAmigo.length != 0
        ) {
          this.Next(1);
        }
      }
    },
    Next(op) {
      if (op == 1) {
        this.value = 100;
        this.tituloModal = "Campos Opcionales";
      } else if (op == 2) {
        let temporalUsers = [];
        for (let a = 0; a < this.items.length; a++) {
          let NewObj = {};
          NewObj.Email = this.items[a].name;
          NewObj.Percentage = this.items[a].range;
          NewObj.Ammount = this.items[a].monto;
          NewObj.Tax = this.form.iva;
          temporalUsers.push(NewObj);
        }
        // Sacamos los datos del prestamo
        let TemporalLoan = {};
        TemporalLoan.Frecuency = this.formPrestamo.frecuencia2;
        TemporalLoan.Start = this.formPrestamo.fechaIncio;
        TemporalLoan.Quantity = this.formPrestamo.duracion;
        // TemporalLoan.Frecuency_Pay = "0";
        // Sacamos los datos de la recurrencia en forma de objeto
        let temporalRecurrencia = {}; //
        temporalRecurrencia.Type = this.form.selectedTipoRecurrecia;
        temporalRecurrencia.Date_1 = this.form.fechaInicio;
        temporalRecurrencia.Date_2 = this.form.fechaFin;
        temporalRecurrencia.Days = this.days.map(ele => ele.id.slice(8, 10));
        temporalRecurrencia.t_pagos = this.total;
        temporalRecurrencia.variable = this.variable;
        // Validacion para las fechas en caso de ser menor a 10 y pasar el endpoint
        // if(this.fechaLimite)
        //Test del JSON del primer tab para persistencia de los datos
        let newObj = {};
        newObj.Concept = this.form.concepto;
        newObj.Coment = this.form.comentario;
        newObj.Company_id = this.form.empresaPropia;
        newObj.Account_id = this.form.seleccionCuentasEmpresaPropia;
        // newObj.empresaExterna = this.form.empresaExterna;
        // newObj.cuentaExterna = this.form.seleccionCuentasEmpresaExterna;
        newObj.Give = this.form.Ceder;
        newObj.Give_email = this.form.seleccionCuentasCedidas.email;
        newObj.Ammount_gross = this.form.monto;
        newObj.Currency = this.moneda;
        newObj.Tax = this.form.iva;
        newObj.Ammount_total = this.form.montoNeto;
        // Datos en caso de que sea un prestamo
        newObj.Is_Loan = this.is_Loan;
        newObj.Loan = TemporalLoan;
        // newObj.fechaInicioPrestamo = this.formPrestamo.fechaIncio;
        // newObj.cantidadPagos = this.formPrestamo.duracion;
        // newObj.cobros = this.formPrestamo.frecuencia2;
        // Fin de los datos del prestamo
        newObj.Modality_id = this.form.modalidad;
        newObj.Users = temporalUsers;
        // SEGUNDO TAB DE LA VENTANA MODAL
        newObj.is_Share = this.form.compartir;
        newObj.Shared = this.form.permisosUsuario.map(ele => ele.email);
        newObj.Permissions_Shared = this.form.permisosSeleccionados;
        // Tags del ingreso, proyecto destino, arreglo de links, fecha limite de pago
        newObj.Tags = this.optionsTagIngreso;
        newObj.Proyects = this.form.proyecto.map(ele => ele.value);
        newObj.Payment_Links = this.form.links.map(ele => ele.link);
        newObj.Date_max = this.fechaLimite;
        // RECURRENCIA
        newObj.Recurrent = this.form.isrecurrente;
        newObj.Recurrent_data = temporalRecurrencia;
        if (this.edit_ingress) {
          console.log("Se esta editado...");
          let editObj = {};
          editObj.Id_Solicitud = this.idEdit;
          let editObj2 = Object.assign(editObj, newObj);
          console.log(editObj2);
          this.editcreateNew(editObj2);
        } else {
          this.createNew(newObj);
        }
      }
    },
    // ceder_emailFuct() {
    //   this.ceder_pago = !this.ceder_pago;
    //   if (this.ceder_pago) {
    //     this.titulo_botonCeder = "Escribe el electrónico";
    //   } else {
    //     this.titulo_botonCeder = "Agregar correo electrónico";
    //   }
    // },
    // OpCederFunct(op) {
    //   console.log(op);
    //   if (op === true) {
    //     this.OpCeder = true;
    //   } else {
    //     this.OpCeder = false;
    //   }
    //   // this.OpCeder = !this.OpCeder;
    //   // this.VarOld = !this.VarOld;
    // },
    // OpCompartirFunct() {
    //   this.OpCompartir = !this.OpCompartir;
    // },
    // Steps(op) {
    //   console.log("hola");
    //   if (op === 1) {
    //     this.HabilitaDatos1 = true;
    //   }
    // },
    async createNew(request) {
      console.log(request);
      try {
        this.loading = true;
        const alert = alertas();
        const repo = repoupdateprofileuser();
        await repo.addsolicitud(request).then(res => {
          console.log(res);
          if (res.code == 200) {
            let newObj = {
              Tit: "Ingreso",
              Text:
                "Creado correctamente, sube tus archivos o edita el ingreso",
              icono: "success"
            };
            alert.PermisosOK(newObj);
            this.$emit("changePassOne", res);
            this.idEdit = res.back;
          }
          this.clearForm();
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async editcreateNew(request) {
      console.log(request);
      try {
        this.loading = true;
        const alert = alertas();
        const repo = repoupdateprofileuser();
        await repo.editsolicitud(request).then(res => {
          console.log(res);
          if (res.code == 200) {
            let newObj = {
              Tit: "Ingreso",
              Text:
                "Se actualizaron los datos, si lo necesitas sube tus archivos",
              icono: "success"
            };
            alert.PermisosOK(newObj);
            this.$emit("changePassOne", res);
            this.idEdit = res.back;
          }
          // this.clearForm();
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async getUsuarios() {
      try {
        const repo = repoupdateprofileuser();
        await repo.onlyusers().then(res => {
          this.usuarios = res.data.map(function(obj) {
            let newObj = {};
            newObj.nombre = obj.name;
            newObj.id = obj.id;
            newObj.email = obj.email;
            // console.log(newObj);
            return newObj;
          });
        });
      } catch (error) {
        // console.log(error);
      }
    },
    async getEmpresas() {
      try {
        const repo = repoupdateprofileuser();
        await repo.getempresasback().then(res => {
          // console.log(res);
          this.optionsEmpresaPropia = res.data.data.map(function(obj) {
            let newObj = {};
            newObj.nombre = obj.nombre;
            newObj.value = obj.id;
            newObj.propietario = 1;
            return newObj;
          });
        });
      } catch (error) {
        console.log(error);
        // } finally {
      }
    },
    async getCuentas() {
      try {
        let temporal = [];
        const repo = repoupdateprofileuser();
        await repo.getmycuentas().then(res => {
          temporal = res.data.cuentas.filter(
            cuenta => cuenta.empresas[0].id == this.form.empresaPropia
          );
        });
        this.optionsCuentasEmpresaPropia = temporal.map(function(obj) {
          let newObj = {};
          newObj.nombre = obj.nombre_cuenta;
          newObj.nombre2 = obj.nickname;
          newObj.moneda = obj.moneda;
          newObj.id = obj.id;
          newObj.value = obj;
          return newObj;
        });
        this.moneda = "";
      } catch (error) {
        console.log(error);
      }
    },
    async getProjects() {
      try {
        const repo = repoupdateprofileuser();
        await repo.getproyectos().then(res => {
          this.optionsProjects = res.data.map(function(obj) {
            let newObj = {};
            newObj.nombre = obj.nombre;
            newObj.value = obj.id;
            return newObj;
          });
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getEmpresasExt() {
      try {
        const repo = repoupdateprofileuser();
        await repo.consEmpresasExt().then(res => {
          this.optionsEmpresaExterna = res.data.map(function(obj) {
            let newObj = {};
            newObj.nombre = obj.empresa.nombre;
            newObj.value = obj.empresa.id;
            newObj.propietario = obj.Permiso_id;
            return newObj;
          });
        });
      } catch (error) {
        //         console.log(error);
        // } finally {
      }
    },
    async getMonedas() {
      try {
        const repo = repoupdateprofileuser();
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
    // async getmycuentas() {
    //   try {
    //     const repo = repoupdateprofileuser();
    //     await repo.getcuentasback().then(res => {
    //       console.log(res);
    //       // this.hola = res.data.map(function (obj) {
    //       //   let newObj = {};
    //       //   // newObj.nombre = obj.empresa.nombre;
    //       //   // newObj.value = obj.empresa.id;
    //       //   // newObj.propietario = obj.Permiso_id;
    //       //   return console.log(res);
    //       // });
    //     });
    //   } catch (error) {
    //     //         console.log(error);
    //     // } finally {
    //   }
    // },
    // addTagEP(newTag) {
    //   //addTagEmpresaPropia
    //   const tag = {
    //     name: newTag,
    //     code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000)
    //   };
    //   this.optionsCuentasEmpresaPropia.push(tag);
    //   this.form.seleccionCuentasEmpresaPropia.push(tag);
    // },
    addTagEE(newTag) {
      //addTagEmpresaExterna
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000)
      };
      this.optionsCuentasEmpresaExterna.push(tag);
      this.form.seleccionCuentasEmpresaExterna.push(tag);
    },
    // addTagCe(newTag) {
    //   //addTagCedida
    //   const tag = {
    //     name: newTag,
    //     code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000)
    //   };
    //   this.optionsCuentasCedidas.push(tag);
    //   this.form.seleccionCuentasCedidas.push(tag);
    // },
    // addTagAmigo(newTag) {
    //   //addTagCedida
    //   const tag = {
    //     nombre: newTag,
    //     id: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000)
    //   };
    //   this.usuarios.push(tag);
    //   this.form.seleccionAmigo.push(tag);
    // },
    addTagAmigo2(newTag) {
      let regExMail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      if (regExMail.test(newTag)) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Correo agregado",
          text:
            "Sugerencia: Si tu destinatario es recurrente agregalo como amigo para agilizar futuras transacciones",
          showConfirmButton: true
        });
        const tag = {
          nombre: newTag,
          email: newTag,
          id: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000)
        };
        this.usuarios.push(tag);
        this.form.seleccionAmigo.push(tag);
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Correo invalido",
          showConfirmButton: false,
          timer: 1200
        });
      }
    },
    // Validacion para correos en CEDER EL PAGO
    emailCederTag(newTag) {
      this.form.seleccionCuentasCedidas = [];
      let regExMail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      if (regExMail.test(newTag)) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Correo agregado",
          text:
            "Sugerencia: Si tu destinatario es recurrente agregalo como amigo para agilizar futuras transacciones",
          showConfirmButton: true
        });
        const tag = {
          email: newTag,
          nombre: newTag,
          id: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000)
        };
        this.usuarios.push(tag);
        // this.form.cederCorreo.push(tag);
        // this.form.seleccionCuentasCedidas.push(tag);
        this.form.seleccionCuentasCedidas = tag;
        // this.form.seleccionCuentasCedidas.push(tag);
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Correo invalido",
          showConfirmButton: false,
          timer: 1200
        });
      }
    },
    emailCompartirPago(newTag) {
      this.form.seleccionCuentasCedidas = [];
      let regExMail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      if (regExMail.test(newTag)) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Correo agregado",
          text:
            "Sugerencia: Si tu destinatario es recurrente agregalo como amigo para agilizar futuras transacciones",
          showConfirmButton: true
        });
        const tag = {
          email: newTag,
          nombre: newTag,
          id: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000)
        };
        this.usuarios.push(tag);
        this.form.permisosUsuario.push(tag);
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Correo invalido",
          showConfirmButton: false,
          timer: 1200
        });
      }
    },
    // Funciones para agregar los links de pago
    encontrado(item) {
      let noencontrado = true;
      for (let i = 0; i < this.form.links.length; i++) {
        if (this.form.links[i] == item) {
          noencontrado = false;
          break;
        }
      }
      return noencontrado;
    },
    addlink() {
      if (this.link == "") {
        return false;
      }
      if (this.encontrado(this.link)) {
        let newObj = {};
        newObj.link = this.link;
        newObj.accion = "Eliminar";
        this.form.links.push(newObj);
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "El link ya esta agregado",
          showConfirmButton: false,
          timer: 1500
        });
      }
      this.link = "";
    },
    // Elimina un link agregado solo del lado del front
    eliminalink(item) {
      this.form.links = this.form.links.filter(link => link.link != item.link);
    },

    // Funciones para la RECURRENCIA de un pago
    resetitems() {
      this.form.isrecurrente = !this.form.isrecurrente;
      if (this.form.isrecurrente == false) {
        this.variable = false;
      }
    },
    // Cambia de estado la variable prestamo
    estatusPrestamo(op) {
      if (op === 1) {
        this.prestamo = true;
        this.textPrestamo = "Ver detalles";
      }
      if (op === 0) {
        // this.prestamo = false;
        this.textPrestamo = "Llenar datos";
        // Se limpian todos los campos
        this.formPrestamo.fechaIncio = "";
        this.formPrestamo.duracion = 0;
        this.formPrestamo.frecuencia1 = 0;
        this.formPrestamo.frecuencia2 = 0;
        this.itemsPrestamo = [];
        this.actualizaDataPrestamo = false;
      }
    },
    // CALCULO DE RECURRENCIA POR DIA, SEMANA, MES, AÑO Y DIAS ESPECIFICOS
    cambiafechainicial() {
      let suma = this.conviertefecha(
        moment(this.form.fechaInicio)
          .add(1, "d")
          .format("l")
      );
      this.form.tiempo = suma;
      this.minimofinish = suma;
      this.calculapagos(this.form.selectedTipoRecurrecia);
    },
    // Este se queda pendiente con el formato MX por temas de que solo se usa el dia
    dias() {
      this.itemsRec = [];
      let dias = [];
      for (let a = 0; a < this.days.length; a++) {
        let cortar = this.days[a].id.split("-");
        dias.push(cortar[2]);
      }
      let contador = 0;
      for (let a = 1; a <= this.diferenciaRecurrencia(); a++) {
        let fechain = this.conviertefecha(
          moment(this.form.fechaInicio)
            .add(a, "d")
            .format("l")
        );
        let arrayinicio = fechain.split("-");
        let verificardia = arrayinicio[2];
        for (let b = 0; b < dias.length; b++) {
          if (verificardia / dias[b] == 1) {
            contador++;
            let objet = {
              Pago: contador,
              Tipo: "Dia del Mes",
              Fechainterna: fechain,
              Fecha: moment(this.form.fechaInicio)
                .locale("es-mx")
                .add(a, "d")
                .format("L")
            };
            this.itemsRec.push(objet);
          }
        }
        this.total = this.itemsRec.length;
      }
    },
    mensual() {
      this.itemsRec = [];
      for (let a = 1; a <= this.diferenciames(); a++) {
        let fechain = this.conviertefecha(
          moment(this.form.fechaInicio)
            .add(a, "M")
            .format("l")
        );
        let objet = {
          Pago: a,
          Tipo: "Mensual",
          Fechainterna: fechain,
          Fecha: moment(this.form.fechaInicio)
            .locale("es-mx")
            .add(a, "M")
            .format("L")
        };
        this.itemsRec.push(objet);
      }
      this.total = this.diferenciames();
    },
    anual() {
      this.itemsRec = [];
      for (let a = 1; a <= this.diferenciaanual(); a++) {
        let fechain = this.conviertefecha(
          moment(this.form.fechaInicio)
            .add(a, "y")
            .format("l")
        );
        let objet = {
          Pago: a,
          Tipo: "Anual",
          Fechainterna: fechain,
          Fecha: moment(this.form.fechaInicio)
            .locale("es-mx")
            .add(a, "y")
            .format("L")
        };
        this.itemsRec.push(objet);
      }
      this.total = this.diferenciaanual();
    },
    semestral() {
      this.itemsRec = [];
      for (let a = 1; a <= this.diferenciageneric(6); a++) {
        let fechain = this.conviertefecha(
          moment(this.form.fechaInicio)
            .add(a * 6, "M")
            .format("l")
        );
        let objet = {
          Pago: a,
          Tipo: "Semestral",
          Fechainterna: fechain,
          Fecha: moment(this.form.fechaInicio)
            .locale("es-mx")
            .add(a * 6, "M")
            .format("L")
        };
        this.itemsRec.push(objet);
      }
      this.total = this.diferenciageneric(6);
    },
    trimestral() {
      this.itemsRec = [];
      for (let a = 1; a <= this.diferenciageneric(3); a++) {
        let fechain = this.conviertefecha(
          moment(this.form.fechaInicio)
            .add(a * 3, "M")
            .format("l")
        );
        let objet = {
          Pago: a,
          Tipo: "Trimestral",
          Fechainterna: fechain,
          Fecha: moment(this.form.fechaInicio)
            .locale("es-mx")
            .add(a * 3, "M")
            .format("L")
        };
        this.itemsRec.push(objet);
      }
      this.total = this.diferenciageneric(3);
    },
    bimestral() {
      this.itemsRec = [];
      for (let a = 1; a <= this.diferenciageneric(2); a++) {
        let fechain = this.conviertefecha(
          moment(this.form.fechaInicio)
            .add(a * 2, "M")
            .format("l")
        );
        let objet = {
          Pago: a,
          Tipo: "Bimestral",
          Fechainterna: fechain,
          Fecha: moment(this.form.fechaInicio)
            .locale("es-mx")
            .add(a * 2, "M")
            .format("L")
        };
        this.itemsRec.push(objet);
      }
      this.total = this.diferenciageneric(2);
    },
    semanal() {
      this.itemsRec = [];
      for (let a = 1; a <= this.diferenciasemana(); a++) {
        let fechain = this.conviertefecha(
          moment(this.form.fechaInicio)
            .add(a, "w")
            .format("l")
        );
        let objet = {
          Pago: a,
          Tipo: "Semanal",
          Fechainterna: fechain,
          Fecha: moment(this.form.fechaInicio)
            .locale("es-mx")
            .add(a, "w")
            .format("L")
        };
        this.itemsRec.push(objet);
      }
      this.total = this.diferenciasemana();
    },
    diario() {
      this.itemsRec = [];
      for (let a = 1; a <= this.diferenciaRecurrencia(); a++) {
        let objet = {
          Pago: a,
          Tipo: "Diarios",
          Fechainterna: this.conviertefecha(
            moment(this.form.fechaInicio)
              .add(a, "d")
              .format("l")
          ),
          Fecha: moment(this.form.fechaInicio)
            .locale("es-mx")
            .add(a, "d")
            .format("L")
        };
        this.itemsRec.push(objet);
      }
      this.total = this.diferenciaRecurrencia();
    },
    onDayClick(day) {
      const idx = this.days.findIndex(d => d.id === day.id);
      if (idx >= 0) {
        this.days.splice(idx, 1);
      } else {
        this.days.push({
          id: day.id,
          date: day.date
        });
      }
      this.dias();
    },
    calculapagos(val) {
      this.diasData = null;
      this.days = [];
      this.itemsRec = [];
      switch (val) {
        case 1:
          this.diario();
          break;
        case 2:
          this.semanal();
          break;
        case 3:
          this.mensual();
          break;
        case 4:
          this.bimestral();
          break;
        case 6:
          this.trimestral();
          break;
        case 7:
          this.semestral();
          break;
        case 8:
          this.anual();
          break;
        case 5:
          this.dias();
          break;
        default:
      }
    },
    cambiafecha() {
      this.calculapagos(this.form.selectedTipoRecurrecia);
    },
    diferenciageneric(num) {
      return Math.trunc(this.diferenciames() / num);
    },
    diferenciaanual() {
      let fecha1 = moment(this.form.fechaInicio);
      let fecha2 = moment(this.form.fechaFin);
      return fecha2.diff(fecha1, "y");
    },
    diferenciames() {
      let fecha1 = moment(this.form.fechaInicio);
      let fecha2 = moment(this.form.fechaFin);
      return fecha2.diff(fecha1, "M");
    },
    diferenciasemana() {
      let fecha1 = moment(this.form.fechaInicio);
      let fecha2 = moment(this.form.fechaFin);
      return fecha2.diff(fecha1, "w");
    },
    diferenciaRecurrencia() {
      let fecha1 = moment(this.form.fechaInicio);
      let fecha2 = moment(this.form.fechaFin);
      return fecha2.diff(fecha1, "days");
    },
    conviertefecha($fecha) {
      // console.log($fecha);
      let conviert = $fecha.split("/");
      return conviert[2] + "-" + conviert[0] + "-" + conviert[1];
    },
    fecha() {
      let date = new Date();
      this.minimoInicio = this.sumarfechadate(date);
      this.hoy = this.sumarfechadate(date);
      this.form.fechaInicio = this.sumarfechadate(date);
      this.formPrestamo.fechaIncio = this.sumarfechadate(date);
      this.fechaLimite = this.sumarfechadate(date);
      date.setDate(date.getDate() + 1); ///se suma 1 dia a la fecha del dia actual
      this.form.fechaFin = this.sumarfechadate(date);
      this.minimofinish = this.sumarfechadate(date);
    },
    sumarfechadate(date) {
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let fecha;
      if (month < 10 && day < 10) {
        fecha = `${year}-0${month}-0${day}`;
      } else if (month < 10 && day > 10) {
        fecha = `${year}-0${month}-${day}`;
      } else if (month > 10 && day < 10) {
        fecha = `${year}-${month}-0${day}`;
      } else {
        fecha = `${year}-${month}-${day}`;
      }
      return fecha;
    },
    dayCalendar() {
      let date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let fecha;
      // let fecha2;
      fecha = `${year}-${month}-${day}`;
      return fecha;
    },
    // formularioIncompleto() {
    //   Swal.fire({
    //     position: "center",
    //     icon: "error",
    //     title: "Formulario incompleto",
    //     showConfirmButton: false,
    //     timer: 1000
    //   });
    // },
    calculaMontoNeto() {
      let montoInicial = this.form.monto;
      let ivaSelec = this.form.iva;
      let montoTotalNeto = (montoInicial * (ivaSelec / 100 + 1)).toFixed(2);
      this.form.montoNeto = montoTotalNeto;
    },
    calculaporcentaje() {
      let cantidad = 0;
      let porcentaje = 0;
      let allusers = parseFloat(this.items.length);
      cantidad = this.form.monto / allusers;
      cantidad = parseFloat(cantidad.toFixed(2)); ///// a dos decimales la division
      let totalcantidad = parseFloat((cantidad * allusers).toFixed(1));
      if (
        (this.items.length >= 1 && this.form.modalidad == 3) ||
        (this.items.length >= 1 && this.form.modalidad == 1)
      ) {
        if (totalcantidad == this.form.monto) {
          ///todo ok cuadra
          porcentaje = parseFloat((100 / allusers).toFixed(0));
          for (let a = 0; a < allusers; a++) {
            this.items[a].range = porcentaje;
            this.items[a].monto = cantidad;
          }
          this.mensaje = true;
        } else {
          ////no cuadra
          let sumardecimales = parseFloat(
            (this.form.monto - totalcantidad).toFixed(1)
          );
          porcentaje = parseFloat((100 / allusers).toFixed(2));
          for (let a = 0; a < allusers; a++) {
            if (a == allusers - 1) {
              cantidad = cantidad + sumardecimales;
            }
            this.items[a].range = porcentaje;
            this.items[a].monto = cantidad.toFixed(1);
          }

          this.mensaje = true;
        }
      } else {
        for (let a = 0; a < allusers; a++) {
          this.items[a].range = 100;
          this.items[a].monto = parseFloat(this.form.monto);
        }
      } ///1
    },
    dividirPago() {},
    itemPaTabla() {
      let a = [];
      a = this.items;
      this.aux = a;
      console.log("llega aux: " + typeof a);
    },
    validamontototal(val, index) {
      // Primera validacion para campos vacios
      if (val == "") {
        console.log("Campos vacios");
        val = 0;
        // this.items.monto = 0;
      }
      // else if (val >= this.form.monto) {
      //   // val = 0;
      //   console.log("Es mas que el total");
      // }
      // let uno = val.split(".");
      // if (uno.length > 1) {
      //   if (uno.length == 2) {
      //     if (uno[1].length > 2) {
      //       uno[1] = uno[1].slice("0", 2);
      //       let setea = uno[0] + "." + uno[1];
      //       this.seteamonto(setea, index);
      //     }
      //   } else {
      //     this.resetrow(index);
      //   }
      // }
      let nuevo = parseFloat(val);
      if (this.validaentrada(nuevo, index)) {
        if (nuevo > this.form.monto) {
          this.resetrow(index);
          let resuelve = this.sumatotal;
          let diferencia = this.form.monto;
          // let iva = this.sumaIVA;
          let dif = resuelve - diferencia;
          this.diferencia = "faltan " + Math.abs(dif).toFixed(2);
          // nuevo = 0;
        } else {
          let resuelve = this.sumatotal;
          let diferencia = this.form.monto;
          let iva = this.sumaIVA;
          let porcentaje = parseFloat(
            ((nuevo / this.form.monto) * 100).toFixed(2)
          );
          if (resuelve == this.form.monto) {
            this.mensaje = true;
            this.mensajeok = "Datos correctos";
            this.items[index].range = porcentaje.toFixed(2);
          } else {
            this.mensaje = false;
            // Lo que falta aqui es sumar el IVA
            let dif = resuelve - diferencia;
            console.log(this.form.monto);
            console.log(resuelve);
            console.log(diferencia);
            console.log(dif);
            console.log(iva);
            if (dif > 0) {
              this.diferencia = "Sobran " + dif.toFixed(2);
            } else {
              this.diferencia = "Faltan  " + Math.abs(dif).toFixed(2);
            }
            this.items[index].range = porcentaje.toFixed(2);
          }
        }
      } else {
        this.resetrow(index);
      }
    },
    seteamonto(monto, index) {
      this.items[index].monto = monto;
    },
    resetrow(index) {
      this.items[index].monto = "";
      this.items[index].range = "";
      // this.mensajeok = "En balance 2";
    },
    validaentrada(val) {
      console.log(val);
      let nuevo = parseFloat(val);
      if (isNaN(nuevo)) {
        return false;
      } else {
        return true;
      }
    },
    // Esta funcion ya no se va usar
    validaporcentajein(val, index) {
      if (val.length >= 6) {
        return false;
      }
      let nuevo = parseFloat(val);
      if (this.validaentrada(nuevo, index)) {
        if (nuevo < 0 || nuevo > 100) {
          this.resetrow(index);
          return false;
        } else {
          let numero = (this.form.monto / 100) * nuevo;
          let iva = (numero * this.form.iva) / 100;
          this.items[index].iva = iva;
          this.items[index].bruto = numero.toFixed(2);
          this.items[index].monto = numero + iva;
          let resuelve = this.sumatotal;
          if (resuelve == this.form.montoNeto) {
            this.mensaje = true;
            this.mensajeok = "Todo Listo";
          } else {
            this.mensaje = false;
            let dif = resuelve - this.form.montoNeto;
            if (dif > 0) {
              this.mensajealert = "verifica el monto total ";
              this.diferencia = "sobran " + dif.toFixed(2);
            } else {
              this.mensajealert = "verifica el monto total";
              this.diferencia = "faltan " + Math.abs(dif).toFixed(2);
            }
          }
        }
      } else {
        this.resetrow(index);
      }
    },
    validamail() {
      let cadena = this.email;
      let regExMail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      if (regExMail.test(cadena.value)) {
        console.log("correcto");
      } else {
        console.log("incorrecto");
      }
    }
  },
  computed: {
    ...mapState(["darkMode"]),
    dates() {
      return this.days.map(day => day.date);
    },
    attributes() {
      return this.dates.map(date => ({
        highlight: true,
        dates: date
      }));
    },
    // Iteams de la tabla
    items() {
      let auxiliar = [];
      this.form.modalidad == 1
        ? (this.isDisable = true)
        : (this.isDisable = false);
      if (!Array.isArray(this.form.seleccionAmigo)) {
        let newObj = {};
        newObj.name = this.form.seleccionAmigo.email;
        newObj.id = this.form.seleccionAmigo.id;
        newObj.range = 100;
        newObj.bruto = this.form.monto;
        newObj.iva = this.form.iva;
        newObj.monto = this.form.montoNeto;
        auxiliar[0] = newObj;
        return auxiliar;
      } else if (this.form.seleccionAmigo.length > 0) {
        switch (this.form.modalidad) {
          case 1:
            auxiliar = this.form.seleccionAmigo.map(elem => {
              let newObj = {};
              newObj.name = elem.email;
              newObj.id = elem.id;
              newObj.range = 100;
              newObj.bruto = this.form.monto;
              newObj.iva = this.form.iva;
              newObj.monto = this.form.montoNeto;
              return newObj;
            });
            console.log(auxiliar);
            return auxiliar;
          case 2:
            auxiliar = this.form.seleccionAmigo.map(elem => {
              let newObj = {};
              newObj.name = elem.email;
              newObj.id = elem.id;
              newObj.range = 100;
              newObj.bruto = this.form.monto;
              newObj.iva = this.form.iva;
              newObj.monto = this.form.montoNeto;
              return newObj;
            });
            return (this.aux = auxiliar);
          case 3:
            auxiliar = this.form.seleccionAmigo.map(elem => {
              let newObj = {};
              newObj.name = elem.email;
              newObj.id = elem.id;
              newObj.range = (100 / this.form.seleccionAmigo.length).toFixed(2);
              newObj.bruto = (
                this.form.monto * parseFloat(newObj.range / 100)
              ).toFixed(2);
              newObj.iva = parseFloat(
                newObj.bruto * (this.form.iva / 100)
              ).toFixed(2);
              newObj.monto = (
                parseFloat(newObj.bruto) + parseFloat(newObj.iva)
              ).toFixed(2);
              return newObj;
            });
            return auxiliar;
        }
      }
    },
    sumatotal() {
      let resuelve = 0;
      for (let a = 0; a < this.items.length; a++) {
        if (this.items[a].monto > 0) {
          resuelve += parseFloat(this.items[a].monto);
        }
      }
      return resuelve;
    },
    sumaIVA() {
      // Este es el IVA que se esta aplicando ->  console.log(this.form.iva);
      // Este es el monto bruto
      // console.log(this.items[0].monto);
      let iva = 0;
      iva = (this.form.iva / 100) * this.items[0].monto;
      return iva;
    },
    validasuma() {
      if (this.items.length == 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    "form.modalidad"(newValue) {
      if (newValue == 1 && this.form.seleccionAmigo.length > 0) {
        this.form.seleccionAmigo = [];
        // this.form.seleccionAmigo = this.form.seleccionAmigo[0];
        // this.$emit("changePassOne");
        // console.log(this.form.empresaPropia);
      }
    }
  },
  validations: {
    form: {
      concepto: { required, minLength: minLength(7) },
      comentario: { required, minLength: minLength(7) },
      monto: { required },
      iva: { required },
      seleccionAmigo: { required },
      modalidad: { required }
    }
  },
  async mounted() {
    // console.log("lo que sea");
    await this.getUsuarios();
    await this.getEmpresas();
    await this.getEmpresasExt();
    // await this.getmycuentas();
    // await this.getCuentas();
    await this.getProjects();
    await this.getMonedas();
    this.fecha();
  }
};
</script>

<style scoped>
/* #btn-radios-2 {
} */
/* h4{
  filter: droop-shadow(15px 15px 10px orchild);
} */
</style>

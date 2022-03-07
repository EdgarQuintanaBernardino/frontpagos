<template>
  <b-row>
    <b-col cols="12" class="text-center">
      <label class=" ">**Campos Opcionales**</label>
    </b-col>

    <div class="text-center col-lg-6 col-xs-12">
      <div class="text-center mt-1 col-xs-12">
        <!-- <b-col cols="6" class="text-center mt-1 col-xs-12"> -->
        <label><h4>Etiqueta tu egreso</h4></label>
        <!-- </b-col> -->
      </div>
      <b-form-tags
      input-id="tags-pills"
      v-model="form.optionsTagIngreso"
      tag-variant="success"
      tag-pills
      size="md"
      separator=" "
      placeholder="Etiqueta tu egreso"
    ></b-form-tags>
    </div>
    <div class="text-center col-lg-6 col-xs-12">
      <div class="text-center mt-1 col-xs-12">
        <!-- <b-col cols="6" class="text-center mt-1 col-xs-12"> -->
        <label><h5>Proyecto al que se destina el pago</h5></label>
        <!-- </b-col> -->
      </div>
      <b-form-select
        v-model="form.proyecto"
        :options="optionsProyecto"
        class="font-weight-bold"
        :style="darkMode ? 'background-color:#393a42' : null"
      ></b-form-select>
    </div>

    <!-- <b-col cols="6" class="text-center mt-1">
      <label><h4 class=" ">Etiqueta tu egreso</h4></label>
    </b-col> -->
    <!-- <b-col cols="6" class="text-center mt-1">
      <label
        ><h5 class="  font-weight-bold">
          Proyecto al que se destina el pago
        </h5></label
      >
    </b-col> -->
    <!--Input de link de pago-->

    <!-- <b-col cols="6" class="text-center">
      <b-form-tags
      input-id="tags-pills"
      v-model="form.optionsTagIngreso"
      tag-variant="success"
      tag-pills
      size="md"
      separator=" "
      placeholder="Etiqueta tu egreso"
    ></b-form-tags>
    </b-col> -->

    <!-- <b-col cols="12" class="text-center">
      <multiselect
        v-model="form.tagIngreso"
        tag-placeholder="Agregar nuevo"
        placeholder="Etiqueta tu egreso"
        label="name"
        track-by="code"
        :options="optionsTagIngreso"
        default="Ingresa Etiqueta"
        :multiple="true"
        :taggable="true"
        @tag="addTag2"
        class="h2"
      ></multiselect>
    </b-col> -->


    <!-- <b-col cols="6" class="text-center">
      <b-form-select
        v-model="form.proyecto"
        :options="optionsProyecto"
        class="font-weight-bold"
      ></b-form-select>
    </b-col> -->
    <div class="text-center col-lg-6 col-xs-12">
      <div class="text-center mt-1 col-xs-12">
        <!-- <b-col cols="6" class="text-center mt-1 col-xs-12"> -->
        <label><h5>Links de Pago</h5></label>
        <!-- </b-col> -->
      </div>
      <div class="d-flex">
      <b-form-input
        id="input-live"
        v-model="link"
        v-on:keyup.enter="addlink"
        aria-describedby="input-live-help input-live-feedback"
        placeholder="Ingresa link de pago"
        trim
        key
      ></b-form-input>
      <b-button variant="outline-primary" @click.prevent="addlink()"
        >+</b-button
      >
      </div>
    </div>

    <div class="text-center col-lg-6 col-xs-12">
      <div class="text-center mt-1 col-xs-12">
        <!-- <b-col cols="6" class="text-center mt-1 col-xs-12"> -->
        <label><h5>Fecha límite de pago</h5></label>
        <!-- </b-col> -->
      </div>
      <b-form-datepicker
        id="datepicker-full-width"
        menu-class="w-100"
        calendar-width="100%"
        locale="es-MX"
        class="mb-2"
        :min="minimo"
        v-model="form.fechaLimite"
      ></b-form-datepicker>
    </div>

    <!-- <b-col cols="6" class="text-center mt-3">
      <label><h4 class=" ">Links de Pago</h4></label>
    </b-col> -->
    <!-- <b-col cols="6" class="text-center mt-3">
      <label><h4 class=" ">Fecha límite de pago</h4></label>
    </b-col> -->

    <!-- <b-col cols="5">
      <b-form-input
        id="input-live"
        v-model="link"
        v-on:keyup.enter="addlink"
        aria-describedby="input-live-help input-live-feedback"
        placeholder="Ingresa link de pago"
        trim
        key
      ></b-form-input>
    </b-col>
    <b-col cols="1">
      <b-button variant="outline-primary" @click.prevent="addlink()"
        >+</b-button
      >
    </b-col> -->
    <!-- <b-col cols="6" class="text-center">
      <b-form-datepicker
        id="datepicker-full-width"
        menu-class="w-100"
        calendar-width="100%"
        locale="es-MX"
        class="mb-2"
        :min="minimo"
        v-model="form.fechaLimite"
      ></b-form-datepicker>
    </b-col> -->
    <b-col cols="12">
      <b-list-group>
        <b-list-group-item
          class="d-flex justify-content-between align-items-center"
          v-for="item in form.links"
          :key="item"
        >
          <b-link :href="item" target="_blank">{{ item }}</b-link>
          <b-button variant="outline-danger" @click.prevent="eliminalink(item)"
            >Eliminar</b-button
          >
        </b-list-group-item>
      </b-list-group>
    </b-col>
  <!--RECURRENCIA-->
    <b-col cols="6 mt-2">
        <!-- <label class="d-block bg-primary"> -->
          <h4
            class="  text-right"
            style="padding-top: 10px; padding-bottom: 10px float: right"
          >
            Solicitar Factura
          </h4>
        <!-- </label> -->
      </b-col>
      <b-col cols="6 mt-3">
        <b-form-group>
          <div style="font-size: 1.2em">
            <b-form-checkbox
              id="checkbox-1"
              v-model="status"
              name="checkbox-1"
              @change="resetitems"
              value="Si"
              unchecked-value="No"
              style="float: left"
              size="lg"
            >
              {{ status }}
            </b-form-checkbox>
          </div>
        </b-form-group>
      </b-col>
      <b-col v-if="form.solicitaFactura">
        <b-card>
          <b-col class="text-center">
            <label><h4>Datos de Factura</h4></label>
          </b-col>
          <b-row>
            <div class="text-center col-lg-6 col-xs-12">
              <div class="text-center mt-1 col-xs-12">
                <label><h4>Código de Facturación</h4></label>
              </div>
              <b-form-input v-model="form.codigoFacturacion" placeholder="Código de facturación"></b-form-input>
            </div>
            <div class="text-center col-lg-6 col-xs-12">
              <div class="text-center mt-1 col-xs-12">
                <label><h4>Uso de CFDI</h4></label>
              </div>
              <b-form-select v-model="form.usoDeCFDI" :options="optionsUsoCFDI" :style="darkMode ? 'background-color:#393a42' : null"></b-form-select>
            </div>
            <!-- <b-col cols="6" class="text-center">
              <label><h4>Código de facturación</h4></label>
            </b-col> -->
            <!-- <b-col cols="6" class="text-center">
              <label><h4>Uso de CFDI</h4></label>
            </b-col> -->
            <!-- <b-col cols="6" class="text-center">
              <b-form-input v-model="form.codigoFacturacion" placeholder="Código de facturación"></b-form-input>
            </b-col> -->
            <!-- <b-col cols="6" class="text-center">
              <b-form-select v-model="form.usoDeCFDI" :options="optionsUsoCFDI"></b-form-select>
            </b-col> -->
            <b-col cols="12" class="text-center mt-3">
              <label><h4>Método de pago</h4></label>
            </b-col>
            <b-col cols="12" class="text-center">
              <b-form-select v-model="form.metodoPago" :options="optionsMetodoPago" :style="darkMode ? 'background-color:#393a42' : null"></b-form-select>
            </b-col>
            <b-col cols="12" class="text-center mt-3">
              <label><h4>Forma de pago</h4></label>
            </b-col>
            <b-col cols="12" class="text-center">
              <b-form-select v-model="form.formaPago" :options="optionsFormaPago" :style="darkMode ? 'background-color:#393a42' : null"></b-form-select>
            </b-col>

            <div class="text-center col-lg-6 col-xs-12 mt-3">
              <div class="text-center mt-1 col-xs-12">
                <label><h4>Banco de cuenta de retiro</h4></label>
              </div>
              <b-form-select v-model="form.bancoCuentaRetiro" :options="optionsBancoCuentaRetiro" :style="darkMode ? 'background-color:#393a42' : null"></b-form-select>
            </div>
            <div class="text-center col-lg-6 col-xs-12 mt-3">
              <div class="text-center mt-1 col-xs-12">
                <label><h5>Últimos 4 dígitos cuenta de retiro</h5></label>
              </div>
              <b-form-input v-model="form.digitosFinales" placeholder="Últimos 4 dígitos cuenta de retiro"></b-form-input>
            </div>



            <!-- <b-col cols="6" class="text-center mt-3">
              <label><h4>Banco de cuenta de retiro</h4></label>
            </b-col> -->
            <!-- <b-col cols="6" class="text-center mt-3">
              <label><h5>Últimos 4 dígitos cuenta de retiro</h5></label>
            </b-col> -->
            <!-- <b-col cols="6" class="text-center">
              <b-form-select v-model="form.bancoCuentaRetiro" :options="optionsBancoCuentaRetiro"></b-form-select>
            </b-col> -->
            <!-- <b-col cols="6" class="text-center">
              <b-form-input v-model="form.digitosFinales" placeholder="Últimos 4 dígitos cuenta de retiro"></b-form-input>
            </b-col> -->
            <b-col cols="12" class="text-center mt-3">
              <label><h4>Concepto</h4></label>
            </b-col>
            <b-col cols="12" class="text-center">
              <b-form-input v-model="form.concepto" placeholder="Concepto"></b-form-input>
            </b-col>
            <b-col cols="12" class="text-center mt-3">
              <label><h4>Comentario cliente</h4></label>
            </b-col>
            <b-col cols="12" class="text-center">
              <b-form-textarea
                id="textarea-rows"
                placeholder="Comentario"
                rows="2"
                v-model="form.comentario"
              ></b-form-textarea>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col cols="12" class="text-center mt-1">
        <label><h4 class=" ">Sube tus archivos</h4></label>
      </b-col>
      <b-col cols="12" class="text-center mt-1">
        <b-form-file
         v-model="file1"
         :state="Boolean(file1)"
         placeholder="Seleccionar..."
         drop-placeholder="Drop file here..."
        ></b-form-file>
      </b-col>

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
          </b-container>
        </b-col>
      </b-row>
    </div>
  </b-row>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import Calendar from "v-calendar/lib/components/calendar.umd";
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";
import "regenerator-runtime/runtime";
import vue2Dropzone from "vue2-dropzone";
import alertas from "@/assets/repositoriosjs/alertas";
import repocreate from "@/assets/repositoriosjs/repoupdateprofileuser.js";
import moment from "moment";

import { mapState } from "vuex";

export default {
  data() {
    return {
      form: {
        tagIngreso: [],
        proyecto: null,
        links: [],
        solicitaFactura: false,
        fechaInicio: "",
        fechaFin: "",
        tiempo: "",
        codigoFacturacion: "",
        usoDeCFDI: null,
        metodoPago: null,
        formaPago: null,
        bancoCuentaRetiro: null,
        digitosFinales: "",
        concepto: "",
        comentario: "",
      },
      //opciones de uso de CFDI
      optionsUsoCFDI: [
        { value: null, text: "Please select an option", disabled: true },
        { value: "a", text: "CFDI 1" },
        { value: "b", text: "CFDI 2" },
      ],
      //Opciones de Metodo de pago
      optionsMetodoPago: [
        { value: null, text: "Please select an option", disabled: true },
        { value: "a", text: "Método Pago 1" },
        { value: "b", text: "Método Pago 2" },
      ],
      //oopciones de forma de pago
      optionsFormaPago: [
        { value: null, text: "Please select an option", disabled: true },
        { value: "a", text: "Forma Pago 1" },
        { value: "b", text: "Forma Pago 2" },
      ],
      //opciones de banco de cuenta de retiro
      optionsBancoCuentaRetiro: [
        { value: null, text: "Please select an option", disabled: true },
        { value: "a", text: "Banco Cuenta 1" },
        { value: "b", text: "Banco Cuenta 2" },
      ],

      file1: [],
      status: "No",
      minimo: "2021-08-25",
      checked: true,
      link: "",
      //value2: [{ name: "Javascript", code: "js" }],
      optionsTagIngreso: [],
      days: [],
      items: [],
      total: 0,
      // currentPage: 1,
      perpage: 10,
      filasmostradas: 10,
      // //Data de archivos
      // cuentafactura: 2,
      // cuentacotizacion: 1,
      // cuentaorden: 1,
      // cuentacomprobante: 1,
      // cuentaextras: 3,
      // comprobantes: [],
      // extras: [],
      // ordenes: [],
      // mensajefactura:
      //   '<h4 style=""><strong>PDF O XML</strong></h4> <span>Máximo 1mb*<span> <br> Máximo 2 archivos*',
      // facturas: [],
      // cotizaciones: [],
      // upload: false,
      // dropzoneOptionsfactura: {
      //   url: this.$apiAdress + "/api/pagos/factura",
      //   thumbnailWidth: 150,
      //   maxFilesize: 1.0,
      //   headers: { Authorization: `Bearer ${this.$store.getters.gettoken}` },
      //   addRemoveLinks: true,
      //   dictDefaultMessage:
      //     '<h4 style=""><strong>PDF Y/O XML</strong></h4> <span>Máximo 1mb*<span> <br> Máximo 2 archivos*',
      //   dictInvalidFileType: "tipo",
      //   parallelUploads: 1,
      //   maxFiles: 2,
      //   acceptedFiles: "application/pdf,text/xml",
      // },
      // dropzoneOptionscotizacion: {
      //   url: this.$apiAdress + "/api/pagos/factura",
      //   thumbnailWidth: 150,
      //   maxFilesize: 1.0,
      //   headers: { Authorization: `Bearer ${this.$store.getters.gettoken}` },
      //   addRemoveLinks: true,
      //   dictDefaultMessage:
      //     '<h4 style=""><strong>Archivos</strong></h4> <span>Máximo 1mb*<span> <br> Máximo 1 archivo* <br> <strong>Archivos permitidos </strong> .doc,.docx, xls,.xlsx, imágenes',
      //   dictInvalidFileType: "tipo",
      //   parallelUploads: 1,
      //   maxFiles: 1,
      //   acceptedFiles: "application/pdf,.doc,.docx,.xls,.xlsx,image/*", ////imagenes ///doc y excel
      // },
      // dropzoneOptionsextras: {
      //   url: this.$apiAdress + "/api/pagos/factura",
      //   thumbnailWidth: 150,
      //   maxFilesize: 1.0,
      //   headers: { Authorization: `Bearer ${this.$store.getters.gettoken}` },
      //   addRemoveLinks: true,
      //   dictDefaultMessage:
      //     '<h4 style=""><strong>Archivos</strong></h4> <span>Máximo 1mb*<span> <br> Máximo 3 archivos* <br> <strong>Archivos permitidos </strong> .doc,.docx, xls,.xlsx, imágenes',
      //   dictInvalidFileType: "tipo",
      //   parallelUploads: 1,
      //   maxFiles: 3,
      //   acceptedFiles: "application/pdf,.doc,.docx,.xls,.xlsx,image/*", ////imagenes ///doc y excel
      // },
      // selected: 4,
      // optionstipos: [
      //   { tipo: "Factura", id: 1 },
      //   { tipo: "Orden de Compra", id: 2 },
      //   { tipo: "Comprobante de Pago", id: 3 },
      //   { tipo: "Cotización", id: 4 },
      // ],
      // form: {
      //   pdf: {},
      //   xml: {},
      //   imagen: {},
      //   word: {},
      //   excel: {},
      // },
      //Opciones para 'Proyecto al que se destina el pago

      optionsProyecto: [
        { value: null, text: "Selecciona un proyecto", disabled: true },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Selected Option" },
        { value: "d", text: "This one is disabled" },
      ],
    };
  },
  methods: {
    resetitems() {
      // this.items = [];
      // this.days = [];
      // this.fecha();
      // this.calculapagos(this.form.recurrencia.tipo);
      this.form.solicitaFactura = !this.form.solicitaFactura;
    },
    addTag2(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      };
      this.optionsTagIngreso.push(tag);
      this.form.tagIngreso.push(tag);
    },
    //inicio funciones links
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
    eliminalink(item) {
      this.form.links = this.form.links.filter((itemin) => itemin != item);
    },
    addlink() {
      if (this.link == "") {
        return false;
      }

      if (this.encontrado(this.link)) {
        this.form.links.push(this.link);
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Link ya agregado",
          showConfirmButton: false,
          timer: 1000,
        });
      }

      this.link = "";
    },
    //Fin funciones links

    onDayClick(day) {
      const idx = this.days.findIndex((d) => d.id === day.id);
      if (idx >= 0) {
        this.days.splice(idx, 1);
      } else {
        this.days.push({
          id: day.id,
          date: day.date,
        });
      }
      this.dias();
    },
    dias() {
      this.items = [];
      let dias = [];
      for (let a = 0; a < this.days.length; a++) {
        let cortar = this.days[a].id.split("-");
        dias.push(cortar[2]);
      }
      let contador = 0;
      for (let a = 1; a <= this.diferencia(); a++) {
        let fechain = this.conviertefecha(
          moment(this.form.fechaInicio).add(a, "d").format("l")
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
              Fecha: moment(
                this.conviertefecha(
                  moment(this.form.fechaInicio).add(a, "d").format("l")
                )
              )
                .format("LLLL")
                .slice(0, -4),
            };
            this.items.push(objet);
          }
        }
        this.total = this.items.length;
      }
    },
    mensual() {
      this.items = [];
      for (let a = 1; a <= this.diferenciames(); a++) {
        let fechain = this.conviertefecha(
          moment(this.form.fechaInicio).add(a, "M").format("l")
        );
        let objet = {
          Pago: a,
          Tipo: "Mensual",
          Fechainterna: fechain,
          Fecha: moment(
            this.conviertefecha(
              moment(this.form.fechaInicio).add(a, "M").format("l")
            )
          )
            .format("LLLL")
            .slice(0, -4),
        };
        this.items.push(objet);
      }
      this.total = this.diferenciames();
    },
    anual() {
      this.items = [];
      for (let a = 1; a <= this.diferenciaanual(); a++) {
        let fechain = this.conviertefecha(
          moment(this.form.fechaInicio).add(a, "y").format("l")
        );
        let objet = {
          Pago: a,
          Tipo: "Anual",
          Fechainterna: fechain,
          Fecha: moment(
            this.conviertefecha(
              moment(this.form.fechaInicio).add(a, "y").format("l")
            )
          )
            .format("LLLL")
            .slice(0, -4),
        };
        this.items.push(objet);
      }
      this.total = this.diferenciaanual();
    },
    semestral() {
      this.items = [];
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
          Fecha: moment(
            this.conviertefecha(
              moment(this.form.fechaInicio)
                .add(a * 6, "M")
                .format("l")
            )
          )
            .format("LLLL")
            .slice(0, -4),
        };
        this.items.push(objet);
      }
      this.total = this.diferenciageneric(6);
    },
    trimestral() {
      this.items = [];
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
          Fecha: moment(
            this.conviertefecha(
              moment(this.form.fechaInicio)
                .add(a * 3, "M")
                .format("l")
            )
          )
            .format("LLLL")
            .slice(0, -4),
        };
        this.items.push(objet);
      }
      this.total = this.diferenciageneric(3);
    },
    bimestral() {
      this.items = [];
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
          Fecha: moment(
            this.conviertefecha(
              moment(this.form.fechaInicio)
                .add(a * 2, "M")
                .format("l")
            )
          )
            .format("LLLL")
            .slice(0, -4),
        };
        this.items.push(objet);
      }
      this.total = this.diferenciageneric(2);
    },
    semanal() {
      this.items = [];
      for (let a = 1; a <= this.diferenciasemana(); a++) {
        let fechain = this.conviertefecha(
          moment(this.form.fechaInicio).add(a, "w").format("l")
        );
        let objet = {
          Pago: a,
          Tipo: "Semanal",
          Fechainterna: fechain,
          Fecha: moment(
            this.conviertefecha(
              moment(this.form.fechaInicio).add(a, "w").format("l")
            )
          )
            .format("LLLL")
            .slice(0, -4),
        };
        this.items.push(objet);
      }
      this.total = this.diferenciasemana();
    },
    diario() {
      this.items = [];

      for (let a = 1; a <= this.diferencia(); a++) {
        let objet = {
          Pago: a,
          Tipo: "Diario",
          Fechainterna: this.conviertefecha(
            moment(this.form.fechaInicio).add(a, "d").format("l")
          ),
          Fecha: moment(
            this.conviertefecha(
              moment(this.form.fechaInicio).add(a, "d").format("l")
            )
          )
            .format("LLLL")
            .slice(0, -4),
        };
        this.items.push(objet);
      }
      this.total = this.diferencia();
    },
    calculapagos(val) {
      switch (val) {
        case "Diario":
          this.diario();
          break;
        case "Semanal":
          this.semanal();
          break;
        case "Mensual":
          this.mensual();
          break;
        case "Dias del Mes":
          this.dias();
          break;
        case "Bimestral":
          this.bimestral();
          break;
        case "Trimestral":
          this.trimestral();
          break;
        case "Semestral":
          this.semestral();
          break;
        case "Anual":
          this.anual();
          break;
        default:
      }
    },
    diferenciames() {
      let fecha1 = moment(this.form.recurrencia.inicia);
      let fecha2 = moment(this.form.recurrencia.tiempo);
      return fecha2.diff(fecha1, "M");
      //// retorna el año moment(fecha1).year();//
      //// te da el trimestre del mes enero feb y marzo =1 abril mayo junio =2 moment(fecha1).quarter();

      // retorna el mes comenzando en 0 enero  moment(fecha1).month(); //

      /// moment(fecha1).dayOfYear(); dia del año 120 124 etc.

      // return moment(fecha1).day();///// regresa el dia de la semana comenzando con 0 en domingo y terminando en 6 sabado

      // let fecha1=moment(this.form.recurrencia.inicia);
      //   let fecha2=moment(this.form.recurrencia.tiempo);
      //   return fecha2.diff(fecha1,'days');
    },
    diferencia() {
      let fecha1 = moment(this.form.fechaInicio);
      let fecha2 = moment(this.form.tiempo);
      return fecha2.diff(fecha1, "days");
    },

    conviertefecha($fecha) {
      let conviert = $fecha.split("/");
      return conviert[2] + "-" + conviert[1] + "-" + conviert[0];
    },

    //funciones de archivos
    removeFile(file, xhr, error) {},
    vqueueComplete(file, xhr, formData) {
      //  this.queueComplete = true
      // window.toastr.success('', 'Event : vdropzone-queue-complete')
    },
    async errorservidor(archivo, mensaje, xhr) {
      let alert = alertas();

      alert.filenotvalidorsize();
      this.upload = false;
      //  mensaje.message=='Token Signature could not be verified.'
      //  ||mensaje.message =='Token has expired'
      //  ?alertas.errortoken():alertas.imagenotvalid()
    },
    async errorfactura(archivo, mensaje, xhr) {
      let alert = alertas();
      alert.filenotvalidorsize();
      this.upload = false;
      //  mensaje.message=='Token Signature could not be verified.'
      //  ||mensaje.message =='Token has expired'
      //  ?alertas.errortoken():alertas.imagenotvalid()
    },
    addfileokcp() {
      this.upload = false;

      this.cuentacomprobante--;
      let mensaje =
        '<h4 style=""><strong>Archivos</strong></h4> <span>Máximo 1mb*<span> <br> Máximo ' +
        this.cuentacomprobante +
        " archivo(s)*";
      if (this.cuentacomprobante <= 0) {
        this.$refs.dzcomprobante.disable();
        mensaje =
          '<h4 style=""><strong>Llegaste al límite de archivos</strong></h4>';
      }
      let msj = document
        .getElementById("dcomprobante")
        .getElementsByClassName("dz-message"); /////  selector js, la documentación no funciona
      msj[0].innerHTML = mensaje;
    },
    addfileoko() {
      this.upload = false;

      this.cuentaorden--;
      let mensaje =
        '<h4 style=""><strong>Archivos</strong></h4> <span>Máximo 1mb*<span> <br> Máximo ' +
        this.cuentaorden +
        " archivo(s)*";
      if (this.cuentaorden <= 0) {
        this.$refs.dzorden.disable();
        mensaje =
          '<h4 style=""><strong>Llegaste al límite de archivos</strong></h4>';
      }
      let msj = document
        .getElementById("dorden")
        .getElementsByClassName("dz-message"); /////  selector js, la documentación no funciona
      msj[0].innerHTML = mensaje;
    },
    addfileok() {
      this.upload = false;

      this.cuentafactura--;
      let mensaje =
        '<h4 style=""><strong>PDF Y/O XML</strong></h4> <span>Máximo 1mb*<span> <br> Máximo ' +
        this.cuentafactura +
        " archivo(s)*";
      if (this.cuentafactura <= 0) {
        this.$refs.dzfactura.disable();
        mensaje =
          '<h4 style=""><strong>Llegaste al límite de archivos</strong></h4>';
      }
      let msj = document
        .getElementById("dfactura")
        .getElementsByClassName("dz-message"); /////  selector js, la documentación no funciona
      msj[0].innerHTML = mensaje;
    },

    addfileokc() {
      this.upload = false;

      this.cuentacotizacion--;
      let mensaje =
        '<h4 style=""><strong>Archivos</strong></h4> <span>Máximo 1mb*<span> <br> Máximo ' +
        this.cuentacotizacion +
        " archivo(s)*";
      if (this.cuentacotizacion <= 0) {
        this.$refs.dzcotizacion.disable();
        mensaje =
          '<h4 style=""><strong>Llegaste al límite de archivos</strong></h4>';
      }
      let msj = document
        .getElementById("dcotizacion")
        .getElementsByClassName("dz-message"); /////  selector js, la documentación no funciona
      msj[0].innerHTML = mensaje;
    },
    addfileokextras() {
      this.upload = false;

      this.cuentaextras--;
      let mensaje =
        '<h4 style=""><strong>Archivos</strong></h4> <span>Máximo 1mb*<span> <br> Máximo ' +
        this.cuentaextras +
        " archivo(s)*";
      if (this.cuentaextras <= 0) {
        this.$refs.dzextras.disable();
        mensaje =
          '<h4 style=""><strong>Llegaste al límite de archivos</strong></h4>';
      }
      let msj = document
        .getElementById("dextras")
        .getElementsByClassName("dz-message"); /////  selector js, la documentación no funciona
      msj[0].innerHTML = mensaje;
    },
    async afterupload(file) {},
    vsuccess(file, response) {
      try {
        //  console.log(response)
        let result = alertas();
        this.$refs.dzfactura.removeFile(file);

        switch (response.response) {
          case 2:
            result.fileaun(this.cuentafactura - 1);
            this.facturas.push(response);
            this.addfileok();
            break;
          case 1:
            result.fileexist(response);
            break;
          case 0:
            result.limit();
            break;
          default:
          // code block
        }

        //  this.$store.commit('setfoto',response);

        // const fotostorage=localstorage();
        //   fotostorage.setphoto(response);
      } catch (error) {
        // console.log(error)
      } finally {
        this.upload = false;
      }

      // window.toastr.success('', 'Event : vdropzone-success')
    },
    vsuccesscotizacion(file, response) {
      try {
        //  console.log(response)
        let result = alertas();
        this.$refs.dzcotizacion.removeFile(file);

        switch (response.response) {
          case 2:
            result.fileaun(this.cuentacotizacion - 1);
            this.cotizaciones.push(response);
            this.addfileokc();
            break;
          case 1:
            result.fileexist(response);
            break;
          case 0:
            result.limit();
            break;
          default:
          // code block
        }

        //  this.$store.commit('setfoto',response);

        // const fotostorage=localstorage();
        //   fotostorage.setphoto(response);
      } catch (error) {
        // console.log(error)
      } finally {
        this.upload = false;
      }

      // window.toastr.success('', 'Event : vdropzone-success')
    },
    vsuccessorden(file, response) {
      try {
        let result = alertas();
        this.$refs.dzorden.removeFile(file);

        switch (response.response) {
          case 2:
            result.fileaun(this.cuentaorden - 1);
            this.ordenes.push(response);
            this.addfileoko();
            break;
          case 1:
            result.fileexist(response);
            break;
          case 0:
            result.limit();
            break;
          default:
          // code block
        }

        //  this.$store.commit('setfoto',response);

        // const fotostorage=localstorage();
        //   fotostorage.setphoto(response);
      } catch (error) {
        // console.log(error)
      } finally {
        this.upload = false;
      }

      // window.toastr.success('', 'Event : vdropzone-success')
    },
    vsuccesscomprobante(file, response) {
      try {
        let result = alertas();
        this.$refs.dzcomprobante.removeFile(file);

        switch (response.response) {
          case 2:
            result.fileaun(this.cuentacomprobante - 1);
            this.comprobantes.push(response);
            this.addfileokcp();
            break;
          case 1:
            result.fileexist(response);
            break;
          case 0:
            result.limit();
            break;
          default:
          // code block
        }

        //  this.$store.commit('setfoto',response);

        // const fotostorage=localstorage();
        //   fotostorage.setphoto(response);
      } catch (error) {
        // console.log(error)
      } finally {
        this.upload = false;
      }

      // window.toastr.success('', 'Event : vdropzone-success')
    },
    vsuccessextras(file, response) {
      try {
        let result = alertas();
        this.$refs.dzextras.removeFile(file);

        switch (response.response) {
          case 2:
            result.fileaun(this.cuentaextras - 1);
            this.extras.push(response);
            this.addfileokextras();
            break;
          case 1:
            result.fileexist(response);
            break;
          case 0:
            result.limit();
            break;
          default:
          // code block
        }

        //  this.$store.commit('setfoto',response);

        // const fotostorage=localstorage();
        //   fotostorage.setphoto(response);
      } catch (error) {
        // console.log(error)
      } finally {
        this.upload = false;
      }

      // window.toastr.success('', 'Event : vdropzone-success')
    },
    sendingEvent(file, xhr, formData) {
      let tipo = file.type.split("/");
      // console.log(tipo)
      // console.log(this.$parent.$parent.$parent.$parent.$parent.$parent.form.inicio.id)
      formData.append(
        "idsolicitud",
        this.$parent.$parent.$parent.$parent.$parent.$parent.form.inicio.id
      );
      console.log(
        this.$parent.$parent.$parent.$parent.$parent.$parent.form.inicio.id
      );
      //  formData.append('idsolicitud',1);//// solicitud madre
      formData.append("tipo", "Factura");
      formData.append("formato", tipo[1]); ///xml o pdf
      formData.append("idtipo", 1); ///1= factura
      formData.append("nameoriginal", file.name.substring(0, 18)); //1 //3

      formData.append("permitido", ["xml", "pdf"]);
      formData.append("maxpermitido", 2); //1 //3
      formData.append("iguales", 0); ///// valor para determinar si de maxpermitidos se pueden hacer 2 del mismo o 1 y 1  ///0
    },
    sendingEventcotizacion(file, xhr, formData) {
      let tipo = file.type.split("/");
      if (tipo[0] == "image") {
        tipo[1] = tipo[0];
      }
      if (tipo[0] == "application") {
        let cortar = file.name.split(".");
        tipo[1] = cortar[1];
      }

      formData.append(
        "idsolicitud",
        this.$parent.$parent.$parent.$parent.$parent.$parent.form.inicio.id
      );
      //  formData.append('idsolicitud',1);//// solicitud madre
      formData.append("tipo", "Cotizacion");
      formData.append("formato", tipo[1]); ///xml o pdf
      formData.append("idtipo", 4); ///1= factura
      formData.append("nameoriginal", file.name.substring(0, 18)); //1 //3
      formData.append("permitido", [
        "pdf",
        "doc",
        "docx",
        "xlsx",
        "image",
        "xls",
      ]);
      formData.append("maxpermitido", 1); //1 //3
      formData.append("iguales", 1); ///// valor para determinar si de maxpermitidos se pueden hacer 2 del mismo o 1 y 1  ///0
    },
    sendingEventorden(file, xhr, formData) {
      let tipo = file.type.split("/");
      if (tipo[0] == "image") {
        tipo[1] = tipo[0];
      }
      if (tipo[0] == "application") {
        let cortar = file.name.split(".");
        tipo[1] = cortar[1];
      }

      formData.append(
        "idsolicitud",
        this.$parent.$parent.$parent.$parent.$parent.$parent.form.inicio.id
      );
      //  formData.append('idsolicitud',1);//// solicitud madre
      formData.append("tipo", "Orden de Compra");
      formData.append("formato", tipo[1]); ///xml o pdf
      formData.append("idtipo", 2); ///orden de compra
      formData.append("permitido", [
        "pdf",
        "doc",
        "docx",
        "xlsx",
        "image",
        "xls",
      ]);
      formData.append("maxpermitido", 1); //1 //3
      formData.append("nameoriginal", file.name.substring(0, 18)); //1 //3

      formData.append("iguales", 1); ///// valor para determinar si de maxpermitidos se pueden hacer 2 del mismo o 1 y 1  ///0
    },
    sendingEventcomprobante(file, xhr, formData) {
      let tipo = file.type.split("/");
      if (tipo[0] == "image") {
        tipo[1] = tipo[0];
      }
      if (tipo[0] == "application") {
        let cortar = file.name.split(".");
        tipo[1] = cortar[1];
      }

      formData.append(
        "idsolicitud",
        this.$parent.$parent.$parent.$parent.$parent.$parent.form.inicio.id
      );
      //  formData.append('idsolicitud',1);//// solicitud madre
      formData.append("tipo", "Comprobante de Pago");
      formData.append("formato", tipo[1]); ///xml o pdf
      formData.append("idtipo", 3); ///orden de compra
      formData.append("permitido", [
        "pdf",
        "doc",
        "docx",
        "xlsx",
        "image",
        "xls",
      ]);
      formData.append("maxpermitido", 1); //1 //3
      formData.append("nameoriginal", file.name.substring(0, 18)); //1 //3

      formData.append("iguales", 1); ///// valor para determinar si de maxpermitidos se pueden hacer 2 del mismo o 1 y 1  ///0
    },
    sendingEventextras(file, xhr, formData) {
      let tipo = file.type.split("/");
      if (tipo[0] == "image") {
        tipo[1] = tipo[0];
      }
      if (tipo[0] == "application") {
        let cortar = file.name.split(".");
        tipo[1] = cortar[1];
      }

      formData.append(
        "idsolicitud",
        this.$parent.$parent.$parent.$parent.$parent.$parent.form.inicio.id
      );
      //  formData.append('idsolicitud',1);//// solicitud madre
      formData.append("tipo", "Extras");
      formData.append("formato", tipo[1]); ///xml o pdf
      formData.append("idtipo", 5); ///orden de compra
      formData.append("permitido", [
        "pdf",
        "doc",
        "docx",
        "xlsx",
        "image",
        "xls",
      ]);
      formData.append("maxpermitido", 3); //1 //3
      formData.append("nameoriginal", file.name.substring(0, 18)); //1 //3

      formData.append("iguales", 1); ///// valor para determinar si de maxpermitidos se pueden hacer 2 del mismo o 1 y 1  ///0
    },
    cargando(totalProgress, totalBytes, totalBytesSent) {
      this.upload = true;
    },
    async deletefile(item) {
      //  console.log(item)

      let arrayreloj = [];
      item = Object.assign({}, item);
      await this.facturas.forEach((element) => {
        if (element.id == item.id) {
          element.reloj = true;
        }
        arrayreloj.push(element);
      });
      this.facturas = arrayreloj;
      await document.getElementById(item.id + "btn").remove();
      const repo = repocreate();
      try {
        await repo.deletefile(item).then((res) => {
          let resp = alertas();
          resp.filesuccess();
          this.facturas = this.facturas.filter(
            (element) => element.id != item.id
          );
          this.cuentafactura++;
          let mensaje =
            '<h4 style=""><strong>PDF Y/O XML</strong></h4> <span>Máximo 1mb*<span> <br> Máximo ' +
            this.cuentafactura +
            " archivo(s)*";
          if (this.cuentafactura <= 0) {
            this.$refs.dzfactura.disable();
            mensaje =
              '<h4 style=""><strong>Llegaste al límite de archivos</strong></h4>';
          } else {
            let msj = document.getElementsByClassName("dz-message"); /////  selector js, la documentación no funciona
            msj[0].innerHTML = mensaje;
            this.$refs.dzfactura.enable();
          }
        });
      } catch (error) {
        // console.log(error);
      }
    },
    async deletefilec(item) {
      let arrayreloj = [];
      item = Object.assign({}, item);
      await this.cotizaciones.forEach((element) => {
        if (element.id == item.id) {
          element.reloj = true;
        }
        arrayreloj.push(element);
      });
      this.cotizaciones = arrayreloj;
      await document.getElementById(item.id + "btnc").remove();
      const repo = repocreate();
      try {
        await repo.deletefile(item).then((res) => {
          let resp = alertas();
          resp.filesuccess();
          this.cotizaciones = this.cotizaciones.filter(
            (element) => element.id != item.id
          );
          this.cuentacotizacion++;
          let mensaje =
            '<h4 style=""><strong>Archivos</strong></h4> <span>Máximo 1mb*<span> <br> Máximo ' +
            this.cuentacotizacion +
            " archivo(s)*";
          if (this.cuentacotizacion <= 0) {
            this.$refs.dzcotizacion.disable();
            mensaje =
              '<h4 style=""><strong>Llegaste al límite de archivos</strong></h4>';
          } else {
            let msj = document
              .getElementById("dcotizacion")
              .getElementsByClassName("dz-message"); /////  selector js, la documentación no funciona
            msj[0].innerHTML = mensaje;
            this.$refs.dzcotizacion.enable();
          }
        });
      } catch (error) {
        // console.log(error);
      }
    },
    async deletefilex(item) {
      let arrayreloj = [];
      item = Object.assign({}, item);
      await this.extras.forEach((element) => {
        if (element.id == item.id) {
          element.reloj = true;
        }
        arrayreloj.push(element);
      });
      this.extras = arrayreloj;
      await document.getElementById(item.id + "btnx").remove();
      const repo = repocreate();
      try {
        await repo.deletefile(item).then((res) => {
          let resp = alertas();
          resp.filesuccess();
          this.extras = this.extras.filter((element) => element.id != item.id);
          this.cuentaextras++;
          let mensaje =
            '<h4 style=""><strong>Archivos</strong></h4> <span>Máximo 1mb*<span> <br> Máximo ' +
            this.cuentaextras +
            " archivo(s)*";
          if (this.cuentaextras <= 0) {
            this.$refs.dzextras.disable();
            mensaje =
              '<h4 style=""><strong>Llegaste al límite de archivos</strong></h4>';
          } else {
            let msj = document
              .getElementById("dextras")
              .getElementsByClassName("dz-message"); /////  selector js, la documentación no funciona
            msj[0].innerHTML = mensaje;
            this.$refs.dzextras.enable();
          }
        });
      } catch (error) {
        // console.log(error);
      }
    },
    async deletefileo(item) {
      let arrayreloj = [];
      item = Object.assign({}, item);
      await this.ordenes.forEach((element) => {
        if (element.id == item.id) {
          element.reloj = true;
        }
        arrayreloj.push(element);
      });
      this.ordenes = arrayreloj;
      await document.getElementById(item.id + "btno").remove();
      const repo = repocreate();
      try {
        await repo.deletefile(item).then((res) => {
          let resp = alertas();
          resp.filesuccess();
          this.ordenes = this.ordenes.filter(
            (element) => element.id != item.id
          );
          this.cuentaorden++;
          let mensaje =
            '<h4 style=""><strong>Archivos</strong></h4> <span>Máximo 1mb*<span> <br> Máximo ' +
            this.cuentaorden +
            " archivo(s)*";
          if (this.cuentaorden <= 0) {
            this.$refs.dzorden.disable();
            mensaje =
              '<h4 style=""><strong>Llegaste al límite de archivos</strong></h4>';
          } else {
            let msj = document
              .getElementById("dorden")
              .getElementsByClassName("dz-message"); /////  selector js, la documentación no funciona
            msj[0].innerHTML = mensaje;
            this.$refs.dzorden.enable();
          }
        });
      } catch (error) {
        // console.log(error);
      }
    },
    async deletefilecp(item) {
      let arrayreloj = [];
      item = Object.assign({}, item);
      await this.comprobantes.forEach((element) => {
        if (element.id == item.id) {
          element.reloj = true;
        }
        arrayreloj.push(element);
      });
      this.comprobantes = arrayreloj;
      await document.getElementById(item.id + "btncp").remove();
      const repo = repocreate();
      try {
        await repo.deletefile(item).then((res) => {
          let resp = alertas();
          resp.filesuccess();
          this.comprobantes = this.comprobantes.filter(
            (element) => element.id != item.id
          );
          this.cuentacomprobante++;
          let mensaje =
            '<h4 style=""><strong>Archivos</strong></h4> <span>Máximo 1mb*<span> <br> Máximo ' +
            this.cuentacomprobante +
            " archivo(s)*";
          if (this.cuentacomprobante <= 0) {
            this.$refs.dzcomprobante.disable();
            mensaje =
              '<h4 style=""><strong>Llegaste al límite de archivos</strong></h4>';
          } else {
            let msj = document
              .getElementById("dcomprobante")
              .getElementsByClassName("dz-message"); /////  selector js, la documentación no funciona
            msj[0].innerHTML = mensaje;
            this.$refs.dzcomprobante.enable();
          }
        });
      } catch (error) {
        // console.log(error);
      }
    },
    //terminan funciones de archivos
  },
  components: {
    Multiselect,
    Swal,
    Calendar,
    Swal,
    vue2Dropzone,
  },
  computed: {
    ...mapState(["darkMode"]),
    dates() {
      return this.days.map((day) => day.date);
    },
    attributes() {
      return this.dates.map((date) => ({
        highlight: true,
        dates: date,
      }));
    },
  },
};
</script>

<style>
</style>

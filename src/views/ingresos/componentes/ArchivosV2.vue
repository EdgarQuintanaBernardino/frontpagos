<template>
  <div>
    <b-row v-if="solicitud != 0">
      <b-col cols="12">
        <b-container class="bv-example-row bv-example-row-flex-cols">
          <!--INICIAN LOS DROPZONE -->
          <b-row>
            <b-col cols="12" lg="4">
              <b-row>
                <b-col cols="12">
                  <label class="d-block" style="background-color:#2D4262">
                    <h5
                      class="text-white text-center"
                      style="padding-top:10px;padding-bottom:10px"
                    >
                      Factura
                    </h5>
                  </label>
                </b-col>
                <b-col cols="12">
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
                      style="border:dashed #20948B 2px;color:black"
                      @vdropzone-success="vsuccess"
                      @vdropzone-processing="cargando"
                      @vdropzone-sending="sendingEvent"
                      v-on:vdropzone-removed-file="removeFile"
                      :duplicateCheck="true"
                      @vdropzone-error="errorfactura"
                    >
                    </vue2Dropzone>
                  </b-overlay>
                </b-col>
                <b-col cols="12">
                  <b-container fluid>
                    <b-row>
                      <b-col
                        cols="6"
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
                              >
                              </b-icon>
                              <p id="cancel-label">Please wait...</p>
                            </div>
                          </template>
                          <a :href="item.url" target="_blank">
                            <img
                              src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/xml-file.png"
                              class=""
                              style="width:60px;;margin-bottom:1px"
                              v-b-tooltip.hover
                              :title="item.nameoriginal"
                              v-if="item.tipo == 'xml'"
                          /></a>
                          <a :href="item.url" target="_blank">
                            <img
                              src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/pdfimage.png"
                              class="ml-2 mb-1 mt-1"
                              style="width:45px; height:52px;"
                              v-b-tooltip.hover
                              :title="item.nameoriginal"
                              v-if="item.tipo == 'pdf'"
                          /></a>
                          <br />
                          <b-button
                            class="btn btn-danger ml-2"
                            d-block
                            sytle="display:block"
                            :id="item.id + 'btn'"
                            @click="deletefile(item)"
                          >
                            <b-icon
                              icon="trash-fill"
                              scale="1"
                              style="color:white;"
                            >
                            </b-icon>
                          </b-button>
                        </b-overlay>
                      </b-col>
                    </b-row>
                  </b-container>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="12" lg="4">
              <b-row>
                <b-col cols="12">
                  <label class="d-block" style="background-color:#2D4262">
                    <h5
                      class="text-white text-center"
                      style="padding-top:10px;padding-bottom:10px"
                    >
                      Cotización
                    </h5>
                  </label>
                </b-col>
                <b-col cols="12">
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
                      style="border:dashed #20948B 2px;color:black"
                      @vdropzone-success="vsuccesscotizacion"
                      @vdropzone-processing="cargando"
                      @vdropzone-sending="sendingEventcotizacion"
                      v-on:vdropzone-removed-file="removeFile"
                      :duplicateCheck="true"
                      @vdropzone-error="errorCotizacion"
                    >
                    </vue2Dropzone>
                  </b-overlay>
                </b-col>
                <b-col cols="12">
                  <b-container fluid>
                    <b-row>
                      <b-col
                        cols="12"
                        md="12"
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
                              >
                              </b-icon>
                              <p id="cancel-label">Please wait...</p>
                            </div>
                          </template>
                          <!-- <a
                            :href="item.url"
                            target="_blank"
                            v-if="item.tipo == 'pdf'"
                          >
                            <img
                              src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/pdfimage.png"
                              class="ml-2 mb-1 mt-1"
                              style="width:45px; height:52px;"
                            />{{ item.nameoriginal }}</a
                          > -->
                          <a
                            :href="item.url"
                            target="_blank"
                            v-if="
                              item.tipo == 'png' ||
                                item.tipo == 'jpg' ||
                                item.tipo == 'jpeg' ||
                                item.tipo == 'bmp'
                            "
                            class="ml-1"
                          >
                            <img
                              src="..\..\..\..\src\assets\img\imagenes.png"
                              class="ml-2 mb-1 mt-1"
                              style="width:45px; height:52px;"
                              v-b-tooltip.hover
                              :title="item.nameoriginal"
                          /></a>
                          <a
                            :href="item.url"
                            target="_blank"
                            v-if="item.tipo == 'docx' || item.tipo == 'doc'"
                            class="ml-1"
                          >
                            <img
                              src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/word.jpg"
                              class="ml-2 mb-1 mt-1"
                              style="width:45px; height:52px;"
                              v-b-tooltip.hover
                              :title="item.nameoriginal"
                          /></a>
                          <a
                            :href="item.url"
                            target="_blank"
                            v-if="item.tipo == 'xlsx' || item.tipo == 'xls'"
                            class="ml-1"
                          >
                            <img
                              src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/excel.png"
                              class="ml-2 mb-1 mt-1"
                              style="width:45px; height:52px;"
                              v-b-tooltip.hover
                              :title="item.nameoriginal"
                          /></a>
                          <br />
                          <b-button
                            class="btn btn-danger ml-2"
                            d-block
                            sytle="display:block"
                            :id="item.id + 'btnc'"
                            @click="deletefilec(item)"
                          >
                            <b-icon
                              icon="trash-fill"
                              scale="1"
                              style="color:white;"
                            >
                            </b-icon>
                          </b-button>
                        </b-overlay>
                      </b-col>
                    </b-row>
                  </b-container>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="12" lg="4">
              <b-row>
                <b-col cols="12">
                  <label class="d-block" style="background-color:#2D4262">
                    <h5
                      class="text-white text-center"
                      style="padding-top:10px;padding-bottom:10px"
                    >
                      Orden de Compra
                    </h5>
                  </label>
                </b-col>
                <b-col cols="12">
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
                      style="border:dashed #20948B 2px;color:black"
                      @vdropzone-success="vsuccessorden"
                      @vdropzone-complete="afterupload"
                      @vdropzone-queue-complete="vqueueComplete"
                      @vdropzone-processing="cargando"
                      @vdropzone-sending="sendingEventorden"
                      v-on:vdropzone-removed-file="removeFile"
                      :duplicateCheck="true"
                      @vdropzone-error="errorOrden"
                    >
                    </vue2Dropzone>
                  </b-overlay>
                </b-col>
                <b-col cols="12">
                  <b-container fluid>
                    <b-row>
                      <b-col
                        cols="12"
                        md="12"
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
                              >
                              </b-icon>
                              <p id="cancel-label">Please wait...</p>
                            </div>
                          </template>
                          <!-- <a
                            :href="item.url"
                            target="_blank"
                            v-if="item.tipo == 'pdf'"
                          >
                            <img
                              src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/pdfimage.png"
                              class="ml-2 mb-1 mt-1"
                              style="width:45px; height:52px;"
                            />{{ item.nameoriginal }}</a
                          > -->
                          <a
                            :href="item.url"
                            target="_blank"
                            v-if="
                              item.tipo == 'png' ||
                                item.tipo == 'jpg' ||
                                item.tipo == 'jpeg' ||
                                item.tipo == 'bmp'
                            "
                            class="ml-1"
                          >
                            <img
                              src="..\..\..\..\src\assets\img\imagenes.png"
                              class="ml-2 mb-1 mt-1"
                              style="width:45px; height:52px;"
                              v-b-tooltip.hover
                              :title="item.nameoriginal"
                          /></a>
                          <a
                            :href="item.url"
                            target="_blank"
                            v-if="item.tipo == 'docx' || item.tipo == 'doc'"
                            class="ml-1"
                          >
                            <img
                              src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/word.jpg"
                              class="ml-2 mb-1 mt-1"
                              style="width:45px; height:52px;"
                              v-b-tooltip.hover
                              :title="item.nameoriginal"
                          /></a>
                          <a
                            :href="item.url"
                            target="_blank"
                            v-if="item.tipo == 'xlsx' || item.tipo == 'xls'"
                            class="ml-1"
                          >
                            <img
                              src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/excel.png"
                              class="ml-2 mb-1 mt-1"
                              style="width:45px; height:52px;"
                              v-b-tooltip.hover
                              :title="item.nameoriginal"
                          /></a>
                          <b-row class="ml-2">
                            <b-button
                              class="btn btn-danger ml-2"
                              d-block
                              sytle="display:block"
                              :id="item.id + 'btno'"
                              @click="deletefileo(item)"
                            >
                              <b-icon
                                icon="trash-fill"
                                scale="1"
                                style="color:white;"
                              >
                              </b-icon>
                            </b-button>
                          </b-row>
                        </b-overlay>
                      </b-col>
                    </b-row>
                  </b-container>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="12" lg="4" style="padding:12px;">
              <b-row>
                <b-col cols="12">
                  <label class="d-block" style="background-color:#2D4262">
                    <h5
                      class="text-white text-center"
                      style="padding-top:10px;padding-bottom:10px"
                    >
                      Comprobante Pago
                    </h5>
                  </label>
                </b-col>
                <b-col cols="12">
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
                      style="border:dashed #20948B 2px;color:black"
                      @vdropzone-success="vsuccesscomprobante"
                      @vdropzone-complete="afterupload"
                      @vdropzone-queue-complete="vqueueComplete"
                      @vdropzone-processing="cargando"
                      @vdropzone-sending="sendingEventcomprobante"
                      v-on:vdropzone-removed-file="removeFile"
                      :duplicateCheck="true"
                      @vdropzone-error="errorComprobante"
                    >
                    </vue2Dropzone>
                  </b-overlay>
                </b-col>
                <b-col cols="12">
                  <b-container fluid>
                    <b-row>
                      <b-col
                        cols="12"
                        md="12"
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
                              >
                              </b-icon>
                              <p id="cancel-label">Please wait...</p>
                            </div>
                          </template>
                          <!-- <a
                            :href="item.url"
                            target="_blank"
                            v-if="item.tipo == 'pdf'"
                          >
                            <img
                              src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/pdfimage.png"
                              class="ml-2 mb-1 mt-1"
                              style="width:45px; height:52px;"
                            />{{ item.nameoriginal }}</a
                          > -->
                          <a
                            :href="item.url"
                            target="_blank"
                            v-if="
                              item.tipo == 'png' ||
                                item.tipo == 'jpg' ||
                                item.tipo == 'jpeg' ||
                                item.tipo == 'bmp'
                            "
                            class="ml-1"
                          >
                            <!-- :src="item.url" -->
                            <img
                              src="..\..\..\..\src\assets\img\imagenes.png"
                              class="ml-2 mb-1 mt-1"
                              style="width:45px; height:52px;"
                              v-b-tooltip.hover
                              :title="item.nameoriginal"
                          /></a>
                          <a
                            :href="item.url"
                            target="_blank"
                            v-if="item.tipo == 'docx' || item.tipo == 'doc'"
                            class="ml-1"
                          >
                            <img
                              src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/word.jpg"
                              class="ml-2 mb-1 mt-1"
                              style="width:45px; height:52px;"
                              v-b-tooltip.hover
                              :title="item.nameoriginal"
                          /></a>
                          <a
                            :href="item.url"
                            target="_blank"
                            v-if="item.tipo == 'xlsx' || item.tipo == 'xls'"
                            class="ml-1"
                          >
                            <img
                              src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/excel.png"
                              class="ml-2 mb-1 mt-1"
                              style="width:45px; height:52px;"
                              v-b-tooltip.hover
                              :title="item.nameoriginal"
                          /></a>
                          <b-row class="ml-2">
                            <b-button
                              class="btn btn-danger ml-2"
                              d-block
                              sytle="display:block"
                              :id="item.id + 'btncp'"
                              @click="deletefilecp(item)"
                            >
                              <b-icon
                                icon="trash-fill"
                                scale="1"
                                style="color:white;"
                              >
                              </b-icon>
                            </b-button>
                          </b-row>
                        </b-overlay>
                      </b-col>
                    </b-row>
                  </b-container>
                </b-col>
              </b-row>
            </b-col>
            <!-- seccion para machote y firmado -->
            <b-col cols="12" lg="4" style="padding:12px;">
              <b-row>
                <b-col cols="12">
                  <label class="d-block" style="background-color:#2D4262">
                    <h5
                      class="text-white text-center"
                      style="padding-top:10px;padding-bottom:10px"
                    >
                      Machote / Firmado
                    </h5>
                  </label>
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
                      ref="dzmachote"
                      id="dmachote"
                      :options="dropzoneOptionsMachote"
                      style="border:dashed #20948B 2px;color:black"
                      @vdropzone-success="vsuccessMachote"
                      @vdropzone-complete="afterupload"
                      @vdropzone-queue-complete="vqueueComplete"
                      @vdropzone-processing="cargando"
                      @vdropzone-sending="sendingEventMachote"
                      v-on:vdropzone-removed-file="removeFile"
                      :duplicateCheck="true"
                      @vdropzone-error="errorMachote"
                    >
                    </vue2Dropzone>
                  </b-overlay>
                </b-col>
                <b-col cols="12">
                  <b-container fluid>
                    <b-row>
                      <b-col
                        cols="12"
                        md="6"
                        v-for="item in machote"
                        :key="'machote' + item.id"
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
                            v-if="item.tipo == 'pdf'"
                          >
                            <img
                              src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/pdfimage.png"
                              class="ml-2 mb-1 mt-1"
                              style="width:45px; height:52px;"
                              v-b-tooltip.hover
                              :title="item.nameoriginal"
                          /></a>
                          <a
                            :href="item.url"
                            target="_blank"
                            v-if="item.tipo == 'docx' || item.tipo == 'doc'"
                            class="ml-1"
                          >
                            <img
                              src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/word.jpg"
                              class="ml-2 mb-1 mt-1"
                              style="width:45px; height:52px;"
                              v-b-tooltip.hover
                              :title="item.nameoriginal"
                          /></a>
                          <b-button
                            class="btn btn-danger ml-2"
                            d-block
                            sytle="display:block"
                            :id="item.id + 'btnmh'"
                            @click="deletefileMachote(item)"
                          >
                            <b-icon
                              icon="trash-fill"
                              scale="1"
                              style="color:white;"
                            >
                            </b-icon>
                          </b-button>
                        </b-overlay>
                      </b-col>
                    </b-row>
                  </b-container>
                </b-col>
              </b-row>
            </b-col>
            <!-- Sección de archivos extras -->
            <b-col cols="12" lg="4" style="padding:12px;">
              <b-row>
                <b-col cols="12">
                  <label class="d-block" style="background-color:#2D4262">
                    <h5
                      class="text-white text-center"
                      style="padding-top:10px;padding-bottom:10px"
                    >
                      Archivos Extras
                    </h5>
                  </label>
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
                      style="border:dashed #20948B 2px;color:black"
                      @vdropzone-success="vsuccessextras"
                      @vdropzone-complete="afterupload"
                      @vdropzone-queue-complete="vqueueComplete"
                      @vdropzone-processing="cargando"
                      @vdropzone-sending="sendingEventextras"
                      v-on:vdropzone-removed-file="removeFile"
                      :duplicateCheck="true"
                      @vdropzone-error="errorExtras"
                    >
                    </vue2Dropzone>
                  </b-overlay>
                </b-col>
                <b-col cols="12">
                  <b-container fluid>
                    <b-row>
                      <b-col
                        cols="12"
                        md="4"
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
                              style="width:60px;;margin-bottom:1px"
                              class="ml-2 mb-1 mt-1"
                              v-b-tooltip.hover
                              :title="item.nameoriginal"
                            />
                          </a>
                          <!--YA acepta PDF -->
                          <a
                            :href="item.url"
                            target="_blank"
                            v-if="item.tipo == 'pdf'"
                          >
                            <img
                              src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/pdfimage.png"
                              class="ml-2 mb-1 mt-1"
                              style="width:45px; height:52px;"
                              v-b-tooltip.hover
                              :title="item.nameoriginal"
                          /></a>
                          <a
                            :href="item.url"
                            target="_blank"
                            v-if="
                              item.tipo == 'png' ||
                                item.tipo == 'jpg' ||
                                item.tipo == 'jpeg' ||
                                item.tipo == 'bmp'
                            "
                            class="ml-1"
                          >
                            <img
                              src="..\..\..\..\src\assets\img\imagenes.png"
                              class="ml-2 mb-1 mt-1"
                              style="width:45px; height:52px;"
                              v-b-tooltip.hover
                              :title="item.nameoriginal"
                          /></a>
                          <a
                            :href="item.url"
                            target="_blank"
                            v-if="item.tipo == 'docx' || item.tipo == 'doc'"
                            class="ml-1"
                          >
                            <img
                              src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/word.jpg"
                              class="ml-2 mb-1 mt-1"
                              style="width:45px; height:52px;"
                              v-b-tooltip.hover
                              :title="item.nameoriginal"
                          /></a>
                          <a
                            :href="item.url"
                            target="_blank"
                            v-if="item.tipo == 'xlsx' || item.tipo == 'xls'"
                            class="ml-1"
                          >
                            <img
                              src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/excel.png"
                              class="ml-2 mb-1 mt-1"
                              style="width:45px; height:52px;"
                              v-b-tooltip.hover
                              :title="item.nameoriginal"
                          /></a>
                          <b-button
                            class="btn btn-danger ml-2"
                            d-block
                            sytle="display:block"
                            :id="item.id + 'btnx'"
                            @click="deletefilex(item)"
                          >
                            <b-icon
                              icon="trash-fill"
                              scale="1"
                              style="color:white;"
                            >
                            </b-icon>
                          </b-button>
                        </b-overlay>
                      </b-col>
                    </b-row>
                  </b-container>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-container>
      </b-col>
    </b-row>
    <b-row v-if="solicitud == 0">
      <b-col cols="12">
        <!-- <CCard>
          <CCardBody> -->
        <b-jumbotron
          header="Edita / Archivos"
          lead="Selecciona un usuario para agregar sus archivos o editar la transacción"
        >
        </b-jumbotron>
        <!-- </CCardBody>
        </CCard> -->
        <!-- <b-button class="col-12" variant="info" @click="EndUp()"
          >Finalizar
          <b-icon class="ml-2" icon="cursor" font-scale="1"></b-icon>
        </b-button> -->
      </b-col>
    </b-row>
  </div>
</template>

<script>
import "regenerator-runtime/runtime";
// import { required, minLength } from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import vue2Dropzone from "vue2-dropzone";
import alertas from "@/assets/repositoriosjs/alertas";
import repocreate from "@/assets/repositoriosjs/repoupdateprofileuser.js";
// import { faCommentsDollar } from "@fortawesome/free-solid-svg-icons";
const server = "http://18.218.153.207/api";

export default {
  props: ["solicitud"],
  name: "archivos",
  data() {
    return {
      cuentaMachote: 2,
      cuentafactura: 2,
      cuentacotizacion: 1,
      cuentaorden: 1,
      cuentacomprobante: 1,
      cuentaextras: 3,
      comprobantes: [],
      extras: [],
      ordenes: [],
      machote: [],
      mensajefactura:
        '<h4 style=""><strong>PDF O XML</strong></h4> <span>Máximo 1mb*<span> <br> Máximo 2 archivos*',
      facturas: [],
      cotizaciones: [],
      upload: false,
      dropzoneOptionsfactura: {
        url: `${server}/pagos/files`,
        thumbnailWidth: 150,
        maxFilesize: 1.0,
        headers: { Authorization: `Bearer ${this.$store.getters.gettoken}` },
        addRemoveLinks: true,
        dictDefaultMessage:
          "<h5><strong>PDF Y/O XML</strong></h5><span>Máximo 1mb<span> <br> Máximo 2 archivo(s) <strong> Archivos permitidos </strong> Se aceptan archivos .pdf y .xml",
        dictInvalidFileType: "tipo",
        parallelUploads: 1,
        maxFiles: 2,
        acceptedFiles: "application/pdf,text/xml"
      },
      dropzoneOptionscotizacion: {
        url: `${server}/pagos/files`,
        thumbnailWidth: 150,
        maxFilesize: 1.0,
        headers: { Authorization: `Bearer ${this.$store.getters.gettoken}` },
        addRemoveLinks: true,
        dictDefaultMessage:
          '<h5 style=""><strong>Archivos</strong></h5> <span>Máximo 1mb<span> <br> Máximo 1 archivo<br> <strong>Archivos permitidos </strong> .doc,.docx, xls,.xlsx, .jpg, .jgpe, .bmp, .png',
        dictInvalidFileType: "tipo",
        parallelUploads: 1,
        maxFiles: 1,
        acceptedFiles: "application/.doc,.docx,.xls,.xlsx,image/*"
      },
      dropzoneOptionsMachote: {
        url: `${server}/pagos/files`,
        thumbnailWidth: 150,
        maxFilesize: 1.0,
        headers: { Authorization: `Bearer ${this.$store.getters.gettoken}` },
        addRemoveLinks: true,
        dictDefaultMessage:
          '<h5 style=""><strong>WORD / PDF</strong></h5> <span>Máximo 1mb<span> <br> Máximo 2 archivo(s)<br> <strong>Archivos permitidos </strong> Se aceptan archivos .doc,.docx y .pdf',
        dictInvalidFileType: "tipo",
        parallelUploads: 1,
        maxFiles: 1,
        acceptedFiles: "application/.doc,.docx,.pdf"
        // maxThumbnailFilesize: 1.0,
        // createImageThumbnails: false,
        // disablePreviews: true
      },
      dropzoneOptionsextras: {
        url: `${server}/pagos/files`,
        thumbnailWidth: 120,
        maxFilesize: 1.0,
        headers: { Authorization: `Bearer ${this.$store.getters.gettoken}` },
        addRemoveLinks: true,
        dictDefaultMessage:
          '<h5 style=""><strong>Archivos</strong></h5> <span>Máximo 1mb<span> <br> Máximo 3 archivo(s) <br> <strong>Archivos permitidos </strong> .doc,.docx, xls,.xlsx, imágenes',
        dictInvalidFileType: "tipo",
        parallelUploads: 1,
        maxFiles: 3,
        acceptedFiles: "application/pdf,.doc,.docx,.xls,.xlsx,image/*"
      },
      // Termina las opciones para los dropzone
      selected: 4,
      optionstipos: [
        { tipo: "Factura", id: 1 },
        { tipo: "Orden de Compra", id: 2 },
        { tipo: "Comprobante de Pago", id: 3 },
        { tipo: "Cotización", id: 4 }
      ],
      form: {
        pdf: {},
        xml: {},
        imagen: {},
        word: {},
        excel: {}
      }
    };
  },
  watch: {},
  components: {
    vue2Dropzone
  },
  methods: {
    async checkFiles(requestID) {
      try {
        const repo = repocreate();
        let request = {};
        request.Id_Solicitud = requestID;
        await repo.constUsersFiles(request).then(res => {
          console.log(res);
          this.facturas = res.data[1].map(ele => ele);
          this.cotizaciones = res.data[2].map(ele => ele);
          this.ordenes = res.data[3].map(ele => ele);
          this.comprobantes = res.data[4].map(ele => ele);
          this.extras = res.data[5].map(ele => ele);
          this.machote = res.data[6].map(ele => ele);
          this.checkLimitsFactura();
          this.checkLimitsCotizacion();
          this.checkLimitsOrden();
          this.checkLimitsComprobante();
          this.checkLimitsExtras();
          this.checkLimitsMachote();
        });
      } catch (error) {
        console.log(error);
      }
    },
    checkLimitsFactura() {
      this.cuentafactura = 2;
      this.cuentafactura = this.cuentafactura - this.facturas.length;
      this.$refs.dzfactura.enable();
      let mensaje = "";
      if (this.cuentafactura == 2) {
        mensaje =
          '<h5 style=""><strong>PDF Y/O XML</strong></h5> <span>Máximo 1mb<span> <br> Máximo ' +
          this.cuentafactura +
          " archivo(s) <strong> Archivos permitidos </strong> Se aceptan archivos .pdf y .xml";
      } else if (this.cuentafactura == 1) {
        mensaje =
          '<h5 style=""><strong>PDF Y/O XML</strong></h5> <span>Máximo 1mb*<span> <br> Máximo ' +
          this.cuentafactura +
          " archivo(s)* <strong> Archivos permitidos </strong> Se aceptan archivos .pdf y .xml";
      } else if (this.cuentafactura <= 0) {
        this.$refs.dzfactura.disable();
        mensaje =
          '<h4 style=""><strong>Llegaste al límite de archivos</strong></h4>';
      }
      let msj = document
        .getElementById("dfactura")
        .getElementsByClassName("dz-message");
      msj[0].innerHTML = mensaje;
    },
    checkLimitsCotizacion() {
      this.cuentacotizacion = 1;
      this.cuentacotizacion = this.cuentacotizacion - this.cotizaciones.length;
      this.$refs.dzcotizacion.enable();
      let mensaje =
        '<h5 style=""><strong>Archivos</strong></h5> <span>Máximo 1mb<span> <br> Máximo ' +
        this.cuentacotizacion +
        " archivo <strong>Archivos permitidos </strong> .doc,.docx, xls,.xlsx, .jpg, .jgpe, .bmp, .png";
      if (this.cuentacotizacion <= 0) {
        this.$refs.dzcotizacion.disable();
        mensaje =
          '<h4 style=""><strong>Llegaste al límite de archivos</strong></h4>';
      }
      let msj = document
        .getElementById("dcotizacion")
        .getElementsByClassName("dz-message");
      msj[0].innerHTML = mensaje;
    },
    checkLimitsOrden() {
      this.cuentaorden = 1;
      this.cuentaorden = this.cuentaorden - this.ordenes.length;
      this.$refs.dzorden.enable();
      let mensaje =
        '<h5 style=""><strong>Archivos</strong></h5> <span>Máximo 1mb<span> <br> Máximo ' +
        this.cuentaorden +
        " archivo <strong>Archivos permitidos </strong> .doc,.docx, xls,.xlsx, .jpg, .jgpe, .bmp, .png";
      if (this.cuentaorden <= 0) {
        this.$refs.dzorden.disable();
        mensaje =
          '<h4 style=""><strong>Llegaste al límite de archivos</strong></h4>';
      }
      let msj = document
        .getElementById("dorden")
        .getElementsByClassName("dz-message");
      msj[0].innerHTML = mensaje;
    },
    checkLimitsComprobante() {
      this.cuentacomprobante = 1;
      this.cuentacomprobante =
        this.cuentacomprobante - this.comprobantes.length;
      this.$refs.dzcomprobante.enable();
      let mensaje =
        '<h5 style=""><strong>Archivos</strong></h5> <span>Máximo 1mb<span> <br> Máximo ' +
        this.cuentacomprobante +
        " archivo <strong>Archivos permitidos </strong> .doc,.docx, xls,.xlsx, .jpg, .jgpe, .bmp, .png";
      if (this.cuentacomprobante <= 0) {
        this.$refs.dzcomprobante.disable();
        mensaje =
          '<h4 style=""><strong>Llegaste al límite de archivos</strong></h4>';
      }
      let msj = document
        .getElementById("dcomprobante")
        .getElementsByClassName("dz-message");
      msj[0].innerHTML = mensaje;
    },
    checkLimitsExtras() {
      this.cuentaextras = 3;
      this.cuentaextras = this.cuentaextras - this.extras.length;
      this.$refs.dzextras.enable();
      let mensaje = "";
      if (this.cuentaextras == 3) {
        mensaje =
          '<h5 style=""><strong>Archivos</strong></h5> <span>Máximo 1mb<span> <br> Máximo ' +
          this.cuentaextras +
          " archivo(s) <strong>Archivos permitidos </strong> .doc,.docx, xls,.xlsx, imágenes'";
      } else if (this.cuentaextras == 2 || this.cuentasextras == 1) {
        mensaje =
          '<h5 style=""><strong>Archivos</strong></h5> <span>Máximo 1mb*<span> <br> Máximo ' +
          this.cuentaextras +
          " archivo(s)*";
      } else if (this.cuentaextras <= 0) {
        this.$refs.dzextras.disable();
        mensaje =
          '<h4 style=""><strong>Llegaste al límite de archivos</strong></h4>';
      }

      let msj = document
        .getElementById("dextras")
        .getElementsByClassName("dz-message");
      msj[0].innerHTML = mensaje;
    },
    checkLimitsMachote() {
      this.cuentaMachote = 2;
      this.cuentaMachote = this.cuentaMachote - this.machote.length;
      this.$refs.dzmachote.enable();
      let mensaje = "";
      if (this.cuentaMachote == 2) {
        mensaje =
          '<h5 style=""><strong>WORD / PDF </strong></h5> <span>Máximo 1mb<span> <br> Máximo ' +
          this.cuentaMachote +
          " archivo(s) <strong>Archivos permitidos </strong> Se aceptan archivos .doc,.docx y .pdf";
      } else if (this.cuentaMachote == 1) {
        mensaje =
          '<h5 style=""><strong>WORD / PDF </strong></h5> <span>Máximo 1mb*<span> <br> Máximo ' +
          this.cuentaMachote +
          " archivo(s)*";
      } else if (this.cuentaMachote <= 0) {
        this.$refs.dzmachote.disable();
        mensaje =
          '<h4 style=""><strong>Llegaste al límite de archivos</strong></h4>';
      }
      let msj = document
        .getElementById("dmachote")
        .getElementsByClassName("dz-message");
      msj[0].innerHTML = mensaje;
    },
    removeFile() {
      // console.log("Removiendo ...");
      // console.log(file);
      // console.log(xhr);
      // console.log(error);
    },
    vqueueComplete() {
      // file, xhr, formData
      // console.log(file);
      // console.log(xhr);
      // console.log(formData);
    },
    // async errorservidor(archivo, mensaje, xhr) {
    //   let alert = alertas();
    //   alert.filenotvalidorsize();
    //   this.upload = false;
    //   //  mensaje.message=='Token Signature could not be verified.'
    //   //  ||mensaje.message =='Token has expired'
    //   //  ?alertas.errortoken():alertas.imagenotvalid()
    // },

    // ERRORES EN CASO DE SER ARCHIVOS MAYORES A UN 1Mb u otra extensión
    async errorfactura(file) {
      this.$refs.dzfactura.removeFile(file);
      let alert = alertas();
      alert.filenotvalidorsize();
    },
    async errorCotizacion(file) {
      this.$refs.dzcotizacion.removeFile(file);
      let alert = alertas();
      alert.filenotvalidorsizeCotizacion();
    },
    async errorOrden(file) {
      this.$refs.dzorden.removeFile(file);
      let alert = alertas();
      alert.filenotvalidorsizeOrden();
    },
    async errorComprobante(file) {
      this.$refs.dzcomprobante.removeFile(file);
      let alert = alertas();
      alert.filenotvalidorsizeComprobante();
    },
    async errorMachote(file) {
      this.$refs.dzmachote.removeFile(file);
      let alert = alertas();
      alert.filenotvalidorsizeMachote();
    },
    async errorExtras(file) {
      this.$refs.dzextras.removeFile(file);
      let alert = alertas();
      alert.filenotvalidorsizeExtra();
    },
    // Terminan funciones de errores
    addfileokcp() {
      this.upload = false;
      this.cuentacomprobante--;
      let mensaje =
        '<h5 style=""><strong>Archivos</strong></h5> <span>Máximo 1mb*<span> <br> Máximo ' +
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
        '<h5 style=""><strong>Archivos</strong></h5> <span>Máximo 1mb*<span> <br> Máximo ' +
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
        '<h5 style=""><strong>PDF Y/O XML</strong></h5> <span>Máximo 1mb*<span> <br> Máximo ' +
        this.cuentafactura +
        " archivo(s)*";
      if (this.cuentafactura <= 0) {
        this.$refs.dzfactura.disable();
        mensaje =
          '<h4 style=""><strong>Llegaste al límite de archivos</strong></h4>';
      }
      let msj = document
        .getElementById("dfactura")
        .getElementsByClassName("dz-message");
      msj[0].innerHTML = mensaje;
    },
    addfileMachote() {
      this.upload = false;
      this.cuentaMachote--;
      let mensaje =
        '<h5 style=""><strong>WORD / PDF</strong></h5> <span>Máximo 1mb*<span> <br> Máximo ' +
        this.cuentaMachote +
        " archivo(s)*";
      if (this.cuentaMachote <= 0) {
        this.$refs.dzmachote.disable();
        mensaje =
          '<h4 style=""><strong>Llegaste al límite de archivos</strong></h4>';
      }
      let msj = document
        .getElementById("dmachote")
        .getElementsByClassName("dz-message");
      msj[0].innerHTML = mensaje;
    },
    addfileokc() {
      this.upload = false;
      this.cuentacotizacion--;
      let mensaje =
        '<h5 style=""><strong>Archivos</strong></h5> <span>Máximo 1mb*<span> <br> Máximo ' +
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
        '<h5 style=""><strong>Archivos</strong></h5> <span>Máximo 1mb*<span> <br> Máximo ' +
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
    async afterupload() {
      // file
      // console.log(file);
    },
    vsuccess(file, response) {
      // console.log(response.response);
      try {
        if (response.code == 200) {
          let result = alertas();
          this.$refs.dzfactura.removeFile(file);
          // console.log(this.facturas.length);
          // console.log(this.facturas);
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
          }
        } else if (response.code == 204) {
          this.$refs.dzfactura.removeFile(file);
          let mensaje = response.message;
          Swal.fire({
            position: "center",
            icon: "error",
            title: mensaje,
            showConfirmButton: false,
            timer: 2000
          });
        }
      } catch (error) {
        // console.log(error);
      } finally {
        this.upload = false;
      }
    },
    vsuccessMachote(file, response) {
      try {
        if (response.code == 200) {
          let result = alertas();
          this.$refs.dzmachote.removeFile(file);
          switch (response.response) {
            case 2:
              result.fileaun(this.cuentaMachote - 1);
              this.machote.push(response);
              this.addfileMachote();
              break;
            case 1:
              result.fileexist(response);
              break;
            case 0:
              result.limit();
              break;
            default:
          }
        } else if (response.code == 204) {
          this.$refs.dzmachote.removeFile(file);
          let mensaje = response.message;
          Swal.fire({
            position: "center",
            icon: "error",
            title: mensaje,
            showConfirmButton: false,
            timer: 2000
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.upload = false;
      }
    },
    vsuccesscotizacion(file, response) {
      try {
        if (response.code == 200) {
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
          }
        } else if (response.code == 204) {
          this.$refs.dzcotizacion.removeFile(file);
          let mensaje = response.message;
          Swal.fire({
            position: "center",
            icon: "error",
            title: mensaje,
            showConfirmButton: false,
            timer: 2000
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.upload = false;
      }
    },
    vsuccessorden(file, response) {
      try {
        if (response.code == 200) {
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
          }
        } else if (response.code == 204) {
          this.$refs.dzorden.removeFile(file);
          let mensaje = response.message;
          Swal.fire({
            position: "center",
            icon: "error",
            title: mensaje,
            showConfirmButton: false,
            timer: 2000
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.upload = false;
      }
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
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.upload = false;
      }
    },
    vsuccessextras(file, response) {
      try {
        if (response.code == 200) {
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
          }
        } else if (response.code == 204) {
          this.$refs.dzextras.removeFile(file);
          let mensaje = response.message;
          Swal.fire({
            position: "center",
            icon: "error",
            title: mensaje,
            showConfirmButton: false,
            timer: 2000
          });
        }
      } catch (error) {
        // console.log(error);
      } finally {
        this.upload = false;
      }
    },
    sendingEvent(file, xhr, formData) {
      let name = file.upload.filename.split(".");
      // console.log(name);
      // console.log("ID de la solicitud: " + this.solicitud);
      // console.log("Nombre original: " + name[0]);
      // console.log("Extensión del archivo: " + name[1]);
      let Tipo = "Factura";
      formData.append("Tipo", Tipo);
      formData.append("Id_Solicitud", this.solicitud);
      formData.append("formato", name[1]);
      formData.append("nameoriginal", name[0]);
    },
    sendingEventcotizacion(file, xhr, formData) {
      let name = file.upload.filename.split(".");
      // console.log("ID de la solicitud: " + this.solicitud);
      // console.log("Nombre original: " + name[0]);
      // console.log("Extensión del archivo: " + name[1]);
      let Tipo = "Cotizacion";
      formData.append("Tipo", Tipo);
      formData.append("Id_Solicitud", this.solicitud);
      formData.append("formato", name[1]);
      formData.append("nameoriginal", name[0]);
    },
    sendingEventorden(file, xhr, formData) {
      let name = file.upload.filename.split(".");
      let Tipo = "Orden_Compra";
      formData.append("Tipo", Tipo);
      formData.append("Id_Solicitud", this.solicitud);
      formData.append("formato", name[1]);
      formData.append("nameoriginal", name[0]);
    },
    sendingEventcomprobante(file, xhr, formData) {
      let name = file.upload.filename.split(".");
      let Tipo = "Comprobante_Pago";
      formData.append("Tipo", Tipo);
      formData.append("Id_Solicitud", this.solicitud);
      formData.append("formato", name[1]);
      formData.append("nameoriginal", name[0]);
    },
    sendingEventMachote(file, xhr, formData) {
      let name = file.upload.filename.split(".");
      let Tipo = "Machote";
      formData.append("Tipo", Tipo);
      formData.append("Id_Solicitud", this.solicitud);
      formData.append("formato", name[1]);
      formData.append("nameoriginal", name[0]);
    },
    sendingEventextras(file, xhr, formData) {
      let name = file.upload.filename.split(".");
      let Tipo = "Archivos_Extras";
      formData.append("Tipo", Tipo);
      formData.append("Id_Solicitud", this.solicitud);
      formData.append("formato", name[1]);
      formData.append("nameoriginal", name[0]);
    },
    cargando() {
      this.upload = true;
    },
    async deletefile(item) {
      let arrayreloj = [];
      item = Object.assign({}, item);
      await this.facturas.forEach(element => {
        if (element.id == item.id) {
          element.reloj = true;
        }
        arrayreloj.push(element);
      });
      this.facturas = arrayreloj;
      await document.getElementById(item.id + "btn").remove();
      const repo = repocreate();
      try {
        await repo.deletefile(item).then(res => {
          console.log(res);
          let resp = alertas();
          resp.filesuccess();
          this.facturas = this.facturas.filter(
            element => element.id != item.id
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
            let msj = document.getElementsByClassName("dz-message");
            msj[0].innerHTML = mensaje;
            this.$refs.dzfactura.enable();
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async deletefileMachote(item) {
      let arrayreloj = [];
      item = Object.assign({}, item);
      await this.machote.forEach(element => {
        if (element.id == item.id) {
          element.reloj = true;
        }
        arrayreloj.push(element);
      });
      this.machote = arrayreloj;
      await document.getElementById(item.id + "btnmh").remove();
      const repo = repocreate();
      try {
        await repo.deletefile(item).then(res => {
          console.log(res);
          let resp = alertas();
          resp.filesuccess();
          this.machote = this.machote.filter(element => element.id != item.id);
          this.cuentaMachote++;
          let mensaje =
            '<h4 style=""><strong>PDF Y/O XML</strong></h4> <span>Máximo 1mb<span> <br> Máximo ' +
            this.cuentaMachote +
            " archivo(s)*";
          if (this.cuentaMachote <= 0) {
            this.$refs.dzmachote.disable();
            mensaje =
              '<h4 style=""><strong>Llegaste al límite de archivos</strong></h4>';
          } else {
            let msj = document.getElementsByClassName("dz-message");
            msj[0].innerHTML = mensaje;
            this.$refs.dzmachote.enable();
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async deletefilec(item) {
      let arrayreloj = [];
      item = Object.assign({}, item);
      await this.cotizaciones.forEach(element => {
        if (element.id == item.id) {
          element.reloj = true;
        }
        arrayreloj.push(element);
      });
      this.cotizaciones = arrayreloj;
      await document.getElementById(item.id + "btnc").remove();
      const repo = repocreate();
      try {
        await repo.deletefile(item).then(res => {
          console.log(res);
          let resp = alertas();
          resp.filesuccess();
          this.cotizaciones = this.cotizaciones.filter(
            element => element.id != item.id
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
        console.log(error);
      }
    },
    async deletefilex(item) {
      let arrayreloj = [];
      item = Object.assign({}, item);
      await this.extras.forEach(element => {
        if (element.id == item.id) {
          element.reloj = true;
        }
        arrayreloj.push(element);
      });
      this.extras = arrayreloj;
      await document.getElementById(item.id + "btnx").remove();
      const repo = repocreate();
      try {
        await repo.deletefile(item).then(res => {
          console.log(res);
          let resp = alertas();
          resp.filesuccess();
          this.extras = this.extras.filter(element => element.id != item.id);
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
        console.log(error);
      }
    },
    async deletefileo(item) {
      let arrayreloj = [];
      item = Object.assign({}, item);
      await this.ordenes.forEach(element => {
        if (element.id == item.id) {
          element.reloj = true;
        }
        arrayreloj.push(element);
      });
      this.ordenes = arrayreloj;
      await document.getElementById(item.id + "btno").remove();
      const repo = repocreate();
      try {
        await repo.deletefile(item).then(res => {
          console.log(res);
          let resp = alertas();
          resp.filesuccess();
          this.ordenes = this.ordenes.filter(element => element.id != item.id);
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
        console.log(error);
      }
    },
    async deletefilecp(item) {
      let arrayreloj = [];
      item = Object.assign({}, item);
      await this.comprobantes.forEach(element => {
        if (element.id == item.id) {
          element.reloj = true;
        }
        arrayreloj.push(element);
      });
      this.comprobantes = arrayreloj;
      await document.getElementById(item.id + "btncp").remove();
      const repo = repocreate();
      try {
        await repo.deletefile(item).then(res => {
          console.log(res);
          let resp = alertas();
          resp.filesuccess();
          this.comprobantes = this.comprobantes.filter(
            element => element.id != item.id
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
        console.log(error);
      }
    }
  },
  computed: {},
  mounted() {},
  validations: {
    form: {}
  }
};
</script>

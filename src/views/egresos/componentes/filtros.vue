<template>
    <div class="row">
        <div>
            <!-- <b-button @click="cerrar()" variant="primary" class="ml-5 mt-5 mb-4">Filtros de pagos</b-button> -->
            <b-modal 
            size="xl"
            v-model="show"
            no-close-on-esc
            no-close-on-backdrop
            title="Selección de filtros"
            :header-bg-variant="headerBgVariant"
            :header-text-variant="headerTextVariant"
            :body-bg-variant="bodyBgVariant"
            :body-text-variant="bodyTextVariant"
            :footer-bg-variant="footerBgVariant"
            :footer-text-variant="footerTextVariant"
            >
            <template #modal-header>
        <!-- Emulate built in modal header close button action -->
        <h5>Selección de filtros</h5>
        <div class="mb-1">
            <b-button class="float-right" @click="showAlertCambios">X</b-button>
        </div>        
        </template>
            <b-form @submit.prevent="agregarFiltro()">
                <b-container class="row" fluid>
                    <b-row class="mb-1 text-center col-12 ">
                        <b-col class="col-12 col-lg-3 d-lg-block d-none">Filtros</b-col>
                        <b-col class="col-12 col-lg-3 d-lg-block d-none">Condiciones </b-col>
                        <b-col class="col-12 col-lg-3 d-lg-block d-none">Valores</b-col>
                        <b-col class="col-12 col-lg-3 d-lg-block d-none"></b-col>
                    </b-row>
                    <b-row class="mb-1 col-12 ">
                        <!-- Columna de filtros-->
                        <b-col class="col-12 col-lg-3">
                            <div class="d-block d-lg-none ">
                                <p>Filtros</p>
                            </div>                         
                            <b-form-select v-model="filtro.id" @input="selectFiltro(filtro.id)">
                                <option v-for="(Filter) in FiltrosDisponibles" :value="Filter.id" :disabled="Filter.disabled" :key="Filter.id">{{ Filter.label}}</option>
                            </b-form-select>
                        </b-col>
                        <b-col class="col-12 col-lg-3">
                            <div v-if="filtro.filtro != -1" class="d-block d-lg-none">
                                <p>Condiciones</p>
                            </div>                        
                            <!--Columna de parametros-->
                            <multiselect v-if="filtro.filtro != -1" v-model="filtro.parametro" track-by="key" label="label" placeholder="Select one" :options="Op_Multiselect(filtro.id)" :searchable="false" :allow-empty="false">
                            </multiselect>
                            
                        </b-col>
                        <!--Columna de criterios-->
                        <b-col class="col-12 col-lg-3">
                            <div class="d-block d-lg-none">
                                <p>Valores</p>
                            </div>                          
                            <b-row v-if="esFecha()">
                                <b-col >
                                    <b-form-datepicker :max="validaParametro() ? maxDe : max"  v-model="filtro.valor[0]" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" :placeholder="validaParametro() ? 'De' : 'Ingresa el valor'"></b-form-datepicker>
                                </b-col>
                                <b-col v-if="validaParametro() && filtro.valor[0] !== ''">
                                    <b-form-datepicker :max="max" :min="minHasta()"  v-model="filtro.valor[1]" class="" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" placeholder="Hasta"></b-form-datepicker>
                                </b-col>
                            </b-row>
                        <b-input-group v-if="!isMultiselect() && !esFecha()">
                            <b-form-input
                            v-model="filtro.valor[0]"
                            :type="validaTipos() === 2 ? 'text' : validaTipos() === 3 ? 'number': 'text'"
                            
                            :placeholder="validaParametro() ? 'Desde' : validaTipos()=== 2 ? '55555555' : validaTipos()=== 3 ? 'Ingresa el monto':'Ingresa el valor'"                            
                            :disabled="filtro.valor[0]==='NA' ? true : false"
                            :state="validaTipos() === 2 ? validar(filtro.valor[0]) : null"
                            :onkeypress="validaTipos() === 2 ? 'return (event.charCode >= 48 && event.charCode <= 57)': validaTipos() === 3 ? 'return (event.charCode >= 48 && event.charCode <= 57)': ''"
                            :maxlength="validaTipos() === 2 ? 10 : 100"
                            ></b-form-input>
                            <b-form-input v-if="validaParametro()"
                                :type="validaTipos() === 3 ? 'number': 'text'"
                                placeholder="Hasta"
                                v-model="filtro.valor[1]"
                            ></b-form-input>
                    </b-input-group>
                        
                        <b-input-group size="md" v-if="isMultiselect()">
                            <multiselect v-if="filtro.id !== 15"
                            v-model="filtro.valor"
                            tag-placeholder="Add this as new tag"
                            placeholder="Datos"
                            label="label" track-by="key"
                            :options="subOp_Multiselect()" :multiple="true"
                            :taggable="true"
                            ></multiselect>
                            <multiselect v-if="filtro.id === 15"
                            v-model="filtro.valor[0]"
                            tag-placeholder="Add this as new tag"
                            placeholder="Datos"
                            label="label" track-by="key"
                            :options="subOp_Multiselect()" :multiple="false"
                            :taggable="true"
                            ></multiselect>
                        </b-input-group>
                        </b-col>
                        <!--Boton de agregar filtros-->
                        <b-col class="col-12 col-lg-3">
                            <b-button block variant="info" type="submit" :disabled="deshabilitado">
                            <b-icon icon="check2-circle"  aria-hidden="true" ></b-icon></b-button>
                        </b-col>
                    </b-row>                
                </b-container>
            </b-form>
            <template>
            <!-- Tabla con formulario -->
            <b-form @submit.prevent="cambiarReloj()">
                <b-overlay :show="Deshabilitado" rounded="sm">
                    <template v-slot:overlay>
                        <div class="text-center">
                            <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
                                <p id="cancel-label">Please wait</p>
                        </div>
                    </template>
                
                    <b-table hover :items="Filtros" :fields="fields" responsive="lg">
                        <template #cell(filtro)="{item}">
                            <div class="col-12"> 
                                <b-form-select v-model="item.filtro" :disabled="true">
                                    <option v-for="(Filter,index) in Filter_Columns" :value="index" :key="Filter.id">{{ Filter.label }}</option>
                                </b-form-select>
                            </div>                                                        
                        </template> 
                        <template #cell(parametro)="{item,index}">                   
                            <multiselect @input="cambiarReloj(item.parametro,index)" v-model="item.parametro" track-by="key" label="label" placeholder="Condiciones" :options="Op_Multiselect(item.id)" :searchable="false" :allow-empty="false">
                            </multiselect>
                        </template>
                        <template #cell(valor)="{item, index}">
                            <b-row v-if="esFecha(item.tipo)">
                                <b-input-group>
                                    <b-col>
                                        <b-form-datepicker :required="esFecha(item.tipo)"  :max="validaParametro(item.parametro.label) ? maxDe : max" v-model="item.valor[0]" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" :placeholder="validaParametro(item.parametro.label) ? 'De' : 'Ingresa el valor'" @input="cambiarReloj(-1,index)"></b-form-datepicker>
                                    </b-col>
                                    <b-col v-if="validaParametro(item.parametro.label)">
                                        <b-form-datepicker :required="validaParametro(item.parametro.label)" @input="cambiarReloj(-1,index)" 
                                         :max="max" :min="minHasta(2,index)" v-model="item.valor[1]" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" placeholder="Hasta"></b-form-datepicker>
                                    </b-col>
                                </b-input-group>
                            </b-row>
                            <b-input-group size="md" v-if="!esFecha(item.tipo) && !isMultiselect(item.tipo)">
                                <b-form-input                                
                                v-model="item.valor[0]"
                                :type=" validaTipos(item) === 2 ? 'text' : validaTipos(item) === 3 ? 'number': 'text'"
                                
                                :placeholder="validaParametro(item.parametro.label) ? 'Desde' : validaTipos(item) === 2 ? '5555555555' :'Ingresa el valor'"
                                @change="cambiarReloj(-1,index)"
                                :required="!esFecha(item.tipo) && !isMultiselect(item.tipo)"
                                :state="validaTipos(item) === 2 ? validar(item.valor[0]) : null"
                                :onkeypress="validaTipos(item) === 2 ? 'return (event.charCode >= 48 && event.charCode <= 57)': validaTipos(item) === 3 ? 'return (event.charCode >= 48 && event.charCode <= 57)': ''"
                                :maxlength="validaTipos(item) === 2 ? 10 : 100"
                                ></b-form-input>
                                <b-form-input v-if="validaParametro(item.parametro.label)"
                                    :type="validaTipos(item) === 3 ? 'number': 'text'"
                                    placeholder="Hasta"
                                    @change="cambiarReloj(-1,index)"
                                    v-model="item.valor[1]"
                                    :required="validaParametro(item.parametro.label)"
                                ></b-form-input>
                            </b-input-group>
                            <b-input-group size="md" v-if="isMultiselect(item.tipo)">                          
                                <multiselect v-if="item.id !== 15"
                                    v-model="item.valor"
                                    @input="cambiarReloj(-1,index)"
                                    tag-placeholder="Add this as new tag"
                                    placeholder="Datos"
                                    label="label" track-by="key"
                                    :options="subOp_Multiselect(item.id)" :multiple="true"
                                    :taggable="true"
                                    ></multiselect>
                                    
                                    <multiselect v-if="item.id === 15"
                                    v-model="item.valor[0]"
                                    @input="cambiarReloj(-1,index)"
                                    tag-placeholder="Add this as new tag"
                                    deselect-label="Can't remove this value"
                                    :allow-empty="false"
                                    placeholder="Datos"
                                    label="label" track-by="key"
                                    :options="subOp_Multiselect(item.id)" :multiple="false"
                                    :taggable="false"
                                    ></multiselect>
                            </b-input-group>
                        </template>
                        <template #cell(acciones)="{index}">

                        <!--Boton para eliminar elementos-->
                            <CButton
                                color="danger"
                                variant="outline"
                                
                                @click="eliminarItem(index)"
                                >
                                <b-icon-trash></b-icon-trash>
                                </CButton>
                        </template>         
                    </b-table>
                
            </b-overlay>
            
            </b-form>
        </template>

    <!--Parte del footer en el modal-->
        <template #modal-footer>
            <div class="w-100">
                <b-button class="float-right" variant="primary" type="submit" @click="cerrar()">Guardar</b-button>
            </div>
        </template>
        </b-modal>
        </div>
        <div class="col col-12 col-lg-6">
            <b-button @click="cerrar()" variant="primary" class="ml-5 mt-5 mb-4">Busqueda avanzada <b-icon icon="search"></b-icon></b-button>
        </div>
        <div class="col col-12 col-lg-6">
            <b-card-group v-if="FiltrosImp.length > 0" deck>
                <b-card
                tag="article"
                header="Filtros seleccionados"
                header-tag="header"
                style="max-width: 45rem;"
                class="mb-5"
                >
                <template #header>
                    <div class="row" >
                        <div class="col-6" @click="cerrar()" style="cursor: pointer;">
                            <h5 class="mt-2">Filtros seleccionados</h5>
                        </div>
                        <div class="col-6">
                            <CButtonClose @click="BorrarFiltros()"><b-icon icon="x" font-scale="2"></b-icon></CButtonClose>
                        </div>
                    </div>
                </template>
                <b-card-text >
                    <div>
                        <b-button-group v-for="(Filtros,index) in FiltrosImp" :key="Filtros.id" size="sm" class="mr-2 mb-1" >
                            <b-button variant="primary" @click="cerrar()">{{Filtros}}</b-button>
                            <b-button variant="danger" @click="eliminarItem(index)"><b-icon icon="trash"></b-icon></b-button>
                        </b-button-group>
                    </div>                   
                </b-card-text>
                </b-card>
            </b-card-group>

        </div>
    </div>
</template>

<script>
const now = new Date()
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
const maxDate = new Date(today)
const maxDateDesde = new Date(today.setDate(maxDate.getDate()-1))
import { isEmpty } from 'lodash'
import Multiselect from 'vue-multiselect'

export default {
    components:
    { Multiselect,},
    data() {
        return {
            headerBgVariant: 'dark',
            headerTextVariant: 'light',
            bodyBgVariant: 'light',
            bodyTextVariant: 'dark',
            footerBgVariant: 'dark',
            footerTextVariant: 'dark',
            show: false,
            max: maxDate,
            maxDe : maxDateDesde,
            cambiosPendientes:false,            
            Filter_Columns:[
                {label:"Entregado a",   Tipo_filtro:1,  disabled: false , id:1},
                {label:"Concepto de pago", Tipo_filtro:1, disabled:false, id:2},
                {label:"IVA", Tipo_filtro:3, disabled:false, id:3},
                {label:"Usuarios", Tipo_filtro:1, disabled:false, id:4},
                {label:"Tipo", Tipo_filtro:1, disabled:false, id:5},
                {label:"Cuenta bancaria", Tipo_filtro:1, disabled:false, id:6},
                {label:"Links", Tipo_filtro:1, disabled:false, id:7},
                {label:"Proyecto",  Tipo_filtro:1, disabled:false, id:8},
                {label:"Comentario",   Tipo_filtro:1, disabled:false, id:9},
                {label:"Tags",   Tipo_filtro:1, disabled:false, id:10},
                {label:"ID",   Tipo_filtro:2, disabled:false, id:11},
                {label:"Estatus Factura",   Tipo_filtro:3,disabled:false, id:12},
                {label:"Monto Bruto",   Tipo_filtro:2, disabled:false, id:13},
                {label:"Monto Solicitado",   Tipo_filtro:2,  disabled:false, id:14},
                {label:"Visto", Tipo_filtro:3, disabled:false, id:15},
                {label:"Recurrente",   Tipo_filtro:3,disabled:false, id:16},
                {label:"Estatus Pago",   Tipo_filtro:3, disabled:false, id:17},
                {label:"Fecha de solicitud",   Tipo_filtro:4, disabled:false, id:18},
                {label:"Archivos",  Tipo_filtro:3, disabled:false, id:19},
            ],
            fields: [
                {key:'filtro',      label: 'Filtro'},
                {key:'parametro',   label: 'Parametro'},
                {key:'valor',       label: 'Valores'},
                {key:'acciones',    label: 'Acciones'},
            ],
            Filtros:[],            
            filtro:{
                filtro:-1,
                parametro:-1,
                valor:['FFF','AA'],
                tipo: 0,
                id:0,
            },
            FiltrosImp:[],
            FiltrosRequest:[],
            Tipo: 1,
            FiltrosTemp:[],
            Deshabilitado: false,
            options:[
                //String
                {key:1, label:"Empieza con"},
                {key:2, label:"Termina con"},
                {key:3, label:"Contiene"},
                {key:4, label:"No contiene"},
                //Number - Fecha
                {key:5, label:"Es igual a" },                
                {key:6, label:"Diferente de"},
                {key:7, label:"Menor igual"},
                {key:8, label:"Mayor a"},
                {key:9, label:"Menor a"},
                {key:10, label:"Mayor igual"},         
                {key:11, label:"Entre"},
                //Usuario
                {key:12, label:"Nombre"},                                
                {key:13, label:"Correo"},
                {key:14, label:"Nickname"},
                {key:15, label:"Teléfono"},
                {key:16, label:"Todos los anteriores"},
                //Cuenta bancaria
                {key:17, label:"Número de cuenta"},                
                {key:18, label:"Nombre de la cuenta"},
                {key:19, label:"Cuenta clabe"},
                // {key:20, label:"Nickname"},
                //
                {key:20, label:"Si"},                
                {key:21, label:"No"},
                // {key:23, label:
            ],
            sub_Op:[
                //Iva
                {key:1, label:'0%'},
                {key:2, label:'8%'},
                {key:3, label:'16%'},
                //Estatus factura
                {key:4, label:'Pendiente'},
                {key:5, label:'Facturada'},
                {key:6, label:'Denegada'},
                {key:7, label:'Con error'},
                //Estatus Pago
                {key:8,label:"Completado"},
                {key:9,label:'Diario'},
                //Recurrente
                {key:10,label:'Semanal'},
                {key:11,label:'Mensual'},
                {key:12,label:'Dias del mes'},
                {key:13,label:'Bimestral'},
                {key:14,label:'Trimestral'},
                {key:15,label:'Semestral'},
                {key:16,label:'Anual'},
                {key:17,label:"Factura"},
                //Archivos
                {key:18,label:'Orden de compra'},
                {key:19, label:'Comprobande de pago'},
                {key:20, label:'Cotización'},
                {key:21, label:'Extras'},
                {key:22, label:'Si'},
                //Visto
                {key:23, label:'No'},
                // {key:24, label:
            ],
        }
    },
    computed:{                            
        FiltrosDisponibles(){
            try{
                let IdFiltros_sel = this.Filtros.map(function(fil){
                    return fil.id
                })
                var res = this.Filter_Columns.filter(el => !IdFiltros_sel.includes(el.id))      
                return res;
            }catch{return this.Filter_Columns}
        },
        deshabilitado(){
            try{
                var deshabilitar = this.filtro.filtro === -1
                || this.filtro.parametro === -1
                || this.filtro.valor[0].length === 0  ? true
                : this.validaParametro() === true ? this.validaTipos()===3 ? true : this.filtro.valor[1].length === 0 ? true :  false : false;

                if(deshabilitar){
                    if(this.validaTipos()===3){
                        if(this.validaParametro()){
                            if(parseFloat(this.filtro.valor[1]) > parseFloat(this.filtro.valor[0])){
                                deshabilitar = false
                            }else{deshabilitar = true}
                        }else{
                            deshabilitar = false
                        }

                    }
                }
                return deshabilitar
            }
            catch{ return true}
        },
    },
    methods:{
        BorrarFiltros(){
            this.Filtros.splice(0,this.Filtros.length)
            this.FiltrosTemp.splice(0,this.Filtros.length)
            this.imprimeFiltros()
        },
        validar(valor){
            try{
                return valor.length <= 10 && valor.length > 2
            }catch{}            
        },
        subOp_Multiselect(id=-1){
            let Id_Validar
            if(id==-1){
                Id_Validar = this.filtro.id
            }else{
                Id_Validar=id
            }
            try{
                switch(Id_Validar){
                    case 3 : return this.sub_Op.filter(el => el.key >= 1 && el.key <= 3);
                    case 12: return this.sub_Op.filter(el => el.key >= 4 && el.key <= 7);
                    case 15: return this.sub_Op.filter(el => el.key >= 22 && el.key <= 23);
                    case 16: return this.sub_Op.filter(el => el.key >= 9 && el.key <= 16 );
                    case 17: return this.sub_Op.filter(el => el.key >= 7 && el.key <= 8 || el.key === 4);
                    case 19: return this.sub_Op.filter(el => el.key >= 18 && el.key <= 21);
                }
            }catch{}         
        },
        Op_Multiselect(id){
            try{
                if(id === 2||id === 7||id === 8||id === 9||id === 10){
                    return this.options.filter(el => el.key >= 1 && el.key <= 5);}
                if(id === 3||id === 5||id === 12||id===16||id===17){
                    return this.options.filter(el => el.key >= 5 && el.key <= 6);}
                if(id === 1||id===4){
                    return this.options.filter(el => el.key >= 12 && el.key <= 16);}
                if(id===6){
                    return this.options.filter(el => el.key >= 17 && el.key <= 19 || el.key === 14);}
                if(id===11||id === 13||id === 14||id===18){
                    return this.options.filter(el => el.key >= 5 && el.key <= 11);}
                if(id===15){
                    return this.options.filter(el => el.key >= 5 && el.key <= 5);}
                if(id===19){
                    return this.options.filter(el => el.key >= 3 && el.key <= 4);}
            }catch{}
        },
        isMultiselect(tipo=-1){
            let Tipo_Validar                        
            try{
                if(tipo==-1){
                    Tipo_Validar = this.filtro.tipo
                }else{
                    Tipo_Validar = tipo
                }

                if(Tipo_Validar === 3){
                    return true
                }else{ return false }
            }catch{
                return false;
            }
        },
        JsonFiltros(){
            this.FiltrosRequest = this.Filtros.map(function(objp){
                let filSelect = {}
                filSelect.Id=objp.id
                filSelect.Tipo=objp.tipo
                filSelect.Parametro=objp.parametro.key

                if(objp.valor[0].hasOwnProperty('key')){
                    filSelect.Valor = objp.valor.map(function(obj){
                        return obj.key
                    })                                                      
                }else{
                    filSelect.Valor=objp.valor
                }
                return filSelect
            })
        },     
        imprimeFiltros(){
            let filSelect = new Array();
            let indice = 1;
            for(let elem of this.Filtros){
                const Fil = this.Filter_Columns.filter(ele => ele.id ===elem.id)
                if(elem.valor[0].hasOwnProperty('key')){
                    let valor='';
                    for(let val of elem.valor){
                        valor += val.label+", "
                    }                    
                    filSelect.push( 'Filtro '+indice+' : '+Fil[0].label + ', ' + elem.parametro.label + ': '+ valor)
                }else{
                    if(elem.valor.length==1){
                        filSelect.push( 'Filtro '+indice+' : '+Fil[0].label + ', ' + elem.parametro.label + ': '+ elem.valor[0])
                    }else{
                        filSelect.push( 'Filtro '+indice+' : '+Fil[0].label + ', ' + elem.parametro.label + ': '+ elem.valor[0] +' y '+ elem.valor[1])
                    }
                }
                indice++
            }
            this.cambiosPendientes = false
            this.FiltrosImp= filSelect;
            this.JsonFiltros()                    
            return filSelect
        },
        minHasta(form=1,indice=-1){            
            if(form===1){
                let Desde = new Date(this.filtro.valor[0])
                let Hasta = new Date(this.filtro.valor[1])
                let Fecha = new Date(Desde.getFullYear(), Desde.getMonth(), Desde.getDate()+2)
                try{
                    if(Desde >= Hasta){
                        this.filtro.valor[1] = Fecha
                    }
                    return Fecha
                }catch(error){
                    return this.filtro.valor[0]
                }
            }else if(form===2){
                let Desde = new Date(this.Filtros[indice].valor[0])
                let Hasta = new Date(this.Filtros[indice].valor[1])
                let Fecha = new Date(Desde.getFullYear(), Desde.getMonth(), Desde.getDate()+2)
                try{
                    if(Desde >= Hasta){
                        this.Filtros[indice].valor[1] = Fecha
                    }
                    return Fecha
                }catch(error){
                    return this.filtro.valor[0]
                }
            }         
        },        
        TipoDato(){
            try{
                //Si maneja sub_options retorna 1
                if( this.FiltrosDisponibles[this.filtro.filtro].Tipo_filtro === 3){
                    return 1;
                }
                //Si es Fecha retorna 2
                if( this.FiltrosDisponibles[this.filtro.filtro].Tipo_filtro === 4){
                    //Si Condición es igual a Entre
                    if( this.filtro.parametro.label === 'Entre'){
                        return 3;
                    }
                    return 2;
                }

                //Si es Numerico retorna 5
                if( this.FiltrosDisponibles[this.filtro.filtro].Tipo_filtro === 2 ||  this.FiltrosDisponibles[this.filtro.filtro].Tipo_filtro === 1){
                    //Si Condición es igual a Entre
                    if( this.filtro.parametro.label === 'Entre'){
                        return 6;
                    }                    
                    return 5;
                }
            }catch{
                return 0;
            }
        },        
        selectFiltro(id) {
            try{
                var FiltroSelected;
                FiltroSelected = this.Filter_Columns.filter(element => element.id === id)
                this.minHasta()
                //Obtiene el indice del filtro para asignarlo al objeto
                this.limpiar()
                this.filtro.filtro = this.Filter_Columns.findIndex(element => element.id === FiltroSelected[0].id )
                this.filtro.id = id
                this.filtro.tipo = FiltroSelected[0].Tipo_filtro
            }catch{

            }            
        },
        esFecha(Tipo=-1){
            let Tipo_Validar
            
            try{
                if(Tipo==-1){
                    Tipo_Validar = this.filtro.tipo
                }else{
                    Tipo_Validar = Tipo
                }

                if( Tipo_Validar === 4)
                {
                    return true;
                }else{ return false;}
            }catch{
                return false;
            }
        },
        validaParametro(parametro=''){            
            let parametro_Validar
            if(parametro===''){
                parametro_Validar = this.filtro.parametro.label
            }else{
                parametro_Validar = parametro
            }

            try{
                if( parametro_Validar === 'Entre'){
                    return true;
                }else{
                    return false;
                }
            }catch{
                return false;
            }
        },
        validaTipos(filtro=-1){
            let filtro_Validar
            try{
                if(filtro===-1){
                    filtro_Validar = this.filtro
                }else{
                    filtro_Validar = filtro
                }

                if(filtro_Validar.tipo === 2 || filtro_Validar.parametro.label === 'Número de cuenta'){
                        return 3;
                }
                else if( filtro_Validar.parametro.label === 'Correo'){ return 1;}
                else if( filtro_Validar.parametro.label === 'Teléfono' ){ return 2 ;}
                return 0;
            }catch(a){
                return 0;
            }
        },     
        cerrar(){
            let arr = new Array();
            let Guardar=true;
            let indice = 1;
            if(this.Filtros.length>0){
                for(let elem of this.Filtros){
                    if(elem.valor.length===0){                                             
                        Guardar=false
                        break;                                      
                    }else{
                        if(elem.valor[0]===''){
                            Guardar=false
                            break;
                        }
                    }
                    indice++
                }
            }                        
            this.limpiar()
            if(Guardar){
                
                if(this.show===false){
                    
                    this.FiltrosTemp.splice(0,this.FiltrosTemp.length)
                    for(let elem of this.Filtros){
                        arr.push(elem)
                    }
                    this.FiltrosTemp = JSON.parse(JSON.stringify(arr))
                }        
                this.show=!this.show
                this.imprimeFiltros()
            }else{
                this.showAlertCamposEnBlanco()
            }                                 
        },
        agregarFiltro(){
            let todoOk =true;
            if(this.validaParametro()){
                todoOk = false;
                if (this.validaTipos() === 3){
                    if(this.filtro.valor.length > 1){
                        if(parseFloat(this.filtro.valor[0]) < parseFloat(this.filtro.valor[1]) ){                            
                            todoOk = true;
                        }
                    }
                }else if(this.esFecha()){
                    const FechaDe = new Date(this.filtro.valor[0]);
                    const FechaHasta = new Date(this.filtro.valor[1])
                    if(Date.parse(this.filtro.valor[0])< Date.parse(this.filtro.valor[1])){
                        todoOk = true;
                    }
                }
            }
            if(this.validaTipos()===2){
                if(this.validar(this.filtro.valor[0])){
                    todoOk=true;
                }else{
                    todoOk=false;
                }
            }            
            if(todoOk){
                this.cambiosPendientes=true
                //inserta filtro seleccionado
                this.filtro.tipo = this.Filter_Columns[this.filtro.filtro].Tipo_filtro
                this.filtro.id = this.Filter_Columns[this.filtro.filtro].id
                this.Filtros.push(this.filtro)
                this.limpiar()
            }else{
                // alert('Valor inicial debe ser menor al final')
            }
        },
        cambiarReloj(param=-1,indice=-1){
            if(this.Filtros[indice].valor.length>0){
                this.cambiosPendientes=true
                if(param!==-1){
                    if(!this.validaParametro(this.Filtros[indice].parametro.label)){
                        this.Filtros[indice].valor.splice(1,1)                    
                    }else{
                        if(this.Filtros[indice].valor.length===1){
                            this.Filtros[indice].valor[1] = parseFloat(this.Filtros[indice].valor[0])+1
                        }
                    }
                }
                if(indice!==-1){
                    if(this.Filtros[indice].valor.length>1){
                        if(this.Filtros[indice].tipo===2){
                            if(parseFloat(this.Filtros[indice].valor[1]) < parseFloat(this.Filtros[indice].valor[0])){
                                this.Filtros[indice].valor[1] = parseFloat(this.Filtros[indice].valor[0])+1
                            }
                        }else if(this.Filtros[indice].tipo===4){
                            try{
                                let Desde = new Date(this.Filtros[indice].valor[0])
                                let Hasta = new Date(this.Filtros[indice].valor[1])
                                let format = [{day: 'numeric'}, {month: 'short'}, {year: 'numeric'}];
                                let Fecha = new Date(Desde.getFullYear(), Desde.getMonth(), Desde.getDate()+2)
                                if(Desde >= Hasta){
                                    this.Filtros[indice].valor[1] = Fecha
                                }                        
                            }catch(error){                    
                            }
                        }

                    }else{
                        if(this.validaTipos(this.Filtros[indice])===2){
                            if(!this.validar(this.Filtros[indice].valor[0])){
                                this.Filtros[indice].valor[0] = this.FiltrosTemp[indice].valor[0]
                            }
                        }
                    }               
                }
                if(this.Filtros[indice].valor[0].length!==0 ){
                    // this.imprimeFiltros()
                    this.Deshabilitado = true;
                    setTimeout(()=> {this.Deshabilitado = false; }, 300);
                }
            }                       
        },
        limpiar(){
            this.filtro={
                filtro:-1,
                parametro:-1,
                valor:[],
                tipo:0,
                id:0,
            }
        },
        eliminarItem(indice){
            this.Filtros.splice(indice,1)
            this.cambiosPendientes = true
            this.imprimeFiltros()
        },
        showAlertCambios() {
            if(this.cambiosPendientes){
                this.$bvModal.msgBoxConfirm('¿Desea salir sin guardar?', {
                    title: 'Confirme porfavor',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    okTitle: 'SI',
                    cancelTitle: 'NO',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                })
                .then(value => {
                    if(value){
                        let arr = new Array();                        
                        this.cambiosPendientes=false
                        if(value){
                            this.Filtros = this.FiltrosTemp.slice()
                        }
                        this.cerrar()
                    }                                    
                })
                .catch(err => {
                    // An error occurred
                })
            }else{
                this.cerrar()
            }              
        },
        showAlertCamposEnBlanco(guardar) {
            if(!guardar){
                this.$bvModal.msgBoxConfirm('¿Desea salir sin guardar?', {
                    title: 'Tiene campos en blanco',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    okTitle: 'SI',
                    cancelTitle: 'NO',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                })
                .then(value => {
                    if(value){
                        if(value){
                            this.Filtros = this.FiltrosTemp.slice()
                        }
                        this.cerrar()
                    }                                    
                })
                .catch(err => {
                    // An error occurred
                })
            }else{
                this.cerrar()
            }              
        },
    },
    mounted(){

    },
    show(){
    }

}
</script>



<style src="vue-multiselect/dist/vue-multiselect.min.css" scoped>
   thead tr th {
            position: sticky;
            top: 0;
            z-index: 10;
            background-color:rgb(230, 126, 34);
        }

        .table-responsive {
            height:400px;
            overflow:scroll;
        }

        .iconx {
            cursor: hand;            
        }
</style>
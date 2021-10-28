<template>
  

    <table
 class="table table-striped table-md table-hover height:200px;">
        <thead class="text-center"
        style="font-size:1.1em;">
    
          <draggable v-model="selected" tag="tr">
            
            <th sticky-column
     scope="col"
     v-for="header in selected"
      :key="header.key"
      @click="ordenar(header)"
      class="header"

     >
<div v-b-hover="handleHover"  >
  <b-icon class="ml-2" icon="hand-index-thumb" animation="cylon"  v-if="isHovered" font-scale="1" shift-v="-10"></b-icon>
    
    
     <b-link class="text-white"  >
     {{header.label}}
      </b-link>
      
</div>
            </th>
          </draggable>
        </thead>
       
       
       
        <tbody class="text-center" >
          
          <tr v-for="item in items" :key="item.id">

         <td  v-for="header in selected" :key="header.key">

            <b-badge v-if="header.key=='iva'" class="" style="" variant="info">{{ item[header.key] }} %</b-badge>
           <span v-if="header.key=='actions'">
            <b-container fluid>
            <b-row class="justify-content-md-center">
             <b-col  lg="12" v-for="permi in acciones" :key="permi">
            <b-button
             v-if="permi==1"
                   size="md"
                   block
                   @click.prevent="info(item)"
                   variant="outline-primary"
                   class="mr-1 mb-1 mt-2"
                      >
                        <b-icon icon="pencil"></b-icon>Editar
                      </b-button>
                      <b-button
                   v-if="permi==2"
                        size="md"
                        variant="outline-success"
                        block
                         class="mr-1 mb-1  mt-2"
                        @click="relationcuenta(row.item)"
                      >

                              <b-iconstack font-scale="1" animation="cylon">
                                    <b-icon
                            stacked
                            icon="unlock"
                            animation="throb"
                            variant="success"
                            scale="0.75"
                          ></b-icon> </b-iconstack>
                         <span class="font-lg"> Roles</span>



                      </b-button>
                      <b-button
                       v-if="permi==3"

                        size="md"
                        variant="outline-danger"
                        block
                        @click="deleteevent(row.item)"
                         class="mr-1 mb-1  mt-2"
                      >
                        <b-icon icon="lock-fill"></b-icon>Borrar
                      </b-button>
                   </b-col>

                  </b-row>
                                </b-container>
           </span>
           <span  v-if="header.key=='comentario'" >

            <span v-if="item[header.key]===''||item[header.key]===null">Sin Comentarios</span>
               <span v-else>{{item[header.key]}}</span></span>

             <span
              v-if="header.key=='moneda'"
             >
               <span v-if="item[header.key]===''||item[header.key]===null">Sin datos</span>
               <span v-else>{{item[header.key]}}</span></span>

   <span v-if="header.key=='usuarios'" >
   <b-link>
   <span v-if="item['ref'][0]['usersref'].length==0">
   Sin Usarios
    </span>
   <span v-else>
   Usuarios({{item['ref'][0]['usersref'].length}})
   </span>
        </b-link>

   </span>
         <b-badge v-if="header.key=='monto_bruto'"
              variant="success">
               <span v-if="item[header.key]===''||item[header.key]===null">Sin datos</span>
               <span v-else>${{item[header.key]}}</span></b-badge>
               <b-badge
              v-if="header.key=='monto_solicitado'"
              variant="success">
               <span v-if="item[header.key]===''||item[header.key]===null">Sin datos</span>
               <span v-else>${{item[header.key]}}</span></b-badge>
                  <span
              v-if="header.key=='concepto'"
            >
               <span v-if="item[header.key]===''||item[header.key]===null">Sin datos</span>
               <span v-else>{{item[header.key]}}</span></span>
  <span  v-if="header.key=='titulo'"
             >
               <span v-if="item[header.key]===''||item[header.key]===null">Sin datos</span>
               <span v-else>{{item[header.key]}}</span></span>

    <span v-if="header.key=='usersin'"
             >
             <b-row >
             <b-col cols="12">
             <b-img v-if="item[header.key][0].photo==null||item[header.key][0].photo==''"
              src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/profile/sinfoto.png"
              rounded="circle" alt="Circle image" width="30px" class="mr-1"></b-img>
             <b-img
              :src="'https://pagosfile.s3-us-west-2.amazonaws.com/'+item[header.key][0].photo"
              rounded="circle"
               alt="Circle image"
                width="30px" class="mr-1"
                v-else></b-img>
            </b-col>
             <b-col cols="12">
                <span v-if="item[header.key]===''||item[header.key]===null">Sin datos</span>
               <span v-else>
               {{item[header.key][0].name}}
            </span>

            </b-col>




             </b-row>

           </span>
  <span              v-if="header.key=='visto'"
             >
               <span v-if="item[header.key]===''||item[header.key]===null">Sin datos</span>

               <span v-else>
               <b-badge variant="danger" class="text-white" v-if="item[header.key]=='no'">

               Aún no
               </b-badge>
               <b-badge v-else variant="success" class="text-white">
               Visto
               </b-badge>

               </span></span>
<span v-if="header.key=='recurrente'" >

<span v-if="item['ref'][0]['recurrencia']==null">
<b-row>
<b-col cols="12">
El pago es único
</b-col>
</b-row>
</span>
<span v-else >
<b-row>
<b-col cols="12"  style="text-align:center">
<strong>Inicia</strong>
</b-col>
<b-col cols="12"  style="text-align:center">
{{item['ref'][0]['recurrencia'].inicia}}
</b-col>
<b-col cols="12"   style="text-align:center">
<strong>Termina</strong>
</b-col>
<b-col cols="12" style="text-align:center">
{{item['ref'][0]['recurrencia'].termina}}
</b-col>
<b-col cols="12" style="text-align:center">
<strong>Recurrencia</strong>
</b-col>
<b-col cols="12"  style="text-align:center">
{{item['ref'][0]['recurrencia'].tipo}}
</b-col>
<b-col cols="12"  style="text-align:center">
<strong>Pagos:</strong>
</b-col>
<b-col cols="12"  style="text-align:center">
{{item['ref'][0]['recurrencia'].total_pagos}}
</b-col>
</b-row>


</span>
               </span>


<b-row v-if="header.key=='links'">
  <b-col v-if="item['ref'][0]['linkspagos'].length==0" cols="12" >
    Sin Links     </b-col>
<b-col v-else >
 <b-row >
 <b-col cols="12" style="text-align:center">
 <b-link variant="success" v-for="link in item['ref'][0]['linkspagos']" :key="link.id" target="_blank" :href="link.link">
{{link.link}}
<br>
</b-link>
</b-col>
</b-row>
</b-col>
</b-row>
<b-row v-if="header.key=='creado'">


 <b-col cols="12" style="text-align:center">

    <span>{{item.created_at}}</span>
</b-col>

</b-row>
<b-row v-if="header.key=='tag'">
  <b-col v-if="item['ref'][0]['tags'].length==0" cols="12" >
    Sin Tags     </b-col>
               <b-col v-else >
                <b-row >
                <b-col cols="12" style="text-align:center">
<b-badge variant="success" v-for="tag in item['ref'][0]['tags']" :key="tag.id" class="mr-1">
#{{tag.tag}}

</b-badge>
</b-col>
</b-row>
</b-col>
</b-row>
<b-row v-if="header.key=='cuenta'">

               <b-col v-if="item['ref'][0]['cuentas'].length==0" cols="12" >
               Sin datos

               </b-col>

               <b-col v-else >
                <b-row v-for="cuenta in item['ref'][0]['cuentas']" :key="cuenta.id">
                <b-col cols="12" style="text-align:center">
<strong>Nombre</strong>
</b-col>
<b-col cols="12" style="text-align:center">
{{cuenta.nombre_cuenta}}
</b-col>

<b-col cols="12" style="text-align:center">
<strong>número</strong>
</b-col>
<b-col cols="12" style="text-align:center">
{{cuenta.numero_cuenta}}
</b-col>
<b-col cols="12" style="text-align:center">
<strong>banco</strong>
</b-col>
<b-col cols="12" style="text-align:center">
{{cuenta.banco}}
</b-col>

                </b-row>


               </b-col>

</b-row>
     <b-row v-if="header.key=='proyecto'">

               <b-col v-if="item['ref'][0]['proyectos'].length==0" cols="12" >
               Ningún proyecto destinado

               </b-col>

               <b-col v-else >
                <b-row v-for="proyecto in item['ref'][0]['proyectos']" :key="proyecto.id">
                <b-col cols="12" style="text-align:center">
<strong>Nombre</strong>
</b-col>
<b-col cols="12" style="text-align:center">
{{proyecto.nombre}}
</b-col>
                </b-row>
               </b-col>

</b-row>
    <b-row v-if="header.key=='id_propio'">


               <b-col v-if="item['ref'][0].pivot['id_propio']" cols="12" >
                 <span>   {{item['ref'][0].pivot['id_propio']}}       </span>

               </b-col>

               <b-col v-else cols="12" >
                    <span> Aún no tiene id</span>


               </b-col>

</b-row>
   <b-row v-if="header.key=='archivos'" >
   <span v-show="false">{{coming_data=buclecuenta(item['ref'][0]['archivos'])}}</span>
   <b-link>
   <span v-if="coming_data.length==0">
   Sin archivos
    </span>
   <span v-if="coming_data.hasOwnProperty('Factura')">
   Factura({{ coming_data['Factura'].length}}),
   </span>
    <span v-if="coming_data.hasOwnProperty('Cotización')">
   Cotización({{ coming_data['Cotización'].length}}),
   </span>
       <span v-if="coming_data.hasOwnProperty('Comprobante de Pago')">
   Comprobante de Pago({{ coming_data['Comprobante de Pago'].length}}),
   </span>
      <span v-if="coming_data.hasOwnProperty('Orden de Compra')">
  Orden de Compra({{ coming_data['Orden de Compra'].length}}),
   </span>   <span v-if="coming_data.hasOwnProperty('Extras')">
   Extras({{ coming_data['Extras'].length}}),
   </span>
        </b-link>

   </b-row>
    <b-row v-if="header.key=='ticket'">


               <b-col cols="12">

                  <b-button variant="info" class="text-white" @click="showticket(item.id)" v-if="item.visto_chat=='no'">Chat</b-button>
                <b-button variant="success" class="text-white" @click="showticket(item.id)" v-else>Chat</b-button>


               </b-col>

</b-row>
<b-row v-if="header.key=='status'">


 <b-col v-if="item.status_id==null" cols="12" >
               Ningún Status

               </b-col>
<b-col v-else>
<b-button variant="danger" v-if="item.status.statusgeneric_id==3">Denegado</b-button>
<b-button variant="warning" v-if="item.status.statusgeneric_id==2" class="text-white">Pendiente</b-button>
<b-button variant="success" v-if="item.status.statusgeneric_id==1">Aprobado</b-button>


</b-col>

</b-row>
             </td>

          </tr>
        </tbody>
      </table>


</template>

<script>
import draggable from 'vuedraggable'
import _ from 'lodash';

export default {
    components:{draggable},

  data(){
      return{
          isHovered: false,
      items:[],
      selected:[],
      acciones:[],
      selectcolumn:null
      
      }
      
      },
 props:['selectedin'
 ,'datosalltable'],

 watch:{

 selectedin:function(newval,oldval){
          this.selected=newval
    },
  datosalltable:function(newval,oldval){
          this.items=this.getreplicas(newval.items);
          this.acciones=newval.acciones;
    // console.log(this.acciones)
    }

 },
  methods:{
     handleHover(hovered) {
        this.isHovered = hovered
      },
     getacciones(){

      return this.acciones;
    },
    buclecuenta(archivo){

                  if(archivo.length>0){
                       let nuevos2= _.groupBy (archivo, 'gettipo.tipo');
                      return nuevos2;
                  }else{
                    return archivo;
                  }

    },
 getreplicas(array){
          if(array){
      array.forEach(element => {

        let fecha= new Date(element.created_at);
          let nuevo=fecha.toDateString("es-ES")

       element.created_at=nuevo;


      });
         return array;
          }
          else{
            return [];
          }


    
  },
   deleteevent(item){
     this.$emit('deleteevento',item);
    },
    info(item) {
      this.$emit('edit',item);
        // this.infoModal.title = `Row index: ${index}`
        // this.infoModal.content = JSON.stringify(item, null, 2)
        // this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
        relationcuenta(row){
            this.$emit('roles',row);

    }

}
}
</script>
   <style type="text/css" scoped>
   thead tr th {
            position: sticky;
            top: 0;
            z-index: 10;
            background-color:rgb(230, 126, 34);;
        }

        .table-responsive {
            height:400px;
            overflow:scroll;
        }


</style>
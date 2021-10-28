<template>
  <div>
    <CCard>
      <CCardHeader>
       <h4> Roles y permisos</h4>
      </CCardHeader>
      <CCardBody>
        <div>
          <b-form inline class="mb-2" @submit.prevent="Crear_Actualizar_Rol()">
            
            <b-form-input
              v-model="Rol.Nombre"
              id="inline-form-input-name"
              class="mb-2 mr-sm-2 mb-sm-0"
              placeholder="Nuevo Rol"
            ></b-form-input>
            {{Rol}}
            <b-button :disabled="nameRol" variant="primary" type="input">Crear</b-button>
          </b-form>
        </div>
        <br>
        <b-row>
          <b-col>
            <h5>Roles</h5>
          </b-col>
          <b-col>
            <h5>Permisos</h5>
          </b-col>
        </b-row> 
        <div >
          <b-card no-body>
            <b-tabs pills card vertical nav-wrapper-class="w-50">
              <b-tab v-for="rol in Roles" :title="rol.Nombre" :key="rol.id">                
                <b-card-text>
                  <b-button-group>
                    <b-button @click="EliminarRol(rol)"><b-icon-trash/>  Eliminar</b-button>
                    <b-button @click="ActualizarRol(rol)"><b-icon-folder-check/> Actualizar</b-button>
                    <b-button @click="cambiarNom(rol)"><b-icon-pencil-fill/> Cambiar nombre</b-button>
                  </b-button-group>
                  <b-form-checkbox-group stacked checkboxes>
                    <b-form-checkbox
                    v-for="option in Permisos"
                    v-model="rol.permisos"
                    :key="option.id"
                    :value="option"
                    >{{ option.descripcion }}
                    </b-form-checkbox> 
                  </b-form-checkbox-group>                                  
                </b-card-text>                
              </b-tab>                          
            </b-tabs>
          </b-card>
        </div>               
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import repoupdateprofileuser from "../../assets/repositoriosjs/repoupdateprofileuser"
export default {
  data() {
    return {
      show:true,
      Permisos:{},
      Roles:{},
      selected:{},
      Rol:{
        Nombre:''
      },
      Actualizar:false,
    }
  },
  computed:{
    nameRol(){
      try{
        return this.Rol.Nombre.trim().length > 0 ? false : true
      }catch{}      
    }
  },
  methods:{
    Crear_Actualizar_Rol(){
      if(this.Actualizar){        
        this.ActualizarRol(this.Rol)
      }else{
        this.crearRol()
      }
    },
    cambiarNom(rol){
      this.Actualizar=true
      let arr = this.Roles.filter(item => item.id === rol.id).map(function(obj){
        let newObj ={}
        newObj.id= obj.id;
        newObj.Nombre = obj.Nombre;
        newObj.permisos = obj.permisos
        return newObj;
      })   
      this.Rol = arr[0]
    },
    //ELIMINAR ROL
    async EliminarRol(rol){
      try{
        let RolDel={};
        RolDel.Id = rol.id
        const repo = repoupdateprofileuser();
        await repo.DeleteRoles(RolDel).then((res)=>{
          this.consRoles()
        })
      }catch(error){
      }finally{

      }
    },
    //ACTUALIZA ROL
    async ActualizarRol(rol){
      try{
        this.Actualizar = false;
        let RolAct={};
        RolAct.Id = rol.id
        RolAct.Nombre = rol.Nombre;                    
        RolAct.Permisos = rol.permisos.map(function(obj1){
          let objRet = {};
          objRet =  obj1.id;              
          return objRet;
        })        
        
        const repo = repoupdateprofileuser();
        await repo.UpdateRoles(RolAct).then((res)=>{ 
          this.Rol = {Nombre:''}         
          this.consRoles()
        })
      }catch(error){
      }finally{

      }
    },
    //CREAR ROL
    async crearRol(){
      try{
        let RolCre = this.Rol
        const repo = repoupdateprofileuser();
        await repo.CreateRoles(RolCre).then((res)=>{
          this.Rol = {Nombre:''} 
          this.consRoles()
        })
      }catch(error){
        // console.log(error)
      }finally{

      }      
    },
    async consRoles(){
      try{
        const repo = repoupdateprofileuser();
        await repo.consRoles().then((res)=>{          
          this.Roles = res.data.map(function(obj){
            let objRet1 = {};
            objRet1.id = obj.id
            objRet1.Nombre = obj.Nombre;
            objRet1.User_id = obj.User_id;
            // objRet1.created_at = obj.created_at;
            // objRet1.updated_at = obj.updated_at;
            objRet1.permisos = obj.permisos.map(function(obj1){
              let objRet = {};
              objRet.id =  obj1.id;
              objRet.name = obj1.name;
              objRet.guard_name = obj1.guard_name;
              objRet.created_at = obj1.created_at;
              objRet.updated_at = obj1.updated_at;
              objRet.descripcion = obj1.descripcion;            
              return objRet;
            })
            return objRet1;
          })
        })
      }catch(error){
        // console.log(error)
      }finally{

      }
    },
    async consPermisos(){
      try{
        const repo = repoupdateprofileuser();
        await repo.consPermisos().then((res)=>{          
          this.Permisos = res.data.slice()
        })
      }catch(error){
        // console.log(error)
      }finally{

      }
    },
  },
  async mounted(){
    
  },
  async created() {
    await this.consRoles();
    await this.consPermisos(); 
    try{
      await this.ActualizarRol(this.Roles[0])
    }catch(error){/*console.log(error)*/}      
  },

}
</script>

<style>

</style>
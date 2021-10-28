<template>
    <div>
      <b-row>
        <b-button @volumechange="console.log('volumen')" class="Btnperl" @click="cambFormint(1)" :class="Formint===1 ? 'Btnpersel':darkMode ? 'Btnperd' : 'Btnperl'" pill id="empBtn" ><b-icon icon="building" font-scale="2.2"></b-icon></b-button>
          <b-tooltip target="empBtn" triggers="hover">Empresas<br>{{value.Empresas.nombre}}</b-tooltip>
        <b-button :disabled="!value.Empresas.hasOwnProperty('id') || value.Propietario==1" class=" Btnperl" @click="cambFormint(2)" :class="Formint===2 ? 'Btnpersel':darkMode ? 'Btnperd' : 'Btnperl'" pill id="cuenBtn"><b-icon icon="credit-card-fill" font-scale="2.2"></b-icon></b-button>
        <b-tooltip target="cuenBtn" triggers="hover">Cuentas bancarias<br>{{value.Cuenta.nickname}}</b-tooltip>
        <b-button  :disabled="value.Cuenta.id<1 || value.Propietario==1" class=" Btnperl" @click="cambFormint(3)" :class="Formint===3 ? 'Btnpersel':darkMode ? 'Btnperd' : 'Btnperl'" pill id="modBtn"><b-icon icon="columns-gap" font-scale="2.2"></b-icon></b-button>
          <b-tooltip target="modBtn" triggers="hover">Módulos<br>{{value.Departamentos.nombre}}</b-tooltip>
        <b-button  :disabled="!value.Departamentos.hasOwnProperty('id') && value.Propietario==0" class=" Btnperl" @click="cambFormint(4)" :class="Formint===4 ? 'Btnpersel':darkMode ? 'Btnperd' : 'Btnperl'" pill id="gruBtn"><b-icon icon="people-fill" font-scale="2.2"></b-icon></b-button>
          <b-tooltip target="gruBtn" triggers="hover">Grupos y usuarios</b-tooltip>
        <b-button :disabled=" value.Usuarios.length === 0 || value.Propietario==1" class=" Btnperl" @click="cambFormint(5)" :class="Formint===5 ? 'Btnpersel':darkMode ? 'Btnperd' : 'Btnperl'" pill id="perBtn"><b-icon icon="ui-checks" font-scale="2.2"></b-icon></b-button>
        <b-tooltip target="perBtn" triggers="hover">Visibilidad de registros y Permisos</b-tooltip>
        <!-- <b-col>
          <b-button class=" Btncgru" @click="cambFormint(5)" :class="darkMode ? 'Btnperd' : 'Btnperl'" pill id="cgruBtn">
            <b-iconstack font-scale="2.2">
              <b-icon stacked icon="people-fill" scale=".8" ></b-icon>
              <b-icon stacked icon="circle" scale="1.3"></b-icon>
            </b-iconstack>
          </b-button>
          <b-tooltip target="cgruBtn" triggers="hover">Crea grupos</b-tooltip>
        </b-col> -->
      </b-row>
      <b-row v-if="Formint>1" class="ml-lg-5 mt-3 ml-sm-1 ml-md-3">
        <p v-if="Formint>1">{{value.Empresas.nombre}} <b>/</b> </p>
        <p class="ml-1" v-if="value.Cuenta.id>-1"> {{value.Cuenta.nickname}} <b>/</b> </p>
        <p v-if="value.Departamentos.id>-1" class="ml-1">{{value.Departamentos.nombre}} <b>/</b> </p>
        <p v-if=" value.Usuarios.length > 0"> {{value.Usuarios.length}} Usuarios</p>
      </b-row>

      <br v-if="value.Propietario === 1">
      <div v-if="value.Propietario === 1" style="background:rgb(20,51,87);" class="aviso">
        <hr size="5"/>
        <b class="p-2"  >{{value.Propietario === 1 ? 'Se está dando permiso a todas las cuentas bancarias y módulos':''}}</b>
        <hr size="5"/>
      </div>
      <hr size="5" v-if="value.Propietario === 0"/>
      <b-row class="justify-content-center" v-if="value.Empresas.propietario === 1">
      <label class="mr-2">¿Desea asignar propietario? </label>
      <b-button class="mr-2 mb-1" variant="outline-success" :pressed="value.Propietario==1" @click="value.Propietario=1"> Si</b-icon></b-button>
      <b-button class="mr-2 mb-1" variant="outline-success" :pressed="value.Propietario==0" @click="value.Propietario=0"> No</b-icon></b-button>
      <!-- <b-button class="mr-2 mb-1" variant="outline-secondary" @click="newPropietario(0,elem.id)" :pressed="!isPropietario(elem.id)"> No</b-icon></b-button> -->
    </b-row>

    <b-row class="" >

      <Empresas ref="compEmpresas" :grupOk="grupExist" v-if="Formint===1" class=" col-12" @EmpSelect="selectEmp" @Permiso="asignaPermiso" :empresas="value.Empresas" :grupo="value.GrupoPermiso">
      </Empresas>
        <!-- <div class=" col-12" :class="darkMode ? 'BGD' : 'BGL'" v-if="Formint===1">
        </div> -->
        <Cuentas v-if="Formint===2" class=" col-12" @CuentaSelect="selectCuenta" :cuenta="value.Cuenta">
        </Cuentas>
        <Modulos v-if="Formint===3" class=" col-12" :Deptos="value.Departamentos" @ModSelect="selectMod"/>
        <!-- <div class=" col-12" :class="darkMode ? 'BGD' : 'BGL'" v-if="Formint===2">

        </div> -->
        <div class=" col-12" :class="darkMode ? 'BGD' : 'BGL'" v-if="Formint===4">
          <br>
          <b-row>
            <b-col class="" ><b-button @click=" cambFormint(value.Propietario==0?3:1)" class="float-left" :class="darkMode ? 'BGD' : 'BGL'"><b-icon icon="chevron-left"></b-icon></b-button></b-col>
            <b-col class="col-8"><center><h4>Selecciona Grupo y/o Usuarios</h4>{{value.Usuarios.length}}</center></b-col>
            <b-col class="" ><b-button :disabled="value.Usuarios.length === 0" @click="cambFormint(5)" :class="darkMode ? 'BGD' : 'BGL'"><b-icon icon="chevron-right"></b-icon></b-button></b-col>
          </b-row>
          <gruposy-usuarios @grupoSelect="selectGrupo" @usuarioSelect="selectUsuario" :empresa="value.Empresas" :grupo="value.Grupo" :usuarios="value.Usuarios"/>
        </div>
        <div class=" col-12" :class="darkMode ? 'BGD' : 'BGL'" v-if="Formint===5">
          <br>
          <div class="d-flex">
            <b-button @click="cambFormint(4)" class="col-2" :class="darkMode ? 'BGD' : 'BGL'"><b-icon icon="chevron-left"></b-icon></b-button>
            <b-button @click="creaJSON()" class="ml-auto" :disabled="!validaFlujo && this.value.Propietario!=1">Guardar</b-button>
          </div>
          <NivelesPermisos ref="NivPer" @permisosSelect="selectPermisos" @tiposSelect="selectTipos"/>
        </div>
        <div class="" :class="darkMode ? 'BGD' : 'BGL'" v-if="Formint===6">
          <Grupos :empresas="Empresas" />
        </div>
    </b-row>

    <p class="invisible">{{validaFlujo}}</p>
    <div v-if="FrmConsultar">
      <tabla-permisos/>
    </div>
    <CModal
      :centered="true"
      @show="console.log('se muestra')"
      title="¿Desea asignar propietario?"
      :show.sync="modalPro">
      <template #footer>
        <b-button class="mr-2 mb-1" variant="outline-secondary" :pressed="value.Propietario==1" @click="value.Propietario=1; modalPro=false; cambFormint(4)">Si</b-button>
        <b-button class="mr-2 mb-1" variant="outline-secondary" :pressed="value.Propietario==0" @click="value.Propietario=0; modalPro=false; cambFormint(2)">No</b-button>
      </template>
    </CModal>
            <!-- </CCardBody>
        </CCard> -->
    </div>
</template>

<script>
import { mapState } from "vuex";
import datetime from 'vuejs-datetimepicker';
import repoupdateprofileuser from "../../assets/repositoriosjs/repoupdateprofileuser";
import respuestas from "../../assets/repositoriosjs/respuestas";
import alertas from "../../assets/repositoriosjs/alertas";
import Empresas from "./subComponentes/Empresas";
import Modulos from "./subComponentes/Modulos";
import Grupos from "./Grupos.vue";
import TablaPermisos from './TablaPermisos.vue';
import GruposyUsuarios from './subComponentes/GruposyUsuarios';
import NivelesPermisos from './subComponentes/Niveles_Permisos';
import Cuentas from './subComponentes/Cuentas'

export default {
  components: {
    Grupos,
    TablaPermisos,
    Empresas,
    Modulos,
    GruposyUsuarios,
    NivelesPermisos,
    Cuentas,
    datetime,
  },
  data() {
    return {
      modalPro:false,
      value: {
        Empresas: {},
        Departamentos: {},
        Usuarios: [],
        Tipos: [],
        Permisos: [],
        Grupo:[],
        Propietario:0,
        Cuenta: {id:-1,nickname: ''},
        GrupoPermiso:{Company_id:0,Name:''},
        FechI:'',
        FechF:'',
        Validate:true,
      },
      grupExist:0,
      Form: 1,
      FrmConsultar:false,
      Formint: 0,
      options: ["Usuario", "Empresa"],
      Empresas: [],
      EmpresasExternas: [],
      Cuentas: [],
      Departamentos: [],
      Usuarios: [],
      Tipos: [],
      Permisos: [],
      Grupos:[],
      AsigPropietario: [{ id: -1, prop: -1 }],
      selected: true,
      moduloselect:0,
      fields: [
        // {   key: 'id', label : 'N° Usuario' },
        { key: "nombre", label: "Nombre" },
      ],
    };
  },
  computed: {
    ...mapState(["darkMode"]),
    validaFlujo(){
      console.log(this.$parent.$parent.modalGrupos);
      if(!this.$parent.$parent.modalGrupos){
        this.limpiaForm();
      }
      let flujoOk=false
      if(this.value.Empresas.hasOwnProperty('id')){
        if(this.value.Propietario==0){
            this.value.Cuenta.id==-1 ? this.cambFormint(2)
            : !this.value.Departamentos.hasOwnProperty('id') ? this.cambFormint(3)
            : this.value.Usuarios.length === 0 ? this.cambFormint(4)
            : this.value.Tipos.length==0 || this.value.Permisos.length ==0 ? flujoOk=false : flujoOk = true
          }else{
            this.value.Cuenta.id=-1;
            this.value.Departamentos={}
            this.value.Usuarios.length === 0 ? this.cambFormint(4)
            : this.value.Tipos.length==0 || this.value.Permisos.length ==0 ? flujoOk=false : flujoOk = true
          }
      }
      return flujoOk;
    },
    returnCriterio() {
      return this.value.Empresas.label === "Empresa"
        ? this.Empresas
        : this.value.Empresas.label === "Usuario"
        ? this.Usuarios
        : null;
    },
    blockNiveles(){
      if(this.value.Tipos[0]==1){
        return [2,3,4]
      }else if(this.value.Tipos[0]==2||this.value.Tipos[0]==4){
        return [1,3]
      }else if(this.value.Tipos[0]==3||this.value.Tipos[0]==4){
        return [1,2]
      }else{
        return []
      }
    },
    blockPermisos(){
      let val = this.value.Permisos[0]
      if(val==2||val==3||val==4||val==5||val==8){
        return [6,7]
      }else if(val==6){
        return [2,3,4,5,7,8]
      }else if(val==7){
        return [2,3,4,5,6,8]
      }else{
        return []
      }
    }
  },
  methods: {
    asignaPermiso(data){
      this.value.GrupoPermiso=data
    },
    selectCuenta(data){
      this.value.Cuenta=data
      this.cambFormint(3);
    },
    selectMod(data){
      this.value.Departamentos = data
      this.cambFormint(4);
    },
    selectEmp(data){
      this.value.Empresas = data;
      console.log(data);
      if(this.value.Empresas.propietario ===1 && this.grupExist!=1){
        this.modalPro=true;
      }else{
        this.cambFormint(2);
      }
    },
    cambiaFrm(){
      this.FrmConsultar = !this.FrmConsultar
    },
    selectUsuario(data){
      this.value.Usuarios = data
      console.log(data);
    },
    selectGrupo(data){
      this.value.Grupo=data;
    },
    selectTipos(data){
      this.value.Tipos=data;
    },
    selectPermisos(data){
      this.value.Permisos=data;
    },
    limpiaForm(){
      this.value.Usuarios= [];
      this.value.Tipos= [];
      this.value.Permisos= [];
      this.moduloselect = 0;
      this.value.Empresas={};
      this.value.Departamentos={};
      this.value.Propietario=0;
      this.value.Cuenta={id:-1,nickname: ''};
      this.value.GrupoPermiso={Company_id:0,Name:''};
      this.value.Validate= true;
      this.grupExist=0;
      this.cambFormint(1);
      // this.$parent.$parent.modalGrupos=false;
      // this.$parent.$parent.inicio();
    },
    async creaJSON(creaG=true){
      console.log(this.value.Tipos.sort().join(''));
        let request = {};
        if(creaG){
          await this.creaGrupo()
        }else{
          let grupExis=this.$parent.$parent.items.find(elem=>elem.nombre==this.$refs.compEmpresas.form.Name);
          this.value.GrupoPermiso.Id=grupExis.id;
        }
        request.Permission_id=this.value.GrupoPermiso.Id;
        request.Account_id= this.value.Cuenta.id;
        request.Model= this.value.Departamentos.id;
        request.Owner= this.value.Propietario==1?true:false;
        request.Visibility_id= this.value.Tipos.sort().join('');
        request.Permissions_id= this.value.Permisos;
        request.Model_id=[];
        request.Users= this.value.Usuarios.map(elem => elem.id);
        request.Company_id=this.value.Empresas.id;
        request.Date1=this.value.FechI.length==0?1:this.value.FechI;
        request.Date2=this.value.FechF.length==0?1:this.value.FechF;
        request.Validate=this.value.Validate;
        console.log(request);
        if(this.value.GrupoPermiso.hasOwnProperty('Id')){
          await this.creaGPermiso(request)
        }
    },
    async creaGrupo() {
      try {
        console.log(this.value.GrupoPermiso);
        const repo = repoupdateprofileuser();
        await repo.creaGroupPermisos(this.value.GrupoPermiso).then((res) => {
          if(res.code==201) {
            this.value.GrupoPermiso.Id = res.data.id;
          }else if(res.code==204){
            this.grupExist = 1
            if(this.Formint==1){
              this.$refs.compEmpresas.warningModal = true;
              this.value.Validate=false;
            }else{
              this.cambFormint(1);
            }
          }
          console.log(res);
        });
      } catch (error) {
        //         console.log(error);
      } finally {//
      }
    },
    cambFormint(frm) {
      try {
        this.Formint = frm;
        this.$refs.tooltip.$emit('open')
      } catch (error) {
        // //         console.log(error);
      }
    },
    imp(id) {
      try {
        if (this.moduloselect === id) {
          this.moduloselect = 0;
        } else {
          this.moduloselect = id;
        }
      } catch (error) {
        // //         console.log(error);
      }
    },
    cambiaEmpresas() {
      try {
        let empresas = this.Empresas.filter((elem) => this.value.Empresas.includes(elem.id));
        empresas = empresas.concat(this.EmpresasExternas.filter((elem) => this.value.Empresas.includes(elem.id)));
        if (this.AsigPropietario.length > 0 && this.value.Empresas.length < this.AsigPropietario.length && this.moduloselect.length > 0 && this.value.Empresas.length < this.moduloselect.length)
        {
            this.AsigPropietario = this.AsigPropietario.filter((elem) => this.value.Empresas.includes(elem.id));
            this.moduloselect = this.moduloselect.filter((elem) => this.value.Empresas.includes(elem.id));
        } else {
          this.AsigPropietario = empresas.map((elem) => {
            let newE = {};
            newE.id = elem.id;
            newE.prop = -1;
            return newE;
          });
        }
      } catch (error) {
        // console.log(error);
      }
    },
    isPropietario(id) {
      try {
        let aux = this.AsigPropietario.filter((elem) => elem.id === id);
        return aux.length > 0 ? (aux[0].prop == 1 ? true : false) : false;
      } catch (error) {
        //         console.log(error);
      }
    },
    isModuloselect(id) {
      try {
        let aux = this.moduloselect.filter((elem) => elem.id === id);
        return aux.length > 0 ? (aux[0].prop == 1 ? true : false) : false;
      } catch (error) {
        //         console.log(error);
      }
    },
    newPropietario(prop, id) {
        try {
            this.AsigPropietario.map(function (elem) {
                if (elem.id == id) {
                    elem.prop = prop;
                }
                return elem;
            });
        } catch (error) {
            //         console.log(error);
        }
    },

    cambiarForm(op) {
      try {
        if (op === "+") {
          this.Form = this.Form + 1;
          this.$root.$emit("bv::toggle::collapse", "accordion-" + this.Form);
        } else if (op === "-") {
          this.Form = this.Form - 1;
          this.$root.$emit("bv::toggle::collapse", "accordion-" + this.Form);
        } else {
          this.Form = parseInt(op);
          this.$root.$emit("bv::toggle::collapse", "accordion-" + this.Form);
        }
      } catch (error) {
        //         console.log(error);
      }
    },
    validaSecciones(form) {
      switch (form) {
        case 1:
          return this.value.Empresas.length;
        case 2:
          return this.value.Departamentos.length;
        case 3:
          return this.value.Usuarios.length;
        case 4:
          return this.value.Tipos.length;
        case 5:
          return this.value.Usuarios.length;
        default:
          return 0;
      }
    },
    toggleAll() {
      this.selected = !this.selected;
      this.selected
        ? (this.value.Empresas = this.Empresas.map((elem) => elem.id))
        : this.value.Empresas.splice(0, this.value.Empresas.length);
    },
    async getGrupos(id) {
        try {
            const repo = repoupdateprofileuser();
            let request = {};
            request.Company_id = id
            await repo.consGroupEmpresas(request).then((res) => {

                this.Grupos.push(res.data)
                // console.log(this.Grupos);
                });
        } catch (error) {
                    console.log(error);
        } finally {//
        }
    },
    async getCuentas(id) {
        try {
            const repo = repoupdateprofileuser();
            let request = {};
            request.Company_id = id
            await repo.getmycuentas().then((res) => {
              this.Cuentas = res.data.cuentas;
            });
        } catch (error) {
                    console.log(error);
        } finally {//
        }
    },
    async getEmpresasExt() {
      try {
        const repo = repoupdateprofileuser();
        await repo.consEmpresasExt().then((res) => {
            this.EmpresasExternas = res.data.map(function (obj) {
                let newObj = {};
                newObj.nombre = obj.empresa.nombre;
                newObj.id = obj.empresa.id;
                newObj.propietario = obj.Permiso_id;
                return newObj;
            });
        });
      } catch (error) {
        //         console.log(error);
      } finally {
        //
      }
    },
    async getEmpresas() {
      try {
        const repo = repoupdateprofileuser();
        await repo.getempresasback().then((res) => {
          this.Empresas = res.data.data.map(function (obj) {
            let newObj = {};
            newObj.nombre = obj.nombre;
            newObj.id = obj.id;
            newObj.propietario = 1;
            return newObj;
          });
        });
      } catch (error) {
        //         console.log(error);
      } finally {//
      }
    },
    async getDepartamentos() {
      try {
        const repo = repoupdateprofileuser();
        await repo.consDeparamentos().then((res) => {
          this.Departamentos = res.data.map(function (obj) {
            let newObj = {};
            newObj.nombre = obj.Name;
            newObj.id = obj.id;
            return newObj;
          });
        });
      } catch (error) {
        //         console.log(error);
      } finally {
        //
      }
    },
    async getUsuarios() {
      try {
        const repo = repoupdateprofileuser();
        await repo.onlyusers().then((res) => {
          this.Usuarios = res.data.map(function (obj) {
            let newObj = {};
            newObj.nombre = obj.name;
            newObj.id = obj.id;
            // newObj.email = obj.email;
            // newObj.telefono = obj.telefono;
            return newObj;
          });
        });
      } catch (error) {
        //         console.log(error);
      } finally {
        //
      }
    },
    async getNivelesdeAccesos() {
      try {
        const repo = repoupdateprofileuser();
        await repo.consAccesos().then((res) => {
          this.Tipos = res.data.map(function (obj) {
            let newObj = {};
            newObj.nombre = obj.Name;
            newObj.id = obj.id;
            return newObj;
          });
        });
      } catch (error) {
        //         console.log(error);
      } finally {
        //
      }
    },
    async getPermisos() {
      try {
        let temp = {};
        const repo = repoupdateprofileuser();
        await repo.consPermisos().then((res) => {
          this.Permisos = res.data.map(function (obj) {
            let newObj = {};
            newObj.nombre = obj.name;
            newObj.id = obj.id;
            newObj.desc = obj.descripcion;
            // if(obj.id===7){
            //   temp=newObj
            // }
            return newObj;
          });
          this.Permisos = this.Permisos.filter((elem) => elem.id !== 1);
        });
        // this.Tipos.push(temp)
      } catch (error) {
                console.log(error);
      } finally {
        //
      }
    },
    async creaGPermiso(request) {
      try {
        const alert = alertas();
        const repo = repoupdateprofileuser();
        await repo.creaGroup(request).then((res) => {
          if(res.code==201){
            let newObj={
              Tit:'Permisos',
              Text:'Se creo correctamente',
              icono:'success'
            };
            alert.PermisosOK(newObj);
            this.limpiaForm();
          }else{
            alert.PermisosError();
          }
          console.log(res)
        });
      } catch (error) {
          const alert = alertas();
          alert.PermisosError();
          console.log(error);
      } finally {
        //
      }
    },
  },
  async mounted() {
    await this.getEmpresas();
    await this.getEmpresasExt();
    await this.getDepartamentos();
    await this.getNivelesdeAccesos();
    await this.getPermisos();
    this.Empresas = this.Empresas.concat(this.EmpresasExternas)
    // // for(let e of emp){
    // //         // console.log(emp.id);
    // //         // this.Grupos.push(await this.getGrupos(emp.id));
    // //         await this.getGrupos(e.id)
    // //     }
    this.Grupos = this.Grupos.flat()
  },
};
</script>

<style scoped>
.tag {
  background: rgba(6, 122, 21, 0.842);
  color: white;
  margin-left: 1%;
  padding-left: 2%;
  padding-bottom: 0%;
  padding-right: 2%;
  cursor:default;
  font-family: arial;
  font-weight: bold;
}

.descrip {
  color: rgb(139, 139, 139);
  font-size: 0.8rem;
  display: table-cell;
}

.btnRotar {
  transform: rotate(-90deg);
  position: absolute;
  top: 15.5rem;
  left: -5.8rem;
  width: 15rem;
  font-weight: bold;
  /* height: 2.5rem; */
}
.colRotar {
  width: 5%;
}
.Btnperl{
  background: #3c4b64;
  height: 3.8rem;
  width: 3.8rem;
  margin-right: auto;
  margin-left: auto;
}
.Btnpersel{
  background: #083e9bce;
  border: none;
  height: 3.8rem;
  width: 3.8rem;
  margin-right: auto;
  margin-left: auto;
}
.Btnperl:hover{
  background: #586e94;
}
.Btnperd{
  background: #23242d;
  height: 3.8rem;
  width: 3.8rem;
  margin-right: auto;
  margin-left: auto;
}
.Btnperd:hover{
  background: #4d4f62;
}
.Btncgru{
  background: rgb(126, 126, 126);
  height: 4rem;
  width: 4rem;
}

.aviso{
  border-radius: 10px;
  display: flex;
  align-items:center;
}

.BGL{
  margin: 0px;
  padding-left: 8px;
  padding-right: 8px;
  background: #3c4b64;
  color: white;
  border-radius: 10px;
}
.BGDsel{
  margin: 0px;
  padding-left: 8px;
  padding-right: 8px;
  background: #083e9bce;
  color: white;
  border-radius: 10px;
}

.BGD{
  margin: 0px;
  padding-left: 8px;
  padding-right: 8px;
  background: #23242d;
  border-radius: 10px;
}


.contenedor,
.contenedor:before,
.contenedor:after {
  position: relative;
  display:block;
	width:  40px;
	height: 40px;
	background: rgb(251, 250, 250);
	border-top-right-radius: 20px;
}
.contenedor {
  margin: 0px auto 0 10px;
  transform: rotate(-60deg) skewX(-30deg) scale(1,.866);
}
.contenedor:before,
.contenedor:after {
	content: '';
	position: absolute;
}
.contenedor:before {
	transform: rotate(-135deg) skewX(-45deg) scale(1.414,.707) translate(0,-50%);
}
.contenedor:after {
	transform: rotate(135deg) skewY(-45deg) scale(.707,1.414) translate(50%);
}
</style>

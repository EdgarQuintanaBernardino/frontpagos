import "regenerator-runtime/runtime";
import store from "@/store";
import Axios from "axios";
import VueCryptojs from "vue-cryptojs";
import Vue from "vue";
// import localstorage from "@/services/SessionStorage.js";
import repologin from "@/views/pages/repologin.js";
import respuestas from "./respuestas";
import alertas from "./alertas";

// const server = "http://192.168.100.35:8000/api";
const server = "http://18.218.153.207/api";

let api = `${server}/user/update`;
let apidesdeadmin = `${server}/user/updatedesdeadmin`; ////check
let apiempresa = `${server}/empresa/create`;
let apiempresaupdate = `${server}/empresa/update`;
let apicuentaupdate = `${server}/cuenta/update`;
let updateforsharedapi = `${server}/cuenta/updateforshared`;

let setcuentasempresa = `${server}/cuenta/relacionempresa`;

let resetcontrasena = `${server}/user/refresh`;
let addcuenta = `${server}/cuenta/create`;
let addproyectapi = `${server}/proyecto/create`;
let updateproyectapi = `${server}/proyecto/edit`;
let deleteproyectoapi = `${server}/proyecto/delete`;

let getproyectosapi = `${server}/proyecto/get`;

let addsucursalapi = `${server}/sucursales/create`;
let getcuentas = `${server}/cuenta/getall`;

let apiempresadelete = `${server}/empresa/delete`;
let apicuentaadelete = `${server}/cuenta/delete`;
let apigetusers = `${server}/user/all`;
let updateusers = `${server}/user/updateuser`;
let updateusersadmin = `${server}/user/lockadmin`;
let unlockusersadminapi = `${server}/user/unlockadmin`;

let apiresetpassword = `${server}/user/resetpassword`;
let apiradduser = `${server}/user/create`;
let deleteuserin = `${server}/user/destroy`;
let getrolesypermisos = `${server}/role/all`;
let droprol = `${server}/role/destroy`;
let createrol = `${server}/role/create`;
let uprol = `${server}/role/update`;
let updaterolesuser = `${server}/user/addrole`;
let getproductosapi = `${server}/producto/getall`;
let compartepersmisoproductoapi = `${server}/producto/permissions`;
let createproduct = `${server}/producto/create`;
let deletefotogalery = `${server}/producto/deletephoto`;
let deletefotogaleryshared = `${server}/producto/deletephotoshared`;

let updateproduct = `${server}/producto/update`;
let updateproductosharedapi = `${server}/producto/updateshared`;

let destroyproductsharedapi = `${server}/producto/destroyshared`;

let deleteproducto = `${server}/producto/destroy`;
let empresasall = `${server}/empresa/all`;
let pagossend = `${server}/user/send`;
let solicitudsinsendapi = `${server}/user/allsmall`;
let pagossolicitudapi = `${server}/user/solicitarpago`;
let deletefotopagos = `${server}/pagos/deletephotopago`;
let actualizapago = `${server}/user/updatepago`;
let deletepago = `${server}/user/deletepago`;
let restoreuser = `${server}/user/restore`;
let userscambia = `${server}/user/onlyupdate`;
let allusers = `${server}/user/allusers`; ///verify
let allonluusers = `${server}/user/allusersonlypost`; ///solo tus amigos

let sendorrequest = `${server}/user/createorrequest`; ///solo tus amigos
let lockuserapi = `${server}/user/lockuser`; ///solo tus amigos

let unlockuserapi = `${server}/user/unlockuser`; ///solo tus amigos
let cancelrequestapi = `${server}/user/cancelrequest`; ///solo tus amigos
let cancelrequestinapi = `${server}/user/cancelrequestin`; ///solo tus amigos

let aceptrequestapi = `${server}/user/aceptrequest`; ///solo tus amigos

let lockuserrequestapi = `${server}/user/lockuserrequest`; ///bloquea desde la solicitud, eliminando la misma y bloqueando al usuario
let onlyempresaapi = `${server}/empresa/onlyempresas`;
let onlyempresaapiback = `${server}/empresa/onlyempresasback`;

let onlycuentaapi = `${server}/cuenta/getall`;
let onlycuentaapiback = `${server}/cuenta/getallback`;

let compartepersmisoempresaapi = `${server}/empresa/permissions`;
let compartepersmisocuentaapi = `${server}/cuenta/permissions`;
let getsharedproductspai = `${server}/producto/sharedproducts`;

let getsharedcompaniesapi = `${server}/empresa/sharedcompanies`;

let editsharedcompaniesapi = `${server}/empresa/editsharedcompanies`;
let deletesharedcompaniesapi = `${server}/empresa/deletesharedcompanies`;

let createpermisoscuentaapi = `${server}/empresa/deletesharedcompanies`;

let sharedcuentasapi = `${server}/cuenta/sharedcuentas`;
let deletecuentasharedapi = `${server}/cuenta/deletecuentashared`;
let yourrequestapi = `${server}/user/yourrequest`;
let invitaramigoapi = `${server}/user/allusers`;
let yourusersbackapi = `${server}/user/interfaceuser`;
let yourusersbackadminapi = `${server}/user/interfaceuseradmin`;

let getsucursalesapi = `${server}/sucursales/getall`;
////PAGOS
let sendfirstpay = `${server}/pagos/create`;
let editFirstPay = `${server}/pagos/editv2`; //Nuevo de editar temporal sin archivos
let updatepayapiV2 = `${server}/pagos/destroyv2`; // Nuevo de eliminar ingreso con archivos permanente
let updatepayapi = `${server}/pagos/update`;
let createsolicitudapi = `${server}/pagos/createnotemp`;
let apiaddcuenta = `${server}/pagos/addcuentas`;
let apiaddlinks = `${server}/pagos/addlinks`;
let apiaddproyects = `${server}/pagos/addproyects`;
let apiaddtags = `${server}/pagos/addtags`;
let apideletefile = `${server}/pagos/deletefile`;
let apifinishpago = `${server}/pagos/finish`;
let apiPagosBack = `${server}/pagos/getpagosback`;
let Api_Message_Id = `${server}/pagos/get_message_id`;

///Historial
let Api_Message_Send = `${server}/historial/send_message`;
let Api_Message_First = `${server}/historial/first_message`;
let Api_canastas1 = `${server}/productos/get_productos1`;
let Api_canastas2 = `${server}/productos/get_productos2`;

const response = respuestas();
const alerts = alertas();

//Restaura cuenta bancaria
let resCuenta = `${server}/cuenta/restore`;
const restauracuenta = async request => {
  let tokenin = store.getters.gettoken;
  console.log(request);
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(resCuenta, request, configin)
    .then(res => {
      // return response.cuentadelete(res.data);
      return res.data;
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
//Consulta Cuentas Bancarias suspendidas
let getSuspendidas = `${server}/cuenta/suspendida`;
const consCuentasSus = async () => {
  let request = "";
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(getSuspendidas, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      // console.log(error)
      return response.filtraerror(error);
    });
  return result;
};
//Consulta Monedas
let getMonedas = `${server}/monedas`;
const consMonedas = async () => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.get(getMonedas, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      // console.log(error)
      return response.filtraerror(error);
    });
  return result;
};
//Consulta Bancos
let getBancos = `${server}/bancos`;
const consBancos = async () => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.get(getBancos, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      // console.log(error)
      return response.filtraerror(error);
    });
  return result;
};
// Cambia la privacidad de perfil
let cambiaPrivacidadPerfil = `${server}/cuenta/tipo`;
const consPrivacidadPerfil = async () => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(cambiaPrivacidadPerfil, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
      return response.filtraerror(error);
    });
  return result;
};

//Crea numero de teléfono
let CreNumTelefono = `${server}/phone/create`;
const CreateNumTelefono = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(CreNumTelefono, request, configin)
    .then(res => {
      console.log(res);
      return res.data;
    })
    .catch(error => {
      console.log(error);
      return response.filtraerror(error);
    });
  return result;
};
//Elimina numeros de teléfono
let DelNumTelefono = `${server}/phone`;
const DeleteNumTelefono = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(DelNumTelefono, request, configin)
    .then(res => {
      console.log(res);
      return res.data;
    })
    .catch(error => {
      console.log(error);
      return response.filtraerror(error);
    });
  return result;
};
//Actualiza numeros de teléfono
let upNumTelefono = `${server}/phone`;
const UpdateNumTelefono = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.put(upNumTelefono, request, configin)
    .then(res => {
      console.log(res);

      return res.data;
    })
    .catch(error => {
      console.log(error);
      return response.filtraerror(error);
    });
  return result;
};
//Consulta Tipos de cuentas
let getTiposCuentas = `${server}/cuenta/tipo`;
const consTiposCuentas = async () => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.get(getTiposCuentas, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      // console.log(error)
      return response.filtraerror(error);
    });
  return result;
};
// Consulta tabla videos MARKETING (Paginación)
let apiRedesPag = `${server}/empresa/onlyempresas`;
let apiVideosPag = `${server}/empresa/onlyempresas`;

//Actualiza grupo(solo nombre) de empresa
let DeleteGrupoEmpresa = `${server}/group/delete`;
const DelGroupEmpresas = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(DeleteGrupoEmpresa, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
      return response.filtraerror(error);
    });
  return result;
};
//Actualiza grupo agrega usuarios
let AddUsersGrupoEmpresa = `${server}/group/addusers`;
const AddUsGroupEmpresas = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(AddUsersGrupoEmpresa, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
      return response.filtraerror(error);
    });
  return result;
};
//Actualiza grupo(solo nombre) de empresa
let UpdateGrupoEmpresa = `${server}/group/update`;
const ActGroupEmpresas = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(UpdateGrupoEmpresa, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
      return response.filtraerror(error);
    });
  return result;
};
//Crea grupos de empresa ahora de usuarios
let CreateGrupoEmpresa = `${server}/group`;
const creaGroupEmpresas = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(CreateGrupoEmpresa, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
      return response.filtraerror(error);
    });
  return result;
};
//Endpoint para manejar grupos de permisos
let GrupoPermisos = `${server}/groupp`;
const addUsGroup = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(`${GrupoPermisos}/addusers`, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
      return response.filtraerror(error);
    });
  return result;
};
//Crea grupo de permisos con usuarios y permisos
let CreateGrupo = `${server}/groupp/create`;
const creaGroup = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(CreateGrupo, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
      return response.filtraerror(error);
    });
  return result;
};
//Consulta nombre de los grupos por empresas
let consGrupo = `${server}/groupp`;
const consGroup = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    params: { Company_id: request },
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.get(consGrupo, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
      return response.filtraerror(error);
    });
  return result;
};
//Crea grupos de permisos ESTE
let CreateGrupoPermisos = `${server}/groupp/name`;
const creaGroupPermisos = async request => {
  // console.log(request);
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(CreateGrupoPermisos, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
      return response.filtraerror(error);
    });
  return result;
};
//Elimina grupos de permisos
let EliminaGrupoPermisos = `${server}/groupp/delete`;
const deleGroupPermisos = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(EliminaGrupoPermisos, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
      return response.filtraerror(error);
    });
  return result;
};
//Actualiza permisos al usuario
let ActualizaPermisosUsuario = `${server}/groupp/update`;
const ActPermisosUsuario = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(ActualizaPermisosUsuario, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
      return response.filtraerror(error);
    });
  return result;
};
//Actualiza permisos al usuario
let ChangeName = `${server}/groupp/edit`;
const NewNamePermission = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(ChangeName, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
      return response.filtraerror(error);
    });
  return result;
};
//Consulta la informacion para editar un permiso de un usuario
let ConsultaPermisosUsuario = `${server}/groupp/users`;
const ConsPermisosUsuario = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(ConsultaPermisosUsuario, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
      return response.filtraerror(error);
    });
  return result;
};
//Elimina grupos de permisos
let EliminaUsuariodeGrupo = `${server}/groupp/duser`;
const DelUsuarioGrupo = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(EliminaUsuariodeGrupo, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
      return response.filtraerror(error);
    });
  return result;
};
// Agrega usuarios a un permiso
let AgregaUsuariodeGrupo = `${server}/groupp/adduser`;
const AddUsuarioGrupo = async request => {
  console.log(request);
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(AgregaUsuariodeGrupo, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
      return response.filtraerror(error);
    });
  return result;
};
//Consulta usuarios del grupo
let GetUsersGrupo = `${server}/group/users`;
const consUsGrupo = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(GetUsersGrupo, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
      return response.filtraerror(error);
    });
  return result;
};
//Consulta grupos de una determinada empresa con todo y usuarios
let getGroupAllEmpresas = `${server}/group/all`;
const consGroupAllEmpresas = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(getGroupAllEmpresas, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
      return response.filtraerror(error);
    });
  return result;
};
//Consulta grupos de empresa
let getGroupEmpresas = `${server}/group`;
const consGroupEmpresas = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` },
    params: { Company_id: request.Company_id }
  };
  let result = await Axios.get(getGroupEmpresas, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
      return response.filtraerror(error);
    });
  return result;
};
//Conulta empresas externas
let getEmpresasExt = `${server}/shared/company`;
const consEmpresasExt = async () => {
  // let request;
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.get(getEmpresasExt, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
      return response.filtraerror(error);
    });
  return result;
};
// Modulo de ARCHIVOS, ENTREGA LOS ARCHIOS QUE HAY EN UNA SOLICITUD EXISTENTE
let getFiles = `${server}/pagos/allfiles`;
const constUsersFiles = async request => {
  console.log(request);
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(getFiles, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
      return response.filtraerror(error);
    });
  return result;
};
//Conulta los tipos de accesos para permisos
let getAccesos = `${server}/select/get`;
const consAccesos = async () => {
  let request;
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(getAccesos, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
      return response.filtraerror(error);
    });
  return result;
};

//Conulta los departamentos
let getDepartamentos = `${server}/departamento/get`;
const consDeparamentos = async () => {
  let request;
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(getDepartamentos, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
      return response.filtraerror(error);
    });
  return result;
};

//Actualiza roles de usuario con permisos
let RolesUserDelete = `${server}/roleuser/delete`;
const DeleteRoles = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(RolesUserDelete, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
      return response.filtraerror(error);
    });
  return result;
};
//Actualiza roles de usuario con permisos
let RolesUserUpdate = `${server}/roleuser/update`;
const UpdateRoles = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(RolesUserUpdate, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
      return response.filtraerror(error);
    });
  return result;
};
//Crea roles de usuario
let RolesUserCreate = `${server}/roleuser/create`;
const CreateRoles = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(RolesUserCreate, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
      return response.filtraerror(error);
    });
  return result;
};
//obtiene los permisos del sistema crear editar ...
let PermisosSistema = `${server}/permisos/get`;
const consPermisos = async () => {
  let request;
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(PermisosSistema, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
      return response.filtraerror(error);
    });
  return result;
};
//obtiene los permisos de una cuenta dada
let PermisosCuenta = `${server}/pagos/indexpagos`;
const consPermisosCuenta = async () => {
  let request;
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(PermisosCuenta, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
      return response.filtraerror(error);
    });
  return result;
};
//obtiene los roles del usuario
let RolesUser = `${server}/roleuser/get`;
const consRoles = async () => {
  let request;
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(RolesUser, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
      return response.filtraerror(error);
    });
  return result;
};
const yourrequest = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(yourrequestapi, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      //
      return response.filtraerror(error);
    });
  return result;
};
// PERMISOS MODAL 4 PASOS
// Valida el nombre y empresa de un permiso
let ValidateNameCompany = `${server}/groupp/validatename`;
const ValidateNameC = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(ValidateNameCompany, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
      return response.filtraerror(error);
    });
  return result;
};

//Consulta de videosRedes
let apiConstVideosRedSocial = `${server}/videos/get`;
const VideosRedSocial = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(apiConstVideosRedSocial, request, configin)
    .then(res => {
      return res;
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
// Consulta de redes por tipo de estado para modulo MARKETING
let apiConstRedesEstatus = `${server}/redes`;
const TiposRedes = async request => {
  let tokenin = store.getters.gettoken;
  let confing = {
    headers: { Authorization: `Bearer ${tokenin}` },
    params: { Id_status: request }
  };
  let result = await Axios.get(apiConstRedesEstatus, confing)
    .then(res => {
      return res;
    })
    .catch(error => {
      return response.filters(error);
    });
  return result;
};
// Cambia el estado de la red social lado MARKETING
let apiConstCambiaRedesEstatus = `${server}/redes/status`;
const CambiaTiposRedes = async request => {
  let tokenin = store.getters.gettoken;
  let confing = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.put(apiConstCambiaRedesEstatus, request, confing)
    .then(res => {
      return res;
    })
    .catch(error => {
      return response.filters(error);
    });
  return result;
};
// Consulta de videos por tipo de estado para modulo de MARKETING
let apiConstVideosEstatus = `${server}/videos`;
const VideosRedes = async request => {
  let tokenin = store.getters.gettoken;
  let confing = {
    headers: { Authorization: `Bearer ${tokenin}` },
    params: { Id_status: request }
  };
  let result = await Axios.get(apiConstVideosEstatus, confing)
    .then(res => {
      return res;
    })
    .catch(error => {
      return response.filters(error);
    });
  return result;
};
// Cambia el estado de los videos lado MARKETING
let apiConstCambiaVideosEstatus = `${server}/videos/status`;
const CambiaVideosRedes = async request => {
  let tokenin = store.getters.gettoken;
  let confing = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.put(apiConstCambiaVideosEstatus, request, confing)
    .then(res => {
      return res;
    })
    .catch(error => {
      return response.filters(error);
    });
  return result;
};
//Agregar videos
let apiConstAddVideo = `${server}/videos/create`;
const addVideoRedSocial = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(apiConstAddVideo, request, configin)
    .then(res => {
      return res;
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
//Eliminar videos de las redes Sociales
let apiElimiarVideoRed = `${server}/videos/delete`;
const deleteVideoRed = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(apiElimiarVideoRed, request, configin)
    .then(res => {
      return res;
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
// Update videos de las redes sociales
let apiEditarVideoRed = `${server}/videos/update`;
const editVideoRed = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(apiEditarVideoRed, request, configin)
    .then(res => {
      return res;
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
//Validación influencer
let apiInfluencer = `${server}/user/influencer`; //Activa o desactiva campo influencer
const updateInfluencer = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(apiInfluencer, request, configin)
    .then(res => {
      return res;
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
//Consulta tipos de redes Sociales
let apiConstTiposRedSocial = `${server}/tipos/get`;
const TiposRedSocial = async () => {
  let request;
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(apiConstTiposRedSocial, request, configin)
    .then(res => {
      return res;
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
//Consulta redes Sociales
let apiConsRedeSociales = `${server}/redes/get`;
const ConsRedSociales = async () => {
  let request;

  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(apiConsRedeSociales, request, configin)
    .then(res => {
      // console.log(res);
      return res;
    })
    .catch(error => {
      //
      return response.filtraerror(error);
    });
  return result;
};
//Eliminar red social
let apiEliminaRedSocial = `${server}/redes/delete`;
const deleteRedSocial = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(apiEliminaRedSocial, request, configin)
    .then(res => {
      return res;
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
//Crear redes Sociales
let apiCrearRedSocial = `${server}/redes/create`;
const createRedSocial = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(apiCrearRedSocial, request, configin)
    .then(res => {
      return res;
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
//Editar redes Sociales
let apiEditarRedSocial = `${server}/redes/update`;
const editRedSocial = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(apiEditarRedSocial, request, configin)
    .then(res => {
      return res;
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
//Aceptar Politicas de privacidad por cada una de las redes
let apiAceptarPolitica = `${server}/redes/politica`;
const aceptarPolitica = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(apiAceptarPolitica, request, configin)
    .then(res => {
      return res;
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
const update = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(api, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      //
      return response.filtraerror(error);
    });
  return result;
};
const addcuentassolicitud = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(apiaddcuenta, request, configin)
    .then(res => {
      return response.verifyrequest(res.data);
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
const addlinkssolicitud = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(apiaddlinks, request, configin)
    .then(res => {
      return response.verifyrequest(res.data);
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
const addproyectsolicitud = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(apiaddproyects, request, configin)
    .then(res => {
      return response.verifyrequest(res.data);
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
const deletefile = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(apideletefile, request, configin)
    .then(res => {
      return response.verifyrequest(res.data);
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
const finishpago = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(apifinishpago, request, configin)
    .then(res => {
      return response.verifyrequest(res.data);
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
const Get_Messages_For_Id = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(Api_Message_Id, request, configin)
    .then(res => {
      return response.verifyrequest(res.data);
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};

const Send_Message = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(Api_Message_Send, request, configin)
    .then(res => {
      return response.verifyrequest(res.data);
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
const First_Message = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(Api_Message_First, request, configin)
    .then(res => {
      return res;
      return response.verifyrequest(res.data);
    })
    .catch(error => {
      return error;
      return response.filtraerror(error);
    });
  return result;
};

const PagosBack = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(apiPagosBack, request, configin)
    .then(res => {
      return response.verifyrequest(res.data);
    })
    .catch(error => {
      return error;
      return response.filtraerror(error);
    });
  return result;
};

const addtagssolicitud = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(apiaddtags, request, configin)
    .then(res => {
      return response.verifyrequest(res.data);
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};

const createempresa = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(apiempresa, request, configin)
    .then(res => {
      console.log(res.data);
      return response.verifyresponseempresa(res.data);
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
const updatecontrasenauser = async request => {
  try {
    let check = repologin();
    let result = await check.login(request);

    if (result.data.hasOwnProperty("token")) {
      return setcontraback(request, result.data.token);
    } else {
      return "contraseña invalida";
    }
  } catch (error) {
    //   console.log(error)
    return "contraseña invalida";
  }
};
async function setcontraback(request, tokenin) {
  let config = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let responses = await Axios.post(resetcontrasena, request, config)
    .then(res => {
      return alerts.successpass();
    })
    .catch(error => {
      return response.verifyresponse(response.filtraerror(error));
    });
  return responses;
}
const adcuenta = async request => {
  let token = store.getters.gettoken;
  let config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  let responses = await Axios.post(addcuenta, request, config)
    .then(res => {
      return response.verifyresponsecuenta(res.data);
    })
    .catch(error => {
      return response.filtraerror(error);
    });

  return responses;
};
const addproyect = async request => {
  let token = store.getters.gettoken;

  let config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  let responses = await Axios.post(addproyectapi, request, config)
    .then(res => {
      let mensaje = {
        tittle: "Proyectos",
        text: "Proyecto Agregado Con éxito",
        icon: "success"
      };
      return response.verificayresponde(res.data, mensaje);
    })
    .catch(error => {
      return response.filtraerror(error);
    });

  return responses;
};
const updateproyect = async request => {
  let token = store.getters.gettoken;

  let config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  let responses = await Axios.post(updateproyectapi, request, config)
    .then(res => {
      let mensaje = {
        tittle: "Proyectos",
        text: "Proyecto Editado Con éxito",
        icon: "success"
      };
      return response.verificayresponde(res.data, mensaje);
    })
    .catch(error => {
      return response.filtraerror(error);
    });

  return responses;
};
const addsucursal = async request => {
  let token = store.getters.gettoken;

  let config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  let responses = await Axios.post(addsucursalapi, request, config)
    .then(res => {
      let mensaje = {
        tittle: "Sucursales",
        text: "Sucursal Agregada Con éxito",
        icon: "success"
      };
      return response.responsenocontent(res.data, mensaje);
    })
    .catch(error => {
      return response.filtraerror(error);
    });

  return responses;
};
const addsolicitud = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(sendfirstpay, request, configin)
    .then(res => {
      // return response.verifyrequest(res.data);
      return res.data;
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
const editsolicitud = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(editFirstPay, request, configin)
    .then(res => {
      // return response.verifyrequest(res.data);
      return res.data;
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
const deleteSolicitud = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(updatepayapiV2, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
const updatesolicitud = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(updatepayapi, request, configin)
    .then(res => {
      return response.verifyrequest(res.data);
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
const addsolicitudformal = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(createsolicitudapi, request, configin)
    .then(res => {
      return response.verifyrequest(res.data);
    })
    .catch(error => {
      // return error
      return response.filtraerror(error);
    });
  return result;
};
const deleteproyecto = async request => {
  let token = store.getters.gettoken;

  let config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  let responses = await Axios.post(deleteproyectoapi, request, config)
    .then(res => {
      let mensaje = {
        tittle: "Proyecto",
        text: "Proecto Eliminado Con éxito",
        icon: "success"
      };
      return response.responsenocontent(res.data, mensaje);
    })
    .catch(error => {
      return response.filtraerror(error);
    });

  return responses;
};

const cuentasitem = async request => {
  let token = store.getters.gettoken;
  let config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  let response = await Axios.post(getcuentas, request, config)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return response;
};
const updateempresa = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(apiempresaupdate, request, configin)
    .then(res => {
      return response.empresaedit(res.data);
    })
    .catch(error => {
      return response.filtraerror(error);
    });

  return result;
};
const updatecuenta = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(apicuentaupdate, request, configin)
    .then(res => {
      return response.cuentaedit(res.data);
    })
    .catch(error => {
      return response.filtraerror(error);
    });

  return result;
};
const deleteempresa = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(apiempresadelete, request, configin)
    .then(res => {
      return response.empresadelete(res.data);
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};

const destroyproduct = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(deleteproducto, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};
const destroyproductshared = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(destroyproductsharedapi, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};
const deletecuenta = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(apicuentaadelete, request, configin)
    .then(res => {
      return response.cuentadelete(res.data);
    })
    .catch(error => {
      return response.filtraerror(error);
    });

  return result;
};
const deletecuentashared = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(deletecuentasharedapi, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};
const consultasepomex = async request => {
  let endpoint_sepomex = "https://api-sepomex.hckdrk.mx/query/info_cp/";
  // let endpoint_sepomex = "https://api.copomex.com/query/info_cp/";
  let url =
    endpoint_sepomex + request + "?token=942460d4-da07-4dcb-ade1-807764f6d502";
  let result = await Axios.get(url)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta).name;
    });
  return result;
};

function resultestados(request) {
  let estados = [];
  for (let i = 0; i < request.length; i++) {
    if (estados.indexOf(request[i].response.estado)) {
      estados.push(request[i].response.estado);
    }
  }
  return estados;
}

function resultmunicipios(request) {
  let estados = [];
  for (let i = 0; i < request.length; i++) {
    if (estados.indexOf(request[i].response.municipio)) {
      estados.push(request[i].response.municipio);
    }
  }
  return estados;
}

function resultcolonias(request) {
  let estados = [];
  for (let i = 0; i < request.length; i++) {
    if (estados.indexOf(request[i].response.asentamiento)) {
      estados.push(request[i].response.asentamiento);
    }
  }
  return estados;
}
const relacioncuentaempresa = async (request, cuentain) => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(
    setcuentasempresa,
    { array: request, cuenta: cuentain },
    configin
  )
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta).name;
    });
  return result;
};

const getroles_permisos = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(getrolesypermisos, request, configin)
    .then(res => {
      return response.verifyrequesttables(res);
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
const getusers = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(apigetusers, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};
const updateuseradmin = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(updateusers, request, configin)
    .then(res => {
      return response.verifyresponse(res.data);
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
const lockuseradmin = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(updateusersadmin, request, configin)
    .then(res => {
      return response.verifyresponseadmin(res.data);
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
const unlockuseradmin = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(unlockusersadminapi, request, configin)
    .then(res => {
      return response.verifyresponseadmin(res.data);
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};

const resetpassword = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(apiresetpassword, request, configin)
    .then(res => {
      return response.verifyadduser(res.data);
    })
    .catch(error => {
      return response.validaadduser(error);
    });
  return result;
};
const adduser = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(apiradduser, request, configin)
    .then(res => {
      return response.verifyadduser(res.data);
    })
    .catch(error => {
      return response.validaadduser(error);
    });
  return result;
};
const deleteuser = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(deleteuserin, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};
const deleterol = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(droprol, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};
const createrole = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(createrol, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};
const updaterole = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(uprol, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};
const addupdaterolesuser = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(updaterolesuser, request, configin)
    .then(res => {
      return response.verifyresponserole(res.data);
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
const createproducto = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(createproduct, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};

const deletefotogaleria = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(deletefotogalery, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};

const deletefotogaleriashared = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(deletefotogaleryshared, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};
const updateproducto = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(updateproduct, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};
const allempresas = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(empresasall, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};
const getpagossend = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(pagossend, request, configin)
    .then(res => {
      /// espero
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};

const solicitudsinsend = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(solicitudsinsendapi, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};
const solicitarpago = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(pagossolicitudapi, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};
const deletephotopagossend = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(deletefotopagos, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};
const editpago = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(actualizapago, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};
const destroypago = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(deletepago, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};
const cambiabandera = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(restoreuser, request, configin)
    .then(res => {
      return response.nocontent(res.data);
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
const getonlyupdate = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(userscambia, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};
const getallusers = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(allusers, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};
const onlyusers = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(allonluusers, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
const sendorsolicita = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(sendorrequest, request, configin)
    .then(res => {
      return response.verifyrequest(res.data);
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
const yourusersback = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(yourusersbackapi, request, configin)
    .then(res => {
      return response.verifyrequesttables(res);
      // return res;
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
const getproyectos = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(getproyectosapi, request, configin)
    .then(res => {
      return response.verifyrequesttables(res);
      // return res;
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
const yourusersbackadmin = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(yourusersbackadminapi, request, configin)
    .then(res => {
      return response.verifyrequesttables(res);
      // return res;
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};

const lockuser = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(lockuserapi, request, configin)
    .then(res => {
      return response.validafriendslock(res);
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};

const unlockuser = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(unlockuserapi, request, configin)
    .then(res => {
      return response.validafriends(res);
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};

const cancelrequest = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(cancelrequestapi, request, configin)
    .then(res => {
      return response.validafriends(res);
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
const cancelrequestin = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(cancelrequestinapi, request, configin)
    .then(res => {
      return response.validafriends(res);
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
const aceptrequest = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(aceptrequestapi, request, configin)
    .then(res => {
      return response.validafriends(res);
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
const lockuserrequest = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(lockuserrequestapi, request, configin)
    .then(res => {
      return response.validafriends(res.data);
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
const invitaramigo = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(invitaramigoapi, request, configin)
    .then(res => {
      return response.validafriends(res.data);
    })
    .catch(error => {
      return response.filtraerror(error);
    });
  return result;
};
// Consulta VIDEOS por pagina en tabla MARKETING
const getRedesPag = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(apiRedesPag, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};
// Consulta REDES por pagina en tabla MARKETING
const getVideosPag = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(apiVideosPag, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};
const getempresas = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(onlyempresaapi, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};
const getmycuentas = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(onlycuentaapi, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};

const getempresasback = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(onlyempresaapiback, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};
const getcuentasback = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(onlycuentaapiback, request, configin)
    .then(res => {
      return response.successgeneric(res.data);
    })
    .catch(error => {
      return response.filtraerror(error);
    });

  return result;
};
const getsucursales = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(getsucursalesapi, request, configin)
    .then(res => {
      return response.successgeneric(res.data);
    })
    .catch(error => {
      return response.filtraerror(error);
    });

  return result;
};
const compartepersmisoempresa = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(compartepersmisoempresaapi, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};
const createpermisoscuenta = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(createpermisoscuentaapi, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};
const compartepersmisocuenta = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(compartepersmisocuentaapi, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};
const getsharedcompanies = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(getsharedcompaniesapi, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};
const editsharedcompanies = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(editsharedcompaniesapi, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};
const deletesharedcompanies = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(deletesharedcompaniesapi, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};
const sharedcuentas = async request => {
  let tokenin = store.getters.gettoken;
  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(sharedcuentasapi, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};
const updateforshared = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(updateforsharedapi, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};
const getproductos = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(getproductosapi, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};
const compartepersmisoproducto = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(compartepersmisoproductoapi, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};
const getsharedproducts = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(getsharedproductspai, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};
const updateproductoshared = async request => {
  let tokenin = store.getters.gettoken;

  let configin = {
    headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(updateproductosharedapi, request, configin)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      let respuesta = JSON.stringify(error);
      return JSON.parse(respuesta);
    });
  return result;
};

export default () => ({
  First_Message,
  Send_Message,
  Get_Messages_For_Id,
  PagosBack,
  finishpago,
  deletefile,
  addtagssolicitud,
  addproyectsolicitud,
  addlinkssolicitud,
  addcuentassolicitud,
  addsolicitudformal,
  updatesolicitud,
  addsolicitud,
  editsolicitud,
  deleteSolicitud,
  deleteproyecto,
  updateproyect,
  ConsRedSociales,
  getproyectos,
  addproyect,
  addsucursal,
  getsucursales,
  getcuentasback,
  getmycuentas,
  getempresasback,
  yourusersbackadmin,
  unlockuseradmin,
  lockuseradmin,
  yourusersback,
  invitaramigo,
  yourrequest,
  deletefotogaleriashared,
  destroyproductshared,
  updateproductoshared,
  getsharedproducts,
  compartepersmisoproducto,
  getproductos,
  deletecuentashared,
  updateforshared,
  sharedcuentas,
  createpermisoscuenta,
  compartepersmisocuenta,
  deletesharedcompanies,
  editsharedcompanies,
  getsharedcompanies,
  update,
  createempresa,
  deleteempresa,
  consultasepomex,
  resultestados,
  resultmunicipios,
  resultcolonias,
  updateempresa,
  updatecontrasenauser,
  adcuenta,
  cuentasitem,
  deletecuenta,
  consCuentasSus,
  restauracuenta,
  updatecuenta,
  relacioncuentaempresa,
  getusers,
  updateuseradmin,
  resetpassword,
  adduser,
  deleteuser,
  getroles_permisos,
  deleterol,
  createrole,
  updaterole,
  addupdaterolesuser,
  createproducto,
  deletefotogaleria,
  updateproducto,
  destroyproduct,
  allempresas,
  getpagossend,
  solicitudsinsend,
  solicitarpago,
  deletephotopagossend,
  editpago,
  destroypago,
  cambiabandera,
  getonlyupdate,
  getallusers,
  onlyusers,
  sendorsolicita,
  lockuser,
  unlockuser,
  cancelrequest,
  aceptrequest,
  cancelrequestin,
  lockuserrequest,
  getempresas,
  consEmpresasExt,
  compartepersmisoempresa,
  consRoles,
  consPermisos,
  consPermisosCuenta,
  CreateRoles,
  UpdateRoles,
  DeleteRoles,
  updateInfluencer,
  TiposRedSocial,
  createRedSocial,
  deleteRedSocial,
  editRedSocial,
  addVideoRedSocial,
  VideosRedSocial,
  deleteVideoRed,
  editVideoRed,
  consDeparamentos,
  consAccesos,
  aceptarPolitica,
  TiposRedes,
  VideosRedes,
  CambiaTiposRedes,
  CambiaVideosRedes,
  consGroupEmpresas,
  creaGroupEmpresas,
  ActGroupEmpresas,
  DelGroupEmpresas,
  AddUsGroupEmpresas,
  consUsGrupo,
  addUsGroup,
  creaGroupPermisos,
  creaGroup,
  consGroup,
  deleGroupPermisos,
  ConsPermisosUsuario,
  DelUsuarioGrupo,
  AddUsuarioGrupo,
  ActPermisosUsuario,
  NewNamePermission,
  getRedesPag,
  getVideosPag,
  consTiposCuentas,
  consPrivacidadPerfil,
  UpdateNumTelefono,
  DeleteNumTelefono,
  CreateNumTelefono,
  consBancos,
  consMonedas,
  ValidateNameC,
  consGroupAllEmpresas,
  constUsersFiles
});

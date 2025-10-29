import axios from "axios";
import { createInertiaApp } from "@inertiajs/vue3";
import { createApp, h } from "vue";
import { ZiggyVue } from "ziggy-js";
import Toast, { POSITION } from "vue-toastification";
import mitt from "mitt";
import { createPinia } from "pinia";
import { MaskInput } from "vue-3-mask";
window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
async function resolvePageComponent(path, pages) {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
const appName = "Laravel";
const emitter = mitt();
const pinia = createPinia();
const toastOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 5e3,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true
};
const cleanApp = () => {
  document.getElementById("app").removeAttribute("data-page");
};
createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(
    `./Pages/${name}.vue`,
    /* @__PURE__ */ Object.assign({ "./Pages/Admin/Ata/AtaForm.vue": () => import("./assets/AtaForm-BVLfSOhL.js"), "./Pages/Admin/Ata/AtaIndex.vue": () => import("./assets/AtaIndex-BIU4zaxx.js"), "./Pages/Admin/Cardapio/CardapioForm.vue": () => import("./assets/CardapioForm-BuB59Vzr.js"), "./Pages/Admin/Cardapio/CardapioIndex.vue": () => import("./assets/CardapioIndex-By4EWjeJ.js"), "./Pages/Admin/Cardapio/Ingredientes.vue": () => import("./assets/Ingredientes-DXcytrOr.js"), "./Pages/Admin/Cargo/CargoForm.vue": () => import("./assets/CargoForm-iWacf1Z0.js"), "./Pages/Admin/Cargo/CargoIndex.vue": () => import("./assets/CargoIndex-CFzNbCnn.js"), "./Pages/Admin/Estatuto/EstatutoForm.vue": () => import("./assets/EstatutoForm-CAgNm48n.js"), "./Pages/Admin/Estatuto/EstatutoIndex.vue": () => import("./assets/EstatutoIndex-COXnQ3Ru.js"), "./Pages/Admin/Eventos/EventoCardapioForm.vue": () => import("./assets/EventoCardapioForm-67Po5Bkf.js"), "./Pages/Admin/Eventos/EventosForm.vue": () => import("./assets/EventosForm-BZ-aOIXC.js"), "./Pages/Admin/Eventos/EventosIndex.vue": () => import("./assets/EventosIndex-cIONuGE6.js"), "./Pages/Admin/Eventos/EventosInfo.vue": () => import("./assets/EventosInfo-Bj_34Squ.js"), "./Pages/Admin/Eventos/GaleriaEvento.vue": () => import("./assets/GaleriaEvento-CS9Nslmb.js"), "./Pages/Admin/Pessoa/PessoaForm.vue": () => import("./assets/PessoaForm-CGbuSKRK.js"), "./Pages/Admin/Pessoa/PessoaIndex.vue": () => import("./assets/PessoaIndex-Bw7Sllz7.js"), "./Pages/Admin/RegimeInterno/RegimeInternoForm.vue": () => import("./assets/RegimeInternoForm-DWXRerh1.js"), "./Pages/Admin/RegimeInterno/RegimeInternoIndex.vue": () => import("./assets/RegimeInternoIndex-BWFqlSj9.js"), "./Pages/Auth/ConfirmPassword.vue": () => import("./assets/ConfirmPassword-CZeAgt24.js"), "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-MD4-RcDi.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-rR8ey8DD.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-C20vRpbT.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-BGEANdmX.js"), "./Pages/Auth/VerifyEmail.vue": () => import("./assets/VerifyEmail-DdAefjN8.js"), "./Pages/Dashboard.vue": () => import("./assets/Dashboard-cDYxfL2Y.js"), "./Pages/Profile/Edit.vue": () => import("./assets/Edit-CDchi2CC.js"), "./Pages/Profile/Partials/DeleteUserForm.vue": () => import("./assets/DeleteUserForm-C0zoUvde.js"), "./Pages/Profile/Partials/UpdatePasswordForm.vue": () => import("./assets/UpdatePasswordForm-BA8PZxD6.js"), "./Pages/Profile/Partials/UpdateProfileInformationForm.vue": () => import("./assets/UpdateProfileInformationForm-B9WCgNE6.js"), "./Pages/Publico/Atas.vue": () => import("./assets/Atas-ktZ6dtqH.js"), "./Pages/Publico/AtasDetalhes.vue": () => import("./assets/AtasDetalhes-WlTELTXf.js"), "./Pages/Publico/EstatutoDetalhes.vue": () => import("./assets/EstatutoDetalhes-C4qCxxJA.js"), "./Pages/Publico/Estatutos.vue": () => import("./assets/Estatutos-D8r93XTg.js"), "./Pages/Publico/EventoDetalhes.vue": () => import("./assets/EventoDetalhes-D7eqvXgh.js"), "./Pages/Publico/Eventos.vue": () => import("./assets/Eventos-Dodat3sP.js"), "./Pages/Publico/Index.vue": () => import("./assets/Index-BKAwN7YJ.js"), "./Pages/Publico/RegimeInternoDetalhes.vue": () => import("./assets/RegimeInternoDetalhes-D0nePLpM.js"), "./Pages/Publico/RegimesInternos.vue": () => import("./assets/RegimesInternos-BpxWxK0u.js"), "./Pages/Publico/Sobre.vue": () => import("./assets/Sobre-DpmQYkkf.js"), "./Pages/Welcome.vue": () => import("./assets/Welcome-DMaBece4.js") })
  ),
  setup({ el, App, props, plugin }) {
    const app = createApp({ render: () => h(App, props) });
    app.component("MaskInput", MaskInput);
    app.use(plugin).use(ZiggyVue).use(pinia).use(Toast, toastOptions);
    app.config.globalProperties.$events = emitter;
    app.provide("events", emitter);
    app.mount(el);
  },
  progress: {
    color: "#4B5563"
  }
}).then(cleanApp);

import { ref, onMounted, nextTick, mergeProps, useSSRContext, inject, computed, onBeforeUnmount, withCtx, createVNode, resolveDynamicComponent, toDisplayString, createBlock, openBlock, createCommentVNode, markRaw } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderClass, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderVNode, ssrRenderSlot } from "vue/server-renderer";
import { usePage, router } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import _sfc_main$4 from "./Modal-D4SsQX3D.js";
import axios from "axios";
const _sfc_main$3 = {
  __name: "SidebarMenu",
  __ssrInlineRender: true,
  emits: ["collapse-changed", "toggle-changed", "submenu-clicked"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emit = __emit;
    const collapsed = ref(false);
    const toggled = ref(false);
    const activeItem = ref("dashboard");
    const openSubmenus = ref([]);
    const submenuHeights = ref({});
    const toggleCollapse = () => {
      collapsed.value = !collapsed.value;
      localStorage.setItem("sidebar-collapsed", collapsed.value.toString());
      emit("collapse-changed", collapsed.value);
    };
    const toggleSidebar = () => {
      toggled.value = !toggled.value;
      emit("toggle-changed", toggled.value);
    };
    const isActive = (itemName) => {
      return activeItem.value === itemName;
    };
    const calculateSubmenuHeight = (submenuName) => {
      const submenuEl = document.querySelector(`.sub-menu-list ul`);
      if (submenuEl) {
        submenuHeights.value[submenuName] = `${submenuEl.scrollHeight}px`;
      }
    };
    __expose({
      toggleCollapse,
      toggleSidebar,
      openSubmenu: (submenuName) => {
        if (!openSubmenus.value.includes(submenuName)) {
          openSubmenus.value.push(submenuName);
        }
      },
      closeSubmenu: (submenuName) => {
        const index = openSubmenus.value.indexOf(submenuName);
        if (index > -1) {
          openSubmenus.value.splice(index, 1);
        }
      },
      setActive: (itemName) => {
        activeItem.value = itemName;
      }
    });
    onMounted(() => {
      const savedCollapse = localStorage.getItem("sidebar-collapsed");
      if (savedCollapse !== null) {
        collapsed.value = savedCollapse === "true";
      }
      const path = window.location.pathname;
      if (path.includes("pessoas")) {
        activeItem.value = "pessoas";
      } else if (path.includes("cargo")) {
        activeItem.value = "cargo";
      } else if (path.includes("regime-interno")) {
        activeItem.value = "regime-interno";
      } else if (path.includes("estatuto")) {
        activeItem.value = "estatuto";
      } else if (path.includes("atas")) {
        activeItem.value = "atas";
      } else if (path.includes("eventos")) {
        activeItem.value = "eventos";
      } else if (path.includes("cardapio")) {
        activeItem.value = "cardapio";
      } else if (path.includes("comissao")) {
        activeItem.value = "comissao";
      } else if (path.includes("avisos")) {
        activeItem.value = "avisos";
      }
      nextTick(() => {
        calculateSubmenuHeight("usuarios");
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<aside${ssrRenderAttrs(mergeProps({
        id: "sidebar",
        class: ["sidebar", { "collapsed": collapsed.value, "toggled": toggled.value }]
      }, _attrs))} data-v-0b1b1ad3><div class="sidebar-layout" data-v-0b1b1ad3><div class="sidebar-header bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900" data-v-0b1b1ad3><div class="logo-full" style="${ssrRenderStyle(!collapsed.value ? null : { display: "none" })}" data-v-0b1b1ad3><a href="#" class="text-white" data-v-0b1b1ad3> IGREJA </a></div><div class="logo-collapsed" style="${ssrRenderStyle(collapsed.value ? null : { display: "none" })}" data-v-0b1b1ad3><a href="#" data-v-0b1b1ad3></a></div></div><div class="sidebar-content" data-v-0b1b1ad3><nav class="mt-5 menu" data-v-0b1b1ad3><ul data-v-0b1b1ad3><li class="${ssrRenderClass([{ "active": isActive("pessoas") }, "menu-item"])}" data-v-0b1b1ad3><a href="#" class="menu-link"${ssrRenderAttr("data-tooltip", collapsed.value ? "Dashboard" : "")} data-v-0b1b1ad3><span class="menu-icon" data-v-0b1b1ad3><i class="fa fa-people-group" data-v-0b1b1ad3></i></span><span class="menu-title" data-v-0b1b1ad3>Pessoas</span></a></li><li class="${ssrRenderClass([{ "active": isActive("cargo") }, "menu-item"])}" data-v-0b1b1ad3><a href="#" class="menu-link"${ssrRenderAttr("data-tooltip", collapsed.value ? "Cargo" : "")} data-v-0b1b1ad3><span class="menu-icon" data-v-0b1b1ad3><i class="fa fa-pencil" data-v-0b1b1ad3></i></span><span class="menu-title" data-v-0b1b1ad3>Cargo</span></a></li><li class="${ssrRenderClass([{ "active": isActive("cardapio") }, "menu-item"])}" data-v-0b1b1ad3><a href="#" class="menu-link"${ssrRenderAttr("data-tooltip", collapsed.value ? "Cardapio" : "")} data-v-0b1b1ad3><span class="menu-icon" data-v-0b1b1ad3><i class="fa fa-utensils" data-v-0b1b1ad3></i></span><span class="menu-title" data-v-0b1b1ad3>Cardápio</span></a></li><li class="${ssrRenderClass([{ "active": isActive("eventos") }, "menu-item"])}" data-v-0b1b1ad3><a href="#" class="menu-link"${ssrRenderAttr("data-tooltip", collapsed.value ? "Eventos" : "")} data-v-0b1b1ad3><span class="menu-icon" data-v-0b1b1ad3><i class="fa fa-calendar" data-v-0b1b1ad3></i></span><span class="menu-title" data-v-0b1b1ad3>Eventos</span></a></li><li class="${ssrRenderClass([{ "active": isActive("avisos") }, "menu-item"])}" data-v-0b1b1ad3><a href="#" class="menu-link"${ssrRenderAttr("data-tooltip", collapsed.value ? "avisos" : "")} data-v-0b1b1ad3><span class="menu-icon" data-v-0b1b1ad3><i class="fa fa-message" data-v-0b1b1ad3></i></span><span class="menu-title" data-v-0b1b1ad3>Avisos</span></a></li><li class="${ssrRenderClass([{ "active": isActive("comissao") }, "menu-item"])}" data-v-0b1b1ad3><a href="#" class="menu-link"${ssrRenderAttr("data-tooltip", collapsed.value ? "Eventos" : "")} data-v-0b1b1ad3><span class="menu-icon" data-v-0b1b1ad3><i class="fa fa-people-roof" data-v-0b1b1ad3></i></span><span class="menu-title" data-v-0b1b1ad3>Comissão</span></a></li><li class="${ssrRenderClass([{ "active": isActive("regime-interno") }, "menu-item"])}" data-v-0b1b1ad3><a href="#" class="menu-link"${ssrRenderAttr("data-tooltip", collapsed.value ? "Regime Interno" : "")} data-v-0b1b1ad3><span class="menu-icon" data-v-0b1b1ad3><i class="fa fa-file-contract" data-v-0b1b1ad3></i></span><span class="menu-title" data-v-0b1b1ad3>Regimento Interno</span></a></li><li class="${ssrRenderClass([{ "active": isActive("estatuto") }, "menu-item"])}" data-v-0b1b1ad3><a href="#" class="menu-link"${ssrRenderAttr("data-tooltip", collapsed.value ? "Regime Interno" : "")} data-v-0b1b1ad3><span class="menu-icon" data-v-0b1b1ad3><i class="fa fa-file-text" data-v-0b1b1ad3></i></span><span class="menu-title" data-v-0b1b1ad3>Estatuto</span></a></li><li class="${ssrRenderClass([{ "active": isActive("atas") }, "menu-item"])}" data-v-0b1b1ad3><a href="#" class="menu-link"${ssrRenderAttr("data-tooltip", collapsed.value ? "Regime Interno" : "")} data-v-0b1b1ad3><span class="menu-icon" data-v-0b1b1ad3><i class="fa fa-file-image" data-v-0b1b1ad3></i></span><span class="menu-title" data-v-0b1b1ad3>Ata</span></a></li></ul></nav></div><div class="sidebar-footer" data-v-0b1b1ad3><div class="action-buttons" data-v-0b1b1ad3></div></div></div></aside>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/SidebarMenu.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const SidebarMenu = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-0b1b1ad3"]]);
const _sfc_main$2 = {
  __name: "Popup",
  __ssrInlineRender: true,
  setup(__props) {
    const adminComponents = /* @__PURE__ */ Object.assign({ "../Pages/Admin/Ata/AtaForm.vue": () => import("./AtaForm-OhVZ9eSG.js"), "../Pages/Admin/Ata/AtaIndex.vue": () => import("./AtaIndex-C3BVTC7-.js"), "../Pages/Admin/Avisos/AvisosForm.vue": () => import("./AvisosForm-Bun0nOuI.js"), "../Pages/Admin/Avisos/AvisosIndex.vue": () => import("./AvisosIndex-BdbHSBDT.js"), "../Pages/Admin/Cardapio/CardapioForm.vue": () => import("./CardapioForm-CbSWTYEx.js"), "../Pages/Admin/Cardapio/CardapioIndex.vue": () => import("./CardapioIndex-6eIbG2gp.js"), "../Pages/Admin/Cardapio/Ingredientes.vue": () => import("./Ingredientes-BqaWPj0g.js"), "../Pages/Admin/Cargo/CargoForm.vue": () => import("./CargoForm-DcZKSjm3.js"), "../Pages/Admin/Cargo/CargoIndex.vue": () => import("./CargoIndex-D-60iq2b.js"), "../Pages/Admin/Comissao/ComissaoForm.vue": () => import("./ComissaoForm-B90Ot4rK.js"), "../Pages/Admin/Comissao/ComissaoIndex.vue": () => import("./ComissaoIndex-8x6vgC0x.js"), "../Pages/Admin/Comissao/ComissaoInfo.vue": () => import("./ComissaoInfo-PtF4tskL.js"), "../Pages/Admin/Estatuto/EstatutoForm.vue": () => import("./EstatutoForm-MBB-DcYV.js"), "../Pages/Admin/Estatuto/EstatutoIndex.vue": () => import("./EstatutoIndex-DWOMqlhs.js"), "../Pages/Admin/Eventos/EventoCardapioForm.vue": () => import("./EventoCardapioForm-Dtw78UsX.js"), "../Pages/Admin/Eventos/EventoCardapioIngredienteForm.vue": () => import("./EventoCardapioIngredienteForm-DuR7p3PD.js"), "../Pages/Admin/Eventos/EventosForm.vue": () => import("./EventosForm-Cx_VdpMx.js"), "../Pages/Admin/Eventos/EventosIndex.vue": () => import("./EventosIndex-C8BXlvCO.js"), "../Pages/Admin/Eventos/EventosInfo.vue": () => import("./EventosInfo-B9yNUBfa.js"), "../Pages/Admin/Eventos/GaleriaEvento.vue": () => import("./GaleriaEvento-Bi86sBta.js"), "../Pages/Admin/Pessoa/PessoaForm.vue": () => import("./PessoaForm-CE_8oXS0.js"), "../Pages/Admin/Pessoa/PessoaIndex.vue": () => import("./PessoaIndex-CmDga7MU.js"), "../Pages/Admin/RegimeInterno/RegimeInternoForm.vue": () => import("./RegimeInternoForm-D-p6jXNE.js"), "../Pages/Admin/RegimeInterno/RegimeInternoIndex.vue": () => import("./RegimeInternoIndex-CBth6vuc.js") });
    const cidadaoComponents = /* @__PURE__ */ Object.assign({});
    const genericComponents = /* @__PURE__ */ Object.assign({ "./ApplicationLogo.vue": () => import("./ApplicationLogo-kz99UxNd.js"), "./AutoCompletePessoa.vue": () => import("./AutoCompletePessoa-DqqLLzOg.js"), "./Checkbox.vue": () => import("./Checkbox-CBHLqROi.js"), "./ConfirmationPopup.vue": () => Promise.resolve().then(() => ConfirmationPopup$1), "./DangerButton.vue": () => import("./DangerButton-lQ4n7d9L.js"), "./Dropdown.vue": () => import("./Dropdown-jKwN3SeX.js"), "./DropdownLink.vue": () => import("./DropdownLink-CS6OTd7u.js"), "./InputError.vue": () => import("./InputError-DKvItylr.js"), "./InputLabel.vue": () => import("./InputLabel-CDsQQ3SF.js"), "./Modal.vue": () => import("./Modal-D4SsQX3D.js"), "./NavLink.vue": () => import("./NavLink-OTmYlOWh.js"), "./PopupButton.vue": () => import("./PopupButton-DLi_hd91.js"), "./PrimaryButton.vue": () => import("./PrimaryButton-C4y1YaiT.js"), "./ResponsiveNavLink.vue": () => import("./ResponsiveNavLink-C9P1mtob.js"), "./SecondaryButton.vue": () => import("./SecondaryButton-CHD8GMy9.js"), "./TextInput.vue": () => import("./TextInput-BEEeI7hx.js") });
    const events = inject("events");
    const isOpen = ref(false);
    const componentToRender = ref(null);
    const id = ref(null);
    const data = ref(null);
    const title = ref(null);
    const size = ref("md");
    const isLoading = ref(false);
    const componentError = ref(null);
    const componentCache = /* @__PURE__ */ new Map();
    const modalSize = computed(() => {
      switch (size.value) {
        case "sm":
          return "sm";
        case "md":
          return "md";
        case "lg":
          return "lg";
        case "xl":
          return "xl";
        case "2xl":
          return "2xl";
        case "3xl":
          return "3xl";
        case "4xl":
          return "4xl";
        case "5xl":
          return "5xl";
        case "6xl":
          return "6xl";
        case "full":
          return "full";
        default:
          return "md";
      }
    });
    const resolveComponent = async (componentName) => {
      if (componentCache.has(componentName)) {
        return componentCache.get(componentName);
      }
      try {
        const folderName = componentName.replace(/Form$|Grid$|List$|Index$|Detail$/, "");
        const possiblePatterns = [
          `../Pages/Admin/${folderName}/${componentName}.vue`,
          `../Pages/Cidadao/${folderName}/${componentName}.vue`,
          `../components/${componentName}.vue`
        ];
        let componentModule = null;
        let foundComponent = false;
        for (const pattern of possiblePatterns) {
          if (adminComponents[pattern]) {
            componentModule = adminComponents[pattern];
            foundComponent = true;
            break;
          } else if (cidadaoComponents[pattern]) {
            componentModule = cidadaoComponents[pattern];
            foundComponent = true;
            break;
          } else if (genericComponents[pattern]) {
            componentModule = genericComponents[pattern];
            foundComponent = true;
            break;
          }
        }
        if (!foundComponent) {
          const allPaths = [
            ...Object.keys(adminComponents),
            ...Object.keys(cidadaoComponents),
            ...Object.keys(genericComponents)
          ];
          const matchingPath = allPaths.find((path) => {
            return path.endsWith(`/${componentName}.vue`);
          });
          if (matchingPath) {
            componentModule = adminComponents[matchingPath] || cidadaoComponents[matchingPath] || genericComponents[matchingPath];
            foundComponent = true;
          }
        }
        if (!foundComponent) {
          throw new Error(`Component ${componentName} could not be found in any location`);
        }
        const loadedComponent = await componentModule();
        const registeredComponent = markRaw(loadedComponent.default);
        componentCache.set(componentName, registeredComponent);
        return registeredComponent;
      } catch (error) {
        console.error(`Failed to load component: ${componentName}`, error);
        componentError.value = `Não foi possível carregar o componente "${componentName}". Verifique o console para mais detalhes.`;
        return null;
      }
    };
    const open = async (evt) => {
      isLoading.value = true;
      componentError.value = null;
      componentToRender.value = null;
      id.value = evt.id || "component-popup";
      title.value = evt.title || "Sem título";
      size.value = evt.size || "lg";
      data.value = evt.data ? markRaw(evt.data) : null;
      isOpen.value = true;
      try {
        componentToRender.value = await resolveComponent(evt.component);
      } catch (error) {
        componentError.value = `Erro ao carregar o componente: ${error.message}`;
        console.error(error);
      } finally {
        isLoading.value = false;
      }
    };
    const close = () => {
      isOpen.value = false;
      setTimeout(() => {
        componentToRender.value = null;
        id.value = null;
        data.value = null;
        title.value = null;
        componentError.value = null;
      }, 300);
    };
    onMounted(() => {
      events.on("popup", open);
      events.on("popup-close", close);
    });
    onBeforeUnmount(() => {
      events.off("popup", open);
      events.off("popup-close", close);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$4, mergeProps({
        show: isOpen.value,
        "max-width": modalSize.value,
        closeable: true,
        onClose: close
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-6 py-4 bg-gray-700 border-b"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><h3 class="text-xl font-semibold text-gray-100" id="modal-title"${_scopeId}>${ssrInterpolate(title.value)}</h3><button type="button" class="rounded-md p-1.5 text-gray-400 transition-colors hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 hover:bg-gray-700" aria-label="Close"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"${_scopeId}></path></svg></button></div></div><div class="min-h-[200px] max-h-[80vh] bg-white p-6 overflow-y-auto"${_scopeId}>`);
            if (isLoading.value) {
              _push2(`<div class="flex items-center justify-center h-40"${_scopeId}><div class="w-8 h-8 border-4 border-gray-200 rounded-full animate-spin border-t-blue-600"${_scopeId}></div></div>`);
            } else if (componentError.value) {
              _push2(`<div class="p-4 rounded-md bg-red-900/20"${_scopeId}><div class="flex"${_scopeId}><div class="flex-shrink-0"${_scopeId}><svg class="w-5 h-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"${_scopeId}></path></svg></div><div class="ml-3"${_scopeId}><h3 class="text-sm font-medium text-red-200"${_scopeId}>Erro ao carregar componente</h3><div class="mt-2 text-sm text-red-300"${_scopeId}>${ssrInterpolate(componentError.value)}</div></div></div></div>`);
            } else if (componentToRender.value) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(componentToRender.value), mergeProps(data.value, {
                id: id.value,
                data: data.value,
                onClose: close
              }), null), _parent2, _scopeId);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "px-6 py-4 bg-gray-700 border-b" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("h3", {
                    class: "text-xl font-semibold text-gray-100",
                    id: "modal-title"
                  }, toDisplayString(title.value), 1),
                  createVNode("button", {
                    type: "button",
                    class: "rounded-md p-1.5 text-gray-400 transition-colors hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 hover:bg-gray-700",
                    onClick: close,
                    "aria-label": "Close"
                  }, [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "w-5 h-5",
                      viewBox: "0 0 20 20",
                      fill: "currentColor"
                    }, [
                      createVNode("path", {
                        "fill-rule": "evenodd",
                        d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                        "clip-rule": "evenodd"
                      })
                    ]))
                  ])
                ])
              ]),
              createVNode("div", { class: "min-h-[200px] max-h-[80vh] bg-white p-6 overflow-y-auto" }, [
                isLoading.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex items-center justify-center h-40"
                }, [
                  createVNode("div", { class: "w-8 h-8 border-4 border-gray-200 rounded-full animate-spin border-t-blue-600" })
                ])) : componentError.value ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "p-4 rounded-md bg-red-900/20"
                }, [
                  createVNode("div", { class: "flex" }, [
                    createVNode("div", { class: "flex-shrink-0" }, [
                      (openBlock(), createBlock("svg", {
                        class: "w-5 h-5 text-red-400",
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 20 20",
                        fill: "currentColor"
                      }, [
                        createVNode("path", {
                          "fill-rule": "evenodd",
                          d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
                          "clip-rule": "evenodd"
                        })
                      ]))
                    ]),
                    createVNode("div", { class: "ml-3" }, [
                      createVNode("h3", { class: "text-sm font-medium text-red-200" }, "Erro ao carregar componente"),
                      createVNode("div", { class: "mt-2 text-sm text-red-300" }, toDisplayString(componentError.value), 1)
                    ])
                  ])
                ])) : componentToRender.value ? (openBlock(), createBlock(resolveDynamicComponent(componentToRender.value), mergeProps({ key: 2 }, data.value, {
                  id: id.value,
                  data: data.value,
                  onClose: close
                }), null, 16, ["id", "data"])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Popup.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "ConfirmationPopup",
  __ssrInlineRender: true,
  props: {
    id: {
      type: String,
      default: "global-confirmation-popup"
    },
    data: {
      type: [Object, null],
      default: null
    },
    message: {
      type: String,
      default: "Você tem certeza?"
    },
    title: {
      type: String,
      default: "Confirmação"
    },
    event: {
      type: [Function, String, null],
      default: null
    },
    top: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const show = ref(false);
    const events = inject("events");
    const confirmation = ref({
      title: props.title,
      message: props.message,
      data: props.data,
      event: props.event
    });
    onMounted(() => {
      events.on("confirmation", (data) => {
        confirmation.value = data;
        show.value = true;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (show.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "fixed inset-0 flex items-center justify-center overflow-y-auto confirmation-popup",
          id: __props.id
        }, _attrs))} data-v-a849b3d7><div class="flex items-center justify-center w-full min-h-screen px-4 text-center" data-v-a849b3d7><div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" data-v-a849b3d7></div><div class="relative inline-block overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg" data-v-a849b3d7><div class="px-4 py-3 text-white bg-gray-800" data-v-a849b3d7><div class="flex items-center justify-between" data-v-a849b3d7><h3 class="text-lg font-medium" data-v-a849b3d7>${ssrInterpolate(confirmation.value.title)}</h3><button type="button" class="text-gray-400 hover:text-white focus:outline-none" data-v-a849b3d7><i class="fa fa-times" data-v-a849b3d7></i></button></div></div><div class="px-4 py-5 bg-white" data-v-a849b3d7><p data-v-a849b3d7>${confirmation.value.message ?? ""}</p></div><div class="justify-end px-4 py-3 bg-gray-50 sm:flex sm:flex-row sm:px-6" data-v-a849b3d7><button type="button" class="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-white rounded-md shadow-sm bg-blue-500 hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mr-3 sm:w-auto" data-v-a849b3d7><i class="mr-2 fa fa-check" data-v-a849b3d7></i> Confirmar </button><button type="button" class="inline-flex items-center justify-center w-full px-3 py-2 mt-3 text-sm font-medium text-white bg-gray-500 rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:mt-0 sm:w-auto" id="confirmation-cancel-button" data-v-a849b3d7><i class="mr-2 fa fa-times" data-v-a849b3d7></i> Cancelar </button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ConfirmationPopup.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ConfirmationPopup = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-a849b3d7"]]);
const ConfirmationPopup$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ConfirmationPopup
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main = {
  __name: "LayoutPrincipal",
  __ssrInlineRender: true,
  props: {
    pageTitle: {
      type: String,
      default: "Início"
    }
  },
  setup(__props) {
    const page = usePage();
    usePage();
    const sidebarCollapsed = ref(false);
    const sidebarVisible = ref(false);
    const sidebarRef = ref(null);
    const props = __props;
    const urlTitles = {
      "/dashboard": "Dashboard",
      "/categorias": "Categorias de Serviços",
      "/servicos": "Catálogo de Serviços",
      "/usuarios": "Gestão de Usuários",
      "/formulario": "Formulários",
      "/tipo-arquivo": "Arquivos",
      "/solicitacoes": "Solicitações",
      "/entidades": "Entidades",
      "/minha-conta": "Minha Conta",
      "/dados-entidade": "Dados da Entidade"
    };
    const pageTitle = computed(() => {
      if (props.pageTitle && props.pageTitle !== "Início") {
        return props.pageTitle;
      }
      const currentPath = window.location.pathname;
      if (urlTitles[currentPath]) {
        return urlTitles[currentPath];
      }
      for (const [urlPath, title] of Object.entries(urlTitles)) {
        if (currentPath.includes(urlPath)) {
          return title;
        }
      }
      if (page && page.value && page.value.component) {
        const componentName = page.value.component;
        const componentTitles = {
          "Dashboard": "Painel Inicial",
          "Categorias": "Categorias de Serviços",
          "Servicos": "Catálogo de Serviços",
          "Usuarios": "Gestão de Usuários",
          "Formulario": "Formulários",
          "TipoArquivo": "Arquivos",
          "Solicitacoes": "Solicitações",
          "Entidades": "Entidades",
          "MinhaConta": "Minha Conta",
          "DadosEntidade": "Dados da Entidade"
        };
        if (componentTitles[componentName]) {
          return componentTitles[componentName];
        }
      }
      const pathSegments = currentPath.split("/").filter(Boolean);
      if (pathSegments.length > 0) {
        const lastSegment = pathSegments[pathSegments.length - 1];
        return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
      }
      return "Painel Inicial";
    });
    const onSidebarCollapse = (collapsed) => {
      sidebarCollapsed.value = collapsed;
      localStorage.setItem("sidebar-collapsed", collapsed);
    };
    const onSidebarToggle = (toggled) => {
      sidebarVisible.value = toggled;
    };
    const handleSubmenuClick = (submenuName) => {
    };
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        var _a;
        const status = (_a = error.response) == null ? void 0 : _a.status;
        if (status === 401 || status === 419) {
          router.visit("/admin/login");
        }
        return Promise.reject(error);
      }
    );
    onMounted(() => {
      const savedCollapse = localStorage.getItem("sidebar-collapsed");
      if (savedCollapse !== null) {
        sidebarCollapsed.value = savedCollapse === "true";
        if (sidebarRef.value && sidebarRef.value.setCollapsed) {
          sidebarRef.value.setCollapsed(sidebarCollapsed.value);
        }
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["app-layout", { "sidebar-collapsed": sidebarCollapsed.value }]
      }, _attrs))} data-v-ae57fbe3>`);
      _push(ssrRenderComponent(SidebarMenu, {
        ref_key: "sidebarRef",
        ref: sidebarRef,
        onCollapseChanged: onSidebarCollapse,
        onToggleChanged: onSidebarToggle,
        onSubmenuClicked: handleSubmenuClick
      }, null, _parent));
      _push(`<div class="main-content" data-v-ae57fbe3><header class="app-header bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900" data-v-ae57fbe3><div class="header-container" data-v-ae57fbe3><div class="flex" data-v-ae57fbe3><button class="collapse-btn" data-v-ae57fbe3>`);
      if (!sidebarCollapsed.value) {
        _push(`<i class="fa fa-chevron-left" data-v-ae57fbe3></i>`);
      } else {
        _push(`<i class="fa fa-chevron-right" data-v-ae57fbe3></i>`);
      }
      _push(`</button><h1 class="page-title" data-v-ae57fbe3>${ssrInterpolate(pageTitle.value)}</h1></div></div></header><main class="content-wrapper" data-v-ae57fbe3><div class="main-slot-container" data-v-ae57fbe3>`);
      _push(ssrRenderComponent(ConfirmationPopup, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main></div><div class="${ssrRenderClass(["overlay", { "active": sidebarVisible.value }])}" data-v-ae57fbe3></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/LayoutPrincipal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const LayoutPrincipal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ae57fbe3"]]);
export {
  LayoutPrincipal as L
};

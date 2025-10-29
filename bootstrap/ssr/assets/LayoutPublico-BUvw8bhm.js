import { ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderSlot, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "LayoutPublico",
  __ssrInlineRender: true,
  setup(__props) {
    const menuMobileAberto = ref(false);
    const page = usePage();
    const isActive = (path) => {
      const currentPath = page.url;
      if (path === "/publico" && currentPath === "/publico") return true;
      if (path !== "/publico" && currentPath.startsWith(path)) return true;
      return false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col bg-gray-50" }, _attrs))} data-v-ad918b4f><header class="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white shadow-2xl relative overflow-hidden" data-v-ad918b4f><div class="absolute inset-0 opacity-10" data-v-ad918b4f><div class="absolute top-0 left-0 w-full h-full" style="${ssrRenderStyle({ "background-image": `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M30 0l5 15h15l-12 9 5 15-13-9-13 9 5-15-12-9h15z" fill="%23ffffff" fill-opacity="0.4"/%3E%3C/svg%3E')` })}" data-v-ad918b4f></div></div><div class="container mx-auto px-4 py-6 relative z-10" data-v-ad918b4f><div class="flex items-center justify-between" data-v-ad918b4f><div class="flex items-center space-x-4" data-v-ad918b4f><div class="flex flex-col items-center" data-v-ad918b4f><div class="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg border-4 border-amber-300" data-v-ad918b4f><span class="text-4xl" data-v-ad918b4f>✝️</span></div></div><div data-v-ad918b4f><h1 class="text-3xl font-bold text-amber-300" style="${ssrRenderStyle({ "text-shadow": "2px 2px 4px rgba(0,0,0,0.3)" })}" data-v-ad918b4f> Paróquia São Benedito </h1><p class="text-blue-100 text-sm italic" data-v-ad918b4f> Arquidiocese de Cuiabá - Nossa Senhora do Rosário e São Benedito </p></div></div><nav class="hidden lg:flex space-x-1" data-v-ad918b4f>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: [isActive("/publico") ? "bg-amber-500 text-white" : "text-blue-100 hover:bg-blue-700", "px-4 py-2 rounded transition-all duration-200"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 🏠 Início `);
          } else {
            return [
              createTextVNode(" 🏠 Início ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/publico/eventos",
        class: [isActive("/publico/eventos") ? "bg-amber-500 text-white" : "text-blue-100 hover:bg-blue-700", "px-4 py-2 rounded transition-all duration-200"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 📅 Eventos `);
          } else {
            return [
              createTextVNode(" 📅 Eventos ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/publico/atas",
        class: [isActive("/publico/atas") ? "bg-amber-500 text-white" : "text-blue-100 hover:bg-blue-700", "px-4 py-2 rounded transition-all duration-200"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 📝 Atas `);
          } else {
            return [
              createTextVNode(" 📝 Atas ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/publico/regimes-internos",
        class: [isActive("/publico/regimes-internos") ? "bg-amber-500 text-white" : "text-blue-100 hover:bg-blue-700", "px-4 py-2 rounded transition-all duration-200"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 📋 Regimes `);
          } else {
            return [
              createTextVNode(" 📋 Regimes ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/publico/estatutos",
        class: [isActive("/publico/estatutos") ? "bg-amber-500 text-white" : "text-blue-100 hover:bg-blue-700", "px-4 py-2 rounded transition-all duration-200"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` ⚖️ Estatutos `);
          } else {
            return [
              createTextVNode(" ⚖️ Estatutos ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/publico/sobre",
        class: [isActive("/publico/sobre") ? "bg-amber-500 text-white" : "text-blue-100 hover:bg-blue-700", "px-4 py-2 rounded transition-all duration-200"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` ℹ️ Sobre `);
          } else {
            return [
              createTextVNode(" ℹ️ Sobre ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav><button class="lg:hidden bg-blue-700 hover:bg-blue-600 p-3 rounded-lg" data-v-ad918b4f><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ad918b4f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-ad918b4f></path></svg></button></div>`);
      if (menuMobileAberto.value) {
        _push(`<nav class="lg:hidden mt-4 pb-4 space-y-2 animate-fadeIn" data-v-ad918b4f>`);
        _push(ssrRenderComponent(unref(Link), {
          href: "/publico",
          class: "block py-3 px-4 bg-blue-700 hover:bg-amber-500 rounded-lg transition-all"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 🏠 Início `);
            } else {
              return [
                createTextVNode(" 🏠 Início ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: "/publico/eventos",
          class: "block py-3 px-4 bg-blue-700 hover:bg-amber-500 rounded-lg transition-all"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 📅 Eventos `);
            } else {
              return [
                createTextVNode(" 📅 Eventos ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: "/publico/atas",
          class: "block py-3 px-4 bg-blue-700 hover:bg-amber-500 rounded-lg transition-all"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 📝 Atas `);
            } else {
              return [
                createTextVNode(" 📝 Atas ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: "/publico/regimes-internos",
          class: "block py-3 px-4 bg-blue-700 hover:bg-amber-500 rounded-lg transition-all"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 📋 Regimes Internos `);
            } else {
              return [
                createTextVNode(" 📋 Regimes Internos ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: "/publico/estatutos",
          class: "block py-3 px-4 bg-blue-700 hover:bg-amber-500 rounded-lg transition-all"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` ⚖️ Estatutos `);
            } else {
              return [
                createTextVNode(" ⚖️ Estatutos ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: "/publico/sobre",
          class: "block py-3 px-4 bg-blue-700 hover:bg-amber-500 rounded-lg transition-all"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` ℹ️ Sobre `);
            } else {
              return [
                createTextVNode(" ℹ️ Sobre ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</nav>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></header><div class="h-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" data-v-ad918b4f></div><main class="flex-1" data-v-ad918b4f>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="bg-gradient-to-b from-gray-900 to-gray-950 text-white mt-12" data-v-ad918b4f><div class="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" data-v-ad918b4f></div><div class="container mx-auto px-4 py-12" data-v-ad918b4f><div class="grid grid-cols-1 md:grid-cols-3 gap-8" data-v-ad918b4f><div data-v-ad918b4f><div class="flex items-center mb-4" data-v-ad918b4f><div class="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mr-3" data-v-ad918b4f><span class="text-2xl" data-v-ad918b4f>✝️</span></div><h3 class="text-xl font-bold text-amber-400" data-v-ad918b4f>Paróquia São Benedito</h3></div><p class="text-gray-300 text-sm leading-relaxed" data-v-ad918b4f> Arquidiocese de Cuiabá<br data-v-ad918b4f> Paróquia de Nossa Senhora do Rosário e São Benedito<br data-v-ad918b4f> Promovendo fé, comunidade e transparência. </p></div><div data-v-ad918b4f><h3 class="text-xl font-bold text-amber-400 mb-4 flex items-center" data-v-ad918b4f><span class="mr-2" data-v-ad918b4f>📞</span> Contato </h3><div class="space-y-2 text-gray-300 text-sm" data-v-ad918b4f><p class="flex items-start" data-v-ad918b4f><span class="mr-2 text-amber-400" data-v-ad918b4f>📍</span><span data-v-ad918b4f>Cuiabá, Mato Grosso</span></p><p class="flex items-center" data-v-ad918b4f><span class="mr-2 text-amber-400" data-v-ad918b4f>📞</span><span data-v-ad918b4f>(00) 0000-0000</span></p><p class="flex items-center" data-v-ad918b4f><span class="mr-2 text-amber-400" data-v-ad918b4f>✉️</span><span data-v-ad918b4f>contato@paroquiasaobento.org</span></p></div></div><div data-v-ad918b4f><h3 class="text-xl font-bold text-amber-400 mb-4 flex items-center" data-v-ad918b4f><span class="mr-2" data-v-ad918b4f>⏰</span> Horários de Missas </h3><div class="text-gray-300 text-sm space-y-2" data-v-ad918b4f><p data-v-ad918b4f><strong class="text-amber-300" data-v-ad918b4f>Segunda a Sexta:</strong> 19h00</p><p data-v-ad918b4f><strong class="text-amber-300" data-v-ad918b4f>Sábado:</strong> 18h00</p><p data-v-ad918b4f><strong class="text-amber-300" data-v-ad918b4f>Domingo:</strong> 8h00, 10h00 e 19h00</p></div></div></div><div class="border-t border-gray-800 mt-8 pt-6" data-v-ad918b4f><div class="text-center text-gray-400 text-sm" data-v-ad918b4f><p class="mb-2" data-v-ad918b4f> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Paróquia São Benedito - Todos os direitos reservados </p><p class="text-xs text-gray-500 italic" data-v-ad918b4f> &quot;Fé, Esperança e Caridade&quot; - Portal de Transparência Paroquial </p></div></div></div></footer></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/LayoutPublico.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const LayoutPublico = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ad918b4f"]]);
export {
  LayoutPublico as L
};

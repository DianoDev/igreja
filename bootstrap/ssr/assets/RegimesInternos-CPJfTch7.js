import { withCtx, createVNode, createBlock, createTextVNode, openBlock, Fragment, renderList, createCommentVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { L as LayoutPublico } from "./LayoutPublico--fxp03tU.js";
import { router } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "RegimesInternos",
  __ssrInlineRender: true,
  props: {
    regimesInternos: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const formatarDataHora = (dataHora) => {
      if (!dataHora) return "";
      const date = new Date(dataHora);
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const verDetalhes = (id) => {
      router.visit(`/publico/regimes-internos/${id}`);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(LayoutPublico, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bg-white rounded-lg shadow-lg p-6"${_scopeId}><h1 class="text-3xl font-bold text-gray-800 mb-6 flex items-center"${_scopeId}><span class="mr-3"${_scopeId}>📋</span> Regimes Internos </h1><p class="text-gray-600 mb-6"${_scopeId}> Consulte os regimentos internos e normas que regem as atividades da paróquia e dos festeiros. </p>`);
            if (__props.regimesInternos && __props.regimesInternos.length > 0) {
              _push2(`<div class="space-y-4"${_scopeId}><!--[-->`);
              ssrRenderList(__props.regimesInternos, (regime) => {
                _push2(`<div class="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer"${_scopeId}><div class="flex justify-between items-start"${_scopeId}><div class="flex-1"${_scopeId}><h2 class="text-xl font-semibold text-gray-800 mb-2"${_scopeId}>${ssrInterpolate(regime.nome)}</h2>`);
                if (regime.descricao) {
                  _push2(`<p class="text-gray-600 mb-3"${_scopeId}>${ssrInterpolate(regime.descricao)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="text-sm text-gray-500"${_scopeId}> Publicado em: ${ssrInterpolate(formatarDataHora(regime.created_at))}</div></div><button class="ml-4 text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"${_scopeId}> Ver documento → </button></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="text-center py-12 text-gray-500"${_scopeId}><p class="text-lg"${_scopeId}>Nenhum regime interno disponível no momento.</p></div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "bg-white rounded-lg shadow-lg p-6" }, [
                createVNode("h1", { class: "text-3xl font-bold text-gray-800 mb-6 flex items-center" }, [
                  createVNode("span", { class: "mr-3" }, "📋"),
                  createTextVNode(" Regimes Internos ")
                ]),
                createVNode("p", { class: "text-gray-600 mb-6" }, " Consulte os regimentos internos e normas que regem as atividades da paróquia e dos festeiros. "),
                __props.regimesInternos && __props.regimesInternos.length > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "space-y-4"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.regimesInternos, (regime) => {
                    return openBlock(), createBlock("div", {
                      key: regime.id,
                      class: "border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer",
                      onClick: ($event) => verDetalhes(regime.id)
                    }, [
                      createVNode("div", { class: "flex justify-between items-start" }, [
                        createVNode("div", { class: "flex-1" }, [
                          createVNode("h2", { class: "text-xl font-semibold text-gray-800 mb-2" }, toDisplayString(regime.nome), 1),
                          regime.descricao ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-gray-600 mb-3"
                          }, toDisplayString(regime.descricao), 1)) : createCommentVNode("", true),
                          createVNode("div", { class: "text-sm text-gray-500" }, " Publicado em: " + toDisplayString(formatarDataHora(regime.created_at)), 1)
                        ]),
                        createVNode("button", { class: "ml-4 text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center" }, " Ver documento → ")
                      ])
                    ], 8, ["onClick"]);
                  }), 128))
                ])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "text-center py-12 text-gray-500"
                }, [
                  createVNode("p", { class: "text-lg" }, "Nenhum regime interno disponível no momento.")
                ]))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Publico/RegimesInternos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

import { withCtx, unref, createTextVNode, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { L as LayoutPublico } from "./LayoutPublico-D7hYXjdx.js";
import { Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "EstatutoDetalhes",
  __ssrInlineRender: true,
  props: {
    estatuto: {
      type: Object,
      required: true
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(LayoutPublico, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-6" data-v-a227b5dc${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/publico/estatutos",
              class: "inline-flex items-center text-blue-600 hover:text-blue-700"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` ← Voltar para Estatutos `);
                } else {
                  return [
                    createTextVNode(" ← Voltar para Estatutos ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="bg-white rounded-lg shadow-lg p-8" data-v-a227b5dc${_scopeId}><div class="mb-6" data-v-a227b5dc${_scopeId}><h1 class="text-3xl font-bold text-gray-800 mb-3" data-v-a227b5dc${_scopeId}>${ssrInterpolate(__props.estatuto.nome)}</h1><div class="text-sm text-gray-500 mb-4" data-v-a227b5dc${_scopeId}> Publicado em: ${ssrInterpolate(formatarDataHora(__props.estatuto.created_at))}</div>`);
            if (__props.estatuto.updated_at !== __props.estatuto.created_at) {
              _push2(`<div class="text-sm text-gray-500" data-v-a227b5dc${_scopeId}> Última atualização: ${ssrInterpolate(formatarDataHora(__props.estatuto.updated_at))}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.estatuto.descricao) {
              _push2(`<div class="prose prose-lg max-w-none" data-v-a227b5dc${_scopeId}><div class="bg-gray-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6" data-v-a227b5dc${_scopeId}><h3 class="text-lg font-semibold text-gray-800 mb-2" data-v-a227b5dc${_scopeId}>Descrição</h3><p class="text-gray-700 whitespace-pre-wrap" data-v-a227b5dc${_scopeId}>${ssrInterpolate(__props.estatuto.descricao)}</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="border-t pt-6" data-v-a227b5dc${_scopeId}><div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6" data-v-a227b5dc${_scopeId}><p class="text-sm text-blue-800" data-v-a227b5dc${_scopeId}> 📄 O conteúdo completo deste estatuto está disponível nos arquivos oficiais da paróquia. Para mais informações ou cópia completa, entre em contato conosco. </p></div></div><div class="mt-8 pt-6 border-t border-gray-200" data-v-a227b5dc${_scopeId}><div class="bg-gray-50 rounded-lg p-4" data-v-a227b5dc${_scopeId}><p class="text-sm text-gray-600" data-v-a227b5dc${_scopeId}><strong data-v-a227b5dc${_scopeId}>Nota:</strong> Este estatuto é um documento legal que define a organização, finalidades e funcionamento da paróquia. Foi aprovado em assembleia geral e registrado nos órgãos competentes. </p></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-6" }, [
                createVNode(unref(Link), {
                  href: "/publico/estatutos",
                  class: "inline-flex items-center text-blue-600 hover:text-blue-700"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" ← Voltar para Estatutos ")
                  ]),
                  _: 1
                }),
                createVNode("div", { class: "bg-white rounded-lg shadow-lg p-8" }, [
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("h1", { class: "text-3xl font-bold text-gray-800 mb-3" }, toDisplayString(__props.estatuto.nome), 1),
                    createVNode("div", { class: "text-sm text-gray-500 mb-4" }, " Publicado em: " + toDisplayString(formatarDataHora(__props.estatuto.created_at)), 1),
                    __props.estatuto.updated_at !== __props.estatuto.created_at ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-sm text-gray-500"
                    }, " Última atualização: " + toDisplayString(formatarDataHora(__props.estatuto.updated_at)), 1)) : createCommentVNode("", true)
                  ]),
                  __props.estatuto.descricao ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "prose prose-lg max-w-none"
                  }, [
                    createVNode("div", { class: "bg-gray-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-gray-800 mb-2" }, "Descrição"),
                      createVNode("p", { class: "text-gray-700 whitespace-pre-wrap" }, toDisplayString(__props.estatuto.descricao), 1)
                    ])
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "border-t pt-6" }, [
                    createVNode("div", { class: "bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6" }, [
                      createVNode("p", { class: "text-sm text-blue-800" }, " 📄 O conteúdo completo deste estatuto está disponível nos arquivos oficiais da paróquia. Para mais informações ou cópia completa, entre em contato conosco. ")
                    ])
                  ]),
                  createVNode("div", { class: "mt-8 pt-6 border-t border-gray-200" }, [
                    createVNode("div", { class: "bg-gray-50 rounded-lg p-4" }, [
                      createVNode("p", { class: "text-sm text-gray-600" }, [
                        createVNode("strong", null, "Nota:"),
                        createTextVNode(" Este estatuto é um documento legal que define a organização, finalidades e funcionamento da paróquia. Foi aprovado em assembleia geral e registrado nos órgãos competentes. ")
                      ])
                    ])
                  ])
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Publico/EstatutoDetalhes.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const EstatutoDetalhes = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a227b5dc"]]);
export {
  EstatutoDetalhes as default
};

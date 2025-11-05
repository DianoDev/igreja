import { withCtx, unref, createTextVNode, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { L as LayoutPublico } from "./LayoutPublico-BZL66lkV.js";
import { Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "AtasDetalhes",
  __ssrInlineRender: true,
  props: {
    ata: {
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
            _push2(`<div class="space-y-6" data-v-1887b198${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/publico/atas",
              class: "inline-flex items-center text-blue-600 hover:text-blue-700"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` ← Voltar para Atas `);
                } else {
                  return [
                    createTextVNode(" ← Voltar para Atas ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="bg-white rounded-lg shadow-lg p-8" data-v-1887b198${_scopeId}><div class="mb-6" data-v-1887b198${_scopeId}><h1 class="text-3xl font-bold text-gray-800 mb-3" data-v-1887b198${_scopeId}>${ssrInterpolate(__props.ata.nome)}</h1><div class="text-sm text-gray-500 mb-4" data-v-1887b198${_scopeId}> Publicada em: ${ssrInterpolate(formatarDataHora(__props.ata.created_at))}</div>`);
            if (__props.ata.updated_at !== __props.ata.created_at) {
              _push2(`<div class="text-sm text-gray-500" data-v-1887b198${_scopeId}> Última atualização: ${ssrInterpolate(formatarDataHora(__props.ata.updated_at))}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.ata.descricao) {
              _push2(`<div class="prose prose-lg max-w-none" data-v-1887b198${_scopeId}><div class="bg-gray-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6" data-v-1887b198${_scopeId}><h3 class="text-lg font-semibold text-gray-800 mb-2" data-v-1887b198${_scopeId}>Descrição</h3><p class="text-gray-700 whitespace-pre-wrap" data-v-1887b198${_scopeId}>${ssrInterpolate(__props.ata.descricao)}</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="border-t pt-6" data-v-1887b198${_scopeId}><div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6" data-v-1887b198${_scopeId}><p class="text-sm text-blue-800" data-v-1887b198${_scopeId}> 📄 O conteúdo completo desta ata está disponível nos arquivos oficiais da paróquia. Para mais informações, entre em contato conosco. </p></div></div><div class="mt-8 pt-6 border-t border-gray-200" data-v-1887b198${_scopeId}><div class="bg-gray-50 rounded-lg p-4" data-v-1887b198${_scopeId}><p class="text-sm text-gray-600" data-v-1887b198${_scopeId}><strong data-v-1887b198${_scopeId}>Nota:</strong> Esta ata foi publicada para promover a transparência das atividades da paróquia. Todas as informações aqui contidas são oficiais e foram aprovadas em reunião. </p></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-6" }, [
                createVNode(unref(Link), {
                  href: "/publico/atas",
                  class: "inline-flex items-center text-blue-600 hover:text-blue-700"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" ← Voltar para Atas ")
                  ]),
                  _: 1
                }),
                createVNode("div", { class: "bg-white rounded-lg shadow-lg p-8" }, [
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("h1", { class: "text-3xl font-bold text-gray-800 mb-3" }, toDisplayString(__props.ata.nome), 1),
                    createVNode("div", { class: "text-sm text-gray-500 mb-4" }, " Publicada em: " + toDisplayString(formatarDataHora(__props.ata.created_at)), 1),
                    __props.ata.updated_at !== __props.ata.created_at ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-sm text-gray-500"
                    }, " Última atualização: " + toDisplayString(formatarDataHora(__props.ata.updated_at)), 1)) : createCommentVNode("", true)
                  ]),
                  __props.ata.descricao ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "prose prose-lg max-w-none"
                  }, [
                    createVNode("div", { class: "bg-gray-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-gray-800 mb-2" }, "Descrição"),
                      createVNode("p", { class: "text-gray-700 whitespace-pre-wrap" }, toDisplayString(__props.ata.descricao), 1)
                    ])
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "border-t pt-6" }, [
                    createVNode("div", { class: "bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6" }, [
                      createVNode("p", { class: "text-sm text-blue-800" }, " 📄 O conteúdo completo desta ata está disponível nos arquivos oficiais da paróquia. Para mais informações, entre em contato conosco. ")
                    ])
                  ]),
                  createVNode("div", { class: "mt-8 pt-6 border-t border-gray-200" }, [
                    createVNode("div", { class: "bg-gray-50 rounded-lg p-4" }, [
                      createVNode("p", { class: "text-sm text-gray-600" }, [
                        createVNode("strong", null, "Nota:"),
                        createTextVNode(" Esta ata foi publicada para promover a transparência das atividades da paróquia. Todas as informações aqui contidas são oficiais e foram aprovadas em reunião. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Publico/AtasDetalhes.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AtasDetalhes = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1887b198"]]);
export {
  AtasDetalhes as default
};

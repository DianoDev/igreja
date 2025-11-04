import { withCtx, createVNode, createBlock, createTextVNode, openBlock, Fragment, renderList, createCommentVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { L as LayoutPublico } from "./LayoutPublico-DaOEiv59.js";
import "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Atas",
  __ssrInlineRender: true,
  props: {
    atas: {
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
    const downloadArquivo = (arquivo) => {
      if (!arquivo || !arquivo.hash) {
        alert("Arquivo não disponível");
        return;
      }
      let hash = arquivo.hash.replace(/^public\//, "");
      const url = `/storage/${hash}`;
      console.log("Abrindo arquivo:", url);
      window.open(url, "_blank");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(LayoutPublico, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bg-white rounded-lg shadow-lg p-6"${_scopeId}><h1 class="text-3xl font-bold text-gray-800 mb-6 flex items-center"${_scopeId}><span class="mr-3"${_scopeId}>📝</span> Atas das Reuniões </h1><p class="text-gray-600 mb-6"${_scopeId}> Acompanhe as atas de todas as reuniões e assembleias da paróquia. Promovemos a transparência em todas as nossas decisões. </p>`);
            if (__props.atas && __props.atas.length > 0) {
              _push2(`<div class="space-y-4"${_scopeId}><!--[-->`);
              ssrRenderList(__props.atas, (ata) => {
                _push2(`<div class="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all"${_scopeId}><div class="flex justify-between items-start"${_scopeId}><div class="flex-1"${_scopeId}><h2 class="text-xl font-semibold text-gray-800 mb-2"${_scopeId}>${ssrInterpolate(ata.nome)}</h2>`);
                if (ata.descricao) {
                  _push2(`<p class="text-gray-600 mb-3"${_scopeId}>${ssrInterpolate(ata.descricao)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="text-sm text-gray-500"${_scopeId}> Publicada em: ${ssrInterpolate(formatarDataHora(ata.created_at))}</div></div><div class="flex gap-2 ml-4"${_scopeId}>`);
                if (ata.arquivo) {
                  _push2(`<button class="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"${_scopeId}><i class="fa fa-download"${_scopeId}></i> Baixar PDF </button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="text-center py-12 text-gray-500"${_scopeId}><p class="text-lg"${_scopeId}>Nenhuma ata disponível no momento.</p></div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "bg-white rounded-lg shadow-lg p-6" }, [
                createVNode("h1", { class: "text-3xl font-bold text-gray-800 mb-6 flex items-center" }, [
                  createVNode("span", { class: "mr-3" }, "📝"),
                  createTextVNode(" Atas das Reuniões ")
                ]),
                createVNode("p", { class: "text-gray-600 mb-6" }, " Acompanhe as atas de todas as reuniões e assembleias da paróquia. Promovemos a transparência em todas as nossas decisões. "),
                __props.atas && __props.atas.length > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "space-y-4"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.atas, (ata) => {
                    return openBlock(), createBlock("div", {
                      key: ata.id,
                      class: "border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all"
                    }, [
                      createVNode("div", { class: "flex justify-between items-start" }, [
                        createVNode("div", { class: "flex-1" }, [
                          createVNode("h2", { class: "text-xl font-semibold text-gray-800 mb-2" }, toDisplayString(ata.nome), 1),
                          ata.descricao ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-gray-600 mb-3"
                          }, toDisplayString(ata.descricao), 1)) : createCommentVNode("", true),
                          createVNode("div", { class: "text-sm text-gray-500" }, " Publicada em: " + toDisplayString(formatarDataHora(ata.created_at)), 1)
                        ]),
                        createVNode("div", { class: "flex gap-2 ml-4" }, [
                          ata.arquivo ? (openBlock(), createBlock("button", {
                            key: 0,
                            onClick: ($event) => downloadArquivo(ata.arquivo),
                            class: "text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                          }, [
                            createVNode("i", { class: "fa fa-download" }),
                            createTextVNode(" Baixar PDF ")
                          ], 8, ["onClick"])) : createCommentVNode("", true)
                        ])
                      ])
                    ]);
                  }), 128))
                ])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "text-center py-12 text-gray-500"
                }, [
                  createVNode("p", { class: "text-lg" }, "Nenhuma ata disponível no momento.")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Publico/Atas.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

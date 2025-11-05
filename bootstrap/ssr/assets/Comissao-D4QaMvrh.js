import { withCtx, createVNode, createBlock, createTextVNode, openBlock, createCommentVNode, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { L as LayoutPublico } from "./LayoutPublico-D7hYXjdx.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@inertiajs/vue3";
const _sfc_main = {
  __name: "Comissao",
  __ssrInlineRender: true,
  props: {
    comissao: {
      type: Object,
      default: null
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(LayoutPublico, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bg-white rounded-lg shadow-lg p-6" data-v-4c66f0eb${_scopeId}><h1 class="text-3xl font-bold text-gray-800 mb-6 flex items-center" data-v-4c66f0eb${_scopeId}><span class="mr-3" data-v-4c66f0eb${_scopeId}>👥</span> Comissão de Festeiros </h1><p class="text-gray-600 mb-8" data-v-4c66f0eb${_scopeId}> Conheça os membros da comissão responsável pela organização das festividades da Paróquia São Benedito. </p>`);
            if (__props.comissao) {
              _push2(`<div class="mb-8" data-v-4c66f0eb${_scopeId}><div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mb-8 border-l-4 border-blue-500" data-v-4c66f0eb${_scopeId}><div class="text-center" data-v-4c66f0eb${_scopeId}><h2 class="text-4xl font-bold text-gray-800 mb-3" style="${ssrRenderStyle({ "font-family": "Georgia, serif" })}" data-v-4c66f0eb${_scopeId}>${ssrInterpolate(__props.comissao.nome)}</h2><div class="inline-block" data-v-4c66f0eb${_scopeId}><span class="bg-blue-600 text-white px-6 py-2 rounded-full text-xl font-semibold" data-v-4c66f0eb${_scopeId}> Ano ${ssrInterpolate(__props.comissao.ano)}</span></div>`);
              if (__props.comissao.descricao) {
                _push2(`<p class="text-gray-700 mt-4 max-w-3xl mx-auto" data-v-4c66f0eb${_scopeId}>${ssrInterpolate(__props.comissao.descricao)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
              if (__props.comissao.integrantes && __props.comissao.integrantes.length > 0) {
                _push2(`<div data-v-4c66f0eb${_scopeId}><h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center" data-v-4c66f0eb${_scopeId}><span class="mr-2" data-v-4c66f0eb${_scopeId}>👨‍👩‍👧‍👦</span> Integrantes da Comissão </h3><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-v-4c66f0eb${_scopeId}><!--[-->`);
                ssrRenderList(__props.comissao.integrantes, (integrante) => {
                  _push2(`<div class="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-l-4 border-amber-300 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1" data-v-4c66f0eb${_scopeId}><div class="flex items-start gap-4" data-v-4c66f0eb${_scopeId}><div class="flex-shrink-0" data-v-4c66f0eb${_scopeId}><div class="w-16 h-16 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full flex items-center justify-center text-white text-2xl shadow-lg" data-v-4c66f0eb${_scopeId}><i class="fa fa-user" data-v-4c66f0eb${_scopeId}></i></div></div><div class="flex-1 min-w-0" data-v-4c66f0eb${_scopeId}><h4 class="font-bold text-gray-900 text-lg mb-1 leading-tight" data-v-4c66f0eb${_scopeId}>${ssrInterpolate(integrante.pessoa.nome)}</h4><p class="text-gray-900 font-semibold text-sm mb-2" data-v-4c66f0eb${_scopeId}>${ssrInterpolate(integrante.cargo.nome)}</p></div></div></div>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<div class="text-center py-12 bg-gray-50 rounded-lg" data-v-4c66f0eb${_scopeId}><div class="text-gray-400 text-5xl mb-4" data-v-4c66f0eb${_scopeId}><i class="fa fa-users" data-v-4c66f0eb${_scopeId}></i></div><p class="text-gray-600" data-v-4c66f0eb${_scopeId}> Nenhum integrante cadastrado para esta comissão. </p></div>`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<div class="text-center py-16" data-v-4c66f0eb${_scopeId}><div class="text-gray-400 text-6xl mb-4" data-v-4c66f0eb${_scopeId}><i class="fa fa-users-slash" data-v-4c66f0eb${_scopeId}></i></div><p class="text-gray-500 text-lg mb-2" data-v-4c66f0eb${_scopeId}> Comissão não disponível no momento. </p><p class="text-gray-400" data-v-4c66f0eb${_scopeId}> As informações da comissão atual serão publicadas em breve. </p></div>`);
            }
            _push2(`<div class="mt-12 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg" data-v-4c66f0eb${_scopeId}><h4 class="font-semibold text-gray-800 mb-2 flex items-center" data-v-4c66f0eb${_scopeId}><i class="fa fa-info-circle mr-2 text-blue-600" data-v-4c66f0eb${_scopeId}></i> Sobre a Comissão </h4><p class="text-gray-700" data-v-4c66f0eb${_scopeId}> A Comissão de Festeiros é responsável pela organização e coordenação de todas as festividades e eventos da Paróquia São Benedito. Cada membro desempenha um papel fundamental para o sucesso das celebrações e atividades comunitárias. </p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "bg-white rounded-lg shadow-lg p-6" }, [
                createVNode("h1", { class: "text-3xl font-bold text-gray-800 mb-6 flex items-center" }, [
                  createVNode("span", { class: "mr-3" }, "👥"),
                  createTextVNode(" Comissão de Festeiros ")
                ]),
                createVNode("p", { class: "text-gray-600 mb-8" }, " Conheça os membros da comissão responsável pela organização das festividades da Paróquia São Benedito. "),
                __props.comissao ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mb-8"
                }, [
                  createVNode("div", { class: "bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mb-8 border-l-4 border-blue-500" }, [
                    createVNode("div", { class: "text-center" }, [
                      createVNode("h2", {
                        class: "text-4xl font-bold text-gray-800 mb-3",
                        style: { "font-family": "Georgia, serif" }
                      }, toDisplayString(__props.comissao.nome), 1),
                      createVNode("div", { class: "inline-block" }, [
                        createVNode("span", { class: "bg-blue-600 text-white px-6 py-2 rounded-full text-xl font-semibold" }, " Ano " + toDisplayString(__props.comissao.ano), 1)
                      ]),
                      __props.comissao.descricao ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-gray-700 mt-4 max-w-3xl mx-auto"
                      }, toDisplayString(__props.comissao.descricao), 1)) : createCommentVNode("", true)
                    ])
                  ]),
                  __props.comissao.integrantes && __props.comissao.integrantes.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode("h3", { class: "text-2xl font-bold text-gray-800 mb-6 flex items-center" }, [
                      createVNode("span", { class: "mr-2" }, "👨‍👩‍👧‍👦"),
                      createTextVNode(" Integrantes da Comissão ")
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.comissao.integrantes, (integrante) => {
                        return openBlock(), createBlock("div", {
                          key: integrante.id,
                          class: "bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-l-4 border-amber-300 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1"
                        }, [
                          createVNode("div", { class: "flex items-start gap-4" }, [
                            createVNode("div", { class: "flex-shrink-0" }, [
                              createVNode("div", { class: "w-16 h-16 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full flex items-center justify-center text-white text-2xl shadow-lg" }, [
                                createVNode("i", { class: "fa fa-user" })
                              ])
                            ]),
                            createVNode("div", { class: "flex-1 min-w-0" }, [
                              createVNode("h4", { class: "font-bold text-gray-900 text-lg mb-1 leading-tight" }, toDisplayString(integrante.pessoa.nome), 1),
                              createVNode("p", { class: "text-gray-900 font-semibold text-sm mb-2" }, toDisplayString(integrante.cargo.nome), 1)
                            ])
                          ])
                        ]);
                      }), 128))
                    ])
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "text-center py-12 bg-gray-50 rounded-lg"
                  }, [
                    createVNode("div", { class: "text-gray-400 text-5xl mb-4" }, [
                      createVNode("i", { class: "fa fa-users" })
                    ]),
                    createVNode("p", { class: "text-gray-600" }, " Nenhum integrante cadastrado para esta comissão. ")
                  ]))
                ])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "text-center py-16"
                }, [
                  createVNode("div", { class: "text-gray-400 text-6xl mb-4" }, [
                    createVNode("i", { class: "fa fa-users-slash" })
                  ]),
                  createVNode("p", { class: "text-gray-500 text-lg mb-2" }, " Comissão não disponível no momento. "),
                  createVNode("p", { class: "text-gray-400" }, " As informações da comissão atual serão publicadas em breve. ")
                ])),
                createVNode("div", { class: "mt-12 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg" }, [
                  createVNode("h4", { class: "font-semibold text-gray-800 mb-2 flex items-center" }, [
                    createVNode("i", { class: "fa fa-info-circle mr-2 text-blue-600" }),
                    createTextVNode(" Sobre a Comissão ")
                  ]),
                  createVNode("p", { class: "text-gray-700" }, " A Comissão de Festeiros é responsável pela organização e coordenação de todas as festividades e eventos da Paróquia São Benedito. Cada membro desempenha um papel fundamental para o sucesso das celebrações e atividades comunitárias. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Publico/Comissao.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Comissao = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4c66f0eb"]]);
export {
  Comissao as default
};

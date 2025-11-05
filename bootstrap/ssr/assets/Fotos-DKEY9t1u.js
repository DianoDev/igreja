import { ref, withCtx, createVNode, createBlock, createTextVNode, toDisplayString, openBlock, Fragment, renderList, createCommentVNode, Teleport, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderTeleport } from "vue/server-renderer";
import { L as LayoutPublico } from "./LayoutPublico-BZL66lkV.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@inertiajs/vue3";
const _sfc_main = {
  __name: "Fotos",
  __ssrInlineRender: true,
  props: {
    eventos: {
      type: Array,
      default: () => []
    },
    totalFotos: {
      type: Number,
      default: 0
    }
  },
  setup(__props) {
    const fotoSelecionada = ref(null);
    const modalAberto = ref(false);
    const indiceAtual = ref(0);
    const fotosAtuais = ref([]);
    function getFotoUrl(foto) {
      if (!foto || !foto.hash) return "";
      const hash = foto.hash.replace("public/", "");
      return `/storage/${hash}`;
    }
    const formatarData = (data) => {
      if (!data) return "-";
      try {
        const date = new Date(data);
        if (isNaN(date.getTime())) return data;
        const dia = String(date.getDate()).padStart(2, "0");
        const mes = String(date.getMonth() + 1).padStart(2, "0");
        const ano = date.getFullYear();
        return `${dia}/${mes}/${ano}`;
      } catch (e) {
        return data;
      }
    };
    const abrirModal = (foto, fotos) => {
      fotoSelecionada.value = foto;
      fotosAtuais.value = fotos;
      indiceAtual.value = fotos.findIndex((f) => f.id === foto.id);
      modalAberto.value = true;
      document.body.style.overflow = "hidden";
    };
    const fecharModal = () => {
      modalAberto.value = false;
      fotoSelecionada.value = null;
      fotosAtuais.value = [];
      document.body.style.overflow = "";
    };
    function proximaFoto() {
      if (indiceAtual.value < fotosAtuais.value.length - 1) {
        indiceAtual.value++;
        fotoSelecionada.value = fotosAtuais.value[indiceAtual.value];
      }
    }
    function fotoAnterior() {
      if (indiceAtual.value > 0) {
        indiceAtual.value--;
        fotoSelecionada.value = fotosAtuais.value[indiceAtual.value];
      }
    }
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", (e) => {
        if (modalAberto.value) {
          if (e.key === "Escape") fecharModal();
          if (e.key === "ArrowRight") proximaFoto();
          if (e.key === "ArrowLeft") fotoAnterior();
        }
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(LayoutPublico, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bg-white rounded-lg shadow-lg p-6" data-v-a3f6f624${_scopeId}><h1 class="text-3xl font-bold text-gray-800 mb-6 flex items-center" data-v-a3f6f624${_scopeId}><span class="mr-3" data-v-a3f6f624${_scopeId}>📸</span> Galeria de Fotos </h1><p class="text-gray-600 mb-2" data-v-a3f6f624${_scopeId}> Reviva os momentos especiais das festividades e eventos da Paróquia São Benedito. </p><div class="mb-8" data-v-a3f6f624${_scopeId}><div class="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-lg" data-v-a3f6f624${_scopeId}><i class="fa fa-images mr-2" data-v-a3f6f624${_scopeId}></i><span class="font-semibold" data-v-a3f6f624${_scopeId}>${ssrInterpolate(__props.totalFotos)} ${ssrInterpolate(__props.totalFotos === 1 ? "foto" : "fotos")} disponíveis</span></div></div>`);
            if (__props.eventos && __props.eventos.length > 0) {
              _push2(`<div class="space-y-12" data-v-a3f6f624${_scopeId}><!--[-->`);
              ssrRenderList(__props.eventos, (evento) => {
                _push2(`<div class="border-b border-gray-200 pb-10 last:border-b-0" data-v-a3f6f624${_scopeId}><div class="mb-6" data-v-a3f6f624${_scopeId}><div class="flex items-start justify-between gap-4 flex-wrap" data-v-a3f6f624${_scopeId}><div data-v-a3f6f624${_scopeId}><h2 class="text-2xl font-bold text-gray-800 mb-2" data-v-a3f6f624${_scopeId}>${ssrInterpolate(evento.nome)}</h2><div class="flex items-center gap-4 text-gray-600" data-v-a3f6f624${_scopeId}><span class="flex items-center gap-1" data-v-a3f6f624${_scopeId}><i class="fa fa-calendar" data-v-a3f6f624${_scopeId}></i> ${ssrInterpolate(formatarData(evento.data))}</span>`);
                if (evento.hora) {
                  _push2(`<span class="flex items-center gap-1" data-v-a3f6f624${_scopeId}><i class="fa fa-clock" data-v-a3f6f624${_scopeId}></i> ${ssrInterpolate(evento.hora)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<span class="flex items-center gap-1 text-purple-600 font-semibold" data-v-a3f6f624${_scopeId}><i class="fa fa-images" data-v-a3f6f624${_scopeId}></i> ${ssrInterpolate(evento.fotos.length)} ${ssrInterpolate(evento.fotos.length === 1 ? "foto" : "fotos")}</span></div></div><a${ssrRenderAttr("href", `/publico/eventos/${evento.id}`)} class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors" data-v-a3f6f624${_scopeId}><i class="fa fa-eye" data-v-a3f6f624${_scopeId}></i> Ver Evento </a></div></div><div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" data-v-a3f6f624${_scopeId}><!--[-->`);
                ssrRenderList(evento.fotos, (foto) => {
                  _push2(`<div class="group relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer" data-v-a3f6f624${_scopeId}><img${ssrRenderAttr("src", getFotoUrl(foto))}${ssrRenderAttr("alt", foto.titulo || foto.nome || "Foto do evento")} class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" data-v-a3f6f624${_scopeId}><div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3" data-v-a3f6f624${_scopeId}><p class="text-white font-semibold text-sm" data-v-a3f6f624${_scopeId}>${ssrInterpolate(foto.titulo || foto.nome)}</p></div><div class="absolute top-2 right-2 bg-white/80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity" data-v-a3f6f624${_scopeId}><i class="fa fa-search-plus text-gray-700" data-v-a3f6f624${_scopeId}></i></div></div>`);
                });
                _push2(`<!--]--></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="text-center py-16" data-v-a3f6f624${_scopeId}><div class="text-gray-400 text-6xl mb-4" data-v-a3f6f624${_scopeId}><i class="fa fa-image" data-v-a3f6f624${_scopeId}></i></div><p class="text-gray-500 text-lg mb-2" data-v-a3f6f624${_scopeId}> Nenhuma foto disponível no momento. </p><p class="text-gray-400" data-v-a3f6f624${_scopeId}> As fotos dos próximos eventos serão publicadas aqui. </p></div>`);
            }
            _push2(`</div>`);
            ssrRenderTeleport(_push2, (_push3) => {
              if (modalAberto.value) {
                _push3(`<div class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" data-v-a3f6f624${_scopeId}><div class="relative max-w-7xl max-h-screen" data-v-a3f6f624${_scopeId}><button class="absolute -top-12 right-0 text-white hover:text-gray-300 text-2xl" data-v-a3f6f624${_scopeId}><i class="fa fa-times-circle" data-v-a3f6f624${_scopeId}></i></button>`);
                if (indiceAtual.value > 0) {
                  _push3(`<button class="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 text-4xl bg-black/50 rounded-full w-12 h-12 flex items-center justify-center" data-v-a3f6f624${_scopeId}><i class="fa fa-chevron-left" data-v-a3f6f624${_scopeId}></i></button>`);
                } else {
                  _push3(`<!---->`);
                }
                _push3(`<img${ssrRenderAttr("src", getFotoUrl(fotoSelecionada.value))}${ssrRenderAttr("alt", fotoSelecionada.value.titulo || fotoSelecionada.value.nome || "Foto")} class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" data-v-a3f6f624${_scopeId}>`);
                if (indiceAtual.value < fotosAtuais.value.length - 1) {
                  _push3(`<button class="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 text-4xl bg-black/50 rounded-full w-12 h-12 flex items-center justify-center" data-v-a3f6f624${_scopeId}><i class="fa fa-chevron-right" data-v-a3f6f624${_scopeId}></i></button>`);
                } else {
                  _push3(`<!---->`);
                }
                _push3(`<div class="mt-4 text-white text-center" data-v-a3f6f624${_scopeId}><p class="text-xl font-semibold" data-v-a3f6f624${_scopeId}>${ssrInterpolate(fotoSelecionada.value.titulo || fotoSelecionada.value.nome)}</p>`);
                if (fotoSelecionada.value.descricao) {
                  _push3(`<p class="text-sm text-gray-300 mt-2" data-v-a3f6f624${_scopeId}>${ssrInterpolate(fotoSelecionada.value.descricao)}</p>`);
                } else {
                  _push3(`<!---->`);
                }
                _push3(`</div></div></div>`);
              } else {
                _push3(`<!---->`);
              }
            }, "body", false, _parent2);
          } else {
            return [
              createVNode("div", { class: "bg-white rounded-lg shadow-lg p-6" }, [
                createVNode("h1", { class: "text-3xl font-bold text-gray-800 mb-6 flex items-center" }, [
                  createVNode("span", { class: "mr-3" }, "📸"),
                  createTextVNode(" Galeria de Fotos ")
                ]),
                createVNode("p", { class: "text-gray-600 mb-2" }, " Reviva os momentos especiais das festividades e eventos da Paróquia São Benedito. "),
                createVNode("div", { class: "mb-8" }, [
                  createVNode("div", { class: "inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-lg" }, [
                    createVNode("i", { class: "fa fa-images mr-2" }),
                    createVNode("span", { class: "font-semibold" }, toDisplayString(__props.totalFotos) + " " + toDisplayString(__props.totalFotos === 1 ? "foto" : "fotos") + " disponíveis", 1)
                  ])
                ]),
                __props.eventos && __props.eventos.length > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "space-y-12"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.eventos, (evento) => {
                    return openBlock(), createBlock("div", {
                      key: evento.id,
                      class: "border-b border-gray-200 pb-10 last:border-b-0"
                    }, [
                      createVNode("div", { class: "mb-6" }, [
                        createVNode("div", { class: "flex items-start justify-between gap-4 flex-wrap" }, [
                          createVNode("div", null, [
                            createVNode("h2", { class: "text-2xl font-bold text-gray-800 mb-2" }, toDisplayString(evento.nome), 1),
                            createVNode("div", { class: "flex items-center gap-4 text-gray-600" }, [
                              createVNode("span", { class: "flex items-center gap-1" }, [
                                createVNode("i", { class: "fa fa-calendar" }),
                                createTextVNode(" " + toDisplayString(formatarData(evento.data)), 1)
                              ]),
                              evento.hora ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "flex items-center gap-1"
                              }, [
                                createVNode("i", { class: "fa fa-clock" }),
                                createTextVNode(" " + toDisplayString(evento.hora), 1)
                              ])) : createCommentVNode("", true),
                              createVNode("span", { class: "flex items-center gap-1 text-purple-600 font-semibold" }, [
                                createVNode("i", { class: "fa fa-images" }),
                                createTextVNode(" " + toDisplayString(evento.fotos.length) + " " + toDisplayString(evento.fotos.length === 1 ? "foto" : "fotos"), 1)
                              ])
                            ])
                          ]),
                          createVNode("a", {
                            href: `/publico/eventos/${evento.id}`,
                            class: "inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                          }, [
                            createVNode("i", { class: "fa fa-eye" }),
                            createTextVNode(" Ver Evento ")
                          ], 8, ["href"])
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(evento.fotos, (foto) => {
                          return openBlock(), createBlock("div", {
                            key: foto.id,
                            class: "group relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer",
                            onClick: ($event) => abrirModal(foto, evento.fotos)
                          }, [
                            createVNode("img", {
                              src: getFotoUrl(foto),
                              alt: foto.titulo || foto.nome || "Foto do evento",
                              class: "w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                            }, null, 8, ["src", "alt"]),
                            createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3" }, [
                              createVNode("p", { class: "text-white font-semibold text-sm" }, toDisplayString(foto.titulo || foto.nome), 1)
                            ]),
                            createVNode("div", { class: "absolute top-2 right-2 bg-white/80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity" }, [
                              createVNode("i", { class: "fa fa-search-plus text-gray-700" })
                            ])
                          ], 8, ["onClick"]);
                        }), 128))
                      ])
                    ]);
                  }), 128))
                ])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "text-center py-16"
                }, [
                  createVNode("div", { class: "text-gray-400 text-6xl mb-4" }, [
                    createVNode("i", { class: "fa fa-image" })
                  ]),
                  createVNode("p", { class: "text-gray-500 text-lg mb-2" }, " Nenhuma foto disponível no momento. "),
                  createVNode("p", { class: "text-gray-400" }, " As fotos dos próximos eventos serão publicadas aqui. ")
                ]))
              ]),
              (openBlock(), createBlock(Teleport, { to: "body" }, [
                modalAberto.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  onClick: fecharModal,
                  class: "fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                }, [
                  createVNode("div", {
                    class: "relative max-w-7xl max-h-screen",
                    onClick: withModifiers(() => {
                    }, ["stop"])
                  }, [
                    createVNode("button", {
                      onClick: fecharModal,
                      class: "absolute -top-12 right-0 text-white hover:text-gray-300 text-2xl"
                    }, [
                      createVNode("i", { class: "fa fa-times-circle" })
                    ]),
                    indiceAtual.value > 0 ? (openBlock(), createBlock("button", {
                      key: 0,
                      onClick: fotoAnterior,
                      class: "absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 text-4xl bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
                    }, [
                      createVNode("i", { class: "fa fa-chevron-left" })
                    ])) : createCommentVNode("", true),
                    createVNode("img", {
                      src: getFotoUrl(fotoSelecionada.value),
                      alt: fotoSelecionada.value.titulo || fotoSelecionada.value.nome || "Foto",
                      class: "max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                    }, null, 8, ["src", "alt"]),
                    indiceAtual.value < fotosAtuais.value.length - 1 ? (openBlock(), createBlock("button", {
                      key: 1,
                      onClick: proximaFoto,
                      class: "absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 text-4xl bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
                    }, [
                      createVNode("i", { class: "fa fa-chevron-right" })
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "mt-4 text-white text-center" }, [
                      createVNode("p", { class: "text-xl font-semibold" }, toDisplayString(fotoSelecionada.value.titulo || fotoSelecionada.value.nome), 1),
                      fotoSelecionada.value.descricao ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-gray-300 mt-2"
                      }, toDisplayString(fotoSelecionada.value.descricao), 1)) : createCommentVNode("", true)
                    ])
                  ], 8, ["onClick"])
                ])) : createCommentVNode("", true)
              ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Publico/Fotos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Fotos = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a3f6f624"]]);
export {
  Fotos as default
};

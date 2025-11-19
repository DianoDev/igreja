import { inject, ref, onMounted, withCtx, createVNode, createTextVNode, toDisplayString, withDirectives, createBlock, openBlock, Fragment, renderList, vModelSelect, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { router } from "@inertiajs/vue3";
import { L as LayoutPrincipal } from "./LayoutPrincipal-CkoRPw-8.js";
import _sfc_main$1 from "./InputLabel-CDsQQ3SF.js";
import _sfc_main$2 from "./InputError-DKvItylr.js";
import { useToast } from "vue-toastification";
import axios from "axios";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./Modal-D4SsQX3D.js";
const _sfc_main = {
  __name: "EventoGrupos",
  __ssrInlineRender: true,
  props: {
    evento: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const toast = useToast();
    const events = inject("events");
    const processing = ref(false);
    const errors = ref({});
    const gruposEvento = ref([]);
    const gruposModelo = ref([]);
    const grupoSelecionado = ref("");
    onMounted(() => {
      carregarGruposModelo();
      carregarGruposEvento();
      events.on("recarrega-evento", () => {
        carregarGruposEvento();
      });
    });
    async function carregarGruposModelo() {
      try {
        const response = await axios.get("/admin/grupo-evento/grupos-modelo");
        gruposModelo.value = response.data;
      } catch (error) {
        console.error("Erro ao carregar grupos modelo:", error);
      }
    }
    async function carregarGruposEvento() {
      try {
        const response = await axios.get(`/admin/grupo-evento/evento/${props.evento.id}`);
        gruposEvento.value = response.data;
      } catch (error) {
        console.error("Erro ao carregar grupos do evento:", error);
      }
    }
    async function importarGrupo() {
      errors.value = {};
      if (!grupoSelecionado.value) {
        errors.value.grupo_modelo = "Selecione um grupo";
        return;
      }
      processing.value = true;
      try {
        const response = await axios.post("/admin/grupo-evento/importar", {
          id_evento: props.evento.id,
          id_grupo: grupoSelecionado.value
        });
        if (response.data.success) {
          toast.success(response.data.message);
          await carregarGruposEvento();
          grupoSelecionado.value = "";
        }
      } catch (error) {
        toast.error("Erro ao importar grupo");
        console.error(error);
      } finally {
        processing.value = false;
      }
    }
    function editarGrupo(grupo) {
      console.log("oi");
      events.emit("popup", {
        id: grupo.id,
        component: "Admin/Eventos/ModalEditarGrupo",
        title: "Editar Grupo",
        size: "xl",
        data: { id: grupo.id }
      });
    }
    async function removerGrupo(idGrupo) {
      if (!confirm("Deseja realmente remover este grupo?")) return;
      processing.value = true;
      try {
        const response = await axios.delete(`/admin/grupo-evento/${idGrupo}`);
        if (response.data.success) {
          toast.success(response.data.message);
          await carregarGruposEvento();
        }
      } catch (error) {
        toast.error("Erro ao remover grupo");
        console.error(error);
      } finally {
        processing.value = false;
      }
    }
    function formatarCPF(cpf) {
      if (!cpf) return "";
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    function formatarData(data) {
      if (!data) return "";
      const [ano, mes, dia] = data.split("-");
      return `${dia}/${mes}/${ano}`;
    }
    function voltar() {
      router.visit("/admin/eventos");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(LayoutPrincipal, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="page-content" data-v-289074be${_scopeId}><div class="mb-6" data-v-289074be${_scopeId}><button class="btn btn-secondary mb-4" data-v-289074be${_scopeId}><i class="fa fa-arrow-left mr-2" data-v-289074be${_scopeId}></i> Voltar </button><div class="bg-white rounded-lg shadow-md p-6" data-v-289074be${_scopeId}><div class="flex justify-between items-start" data-v-289074be${_scopeId}><div data-v-289074be${_scopeId}><h1 class="text-3xl font-bold text-gray-800 mb-2" data-v-289074be${_scopeId}>${ssrInterpolate(__props.evento.nome)}</h1><p class="text-gray-600 text-lg" data-v-289074be${_scopeId}><i class="fa fa-calendar mr-2" data-v-289074be${_scopeId}></i> ${ssrInterpolate(formatarData(__props.evento.data))} às ${ssrInterpolate(__props.evento.hora)}</p></div><div class="text-right" data-v-289074be${_scopeId}><span class="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-lg" data-v-289074be${_scopeId}><i class="fa fa-users mr-2" data-v-289074be${_scopeId}></i> ${ssrInterpolate(gruposEvento.value.length)} grupo(s) </span></div></div></div></div><div class="grid grid-cols-1 gap-8" data-v-289074be${_scopeId}><div class="card" data-v-289074be${_scopeId}><div class="card-header" data-v-289074be${_scopeId}><h3 class="text-xl font-semibold" data-v-289074be${_scopeId}>Grupos do Evento</h3></div><div class="card-body" data-v-289074be${_scopeId}><div class="mb-4 p-4 bg-gray-50 rounded-lg" data-v-289074be${_scopeId}><h4 class="font-semibold mb-3" data-v-289074be${_scopeId}>Importar Grupo</h4><div class="space-y-3" data-v-289074be${_scopeId}><div data-v-289074be${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "grupo_modelo",
              value: "Grupo Modelo",
              class: "required"
            }, null, _parent2, _scopeId));
            _push2(`<select id="grupo_modelo" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" data-v-289074be${_scopeId}><option value="" data-v-289074be${ssrIncludeBooleanAttr(Array.isArray(grupoSelecionado.value) ? ssrLooseContain(grupoSelecionado.value, "") : ssrLooseEqual(grupoSelecionado.value, "")) ? " selected" : ""}${_scopeId}>Selecione um grupo</option><!--[-->`);
            ssrRenderList(gruposModelo.value, (grupo) => {
              _push2(`<option${ssrRenderAttr("value", grupo.id)} data-v-289074be${ssrIncludeBooleanAttr(Array.isArray(grupoSelecionado.value) ? ssrLooseContain(grupoSelecionado.value, grupo.id) : ssrLooseEqual(grupoSelecionado.value, grupo.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(grupo.nome)}</option>`);
            });
            _push2(`<!--]--></select>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              message: errors.value.grupo_modelo
            }, null, _parent2, _scopeId));
            _push2(`</div><button${ssrIncludeBooleanAttr(processing.value || !grupoSelecionado.value) ? " disabled" : ""} class="btn btn-primary w-full" data-v-289074be${_scopeId}><i class="fa fa-download mr-2" data-v-289074be${_scopeId}></i> Importar Grupo </button></div></div><div class="space-y-4" data-v-289074be${_scopeId}><h4 class="font-semibold mb-3" data-v-289074be${_scopeId}>Grupos Importados</h4><!--[-->`);
            ssrRenderList(gruposEvento.value, (grupo) => {
              var _a;
              _push2(`<div class="p-4 bg-white border rounded-lg" data-v-289074be${_scopeId}><div class="flex items-start justify-between mb-3" data-v-289074be${_scopeId}><div class="flex-1" data-v-289074be${_scopeId}><p class="font-medium text-lg" data-v-289074be${_scopeId}>${ssrInterpolate(grupo.nome)}</p><p class="text-sm text-gray-600 mt-1" data-v-289074be${_scopeId}>${ssrInterpolate(((_a = grupo.pessoas) == null ? void 0 : _a.length) || 0)} pessoa(s) </p></div><div class="flex gap-2" data-v-289074be${_scopeId}><button class="text-blue-600 hover:text-blue-800" title="Editar" data-v-289074be${_scopeId}><i class="fa fa-edit" data-v-289074be${_scopeId}></i></button><button class="text-red-600 hover:text-red-800" title="Remover" data-v-289074be${_scopeId}><i class="fa fa-trash" data-v-289074be${_scopeId}></i></button></div></div>`);
              if (grupo.pessoas && grupo.pessoas.length > 0) {
                _push2(`<div class="mt-3 space-y-2" data-v-289074be${_scopeId}><!--[-->`);
                ssrRenderList(grupo.pessoas, (pessoa) => {
                  var _a2, _b, _c;
                  _push2(`<div class="flex items-center gap-2 p-2 bg-gray-50 rounded text-sm" data-v-289074be${_scopeId}><i class="fa fa-user text-gray-400" data-v-289074be${_scopeId}></i><span data-v-289074be${_scopeId}>${ssrInterpolate((_a2 = pessoa.pessoa) == null ? void 0 : _a2.nome)}</span>`);
                  if ((_b = pessoa.pessoa) == null ? void 0 : _b.cpf) {
                    _push2(`<span class="text-gray-500" data-v-289074be${_scopeId}>- CPF: ${ssrInterpolate(formatarCPF((_c = pessoa.pessoa) == null ? void 0 : _c.cpf))}</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<div class="mt-3 text-sm text-gray-500 text-center py-2" data-v-289074be${_scopeId}> Nenhuma pessoa neste grupo </div>`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]-->`);
            if (!gruposEvento.value || gruposEvento.value.length === 0) {
              _push2(`<div class="text-center text-gray-500 py-8" data-v-289074be${_scopeId}><i class="fa fa-users text-4xl mb-3" data-v-289074be${_scopeId}></i><p data-v-289074be${_scopeId}>Nenhum grupo importado ainda</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "page-content" }, [
                createVNode("div", { class: "mb-6" }, [
                  createVNode("button", {
                    onClick: voltar,
                    class: "btn btn-secondary mb-4"
                  }, [
                    createVNode("i", { class: "fa fa-arrow-left mr-2" }),
                    createTextVNode(" Voltar ")
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-md p-6" }, [
                    createVNode("div", { class: "flex justify-between items-start" }, [
                      createVNode("div", null, [
                        createVNode("h1", { class: "text-3xl font-bold text-gray-800 mb-2" }, toDisplayString(__props.evento.nome), 1),
                        createVNode("p", { class: "text-gray-600 text-lg" }, [
                          createVNode("i", { class: "fa fa-calendar mr-2" }),
                          createTextVNode(" " + toDisplayString(formatarData(__props.evento.data)) + " às " + toDisplayString(__props.evento.hora), 1)
                        ])
                      ]),
                      createVNode("div", { class: "text-right" }, [
                        createVNode("span", { class: "inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-lg" }, [
                          createVNode("i", { class: "fa fa-users mr-2" }),
                          createTextVNode(" " + toDisplayString(gruposEvento.value.length) + " grupo(s) ", 1)
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 gap-8" }, [
                  createVNode("div", { class: "card" }, [
                    createVNode("div", { class: "card-header" }, [
                      createVNode("h3", { class: "text-xl font-semibold" }, "Grupos do Evento")
                    ]),
                    createVNode("div", { class: "card-body" }, [
                      createVNode("div", { class: "mb-4 p-4 bg-gray-50 rounded-lg" }, [
                        createVNode("h4", { class: "font-semibold mb-3" }, "Importar Grupo"),
                        createVNode("div", { class: "space-y-3" }, [
                          createVNode("div", null, [
                            createVNode(_sfc_main$1, {
                              for: "grupo_modelo",
                              value: "Grupo Modelo",
                              class: "required"
                            }),
                            withDirectives(createVNode("select", {
                              id: "grupo_modelo",
                              "onUpdate:modelValue": ($event) => grupoSelecionado.value = $event,
                              class: "mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            }, [
                              createVNode("option", { value: "" }, "Selecione um grupo"),
                              (openBlock(true), createBlock(Fragment, null, renderList(gruposModelo.value, (grupo) => {
                                return openBlock(), createBlock("option", {
                                  key: grupo.id,
                                  value: grupo.id
                                }, toDisplayString(grupo.nome), 9, ["value"]);
                              }), 128))
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, grupoSelecionado.value]
                            ]),
                            createVNode(_sfc_main$2, {
                              message: errors.value.grupo_modelo
                            }, null, 8, ["message"])
                          ]),
                          createVNode("button", {
                            onClick: importarGrupo,
                            disabled: processing.value || !grupoSelecionado.value,
                            class: "btn btn-primary w-full"
                          }, [
                            createVNode("i", { class: "fa fa-download mr-2" }),
                            createTextVNode(" Importar Grupo ")
                          ], 8, ["disabled"])
                        ])
                      ]),
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("h4", { class: "font-semibold mb-3" }, "Grupos Importados"),
                        (openBlock(true), createBlock(Fragment, null, renderList(gruposEvento.value, (grupo) => {
                          var _a;
                          return openBlock(), createBlock("div", {
                            key: grupo.id,
                            class: "p-4 bg-white border rounded-lg"
                          }, [
                            createVNode("div", { class: "flex items-start justify-between mb-3" }, [
                              createVNode("div", { class: "flex-1" }, [
                                createVNode("p", { class: "font-medium text-lg" }, toDisplayString(grupo.nome), 1),
                                createVNode("p", { class: "text-sm text-gray-600 mt-1" }, toDisplayString(((_a = grupo.pessoas) == null ? void 0 : _a.length) || 0) + " pessoa(s) ", 1)
                              ]),
                              createVNode("div", { class: "flex gap-2" }, [
                                createVNode("button", {
                                  onClick: ($event) => editarGrupo(grupo),
                                  class: "text-blue-600 hover:text-blue-800",
                                  title: "Editar"
                                }, [
                                  createVNode("i", { class: "fa fa-edit" })
                                ], 8, ["onClick"]),
                                createVNode("button", {
                                  onClick: ($event) => removerGrupo(grupo.id),
                                  class: "text-red-600 hover:text-red-800",
                                  title: "Remover"
                                }, [
                                  createVNode("i", { class: "fa fa-trash" })
                                ], 8, ["onClick"])
                              ])
                            ]),
                            grupo.pessoas && grupo.pessoas.length > 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-3 space-y-2"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(grupo.pessoas, (pessoa) => {
                                var _a2, _b, _c;
                                return openBlock(), createBlock("div", {
                                  key: pessoa.id,
                                  class: "flex items-center gap-2 p-2 bg-gray-50 rounded text-sm"
                                }, [
                                  createVNode("i", { class: "fa fa-user text-gray-400" }),
                                  createVNode("span", null, toDisplayString((_a2 = pessoa.pessoa) == null ? void 0 : _a2.nome), 1),
                                  ((_b = pessoa.pessoa) == null ? void 0 : _b.cpf) ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "text-gray-500"
                                  }, "- CPF: " + toDisplayString(formatarCPF((_c = pessoa.pessoa) == null ? void 0 : _c.cpf)), 1)) : createCommentVNode("", true)
                                ]);
                              }), 128))
                            ])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "mt-3 text-sm text-gray-500 text-center py-2"
                            }, " Nenhuma pessoa neste grupo "))
                          ]);
                        }), 128)),
                        !gruposEvento.value || gruposEvento.value.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-center text-gray-500 py-8"
                        }, [
                          createVNode("i", { class: "fa fa-users text-4xl mb-3" }),
                          createVNode("p", null, "Nenhum grupo importado ainda")
                        ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Eventos/EventoGrupos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const EventoGrupos = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-289074be"]]);
export {
  EventoGrupos as default
};

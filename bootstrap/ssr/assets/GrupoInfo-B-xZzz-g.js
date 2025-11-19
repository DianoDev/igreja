import { ref, onMounted, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrIncludeBooleanAttr, ssrRenderList } from "vue/server-renderer";
import { router } from "@inertiajs/vue3";
import { L as LayoutPrincipal } from "./LayoutPrincipal-CkoRPw-8.js";
import Autocomplete from "./AutoCompletePessoa-DFTP1mc1.js";
import { useToast } from "vue-toastification";
import axios from "axios";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./Modal-D4SsQX3D.js";
const _sfc_main = {
  __name: "GrupoInfo",
  __ssrInlineRender: true,
  props: {
    grupo: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const toast = useToast();
    const processing = ref(false);
    const errors = ref({});
    const integrantesGrupo = ref([]);
    const novoIntegrante = ref({
      id_pessoa: null,
      id_grupo: props.grupo.id
    });
    onMounted(() => {
      recarregarIntegrantes();
    });
    async function buscarPessoas(query) {
      try {
        const response = await axios.get("/admin/pessoa-grupo/buscar-pessoa", {
          params: { query }
        });
        return response.data;
      } catch (error) {
        console.error("Erro ao buscar pessoas:", error);
        return [];
      }
    }
    function onPessoaSelecionada(pessoa) {
      novoIntegrante.value.id_pessoa = pessoa ? pessoa.id : null;
    }
    async function adicionarIntegrante() {
      errors.value = {};
      if (!novoIntegrante.value.id_pessoa) {
        errors.value.id_pessoa = "Selecione uma pessoa";
        return;
      }
      processing.value = true;
      try {
        const response = await axios.post("/admin/pessoa-grupo/adicionar", novoIntegrante.value);
        if (response.data.success) {
          toast.success(response.data.message);
          await recarregarIntegrantes();
          novoIntegrante.value = {
            id_pessoa: null,
            id_grupo: props.grupo.id
          };
        }
      } catch (error) {
        toast.error("Erro ao adicionar integrante");
        console.error(error);
      } finally {
        processing.value = false;
      }
    }
    async function removerIntegrante(id) {
      processing.value = true;
      try {
        const response = await axios.delete(`/admin/pessoa-grupo/${id}`);
        if (response.data.success) {
          toast.success(response.data.message);
          await recarregarIntegrantes();
        }
      } catch (error) {
        toast.error("Erro ao remover integrante");
        console.error(error);
      } finally {
        processing.value = false;
      }
    }
    async function recarregarIntegrantes() {
      try {
        const response = await axios.get(`/admin/pessoa-grupo/grupo/${props.grupo.id}`);
        integrantesGrupo.value = response.data;
      } catch (error) {
        console.error("Erro ao recarregar integrantes:", error);
      }
    }
    function voltar() {
      router.visit("/admin/grupos");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(LayoutPrincipal, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container mx-auto p-6" data-v-fc1225bb${_scopeId}><div class="mb-6" data-v-fc1225bb${_scopeId}><button class="btn btn-secondary mb-4" data-v-fc1225bb${_scopeId}><i class="fa fa-arrow-left mr-2" data-v-fc1225bb${_scopeId}></i> Voltar </button><div class="bg-white rounded-lg shadow-md p-6" data-v-fc1225bb${_scopeId}><div class="flex justify-between items-start" data-v-fc1225bb${_scopeId}><div data-v-fc1225bb${_scopeId}><h1 class="text-3xl font-bold text-gray-800 mb-2" data-v-fc1225bb${_scopeId}>${ssrInterpolate(__props.grupo.nome)}</h1></div><div class="text-right" data-v-fc1225bb${_scopeId}><span class="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-lg" data-v-fc1225bb${_scopeId}><i class="fa fa-users mr-2" data-v-fc1225bb${_scopeId}></i> ${ssrInterpolate(integrantesGrupo.value.length)} integrantes </span></div></div></div></div><div style="${ssrRenderStyle({ "min-height": "500px" })}" class="grid grid-cols-1 gap-8" data-v-fc1225bb${_scopeId}><div class="card" data-v-fc1225bb${_scopeId}><div class="card-header" data-v-fc1225bb${_scopeId}><h3 class="text-xl font-semibold" data-v-fc1225bb${_scopeId}>Integrantes do Grupo</h3></div><div class="card-body" data-v-fc1225bb${_scopeId}><div class="mb-4 p-4 bg-gray-50 rounded-lg" data-v-fc1225bb${_scopeId}><h4 class="font-semibold mb-3" data-v-fc1225bb${_scopeId}>Adicionar Integrante</h4><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-fc1225bb${_scopeId}><div data-v-fc1225bb${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1 required" data-v-fc1225bb${_scopeId}> Pessoa </label>`);
            _push2(ssrRenderComponent(Autocomplete, {
              modelValue: novoIntegrante.value.id_pessoa,
              "onUpdate:modelValue": [($event) => novoIntegrante.value.id_pessoa = $event, onPessoaSelecionada],
              "fetch-suggestions": buscarPessoas,
              "display-key": "nome",
              "value-key": "id",
              placeholder: "Digite o nome..."
            }, null, _parent2, _scopeId));
            if (errors.value.id_pessoa) {
              _push2(`<p class="mt-1 text-sm text-red-600" data-v-fc1225bb${_scopeId}>${ssrInterpolate(errors.value.id_pessoa)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex items-end" data-v-fc1225bb${_scopeId}><button${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} class="btn btn-primary w-full" data-v-fc1225bb${_scopeId}><i class="fa fa-plus mr-2" data-v-fc1225bb${_scopeId}></i> Adicionar Integrante </button></div></div></div><div class="space-y-2" data-v-fc1225bb${_scopeId}><h4 class="font-semibold mb-3" data-v-fc1225bb${_scopeId}>Integrantes Cadastrados</h4><!--[-->`);
            ssrRenderList(integrantesGrupo.value, (integrante) => {
              _push2(`<div class="flex items-center justify-between p-3 bg-white border rounded-lg hover:bg-gray-50" data-v-fc1225bb${_scopeId}><div data-v-fc1225bb${_scopeId}><p class="font-medium" data-v-fc1225bb${_scopeId}>${ssrInterpolate(integrante.pessoa.nome)}</p></div><button class="text-red-600 hover:text-red-800" title="Remover" data-v-fc1225bb${_scopeId}><i class="fa fa-trash" data-v-fc1225bb${_scopeId}></i></button></div>`);
            });
            _push2(`<!--]-->`);
            if (integrantesGrupo.value.length === 0) {
              _push2(`<div class="text-center text-gray-500 py-4" data-v-fc1225bb${_scopeId}> Nenhum integrante cadastrado ainda </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "container mx-auto p-6" }, [
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
                        createVNode("h1", { class: "text-3xl font-bold text-gray-800 mb-2" }, toDisplayString(__props.grupo.nome), 1)
                      ]),
                      createVNode("div", { class: "text-right" }, [
                        createVNode("span", { class: "inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-lg" }, [
                          createVNode("i", { class: "fa fa-users mr-2" }),
                          createTextVNode(" " + toDisplayString(integrantesGrupo.value.length) + " integrantes ", 1)
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", {
                  style: { "min-height": "500px" },
                  class: "grid grid-cols-1 gap-8"
                }, [
                  createVNode("div", { class: "card" }, [
                    createVNode("div", { class: "card-header" }, [
                      createVNode("h3", { class: "text-xl font-semibold" }, "Integrantes do Grupo")
                    ]),
                    createVNode("div", { class: "card-body" }, [
                      createVNode("div", { class: "mb-4 p-4 bg-gray-50 rounded-lg" }, [
                        createVNode("h4", { class: "font-semibold mb-3" }, "Adicionar Integrante"),
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1 required" }, " Pessoa "),
                            createVNode(Autocomplete, {
                              modelValue: novoIntegrante.value.id_pessoa,
                              "onUpdate:modelValue": [($event) => novoIntegrante.value.id_pessoa = $event, onPessoaSelecionada],
                              "fetch-suggestions": buscarPessoas,
                              "display-key": "nome",
                              "value-key": "id",
                              placeholder: "Digite o nome..."
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            errors.value.id_pessoa ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "mt-1 text-sm text-red-600"
                            }, toDisplayString(errors.value.id_pessoa), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "flex items-end" }, [
                            createVNode("button", {
                              onClick: adicionarIntegrante,
                              disabled: processing.value,
                              class: "btn btn-primary w-full"
                            }, [
                              createVNode("i", { class: "fa fa-plus mr-2" }),
                              createTextVNode(" Adicionar Integrante ")
                            ], 8, ["disabled"])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("h4", { class: "font-semibold mb-3" }, "Integrantes Cadastrados"),
                        (openBlock(true), createBlock(Fragment, null, renderList(integrantesGrupo.value, (integrante) => {
                          return openBlock(), createBlock("div", {
                            key: integrante.id,
                            class: "flex items-center justify-between p-3 bg-white border rounded-lg hover:bg-gray-50"
                          }, [
                            createVNode("div", null, [
                              createVNode("p", { class: "font-medium" }, toDisplayString(integrante.pessoa.nome), 1)
                            ]),
                            createVNode("button", {
                              onClick: ($event) => removerIntegrante(integrante.id),
                              class: "text-red-600 hover:text-red-800",
                              title: "Remover"
                            }, [
                              createVNode("i", { class: "fa fa-trash" })
                            ], 8, ["onClick"])
                          ]);
                        }), 128)),
                        integrantesGrupo.value.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-center text-gray-500 py-4"
                        }, " Nenhum integrante cadastrado ainda ")) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Grupo/GrupoInfo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const GrupoInfo = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fc1225bb"]]);
export {
  GrupoInfo as default
};

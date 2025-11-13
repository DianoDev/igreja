import { inject, ref, computed, onMounted, withCtx, createVNode, createBlock, createCommentVNode, toDisplayString, createTextVNode, openBlock, Fragment, renderList, withDirectives, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { L as LayoutPrincipal } from "./LayoutPrincipal-DB64YUKv.js";
import _sfc_main$1 from "./InputLabel-CDsQQ3SF.js";
import _sfc_main$3 from "./InputError-DKvItylr.js";
import _sfc_main$2 from "./TextInput-BEEeI7hx.js";
import { useToast } from "vue-toastification";
import { router } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./Modal-D4SsQX3D.js";
import "axios";
const _sfc_main = {
  __name: "Ingredientes",
  __ssrInlineRender: true,
  props: {
    cardapio: {
      type: Object,
      default: null,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    const toast = useToast();
    inject("events");
    const processing = ref(false);
    const errors = ref({});
    const ingredientes = ref([]);
    const valorTotalCardapio = computed(() => {
      return ingredientes.value.reduce((total, ing) => {
        return total + (parseFloat(ing.valor_total) || 0);
      }, 0);
    });
    function adicionarIngrediente() {
      ingredientes.value.push({
        nome: "",
        quantidade: "",
        unidade_medida: "",
        valor_unitario: "",
        valor_total: "0.00"
      });
    }
    function removerIngrediente(index) {
      if (confirm("Deseja realmente remover este ingrediente?")) {
        ingredientes.value.splice(index, 1);
      }
    }
    function calcularValorTotal(index) {
      const ingrediente = ingredientes.value[index];
      const quantidade = parseFloat(ingrediente.quantidade) || 0;
      const valorUnitario = parseFloat(ingrediente.valor_unitario) || 0;
      ingrediente.valor_total = (quantidade * valorUnitario).toFixed(2);
    }
    async function salvar() {
      if (ingredientes.value.length === 0) {
        toast.warning("Adicione pelo menos um ingrediente antes de salvar.");
        return;
      }
      processing.value = true;
      errors.value = {};
      try {
        const response = await axios.post(
          `/admin/cardapio/${props.cardapio.id}/ingredientes`,
          {
            ingredientes: ingredientes.value,
            valor_total_cardapio: valorTotalCardapio.value
          }
        );
        toast.success("Ingredientes salvos com sucesso!");
        router.visit("/admin/cardapio");
      } catch (error) {
        processing.value = false;
        if (error.response) {
          const data = error.response.data;
          if (data.errors) {
            errors.value = data.errors;
          }
          const message = data.message || "Ocorreu um erro ao salvar os ingredientes.";
          toast.error(message);
        } else {
          toast.error("Erro de conexão com o servidor.");
        }
      } finally {
        processing.value = false;
      }
    }
    async function carregarIngredientes() {
      try {
        const response = await axios.get(`/admin/cardapio/${props.cardapio.id}/ingredientes/edit`);
        if (response.data && response.data.length > 0) {
          ingredientes.value = response.data.map((ing) => ({
            id: ing.id,
            nome: ing.nome,
            quantidade: ing.quantidade,
            unidade_medida: ing.unidade_medida,
            valor_unitario: ing.valor_unitario,
            valor_total: ing.valor_total
          }));
        }
      } catch (error) {
        console.error("Erro ao carregar ingredientes:", error);
        if (error.response && error.response.status !== 404) {
          toast.error("Erro ao carregar ingredientes existentes.");
        }
      }
    }
    function voltar() {
      router.visit("/admin/cardapio");
    }
    onMounted(async () => {
      var _a;
      if ((_a = props.cardapio) == null ? void 0 : _a.id) {
        await carregarIngredientes();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(LayoutPrincipal, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<div class="max-w-6xl mx-auto p-6" data-v-da71b23a${_scopeId}><div class="bg-white rounded-lg shadow-md p-6" data-v-da71b23a${_scopeId}><div class="mb-6 pb-4 border-b border-gray-200" data-v-da71b23a${_scopeId}><h2 class="text-2xl font-bold text-gray-800" data-v-da71b23a${_scopeId}> Ingredientes - ${ssrInterpolate((_a = props.cardapio) == null ? void 0 : _a.nome)}</h2><p class="text-sm text-gray-600 mt-1" data-v-da71b23a${_scopeId}>${ssrInterpolate((_b = props.cardapio) == null ? void 0 : _b.descricao)}</p></div><div class="mb-6" data-v-da71b23a${_scopeId}><div class="flex justify-between items-center mb-4" data-v-da71b23a${_scopeId}><h3 class="text-lg font-semibold text-gray-700 me-5" data-v-da71b23a${_scopeId}>Lista de Ingredientes</h3><button type="button" class="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition" data-v-da71b23a${_scopeId}><i class="ms-1 fa fa-plus" data-v-da71b23a${_scopeId}></i> Adicionar Ingrediente </button></div>`);
            if (ingredientes.value.length === 0) {
              _push2(`<div class="text-center py-8 text-gray-500" data-v-da71b23a${_scopeId}><i class="fa fa-inbox text-4xl mb-2" data-v-da71b23a${_scopeId}></i><p data-v-da71b23a${_scopeId}>Nenhum ingrediente adicionado ainda.</p></div>`);
            } else {
              _push2(`<div class="space-y-4" data-v-da71b23a${_scopeId}><!--[-->`);
              ssrRenderList(ingredientes.value, (ingrediente, index) => {
                _push2(`<div class="border border-gray-200 rounded-lg p-4 bg-gray-50" data-v-da71b23a${_scopeId}><div class="flex justify-between items-start mb-3" data-v-da71b23a${_scopeId}><h4 class="text-md font-semibold text-gray-700" data-v-da71b23a${_scopeId}> Ingrediente ${ssrInterpolate(index + 1)}</h4><button type="button" class="text-red-600 hover:text-red-800" title="Remover ingrediente" data-v-da71b23a${_scopeId}><i class="fa fa-trash" data-v-da71b23a${_scopeId}></i></button></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4" data-v-da71b23a${_scopeId}><div class="lg:col-span-2" data-v-da71b23a${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$1, {
                  for: "nome_" + index,
                  value: "Nome",
                  class: "required"
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_sfc_main$2, {
                  id: "nome_" + index,
                  class: "w-full",
                  modelValue: ingrediente.nome,
                  "onUpdate:modelValue": ($event) => ingrediente.nome = $event,
                  placeholder: "Ex: Farinha de trigo"
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_sfc_main$3, {
                  message: errors.value[`ingredientes.${index}.nome`]
                }, null, _parent2, _scopeId));
                _push2(`</div><div data-v-da71b23a${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$1, {
                  for: "quantidade_" + index,
                  value: "Quantidade"
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_sfc_main$2, {
                  id: "quantidade_" + index,
                  class: "w-full",
                  type: "number",
                  step: "0.01",
                  modelValue: ingrediente.quantidade,
                  "onUpdate:modelValue": ($event) => ingrediente.quantidade = $event,
                  onInput: ($event) => calcularValorTotal(index),
                  placeholder: "0.00"
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_sfc_main$3, {
                  message: errors.value[`ingredientes.${index}.quantidade`]
                }, null, _parent2, _scopeId));
                _push2(`</div><div data-v-da71b23a${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$1, {
                  for: "unidade_" + index,
                  value: "Unidade",
                  class: "required"
                }, null, _parent2, _scopeId));
                _push2(`<select${ssrRenderAttr("id", "unidade_" + index)} class="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" data-v-da71b23a${_scopeId}><option value="" data-v-da71b23a${ssrIncludeBooleanAttr(Array.isArray(ingrediente.unidade_medida) ? ssrLooseContain(ingrediente.unidade_medida, "") : ssrLooseEqual(ingrediente.unidade_medida, "")) ? " selected" : ""}${_scopeId}>Selecione</option><option value="kg" data-v-da71b23a${ssrIncludeBooleanAttr(Array.isArray(ingrediente.unidade_medida) ? ssrLooseContain(ingrediente.unidade_medida, "kg") : ssrLooseEqual(ingrediente.unidade_medida, "kg")) ? " selected" : ""}${_scopeId}>Quilograma (kg)</option><option value="g" data-v-da71b23a${ssrIncludeBooleanAttr(Array.isArray(ingrediente.unidade_medida) ? ssrLooseContain(ingrediente.unidade_medida, "g") : ssrLooseEqual(ingrediente.unidade_medida, "g")) ? " selected" : ""}${_scopeId}>Grama (g)</option><option value="l" data-v-da71b23a${ssrIncludeBooleanAttr(Array.isArray(ingrediente.unidade_medida) ? ssrLooseContain(ingrediente.unidade_medida, "l") : ssrLooseEqual(ingrediente.unidade_medida, "l")) ? " selected" : ""}${_scopeId}>Litro (l)</option><option value="ml" data-v-da71b23a${ssrIncludeBooleanAttr(Array.isArray(ingrediente.unidade_medida) ? ssrLooseContain(ingrediente.unidade_medida, "ml") : ssrLooseEqual(ingrediente.unidade_medida, "ml")) ? " selected" : ""}${_scopeId}>Mililitro (ml)</option><option value="un" data-v-da71b23a${ssrIncludeBooleanAttr(Array.isArray(ingrediente.unidade_medida) ? ssrLooseContain(ingrediente.unidade_medida, "un") : ssrLooseEqual(ingrediente.unidade_medida, "un")) ? " selected" : ""}${_scopeId}>Unidade (un)</option><option value="cx" data-v-da71b23a${ssrIncludeBooleanAttr(Array.isArray(ingrediente.unidade_medida) ? ssrLooseContain(ingrediente.unidade_medida, "cx") : ssrLooseEqual(ingrediente.unidade_medida, "cx")) ? " selected" : ""}${_scopeId}>Caixa (cx)</option><option value="pct" data-v-da71b23a${ssrIncludeBooleanAttr(Array.isArray(ingrediente.unidade_medida) ? ssrLooseContain(ingrediente.unidade_medida, "pct") : ssrLooseEqual(ingrediente.unidade_medida, "pct")) ? " selected" : ""}${_scopeId}>Pacote (pct)</option></select>`);
                _push2(ssrRenderComponent(_sfc_main$3, {
                  message: errors.value[`ingredientes.${index}.unidade_medida`]
                }, null, _parent2, _scopeId));
                _push2(`</div><div data-v-da71b23a${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$1, {
                  for: "valor_unitario_" + index,
                  value: "Valor Unit. (R$)",
                  class: "required"
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_sfc_main$2, {
                  id: "valor_unitario_" + index,
                  class: "w-full",
                  type: "number",
                  step: "0.01",
                  modelValue: ingrediente.valor_unitario,
                  "onUpdate:modelValue": ($event) => ingrediente.valor_unitario = $event,
                  onInput: ($event) => calcularValorTotal(index),
                  placeholder: "0.00"
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_sfc_main$3, {
                  message: errors.value[`ingredientes.${index}.valor_unitario`]
                }, null, _parent2, _scopeId));
                _push2(`</div><div data-v-da71b23a${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$1, {
                  for: "valor_total_" + index,
                  value: "Valor Total (R$)"
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_sfc_main$2, {
                  id: "valor_total_" + index,
                  class: "w-full bg-gray-100",
                  type: "number",
                  step: "0.01",
                  modelValue: ingrediente.valor_total,
                  "onUpdate:modelValue": ($event) => ingrediente.valor_total = $event,
                  readonly: ""
                }, null, _parent2, _scopeId));
                _push2(`</div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div>`);
            if (ingredientes.value.length > 0) {
              _push2(`<div class="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200" data-v-da71b23a${_scopeId}><div class="flex justify-between items-center" data-v-da71b23a${_scopeId}><span class="text-lg font-semibold text-gray-700" data-v-da71b23a${_scopeId}>Valor Total do Cardápio:</span><span class="text-2xl font-bold text-blue-600" data-v-da71b23a${_scopeId}> R$ ${ssrInterpolate(valorTotalCardapio.value.toFixed(2).replace(".", ","))}</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex justify-center space-x-2 pt-4 border-t border-gray-200" data-v-da71b23a${_scopeId}><button type="button" class="px-6 py-2 text-white rounded-md bg-blue-600 hover:bg-blue-700 transition"${ssrIncludeBooleanAttr(processing.value || ingredientes.value.length === 0) ? " disabled" : ""} data-v-da71b23a${_scopeId}>`);
            if (!processing.value) {
              _push2(`<i class="mr-1 fa fa-check" data-v-da71b23a${_scopeId}></i>`);
            } else {
              _push2(`<i class="mr-1 fa fa-spinner fa-spin" data-v-da71b23a${_scopeId}></i>`);
            }
            _push2(` ${ssrInterpolate(processing.value ? "Salvando..." : "Salvar Ingredientes")}</button><button type="button" class="px-6 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 transition" data-v-da71b23a${_scopeId}><i class="mr-1 fa fa-arrow-left" data-v-da71b23a${_scopeId}></i> Voltar </button></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-6xl mx-auto p-6" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-md p-6" }, [
                  createVNode("div", { class: "mb-6 pb-4 border-b border-gray-200" }, [
                    createVNode("h2", { class: "text-2xl font-bold text-gray-800" }, " Ingredientes - " + toDisplayString((_c = props.cardapio) == null ? void 0 : _c.nome), 1),
                    createVNode("p", { class: "text-sm text-gray-600 mt-1" }, toDisplayString((_d = props.cardapio) == null ? void 0 : _d.descricao), 1)
                  ]),
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("div", { class: "flex justify-between items-center mb-4" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-gray-700 me-5" }, "Lista de Ingredientes"),
                      createVNode("button", {
                        type: "button",
                        class: "px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition",
                        onClick: adicionarIngrediente
                      }, [
                        createVNode("i", { class: "ms-1 fa fa-plus" }),
                        createTextVNode(" Adicionar Ingrediente ")
                      ])
                    ]),
                    ingredientes.value.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-center py-8 text-gray-500"
                    }, [
                      createVNode("i", { class: "fa fa-inbox text-4xl mb-2" }),
                      createVNode("p", null, "Nenhum ingrediente adicionado ainda.")
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-4"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(ingredientes.value, (ingrediente, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: "border border-gray-200 rounded-lg p-4 bg-gray-50"
                        }, [
                          createVNode("div", { class: "flex justify-between items-start mb-3" }, [
                            createVNode("h4", { class: "text-md font-semibold text-gray-700" }, " Ingrediente " + toDisplayString(index + 1), 1),
                            createVNode("button", {
                              type: "button",
                              class: "text-red-600 hover:text-red-800",
                              onClick: ($event) => removerIngrediente(index),
                              title: "Remover ingrediente"
                            }, [
                              createVNode("i", { class: "fa fa-trash" })
                            ], 8, ["onClick"])
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4" }, [
                            createVNode("div", { class: "lg:col-span-2" }, [
                              createVNode(_sfc_main$1, {
                                for: "nome_" + index,
                                value: "Nome",
                                class: "required"
                              }, null, 8, ["for"]),
                              createVNode(_sfc_main$2, {
                                id: "nome_" + index,
                                class: "w-full",
                                modelValue: ingrediente.nome,
                                "onUpdate:modelValue": ($event) => ingrediente.nome = $event,
                                placeholder: "Ex: Farinha de trigo"
                              }, null, 8, ["id", "modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$3, {
                                message: errors.value[`ingredientes.${index}.nome`]
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", null, [
                              createVNode(_sfc_main$1, {
                                for: "quantidade_" + index,
                                value: "Quantidade"
                              }, null, 8, ["for"]),
                              createVNode(_sfc_main$2, {
                                id: "quantidade_" + index,
                                class: "w-full",
                                type: "number",
                                step: "0.01",
                                modelValue: ingrediente.quantidade,
                                "onUpdate:modelValue": ($event) => ingrediente.quantidade = $event,
                                onInput: ($event) => calcularValorTotal(index),
                                placeholder: "0.00"
                              }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "onInput"]),
                              createVNode(_sfc_main$3, {
                                message: errors.value[`ingredientes.${index}.quantidade`]
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", null, [
                              createVNode(_sfc_main$1, {
                                for: "unidade_" + index,
                                value: "Unidade",
                                class: "required"
                              }, null, 8, ["for"]),
                              withDirectives(createVNode("select", {
                                id: "unidade_" + index,
                                class: "w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
                                "onUpdate:modelValue": ($event) => ingrediente.unidade_medida = $event
                              }, [
                                createVNode("option", { value: "" }, "Selecione"),
                                createVNode("option", { value: "kg" }, "Quilograma (kg)"),
                                createVNode("option", { value: "g" }, "Grama (g)"),
                                createVNode("option", { value: "l" }, "Litro (l)"),
                                createVNode("option", { value: "ml" }, "Mililitro (ml)"),
                                createVNode("option", { value: "un" }, "Unidade (un)"),
                                createVNode("option", { value: "cx" }, "Caixa (cx)"),
                                createVNode("option", { value: "pct" }, "Pacote (pct)")
                              ], 8, ["id", "onUpdate:modelValue"]), [
                                [vModelSelect, ingrediente.unidade_medida]
                              ]),
                              createVNode(_sfc_main$3, {
                                message: errors.value[`ingredientes.${index}.unidade_medida`]
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", null, [
                              createVNode(_sfc_main$1, {
                                for: "valor_unitario_" + index,
                                value: "Valor Unit. (R$)",
                                class: "required"
                              }, null, 8, ["for"]),
                              createVNode(_sfc_main$2, {
                                id: "valor_unitario_" + index,
                                class: "w-full",
                                type: "number",
                                step: "0.01",
                                modelValue: ingrediente.valor_unitario,
                                "onUpdate:modelValue": ($event) => ingrediente.valor_unitario = $event,
                                onInput: ($event) => calcularValorTotal(index),
                                placeholder: "0.00"
                              }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "onInput"]),
                              createVNode(_sfc_main$3, {
                                message: errors.value[`ingredientes.${index}.valor_unitario`]
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", null, [
                              createVNode(_sfc_main$1, {
                                for: "valor_total_" + index,
                                value: "Valor Total (R$)"
                              }, null, 8, ["for"]),
                              createVNode(_sfc_main$2, {
                                id: "valor_total_" + index,
                                class: "w-full bg-gray-100",
                                type: "number",
                                step: "0.01",
                                modelValue: ingrediente.valor_total,
                                "onUpdate:modelValue": ($event) => ingrediente.valor_total = $event,
                                readonly: ""
                              }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                            ])
                          ])
                        ]);
                      }), 128))
                    ]))
                  ]),
                  ingredientes.value.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
                  }, [
                    createVNode("div", { class: "flex justify-between items-center" }, [
                      createVNode("span", { class: "text-lg font-semibold text-gray-700" }, "Valor Total do Cardápio:"),
                      createVNode("span", { class: "text-2xl font-bold text-blue-600" }, " R$ " + toDisplayString(valorTotalCardapio.value.toFixed(2).replace(".", ",")), 1)
                    ])
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "flex justify-center space-x-2 pt-4 border-t border-gray-200" }, [
                    createVNode("button", {
                      type: "button",
                      class: "px-6 py-2 text-white rounded-md bg-blue-600 hover:bg-blue-700 transition",
                      disabled: processing.value || ingredientes.value.length === 0,
                      onClick: salvar
                    }, [
                      !processing.value ? (openBlock(), createBlock("i", {
                        key: 0,
                        class: "mr-1 fa fa-check"
                      })) : (openBlock(), createBlock("i", {
                        key: 1,
                        class: "mr-1 fa fa-spinner fa-spin"
                      })),
                      createTextVNode(" " + toDisplayString(processing.value ? "Salvando..." : "Salvar Ingredientes"), 1)
                    ], 8, ["disabled"]),
                    createVNode("button", {
                      type: "button",
                      class: "px-6 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 transition",
                      onClick: voltar
                    }, [
                      createVNode("i", { class: "mr-1 fa fa-arrow-left" }),
                      createTextVNode(" Voltar ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Cardapio/Ingredientes.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Ingredientes = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-da71b23a"]]);
export {
  Ingredientes as default
};

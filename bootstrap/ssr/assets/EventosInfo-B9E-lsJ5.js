import { inject, ref, computed, withCtx, createVNode, toDisplayString, createTextVNode, withDirectives, createBlock, openBlock, Fragment, renderList, vModelSelect, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { L as LayoutPrincipal } from "./LayoutPrincipal-Bz1Wo-ND.js";
import _sfc_main$1 from "./InputLabel-CDsQQ3SF.js";
import _sfc_main$2 from "./InputError-DKvItylr.js";
import _sfc_main$3 from "./TextInput-BEEeI7hx.js";
import AutocompletePessoa from "./AutoCompletePessoa-DqqLLzOg.js";
import { useToast } from "vue-toastification";
import { router } from "@inertiajs/vue3";
import axios from "axios";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./Modal-D4SsQX3D.js";
const _sfc_main = {
  __name: "EventosInfo",
  __ssrInlineRender: true,
  props: {
    evento: {
      type: Object,
      required: true
    },
    cargos: {
      type: Array,
      default: () => []
    },
    cargosEvento: {
      type: Array,
      default: () => []
    },
    doacoesEvento: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const props = __props;
    const toast = useToast();
    inject("events");
    const processing = ref(false);
    const errors = ref({});
    const cargosEvento = ref([...props.cargosEvento]);
    const doacoesEvento = ref([...props.doacoesEvento]);
    const novoCargo = ref({
      id_pessoa: null,
      id_cargo: "",
      id_evento: props.evento.id
    });
    const novaDoacao = ref({
      id_pessoa: null,
      valor: "",
      id_evento: props.evento.id
    });
    const totalDoacoes = computed(() => {
      return doacoesEvento.value.reduce((total, doacao) => {
        return total + parseFloat(doacao.valor || 0);
      }, 0);
    });
    const saldo = computed(() => {
      const arrecadado = parseFloat(props.evento.valor_arrecadado || 0);
      const gasto = parseFloat(props.evento.valor_gasto || 0);
      return arrecadado - gasto;
    });
    const saldoClass = computed(() => {
      if (saldo.value > 0) return "bg-blue-50 border-blue-200";
      if (saldo.value < 0) return "bg-yellow-50 border-yellow-200";
      return "bg-gray-50 border-gray-200";
    });
    const saldoTextClass = computed(() => {
      if (saldo.value > 0) return "text-blue-900";
      if (saldo.value < 0) return "text-yellow-900";
      return "text-gray-900";
    });
    function onPessoaCargoSelecionada(pessoa) {
      novoCargo.value.id_pessoa = pessoa ? pessoa.id : null;
    }
    function onPessoaDoacaoSelecionada(pessoa) {
      novaDoacao.value.id_pessoa = pessoa ? pessoa.id : null;
    }
    async function adicionarCargo() {
      errors.value = {};
      if (!novoCargo.value.id_pessoa) {
        errors.value.id_pessoa_cargo = "Selecione uma pessoa";
        return;
      }
      if (!novoCargo.value.id_cargo) {
        errors.value.id_cargo = "Selecione um cargo";
        return;
      }
      processing.value = true;
      try {
        const response = await axios.post("/admin/cargo-evento/adicionar", novoCargo.value);
        if (response.data.success) {
          toast.success(response.data.message);
          await recarregarCargos();
          novoCargo.value = {
            id_pessoa: null,
            id_cargo: "",
            id_evento: props.evento.id
          };
        }
      } catch (error) {
        toast.error("Erro ao adicionar cargo");
        console.error(error);
      } finally {
        processing.value = false;
      }
    }
    async function removerCargo(id) {
      processing.value = true;
      try {
        const response = await axios.delete(`/admin/cargo-evento/${id}`);
        if (response.data.success) {
          toast.success(response.data.message);
          await recarregarCargos();
        }
      } catch (error) {
        toast.error("Erro ao remover cargo");
        console.error(error);
      } finally {
        processing.value = false;
      }
    }
    async function adicionarDoacao() {
      errors.value = {};
      if (!novaDoacao.value.id_pessoa) {
        errors.value.id_pessoa_doacao = "Selecione uma pessoa";
        return;
      }
      if (!novaDoacao.value.valor || parseFloat(novaDoacao.value.valor) <= 0) {
        errors.value.valor = "Informe um valor válido";
        return;
      }
      processing.value = true;
      try {
        const response = await axios.post("/admin/doacao-evento/adicionar", novaDoacao.value);
        if (response.data.success) {
          toast.success(response.data.message);
          await recarregarDoacoes();
          router.reload({ only: ["evento"] });
          novaDoacao.value = {
            id_pessoa: null,
            valor: "",
            id_evento: props.evento.id
          };
        }
      } catch (error) {
        toast.error("Erro ao registrar doação");
        console.error(error);
      } finally {
        processing.value = false;
      }
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
      } catch (error) {
        console.error("Erro ao formatar data:", error);
        return data;
      }
    };
    async function removerDoacao(id) {
      processing.value = true;
      try {
        const response = await axios.delete(`/admin/doacao-evento/${id}`);
        if (response.data.success) {
          toast.success(response.data.message);
          await recarregarDoacoes();
          router.reload({ only: ["evento"] });
        }
      } catch (error) {
        toast.error("Erro ao remover doação");
        console.error(error);
      } finally {
        processing.value = false;
      }
    }
    async function recarregarCargos() {
      try {
        const response = await axios.get(`/admin/cargo-evento/evento/${props.evento.id}`);
        cargosEvento.value = response.data;
      } catch (error) {
        console.error("Erro ao recarregar cargos:", error);
      }
    }
    async function recarregarDoacoes() {
      try {
        const response = await axios.get(`/admin/doacao-evento/evento/${props.evento.id}`);
        doacoesEvento.value = response.data;
      } catch (error) {
        console.error("Erro ao recarregar doações:", error);
      }
    }
    function formatarValor(valor) {
      return parseFloat(valor || 0).toFixed(2).replace(".", ",");
    }
    function voltar() {
      router.visit("/admin/eventos");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(LayoutPrincipal, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="page-content" data-v-949978fe${_scopeId}><div class="mb-6" data-v-949978fe${_scopeId}><h2 class="text-2xl font-semibold text-primary mb-2" data-v-949978fe${_scopeId}>${ssrInterpolate(props.evento.nome)}</h2><div class="text-gray-600 mb-4" data-v-949978fe${_scopeId}><p data-v-949978fe${_scopeId}><strong data-v-949978fe${_scopeId}>Data:</strong> ${ssrInterpolate(formatarData(props.evento.data))}</p><p data-v-949978fe${_scopeId}><strong data-v-949978fe${_scopeId}>Hora:</strong> ${ssrInterpolate(props.evento.hora)}</p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4" data-v-949978fe${_scopeId}><div class="p-4 bg-red-50 border border-red-200 rounded-lg" data-v-949978fe${_scopeId}><p class="text-sm text-red-700 font-medium" data-v-949978fe${_scopeId}>Valor Gasto</p><p class="text-2xl font-bold text-red-900" data-v-949978fe${_scopeId}> R$ ${ssrInterpolate(formatarValor(props.evento.valor_gasto || 0))}</p></div><div class="p-4 bg-green-50 border border-green-200 rounded-lg" data-v-949978fe${_scopeId}><p class="text-sm text-green-700 font-medium" data-v-949978fe${_scopeId}>Valor Arrecadado</p><p class="text-2xl font-bold text-green-900" data-v-949978fe${_scopeId}> R$ ${ssrInterpolate(formatarValor(props.evento.valor_arrecadado || 0))}</p></div><div class="${ssrRenderClass([saldoClass.value, "p-4 border rounded-lg"])}" data-v-949978fe${_scopeId}><p class="${ssrRenderClass([saldoTextClass.value, "text-sm font-medium"])}" data-v-949978fe${_scopeId}>Saldo</p><p class="${ssrRenderClass([saldoTextClass.value, "text-2xl font-bold"])}" data-v-949978fe${_scopeId}> R$ ${ssrInterpolate(formatarValor(saldo.value))}</p></div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6" data-v-949978fe${_scopeId}><div class="card" data-v-949978fe${_scopeId}><div class="card-header" data-v-949978fe${_scopeId}><h3 class="text-xl font-semibold" data-v-949978fe${_scopeId}>Cargos do Evento</h3></div><div class="card-body" data-v-949978fe${_scopeId}><div class="mb-4 p-4 bg-gray-50 rounded-lg" data-v-949978fe${_scopeId}><h4 class="font-semibold mb-3" data-v-949978fe${_scopeId}>Adicionar Cargo</h4><div class="space-y-3" data-v-949978fe${_scopeId}><div data-v-949978fe${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "pessoa_cargo",
              value: "Buscar Pessoa",
              class: "required"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(AutocompletePessoa, {
              modelValue: novoCargo.value.id_pessoa,
              "onUpdate:modelValue": [($event) => novoCargo.value.id_pessoa = $event, onPessoaCargoSelecionada],
              placeholder: "Digite o nome da pessoa..."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              message: errors.value.id_pessoa_cargo
            }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-949978fe${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "cargo",
              value: "Cargo",
              class: "required"
            }, null, _parent2, _scopeId));
            _push2(`<select id="cargo" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" data-v-949978fe${_scopeId}><option value="" data-v-949978fe${ssrIncludeBooleanAttr(Array.isArray(novoCargo.value.id_cargo) ? ssrLooseContain(novoCargo.value.id_cargo, "") : ssrLooseEqual(novoCargo.value.id_cargo, "")) ? " selected" : ""}${_scopeId}>Selecione um cargo</option><!--[-->`);
            ssrRenderList(props.cargos, (cargo) => {
              _push2(`<option${ssrRenderAttr("value", cargo.id)} data-v-949978fe${ssrIncludeBooleanAttr(Array.isArray(novoCargo.value.id_cargo) ? ssrLooseContain(novoCargo.value.id_cargo, cargo.id) : ssrLooseEqual(novoCargo.value.id_cargo, cargo.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(cargo.nome)}</option>`);
            });
            _push2(`<!--]--></select>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              message: errors.value.id_cargo
            }, null, _parent2, _scopeId));
            _push2(`</div><button${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} class="btn btn-primary w-full" data-v-949978fe${_scopeId}><i class="fa fa-plus mr-2" data-v-949978fe${_scopeId}></i> Adicionar Cargo </button></div></div><div class="space-y-2" data-v-949978fe${_scopeId}><h4 class="font-semibold mb-3" data-v-949978fe${_scopeId}>Cargos Atribuídos</h4><!--[-->`);
            ssrRenderList(cargosEvento.value, (cargoEvento) => {
              _push2(`<div class="flex items-center justify-between p-3 bg-white border rounded-lg hover:bg-gray-50" data-v-949978fe${_scopeId}><div data-v-949978fe${_scopeId}><p class="font-medium" data-v-949978fe${_scopeId}>${ssrInterpolate(cargoEvento.pessoa.nome)}</p><p class="text-sm text-gray-600" data-v-949978fe${_scopeId}>${ssrInterpolate(cargoEvento.cargo.nome)}</p></div><button class="text-red-600 hover:text-red-800" title="Remover" data-v-949978fe${_scopeId}><i class="fa fa-trash" data-v-949978fe${_scopeId}></i></button></div>`);
            });
            _push2(`<!--]-->`);
            if (cargosEvento.value.length === 0) {
              _push2(`<div class="text-center text-gray-500 py-4" data-v-949978fe${_scopeId}> Nenhum cargo atribuído ainda </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="card" data-v-949978fe${_scopeId}><div class="card-header" data-v-949978fe${_scopeId}><h3 class="text-xl font-semibold" data-v-949978fe${_scopeId}>Doações do Evento</h3></div><div class="card-body" data-v-949978fe${_scopeId}><div class="mb-4 p-4 bg-gray-50 rounded-lg" data-v-949978fe${_scopeId}><h4 class="font-semibold mb-3" data-v-949978fe${_scopeId}>Registrar Doação</h4><div class="space-y-3" data-v-949978fe${_scopeId}><div data-v-949978fe${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "pessoa_doacao",
              value: "Buscar Pessoa",
              class: "required"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(AutocompletePessoa, {
              modelValue: novaDoacao.value.id_pessoa,
              "onUpdate:modelValue": [($event) => novaDoacao.value.id_pessoa = $event, onPessoaDoacaoSelecionada],
              placeholder: "Digite o nome da pessoa..."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              message: errors.value.id_pessoa_doacao
            }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-949978fe${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "valor",
              value: "Valor (R$)",
              class: "required"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "valor",
              modelValue: novaDoacao.value.valor,
              "onUpdate:modelValue": ($event) => novaDoacao.value.valor = $event,
              type: "number",
              step: "0.01",
              min: "0",
              placeholder: "0.00",
              class: "mt-1 block w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              message: errors.value.valor
            }, null, _parent2, _scopeId));
            _push2(`</div><button${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} class="btn btn-primary w-full" data-v-949978fe${_scopeId}><i class="fa fa-plus mr-2" data-v-949978fe${_scopeId}></i> Registrar Doação </button></div></div><div class="space-y-2" data-v-949978fe${_scopeId}><h4 class="font-semibold mb-3" data-v-949978fe${_scopeId}>Doações Registradas</h4><!--[-->`);
            ssrRenderList(doacoesEvento.value, (doacao) => {
              _push2(`<div class="flex items-center justify-between p-3 bg-white border rounded-lg hover:bg-gray-50" data-v-949978fe${_scopeId}><div data-v-949978fe${_scopeId}><p class="font-medium" data-v-949978fe${_scopeId}>${ssrInterpolate(doacao.pessoa.nome)}</p><p class="text-sm text-green-600 font-semibold" data-v-949978fe${_scopeId}> R$ ${ssrInterpolate(formatarValor(doacao.valor))}</p></div><button class="text-red-600 hover:text-red-800" title="Remover" data-v-949978fe${_scopeId}><i class="fa fa-trash" data-v-949978fe${_scopeId}></i></button></div>`);
            });
            _push2(`<!--]-->`);
            if (doacoesEvento.value.length === 0) {
              _push2(`<div class="text-center text-gray-500 py-4" data-v-949978fe${_scopeId}> Nenhuma doação registrada ainda </div>`);
            } else {
              _push2(`<!---->`);
            }
            if (doacoesEvento.value.length > 0) {
              _push2(`<div class="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg" data-v-949978fe${_scopeId}><p class="text-lg font-semibold text-green-800" data-v-949978fe${_scopeId}> Total de Doações: R$ ${ssrInterpolate(formatarValor(totalDoacoes.value))}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div><div class="mt-6" data-v-949978fe${_scopeId}><button class="btn btn-secondary" data-v-949978fe${_scopeId}><i class="fa fa-arrow-left mr-2" data-v-949978fe${_scopeId}></i> Voltar </button></div></div>`);
          } else {
            return [
              createVNode("div", { class: "page-content" }, [
                createVNode("div", { class: "mb-6" }, [
                  createVNode("h2", { class: "text-2xl font-semibold text-primary mb-2" }, toDisplayString(props.evento.nome), 1),
                  createVNode("div", { class: "text-gray-600 mb-4" }, [
                    createVNode("p", null, [
                      createVNode("strong", null, "Data:"),
                      createTextVNode(" " + toDisplayString(formatarData(props.evento.data)), 1)
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "Hora:"),
                      createTextVNode(" " + toDisplayString(props.evento.hora), 1)
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-4" }, [
                    createVNode("div", { class: "p-4 bg-red-50 border border-red-200 rounded-lg" }, [
                      createVNode("p", { class: "text-sm text-red-700 font-medium" }, "Valor Gasto"),
                      createVNode("p", { class: "text-2xl font-bold text-red-900" }, " R$ " + toDisplayString(formatarValor(props.evento.valor_gasto || 0)), 1)
                    ]),
                    createVNode("div", { class: "p-4 bg-green-50 border border-green-200 rounded-lg" }, [
                      createVNode("p", { class: "text-sm text-green-700 font-medium" }, "Valor Arrecadado"),
                      createVNode("p", { class: "text-2xl font-bold text-green-900" }, " R$ " + toDisplayString(formatarValor(props.evento.valor_arrecadado || 0)), 1)
                    ]),
                    createVNode("div", {
                      class: ["p-4 border rounded-lg", saldoClass.value]
                    }, [
                      createVNode("p", {
                        class: ["text-sm font-medium", saldoTextClass.value]
                      }, "Saldo", 2),
                      createVNode("p", {
                        class: ["text-2xl font-bold", saldoTextClass.value]
                      }, " R$ " + toDisplayString(formatarValor(saldo.value)), 3)
                    ], 2)
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, [
                  createVNode("div", { class: "card" }, [
                    createVNode("div", { class: "card-header" }, [
                      createVNode("h3", { class: "text-xl font-semibold" }, "Cargos do Evento")
                    ]),
                    createVNode("div", { class: "card-body" }, [
                      createVNode("div", { class: "mb-4 p-4 bg-gray-50 rounded-lg" }, [
                        createVNode("h4", { class: "font-semibold mb-3" }, "Adicionar Cargo"),
                        createVNode("div", { class: "space-y-3" }, [
                          createVNode("div", null, [
                            createVNode(_sfc_main$1, {
                              for: "pessoa_cargo",
                              value: "Buscar Pessoa",
                              class: "required"
                            }),
                            createVNode(AutocompletePessoa, {
                              modelValue: novoCargo.value.id_pessoa,
                              "onUpdate:modelValue": [($event) => novoCargo.value.id_pessoa = $event, onPessoaCargoSelecionada],
                              placeholder: "Digite o nome da pessoa..."
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$2, {
                              message: errors.value.id_pessoa_cargo
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$1, {
                              for: "cargo",
                              value: "Cargo",
                              class: "required"
                            }),
                            withDirectives(createVNode("select", {
                              id: "cargo",
                              "onUpdate:modelValue": ($event) => novoCargo.value.id_cargo = $event,
                              class: "mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            }, [
                              createVNode("option", { value: "" }, "Selecione um cargo"),
                              (openBlock(true), createBlock(Fragment, null, renderList(props.cargos, (cargo) => {
                                return openBlock(), createBlock("option", {
                                  key: cargo.id,
                                  value: cargo.id
                                }, toDisplayString(cargo.nome), 9, ["value"]);
                              }), 128))
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, novoCargo.value.id_cargo]
                            ]),
                            createVNode(_sfc_main$2, {
                              message: errors.value.id_cargo
                            }, null, 8, ["message"])
                          ]),
                          createVNode("button", {
                            onClick: adicionarCargo,
                            disabled: processing.value,
                            class: "btn btn-primary w-full"
                          }, [
                            createVNode("i", { class: "fa fa-plus mr-2" }),
                            createTextVNode(" Adicionar Cargo ")
                          ], 8, ["disabled"])
                        ])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("h4", { class: "font-semibold mb-3" }, "Cargos Atribuídos"),
                        (openBlock(true), createBlock(Fragment, null, renderList(cargosEvento.value, (cargoEvento) => {
                          return openBlock(), createBlock("div", {
                            key: cargoEvento.id,
                            class: "flex items-center justify-between p-3 bg-white border rounded-lg hover:bg-gray-50"
                          }, [
                            createVNode("div", null, [
                              createVNode("p", { class: "font-medium" }, toDisplayString(cargoEvento.pessoa.nome), 1),
                              createVNode("p", { class: "text-sm text-gray-600" }, toDisplayString(cargoEvento.cargo.nome), 1)
                            ]),
                            createVNode("button", {
                              onClick: ($event) => removerCargo(cargoEvento.id),
                              class: "text-red-600 hover:text-red-800",
                              title: "Remover"
                            }, [
                              createVNode("i", { class: "fa fa-trash" })
                            ], 8, ["onClick"])
                          ]);
                        }), 128)),
                        cargosEvento.value.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-center text-gray-500 py-4"
                        }, " Nenhum cargo atribuído ainda ")) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "card" }, [
                    createVNode("div", { class: "card-header" }, [
                      createVNode("h3", { class: "text-xl font-semibold" }, "Doações do Evento")
                    ]),
                    createVNode("div", { class: "card-body" }, [
                      createVNode("div", { class: "mb-4 p-4 bg-gray-50 rounded-lg" }, [
                        createVNode("h4", { class: "font-semibold mb-3" }, "Registrar Doação"),
                        createVNode("div", { class: "space-y-3" }, [
                          createVNode("div", null, [
                            createVNode(_sfc_main$1, {
                              for: "pessoa_doacao",
                              value: "Buscar Pessoa",
                              class: "required"
                            }),
                            createVNode(AutocompletePessoa, {
                              modelValue: novaDoacao.value.id_pessoa,
                              "onUpdate:modelValue": [($event) => novaDoacao.value.id_pessoa = $event, onPessoaDoacaoSelecionada],
                              placeholder: "Digite o nome da pessoa..."
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$2, {
                              message: errors.value.id_pessoa_doacao
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$1, {
                              for: "valor",
                              value: "Valor (R$)",
                              class: "required"
                            }),
                            createVNode(_sfc_main$3, {
                              id: "valor",
                              modelValue: novaDoacao.value.valor,
                              "onUpdate:modelValue": ($event) => novaDoacao.value.valor = $event,
                              type: "number",
                              step: "0.01",
                              min: "0",
                              placeholder: "0.00",
                              class: "mt-1 block w-full"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$2, {
                              message: errors.value.valor
                            }, null, 8, ["message"])
                          ]),
                          createVNode("button", {
                            onClick: adicionarDoacao,
                            disabled: processing.value,
                            class: "btn btn-primary w-full"
                          }, [
                            createVNode("i", { class: "fa fa-plus mr-2" }),
                            createTextVNode(" Registrar Doação ")
                          ], 8, ["disabled"])
                        ])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("h4", { class: "font-semibold mb-3" }, "Doações Registradas"),
                        (openBlock(true), createBlock(Fragment, null, renderList(doacoesEvento.value, (doacao) => {
                          return openBlock(), createBlock("div", {
                            key: doacao.id,
                            class: "flex items-center justify-between p-3 bg-white border rounded-lg hover:bg-gray-50"
                          }, [
                            createVNode("div", null, [
                              createVNode("p", { class: "font-medium" }, toDisplayString(doacao.pessoa.nome), 1),
                              createVNode("p", { class: "text-sm text-green-600 font-semibold" }, " R$ " + toDisplayString(formatarValor(doacao.valor)), 1)
                            ]),
                            createVNode("button", {
                              onClick: ($event) => removerDoacao(doacao.id),
                              class: "text-red-600 hover:text-red-800",
                              title: "Remover"
                            }, [
                              createVNode("i", { class: "fa fa-trash" })
                            ], 8, ["onClick"])
                          ]);
                        }), 128)),
                        doacoesEvento.value.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-center text-gray-500 py-4"
                        }, " Nenhuma doação registrada ainda ")) : createCommentVNode("", true),
                        doacoesEvento.value.length > 0 ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "mt-4 p-3 bg-green-50 border border-green-200 rounded-lg"
                        }, [
                          createVNode("p", { class: "text-lg font-semibold text-green-800" }, " Total de Doações: R$ " + toDisplayString(formatarValor(totalDoacoes.value)), 1)
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "mt-6" }, [
                  createVNode("button", {
                    onClick: voltar,
                    class: "btn btn-secondary"
                  }, [
                    createVNode("i", { class: "fa fa-arrow-left mr-2" }),
                    createTextVNode(" Voltar ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Eventos/EventosInfo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const EventosInfo = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-949978fe"]]);
export {
  EventosInfo as default
};

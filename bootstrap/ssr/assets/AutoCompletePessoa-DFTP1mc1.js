import { ref, watch, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "AutoCompletePessoa",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: Number,
      default: null
    },
    placeholder: {
      type: String,
      default: "Digite para buscar..."
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    ref(null);
    const searchQuery = ref("");
    const pessoas = ref([]);
    const loading = ref(false);
    const showDropdown = ref(false);
    const pessoaSelecionada = ref(null);
    function limpar() {
      pessoaSelecionada.value = null;
      searchQuery.value = "";
      pessoas.value = [];
      emit("update:modelValue", null);
    }
    function formatarCPF(cpf) {
      if (!cpf) return "";
      const cleaned = cpf.replace(/\D/g, "");
      return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    watch(() => props.modelValue, (newValue) => {
      if (!newValue && pessoaSelecionada.value) {
        limpar();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))} data-v-052c2423><input${ssrRenderAttr("value", searchQuery.value)} type="text"${ssrRenderAttr("placeholder", __props.placeholder)} class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200" data-v-052c2423>`);
      if (showDropdown.value && (loading.value || pessoas.value.length > 0)) {
        _push(`<div class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto" data-v-052c2423>`);
        if (loading.value) {
          _push(`<div class="px-4 py-3 text-sm text-gray-500" data-v-052c2423><i class="fa fa-spinner fa-spin mr-2" data-v-052c2423></i> Buscando... </div>`);
        } else {
          _push(`<div data-v-052c2423><!--[-->`);
          ssrRenderList(pessoas.value, (pessoa) => {
            _push(`<button type="button" class="w-full px-4 py-3 text-left hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors" data-v-052c2423><div class="font-medium" data-v-052c2423>${ssrInterpolate(pessoa.nome)}</div><div class="text-sm text-gray-600" data-v-052c2423>`);
            if (pessoa.cpf) {
              _push(`<span data-v-052c2423>CPF: ${ssrInterpolate(formatarCPF(pessoa.cpf))}</span>`);
            } else {
              _push(`<!---->`);
            }
            if (pessoa.telefone) {
              _push(`<span class="ml-3" data-v-052c2423>Tel: ${ssrInterpolate(pessoa.telefone)}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></button>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (pessoaSelecionada.value) {
        _push(`<div class="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md flex items-center justify-between" data-v-052c2423><div data-v-052c2423><p class="font-medium text-blue-900" data-v-052c2423>${ssrInterpolate(pessoaSelecionada.value.nome)}</p><p class="text-sm text-blue-700" data-v-052c2423>`);
        if (pessoaSelecionada.value.cpf) {
          _push(`<span data-v-052c2423>CPF: ${ssrInterpolate(formatarCPF(pessoaSelecionada.value.cpf))}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (pessoaSelecionada.value.telefone) {
          _push(`<span class="ml-3" data-v-052c2423>Tel: ${ssrInterpolate(pessoaSelecionada.value.telefone)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</p></div><button type="button" class="text-blue-600 hover:text-blue-800" title="Limpar seleção" data-v-052c2423><i class="fa fa-times" data-v-052c2423></i></button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AutoCompletePessoa.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Autocomplete = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-052c2423"]]);
export {
  Autocomplete as default
};

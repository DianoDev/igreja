import { inject, ref, reactive, onMounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import _sfc_main$1 from "./InputLabel-CDsQQ3SF.js";
import _sfc_main$3 from "./InputError-DKvItylr.js";
import _sfc_main$2 from "./TextInput-BEEeI7hx.js";
import Autocomplete from "./AutoCompletePessoa-DFTP1mc1.js";
import { useToast } from "vue-toastification";
import axios from "axios";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "ModalEditarGrupo",
  __ssrInlineRender: true,
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    inject("events");
    const toast = useToast();
    const processing = ref(false);
    const errors = ref({});
    const grupo = ref({
      pessoas: []
    });
    const pessoaSelecionada = ref(null);
    const form = reactive({
      nome: ""
    });
    onMounted(() => {
      carregarGrupo();
    });
    async function carregarGrupo() {
      try {
        console.log(props.id, "iddddddddddddddd");
        const response = await axios.get(`/admin/grupo-evento/detalhes/${props.id}`);
        grupo.value = response.data;
        form.nome = grupo.value.nome;
      } catch (error) {
        toast.error("Erro ao carregar grupo");
        console.error(error);
      }
    }
    function formatarCPF(cpf) {
      if (!cpf) return "";
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><h3 class="text-xl font-semibold">Editar Grupo</h3><div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "nome",
        value: "Nome do Grupo",
        class: "required"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "nome",
        modelValue: form.nome,
        "onUpdate:modelValue": ($event) => form.nome = $event,
        type: "text",
        class: "mt-1 block w-full",
        placeholder: "Ex: Equipe de Cozinha",
        required: ""
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        message: errors.value.nome,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div><h4 class="font-semibold mb-3">Pessoas no Grupo</h4><div class="mb-4 flex gap-2"><div class="flex-1">`);
      _push(ssrRenderComponent(Autocomplete, {
        modelValue: pessoaSelecionada.value,
        "onUpdate:modelValue": ($event) => pessoaSelecionada.value = $event,
        placeholder: "Buscar pessoa para adicionar..."
      }, null, _parent));
      _push(`</div><button${ssrIncludeBooleanAttr(!pessoaSelecionada.value || processing.value) ? " disabled" : ""} class="btn btn-primary"><i class="fa fa-plus mr-2"></i> Adicionar </button></div><div class="space-y-2"><!--[-->`);
      ssrRenderList(grupo.value.pessoas, (pessoa) => {
        var _a, _b;
        _push(`<div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"><div><p class="font-medium">${ssrInterpolate((_a = pessoa.pessoa) == null ? void 0 : _a.nome)}</p><p class="text-sm text-gray-600">CPF: ${ssrInterpolate(formatarCPF((_b = pessoa.pessoa) == null ? void 0 : _b.cpf))}</p></div><button${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} class="text-red-600 hover:text-red-800" title="Remover pessoa"><i class="fa fa-trash"></i></button></div>`);
      });
      _push(`<!--]-->`);
      if (!grupo.value.pessoas || grupo.value.pessoas.length === 0) {
        _push(`<div class="text-center text-gray-500 py-4"> Nenhuma pessoa adicionada ao grupo </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="flex justify-end gap-3 pt-4"><button${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} class="btn btn-secondary"> Cancelar </button><button${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} class="btn btn-primary"><i class="fa fa-save mr-2"></i> Salvar </button></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Eventos/ModalEditarGrupo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

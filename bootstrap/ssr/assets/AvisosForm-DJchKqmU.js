import { ref, inject, onMounted, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import _sfc_main$1 from "./InputLabel-CDsQQ3SF.js";
import _sfc_main$3 from "./InputError-DKvItylr.js";
import _sfc_main$2 from "./TextInput-BEEeI7hx.js";
import { useToast } from "vue-toastification";
import VueDatePicker from "@vuepic/vue-datepicker";
/* empty css              */
const _sfc_main = {
  __name: "AvisosForm",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Object,
      default: null,
      required: false
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const acao = ref("/admin/avisos/");
    inject("events");
    const toast = useToast();
    const errors = ref({});
    const processing = ref(false);
    const ready = ref(false);
    const readOnly = ref(false);
    const form = ref({
      nome: "",
      descricao: "",
      data_expiração: null,
      ativo: false
    });
    const loadData = async () => {
      try {
        const response = await axios.get(`/admin/avisos/${props.data.id}`);
        Object.keys(form.value).forEach((key) => {
          if (response.data[key] !== void 0) {
            if (key === "ativo") {
              form.value[key] = response.data[key] === 1 || response.data[key] === "1" || response.data[key] === true;
            } else if (key === "data_expiração" && response.data[key]) {
              form.value[key] = new Date(response.data[key]);
            } else {
              form.value[key] = response.data[key];
            }
          }
        });
        readOnly.value = Boolean(props.data.readOnly);
      } catch (err) {
        console.error("Error loading data:", err);
        toast.error("Não foi possível recuperar os dados do Aviso.");
      } finally {
        ready.value = true;
      }
    };
    onMounted(async () => {
      var _a;
      if ((_a = props.data) == null ? void 0 : _a.id) {
        acao.value = `/admin/avisos/${props.data.id}`;
        await loadData();
      } else {
        ready.value = true;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (ready.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "m-2" }, _attrs))}><form><div class="mb-4">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          for: "nome",
          value: "Nome",
          class: "required"
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$2, {
          id: "nome",
          class: "w-full",
          modelValue: form.value.nome,
          "onUpdate:modelValue": ($event) => form.value.nome = $event,
          disabled: readOnly.value
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$3, {
          message: errors.value.nome
        }, null, _parent));
        _push(`</div><div class="mb-4">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          for: "descricao",
          value: "Descrição",
          class: "required"
        }, null, _parent));
        _push(`<textarea id="descricao" class="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"${ssrIncludeBooleanAttr(readOnly.value) ? " disabled" : ""} rows="5">${ssrInterpolate(form.value.descricao)}</textarea>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          message: errors.value.descricao
        }, null, _parent));
        _push(`</div><div class="mb-4">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          for: "data_expiração",
          value: "Data de Expiração",
          class: ["required", { "text-gray-400": readOnly.value }]
        }, null, _parent));
        _push(ssrRenderComponent(unref(VueDatePicker), {
          id: "data_expiração",
          modelValue: form.value.data_expiração,
          "onUpdate:modelValue": ($event) => form.value.data_expiração = $event,
          locale: "pt-BR",
          disabled: readOnly.value,
          format: "dd/MM/yyyy",
          "enable-time-picker": false,
          "auto-apply": "",
          clearable: false,
          placeholder: "Selecione uma data",
          class: [{ "opacity-50": readOnly.value }, "w-full"]
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$3, {
          message: errors.value.data_expiração
        }, null, _parent));
        _push(`</div><div class="mb-4"><label class="flex items-center"><input type="checkbox" id="ativo" class="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"${ssrIncludeBooleanAttr(Array.isArray(form.value.ativo) ? ssrLooseContain(form.value.ativo, null) : form.value.ativo) ? " checked" : ""}${ssrIncludeBooleanAttr(readOnly.value) ? " disabled" : ""}><span class="ml-2 text-sm text-gray-600">Ativo</span></label>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          message: errors.value.ativo
        }, null, _parent));
        _push(`</div><div class="w-full pt-4 mt-4 border-t border-gray-200">`);
        if (readOnly.value) {
          _push(`<div class="flex justify-center"><button type="button" class="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"><i class="mr-1 fa fa-close"></i> Sair </button></div>`);
        } else {
          _push(`<!---->`);
        }
        if (!readOnly.value) {
          _push(`<div class="flex justify-center space-x-2"><button type="submit" class="px-4 py-2 text-white rounded-md bg-blue-500 hover:bg-blue-500-hover"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""}>`);
          if (!processing.value) {
            _push(`<i class="mr-1 fa fa-check"></i>`);
          } else {
            _push(`<i class="mr-1 fa fa-spinner fa-spin"></i>`);
          }
          _push(` ${ssrInterpolate(processing.value ? "Salvando..." : "Salvar")}</button><button type="button" class="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"><i class="mr-1 fa fa-close"></i> Cancelar </button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></form></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Avisos/AvisosForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

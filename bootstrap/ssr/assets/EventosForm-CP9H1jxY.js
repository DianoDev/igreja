import { ref, inject, computed, onMounted, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import _sfc_main$1 from "./InputLabel-CDsQQ3SF.js";
import _sfc_main$2 from "./InputError-DKvItylr.js";
import _sfc_main$3 from "./TextInput-BEEeI7hx.js";
import VueDatePicker from "@vuepic/vue-datepicker";
/* empty css              */
import { useToast } from "vue-toastification";
const _sfc_main = {
  __name: "EventosForm",
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
    const acao = ref("/admin/eventos/create");
    inject("events");
    const toast = useToast();
    const errors = ref({});
    const processing = ref(false);
    const ready = ref(false);
    const readOnly = ref(false);
    const form = ref({
      nome: "",
      data: "",
      hora: ""
    });
    const horariosDisponiveis = computed(() => {
      const horarios = [];
      for (let hora = 0; hora < 24; hora++) {
        for (let minuto = 0; minuto < 60; minuto += 30) {
          const horaFormatada = String(hora).padStart(2, "0");
          const minutoFormatado = String(minuto).padStart(2, "0");
          horarios.push(`${horaFormatada}:${minutoFormatado}`);
        }
      }
      return horarios;
    });
    const loadData = async () => {
      try {
        acao.value = "/admin/eventos/";
        const response = await axios.get(`/admin/eventos/${props.data.id}`);
        Object.keys(form.value).forEach((key) => {
          if (response.data[key] !== void 0) {
            form.value[key] = response.data[key];
          }
        });
        readOnly.value = Boolean(props.data.readOnly);
      } catch (err) {
        console.error("Error loading data:", err);
        toast.error("Não foi possível recuperar os dados do Eventos.");
      } finally {
        ready.value = true;
      }
    };
    onMounted(async () => {
      var _a;
      if ((_a = props.data) == null ? void 0 : _a.id) {
        acao.value = `/admin/eventos/${props.data.id}`;
        await loadData();
      } else {
        ready.value = true;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (ready.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "m-2" }, _attrs))}><form><div class="mb-10">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          for: "data_desejada",
          value: "Data Desejada",
          class: ["required", { "text-gray-400": readOnly.value }]
        }, null, _parent));
        _push(ssrRenderComponent(unref(VueDatePicker), {
          id: "data_desejada",
          modelValue: form.value.data,
          "onUpdate:modelValue": ($event) => form.value.data = $event,
          locale: "pt-BR",
          disabled: readOnly.value,
          format: "dd/MM/yyyy",
          "enable-time-picker": false,
          "auto-apply": "",
          clearable: false,
          placeholder: "Selecione uma data",
          class: [{ "opacity-50": readOnly.value }, "w-full"]
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$2, {
          message: errors.value.data
        }, null, _parent));
        _push(`</div><div class="mb-10">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          for: "nome",
          value: "Nome",
          class: "required"
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$3, {
          id: "nome",
          class: "w-full",
          modelValue: form.value.nome,
          "onUpdate:modelValue": ($event) => form.value.nome = $event,
          disabled: readOnly.value
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$2, {
          message: errors.value.nome
        }, null, _parent));
        _push(`</div><div class="mb-10">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          for: "hora",
          value: "Horário",
          class: ["required", { "text-gray-400": readOnly.value }]
        }, null, _parent));
        _push(`<select id="hora"${ssrIncludeBooleanAttr(readOnly.value) ? " disabled" : ""} class="${ssrRenderClass([{ "opacity-50 bg-gray-100": readOnly.value }, "w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"])}"><option value=""${ssrIncludeBooleanAttr(Array.isArray(form.value.hora) ? ssrLooseContain(form.value.hora, "") : ssrLooseEqual(form.value.hora, "")) ? " selected" : ""}>Selecione um horário</option><!--[-->`);
        ssrRenderList(horariosDisponiveis.value, (horario) => {
          _push(`<option${ssrRenderAttr("value", horario)}${ssrIncludeBooleanAttr(Array.isArray(form.value.hora) ? ssrLooseContain(form.value.hora, horario) : ssrLooseEqual(form.value.hora, horario)) ? " selected" : ""}>${ssrInterpolate(horario)}</option>`);
        });
        _push(`<!--]--></select>`);
        _push(ssrRenderComponent(_sfc_main$2, {
          message: errors.value.hora
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Eventos/EventosForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

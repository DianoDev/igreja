import { ref, inject, mergeProps, useSSRContext, onMounted, unref, createSlots, withCtx, createTextVNode, toDisplayString, resolveComponent, createVNode, resolveDynamicComponent, computed, onBeforeUnmount, watchEffect, defineComponent } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrInterpolate, ssrLooseContain, ssrLooseEqual, ssrRenderComponent, ssrRenderClass, ssrRenderStyle, ssrRenderVNode, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import DateRangePicker from "vue3-daterange-picker";
import moment from "moment/moment.js";
import moment$1 from "moment";
import { useToast } from "vue-toastification";
import "@inertiajs/vue3";
import _sfc_main$d from "./Modal-D4SsQX3D.js";
const useTableFilters = defineStore("filters", () => {
  const filterData = {};
  const enabledFilters = ref([]);
  const setFilter = (grid, column, value) => {
    if (!filterData[sanitize(grid)]) filterData[sanitize(grid)] = {};
    filterData[sanitize(grid)][sanitize(column)] = value;
    const filterItem = `${grid}_${column}`;
    if (!value) {
      enabledFilters.value = enabledFilters.value.filter((item) => item !== filterItem);
    } else {
      if (enabledFilters.value.indexOf(filterItem) === -1) {
        enabledFilters.value.push(filterItem);
      }
    }
  };
  const getFilters = (grid) => {
    return filterData[sanitize(grid)] ?? null;
  };
  const getFilter = (grid, column) => {
    return filterData[sanitize(grid)][sanitize(column)] ?? null;
  };
  const sanitize = (name) => {
    return name.replace(/[.-]/g, "_");
  };
  return {
    enabledFilters,
    setFilter,
    getFilter,
    getFilters,
    sanitize
  };
});
const _sfc_main$c = {
  setup(props, { emit }) {
    const events = inject("events");
    const checked = ref(false);
    const onToggleAll = (check) => {
      checked.value = check;
    };
    const toggle = (evt) => {
      document.querySelector("body").click();
      emit("toggle", {
        checked: evt.target.checked,
        value: props.value
      });
    };
    const onCheckboxReset = () => {
      onToggleAll(false);
      emit("toggle", {
        checked: false,
        value: props.value
      });
    };
    events.on("table-toggle-all", onToggleAll);
    events.on("table-checkbox-reset", onCheckboxReset);
    return {
      checked,
      toggle
    };
  },
  props: {
    value: { type: String, default: null }
  }
};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<label${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-fcfd26e6><input class="table-checkbox absolute opacity-0 cursor-pointer h-0 w-0" type="checkbox"${ssrRenderAttr("id", `table-checkbox-${$props.value}`)}${ssrIncludeBooleanAttr($setup.checked) ? " checked" : ""} data-v-fcfd26e6><div class="checkmark" data-v-fcfd26e6></div></label>`);
}
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/datatable/partials/__table-checkbox.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const TableCheckbox = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["ssrRender", _sfc_ssrRender$5], ["__scopeId", "data-v-fcfd26e6"]]);
const _sfc_main$b = {
  __name: "__table-filter-text",
  __ssrInlineRender: true,
  props: {
    table: { default: null },
    name: { default: null },
    filter: { default: null }
  },
  emits: ["updated"],
  setup(__props, { emit: __emit }) {
    const keyword = ref(null);
    const filterStore = useTableFilters();
    const { setFilter } = filterStore;
    onMounted(() => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><div class="relative mb-4"><div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><i class="fas fa-search text-gray-400"></i></div><input type="text" class="w-full pl-10 pr-4 py-2.5 text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Buscar..."${ssrRenderAttr("value", keyword.value)}>`);
      if (keyword.value) {
        _push(`<button class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"><i class="fas fa-times-circle"></i></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex space-x-1"><button type="button" class="flex-1 px-3 py-1.5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"><i class="fas fa-filter mr-2"></i> Aplicar </button><button type="button" class="flex-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"><i class="fas fa-times mr-2"></i> Limpar </button></div></div>`);
    };
  }
};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/datatable/partials/filters/__table-filter-text.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = {
  __name: "__table-filter-cpf",
  __ssrInlineRender: true,
  props: {
    table: { default: null },
    name: { default: null },
    filter: { default: null }
  },
  emits: ["updated"],
  setup(__props, { emit: __emit }) {
    const keyword = ref(null);
    const filterStore = useTableFilters();
    const { setFilter } = filterStore;
    onMounted(() => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-2b48251b><div class="row" data-v-2b48251b><div class="col mb-3" data-v-2b48251b><input type="text" class="form-control small auto-focus"${ssrRenderAttr("value", keyword.value)} data-v-2b48251b></div></div><div class="row" data-v-2b48251b><div class="col text-center d-grid" data-v-2b48251b><button type="button" class="btn btn-sm small btn-primary" data-v-2b48251b> Aplicar </button></div><div class="col text-center d-grid" data-v-2b48251b><button type="button" class="btn btn-sm small btn-link" data-v-2b48251b> Limpar </button></div></div></div>`);
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/datatable/partials/filters/__table-filter-cpf.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const TableFilterCPF = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-2b48251b"]]);
const _sfc_main$9 = {
  __name: "__table-filter-checkbox",
  __ssrInlineRender: true,
  props: {
    table: { default: null },
    name: { default: null },
    filter: { type: Object }
  },
  emits: ["updated"],
  setup(__props, { emit: __emit }) {
    ref([]);
    const selectedItems = ref([]);
    const filterStore = useTableFilters();
    const { setFilter } = filterStore;
    onMounted(() => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-58ef392b><div class="mb-2 options-container" data-v-58ef392b><!--[-->`);
      ssrRenderList(__props.filter.options, (option) => {
        _push(`<div class="text-truncate border-bottom py-1" data-v-58ef392b><label class="fw-normal" data-v-58ef392b><input type="checkbox" class="me-1" name="item[]"${ssrRenderAttr("value", option.id)}${ssrIncludeBooleanAttr(Array.isArray(selectedItems.value) ? ssrLooseContain(selectedItems.value, option.id) : selectedItems.value) ? " checked" : ""} data-v-58ef392b> ${ssrInterpolate(option.name)}</label></div>`);
      });
      _push(`<!--]--></div><div class="row" data-v-58ef392b><div class="col text-center d-grid" data-v-58ef392b><button type="button" class="btn btn-sm small btn-primary" data-v-58ef392b> Aplicar </button></div><div class="col text-center d-grid" data-v-58ef392b><button type="button" class="btn btn-sm small btn-link" data-v-58ef392b> Limpar </button></div></div></div>`);
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/datatable/partials/filters/__table-filter-checkbox.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const TableFilterCheckbox = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-58ef392b"]]);
const _sfc_main$8 = {
  __name: "__table-filter-select",
  __ssrInlineRender: true,
  props: {
    table: { default: null },
    name: { default: null },
    filter: { type: Object }
  },
  emits: ["updated"],
  setup(__props, { emit: __emit }) {
    const selectedItem = ref();
    const filterStore = useTableFilters();
    const { setFilter } = filterStore;
    onMounted(() => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))} data-v-175eee1f><div class="relative mb-4" data-v-175eee1f><div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none" data-v-175eee1f><i class="fas fa-filter text-gray-400" data-v-175eee1f></i></div><select class="w-full pl-10 pr-10 py-2.5 text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors" data-v-175eee1f><option value="" data-v-175eee1f${ssrIncludeBooleanAttr(Array.isArray(selectedItem.value) ? ssrLooseContain(selectedItem.value, "") : ssrLooseEqual(selectedItem.value, "")) ? " selected" : ""}>TODOS</option><!--[-->`);
      ssrRenderList(__props.filter.options, (option) => {
        _push(`<option${ssrRenderAttr("value", __props.filter.id ? option[__props.filter.id] : option.id)} data-v-175eee1f${ssrIncludeBooleanAttr(Array.isArray(selectedItem.value) ? ssrLooseContain(selectedItem.value, __props.filter.id ? option[__props.filter.id] : option.id) : ssrLooseEqual(selectedItem.value, __props.filter.id ? option[__props.filter.id] : option.id)) ? " selected" : ""}>${ssrInterpolate(__props.filter.label ? option[__props.filter.label] : option.name)}</option>`);
      });
      _push(`<!--]--></select><div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none" data-v-175eee1f><i class="fas fa-chevron-down text-gray-400" data-v-175eee1f></i></div></div><div class="flex space-x-3" data-v-175eee1f><button type="button" class="flex-1 px-3 py-1.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary" data-v-175eee1f><i class="fas fa-check mr-2" data-v-175eee1f></i> Aplicar </button><button type="button" class="flex-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" data-v-175eee1f><i class="fas fa-times mr-2" data-v-175eee1f></i> Limpar </button></div></div>`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/datatable/partials/filters/__table-filter-select.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const TableFilterSelect = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-175eee1f"]]);
const _sfc_main$7 = {
  __name: "__table-filter-date-range",
  __ssrInlineRender: true,
  props: {
    table: { default: null },
    name: { default: null },
    filter: { type: Object }
  },
  emits: ["updated"],
  setup(__props, { emit: __emit }) {
    const ranges = ref({});
    const dateRange = ref({});
    const ready = ref(false);
    const props = __props;
    const emit = __emit;
    const filterStore = useTableFilters();
    const { setFilter } = filterStore;
    const handleSelect = () => {
      setTimeout(apply, 100);
    };
    const apply = () => {
      if (!dateRange.value.startDate || !dateRange.value.endDate) {
        reset();
        return;
      }
      let startDate = moment(dateRange.value.startDate);
      let endDate = moment(dateRange.value.endDate);
      setFilter(props.table, props.filter.name ?? props.name, `${startDate.format("YYYY-MM-DD")},${endDate.format("YYYY-MM-DD")}`);
      emit("updated", true);
    };
    const reset = () => {
      dateRange.value = {
        startDate: null,
        endDate: null
      };
      setFilter(props.table, props.filter.name ?? props.name, null);
      emit("updated", true);
    };
    onMounted(() => {
      let today = /* @__PURE__ */ new Date();
      today.setHours(0, 0, 0, 0);
      let d7 = /* @__PURE__ */ new Date();
      d7.setDate(today.getDate() - 7);
      d7.setHours(0, 0, 0, 0);
      let d15 = /* @__PURE__ */ new Date();
      d15.setDate(today.getDate() - 15);
      d15.setHours(0, 0, 0, 0);
      let d30 = /* @__PURE__ */ new Date();
      d30.setDate(today.getDate() - 30);
      d30.setHours(0, 0, 0, 0);
      let d60 = /* @__PURE__ */ new Date();
      d60.setDate(today.getDate() - 60);
      d60.setHours(0, 0, 0, 0);
      let d90 = /* @__PURE__ */ new Date();
      d90.setDate(today.getDate() - 90);
      d90.setHours(0, 0, 0, 0);
      let d120 = /* @__PURE__ */ new Date();
      d120.setDate(today.getDate() - 120);
      d120.setHours(0, 0, 0, 0);
      ranges.value = {
        "Last 7 days": [d7, today],
        "Last 15 days": [d15, today],
        "Last 30 days": [d30, today],
        "Last 60 days": [d60, today],
        "Last 90 days": [d90, today],
        "Last 120 days": [d120, today]
      };
      dateRange.value = {
        startDate: null,
        endDate: null
      };
      ready.value = true;
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (ready.value) {
        _push(`<div${ssrRenderAttrs(_attrs)}><div class="row mb-2"><div class="col">`);
        _push(ssrRenderComponent(unref(DateRangePicker), {
          ref: "picker",
          "locale-data": { firstDay: 1, format: "yyyy-mm-dd HH:mm:ss" },
          singleDatePicker: false,
          showDropdowns: true,
          autoApply: true,
          ranges: ranges.value,
          modelValue: dateRange.value,
          "onUpdate:modelValue": ($event) => dateRange.value = $event,
          onSelect: handleSelect,
          "date-range": dateRange.value
        }, createSlots({ _: 2 }, [
          dateRange.value.startDate ? {
            name: "input",
            fn: withCtx((picker, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(moment)(picker.startDate).format("YYYY-MM-DD"))} - ${ssrInterpolate(unref(moment)(picker.endDate).format("YYYY-MM-DD"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(moment)(picker.startDate).format("YYYY-MM-DD")) + " - " + toDisplayString(unref(moment)(picker.endDate).format("YYYY-MM-DD")), 1)
                ];
              }
            }),
            key: "0"
          } : void 0
        ]), _parent));
        _push(`</div></div><div class="flex space-x-1"><button type="button" class="flex-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"><i class="fas fa-times mr-2"></i> Limpar </button></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/datatable/partials/filters/__table-filter-date-range.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = {
  __name: "__table-filter-date",
  __ssrInlineRender: true,
  props: {
    table: { default: null },
    name: { default: null },
    filter: { default: null }
  },
  emits: ["updated"],
  setup(__props, { emit: __emit }) {
    const keyword = ref(null);
    const filterStore = useTableFilters();
    const { setFilter } = filterStore;
    onMounted(() => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_input_date = resolveComponent("input-date");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-9218ce5f><div class="row" data-v-9218ce5f><div class="col mb-3" data-v-9218ce5f>`);
      _push(ssrRenderComponent(_component_input_date, {
        class: "full-width",
        modelValue: keyword.value,
        "onUpdate:modelValue": ($event) => keyword.value = $event
      }, null, _parent));
      _push(`</div></div><div class="row" data-v-9218ce5f><div class="col text-center d-grid" data-v-9218ce5f><button type="button" class="btn btn-sm small btn-primary" data-v-9218ce5f> Aplicar </button></div><div class="col text-center d-grid" data-v-9218ce5f><button type="button" class="btn btn-sm small btn-link" data-v-9218ce5f> Limpar </button></div></div></div>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/datatable/partials/filters/__table-filter-date.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const TableFilterDate = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-9218ce5f"]]);
const _sfc_main$5 = {
  components: {
    TableCheckbox,
    TableFilterText: _sfc_main$b,
    TableFilterCPF,
    TableFilterCheckbox,
    TableFilterSelect,
    TableFilterDateRange: _sfc_main$7,
    TableFilterDate
  },
  setup(props, { emit }) {
    const filter = useTableFilters();
    const { enabledFilters } = storeToRefs(filter);
    const { sanitize } = filter;
    const sortColumn = ref(null);
    const sortAsc = ref(null);
    const ready = ref(false);
    const init = () => {
      if (props.params) {
        let direction = props.params.sort_direction || "asc";
        sortColumn.value = props.params.sort || null;
        sortAsc.value = direction === "asc";
      }
      ready.value = true;
    };
    const sort = (header) => {
      if (!header.sort) return null;
      sortAsc.value = sortColumn.value === header.sort ? !sortAsc.value : true;
      sortColumn.value = header.sort;
      emit("sort", {
        column: sortColumn.value,
        direction: sortAsc.value ? "asc" : "desc"
      });
    };
    const toggle = (item) => {
      document.querySelector("body").click();
      emit("toggle-all", item);
    };
    const dataLoaded = (params) => {
      let direction = params.sort_direction || "asc";
      sortColumn.value = params.sort || null;
      sortAsc.value = direction === "asc";
    };
    const toggleFilter = (name) => {
      hideAllFilters(name);
      const el = document.querySelector(`#head_${props.table} #filter_column_${sanitize(name)}`);
      if (el) {
        el.style.display = el.style.display === "block" ? "none" : "block";
        if (el.style.display === "block") {
          const input = document.querySelector(`#head_${props.table} #filter_column_${sanitize(name)} .auto-focus`);
          if (input) input.focus();
        }
      }
    };
    const hideAllFilters = (except) => {
      const els = document.querySelectorAll(".filter-container");
      els.forEach((el) => {
        if (!except || el.id !== `filter_column_${sanitize(except)}`) el.style.display = "none";
      });
    };
    const handleUpdateFilter = () => {
      emit("filter", true);
      hideAllFilters();
    };
    const hasFilter = (header) => {
      const filterItem = `${props.table}_${header.filter.name ?? header.name}`;
      return enabledFilters.value.indexOf(filterItem) >= 0;
    };
    onMounted(init);
    return {
      ready,
      sortColumn,
      sortAsc,
      toggle,
      sort,
      dataLoaded,
      toggleFilter,
      hideAllFilters,
      sanitize,
      handleUpdateFilter,
      hasFilter
    };
  },
  props: {
    table: { default: null },
    params: { default: null },
    columns: { type: Array, required: true },
    filters: { type: Array, default: [] }
  }
};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_table_checkbox = resolveComponent("table-checkbox");
  if ($setup.ready) {
    _push(`<thead${ssrRenderAttrs(mergeProps({
      id: `head_${$props.table}`
    }, _attrs))} data-v-d7ee7f6e><tr class="table-header bg-gray-200" data-v-d7ee7f6e><!--[-->`);
    ssrRenderList($props.columns, (header, index) => {
      _push(`<th class="${ssrRenderClass([
        header.headerClass,
        "whitespace-nowrap px-3 py-3 text-left text-sm font-bold text-black-g00 tracking-wider",
        { "rounded-tl-lg": index === 0, "rounded-tr-lg": index === $props.columns.length - 1 }
      ])}" style="${ssrRenderStyle({ width: header.width || "auto" })}" data-v-d7ee7f6e>`);
      if (!header.checkbox) {
        _push(`<div class="block" data-v-d7ee7f6e>${ssrInterpolate(header.title)} `);
        if (!!header.sort) {
          _push(`<span class="${ssrRenderClass([{ "text-red-500": header.sort === $setup.sortColumn, "text-gray-500": header.sort !== $setup.sortColumn }, "ml-1 cursor-pointer"])}" data-v-d7ee7f6e><i class="${ssrRenderClass([{ "fa-sort-asc": header.sort === $setup.sortColumn && $setup.sortAsc, "fa-sort-desc": header.sort === $setup.sortColumn && !$setup.sortAsc, "fa-sort": header.sort !== $setup.sortColumn }, "fa"])}" data-v-d7ee7f6e></i></span>`);
        } else {
          _push(`<!---->`);
        }
        if (header.filter) {
          _push(`<div class="ml-1 inline-block" data-v-d7ee7f6e><span role="button" class="${ssrRenderClass({ "text-red-500": $setup.hasFilter(header), "text-gray-500": !$setup.hasFilter(header) })}" data-v-d7ee7f6e><i class="fa fa-filter" data-v-d7ee7f6e></i></span><div class="${ssrRenderClass([header.filterPosition === "left" ? "filter-left" : "", "filter-container p-3 border border-gray-200 bg-white rounded shadow-md"])}"${ssrRenderAttr("id", `filter_column_${$setup.sanitize(header.name)}`)} data-v-d7ee7f6e><i class="fa fa-times-circle text-red-500 close-btn" data-v-d7ee7f6e></i>`);
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(`table-filter-${header.filter.type}`), {
            table: $props.table,
            name: header.name,
            filter: header.filter,
            onUpdated: $setup.handleUpdateFilter
          }, null), _parent);
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (header.checkbox) {
        _push(`<div class="text-center" data-v-d7ee7f6e>`);
        _push(ssrRenderComponent(_component_table_checkbox, {
          onToggle: $setup.toggle,
          value: "all"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</th>`);
    });
    _push(`<!--]--></tr></thead>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/datatable/partials/__table-header.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const TableHeader = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$4], ["__scopeId", "data-v-d7ee7f6e"]]);
const _sfc_main$4 = {
  __name: "__table-dropdown",
  __ssrInlineRender: true,
  props: {
    data: [String, Number, Object],
    reference: Object,
    items: Array
  },
  setup(__props) {
    const props = __props;
    const events = inject("events");
    useToast();
    const open = ref(false);
    const dropdownRef = ref(null);
    const dropdownId = Symbol();
    const hasSingleItem = computed(() => {
      var _a;
      return ((_a = props.items) == null ? void 0 : _a.length) === 1;
    });
    const singleItem = computed(() => hasSingleItem.value ? props.items[0] : null);
    const closeDropdown = (event) => {
      if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        open.value = false;
      }
    };
    const closeThisDropdown = (idToKeepOpen) => {
      if (dropdownId !== idToKeepOpen) {
        open.value = false;
      }
    };
    onMounted(() => {
      document.addEventListener("click", closeDropdown);
      events.on("close-dropdowns", closeThisDropdown);
    });
    onBeforeUnmount(() => {
      document.removeEventListener("click", closeDropdown);
      events.off("close-dropdowns", closeThisDropdown);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "relative inline-block text-left",
        ref_key: "dropdownRef",
        ref: dropdownRef
      }, _attrs))} data-v-aed837e7>`);
      if (hasSingleItem.value) {
        _push(`<button type="button"${ssrRenderAttr("data-tooltip", (_a = singleItem.value) == null ? void 0 : _a.text)} class="${ssrRenderClass([
          "tooltip tooltip--top",
          "inline-flex justify-center px-2 py-1 text-sm font-medium bg-white border border-gray-300 rounded-md shadow-sm",
          singleItem.value.type === "delete" ? "text-red-500 hover:text-red-600" : "text-primary hover:text-primary-hover",
          "hover:bg-gray-50"
        ])}" data-v-aed837e7><i class="${ssrRenderClass(`fas ${singleItem.value.type === "delete" ? "fa-trash" : singleItem.value.icon}`)}" data-v-aed837e7></i></button>`);
      } else {
        _push(`<!--[--><div data-v-aed837e7><button type="button" class="inline-flex justify-center px-2 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50" data-v-aed837e7><i class="fas fa-ellipsis" data-v-aed837e7></i></button></div>`);
        if (open.value) {
          _push(`<div class="absolute right-0 z-10 mt-2 bg-[#fafafa] border border-gray-300 rounded-md shadow-lg ring-1 ring-primary ring-opacity-5 focus:outline-none" data-v-aed837e7><div class="py-1 text-sm text-gray-700" data-v-aed837e7><!--[-->`);
          ssrRenderList(__props.items, (item, index) => {
            _push(`<!--[-->`);
            if (item.disabled) {
              _push(`<div${ssrRenderAttr("data-tooltip", item.disabledTooltip)} class="flex items-center px-6 py-3 text-gray-400 cursor-not-allowed tooltip-dropdown tooltip-dropdown--left" data-v-aed837e7><i class="${ssrRenderClass(`w-4 mr-2 text-center fas ${item.icon || "fa-ban"}`)}" data-v-aed837e7></i> ${ssrInterpolate(item.text)}</div>`);
            } else {
              _push(`<!--[-->`);
              if (item.type === "anchor" && !item.openNewTab) {
                _push(`<a href="#" class="flex items-center px-6 py-3 hover:bg-gray-100 hover:text-primary" data-v-aed837e7><i class="${ssrRenderClass(`w-4 mr-2 text-center fas ${item.icon}`)}" data-v-aed837e7></i> ${ssrInterpolate(item.text)}</a>`);
              } else {
                _push(`<!---->`);
              }
              if (item.type === "anchor" && item.openNewTab) {
                _push(`<a${ssrRenderAttr("href", item.href)} target="_blank" class="flex items-center px-6 py-3 hover:bg-gray-100 hover:text-primary" data-v-aed837e7><i class="${ssrRenderClass(`w-4 mr-2 text-center fas ${item.icon}`)}" data-v-aed837e7></i> ${ssrInterpolate(item.text)}</a>`);
              } else if (item.type === "modal") {
                _push(`<a href="javascript:;" class="flex items-center px-6 py-3 hover:bg-gray-100 hover:text-primary" data-v-aed837e7><i class="${ssrRenderClass(`w-4 mr-2 text-center fas ${item.icon}`)}" data-v-aed837e7></i> ${ssrInterpolate(item.text)}</a>`);
              } else if (item.type === "confirmation") {
                _push(`<a href="javascript:;" class="flex items-center px-6 py-3 hover:bg-gray-100 hover:text-primary" data-v-aed837e7><i class="${ssrRenderClass(`w-4 mr-2 text-center fas ${item.icon}`)}" data-v-aed837e7></i> ${ssrInterpolate(item.text)}</a>`);
              } else if (item.type === "delete") {
                _push(`<a href="javascript:;" class="flex items-center px-6 py-3 hover:bg-gray-100 hover:text-red-500" data-v-aed837e7><i class="${ssrRenderClass(`w-4 mr-2 text-center fas fa-trash`)}" data-v-aed837e7></i> ${ssrInterpolate(item.text)}</a>`);
              } else {
                _push(`<!---->`);
              }
              _push(`<!--]-->`);
            }
            if (index < __props.items.length - 1) {
              _push(`<div class="dropdown-divider" data-v-aed837e7></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<!--]-->`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/datatable/partials/__table-dropdown.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const TableDropdown = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-aed837e7"]]);
const _sfc_main$3 = {
  components: {
    TableCheckbox,
    TableDropdown,
    Modal: _sfc_main$d
  },
  setup(props, { emit }) {
    inject("events");
    const tableColumns = ref(props.columns);
    const updated = ref(true);
    const ready = ref(false);
    watchEffect(() => {
      props.data.length;
      updated.value = false;
      setTimeout(() => {
        emit("loaded", true);
        updated.value = true;
      }, 50);
    });
    const init = () => {
    };
    const getClasses = (column) => {
      let contentClass = column.contentClass ?? "";
      let nowrapClass = column.nowrap ? "whitespace-nowrap" : "";
      return `${contentClass} ${nowrapClass}`;
    };
    const printItem = (row, column) => {
      if (column.template === "dropdown") return "";
      const value = getRawValue(row, column);
      if (column.template) {
        switch (column.template) {
          case "ago":
            return formatDateAgo(value);
          case "date":
            return formatDate(value, false);
          case "datetime":
            return formatDate(value, true);
          case "yesno":
            return yesno(value);
          case "active":
            return active(value);
          default:
            return value;
        }
      }
      if (column.formatter && typeof column.formatter === "function") {
        return column.formatter(value, row);
      }
      return value;
    };
    const getRawValue = (row, column) => {
      var _a;
      if (column.name.includes(".")) {
        const [prop, value] = column.name.split(".");
        return ((_a = row[prop]) == null ? void 0 : _a[value]) || "";
      }
      return row[column.name] ?? "";
    };
    const getValue = (row, column) => {
      if (column.template === "dropdown") {
        if (typeof column.formatter === "function") {
          return column.formatter(null, row);
        }
        return column.dropdownData || [];
      }
      if (typeof column.formatter === "function") {
        return column.formatter(getRawValue(row, column), row);
      }
      return getRawValue(row, column);
    };
    const formatDate = (date, showTime) => {
      if (date.indexOf("/") >= 0) return date;
      if (showTime) {
        return moment$1(date).format("DD/MM/YYYY hh:mm");
      } else {
        return moment$1(date).format("DD/MM/YYYY");
      }
    };
    const formatDateAgo = (date) => {
      return moment$1(date).fromNow();
    };
    const yesno = (value) => {
      if (value === "S" || value === "1" || parseInt(value) === 1) {
        return '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white">SIM</span>';
      } else {
        return '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-500 text-white">NÃO</span>';
      }
    };
    const active = (value) => {
      if (value === "S" || value === "1" || parseInt(value) === 1) {
        return '<span class="text-green-500"><i class="fa fa-check-circle"></i></span>';
      } else {
        return '<span class="text-gray-500"><i class="fa fa-circle-xmark"></i></span>';
      }
    };
    const toggle = (item) => {
      emit("toggle-item", item);
    };
    const handleClick = (item) => {
      emit("click", item);
    };
    onMounted(init);
    return {
      tableColumns,
      ready,
      updated,
      getValue,
      printItem,
      getClasses,
      toggle,
      handleClick,
      TableDropdown,
      Modal: _sfc_main$d
    };
  },
  props: {
    loading: { type: Boolean, default: false },
    columns: { type: Array, required: true, default: [] },
    data: { type: Array, required: false, default: [] },
    enableRowClick: { type: Boolean, default: false }
  }
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Modal = resolveComponent("Modal");
  const _component_table_checkbox = resolveComponent("table-checkbox");
  _push(`<tbody${ssrRenderAttrs(mergeProps({ class: "bg-white" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_Modal, null, null, _parent));
  _push(`<!--[-->`);
  ssrRenderList($props.data, (row) => {
    _push(`<tr class="${ssrRenderClass([{ "cursor-pointer": $props.enableRowClick }, "border-t border-b border-gray-200 hover:bg-gray-100"])}"><!--[-->`);
    ssrRenderList($setup.tableColumns, (column) => {
      _push(`<td class="${ssrRenderClass([$setup.getClasses(column), "px-3 py-3 text-sm font-light"])}">`);
      if (!column.checkbox) {
        _push(`<div>`);
        if (column.template === "dropdown" && $setup.updated) {
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent($setup.TableDropdown), {
            data: row.id,
            reference: row,
            items: $setup.getValue(row, column)
          }, null), _parent);
        } else if (!column.component) {
          _push(`<span>${$setup.printItem(row, column) ?? ""}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (column.component && $setup.updated) {
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(column.component), {
            readonly: column.readonly || false,
            data: $setup.getValue(row, column),
            reference: row
          }, null), _parent);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (column.checkbox && $setup.updated) {
        _push(`<div class="text-center">`);
        _push(ssrRenderComponent(_component_table_checkbox, {
          value: $setup.getValue(row, column),
          onToggle: $setup.toggle
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</td>`);
    });
    _push(`<!--]--></tr>`);
  });
  _push(`<!--]--></tbody>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/datatable/partials/__table-content.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const TableContent = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3]]);
const _sfc_main$2 = {
  watch: {
    current_page: function() {
      this.setPages();
    },
    per_page: function() {
      this.setPages();
    }
  },
  setup(props, { emit }) {
    const range = ref(10);
    const pageList = ref([]);
    const goto = (page) => {
      emit("change-page", page);
    };
    const select = (page) => {
      emit("change-page", page);
    };
    const setPages = () => {
      if (props.total === null) return;
      pageList.value = [];
      let pages = [];
      for (let i = 1; i <= parseInt(props.last_page); i++) {
        pages.push(i);
      }
      if (props.last_page > range.value) {
        let index = Math.ceil(props.current_page - range.value / 2);
        if (index < 0) index = 0;
        if (index + range.value > props.last_page) index = props.last_page - range.value;
        pageList.value = pages.slice(index, index + range.value);
      } else {
        pageList.value = pages;
      }
    };
    onMounted(setPages);
    return {
      range,
      pageList,
      setPages,
      goto,
      select
    };
  },
  props: {
    current_page: { default: null },
    from: { default: null },
    to: { default: null },
    total: { default: null },
    per_page: { default: null },
    last_page: { default: null }
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($props.total > 0) {
    _push(`<div${ssrRenderAttrs(_attrs)}><nav class="flex justify-end"><ul class="flex"><li class="${ssrRenderClass({ "opacity-50 cursor-not-allowed": $props.current_page === 1 })}"><a class="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50" href="javascript:"><i class="fa fa-angles-left"></i></a></li><li class="${ssrRenderClass({ "opacity-50 cursor-not-allowed": $props.current_page === 1 })}"><a class="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50" href="javascript:"><i class="fa fa-chevron-left"></i></a></li><!--[-->`);
    ssrRenderList($setup.pageList, (page) => {
      _push(`<li><a class="${ssrRenderClass([{
        "z-10 border-primary bg-primary/10 text-primary font-semibold": page === $props.current_page,
        "border-gray-300 bg-white text-gray-500 hover:bg-gray-50": page !== $props.current_page
      }, "inline-flex items-center justify-center px-3 py-2 text-sm font-medium leading-none border"])}" href="javascript:">${ssrInterpolate(page)}</a></li>`);
    });
    _push(`<!--]--><li class="${ssrRenderClass({ "opacity-50 cursor-not-allowed": $props.last_page === $props.current_page })}"><a class="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50" href="javascript:"><i class="fa fa-chevron-right"></i></a></li><li class="${ssrRenderClass({ "opacity-50 cursor-not-allowed": $props.last_page === $props.current_page })}"><a class="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50" href="javascript:"><i class="fa fa-angles-right"></i></a></li></ul></nav></div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/datatable/partials/__table-pagination.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const TablePagination = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$1 = {
  name: "table-loading"
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "absolute inset-0 z-10" }, _attrs))}><div class="absolute inset-0 flex items-center justify-center z-20"><div class="text-blue-500"><i class="fa fa-sync-alt text-4xl animate-spin"></i></div></div><div class="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm z-10"></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/datatable/partials/__table-loading.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const TableLoading = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = defineComponent({
  name: "datatable",
  components: {
    TableHeader,
    TableContent,
    TablePagination,
    TableLoading
  },
  setup(props, { emit }) {
    const selection = ref({ id: props.id, all: false, items: [], total: 0, selected: 0 });
    const filterStore = useTableFilters();
    const { getFilters } = filterStore;
    const events = inject("events");
    const confirmation = ref({});
    const params = ref({});
    const current_page = ref(1);
    const per_page = ref(10);
    const loading = ref(false);
    const error = ref(false);
    const pageData = ref([]);
    const ready = ref(false);
    const from = ref(null);
    const to = ref(null);
    const total = ref(0);
    const last_page = ref(0);
    const headerComponent = ref();
    const init = () => {
      loadDefaultParams();
      params.value.current_page = current_page.value = 1;
      events.on("table-filter", onTableFilter);
      if (props.watchReloadEvent) {
        events.on("table-reload", () => {
          loadData(true);
        });
      }
      events.on("table-delete-item", (data) => {
        emit("delete", data);
      });
      loadData();
    };
    const onLoaded = () => {
      emit("loaded", true);
      let items = document.querySelectorAll(`#table-${props.id} [data-event]`);
      items.forEach((item) => {
        item.addEventListener("click", () => {
          const event = item.dataset.event;
          const data = JSON.parse(item.dataset.json);
          emit(event, data);
        });
      });
      let actionItems = document.querySelectorAll(`#table-${props.id} [data-action]`);
      actionItems.forEach((item) => {
        item.addEventListener("click", () => {
          const action = item.dataset.action;
          switch (action) {
            case "confirmation":
              events.emit("confirmation", {
                title: item.dataset.title || "Confirmação",
                data: JSON.parse(item.dataset.json),
                message: item.dataset.message || "Você deseja realmente fazer isso?",
                event: item.dataset.event
              });
              break;
            case "delete":
              events.emit("confirmation", {
                title: item.dataset.title || "Confirmação",
                data: JSON.parse(item.dataset.json),
                message: item.dataset.message || "Você deseja realmente excluir este registro?",
                event: "table-delete-item"
              });
              break;
            case "popup":
              const component = item.dataset.component;
              if (component) {
                const data = JSON.parse(item.dataset.json ?? null);
                const size = item.dataset.size ?? null;
                const title = item.dataset.title ?? null;
                events.emit("popup", {
                  component,
                  data,
                  size,
                  title
                });
              }
              break;
          }
        });
      });
      if (props.checkboxEnabled) applySelection();
    };
    const loadDefaultParams = () => {
      if (props.id) {
        let savedParams = localStorage.getItem(`table-${props.id}-params`);
        if (savedParams) {
          let newParams = {};
          for (const [key, value] of Object.entries(JSON.parse(savedParams))) {
            if (key.lastIndexOf("keyword") === -1)
              newParams[key] = value;
          }
          params.value = newParams;
        }
      }
    };
    const onTableFilter = (data) => {
      let newParams = {};
      for (const [key, value] of Object.entries(data)) {
        newParams[key] = value;
      }
      params.value = newParams;
      loadData();
    };
    const changePerPage = () => {
      current_page.value = 1;
      params.value.per_page = per_page.value;
      params.value.current_page = current_page.value = 1;
      loadData();
    };
    const sort = (data) => {
      params.value.sort = data.column;
      params.value.sort_direction = data.direction;
      emit("sort", data);
      loadData();
    };
    const applyFilter = () => {
      params.value.current_page = current_page.value = 1;
      loadData();
    };
    const loadData = async (quiet = false) => {
      if (!quiet) loading.value = true;
      error.value = false;
      try {
        const baseUrl = props.source.indexOf("?") > 0 ? `${props.source}&` : `${props.source}?`;
        const url = `${baseUrl}${getJsonParameters()}`;
        const response = await axios.get(url);
        pageData.value = response.data.data;
        parseHeaderData(response.data.data, response.data.filter_options ?? null);
        params.value.current_page = current_page.value = response.data.current_page;
        from.value = response.data.from;
        to.value = response.data.to;
        total.value = response.data.total;
        params.value.per_page = per_page.value = response.data.per_page;
        last_page.value = response.data.last_page;
        ready.value = true;
        selection.value.total = total.value;
        if (props.id) {
          localStorage.setItem(`table-${props.id}-params`, JSON.stringify(params.value));
        }
        headerComponent.value.dataLoaded(params.value);
      } catch (err) {
        error.value = true;
        emit("data-load-error", true);
      } finally {
        loading.value = false;
      }
    };
    const parseHeaderData = (data, options = null) => {
      if (!options) return;
      props.columns.map((col) => {
        if (!!options[col.name]) {
          col.filter = options[col.name];
        }
      });
    };
    const changePage = (page) => {
      params.value.current_page = current_page.value = page;
      emit("page-change", page);
      loadData();
    };
    const getTableFilters = () => {
      let filters = getFilters(props.id);
      return Object.assign(params.value, filters);
    };
    const getJsonParameters = () => {
      let str = [];
      for (let p in params.value) {
        if (params.value.hasOwnProperty(p) && params.value[p] !== null) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(params.value[p]));
        }
      }
      let filters = getFilters(props.id);
      for (let p in filters) {
        if (filters.hasOwnProperty(p) && filters[p] !== null) {
          if (typeof filters[p] === "object") {
            filters[p].map((filterItem) => {
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(filterItem));
            });
          } else {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(filters[p]));
          }
        }
      }
      return str.join("&");
    };
    const toggleAll = (item) => {
      selection.value.all = item.checked;
      selection.value.items = [];
      if (item.checked) {
        selection.value.selected = selection.value.total - selection.value.items.length;
      } else {
        selection.value.selected = 0;
      }
      events.emit("table-toggle-all", item.checked);
      events.emit("table-item-select", { items: selection.value, filters: getTableFilters() });
      applySelection();
    };
    const toggleItem = (item) => {
      if (selection.value.all) {
        if (item.checked) {
          selection.value.items = selection.value.items.filter((i) => i !== item.value);
        } else {
          selection.value.items.push(item.value);
        }
        selection.value.selected = selection.value.total - selection.value.items.length;
      } else {
        if (item.checked) {
          selection.value.items.push(item.value);
        } else {
          selection.value.items = selection.value.items.filter((i) => i !== item.value);
        }
        selection.value.selected = selection.value.items.length;
      }
      events.emit("table-item-select", { items: selection.value, filters: getTableFilters() });
    };
    const applySelection = () => {
      setTimeout(() => {
        let checkAll = document.getElementById("table-checkbox-all");
        if (checkAll) checkAll.checked = selection.value.all;
        let items = document.querySelectorAll(".table-checkbox");
        items.forEach((item) => {
          if (item.value !== "all") {
            if (selection.value.all)
              item.checked = !selection.value.items.includes(item.id.replace("table-checkbox-", ""));
            else
              item.checked = selection.value.items.includes(item.id.replace("table-checkbox-", ""));
          }
        });
      }, 50);
    };
    const handleClick = (item) => {
      emit("row-click", item);
    };
    onMounted(init);
    return {
      confirmation,
      params,
      current_page,
      per_page,
      pageData,
      loading,
      error,
      ready,
      from,
      to,
      total,
      last_page,
      headerComponent,
      selection,
      loadData,
      applyFilter,
      onLoaded,
      changePage,
      changePerPage,
      sort,
      toggleItem,
      toggleAll,
      handleClick
    };
  },
  props: {
    id: { type: String, required: false },
    columns: { type: Array, required: true },
    source: { type: String, required: false, default: null },
    data: { type: Array, required: false, default: null },
    itemsPerPage: { type: Number, default: 10 },
    checkboxEnabled: { type: Boolean, required: false, default: false },
    checkboxLabel: { type: String, required: false, default: "ID" },
    disablePagination: { type: Boolean, default: false },
    enableRowClick: { type: Boolean, default: false },
    watchReloadEvent: { type: Boolean, default: true }
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_table_loading = resolveComponent("table-loading");
  const _component_table_header = resolveComponent("table-header");
  const _component_table_content = resolveComponent("table-content");
  const _component_table_pagination = resolveComponent("table-pagination");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))} data-v-55e7f18e>`);
  if (_ctx.loading) {
    _push(ssrRenderComponent(_component_table_loading, null, null, _parent));
  } else {
    _push(`<!---->`);
  }
  ssrRenderSlot(_ctx.$slots, "default", {}, () => {
    if (_ctx.checkboxEnabled) {
      _push(`<div class="text-center" data-v-55e7f18e><h3 class="font-bold text-gray-400" data-v-55e7f18e>Selected ${ssrInterpolate(_ctx.selection.selected)} of ${ssrInterpolate(_ctx.selection.total)} item(s)</h3></div>`);
    } else {
      _push(`<!---->`);
    }
  }, _push, _parent);
  _push(`<table class="min-w-full divide-y divide-gray-200 hover:table"${ssrRenderAttr("id", `table-${_ctx.id}`)} data-v-55e7f18e>`);
  if (_ctx.params) {
    _push(ssrRenderComponent(_component_table_header, {
      columns: _ctx.columns,
      table: _ctx.id,
      params: _ctx.params,
      onSort: _ctx.sort,
      onToggleAll: _ctx.toggleAll,
      onFilter: _ctx.applyFilter,
      ref: "headerComponent"
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  if (_ctx.pageData.length > 0) {
    _push(ssrRenderComponent(_component_table_content, {
      "enable-row-click": _ctx.enableRowClick,
      onLoaded: _ctx.onLoaded,
      columns: _ctx.columns,
      data: _ctx.pageData,
      loading: _ctx.loading,
      onToggleItem: _ctx.toggleItem,
      onClick: _ctx.handleClick
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`</table>`);
  if (_ctx.total > 0 && !_ctx.disablePagination) {
    _push(`<div class="flex justify-between gap-4 mt-4 w-100" data-v-55e7f18e><div class="flex items-center gap-3" data-v-55e7f18e><div class="col-span-2" data-v-55e7f18e><select class="block w-full min-w-[200px] px-3 py-1.5 text-sm border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" data-v-55e7f18e><option value="10" data-v-55e7f18e${ssrIncludeBooleanAttr(Array.isArray(_ctx.per_page) ? ssrLooseContain(_ctx.per_page, "10") : ssrLooseEqual(_ctx.per_page, "10")) ? " selected" : ""}>10 itens por página</option><option value="25" data-v-55e7f18e${ssrIncludeBooleanAttr(Array.isArray(_ctx.per_page) ? ssrLooseContain(_ctx.per_page, "25") : ssrLooseEqual(_ctx.per_page, "25")) ? " selected" : ""}>25 itens por página</option><option value="50" data-v-55e7f18e${ssrIncludeBooleanAttr(Array.isArray(_ctx.per_page) ? ssrLooseContain(_ctx.per_page, "50") : ssrLooseEqual(_ctx.per_page, "50")) ? " selected" : ""}>50 itens por página</option><option value="100" data-v-55e7f18e${ssrIncludeBooleanAttr(Array.isArray(_ctx.per_page) ? ssrLooseContain(_ctx.per_page, "100") : ssrLooseEqual(_ctx.per_page, "100")) ? " selected" : ""}>100 itens por página</option><option value="999999999" data-v-55e7f18e${ssrIncludeBooleanAttr(Array.isArray(_ctx.per_page) ? ssrLooseContain(_ctx.per_page, "999999999") : ssrLooseEqual(_ctx.per_page, "999999999")) ? " selected" : ""}>Exibir tudo</option></select></div><div class="col-span-3" data-v-55e7f18e><p class="text-sm" data-v-55e7f18e> Exibindo registros de ${ssrInterpolate(_ctx.from)} a ${ssrInterpolate(_ctx.to)}</p></div></div><div class="col-span-7" data-v-55e7f18e>`);
    if (!_ctx.loading) {
      _push(ssrRenderComponent(_component_table_pagination, {
        onChangePage: _ctx.changePage,
        current_page: _ctx.current_page,
        from: _ctx.from,
        to: _ctx.to,
        total: _ctx.total,
        per_page: _ctx.per_page,
        last_page: _ctx.last_page
      }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    _push(`</div></div>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.total === 0) {
    _push(`<div class="py-4 text-center" data-v-55e7f18e><p data-v-55e7f18e> Sem registros para exibir </p></div>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.error) {
    _push(`<div class="py-2 text-center" data-v-55e7f18e><p class="px-4 py-2 text-sm text-red-700 bg-red-100 rounded" data-v-55e7f18e><i class="fa fa-exclamation-circle" data-v-55e7f18e></i> Erro ao tentar exibir dados. <strong data-v-55e7f18e><button type="button" class="px-2 py-1 ml-2 text-sm text-white bg-red-600 rounded" data-v-55e7f18e><i class="fa fa-sync" data-v-55e7f18e></i> Recarregar </button></strong></p></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/datatable/Datatable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Datatable = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-55e7f18e"]]);
export {
  Datatable as D
};

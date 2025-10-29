import { defineComponent, inject, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSlot } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PopupButton",
  __ssrInlineRender: true,
  props: {
    title: { default: "Título" },
    component: { default: null },
    data: { default: null },
    size: { default: "lg" },
    id: { default: null },
    variant: { default: "primary" }
  },
  setup(__props) {
    inject("events");
    const variantClasses = {
      primary: "bg-primary hover:bg-primary-hover text-white focus:ring-[#2d6ab8]",
      secondary: "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500",
      success: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500",
      danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
      warning: "bg-yellow-500 hover:bg-yellow-600 text-black focus:ring-yellow-400",
      info: "bg-cyan-600 hover:bg-cyan-700 text-white focus:ring-cyan-500"
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: [
          "flex items-center px-4 py-2 text-sm font-medium text-white transition duration-200 rounded-lg bg-primary hover:bg-primary-hover",
          variantClasses[__props.variant]
        ]
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PopupButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

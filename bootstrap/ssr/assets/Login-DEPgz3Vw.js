import { ref, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderDynamicModel, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderComponent } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Login",
  __ssrInlineRender: true,
  setup(__props) {
    const showPassword = ref(false);
    const form = useForm({
      email: "",
      password: "",
      remember: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "login-container" }, _attrs))} data-v-5ce49917><div class="background" data-v-5ce49917><div class="background-overlay" data-v-5ce49917></div><div class="background-pattern" data-v-5ce49917></div></div><div class="container" data-v-5ce49917><div class="login-card" data-v-5ce49917><div class="login-header" data-v-5ce49917><div class="logo-container mx-auto" data-v-5ce49917><div class="logo" data-v-5ce49917><i class="fas fa-cross" data-v-5ce49917></i></div></div><h1 class="login-title" data-v-5ce49917>Paróquia São Benedito</h1><p class="login-subtitle" data-v-5ce49917>Arquidiocese de Cuiabá</p></div><div class="login-body" data-v-5ce49917><p class="welcome-text" data-v-5ce49917> Bem-vindo(a) ao <strong data-v-5ce49917>Sistema Paroquial</strong>.<br data-v-5ce49917> Por favor, faça login para continuar. </p><form data-v-5ce49917><div class="form-group" data-v-5ce49917><label class="form-label" for="email" data-v-5ce49917><i class="fas fa-envelope" data-v-5ce49917></i> E-mail </label><div class="input-wrapper" data-v-5ce49917><input type="email" id="email"${ssrRenderAttr("value", unref(form).email)} placeholder="seu@email.com" class="${ssrRenderClass([{ "input-error": unref(form).errors.email }, "form-input"])}" required autocomplete="email" data-v-5ce49917><i class="fas fa-envelope input-icon" data-v-5ce49917></i></div>`);
      if (unref(form).errors.email) {
        _push(`<span class="error-message" data-v-5ce49917>${ssrInterpolate(unref(form).errors.email)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="form-group" data-v-5ce49917><label class="form-label" for="password" data-v-5ce49917><i class="fas fa-lock" data-v-5ce49917></i> Senha </label><div class="input-wrapper" data-v-5ce49917><input${ssrRenderAttr("type", showPassword.value ? "text" : "password")} id="password"${ssrRenderDynamicModel(showPassword.value ? "text" : "password", unref(form).password, null)} placeholder="Digite sua senha" class="${ssrRenderClass([{ "input-error": unref(form).errors.password }, "form-input"])}" required autocomplete="current-password" data-v-5ce49917><i class="fas fa-lock input-icon" data-v-5ce49917></i><button type="button" class="toggle-password" tabindex="-1" data-v-5ce49917><i class="${ssrRenderClass(showPassword.value ? "fas fa-eye-slash" : "fas fa-eye")}" data-v-5ce49917></i></button></div>`);
      if (unref(form).errors.password) {
        _push(`<span class="error-message" data-v-5ce49917>${ssrInterpolate(unref(form).errors.password)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="checkbox-group" data-v-5ce49917><input type="checkbox" id="remember"${ssrIncludeBooleanAttr(Array.isArray(unref(form).remember) ? ssrLooseContain(unref(form).remember, null) : unref(form).remember) ? " checked" : ""} class="checkbox-input" data-v-5ce49917><label for="remember" class="checkbox-label" data-v-5ce49917> Lembrar-me neste dispositivo </label></div>`);
      if (unref(form).errors.general) {
        _push(`<div class="alert-error" data-v-5ce49917><i class="fas fa-exclamation-circle" data-v-5ce49917></i> ${ssrInterpolate(unref(form).errors.general)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit" class="${ssrRenderClass([{ "loading": unref(form).processing }, "btn-login"])}"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} data-v-5ce49917><span class="btn-text" data-v-5ce49917><i class="fas fa-sign-in-alt" data-v-5ce49917></i> Entrar no Sistema </span><div class="loading-spinner" data-v-5ce49917></div></button><div class="forgot-password" data-v-5ce49917>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/recuperar-senha",
        class: "link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fas fa-question-circle" data-v-5ce49917${_scopeId}></i> Esqueceu sua senha? `);
          } else {
            return [
              createVNode("i", { class: "fas fa-question-circle" }),
              createTextVNode(" Esqueceu sua senha? ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></form></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5ce49917"]]);
export {
  Login as default
};

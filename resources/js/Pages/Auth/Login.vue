<template>
    <div class="login-container">
        <div class="background">
            <div class="background-overlay"></div>
            <div class="background-pattern"></div>
        </div>

        <div class="container">
            <div class="login-card">
                <!-- Header -->
                <div class="login-header">
                    <div class="logo-container mx-auto">
                        <div class="logo">
                            <i class="fas fa-cross"></i>
                        </div>
                    </div>
                    <h1 class="login-title">Paróquia São Benedito</h1>
                    <p class="login-subtitle">Arquidiocese de Cuiabá</p>
                </div>

                <!-- Body -->
                <div class="login-body">
                    <p class="welcome-text">
                        Bem-vindo(a) ao <strong>Sistema Paroquial</strong>.<br>
                        Por favor, faça login para continuar.
                    </p>

                    <form @submit.prevent="handleSubmit">
                        <!-- Email -->
                        <div class="form-group">
                            <label class="form-label" for="email">
                                <i class="fas fa-envelope"></i>
                                E-mail
                            </label>
                            <div class="input-wrapper">
                                <input
                                    type="email"
                                    id="email"
                                    v-model="form.email"
                                    class="form-input"
                                    placeholder="seu@email.com"
                                    :class="{ 'input-error': form.errors.email }"
                                    required
                                    autocomplete="email"
                                >
                                <i class="fas fa-envelope input-icon"></i>
                            </div>
                            <span v-if="form.errors.email" class="error-message">
                                {{ form.errors.email }}
                            </span>
                        </div>

                        <!-- Senha -->
                        <div class="form-group">
                            <label class="form-label" for="password">
                                <i class="fas fa-lock"></i>
                                Senha
                            </label>
                            <div class="input-wrapper">
                                <input
                                    :type="showPassword ? 'text' : 'password'"
                                    id="password"
                                    v-model="form.password"
                                    class="form-input"
                                    placeholder="Digite sua senha"
                                    :class="{ 'input-error': form.errors.password }"
                                    required
                                    autocomplete="current-password"
                                >
                                <i class="fas fa-lock input-icon"></i>
                                <button
                                    type="button"
                                    @click="showPassword = !showPassword"
                                    class="toggle-password"
                                    tabindex="-1"
                                >
                                    <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                                </button>
                            </div>
                            <span v-if="form.errors.password" class="error-message">
                                {{ form.errors.password }}
                            </span>
                        </div>

                        <!-- Lembrar-me -->
                        <div class="checkbox-group">
                            <input
                                type="checkbox"
                                id="remember"
                                v-model="form.remember"
                                class="checkbox-input"
                            >
                            <label for="remember" class="checkbox-label">
                                Lembrar-me neste dispositivo
                            </label>
                        </div>

                        <!-- Mensagem de erro geral -->
                        <div v-if="form.errors.general" class="alert-error">
                            <i class="fas fa-exclamation-circle"></i>
                            {{ form.errors.general }}
                        </div>

                        <!-- Botão de login -->
                        <button
                            type="submit"
                            class="btn-login"
                            :class="{ 'loading': form.processing }"
                            :disabled="form.processing"
                        >
                            <span class="btn-text">
                                <i class="fas fa-sign-in-alt"></i>
                                Entrar no Sistema
                            </span>
                            <div class="loading-spinner"></div>
                        </button>

                        <!-- Esqueci a senha -->
                        <div class="forgot-password">
                            <Link href="/recuperar-senha" class="link">
                                <i class="fas fa-question-circle"></i>
                                Esqueceu sua senha?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useForm, Link } from '@inertiajs/vue3';

const showPassword = ref(false);

const form = useForm({
    email: '',
    password: '',
    remember: false
});

const handleSubmit = () => {
    form.post('/login', {
        onFinish: () => {
            // Limpar apenas a senha após tentativa de login
            form.password = '';
        },
        onError: (errors) => {
            // Erros serão automaticamente adicionados a form.errors
            console.error('Erro no login:', errors);
        }
    });
};
</script>

<style scoped>
.login-container {
    position: relative;
    min-height: 90vh;
    overflow: hidden;
}

/* Background com overlay */
.background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/public/images/1-grande.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 0;
}

.background-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(2px);
}

/* Padrão decorativo */
.background-pattern {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: 60px 60px;
}

/* Container principal - CENTRALIZAÇÃO PERFEITA */
.container {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100%;
    padding: 20px;
    margin: 0 auto;
}

/* Card de login */
.login-card {
    background: rgba(255, 255, 255, 0.98);
    border-radius: 24px;
    box-shadow:
        0 20px 60px rgba(0, 0, 0, 0.3),
        0 0 100px rgba(251, 191, 36, 0.15);
    width: 100%;
    max-width: 460px;
    overflow: hidden;
    animation: slideUp 0.6s ease-out;
    margin: auto;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Header do card */
.login-header {
    background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #155D34 100%);
    padding: 40px 30px;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.login-header::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%);
    animation: rotate 20s linear infinite;
}

@keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.logo-container {
    position: relative;
    z-index: 1;
    margin-bottom: 20px;
}

.logo {
    width: 90px;
    height: 90px;
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    box-shadow:
        0 8px 20px rgba(0, 0, 0, 0.3),
        0 0 0 6px rgba(251, 191, 36, 0.3);
    animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

.logo i {
    font-size: 48px;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.login-title {
    position: relative;
    z-index: 1;
    color: #fbbf24;
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 8px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    font-family: Georgia, serif;
}

.login-subtitle {
    position: relative;
    z-index: 1;
    color: rgba(255, 255, 255, 0.95);
    font-size: 14px;
    font-style: italic;
}

/* Corpo do card */
.login-body {
    padding: 40px 30px;
}

.welcome-text {
    text-align: center;
    color: #374151;
    font-size: 16px;
    margin-bottom: 30px;
    line-height: 1.5;
}

.welcome-text strong {
    color: #1e3a8a;
    font-weight: 600;
}

/* Form groups */
.form-group {
    margin-bottom: 24px;
}

.form-label {
    display: block;
    color: #374151;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 6px;
}

.form-label i {
    color: #1d4ed8;
    font-size: 16px;
}

.input-wrapper {
    position: relative;
}

.form-input {
    width: 100%;
    padding: 14px 16px 14px 44px;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    font-size: 15px;
    transition: all 0.3s ease;
    background: white;
}

.form-input:focus {
    outline: none;
    border-color: #1d4ed8;
    box-shadow: 0 0 0 4px rgba(29, 78, 216, 0.1);
}

.form-input.input-error {
    border-color: #ef4444;
}

.input-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    font-size: 18px;
    pointer-events: none;
}

.form-input:focus ~ .input-icon {
    color: #1d4ed8;
}

.toggle-password {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #9ca3af;
    cursor: pointer;
    padding: 4px;
    transition: color 0.3s ease;
}

.toggle-password:hover {
    color: #1d4ed8;
}

.error-message {
    display: block;
    color: #ef4444;
    font-size: 13px;
    margin-top: 6px;
    font-weight: 500;
}

/* Checkbox */
.checkbox-group {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 24px;
}

.checkbox-input {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #1d4ed8;
}

.checkbox-label {
    color: #6b7280;
    font-size: 14px;
    cursor: pointer;
    user-select: none;
}

/* Alert */
.alert-error {
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 8px;
    padding: 12px 16px;
    color: #dc2626;
    font-size: 14px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.alert-error i {
    font-size: 16px;
}

/* Botões */
.btn-login {
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-shadow: 0 4px 12px rgba(29, 78, 216, 0.3);
}

.btn-login:hover:not(:disabled) {
    background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(29, 78, 216, 0.4);
}

.btn-login:active:not(:disabled) {
    transform: translateY(0);
}

.btn-login:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.btn-login i {
    font-size: 18px;
}

/* Loading */
.loading-spinner {
    display: none;
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.btn-login.loading .btn-text {
    display: none;
}

.btn-login.loading .loading-spinner {
    display: block;
}

/* Links */
.forgot-password {
    text-align: center;
    margin-top: 20px;
}

.link {
    color: #1d4ed8;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.3s ease;
}

.link:hover {
    color: #1e40af;
    text-decoration: underline;
}

.link-secondary {
    color: #1d4ed8;
    text-decoration: none;
    font-weight: 500;
    font-size: 14px;
    transition: color 0.3s ease;
}

.link-secondary:hover {
    color: #1e40af;
    text-decoration: underline;
}

/* Divider */
.divider {
    display: flex;
    align-items: center;
    margin: 30px 0;
    color: #9ca3af;
    font-size: 13px;
}

.divider::before,
.divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e5e7eb;
}

.divider span {
    padding: 0 16px;
}

/* Footer do card */
.login-footer {
    background: #f9fafb;
    padding: 24px 30px;
    text-align: center;
    border-top: 1px solid #e5e7eb;
}

.register-link {
    color: #6b7280;
    font-size: 14px;
}

.register-link a {
    color: #1d4ed8;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.3s ease;
}

.register-link a:hover {
    color: #1e40af;
    text-decoration: underline;
}

/* Responsivo */
@media (max-width: 640px) {
    .login-card {
        border-radius: 16px;
    }

    .login-header {
        padding: 30px 20px;
    }

    .logo {
        width: 75px;
        height: 75px;
    }

    .logo i {
        font-size: 38px;
    }

    .login-title {
        font-size: 24px;
    }

    .login-body {
        padding: 30px 20px;
    }

    .login-footer {
        padding: 20px;
    }
}
</style>

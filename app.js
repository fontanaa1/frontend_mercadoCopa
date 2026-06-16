// app.js - Mercado da Copa
import {
    carregarProdutos,
    carregarProdutoPorId,
    login,
    register,
    getCarrinho,
    addToCart,
    getUsuarioAtual
} from './js/api.js';

// Estado do aplicativo
const state = {
    user: null,
    token: null,
    produtos: [],
    carrinho: { itens: [], total: 0 }
};

// Salvar auth no localStorage
function saveAuth(user, token) {
    state.user = user;
    state.token = token;
    localStorage.setItem('mdc:auth', JSON.stringify({ user, token }));
}

// Carregar auth salv0
function loadAuth() {
    const saved = localStorage.getItem('mdc:auth');
    if (saved) {
        try {
            const { user, token } = JSON.parse(saved);
            state.user = user;
            state.token = token;
            return true;
        } catch (e) {
            localStorage.removeItem('mdc:auth');
        }
    }
    return false;
}

// Logout
window.logout = function () {
    state.user = null;
    state.token = null;
    localStorage.removeItem('mdc:auth');
    window.location.href = 'acesso.html';
};

// Carregar produtos na home
async function carregarProdutosNaHome() {
    if (!document.querySelector('#productsGrid')) return;
    // Lógica existente mantida...
}

// Setup do login
async function setupLogin() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        if (!email || !password) {
            if (window.showToast) window.showToast('⚠️ Preencha todos os campos!');
            return;
        }

        const result = await login(email, password);

        if (result.error) {
            if (window.showToast) window.showToast('❌ ' + (result.error.message || result.error));
            return;
        }

        if (result.session && result.session.access_token) {
            saveAuth(result.user, result.session.access_token);
            if (window.showToast) window.showToast('✅ Login realizado com sucesso! Redirecionando...');
            setTimeout(() => {
                window.location.href = 'telaprincipal.html';
            }, 1500);
        }
    });
}

// Setup do cadastro
async function setupRegister() {
    const registerForm = document.getElementById('registerForm');
    if (!registerForm) return;

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nome = document.getElementById('regNome').value.trim();
        const username = document.getElementById('regUsername').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const password = document.getElementById('regPassword').value;

        if (!nome || !username || !email || !password) {
            if (window.showToast) window.showToast('⚠️ Preencha todos os campos!');
            return;
        }

        const cleanUsername = username.replace('@', '');
        const result = await register(email, password, nome, cleanUsername);

        if (result.error) {
            if (window.showToast) window.showToast('❌ ' + (result.error.message || result.error));
            return;
        }

        if (window.showToast) window.showToast('🎉 Conta criada com sucesso! Redirecionando...');
        setTimeout(() => {
            window.location.href = 'acesso.html';
        }, 2000);
    });
}

// Atualizar badge do carrinho
async function atualizarBadgeCarrinho() {
    if (!state.token) return;

    const carrinho = await getCarrinho(state.token);
    if (carrinho && carrinho.itens && !carrinho.error) {
        const totalItens = carrinho.itens.reduce((sum, item) => sum + item.quantidade, 0);
        const badge = document.querySelector('.cart-badge');
        if (badge) {
            badge.textContent = totalItens;
        }
    }
}

// Verificar usuário logado (para perfil)
async function verificarUsuarioLogado() {
    if (!state.token) return null;

    const result = await getUsuarioAtual(state.token);
    if (!result.error) {
        const nomeElem = document.querySelector('.user-nome');
        if (nomeElem) nomeElem.textContent = result.user?.user_metadata?.nome || result.user?.email;
        return result.user;
    }
    return null;
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadAuth();
    setupLogin();
    setupRegister();
    verificarUsuarioLogado();
    atualizarBadgeCarrinho();
});
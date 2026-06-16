// js/api.js — Camada de comunicação com o backend do Mercado da Copa
// Todas as funções fazem fetch para a API Express rodando no backend.

const API_BASE = 'https://backend-mercado-copa.vercel.app/api'; // SEM barra no final

// ─── Sessão / Auth local (localStorage) ─────────────────────

const STORAGE_KEY = 'mdc:auth';

export function setSession(user, token) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }));
}

export function loadSession() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);
    } catch (_) { /* ignore */ }
    return null;
}

export function getToken() {
    const session = loadSession();
    return session?.token || null;
}

export function getUser() {
    const session = loadSession();
    return session?.user || null;
}

export function isAuthenticated() {
    return !!getToken();
}

export function clearSession() {
    localStorage.removeItem(STORAGE_KEY);
}

// ─── Helpers ────────────────────────────────────────────────

function authHeaders(token) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
}

async function request(path, options = {}) {
    // CORREÇÃO: Remove barras duplicadas na URL (ex: api//auth/login → api/auth/login)
    const url = `${API_BASE}${path}`.replace(/([^:]\/)\/+/g, "$1");
    try {
        const res = await fetch(url, options);
        const data = await res.json();
        if (!res.ok) {
            return { error: data.error || data.message || 'Erro desconhecido' };
        }
        return data;
    } catch (err) {
        console.error(`[API] Erro em ${path}:`, err);
        return { error: 'Não foi possível conectar ao servidor.' };
    }
}

// ─── AUTH ────────────────────────────────────────────────────

export async function login(email, password) {
    return request('/auth/login', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ email, password })
    });
}

export async function register(email, password, nome, username) {
    return request('/auth/register', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ email, password, nome, username })
    });
}

export async function logout(token) {
    return request('/auth/logout', {
        method: 'POST',
        headers: authHeaders(token)
    });
}

export async function getUsuarioAtual(token) {
    return request('/auth/me', {
        method: 'GET',
        headers: authHeaders(token)
    });
}

// ─── PRODUTOS ────────────────────────────────────────────────

export async function carregarProdutos(filtros = {}) {
    const params = new URLSearchParams();
    if (filtros.categoria) params.append('categoria', filtros.categoria);
    if (filtros.busca) params.append('busca', filtros.busca);
    if (filtros.minPreco) params.append('minPreco', filtros.minPreco);
    if (filtros.maxPreco) params.append('maxPreco', filtros.maxPreco);
    if (filtros.tipo_oferta) params.append('tipo_oferta', filtros.tipo_oferta);

    const query = params.toString();
    return request(`/produtos${query ? '?' + query : ''}`, {
        method: 'GET',
        headers: authHeaders()
    });
}

export async function carregarProdutoPorId(id) {
    return request(`/produtos/${id}`, {
        method: 'GET',
        headers: authHeaders()
    });
}

export async function criarProduto(token, dados) {
    return request('/produtos', {
        method: 'POST',
        headers: authHeaders(token),
        body: JSON.stringify(dados)
    });
}

export async function atualizarProduto(token, id, dados) {
    return request(`/produtos/${id}`, {
        method: 'PUT',
        headers: authHeaders(token),
        body: JSON.stringify(dados)
    });
}

export async function deletarProduto(token, id) {
    return request(`/produtos/${id}`, {
        method: 'DELETE',
        headers: authHeaders(token)
    });
}

export async function meusProdutos(token) {
    return request('/produtos/meus', {
        method: 'GET',
        headers: authHeaders(token)
    });
}

// ─── CARRINHO ────────────────────────────────────────────────

export async function getCarrinho(token) {
    return request('/carrinho', {
        method: 'GET',
        headers: authHeaders(token)
    });
}

export async function addToCart(token, produto_id, quantidade = 1) {
    return request('/carrinho', {
        method: 'POST',
        headers: authHeaders(token),
        body: JSON.stringify({ produto_id, quantidade })
    });
}

export async function atualizarItemCarrinho(token, itemId, quantidade) {
    return request(`/carrinho/${itemId}`, {
        method: 'PUT',
        headers: authHeaders(token),
        body: JSON.stringify({ quantidade })
    });
}

export async function removerItemCarrinho(token, itemId) {
    return request(`/carrinho/${itemId}`, {
        method: 'DELETE',
        headers: authHeaders(token)
    });
}

export async function limparCarrinho(token) {
    return request('/carrinho/limpar/tudo', {
        method: 'DELETE',
        headers: authHeaders(token)
    });
}

// ─── AVALIAÇÕES ──────────────────────────────────────────────

export async function getAvaliacoesVendedor(vendedorId) {
    return request(`/avaliacoes/vendedor/${vendedorId}`, {
        method: 'GET',
        headers: authHeaders()
    });
}

export async function criarAvaliacao(token, dados) {
    return request('/avaliacoes', {
        method: 'POST',
        headers: authHeaders(token),
        body: JSON.stringify(dados)
    });
}

export async function getMediaAvaliacao(vendedorId) {
    return request(`/avaliacoes/media/${vendedorId}`, {
        method: 'GET',
        headers: authHeaders()
    });
}

// ─── TROCAS ──────────────────────────────────────────────────

export async function getTrocas(token) {
    return request('/trocas', {
        method: 'GET',
        headers: authHeaders(token)
    });
}

export async function proporTroca(token, dados) {
    return request('/trocas', {
        method: 'POST',
        headers: authHeaders(token),
        body: JSON.stringify(dados)
    });
}

export async function responderTroca(token, trocaId, aceitar) {
    return request(`/trocas/${trocaId}/responder`, {
        method: 'PUT',
        headers: authHeaders(token),
        body: JSON.stringify({ aceitar })
    });
}

// ─── ENDEREÇOS ───────────────────────────────────────────────

export async function getEnderecos(token) {
    return request('/enderecos', {
        method: 'GET',
        headers: authHeaders(token)
    });
}

export async function getEnderecoPorId(token, id) {
    return request(`/enderecos/${id}`, {
        method: 'GET',
        headers: authHeaders(token)
    });
}

export async function criarEndereco(token, dados) {
    return request('/enderecos', {
        method: 'POST',
        headers: authHeaders(token),
        body: JSON.stringify(dados)
    });
}

export async function atualizarEndereco(token, id, dados) {
    return request(`/enderecos/${id}`, {
        method: 'PUT',
        headers: authHeaders(token),
        body: JSON.stringify(dados)
    });
}

export async function deletarEndereco(token, id) {
    return request(`/enderecos/${id}`, {
        method: 'DELETE',
        headers: authHeaders(token)
    });
}

// ─── PEDIDOS ─────────────────────────────────────────────────

export async function getPedidos(token) {
    return request('/pedidos', {
        method: 'GET',
        headers: authHeaders(token)
    });
}

export async function criarPedido(token, dados) {
    return request('/pedidos', {
        method: 'POST',
        headers: authHeaders(token),
        body: JSON.stringify(dados)
    });
}

export async function getPedidoPorId(token, id) {
    return request(`/pedidos/${id}`, {
        method: 'GET',
        headers: authHeaders(token)
    });
}

// ─── NOTIFICAÇÕES ────────────────────────────────────────────

export async function getNotificacoes(token) {
    return request('/notificacoes', {
        method: 'GET',
        headers: authHeaders(token)
    });
}

export async function marcarNotificacaoLida(token, id) {
    return request(`/notificacoes/${id}/ler`, {
        method: 'PUT',
        headers: authHeaders(token)
    });
}

export async function marcarTodasNotificacoesLidas(token) {
    return request('/notificacoes/marcar-todas', {
        method: 'PUT',
        headers: authHeaders(token)
    });
}

// ─── ALIASES (usados pelos HTMLs) ────────────────────────────

export { limparCarrinho as clearCart };
export { deletarProduto as deletarProdutoBackend };

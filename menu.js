// menu.js - Menu Hamburguer Global para todas as páginas

(function() {
    "use strict";

    // Função para mostrar toast
    function showToast(message, isSuccess = true) {
        const existingToast = document.querySelector('.global-toast');
        if (existingToast) existingToast.remove();
        
        const toast = document.createElement('div');
        toast.className = 'global-toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: #003215;
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            z-index: 1002;
            animation: globalToastFadeInOut 3s ease-in-out;
            box-shadow: 4px 4px 0px 0px #fcd400;
            border: 1px solid #fcd400;
            white-space: nowrap;
        `;
        document.body.appendChild(toast);
        
        // Adicionar animação se não existir
        if (!document.querySelector('#global-toast-styles')) {
            const style = document.createElement('style');
            style.id = 'global-toast-styles';
            style.textContent = `
                @keyframes globalToastFadeInOut {
                    0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
                    15% { opacity: 1; transform: translateX(-50%) translateY(0); }
                    85% { opacity: 1; transform: translateX(-50%) translateY(0); }
                    100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => toast.remove(), 3000);
    }

    // Função para filtrar produtos (usada nas páginas que têm produtos)
    function filterByCategory(categoria) {
        closeSidebar();
        
        // Verificar se estamos na página principal
        if (window.location.pathname.includes('telaprincipal.html') || 
            window.location.pathname === '/' || 
            window.location.pathname === '/index.html') {
            
            // Tentar usar a função global se existir
            if (typeof window.applyCategoryFilter === 'function') {
                window.applyCategoryFilter(categoria);
            } else {
                // Salvar no localStorage para quando a página carregar
                localStorage.setItem('pendingCategoryFilter', categoria);
                window.location.href = 'telaprincipal.html';
            }
        } else {
            // Redirecionar para a página principal com o filtro
            localStorage.setItem('pendingCategoryFilter', categoria);
            window.location.href = 'telaprincipal.html';
        }
        
        const categoriaNome = {
            'todos': 'Todos os produtos',
            'camisas': 'Camisas',
            'casacos': 'Casacos e Jaquetas',
            'bones': 'Bonés',
            'chuteiras': 'Chuteiras',
            'bolas': 'Bolas',
            'acessorios': 'Acessórios'
        };
        showToast(`🔍 ${categoriaNome[categoria] || categoria}`);
    }

    // Função para redirecionar para páginas
    function navigateTo(page) {
        closeSidebar();
        window.location.href = page;
    }

    // Criar e injetar o HTML do sidebar
    function injectSidebar() {
        // Verificar se o sidebar já existe
        if (document.getElementById('global-sidebar')) return;
        
        const sidebarHTML = `
            <div id="global-sidebar-overlay" class="global-sidebar-overlay"></div>
            <div id="global-sidebar" class="global-sidebar">
                <div class="global-sidebar-header">
                    <h2>MERCADO DA COPA</h2>
                    <button id="global-close-sidebar" class="global-close-sidebar">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
                
                <!-- CATEGORIAS DE PRODUTOS -->
                <div class="global-sidebar-section">
                    <div class="global-sidebar-section-title">CATEGORIAS</div>
                    <div class="global-sidebar-item" data-categoria="todos" onclick="window.globalMenuFunctions.filterByCategory('todos')">
                        <span class="material-symbols-outlined">grid_view</span>
                        <span>Todos os Produtos</span>
                    </div>
                    <div class="global-sidebar-item" data-categoria="camisas" onclick="window.globalMenuFunctions.filterByCategory('camisas')">
                        <span class="material-symbols-outlined">sports_tshirt</span>
                        <span>Camisas</span>
                    </div>
                    <div class="global-sidebar-item" data-categoria="casacos" onclick="window.globalMenuFunctions.filterByCategory('casacos')">
                        <span class="material-symbols-outlined">hoodie</span>
                        <span>Casacos e Jaquetas</span>
                    </div>
                    <div class="global-sidebar-item" data-categoria="bones" onclick="window.globalMenuFunctions.filterByCategory('bones')">
                        <span class="material-symbols-outlined">style</span>
                        <span>Bonés</span>
                    </div>
                    <div class="global-sidebar-item" data-categoria="chuteiras" onclick="window.globalMenuFunctions.filterByCategory('chuteiras')">
                        <span class="material-symbols-outlined">sports_soccer</span>
                        <span>Chuteiras</span>
                    </div>
                    <div class="global-sidebar-item" data-categoria="bolas" onclick="window.globalMenuFunctions.filterByCategory('bolas')">
                        <span class="material-symbols-outlined">circle</span>
                        <span>Bolas</span>
                    </div>
                    <div class="global-sidebar-item" data-categoria="acessorios" onclick="window.globalMenuFunctions.filterByCategory('acessorios')">
                        <span class="material-symbols-outlined">watch</span>
                        <span>Acessórios</span>
                    </div>
                </div>
                
                <div class="global-sidebar-divider"></div>
                
                <!-- NAVEGAÇÃO DO SITE -->
                <div class="global-sidebar-section">
                    <div class="global-sidebar-section-title">NAVEGAÇÃO</div>
                    <div class="global-sidebar-item" onclick="window.globalMenuFunctions.navigateTo('telaprincipal.html')">
                        <span class="material-symbols-outlined">home</span>
                        <span>Início</span>
                    </div>
                    <div class="global-sidebar-item" onclick="window.globalMenuFunctions.navigateTo('carrinho.html')">
                        <span class="material-symbols-outlined">shopping_cart</span>
                        <span>Meu Carrinho</span>
                    </div>
                    <div class="global-sidebar-item" onclick="window.globalMenuFunctions.navigateTo('perfil.html')">
                        <span class="material-symbols-outlined">person</span>
                        <span>Meu Perfil</span>
                    </div>
                    <div class="global-sidebar-item" onclick="window.globalMenuFunctions.navigateTo('historico.html')">
                        <span class="material-symbols-outlined">history</span>
                        <span>Histórico de Pedidos</span>
                    </div>
                    <div class="global-sidebar-item" onclick="window.globalMenuFunctions.navigateTo('configuracoes.html')">
                        <span class="material-symbols-outlined">settings</span>
                        <span>Configurações</span>
                    </div>
                    <div class="global-sidebar-item" onclick="window.globalMenuFunctions.navigateTo('suporte.html')">
                        <span class="material-symbols-outlined">support_agent</span>
                        <span>Suporte ao Cliente</span>
                    </div>
                    <div class="global-sidebar-item" onclick="window.globalMenuFunctions.navigateTo('publicaritens.html')">
                        <span class="material-symbols-outlined">add_circle</span>
                        <span>Vender Item</span>
                    </div>
                </div>
                
                <div class="global-sidebar-divider"></div>
                
                <!-- ÁREA DO USUÁRIO -->
                <div class="global-sidebar-section">
                    <div class="global-sidebar-section-title">CONTA</div>
                    <div class="global-sidebar-item" onclick="window.globalMenuFunctions.navigateTo('acesso.html')">
                        <span class="material-symbols-outlined">logout</span>
                        <span>Sair da Conta</span>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', sidebarHTML);
        
        // Adicionar estilos do sidebar
        const styles = `
            <style id="global-sidebar-styles">
                /* Sidebar */
                .global-sidebar {
                    position: fixed;
                    top: 0;
                    left: -320px;
                    width: 320px;
                    height: 100%;
                    background: #f8f9fa;
                    border-right: 2px solid #003215;
                    z-index: 1000;
                    transition: left 0.3s ease-out;
                    overflow-y: auto;
                    box-shadow: 4px 0 20px rgba(0,0,0,0.1);
                }
                .global-sidebar.active {
                    left: 0;
                }
                .global-sidebar-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.5);
                    z-index: 999;
                    display: none;
                }
                .global-sidebar-overlay.active {
                    display: block;
                }
                .global-sidebar-header {
                    background: #003215;
                    color: white;
                    padding: 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .global-sidebar-header h2 {
                    font-family: 'Anton', sans-serif;
                    font-size: 24px;
                    letter-spacing: 0.02em;
                    text-transform: uppercase;
                    margin: 0;
                }
                .global-close-sidebar {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    padding: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    transition: background 0.2s;
                }
                .global-close-sidebar:hover {
                    background: rgba(255,255,255,0.2);
                }
                .global-sidebar-section {
                    padding: 8px 0;
                }
                .global-sidebar-section-title {
                    padding: 12px 20px 8px 20px;
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 11px;
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                    color: #705d00;
                    font-weight: 600;
                }
                .global-sidebar-item {
                    padding: 14px 20px;
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-family: 'Hanken Grotesk', sans-serif;
                    font-size: 16px;
                    font-weight: 500;
                    color: #191c1d;
                }
                .global-sidebar-item:hover {
                    background: #edeeef;
                    padding-left: 28px;
                }
                .global-sidebar-item .material-symbols-outlined {
                    font-size: 24px;
                    color: #003215;
                }
                .global-sidebar-divider {
                    height: 2px;
                    background: #c0c9be;
                    margin: 8px 0;
                }
                
                /* Botão do menu em todas as páginas */
                .global-menu-btn {
                    background: none;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 8px;
                    border-radius: 8px;
                    transition: background 0.2s;
                }
                .global-menu-btn:hover {
                    background: rgba(0,50,21,0.1);
                }
                .global-menu-btn .material-symbols-outlined {
                    font-size: 28px;
                    color: #003215;
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
        
        // Adicionar event listeners
        const sidebar = document.getElementById('global-sidebar');
        const overlay = document.getElementById('global-sidebar-overlay');
        const closeBtn = document.getElementById('global-close-sidebar');
        
        window.openSidebar = function() {
            if (sidebar) sidebar.classList.add('active');
            if (overlay) overlay.classList.add('active');
        };
        
        window.closeSidebar = function() {
            if (sidebar) sidebar.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
        };
        
        if (closeBtn) closeBtn.addEventListener('click', window.closeSidebar);
        if (overlay) overlay.addEventListener('click', window.closeSidebar);
        
        // Fechar com tecla ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && sidebar && sidebar.classList.contains('active')) {
                window.closeSidebar();
            }
        });
    }
    
    // Adicionar botão do menu em todas as páginas que não têm
    function injectMenuButton() {
        // Verificar se já existe um botão de menu na página
        if (document.querySelector('.global-menu-btn')) return;
        
        // Encontrar o header ou criar um container
        let header = document.querySelector('header');
        if (!header) {
            // Criar um header se não existir
            header = document.createElement('header');
            header.style.cssText = 'background: #f8f9fa; border-bottom: 2px solid #c0c9be; padding: 12px 20px; display: flex; align-items: center; gap: 16px; position: sticky; top: 0; z-index: 100;';
            document.body.insertBefore(header, document.body.firstChild);
        }
        
        // Verificar se o primeiro elemento do header é o botão de menu
        const firstChild = header.firstChild;
        if (firstChild && firstChild.classList && firstChild.classList.contains('global-menu-btn')) return;
        
        // Criar botão do menu
        const menuBtn = document.createElement('button');
        menuBtn.className = 'global-menu-btn';
        menuBtn.innerHTML = '<span class="material-symbols-outlined">menu</span>';
        menuBtn.addEventListener('click', window.openSidebar);
        
        // Inserir no início do header
        header.insertBefore(menuBtn, header.firstChild);
    }
    
    // Expor funções globalmente
    window.globalMenuFunctions = {
        filterByCategory: filterByCategory,
        navigateTo: navigateTo,
        showToast: showToast,
        closeSidebar: function() { if (window.closeSidebar) window.closeSidebar(); }
    };
    
    // Inicializar quando o DOM estiver pronto
    document.addEventListener('DOMContentLoaded', function() {
        injectSidebar();
        injectMenuButton();
        
        // Verificar se há um filtro pendente
        const pendingFilter = localStorage.getItem('pendingCategoryFilter');
        if (pendingFilter && (window.location.pathname.includes('telaprincipal.html') || 
            window.location.pathname === '/' || 
            window.location.pathname === '/index.html')) {
            localStorage.removeItem('pendingCategoryFilter');
            setTimeout(function() {
                if (typeof window.applyCategoryFilter === 'function') {
                    window.applyCategoryFilter(pendingFilter);
                }
            }, 500);
        }
    });
})();
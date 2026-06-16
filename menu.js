// frontend/menu.js - Menu Hambúrguer Global (sem duplicação)
(function() {
    "use strict";

    if (window.__menuInjected) return;
    window.__menuInjected = true;

    function openSidebar() {
        const sidebar = document.getElementById('global-sidebar');
        const overlay = document.getElementById('global-sidebar-overlay');
        if (sidebar) sidebar.classList.add('active');
        if (overlay) overlay.classList.add('active');
    }

    function closeSidebar() {
        const sidebar = document.getElementById('global-sidebar');
        const overlay = document.getElementById('global-sidebar-overlay');
        if (sidebar) sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
    }

    window.openSidebar = openSidebar;
    window.closeSidebar = closeSidebar;

    function injectSidebar() {
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
                <div class="global-sidebar-section">
                    <div class="global-sidebar-section-title">CATEGORIAS</div>
                    <div class="global-sidebar-item" data-categoria="todos">
                        <span class="material-symbols-outlined">grid_view</span>
                        <span>Todos os Produtos</span>
                    </div>
                    <div class="global-sidebar-item" data-categoria="camisas">
                        <span class="material-symbols-outlined">sports_tshirt</span>
                        <span>Camisas</span>
                    </div>
                    <div class="global-sidebar-item" data-categoria="casacos">
                        <span class="material-symbols-outlined">hoodie</span>
                        <span>Casacos e Jaquetas</span>
                    </div>
                    <div class="global-sidebar-item" data-categoria="bones">
                        <span class="material-symbols-outlined">style</span>
                        <span>Bonés</span>
                    </div>
                    <div class="global-sidebar-item" data-categoria="chuteiras">
                        <span class="material-symbols-outlined">sports_soccer</span>
                        <span>Chuteiras</span>
                    </div>
                    <div class="global-sidebar-item" data-categoria="bolas">
                        <span class="material-symbols-outlined">circle</span>
                        <span>Bolas</span>
                    </div>
                    <div class="global-sidebar-item" data-categoria="acessorios">
                        <span class="material-symbols-outlined">watch</span>
                        <span>Acessórios</span>
                    </div>
                </div>
                <div class="global-sidebar-divider"></div>
                <div class="global-sidebar-section">
                    <div class="global-sidebar-section-title">NAVEGAÇÃO</div>
                    <div class="global-sidebar-item" data-page="telaprincipal.html">
                        <span class="material-symbols-outlined">home</span>
                        <span>Início</span>
                    </div>
                    <div class="global-sidebar-item" data-page="carrinho.html">
                        <span class="material-symbols-outlined">shopping_cart</span>
                        <span>Meu Carrinho</span>
                    </div>
                    <div class="global-sidebar-item" data-page="perfil.html">
                        <span class="material-symbols-outlined">person</span>
                        <span>Meu Perfil</span>
                    </div>
                    <div class="global-sidebar-item" data-page="historico.html">
                        <span class="material-symbols-outlined">history</span>
                        <span>Histórico de Pedidos</span>
                    </div>
                    <div class="global-sidebar-item" data-page="configuracoes.html">
                        <span class="material-symbols-outlined">settings</span>
                        <span>Configurações</span>
                    </div>
                    <div class="global-sidebar-item" data-page="suporte.html">
                        <span class="material-symbols-outlined">support_agent</span>
                        <span>Suporte ao Cliente</span>
                    </div>
                    <div class="global-sidebar-item" data-page="publicaritens.html">
                        <span class="material-symbols-outlined">add_circle</span>
                        <span>Vender Item</span>
                    </div>
                </div>
                <div class="global-sidebar-divider"></div>
                <div class="global-sidebar-section">
                    <div class="global-sidebar-section-title">CONTA</div>
                    <div class="global-sidebar-item" id="sidebar-logout">
                        <span class="material-symbols-outlined">logout</span>
                        <span>Sair da Conta</span>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', sidebarHTML);

        if (!document.getElementById('global-sidebar-styles')) {
            const styles = `
                <style id="global-sidebar-styles">
                    .global-sidebar {
                        position: fixed; top: 0; left: -320px; width: 320px; height: 100%;
                        background: #f8f9fa; border-right: 2px solid #003215;
                        z-index: 1000; transition: left 0.3s ease-out; overflow-y: auto;
                        box-shadow: 4px 0 20px rgba(0,0,0,0.1);
                    }
                    .global-sidebar.active { left: 0; }
                    .global-sidebar-overlay {
                        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                        background: rgba(0,0,0,0.5); z-index: 999; display: none;
                    }
                    .global-sidebar-overlay.active { display: block; }
                    .global-sidebar-header {
                        background: #003215; color: white; padding: 20px;
                        display: flex; justify-content: space-between; align-items: center;
                    }
                    .global-sidebar-header h2 {
                        font-family: 'Anton', sans-serif; font-size: 24px;
                        letter-spacing: 0.02em; text-transform: uppercase; margin: 0;
                    }
                    .global-close-sidebar {
                        background: none; border: none; color: white; cursor: pointer;
                        padding: 8px; display: flex; align-items: center; justify-content: center;
                        border-radius: 8px; transition: background 0.2s;
                    }
                    .global-close-sidebar:hover { background: rgba(255,255,255,0.2); }
                    .global-sidebar-section { padding: 8px 0; }
                    .global-sidebar-section-title {
                        padding: 12px 20px 8px 20px;
                        font-family: 'JetBrains Mono', monospace; font-size: 11px;
                        letter-spacing: 0.05em; text-transform: uppercase;
                        color: #705d00; font-weight: 600;
                    }
                    .global-sidebar-item {
                        padding: 14px 20px; display: flex; align-items: center; gap: 14px;
                        cursor: pointer; transition: all 0.2s ease;
                        font-family: 'Hanken Grotesk', sans-serif; font-size: 16px;
                        font-weight: 500; color: #191c1d;
                    }
                    .global-sidebar-item:hover {
                        background: #edeeef; padding-left: 28px;
                    }
                    .global-sidebar-item .material-symbols-outlined {
                        font-size: 24px; color: #003215;
                    }
                    .global-sidebar-divider {
                        height: 2px; background: #c0c9be; margin: 8px 0;
                    }
                    .global-menu-btn {
                        background: none; border: none; cursor: pointer;
                        display: flex; align-items: center; justify-content: center;
                        padding: 8px; border-radius: 8px; transition: background 0.2s;
                    }
                    .global-menu-btn:hover { background: rgba(0,50,21,0.1); }
                    .global-menu-btn .material-symbols-outlined {
                        font-size: 28px; color: #003215;
                    }
                </style>
            `;
            document.head.insertAdjacentHTML('beforeend', styles);
        }

        document.getElementById('global-close-sidebar')?.addEventListener('click', closeSidebar);
        document.getElementById('global-sidebar-overlay')?.addEventListener('click', closeSidebar);

        document.querySelectorAll('.global-sidebar-item[data-categoria]').forEach(item => {
            item.addEventListener('click', () => {
                const categoria = item.dataset.categoria;
                localStorage.setItem('pendingCategoryFilter', categoria);
                window.location.href = 'telaprincipal.html';
            });
        });

        document.querySelectorAll('.global-sidebar-item[data-page]').forEach(item => {
            item.addEventListener('click', () => {
                window.location.href = item.dataset.page;
            });
        });

        document.getElementById('sidebar-logout')?.addEventListener('click', () => {
            localStorage.removeItem('mdc:auth');
            window.location.href = 'acesso.html';
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeSidebar();
        });
    }

    function injectMenuButton() {
        if (document.querySelector('.global-menu-btn')) return;

        let header = document.querySelector('header');
        if (!header) {
            header = document.createElement('header');
            header.style.cssText = 'background: #f8f9fa; border-bottom: 2px solid #c0c9be; padding: 12px 20px; display: flex; align-items: center; gap: 16px; position: sticky; top: 0; z-index: 100;';
            document.body.insertBefore(header, document.body.firstChild);
        }

        // Evita duplicar se já houver menuBtn
        if (header.querySelector('#menuBtn')) return;

        const menuBtn = document.createElement('button');
        menuBtn.id = 'menuBtn';
        menuBtn.className = 'global-menu-btn';
        menuBtn.innerHTML = '<span class="material-symbols-outlined">menu</span>';
        menuBtn.addEventListener('click', openSidebar);

        header.insertBefore(menuBtn, header.firstChild);
    }

    document.addEventListener('DOMContentLoaded', () => {
        injectSidebar();
        injectMenuButton();
    });
})();
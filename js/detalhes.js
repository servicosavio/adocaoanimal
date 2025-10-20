// ===== MÓDULO DE DETALHES DO ANIMAL =====

import { buscarAnimalPorId } from './bancodedados.js';

// ===== VARIÁVEIS GLOBAIS =====
let animalAtual = null;
let imagemAtualIndex = 0;

/**
 * Inicialização da página de detalhes
 */
document.addEventListener('DOMContentLoaded', function() {
    inicializarDetalhes();
});

/**
 * Inicializa a página de detalhes
 */
async function inicializarDetalhes() {
    try {
        const animalId = obterIdDaURL();
        
        if (!animalId) {
            mostrarErro('Animal não encontrado. Verifique o link ou volte ao catálogo.');
            return;
        }
        
        mostrarCarregamento();
        
        // Busca dados do animal
        animalAtual = buscarAnimalPorId(animalId);
        
        if (!animalAtual) {
            mostrarErro('Animal não encontrado. Ele pode ter sido adotado recentemente.');
            return;
        }
        
        // Renderiza o perfil do animal
        renderizarPerfilAnimal();
        
        // Inicializa a galeria de fotos
        inicializarGaleria();
        
        // Atualiza breadcrumb
        atualizarBreadcrumb();
        
    } catch (error) {
        console.error('Erro ao carregar detalhes do animal:', error);
        mostrarErro('Erro ao carregar informações do animal. Tente recarregar a página.');
    }
}

/**
 * Obtém o ID do animal da URL
 */
function obterIdDaURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

/**
 * Renderiza o perfil completo do animal
 */
function renderizarPerfilAnimal() {
    const perfilContainer = document.getElementById('perfil-animal');
    
    if (!perfilContainer || !animalAtual) return;
    
    const html = `
        <!-- Galeria de Mídia -->
        <div class="galeria-midia">
            <div class="imagem-principal">
                <img id="imagem-principal" src="${animalAtual.imagens[0]}" alt="${animalAtual.nome}">
            </div>
            <div class="galeria-thumbnails" id="galeria-thumbnails">
                ${animalAtual.imagens.map((imagem, index) => `
                    <div class="thumbnail ${index === 0 ? 'ativo' : ''}" data-index="${index}">
                        <img src="${imagem}" alt="${animalAtual.nome} - Foto ${index + 1}">
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Informações do Animal -->
        <div class="info-animal">
            <!-- Header do Animal -->
            <div class="animal-header">
                <h1 class="animal-nome">${animalAtual.nome}</h1>
                <p class="animal-tipo">${formatarTipoAnimal(animalAtual.tipo)} • ${animalAtual.raca}</p>
                <span class="animal-status">Disponível para Adoção</span>
            </div>

            <!-- Dados Básicos -->
            <div class="dados-basicos">
                <div class="dado-item">
                    <span class="dado-label">Idade</span>
                    <span class="dado-valor">${animalAtual.idadeExata}</span>
                </div>
                <div class="dado-item">
                    <span class="dado-label">Porte</span>
                    <span class="dado-valor">${window.GlobalUtils.formatarPorte(animalAtual.porte)}</span>
                </div>
                <div class="dado-item">
                    <span class="dado-label">Peso</span>
                    <span class="dado-valor">${animalAtual.peso}</span>
                </div>
                <div class="dado-item">
                    <span class="dado-label">Sexo</span>
                    <span class="dado-valor">${window.GlobalUtils.formatarSexo(animalAtual.sexo)}</span>
                </div>
                <div class="dado-item">
                    <span class="dado-label">Cor</span>
                    <span class="dado-valor">${animalAtual.cor}</span>
                </div>
                <div class="dado-item">
                    <span class="dado-label">Localização</span>
                    <span class="dado-valor">${animalAtual.localizacao}</span>
                </div>
            </div>

            <!-- Características -->
            <div class="caracteristicas">
                <h3>Cuidados de Saúde</h3>
                <div class="badges-caracteristicas">
                    ${animalAtual.caracteristicas.map(carac => `
                        <span class="badge-caracteristica">${formatarCaracteristicaCompleta(carac)}</span>
                    `).join('')}
                </div>
            </div>

            <!-- Personalidade -->
            <div class="personalidade">
                <h3>Personalidade</h3>
                <div class="personalidade-lista">
                    ${animalAtual.personalidade.map(trait => `
                        <span class="personalidade-tag">${trait}</span>
                    `).join('')}
                </div>
            </div>

            <!-- Descrição -->
            <div class="descricao">
                <h3>Sobre ${animalAtual.nome}</h3>
                <p class="descricao-texto">${animalAtual.descricao}</p>
                <p class="descricao-texto"><strong>Estado de Saúde:</strong> ${animalAtual.saude}</p>
            </div>

            <!-- CTA de Adoção -->
            <div class="cta-adocao">
                <button class="btn-adotar" onclick="iniciarProcessoAdocao()">
                    ❤️ Quero Adotar ${animalAtual.nome}
                </button>
                <div class="contato-info">
                    <p>Entre em contato conosco para iniciar o processo de adoção</p>
                    <p><strong>📞 (11) 9999-9999</strong> | <strong>📧 contato@adoteumamigo.com.br</strong></p>
                </div>
            </div>
        </div>
    `;
    
    perfilContainer.innerHTML = html;
}

/**
 * Inicializa a galeria de fotos interativa
 */
function inicializarGaleria() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const imagemPrincipal = document.getElementById('imagem-principal');
    
    if (!thumbnails.length || !imagemPrincipal) return;
    
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            // Remove classe ativo de todas as thumbnails
            thumbnails.forEach(thumb => thumb.classList.remove('ativo'));
            
            // Adiciona classe ativo à thumbnail clicada
            this.classList.add('ativo');
            
            // Atualiza imagem principal
            imagemPrincipal.src = animalAtual.imagens[index];
            imagemAtualIndex = index;
            
            // Efeito de transição suave
            imagemPrincipal.style.opacity = '0';
            setTimeout(() => {
                imagemPrincipal.style.opacity = '1';
            }, 150);
        });
        
        // Adiciona efeito hover
        thumbnail.addEventListener('mouseenter', function() {
            if (!this.classList.contains('ativo')) {
                this.style.transform = 'scale(1.1)';
            }
        });
        
        thumbnail.addEventListener('mouseleave', function() {
            if (!this.classList.contains('ativo')) {
                this.style.transform = 'scale(1)';
            }
        });
    });
    
    // Navegação por teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' && imagemAtualIndex > 0) {
            thumbnails[imagemAtualIndex - 1].click();
        } else if (e.key === 'ArrowRight' && imagemAtualIndex < animalAtual.imagens.length - 1) {
            thumbnails[imagemAtualIndex + 1].click();
        }
    });
}

/**
 * Atualiza o breadcrumb com o nome do animal
 */
function atualizarBreadcrumb() {
    const breadcrumbNome = document.getElementById('breadcrumb-nome');
    
    if (breadcrumbNome && animalAtual) {
        breadcrumbNome.textContent = animalAtual.nome;
    }
}

/**
 * Mostra estado de carregamento
 */
function mostrarCarregamento() {
    const perfilContainer = document.getElementById('perfil-animal');
    const breadcrumbNome = document.getElementById('breadcrumb-nome');
    
    if (perfilContainer) {
        perfilContainer.innerHTML = '<div class="perfil-loading"></div>';
    }
    
    if (breadcrumbNome) {
        breadcrumbNome.textContent = 'Carregando...';
    }
}

/**
 * Mostra mensagem de erro
 */
function mostrarErro(mensagem) {
    const perfilContainer = document.getElementById('perfil-animal');
    const breadcrumbNome = document.getElementById('breadcrumb-nome');
    
    if (perfilContainer) {
        perfilContainer.innerHTML = `
            <div class="erro-detalhes">
                <h2>Ops! Algo deu errado</h2>
                <p>${mensagem}</p>
                <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: center;">
                    <a href="catalogo.html" class="btn btn-primary">Voltar ao Catálogo</a>
                    <button class="btn btn-secondary" onclick="location.reload()">Tentar Novamente</button>
                </div>
            </div>
        `;
    }
    
    if (breadcrumbNome) {
        breadcrumbNome.textContent = 'Erro';
    }
}

/**
 * Inicia o processo de adoção
 */
function iniciarProcessoAdocao() {
    if (!animalAtual) return;
    
    // Cria mensagem personalizada para WhatsApp
    const mensagem = `Olá! Tenho interesse em adotar o(a) ${animalAtual.nome}, um(a) ${formatarTipoAnimal(animalAtual.tipo)} de ${animalAtual.idadeExata}. Gostaria de saber mais sobre o processo de adoção.`;
    
    const numeroWhatsApp = '5511999999999'; // Substitua pelo número real
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    
    // Abre WhatsApp em nova aba
    window.open(urlWhatsApp, '_blank');
    
    // Também pode enviar email
    const assuntoEmail = `Interesse em adotar ${animalAtual.nome}`;
    const corpoEmail = `${mensagem}\n\nID do Animal: ${animalAtual.id}\nPágina: ${window.location.href}`;
    const urlEmail = `mailto:contato@adoteumamigo.com.br?subject=${encodeURIComponent(assuntoEmail)}&body=${encodeURIComponent(corpoEmail)}`;
    
    // Mostra opções para o usuário
    const opcoes = confirm(
        `Deseja entrar em contato via WhatsApp para adotar ${animalAtual.nome}?\n\n` +
        'Clique "OK" para WhatsApp ou "Cancelar" para enviar email.'
    );
    
    if (opcoes) {
        window.open(urlWhatsApp, '_blank');
    } else {
        window.location.href = urlEmail;
    }
}

/**
 * Funções auxiliares de formatação
 */
function formatarTipoAnimal(tipo) {
    const tipos = {
        'cao': 'Cão',
        'gato': 'Gato'
    };
    return tipos[tipo] || tipo;
}

function formatarCaracteristicaCompleta(caracteristica) {
    const caracteristicas = {
        'castrado': '✂️ Castrado',
        'vacinado': '💉 Vacinado',
        'vermifugado': '🛡️ Vermifugado',
        'sociavel': '👥 Sociável'
    };
    return caracteristicas[caracteristica] || caracteristica;
}

/**
 * Compartilhamento nas redes sociais
 */
function compartilharAnimal(plataforma) {
    if (!animalAtual) return;
    
    const url = window.location.href;
    const texto = `Conheça ${animalAtual.nome}, um(a) ${formatarTipoAnimal(animalAtual.tipo)} incrível que está procurando uma família! 🐾❤️`;
    
    let urlCompartilhamento = '';
    
    switch (plataforma) {
        case 'facebook':
            urlCompartilhamento = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            urlCompartilhamento = `https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}&url=${encodeURIComponent(url)}`;
            break;
        case 'whatsapp':
            urlCompartilhamento = `https://wa.me/?text=${encodeURIComponent(texto + ' ' + url)}`;
            break;
        default:
            return;
    }
    
    window.open(urlCompartilhamento, '_blank', 'width=600,height=400');
}

/**
 * Adiciona animações de entrada
 */
function adicionarAnimacoes() {
    const elementos = document.querySelectorAll('.galeria-midia, .info-animal, .requisitos');
    
    elementos.forEach((elemento, index) => {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            elemento.style.transition = 'all 0.6s ease-out';
            elemento.style.opacity = '1';
            elemento.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

/**
 * Funcionalidade de zoom na imagem principal
 */
function inicializarZoomImagem() {
    const imagemPrincipal = document.getElementById('imagem-principal');
    
    if (imagemPrincipal) {
        imagemPrincipal.addEventListener('click', function() {
            // Cria modal de zoom
            const modal = document.createElement('div');
            modal.className = 'modal-zoom';
            modal.innerHTML = `
                <div class="modal-zoom-overlay">
                    <img src="${this.src}" alt="${animalAtual.nome}">
                    <button class="modal-zoom-close">×</button>
                </div>
            `;
            
            // Adiciona estilos do modal
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                cursor: pointer;
            `;
            
            const img = modal.querySelector('img');
            img.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 8px;
            `;
            
            const closeBtn = modal.querySelector('.modal-zoom-close');
            closeBtn.style.cssText = `
                position: absolute;
                top: 20px;
                right: 30px;
                font-size: 40px;
                color: white;
                background: none;
                border: none;
                cursor: pointer;
            `;
            
            document.body.appendChild(modal);
            
            // Fecha modal ao clicar
            modal.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                document.body.removeChild(modal);
            });
            
            // Fecha com ESC
            const handleEsc = function(e) {
                if (e.key === 'Escape') {
                    document.body.removeChild(modal);
                    document.removeEventListener('keydown', handleEsc);
                }
            };
            document.addEventListener('keydown', handleEsc);
        });
    }
}

// Torna funções globais para uso no HTML
window.iniciarProcessoAdocao = iniciarProcessoAdocao;
window.compartilharAnimal = compartilharAnimal;

// Inicializa funcionalidades adicionais após carregar o perfil
document.addEventListener('DOMContentLoaded', function() {
    // Aguarda um pouco para garantir que o perfil foi carregado
    setTimeout(() => {
        adicionarAnimacoes();
        inicializarZoomImagem();
    }, 500);
});
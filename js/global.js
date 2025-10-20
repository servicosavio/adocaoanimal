// ===== FUNCIONALIDADES GLOBAIS =====

/**
 * Inicialização global da aplicação
 */
document.addEventListener('DOMContentLoaded', function() {
    inicializarMenuMobile();
    inicializarBotaoTopo();
    carregarAnimaisDestaque();
});

/**
 * Menu Mobile - Toggle e navegação
 */
function inicializarMenuMobile() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('ativo');
            menuToggle.classList.toggle('ativo');
            
            // Adiciona animação às linhas do hamburguer
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (menuToggle.classList.contains('ativo')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
        
        // Fecha o menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navList.classList.remove('ativo');
                    menuToggle.classList.remove('ativo');
                    
                    // Reset das linhas do hamburguer
                    const spans = menuToggle.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.transform = 'none';
                        span.style.opacity = '1';
                    });
                }
            });
        });
        
        // Fecha o menu ao redimensionar a tela
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navList.classList.remove('ativo');
                menuToggle.classList.remove('ativo');
                
                // Reset das linhas do hamburguer
                const spans = menuToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });
    }
}

/**
 * Botão "Voltar ao Topo"
 */
function inicializarBotaoTopo() {
    const btnTopo = document.getElementById('btn-topo');
    
    if (btnTopo) {
        // Mostra/esconde o botão baseado no scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                btnTopo.classList.add('visivel');
            } else {
                btnTopo.classList.remove('visivel');
            }
        });
        
        // Ação de clique - volta ao topo
        btnTopo.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Carrega animais em destaque na home page
 */
async function carregarAnimaisDestaque() {
    const containerDestaque = document.getElementById('animais-destaque');
    
    if (containerDestaque) {
        try {
            // Importa dinamicamente o módulo de dados
            const { buscarAnimaisDestaque } = await import('./bancodedados.js');
            const animaisDestaque = buscarAnimaisDestaque();
            
            // Limita a 3 animais em destaque para a home
            const animaisLimitados = animaisDestaque.slice(0, 3);
            
            if (animaisLimitados.length > 0) {
                containerDestaque.innerHTML = animaisLimitados.map(animal => 
                    criarCardAnimal(animal)
                ).join('');
                
                // Adiciona eventos de clique aos cards
                adicionarEventosCards(containerDestaque);
            } else {
                containerDestaque.innerHTML = '<p class="sem-resultados">Nenhum animal em destaque no momento.</p>';
            }
        } catch (error) {
            console.error('Erro ao carregar animais em destaque:', error);
            containerDestaque.innerHTML = '<p class="erro">Erro ao carregar animais. Tente novamente mais tarde.</p>';
        }
    }
}

/**
 * Cria HTML do card de animal
 * @param {Object} animal - Dados do animal
 * @returns {string} - HTML do card
 */
function criarCardAnimal(animal) {
    const caracteristicasLimitadas = animal.caracteristicas.slice(0, 2);
    
    return `
        <div class="card-animal fade-in-up" data-id="${animal.id}">
            <div class="card-imagem">
                <img src="${animal.imagem}" alt="${animal.nome}" loading="lazy">
                <div class="card-badge">${animal.tipo === 'cao' ? '🐕' : '🐱'}</div>
            </div>
            <div class="card-conteudo">
                <h3 class="card-nome">${animal.nome}</h3>
                <div class="card-info">
                    <span class="card-tag">${formatarIdade(animal.idade)}</span>
                    <span class="card-tag">${formatarPorte(animal.porte)}</span>
                    <span class="card-tag">${formatarSexo(animal.sexo)}</span>
                </div>
                <p class="card-descricao">${truncarTexto(animal.descricao, 80)}</p>
                <div class="card-footer">
                    <div class="card-caracteristicas">
                        ${caracteristicasLimitadas.map(carac => 
                            `<span class="badge">${formatarCaracteristica(carac)}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Adiciona eventos de clique aos cards de animais
 * @param {Element} container - Container dos cards
 */
function adicionarEventosCards(container) {
    const cards = container.querySelectorAll('.card-animal');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const animalId = this.dataset.id;
            navegarParaDetalhes(animalId);
        });
        
        // Adiciona cursor pointer e efeito hover
        card.style.cursor = 'pointer';
        
        // Efeito de hover suave
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
        });
    });
}

/**
 * Navega para a página de detalhes do animal
 * @param {number} animalId - ID do animal
 */
function navegarParaDetalhes(animalId) {
    window.location.href = `detalhes-animal.html?id=${animalId}`;
}

/**
 * Funções de formatação de dados
 */
function formatarIdade(idade) {
    const idades = {
        'filhote': 'Filhote',
        'jovem': 'Jovem',
        'adulto': 'Adulto',
        'senior': 'Sênior'
    };
    return idades[idade] || idade;
}

function formatarPorte(porte) {
    const portes = {
        'pequeno': 'Pequeno',
        'medio': 'Médio',
        'grande': 'Grande'
    };
    return portes[porte] || porte;
}

function formatarSexo(sexo) {
    const sexos = {
        'macho': 'Macho',
        'femea': 'Fêmea'
    };
    return sexos[sexo] || sexo;
}

function formatarCaracteristica(caracteristica) {
    const caracteristicas = {
        'castrado': '✂️',
        'vacinado': '💉',
        'vermifugado': '🛡️',
        'sociavel': '👥'
    };
    return caracteristicas[caracteristica] || caracteristica;
}

/**
 * Trunca texto para exibição em cards
 * @param {string} texto - Texto a ser truncado
 * @param {number} limite - Limite de caracteres
 * @returns {string} - Texto truncado
 */
function truncarTexto(texto, limite) {
    if (texto.length <= limite) return texto;
    return texto.substring(0, limite).trim() + '...';
}

/**
 * Função para smooth scroll em links internos
 */
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
});

/**
 * Lazy loading para imagens
 */
function inicializarLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

/**
 * Adiciona animações de entrada aos elementos
 */
function inicializarAnimacoes() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    const elementos = document.querySelectorAll('.processo-item, .campanha-content, .section-header');
    elementos.forEach(el => observer.observe(el));
}

// Inicializa funcionalidades adicionais quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    inicializarLazyLoading();
    inicializarAnimacoes();
});

/**
 * Função utilitária para debounce
 * @param {Function} func - Função a ser executada
 * @param {number} wait - Tempo de espera em ms
 * @returns {Function} - Função com debounce aplicado
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Função utilitária para throttle
 * @param {Function} func - Função a ser executada
 * @param {number} limit - Limite de tempo em ms
 * @returns {Function} - Função com throttle aplicado
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Exporta funções para uso em outros módulos
window.GlobalUtils = {
    criarCardAnimal,
    adicionarEventosCards,
    navegarParaDetalhes,
    formatarIdade,
    formatarPorte,
    formatarSexo,
    formatarCaracteristica,
    truncarTexto,
    debounce,
    throttle
};
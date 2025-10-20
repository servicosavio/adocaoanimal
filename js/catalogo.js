// ===== MÓDULO DO CATÁLOGO - FILTROS E RENDERIZAÇÃO =====

import { 
    filtrarAnimais, 
    ordenarAnimais, 
    paginarResultados,
    buscarPorTexto 
} from './bancodedados.js';

// ===== VARIÁVEIS GLOBAIS =====
let animaisAtuais = [];
let paginaAtual = 1;
const itensPorPagina = 6;
let filtrosAtivos = {};
let ordenacaoAtiva = 'nome';

/**
 * Inicialização do catálogo
 */
document.addEventListener('DOMContentLoaded', function() {
    inicializarCatalogo();
    inicializarEventos();
});

/**
 * Inicializa o catálogo carregando todos os animais
 */
async function inicializarCatalogo() {
    try {
        mostrarCarregamento();
        
        // Importa dados e carrega animais
        const { animaisData } = await import('./bancodedados.js');
        animaisAtuais = [...animaisData];
        
        aplicarFiltrosEOrdenacao();
        
    } catch (error) {
        console.error('Erro ao inicializar catálogo:', error);
        mostrarErro('Erro ao carregar o catálogo. Tente recarregar a página.');
    }
}

/**
 * Inicializa todos os event listeners
 */
function inicializarEventos() {
    // Eventos dos filtros
    const formFiltros = document.getElementById('filtros-form');
    if (formFiltros) {
        formFiltros.addEventListener('change', window.GlobalUtils.debounce(aplicarFiltros, 300));
    }
    
    // Botão limpar filtros
    const btnLimpar = document.getElementById('limpar-filtros');
    if (btnLimpar) {
        btnLimpar.addEventListener('click', limparFiltros);
    }
    
    // Ordenação
    const selectOrdenacao = document.getElementById('ordenar');
    if (selectOrdenacao) {
        selectOrdenacao.addEventListener('change', aplicarOrdenacao);
    }
    
    // Busca por texto (se existir campo de busca)
    const campoBusca = document.getElementById('busca-texto');
    if (campoBusca) {
        campoBusca.addEventListener('input', window.GlobalUtils.debounce(aplicarBusca, 500));
    }
}

/**
 * Aplica filtros baseado no formulário
 */
function aplicarFiltros() {
    const formData = new FormData(document.getElementById('filtros-form'));
    
    filtrosAtivos = {
        tipo: formData.get('tipo') || '',
        porte: formData.get('porte') || '',
        idade: formData.get('idade') || '',
        sexo: formData.get('sexo') || '',
        caracteristicas: formData.getAll('caracteristicas') || []
    };
    
    paginaAtual = 1; // Reset para primeira página
    aplicarFiltrosEOrdenacao();
}

/**
 * Aplica ordenação
 */
function aplicarOrdenacao() {
    const selectOrdenacao = document.getElementById('ordenar');
    ordenacaoAtiva = selectOrdenacao.value;
    aplicarFiltrosEOrdenacao();
}

/**
 * Aplica busca por texto
 */
function aplicarBusca() {
    const campoBusca = document.getElementById('busca-texto');
    const termo = campoBusca.value.trim();
    
    if (termo) {
        animaisAtuais = buscarPorTexto(termo);
    } else {
        // Se não há termo de busca, recarrega todos os animais
        import('./bancodedados.js').then(({ animaisData }) => {
            animaisAtuais = [...animaisData];
            aplicarFiltrosEOrdenacao();
        });
        return;
    }
    
    paginaAtual = 1;
    aplicarFiltrosEOrdenacao();
}

/**
 * Aplica filtros e ordenação aos dados atuais
 */
function aplicarFiltrosEOrdenacao() {
    try {
        // Aplica filtros
        let animaisFiltrados = filtrarAnimais(filtrosAtivos);
        
        // Se há uma busca ativa, usa os resultados da busca
        if (animaisAtuais.length < 10) { // Assumindo que busca retorna menos resultados
            animaisFiltrados = filtrarAnimais(filtrosAtivos);
        }
        
        // Aplica ordenação
        animaisFiltrados = ordenarAnimais(animaisFiltrados, ordenacaoAtiva);
        
        // Aplica paginação
        const resultadoPaginacao = paginarResultados(animaisFiltrados, paginaAtual, itensPorPagina);
        
        // Renderiza resultados
        renderizarResultados(resultadoPaginacao);
        renderizarPaginacao(resultadoPaginacao);
        atualizarContador(resultadoPaginacao.totalItens);
        
    } catch (error) {
        console.error('Erro ao aplicar filtros:', error);
        mostrarErro('Erro ao filtrar resultados.');
    }
}

/**
 * Renderiza os cards dos animais
 */
function renderizarResultados(paginacao) {
    const gridResultados = document.getElementById('grid-resultados');
    
    if (!gridResultados) return;
    
    if (paginacao.itens.length === 0) {
        gridResultados.innerHTML = `
            <div class="sem-resultados">
                <h3>Nenhum animal encontrado</h3>
                <p>Tente ajustar os filtros ou limpar a busca para ver mais opções.</p>
                <button class="btn btn-primary" onclick="limparFiltros()">Limpar Filtros</button>
            </div>
        `;
        return;
    }
    
    // Renderiza cards usando a função global
    gridResultados.innerHTML = paginacao.itens.map(animal => 
        window.GlobalUtils.criarCardAnimal(animal)
    ).join('');
    
    // Adiciona eventos aos cards
    window.GlobalUtils.adicionarEventosCards(gridResultados);
    
    // Scroll suave para o topo dos resultados
    if (paginaAtual > 1) {
        gridResultados.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

/**
 * Renderiza a paginação
 */
function renderizarPaginacao(paginacao) {
    const containerPaginacao = document.getElementById('paginacao');
    
    if (!containerPaginacao || paginacao.totalPaginas <= 1) {
        if (containerPaginacao) containerPaginacao.innerHTML = '';
        return;
    }
    
    let htmlPaginacao = '';
    
    // Botão anterior
    if (paginacao.temAnterior) {
        htmlPaginacao += `<a href="#" data-pagina="${paginacao.paginaAtual - 1}">‹</a>`;
    } else {
        htmlPaginacao += `<span class="desabilitado">‹</span>`;
    }
    
    // Números das páginas
    const inicioRange = Math.max(1, paginacao.paginaAtual - 2);
    const fimRange = Math.min(paginacao.totalPaginas, paginacao.paginaAtual + 2);
    
    // Primeira página se não estiver no range
    if (inicioRange > 1) {
        htmlPaginacao += `<a href="#" data-pagina="1">1</a>`;
        if (inicioRange > 2) {
            htmlPaginacao += `<span>...</span>`;
        }
    }
    
    // Páginas no range
    for (let i = inicioRange; i <= fimRange; i++) {
        if (i === paginacao.paginaAtual) {
            htmlPaginacao += `<span class="ativo">${i}</span>`;
        } else {
            htmlPaginacao += `<a href="#" data-pagina="${i}">${i}</a>`;
        }
    }
    
    // Última página se não estiver no range
    if (fimRange < paginacao.totalPaginas) {
        if (fimRange < paginacao.totalPaginas - 1) {
            htmlPaginacao += `<span>...</span>`;
        }
        htmlPaginacao += `<a href="#" data-pagina="${paginacao.totalPaginas}">${paginacao.totalPaginas}</a>`;
    }
    
    // Botão próximo
    if (paginacao.temProxima) {
        htmlPaginacao += `<a href="#" data-pagina="${paginacao.paginaAtual + 1}">›</a>`;
    } else {
        htmlPaginacao += `<span class="desabilitado">›</span>`;
    }
    
    containerPaginacao.innerHTML = htmlPaginacao;
    
    // Adiciona eventos aos links de paginação
    const linksPaginacao = containerPaginacao.querySelectorAll('a[data-pagina]');
    linksPaginacao.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const novaPagina = parseInt(this.dataset.pagina);
            if (novaPagina !== paginaAtual) {
                paginaAtual = novaPagina;
                aplicarFiltrosEOrdenacao();
            }
        });
    });
}

/**
 * Atualiza o contador de resultados
 */
function atualizarContador(totalItens) {
    const contadorElement = document.getElementById('contador-resultados');
    
    if (contadorElement) {
        if (totalItens === 0) {
            contadorElement.textContent = 'Nenhum animal encontrado';
        } else if (totalItens === 1) {
            contadorElement.textContent = '1 animal encontrado';
        } else {
            contadorElement.textContent = `${totalItens} animais encontrados`;
        }
    }
}

/**
 * Limpa todos os filtros
 */
function limparFiltros() {
    // Reset do formulário
    const formFiltros = document.getElementById('filtros-form');
    if (formFiltros) {
        formFiltros.reset();
    }
    
    // Reset das variáveis
    filtrosAtivos = {};
    paginaAtual = 1;
    ordenacaoAtiva = 'nome';
    
    // Reset da ordenação
    const selectOrdenacao = document.getElementById('ordenar');
    if (selectOrdenacao) {
        selectOrdenacao.value = 'nome';
    }
    
    // Reset da busca
    const campoBusca = document.getElementById('busca-texto');
    if (campoBusca) {
        campoBusca.value = '';
    }
    
    // Recarrega todos os animais
    import('./bancodedados.js').then(({ animaisData }) => {
        animaisAtuais = [...animaisData];
        aplicarFiltrosEOrdenacao();
    });
}

/**
 * Mostra estado de carregamento
 */
function mostrarCarregamento() {
    const gridResultados = document.getElementById('grid-resultados');
    const contadorElement = document.getElementById('contador-resultados');
    
    if (gridResultados) {
        gridResultados.innerHTML = '<div class="carregando">Carregando animais...</div>';
    }
    
    if (contadorElement) {
        contadorElement.textContent = 'Carregando...';
    }
}

/**
 * Mostra mensagem de erro
 */
function mostrarErro(mensagem) {
    const gridResultados = document.getElementById('grid-resultados');
    const contadorElement = document.getElementById('contador-resultados');
    
    if (gridResultados) {
        gridResultados.innerHTML = `
            <div class="erro">
                <h3>Ops! Algo deu errado</h3>
                <p>${mensagem}</p>
                <button class="btn btn-primary" onclick="location.reload()">Tentar Novamente</button>
            </div>
        `;
    }
    
    if (contadorElement) {
        contadorElement.textContent = 'Erro ao carregar';
    }
}

/**
 * Função para atualizar URL com parâmetros de filtro (opcional)
 */
function atualizarURL() {
    const params = new URLSearchParams();
    
    Object.entries(filtrosAtivos).forEach(([key, value]) => {
        if (value && value.length > 0) {
            if (Array.isArray(value)) {
                value.forEach(v => params.append(key, v));
            } else {
                params.set(key, value);
            }
        }
    });
    
    if (ordenacaoAtiva !== 'nome') {
        params.set('ordenar', ordenacaoAtiva);
    }
    
    if (paginaAtual > 1) {
        params.set('pagina', paginaAtual);
    }
    
    const novaURL = params.toString() ? 
        `${window.location.pathname}?${params.toString()}` : 
        window.location.pathname;
    
    window.history.replaceState({}, '', novaURL);
}

/**
 * Carrega filtros da URL (opcional)
 */
function carregarFiltrosDaURL() {
    const params = new URLSearchParams(window.location.search);
    
    // Carrega filtros
    filtrosAtivos = {
        tipo: params.get('tipo') || '',
        porte: params.get('porte') || '',
        idade: params.get('idade') || '',
        sexo: params.get('sexo') || '',
        caracteristicas: params.getAll('caracteristicas') || []
    };
    
    // Carrega ordenação
    ordenacaoAtiva = params.get('ordenar') || 'nome';
    
    // Carrega página
    paginaAtual = parseInt(params.get('pagina')) || 1;
    
    // Aplica aos elementos do formulário
    Object.entries(filtrosAtivos).forEach(([key, value]) => {
        const elemento = document.querySelector(`[name="${key}"]`);
        if (elemento && value) {
            if (elemento.type === 'checkbox') {
                const checkboxes = document.querySelectorAll(`[name="${key}"]`);
                checkboxes.forEach(cb => {
                    cb.checked = value.includes(cb.value);
                });
            } else {
                elemento.value = value;
            }
        }
    });
    
    // Aplica ordenação ao select
    const selectOrdenacao = document.getElementById('ordenar');
    if (selectOrdenacao) {
        selectOrdenacao.value = ordenacaoAtiva;
    }
}

// Torna a função limparFiltros global para uso no HTML
window.limparFiltros = limparFiltros;

// Exporta funções principais para uso externo
export {
    aplicarFiltros,
    aplicarOrdenacao,
    limparFiltros,
    renderizarResultados
};
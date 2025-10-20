// ===== BANCO DE DADOS SIMULADO - ANIMAIS PARA ADOÇÃO =====

export const animaisData = [
    {
        id: 1,
        nome: "Luna",
        tipo: "gato",
        raca: "SRD (Sem Raça Definida)",
        idade: "jovem",
        idadeExata: "2 anos",
        sexo: "femea",
        porte: "pequeno",
        peso: "3.5 kg",
        cor: "Cinza e Branco",
        localizacao: "São Paulo, SP",
        imagem: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop&crop=center",
        imagens: [
            "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600&h=400&fit=crop&crop=center"
        ],
        caracteristicas: ["castrado", "vacinado", "vermifugado", "sociavel"],
        personalidade: ["Carinhosa", "Brincalhona", "Independente", "Curiosa"],
        descricao: "Luna é uma gatinha muito especial que adora carinho e brincadeiras. Ela se adapta bem a ambientes internos e adora observar o movimento pela janela. É muito sociável com outros gatos e crianças.",
        saude: "Excelente",
        status: "disponivel",
        dataResgate: "2024-08-15",
        destaque: true
    },
    {
        id: 2,
        nome: "Thor",
        tipo: "cao",
        raca: "Labrador Mix",
        idade: "adulto",
        idadeExata: "4 anos",
        sexo: "macho",
        porte: "grande",
        peso: "28 kg",
        cor: "Dourado",
        localizacao: "São Paulo, SP",
        imagem: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop&crop=center",
        imagens: [
            "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&h=400&fit=crop&crop=center"
        ],
        caracteristicas: ["castrado", "vacinado", "vermifugado", "sociavel"],
        personalidade: ["Leal", "Protetor", "Energético", "Obediente"],
        descricao: "Thor é um cão incrível, muito leal e protetor com sua família. Adora atividades ao ar livre, caminhadas e brincadeiras no quintal. É excelente com crianças e outros cães.",
        saude: "Excelente",
        status: "disponivel",
        dataResgate: "2024-07-20",
        destaque: true
    },
    {
        id: 3,
        nome: "Mimi",
        tipo: "gato",
        raca: "Persa Mix",
        idade: "senior",
        idadeExata: "8 anos",
        sexo: "femea",
        porte: "pequeno",
        peso: "4.2 kg",
        cor: "Branco",
        localizacao: "São Paulo, SP",
        imagem: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&h=300&fit=crop&crop=center",
        imagens: [
            "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=600&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=600&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=600&h=400&fit=crop&crop=center"
        ],
        caracteristicas: ["castrado", "vacinado", "vermifugado"],
        personalidade: ["Calma", "Carinhosa", "Tranquila", "Companheira"],
        descricao: "Mimi é uma gata sênior muito carinhosa que busca um lar tranquilo para seus anos dourados. Ela adora colo, carinho e um cantinho quentinho para descansar.",
        saude: "Boa (acompanhamento veterinário regular)",
        status: "disponivel",
        dataResgate: "2024-06-10",
        destaque: true
    },
    {
        id: 4,
        nome: "Rex",
        tipo: "cao",
        raca: "Pastor Alemão Mix",
        idade: "jovem",
        idadeExata: "1.5 anos",
        sexo: "macho",
        porte: "grande",
        peso: "25 kg",
        cor: "Preto e Marrom",
        localizacao: "São Paulo, SP",
        imagem: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=300&fit=crop&crop=center",
        imagens: [
            "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=600&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=600&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop&crop=center"
        ],
        caracteristicas: ["castrado", "vacinado", "vermifugado", "sociavel"],
        personalidade: ["Inteligente", "Ativo", "Leal", "Protetor"],
        descricao: "Rex é um cão jovem, muito inteligente e ativo. Precisa de uma família que possa oferecer exercícios regulares e treinamento. É muito leal e aprende comandos rapidamente.",
        saude: "Excelente",
        status: "disponivel",
        dataResgate: "2024-09-01",
        destaque: false
    },
    {
        id: 5,
        nome: "Bella",
        tipo: "cao",
        raca: "SRD (Pequeno Porte)",
        idade: "filhote",
        idadeExata: "6 meses",
        sexo: "femea",
        porte: "pequeno",
        peso: "4 kg",
        cor: "Caramelo",
        localizacao: "São Paulo, SP",
        imagem: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop&crop=center",
        imagens: [
            "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=600&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=600&h=400&fit=crop&crop=center"
        ],
        caracteristicas: ["vacinado", "vermifugado", "sociavel"],
        personalidade: ["Brincalhona", "Carinhosa", "Energética", "Curiosa"],
        descricao: "Bella é uma filhotinha adorável, muito brincalhona e cheia de energia. Está em fase de aprendizado e precisa de uma família paciente para seu treinamento e socialização.",
        saude: "Excelente",
        status: "disponivel",
        dataResgate: "2024-09-15",
        destaque: true
    },
    {
        id: 6,
        nome: "Simba",
        tipo: "gato",
        raca: "SRD (Laranja)",
        idade: "jovem",
        idadeExata: "1 ano",
        sexo: "macho",
        porte: "medio",
        peso: "4.8 kg",
        cor: "Laranja",
        localizacao: "São Paulo, SP",
        imagem: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop&crop=center",
        imagens: [
            "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=600&h=400&fit=crop&crop=center"
        ],
        caracteristicas: ["castrado", "vacinado", "vermifugado", "sociavel"],
        personalidade: ["Aventureiro", "Brincalhão", "Sociável", "Carinhoso"],
        descricao: "Simba é um gato jovem muito aventureiro e sociável. Adora explorar novos ambientes e brincar com outros gatos. É muito carinhoso e ronrona sempre que recebe atenção.",
        saude: "Excelente",
        status: "disponivel",
        dataResgate: "2024-08-30",
        destaque: false
    },
    {
        id: 7,
        nome: "Maya",
        tipo: "cao",
        raca: "Border Collie Mix",
        idade: "adulto",
        idadeExata: "3 anos",
        sexo: "femea",
        porte: "medio",
        peso: "18 kg",
        cor: "Preto e Branco",
        localizacao: "São Paulo, SP",
        imagem: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop&crop=center",
        imagens: [
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1593134257782-e89567b7718a?w=600&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=600&h=400&fit=crop&crop=center"
        ],
        caracteristicas: ["castrado", "vacinado", "vermifugado", "sociavel"],
        personalidade: ["Inteligente", "Ativa", "Obediente", "Carinhosa"],
        descricao: "Maya é uma cadelinha muito inteligente e ativa. Adora aprender novos truques e precisa de estímulos mentais e físicos regulares. É excelente para famílias ativas.",
        saude: "Excelente",
        status: "disponivel",
        dataResgate: "2024-07-05",
        destaque: false
    },
    {
        id: 8,
        nome: "Oliver",
        tipo: "gato",
        raca: "Maine Coon Mix",
        idade: "adulto",
        idadeExata: "5 anos",
        sexo: "macho",
        porte: "grande",
        peso: "6.2 kg",
        cor: "Cinza Escuro",
        localizacao: "São Paulo, SP",
        imagem: "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=400&h=300&fit=crop&crop=center",
        imagens: [
            "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=600&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1606214174585-fe31582cd542?w=600&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=400&fit=crop&crop=center"
        ],
        caracteristicas: ["castrado", "vacinado", "vermifugado"],
        personalidade: ["Majestoso", "Calmo", "Independente", "Observador"],
        descricao: "Oliver é um gato imponente e majestoso, com personalidade calma e observadora. Prefere ambientes tranquilos e é ideal para pessoas que apreciam a companhia silenciosa de um felino.",
        saude: "Excelente",
        status: "disponivel",
        dataResgate: "2024-06-25",
        destaque: false
    },
    {
        id: 9,
        nome: "Lola",
        tipo: "cao",
        raca: "Poodle Mix",
        idade: "senior",
        idadeExata: "9 anos",
        sexo: "femea",
        porte: "pequeno",
        peso: "8 kg",
        cor: "Creme",
        localizacao: "São Paulo, SP",
        imagem: "https://images.unsplash.com/photo-1616190264687-b7ebf7aa3e5e?w=400&h=300&fit=crop&crop=center",
        imagens: [
            "https://images.unsplash.com/photo-1616190264687-b7ebf7aa3e5e?w=600&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=600&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop&crop=center"
        ],
        caracteristicas: ["castrado", "vacinado", "vermifugado", "sociavel"],
        personalidade: ["Doce", "Tranquila", "Companheira", "Afetuosa"],
        descricao: "Lola é uma cadelinha sênior muito doce e tranquila. Busca uma família que possa oferecer muito amor e cuidados especiais para seus anos dourados. É extremamente afetuosa.",
        saude: "Boa (cuidados especiais para idade)",
        status: "disponivel",
        dataResgate: "2024-05-15",
        destaque: false
    },
    {
        id: 10,
        nome: "Max",
        tipo: "cao",
        raca: "Golden Retriever Mix",
        idade: "jovem",
        idadeExata: "2.5 anos",
        sexo: "macho",
        porte: "grande",
        peso: "30 kg",
        cor: "Dourado Claro",
        localizacao: "São Paulo, SP",
        imagem: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop&crop=center",
        imagens: [
            "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=400&fit=crop&crop=center"
        ],
        caracteristicas: ["castrado", "vacinado", "vermifugado", "sociavel"],
        personalidade: ["Gentil", "Brincalhão", "Leal", "Paciente"],
        descricao: "Max é um cão gentil e muito paciente, especialmente com crianças. Adora brincar, nadar e fazer caminhadas. É o companheiro ideal para famílias ativas que buscam um amigo leal.",
        saude: "Excelente",
        status: "disponivel",
        dataResgate: "2024-08-01",
        destaque: true
    }
];

// ===== FUNÇÕES AUXILIARES =====

/**
 * Busca animal por ID
 * @param {number} id - ID do animal
 * @returns {Object|null} - Dados do animal ou null se não encontrado
 */
export function buscarAnimalPorId(id) {
    return animaisData.find(animal => animal.id === parseInt(id)) || null;
}

/**
 * Filtra animais com base nos critérios fornecidos
 * @param {Object} filtros - Objeto com os filtros a serem aplicados
 * @returns {Array} - Array com os animais filtrados
 */
export function filtrarAnimais(filtros = {}) {
    let animaisFiltrados = [...animaisData];
    
    // Filtro por tipo
    if (filtros.tipo && filtros.tipo !== '') {
        animaisFiltrados = animaisFiltrados.filter(animal => animal.tipo === filtros.tipo);
    }
    
    // Filtro por porte
    if (filtros.porte && filtros.porte !== '') {
        animaisFiltrados = animaisFiltrados.filter(animal => animal.porte === filtros.porte);
    }
    
    // Filtro por idade
    if (filtros.idade && filtros.idade !== '') {
        animaisFiltrados = animaisFiltrados.filter(animal => animal.idade === filtros.idade);
    }
    
    // Filtro por sexo
    if (filtros.sexo && filtros.sexo !== '') {
        animaisFiltrados = animaisFiltrados.filter(animal => animal.sexo === filtros.sexo);
    }
    
    // Filtro por características (array)
    if (filtros.caracteristicas && filtros.caracteristicas.length > 0) {
        animaisFiltrados = animaisFiltrados.filter(animal => {
            return filtros.caracteristicas.every(caracteristica => 
                animal.caracteristicas.includes(caracteristica)
            );
        });
    }
    
    return animaisFiltrados;
}

/**
 * Ordena array de animais
 * @param {Array} animais - Array de animais para ordenar
 * @param {string} criterio - Critério de ordenação
 * @returns {Array} - Array ordenado
 */
export function ordenarAnimais(animais, criterio = 'nome') {
    const animaisOrdenados = [...animais];
    
    switch (criterio) {
        case 'nome':
            return animaisOrdenados.sort((a, b) => a.nome.localeCompare(b.nome));
        
        case 'idade':
            const ordemIdade = { 'filhote': 1, 'jovem': 2, 'adulto': 3, 'senior': 4 };
            return animaisOrdenados.sort((a, b) => ordemIdade[a.idade] - ordemIdade[b.idade]);
        
        case 'porte':
            const ordemPorte = { 'pequeno': 1, 'medio': 2, 'grande': 3 };
            return animaisOrdenados.sort((a, b) => ordemPorte[a.porte] - ordemPorte[b.porte]);
        
        case 'recente':
            return animaisOrdenados.sort((a, b) => new Date(b.dataResgate) - new Date(a.dataResgate));
        
        default:
            return animaisOrdenados;
    }
}

/**
 * Busca animais em destaque
 * @returns {Array} - Array com animais em destaque
 */
export function buscarAnimaisDestaque() {
    return animaisData.filter(animal => animal.destaque === true);
}

/**
 * Paginação de resultados
 * @param {Array} animais - Array de animais
 * @param {number} pagina - Número da página (começando em 1)
 * @param {number} itensPorPagina - Quantidade de itens por página
 * @returns {Object} - Objeto com dados da paginação
 */
export function paginarResultados(animais, pagina = 1, itensPorPagina = 6) {
    const totalItens = animais.length;
    const totalPaginas = Math.ceil(totalItens / itensPorPagina);
    const indiceInicio = (pagina - 1) * itensPorPagina;
    const indiceFim = indiceInicio + itensPorPagina;
    const itens = animais.slice(indiceInicio, indiceFim);
    
    return {
        itens,
        paginaAtual: pagina,
        totalPaginas,
        totalItens,
        itensPorPagina,
        temProxima: pagina < totalPaginas,
        temAnterior: pagina > 1
    };
}

/**
 * Busca por texto (nome, raça, descrição)
 * @param {string} termo - Termo de busca
 * @returns {Array} - Array com resultados da busca
 */
export function buscarPorTexto(termo) {
    if (!termo || termo.trim() === '') {
        return animaisData;
    }
    
    const termoBusca = termo.toLowerCase().trim();
    
    return animaisData.filter(animal => {
        return animal.nome.toLowerCase().includes(termoBusca) ||
               animal.raca.toLowerCase().includes(termoBusca) ||
               animal.descricao.toLowerCase().includes(termoBusca) ||
               animal.personalidade.some(trait => trait.toLowerCase().includes(termoBusca));
    });
}

// ===== ESTATÍSTICAS =====
export const estatisticas = {
    totalAnimais: animaisData.length,
    totalCaes: animaisData.filter(animal => animal.tipo === 'cao').length,
    totalGatos: animaisData.filter(animal => animal.tipo === 'gato').length,
    totalDisponiveis: animaisData.filter(animal => animal.status === 'disponivel').length,
    totalDestaques: animaisData.filter(animal => animal.destaque === true).length
};
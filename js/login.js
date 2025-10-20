// ===== MÓDULO DE LOGIN/CADASTRO COM VALIDAÇÃO DE SENHA FORTE =====

document.addEventListener('DOMContentLoaded', function() {
    inicializarFormularioLogin();
});

/**
 * Inicializa todas as funcionalidades do formulário de login
 */
function inicializarFormularioLogin() {
    const inputSenha = document.getElementById('senha');
    const inputConfirmSenha = document.getElementById('confirm-senha');
    const formCadastro = document.getElementById('form-cadastro');
    const meterBar = document.querySelector('.meter-bar');
    const meterText = document.querySelector('.meter-text');
    const senhaMatch = document.getElementById('senha-match');

    if (!inputSenha || !inputConfirmSenha || !formCadastro) {
        console.error('Elementos do formulário não encontrados');
        return;
    }

    // Inicializa validação de senha em tempo real
    inicializarValidacaoSenha(inputSenha, meterBar, meterText);
    
    // Inicializa validação de confirmação de senha
    inicializarValidacaoConfirmacao(inputSenha, inputConfirmSenha, senhaMatch);
    
    // Inicializa validação do formulário
    inicializarValidacaoFormulario(formCadastro);
    
    // Inicializa formatação de telefone
    inicializarFormatacaoTelefone();
}

/**
 * Verifica a força da senha baseada nos pilares de segurança
 * @param {string} senha - Senha a ser verificada
 * @returns {Object} - Objeto com força e detalhes da análise
 */
function verificarForcaSenha(senha) {
    let pontuacao = 0;
    let detalhes = {
        comprimento: false,
        maiuscula: false,
        minuscula: false,
        numero: false,
        simbolo: false,
        variedade: 0
    };

    // Critério 1: Comprimento (peso maior)
    if (senha.length >= 12) {
        pontuacao += 2;
        detalhes.comprimento = true;
    } else if (senha.length >= 8) {
        pontuacao += 1;
    }

    // Critério 2: Variedade de caracteres
    if (/[a-z]/.test(senha)) {
        detalhes.minuscula = true;
        detalhes.variedade++;
    }
    
    if (/[A-Z]/.test(senha)) {
        detalhes.maiuscula = true;
        detalhes.variedade++;
    }
    
    if (/[0-9]/.test(senha)) {
        detalhes.numero = true;
        detalhes.variedade++;
    }
    
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(senha)) {
        detalhes.simbolo = true;
        detalhes.variedade++;
    }

    // Pontuação por variedade
    if (detalhes.variedade >= 4) {
        pontuacao += 2;
    } else if (detalhes.variedade === 3) {
        pontuacao += 1.5;
    } else if (detalhes.variedade === 2) {
        pontuacao += 1;
    }

    // Penalidades por padrões fracos
    if (/(.)\1{2,}/.test(senha)) { // Caracteres repetidos
        pontuacao -= 0.5;
    }
    
    if (/123|abc|qwe|password|senha/i.test(senha)) { // Padrões comuns
        pontuacao -= 1;
    }

    // Determina o nível de força
    let nivel = 'muito-fraca';
    let texto = 'Muito Fraca';
    
    if (pontuacao >= 3.5) {
        nivel = 'muito-forte';
        texto = 'Muito Forte';
    } else if (pontuacao >= 2.5) {
        nivel = 'forte';
        texto = 'Forte';
    } else if (pontuacao >= 1.5) {
        nivel = 'media';
        texto = 'Média';
    } else if (pontuacao >= 0.5) {
        nivel = 'fraca';
        texto = 'Fraca';
    }

    return {
        pontuacao,
        nivel,
        texto,
        detalhes,
        aceitavel: pontuacao >= 2 // Mínimo para cadastro
    };
}

/**
 * Inicializa validação de senha em tempo real
 */
function inicializarValidacaoSenha(inputSenha, meterBar, meterText) {
    inputSenha.addEventListener('input', function() {
        const senha = this.value;
        
        if (senha.length === 0) {
            resetarMedidor(meterBar, meterText);
            return;
        }
        
        const analise = verificarForcaSenha(senha);
        atualizarMedidorForca(meterBar, meterText, analise);
    });

    inputSenha.addEventListener('focus', function() {
        destacarInstrucoes(true);
    });

    inputSenha.addEventListener('blur', function() {
        destacarInstrucoes(false);
    });
}

/**
 * Atualiza o medidor visual de força da senha
 */
function atualizarMedidorForca(meterBar, meterText, analise) {
    // Remove classes anteriores
    meterBar.className = 'meter-bar';
    meterText.className = 'meter-text';
    
    // Adiciona nova classe baseada no nível
    meterBar.classList.add(analise.nivel);
    meterText.classList.add(analise.nivel);
    meterText.textContent = analise.texto;

    // Adiciona dicas específicas
    let dica = '';
    if (!analise.detalhes.comprimento) {
        dica = ' - Precisa de mais caracteres';
    } else if (analise.detalhes.variedade < 3) {
        dica = ' - Adicione mais tipos de caracteres';
    } else if (analise.nivel === 'forte' || analise.nivel === 'muito-forte') {
        dica = ' - Excelente escolha! 🎉';
    }
    
    meterText.textContent += dica;
}

/**
 * Reseta o medidor de força
 */
function resetarMedidor(meterBar, meterText) {
    meterBar.className = 'meter-bar';
    meterText.className = 'meter-text';
    meterText.textContent = 'Digite uma senha para ver a força';
}

/**
 * Inicializa validação de confirmação de senha
 */
function inicializarValidacaoConfirmacao(inputSenha, inputConfirmSenha, senhaMatch) {
    function validarConfirmacao() {
        const senha = inputSenha.value;
        const confirmacao = inputConfirmSenha.value;
        
        if (confirmacao.length === 0) {
            senhaMatch.textContent = '';
            senhaMatch.className = 'senha-match';
            return;
        }
        
        if (senha === confirmacao) {
            senhaMatch.textContent = '✓ Senhas coincidem';
            senhaMatch.className = 'senha-match match';
        } else {
            senhaMatch.textContent = '✗ Senhas não coincidem';
            senhaMatch.className = 'senha-match no-match';
        }
    }
    
    inputConfirmSenha.addEventListener('input', validarConfirmacao);
    inputSenha.addEventListener('input', validarConfirmacao);
}

/**
 * Destaca as instruções de senha quando o campo está em foco
 */
function destacarInstrucoes(destacar) {
    const instrucoes = document.querySelector('.instrucoes-senha');
    if (instrucoes) {
        if (destacar) {
            instrucoes.style.transform = 'scale(1.02)';
            instrucoes.style.boxShadow = 'var(--sombra-forte)';
        } else {
            instrucoes.style.transform = 'scale(1)';
            instrucoes.style.boxShadow = 'none';
        }
    }
}

/**
 * Inicializa validação completa do formulário
 */
function inicializarValidacaoFormulario(formCadastro) {
    formCadastro.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const dadosFormulario = new FormData(this);
        const resultado = validarFormularioCompleto(dadosFormulario);
        
        if (resultado.valido) {
            processarCadastro(dadosFormulario);
        } else {
            exibirErrosValidacao(resultado.erros);
        }
    });
}

/**
 * Valida todo o formulário
 */
function validarFormularioCompleto(dadosFormulario) {
    const erros = [];
    
    // Validação de nome
    const nome = dadosFormulario.get('nome').trim();
    if (nome.length < 2) {
        erros.push({ campo: 'nome', mensagem: 'Nome deve ter pelo menos 2 caracteres' });
    }
    
    // Validação de email
    const email = dadosFormulario.get('email').trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        erros.push({ campo: 'email', mensagem: 'Digite um email válido' });
    }
    
    // Validação de senha
    const senha = dadosFormulario.get('senha');
    const confirmSenha = dadosFormulario.get('confirm-senha');
    const analiseSenha = verificarForcaSenha(senha);
    
    if (!analiseSenha.aceitavel) {
        erros.push({ 
            campo: 'senha', 
            mensagem: 'Senha muito fraca. Siga as instruções para criar uma senha mais segura.' 
        });
    }
    
    if (senha !== confirmSenha) {
        erros.push({ 
            campo: 'confirm-senha', 
            mensagem: 'As senhas não coincidem' 
        });
    }
    
    // Validação de termos
    const termos = dadosFormulario.get('termos');
    if (!termos) {
        erros.push({ 
            campo: 'termos', 
            mensagem: 'Você deve concordar com os termos de uso' 
        });
    }
    
    return {
        valido: erros.length === 0,
        erros
    };
}

/**
 * Exibe erros de validação no formulário
 */
function exibirErrosValidacao(erros) {
    // Remove erros anteriores
    document.querySelectorAll('.mensagem-erro').forEach(el => el.remove());
    document.querySelectorAll('.form-grupo.erro').forEach(el => el.classList.remove('erro'));
    
    // Adiciona novos erros
    erros.forEach(erro => {
        const campo = document.getElementById(erro.campo);
        if (campo) {
            const grupo = campo.closest('.form-grupo') || campo.closest('.checkbox-grupo');
            if (grupo) {
                grupo.classList.add('erro');
                
                const mensagemErro = document.createElement('div');
                mensagemErro.className = 'mensagem-erro';
                mensagemErro.textContent = erro.mensagem;
                grupo.appendChild(mensagemErro);
                
                // Adiciona animação de shake
                campo.classList.add('shake');
                setTimeout(() => campo.classList.remove('shake'), 500);
            }
        }
    });
    
    // Foca no primeiro campo com erro
    if (erros.length > 0) {
        const primeiroCampoErro = document.getElementById(erros[0].campo);
        if (primeiroCampoErro) {
            primeiroCampoErro.focus();
        }
    }
}

/**
 * Processa o cadastro (simulação)
 */
function processarCadastro(dadosFormulario) {
    // Simula loading
    const botaoSubmit = document.querySelector('button[type="submit"]');
    const textoOriginal = botaoSubmit.textContent;
    
    botaoSubmit.disabled = true;
    botaoSubmit.textContent = 'Criando conta...';
    
    // Simula chamada para API
    setTimeout(() => {
        // Sucesso simulado
        mostrarSucesso();
        
        // Reset do formulário
        document.getElementById('form-cadastro').reset();
        resetarMedidor(
            document.querySelector('.meter-bar'),
            document.querySelector('.meter-text')
        );
        
        // Restaura botão
        botaoSubmit.disabled = false;
        botaoSubmit.textContent = textoOriginal;
        
    }, 2000);
}

/**
 * Mostra mensagem de sucesso
 */
function mostrarSucesso() {
    // Cria modal de sucesso
    const modal = document.createElement('div');
    modal.className = 'modal-sucesso';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="sucesso-icon">🎉</div>
            <h2>Conta criada com sucesso!</h2>
            <p>Bem-vindo(a) à comunidade Adote um Amigo!</p>
            <p>Agora você pode explorar nosso catálogo e encontrar seu novo melhor amigo.</p>
            <div class="modal-actions">
                <button class="btn btn-primary" onclick="fecharModalSucesso()">Explorar Catálogo</button>
                <button class="btn btn-secondary" onclick="fecharModalSucesso()">Continuar</button>
            </div>
        </div>
    `;
    
    // Estilos do modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 12px;
        text-align: center;
        max-width: 400px;
        margin: 1rem;
        animation: slideUp 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // Adiciona estilos de animação
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        .sucesso-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        .modal-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 1.5rem;
        }
        .modal-actions .btn {
            flex: 1;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Fecha modal de sucesso
 */
function fecharModalSucesso() {
    const modal = document.querySelector('.modal-sucesso');
    if (modal) {
        modal.remove();
        // Redireciona para catálogo se clicou em "Explorar"
        if (event.target.textContent.includes('Explorar')) {
            window.location.href = 'catalogo.html';
        }
    }
}

/**
 * Inicializa formatação automática de telefone
 */
function inicializarFormatacaoTelefone() {
    const inputTelefone = document.getElementById('telefone');
    
    if (inputTelefone) {
        inputTelefone.addEventListener('input', function() {
            let valor = this.value.replace(/\D/g, '');
            
            if (valor.length <= 11) {
                valor = valor.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
                valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
                valor = valor.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
                valor = valor.replace(/^(\d*)/, '($1');
            }
            
            this.value = valor;
        });
    }
}

// Torna funções globais para uso no HTML
window.fecharModalSucesso = fecharModalSucesso;

// Exporta funções principais
export {
    verificarForcaSenha,
    inicializarFormularioLogin
};
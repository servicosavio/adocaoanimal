/* auth.js - simples auth usando localStorage (apenas para testes/ensino)
   Atualizado por: Sávio Sérgio (ajustes e usuários de teste)
*/
const Auth = (function () {
  const LS_KEY = 'projeto_usuarios_v1';
  const LOGGED_KEY = 'projeto_usuario_logado';

  function _getUsers() {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error('Erro ao parsear usuários do localStorage', e);
      return [];
    }
  }

  function _saveUsers(users) {
    localStorage.setItem(LS_KEY, JSON.stringify(users));
  }

  function _findByEmail(email) {
    const users = _getUsers();
    return users.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
  }

  // Usuários de exemplo fornecidos (senhas em texto claro só para ambiente de testes)
  const SAMPLE_USERS = [
    // Nível 1: A Senha "Tapete" (Só números, 8+ chars)
    {
      nome: 'Dona Zilda (Iniciante)',
      email: 'zilda@email.com',
      senha: '12345678', // Agora com 8 dígitos
      nivel: 1,
      msgSucesso: 'Você entrou! 🥳 Mas cuidado: a senha "12345678" é longa, mas por ter só números, ainda é muito fácil de adivinhar!'
    },

    // Nível 2: A Senha "Básica" (Só letras minúsculas, 8+ chars)
    {
      nome: 'Seu Jorge (Aprendiz)',
      email: 'jorge@email.com',
      senha: 'bobzinhobob', // Mais de 8, mas só minúsculas
      nivel: 2,
      msgSucesso: 'Deu certo! 😄 "bobzinhobob" é fácil de lembrar, mas por ter só letras minúsculas, ainda é fraca. Falta misturar!'
    },

    // Nível 3: A Senha "Forte" (Mix: Maiúscula + Minúscula + Número)
    {
      nome: 'Ana (Segura)',
      email: 'ana@email.com',
      senha: 'BoloDeFuba10', // Excelente!
      nivel: 3,
      msgSucesso: 'Muito bem! 👏 "BoloDeFuba10" é uma senha forte! Mistura letras maiúsculas, minúsculas e números.'
    },

    // Nível 4: A Senha "Mestre" (Mix: Maiúscula + Minúscula + Símbolo)
    {
      nome: 'Carlos (Mestre Ninja)',
      email: 'carlos@email.com',
      senha: 'MeuGatoFazMiau!', // A sua nova senha!
      nivel: 4,
      msgSucesso: 'PERFEITO! 🏆 "MeuGatoFazMiau!" é uma senha Mestre! Usar uma frase com um símbolo no final é uma técnica excelente!'
    }
  ];

  function seedSampleUsers() {
    const users = _getUsers();
    let added = 0;

    SAMPLE_USERS.forEach(sample => {
      const exists = users.some(u => u.email.toLowerCase() === sample.email.toLowerCase() || u.usuario === sample.usuario);
      if (!exists) {
        users.push({ nome: sample.nome, usuario: sample.usuario, email: sample.email, senha: sample.senha });
        added++;
      }
    });

    if (added > 0) {
      _saveUsers(users);
      console.info(`seedSampleUsers: ${added} usuário(s) de teste adicionados.`);
    } else {
      console.info('seedSampleUsers: nenhum usuário novo necessário (já existem).');
    }
  }

  function loginUser(email, senha) {
    if (!email || !senha) return { ok: false, message: 'Preencha e-mail e senha.' };
    const user = _findByEmail(email);
    if (!user) return { ok: false, message: 'Usuário não encontrado.' };
    if (user.senha !== senha) return { ok: false, message: 'Senha incorreta.' };

    // marca como logado (simples)
    localStorage.setItem(LOGGED_KEY, JSON.stringify({ email: user.email, usuario: user.usuario, nome: user.nome, ts: Date.now() }));
    return { ok: true, message: 'Logado com sucesso', user };
  }

  function registerUser(data) {
    // espera { nome, email, senha, "confirm-senha", termos }
    const nome = (data.nome || '').trim();
    const email = (data.email || '').trim();
    const senha = data.senha || '';
    const confirm = data['confirm-senha'] || '';
    const termos = data.termos;

    if (nome.length < 2) return { ok: false, message: 'Nome deve ter pelo menos 2 caracteres.' };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return { ok: false, message: 'E-mail inválido.' };
    if (senha.length < 8) return { ok: false, message: 'Senha deve ter ao menos 8 caracteres.' };
    if (senha !== confirm) return { ok: false, message: 'As senhas não coincidem.' };
    if (!termos) return { ok: false, message: 'Você deve aceitar os termos.' };

    const users = _getUsers();
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, message: 'Já existe uma conta com esse e-mail.' };
    }

    // gerar username simples (nome + número)
    let baseUser = nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '.');
    let usuario = baseUser;
    let counter = 1;
    while (users.some(u => u.usuario === usuario)) {
      usuario = `${baseUser}${counter}`;
      counter++;
    }

    const novo = { nome, usuario, email, senha };
    users.push(novo);
    _saveUsers(users);
    return { ok: true, message: 'Usuário criado', user: novo };
  }

  function logout() {
    localStorage.removeItem(LOGGED_KEY);
  }

  function getLoggedUser() {
    const raw = localStorage.getItem(LOGGED_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  }

  // Função útil para debug: listar todos os usuários (apenas ambiente local)
  function getAllUsers() {
    return _getUsers();
  }

  return {
    seedSampleUsers,
    loginUser,
    registerUser,
    logout,
    getLoggedUser,
    getAllUsers
  };
})();

// export para scripts inline (compatibilidade)
window.Auth = Auth;

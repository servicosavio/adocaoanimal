/* auth.js - simples auth usando localStorage (apenas para testes/ensino)
   Atualizado por: Sávio Sérgio (ajustes e usuários de teste)
*/
const Auth = (function() {
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
    // Frases de origem (apenas referência nos comentários)
    // pessoa1 — *(Sua sugestão: 1-Gosto @ 13 Year just for a very Tall 4 **$*nake)
    { nome: 'Pessoa Um', usuario: 'pessoa1', email: 'pessoa1@gmail.com', senha: '1G@13YjfavT4$' },

    // pessoa2 — Eu vou !uma 2024 *Casa muito querida**!**
    { nome: 'Pessoa Dois', usuario: 'pessoa2', email: 'pessoa2@outlook.com', senha: 'Euv!u2024*Cmq!' },

    // pessoa3 — $Para dar muito @ dia 7 vezes Mais**!**
    { nome: 'Pessoa Três', usuario: 'pessoa3', email: 'p3.teste@yahoo.com', senha: '$Pdm@d7vM!' },

    // pessoa4 — #4 Amor não Dói**?m**inha Opiniao 7 Azul
    { nome: 'Pessoa Quatro', usuario: 'pessoa4', email: 'tester_4@mail.com', senha: '#4AnD?mO7A' },

    // pessoa5 — Come !neste frio Cerveja 5 _ @ gela 0 relva 4 !
    { nome: 'Pessoa Cinco', usuario: 'pessoa5', email: 'user_cinco@web.com', senha: 'C!nfC5_@g0r4' },

    // pessoa6 — 1 Maleta 0 talento 0 bola !kind 3 _ Batata 7 !
    { nome: 'Pessoa Seis', usuario: 'pessoa6', email: 'teste_6@email.com', senha: '1M0t0b!k3_B7' }
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

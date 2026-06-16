// ═══════════════════════════════════════════════════════════════
// CONFIGURAÇÃO DA CLÍNICA — edite APENAS este arquivo para cada cliente
// ═══════════════════════════════════════════════════════════════
// Para criar uma nova clínica: copie este arquivo e preencha os dados abaixo.
// Os arquivos HTML ficam IDÊNTICOS entre clientes.

const CLINICA_CONFIG = {

  // ── Banco de dados Supabase ──────────────────────────────────
  sb_url: 'https://rsdgztfvqnkrhzrkihol.supabase.co',
  sb_key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzQ5NjAwMDAwLCJleHAiOjIxNDk2MDAwMDB9.u9VULfDm5Ql-4ufiTkwz8Np0AvWy9Jcf3pB2RwYBUwg',

  // ── Informações da clínica ───────────────────────────────────
  nome:          'Dra. Anna Carolina Dias',
  especialidade: 'Harmonização Orofacial',
  cro:           'CRO 82281',
  telefone:      '(17) 98211-3940',
  whatsapp:      '5517982113993',
  endereco:      'Rua Capitão Daniel da Cunha Morais, 632',
  cidade:        'Tanabi/SP',
  cep:           'CEP 15170-027',
  logo:          'logo.jpg',           // caminho relativo ou URL completa

  // ── Sistema ──────────────────────────────────────────────────
  base_url:      'https://claudiogallegoadv.github.io/clinica-anna-carolina/',

  // ── Segurança ────────────────────────────────────────────────
  senha:         '1234',   // PIN de acesso — troque por algo seguro!
  sessao_horas:  8,        // horas antes de pedir PIN novamente

};

// ── Atalhos compatíveis com o código existente ───────────────
// Todos os HTMLs continuam funcionando sem alteração pois
// as variáveis SB_URL e SB_KEY continuam existindo globalmente.
const SB_URL = CLINICA_CONFIG.sb_url;
const SB_KEY  = CLINICA_CONFIG.sb_key;

// ── Funções de autenticação ──────────────────────────────────
function authCheck(redirectTo){
  // Verifica se há sessão válida; se não, redireciona para login
  try{
    const auth = JSON.parse(localStorage.getItem('clinica_auth')||'{}');
    if(auth.ok && auth.expires > Date.now()) return true; // sessão válida
  }catch(e){}
  // Sem sessão — redireciona para login
  const dest = redirectTo || window.location.href;
  window.location.href = 'login.html?r='+encodeURIComponent(dest);
  return false;
}

function authLogin(pin){
  if(pin !== CLINICA_CONFIG.senha) return false;
  localStorage.setItem('clinica_auth', JSON.stringify({
    ok: true,
    expires: Date.now() + (CLINICA_CONFIG.sessao_horas * 3600 * 1000)
  }));
  return true;
}

function authLogout(){
  localStorage.removeItem('clinica_auth');
  window.location.href = 'login.html';
}

// ── Preencher metadados da clínica na página ─────────────────
document.addEventListener('DOMContentLoaded', function(){
  // Atualizar title
  if(document.title && !document.title.includes(CLINICA_CONFIG.nome)){
    document.title = document.title + ' — ' + CLINICA_CONFIG.nome;
  }
});

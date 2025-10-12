const errorSound = new Audio('./sounds/windows98Error.mp3');
const notificationSound = new Audio('./sounds/windows98Notify.mp3');
const tadaaSound = new Audio("./sounds/tadaa.mp3");
const dialUpSound = new Audio('./sounds/dialUpInternet.mp3');

function soundError() {
  errorSound.play();
}

function soundNotification() {
  notificationSound.play();
}

function soundTadaa() {
  tadaaSound.play();
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  const clearBtn = document.getElementById('clearBtn');


  let isComplex = localStorage.getItem('modoComplexo') === 'false' ? false : true;
  
  function initCheckboxes() {
    document.querySelectorAll('.checkboxItem').forEach(cb => {
      const label = cb.closest('.item').querySelector('label');


      if(cb.dataset.key && localStorage.getItem(cb.dataset.key) === 'true') {
        cb.checked = true;
        label.classList.add('checked-label');
      }


      cb.addEventListener('change', () => {
        if(cb.dataset.key) localStorage.setItem(cb.dataset.key, cb.checked);
        if(cb.checked) label.classList.add('checked-label');
        else label.classList.remove('checked-label');
      });
    });
  }

 
  function updateCheckboxesMode() {
    document.querySelectorAll('.item').forEach(item => {
      const label = item.querySelector('label');
      const wrapper = item.querySelector('.checkbox-wrapper');


      wrapper.querySelectorAll('.checkboxItem').forEach(cb => cb.remove());

      if(isComplex) {
   
        for(let i = 1; i <= 3; i++) {
          const cb = document.createElement('input');
          cb.type = 'checkbox';
          cb.classList.add('checkboxItem');
          cb.dataset.key = label.textContent + '-cb' + i; 
          wrapper.appendChild(cb);
        }
      } else {

        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.classList.add('checkboxItem');
        cb.dataset.key = label.textContent + '-cb1';
        wrapper.appendChild(cb);
      }
    });

    initCheckboxes();
  }

  updateCheckboxesMode();

  const complexOption = document.getElementById('complexOption');
  complexOption.textContent = isComplex ? 'Modo Simples' : 'Modo Complexo';
  complexOption.addEventListener('click', () => {
    isComplex = !isComplex;
    localStorage.setItem('modoComplexo', isComplex); 
    complexOption.textContent = isComplex ? 'Modo Simples' : 'Modo Complexo';
    updateCheckboxesMode();
    sidebar.classList.remove('active');
  });


  const manualOption = document.getElementById('manualOption');
  manualOption.addEventListener('click', () => {
    window.location.href= "./pages/manual.html"
    sidebar.classList.remove('active');
  });


  clearBtn.addEventListener('click', () => {
    document.querySelectorAll('.checkboxItem').forEach(cb => {
      cb.checked = false;
      const label = cb.closest('.item').querySelector('label');
      label.classList.remove('checked-label');
      if(cb.dataset.key) localStorage.removeItem(cb.dataset.key);
    });
    updateCheckboxesMode(); // Reseta para modo atual
  });


  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });

});

const openPopupBtn = document.getElementById('openPopupBtn');
const closePopupBtn = document.getElementById('closePopupBtn');
const popupOverlay = document.getElementById('popupOverlay');
const checkAnswerBtn = document.getElementById('checkAnswerBtn');
const feedback = document.getElementById('feedback');

const questions = [
  // Fácil
  {
  text: "Fácil: Qual das opções abaixo é um exemplo de senha fraca?",
  options: { A: "Senha@2025!", B: "123456", C: "MudarSenhaHoje", D: "Xy!89b2" },
  correctAnswer: "B"
  },
  {
  text: "Fácil: Qual das opções a seguir pode indicar um site falso?",
  options: { A: "Endereço com HTTPS", B: "Erros de ortografia no nome", C: "Cadeado na barra de endereço", D: "Design profissional" },
  correctAnswer: "B"
  },
  {
    text: "Fácil: Qual destas atitudes ajuda a evitar vírus no computador?",
    options: { A: "Evitar clicar em links suspeitos", B: "Desativar o antivírus", C: "Baixar arquivos de qualquer site", D: "Ignorar atualizações" },
    correctAnswer: "A"
  },
  {
    text: "Fácil: O que é uma rede Wi-Fi protegida?",
    options: { A: "Rede com senha e criptografia", B: "Rede aberta a todos", C: "Rede sem senha", D: "Rede compartilhada em cafés" },
    correctAnswer: "A"
  },
  {
    text: "Fácil: Qual destas práticas aumenta a privacidade online?",
    options: { A: "Usar senhas diferentes em cada site", B: "Usar sempre a mesma senha", C: "Compartilhar dados pessoais em redes sociais", D: "Salvar senhas no navegador público" },
    correctAnswer: "A"
  },
  {
    text: "Fácil: Qual dessas opções é um exemplo de boa prática de segurança com e-mails?",
    options: { A: "Verificar o remetente antes de clicar em links", B: "Abrir qualquer anexo recebido", C: "Responder a mensagens suspeitas", D: "Compartilhar senhas por e-mail" },
    correctAnswer: "A"
  },
  {
    text: "Fácil: O que significa 'backup'?",
    options: { A: "Cópia de segurança dos dados", B: "Programa antivírus", C: "Rede sem fio", D: "Firewall automático" },
    correctAnswer: "A"
  },
  {
    text: "Fácil: Qual é o principal objetivo de um firewall?",
    options: { A: "Aumentar a velocidade da internet", B: "Proteger a rede de acessos não autorizados", C: "Apagar arquivos antigos", D: "Gerar relatórios automáticos" },
    correctAnswer: "B"
  },
  {
    text: "Fácil: O que significa o termo 'malware'?",
    options: { A: "Software malicioso", B: "Antivírus", C: "Firewall", D: "Backup" },
    correctAnswer: "A"
  },
  {
    text: "Fácil: Qual prática ajuda a manter suas senhas seguras?",
    options: { A: "Usar a mesma senha em todos os sites", B: "Anotar senhas no caderno", C: "Criar senhas longas e complexas", D: "Compartilhar com colegas confiáveis" },
    correctAnswer: "C"
  },
  {
    text: "Fácil: O que é phishing?",
    options: { A: "Ataque físico ao computador", B: "Envio de e-mails falsos para roubar dados", C: "Backup automático", D: "Instalação de antivírus" },
    correctAnswer: "B"
  },
  {
    text: "Fácil: Qual destes dispositivos ajuda a proteger uma rede doméstica?",
    options: { A: "Roteador com firewall", B: "Pen drive", C: "Teclado", D: "Monitor" },
    correctAnswer: "A"
  },
  {
    text: "Fácil: Por que é importante atualizar o sistema operacional?",
    options: { A: "Para mudar a cor da interface", B: "Para corrigir falhas de segurança", C: "Para reduzir o uso de memória", D: "Para excluir arquivos antigos" },
    correctAnswer: "B"
  },
  {
    text: "Fácil: O que é autenticação em dois fatores?",
    options: { A: "Login apenas com senha", B: "Login com senha e outro método de verificação", C: "Login apenas com e-mail", D: "Login automático" },
    correctAnswer: "B"
  },
  {
    text: "Fácil: O que um antivírus faz?",
    options: { A: "Protege contra programas maliciosos", B: "Acelera a internet", C: "Apaga documentos antigos", D: "Cria contas de usuário" },
    correctAnswer: "A"
  },
  {
    text: "Fácil: Qual prática é segura ao usar Wi-Fi público?",
    options: { A: "Conectar sem proteção", B: "Usar VPN", C: "Desligar firewall", D: "Usar senhas repetidas" },
    correctAnswer: "B"
  },
  {
    text: "Fácil: O que é criptografia?",
    options: { A: "Backup automático de arquivos", B: "Transformação de dados para mantê-los seguros", C: "Software de monitoramento", D: "Tipo de firewall" },
    correctAnswer: "B"
  },

  {
    text: "Fácil: Qual é o objetivo principal da segurança da informação?",
    options: { A: "Reduzir custos de TI", B: "Proteger dados contra ameaças", C: "Tornar a internet mais rápida", D: "Aumentar o número de usuários" },
    correctAnswer: "B"
  },
  {
    text: "Fácil: Qual destas opções não é um tipo de ameaça à segurança da informação?",
    options: { A: "Vírus", B: "Malware", C: "Firewall", D: "Phishing" },
    correctAnswer: "C"
  },
  {
    text: "Fácil: O que é uma senha forte?",
    options: { A: "Uma senha curta e fácil de lembrar", B: "Uma senha com nome da pessoa", C: "Uma senha longa, com letras, números e símbolos", D: "Uma senha igual em todas as contas" },
    correctAnswer: "C"
  },
  {
    text: "Fácil: O que significa “https” no início de um site?",
    options: { A: "O site está lento", B: "O site está seguro com criptografia", C: "O site está em manutenção", D: "O site é falso" },
    correctAnswer: "B"
  },
  {
    text: "Fácil: Qual ferramenta é usada para proteger redes contra acessos não autorizados?",
    options: { A: "Word", B: "Firewall", C: "Excel", D: "Paint" },
    correctAnswer: "B"
  },
  {
    text: "Fácil: Qual destes exemplos é um cuidado básico de segurança digital?",
    options: { A: "Compartilhar senhas com colegas", B: "Anotar a senha na tela do computador", C: "Atualizar sistemas regularmente", D: "Usar Wi-Fi público sem proteção" },
    correctAnswer: "C"
  },
  {
    text: "Fácil: Qual é a função principal de um antivírus?",
    options: { A: "Deixar o computador mais rápido", B: "Proteger contra softwares maliciosos", C: "Criar arquivos de backup automaticamente", D: "Desinstalar programas" },
    correctAnswer: "B"
  },
  {
    text: "Fácil: O que phishing geralmente tenta fazer?",
    options: { A: "Roubar informações pessoais", B: "Melhorar a velocidade da internet", C: "Limpar vírus automaticamente", D: "Instalar atualizações no sistema" },
    correctAnswer: "A"
  },
  {
    text: "Fácil: Qual das opções a seguir é um exemplo de engenharia social?",
    options: { A: "Invasão de rede via força bruta", B: "Enganar alguém para revelar senhas", C: "Escanear portas de rede", D: "Atualizar um software" },
    correctAnswer: "B"
  },
  {
    text: "Fácil: Qual dessas práticas aumenta a segurança da conta?",
    options: { A: "Usar senha “123456”", B: "Ativar autenticação em dois fatores", C: "Compartilhar login com amigos", D: "Desativar notificações de login" },
    correctAnswer: "B"
  },

  // Médio
  {
    text: "Médio: O que é autenticação biométrica?",
    options: { A: "Uso de impressão digital, rosto ou íris para autenticar", B: "Login com senha fraca", C: "Login automático", D: "Login por link de e-mail" },
    correctAnswer: "A"
  },
  {
    text: "Médio: Qual destas ações ajuda a evitar vazamento de dados em empresas?",
    options: { A: "Treinar funcionários em boas práticas de segurança", B: "Deixar senhas anotadas em post-its", C: "Desativar antivírus", D: "Usar rede pública sem proteção" },
    correctAnswer: "A"
  },
  {
    text: "Médio: Qual é a função de um certificado SSL?",
    options: { A: "Criptografar dados trocados entre navegador e servidor", B: "Aumentar a velocidade do site", C: "Bloquear anúncios", D: "Fazer backup automático" },
    correctAnswer: "A"
  },
  {
    text: "Médio: Qual é uma boa prática ao criar uma senha?",
    options: { A: "Misturar letras, números e símbolos", B: "Usar apenas o primeiro nome", C: "Usar '123456'", D: "Deixar em branco" },
    correctAnswer: "A"
  },
  {
    text: "Médio: Por que é perigoso usar redes Wi-Fi públicas sem proteção?",
    options: { A: "Pode permitir que invasores interceptem dados", B: "Deixa a internet mais lenta", C: "Impede atualizações", D: "Gasta bateria" },
    correctAnswer: "A"
  },
  {
    text: "Médio: O que é um ataque de ransomware?",
    options: { A: "Bloqueio de arquivos por vírus para exigir resgate", B: "Ataque físico ao servidor", C: "Acesso gratuito a softwares pagos", D: "Limpeza automática do disco" },
    correctAnswer: "A"
  },
  {
    text: "Médio: O que significa 'VPN'?",
    options: { A: "Rede privada virtual", B: "Proteção de arquivos locais", C: "Versão de antivírus", D: "Sistema de backup" },
    correctAnswer: "A"
  },
  {
    text: "Médio: Qual é o risco de usar a mesma senha em vários sites?",
    options: { A: "Não há risco", B: "Perda de controle de múltiplas contas se uma for hackeada", C: "Aumenta a velocidade de login", D: "Protege melhor os dados" },
    correctAnswer: "B"
  },
  {
    text: "Médio: O que é engenharia social em segurança digital?",
    options: { A: "Uso de força física para invadir", B: "Manipular pessoas para revelar informações confidenciais", C: "Instalar antivírus automaticamente", D: "Criptografar dados" },
    correctAnswer: "B"
  },
  {
    text: "Médio: Qual prática ajuda a evitar ataques de phishing?",
    options: { A: "Abrir links suspeitos", B: "Verificar remetente e autenticidade do e-mail", C: "Desativar firewall", D: "Usar mesma senha em todas contas" },
    correctAnswer: "B"
  },
  {
    text: "Médio: O que é um keylogger?",
    options: { A: "Programa que grava tudo que é digitado", B: "Firewall avançado", C: "Backup automático", D: "VPN de alta velocidade" },
    correctAnswer: "A"
  },
  {
    text: "Médio: Por que o backup em nuvem é útil?",
    options: { A: "Para economizar internet", B: "Para proteger arquivos em caso de falha local", C: "Para acelerar programas", D: "Para criar senhas seguras" },
    correctAnswer: "B"
  },
  {
    text: "Médio: O que significa autenticação multifator (MFA)?",
    options: { A: "Login com apenas senha", B: "Login usando múltiplos métodos de verificação", C: "Login sem senha", D: "Login automático em todos dispositivos" },
    correctAnswer: "B"
  },
  {
    text: "Médio: Qual destas práticas protege contra ataques de força bruta?",
    options: { A: "Usar senhas simples", B: "Limitar tentativas de login", C: "Desativar VPN", D: "Usar Wi-Fi público" },
    correctAnswer: "B"
  },
  {
    text: "Médio: O que significa 'HTTPS' em sites?",
    options: { A: "Site seguro com criptografia", B: "Site lento", C: "Site gratuito", D: "Site em manutenção" },
    correctAnswer: "A"
  },
  {
    text: "Médio: Qual é a função da autenticação de dois fatores (2FA)?",
    options: { A: "Tornar o login mais rápido", B: "Adicionar uma camada extra de segurança", C: "Substituir a senha", D: "Reduzir armazenamento de dados" },
    correctAnswer: "B"
  },
  {
    text: "Médio: Qual destas opções representa um malware?",
    options: { A: "Backup", B: "Ransomware", C: "Firewall", D: "Criptografia" },
    correctAnswer: "B"
  },
  {
    text: "Médio: O que é um ataque de força bruta?",
    options: { A: "Usar engenharia social para enganar", B: "Adivinhar senhas testando várias combinações", C: "Roubar dados via Wi-Fi público", D: "Usar antivírus para invadir um sistema" },
    correctAnswer: "B"
  },
  {
    text: "Médio: O que é um backup?",
    options: { A: "Um tipo de firewall", B: "Uma cópia de segurança dos dados", C: "Um método de phishing", D: "Um antivírus atualizado" },
    correctAnswer: "B"
  },
  {
    text: "Médio: O que diferencia HTTPS de HTTP?",
    options: { A: "HTTPS usa criptografia para proteger dados", B: "HTTP é mais rápido", C: "HTTPS é mais barato", D: "HTTP é exclusivo para e-mails" },
    correctAnswer: "A"
  },
  {
    text: "Médio: O que é um keylogger?",
    options: { A: "Um tipo de firewall", B: "Um antivírus", C: "Um programa que grava teclas digitadas", D: "Um dispositivo USB" },
    correctAnswer: "C"
  },
  {
    text: "Médio: Qual destas ações ajuda a evitar ataques de phishing?",
    options: { A: "Clicar em links suspeitos", B: "Confirmar a origem dos e-mails", C: "Usar sempre a mesma senha", D: "Desativar firewall" },
    correctAnswer: "B"
  },
  {
    text: "Médio: Por que é importante manter o software atualizado?",
    options: { A: "Para mudar a aparência da interface", B: "Para remover vírus automaticamente", C: "Para corrigir falhas de segurança", D: "Para aumentar a velocidade da internet" },
    correctAnswer: "C"
  },
  {
    text: "Médio: Qual destas opções é um exemplo de autenticação forte?",
    options: { A: "Apenas senha", B: "Senha + impressão digital", C: "Apenas e-mail", D: "Apenas nome de usuário" },
    correctAnswer: "B"
  },
  {
    text: "Médio: O que é VPN?",
    options: { A: "Um antivírus gratuito", B: "Uma rede privada virtual que protege dados online", C: "Um servidor de e-mails", D: "Um programa de edição de texto" },
    correctAnswer: "B"
  },
  {
  text: "Médio: O que caracteriza um ataque de phishing bem elaborado?",
  options: { A: "E-mails com links e aparência profissional", B: "Links quebrados", C: "Erros de digitação evidentes", D: "Sites sem layout" },
  correctAnswer: "A"
  },

  // Difícil
  {
  text: "Difícil: O que é exfiltração de dados?",
  options: { A: "Roubo e envio de dados confidenciais para fora da rede", B: "Criptografia de dados locais", C: "Criação de senhas fortes", D: "Backup em nuvem" },
  correctAnswer: "A"
  },
  {
  text: "Difícil: Qual técnica permite mascarar tráfego de ataque distribuído?",
  options: { A: "Botnets", B: "Firewall básico", C: "VPN doméstica", D: "Antivírus offline" },
  correctAnswer: "A"
  },
  {
    text: "Difícil: Qual destas técnicas é usada para detectar atividades suspeitas em redes?",
    options: { A: "Monitoramento de logs e IDS", B: "Abrir portas do firewall", C: "Compartilhar credenciais", D: "Desativar alertas de segurança" },
    correctAnswer: "A"
  },
  {
    text: "Difícil: O que é um ataque de spoofing?",
    options: { A: "Falsificar identidade para enganar sistemas ou pessoas", B: "Criptografar dados automaticamente", C: "Fazer backup de segurança", D: "Interromper rede local" },
    correctAnswer: "A"
  },
  {
    text: "Difícil: Qual técnica garante que uma mensagem não foi modificada?",
    options: { A: "Verificação por hash", B: "Backup automático", C: "Envio por e-mail", D: "Uso de senha simples" },
    correctAnswer: "A"
  },
  {
    text: "Difícil: Qual destas opções descreve um ataque de injeção SQL?",
    options: { A: "Inserir comandos maliciosos em formulários para acessar banco de dados", B: "Interceptar comunicação entre dois dispositivos", C: "Forçar tentativa de senha", D: "Infectar roteador com malware" },
    correctAnswer: "A"
  },
  {
    text: "Difícil: Qual é a principal defesa contra ataques de engenharia social em empresas?",
    options: { A: "Treinamento de funcionários e conscientização", B: "Senhas simples e curtas", C: "Desabilitar antivírus", D: "Ignorar alertas de segurança" },
    correctAnswer: "A"
  },
  {
    text: "Difícil: O que é um ataque de 'Man-in-the-Middle'?",
    options: { A: "Interceptação de comunicação entre duas partes", B: "Ataque físico ao servidor", C: "Instalação de antivírus remoto", D: "Criação de backup automático" },
    correctAnswer: "A"
  },
  {
    text: "Difícil: Qual é a função de um IDS (Intrusion Detection System)?",
    options: { A: "Detectar tentativas de invasão na rede", B: "Acelerar a internet", C: "Criar senhas automáticas", D: "Backup em nuvem" },
    correctAnswer: "A"
  },
  {
    text: "Difícil: O que significa o princípio de 'menor privilégio'?",
    options: { A: "Todos têm acesso total", B: "Cada usuário recebe apenas permissões necessárias", C: "Permissões ilimitadas temporárias", D: "Bloquear todos os acessos" },
    correctAnswer: "B"
  },
  {
    text: "Difícil: Qual protocolo garante integridade de dados durante transmissão?",
    options: { A: "HTTP", B: "HTTPS/TLS", C: "FTP", D: "SMTP" },
    correctAnswer: "B"
  },
  {
    text: "Difícil: Qual é a diferença entre um worm e um vírus?",
    options: { A: "Worm se propaga sozinho, vírus precisa de hospedeiro", B: "Vírus é inofensivo", C: "Worm só funciona offline", D: "Não há diferença" },
    correctAnswer: "A"
  },
  {
    text: "Difícil: O que é DDoS?",
    options: { A: "Ataque que sobrecarrega um servidor com tráfego massivo", B: "Criptografia de dados", C: "Firewall reverso", D: "Backup remoto" },
    correctAnswer: "A"
  },
  {
    text: "Difícil: Qual prática ajuda a proteger dados em servidores corporativos?",
    options: { A: "Criptografia em repouso", B: "Senhas simples", C: "Desabilitar backup", D: "Compartilhar credenciais" },
    correctAnswer: "A"
  },
  {
    text: "Difícil: Qual técnica é usada para mascarar origem de ataques?",
    options: { A: "Proxy ou botnet", B: "Firewall simples", C: "Atualização de software", D: "VPN gratuita" },
    correctAnswer: "A"
  },
  {
    text: "Difícil: Qual é a principal função de um honeypot?",
    options: { A: "Atrair ataques para estudar invasores", B: "Aumentar velocidade da rede", C: "Apagar vírus automaticamente", D: "Backup de arquivos críticos" },
    correctAnswer: "A"
  },
  {
    text: "Difícil: O que é um ataque 'zero-day'?",
    options: { A: "Exploração de vulnerabilidade desconhecida pelo fabricante", B: "Ataque de força bruta", C: "Envio de malware antigo", D: "Falha de backup automático" },
    correctAnswer: "A"
  },
  {
    text: "Difícil: Qual protocolo é usado para criptografia em HTTPS?",
    options: { A: "FTP", B: "SSH", C: "TLS/SSL", D: "SMTP" },
    correctAnswer: "C"
  },
  {
    text: "Difícil: O que caracteriza um ataque DDoS?",
    options: { A: "Roubo de senhas via phishing", B: "Interceptação de pacotes de rede", C: "Envio massivo de tráfego para derrubar um servidor", D: "Invasão física ao servidor" },
    correctAnswer: "C"
  },
  {
    text: "Difícil: Qual dessas opções não é uma boa prática de segurança em redes corporativas?",
    options: { A: "Segregar redes por VLAN", B: "Compartilhar senhas entre usuários", C: "Monitorar logs de acesso", D: "Aplicar patches de segurança" },
    correctAnswer: "B"
  },
  {
    text: "Difícil: Qual técnica é usada para garantir que dados não foram alterados durante a transmissão?",
    options: { A: "Autenticação", B: "Integridade com hash", C: "Backup em nuvem", D: "Redundância" },
    correctAnswer: "B"
  },
  {
    text: "Difícil: Qual é a diferença entre um vírus e um worm?",
    options: { A: "Worm não precisa de hospedeiro para se propagar", B: "Vírus é mais perigoso", C: "Worm só funciona offline", D: "Não há diferença" },
    correctAnswer: "A"
  },
  {
    text: "Difícil: O que significa o princípio de “menor privilégio”?",
    options: { A: "Dar acesso total a todos os usuários", B: "Limitar acessos apenas ao necessário para a função", C: "Conceder privilégios temporários ilimitados", D: "Bloquear todos os acessos" },
    correctAnswer: "B"
  },
  {
    text: "Difícil: Qual técnica é usada para esconder a origem real de um ataque?",
    options: { A: "Firewall reverso", B: "Proxy ou botnet", C: "Antivírus atualizado", D: "Phishing simples" },
    correctAnswer: "B"
  },
  {
    text: "Difícil: Qual destas opções representa um ataque de “Man-in-the-Middle”?",
    options: { A: "Interceptar a comunicação entre dois dispositivos", B: "Invadir um servidor de e-mail", C: "Forçar acesso físico ao servidor", D: "Clicar em um link malicioso" },
    correctAnswer: "A"
  },
  {
    text: "Difícil: Qual destas medidas ajuda a proteger dados armazenados em servidores?",
    options: { A: "Senhas simples", B: "Criptografia em repouso", C: "Desabilitar backup", D: "Compartilhar credenciais" },
    correctAnswer: "B"
  },
  {
    text: "Difícil: Qual destas opções descreve melhor a autenticação multifator (MFA)?",
    options: { A: "Usar apenas login e senha", B: "Usar múltiplos métodos de verificação", C: "Confiar apenas em um dispositivo", D: "Ter acesso irrestrito ao sistema" },
    correctAnswer: "B"
  }
];

let currentQuestion = null;

function loadQuestion() {
  const randomIndex = Math.floor(Math.random() * questions.length);
  currentQuestion = questions[randomIndex];

  document.getElementById('questionTitle').textContent = currentQuestion.text;
  document.getElementById('optionA').textContent = currentQuestion.options.A;
  document.getElementById('optionB').textContent = currentQuestion.options.B;
  document.getElementById('optionC').textContent = currentQuestion.options.C;
  document.getElementById('optionD').textContent = currentQuestion.options.D;

  document.querySelectorAll('input[name="answer"]').forEach(input => input.checked = false);
  feedback.textContent = "";
  feedback.className = "";
}

openPopupBtn.addEventListener('click', () => {
  notificationSound.play();
  loadQuestion();
  popupOverlay.classList.add('active');
});

closePopupBtn.addEventListener('click', () => {
  popupOverlay.classList.remove('active');
});

checkAnswerBtn.addEventListener('click', () => {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) {
    feedback.textContent = "Selecione uma resposta!";
    feedback.className = "incorrect";
    return;
  }

  if (selected.value === currentQuestion.correctAnswer) {
    feedback.textContent = "Resposta correta!";
    feedback.className = "correct";
    showPhrasePopup(true); 
  } else {
    feedback.textContent = `Resposta incorreta! A correta era: ${currentQuestion.correctAnswer}`;
    feedback.className = "incorrect";
    showPhrasePopup(false); 
  }
});

const popupOverlay2 = document.getElementById('popupOverlay2');

const correctAnswerPhrases = [
  "Jogue um dado a mais na próxima rodada!",
  "Você ganhou proteção contra um palpite!",
  "Você ganhou mais um uso de atalho!",
  "Você ganhou mais um uso de atalho!",
  "Caso queira, jogue os dados novamente!",
  "Jogue um dado a mais na próxima rodada!",
  "Você ganhou mais um uso de atalho!",
  "Caso queira, jogue os dados novamente!",
  "Jogue um dado a mais na próxima rodada!",
  "Você ganhou mais um uso de atalho!",
  "Caso queira, jogue os dados novamente!",
];

const wrongAnswerPhrases = [
  "Não jogue na próxima rodada!",
  "Vá para a recepção!",
  "Não faça um palpite na próxima rodada!",
  "Vá para a sala de administração!",
  "Não faça um palpite na próxima rodada!",
  "Subtraía 2 dos dados na próxima rodada!",
  "Subtraía 1 dos dados na próxima rodada!",
  "Subtraía 3 dos dados na próxima rodada!",
  "Não faça um palpite na próxima rodada!",
  "Subtraía 1 dos dados na próxima rodada!",
  "Não jogue na próxima rodada!",
];

function showPhrasePopup(answer) {
  popupOverlay2.classList.add('active');
  if (answer == true){
  tadaaSound.play();
  const randomIndex = Math.floor(Math.random() * correctAnswerPhrases.length);
  document.getElementById('phraseText').textContent = correctAnswerPhrases[randomIndex];
  document.getElementById('categoryTitlepopup2').textContent = "Parabéns!";
  }
  else {
 errorSound.play();
 const randomIndex = Math.floor(Math.random() * wrongAnswerPhrases.length);
 document.getElementById('phraseText').textContent = wrongAnswerPhrases[randomIndex];
 document.getElementById('categoryTitlepopup2').textContent = "Errado";
  }
  
}

closePopupBtn2.addEventListener('click', () => {
  popupOverlay.classList.remove('active');
  popupOverlay2.classList.remove('active');
});

  let clickCount = 0; 


  function dialUp() {
    clickCount++;
    if (clickCount == 10) {
      dialUpSound.play();
   }
 }
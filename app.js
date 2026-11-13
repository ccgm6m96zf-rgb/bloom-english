/* Bloom English — código local, sem bibliotecas externas nem pedidos a APIs. */
(() => {
  'use strict';

  const STORAGE_KEY = 'bloom-english-progress-v1';
  const TODAY_GOAL = 30;
  const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];

  const WORDS = [
    { id: 'hello', en: 'hello', pt: 'olá', example: 'Hello, how are you today?', category: 'everyday', level: 'A1' },
    { id: 'improve', en: 'improve', pt: 'melhorar', example: 'I want to improve my English.', category: 'everyday', level: 'A2' },
    { id: 'practice', en: 'practice', pt: 'praticar; prática', example: 'A little practice helps me feel ready.', category: 'everyday', level: 'A1' },
    { id: 'lesson', en: 'lesson', pt: 'aula; lição', example: 'This lesson has three short exercises.', category: 'university', level: 'A1' },
    { id: 'answer', en: 'answer', pt: 'resposta; responder', example: 'Take a moment to answer the question.', category: 'university', level: 'A1' },
    { id: 'question', en: 'question', pt: 'pergunta; questão', example: 'Could you repeat the question, please?', category: 'university', level: 'A1' },
    { id: 'student', en: 'student', pt: 'estudante', example: 'She is a university student.', category: 'university', level: 'A1' },
    { id: 'university', en: 'university', pt: 'universidade', example: 'He studies at the university in Luanda.', category: 'university', level: 'A1' },
    { id: 'class', en: 'class', pt: 'aula; turma', example: 'Our English class starts at nine.', category: 'university', level: 'A1' },
    { id: 'assignment', en: 'assignment', pt: 'trabalho; tarefa', example: 'I have to finish my assignment today.', category: 'university', level: 'A2' },
    { id: 'exam', en: 'exam', pt: 'exame; prova', example: 'I am reviewing my notes for the exam.', category: 'university', level: 'A1' },
    { id: 'subject', en: 'subject', pt: 'disciplina; assunto', example: 'English is my favourite subject.', category: 'university', level: 'A2' },
    { id: 'schedule', en: 'schedule', pt: 'horário; agenda', example: 'I made a simple study schedule.', category: 'everyday', level: 'A2' },
    { id: 'focus', en: 'focus', pt: 'concentrar-se; foco', example: 'I focus better in a quiet place.', category: 'everyday', level: 'B1' },
    { id: 'understand', en: 'understand', pt: 'compreender; entender', example: 'I understand the main idea now.', category: 'everyday', level: 'A1' },
    { id: 'remember', en: 'remember', pt: 'lembrar-se', example: 'I remember new words by using them.', category: 'everyday', level: 'A2' },
    { id: 'explain', en: 'explain', pt: 'explicar', example: 'Could you explain this step again?', category: 'university', level: 'A2' },
    { id: 'mistake', en: 'mistake', pt: 'erro', example: 'A mistake can show me what to practise.', category: 'everyday', level: 'A2' },
    { id: 'enough', en: 'enough', pt: 'suficiente; o bastante', example: 'We have enough time for one more question.', category: 'everyday', level: 'A2' },
    { id: 'confident', en: 'confident', pt: 'confiante', example: 'She feels more confident when she practises.', category: 'everyday', level: 'B1' },
    { id: 'however', en: 'however', pt: 'no entanto; contudo', example: 'The task was difficult; however, we finished it.', category: 'connectors', level: 'B1' },
    { id: 'because', en: 'because', pt: 'porque', example: 'I practise because I want to improve.', category: 'connectors', level: 'A1' },
    { id: 'although', en: 'although', pt: 'embora; apesar de', example: 'Although I was tired, I finished the exercise.', category: 'connectors', level: 'B1' },
    { id: 'therefore', en: 'therefore', pt: 'por isso; portanto', example: 'The bus was late; therefore, we arrived after nine.', category: 'connectors', level: 'B2' },
    { id: 'prepare', en: 'prepare', pt: 'preparar-se; preparar', example: 'I prepare for class by reviewing my notes.', category: 'university', level: 'A2' },
    { id: 'achieve', en: 'achieve', pt: 'alcançar; conseguir', example: 'Small steps can help you achieve your goal.', category: 'everyday', level: 'B1' },
    { id: 'challenge', en: 'challenge', pt: 'desafio', example: 'Speaking in English is a useful challenge.', category: 'everyday', level: 'B1' },
    { id: 'deadline', en: 'deadline', pt: 'prazo final', example: 'The deadline for the essay is Friday.', category: 'university', level: 'B1' },
    { id: 'research', en: 'research', pt: 'investigação; pesquisar', example: 'The students are doing research for a project.', category: 'university', level: 'B2' },
    { id: 'advice', en: 'advice', pt: 'conselho; aconselhamento', example: 'My teacher gave me helpful advice.', category: 'everyday', level: 'B1' },
    { id: 'skill', en: 'skill', pt: 'competência; habilidade', example: 'Listening is an important language skill.', category: 'everyday', level: 'B1' },
    { id: 'borrow', en: 'borrow', pt: 'pedir emprestado', example: 'Can I borrow your dictionary for a minute?', category: 'everyday', level: 'A2' },
    { id: 'lend', en: 'lend', pt: 'emprestar a alguém', example: 'Could you lend me a pen?', category: 'everyday', level: 'B1' },
    { id: 'revise', en: 'revise', pt: 'rever matéria; corrigir texto', example: 'I revise my notes before the test.', category: 'university', level: 'B1' },
    { id: 'opinion', en: 'opinion', pt: 'opinião', example: 'In my opinion, the second option is clearer.', category: 'connectors', level: 'B1' }
  ];

  const QUESTIONS = [
    { prompt: 'My sister ___ a student.', options: ['am', 'is', 'are'], answer: 1, explanation: 'Com “my sister” (she), o verbo be é “is”.' },
    { prompt: 'They ___ coffee every morning.', options: ['drink', 'drinks', 'drinking'], answer: 0, explanation: 'Com “they”, no presente simples, usamos “drink” sem -s.' },
    { prompt: 'Could you ___ me with this?', options: ['help', 'helps', 'to help'], answer: 0, explanation: 'Depois de “could”, usamos o verbo na forma base: “help”.' },
    { prompt: 'We ___ dinner when you called.', options: ['had', 'were having', 'have'], answer: 1, explanation: '“Were having” descreve uma acção em curso quando outra aconteceu.' },
    { prompt: 'I have known Ana ___ five years.', options: ['for', 'since', 'during'], answer: 0, explanation: '“For” acompanha uma duração: “for five years”.' },
    { prompt: 'If it ___ tomorrow, we’ll stay home.', options: ['rains', 'will rain', 'rained'], answer: 0, explanation: 'No primeiro condicional, a oração com “if” usa presente simples: “if it rains”.' },
    { prompt: 'If I ___ more free time, I’d read every day.', options: ['have', 'had', 'will have'], answer: 1, explanation: 'No segundo condicional, usa-se “if” + passado simples para uma hipótese presente.' },
    { prompt: 'The results ___ next week.', options: ['will announce', 'will be announced', 'are announce'], answer: 1, explanation: 'A frase está na voz passiva: “will be” + particípio passado, “announced”.' },
    { prompt: 'Marta said that she ___ tired.', options: ['is', 'was', 'be'], answer: 1, explanation: 'Num relato no passado, “is” costuma recuar para “was”: “she was tired”.' },
    { prompt: 'I wish I ___ the answer.', options: ['know', 'knew', 'have known'], answer: 1, explanation: '“I wish I knew” exprime um desejo sobre uma situação presente diferente.' },
    { prompt: 'Not only ___ he finish the report, but he also presented it.', options: ['did', 'has', 'was'], answer: 0, explanation: 'Com “Not only” no início, há inversão: “did he”; depois de “did”, o verbo fica na forma base.' },
    { prompt: 'If we ___ earlier, we wouldn’t have missed the bus.', options: ['left', 'had left', 'would leave'], answer: 1, explanation: 'O terceiro condicional usa “if” + past perfect: “if we had left”.' }
  ];

  const LESSONS = [
    {
      id: 'first-words', level: 'A1', minutes: '4 min', title: 'Primeiras conversas', focus: 'Apresentar-te e usar o verbo be',
      summary: 'Diz quem és, como estás e faz perguntas simples com confiança.',
      rule: 'Usa “I am” (I’m), “he/she/it is” e “you/we/they are”. Em perguntas, põe “am/is/are” antes da pessoa: “Are you ready?”',
      examples: [
        { en: 'I’m a student.', pt: 'Sou estudante.' },
        { en: 'We are ready.', pt: 'Estamos prontos.' },
        { en: 'Are you okay?', pt: 'Estás bem?' }
      ],
      quiz: [
        { q: 'She ___ my friend.', options: ['am', 'is', 'are'], answer: 1, why: '“She” combina com “is”.' },
        { q: '___ they ready?', options: ['Is', 'Am', 'Are'], answer: 2, why: 'Com “they”, a pergunta começa com “Are”.' },
        { q: 'I ___ from Luanda.', options: ['am', 'is', 'are'], answer: 0, why: 'Com “I”, a forma é “am”.' }
      ]
    },
    {
      id: 'daily-rhythm', level: 'A1–A2', minutes: '5 min', title: 'Rotinas do dia a dia', focus: 'Presente simples e hábitos',
      summary: 'Fala de horários, estudos e hábitos com frases que vais usar de verdade.',
      rule: 'O presente simples serve para hábitos e factos. Com he/she/it, normalmente acrescenta -s: “she studies”. Em perguntas, usa “do” ou “does” + verbo base.',
      examples: [
        { en: 'I study English after class.', pt: 'Estudo inglês depois da aula.' },
        { en: 'He studies every evening.', pt: 'Ele estuda todas as noites.' },
        { en: 'Does she work on Fridays?', pt: 'Ela trabalha às sextas-feiras?' }
      ],
      quiz: [
        { q: 'My brother ___ English every night.', options: ['study', 'studies', 'studying'], answer: 1, why: 'Com “my brother” (he), “study” muda para “studies”.' },
        { q: '___ she study on Fridays?', options: ['Do', 'Does', 'Is'], answer: 1, why: 'Com “she”, a pergunta usa “Does” + verbo base.' },
        { q: 'They ___ early for class.', options: ['wake up', 'wakes up', 'waking up'], answer: 0, why: 'Com “they”, usamos a forma base “wake up”.' }
      ]
    },
    {
      id: 'past-progress', level: 'A2–B1', minutes: '5 min', title: 'Passado e experiências', focus: 'Past simple e present perfect',
      summary: 'Escolhe a forma verbal pelo tempo da acção e pela ligação ao presente.',
      rule: 'Usa past simple com um tempo passado terminado, como “yesterday”. Usa present perfect (“have/has” + particípio) para experiências ou períodos que continuam até agora. O contexto é importante.',
      examples: [
        { en: 'I reviewed my notes yesterday.', pt: 'Revi os meus apontamentos ontem.' },
        { en: 'I have studied English for two years.', pt: 'Estudo inglês há dois anos (e continuo).' },
        { en: 'Have you ever visited Benguela?', pt: 'Já visitaste Benguela alguma vez?' }
      ],
      quiz: [
        { q: 'I ___ my notes yesterday.', options: ['reviewed', 'have reviewed', 'review'], answer: 0, why: '“Yesterday” indica um tempo terminado; usa past simple.' },
        { q: 'We have lived here ___ 2021.', options: ['for', 'since', 'during'], answer: 1, why: '“Since” indica o ponto de início: “since 2021”.' },
        { q: 'She ___ her assignment yet.', options: ['hasn’t finished', 'didn’t finished', 'not finish'], answer: 0, why: 'Com “yet” em frase negativa até agora, present perfect é uma opção natural: “hasn’t finished”.' }
      ]
    },
    {
      id: 'university-english', level: 'A2–B1', minutes: '4 min', title: 'Inglês na universidade', focus: 'Pedir ajuda e falar de tarefas',
      summary: 'Frases úteis para participar numa aula, esclarecer dúvidas e organizar trabalhos.',
      rule: '“Could you…?” é uma forma educada de fazer um pedido. Depois de “could”, usa o verbo base. Para falar de trabalhos, “assignment” é uma tarefa ou trabalho definido pelo professor.',
      examples: [
        { en: 'Could you explain this question?', pt: 'Poderia explicar esta pergunta?' },
        { en: 'I need to review my notes.', pt: 'Preciso de rever os meus apontamentos.' },
        { en: 'When is the assignment due?', pt: 'Quando é que o trabalho deve ser entregue?' }
      ],
      quiz: [
        { q: 'Could you ___ that word?', options: ['explain', 'explains', 'explained'], answer: 0, why: 'Depois de “could”, usa-se o verbo base: “explain”.' },
        { q: 'The ___ for my essay is Friday.', options: ['deadline', 'advice', 'skill'], answer: 0, why: '“Deadline” é o prazo final para entregar.' },
        { q: 'I need to ___ my notes.', options: ['review', 'reviews', 'reviewing'], answer: 0, why: 'Depois de “need to”, usa-se o verbo base.' }
      ]
    },
    {
      id: 'share-opinions', level: 'B1–B2', minutes: '5 min', title: 'Partilhar uma opinião', focus: 'Ligar ideias com clareza',
      summary: 'Explica o que pensas e mostra contraste sem perder o fio da conversa.',
      rule: '“Because” introduz uma razão. “Although” introduz um contraste dentro da mesma frase. “However” liga ideias contrastantes e costuma vir depois de uma pausa ou ponto e vírgula.',
      examples: [
        { en: 'In my opinion, this example is useful.', pt: 'Na minha opinião, este exemplo é útil.' },
        { en: 'Although I was tired, I kept practising.', pt: 'Embora estivesse cansada, continuei a praticar.' },
        { en: 'The task was difficult; however, we finished it.', pt: 'A tarefa foi difícil; no entanto, terminámo-la.' }
      ],
      quiz: [
        { q: 'I stayed home ___ I was feeling unwell.', options: ['because', 'however', 'although'], answer: 0, why: '“Because” introduz a razão.' },
        { q: '___ it was difficult, she kept trying.', options: ['Although', 'Therefore', 'Because of'], answer: 0, why: '“Although” liga duas ideias em contraste; aqui é seguido de uma oração.' },
        { q: 'The plan changed; ___, we continued.', options: ['although', 'however', 'because'], answer: 1, why: '“However” pode ligar duas ideias contrastantes após uma pausa.' }
      ]
    },
    {
      id: 'exam-confidence', level: 'Todos os níveis', minutes: '4 min', title: 'Confiança em dias de prova', focus: 'Frases úteis e revisão activa',
      summary: 'Pratica expressões para explicar o que sabes e uma rotina curta para rever.',
      rule: 'Para estudar, tenta recuperar uma ideia sem consultar o material; depois verifica com os apontamentos e corrige. Voltar ao conteúdo em mais do que um dia ajuda a distribuir a prática. Adapta sempre ao programa e ao formato da tua prova.',
      examples: [
        { en: 'I need a moment to think.', pt: 'Preciso de um momento para pensar.' },
        { en: 'Could you repeat the question, please?', pt: 'Poderia repetir a pergunta, por favor?' },
        { en: 'I’m not sure, but I think the answer is…', pt: 'Não tenho a certeza, mas penso que a resposta é…' }
      ],
      quiz: [
        { q: 'Could you ___ the question, please?', options: ['repeat', 'repeats', 'repeated'], answer: 0, why: 'Depois de “could”, usa-se o verbo base: “repeat”.' },
        { q: 'Which phrase gives you time to think?', options: ['I need a moment to think.', 'I have a deadline.', 'I study every night.'], answer: 0, why: '“I need a moment to think” pede um momento para pensar.' },
        { q: 'After trying to recall an idea, what is a sensible next step?', options: ['Check it against your notes.', 'Never look at feedback.', 'Guess and move on every time.'], answer: 0, why: 'Comparar a tentativa com material fiável ajuda a corrigir o que faltou.' }
      ]
    }
  ];

  const SHUFFLE_ROUNDS = [
    { translation: 'Eu estudo inglês todos os dias.', sentence: 'I study English every day.' },
    { translation: 'Poderias ajudar-me, por favor?', sentence: 'Could you help me, please?' },
    { translation: 'Ela está a rever os apontamentos.', sentence: 'She is reviewing her notes.' },
    { translation: 'Temos tempo suficiente para praticar.', sentence: 'We have enough time to practise.' }
  ];

  const DEFAULT_STATE = {
    xp: 0, xpToday: 0, xpDate: '', gameXpToday: 0, gameXpDate: '',
    streak: 0, lastActiveDate: '', cefr: null, testScore: null, testBonusAwarded: false,
    completedLessons: [], favorites: []
  };

  function loadState() {
    try {
      const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null');
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return { ...DEFAULT_STATE };
      const numberOrZero = (value) => Number.isFinite(Number(value)) ? Math.max(0, Number(value)) : 0;
      return {
        ...DEFAULT_STATE,
        ...parsed,
        xp: numberOrZero(parsed.xp),
        xpToday: numberOrZero(parsed.xpToday),
        gameXpToday: numberOrZero(parsed.gameXpToday),
        streak: Math.floor(numberOrZero(parsed.streak)),
        cefr: LEVELS.includes(parsed.cefr) ? parsed.cefr : null,
        testScore: Number.isInteger(parsed.testScore) && parsed.testScore >= 0 && parsed.testScore <= QUESTIONS.length ? parsed.testScore : null,
        testBonusAwarded: Boolean(parsed.testBonusAwarded),
        completedLessons: Array.isArray(parsed.completedLessons) ? Array.from(new Set(parsed.completedLessons.filter((id) => LESSONS.some((lesson) => lesson.id === id)))) : [],
        favorites: Array.isArray(parsed.favorites) ? Array.from(new Set(parsed.favorites.filter((id) => WORDS.some((word) => word.id === id)))) : []
      };
    } catch (_error) {
      return { ...DEFAULT_STATE };
    }
  }

  let state = loadState();
  let assessment = null;
  let activeLesson = null;
  let lessonChecked = false;
  let currentGame = null;
  let wordFilter = 'all';
  let deferredInstallPrompt = null;
  let offlineReady = false;
  let toastTimer = null;
  let audioContext = null;
  let masterGain = null;
  let musicEnabled = false;
  let musicTimer = null;
  let chordIndex = 0;
  let lastFocusedElement = null;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function safeSave() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_error) {
      showToast('O progresso está só nesta sessão: o navegador não permitiu guardá-lo neste dispositivo.');
    }
  }

  function dateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function resetDailyCountersIfNeeded() {
    const today = dateKey(new Date());
    if (state.xpDate !== today) {
      state.xpToday = 0;
      state.gameXpToday = 0;
      state.xpDate = today;
      state.gameXpDate = today;
    }
    if (state.gameXpDate !== today) {
      state.gameXpToday = 0;
      state.gameXpDate = today;
    }
  }

  function markActivity() {
    const today = dateKey(new Date());
    if (state.lastActiveDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      state.streak = state.lastActiveDate === dateKey(yesterday) ? (state.streak || 0) + 1 : 1;
      state.lastActiveDate = today;
    }
  }

  function awardXP(amount) {
    resetDailyCountersIfNeeded();
    const safeAmount = Math.max(0, Math.round(amount));
    state.xp += safeAmount;
    state.xpToday += safeAmount;
    markActivity();
    safeSave();
    refreshAll();
  }

  function normalize(value) {
    return String(value || '').toLocaleLowerCase('pt').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  }

  function levelText(level) {
    const descriptions = {
      A1: 'Base inicial: expressões e frases muito comuns.',
      A2: 'Base elementar: situações familiares e conversas simples.',
      B1: 'Intermédio: comunicação sobre assuntos do dia a dia e estudo.',
      B2: 'Intermédio superior: mais autonomia em textos e conversas.',
      C1: 'Avançado: uso flexível em contextos mais complexos.'
    };
    return descriptions[level] || 'Faz o mini-teste para receber uma estimativa inicial.';
  }

  function levelForScore(score) {
    if (score <= 2) return 'A1';
    if (score <= 4) return 'A2';
    if (score <= 7) return 'B1';
    if (score <= 10) return 'B2';
    return 'C1';
  }

  function rankInfo(totalXp) {
    const ranks = ['Semente curiosa', 'Brotinho atento', 'Folha confiante', 'Flor em crescimento', 'Jardim de palavras'];
    const tier = Math.min(ranks.length - 1, Math.floor(Math.max(0, totalXp) / 100));
    return { name: ranks[tier], inTier: Math.max(0, totalXp) % 100, tier };
  }

  function showToast(message) {
    const toast = $('#toast');
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => { toast.hidden = true; }, 3600);
  }

  function showModal(modal) {
    if (!modal) return;
    lastFocusedElement = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    const focusTarget = $('button:not([disabled])', modal);
    if (focusTarget) window.setTimeout(() => focusTarget.focus(), 30);
  }

  function closeModal(modal) {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    if ($$('.modal-backdrop').every((item) => item.hidden)) document.body.classList.remove('modal-open');
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') lastFocusedElement.focus();
  }

  function navigate(viewName) {
    const target = $(`[data-view="${viewName}"]`);
    if (!target) return;
    $$('.view').forEach((view) => view.classList.toggle('is-active', view === target));
    $$('[data-go]').forEach((button) => {
      const isCurrent = button.dataset.go === viewName;
      button.classList.toggle('is-current', isCurrent);
      if (isCurrent) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
    if (viewName === 'learn') renderLessons();
    if (viewName === 'words') renderDictionary();
    if (viewName === 'progress') renderProgress();
    if (viewName === 'home') updateDashboard();
    window.scrollTo(0, 0);
  }

  function getWordOfDay() {
    const now = new Date();
    return WORDS[(now.getDate() + now.getMonth() * 31) % WORDS.length];
  }

  function updateDashboard() {
    resetDailyCountersIfNeeded();
    const count = Math.max(0, Number(state.streak) || 0);
    $('#streakCount').textContent = String(count);
    $('#streakLabel').textContent = count === 1 ? 'dia de prática' : 'dias de prática';
    $('#todayXp').textContent = String(Math.min(TODAY_GOAL, state.xpToday || 0));
    $('#dailyProgress').value = Math.min(TODAY_GOAL, state.xpToday || 0);
    const levelDisplay = $('#levelDisplay');
    const levelDescription = $('#levelDescription');
    const levelAction = $('#levelActionText');
    if (state.cefr && LEVELS.includes(state.cefr)) {
      levelDisplay.textContent = `Nível ${state.cefr}`;
      levelDescription.textContent = levelText(state.cefr);
      levelAction.textContent = 'Refazer mini-teste';
    } else {
      levelDisplay.textContent = 'Ainda por descobrir';
      levelDescription.textContent = 'O mini-teste dá-te uma estimativa inicial e recomenda por onde começar.';
      levelAction.textContent = 'Fazer o mini-teste';
    }
    const word = getWordOfDay();
    $('#wordOfDay').textContent = word.en;
    $('#wordOfDayTranslation').textContent = word.pt;
    $('#wordOfDayExample').textContent = `“${word.example}”`;
    $('#speakWordOfDay').dataset.speak = word.en;
    updateRecommendation();
    $('#lessonCountLabel').textContent = `${state.completedLessons.length} de ${LESSONS.length} concluídas`;
  }

  function updateRecommendation() {
    const level = state.cefr || 'A1';
    const recommended = LESSONS.find((lesson) => lesson.level.split(/[–-]/).some((part) => part.trim() === level)) || LESSONS[0];
    const title = $('#recommendationTitle');
    const text = $('#recommendationText');
    if (title && text) {
      title.textContent = state.cefr ? `Sugestão para o nível ${level}: ${recommended.title}` : 'Começa pelo essencial';
      text.textContent = state.cefr ? `${recommended.focus}. Podes seguir as aulas por qualquer ordem.` : 'Faz o mini-teste para receber uma recomendação mais ajustada.';
    }
  }

  function refreshAll() {
    updateDashboard();
    renderProgress();
    if ($('#view-learn').classList.contains('is-active')) renderLessons();
    if ($('#view-words').classList.contains('is-active')) renderDictionary();
  }

  function openAssessment() {
    assessment = { index: 0, correct: 0 };
    renderAssessmentQuestion();
    showModal($('#assessmentModal'));
  }

  function renderAssessmentQuestion() {
    if (!assessment) return;
    const container = $('#assessmentContent');
    const question = QUESTIONS[assessment.index];
    const number = assessment.index + 1;
    container.innerHTML = `
      <div class="assessment-progress-row"><span>Pergunta ${number} de ${QUESTIONS.length}</span><span>${assessment.correct} certa${assessment.correct === 1 ? '' : 's'} até agora</span></div>
      <progress class="assessment-progress" max="${QUESTIONS.length}" value="${number}" aria-label="Progresso do mini-teste"></progress>
      <p class="assessment-question" id="assessmentPrompt"></p>
      <div class="assessment-choices" id="assessmentChoices"></div>
      <p class="game-feedback" id="assessmentFeedback" aria-live="polite"></p>
      <div class="game-controls"><button class="button button-dark" id="assessmentNext" type="button" hidden>Seguinte →</button></div>
      <p class="assessment-footnote">Escolhe a melhor resposta. No fim, mostramos uma estimativa indicativa — não é um exame oficial nem um certificado.</p>`;
    $('#assessmentPrompt').textContent = question.prompt;
    $('#assessmentChoices').innerHTML = question.options.map((option, index) => `<button class="option-button" type="button" data-assessment-answer="${index}">${escapeHTML(option)}</button>`).join('');
  }

  function answerAssessment(button) {
    if (!assessment || button.disabled) return;
    const question = QUESTIONS[assessment.index];
    const selected = Number(button.dataset.assessmentAnswer);
    const isCorrect = selected === question.answer;
    if (isCorrect) assessment.correct += 1;
    $$('#assessmentChoices .option-button').forEach((option) => {
      option.disabled = true;
      if (Number(option.dataset.assessmentAnswer) === question.answer) option.classList.add('is-correct');
    });
    if (!isCorrect) button.classList.add('is-wrong');
    const feedback = $('#assessmentFeedback');
    feedback.textContent = `${isCorrect ? 'Boa! ' : 'Quase. '}${question.explanation}`;
    const nextButton = $('#assessmentNext');
    nextButton.hidden = false;
    nextButton.textContent = assessment.index === QUESTIONS.length - 1 ? 'Ver o resultado →' : 'Seguinte →';
  }

  function finishAssessment() {
    const score = assessment.correct;
    const level = levelForScore(score);
    state.cefr = level;
    state.testScore = score;
    resetDailyCountersIfNeeded();
    if (!state.testBonusAwarded) {
      state.xp += 10;
      state.xpToday += 10;
      state.testBonusAwarded = true;
    }
    markActivity();
    safeSave();
    refreshAll();
    const description = levelText(level);
    $('#assessmentContent').innerHTML = `
      <div class="assessment-result">
        <div class="result-medallion" aria-hidden="true">${level}</div>
        <p class="eyebrow">UMA PRIMEIRA ESTIMATIVA</p>
        <h3>${level}</h3>
        <p>Acertaste ${score} de ${QUESTIONS.length}. ${escapeHTML(description)} Usa este resultado só como ponto de partida: 12 perguntas não medem todas as competências nem substituem uma avaliação completa.</p>
        <p class="assessment-disclaimer">O nível CEFR é uma referência. Esta actividade é informal e não atribui certificado.</p>
        <div class="result-actions"><button class="button button-dark" id="resultToLessons" type="button">Ver as aulas recomendadas <span aria-hidden="true">→</span></button><button class="button button-outline-danger" type="button" data-close-modal>Fechar</button></div>
      </div>`;
  }

  function renderLessons() {
    const grid = $('#lessonGrid');
    if (!grid) return;
    const recommended = state.cefr || 'A1';
    grid.innerHTML = LESSONS.map((lesson, index) => {
      const isComplete = state.completedLessons.includes(lesson.id);
      const tags = lesson.level.split(/[–-]/).map((part) => part.trim());
      const isRecommended = tags.includes(recommended) || lesson.level === 'Todos os níveis';
      return `<article class="lesson-card${isRecommended ? ' is-recommended' : ''}">
        <div class="lesson-top"><span class="lesson-index">${String(index + 1).padStart(2, '0')}</span><span class="lesson-level">${escapeHTML(lesson.level)}</span></div>
        <h3>${escapeHTML(lesson.title)}</h3><p>${escapeHTML(lesson.summary)}</p>
        <div class="lesson-card-footer"><span>${escapeHTML(lesson.minutes)} · ${isComplete ? '<span class="lesson-complete">✓ Concluída</span>' : escapeHTML(lesson.focus)}</span><button type="button" data-open-lesson="${escapeHTML(lesson.id)}">${isComplete ? 'Rever aula' : 'Começar'} →</button></div>
      </article>`;
    }).join('');
  }

  function openLesson(id) {
    const lesson = LESSONS.find((item) => item.id === id);
    if (!lesson) return;
    activeLesson = lesson;
    lessonChecked = false;
    $('#lessonModalKicker').textContent = `${lesson.level} · ${lesson.minutes} · ${lesson.focus}`;
    $('#lessonModalTitle').textContent = lesson.title;
    const examples = lesson.examples.map((example) => `<div class="example-row"><div><div class="example-en">${escapeHTML(example.en)}</div><div class="example-pt">${escapeHTML(example.pt)}</div></div><button class="word-action" type="button" data-speak="${escapeHTML(example.en)}" aria-label="Ouvir: ${escapeHTML(example.en)}">▶</button></div>`).join('');
    const questions = lesson.quiz.map((item, index) => `<article class="lesson-question-card" data-lesson-question="${index}">
      <p>${index + 1}. ${escapeHTML(item.q)}</p>
      <div class="lesson-options">${item.options.map((option, optionIndex) => `<label class="lesson-choice"><input type="radio" name="lesson-question-${index}" value="${optionIndex}"><span>${escapeHTML(option)}</span></label>`).join('')}</div>
      <span class="lesson-question-feedback" aria-live="polite"></span>
    </article>`).join('');
    $('#lessonModalContent').innerHTML = `
      <div class="lesson-summary"><span aria-hidden="true">✦</span><span>${escapeHTML(lesson.summary)}</span></div>
      <div class="lesson-rule">${escapeHTML(lesson.rule)}</div>
      <h3 class="lesson-practice-title">Exemplos em contexto</h3><div class="example-list">${examples}</div>
      <h3 class="lesson-practice-title">Agora, tenta tu</h3><p class="panel-description">Escolhe uma resposta por pergunta e pede feedback quando estiveres pronta.</p>
      <div id="lessonQuestions">${questions}</div><p class="quiz-feedback" id="lessonQuizScore" aria-live="polite"></p>
      <div class="lesson-footer-actions"><button class="button button-outline-danger" id="checkLessonQuiz" type="button">Verificar respostas</button><button class="button button-dark" id="completeLesson" type="button" hidden>Concluir aula · +30 XP</button></div>`;
    showModal($('#lessonModal'));
  }

  function checkLessonQuiz() {
    if (!activeLesson) return;
    let score = 0;
    let answered = 0;
    activeLesson.quiz.forEach((item, index) => {
      const card = $(`[data-lesson-question="${index}"]`, $('#lessonModalContent'));
      const selected = $(`input[name="lesson-question-${index}"]:checked`, card);
      const feedback = $('.lesson-question-feedback', card);
      card.classList.remove('is-right', 'is-wrong');
      if (!selected) {
        feedback.textContent = 'Escolhe uma opção para receber feedback.';
        return;
      }
      answered += 1;
      const correct = Number(selected.value) === item.answer;
      if (correct) score += 1;
      card.classList.add(correct ? 'is-right' : 'is-wrong');
      feedback.textContent = `${correct ? 'Correcto. ' : `A resposta é “${item.options[item.answer]}”. `}${item.why}`;
    });
    const result = $('#lessonQuizScore');
    if (answered < activeLesson.quiz.length) result.textContent = `${score} resposta${score === 1 ? '' : 's'} certa${score === 1 ? '' : 's'} até agora. Completa as restantes e verifica outra vez.`;
    else result.textContent = `${score} de ${activeLesson.quiz.length} certas. ${score === activeLesson.quiz.length ? 'Muito bem — revê os exemplos quando quiseres.' : 'O feedback mostra a resposta e o motivo; tenta novamente se te apetecer.'}`;
    lessonChecked = answered === activeLesson.quiz.length;
    $('#completeLesson').hidden = !lessonChecked;
  }

  function completeActiveLesson() {
    if (!activeLesson || !lessonChecked) return;
    const alreadyComplete = state.completedLessons.includes(activeLesson.id);
    if (!alreadyComplete) {
      state.completedLessons.push(activeLesson.id);
      awardXP(30);
      showToast('Aula concluída — +30 XP. Boa prática!');
    } else {
      markActivity();
      safeSave();
      showToast('Aula revista. Continua ao teu ritmo.');
    }
    closeModal($('#lessonModal'));
    renderLessons();
  }

  function renderProgress() {
    if (!$('#totalXp')) return;
    resetDailyCountersIfNeeded();
    const total = Math.max(0, Number(state.xp) || 0);
    const rank = rankInfo(total);
    $('#totalXp').textContent = String(total);
    $('#rankName').textContent = rank.name;
    $('#rankProgressLabel').textContent = `${rank.inTier} / 100 XP`;
    $('#rankProgress').value = rank.inTier;
    $('#completedLessonCount').textContent = String(state.completedLessons.length);
    $('#favoriteCount').textContent = String(state.favorites.length);
    $('#bestLevel').textContent = state.cefr || '—';
    const badges = [
      { icon: '✦', title: 'Primeiro olhar', text: 'Conclui o mini-teste.', earned: state.testScore !== null && state.testScore !== undefined },
      { icon: '↗', title: 'Primeira flor', text: 'Conclui uma aula.', earned: state.completedLessons.length > 0 },
      { icon: '♡', title: 'Coleccionadora', text: 'Guarda 5 palavras favoritas.', earned: state.favorites.length >= 5 },
      { icon: '◷', title: 'Ritmo gentil', text: 'Pratica em 3 dias seguidos.', earned: state.streak >= 3 }
    ];
    $('#badgeGrid').innerHTML = badges.map((badge) => `<article class="badge-item${badge.earned ? ' is-earned' : ''}"><span class="badge-icon" aria-hidden="true">${badge.icon}</span><strong>${escapeHTML(badge.title)}</strong><p>${escapeHTML(badge.text)}</p></article>`).join('');
  }

  function renderDictionary() {
    if (!$('#wordGrid')) return;
    const query = normalize($('#wordSearch').value);
    const favorites = new Set(state.favorites);
    const filtered = WORDS.filter((word) => {
      const searchable = normalize(`${word.en} ${word.pt} ${word.example} ${word.level}`);
      const matchesText = !query || searchable.includes(query);
      const matchesFilter = wordFilter === 'all' || wordFilter === word.category || (wordFilter === 'saved' && favorites.has(word.id));
      return matchesText && matchesFilter;
    });
    $('#wordCount').textContent = String(WORDS.length);
    $('#savedCount').textContent = String(favorites.size);
    $('#wordGrid').innerHTML = filtered.map((word) => {
      const saved = favorites.has(word.id);
      return `<article class="word-card">
        <div class="word-card-top"><h3>${escapeHTML(word.en)}</h3><span class="word-tag">${escapeHTML(word.level)}</span></div>
        <p class="word-card-pt">${escapeHTML(word.pt)}</p>
        <p class="word-card-example">“${escapeHTML(word.example)}”</p>
        <div class="word-card-footer"><span class="word-tag">${word.category === 'university' ? 'UNIVERSIDADE' : word.category === 'connectors' ? 'CONECTOR' : 'DIA A DIA'}</span>
          <span class="word-card-actions"><button class="word-action" type="button" data-speak="${escapeHTML(word.en)}" aria-label="Ouvir ${escapeHTML(word.en)}">▶</button><button class="word-action" type="button" data-favorite="${escapeHTML(word.id)}" aria-pressed="${saved}" aria-label="${saved ? 'Remover' : 'Guardar'} ${escapeHTML(word.en)} ${saved ? 'dos' : 'nas'} favoritos">${saved ? '♥' : '♡'}</button></span>
        </div>
      </article>`;
    }).join('');
    $('#wordEmpty').hidden = filtered.length > 0;
    $$('[data-word-filter]').forEach((button) => button.classList.toggle('is-selected', button.dataset.wordFilter === wordFilter));
  }

  function toggleFavorite(id) {
    const favorites = new Set(state.favorites);
    if (favorites.has(id)) {
      favorites.delete(id);
      showToast('Palavra removida das guardadas.');
    } else {
      favorites.add(id);
      showToast('Palavra guardada para rever mais tarde.');
    }
    state.favorites = Array.from(favorites);
    safeSave();
    renderDictionary();
    renderProgress();
  }

  function speak(text) {
    if (!('speechSynthesis' in window) || typeof window.SpeechSynthesisUtterance !== 'function') {
      showToast('Este navegador não disponibiliza voz de leitura. Podes continuar a praticar sem áudio.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new window.SpeechSynthesisUtterance(String(text));
    utterance.lang = 'en-GB';
    utterance.rate = 0.88;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }

  function shuffle(array) {
    const result = array.slice();
    for (let index = result.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
    }
    return result;
  }

  function startSprint() {
    const pool = WORDS.filter((word) => word.category !== 'connectors' && word.id !== 'deadline');
    currentGame = { type: 'sprint', items: shuffle(pool).slice(0, 5), index: 0, score: 0, answered: false };
    $('#gamesMenu').hidden = true;
    $('#gameStage').hidden = false;
    renderGameRound();
  }

  function startShuffleGame() {
    currentGame = { type: 'shuffle', items: shuffle(SHUFFLE_ROUNDS), index: 0, score: 0, selected: [], answered: false, tokens: [] };
    $('#gamesMenu').hidden = true;
    $('#gameStage').hidden = false;
    renderGameRound();
  }

  function renderGameRound() {
    const stage = $('#gameStage');
    if (!currentGame) return;
    if (currentGame.index >= currentGame.items.length) {
      renderGameSummary();
      return;
    }
    if (currentGame.type === 'sprint') renderSprintRound(stage);
    else renderShuffleRound(stage);
  }

  function renderSprintRound(stage) {
    const item = currentGame.items[currentGame.index];
    const otherWords = shuffle(WORDS.filter((word) => word.id !== item.id)).slice(0, 3);
    const choices = shuffle([item, ...otherWords]);
    currentGame.currentAnswer = item.en;
    currentGame.answered = false;
    stage.innerHTML = `
      <div class="game-stage-header"><button class="game-back" type="button" data-cancel-game>← Sair do jogo</button><span>Ronda ${currentGame.index + 1} de ${currentGame.items.length} · ${currentGame.score} certas</span></div>
      <p class="eyebrow">WORD SPRINT · VOCABULÁRIO</p><h2>Qual é a palavra em inglês?</h2>
      <p class="game-question">“${escapeHTML(item.pt)}”</p>
      <div class="game-options">${choices.map((word) => `<button class="option-button" type="button" data-game-choice="${escapeHTML(word.en)}">${escapeHTML(word.en)}</button>`).join('')}</div>
      <p class="game-feedback" id="gameFeedback" aria-live="polite"></p>
      <div class="game-controls"><button class="button button-dark" id="gameNext" type="button" hidden>Seguinte →</button></div>`;
  }

  function renderShuffleRound(stage) {
    const item = currentGame.items[currentGame.index];
    currentGame.selected = [];
    currentGame.answered = false;
    currentGame.tokens = shuffle(item.sentence.split(' '));
    stage.innerHTML = `
      <div class="game-stage-header"><button class="game-back" type="button" data-cancel-game>← Sair do jogo</button><span>Ronda ${currentGame.index + 1} de ${currentGame.items.length} · ${currentGame.score} certas</span></div>
      <p class="eyebrow">SENTENCE SHUFFLE · ORDEM DAS PALAVRAS</p><h2>Constrói a frase.</h2>
      <p class="game-instruction">Forma em inglês: “${escapeHTML(item.translation)}”</p>
      <div class="shuffle-answer" id="shuffleAnswer" aria-label="Palavras escolhidas"></div>
      <div class="shuffle-word-bank" id="shuffleBank">${currentGame.tokens.map((token, index) => `<button class="shuffle-token" type="button" data-shuffle-token="${index}">${escapeHTML(token)}</button>`).join('')}</div>
      <p class="game-feedback" id="gameFeedback" aria-live="polite"></p>
      <div class="game-controls"><button class="button button-outline-danger" id="shuffleReset" type="button">Recomeçar</button><button class="button button-dark" id="shuffleCheck" type="button">Verificar frase</button><button class="button button-dark" id="gameNext" type="button" hidden>Seguinte →</button></div>`;
  }

  function answerSprint(button) {
    if (!currentGame || currentGame.type !== 'sprint' || currentGame.answered) return;
    currentGame.answered = true;
    const chosen = button.dataset.gameChoice;
    const isCorrect = chosen === currentGame.currentAnswer;
    if (isCorrect) currentGame.score += 1;
    const word = WORDS.find((entry) => entry.en === currentGame.currentAnswer);
    $$('.game-options .option-button', $('#gameStage')).forEach((option) => {
      option.disabled = true;
      if (option.dataset.gameChoice === currentGame.currentAnswer) option.classList.add('is-correct');
    });
    if (!isCorrect) button.classList.add('is-wrong');
    $('#gameFeedback').textContent = `${isCorrect ? 'Certo! ' : `A resposta é “${currentGame.currentAnswer}”. `}${word ? word.example : ''}`;
    $('#gameNext').hidden = false;
    $('#gameNext').textContent = currentGame.index === currentGame.items.length - 1 ? 'Ver resultado →' : 'Seguinte →';
  }

  function chooseShuffleToken(button) {
    if (!currentGame || currentGame.type !== 'shuffle' || currentGame.answered || button.disabled) return;
    const index = Number(button.dataset.shuffleToken);
    currentGame.selected.push({ token: currentGame.tokens[index], index });
    button.disabled = true;
    renderShuffleAnswer();
  }

  function renderShuffleAnswer() {
    const answer = $('#shuffleAnswer');
    if (!answer || !currentGame) return;
    answer.innerHTML = currentGame.selected.map((item, position) => `<button class="shuffle-token" type="button" data-remove-shuffle="${position}" aria-label="Remover ${escapeHTML(item.token)}">${escapeHTML(item.token)}</button>`).join('');
  }

  function removeShuffleToken(button) {
    if (!currentGame || currentGame.answered) return;
    const position = Number(button.dataset.removeShuffle);
    const [removed] = currentGame.selected.splice(position, 1);
    const bankButton = $(`[data-shuffle-token="${removed.index}"]`, $('#gameStage'));
    if (bankButton) bankButton.disabled = false;
    renderShuffleAnswer();
  }

  function resetShuffleRound() {
    if (!currentGame || currentGame.type !== 'shuffle' || currentGame.answered) return;
    currentGame.selected = [];
    $$('#shuffleBank .shuffle-token').forEach((button) => { button.disabled = false; });
    renderShuffleAnswer();
    $('#gameFeedback').textContent = '';
  }

  function checkShuffleRound() {
    if (!currentGame || currentGame.type !== 'shuffle' || currentGame.answered) return;
    const item = currentGame.items[currentGame.index];
    const assembled = currentGame.selected.map((part) => part.token).join(' ');
    const isCorrect = assembled === item.sentence;
    currentGame.answered = true;
    if (isCorrect) currentGame.score += 1;
    $('#gameFeedback').textContent = isCorrect ? 'Muito bem — a frase está correcta.' : `A frase completa é: “${item.sentence}”. Repara na ordem e tenta outra ronda.`;
    $('#shuffleCheck').hidden = true;
    $('#shuffleReset').hidden = true;
    $('#gameNext').hidden = false;
    $('#gameNext').textContent = currentGame.index === currentGame.items.length - 1 ? 'Ver resultado →' : 'Seguinte →';
  }

  function nextGameRound() {
    if (!currentGame || !currentGame.answered) return;
    currentGame.index += 1;
    renderGameRound();
  }

  function renderGameSummary() {
    const game = currentGame;
    const total = game.items.length;
    resetDailyCountersIfNeeded();
    const plannedXp = game.score * 3 + (game.score === total ? 5 : 0);
    const award = Math.max(0, Math.min(plannedXp, 20 - (state.gameXpToday || 0)));
    if (award > 0) {
      state.gameXpToday += award;
      awardXP(award);
    } else {
      markActivity();
      safeSave();
      refreshAll();
    }
    const label = game.type === 'sprint' ? 'Word Sprint' : 'Sentence Shuffle';
    $('#gameStage').innerHTML = `<div class="game-summary"><div class="summary-mark" aria-hidden="true">✦</div><p class="eyebrow">${label} · CONCLUÍDO</p><h2>${game.score} de ${total} certas</h2><p>${award > 0 ? `Ganhaste ${award} XP de prática.` : 'O limite diário de XP dos jogos já foi atingido — podes continuar a praticar à vontade.'} ${game.score === total ? 'Excelente atenção aos detalhes!' : 'Cada tentativa mostra uma coisa nova para rever.'}</p><div class="game-controls game-summary-actions"><button class="button button-dark" id="playAgain" data-replay-type="${game.type}" type="button">Jogar outra vez</button><button class="button button-outline-danger" data-cancel-game type="button">Terminar</button></div></div>`;
    currentGame = null;
  }

  function leaveGame() {
    currentGame = null;
    $('#gameStage').hidden = true;
    $('#gameStage').innerHTML = '';
    $('#gamesMenu').hidden = false;
  }

  function createAudioContext() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return false;
    if (!audioContext) {
      audioContext = new AudioContextClass();
      masterGain = audioContext.createGain();
      masterGain.gain.value = 0.18;
      masterGain.connect(audioContext.destination);
    }
    return true;
  }

  function playTone(frequency, startAt, duration, volume) {
    if (!audioContext || !masterGain) return;
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, startAt);
    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.linearRampToValueAtTime(volume, startAt + 0.18);
    gain.gain.setValueAtTime(volume, startAt + Math.max(0.2, duration - 0.35));
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
    oscillator.connect(gain);
    gain.connect(masterGain);
    oscillator.start(startAt);
    oscillator.stop(startAt + duration + 0.03);
  }

  function playAmbientChord() {
    if (!audioContext || !musicEnabled || document.hidden) return;
    const chords = [
      [261.63, 329.63, 392.00, 493.88],
      [220.00, 261.63, 329.63, 392.00],
      [174.61, 220.00, 261.63, 329.63],
      [196.00, 246.94, 293.66, 392.00]
    ];
    const chord = chords[chordIndex % chords.length];
    const now = audioContext.currentTime + 0.04;
    chord.forEach((frequency, index) => playTone(frequency, now + index * 0.08, 2.15, 0.035));
    const melody = [659.25, 587.33, 523.25, 587.33];
    playTone(melody[chordIndex % melody.length], now + 0.55, 1.3, 0.026);
    chordIndex += 1;
  }

  async function toggleMusic() {
    const button = $('#musicToggle');
    if (!musicEnabled) {
      if (!createAudioContext()) {
        showToast('Este navegador não suporta a melodia gerada. O resto da aplicação continua disponível.');
        return;
      }
      musicEnabled = true;
      button.setAttribute('aria-pressed', 'true');
      $('#musicLabel').textContent = 'Som ligado';
      try { await audioContext.resume(); } catch (_error) { /* O próximo toque poderá activar o áudio. */ }
      playAmbientChord();
      window.clearInterval(musicTimer);
      musicTimer = window.setInterval(playAmbientChord, 2550);
    } else {
      musicEnabled = false;
      window.clearInterval(musicTimer);
      button.setAttribute('aria-pressed', 'false');
      $('#musicLabel').textContent = 'Som ambiente';
      if (audioContext && audioContext.state === 'running') {
        try { await audioContext.suspend(); } catch (_error) { /* Sem acção: a música já foi desligada. */ }
      }
    }
  }

  function updateConnectionStatus() {
    const status = $('#connectionStatus');
    const label = $('#connectionText');
    if (!status || !label) return;
    const online = navigator.onLine;
    status.classList.toggle('is-offline', !online);
    label.textContent = online ? (offlineReady ? 'Offline preparado' : (window.location.protocol === 'file:' ? 'Conteúdo local' : 'Ligação activa')) : 'A funcionar offline';
    status.setAttribute('aria-label', online ? (offlineReady ? 'Ficheiros da aplicação guardados para uso offline' : 'Aplicação carregada; a preparar o modo offline') : 'Sem internet; conteúdo local continua disponível');
  }

  function openInstallHelp() {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      deferredInstallPrompt.userChoice.then(() => { deferredInstallPrompt = null; }).catch(() => { deferredInstallPrompt = null; });
      return;
    }
    showModal($('#installModal'));
  }

  async function shareApp() {
    if (window.location.protocol === 'file:') {
      showToast('Esta cópia local ainda não tem um link público. Publica a pasta num alojamento estático HTTPS e depois partilha o endereço.');
      return;
    }
    const shareData = { title: 'Bloom English', text: 'Uma forma leve e divertida de praticar inglês.', url: window.location.href };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareData.url);
        showToast('Link copiado. Envia-o a quem quiseres convidar.');
      } else {
        showToast(`Copia este endereço para partilhar: ${shareData.url}`);
      }
    } catch (error) {
      if (error && error.name !== 'AbortError') showToast('Não consegui abrir a partilha. Podes copiar o endereço da barra do navegador.');
    }
  }

  function resetProgress() {
    const confirmed = window.confirm('Apagar o progresso, XP, nível e palavras guardadas neste navegador? Esta acção não pode ser desfeita.');
    if (!confirmed) return;
    state = { ...DEFAULT_STATE, completedLessons: [], favorites: [] };
    try { window.localStorage.removeItem(STORAGE_KEY); } catch (_error) { /* O estado em memória também é reiniciado. */ }
    refreshAll();
    renderDictionary();
    renderLessons();
    showToast('Progresso apagado neste dispositivo.');
  }

  function setupServiceWorker() {
    if (!('serviceWorker' in navigator) || window.location.protocol === 'file:') return;
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').then(() => {
        navigator.serviceWorker.ready.then(() => {
          offlineReady = true;
          updateConnectionStatus();
        });
      }).catch(() => {
        showToast('A aplicação continua utilizável, mas o navegador não conseguiu preparar o modo offline.');
      });
    });
  }

  function setupEvents() {
    document.addEventListener('click', (event) => {
      const target = event.target;
      const navButton = target.closest('[data-go]');
      if (navButton) {
        event.preventDefault();
        navigate(navButton.dataset.go);
        return;
      }
      if (target.closest('[data-action="start-test"]')) { openAssessment(); return; }
      const lessonButton = target.closest('[data-open-lesson]');
      if (lessonButton) { openLesson(lessonButton.dataset.openLesson); return; }
      const closeButton = target.closest('[data-close-modal]');
      if (closeButton) { closeModal(target.closest('.modal-backdrop')); return; }
      const answerButton = target.closest('[data-assessment-answer]');
      if (answerButton) { answerAssessment(answerButton); return; }
      if (target.closest('#assessmentNext')) {
        if (assessment.index < QUESTIONS.length - 1) { assessment.index += 1; renderAssessmentQuestion(); }
        else finishAssessment();
        return;
      }
      if (target.closest('#resultToLessons')) { closeModal($('#assessmentModal')); navigate('learn'); return; }
      if (target.closest('#checkLessonQuiz')) { checkLessonQuiz(); return; }
      if (target.closest('#completeLesson')) { completeActiveLesson(); return; }
      const filterButton = target.closest('[data-word-filter]');
      if (filterButton) { wordFilter = filterButton.dataset.wordFilter; renderDictionary(); return; }
      const favoriteButton = target.closest('[data-favorite]');
      if (favoriteButton) { toggleFavorite(favoriteButton.dataset.favorite); return; }
      const speakButton = target.closest('[data-speak]');
      if (speakButton) { speak(speakButton.dataset.speak); return; }
      if (target.closest('#speakWordOfDay')) { speak($('#speakWordOfDay').dataset.speak || ''); return; }
      if (target.closest('#startSprint')) { startSprint(); return; }
      if (target.closest('#startShuffle')) { startShuffleGame(); return; }
      if (target.closest('[data-cancel-game]')) { leaveGame(); return; }
      const gameChoice = target.closest('[data-game-choice]');
      if (gameChoice) { answerSprint(gameChoice); return; }
      if (target.closest('#gameNext')) { nextGameRound(); return; }
      const shuffleToken = target.closest('[data-shuffle-token]');
      if (shuffleToken) { chooseShuffleToken(shuffleToken); return; }
      const removeToken = target.closest('[data-remove-shuffle]');
      if (removeToken) { removeShuffleToken(removeToken); return; }
      if (target.closest('#shuffleReset')) { resetShuffleRound(); return; }
      if (target.closest('#shuffleCheck')) { checkShuffleRound(); return; }
      const replayButton = target.closest('#playAgain');
      if (replayButton) {
        if (replayButton.dataset.replayType === 'sprint') startSprint(); else startShuffleGame();
        return;
      }
      if (target.closest('#musicToggle')) { toggleMusic(); return; }
      if (target.closest('#installButton')) { openInstallHelp(); return; }
      if (target.closest('#shareApp') || target.closest('#creatorShare')) { shareApp(); return; }
      if (target.closest('#resetProgress')) { resetProgress(); return; }
      if (target === $('#assessmentModal') || target === $('#lessonModal') || target === $('#installModal')) { closeModal(target); }
    });

    $('#wordSearch').addEventListener('input', renderDictionary);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        $$('.modal-backdrop').forEach((modal) => { if (!modal.hidden) closeModal(modal); });
      }
      if (event.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        event.preventDefault();
        navigate('words');
        $('#wordSearch').focus();
      }
    });
    window.addEventListener('online', updateConnectionStatus);
    window.addEventListener('offline', updateConnectionStatus);
    document.addEventListener('visibilitychange', async () => {
      if (!audioContext || !musicEnabled) return;
      try {
        if (document.hidden && audioContext.state === 'running') await audioContext.suspend();
        else if (!document.hidden && audioContext.state === 'suspended') await audioContext.resume();
      } catch (_error) { /* O áudio pode ser bloqueado pelo sistema operativo. */ }
    });
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      deferredInstallPrompt = event;
    });
    window.addEventListener('appinstalled', () => showToast('Bloom English foi adicionado ao teu dispositivo.'));
  }

  function init() {
    resetDailyCountersIfNeeded();
    setupEvents();
    updateDashboard();
    renderLessons();
    renderDictionary();
    renderProgress();
    updateConnectionStatus();
    setupServiceWorker();
  }

  init();
})();

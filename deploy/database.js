const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'db.json');

// Pre-populated students list distributed into 5 groups
const students = [
  // Group 1
  { name: "Aline Brenner", email: "aline.brenner@hmv.org.br", group: 1 },
  { name: "Aline Medeiros dos Santos", email: "aline.medeiros@hmv.org.br", group: 1 },
  { name: "Ana Cristina Oliveira da Rocha", email: "anarocha.med@gmail.com", group: 1 },
  { name: "Ana Paula Boscato", email: "apboscato@hotmail.com", group: 1 },
  { name: "Ana Paula Machado", email: "apsm.fisio@gmail.com", group: 1 },
  { name: "Analida Patrícia Pinto Buelvas", email: "analida41@hotmail.com", group: 1 },
  { name: "André Luiz Marques Annes", email: "andre.annes@hmv.org.br", group: 1 },
  { name: "Andrea Bonato de Araujo", email: "andrea.araujo@hmv.org.br", group: 1 },
  { name: "Aluno Visitante 1", email: "visitante1@hmv.org.br", group: 1 },
  
  // Group 2
  { name: "Bibiana Dutra Antunes da Cunha", email: "bibiana.cunha@hmv.org.br", group: 2 },
  { name: "David da Silva Pache", email: "david.pache@hmv.org.br", group: 2 },
  { name: "David Pereira Garcia Junior", email: "david.junior@hmv.org.br", group: 2 },
  { name: "Débora Marina Vian", email: "vian.debora@gmail.com", group: 2 },
  { name: "Enrique Pokulat", email: "drenriquepokulat@gmail.com", group: 2 },
  { name: "Eric Homero Albuquerque Paschoal", email: "ericpaschoal@yahoo.com.br", group: 2 },
  { name: "Ernesto Bettio Soares", email: "ernestobettio@gmail.com", group: 2 },
  { name: "Francine Hehn de Oliveira", email: "francine.oliveira@hmv.org.br", group: 2 },
  { name: "Aluno Visitante 2", email: "visitante2@hmv.org.br", group: 2 },
  
  // Group 3
  { name: "Josiane Berbigier Weber", email: "josiane.weber@hmv.org.br", group: 3 },
  { name: "Joao Batista Seixas Paixão", email: "joao.paixao@hmv.org.br", group: 3 },
  { name: "Katherine Saibel", email: "katherine.saibel@hmv.org.br", group: 3 },
  { name: "Lindayane Debom Motta", email: "lindayane.motta@hmv.org.br", group: 3 },
  { name: "Luciane Donin", email: "donin.luciane@gmail.com", group: 3 },
  { name: "Luise Pereira Senna", email: "lpsenna@yahoo.com.br", group: 3 },
  { name: "Luiza Abdala", email: "luiza.abdala@hmv.org.br", group: 3 },
  { name: "Malgarino Roncato", email: "roncatocoluna@gmail.com", group: 3 },
  { name: "Aluno Visitante 3", email: "visitante3@hmv.org.br", group: 3 },
  
  // Group 4
  { name: "Marcelo Genro Schutz", email: "marcelo.schutz@hmv.org.br", group: 4 },
  { name: "Otávio Cunha", email: "dr.otaviocunha@gmail.com", group: 4 },
  { name: "Patricia Nocchi", email: "patricia.nocchi@hmv.org.br", group: 4 },
  { name: "Rafael Andrade de Azeredo Bastos", email: "rafaelazeredobastos@gmail.com", group: 4 },
  { name: "Rafael Martins Lopes", email: "rafael.lopes@hmv.org.br", group: 4 },
  { name: "Reginaldo Oliveira Rosa", email: "reginaldo@unimedvaledasantas.coop.br", group: 4 },
  { name: "Rodrigo Argenta", email: "argenta1976@gmail.com", group: 4 },
  { name: "Aluno Visitante 4", email: "visitante4@hmv.org.br", group: 4 },
  
  // Group 5
  { name: "Rodrigo Aristides da Silva Correa", email: "rodrigo.correa@hmv.org.br", group: 5 },
  { name: "Rodrigo da Silva Martins", email: "rodrigo.martins@hmv.org.br", group: 5 },
  { name: "Rogério Heggendorn Sayão Filho", email: "rhsayao@hotmail.com", group: 5 },
  { name: "Sandro Roberto Batista Carmo", email: "sandro.carmo@hmv.org.br", group: 5 },
  { name: "Tiago Abreu", email: "Tiago.abreu@hmv.org.br", group: 5 },
  { name: "Vanderleia da Rocha Scharb Cereser", email: "vanderleia.cereser@hmv.org.br", group: 5 },
  { name: "Yael Garcia Pinho", email: "yael.pinho@hmv.org.br", group: 5 },
  { name: "Aluno Visitante 5", email: "visitante5@hmv.org.br", group: 5 }
];

const scenarios = {
  "1": {
    "title": "Grupo 1: IA de Triagem de Urgência",
    "description": "Implementação de sistema de IA para triagem automática de pacientes em pronto-socorro (120k atendimentos/ano).",
    "investment": 1500000,
    "annualBenefit": 300000,
    "annualCost": 50000,
    "adoptionRate": 80,
    "riskCost": 350000,
    "caseStudy": "<strong>Contexto Hospitalar:</strong> O Hospital de Pronto-Socorro Santa Teresa atende 120.000 pacientes anuais. Atualmente, a classificação de risco Manchester é realizada de forma manual por enfermeiros triadores, levando em média 24 minutos para ser concluída (em contraste com a meta ideal de menos de 10 minutos). Esse atraso crônico gera superlotação constante na recepção, evasão de pacientes com quadros potencialmente graves e recorrentes ameaças de processos judiciais.<br><br><strong>A Solução Proposta:</strong> Implementar uma ferramenta de IA integrada ao fluxo de recepção. O algoritmo processará em tempo real a queixa principal (gravada por áudio ou digitada) e as primeiras medições de sinais vitais do paciente, sugerindo de imediato a cor de prioridade Manchester para validação e aprovação do enfermeiro triador.<br><br><strong>Estudo de Caso para Análise:</strong> Para justificar a implantação, a diretoria exige uma análise aprofundada de custos e viabilidade. O investimento inicial projetado é de R$ 1.500.000, com uma estimativa de capturar cerca de R$ 300.000 em retornos anuais gerados por eficiência operacional e redução de evasões. No entanto, o comitê de governança levantou preocupações cruciais. A equipe médica alerta para o perigo clínico crítico de falsos negativos (como triar erroneamente uma dor no peito por infarto agudo como prioridade verde de baixa gravidade). Estudos da literatura indicam que sistemas semelhantes têm uma taxa média de erro de classificação clínica de 0,5%, o que, no volume do hospital, expõe a instituição a processos civis cujos custos de risco foram estimados em R$ 350.000 de impacto. Além disso, os enfermeiros seniores expressam preocupação com o fluxo operacional, temendo que o excesso de alertas irrelevantes na tela provoque 'fadiga de alarmes' e burocratize a triagem com cliques redundantes. Por fim, há incertezas sobre o comportamento dos pacientes, que podem se sentir desconfortáveis ou inseguros ao perceber que o acolhimento inicial e a definição de prioridade estão sendo sugeridos por um algoritmo."
  },
  "2": {
    "title": "Grupo 2: Automação de Farmácia Robótica",
    "description": "Automação com dispensadores robóticos para farmácia central hospitalar (10k dispensações/mês, redução de 6 FTE).",
    "investment": 1800000,
    "annualBenefit": 320000,
    "annualCost": 60000,
    "adoptionRate": 90,
    "riskCost": 400000,
    "caseStudy": "<strong>Contexto Hospitalar:</strong> A farmácia central de um hospital de alta complexidade realiza 10.000 dispensações de doses de medicamentos por mês. O índice de erros de dispensação (dose errada, medicamento errado) está em 1,8%, o que resulta em prolongamento de internação e custos extras.<br><br><strong>A Solução Proposta:</strong> Instalação de dispensadores mecânicos robóticos inteligentes integrados diretamente ao sistema de prescrição médica do prontuário do paciente. Os robôs preparam as doses unitarizadas de forma automatizada por paciente.<br><br><strong>Estudo de Caso para Análise:</strong> A proposta exige um aporte inicial significativo de R$ 1.800.000. O benefício financeiro anual estimado de R$ 320.000 decorre da realocação de 6 equivalentes de tempo integral (FTEs) da equipe assistencial. Contudo, a equipe de tecnologia aponta uma barreira técnica importante: a integração de dados com o sistema de prescrição legado é altamente complexa, e qualquer falha na sincronização das informações pode propagar erros mecânicos de dispensação em larga escala. No âmbito operacional, o maior medo é uma pane total do equipamento (falha mecânica ou elétrica no robô), o que paralisaria completamente a distribuição de medicamentos no hospital e obrigaria a contratação imediata de uma equipe manual de contingência emergencial, cujo impacto financeiro é estimado em R$ 400.000. Adicionalmente, há uma clara barreira cultural com a resistência técnica e operacional demonstrada pelos farmacêuticos seniores, que se sentem ameaçados ou desconfortáveis com o novo fluxo de trabalho robótico."
  },
  "3": {
    "title": "Grupo 3: Telemetria Cardíaca Wireless",
    "description": "Monitoramento de telemetria sem fio contínuo para leitos de retaguarda (80 leitos, 3k pacientes/ano).",
    "investment": 2200000,
    "annualBenefit": 1500000,
    "annualCost": 180000,
    "adoptionRate": 85,
    "riskCost": 800000,
    "caseStudy": "<strong>Contexto Hospitalar:</strong> O Hospital do Coração possui 80 leitos de enfermaria geral para pacientes pós-infarto estáveis (3.000 pacientes/ano). Hoje, a checagem manual de sinais vitais e ECG é feita de 4 em 4 horas pela equipe de enfermagem, o que atrasa a detecção de arritmias súbitas graves.<br><br><strong>A Solução Proposta:</strong> Adquirir patches adesivos wireless vestíveis que monitoram o ECG continuamente, com IA central na nuvem que dispara alertas de arritmias ou desaturações diretamente no smartphone da enfermagem do andar.<br><br><strong>Estudo de Caso para Análise:</strong> O projeto exige um investimento inicial elevado de R$ 2.200.000, acompanhado por um custo recorrente anual de R$ 180.000 para reposição dos adesivos descartáveis. Em contrapartida, projeta-se um benefício anual de R$ 1.500.000, sustentado pela redução drástica na taxa de paradas cardiorrespiratórias na enfermaria e na diminuição do tempo médio de internação. Entretanto, o departamento de infraestrutura de TI adverte sobre oscilações crônicas na cobertura de sinal Wi-Fi hospitalar, o que pode interromper a transmissão contínua de telemetria em áreas de sombra. Operacionalmente, a movimentação rotineira dos pacientes nos leitos tende a gerar falsos positivos de alteração cardíaca, o que pode sobrecarregar a enfermagem com notificações desnecessárias (fadiga de alarmes) e induzir o corpo assistencial a desativar os alertas ou negligenciar o uso correto dos patches cardíacos. Historicamente, casos de falha de leitura ou atraso na resposta de parada cardíaca expõem a instituição a custos de risco por processos judiciais estimados em R$ 800.000."
  },
  "4": {
    "title": "Grupo 4: IA em Radiologia",
    "description": "Algoritmo de auxílio diagnóstico como segundo leitor para exames de imagem de urgência (80k exames/ano, miss rate baseline 2-3%).",
    "investment": 800000,
    "annualBenefit": 1200000,
    "annualCost": 150000,
    "adoptionRate": 75,
    "riskCost": 500000,
    "caseStudy": "<strong>Contexto Hospitalar:</strong> Um centro de imagem atende 80.000 exames de urgência (raio-X de tórax e TC de crânio) por ano. O tempo médio para liberar o laudo é de 4 horas devido ao grande volume de exames na fila. O índice de achados críticos não identificados na primeira leitura pelo plantonista é de 2,5% (miss rate).<br><br><strong>A Solução Proposta:</strong> Licenciamento de IA de apoio diagnóstico (segundo leitor). O algoritmo analisa o exame imediatamente após sua realização e gera um alerta visual no painel do radiologista se detectar achados críticos (hemorragias, pneumotórax).<br><br><strong>Estudo de Caso para Análise:</strong> O investimento inicial do projeto é de R$ 800.000, com projeção de capturar um retorno macro de R$ 1.200.000 em valor presente líquido decorrente do aumento de fluxo operacional e novos contratos comerciais cirúrgicos. Do ponto de vista técnico, a acurácia diagnóstica do sistema pode cair sensivelmente em subgrupos específicos de idade (como pediatria) ou devido a artefatos causados por máquinas de imagem mais antigas. Operacionalmente, um volume excessivo de falsos alertas gerados pela IA pode consumir tempo produtivo dos médicos na revisão de falso-positivos, atrasando a fila principal. A maior preocupação da direção clínica é a dependência excessiva (over-reliance), onde o radiologista pode confiar cegamente em um diagnóstico limpo sugerido pela IA e deixar de analisar detalhadamente a imagem de forma manual. Processos civis decorrentes de diagnósticos errados motivados por essa confiança cega de negligência médica são estimados com um custo de risco na ordem de R$ 500.000."
  },
  "5": {
    "title": "Grupo 5: Prontuário Eletrônico Integrado",
    "description": "Substituição e integração de múltiplos prontuários eletrônicos legados em hospital de alta complexidade (500 leitos).",
    "investment": 5000000,
    "annualBenefit": 1050000,
    "annualCost": 450000,
    "adoptionRate": 85,
    "caseStudy": "<strong>Contexto Hospitalar:</strong> Um hospital filantrópico de 500 leitos opera hoje com 4 sistemas de prontuários eletrônicos legados separados (um na UTI, um na internação, um no ambulatório e outro no faturamento), o que gera atrito de informação e 12% de glosas no faturamento por falta de registro integrado.<br><br><strong>A Solução Proposta:</strong> Migração e substituição por uma plataforma única de Prontuário Eletrônico (EHR) moderno integrado com um copiloto de IA para sumarização clínica e preenchimento de faturamento.<br><br><strong>Estudo de Caso para Análise:</strong> A unificação dos sistemas demandará um investimento expressivo de R$ 5.000.000 e um custo operacional anual de suporte de R$ 450.000, prometendo um retorno anual de R$ 1.050.000 diretamente associado à drástica redução das glosas do hospital. No entanto, o plano de transição aponta desafios complexos. Do ponto de vista técnico, existe o risco iminente de corrupção ou perda de dados históricos médicos legados durante a migração para a nova base. Durante a virada de chave do sistema (o dia do go-live), falhas ou lentidões sistêmicas críticas podem paralisar o atendimento do hospital, gerando um custo operacional de contingência estimado em R$ 2.000.000. Adicionalmente, há o desafio cultural e de confiança dos profissionais de saúde, dada a forte resistência histórica do corpo clínico em utilizar novas plataformas de registro eletrônico, queixando-se do tempo adicional gasto para digitação e adaptação ao novo fluxo.",
    "riskCost": 2000000
  }
};


const syllabusBibliography = {
  basica: [
    { citation: "ARBACHE, F. Inovação e Inteligência Artificial Aplicada à Gestão de Riscos. KnowRISK Press, 2024." },
    { citation: "DAMODARAN, A. Investment Valuation: Tools and Techniques for Determining the Value of Any Asset. 4th ed. Hoboken: Wiley, 2024." },
    { citation: "KAPLAN, R. S.; NORTON, D. P. The Balanced Scorecard: Translating Strategy into Action. Boston: Harvard Business School Press, 1996." },
    { citation: "HUBBARD, D. W. How to Measure Anything: Finding the Value of Intangibles in Business. 4th ed. Hoboken: Wiley, 2024." },
    { citation: "CLEVERLEY, W. O.; CLEVERLEY, J. O.; SONG, P. H. Essentials of Health Care Finance. 9th ed. Burlington: Jones & Bartlett Learning, 2023." },
    { citation: "TOPOL, E. Deep Medicine: How Artificial Intelligence Can Make Healthcare Human Again. New York: Basic Books, 2019." },
    { citation: "TALEB, N. N. Skin in the Game: Hidden Asymmetries in Daily Life. New York: Random House, 2018." },
    { citation: "RASMUSSEN, N.; BANSAL, M.; CHEN, Y. Business Dashboards: A Visual Catalog for Design and Deployment. Hoboken: Wiley, 2023." }
  ],
  complementar: [
    { citation: "HOPKIN, P. Fundamentals of Risk Management: Understanding, Evaluating and Implementing Effective Risk Management. 6th ed. London: Kogan Page, 2024." },
    { citation: "FRASER, J. R. S.; SIMKINS, B. J.; NARVAEZ, K. Implementing Enterprise Risk Management: Case Studies and Best Practices. 2nd ed. Hoboken: Wiley, 2024." },
    { citation: "HUBBARD, D. W. The Failure of Risk Management: Why It's Broken and How to Fix It. 2nd ed. Hoboken: Wiley, 2020." },
    { citation: "CROUHY, M.; GALAI, D.; MARK, R. The Essentials of Risk Management. 3rd ed. New York: McGraw-Hill, 2024." },
    { citation: "TALEB, N. N. Antifrágil: Coisas que se Beneficiam com o Caos. Rio de Janeiro: Objetiva, 2013." },
    { citation: "GAPENSKI, L. C.; REITER, K. L. Healthcare Finance: An Introduction to Accounting and Financial Management. 7th ed. Chicago: Health Administration Press, 2022." },
    { citation: "NOWICKI, M. Introduction to the Financial Management of Healthcare Organizations. 8th ed. Chicago: Health Administration Press, 2022." },
    { citation: "ZELMAN, W. N.; McCUE, M. J.; GLICK, N. D. Financial Management of Health Care Organizations. 5th ed. Hoboken: Wiley, 2020." },
    { citation: "PORTER, M. E.; LEE, T. H. The Strategy That Will Fix Health Care. Harvard Business Review, v. 91, n. 10, p. 50-70, 2013." },
    { citation: "DAVENPORT, T. H.; KALAKOTA, R. The Potential for Artificial Intelligence in Healthcare. Future Healthcare Journal, v. 6, n. 2, p. 94-98, 2019." },
    { citation: "OBERMEYER, Z.; EMANUEL, E. J. Predicting the Future — Big Data, Machine Learning, and Clinical Medicine. New England Journal of Medicine, v. 375, n. 13, p. 1216-1219, 2016." },
    { citation: "JIANG, F. et al. Artificial Intelligence in Healthcare: Past, Present and Future. Stroke and Vascular Neurology, v. 2, n. 4, p. 230-243, 2017." },
    { citation: "REDDY, S. et al. A Governance Model for the Application of AI in Health Care. Journal of the American Medical Informatics Association, v. 27, n. 3, p. 491-497, 2020." },
    { citation: "CHAR, D. S.; SHAH, N. H.; MAGNUS, D. Implementing Machine Learning in Health Care. New England Journal of Medicine, v. 378, n. 11, p. 981-983, 2018." },
    { citation: "BANKS, J. et al. Discrete-Event System Simulation. 5th ed. Upper Saddle River: Pearson, 2020." },
    { citation: "KELTON, W. D.; SADOWSKI, R. P.; ZUPICK, N. B. Simulation with Arena. 7th ed. New York: McGraw-Hill, 2024." },
    { citation: "GÜNAL, M. M.; PIDD, M. Discrete Event Simulation for Performance Modelling in Health Care: A Review of the Literature. Journal of Simulation, v. 4, n. 1, p. 42-51, 2010." },
    { citation: "BRAILSFORD, S. C.; VISSERS, J. OR in Healthcare: A European Perspective. European Journal of Operational Research, v. 212, n. 2, p. 223-234, 2011." },
    { citation: "KAHNEMAN, D. Rápido e Devagar: Duas Formas de Pensar. Rio de Janeiro: Objetiva, 2012." },
    { citation: "KAHNEMAN, D.; SIBONY, O.; SUNSTEIN, C. R. Noise: A Flaw in Human Judgment. New York: Little, Brown Spark, 2021." },
    { citation: "THALER, R. H.; SUNSTEIN, C. R. Nudge: Improving Decisions About Health, Wealth, and Happiness. Rev. ed. London: Penguin Books, 2021." },
    { citation: "SNOWDEN, D. J.; BOONE, M. E. A Leader's Framework for Decision Making. Harvard Business Review, v. 85, n. 11, p. 68-76, 2007." },
    { citation: "CHRISTENSEN, C. M.; GROSSMAN, J. H.; HWANG, J. The Innovator's Prescription: A Disruptive Solution for Health Care. New York: McGraw-Hill, 2009." },
    { citation: "INSTITUTE OF MEDICINE. To Err Is Human: Building a Safer Health System. Washington: National Academies Press, 2000." },
    { citation: "JAMES, J. T. A New, Evidence-Based Estimate of Patient Harms Associated with Hospital Care. Journal of Patient Safety, v. 9, n. 3, p. 122-128, 2013." },
    { citation: "DONABEDIAN, A. The Definition of Quality and Approaches to Its Assessment. Ann Arbor: Health Administration Press, 1980." },
    { citation: "ISO 31000:2018. Risk Management — Guidelines. Geneva: ISO, 2018." },
    { citation: "ISO/IEC 27005:2022. Information Security, Cybersecurity and Privacy Protection — Guidance on Managing Information Security Risks. Geneva: ISO, 2022." },
    { citation: "COSO. Enterprise Risk Management — Integrating with Strategy and Performance. Committee of Sponsoring Organizations of the Treadway Commission, 2017." },
    { citation: "WORLD HEALTH ORGANIZATION. Ethics and Governance of Artificial Intelligence for Health. Geneva: WHO, 2021." },
    { citation: "FDA. Artificial Intelligence and Machine Learning in Software as a Medical Device. U.S. Food and Drug Administration, 2024." }
  ]
};


const classesContent = [
  {
    "id": "aula1",
    "title": "Aula 1: Fundamentos, Simulação e o Efeito Dominó",
    "date": "07 de Julho de 2026",
    "description": "Compreender a invisibilidade do risco em projetos de inovação tecnológica na saúde, identificar a diferença entre risco aparente e oculto, e mapear os impactos em cadeia usando a dinâmica do Efeito Dominó.",
    "checkin": {
      "type": "wordcloud",
      "question": "Em uma palavra: Pense em uma tecnologia que prometeu muito e entregou problema."
    },
    "conceptCheck": [
  {
    "question": "Quais são as 4 categorias de risco do framework de categorização apresentado?",
    "options": [
      "Técnico, Operacional, Financeiro, Regulatório",
      "Clínico, Hospitalar, Financeiro, Jurídico",
      "Tecnológico, Administrativo, Reputacional, Econômico"
    ],
    "correctAnswerIndex": 0
  },
  {
    "question": "O que define o 'risco oculto' em inovação em saúde?",
    "options": [
      "Riscos de segurança da informação ou vazamento de dados",
      "Riscos regulatórios, técnicos, operacionais e financeiros que a proposta comercial não menciona",
      "Glosas que o hospital não consegue identificar"
    ],
    "correctAnswerIndex": 1
  },
  {
    "question": "No caso apresentado da IA de Laudos de Ressonância, por que o ROI esperado foi anulado?",
    "options": [
      "Porque a acurácia diagnóstica da IA foi inferior a 50%",
      "Devido a impactos secundários não mapeados, como saturação da recepção e estacionamento e pressão sobre a equipe assistencial",
      "Porque o preço de licença da IA dobrou no segundo ano"
    ],
    "correctAnswerIndex": 1
  }
],
    "reflection": {
  "type": "open",
  "question": "Primeira pergunta a fazer: Como a mudança de papel para 'Guardião da Viabilidade' altera sua perspectiva sobre novos softwares médicos?"
},
    "references": [
  {
    "citation": "IBM Watson · IEEE Spectrum (2019)",
    "url": "https://spectrum.ieee.org/how-ibm-watson-overpromised-on-ai-health-care"
  },
  {
    "citation": "IBM Watson · STAT News, recomendações inseguras (2018)",
    "url": "https://www.statnews.com/2018/07/25/ibm-watson-recommended-unsafe-cancer-treatments/"
  },
  {
    "citation": "IBM Watson · MD Anderson, JNCI (2017)",
    "url": "https://academic.oup.com/jnci/article/109/9/djx113/3896011"
  },
  {
    "citation": "IA de laudos · InRad/HC-FMUSP, Jornal da USP (2024)",
    "url": "https://jornal.usp.br/ciencias/inteligencia-artificial-no-inrad/"
  },
  {
    "citation": "IA em ressonância · HCI Ijuí (2026)",
    "url": "https://www.hci.org.br/hci-implanta-ia-na-ressonancia"
  }
],
    "slides": [
  {
    "id": "slide_1_1",
    "title": "Capa da Aula",
    "image": "/slides/aula1/slide_1.png",
    "block": "Introdução",
    "estimatedTime": "2 min",
    "notes": "<strong>Fala sugerida:</strong> Boas-vindas a todos ao MBA em IA na Saúde. Hoje iniciamos a nossa disciplina de Avaliação de Riscos e Investimentos com ROI. Nosso foco é a governança real e a matemática financeira, deslocando o olhar do marketing para a matemática financeira.",
    "content": "<h3>Avaliação de Riscos e Investimentos com ROI</h3><p>MBA em Inteligência Artificial Applied to Health</p><p>Faculdade de Ciências da Saúde Moinhos de Vento</p><p>Professora: Dra. Faila Santos</p>"
  },
  {
    "id": "slide_1_2",
    "title": "Aula 1: Fundamentos, Simulação e o Efeito Dominó",
    "image": "/slides/aula1/slide_2.png",
    "block": "Introdução",
    "estimatedTime": "5 min",
    "notes": "<strong>Fala sugerida:</strong> Antes de entrarmos no conteúdo, gostaria de me apresentar. Sou a Faila Santos, executiva em saúde com mais de 20 anos de experiência em informática e transformação digital. Meu compromisso é ajudá-los a liderar a inovação com segurança operacional, clínica e financeira. Nesta primeira sessão, discutiremos um trade-off crítico em gestão de tecnologia: a velocidade de adoção de inovações versus a segurança operacional e assistencial de nossas organizações de saúde. Vamos analisar como modelar e estressar os fluxos antes da implantação definitiva no paciente.",
    "content": "<h3>Dra. Faila Santos</h3><p>Executiva em saúde, líder em transformação digital e especialista em IA clínica, com mais de 20 anos de experiência nos EUA e Brasil.</p><p>Doutora e Mestre pela University of St. Augustine for Health Sciences, Senior Digital Health Advisor na HIMSS.</p>"
  },
  {
    "id": "slide_1_4",
    "title": "Objetivos e Agenda · Aula 1",
    "image": "/slides/aula1/slide_4.png",
    "block": "Introdução",
    "estimatedTime": "3 min",
    "notes": "<strong>Fala sugerida:</strong> O nosso objetivo hoje é aprender a distinguir risco aparente de oculto, ler a matriz de probabilidade versus impacto e desenhar um efeito dominó operacional. A nossa agenda está dividida em dois blocos de conteúdo, o estudo de caso do IBM Watson e a nossa dinâmica prática. Lembro que a participação ativa nas enquetes síncronas do portal conta 15% da nota final.",
    "content": "<h3>Objetivos e Agenda</h3><p><b>O que você vai saber:</b> Distinguir risco aparente de oculto, ler a matriz probabilidade × impacto e mapear um efeito dominó.</p><p><b>Agenda:</b> 2 blocos temáticos + caso real IBM Watson + dinâmica em grupo + reflexão final.</p><p><b>Avaliação:</b> Participação nos debates e atividades do portal conta 15% da nota.</p>"
  },
  {
    "id": "slide_1_3",
    "title": "Icebreaker · O Tiro no Pé Tecnológico",
    "image": "/slides/aula1/slide_3.png",
    "block": "Abertura",
    "estimatedTime": "8 min",
    "isInteractive": true,
    "interactionType": "wordcloud",
    "question": "Em uma única palavra: pense em uma tecnologia que prometeu muito e entregou frustração na rotina de vocês.",
    "notes": "<strong>Fala sugerida:</strong> Vamos iniciar com nossa dinâmica de abertura no portal. Respondam em uma única palavra: pensem em uma tecnologia de saúde digital que prometeu muito e entregou frustração na rotina de vocês. Pode ser um prontuário eletrônico lento, um app de telemedicina que vive caindo ou alertas irritantes que atrapalham o cuidado ao paciente. Votem e vamos analisar a nuvem de palavras gerada.",
    "content": "<h3>Icebreaker · O tiro no pé tecnológico</h3><p>Em uma única palavra: pense em uma tecnologia que prometeu muito e entregou frustração na rotina de vocês.</p><p>Responda no portal para gerar nossa nuvem de palavras síncrona.</p>"
  },
  {
    "id": "slide_1_5",
    "title": "O Guardião da Viabilidade",
    "image": "/slides/aula1/slide_5.png",
    "block": "Bloco 1: Identidade do Risco",
    "estimatedTime": "5 min",
    "notes": "<strong>Fala sugerida:</strong> Como analistas e líderes, o nosso papel é sermos os Guardiões da Viabilidade nas nossas instituições. Isso não significa barrar a inovação digital, mas sim garantir que a tecnologia sobreviva ao contato com a realidade do dia a dia assistencial.",
    "content": "<h3>O Guardião da Viabilidade</h3><p><i>\"Escolha a solução que os dados aprovam, e não a que o marketing vende.\"</i></p><p>Da planilha à governança: o papel de quem analisa dados e projetos é proteger a instituição de decisões ruins. Não se trata de frear a inovação. É garantir que ela sobreviva ao contato com a realidade.</p>"
  },
  {
    "id": "slide_1_6",
    "title": "Risco Aparente vs. Risco Oculto",
    "image": "/slides/aula1/slide_6.png",
    "block": "Bloco 1: Identidade do Risco",
    "estimatedTime": "5 min",
    "notes": "<strong>Fala sugerida:</strong> O risco aparente é o que todos enxergam na proposta comercial: preço do software e cronograma de implantação. Mas o risco oculto é o que realmente compromete o projeto: readequações de infraestrutura, passivos de conformidade regulatória e atritos no fluxo operacional que só descobrimos depois do GO.",
    "content": "<h3>Risco Aparente vs. Risco Oculto</h3><p><b>Risco Aparente:</b> O que todos veem e já está na planilha (preço do software, prazo de implantação, custo de licença).</p><p><b>Risco Oculto:</b> O que só aparece depois, nas dimensões regulatória, técnica e operacional.</p><p>O custo do projeto raramente está onde a proposta comercial aponta.</p>"
  },
  {
    "id": "slide_1_7",
    "title": "A Metáfora do Iceberg",
    "image": "/slides/aula1/slide_7.png",
    "block": "Bloco 1: Identidade do Risco",
    "estimatedTime": "5 min",
    "notes": "<strong>Fala sugerida:</strong> Pensem na inovação em saúde como um iceberg. A ponta emersa são as despesas de aquisição. A grande fatia submersa representa o esforço de suporte, treinamento e integrações. Um exemplo prático: comprar patches cardíacos inteligentes sem prever que a rede Wi-Fi do hospital precisaria ser reestruturada para não cair.",
    "content": "<h3>A Metáfora do Iceberg</h3><p>Pense no risco de inovação em saúde como um iceberg.</p><p>A parte emersa (10%) representa os custos diretos visíveis na planilha.</p><p>A parte submersa (90%) representa as barreiras técnicas, operacionais e regulatórias de adoção.</p>"
  },
  {
    "id": "slide_1_8",
    "title": "Framework de Categorização de Riscos",
    "image": "/slides/aula1/slide_8.png",
    "block": "Bloco 1: Identidade do Risco",
    "estimatedTime": "6 min",
    "notes": "<strong>Fala sugerida:</strong> Para guiar nossa análise, dividimos os riscos de qualquer projeto de IA em quatro grandes categorias, exatamente como vocês veem no slide: Técnico, Operacional, Financeiro e Regulatório. De que adianta ter um algoritmo clinicamente perfeito se ele viola as normas da ANVISA ou da LGPD (regulatório), ou se ele cria um fluxo burocrático que afasta o corpo clínico (operacional)?",
    "content": "<h3>Framework de Categorização de Riscos</h3><p>Para cada projeto de IA, liste pelo menos um risco em cada categoria. A disciplina de percorrer as 4 categorias vale mais do que a sofisticação da ferramenta.</p><ul><li><b>Técnico:</b> Integração, interoperabilidade, falhas de sistema.</li><li><b>Operacional:</b> Fluxo de trabalho, curva de adoção, recursos humanos.</li><li><b>Financeiro:</b> Custos ocultos, ROI real, glosas, retrabalho.</li><li><b>Regulatório:</b> Conformidade, LGPD, ANVISA, certificações.</li></ul>"
  },
  {
    "id": "slide_1_9",
    "title": "Matriz Probabilidade × Impacto na Saúde",
    "image": "/slides/aula1/slide_9.png",
    "block": "Bloco 1: Identidade do Risco",
    "estimatedTime": "5 min",
    "notes": "<strong>Fala sugerida:</strong> A clássica matriz de severidade versus probabilidade precisa de uma calibração diferente na área da saúde. A segurança do paciente tem tolerância zero a falhas críticas. Se um evento clínico adverso induzido por um erro da IA tem impacto severo sobre a vida do paciente, esse risco deve ser posicionado no quadrante vermelho (mitigar/evitar), mesmo que a probabilidade estatística de ocorrer seja de apenas 0,1%. Em saúde, o impacto clínico sempre sobrepõe a probabilidade estatística.",
    "content": "<h3>Matriz Probabilidade × Impacto na Saúde</h3><p>Em saúde, baixa probabilidade nunca neutraliza impacto sobre segurança do paciente.</p><p>Um evento raro com consequência clínica grave pertence ao quadrante vermelho — independentemente da frequência.</p>"
  },
  {
    "id": "slide_1_10",
    "title": "Transição para a Lousa",
    "image": "/slides/aula1/slide_10.png",
    "block": "Bloco 1: Identidade do Risco",
    "estimatedTime": "2 min",
    "notes": "<strong>Fala sugerida:</strong> Vamos agora para a lousa interativa para desenharmos e posicionarmos riscos reais.",
    "content": "<h3>Análise Prática de Riscos</h3><p>Preparação para plotagem e classificação de riscos síncronos na matriz de gravidade assistencial.</p>"
  },
  {
    "id": "slide_1_10_ whiteboard",
    "title": "Lousa Interativa",
    "image": "/slides/aula1/slide_10.png",
    "block": "Bloco 1: Identidade do Risco",
    "estimatedTime": "10 min",
    "isInteractive": true,
    "interactionType": "whiteboard",
    "question": "Matriz Probabilidade x Impacto: O professor desenhará na lousa cenários de risco clínico, técnico e operacional.",
    "notes": "<strong>Fala sugerida:</strong> Vou abrir a nossa lousa interativa síncrona agora. Vamos plotar juntos alguns riscos do cotidiano nesta matriz e discutir as estratégias de mitigação necessárias.",
    "content": "<h3>Matriz Probabilidade x Impacto</h3><p>O professor desenhará na lousa cenários de risco clínico, técnico e operacional para análise de gravidade.</p>"
  },
  {
    "id": "slide_1_11",
    "title": "Classifique o Risco · Atividade Interativa",
    "image": "/slides/aula1/slide_11.png",
    "block": "Bloco 1: Identidade do Risco",
    "estimatedTime": "2 min",
    "notes": "<strong>Fala sugerida:</strong> Para cada risco identificado, devemos definir uma estratégia de resposta com base na sua gravidade: Aceitar (✅) para riscos baixos, Monitorar (👁️) para acompanhar a evolução, Mitigar (🛠️) para reduzir o impacto ativamente e Evitar (🚫) para riscos clínicos severos de alta gravidade, onde a tolerância é zero. Agora, vou lançar no portal quatro cenários práticos para vocês classificarem ao vivo.",
    "content": "<h3>Classifique o Risco</h3><p>Vote no portal para calibrar os quadrantes de risco de novos sistemas hospitalares.</p>"
  },
  {
    "id": "slide_1_12_a",
    "title": "Classifique o Risco 1: Técnico",
    "image": "/slides/aula1/slide_12.png",
    "block": "Bloco 1: Identidade do Risco",
    "estimatedTime": "2 min",
    "isInteractive": true,
    "interactionType": "poll",
    "correctAnswerIndex": 3,
    "question": "Risco Técnico: Algoritmo de IA de triagem apresenta taxa de falsos negativos de 1% em pacientes com sintomas atípicos de infarto. Em qual quadrante ele cai?",
    "options": [
      "Aceitar (Baixa Probabilidade e Baixo Impacto)",
      "Monitorar (Média Probabilidade e Baixo Impacto)",
      "Mitigar (Alta Probabilidade ou Médio Impacto)",
      "Evitar (Alta Probabilidade e Alto Impacto / Crítico)"
    ],
    "notes": "<strong>Fala sugerida (Gabarito: EVITAR):</strong> Cenário 1 (Técnico): O algoritmo de IA de triagem na emergência apresenta 1% de falsos negativos para infarto. Isso significa que a cada 100 infartados atípicos, um é liberado incorretamente por erro técnico. Onde classificam? O gabarito correto aqui é EVITAR (vermelho), pois a falha técnica gera risco direto de morte e a tolerância clínica é zero.",
    "content": "<h3>Classifique o Risco Técnico</h3><p><strong>Cenário:</strong> Algoritmo de IA de triagem apresenta taxa de falsos negativos de 1% em pacientes com sintomas atípicos de infarto.</p><p>Comando: \"Vote em qual quadrante da matriz este risco cai.\"</p>"
  },
  {
    "id": "slide_1_12_b",
    "title": "Classifique o Risco 2: Operacional",
    "image": "/slides/aula1/slide_12.png",
    "block": "Bloco 1: Identidade do Risco",
    "estimatedTime": "2 min",
    "isInteractive": true,
    "interactionType": "poll",
    "correctAnswerIndex": 2,
    "question": "Risco Operacional: Aceleração do tempo de emissão de laudos de ressonância gera superlotação secundária na recepção e no estacionamento do hospital. Em qual quadrante ele cai?",
    "options": [
      "Aceitar (Baixa Probabilidade e Baixo Impacto)",
      "Monitorar (Média Probabilidade e Baixo Impacto)",
      "Mitigar (Alta Probabilidade ou Médio Impacto)",
      "Evitar (Alta Probabilidade e Alto Impacto / Crítico)"
    ],
    "notes": "<strong>Fala sugerida (Gabarito: MITIGAR):</strong> Cenário 2 (Operacional): O processamento de exames por IA triplica a velocidade dos laudos de ressonância. A consequência imediata é que a recepção e o estacionamento do hospital lotam em horários de pico, gerando gargalo operacional secundário. Qual o quadrante desse risco? O gabarito correto é MITIGAR (laranja/amarelo), pois, embora não seja um risco clínico fatal imediato, compromete a operação e exige ações mitigadoras como redesenho de agenda e estacionamento.",
    "content": "<h3>Classifique o Risco Operacional</h3><p><strong>Cenário:</strong> Aceleração do tempo de emissão de laudos de ressonância gera superlotação secundária na recepção e no estacionamento do hospital.</p><p>Comando: \"Vote em qual quadrante da matriz este risco cai.\"</p>"
  },
  {
    "id": "slide_1_12_c",
    "title": "Classifique o Risco 3: Regulatório",
    "image": "/slides/aula1/slide_12.png",
    "block": "Bloco 1: Identidade do Risco",
    "estimatedTime": "2 min",
    "isInteractive": true,
    "interactionType": "poll",
    "correctAnswerIndex": 3,
    "question": "Risco Regulatório: Hospital lança ferramenta de IA sem a devida homologação da ANVISA ou conformidade com a LGPD. Em qual quadrante ele cai?",
    "options": [
      "Aceitar (Baixa Probabilidade e Baixo Impacto)",
      "Monitorar (Média Probabilidade e Baixo Impacto)",
      "Mitigar (Alta Probabilidade ou Médio Impacto)",
      "Evitar (Alta Probabilidade e Alto Impacto / Crítico)"
    ],
    "notes": "<strong>Fala sugerida (Gabarito: EVITAR):</strong> Cenário 3 (Regulatório): Implementar uma IA de apoio diagnóstico sem a devida certificação da ANVISA ou sem adequação às diretrizes de proteção de dados da LGPD. Isso pode levar à suspensão do serviço e multas pesadas. Onde posicionam esse risco regulatório? O gabarito correto é EVITAR (vermelho), pois a operação sob ilegalidade regulatória coloca a instituição sob risco iminente de interdição e passivo civil grave.",
    "content": "<h3>Classifique o Risco Regulatório</h3><p><strong>Cenário:</strong> Hospital lança ferramenta de IA sem a devida homologação da ANVISA ou conformidade com a LGPD, correndo risco de multa e suspensão do serviço.</p><p>Comando: \"Vote em qual quadrante da matriz este risco cai.\"</p>"
  },
  {
    "id": "slide_1_12_d",
    "title": "Classifique o Risco 4: Financeiro",
    "image": "/slides/aula1/slide_12.png",
    "block": "Bloco 1: Identidade do Risco",
    "estimatedTime": "2 min",
    "isInteractive": true,
    "interactionType": "poll",
    "correctAnswerIndex": 1,
    "question": "Risco Financeiro: Necessidade de upgrade milionário na infraestrutura de rede Wi-Fi do hospital para suportar os patches de telemetria contínua. Em qual quadrante ele cai?",
    "options": [
      "Aceitar (Baixa Probabilidade e Baixo Impacto)",
      "Monitorar (Média Probabilidade e Baixo Impacto)",
      "Mitigar (Alta Probabilidade ou Médio Impacto)",
      "Evitar (Alta Probabilidade e Alto Impacto / Crítico)"
    ],
    "notes": "<strong>Fala sugerida (Gabarito: MONITORAR):</strong> Cenário 4 (Financeiro): A contratação de uma IA de monitoramento remoto exige uma despesa extra não prevista de readequação e ampliação de banda da rede Wi-Fi hospitalar. Onde classificam esse custo oculto de infraestrutura? O gabarito correto é MONITORAR (amarelo/verde), pois, apesar de ser um custo oculto real de infraestrutura, ele é previsível, mapeável e não interrompe a operação se monitorado no orçamento.",
    "content": "<h3>Classifique o Risco Financeiro</h3><p><strong>Cenário:</strong> Necessidade de upgrade na infraestrutura de rede Wi-Fi do hospital para suportar a telemetria em leitos.</p><p>Comando: \"Vote em qual quadrante da matriz este risco cai.\"</p>"
  },
  {
    "id": "slide_1_13",
    "title": "A Velocidade que Prejudica",
    "image": "/slides/aula1/slide_13.png",
    "block": "Bloco 2: Dinâmica de Fluxo",
    "estimatedTime": "5 min",
    "notes": "<strong>Fala sugerida:</strong> Um conceito fundamental de processos na saúde: otimizar localmente sem planejar o fluxo global apenas transfere a ineficiência. Acelerar uma etapa assistencial sem preparar o restante do hospital gera sérios riscos operacionais e clínicos downstream.",
    "content": "<h3>A Velocidade que Prejudica</h3><p>Eficiência excessiva em uma etapa pode gerar risco clínico em outra.</p><p>Acelerar uma parte do fluxo sem preparar o restante gera gargalos secundários e atrasos sistêmicos.</p>"
  },
  {
    "id": "slide_1_14",
    "title": "Gargalos Secundários",
    "image": "/slides/aula1/slide_14.png",
    "block": "Bloco 2: Dinâmica de Fluxo",
    "estimatedTime": "5 min",
    "notes": "<strong>Fala sugerida:</strong> A pergunta crítica para o fornecedor é: se eu triplicar a velocidade de laudos com IA, o que acontece com a agenda de consultas secundárias ou a hotelaria de internação? A aceleração local não resolve o gargalo, apenas muda o ponto de saturação na cadeia.",
    "content": "<h3>Gargalos Secundários</h3><p>Ao acelerar a triagem ou o diagnóstico, para onde vai a pressão assistencial?</p><p>Gargalos secundários comuns: faturamento/glosas, agendamento de retorno, tempo de espera na farmácia, ociosidade em leitos.</p>"
  },
  {
    "id": "slide_1_15",
    "title": "Onde Seu Fluxo Trava?",
    "image": "/slides/aula1/slide_15.png",
    "block": "Bloco 2: Dinâmica de Fluxo",
    "estimatedTime": "6 min",
    "isInteractive": true,
    "interactionType": "open_ended",
    "question": "Descreva um gargalo secundário que você já viu surgir depois de uma melhoria.",
    "notes": "<strong>Fala sugerida:</strong> Acessem a aba no portal e digitem em poucas palavras um gargalo operacional secundário que vocês já testemunharam após a implantação de uma inovação no hospital. Curtam as contribuições dos colegas.",
    "content": "<h3>Onde seu fluxo trava?</h3><p>Compartilhe um caso real de gargalo secundário pós-implantação que você presenciou no dia a dia em saúde.</p>"
  },
  {
    "id": "slide_1_16",
    "title": "Caso Real Internacional · IBM Watson for Oncology",
    "image": "/slides/aula1/slide_16.png",
    "block": "Estudo de Caso",
    "estimatedTime": "8 min",
    "notes": "<strong>Fala sugerida:</strong> Vamos analisar o caso do IBM Watson for Oncology. Este caso é o exemplo perfeito de como a falha em prever gargalos operacionais e a usabilidade clínica destrói o ROI de um projeto. A IBM investiu mais de 62 milhões de dólares, mas o sistema foi rejeitado porque não se integrava ao prontuário eletrônico e gerava alertas redundantes. O gargalo aqui não foi a acurácia do algoritmo, mas a fricção operacional e a falta de adoção dos oncologistas no fluxo diário.",
    "content": "<h3>Caso Real Internacional: IBM Watson for Oncology</h3><p>Investimento de USD 62 milhões em parceria diagnóstica com MD Anderson Cancer Center, descontinuado in 2022.</p><p>O Watson recomendava tratamentos padronizados sem personalização para o fluxo dos oncologistas de ponta.</p>"
  },
  {
    "id": "slide_1_17",
    "title": "Caso Integrado · IA de Laudos de Ressonância",
    "image": "/slides/aula1/slide_17.png",
    "block": "Estudo de Caso",
    "estimatedTime": "8 min",
    "notes": "<strong>Fala sugerida:</strong> No cenário nacional, a aceleração de exames por IA no InRad USP ou no HCI Ijuí mostra o potencial técnico de otimização de laudos. No entanto, o retorno real depende da capacidade do hospital em absorver essa alta vazão de exames e coordenar a agenda assistencial subsequente.",
    "content": "<h3>Caso Integrado: IA de Laudos de Ressonância</h3><p>Aceleração de exames por IA no InRad/HC-FMUSP e HCI Ijuí (RS) gera altos volumes diagnósticos.</p><p>O impacto prático migra para a recepção (superlotação) e para a cobrança (gargalos de auditoria de glosas).</p>"
  },
  {
    "id": "slide_1_17_read",
    "title": "Leitura Rápida: IA de Laudos no Brasil",
    "image": "/slides/aula1/slide_17.png",
    "block": "Estudo de Caso",
    "estimatedTime": "5 min",
    "notes": "<strong>Fala sugerida:</strong> Separem 5 minutos para ler a documentação de implantação da IA em ressonância e laudos no Brasil. Observem os indicadores operacionais de fluxo antes de partirmos para a discussão.",
    "content": "<h3>Leitura Rápida: IA de Laudos no Brasil</h3><p>Debate sobre o avanço prático de modelos de inteligência artificial aplicados a exames de imagem no InRad USP e hospitais do Sul do país.</p>"
  },
  {
    "id": "slide_1_17_dyn",
    "title": "Dinâmica: Gargalos da Alta Vazão",
    "image": "/slides/aula1/slide_17.png",
    "block": "Estudo de Caso",
    "estimatedTime": "5 min",
    "isInteractive": true,
    "interactionType": "poll",
    "question": "Se a IA triplicar a velocidade de laudos, onde o fluxo assistencial do seu hospital entra em colapso primeiro?",
    "options": [
      "Superlotação física da recepção e estacionamento",
      "Sobrecarga de médicos assistentes para responder laudos positivos",
      "Auditoria interna e controle de glosas de faturamento dos exames"
    ],
    "notes": "<strong>Fala sugerida (Discussão de Opções):</strong> Votem na enquete síncrona: se a IA triplicar a velocidade de processamento e emissão de laudos de exames, qual o setor ou fluxo do hospital de vocês que sofreria mais pressão e correria risco de colapso primeiro? *Dica de condução:* Não há resposta certa absoluta, mas ressalte aos alunos que na maioria das instituições o faturamento/glosas (opção 3) e o contato com médicos assistentes para responder laudos graves (opção 2) geram gargalos mais difíceis de sanar do que a recepção física (opção 1).",
    "content": "<h3>Dinâmica: Gargalos da Alta Vazão</h3><p>Vote na enquete síncrona sobre as barreiras operacionais imediatas que surgem após a otimização diagnóstica.</p>"
  },
  {
    "id": "slide_1_18",
    "title": "O Efeito Dominó Desenhado",
    "image": "/slides/aula1/slide_18.png",
    "block": "Estudo de Caso",
    "estimatedTime": "6 min",
    "notes": "<strong>Fala sugerida:</strong> Aqui vemos o Efeito Dominó na prática. No caso Watson, a promessa era otimizar o diagnóstico. Mas a reação em cadeia — a falta de integração no prontuário, a resistência médica e o custo operacional de contornar o sistema — acabou derrubando toda a estrutura do investimento. Cada peça do fluxo que ignoramos derruba a próxima, transformando o ROI projetado em um passivo financeiro real. Esse é o efeito dominó que o Guardião da Viabilidade deve mapear antes de assinar o contrato.",
    "content": "<h3>O Efeito Dominó Desenhado</h3><p>Como a alteração em uma premissa técnica inicial reverbera ao longo de toda a cadeia operacional e financeira.</p>"
  },
  {
    "id": "slide_1_19",
    "title": "Dinâmica · Mapeamento de Efeito Dominó",
    "image": "/slides/aula1/slide_19.png",
    "block": "Trabalho em Grupo",
    "estimatedTime": "40 min",
    "notes": "<strong>Fala sugerida:</strong> Iniciaremos os trabalhos em grupo. Acessem a aba de dinâmicas no portal, analisem o caso clínico atribuído ao seu grupo, construam o mapeamento do Efeito Dominó e submetam a Matriz de Riscos.",
    "content": "<h3>Dinâmica: Mapeamento de Efeito Dominó</h3><p>Trabalho Prático em Grupo: analise o cenário assistencial, monte a cadeia de efeitos e preencha a Matriz de Riscos no portal.</p>"
  },
  {
    "id": "slide_1_20",
    "title": "Debrief do Caso",
    "image": "/slides/aula1/slide_20.png",
    "block": "Estudo de Caso",
    "estimatedTime": "15 min",
    "notes": "<strong>Fala sugerida:</strong> Ótimos relatórios submetidos. Percebi que muitos grupos focaram em riscos estritamente de hardware e software (técnicos), mas negligenciaram custos de glosas no faturamento e a fadiga das equipes clínicas. Vamos debater estas lacunas operacionais.",
    "content": "<h3>Debrief do caso</h3><p>Discussão orientada pelo professor sobre as fragilidades e redundâncias de fluxo mapeadas nos relatórios dos comitês.</p>"
  },
  {
    "id": "slide_1_21",
    "title": "Reflexão Final",
    "image": "/slides/aula1/slide_21.png",
    "block": "Fechamento",
    "estimatedTime": "8 min",
    "isInteractive": true,
    "interactionType": "open_ended",
    "question": "Como a mudança de perspectiva para \"Guardião da Viabilidade\" afeta sua avaliação de inovações tecnológicas na saúde?",
    "notes": "<strong>Fala sugerida:</strong> Como encerramento, respondam no portal: como a mudança de mentalidade para 'Guardião da Viabilidade' altera os critérios que vocês usam para avaliar novos projetos médicos?",
    "content": "<h3>Reflexão Final</h3><p>Responda no portal: Como a mudança de perspectiva para \"Guardião da Viabilidade\" afeta sua avaliação de inovações tecnológicas na saúde?</p>"
  },
  {
    "id": "slide_1_22",
    "title": "Síntese e Ponte para a Aula 2",
    "image": "/slides/aula1/slide_22.png",
    "block": "Encerramento",
    "estimatedTime": "5 min",
    "notes": "<strong>Fala sugerida:</strong> Resumo de hoje: os riscos ocultos pesam mais que os aparentes, os gargalos apenas mudam de endereço na cadeia e simular antes de investir é mandatório. Na próxima aula entraremos na matemática do ROI invisível.",
    "content": "<h3>Takeaways da Aula 1</h3><ul><li>Risco oculto pesa mais que o aparente, sempre.</li><li>Gargalo migra na cadeia de processos.</li><li>Simular e estressar o fluxo é obrigatório antes da contratualização.</li></ul>"
  },
  {
    "id": "slide_1_23_ref",
    "title": "Referências e Fontes da Aula",
    "image": "/slides/aula1/slide_23.png",
    "block": "Encerramento",
    "estimatedTime": "2 min",
    "notes": "<strong>Fala sugerida:</strong> Disponibilizamos no portal os links e referências científicas dos casos Watson, InRad e HCI discutidos hoje. Bons estudos e nos vemos no próximo encontro síncrono.",
    "content": "<h3>Referências Bibliográficas</h3><p>IBM Watson for Oncology · MD Anderson & IEEE Spectrum</p><p>IA e Laudos Clínicos · InRad HC-FMUSP & HCI Ijuí</p>"
  }
]
  },
  {
    "id": "aula2",
    "title": "Aula 2: Mitigação de Risco e a Anatomia do ROI Inteligente",
    "date": "14 de Julho de 2026",
    "description": "Aprender a quantificar riscos operacionais e estimar o valor monetário de riscos evitados (Loss Avoidance). Praticar testes de estresse em simulador financeiro dinâmico nos cenários de telemetria, farmácia e dermatologia.",
    "checkin": {
      "type": "poll_ab",
      "question": "Qual custo mais costuma sumir das planilhas de projetos em saúde no dia a dia?",
      "options": [
        "Custos indiretos de TI e readequação de infraestrutura física",
        "Horas gastas de treinamento médico e suporte de adoção da equipe"
      ]
    },
    "conceptCheck": [
      {
        "question": "O que diferencia o ROI Nominal do ROI Inteligente (Abrangente)?",
        "options": [
          "O ROI Nominal inclui o custo de licença anual do software",
          "O ROI Inteligente desconta custos ocultos (OPEX adicional) e o Custo Estimado de Riscos Mapeados (Risk Cost)",
          "O ROI Nominal é calculado utilizando a taxa de adoção real do hospital"
        ],
        "correctAnswerIndex": 1
      },
      {
        "question": "Como é calculado o valor intangível do risco clínico evitado (Loss Avoidance)?",
        "options": [
          "Custo do software multiplicado pela quantidade de leitos do hospital",
          "(Frequência histórica do evento adverso) × (Custo financeiro médio por evento) × (Taxa de eficácia da IA em evitar o evento)",
          "Economia direta gerada por hora médica economizada pelo sistema"
        ],
        "correctAnswerIndex": 1
      }
    ],
    "reflection": {
      "type": "open",
      "question": "Segunda pergunta a fazer: Como líder de inovação, qual indicador (VPL, Payback, Taxa de Adoção ou Custo de Risco) possui maior peso para barrar ou aprovar um projeto no seu hospital?"
    },
    "references": [
      {
        "citation": "Google DermAssist · Blog Google (2021)",
        "url": "https://blog.google/technology/health/ai-dermatology-preview-io-2021"
      },
      {
        "citation": "Google DermAssist · WIRED (2021)",
        "url": "https://www.wired.com/story/google-ai-skin-conditions-medical-device/"
      },
      {
        "citation": "Automação de Farmácia · AHRQ Toolkit (2024)",
        "url": "https://www.ahrq.gov/health-it/tools-and-resources/costs-and-benefits-toolkit.html"
      }
    ],
    "slides": [
      {
        "id": "slide_2_1",
        "title": "Capa da Aula",
        "image": "/slides/aula2/slide_1.png",
        "block": "Introdução",
        "estimatedTime": "2 min",
        "notes": "<strong>Fala sugerida:</strong> Boas-vindas à nossa segunda sessão. Hoje entraremos a fundo na modelagem de cálculo do ROI abrangente. Vamos aprender a precificar o invisível, estimar a economia de eventos adversos evitados e rodar testes de estresse.",
        "content": "<h3>Mitigação de Risco e a Anatomia do ROI Inteligente</h3><p>Tornando o invisível quantificável</p><p>Professora: Dra. Faila Santos</p>"
      },
      {
        "id": "slide_2_2",
        "title": "Icebreaker · O Custo que Ninguém Somou",
        "image": "/slides/aula2/slide_2.png",
        "block": "Abertura",
        "estimatedTime": "8 min",
        "isInteractive": true,
        "interactionType": "poll_ab",
        "question": "Sob sua ótica executiva: qual custo é mais severamente subestimado nas propostas comerciais de saúde digital?",
        "notes": "<strong>Fala sugerida:</strong> Vamos iniciar com nossa enquete de check-in. Respondam no portal: qual custo costuma sumir com mais frequência das planilhas de investimento em saúde? O OPEX de infraestrutura tecnológica secundária ou o tempo e treinamento dedicados ao suporte de adoção médica?",
        "content": "<h3>Icebreaker · O custo que ninguém somou</h3><p>Sob sua ótica executiva: qual custo é mais severamente subestimado nas propostas comerciais de saúde digital?</p><p>Vote no portal.</p>"
      },
      {
        "id": "slide_2_3",
        "title": "Objetivos e Agenda",
        "image": "/slides/aula2/slide_3.png",
        "block": "Introdução",
        "estimatedTime": "5 min",
        "notes": "<strong>Fala sugerida:</strong> Nosso objetivo hoje é sair da teoria do risco e entrar na matemática do ROI. Vocês vão aprender a rodar um teste de estresse financeiro e a calcular o ROI abrangente, aquele que inclui os custos que a proposta comercial nunca menciona. A agenda tem dois blocos: primeiro, testes de estresse; depois, a matemática do ROI invisível, com casos reais de telemetria, dermatologia e farmácia. Ao final, cada grupo vai submeter uma mini planilha de ROI — hoje vocês calculam, não só ouvem.",
        "content": "<h3>Objetivos e Agenda</h3><p><b>O que você vai saber:</b> Rodar um teste de estresse financeiro e calcular o ROI abrangente, incluindo riscos operacionais e custos indiretos.</p><p><b>Agenda:</b> Bloco 1 (Testes de Estresse) + Bloco 2 (ROI Invisível) + Dinâmica de Simulação Financeira nos comitês.</p>"
      },
      {
        "id": "slide_2_3_a",
        "title": "Como os Hospitais Calculam ROI?",
        "image": "/slides/aula2/slide_3.png",
        "block": "Fundamentação Metodológica",
        "estimatedTime": "6 min",
        "notes": "<strong>Fala sugerida:</strong> Antes de entrarmos na matemática do ROI abrangente, preciso que vocês saibam de onde ela vem. Não é uma metodologia proprietária da nossa disciplina: é o padrão usado internacionalmente para avaliar investimentos em tecnologia de saúde, formalizado pela AHRQ nos Estados Unidos. A fórmula-base é simples: ROI é igual aos benefícios financeiros menos o investimento, dividido pelo investimento. O que a torna robusta não é a fórmula em si, mas o que vem depois dela: o Payback nos diz quando o dinheiro volta, o VPL traz os fluxos futuros a valor presente, a TIR compara a taxa de retorno do projeto com o custo de capital da instituição, e a análise de sensibilidade nos mostra o que acontece quando as premissas mudam. Quando vocês apresentarem um business case usando essas quatro métricas juntas, estarão falando a língua que qualquer diretoria financeira já conhece e espera ouvir.",
        "content": "<h3>Como os Hospitais Calculam ROI?</h3><p>Metodologia internacionalmente reconhecida, referendada pela AHRQ (Agency for Healthcare Research and Quality, EUA) em seu Health IT Costs and Benefits Toolkit.</p><p>Fórmula-base: ROI = (Benefícios Financeiros − Investimento) ÷ Investimento</p><p>Complementada por 4 métricas de apoio: Payback, VPL (Valor Presente Líquido), TIR (Taxa Interna de Retorno) e Análise de Sensibilidade.</p><p>Não é uma criação da disciplina: é o padrão que qualquer CFO reconhece e vai cobrar.</p>"
      },
      {
        "id": "slide_2_3_b",
        "title": "ROI Financeiro + Benefícios Estratégicos",
        "image": "/slides/aula2/slide_3.png",
        "block": "Bloco 2: ROI Invisível",
        "estimatedTime": "5 min",
        "notes": "<strong>Fala sugerida:</strong> Um erro comum de quem está começando é jogar tudo dentro do número do ROI, incluindo coisas como reputação e satisfação do paciente. Isso é um erro técnico, porque não são números auditáveis, e é um erro estratégico, porque diminui a credibilidade do business case diante do CFO. Vamos separar em duas colunas. Na financeira, entra tudo que pode virar reais: redução de custo, aumento de receita, ganho de produtividade. Na estratégica, entram os benefícios que sustentam a decisão mas que vocês nunca deveriam forçar dentro da fórmula de ROI: segurança do paciente, experiência do paciente, redução de burnout da equipe, reputação e conformidade regulatória. Um bom business case apresenta as duas colunas lado a lado, nunca uma disfarçada de outra.",
        "content": "<h3>ROI Financeiro + Benefícios Estratégicos</h3><p><b>Benefícios Financeiros (entram na fórmula do ROI):</b> redução de custos, aumento de receita, produtividade / horas economizadas.</p><p><b>Benefícios Estratégicos (não entram na fórmula, mas entram na decisão):</b> segurança do paciente, experiência do paciente, redução de burnout, reputação institucional, compliance regulatório.</p>"
      },
      {
        "id": "slide_2_3_c",
        "title": "O que Entra no ROI? A Matriz de Monetização",
        "image": "/slides/aula2/slide_3.png",
        "block": "Bloco 2: ROI Invisível",
        "estimatedTime": "6 min",
        "notes": "<strong>Fala sugerida:</strong> Toda turma me pergunta a mesma coisa nesse ponto: isso entra ou não entra na planilha? Vamos resolver com duas tabelas. A primeira separa o que efetivamente compõe o numerador do ROI do que fica de fora, mesmo sendo real e importante. A segunda é mais sutil: existem benefícios que parecem impossíveis de monetizar, mas têm uma porta de entrada indireta. Burnout não entra direto, mas vira turnover, e turnover tem custo de recrutamento e retreinamento perfeitamente mensurável. Mortalidade e segurança do paciente raramente entram como número direto, mas os eventos adversos que eles evitam, sim. Essa é a disciplina de tradução que separa um analista júnior de um verdadeiro guardião da viabilidade.",
        "content": "<h3>O que Entra no ROI? A Matriz de Monetização</h3><h4>Tabela 1 — O que entra / não entra no cálculo:</h4><table class=\"table table-bordered table-striped\"><thead><tr><th>Entra no cálculo</th><th>Não entra no cálculo</th></tr></thead><tbody><tr><td>Economia de horas da equipe</td><td>Satisfação do paciente</td></tr><tr><td>Redução de glosas</td><td>Cultura organizacional</td></tr><tr><td>Redução de readmissões (quando monetizada por convênio/DRG)</td><td>Reputação institucional</td></tr><tr><td>Receita adicional por novo volume/serviço</td><td>Equidade em saúde</td></tr></tbody></table><h4>Tabela 2 — Matriz de Monetização:</h4><table class=\"table table-bordered table-striped\"><thead><tr><th>Benefício</th><th>Pode monetizar?</th></tr></thead><tbody><tr><td>Tempo médico</td><td>Sim</td></tr><tr><td>Tempo de enfermagem</td><td>Sim</td></tr><tr><td>Burnout</td><td>Parcialmente (via turnover e absenteísmo)</td></tr><tr><td>Mortalidade</td><td>Não diretamente (mas os eventos evitados sim)</td></tr><tr><td>Segurança do paciente</td><td>Não diretamente (mas os eventos adversos evitados sim)</td></tr><tr><td>Reputação</td><td>Muito difícil</td></tr></tbody></table>"
      },
      {
        "id": "slide_2_4",
        "title": "Avaliação de Risco como Defesa Institucional",
        "image": "/slides/aula2/slide_3.png",
        "block": "Introdução",
        "estimatedTime": "5 min",
        "notes": "<strong>Fala sugerida:</strong> Esse é o mantra do nosso segundo encontro: dizer não, quando os dados apontam para isso, também é entregar valor. Avaliação de risco não existe para travar a inovação, existe para proteger a instituição de investimentos que a infraestrutura ou a cultura organizacional ainda não sustentam. O papel de vocês como guardiões da viabilidade não é aprovar tudo que chega bonito na proposta comercial, é ter a coragem analítica de vetar o que os números mostram que não vai funcionar.",
        "content": "<h3>Avaliação de Risco como Defesa</h3><p><i>\"Dizer não a um investimento tecnologicamente atraente, mas operacionalmente inviável, é um dos papéis de maior entrega de valor do guardião da viabilidade.\"</i></p><p>Evitar desperdício de CAPEX protege o fluxo de caixa livre hospitalar.</p>"
      },
      {
        "id": "slide_2_5",
        "title": "O que é um Teste de Estresse Financeiro",
        "image": "/slides/aula2/slide_4.png",
        "block": "Bloco 1: Testes de Estresse",
        "estimatedTime": "8 min",
        "notes": "<strong>Fala sugerida:</strong> Um teste de estresse financeiro consiste em simular a resiliência orçamentária do projeto diante das piores premissas possíveis antes do GO. O cálculo nominal do ROI do fornecedor assume sempre um mundo perfeito. O teste de estresse força três perguntas: E se a adoção clínica cair pela metade? E se o suporte técnico exigir mais OPEX do que o previsto? E se a infraestrutura hospitalar falhar e o retorno atrasar?",
        "content": "<h3>O que é um Teste de Estresse Financeiro?</h3><p><b>Definição:</b> Avaliar a resiliência orçamentária do projeto simulando as piores premissas possíveis de custos e adoção assistencial.</p><p>As 3 perguntas-chave do teste de estresse:</p><ol><li>E se a adoção clínica do corpo médico cair para 50%?</li><li>E se o custo fixo operacional (OPEX) do suporte de TI dobrar?</li><li>E se a implantação atrasar e o retorno começar 12 meses depois?</li></ol>"
      },
      {
        "id": "slide_2_5_a",
        "title": "Qual Premissa Mais Influencia o ROI?",
        "image": "/slides/aula2/slide_4.png",
        "block": "Bloco 1: Testes de Estresse",
        "estimatedTime": "8 min",
        "isInteractive": true,
        "interactionType": "poll",
        "question": "No cenário do seu grupo, qual variável, se cair 10%, mais destrói o ROI: adoção clínica, custo de manutenção, ou benefício operacional esperado?",
        "options": [
          "Adoção clínica da equipe assistencial",
          "Custo fixo de manutenção e suporte (OPEX)",
          "Benefício operacional anual esperado"
        ],
        "notes": "<strong>Fala sugerida (Gabarito: Adoção Clínica):</strong> Votem na enquete síncrona. *Dica de condução:* A resposta correta aqui é a **Adoção clínica da equipe assistencial** (opção 1). Explique aos alunos que a adoção é o multiplicador final na equação: se a adoção for zero, o ROI será zero, não importa o quão baixo seja o custo de manutenção ou quão alto seja o benefício teórico. É a variável de maior sensibilidade e risco no projeto.",
        "content": "<h3>Qual Premissa Mais Influencia o ROI?</h3><p><b>Cadeia causal 1:</b> Adoção &rarr; Economia &rarr; ROI</p><p><b>Cadeia causal 2:</b> Treinamento &rarr; Adoção &rarr; ROI</p><p>Pergunta-chave: \"Se vocês só puderem melhorar UMA variável do projeto, qual teria mais efeito sobre o ROI final?\"</p>"
      },
      {
        "id": "slide_2_5_b",
        "title": "O ROI Não É um Número. É um Intervalo.",
        "image": "/slides/aula2/slide_4.png",
        "block": "Bloco 1: Testes de Estresse",
        "estimatedTime": "4 min",
        "notes": "<strong>Fala sugerida:</strong> Até agora, cada grupo calculou um número único de ROI. Isso é o primeiro passo, não o último. No mundo real, vocês nunca vão apresentar um ROI de 35% sem contexto. Vão apresentar um ROI esperado de 35%, com um intervalo provável entre 18 e 46%, dependendo da taxa de adoção e dos custos de infraestrutura que discutimos. Essa é a diferença entre um analista que entende risco e um vendedor que só repete o número do fornecedor. Quando o conselho perguntar 'e se a adoção for menor', vocês já vão ter a resposta pronta, porque já rodaram o intervalo.",
        "content": "<h3>O ROI Não É um Número. É um Intervalo.</h3><p><b>ROI esperado:</b> 35%</p><p><b>Intervalo provável:</b> 18% &ndash; 46%</p><p><i>\"Um ROI apresentado sem intervalo de confiança é uma promessa de marketing disfarçada de matemática financeira.\"</i></p>"
      },
      {
        "id": "slide_2_5_c",
        "title": "ROI Esperado vs. ROI Observado: A Equação da Adoção",
        "image": "/slides/aula2/slide_4.png",
        "block": "Bloco 1: Testes de Estresse",
        "estimatedTime": "7 min",
        "notes": "<strong>Fala sugerida:</strong> Existe uma diferença enorme entre o que uma tecnologia é capaz de fazer e o que ela de fato faz dentro da sua instituição. Chamamos isso de exposição teórica versus exposição observada. Um fornecedor vai te mostrar o teto técnico da ferramenta. Mas o uso real, em produção, dentro da cultura e dos processos do seu hospital, é sempre uma fração disso. Essa lacuna tem nome: taxa de adoção. E ela não é um detalhe, é multiplicativa. ROI observado é igual ao ROI esperado multiplicado pela taxa de adoção. Se a adoção for de 45%, não importa quão bom seja o algoritmo, o retorno real nunca vai chegar perto do que está na proposta comercial. A partir de hoje, toda vez que alguém apresentar um número de ROI, a primeira pergunta de vocês deve ser: essa é a taxa de adoção esperada, ou a taxa de adoção observada em um caso real parecido com o meu?",
        "content": "<h3>ROI Esperado vs. ROI Observado: A Equação da Adoção</h3><p><b>Conceito:</b> exposição teórica (o que a tecnologia consegue fazer) vs. exposição observada (o que ela realmente faz em uso real).</p><p><b>Dado real de mercado:</b> em tarefas administrativas, sistemas de IA têm capacidade técnica para automatizar a maior parte da tarefa, mas o uso observado em escala real ainda é uma fração bem menor disso.</p><p><b>Exemplo prático:</b> \"O fornecedor promete 40 horas economizadas por mês. Na prática, a equipe entrega 12 horas.\"</p><p><b>Equação central:</b> <i>ROI observado = ROI esperado &times; Taxa de adoção</i></p><p><b>Consequência direta:</b> com 45% de adoção, o ROI jamais alcança o número da proposta comercial, mesmo que a tecnologia funcione perfeitamente.</p>"
      },
      {
        "id": "slide_2_5_d",
        "title": "Use, Compose ou Build: Qual Gera Mais ROI?",
        "image": "/slides/aula2/slide_4.png",
        "block": "Bloco 1: Testes de Estresse",
        "estimatedTime": "12 min",
        "isInteractive": true,
        "interactionType": "poll",
        "question": "Depois da discussão em grupo: qual modelo de implementação (Use, Compose ou Build) vocês escolheriam para o cenário da sua equipe?",
        "options": [
          "Use — SaaS pronto de mercado (baixo custo/controle, alta velocidade)",
          "Compose — Customização via API e contexto próprio (médio custo/controle)",
          "Build — Modelo treinado e controlado internamente (alto custo/controle, baixa velocidade)"
        ],
        "notes": "<strong>Fala sugerida (Análise de Opções):</strong> Qual das três opções gera o maior ROI para o cenário do seu grupo? *Dica de condução:* Destaque que, comercialmente, o modelo **Use (SaaS)** tem a implantação mais rápida e menor CAPEX, mas o **Compose** oferece melhor relação custo-benefício para hospitais de médio/grande porte que precisam customizar processos sem arcar com o custo astronômico do **Build**. Não há uma resposta única, mas a justificativa de TCO e controle deve fundamentar a escolha do comitê.",
        "content": "<h3>Use, Compose ou Build: Qual Gera Mais ROI?</h3><p><b>Use &mdash; SaaS pronto de mercado:</b> alavancagem máxima, diferenciação mínima, baixo custo, alta velocidade, baixo controle.</p><p><b>Compose &mdash; construção sobre API de modelo de fronteira:</b> alavancagem e diferenciação médias, custo e velocidade equilibrados.</p><p><b>Build &mdash; modelo treinado internamente:</b> alavancagem baixa, diferenciação máxima, alto custo, menor velocidade, maior controle.</p><p><b>Comando:</b> \"Qual das três opções gera o maior ROI para o cenário do seu grupo? Justifiquem em 3 frases.\"</p>"
      },
      {
        "id": "slide_2_5_stress_pic",
        "title": "Simulação de Estresse Operacional",
        "image": "/slides/aula2/slide_5.png",
        "block": "Bloco 1: Testes de Estresse",
        "estimatedTime": "4 min",
        "notes": "<strong>Fala sugerida:</strong> Este gráfico de dispersão exemplifica como a oscilação da curva de adoção impacta no fluxo financeiro hospitalar. À esquerda, baixa adoção clínica estende o Payback do projeto e destrói o VPL, enquanto a alta adoção à direita atinge o ROI esperado. Vamos levar esse conceito para os nossos casos clínicos.",
        "content": "<h3>Simulação de Estresse Operacional</h3><p>Análise gráfica da correlação entre a Adoção Clínica (%) e o VPL final obtido na modelagem financeira hospitalar.</p>"
      },
      {
        "id": "slide_2_6",
        "title": "Caso Integrado · Telemetria em Leitos",
        "image": "/slides/aula2/slide_6.png",
        "block": "Bloco 2: ROI Invisível",
        "estimatedTime": "8 min",
        "notes": "<strong>Fala sugerida:</strong> Analisemos a telemetria em leitos gerais. Adquirir sensores de monitoramento de sinais vitais por IA parece um investimento simples. O custo oculto no caso estudado (R$ 1,5 milhão) envolveu readequar a rede física Wi-Fi do hospital para suportar os dados em tempo real sem quedas (risco técnico de latência), além de criar uma central integrada de enfermagem para receber alertas (risco operacional). Sem essas duas readequações físicas e estruturais, os patches clínicos perdem toda a finalidade diagnóstica e viram puro desperdício de capital.",
        "content": "<h3>Caso Integrado: Telemetria em Leitos</h3><p>Investimento em patches inteligentes e IA preditiva de sinais vitais em leitos gerais.</p><p><b>Vulnerabilidade de infraestrutura:</b> Necessidade de infraestrutura de rede de alta densidade estável para evitar perda de dados e fadiga assistencial por perda de sinal.</p>"
      },
      {
        "id": "slide_2_7",
        "title": "Caso Real Internacional · Google DermAssist",
        "image": "/slides/aula2/slide_7.png",
        "block": "Bloco 2: ROI Invisível",
        "estimatedTime": "8 min",
        "notes": "<strong>Fala sugerida:</strong> O Google DermAssist é um grande exemplo de risco regulatório no cotidiano. O sistema sugere potenciais condições de pele a partir de fotos feitas pelo paciente e um questionário de sintomas. No entanto, o sistema obteve marcação CE europeia mas enfrentou cautelas e barreiras regulatórias nos EUA. Além disso, surgiram questionamentos éticos sobre o viés de desempenho em tons de pele mais escuros. Um exemplo claro de como riscos regulatórios e de conformidade de algoritmos impactam o go-to-market comercial.",
        "content": "<h3>Caso Real Internacional: Google DermAssist</h3><p>Ferramenta de IA dermatológica CE-marked na Europa, que sugere potenciais doenças de pele a partir de fotos tiradas de smartphones.</p><p><b>Risco Regulatório e Ético:</b> Dificuldades de homologação FDA nos EUA e barreiras éticas de acurácia em tons de pele escuros por falta de dados representativos no treinamento.</p>"
      },
      {
        "id": "slide_2_10",
        "title": "O Erro do ROI de Curto Prazo",
        "image": "/slides/aula2/slide_10.png",
        "block": "Bloco 2: ROI Invisível",
        "estimatedTime": "5 min",
        "notes": "<strong>Fala sugerida:</strong> Aqui mora um dos vieses mais caros da gestão de saúde: olhar só a planilha do mês seguinte. Um projeto de prevenção, como triagem precoce ou telemetria contínua, raramente devolve o investimento no primeiro trimestre. Os benefícios de prevenção aparecem no ano 2 ou 3, quando a curva de eventos evitados começa a compensar o investimento inicial. Se vocês avaliarem um projeto de saúde digital só pelo fluxo de caixa de curto prazo, vão sistematicamente rejeitar exatamente os projetos que mais protegem o paciente e a instituição no longo prazo.",
        "content": "<h3>O Erro do ROI de Curto Prazo</h3><p>Avaliar projetos de IA apenas pelo fluxo de caixa do primeiro ano penaliza inovações voltadas a ganho de segurança de longo prazo.</p><p>Os maiores benefícios de IA em saúde (evitar readmissões, prevenir sepse) geram valor incremental contínuo em prazos superiores a 24 meses.</p>"
      },
      {
        "id": "slide_2_11",
        "title": "Riscos Invisíveis · Parte 1",
        "image": "/slides/aula2/slide_11.png",
        "block": "Bloco 2: ROI Invisível",
        "estimatedTime": "6 min",
        "notes": "<strong>Fala sugerida:</strong> Os riscos invisíveis de maior peso clínico e financeiro em IA na saúde são as falhas de suporte à decisão que induzem a erros de medicação e eventos adversos severos. No fluxo hospitalar comum, cada evento adverso grave tem um custo estimado alto (diária em UTI adicional, exames repetidos, novas terapias). Evitar esses eventos por meio de alertas inteligentes da IA é uma receita real indireta de alta tração financeira.",
        "content": "<h3>Riscos Invisíveis · Parte 1</h3><p><b>Erros de Medicação e Eventos Adversos:</b> Custos clínicos diretos adicionais (hotelaria prolongada, UTI) e glosas no repasse que corroem o fluxo financeiro.</p><p>A segurança do paciente deve ser precificada como ativo financeiro estratégico.</p>"
      },
      {
        "id": "slide_2_12",
        "title": "Riscos Invisíveis · Parte 2",
        "image": "/slides/aula2/slide_12.png",
        "block": "Bloco 2: ROI Invisível",
        "estimatedTime": "6 min",
        "notes": "<strong>Fala sugerida:</strong> A segunda camada dos riscos invisíveis são as repercussões jurídicas e de responsabilidade civil. Um erro de medicação induzido por um falso negativo da IA pode resultar em processos indenizatórios judiciais complexos e multas. A contratação de seguros de responsabilidade profissional e a assessoria jurídica dedicada para inovações em IA clínica são despesas operacionais (OPEX) reais que devem constar no cálculo de viabilidade.",
        "content": "<h3>Riscos Invisíveis · Parte 2</h3><p><b>Custos Jurídicos e Passivos de Responsabilidade Civil:</b> Processos de indenização por desfechos clínicos adversos induzidos ou não detectados por suporte algorítmico.</p><p>OPEX de assessoria regulatória, auditoria jurídica e contratação de seguros corporativos para novos sistemas com IA clínica.</p>"
      },
      {
        "id": "slide_2_13",
        "title": "Transformar Prevenção em Valor",
        "image": "/slides/aula2/slide_13.png",
        "block": "Bloco 2: ROI Invisível",
        "estimatedTime": "8 min",
        "notes": "<strong>Fala sugerida:</strong> Como monetizamos a prevenção? A fórmula mental para calcular o valor gerado indiretamente por prevenção de perdas (Loss Avoidance) é: frequência histórica anual do evento multiplicada pelo custo financeiro médio de cada evento, ponderado pela eficácia esperada do sistema de IA. Exemplo prático do cotidiano: se o hospital tem 100 erros de dispensação de alto custo por ano, e cada erro custa R$ 5 mil em desperdício e retratamento, e a IA da farmácia evita 80% deles, a economia gerada é de R$ 400 mil anuais.",
        "content": "<h3>Transformar Prevenção em Valor</h3><p><b>Fórmula de Prevenção de Perda (Loss Avoidance):</b></p><p>$$\text{Valor Evitado} = (\text{Freq. Evento}) \times (\text{Custo do Evento}) \times (\text{Taxa Eficácia IA})$$</p><p>Exemplo: 100 eventos/ano evitados &times; R$ 5.000 custo/evento &times; 80% eficácia da IA = R$ 400.000 economizados por ano.</p>"
      },
      {
        "id": "slide_2_14",
        "title": "Caso Integrado · Automação de Farmácia",
        "image": "/slides/aula2/slide_14.png",
        "block": "Bloco 2: ROI Invisível",
        "estimatedTime": "8 min",
        "notes": "<strong>Fala sugerida:</strong> Automação de farmácia é um dos casos mais diretos de ROI abrangente, porque cada erro de dispensação evitado tem valor financeiro e clínico simultâneo. Dispensadores robóticos reduzem o erro humano de troca de medicamento e dose, mas o retorno real depende de dois fatores que a proposta comercial raramente detalha: a integração com o sistema de prescrição legado, que se falhar propaga o erro em vez de eliminá-lo, e a curva de confiança da equipe farmacêutica, que pode resistir ao novo fluxo de trabalho. O benefício técnico só vira ROI quando os dois se resolvem.",
        "content": "<h3>Caso Integrado: Automação de Farmácia</h3><p><b>O Caso:</b> Dispensadores robóticos e IA preditiva de estoque de medicamentos de alto custo.</p><p><b>Benefício visível:</b> Redução de desperdício por validade de lote e desvio de inventário.</p><p><b>Risco invisível:</b> Resistência operacional dos farmacêuticos ao novo fluxo assistencial de conferência eletrônica.</p>"
      },
      {
        "id": "slide_2_14_read",
        "title": "Leitura Rápida: Logística de Farmácia no Brasil",
        "image": "/slides/aula2/slide_14.png",
        "block": "Bloco 2: ROI Invisível",
        "estimatedTime": "5 min",
        "notes": "<strong>Fala sugerida:</strong> Dediquem 5 minutos de leitura dirigida ao guia de farmácia hospitalar nacional. Analisaremos como o fracionamento e rastreabilidade por dose unitária mitiga desvios físicos de estoque e glosas orçamentárias de medicação antes da dinâmica.",
        "content": "<h3>Leitura Rápida: Logística de Farmácia no Brasil</h3><p>Análise prática de como o controle de estoque em lote e dose unitária evita perdas diretas por vencimento ou glosa orçamentária.</p>"
      },
      {
        "id": "slide_2_14_dyn",
        "title": "Dinâmica: Gargalos de Estoque na Lousa",
        "image": "/slides/aula2/slide_14.png",
        "block": "Bloco 2: ROI Invisível",
        "estimatedTime": "6 min",
        "isInteractive": true,
        "interactionType": "whiteboard",
        "question": "O professor abrirá o console da lousa. Aponte no mapa a etapa da cadeia de medicação com maior atrito ou desperdício.",
        "notes": "<strong>Fala sugerida:</strong> Vou abrir nossa lousa síncrona. Marquem no fluxo logístico apresentado onde a instituição de vocês sofre as perdas de suprimentos e medicação mais severas: na recepção do estoque, no fracionamento unitário ou na dispensação nas enfermarias.",
        "content": "<h3>Dinâmica: Gargalos de Estoque na Lousa</h3><p>O professor abrirá o console da lousa. Aponte no mapa a etapa da cadeia de medicação com maior atrito ou desperdício orçamentário no seu hospital.</p>"
      },
      {
        "id": "slide_2_15",
        "title": "Leitura Recomendada: AHRQ Toolkit",
        "image": "/slides/aula2/slide_15.png",
        "block": "Bloco 2: ROI Invisível",
        "estimatedTime": "5 min",
        "notes": "<strong>Fala sugerida:</strong> Recomendo como leitura de suporte o Health IT Costs and Benefits Toolkit da AHRQ. A metodologia de separação de custos diretos de TI versus custos indiretos de transição que o manual apresenta apoia a análise de viabilidade dos projetos de vocês.",
        "content": "<h3>Leitura Recomendada: AHRQ Toolkit</h3><p><b>AHRQ Health IT Costs and Benefits Toolkit:</b> Diretrizes internacionais de separação de custos diretos e indiretos de implantação.</p>"
      },
      {
        "id": "slide_2_16",
        "title": "Dinâmica · Cálculo de ROI Abrangente",
        "image": "/slides/aula2/slide_16.png",
        "block": "Trabalho em Grupo",
        "estimatedTime": "40 min",
        "notes": "<strong>Fala sugerida:</strong> Hora de trabalhar nos simuladores dos comitês. Acessem o portal nos seus grupos. Utilizem o simulador de ROI abrangente inserindo as premissas econômicas do cenário do seu comitê, avaliem o VPL em cenários otimistas e sob estresse de adoção e enviem a análise financeira.",
        "content": "<h3>Dinâmica: Simulação Financeira nos Comitês</h3><p>Trabalho Prático em Grupo: Acesse o simulador de ROI no portal, preencha as premissas econômicas de CAPEX, OPEX e riscos, e envie a análise de viabilidade do comitê.</p>"
      },
      {
        "id": "slide_2_17",
        "title": "Debrief · O Que Mudou o Resultado",
        "image": "/slides/aula2/slide_17.png",
        "block": "Estudo de Caso",
        "estimatedTime": "15 min",
        "notes": "<strong>Fala sugerida:</strong> Parabéns pelas submissões financeiras. O Grupo 4 concluiu pela inviabilidade no cenário realista devido ao alto CAPEX e custo de manutenção, enquanto o Grupo 1 justificou a resiliência do payback mesmo sob baixa adoção. Vamos debater estas conclusões estratégicas.",
        "content": "<h3>Debrief: O que alterou o VPL do projeto?</h3><p>Análise comparativa das taxas de payback e VPL alcançados nos simuladores por cada equipe sob cenários de estresse de engajamento.</p>"
      },
      {
        "id": "slide_2_18",
        "title": "Reflexão Final",
        "image": "/slides/aula2/slide_18.png",
        "block": "Fechamento",
        "estimatedTime": "8 min",
        "isInteractive": true,
        "interactionType": "open_ended",
        "question": "Qual variável financeira ou operacional passou a ser prioritária na sua análise de viabilidade de projetos?",
        "notes": "<strong>Fala sugerida:</strong> Peço que respondam no painel, em uma palavra: o que vocês passam a enxergar agora que antes era invisível? Não precisa ser sofisticado. Pode ser 'adoção', pode ser 'infraestrutura', pode ser 'glosa'. O que importa é que, a partir de hoje, esse termo vai aparecer na cabeça de vocês toda vez que alguém apresentar um ROI bonito demais para ser verdade.",
        "content": "<h3>Reflexão Final</h3><p>Responda no portal: Qual variável financeira ou operacional passou a ser prioritária na sua análise de viabilidade de projetos após as simulações sob estresse?</p>"
      },
      {
        "id": "slide_2_19",
        "title": "Síntese e Ponte para a Aula 3",
        "image": "/slides/aula2/slide_19.png",
        "block": "Encerramento",
        "estimatedTime": "5 min",
        "notes": "<strong>Fala sugerida:</strong> Em síntese, o engajamento assistencial do usuário final é a variável crítica do ROI real, e a precificação de riscos deve compor a planilha orçamentária do projeto de forma transparente. Preparem-se para as diretrizes de governança da Aula 3.",
        "content": "<h3>Takeaways da Aula 2</h3><ul><li>ROI observado depende da taxa de adoção do corpo clínico.</li><li>Cálculo de Loss Avoidance quantifica financeiramente a segurança assistencial.</li><li>O teste de estresse define o ponto de quebra antes de empenhar capital.</li></ul>"
      },
      {
        "id": "slide_2_20_ref",
        "title": "Referências e Fontes da Aula",
        "image": "/slides/aula2/slide_20.png",
        "block": "Encerramento",
        "estimatedTime": "2 min",
        "notes": "<strong>Fala sugerida:</strong> As referências bibliográficas do Bloco 2 de modelagem econômico-financeira sob risco estão disponíveis no portal. Todos os links acadêmicos e estudos de caso nacionais encontram-se ativos para consulta e citação nos relatórios finais.",
        "content": "<h3>Referências Bibliográficas</h3><p>Google DermAssist · WIRED & Blog Google</p><p>Cálculo de ROI em TI e Logística Assistencial · AHRQ Toolkit & Artigos de Rastreabilidade</p>"
      }
    ]
  },
  {
    "id": "aula3",
    "title": "Aula 3: ROI Inteligente e Defesa de Business Case",
    "date": "21 de Julho de 2026",
    "description": "Compreender como estruturar e defender um Business Case executivo para aprovação em Conselho de Administração. Aplicar pesos e pontuação em Matrizes de Decisão Ponderadas para seleção transparente de fornecedores de tecnologia.",
    "checkin": {
      "type": "wordcloud",
      "question": "Em uma palavra: Qual o principal obstáculo para a aprovação de investimentos em saúde digital no seu C-level?"
    },
    "conceptCheck": [
      {
        "question": "Qual a estrutura de argumentação ideal para apresentar um Business Case ao CFO?",
        "options": [
          "Focar nos diferenciais tecnológicos da IA e suas linguagens de programação",
          "Começar pelas perdas evitadas (Loss Avoidance) e desfechos clínicos, seguidos por premissas auditáveis e mitigação de riscos operacionais",
          "Apresentar apenas o cenário otimista fornecido pelo departamento de vendas da solução"
        ],
        "correctAnswerIndex": 1
      },
      {
        "question": "Qual a finalidade de preencher os pesos de relevância em uma Matriz de Decisão Ponderada antes de avaliar os fornecedores?",
        "options": [
          "Reduzir o custo nominal orçado da proposta comercial mais cara",
          "Evitar o viés de confirmação e blindar a escolha técnica contra preferências subjetivas e emocionais do comitê",
          "Substituir o cálculo de VPL e Payback do simulador financeiro"
        ],
        "correctAnswerIndex": 1
      }
    ],
    "reflection": {
      "type": "open",
      "question": "Terceira pergunta a fazer: Como tomador de decisão, qual critério de governança ética e técnica você assume como inegociável na aprovação de novos algoritmos de IA clínica na sua instituição?"
    },
    "references": [
      {
        "citation": "Mayo Clinic · Ensaio EAGLE, detecção por ECG (2021)",
        "url": "https://newsnetwork.mayoclinic.org/discussion/ai-enabled-ecg-algorithm-identifies-weak-heart-in-routine-clinical-practice/"
      },
      {
        "citation": "Robô Laura · Gestão de sepse no Brasil (2024)",
        "url": "https://www.laura-health.com"
      },
      {
        "citation": "Neonpass Einstein · Rastreamento de chamadas (2024)",
        "url": "https://www.einstein.br"
      }
    ],
    "slides": [
      {
        "id": "slide_3_1",
        "title": "Capa da Aula",
        "image": "/slides/aula3/slide_1.png",
        "block": "Introdução",
        "estimatedTime": "2 min",
        "notes": "<strong>Fala sugerida:</strong> Boas-vindas ao nosso terceiro encontro. Hoje consolidaremos a governança institucional de inovação. Vamos aprender a converter nossa modelagem financeira e análise de riscos em um Business Case executivo qualificado para apresentação em diretoria.",
        "content": "<h3>Governança, Tomada de Decisão e Business Case</h3><p>A segurança do paciente como ativo financeiro mais valioso</p><p>Professora: Dra. Faila Santos</p>"
      },
      {
        "id": "slide_3_2",
        "title": "Icebreaker · O que Trava a Diretoria",
        "image": "/slides/aula3/slide_2.png",
        "block": "Abertura",
        "estimatedTime": "8 min",
        "isInteractive": true,
        "interactionType": "wordcloud",
        "question": "Em uma palavra: qual o principal fator que leva o C-level ou o conselho a rejeitar propostas de saúde digital?",
        "notes": "<strong>Fala sugerida:</strong> Peço que respondam, em uma palavra: o que mais trava a aprovação de um bom projeto na diretoria de vocês? Não filtrem a resposta. Pode ser 'burocracia', pode ser 'medo', pode ser 'CFO'. Essa nuvem de palavras vai nos dizer muito sobre os obstáculos reais de governança que vocês enfrentam, e vamos usar isso como ponto de partida para a aula de hoje.",
        "content": "<h3>Icebreaker · O que trava a diretoria</h3><p>Em uma palavra: qual o principal fator que leva o C-level ou o conselho a rejeitar propostas de saúde digital?</p><p>Responda no portal para gerar a nuvem síncrona.</p>"
      },
      {
        "id": "slide_3_3",
        "title": "Objetivos e Agenda",
        "image": "/slides/aula3/slide_3.png",
        "block": "Introdução",
        "estimatedTime": "5 min",
        "notes": "<strong>Fala sugerida:</strong> Hoje é o nosso terceiro e último encontro síncrono, e o objetivo é converter tudo que vocês aprenderam sobre risco e ROI em um Business Case que resista a uma sala de conselho. Vocês vão sair sabendo estruturar esse business case e montar uma matriz de decisão multifatorial para comparar fornecedores de forma isenta. Essa aula prepara diretamente o Projeto Prático em Grupo, que vale 35% da nota — a maior alavanca avaliativa da disciplina. Prestem atenção redobrada.",
        "content": "<h3>Objetivos e Agenda</h3><p><b>O que você vai saber:</b> Estruturar um Business Case executivo completo e montar uma matriz de decisão ponderada para seleção isenta de fornecedores.</p><p><b>Agenda:</b> Bloco 1 (Falar a língua do conselho) + Bloco 2 (Matriz Ponderada de Decisão) + Workshop do Projeto Final.</p>"
      },
      {
        "id": "slide_3_4",
        "title": "Falar a Língua dos Stakeholders Financeiros",
        "image": "/slides/aula3/slide_4.png",
        "block": "Bloco 1: Linguagem de Negócios",
        "estimatedTime": "6 min",
        "notes": "<strong>Fala sugerida:</strong> Reparem na ordem dessas três palavras: objetividade, evidência, mitigação de perdas. Não é acaso. Comecem pela perda evitada, nunca pela tecnologia em si — um CFO não se importa com o modelo de IA, se importa com o que deixa de sair do caixa. Depois, tragam evidência: todo número precisa de uma premissa auditável por trás. Só no final, mitigação de perdas como conclusão lógica do argumento. Essa sequência, nessa ordem, é o que separa um pitch de um business case.",
        "content": "<h3>Falar a Língua dos Stakeholders Financeiros</h3><p><b>Objetividade:</b> Evite jargões técnicos de informática (ex: F1-score, parâmetros). Foque em redução de OPEX, diárias extras de UTI e controle de glosas.</p><p><b>Premissas defensáveis:</b> Todo ganho orçamentário previsto deve possuir lastro em evidências auditáveis de projetos semelhantes.</p>"
      },
      {
        "id": "slide_3_5",
        "title": "Do Marketing à Prova Matemática",
        "image": "/slides/aula3/slide_4.png",
        "block": "Bloco 1: Linguagem de Negócios",
        "estimatedTime": "6 min",
        "notes": "<strong>Fala sugerida:</strong> Justificar investimentos complexos exige mover o comitê da atração do marketing tecnológico para a solidez da prova matemática. Dividimos a estrutura lógica em cinco etapas: definir o problema de gargalo, quantificar o impacto orçamentário atual, especificar a tecnologia e prever seus impactos em cadeia (efeito dominó), estimar o custo financeiro de riscos (Risk Cost) e, por fim, rodar a sensibilidade financeira no simulador.",
        "content": "<h3>Do Marketing à Prova Matemática</h3><p>A estrutura de justificação de investimentos complexos:</p><ol><li><b>Definição de Gargalo:</b> Qual o problema assistencial mensurável?</li><li><b>Impacto Atual:</b> Quanto esse gargalo custa hoje ao hospital?</li><li><b>Solução Proposta:</b> Como a IA atua no redesenho de processos e fluxo?</li><li><b>Precificação de Riscos:</b> Qual a estimativa do Risk Cost das categorias do framework?</li><li><b>Sensibilidade:</b> O ROI continua saudável nos cenários pessimistas?</li></ol>"
      },
      {
        "id": "slide_3_5_pic",
        "title": "A Estrutura Lógica do Argumento",
        "image": "/slides/aula3/slide_5.png",
        "block": "Bloco 1: Linguagem de Negócios",
        "estimatedTime": "4 min",
        "notes": "<strong>Fala sugerida:</strong> Pensem neste fluxo lógico como o esqueleto do business case. Se vocês pularem a etapa de quantificação do gargalo atual e forem direto para a sensibilidade do ROI, o conselho perderá a confiança na premissa inicial do investimento. O rigor metodológico protege o argumento.",
        "content": "<h3>A Estrutura Lógica do Argumento</h3><p>Cadeia de sustentabilidade decisória: Gargalo &rarr; Impacto Financeiro &rarr; Rede de Processos &rarr; Mitigação de Risco &rarr; Viabilidade Financeira.</p>"
      },
      {
        "id": "slide_3_6",
        "title": "Caso Real Internacional · Mayo Clinic AI-ECG (EAGLE)",
        "image": "/slides/aula3/slide_6.png",
        "block": "Estudo de Caso",
        "estimatedTime": "8 min",
        "notes": "<strong>Fala sugerida:</strong> O ensaio EAGLE da Mayo Clinic é o contraponto perfeito ao case do IBM Watson que vimos na Aula 1. O ROI teórico era de 250%, mas caiu para 41% na prática, e o payback subiu de menos de 1 ano para 2,8 anos, quando descobriram que a revisão médica levava 20 minutos em vez de 5, e que cada site de implantação custava USD 200 mil a mais em integração. A lição não é que o projeto falhou. É que um problema bem definido, com desfecho mensurável e governança desde o início, produz um business case robusto mesmo quando o número final é bem menor que o prometido.",
        "content": "<h3>Caso Real Internacional: Mayo Clinic AI-ECG (EAGLE)</h3><p>Algoritmo de triagem para detecção precoce de baixa fração de ejeção via ECG em rotina ambulatorial.</p><p>O ensaio demonstrou que a modelagem preditiva gerou desfecho de custo-efetividade e ganho de sobrevida mensuráveis de forma real e auditável no fluxo diário.</p>"
      },
      {
        "id": "slide_3_7",
        "title": "Qual Argumento Convence Seu CFO?",
        "image": "/slides/aula3/slide_7.png",
        "block": "Bloco 1: Linguagem de Negócios",
        "estimatedTime": "6 min",
        "isInteractive": true,
        "interactionType": "open_ended",
        "question": "Compartilhe no portal o argumento clínico ou financeiro de maior poder de persuasão para aprovação de investimentos.",
        "notes": "<strong>Fala sugerida:</strong> Escrevam uma frase só. Não um parágrafo, uma frase: o argumento que mais convenceria o CFO de vocês a aprovar o investimento. A turma vai poder curtir as respostas mais fortes. Esse exercício parece simples, mas é o teste real: se vocês não conseguem resumir o valor do projeto em uma frase, é sinal de que o argumento ainda não está claro nem para vocês mesmos.",
        "content": "<h3>Qual argumento convence seu CFO?</h3><p>Compartilhe no portal o argumento clínico ou financeiro de maior poder de persuasão para aprovação de investimentos em inovação.</p>"
      },
      {
        "id": "slide_3_8",
        "title": "Lastro Real (Brasil) · IA Clínica em Ação",
        "image": "/slides/aula3/slide_8.png",
        "block": "Estudo de Caso",
        "estimatedTime": "8 min",
        "notes": "<strong>Fala sugerida:</strong> Dois casos brasileiros, dois desfechos concretos. O Robô Laura reduziu o tempo entre suspeita de sepse e a primeira dose de antibiótico de 13 horas para 2h58, e cada hora a menos nesse intervalo tem correlação direta com sobrevida. O Neonpass, no Einstein, mostrou que só 35,4% das chamadas de pacientes exigiam de fato a enfermagem, devolvendo tempo assistencial que estava sendo consumido por triagem manual. Em nenhum dos dois casos o ganho veio só da tecnologia: veio da tecnologia combinada com redesenho de processo.",
        "content": "<h3>Lastro Real (Brasil): IA Clínica em Ação</h3><p><b>Robô Laura (Sepse):</b> Redução de 13h para 2h58 no tempo médio para primeira dose de antibiótico após suspeita de sepse em hospitais públicos e filantrópicos.</p><p><b>Neonpass (Einstein):</b> Otimização de tempo de enfermagem evidenciando que 64,6% dos chamados assistenciais nos leitos eram puramente administrativos.</p>"
      },
      {
        "id": "slide_3_9",
        "title": "Leitura Rápida: Laura & Neonpass",
        "image": "/slides/aula3/slide_7.png",
        "block": "Estudo de Caso",
        "estimatedTime": "5 min",
        "notes": "<strong>Fala sugerida:</strong> Recomendo a leitura dos resumos executivos da Laura e do Neonpass. Vejam como a quantificação de horas assistenciais liberadas e a redução de mortalidade por infecção bacteriana direta sustentaram financeiramente a contratação recorrente destas ferramentas em comitês nacionais.",
        "content": "<h3>Leitura Rápida: Robô Laura e Neonpass</h3><p>Estudos nacionais de impacto da otimização de fluxos assistenciais de faturamento, triagem e controle infeccioso bacteriano.</p>"
      },
      {
        "id": "slide_3_9_dyn",
        "title": "Dinâmica: Traduzindo Desfechos Clínicos",
        "image": "/slides/aula3/slide_7.png",
        "block": "Estudo de Caso",
        "estimatedTime": "5 min",
        "isInteractive": true,
        "interactionType": "poll",
        "question": "Na sua defesa de business case, qual indicador possui mais força diante da diretoria financeira?",
        "options": [
          "Redução direta do custo de hotelaria (diárias extras em leito geral/UTI)",
          "Aumento de receita por otimização de giro de leito no centro cirúrgico",
          "Mitigação de multas e passivos de conformidade regulatória (LGPD/ANVISA)"
        ],
        "notes": "<strong>Fala sugerida (Perspectiva CFO):</strong> Votem na enquete síncrona: ao apresentar o business case da equipe de vocês ao CFO, qual dessas três dimensões de valor terá maior poder de persuasão? *Dica de condução:* Destaque que a **Redução direta de custos (como hotelaria/diárias extras de UTI)** (opção 1) é o argumento mais fácil de auditar e aprovar perante o CFO. O aumento de receita (opção 2) exige premissa de demanda (que nem sempre se confirma), e a mitigação de multas (opção 3) é vista como custo evitado passivo.",
        "content": "<h3>Dinâmica: Traduzindo Desfechos Clínicos</h3><p>Vote na enquete síncrona sobre persuasão executiva frente a restrições orçamentárias.</p>"
      },
      {
        "id": "slide_3_10",
        "title": "Além do Preço",
        "image": "/slides/aula3/slide_8.png",
        "block": "Bloco 2: Matriz de Decisão",
        "estimatedTime": "6 min",
        "notes": "<strong>Fala sugerida:</strong> A solução mais barata da proposta comercial pode ser a mais cara nos próximos três anos, se ela gerar retrabalho, resistência da equipe ou upgrade de infraestrutura não previsto. Preço é um critério dentro da matriz de decisão, não o critério que decide sozinho. Antes de pontuar qualquer fornecedor, perguntem: qual o custo total de propriedade em três anos, não só o valor da proposta inicial?",
        "content": "<h3>Além do Preço</h3><p><i>\"A solução tecnológica de menor custo de aquisição (CAPEX) pode ser a de maior custo total de propriedade (TCO) em um horizonte de 3 anos devido a atritos operacionais e custos de integração legada.\"</i></p><p>Matriz de Decisão blinda a escolha contra o viés de preço nominal simples.</p>"
      },
      {
        "id": "slide_3_11",
        "title": "Construindo a Matriz de Decisão Ponderada",
        "image": "/slides/aula3/slide_9.png",
        "block": "Bloco 2: Matriz de Decisão",
        "estimatedTime": "6 min",
        "notes": "<strong>Fala sugerida:</strong> O segredo para uma governança de fornecedores isenta reside no estabelecimento prévio e homologado dos pesos de cada critério da Matriz Ponderada antes de pontuar as opções comerciais. Isso anula o viés de escolha e blinda o comitê técnico contra escolhas baseadas em preferências pessoais.",
        "content": "<h3>Construindo a Matriz de Decisão</h3><p><b>Princípio de Governança:</b> Definir os critérios e seus pesos de relevância corporativa <i>antes</i> de avaliar as opções de mercado.</p><p>Anula viés de escolha subjetiva (\"voto emocional\").</p>"
      },
      {
        "id": "slide_3_12",
        "title": "Como Calcular a Pontuação Ponderada",
        "image": "/slides/aula3/slide_10.png",
        "block": "Bloco 2: Matriz de Decisão",
        "estimatedTime": "6 min",
        "notes": "<strong>Fala sugerida:</strong> A conta é simples, mas precisa ser feita na ordem certa. Primeiro, definam os critérios relevantes: custo total, risco clínico, escalabilidade, o que fizer sentido para o cenário de vocês. Segundo, atribuam o peso de cada critério antes de olhar para as soluções — essa ordem é o que evita viés de confirmação. Terceiro, pontuem cada solução de 1 a 5 em cada critério. Quarto, calculem a pontuação final somando nota vezes peso de cada critério. Quinto, comparem: a maior pontuação ponderada vence, e se o voto do coração de vocês divergir do resultado da matriz, é hora de investigar esse viés emocional antes de decidir.",
        "content": "<h3>Como calcular a pontuação ponderada</h3><p>Etapas da modelagem:</p><ol><li>Definir critérios (TCO, Risco, Usabilidade, SLA).</li><li>Atribuir peso (soma 100%).</li><li>Pontuar fornecedores (escala 1 a 5).</li><li>Somar nota &times; peso. A maior pontuação ponderada vence o certame técnico.</li></ol>"
      },
      {
        "id": "slide_3_13",
        "title": "Governança da Inovação",
        "image": "/slides/aula3/slide_11.png",
        "block": "Bloco 2: Matriz de Decisão",
        "estimatedTime": "6 min",
        "notes": "<strong>Fala sugerida:</strong> Governança não é burocracia, é proteção — da instituição e de quem decide. Isso significa três coisas na prática: critérios definidos antes da avaliação, nunca depois; rastreabilidade de quem decidiu, com base em quê, e quando; e documentação que aguenta ser recomendável em seis meses depois, quando alguém perguntar por que aquele fornecedor foi escolhido. Um comitê que consegue responder essas três perguntas está protegido. Um que não consegue, está exposto, mesmo que a decisão tenha sido tecnicamente correta.",
        "content": "<h3>Governança da Inovação</h3><p>Critérios explícitos e rastreáveis na seleção tecnológica:</p><ul><li><b>Transparência:</b> Justificativa matemática da escolha documentada.</li><li><b>Auditabilidade:</b> Rastreabilidade de notas atribuídas por comitê técnico.</li><li><b>Segurança Jurídica:</b> Defesa formal da escolha perante auditorias internas ou acionistas.</li></ul>"
      },
      {
        "id": "slide_3_14",
        "title": "Escolha a Solução Vencedora",
        "image": "/slides/aula3/slide_11.png",
        "block": "Bloco 2: Matriz de Decisão",
        "estimatedTime": "6 min",
        "isInteractive": true,
        "interactionType": "poll",
        "question": "Na votação técnica do seu comitê síncrono, qual fornecedor da lousa multicritério obteve a maior pontuação ponderada e será o contratado?",
        "options": [
          "Fornecedor A (Baixo preço inicial, alto risco regulatório de acurácia)",
          "Fornecedor B (Preço moderado, alta usabilidade e SLA sólido)",
          "Fornecedor C (Alto preço inicial, excelente conformidade e mitigação total)"
        ],
        "notes": "<strong>Fala sugerida (Gabarito: Fornecedor B):</strong> Vote agora: entre as três opções apresentadas, qual seria a vencedora? *Gabarito Técnico:* A resposta correta é o **Fornecedor B** (Preço moderado, alta usabilidade e SLA sólido). Explique que o Fornecedor A é barato mas tem risco regulatório proibitivo (cai no vermelho da matriz), e o Fornecedor C tem mitigação total mas o custo (TCO) inviabiliza o ROI financeiro. O Fornecedor B equilibra perfeitamente risco e retorno.",
        "content": "<h3>Escolha a solução vencedora</h3><p>Vote na enquete síncrona com base nas notas ponderadas consolidadas pelos comitês.</p>"
      },
      {
        "id": "slide_3_14_a",
        "title": "Comitê Executivo: Você Aprovaria Esse Investimento?",
        "image": "/slides/aula3/slide_11.png",
        "block": "Bloco 2: Matriz de Decisão Multifatorial",
        "estimatedTime": "15 min",
        "isInteractive": true,
        "interactionType": "poll",
        "question": "Depois de ouvir as defesas dos grupos, qual seria a sua decisão pessoal: GO ou NO-GO?",
        "options": [
          "GO (Aprovar o investimento, estruturando mitigação de riscos)",
          "NO-GO (Rejeitar o investimento devido às incertezas do projeto)"
        ],
        "notes": "<strong>Fala sugerida (Discussão de Decisão):</strong> Depois de ouvir as defesas dos grupos, qual seria a sua decisão pessoal: GO ou NO-GO? *Dica de condução:* O cenário foi desenhado para ser um **NO-GO** sob governança estrita (devido à combinação de baixo engajamento médico, falta de histórico do fornecedor e integração legada complexa, que estendem o risco e o payback real). No entanto, um voto de **GO** pode ser aceito se e somente se houver um plano de mitigação robusto e contratualizado que transfira o risco de adoção para o fornecedor (ex. pagamento atrelado ao uso real).",
        "content": "<h3>Comitê Executivo: Você Aprovaria Esse Investimento?</h3><p><b>Investimento:</b> R$ 5.000.000 | <b>ROI projetado:</b> 32% | <b>Payback:</b> 4 anos</p><p><b>Fatores de risco adicionais:</b> baixo engajamento médico projetado, integração técnica difícil com sistemas legados, fornecedor novo no mercado sem histórico de implantação em hospitais de porte semelhante.</p><p><b>Comando:</b> \"Vocês são o comitê executivo. A decisão não é recalcular o ROI, é decidir: GO ou NO-GO, e defender a decisão em 90 segundos usando o Framework ROI-5.\"</p><p><b>Mecânica:</b> 5 minutos para os grupos aplicarem o Framework ROI-5. Apresentação oral de 90 segundos por grupo justificando a escolha (GO/NO-GO). Enquete de votação final.</p>"
      },
      {
        "id": "slide_3_15",
        "title": "Rubrica e Critérios de Avaliação",
        "image": "/slides/aula3/slide_12.png",
        "block": "Trabalho em Grupo",
        "estimatedTime": "5 min",
        "notes": "<strong>Fala sugerida:</strong> O Projeto Prático em Grupo vale 35% da nota, a maior fatia da avaliação da disciplina, e a nota mínima de aprovação é 70% na média ponderada geral. O que separa um business case nota máxima de um mediano não é a sofisticação da tecnologia escolhida pelo grupo, é a defensabilidade das premissas e a qualidade da narrativa executiva: números auditáveis, riscos quantificados nas quatro categorias que vimos na Aula 1, e uma recomendação de GO ou NO-GO que resiste a perguntas difíceis do comitê.",
        "content": "<h3>Projeto Prático Final · Business Case</h3><p><b>Peso na nota final:</b> 35% | Média ponderada mínima para aprovação no módulo: 7.0/10.</p><p>Critérios de avaliação:</p><ol><li>Rigor analítico na simulação do simulador.</li><li>Mapeamento de 4 categorias de risco e plano de mitigação.</li><li>Defensabilidade das premissas orçamentárias (Loss Avoidance/TCO).</li></ol>"
      },
      {
        "id": "slide_3_15_b",
        "title": "Framework ROI-5: As 5 Perguntas Antes do GO",
        "image": "/slides/aula3/slide_12.png",
        "block": "Trabalho em Grupo",
        "estimatedTime": "8 min",
        "notes": "<strong>Fala sugerida:</strong> Chegamos ao fechamento da disciplina, e eu quero deixar vocês com uma ferramenta que cabe em um post-it, mas carrega três aulas inteiras de raciocínio. Chamo de Framework ROI-5: cinco perguntas, sempre nessa ordem, antes de aprovar qualquer investimento em inteligência artificial na sua instituição. Primeiro: isso resolve um problema relevante, ou é solução atrás de problema? Segundo: o benefício pode ser monetizado, ou estamos prometendo algo que nunca vai virar número auditável? Terceiro: o risco foi quantificado nas quatro categorias que vimos na Aula 1? Quarto: a organização realmente vai adotar isso, ou vamos comprar uma ferramenta que ninguém usa? Quinto: depois do teste de estresse, o ROI ainda é positivo, ou só é positivo no cenário otimista da proposta comercial? Se as cinco respostas forem sólidas, o caminho é GO. Se qualquer uma delas falhar sem um plano de mitigação real, é NO-GO, e dizer não, aqui, é tão válido quanto dizer sim.",
        "content": "<h3>Framework ROI-5: As 5 Perguntas Antes do GO</h3><p>Cinco perguntas antes de aprovar qualquer investimento em IA (nesta ordem):</p><ol><li><b>Resolve um problema relevante?</b> (Conecta com Aula 1: risco aparente vs. oculto, matriz de impacto)</li><li><b>O benefício pode ser monetizado?</b> (Conecta com B3: matriz de monetização)</li><li><b>O risco foi quantificado?</b> (Conecta com Aula 1: framework de 4 categorias)</li><li><b>A organização conseguirá adotar?</b> (Conecta com B6: ROI observado = ROI esperado &times; adoção)</li><li><b>O ROI permanece positivo após o teste de estresse?</b> (Conecta com Aula 2: cenário pessimista)</li></ol><p><b>Resultado:</b> GO ou NO-GO.</p>"
      },
      {
        "id": "slide_3_16",
        "title": "Workshop do Projeto Final · Business Case",
        "image": "/slides/aula3/slide_12.png",
        "block": "Trabalho em Grupo",
        "estimatedTime": "40 min",
        "notes": "<strong>Fala sugerida:</strong> A partir de agora é mão na massa. Usem os próximos minutos para avançar o checklist do trabalho final: simulação de fluxo mapeada, teste de estresse aplicado, ROI abrangente calculado com pelo menos dois riscos invisíveis, e a justificativa de essa estrutura para o conselho já esboçada. Definam também os papéis dentro do grupo agora, não na véspera da entrega.",
        "content": "<h3>Workshop de Elaboração de Business Case</h3><p><b>Comando:</b> Reúnam-se nos comitês para preencher o Trabalho_Final_Template.docx. Vocês devem estruturar o parecer de GO/NO-GO de inovação em saúde, aplicando os conceitos de TCO, Loss Avoidance e o framework de riscos de quatro categorias.</p>"
      },
      {
        "id": "slide_3_17",
        "title": "Consultoria em Grupo no Portal",
        "image": "/slides/aula3/slide_12.png",
        "block": "Trabalho em Grupo",
        "estimatedTime": "15 min",
        "notes": "<strong>Fala sugerida:</strong> Esse é o momento de consultoria ao vivo. Avancem a tese de investimento do grupo de vocês no portal e registrem as dúvidas específicas na aba de consultoria — vou circular entre os grupos para orientar diretamente. Aproveitem esse tempo para testar a robustez do argumento de vocês antes da entrega final: é mais barato encontrar a fragilidade agora do que na frente da banca.",
        "content": "<h3>Consultoria em grupo com o professor</h3><p>Use este tempo síncrono para enviar suas dúvidas específicas de modelagem financeira e precificação de riscos ao professor na respectiva aba de consultoria do portal.</p>"
      },
      {
        "id": "slide_3_18",
        "title": "Reflexão Final · Encerramento da Disciplina",
        "image": "/slides/aula3/slide_13.png",
        "block": "Fechamento",
        "estimatedTime": "8 min",
        "isInteractive": true,
        "interactionType": "open_ended",
        "question": "Como guardião da viabilidade de investimentos, qual o compromisso profissional que você assume?",
        "notes": "<strong>Fala sugerida:</strong> Para registrar a finalização das atividades interativas no portal, completem: 'Como guardião da viabilidade de investimentos, meu compromisso profissional a partir de hoje é...'. Esse registro formal consolida nossa jornada de tomada de decisão analítica.",
        "content": "<h3>Reflexão Final</h3><p>Responda no portal: Como guardião da viabilidade de investimentos, qual o compromisso profissional que você assume para guiar a governança de inovação em saúde?</p>"
      },
      {
        "id": "slide_3_19",
        "title": "Síntese da Disciplina e Próximos Passos",
        "image": "/slides/aula3/slide_14.png",
        "block": "Encerramento",
        "estimatedTime": "5 min",
        "notes": "<strong>Fala sugerida:</strong> Resumindo nossa jornada letiva: aprendemos a evidenciar os riscos downstream ocultos, modelar a degradação orçamentária por taxa de adoção e formular business cases quantitativos de alta aprovação. Ouçam o podcast de consolidação final como suporte pedagógico.",
        "content": "<h3>Síntese da Disciplina · Os 3 Pilares</h3><ol><li><b>Enxergar o Oculto:</b> Risco oculto pesa mais que o aparente. Gargalo migra, não desaparece. Simular antes de investir é mandatório.</li><li><b>Quantificar o Invisível:</b> A adoção clínica dita a rentabilidade real. Eventos clínicos adversos evitados se revertem em valor financeiro (Loss Avoidance).</li><li><b>Defender com Lastro:</b> A aprovação em comitê exige falar a língua de negócios: Matriz de Decisão Ponderada e relatórios objetivos de duas páginas.</li></ol>"
      },
      {
        "id": "slide_3_20",
        "title": "Mantra da Disciplina",
        "image": "/slides/aula3/slide_15.png",
        "block": "Encerramento",
        "estimatedTime": "2 min",
        "notes": "<strong>Fala sugerida:</strong> Encerro com nossa diretriz corporativa central: atuar de forma estratégica e baseada em evidências é ter a responsabilidade de investir em soluções tecnológicas que geram desfechos assistenciais reais e retorno operacional sustentável, rejeitando modismos e pressões comerciais vazias.",
        "content": "<h3>Mantra da Disciplina</h3><p><i>\"Tomar decisões baseadas em dados é ter a coragem de escolher o que funciona, e não apenas o que é tendência de mercado.\"</i></p>"
      },
      {
        "id": "slide_3_21_ref",
        "title": "Referências e Fontes da Aula",
        "image": "/slides/aula3/slide_16.png",
        "block": "Encerramento",
        "estimatedTime": "2 min",
        "notes": "<strong>Fala sugerida:</strong> As referências de governança e avaliação de tecnologias em saúde discutidas hoje estão organizadas na aba de Referências do portal corporativo para consulta permanente. Bons estudos nas entregas finais.",
        "content": "<h3>Referências Bibliográficas</h3><p>Mayo Clinic AI-ECG Ensaio EAGLE</p><p>Laura Sepse e Neonpass Einstein · Casos Práticos de Reestruturação de Fluxo</p>"
      },
      {
        "id": "slide_3_22",
        "title": "Guardiões da Viabilidade",
        "image": "/slides/aula3/slide_17.png",
        "block": "Encerramento",
        "estimatedTime": "2 min",
        "notes": "<strong>Fala sugerida:</strong> Agradeço a excelente participação de todos os executivos e líderes em saúde neste módulo síncrono. Vocês agora estão capacitados para liderar comitês de alocação de investimentos tecnológicos com embasamento estatístico, clínico e financeiro de excelência. Sucesso nas entregas e até breve!",
        "content": "<h3>Parabéns aos novos Guardiões da Viabilidade!</h3><p>Você saiu desta disciplina apto a enxergar o oculto, quantificar o invisível e defender decisões de investimento em saúde com rigor matemático.</p>"
      }
    ]
  }
];

function readData() {
  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
      activeState: {
        classId: "aula1",
        slideId: "slide_1_1",
        syncEnabled: true,
        activeTab: "checkin"
      },
      submissions: { aula1: {}, aula2: {}, aula3: {} },
      comments: { aula1: {}, aula2: {}, aula3: {} },
      checkinResponses: { aula1: {}, aula2: {}, aula3: {} },
      slideInteractions: { aula1: {}, aula2: {}, aula3: {} },
      conceptCheckResponses: { aula1: {}, aula2: {}, aula3: {} },
      reflections: { aula1: {}, aula2: {}, aula3: {} }
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    
    // Ensure all required fields exist
    let updated = false;
    if (!parsed.activeState) {
      parsed.activeState = { classId: "aula1", slideId: "slide_1_1", syncEnabled: true, activeTab: "checkin" };
      updated = true;
    }
    if (!parsed.activeState.activeTab) {
      parsed.activeState.activeTab = "checkin";
      updated = true;
    }
    if (!parsed.submissions) { parsed.submissions = { aula1: {}, aula2: {}, aula3: {} }; updated = true; }
    if (!parsed.comments) { parsed.comments = { aula1: {}, aula2: {}, aula3: {} }; updated = true; }
    if (!parsed.checkinResponses) { parsed.checkinResponses = { aula1: {}, aula2: {}, aula3: {} }; updated = true; }
    if (!parsed.slideInteractions) { parsed.slideInteractions = { aula1: {}, aula2: {}, aula3: {} }; updated = true; }
    if (!parsed.conceptCheckResponses) { parsed.conceptCheckResponses = { aula1: {}, aula2: {}, aula3: {} }; updated = true; }
    if (!parsed.reflections) { parsed.reflections = { aula1: {}, aula2: {}, aula3: {} }; updated = true; }
    if (!parsed.whiteboardHistory) { parsed.whiteboardHistory = { aula1: [], aula2: [], aula3: [] }; updated = true; }
    
    if (updated) {
      fs.writeFileSync(DB_FILE, JSON.stringify(parsed, null, 2), 'utf-8');
    }
    return parsed;
  } catch (e) {
    console.error("Error reading db.json, returning empty database structure", e);
    return {
      activeState: { classId: "aula1", slideId: "slide_1_1", syncEnabled: true, activeTab: "checkin" },
      submissions: { aula1: {}, aula2: {}, aula3: {} },
      comments: { aula1: {}, aula2: {}, aula3: {} },
      checkinResponses: { aula1: {}, aula2: {}, aula3: {} },
      slideInteractions: { aula1: {}, aula2: {}, aula3: {} },
      conceptCheckResponses: { aula1: {}, aula2: {}, aula3: {} },
      reflections: { aula1: {}, aula2: {}, aula3: {} }
    };
  }
}

function writeData(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (e) {
    console.error("Error writing to db.json", e);
    return false;
  }
}

module.exports = {
  students,
  scenarios,
  classesContent,
  syllabusBibliography,
  getState: () => {
    const data = readData();
    return data.activeState;
  },
  updateState: (newState) => {
    const data = readData();
    data.activeState = { ...data.activeState, ...newState };
    writeData(data);
    return data.activeState;
  },
  
  // Group submissions management
  getSubmissions: (classId) => {
    const data = readData();
    return data.submissions[classId] || {};
  },
  getSubmission: (classId, groupId) => {
    const data = readData();
    return (data.submissions[classId] || {})[groupId] || null;
  },
  saveSubmission: (classId, groupId, submissionData, submittedBy) => {
    const data = readData();
    if (!data.submissions[classId]) {
      data.submissions[classId] = {};
    }
    // Only accept the first group submission, block edits
    if (data.submissions[classId][groupId]) {
      return data.submissions[classId][groupId];
    }
    data.submissions[classId][groupId] = {
      ...submissionData,
      submittedBy: submittedBy || "Aluno da Equipe",
      submittedAt: new Date().toISOString()
    };
    writeData(data);
    return data.submissions[classId][groupId];
  },
  
  // Comments & Feedback
  getComments: (classId, groupId) => {
    const data = readData();
    return (data.comments[classId] || {})[groupId] || [];
  },
  saveComment: (classId, groupId, commentText, grade) => {
    const data = readData();
    if (!data.comments[classId]) {
      data.comments[classId] = {};
    }
    if (!data.comments[classId][groupId]) {
      data.comments[classId][groupId] = [];
    }
    const newComment = {
      text: commentText,
      grade: grade || null,
      timestamp: new Date().toISOString()
    };
    data.comments[classId][groupId].push(newComment);
    writeData(data);
    return data.comments[classId][groupId];
  },
  
  // Check-in response management
  getCheckins: (classId) => {
    const data = readData();
    return data.checkinResponses[classId] || {};
  },
  saveCheckinResponse: (classId, userEmail, responseText) => {
    const data = readData();
    if (!data.checkinResponses[classId]) {
      data.checkinResponses[classId] = {};
    }
    // Preservar likes se já existirem
    const existing = data.checkinResponses[classId][userEmail] || {};
    data.checkinResponses[classId][userEmail] = {
      text: responseText,
      submittedAt: new Date().toISOString(),
      likes: existing.likes || []
    };
    writeData(data);
    return data.checkinResponses[classId];
  },
  likeCheckinWord: (classId, word, likerUserEmail) => {
    const data = readData();
    if (!data.checkinResponses[classId]) {
      data.checkinResponses[classId] = {};
    }
    const responses = data.checkinResponses[classId];
    const cleanWord = word.toUpperCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim();
    
    // Toggle logic: check if this user already liked this word in any response
    let alreadyLiked = false;
    Object.values(responses).forEach(res => {
      if (res && res.text) {
        const words = res.text.trim().split(/\s+/);
        const matches = words.some(w => w.toUpperCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim() === cleanWord);
        if (matches && res.likes && res.likes.includes(likerUserEmail)) {
          alreadyLiked = true;
        }
      }
    });

    Object.values(responses).forEach(res => {
      if (res && res.text) {
        const words = res.text.trim().split(/\s+/);
        const matches = words.some(w => w.toUpperCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim() === cleanWord);
        if (matches) {
          if (!res.likes) res.likes = [];
          const idx = res.likes.indexOf(likerUserEmail);
          if (alreadyLiked) {
            if (idx !== -1) res.likes.splice(idx, 1);
          } else {
            if (idx === -1) res.likes.push(likerUserEmail);
          }
        }
      }
    });

    writeData(data);
    return data.checkinResponses[classId];
  },

  // Interactive Slide responses
  getSlideInteractions: (classId, slideId) => {
    const data = readData();
    const classInteractions = data.slideInteractions[classId] || {};
    return classInteractions[slideId] || [];
  },
  saveSlideInteraction: (classId, slideId, userEmail, value) => {
    const data = readData();
    if (!data.slideInteractions[classId]) {
      data.slideInteractions[classId] = {};
    }
    if (!data.slideInteractions[classId][slideId]) {
      data.slideInteractions[classId][slideId] = [];
    }
    
    const student = students.find(s => s.email === userEmail);
    const studentName = student ? student.name : userEmail;
    const groupId = student ? student.group : 1;
    
    // Check if the slide is a Q&A activity
    const activeClass = classesContent.find(c => c.id === classId);
    const slide = activeClass ? activeClass.slides.find(s => s.id === slideId) : null;
    const isQA = slide && slide.interactionType === "qa";
    
    if (isQA) {
      // Q&A allows multiple questions. Append a new one with a unique ID
      const questionId = `${userEmail}_${Date.now()}`;
      const responseItem = {
        id: questionId,
        userEmail: userEmail,
        studentName: studentName,
        groupId: groupId,
        value: value,
        likes: [],
        hidden: false,
        highlighted: false,
        answered: false,
        pinned: false,
        submittedAt: new Date().toISOString()
      };
      data.slideInteractions[classId][slideId].push(responseItem);
    } else {
      // Regular single response per student (quiz, poll_ab, open_ended)
      const index = data.slideInteractions[classId][slideId].findIndex(x => x.userEmail === userEmail);
      const responseItem = {
        id: userEmail,
        userEmail: userEmail,
        studentName: studentName,
        groupId: groupId,
        value: value,
        likes: (index !== -1) ? (data.slideInteractions[classId][slideId][index].likes || []) : [],
        hidden: (index !== -1) ? (data.slideInteractions[classId][slideId][index].hidden || false) : false,
        highlighted: (index !== -1) ? (data.slideInteractions[classId][slideId][index].highlighted || false) : false,
        answered: (index !== -1) ? (data.slideInteractions[classId][slideId][index].answered || false) : false,
        pinned: (index !== -1) ? (data.slideInteractions[classId][slideId][index].pinned || false) : false,
        submittedAt: new Date().toISOString()
      };
      
      if (index !== -1) {
        data.slideInteractions[classId][slideId][index] = responseItem;
      } else {
        data.slideInteractions[classId][slideId].push(responseItem);
      }
    }
    
    writeData(data);
    return data.slideInteractions[classId][slideId];
  },
  likeSlideInteraction: (classId, slideId, responseId, likerUserEmail) => {
    const data = readData();
    if (data.slideInteractions[classId] && data.slideInteractions[classId][slideId]) {
      const item = data.slideInteractions[classId][slideId].find(x => x.id === responseId);
      if (item) {
        if (!item.likes) item.likes = [];
        const likeIdx = item.likes.indexOf(likerUserEmail);
        if (likeIdx === -1) {
          item.likes.push(likerUserEmail);
        } else {
          item.likes.splice(likeIdx, 1);
        }
        writeData(data);
      }
    }
    return (data.slideInteractions[classId] || {})[slideId] || [];
  },
  likeSlideInteractionWord: (classId, slideId, word, likerUserEmail) => {
    const data = readData();
    if (!data.slideInteractions[classId]) {
      data.slideInteractions[classId] = {};
    }
    if (!data.slideInteractions[classId][slideId]) {
      data.slideInteractions[classId][slideId] = [];
    }
    const list = data.slideInteractions[classId][slideId];
    const cleanWord = word.toUpperCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim();

    let alreadyLiked = false;
    list.forEach(item => {
      if (item && item.value) {
        const words = item.value.trim().split(/\s+/);
        const matches = words.some(w => w.toUpperCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim() === cleanWord);
        if (matches && item.likes && item.likes.includes(likerUserEmail)) {
          alreadyLiked = true;
        }
      }
    });

    list.forEach(item => {
      if (item && item.value) {
        const words = item.value.trim().split(/\s+/);
        const matches = words.some(w => w.toUpperCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim() === cleanWord);
        if (matches) {
          if (!item.likes) item.likes = [];
          const idx = item.likes.indexOf(likerUserEmail);
          if (alreadyLiked) {
            if (idx !== -1) item.likes.splice(idx, 1);
          } else {
            if (idx === -1) item.likes.push(likerUserEmail);
          }
        }
      }
    });

    writeData(data);
    return list;
  },
  toggleHideSlideInteraction: (classId, slideId, responseId) => {
    const data = readData();
    if (data.slideInteractions[classId] && data.slideInteractions[classId][slideId]) {
      const item = data.slideInteractions[classId][slideId].find(x => x.id === responseId);
      if (item) {
        item.hidden = !item.hidden;
        writeData(data);
      }
    }
    return (data.slideInteractions[classId] || {})[slideId] || [];
  },
  toggleHighlightSlideInteraction: (classId, slideId, responseId) => {
    const data = readData();
    if (data.slideInteractions[classId] && data.slideInteractions[classId][slideId]) {
      const item = data.slideInteractions[classId][slideId].find(x => x.id === responseId);
      if (item) {
        item.highlighted = !item.highlighted;
        writeData(data);
      }
    }
    return (data.slideInteractions[classId] || {})[slideId] || [];
  },
  toggleAnswerSlideInteraction: (classId, slideId, responseId) => {
    const data = readData();
    if (data.slideInteractions[classId] && data.slideInteractions[classId][slideId]) {
      const item = data.slideInteractions[classId][slideId].find(x => x.id === responseId);
      if (item) {
        item.answered = !item.answered;
        writeData(data);
      }
    }
    return (data.slideInteractions[classId] || {})[slideId] || [];
  },
  togglePinSlideInteraction: (classId, slideId, responseId) => {
    const data = readData();
    if (data.slideInteractions[classId] && data.slideInteractions[classId][slideId]) {
      const list = data.slideInteractions[classId][slideId];
      const item = list.find(x => x.id === responseId);
      if (item) {
        const targetVal = !item.pinned;
        // Unpin all other items on this slide
        list.forEach(x => { x.pinned = false; });
        item.pinned = targetVal;
        writeData(data);
      }
    }
    return (data.slideInteractions[classId] || {})[slideId] || [];
  },

  // Concept Check responses
  getConceptChecks: (classId) => {
    const data = readData();
    return data.conceptCheckResponses[classId] || {};
  },
  saveConceptCheckResponse: (classId, userEmail, score, answers) => {
    const data = readData();
    if (!data.conceptCheckResponses[classId]) {
      data.conceptCheckResponses[classId] = {};
    }
    data.conceptCheckResponses[classId][userEmail] = {
      score: score,
      answers: answers,
      submittedAt: new Date().toISOString()
    };
    writeData(data);
    return data.conceptCheckResponses[classId][userEmail];
  },

  // Reflection responses
  getReflections: (classId) => {
    const data = readData();
    return data.reflections[classId] || {};
  },
  saveReflection: (classId, userEmail, reflectionText) => {
    const data = readData();
    if (!data.reflections[classId]) {
      data.reflections[classId] = {};
    }
    data.reflections[classId][userEmail] = {
      text: reflectionText,
      submittedAt: new Date().toISOString()
    };
    writeData(data);
    return data.reflections[classId][userEmail];
  },

  // Whiteboard history
  getWhiteboardHistory: (classId) => {
    const data = readData();
    return data.whiteboardHistory[classId] || [];
  },
  addWhiteboardAction: (classId, action) => {
    const data = readData();
    if (!data.whiteboardHistory[classId]) {
      data.whiteboardHistory[classId] = [];
    }
    data.whiteboardHistory[classId].push(action);
    writeData(data);
    return action;
  },
  clearWhiteboardHistory: (classId) => {
    const data = readData();
    data.whiteboardHistory[classId] = [];
    writeData(data);
    return [];
  }
};

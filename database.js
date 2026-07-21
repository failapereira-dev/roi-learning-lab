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
  { name: "Aluno Visitante 6", email: "visitante6@hmv.org.br", group: 1 },
  
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
    "url": "https://spectrum.ieee.org/how-ibm-watson-overpromised-and-underdelivered-on-ai-health-care"
  },
  {
    "citation": "IBM Watson · STAT News, recomendações inseguras (2017)",
    "url": "https://www.statnews.com/2017/09/05/watson-ibm-cancer/"
  },
  {
    "citation": "IBM Watson · MD Anderson, JNCI (2017)",
    "url": "https://academic.oup.com/jnci/article/109/5/djx113/3847623"
  },
  {
    "citation": "IA de laudos · InRad/HC-FMUSP, Jornal da USP (2024)",
    "url": "https://jornal.usp.br/radio-usp/uso-da-ia-no-instituto-de-radiologia-da-usp-permitira-laudos-mais-ageis/"
  },
  {
    "citation": "IA em ressonância · HCI Ijuí (2026)",
    "url": "https://hci.org.br/pioneiro-no-interior-do-rs-hci-implanta-inteligencia-artificial-na-ressonancia-magnetica-e-agiliza-exames-em-ate-50/"
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
    "question": "Qual destes custos você acha que mais \"some\" das planilhas de projeto?",
    "options": [
      "Rede / Obras",
      "Treinamento",
      "Retrabalho",
      "Glosas",
      "Jurídico"
    ],
    "notes": "<strong>Fala sugerida:</strong> Vamos iniciar com nossa enquete de check-in. Respondam no portal: qual destes custos você acha que mais 'some' das planilhas de projeto: Rede/Obras, Treinamento, Retrabalho, Glosas ou Jurídico?",
    "content": "<h3>Icebreaker · O Custo que Ninguém Somou</h3><p>Qual destes custos você acha que mais \"some\" das planilhas de projeto?</p><p>Vote no portal.</p>"
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
    "id": "slide_2_4",
    "title": "Avaliação de Risco como Defesa Institucional",
    "image": "/slides/aula2/slide_4.png",
    "block": "Introdução",
    "estimatedTime": "5 min",
    "notes": "<strong>Fala sugerida:</strong> Esse é o mantra do nosso segundo encontro: dizer não, quando os dados apontam para isso, também é entregar valor. Avaliação de risco não existe para travar a inovação, existe para proteger a instituição de investimentos que a infraestrutura ou a cultura organizacional ainda não sustentam. O papel de vocês como guardiões da viabilidade não é aprovar tudo que chega bonito na proposta comercial, é ter a coragem analítica de vetar o que os números mostram que não vai funcionar.",
    "content": "<h3>Avaliação de Risco como Defesa Institucional</h3><p><i>\"Tomar decisões baseadas em dados é ter a coragem de escolher o que funciona, e não apenas o que é moda.\"</i></p><p>O veto dos dados: dizer \"não\" de forma fundamentada também é entregar valor. Proteger a instituição de investimentos que a infraestrutura não sustenta é liderança, não resistência.</p>"
  },
  {
    "id": "slide_2_5",
    "title": "Cinco Formas de Perguntar \"Valeu a Pena?\"",
    "image": "/slides/aula2/slide_5.png",
    "block": "Bloco 1: Métodos de Avaliação",
    "estimatedTime": "3 min",
    "notes": "<strong>Fala sugerida:</strong> Entrando no nosso primeiro bloco, quando nos perguntamos se uma tecnologia 'valeu a pena', a resposta depende da régua utilizada. Em saúde, retorno vai muito além de dinheiro. Temos cinco metodologias principais: Custo-Utilidade, focada em qualidade de vida (QALY); Custo-Efetividade, focada em desfechos clínicos práticos como internações evitadas; o Custo-Benefício clássico que traduz tudo para a moeda financeira; o Impacto Orçamentário que responde se a conta cabe no caixa no curto prazo; e o Custo-Consequência, muito recomendado para saúde digital por listar abertamente múltiplos desfechos clínicos e financeiros lado a lado.",
    "content": "<h3>Cinco Formas de Perguntar \"Valeu a Pena?\"</h3><p>Em saúde, \"retorno\" quase nunca é apenas financeiro. Cada método responde a uma pergunta diferente.</p><ul><li><b>Custo-Utilidade:</b> Quanto custa um ano a mais de vida com qualidade (QALY)? Padrão mundial de cobertura.</li><li><b>Custo-Efetividade:</b> Quanto custa um resultado clínico concreto, como evitar uma internação?</li><li><b>Custo-Benefício:</b> Cada real investido devolve quanto? O ROI clássico do mundo financeiro.</li><li><b>Impacto Orçamentário:</b> \"Cabe no orçamento?\" (foco na capacidade de caixa, não no lucro).</li><li><b>Custo-Consequência:</b> Custos ao lado de todos os desfechos. Altamente recomendado para saúde digital (revisão de diretrizes de 2023).</li></ul>"
  },
  {
    "id": "slide_2_6",
    "title": "Estados Unidos: Quem Paga a Conta Define o Valor",
    "image": "/slides/aula2/slide_6.png",
    "block": "Bloco 1: Panorama Global",
    "estimatedTime": "3 min",
    "notes": "<strong>Fala sugerida:</strong> Vamos olhar como o mundo avalia isso na prática. Nos Estados Unidos, sem uma agência nacional regulando preços de incorporação, cada hospital ou operadora faz a própria conta. O foco é estritamente financeiro: receita direta gerada menos custos. Um exemplo recente de 2026 na NYU Langone Health com monitoramento remoto de pressão arterial mostrou um ROI médio de 22%, mas reparem na volatilidade: variou de -11% a +93% dependendo da adesão dos pacientes. Por isso, hoje, mais de 50% dos hospitais americanos exigem cláusulas de ROI garantido em contrato pelos fornecedores de software.",
    "content": "<h3>Estados Unidos · Quem Paga a Conta Define o Valor</h3><p>Sem um órgão nacional centralizador de incorporação, cada hospital ou operadora realiza a própria análise de viabilidade.</p><ul><li><b>Modelo de Negócio:</b> Receita líquida gerada menos custos do programa.</li><li><b>Caso de Referência (NYU Langone Health, 2026):</b> Monitoramento remoto de pressão arterial com retorno médio de 22,2% (com 55% de adesão do paciente). Cenários extremos variaram de -11% a +93% de ROI.</li><li><b>Desafio Prático:</b> Mais da metade dos sistemas americanos exige ROI garantido em contrato pelo fornecedor, enquanto menos de 30% relatam retorno financeiro significativo no cuidado virtual.</li></ul>"
  },
  {
    "id": "slide_2_7",
    "title": "Canadá e Reino Unido: Valor Social e Rigor Público",
    "image": "/slides/aula2/slide_7.png",
    "block": "Bloco 1: Panorama Global",
    "estimatedTime": "3 min",
    "notes": "<strong>Fala sugerida:</strong> Já no Canadá e Reino Unido, a régua é pública e social. O Canadá adota a perspectiva da sociedade, medindo custos indiretos como tempo de viagem e quilômetros rodados. Em Ontário, o atendimento digital poupou mais de 500 milhões de dólares do bolso dos próprios pacientes e evitou bilhões de quilômetros de deslocamento. No Reino Unido, o NHS é cirúrgico: eles têm um limite fixado de 20 a 30 mil libras por ano de vida com qualidade. Se a IA passar disso, ela não é incorporada, a menos que adote esquemas de reembolso condicional sob teste.",
    "content": "<h3>Canadá & Reino Unido · Valor Social e Rigor Público</h3><ul><li><b>Canadá (Perspectiva da Sociedade):</b> Considera benefícios intangíveis como tempo poupado pelo paciente, deslocamento evitado e suporte a áreas rurais. Em Ontário (2020-2022), o atendimento virtual economizou de US$ 569 a US$ 733 milhões para os pacientes, evitando 3,2 bilhões de quilômetros de trânsito.</li><li><b>Reino Unido (A Régua Pública do NHS):</b> Utiliza um limiar explícito de custo-utilidade, aceitando pagar entre £20.000 e £30.000 por QALY (ano de vida com qualidade). Desde 2022, adotam o pagamento condicional para tecnologias promissoras enquanto as evidências clínicas do mundo real ainda estão sendo geradas.</li></ul>"
  },
  {
    "id": "slide_2_8",
    "title": "Alemanha: Permanência Conquistada",
    "image": "/slides/aula2/slide_8.png",
    "block": "Bloco 1: Panorama Global",
    "estimatedTime": "3 min",
    "notes": "<strong>Fala sugerida:</strong> O caso da Alemanha é emblemático com o modelo DiGA. Lá, o aplicativo de saúde digital é prescrito pelo médico como se fosse um remédio e reembolsado pelo seguro público. Mas há um detalhe regulatório fundamental: a aprovação inicial é provisória. O desenvolvedor tem exatamente um ano para comprovar melhora assistencial no mundo real. E a reforma de 2026 endureceu as regras: pelo menos 20% do pagamento do governo está condicionado à performance clínica. Mesmo assim, apenas 4% dos médicos prescrevem, porque a IA e o app não estão integrados aos prontuários e ao fluxo de trabalho deles.",
    "content": "<h3>Alemanha · Reembolso e Permanência Conquistada</h3><p>O modelo DiGA (Digital Health Applications) permite que médicos prescrevam aplicativos de saúde digital financiados por seguros públicos.</p><ul><li><b>Reembolso Fast-Track (desde 2020):</b> O fabricante recebe aprovação provisória e tem até 12 meses para provar o \"efeito positivo no cuidado assistencial\". Se falhar na entrega da evidência clínica, o reembolso é cancelado.</li><li><b>Volume (2026):</b> Cerca de 60 aplicativos listados (como Kalmeda para zumbido e Somnio para insônia).</li><li><b>Reforma 2026:</b> Medição obrigatória de dados no mundo real e no mínimo 20% do preço final atrelado ao desempenho prático do aplicativo.</li><li><b>Gargalo:</b> Apenas cerca de 4% dos médicos prescrevem ativamente. A maior barreira não é a regulação, mas a falta de integração no fluxo de trabalho diário.</li></ul>"
  },
  {
    "id": "slide_2_9",
    "title": "O Resto do Mundo · Desperdício Evitado e Desigualdades",
    "image": "/slides/aula2/slide_9.png",
    "block": "Bloco 1: Panorama Global",
    "estimatedTime": "3 min",
    "notes": "<strong>Fala sugerida:</strong> Olhando para outras regiões, a Europa exibe grande fragmentação regulatória, com avaliações de qualidade variadas. Na América Latina, os frameworks de incorporação de IA em saúde ainda engatinham. No Brasil, a justificativa financeira costuma vir da redução do custo unitário através de escala — como vimos em teleconsultas onde o custo despencou com o volume. Já em países em desenvolvimento da Ásia, como na Índia, a justificativa do ROI foca em desperdício evitado na cadeia de suprimentos e logística, mostrando que em cenários de recursos escassos, mitigar perdas é o maior gerador de valor.",
    "content": "<h3>O Resto do Mundo · Desperdício Evitado e Desigualdades</h3><ul><li><b>Europa (Visão Geral):</b> Descentralização com metodologias muito desiguais. A nota média de qualidade de diretrizes pelo AGREE II é de 65% entre 12 diretrizes de 10 países. Uma tecnologia pode ser incorporada em um país e rejeitada no vizinho.</li><li><b>América Latina:</b> Escassez de arcabouços formais de decisão. No Brasil, o foco é em escala e acesso: um estudo de teleconsulta mostrou redução do custo unitário de US$ 137 para US$ 28 por atendimento com o ganho de escala. Equidade e barreiras sociais raramente entram nos modelos formais de cálculo.</li><li><b>Ásia-Pacífico (Exemplo da Índia):</b> Na rede nacional de vacinas da Índia, estima-se um retorno social de 2,93 rupias para cada 1 rupia investida, majoritariamente vindo da eliminação de desperdício na cadeia de frio e logística de distribuição.</li></ul>"
  },
  {
    "id": "slide_2_10",
    "title": "Todas as Regiões Lado a Lado",
    "image": "/slides/aula2/slide_10.png",
    "block": "Bloco 1: Análise Comparativa",
    "estimatedTime": "3 min",
    "notes": "<strong>Fala sugerida:</strong> Este quadro resume a grande diferença de mentalidade. Nos EUA, o foco é em efetividade clínica, eficiência econômica e sustentabilidade financeira do negócio. No Canadá, adiciona-se forte peso ao paciente, sociedade, acesso e equidade. Na Alemanha, a prioridade máxima é a comprovação clínica, dando menos importância no primeiro momento à eficiência de custos no nível corporativo. No Brasil e América Latina, a prioridade histórica é a ampliação do acesso e equidade na rede.",
    "content": "<h3>Todas as Regiões Lado a Lado</h3><p>Comparativo das dimensões que mais pesam em cada sistema de saúde quando decidem se uma tecnologia em saúde digital vale a pena:</p><table class=\"regions-comparison-table\"><thead><tr><th>Região</th><th>Efetividade Clínica</th><th>Eficiência Econômica</th><th>Paciente & Sociedade</th><th>Acesso & Equidade</th><th>Sustentabilidade</th></tr></thead><tbody><tr><td><b>EUA</b></td><td>⭐⭐⭐</td><td>⭐⭐⭐</td><td>⭐</td><td>⭐</td><td>⭐⭐⭐</td></tr><tr><td><b>Canadá</b></td><td>⭐⭐⭐</td><td>⭐⭐</td><td>⭐⭐⭐</td><td>⭐⭐⭐</td><td>⭐⭐⭐</td></tr><tr><td><b>Reino Unido</b></td><td>⭐⭐⭐</td><td>⭐⭐⭐</td><td>⭐⭐⭐</td><td>⭐⭐</td><td>⭐⭐</td></tr><tr><td><b>Alemanha</b></td><td>⭐⭐⭐</td><td>⭐</td><td>⭐⭐</td><td>⭐</td><td>⭐</td></tr><tr><td><b>América Latina</b></td><td>⭐</td><td>⭐⭐</td><td>⭐</td><td>⭐⭐⭐</td><td>⭐⭐</td></tr><tr><td><b>Ásia (Renda Baixa)</b></td><td>⭐</td><td>⭐⭐</td><td>⭐</td><td>⭐⭐⭐</td><td>⭐</td></tr></tbody></table><p><small>Legenda: ⭐⭐⭐ Ênfase Principal | ⭐⭐ Ênfase Moderada | ⭐ Ênfase Limitada</small></p>"
  },
  {
    "id": "slide_2_11",
    "title": "Na Prática: O Que os Livros Dizem vs. O Que Acontece",
    "image": "/slides/aula2/slide_11.png",
    "block": "Bloco 1: Realidade de Mercado",
    "estimatedTime": "3 min",
    "notes": "<strong>Fala sugerida:</strong> Há um abismo entre o que os livros acadêmicos ensinam e o que o tomador de decisão nos hospitais pergunta no dia a dia. Enquanto o meio acadêmico debate custo-utilidade em QALY, a diretoria de um hospital quer saber: 'qual é o payback?'. No Brasil, o ROI de curto prazo de IA tem sido demonstrado na redução de até 35% de glosas administrativas. E na radiologia, o ROI calculado chegou a quase 800% porque liberou o tempo de laudo dos radiologistas seniores para casos complexos.",
    "content": "<h3>O Que os Livros Dizem vs. O Que Acontece</h3><p>Enquanto órgãos reguladores e diretrizes exigem estudos de custo-efetividade complexos e de longo prazo, os tomadores de decisão locais operam sob forte pressão pragmática.</p><ul><li><b>A Pergunta Real do Comitê:</b> \"Em quantos meses esse projeto se paga (payback)?\"</li><li><b>Caso do Brasil (2025-2026):</b> O retorno real veio de ganhos de faturamento e auditoria de glosas (redução de até 35% nas glosas em hospitais privados com payback de 12 a 18 meses). IA em laudos de radiologia gerou ROI expressivo de 791% ao computar a economia de horas de trabalho médico especializado.</li><li><b>Alemanha:</b> Embora o modelo regulatório DiGA seja referência acadêmica mundial, a barreira do fluxo de trabalho fez com que apenas 4% dos médicos engajassem com a prescrição ativa de apps.</li></ul>"
  },
  {
    "id": "slide_2_12",
    "title": "Por Que Avaliar IA É Mais Difícil que um Medicamento?",
    "image": "/slides/aula2/slide_12.png",
    "block": "Bloco 1: Desafios da IA",
    "estimatedTime": "4 min",
    "notes": "<strong>Fala sugerida:</strong> Avaliar uma IA na saúde é muito mais complexo do que avaliar um novo medicamento. Um remédio tem uma molécula química estável que não muda. A IA se atualiza constantemente. Além disso, o custo inicial de instalação do software e integrações é alto, fazendo com que pilotos pareçam sempre inviáveis — o ROI real só se prova na escala. Por fim, a IA altera o comportamento do profissional de saúde, o que muda o fluxo de processos que estamos tentando medir, tornando a linha de base de comparação móvel.",
    "content": "<h3>Por Que Avaliar IA É Mais Difícil que um Medicamento?</h3><p>Medicamentos possuem moléculas estáveis e um padrão de cuidado fixo. O software em saúde viola ambas as premissas, criando 5 desafios principais:</p><ol><li><b>A Escala Altera o Retorno:</b> Projetos pilotos são sempre muito caros proporcionalmente. O retorno econômico real só surge com a escala operacional (como a queda de custo de telemedicina no Brasil com o ganho de escala).</li><li><b>Produtos em Evolução Contínua:</b> Algoritmos de IA mudam e atualizam constantemente. Como avaliar o ROI de longo prazo de um sistema que se atualiza e aprende a cada mês?</li><li><b>Comparador em Movimento:</b> O fluxo de trabalho clínico que serve como base de comparação muda à medida que a própria IA é implantada.</li><li><b>Desfechos Além da Sobrevida:</b> IA em saúde gera valor em usabilidade, precisão diagnóstica secundária e diminuição da fadiga médica, dimensões difíceis de precificar financeiramente.</li></ol>"
  },
  {
    "id": "slide_2_13",
    "title": "Dinâmica · Desafios Regulatórios e Incorporação",
    "image": "/slides/aula2/slide_13.png",
    "block": "Bloco 1: Dinâmica",
    "estimatedTime": "10 min",
    "isInteractive": true,
    "interactionType": "poll_ab",
    "question": "Se sua organização adotasse IA amanhã, qual das cinco dimensões de valor pesaria mais na decisão?",
    "options": [
      "Efetividade Clínica",
      "Eficiência Econômica / ROI",
      "Valor para o Paciente & Sociedade",
      "Acesso e Equidade",
      "Sustentabilidade"
    ],
    "notes": "<strong>Fala sugerida:</strong> Vamos abrir agora uma enquete interativa no portal. Quero que cada um vote: se sua organização adotasse uma IA amanhã, qual das cinco dimensões de valor pesaria mais na decisão (Efetividade Clínica, Eficiência Econômica, Valor para o Paciente, Acesso/Equidade ou Sustentabilidade)? Respondam no portal e acompanharemos os resultados ao vivo.",
    "content": "<h3>Dinâmica · Desafios Regulatórios e Incorporação</h3><p>Qual das cinco dimensões de valor pesaria mais na decisão da sua organização?</p><p>Vote no portal.</p>"
  },
  {
    "id": "slide_2_14",
    "title": "O que é um Teste de Estresse Financeiro",
    "image": "/slides/aula2/slide_14.png",
    "block": "Bloco 1: Testes de Estresse",
    "estimatedTime": "8 min",
    "notes": "<strong>Fala sugerida:</strong> Um teste de estresse financeiro consiste em simular a resiliência orçamentária do projeto diante das piores premissas possíveis antes do GO. O cálculo nominal do ROI do fornecedor assume sempre um mundo perfeito. O teste de estresse força três perguntas: E se a adoção clínica cair pela metade? E se a rede precisar de upgrade? E se houver obra?",
    "content": "<h3>O que é um Teste de Estresse Financeiro?</h3><p><b>Definição:</b> Avaliar a resiliência orçamentária do projeto simulando as piores premissas possíveis de custos e adoção assistencial.</p><p>As 3 perguntas-chave do teste de estresse:</p><ol><li>E se a adoção clínica do corpo médico cair para 50%?</li><li>E se a rede precisar de upgrade de infraestrutura?</li><li>E se houver necessidade de obras civis e adequação física?</li></ol>"
  },
  {
    "id": "slide_2_15",
    "title": "Custos Ocultos de Infraestrutura",
    "image": "/slides/aula2/slide_15.png",
    "block": "Bloco 1: Testes de Estresse",
    "estimatedTime": "6 min",
    "notes": "<strong>Fala sugerida:</strong> A fundação que sustenta o projeto de IA não aparece na fatura do software. O custo do software raramente é o maior custo do projeto. Abaixo do nível do solo, temos rede e conectividade, integração com o prontuário eletrônico (EHR), obras civis, treinamento e mudança de processos, cibersegurança, suporte e monitoramento contínuo do modelo. Ignorar isso é o que destrói o ROI real.",
    "content": "<h3>Custos Ocultos de Infraestrutura</h3><p>A fundação que sustenta o projeto não aparece na fatura de software.</p><p>Custos abaixo do nível do solo:</p><ul><li>Rede e conectividade</li><li>Integração com o prontuário (EHR)</li><li>Obras civis e adequação física</li><li>Treinamento e mudança de processo</li><li>Cibersegurança e conformidade</li><li>Suporte, manutenção e monitoramento contínuo</li></ul>"
  },
  {
    "id": "slide_2_16",
    "title": "Caso Integrado · Telemetria em Leitos",
    "image": "/slides/aula2/slide_16.png",
    "block": "Bloco 2: ROI Invisível",
    "estimatedTime": "8 min",
    "notes": "<strong>Fala sugerida:</strong> Analisemos a telemetria em leitos gerais. Adquirir sensores de monitoramento de sinais vitais por IA parece um investimento simples. O custo oculto no caso estudado (R$ 1,5 milhão) envolveu readequar a rede física Wi-Fi do hospital para suportar os dados ininterrompidamente em tempo real (risco técnico de latência), além de criar uma central integrada de enfermagem para receber alertas (risco operacional). Sem essas duas readequações físicas e estruturais, os patches clínicos perdem toda a finalidade diagnóstica e viram puro desperdício de capital.",
    "content": "<h3>Caso Integrado: Telemetria em Leitos</h3><p><b>O Caso:</b> Solução de telemetria promissora e bem avaliada clinicamente. Custo oculto: a infraestrutura de rede e monitoramento central — não apenas os sensores.</p><p><b>Lastro Real (Brasil):</b> A reinauguração da UTI do Hospital Regional de Sobradinho (DF), com monitoramento central, telemetria e leitos adaptados, somou cerca de R$ 1,5 milhão. Telemetria exige investimento estrutural, não apenas compra de equipamentos.</p>"
  },
  {
    "id": "slide_2_17",
    "title": "Coragem Analítica vs. Moda Tecnológica",
    "image": "/slides/aula2/slide_17.png",
    "block": "Bloco 2: ROI Invisível",
    "estimatedTime": "8 min",
    "isInteractive": true,
    "interactionType": "open_ended",
    "question": "Qual custo oculto você mais subestima nos seus projetos e por quê?",
    "notes": "<strong>Fala sugerida:</strong> Respondam na dinâmica síncrona: qual custo oculto você mais subestima nos seus projetos e por quê? Preterir a solução moderna em favor da que funciona na infraestrutura instalada exige coragem analítica. Reconhecer o ponto cego é o primeiro passo da mitigação.",
    "content": "<h3>Coragem Analítica vs. Moda Tecnológica</h3><p>Qual custo oculto você mais subestima nos seus projetos e por quê?</p><p>Responda no mural do portal para debatermos as respostas mais votadas pela turma.</p>"
  },
  {
    "id": "slide_2_18",
    "title": "Caso Real Internacional · Google DermAssist",
    "image": "/slides/aula2/slide_18.png",
    "block": "Bloco 2: ROI Invisível",
    "estimatedTime": "8 min",
    "notes": "<strong>Fala sugerida:</strong> O Google DermAssist é um grande exemplo de risco regulatório no cotidiano. O sistema sugere potenciais condições de pele a partir de fotos feitas pelo paciente e um questionário de sintomas. No entanto, o sistema obteve marcação CE europeia mas enfrentou cautelas e barreiras regulatórias nos EUA. Além disso, surgiram questionamentos éticos sobre o viés de desempenho em tons de pele mais escuros. Um exemplo claro de como riscos regulatórios e de conformidade de algoritmos impactam o go-to-market comercial.",
    "content": "<h3>Caso Real Internacional: Google DermAssist</h3><p>Ferramenta de IA dermatológica que sugere condições a partir de foto e sintomas. Marcação CE Classe I na UE; não avaliada pela FDA; não é diagnóstico.</p><p><b>Risco de Viés e Validação:</b> Críticas pela baixa representação de tons de pele mais escuros (risco de viés), validação clínica limitada e risco de autodiagnóstico. A due diligence exige perguntar se a IA foi validada no seu público antes de assinar.</p>"
  },
  {
    "id": "slide_2_19",
    "title": "O Erro do ROI de Curto Prazo",
    "image": "/slides/aula2/slide_19.png",
    "block": "Bloco 2: ROI Invisível",
    "estimatedTime": "5 min",
    "notes": "<strong>Fala sugerida:</strong> Aqui mora um dos vieses mais caros da gestão de saúde: olhar só a planilha do mês seguinte. Um projeto de prevenção, como triagem precoce ou telemetria contínua, raramente devolve o investimento no primeiro trimestre. Os benefícios de prevenção aparecem no ano 2 ou 3, quando a curva de eventos evitados começa a compensar o investimento inicial. Em saúde digital, avaliações de curto prazo tendem a rejeitar exatamente os projetos que mais protegem a instituição no longo prazo.",
    "content": "<h3>O Erro do ROI de Curto Prazo</h3><p>Avaliar projetos de IA apenas pelo fluxo de caixa do primeiro ano penaliza inovações voltadas a ganho de segurança de longo prazo.</p><p>Os maiores benefícios de IA em saúde (evitar readmissões, prevenir sepse) geram valor incremental contínuo em prazos superiores a 24 meses.</p>"
  },
  {
    "id": "slide_2_20",
    "title": "Riscos Invisíveis · Parte 1",
    "image": "/slides/aula2/slide_20.png",
    "block": "Bloco 2: ROI Invisível",
    "estimatedTime": "6 min",
    "notes": "<strong>Fala sugerida:</strong> Os riscos invisíveis de maior peso clínico e financeiro em IA na saúde são as falhas de suporte à decisão que induzem a erros de medicação e eventos adversos severos. No fluxo hospitalar comum, cada evento adverso grave tem um custo estimado alto (diária em UTI adicional, exames repetidos, novas terapias). Evitar esses eventos por meio de alertas inteligentes da IA é uma receita real indireta de alta tração financeira. Além disso, falhas de registro geram glosas de convênios que corroem silenciosamente a receita.",
    "content": "<h3>Riscos Invisíveis · Parte 1</h3><p><b>Erros de Medicação e Eventos Adversos:</b> Custos clínicos diretos adicionais (hotelaria prolongada, UTI) e glosas no repasse que corroem o fluxo financeiro.</p><p><b>Glosas de Convênios:</b> Falhas de registro geram glosas que não aparecem na planilha do projeto, mas corroem o resultado financeiro.</p>"
  },
  {
    "id": "slide_2_21",
    "title": "Riscos Invisíveis · Parte 2",
    "image": "/slides/aula2/slide_21.png",
    "block": "Bloco 2: ROI Invisível",
    "estimatedTime": "6 min",
    "notes": "<strong>Fala sugerida:</strong> A segunda camada dos riscos invisíveis são as repercussões jurídicas e de responsabilidade civil. Um erro de medicação induzido por um falso negativo da IA pode resultar em processos indenizatórios judiciais complexos e multas. A contratação de seguros de responsabilidade profissional e a assessoria jurídica dedicada para inovações em IA clínica são despesas operacionais (OPEX) reais que devem constar no cálculo de viabilidade. Adicione a isso os custos de reputação e o retrabalho operacional.",
    "content": "<h3>Riscos Invisíveis · Parte 2</h3><p><b>Custos Jurídicos:</b> Processos de indenização por desfechos clínicos adversos induzidos ou não detectados por suporte algorítmico.</p><p><b>Imagem e Reputação:</b> Custos de reputação institucional são difíceis de quantificar, mas devastadores quando materializados.</p><p><b>Retrabalho Operacional:</b> Ineficiências geradas por soluções mal implantadas que consomem tempo e recursos fora do orçamento.</p>"
  },
  {
    "id": "slide_2_22",
    "title": "Transformar Prevenção em Valor",
    "image": "/slides/aula2/slide_22.png",
    "block": "Bloco 2: ROI Invisível",
    "estimatedTime": "8 min",
    "notes": "<strong>Fala sugerida:</strong> Como monetizamos a prevenção? A fórmula mental para calcular o valor gerado indiretamente por prevenção de perdas (Loss Avoidance) é: frequência histórica anual do evento multiplicada pelo custo financeiro médio de cada evento, ponderado pela eficácia esperada do sistema de IA. Exemplo prático do cotidiano: se o hospital tem 100 erros de dispensação de alto custo por ano, e cada erro custa R$ 5 mil em desperdício e retratamento, e a IA da farmácia evita 80% deles, a economia gerada é de R$ 400 mil anuais.",
    "content": "<h3>Transformar Prevenção em Valor</h3><p><b>Fórmula de Prevenção de Perda (Loss Avoidance):</b></p><p>$$\\text{Valor Evitado} = (\\text{Freq. Evento}) \\times (\\text{Custo do Evento}) \\times (\\text{Taxa Eficácia IA})$$</p><p>Adicione os riscos evitados ao retorno direto da solução para obter o ROI abrangente. Lembre-se: ROI defensável é ROI auditável, com premissas explícitas.</p>"
  },
  {
    "id": "slide_2_23",
    "title": "Caso Integrado · Automação de Farmácia",
    "image": "/slides/aula2/slide_23.png",
    "block": "Bloco 2: ROI Invisível",
    "estimatedTime": "8 min",
    "notes": "<strong>Fala sugerida:</strong> Automação de farmácia é um dos casos mais diretos de ROI abrangente, porque cada erro de dispensação evitado tem valor financeiro e clínico simultâneo. Dispensadores robóticos reduzem o erro humano de troca de medicamento e dose, mas o retorno real depende de dois fatores que a proposta comercial raramente detalha: a integração com o sistema de prescrição legado, que se falhar propaga o erro em vez de eliminá-lo, e a curva de confiança da equipe farmacêutica, que pode resistir ao novo fluxo de trabalho. O benefício técnico só vira ROI quando os dois se resolvem.",
    "content": "<h3>Caso Integrado: Automação de Farmácia</h3><p><b>O Caso:</b> Automação reduz erros de dispensação e perdas de medicação. Erros e perdas evitados se convertem diretamente em valor financeiro.</p><p><b>Lastro Real (Brasil):</b> Informatização da logística de farmácia reduziu perdas por validade em 47,9% e compras emergenciais em 70% (JBES, 2022). Em outro hospital, devoluções de medicamentos após dispensação custaram R$ 2,87 milhões (RSD, 2021).</p>"
  },
  {
    "id": "slide_2_24",
    "title": "Caso Integrado · Como a Prevenção Vira ROI",
    "image": "/slides/aula2/slide_24.png",
    "block": "Bloco 2: ROI Invisível",
    "estimatedTime": "8 min",
    "notes": "<strong>Fala sugerida:</strong> Este slide resume visualmente o fluxo da farmácia onde a prevenção vira ROI. À esquerda, temos a automação com dispensários eletrônicos que garantem armazenamento seguro, controle e dispensação auditável. À direita, a rastreabilidade informatizada que reduz retrabalho e perdas por validade em 47.9% e compras emergenciais em 70%.",
    "content": "<h3>Caso Integrado: Como a Prevenção vira ROI</h3><p>Fluxograma de valor na farmácia hospitalar:</p><ul><li><b>Dispensário Eletrônico:</b> Armazenamento seguro, dispensação correta e auditável, rastreabilidade completa.</li><li><b>Rastreabilidade Informatizada:</b> Identificação, registro, integração e relatórios de auditoria.</li><li><b>Impacto:</b> Redução de 47,9% em perdas por validade e de 70% em compras emergenciais.</li></ul>"
  },
  {
    "id": "slide_2_25",
    "title": "Dinâmica · Cálculo de ROI Abrangente",
    "image": "/slides/aula2/slide_25.png",
    "block": "Trabalho em Grupo",
    "estimatedTime": "40 min",
    "notes": "<strong>Fala sugerida:</strong> Hora de trabalhar nos simuladores dos comitês. Acessem o portal nos seus grupos. Utilizem o simulador de ROI abrangente inserindo as premissas econômicas do cenário do seu comitê, avaliem o VPL em cenários otimistas e sob estresse de adoção e enviem a análise financeira.",
    "content": "<h3>Dinâmica: Simulação Financeira nos Comitês</h3><p>Trabalho Prático em Grupo: Acesse o simulador de ROI no portal, preencha as premissas econômicas de CAPEX, OPEX e riscos, e envie a análise de viabilidade do comitê.</p><ol><li>Receba o cenário do comitê</li><li>Calcule o ROI convencional</li><li>Adicione os riscos invisíveis</li><li>Apresente a diferença do ROI real</li></ol>"
  },
  {
    "id": "slide_2_26",
    "title": "Debrief · O Que Mudou o Resultado",
    "image": "/slides/aula2/slide_26.png",
    "block": "Estudo de Caso",
    "estimatedTime": "15 min",
    "notes": "<strong>Fala sugerida:</strong> Parabéns pelas submissões financeiras. O Grupo 4 concluiu pela inviabilidade no cenário realista devido ao alto CAPEX e custo de manutenção, enquanto o Grupo 1 justificou a resiliência do payback mesmo sob baixa adoção. Vamos debater estas conclusões estratégicas.",
    "content": "<h3>Debrief: O que alterou o VPL do projeto?</h3><p>Análise comparativa das taxas de payback e VPL alcançados nos simuladores por cada equipe sob cenários de estresse de engajamento.</p><p>Compare o ROI só visível com o ROI abrangente: a mesma solução muda de veredito quando o invisível entra na conta.</p>"
  },
  {
    "id": "slide_2_27",
    "title": "Reflexão Final",
    "image": "/slides/aula2/slide_27.png",
    "block": "Fechamento",
    "estimatedTime": "8 min",
    "isInteractive": true,
    "interactionType": "open_ended",
    "question": "Qual variável financeira ou operacional passou a ser prioritária na sua análise de viabilidade de projetos?",
    "notes": "<strong>Fala sugerida:</strong> Peço que respondam no painel, em uma palavra: o que vocês passam a enxergar agora que antes era invisível? Não precisa ser sofisticado. Pode ser 'adoção', pode ser 'infraestrutura', pode ser 'glosa'. O que importa é que, a partir de hoje, esse termo vai aparecer na cabeça de vocês toda vez que alguém apresentar um ROI bonito demais para ser verdade.",
    "content": "<h3>Reflexão Final</h3><p>Responda no portal: Em uma palavra, o que você passa a enxergar agora que antes era invisível?</p><p>As palavras de todos formarão uma nuvem de palavras ao vivo.</p>"
  },
  {
    "id": "slide_2_28",
    "title": "Síntese e Ponte para a Aula 3",
    "image": "/slides/aula2/slide_28.png",
    "block": "Encerramento",
    "estimatedTime": "5 min",
    "notes": "<strong>Fala sugerida:</strong> Em síntese, o engajamento assistencial do usuário final é a variável crítica do ROI real, e a precificação de riscos deve compor a planilha orçamentária do projeto de forma transparente. Preparem-se para as diretrizes de governança da Aula 3.",
    "content": "<h3>Takeaways da Aula 2</h3><ul><li>ROI observado depende da taxa de adoção do corpo clínico.</li><li>Cálculo de Loss Avoidance quantifica financeiramente a segurança assistencial.</li><li>O teste de estresse define o ponto de quebra antes de empenhar capital.</li></ul><p>O veto dos dados: escolha a solução que os dados aprovam, e não a que o marketing vende.</p>"
  },
  {
    "id": "slide_2_29_ref",
    "title": "Referências e Fontes da Aula",
    "image": "/slides/aula2/slide_29.png",
    "block": "Encerramento",
    "estimatedTime": "2 min",
    "notes": "<strong>Fala sugerida:</strong> As referências bibliográficas do Bloco 2 de modelagem econômico-financeira sob risco estão disponíveis no portal. Todos os links acadêmicos e estudos de caso nacionais encontram-se ativos para consulta e citação nos relatórios finais.",
    "content": "<h3>Referências Bibliográficas</h3><ul><li>Google DermAssist: <a href=\"https://blog.google/technology/health/ai-dermatology-preview-io-2021\" target=\"_blank\">Blog Google (2021)</a> & <a href=\"https://www.wired.com/story/google-ai-skin-conditions-medical-device/\" target=\"_blank\">WIRED (2021)</a></li><li>Telemetria: <a href=\"https://www.correiobraziliense.com.br\" target=\"_blank\">UTI Hospital Regional de Sobradinho (2026)</a></li><li>IA em dermatologia: <a href=\"https://arxiv.org/abs/2106.07725\" target=\"_blank\">Disparidades por tom de pele, arXiv (2021)</a></li><li>Farmácia: <a href=\"https://www.ahrq.gov/health-it/tools-and-resources/costs-and-benefits-toolkit.html\" target=\"_blank\">JBES (2022) e RSD (2021)</a></li></ul>"
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
        "notes": "<strong>Fala sugerida:</strong> Boas-vindas ao nosso terceiro encontro. Hoje consolidaremos a governança institucional de inovação. Vamos aprender a converter nossa modelagem financeira e análise de riscos em um Business Case executivo qualificado para apresentação em diretoria. Como diz nosso mantra, vamos transitar 'da convicção técnica à prova matemática que convence o conselho'.",
        "content": "<h3>Governança, Tomada de Decisão e Business Case</h3><p>Mantra: \"Da convicção técnica à prova matemática que convence o conselho.\"</p><p>Objetivo: Capacitar o aluno a traduzir riscos e ROI para a linguagem do C-level, posicionando segurança do paciente como ativo financeiro.</p><p>Professora: Dra. Faila Pereira • MBA em IA na Saúde • Moinhos de Vento</p>"
      },
      {
        "id": "slide_3_2",
        "title": "Icebreaker • O que Trava a Alta Gestão",
        "image": "/slides/aula3/slide_2.png",
        "block": "Abertura",
        "estimatedTime": "8 min",
        "isInteractive": true,
        "interactionType": "wordcloud",
        "question": "Em uma palavra, o que mais trava a aprovação de um bom projeto para a alta gestão?",
        "notes": "<strong>Fala sugerida:</strong> Para iniciar de forma interativa, peço que acessem o portal e respondam em uma palavra: o que mais trava a aprovação de um bom projeto na alta gestão da sua instituição? Vamos ver a nuvem de palavras se formar ao vivo. Isso nos ajudará a discutir os gargalos de governança e comunicação que enfrentamos no dia a dia.",
        "content": "<h3>Icebreaker · O que Trava a Alta Gestão</h3><p>Em uma palavra, o que mais trava a aprovação de um bom projeto para a alta gestão?</p><p>Responda no portal para gerar a nuvem de palavras em tempo real.</p>"
      },
      {
        "id": "slide_3_3",
        "title": "Objetivos e Agenda • Aula 3",
        "image": "/slides/aula3/slide_3.png",
        "block": "Introdução",
        "estimatedTime": "5 min",
        "notes": "<strong>Fala sugerida:</strong> Hoje consolidaremos nosso conhecimento. Nossa agenda inclui: Bloco 1 sobre como estruturar uma comunicação executiva sólida e o caso Mayo Clinic; Bloco 2 cobrindo a Matriz de Decisão Multifatorial e o cálculo de pontuação ponderada; e finalmente nosso Workshop para o Projeto Prático em Grupo. Lembro que este trabalho prático equivale a 35% da nota final — é a maior alavanca avaliativa da nossa disciplina, por isso aproveitem o workshop de hoje ao máximo.",
        "content": "<h3>Objetivos e Agenda • Aula 3</h3><p><b>O que você vai saber:</b> Estruturar um business case completo e uma matriz de decisão multifatorial para apresentar ao conselho.</p><p><b>Agenda:</b> Comunicação executiva + caso Mayo Clinic + matriz de decisão + workshop do projeto final.</p><p><b>Peso avaliativo:</b> Esta aula prepara diretamente o Projeto Prático em Grupo (35% da nota), a maior alavanca avaliativa da disciplina.</p>"
      },
      {
        "id": "slide_3_4",
        "title": "Falar a Língua dos Stakeholders Financeiros",
        "image": "/slides/aula3/slide_4.png",
        "block": "Linguagem de Negócios",
        "estimatedTime": "6 min",
        "notes": "<strong>Fala sugerida:</strong> Para falar a língua dos tomadores de decisão financeira, siga sempre três passos cruciais nesta exata ordem: primeiro, objetividade — inicie pela perda evitada e pelo desfecho clínico mensurável, não pela tecnologia em si; segundo, evidência — apresente números defensáveis e lastreados em premissas claras e auditáveis que o CFO reconheça; terceiro, mitigação de perdas — demonstre como os riscos foram precificados e mapeados. Essa estrutura lógica é o que separa um pitch publicitário de uma decisão técnica protegida.",
        "content": "<h3>Falar a Língua dos Stakeholders Financeiros</h3><p><b>1. Objetividade:</b> Comece pela perda evitada, não pela tecnologia. Menos adjetivos, mais números com premissa clara.</p><p><b>2. Evidência:</b> Traduzir risco clínico em impacto financeiro auditável. Linguagem que o CFO reconhece.</p><p><b>3. Mitigação de Perdas:</b> Essa é a ordem: objetividade, evidência e mitigação de perdas. Nessa sequência, o argumento convence.</p>"
      },
      {
        "id": "slide_3_5",
        "title": "Do Marketing à Prova Matemática",
        "image": "/slides/aula3/slide_5.png",
        "block": "Linguagem de Negócios",
        "estimatedTime": "6 min",
        "notes": "<strong>Fala sugerida:</strong> Para convencer o conselho, precisamos transitar do discurso atrativo de marketing para a rigidez da prova matemática. Esse fluxo é composto por 5 etapas claras: 1) Qual é o problema assistencial e operacional quantificado; 2) Custo do problema (quanto o hospital perde por não resolvê-lo hoje); 3) A solução tecnológica exata; 4) O ROI abrangente e robusto; e 5) O risco mitigado pelo projeto. Substituam palavras vazias como 'inovador' por dados auditáveis e antecipem a pergunta difícil do CFO antes que ele a faça.",
        "content": "<h3>Do Marketing à Prova Matemática</h3><p><i>\"Justificar investimento complexo é ir do marketing à prova matemática.\"</i></p><ol><li><b>Problema:</b> Qual é o problema quantificado?</li><li><b>Custo do Problema:</b> Quanto custa não resolver?</li><li><b>Solução:</b> O que a tecnologia faz?</li><li><b>ROI:</b> Qual o retorno abrangente?</li><li><b>Risco Mitigado:</b> O que deixa de acontecer?</li></ol><p>Substitua \"inovador\" e \"líder de mercado\" por números defensáveis. Antecipe a pergunta difícil do CFO antes que ele a faça.</p>"
      },
      {
        "id": "slide_3_6",
        "title": "Anatomia de um Business Case Vencedor",
        "image": "/slides/aula3/slide_6.png",
        "block": "Linguagem de Negócios",
        "estimatedTime": "6 min",
        "notes": "<strong>Fala sugerida:</strong> A anatomia de um business case de sucesso baseia-se em uma regra prática: o conselho decide pela primeira página; o resto é anexo técnico para defesa. Essa primeira página deve conter um Sumário Executivo resumindo a decisão em poucas linhas, o Problema Quantificado (custo do gargalo hoje), a Solução Proposta (o que será implementado), a Análise de Risco (aparentes e ocultos), o ROI Abrangente com os cenários base, conservador e otimista, e a Recomendação final de GO ou NO-GO.",
        "content": "<h3>Anatomia de um Business Case Vencedor</h3><p>Uma página que o conselho leria:</p><ol><li><b>Sumário executivo:</b> a decisão em poucas linhas</li><li><b>Problema quantificado:</b> o custo do problema hoje</li><li><b>Solução proposta:</b> o que será implementado</li><li><b>Análise de risco:</b> riscos aparentes e ocultos</li><li><b>ROI abrangente:</b> com cenários base, conservador e otimista</li><li><b>Recomendação:</b> a tese de investimento</li></ol><p><i>O conselho decide pela primeira página; o resto é defesa.</i></p>"
      },
      {
        "id": "slide_3_7",
        "title": "Qual Argumento Convence Seu CFO?",
        "image": "/slides/aula3/slide_7.png",
        "block": "Linguagem de Negócios",
        "estimatedTime": "12 min",
        "isInteractive": true,
        "interactionType": "open_ended",
        "question": "Escreva o argumento de uma frase que mais convenceria o seu CFO.",
        "notes": "<strong>Fala sugerida:</strong> Agora é a sua vez de praticar no portal. Escrevam uma única frase que represente o argumento mais persuasivo para o CFO da sua instituição. Lembrem-se de unir um dado financeiro ao risco evitado ou à segurança do paciente. Vocês poderão votar nos argumentos dos colegas, e os mais curtidos virarão referência para o projeto final de cada grupo.",
        "content": "<h3>Qual Argumento Convence Seu CFO?</h3><p>Escreva o argumento de uma frase que mais convenceria o seu CFO. A turma curte os mais fortes.</p><p>Os argumentos mais curtidos costumam unir número + risco evitado + segurança do paciente. Responda no portal para gerar o mural dinâmico.</p>"
      },
      {
        "id": "slide_3_8",
        "title": "Caso Real Internacional • Mayo Clinic (AI-ECG)",
        "image": "/slides/aula3/slide_8.png",
        "block": "Estudo de Caso",
        "estimatedTime": "8 min",
        "notes": "<strong>Fala sugerida:</strong> O ensaio clínico EAGLE da Mayo Clinic é nossa grande referência de governança em saúde digital. Eles testaram um algoritmo de IA no ECG para detectar disfunção ventricular esquerda (baixa fração de ejeção) no mundo real, abrangendo 22.641 pacientes. A detecção foi 32% maior no grupo com IA do que no cuidado padrão, e estudos subsequentes comprovaram o excelente custo-efetividade da tecnologia. Isso ilustra o casamento ideal de um problema clínico bem delimitado, desfecho mensurável de valor, perfeita integração no fluxo diário e avaliação econômica formal. Um verdadeiro contraexemplo ao caso IBM Watson que vimos no início.",
        "content": "<h3>Caso Real Internacional · Mayo Clinic AI-ECG (EAGLE)</h3><p>Algoritmo de IA no ECG para detectar baixa fração de ejeção, testado em ensaio pragmático no mundo real.</p><p><b>Resultados:</b> 22.641 adultos, 45 instituições; detecção de baixa fração de ejeção 32% maior que no cuidado usual. Estudo posterior comprovou custo-efetividade.</p><p><b>Na ótica da disciplina:</b> problema bem definido + desfecho mensurável + integração ao fluxo + avaliação econômica = business case que se sustenta no conselho.</p>"
      },
      {
        "id": "slide_3_9",
        "title": "Lastro Real (Brasil) • IA Clínica em Ação",
        "image": "/slides/aula3/slide_9.png",
        "block": "Estudo de Caso",
        "estimatedTime": "8 min",
        "notes": "<strong>Fala sugerida:</strong> No cenário nacional, temos dois grandes exemplos de lastro real. O primeiro é o Robô Laura de combate à sepse, que reduziu o tempo médio entre a suspeita de infecção e a primeira dose de antibiótico de 13 horas para 2h58, demonstrando impacto clínico direto de sobrevida e economia com redução de internações. O segundo é a tecnologia Neonpass Room (Einstein e HOOBOX), que provou por meio de monitoramento que 64,6% dos chamados de leito dos pacientes eram demandas puramente administrativas e hoteleiras, e não assistenciais, permitindo realocar o tempo precioso da enfermagem para o cuidado direto. Ambos mostram que o valor reside no redesenho do processo impulsionado pela IA.",
        "content": "<h3>Lastro Real (Brasil) · IA Clínica em Ação</h3><p><b>Robô Laura (Sepse):</b> Reduziu o tempo entre suspeita e antibiótico de 13h para 2h58 — impacto clínico e financeiro direto e mensurável.</p><p><b>Neonpass Room (Einstein/HOOBOX):</b> Roteou solicitações de pacientes e mostrou que apenas 35,4% exigiam a enfermagem, devolvendo tempo ao cuidado direto (64,6% dos chamados eram administrativos).</p>"
      },
      {
        "id": "slide_3_10",
        "title": "Além do Preço",
        "image": "/slides/aula3/slide_10.png",
        "block": "Matriz de Decisão",
        "estimatedTime": "6 min",
        "notes": "<strong>Fala sugerida:</strong> Um erro clássico em compras hospitalares é focar exclusivamente no custo inicial de aquisição (CAPEX). Lembrem-se: a solução de menor preço de tabela pode se tornar a mais cara no horizonte de 3 anos devido a falhas de usabilidade, altos custos de customização técnica, suporte ineficiente ou interrupções assistenciais (SLA fraco). Devemos tratar preço como apenas um dos critérios da decisão, integrar segurança assistencial de forma explícita na avaliação e medir o Custo Total de Propriedade (TCO).",
        "content": "<h3>Além do Preço</h3><p><i>\"A solução mais barata pode ser a mais cara no horizonte de 3 anos.\"</i></p><p><b>Preço é um critério:</b> Não é o critério. Preço baixo com risco alto é armadilha — quebre essa âncora antes de pontuar qualquer solução.</p><p><b>Segurança assistencial:</b> Integrar segurança do paciente como critério explícito na decisão de compra — não como pressuposto implícito.</p><p><b>Viabilidade de longo prazo:</b> Avaliar o custo total de propriedade (TCO) em 3 anos, não apenas o investimento inicial.</p>"
      },
      {
        "id": "slide_3_11",
        "title": "Construindo a Matriz de Decisão Ponderada",
        "image": "/slides/aula3/slide_11.png",
        "block": "Matriz de Decisão",
        "estimatedTime": "6 min",
        "notes": "<strong>Fala sugerida:</strong> Para garantir uma escolha técnica isenta e blindada contra preferências pessoais ou emocionais do comitê, o truque principal de governança é: defina os critérios e, principalmente, os pesos de relevância corporativa de cada um ANTES de olhar para as propostas e pontuar as alternativas. Isso anula o viés de confirmação. Nesta tabela vemos os 6 critérios sugeridos: Custo Total (15%), ROI Abrangente (25%), Risco Operacional (15%), Segurança Assistencial (25%), Integração ao Fluxo (10%) e Escalabilidade (10%).",
        "content": "<h3>Construindo a Matriz de Decisão Ponderada</h3><p><b>Matriz de Decisão Multifatorial:</b> Calcule a pontuação ponderada e identifique a solução vencedora.</p><p><b>Critérios de Avaliação (Exemplo):</b> 1. Custo total (15%), 2. ROI abrangente (25%), 3. Risco operacional (15%), 4. Segurança assistencial (25%), 5. Integração ao fluxo (10%), 6. Escalabilidade (10%).</p><p><i>Defina os pesos ANTES de pontuar para evitar viés de confirmação. Esse é o truque de governança que protege a decisão.</i></p>"
      },
      {
        "id": "slide_3_12",
        "title": "Como Calcular a Pontuação Ponderada",
        "image": "/slides/aula3/slide_12.png",
        "block": "Matriz de Decisão",
        "estimatedTime": "6 min",
        "notes": "<strong>Fala sugerida:</strong> Vamos ver a matemática por trás da Matriz de Decisão. O cálculo é simples: 1) Definir os critérios e pesos (ex: ROI abrangente = 25% ou 0,25); 2) Pontuar cada fornecedor com uma nota de 1 a 5; 3) Multiplicar a nota pelo peso decimal para achar o resultado ponderado; e 4) Somar todos os resultados ponderados para obter a Pontuação Final. A maior pontuação ponderada vence. Se a pontuação final apontar um vencedor diferente da sua preferência intuitiva inicial, é um sinal claro de viés emocional que precisa ser investigado.",
        "content": "<h3>Como Calcular a Pontuação Ponderada</h3><p><b>Passo a Passo:</b></p><ol><li><b>Defina os critérios:</b> Liste os fatores relevantes (ex: Custo, Risco Clínico, Usabilidade).</li><li><b>Atribua pesos antes:</b> Defina o peso decimal de cada critério de forma antecipada (soma = 1,00).</li><li><b>Pontue cada solução:</b> Notas de 1 a 5 por critério para cada alternativa.</li><li><b>Calcule a pontuação final:</b> Multiplique a nota pelo peso e some os resultados.</li><li><b>Compare e decida:</b> A maior pontuação ponderada vence o certame técnico.</li></ol>"
      },
      {
        "id": "slide_3_13",
        "title": "Governança da Inovação",
        "image": "/slides/aula3/slide_13.png",
        "block": "Matriz de Decisão",
        "estimatedTime": "6 min",
        "notes": "<strong>Fala sugerida:</strong> Lembrem-se sempre de que governança corporativa não é burocracia desnecessária. Ela é a proteção institucional do hospital e de quem toma as decisões de compra. Ela se baseia em critérios explícitos e definidos previamente, na rastreabilidade estrita da decisão (quem deu as notas, quando e com base em qual evidência) e na segurança jurídica que permite responder a qualquer auditoria ou acionista meses depois com justificativas matemáticas sólidas.",
        "content": "<h3>Governança da Inovação</h3><p><b>Critérios Rigorosos e Explícitos:</b> A seleção da solução vencedora deve seguir critérios definidos antes da avaliação — não depois.</p><p><b>Rastreabilidade da Decisão:</b> Quem decidiu, com base em quê, quando. Governança é o que permite defender a decisão seis meses depois.</p><p><b>Proteção Institucional:</b> Governança não é burocracia: protege a instituição e também quem decide. É liderança responsável.</p>"
      },
      {
        "id": "slide_3_14",
        "title": "Escolha a Solução Vencedora • Atividade Interativa",
        "image": "/slides/aula3/slide_14.png",
        "block": "Atividade Interativa",
        "estimatedTime": "12 min",
        "isInteractive": true,
        "interactionType": "poll",
        "question": "Com base na matriz de decisão analisada, qual solução obteve a maior pontuação ponderada?",
        "options": [
          "Solução A (Pontuação Ponderada: 3.50)",
          "Solução B (Pontuação Ponderada: 3.35)",
          "Solução C (Pontuação Ponderada: 3.90)"
        ],
        "notes": "<strong>Fala sugerida:</strong> Peço que acessem o painel e votem: analisando as notas dadas e os pesos estabelecidos, qual das três soluções obteve a maior pontuação ponderada e deve ser a contratada? *Gabarito Pedagógico:* A resposta correta é a **Solução C**, que obteve a nota ponderada de **3.90**. Destaque para os alunos que a Solução C venceu por ter recebido nota máxima nos critérios de maior peso (ROI abrangente e Segurança assistencial, ambos com 25% de peso), compensando o fato de ter uma nota menor no critério de Custo.",
        "content": "<h3>Escolha a Solução Vencedora</h3><p>Com base na matriz, vote na solução vencedora entre as 3 opções apresentadas.</p><p>Se o voto divergir da matriz, explore o porquê. A professora confronta o resultado do voto síncrono com a matemática da matriz ao vivo.</p>"
      },
      {
        "id": "slide_3_15",
        "title": "Matriz de Decisão Multifatorial • Resultado",
        "image": "/slides/aula3/slide_15.png",
        "block": "Matriz de Decisão",
        "estimatedTime": "5 min",
        "notes": "<strong>Fala sugerida:</strong> Aqui temos o resultado completo calculado. A Solução A finalizou com 3,50, a Solução B com 3,35 e a Solução C com 3,90. Embora a Solução A fosse mais barata em custo (nota 3 vs nota 2 de C), a Solução C superou as concorrentes com excelente desempenho técnico e assistencial. Isso prova como os pesos pré-definidos guiam o comitê para o real valor de longo prazo, em vez do menor preço nominal simples.",
        "content": "<h3>Matriz de Decisão Multifatorial · Resultado</h3><p><b>Solução A:</b> Pontuação final = 3,50</p><p><b>Solução B:</b> Pontuação final = 3,35</p><p><b>Solução C (Vencedora):</b> Pontuação final = 3,90 (Excelente em Segurança assistencial e ROI abrangente).</p><p>O cálculo matemático blinda a comissão de compras contra preferências individuais tardias.</p>"
      },
      {
        "id": "slide_3_16",
        "title": "Workshop do Projeto Final • Business Case",
        "image": "/slides/aula3/slide_16.png",
        "block": "Trabalho em Grupo",
        "estimatedTime": "40 min",
        "notes": "<strong>Fala sugerida:</strong> Entramos agora na fase prática. Vocês se reunirão nos comitês para elaborar o Business Case final da disciplina. Vocês devem cumprir 4 etapas cruciais: 1) Mapear a simulação de fluxo com o efeito dominó em pelo menos 3 níveis; 2) Aplicar o teste de estresse financeiro e apontar o ponto de quebra; 3) Calcular o ROI abrangente incluindo no mínimo 2 riscos invisíveis bem precificados; e 4) Redigir a justificativa de 5 partes para a diretoria, com uma recomendação clara de GO, NO-GO ou CONDICIONAL. O template do documento já está disponível para download.",
        "content": "<h3>Workshop do Projeto Final • Business Case</h3><p>Etapas para estruturação da entrega final (Peso: 35%):</p><ol><li><b>Simulação de Fluxo:</b> Mapear o efeito dominó da inovação em pelo menos 3 níveis.</li><li><b>Teste de Estresse:</b> Aplicar as 3 perguntas adversas e identificar o ponto em que o ROI deixa de fechar.</li><li><b>ROI Abrangente:</b> Incluir ao menos 2 riscos invisíveis com premissas defensáveis.</li><li><b>Justificativa para o Conselho:</b> Estrutura em 5 partes (problema, custo, solução, ROI e mitigação).</li></ol>"
      },
      {
        "id": "slide_3_17",
        "title": "Consultoria em Grupo no Portal",
        "image": "/slides/aula3/slide_17.png",
        "block": "Trabalho em Grupo",
        "estimatedTime": "25 min",
        "notes": "<strong>Fala sugerida:</strong> Usem esses 25 minutos para trabalhar em equipe diretamente no portal corporativo. Acessem a aba de consultoria, descrevam quais são as principais dúvidas ou o que está travando o desenvolvimento da proposta financeira do seu grupo. Vou passar pelos comitês virtuais para prestar consultoria direta e calibrar as premissas de vocês. Saiam desta sessão com um próximo passo operacional claro para a entrega final.",
        "content": "<h3>Consultoria em Grupo no Portal</h3><p><b>Checklist de Trabalho:</b></p><ul><li><b>Acesse o portal agora:</b> Registre as dúvidas do grupo na aba de consultoria.</li><li><b>Avance no business case:</b> Utilize o template disponível.</li><li><b>Defina seu próximo passo:</b> Cada comitê registra uma ação concreta (o quê, quem e quando) antes do fechamento.</li></ul>"
      },
      {
        "id": "slide_3_18",
        "title": "Reflexão Final • Encerramento da Disciplina",
        "image": "/slides/aula3/slide_18.png",
        "block": "Fechamento",
        "estimatedTime": "8 min",
        "isInteractive": true,
        "interactionType": "open_ended",
        "question": "Como guardião da viabilidade de investimentos, qual o compromisso profissional que você assume para guiar a governança de inovação em saúde?",
        "notes": "<strong>Fala sugerida:</strong> Para marcar nossa conclusão desta jornada letiva, peço que preencham a reflexão final no portal. Qual o compromisso que você assume como profissional e líder de agora em diante para garantir investimentos sustentáveis e seguros em saúde digital? Esse registro consolida o aprendizado de enxergar o oculto, falar a língua do conselho e decidir com coragem técnica baseada em dados.",
        "content": "<h3>Reflexão Final · Encerramento da Disciplina</h3><p>Responda no portal: Como guardião da viabilidade de investimentos, qual o compromisso profissional que você assume para guiar a governança de inovação em saúde?</p>"
      },
      {
        "id": "slide_3_19",
        "title": "Síntese da Disciplina • Os 3 Pilares",
        "image": "/slides/aula3/slide_19.png",
        "block": "Encerramento",
        "estimatedTime": "5 min",
        "notes": "<strong>Fala sugerida:</strong> Fazendo um grande fechamento da nossa disciplina, lembrem-se sempre dos três pilares fundamentais que estudamos: 1) Enxergar o Oculto (reconhecer que o gargalo operacional migra e que o risco oculto pesa mais que o aparente); 2) Quantificar o Invisível (o ROI real depende do lastro das premissas e da taxa de adoção assistencial); e 3) Defender com Matemática (levar argumentos estruturados baseados em dados reais para a mesa de conselho). Não deixem de ouvir também o nosso podcast E3 de consolidação.",
        "content": "<h3>Síntese da Disciplina • Os 3 Pilares</h3><ul><li><b>Enxergar o Oculto:</b> Risco oculto pesa mais que o aparente. Gargalo migra, não desaparece. Simular antes de investir.</li><li><b>Quantificar o Invisível:</b> ROI mora no invisível. Premissa documentada é premissa defensável. Custo oculto define o veredito.</li><li><b>Defender com Matemática:</b> Da convicção técnica à prova matemática. Segurança do paciente e saúde financeira são indissociáveis.</li></ul><p><i>Ouça o podcast E3 • ROI Inteligente na Prática para revisão.</i></p>"
      },
      {
        "id": "slide_3_20",
        "title": "Mantra da Disciplina",
        "image": "/slides/aula3/slide_20.png",
        "block": "Encerramento",
        "estimatedTime": "2 min",
        "notes": "<strong>Fala sugerida:</strong> Encerro nossa parte expositiva com o grande mantra que deve orientar a vida profissional de vocês como executivos em saúde digital: tomar decisões baseadas em dados reais é ter a coragem técnica e ética de escolher o que funciona comprovadamente na ponta assistencial, e rejeitar modismos ou pressões mercadológicas vazias. A responsabilidade é nossa.",
        "content": "<h3>Mantra da Disciplina</h3><p><i>\"Tomar decisões baseadas em dados é ter a coragem de escolher o que funciona, e não apenas o que é tendência de mercado.\"</i></p>"
      },
      {
        "id": "slide_3_21",
        "title": "Referências • Aula 3",
        "image": "/slides/aula3/slide_21.png",
        "block": "Encerramento",
        "estimatedTime": "2 min",
        "notes": "<strong>Fala sugerida:</strong> As fontes bibliográficas completas que discutimos hoje (incluindo o ensaio clínico EAGLE da Mayo Clinic e os dados de adoção da IA do Robô Laura e Neonpass Room) estão organizadas no portal corporativo para sua consulta técnica e fundamentação teórica de entregas.",
        "content": "<h3>Referências • Aula 3</h3><ul><li>Mayo Clinic • Ensaio EAGLE, detecção por ECG (2021 & 2024)</li><li>Robô Laura • Sepse, REBEn/SciELO (2020)</li><li>Neonpass Room • Einstein/HOOBOX, AJN (2025)</li></ul>"
      },
      {
        "id": "slide_3_22",
        "title": "Guardiões da Viabilidade",
        "image": "/slides/aula3/slide_22.png",
        "block": "Encerramento",
        "estimatedTime": "2 min",
        "notes": "<strong>Fala sugerida:</strong> Parabéns a todos! Vocês concluíram com êxito o nosso módulo síncrono e agora são oficialmente Guardiões da Viabilidade de inovação em saúde digital. Desejo muito sucesso na consolidação e entrega do Business Case final dos comitês de vocês. Nos vemos em breve, muito obrigado e até a próxima!",
        "content": "<h3>Parabéns aos novos Guardiões da Viabilidade!</h3><p>Você saiu desta disciplina apto a enxergar o oculto, quantificar o invisível e defender com matemática, na linguagem que o conselho entende.</p><p>Nos vemos na entrega do Projeto Prático Final. Até a próxima!</p>"
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
  getSubmission: (classId, groupId, studentEmail) => {
    const data = readData();
    const groupSubmissions = (data.submissions[classId] || {})[groupId] || {};
    if (studentEmail) {
      return groupSubmissions[studentEmail] || null;
    }
    const keys = Object.keys(groupSubmissions);
    return keys.length > 0 ? groupSubmissions[keys[0]] : null;
  },
  saveSubmission: (classId, groupId, studentEmail, submissionData, submittedBy) => {
    const data = readData();
    if (!data.submissions[classId]) {
      data.submissions[classId] = {};
    }
    if (!data.submissions[classId][groupId]) {
      data.submissions[classId][groupId] = {};
    }
    const emailKey = studentEmail || "anonymous";
    data.submissions[classId][groupId][emailKey] = {
      ...submissionData,
      submittedBy: submittedBy || "Aluno da Equipe",
      submittedAt: new Date().toISOString()
    };
    writeData(data);
    return data.submissions[classId][groupId][emailKey];
  },
  
  // Comments & Feedback
  getComments: (classId, groupId, studentEmail) => {
    const data = readData();
    const groupComments = (data.comments[classId] || {})[groupId] || {};
    if (studentEmail) {
      return groupComments[studentEmail] || [];
    }
    const keys = Object.keys(groupComments);
    return keys.length > 0 ? groupComments[keys[0]] : [];
  },
  saveComment: (classId, groupId, studentEmail, commentText, grade) => {
    const data = readData();
    if (!data.comments[classId]) {
      data.comments[classId] = {};
    }
    if (!data.comments[classId][groupId]) {
      data.comments[classId][groupId] = {};
    }
    const emailKey = studentEmail || "anonymous";
    if (!data.comments[classId][groupId][emailKey]) {
      data.comments[classId][groupId][emailKey] = [];
    }
    const newComment = {
      text: commentText,
      grade: grade || null,
      timestamp: new Date().toISOString()
    };
    data.comments[classId][groupId][emailKey].push(newComment);
    writeData(data);
    return data.comments[classId][groupId][emailKey];
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

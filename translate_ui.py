import re
import os
import unicodedata

def rep(text, search, replace):
    # Normalize both strings to NFC to guarantee matches
    text_norm = unicodedata.normalize('NFC', text)
    search_norm = unicodedata.normalize('NFC', search)
    replace_norm = unicodedata.normalize('NFC', replace)
    return text_norm.replace(search_norm, replace_norm)

def translate_html():
    input_path = "public/index.html"
    output_path = "us/public/index.html"
    
    with open(input_path, "r", encoding="utf-8") as f:
        html = f.read()
    
    # Normalize to NFC
    html = unicodedata.normalize('NFC', html)
    
    # --- SECTION 1: Large Paragraphs / Blocks (do these first!) ---
    html = rep(html, 'Aquecimento inicial sobre IA e Saúde Digital. Responda no painel lateral para ver as respostas surgirem aqui.', 'Initial warmup on AI and Digital Health. Submit in the sidebar to see responses appear here.')
    html = rep(html, 'Acompanhe a apresentação de slides no painel principal. Quando a docente habilitar interações, você poderá responder enquetes e testes neste painel lateral.', 'Follow the slides in the main panel. When the instructor enables interactions, you can answer enquetes and quizzes in this sidebar.')
    html = rep(html, 'A atividade de Concept Check deve ser realizada diretamente na área principal da tela. Selecione as alternativas nas perguntas correspondentes.', 'The Concept Check activity must be completed directly in the main display area. Select options in the corresponding questions.')
    html = rep(html, 'Documentem aqui as premissas antes de escrever o Sumário Executivo. Um ROI defensável é um ROI cujas premissas alguém de fora conseguiria auditar. <i>Copie este conteúdo para a seção correspondente no seu documento Word final.</i>', 'Document the assumptions here before writing the Executive Summary. A defensible ROI is one whose assumptions can be audited. <i>Copy this content to the corresponding section of your final Word document.</i>')
    html = rep(html, 'Listem no mínimo 2 limitações reais (não hipotéticas) do próprio business case, conectando-as explicitamente com as perguntas 4 (Adoção) e 5 (Estresse) do Framework ROI-5. <i>Copie este conteúdo para a seção correspondente no seu documento Word final.</i>', 'List at least 2 real (non-hypothetical) limitations of the business case, connecting them explicitly to questions 4 (Adoption) and 5 (Stress) of the ROI-5 Framework. <i>Copy this content to the corresponding section of your final Word document.</i>')
    html = rep(html, 'Escreva suas reflexões de auto-avaliação do dia de hoje para o feedback da professora.', 'Write your self-evaluation reflections of today for the instructor\'s feedback.')
    html = rep(html, 'Reflexão final consolidada e auto-avaliação sobre a aula de hoje.', 'Final consolidated reflection and self-evaluation on today\'s session.')
    html = rep(html, 'Realize a atividade prática com sua equipe no painel direito. Abaixo estão os detalhes do seu cenário institucional.', 'Perform the practical activity with your team in the right panel. Below are the details of your institutional scenario.')
    html = rep(html, 'Identifique um risco chave e uma estratégia de mitigação para cada dimensão do framework. Marque o showstopper do projeto.', 'Identify a key risk and a mitigation strategy for each framework dimension. Mark the project\'s showstopper.')
    html = rep(html, 'Calcule o ROI sob três condições com o simulador e justifique a viabilidade financeira.', 'Calculate the ROI under three conditions and justify financial viability.')
    html = rep(html, 'Redija colaborativamente um Business Case de 2 páginas baseado em dados reais de Risco e ROI.', 'Collaboratively draft a 2-page Business Case based on real Risk and ROI data.')
    html = rep(html, 'Máximo 200 palavras. Resuma o problema, a solução, os custos, os retornos e a recomendação final de investimentos.', 'Maximum 200 words. Summarize the problem, the solution, the costs, the returns, and the final investment recommendation.')
    html = rep(html, 'Descreva o gargalo clínico/operacional baseline e as perdas financeiras em decorrência de ineficiência ou falhas.', 'Describe the baseline clinical/operational bottleneck and the financial losses resulting from inefficiency or failures.')
    html = rep(html, 'Descreva o quê, o como da ferramenta, seu cronograma de adoção e custos detalhados.', 'Describe the what, how, adoption timeline, and detailed costs of the tool.')
    html = rep(html, 'Apresente o ROI, Payback e VPL para os cenários Expected, Realistic e Pessimistic. Aponte o ponto de quebra.', 'Present the ROI, Payback, and NPV for the Expected, Realistic, and Pessimistic scenarios. State the break point.')
    html = rep(html, 'Descreva os 2 principais riscos, suas estratégias de contingenciamento assistencial/tecnológico e os custos associados.', 'Describe the 2 key risks, their clinical/technological contingency strategies, and associated costs.')
    html = rep(html, 'Acompanhamento em tempo real do progresso das modelagens e feedback pedagógico.', 'Real-time tracking of modeling progress and pedagogical feedback.')
    html = rep(html, 'Baixe o modelo estruturado (.docx) para o trabalho final da equipe, preencha os dados e envie por e-mail.', 'Download the structured template (.docx) for the team final project, fill in the data, and submit via email.')
    html = rep(html, 'Espaço compartilhado para anotações e desenhos livres.', 'Shared space for annotations and free drawings.')
    html = rep(html, 'Literatura recomendada, artigos científicos e podcasts complementares da disciplina.', 'Recommended literature, scientific articles, and complementary podcasts.')
    html = rep(html, 'Artigos científicos, livros e links indicados para aprofundamento nesta aula.', 'Scientific articles, books, and suggested links for deeper study in this session.')
    html = rep(html, 'Ouça os debates e análises dos casos clínicos e financeiros de IA na Saúde.', 'Listen to debates and analyses of clinical and financial AI cases in healthcare.')
    html = rep(html, 'A bibliografia oficial de apoio está disponível na área principal da tela.', 'The official supporting bibliography is available in the main screen area.')
    html = rep(html, 'Controle qual fase da aula os alunos devem ver síncronamente na tela deles.', 'Control which phase of the class students see synchronously on their screens.')
    html = rep(html, 'Controle qual slide é mostrado na tela dos alunos na modalidade ao vivo.', 'Control which slide is displayed on the students\' screens in live mode.')
    html = rep(html, 'Aguardando envios dos alunos para calcular estatísticas...', 'Waiting for student submissions to calculate statistics...')
    html = rep(html, 'Aguardando reflexões das equipes...', 'Waiting for student reflections...')
    html = rep(html, 'Aguardando respostas das equipes...', 'Waiting for team responses...')
    html = rep(html, 'Aguardando envio das contribuições dos alunos...', 'Waiting for student contributions to be submitted...')
    html = rep(html, 'Aguardando envios dos comitês...', 'Waiting for committee submissions...')
    html = rep(html, 'Selecione uma equipe para avaliar a submissão.', 'Select a team to evaluate their submission.')
    html = rep(html, 'Responda à pergunta de Check-in para habilitar sua presença.', 'Answer the Check-in question to confirm your attendance.')
    html = rep(html, 'Envie sua contribuição para o debate:', 'Submit your contribution to the debate:')
    html = rep(html, 'Responda às questões objetivas sobre os tópicos apresentados nos slides teóricos.', 'Answer the objective questions regarding the topics covered in the slides.')
    html = rep(html, 'Identifique os riscos do seu projeto e proponha ações de mitigação. Marque um risco como "Showstopper".', 'Identify your project\'s risks and propose mitigation actions. Mark one risk as a "Showstopper".')
    html = rep(html, 'Responda à questão exibida no slide ativo.', 'Answer the question displayed on the active slide.')
    html = rep(html, 'Responda ao questionário interativo no painel central da tela.', 'Answer the interactive quiz in the main panel.')
    
    # Form placeholders
    html = rep(html, 'Ex: Baixa acurácia do algoritmo de triagem na triagem real...', 'e.g., Low accuracy of the triage algorithm in clinical production...')
    html = rep(html, 'Ex: Criar comitê de validação assistida no primeiro mês...', 'e.g., Establish an assisted validation committee during the first month...')
    html = rep(html, 'Ex: O efeito dominó no fluxo: aceleração gera gargalo na admissão de exames...', 'e.g., Domino effect: workflow acceleration creates bottlenecks in billing admissions...')
    html = rep(html, 'Ex: Redesenhar escala de recepção e treinar atendentes...', 'e.g., Redesign reception staffing and retrain attendants...')
    html = rep(html, 'Ex: Resistência e desconfiança dos médicos ao recomendador de IA...', 'e.g., Physician resistance and distrust of the AI recommendation system...')
    html = rep(html, 'Ex: Criar governança de IA \'assistente\' e dar controle final ao médico...', 'e.g., Formulate \'assistant\' AI governance and leave final decision to physicians...')
    html = rep(html, 'Ex: Custo oculto de integração de EHR ultrapassar USD 200k por site...', 'e.g., Hidden EHR integration costs exceed $200k per site...')
    html = rep(html, 'Ex: Provisionar contingency reserve de 30% para infraestrutura de TI...', 'e.g., Allocate 30% contingency reserve for IT infrastructure...')
    html = rep(html, 'Ex: 1) Adoção insuficiente dos radiologistas seniores devido a fadiga de alertas (Pergunta 4). 2) Aumento inesperado do OPEX anual se houver necessidade de nova infraestrutura de rede, derrubando o ROI após estresse (Pergunta 5)...', 'e.g., 1) Insufficient adoption by senior radiologists due to alert fatigue (Question 4). 2) Unexpected increase in annual OPEX if new network infrastructure is needed, lowering the ROI under stress (Question 5)...')
    html = rep(html, 'Ex: Esta proposta visa otimizar o fluxo de triagem no pronto-socorro através de...', 'e.g., This proposal aims to optimize Emergency Department triage flows by...')
    html = rep(html, 'Ex: 75% no cenário esperado', 'e.g., 75% in the expected scenario')
    html = rep(html, 'Ex: Recomenda-se o investimento contanto que haja treinamento intensivo da equipe e auditoria...', 'e.g., Investment is recommended provided there is intensive staff training and audit...')
    html = rep(html, 'Insira as condições específicas para o GO ou a justificativa fundamental para o NO-GO.', 'Enter specific conditions for GO or the core justification for NO-GO.')
    html = rep(html, 'Com a aula de hoje, percebi que o ROI real exige avaliar além do marketing. Para o nosso projeto, a mitigação crítica deve ser...', 'With today\'s class, I realized that real ROI requires looking beyond the marketing hype. For our project, the critical mitigation must be...')
    html = rep(html, 'A solução de IA consiste na implantação...', 'The AI solution consists of the deployment of...')
    html = rep(html, 'Os principais riscos mapeados são...', 'The main mapped risks are...')
    
    # --- SECTION 2: Short Titles and Labels ---
    html = rep(html, 'lang="pt-BR"', 'lang="en"')
    html = rep(html, 'AI Risk & ROI Navigator | Faculdade Moinhos de Vento', 'AI Risk & ROI Navigator | US Healthcare Lab')
    html = rep(html, 'MBA em IA na Saúde — Faculdade Moinhos de Vento', 'AI in Healthcare ROI Lab')
    html = rep(html, 'MBA em IA na Saúde | Faculdade Moinhos de Vento', 'AI in Healthcare ROI Lab')
    
    # Login overlay
    html = rep(html, 'Nome:', 'Name:')
    html = rep(html, 'Senha (E-mail cadastrado):', 'Password (Registered Email):')
    html = rep(html, 'Digite seu e-mail...', 'Enter your email...')
    html = rep(html, 'Entrar', 'Login')
    
    # Navigation controls
    html = rep(html, 'Sincronizar Aula', 'Sync Presentation')
    html = rep(html, 'Sincronizar com a apresentação da professora', 'Sync with the instructor\'s presentation')
    html = rep(html, 'Painel de Interação', 'Interaction Panel')
    html = rep(html, 'Mostrar/Ocultar Painel Lateral de Atividades', 'Show/Hide Activity Sidebar')
    html = rep(html, 'Carregando...', 'Loading...')
    
    # Sidebar
    html = rep(html, 'AULAS DA DISCIPLINA', 'COURSE CLASSES')
    html = rep(html, 'DIA 1 (07/07)', 'CLASS 1')
    html = rep(html, 'Fundamentos de Risco', 'Foundations of Risk')
    html = rep(html, 'DIA 2 (14/07)', 'CLASS 2')
    html = rep(html, 'Simulação e Estresse', 'Simulation & Stress')
    html = rep(html, 'DIA 3 (21/07)', 'CLASS 3')
    html = rep(html, 'Business Case & Defesa', 'Business Case & Pitch')
    html = rep(html, 'TÓPICOS DA AULA', 'CLASS SLIDES')
    html = rep(html, 'FERRAMENTAS', 'TOOLS')
    html = rep(html, 'Listar Alunos (38)', 'Student Roster')
    html = rep(html, 'Listar Alunos', 'Student Roster')
    
    # Phase Tabs
    html = rep(html, '1. Check-in & Icebreaker', '1. Check-in & Icebreaker')
    html = rep(html, '2. Conteúdo & Atividades', '2. Slides & Content')
    html = rep(html, '3. Concept Check', '3. Concept Check')
    html = rep(html, '4. Trabalho em Grupo', '4. Group Work')
    html = rep(html, '5. Reflexão Pós-Aula', '5. Post-Class Reflection')
    html = rep(html, '6. Referências', '6. References')
    
    # Live Check-in
    html = rep(html, 'Check-in & Icebreaker Ao Vivo', 'Live Check-in & Icebreaker')
    html = rep(html, 'Carregando pergunta...', 'Loading question...')
    
    # Live Presentation
    html = rep(html, 'Notas de Condução (Exclusivo Docente)', 'Presentation Notes (Instructor Only)')
    html = rep(html, 'Nenhuma nota de condução definida para este slide.', 'No presentation notes defined for this slide.')
    html = rep(html, 'Conteúdo e Discussões', 'Content & Discussions')
    html = rep(html, 'Visualizar Imagem do Slide', 'View Slide Image')
    html = rep(html, 'Slide', 'Slide')
    html = rep(html, 'Ver Transcrição Texto', 'View Text Transcript')
    html = rep(html, 'Transcrição', 'Transcript')
    html = rep(html, 'Modo Apresentação (Tela Cheia)', 'Presentation Mode (Full Screen)')
    html = rep(html, 'Projetar Slide', 'Project Slide')
    html = rep(html, 'Outro slide.', 'Viewing a different slide.')
    html = rep(html, 'Re-sincronizar', 'Re-sync')
    html = rep(html, 'Bloco: Introdução', 'Section:')
    html = rep(html, '(Tempo:', '(Est. Time:')
    
    # Side panel
    html = rep(html, 'ATIVIDADES E INTERAÇÕES', 'ACTIVITIES & INTERACTIONS')
    html = rep(html, 'Instruções:', 'Instructions:')
    html = rep(html, 'Enviar Resposta', 'Submit Response')
    html = rep(html, 'Digite sua resposta...', 'Type your response...')
    html = rep(html, 'PERGUNTA DE CHECK-IN', 'CHECK-IN QUESTION')
    
    # Slide Question
    html = rep(html, 'PARTICIPE DA DISCUSSÃO', 'PARTICIPATE IN THE DISCUSSION')
    html = rep(html, 'Digite sua contribuição...', 'Type your contribution...')
    html = rep(html, 'Enviar Contribuição', 'Submit Contribution')
    html = rep(html, 'RESPOSTAS DA TURMA', 'CLASS RESPONSES')
    html = rep(html, 'Liberar Respostas para Alunos', 'Reveal Responses to Students')
    html = rep(html, 'Ocultar Respostas da Turma', 'Hide Responses')
    
    # Concept check
    html = rep(html, 'Teste de Fixação de Conceitos', 'Concept Check Quiz')
    html = rep(html, 'Verificação de conceitos chaves da aula de hoje. Responda abaixo e receba feedback imediato na tela.', 'Key concepts check for today\'s session. Answer below and get instant feedback on the screen.')
    html = rep(html, 'Enviar Respostas do Teste', 'Submit Quiz Answers')
    html = rep(html, 'RESULTADOS DO TESTE (CONCEPT CHECK)', 'QUIZ RESULTS (CONCEPT CHECK)')
    html = rep(html, 'Você acertou 2 de 3 questões.', 'You got 2 out of 3 questions correct.')
    html = rep(html, 'O feedback detalhado das questões foi exibido acima para sua revisão.', 'Detailed feedback for the questions is displayed above for your review.')
    html = rep(html, 'Resultado Geral da Turma', 'Overall Class Performance')
    html = rep(html, 'Média de acertos da turma nesta aula.', 'Class average score for this session.')
    html = rep(html, 'Desempenho por Aluno', 'Performance by Student')
    
    # Group work
    html = rep(html, 'Trabalho prático das equipes sobre o cenário clínico-operacional atribuído.', 'Practical team project on the assigned clinical-operational scenario.')
    html = rep(html, 'Cenário da Equipe', 'Team Scenario')
    html = rep(html, 'Cenário de Modelagem do Comitê', 'Committee Modeling Scenario')
    html = rep(html, 'Investimento Projetado:', 'Projected Investment:')
    html = rep(html, 'Retorno Anual Esperado:', 'Expected Annual Benefit:')
    html = rep(html, 'Custo de Manutenção Anual:', 'Annual Maintenance Cost:')
    html = rep(html, 'Adoção Esperada:', 'Expected Adoption:')
    html = rep(html, 'Custo de Risco Estimado:', 'Estimated Risk Cost:')
    html = rep(html, 'Entregável do Comitê', 'Committee Deliverable')
    html = rep(html, 'Trabalho em Grupo (Comitê)', 'Group Work (Committee)')
    html = rep(html, 'Carregando descrição do cenário...', 'Loading scenario description...')
    html = rep(html, 'Instruções de Entrega:', 'Submission Instructions:')
    
    # Risk Matrix Form
    html = rep(html, 'Matriz de Classificação de Riscos (Aula 1)', 'Risk Classification Matrix (Class 1)')
    html = rep(html, 'Risco Técnico', 'Technical Risk')
    html = rep(html, 'Mitigação Técnica:', 'Technical Mitigation:')
    html = rep(html, 'Definir como Showstopper', 'Mark as Showstopper')
    html = rep(html, 'Risco Operacional', 'Operational Risk')
    html = rep(html, 'Mitigação Operacional:', 'Operational Mitigation:')
    html = rep(html, 'Risco Clínico-Cultural', 'Clinical-Cultural Risk')
    html = rep(html, 'Mitigação Clínico-Cultural:', 'Clinical-Cultural Mitigation:')
    html = rep(html, 'Mitigação Clínica:', 'Clinical Mitigation:')
    html = rep(html, 'Risco Financeiro', 'Financial Risk')
    html = rep(html, 'Mitigação Financeira:', 'Financial Mitigation:')
    html = rep(html, 'Enviar Mapeamento de Risco', 'Submit Risk Mapping')
    
    # Simulator Form (Class 2)
    html = rep(html, 'Simulador e Teste de Estresse (Aula 2)', 'Simulator & Stress Test (Class 2)')
    html = rep(html, 'Visualizar Respostas da Aula 1 (Mapeamento de Riscos)', 'View Class 1 Answers (Risk Mapping)')
    html = rep(html, 'Parâmetros do Projeto', 'Project Parameters')
    html = rep(html, 'Investimento Inicial (USD)', 'Initial Investment (USD)')
    html = rep(html, 'Benefício Anual (USD)', 'Annual Benefit (USD)')
    html = rep(html, 'Custo de Manutenção Anual (USD)', 'Annual Maintenance Cost (USD)')
    html = rep(html, 'Custo Estimado de Riscos Ocultos (USD)', 'Estimated Cost of Hidden Risks (USD)')
    html = rep(html, 'Horizonte Temporal (Anos)', 'Time Horizon (Years)')
    html = rep(html, 'Resultados do Teste de Estresse', 'Stress Test Results')
    html = rep(html, 'Métrica', 'Metric')
    html = rep(html, 'Esperado', 'Expected')
    html = rep(html, 'Realista', 'Realistic')
    html = rep(html, 'Pessimista', 'Pessimistic')
    html = rep(html, 'Adoção (%)', 'Adoption (%)')
    html = rep(html, 'ROI Total (%)', 'Total ROI (%)')
    html = rep(html, 'Payback (Anos)', 'Payback (Years)')
    html = rep(html, 'VPL (USD)', 'NPV (USD)')
    html = rep(html, 'Ponto de Quebra: Em qual cenário o projeto se torna inviável?', 'Break Point: In which scenario does the project become unfeasible?')
    html = rep(html, '<strong>Ponto de Quebra:</strong> Em qual cenário o projeto se torna inviável?', '<strong>Break Point:</strong> In which scenario does the project become unfeasible?')
    html = rep(html, 'Nenhum (Viável em todos)', 'None (Viable in all)')
    html = rep(html, 'Cenário Realistic', 'Realistic Scenario')
    html = rep(html, 'Cenário Pessimistic', 'Pessimistic Scenario')
    html = rep(html, 'Justificativa da Simulação: Justifique as principais diferenças de ROI encontradas entre os cenários:', 'Simulation Justification: Explain the main ROI variations observed across scenarios:')
    html = rep(html, '<strong>Justificativa da Simulação:</strong> Justifique as principais diferenças de ROI encontradas entre os cenários:', '<strong>Simulation Justification:</strong> Explain the main ROI variations observed across scenarios:')
    html = rep(html, 'Enviar Simulação de ROI', 'Submit ROI Simulation')
    
    # Business Case Form (Class 3)
    html = rep(html, 'Defesa de Business Case & Parecer Executivo (Aula 3)', 'Business Case Defense & Executive Opinion (Class 3)')
    html = rep(html, 'Visualizar Respostas da Aula 2 (Simulação de ROI)', 'View Class 2 Answers (ROI Simulation)')
    html = rep(html, 'Visualizar Simulação de ROI (Aula 2)', 'View ROI Simulation (Class 2)')
    html = rep(html, 'Sumário Executivo e Proposta de Valor', 'Executive Summary & Value Proposition')
    html = rep(html, 'Premissas e Limitações do Modelo', 'Model Assumptions & Limitations')
    html = rep(html, 'Volume (pacientes/exames por período)', 'Volume (patients/scans per period)')
    html = rep(html, 'Taxa de Adoção Assumida', 'Assumed Adoption Rate')
    html = rep(html, 'Horizonte de Análise (anos)', 'Analysis Horizon (years)')
    html = rep(html, 'Sumário Executivo (Executive Summary)', 'Executive Summary')
    html = rep(html, 'Solução Tecnológica Proposta', 'Proposed Technical Solution')
    html = rep(html, 'Avaliação Financeira sob Estresse', 'Financial Evaluation under Stress')
    html = rep(html, 'Riscos & Plano de Mitigação', 'Risks & Mitigation Plan')
    html = rep(html, 'Painel de Apoio: Limitações do Projeto', 'Supporting Panel: Project Limitations')
    html = rep(html, 'Recomendação Final de Investimento', 'Final Investment Recommendation')
    html = rep(html, 'Recomendação de Capital (GO / NO-GO)', 'Capital Recommendation (GO / NO-GO)')
    html = rep(html, 'Recomendar Investimento (GO)', 'Recommend Investment (GO)')
    html = rep(html, 'Rejeitar Investimento (NO-GO)', 'Reject Investment (NO-GO)')
    html = rep(html, 'Justificativa e Condições de Execução:', 'Justification & Execution Conditions:')
    html = rep(html, 'Condições ou Justificativas Finais:', 'Final Conditions or Justifications:')
    html = rep(html, 'Submeter Business Case Final', 'Submit Final Business Case')
    
    # Docente View in Group Work
    html = rep(html, 'VISÃO GERAL DAS ENTREGAS DOS COMITÊS (EXCLUSIVO DOCENTE)', 'COMMITTEE SUBMISSIONS OVERVIEW (INSTRUCTOR ONLY)')
    html = rep(html, 'Equipe 1', 'Group 1')
    html = rep(html, 'Equipe 2', 'Group 2')
    html = rep(html, 'Equipe 3', 'Group 3')
    html = rep(html, 'Equipe 4', 'Group 4')
    html = rep(html, 'Equipe 5', 'Group 5')
    html = rep(html, 'Baixar Template', 'Download Template')
    html = rep(html, 'MODELO DO TRABALHO FINAL (WORD)', 'FINAL PROJECT TEMPLATE (WORD)')
    html = rep(html, 'Cenário do Grupo:', 'Group Scenario:')
    
    # Whiteboard / Canvas
    html = rep(html, 'Lousa Interativa Síncrona', 'Synchronous Interactive Whiteboard')
    html = rep(html, 'Espessura do Pincel:', 'Brush Thickness:')
    html = rep(html, 'Limpar Lousa', 'Clear Board')
    
    # Reflection Pós-Aula
    html = rep(html, 'Reflexão Pós-Aula', 'Post-Class Reflection')
    html = rep(html, 'REFLEXÕES DOS ALUNOS', 'STUDENT REFLECTIONS')
    html = rep(html, 'Sua Reflection (máximo 500 palavras):', 'Your Reflection (maximum 500 words):')
    html = rep(html, 'Sua Reflexão (máximo 500 palavras):', 'Your Reflection (maximum 500 words):')
    html = rep(html, 'Enviar Reflexão', 'Submit Reflection')
    
    # References
    html = rep(html, 'Referências Bibliográficas & Apoio', 'References & Study Materials')
    html = rep(html, 'Referências Bibliográficas', 'Bibliography & References')
    html = rep(html, 'BIBLIOGRAFIA BÁSICA', 'CORE BIBLIOGRAPHY')
    html = rep(html, 'BIBLIOGRAFIA COMPLEMENTAR', 'SUPPLEMENTARY BIBLIOGRAPHY')
    html = rep(html, 'PODCASTS RECOMENDADOS DA DISCIPLINA', 'RECOMMENDED PODCASTS')
    html = rep(html, 'Avaliação de Risco e Inovação na Saúde', 'Risk Assessment & Health Innovation')
    html = rep(html, 'A Anatomia do ROI em Projetos de IA', 'The Anatomy of ROI in AI Projects')
    html = rep(html, 'Governança, Barreiras Regulatórias e o Efeito Dominó', 'Governance, Regulatory Barriers, and the Domino Effect')
    
    # Student Roster Dialog
    html = rep(html, 'Alunos Cadastrados na Disciplina', 'Registered Students in this Course')
    html = rep(html, 'Buscar aluno por nome ou email...', 'Search student by name or email...')
    html = rep(html, 'Fechar', 'Close')
    
    # Professor Controls
    html = rep(html, 'Condução da Aula (Fases)', 'Class Conduct (Phases)')
    html = rep(html, 'Apresentação Síncrona', 'Synchronous Presentation')
    html = rep(html, 'Forçar sincronização de slides', 'Force slide synchronization')
    html = rep(html, 'Cronômetro de Atividade', 'Activity Timer')
    html = rep(html, 'Submissões das Equipes', 'Team Submissions')
    
    # Hardcoded Group placeholders
    html = rep(html, 'Grupo 1: IA Triagem de Urgência', 'Group 1')
    html = rep(html, 'Grupo 2: Farmácia Robótica', 'Group 2')
    html = rep(html, 'Grupo 3: Telemetria Cardíaca', 'Group 3')
    html = rep(html, 'Grupo 5: Prontuário Integrado', 'Group 5')
    
    # Remaining miscellaneous replacements
    html = rep(html, 'Mapeamento de Risco (Aula 1)', 'Risk Mapping (Class 1)')
    html = rep(html, 'Business Case Executivo (Aula 3)', 'Executive Business Case (Class 3)')
    html = rep(html, 'Visualizar Respostas da Aula 2 (Simulação de ROI)', 'View Class 2 Submissions (ROI Simulation)')
    html = rep(html, 'Painel de Apoio: Premissas Utilizadas', 'Supporting Panel: Mapped Assumptions')
    html = rep(html, 'Limitações do Projeto', 'Project Limitations')
    html = rep(html, 'Volume (pacientes/exames por período)', 'Volume (patients/scans per period)')
    html = rep(html, 'Taxa de Adoção Assumida', 'Assumed Adoption Rate')
    html = rep(html, 'Horizonte de Análise (anos)', 'Analysis Horizon (years)')
    html = rep(html, 'Template do Relatório Executivo Final', 'Final Executive Report Template')
    html = rep(html, 'Reflexão final consolidada e auto-avaliação sobre a aula de hoje.', 'Final consolidated reflection and self-evaluation on today\'s session.')
    
    # Target exact strings found in grep search
    html = rep(html, 'Grupo 1: IA de Triagem de Urgência', 'Group 1: Emergency Triage AI')
    html = rep(html, 'Escreva sua reflexão no painel à direita.', 'Write your reflection in the panel on the right.')
    html = rep(html, 'Submeta sua resposta inicial para a discussão.', 'Submit your initial response for the discussion.')
    html = rep(html, 'Descreva os fatores que mais afetam a viabilidade (ex: custos ocultos, baixa adoção clínica, aumento de tempo de validação).', 'Describe the factors that most affect viability (e.g., hidden costs, low clinical adoption, increased validation time).')
    html = rep(html, 'Apresente o ROI, Payback e VPL para os cenários Expected, Realistic e Pessimistic. Aponte o ponto de quebra.', 'Present the ROI, Payback, and NPV for the Expected, Realistic, and Pessimistic scenarios. State the break point.')
    html = rep(html, '<b>Pergunta guia:</b> O que pode fazer o ROI deste projeto não acontecer?<br>', '<b>Guiding question:</b> What could cause this project\'s ROI not to materialize?<br>')
    html = rep(html, 'Referências da Aula', 'Class References')
    html = rep(html, '5. Reflexão', '5. Reflection')
    
    # --- SECTION 3: Small word changes (do these very last!) ---
    html = rep(html, 'Professora', 'Professor')
    html = rep(html, 'Professor', 'Professor')
    html = rep(html, 'Sair', 'Logout')
    html = rep(html, 'Próximo', 'Next')
    html = rep(html, 'Anterior', 'Previous')
    html = rep(html, 'Equipe', 'Group')
    
    # Clean up any comments with Portuguese
    html = rep(html, '<!-- Bloco Colapsável: Respostas da Aula 1 -->', '<!-- Collapsible Block: Class 1 Responses -->')
    html = rep(html, '<!-- Bloco Colapsável: Respostas da Aula 2 -->', '<!-- Collapsible Block: Class 2 Responses -->')
    html = rep(html, '<!-- Box de Download do Template do Relatório Executivo -->', '<!-- Download Box: Executive Template -->')
    html = rep(html, '<!-- C2. Painel "Limitações" -->', '<!-- C2. Limitations Panel -->')
    html = rep(html, '<!-- PHASE 5: Reflexão Pós-Aula -->', '<!-- PHASE 5: Post-Class Reflection -->')
    
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("Translated index.html saved successfully!")

def translate_js():
    input_path = "public/app.js"
    output_path = "us/public/app.js"
    
    with open(input_path, "r", encoding="utf-8") as f:
        js = f.read()
    
    # Normalize to NFC to avoid combining accent mismatches
    js = unicodedata.normalize('NFC', js)
    
    # Toasts and alerts
    js = rep(js, 'showToast("Acesso autorizado!", "success")', 'showToast("Access authorized!", "success")')
    js = rep(js, 'showToast("Senha incorreta (digite seu e-mail cadastrado)!", "error")', 'showToast("Incorrect password (enter your registered email)!", "error")')
    js = rep(js, 'showToast("Desconectado com sucesso.", "info")', 'showToast("Logged out successfully.", "info")')
    js = rep(js, 'showToast("Resposta de check-in enviada!", "success")', 'showToast("Check-in response submitted!", "success")')
    js = rep(js, 'showToast("Sua resposta foi enviada!", "success")', 'showToast("Your response has been submitted!", "success")')
    js = rep(js, 'showToast("Mapeamento de riscos enviado com sucesso!", "success")', 'showToast("Risk mapping submitted successfully!", "success")')
    js = rep(js, 'showToast("Simulação enviada com sucesso!", "success")', 'showToast("Simulation submitted successfully!", "success")')
    js = rep(js, 'showToast("Business Case final submetido!", "success")', 'showToast("Final Business Case submitted!", "success")')
    js = rep(js, 'showToast("Comentário e nota salvos!", "success")', 'showToast("Comment and grade saved!", "success")')
    js = rep(js, 'showToast("Por favor, preencha o comentário antes de salvar.", "warning")', 'showToast("Please enter a comment before saving.", "warning")')
    js = rep(js, 'showToast("Quadro limpo com sucesso.", "info")', 'showToast("Whiteboard cleared successfully.", "info")')
    js = rep(js, 'showToast("Erro ao carregar dados.", "error")', 'showToast("Error loading data.", "error")')
    js = rep(js, 'Inicializando Navigator...', 'Initializing Navigator...')
    js = rep(js, 'Navigator pronto para a aula!', 'Navigator ready for class!')
    js = rep(js, 'Erro ao carregar dados do servidor.', 'Error loading data from server.')
    
    # Deeper JS Toast & Alert translations
    js = rep(js, 'showToast("Sincronização de slides ativada.", "success");', 'showToast("Slide synchronization enabled.", "success");')
    js = rep(js, 'showToast("Sincronização desativada. Navegação livre.", "info");', 'showToast("Synchronization disabled. Free navigation.", "info");')
    js = rep(js, 'showToast("Modo de exibição: Imagem do Slide", "info");', 'showToast("Display mode: Slide Image", "info");')
    js = rep(js, 'showToast("Modo de exibição: Transcrição em Texto", "info");', 'showToast("Display mode: Text Transcript", "info");')
    js = rep(js, 'showToast("Painel de Interação ocultado.", "info");', 'showToast("Interaction Panel hidden.", "info");')
    js = rep(js, 'showToast("Painel de Interação visível.", "info");', 'showToast("Interaction Panel visible.", "info");')
    js = rep(js, 'Logout da Projeção', 'Exit Projection')
    js = rep(js, 'showToast("Modo Projeção ativado (pressione ESC para sair).", "info");', 'showToast("Projection Mode enabled (press ESC to exit).", "info");')
    js = rep(js, 'showToast("Enviando reflexão...", "info");', 'showToast("Submitting reflection...", "info");')
    js = rep(js, 'showToast("Reflexão enviada!", "success");', 'showToast("Reflection submitted!", "success");')
    js = rep(js, 'showToast("Por favor, selecione uma recomendação final.", "error");', 'showToast("Please select a final recommendation.", "error");')
    js = rep(js, 'showToast(checked ? "Sincronização global ativada." : "Sincronização global desativada.", "info");', 'showToast(checked ? "Global sync enabled." : "Global sync disabled.", "info");')
    js = rep(js, 'showToast(minutes ? `Cronômetro de ${minutes} min iniciado!` : "Cronômetro zerado!", "info");', 'showToast(minutes ? `Timer of ${minutes} min started!` : "Timer reset!", "info");')
    js = rep(js, 'showToast("Erro de conexão com o servidor.", "error");', 'showToast("Connection error with server.", "error");')
    js = rep(js, 'showToast("Erro de conexão.", "error");', 'showToast("Connection error.", "error");')
    js = rep(js, 'showToast("Professores não votam nas interações.", "error");', 'showToast("Instructors do not vote on interactions.", "error");')
    js = rep(js, 'showToast(`Você curtiu a palavra "${word}"!`, "success");', 'showToast(`You liked the word "${word}"!`, "success");')
    js = rep(js, 'showToast("Status de exibição atualizado", "success");', 'showToast("Display status updated", "success");')
    js = rep(js, 'showToast("Status de fixação updated", "success");', 'showToast("Pin status updated", "success");')
    js = rep(js, 'showToast("Status de fixação atualizado", "success");', 'showToast("Pin status updated", "success");')
    js = rep(js, 'showToast("Reflexões não suportam curtidas individuais.", "info");', 'showToast("Reflexions do not support individual likes.", "info");')
    js = rep(js, 'showToast("Reflexões não suportam curtidas individuais.", "info")', 'showToast("Reflexions do not support individual likes.", "info")')
    
    # Date formatting/UI
    js = rep(js, 'pt-BR', 'en-US')
    js = rep(js, 'pt-br', 'en-us')
    
    # Local currency R$ -> $
    js = rep(js, 'R$ ${(prevData.investment || 0).toLocaleString(\'pt-BR\')}', '$${(prevData.investment || 0).toLocaleString(\'en-US\')}')
    js = rep(js, 'R$ ${(prevData.benefit || 0).toLocaleString(\'pt-BR\')}', '$${(prevData.benefit || 0).toLocaleString(\'en-US\')}')
    js = rep(js, 'R$ ${(prevData.maintenance || 0).toLocaleString(\'pt-BR\')}', '$${(prevData.maintenance || 0).toLocaleString(\'en-US\')}')
    js = rep(js, 'R$ ${(prevData.risk || 0).toLocaleString(\'pt-BR\')}', '$${(prevData.risk || 0).toLocaleString(\'en-US\')}')
    
    js = rep(js, 'R$ ${(submission.investment || 0).toLocaleString(\'pt-BR\')}', '$${(submission.investment || 0).toLocaleString(\'en-US\')}')
    js = rep(js, 'R$ ${(submission.benefit || 0).toLocaleString(\'pt-BR\')}', '$${(submission.benefit || 0).toLocaleString(\'en-US\')}')
    js = rep(js, 'R$ ${(submission.maintenance || 0).toLocaleString(\'pt-BR\')}', '$${(submission.maintenance || 0).toLocaleString(\'en-US\')}')
    js = rep(js, 'R$ ${(submission.risk || 0).toLocaleString(\'pt-BR\')}', '$${(submission.risk || 0).toLocaleString(\'en-US\')}')
    
    js = rep(js, '\'R$ 0\'', '\'$0\'')
    js = rep(js, '\'R$ \' +', '\'$ \' +')
    
    # Fallback and texts
    js = rep(js, 'Aguardando respostas das equipes...', 'Waiting for team responses...')
    js = rep(js, 'Nenhuma nota de condução definida para este slide.', 'No presentation notes defined for this slide.')
    js = rep(js, 'Carregando pergunta...', 'Loading question...')
    js = rep(js, 'Outro slide.', 'Viewing a different slide.')
    js = rep(js, 'Re-sincronizar', 'Re-sync')
    js = rep(js, 'Carregando...', 'Loading...')
    js = rep(js, 'Sair', 'Logout')
    js = rep(js, 'DIA', 'CLASS')
    js = rep(js, 'DIA 1', 'CLASS 1')
    js = rep(js, 'DIA 2', 'CLASS 2')
    js = rep(js, 'DIA 3', 'CLASS 3')
    js = rep(js, 'visitante', 'visitor')
    js = rep(js, 'Aguardando reflexões das equipes...', 'Waiting for team reflections...')
    js = rep(js, 'Equipe', 'Group')
    js = rep(js, 'Equipe ${s.group}', 'Group ${s.group}')
    js = rep(js, 'Professora', 'Professor')
    js = rep(js, 'Professor', 'Professor')
    js = rep(js, 'Salvar Feedback Individual', 'Save Individual Feedback')
    js = rep(js, 'Nota atribuída', 'Assigned Grade')
    js = rep(js, 'Excluir', 'Delete')
    js = rep(js, 'Destacar', 'Highlight')
    js = rep(js, 'Fixar', 'Pin')
    js = rep(js, 'Ocultar', 'Hide')
    js = rep(js, 'Ver Respostas', 'View Responses')
    js = rep(js, 'Esconder Respostas', 'Hide Responses')
    js = rep(js, 'gabarito', 'answer key')
    js = rep(js, 'votos', 'votes')
    js = rep(js, 'voto', 'vote')
    
    # Group work instructions & quiz titles
    js = rep(js, 'Preencha a matriz de risco mapeando 1 risco relevante para cada um dos 4 pilares estratégicos.', 'Fill in the risk matrix by mapping 1 relevant risk for each of the 4 strategic pillars.')
    js = rep(js, 'Insira uma proposta sólida de mitigação para cada pilar.', 'Enter a solid mitigation strategy for each dimension.')
    js = rep(js, 'Marque qual risco representa o <strong>Showstopper</strong> crítico da viabilidade do projeto.', 'Mark which risk represents the critical project <strong>Showstopper</strong>.')
    js = rep(js, 'Submeta o formulário para a nota final da primeira aula.', 'Submit the form for Class 1 final grading.')
    js = rep(js, 'Use o simulador financeiro no painel direito. Insira os parâmetros do seu projeto assistencial.', 'Use the financial simulator in the right panel. Input your clinical project parameters.')
    js = rep(js, 'Simule o VPL, ROI e Payback sob condições <strong>Esperada</strong> (90% adoção), <strong>Realista</strong> (70%) e <strong>Pessimista</strong> (45% + riscos).', 'Simulate NPV, ROI, and Payback under <strong>Expected</strong> (90% adoption), <strong>Realistic</strong> (70%), and <strong>Pessimistic</strong> (45% + risks) conditions.')
    js = rep(js, 'Aponte em qual cenário o investimento se quebra e justifique os fatores determinantes na caixa de texto.', 'Identify under which scenario the investment fails and justify the key factors in the text area.')
    js = rep(js, 'Elabore um Business Case estruturado de 2 páginas compilando o problema, solução e resultados financeiros estressados.', 'Draft a structured 2-page Business Case compiling the problem, solution, and stressed financial results.')
    js = rep(js, 'Redija os 5 tópicos obrigatórios para decisão executiva do conselho.', 'Write the 5 mandatory sections for the C-suite executive decision.')
    js = rep(js, 'Tome uma recomendação executiva final: <strong>GO</strong>, <strong>NO-GO</strong> ou <strong>CONDICIONAL</strong> justificando as condicionantes de mitigação.', 'Provide your final executive recommendation: <strong>GO</strong> or <strong>NO-GO</strong> justifying the mitigation requirements.')
    js = rep(js, 'Resultado do questionário.', 'Quiz Results Summary.')
    js = rep(js, 'Resultado Geral da Turma', 'Overall Class Performance')
    
    # Class IDs mapping (aula1 -> class1 etc.)
    js = rep(js, '"aula1"', '"class1"')
    js = rep(js, '"aula2"', '"class2"')
    js = rep(js, '"aula3"', '"class3"')
    js = rep(js, '\'aula1\'', '\'class1\'')
    js = rep(js, '\'aula2\'', '\'class2\'')
    js = rep(js, '\'aula3\'', '\'class3\'')
    
    # Financial results UI strings
    js = rep(js, 'Investimento Inicial:', 'Initial Investment:')
    js = rep(js, 'Benefício Anual:', 'Annual Benefit:')
    js = rep(js, 'Custo de Manutenção Anual:', 'Annual Maintenance Cost:')
    js = rep(js, 'Custos de Risco Oculto:', 'Hidden Risk Costs:')
    js = rep(js, 'Custos de Risco:', 'Risk Costs:')
    js = rep(js, 'Investimento:', 'Investment:')
    js = rep(js, 'Manutenção Anual:', 'Annual Maintenance:')
    
    # Table data parsing & formatting
    js = rep(js, 'VPL Esperado', 'Expected NPV')
    js = rep(js, 'VPL Realista', 'Realistic NPV')
    js = rep(js, 'VPL Pessimista', 'Pessimistic NPV')
    js = rep(js, 'Payback Esperado', 'Expected Payback')
    js = rep(js, 'Payback Realista', 'Realistic Payback')
    js = rep(js, 'Payback Pessimista', 'Pessimistic Payback')
    
    # Quiz grading message
    js = rep(js, '`Você acertou ${savedQuiz.score} de ${activeClass.conceptCheck.length} questões.`', '`You got ${savedQuiz.score} out of ${activeClass.conceptCheck.length} questions.`')
    
    # Student Roster Title
    js = rep(js, 'Alunos Cadastrados na Disciplina (${roster.length})', 'Registered Students in this Course (${roster.length})')
    
    # JS-Side UI Labels and Messages from Roster/Submission Viewers
    js = rep(js, 'Com a aula de hoje, percebi que o ROI real exige avaliar além do marketing. Para o nosso projeto, a mitigação crítica deve ser...', 'Following today\'s session, I realized that real ROI requires looking beyond the marketing hype. For our project, the critical mitigation must be...')
    js = rep(js, 'Reflexão enviada com sucesso!', 'Reflection submitted successfully!')
    js = rep(js, 'Sugestão de Uso em Aula:', 'Suggested Session Use:')
    js = rep(js, 'Acessar publicação oficial', 'Access official publication')
    js = rep(js, 'Bibliografia Básica', 'Core Bibliography')
    js = rep(js, 'Inviável', 'Unviable')
    js = rep(js, 'Erro de conexão com o servidor.', 'Connection error with the server.')
    js = rep(js, 'Erro de conexão.', 'Connection error.')
    js = rep(js, 'Reflexões não suportam curtidas individuais.', 'Reflections do not support individual likes.')
    js = rep(js, 'Não informado', 'Not provided')
    js = rep(js, 'Não informada', 'Not provided')
    js = rep(js, 'Não preenchido', 'Not filled')
    
    js = rep(js, 'Risco Técnico & Mitigação', 'Technical Risk & Mitigation')
    js = rep(js, 'Risco Operacional & Mitigação', 'Operational Risk & Mitigation')
    js = rep(js, 'Risco Clínico-Cultural & Mitigação', 'Clinical-Cultural Risk & Mitigation')
    js = rep(js, 'Risco Financeiro & Mitigação', 'Financial Risk & Mitigation')
    js = rep(js, 'Fator Crítico de Decisão (Showstopper)', 'Critical Decision Factor (Showstopper)')
    js = rep(js, 'Mapeado como showstopper:', 'Mapped as showstopper:')
    js = rep(js, 'Risco Técnico', 'Technical Risk')
    js = rep(js, 'Risco Operacional', 'Operational Risk')
    js = rep(js, 'Risco Clínico', 'Clinical Risk')
    js = rep(js, 'Risco Financeiro', 'Financial Risk')
    js = rep(js, 'Nenhum', 'None')
    js = rep(js, 'Parâmetros de Simulação de ROI', 'ROI Simulation Parameters')
    js = rep(js, 'Cenário Pessimista', 'Pessimistic Scenario')
    js = rep(js, 'Cenário Realista', 'Realistic Scenario')
    js = rep(js, 'Nenhum (Viável em todos)', 'None (Viable in all)')
    js = rep(js, 'Justificativa da Simulação', 'Simulation Justification')
    
    js = rep(js, 'Submissão Pendente', 'Pending Submission')
    js = rep(js, 'Esta equipe ainda não enviou a atividade para a', 'This team has not yet submitted the activity for')
    js = rep(js, 'Aula 1', 'Class 1')
    js = rep(js, 'Aula 2', 'Class 2')
    js = rep(js, 'Aula 3', 'Class 3')
    js = rep(js, 'Risco:', 'Risk:')
    js = rep(js, 'Mitigação:', 'Mitigation:')
    
    js = rep(js, 'Parâmetros de Simulação Submetidos', 'Submitted Simulation Parameters')
    js = rep(js, 'Anos de Análise:', 'Analysis Years:')
    js = rep(js, '1. Sumário Executivo', '1. Executive Summary')
    js = rep(js, '3. Solução Proposta', '3. Proposed Solution')
    js = rep(js, '4. Análise Financeira sob Estresse', '4. Financial Evaluation under Stress')
    js = rep(js, '5. Riscos e Mitigações', '5. Risks and Mitigations')
    
    js = rep(js, 'Volume:', 'Volume:')
    js = rep(js, 'Taxa de Adoção:', 'Adoption Rate:')
    js = rep(js, 'Horizonte de Análise:', 'Analysis Horizon:')
    js = rep(js, 'Custo/Hora Group:', 'Cost/Hour Group:')
    js = rep(js, 'Fonte de cada dado:', 'Data Sources:')
    js = rep(js, 'Painel de Apoio: Limitações do Projeto', 'Supporting Panel: Project Limitations')
    js = rep(js, '6. Recomendação Final de Investimento', '6. Final Investment Recommendation')
    js = rep(js, 'Condições/Justificativa:', 'Conditions/Justification:')
    js = rep(js, 'Comentários e Orientações:', 'Comments and Guidelines:')
    js = rep(js, 'Parabéns pelo trabalho individual,', 'Congratulations on your individual work,')
    js = rep(js, 'Parabéns pelo trabalho individual, ${studentName}...', 'Congratulations on your individual work, ${studentName}...')
    
    # Dynamic Phase controls and help texts in app.js
    js = rep(js, 'Estudo de Caso Detalhado (Discussão de Riscos & ROI)', 'Detailed Case Study (Risk & ROI Discussion)')
    js = rep(js, 'Opção A', 'Option A')
    js = rep(js, 'Opção B', 'Option B')
    js = rep(js, 'Resposta enviada! Você pode alterá-la e reenviar se desejar.', 'Response submitted! You can change it and resubmit if desired.')
    js = rep(js, 'Bloco: ${slide.block || "Introdução"}', 'Block: ${slide.block || "Introduction"}')
    js = rep(js, 'Sugestão visual:', 'Visual suggestion:')
    js = rep(js, 'Slide padrão. Acompanhe a explicação da professora.', 'Default slide. Follow the instructor\'s explanation.')
    js = rep(js, 'Envie suas dúvidas ou comentários sobre a aula no espaço abaixo.', 'Submit your questions or comments about the class in the space below.')
    js = rep(js, 'Ex: Confiança', 'e.g., Trust')
    js = rep(js, 'Ex: Qual a taxa de desconto recomendada?', 'e.g., What is the recommended discount rate?')
    js = rep(js, 'Ex: Rigor metodológico e testes paralelos...', 'e.g., Methodological rigor and parallel testing...')
    js = rep(js, 'Envie uma única palavra.', 'Submit a single word.')
    js = rep(js, 'Máximo 100 caracteres. Seja sucinto e objetivo.', 'Maximum 100 characters. Be concise and focused.')
    js = rep(js, 'Questão', 'Question')
    js = rep(js, 'Enviar Questionário', 'Submit Quiz')
    js = rep(js, 'Por favor, responda à Questão', 'Please answer Question')
    js = rep(js, 'Enviando questionário...', 'Submitting quiz...')
    js = rep(js, 'Responda à reflexão enviando apenas uma palavra para compor a nuvem de palavras da turma.', 'Answer the reflection by submitting a single word to build the class word cloud.')
    js = rep(js, 'Sua Palavra-Chave (Sem espaços, máximo 25 caracteres):', 'Your Key Word (No spaces, maximum 25 characters):')
    js = rep(js, 'Sua Reflexão (máximo 500 palavras):', 'Your Reflection (maximum 500 words):')
    
    # Specific missing app.js items
    js = rep(js, 'Logout da Projeção', 'Exit Projection')
    js = rep(js, 'Escreva suas reflexões de auto-avaliação do dia de hoje para o feedback da professora.', 'Write your self-evaluation reflections of today for the instructor\'s feedback.')
    js = rep(js, 'None (Viável em todos)', 'None (Viable in all)')
    js = rep(js, 'RENDER PHASE: 5. Reflexão Pós-Aula', 'RENDER PHASE: 5. Post-Class Reflection')
    js = rep(js, 'RENDER PHASE: 6. Referências Bibliográficas', 'RENDER PHASE: 6. Bibliography & References')
    
    # Podcast Episodes
    js = rep(js, 'Episódio 1: Avaliação de Risco e Inovação na Saúde', 'Episode 1: Risk Assessment & Health Innovation')
    js = rep(js, 'Discussão aprofundada sobre como equilibrar a velocidade da inovação tecnológica com a segurança assistencial e a viabilidade financeira.', 'Deep dive into balancing the speed of technological innovation with patient safety and financial feasibility.')
    js = rep(js, 'Episódio 2: A Anatomia do ROI em Projetos de IA', 'Episode 2: The Anatomy of ROI in AI Projects')
    js = rep(js, 'Análise prática de modelagem de business cases em saúde, desmistificando os custos de riscos ocultos e as taxas de adoção clínica.', 'Practical business case modeling in healthcare, demystifying hidden risk costs and clinical adoption rates.')
    js = rep(js, 'Episódio 3: Governança, Barreiras Regulatórias e o Efeito Dominó', 'Episode 3: Governance, Regulatory Barriers & the Domino Effect')
    js = rep(js, 'Como estruturar comitês de governança de IA e mitigar os efeitos em cascata (downstream bottlenecks) no fluxo hospitalar.', 'How to structure AI governance committees and mitigate downstream bottlenecks in hospital workflows.')
    
    # Flexible Login Update (from root public/app.js)
    if 'isValid = (passLower === \'professor\'' not in js:
        js = rep(js, 'isValid = (password.toLowerCase() === \'professor\' || password.toLowerCase() === \'professor@hmv.org.br\');',
                        'const passLower = password.toLowerCase().trim();\n            isValid = (passLower === \'professor\' || passLower === \'professor@hmv.org.br\' || passLower === \'professor@example.com\');')
    
    # Dynamic slide rendering replacement to support typography slides (fallbacks for missing images)
    slide_render_target = '        if (appState.slideViewMode === "image" && slide.image && !isTextSlide) {\n            slideViewport.innerHTML = `<div class="slide-image-container"><img src="${slide.image}" class="slide-img" alt="${slide.title}"></div>`;\n        } else {\n            slideViewport.innerHTML = `<div class="slide-transcript-container">${slide.content}</div>`;\n        }'
    slide_render_replacement = '        if (appState.slideViewMode === "image" && slide.image && !isTextSlide) {\n            slideViewport.innerHTML = `<div class="slide-image-container" style="display:flex; flex-direction:column; justify-content:center; align-items:center; width:100%; height:100%;"><img src="${slide.image}" class="slide-img" alt="${slide.title}" onerror="this.style.display=\\\'none\\\'; this.parentElement.style.display=\\\'none\\\'; document.getElementById(\\\'slideViewportTextFallback\\\').style.display=\\\'block\\\';"></div><div id="slideViewportTextFallback" class="slide-transcript-container" style="display:none; width:100%; height:100%; box-sizing:border-box; overflow-y:auto;">${slide.content}</div>`;\n        } else {\n            slideViewport.innerHTML = `<div class="slide-transcript-container">${slide.content}</div>`;\n        }'
    
    js = rep(js, slide_render_target, slide_render_replacement)
    
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(js)
    print("Translated app.js saved successfully!")

if __name__ == "__main__":
    translate_html()
    translate_js()

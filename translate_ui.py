import re
import os

def translate_html():
    input_path = "public/index.html"
    output_path = "us/public/index.html"
    
    with open(input_path, "r", encoding="utf-8") as f:
        html = f.read()
    
    # Header & Metas
    html = html.replace('lang="pt-BR"', 'lang="en"')
    html = html.replace('AI Risk & ROI Navigator | Faculdade Moinhos de Vento', 'AI Risk & ROI Navigator | US Healthcare Lab')
    html = html.replace('MBA em IA na Saúde — Faculdade Moinhos de Vento', 'AI in Healthcare ROI Lab')
    html = html.replace('MBA em IA na Saúde | Faculdade Moinhos de Vento', 'AI in Healthcare ROI Lab')
    
    # Login overlay
    html = html.replace('Nome:', 'Name:')
    html = html.replace('Senha (E-mail cadastrado):', 'Password (Registered Email):')
    html = html.replace('Digite seu e-mail...', 'Enter your email...')
    html = html.replace('Entrar', 'Login')
    
    # Navigation controls
    html = html.replace('Sincronizar Aula', 'Sync Presentation')
    html = html.replace('Sincronizar com a apresentação da professora', 'Sync with the instructor\'s presentation')
    html = html.replace('Painel de Interação', 'Interaction Panel')
    html = html.replace('Mostrar/Ocultar Painel Lateral de Atividades', 'Show/Hide Activity Sidebar')
    html = html.replace('Carregando...', 'Loading...')
    html = html.replace('Sair', 'Logout')
    html = html.replace('Sair da conta', 'Log out of your account')
    
    # Sidebar
    html = html.replace('AULAS DA DISCIPLINA', 'COURSE CLASSES')
    html = html.replace('DIA 1 (07/07)', 'CLASS 1')
    html = html.replace('Fundamentos de Risco', 'Foundations of Risk')
    html = html.replace('DIA 2 (14/07)', 'CLASS 2')
    html = html.replace('Simulação e Estresse', 'Simulation & Stress')
    html = html.replace('DIA 3 (21/07)', 'CLASS 3')
    html = html.replace('Business Case & Defesa', 'Business Case & Pitch')
    html = html.replace('TÓPICOS DA AULA', 'CLASS SLIDES')
    html = html.replace('FERRAMENTAS', 'TOOLS')
    html = html.replace('Listar Alunos (38)', 'Student Roster')
    
    # Phase Tabs
    html = html.replace('1. Check-in & Icebreaker', '1. Check-in & Icebreaker')
    html = html.replace('2. Conteúdo & Atividades', '2. Slides & Content')
    html = html.replace('3. Concept Check', '3. Concept Check')
    html = html.replace('4. Trabalho em Grupo', '4. Group Work')
    html = html.replace('5. Reflexão Pós-Aula', '5. Post-Class Reflection')
    html = html.replace('6. Referências', '6. References')
    
    # Phase 1: Check-in
    html = html.replace('Check-in & Icebreaker Ao Vivo', 'Live Check-in & Icebreaker')
    html = html.replace('Aquecimento inicial sobre IA e Saúde Digital. Responda no painel lateral para ver as respostas surgirem aqui.', 'Initial warmup on AI and Digital Health. Submit in the sidebar to see responses appear here.')
    html = html.replace('Carregando pergunta...', 'Loading question...')
    html = html.replace('Aguardando respostas das equipes...', 'Waiting for team responses...')
    
    # Phase 2: Presentation
    html = html.replace('Notas de Condução (Exclusivo Docente)', 'Presentation Notes (Instructor Only)')
    html = html.replace('Nenhuma nota de condução definida para este slide.', 'No presentation notes defined for this slide.')
    html = html.replace('Conteúdo e Discussões', 'Content & Discussions')
    html = html.replace('Visualizar Imagem do Slide', 'View Slide Image')
    html = html.replace('Slide', 'Slide')
    html = html.replace('Ver Transcrição Texto', 'View Text Transcript')
    html = html.replace('Transcrição', 'Transcript')
    html = html.replace('Modo Apresentação (Tela Cheia)', 'Presentation Mode (Full Screen)')
    html = html.replace('Projetar Slide', 'Project Slide')
    html = html.replace('Outro slide.', 'Viewing a different slide.')
    html = html.replace('Re-sincronizar', 'Re-sync')
    html = html.replace('Bloco: Introdução', 'Section:')
    html = html.replace('(Tempo:', '(Est. Time:')
    
    # Side panel
    html = html.replace('ATIVIDADES E INTERAÇÕES', 'ACTIVITIES & INTERACTIONS')
    html = html.replace('Instruções:', 'Instructions:')
    html = html.replace('Acompanhe a apresentação de slides no painel principal. Quando a docente habilitar interações, você poderá responder enquetes e testes neste painel lateral.', 'Follow the slides in the main panel. When the instructor enables interactions, you can answer enquetes and quizzes in this sidebar.')
    html = html.replace('Responda à pergunta de Check-in para habilitar sua presença.', 'Answer the Check-in question to confirm your attendance.')
    html = html.replace('Enviar Resposta', 'Submit Response')
    html = html.replace('Digite sua resposta...', 'Type your response...')
    html = html.replace('PERGUNTA DE CHECK-IN', 'CHECK-IN QUESTION')
    
    # Slide Question
    html = html.replace('PARTICIPE DA DISCUSSÃO', 'PARTICIPATE IN THE DISCUSSION')
    html = html.replace('Envie sua contribuição para o debate:', 'Submit your contribution to the debate:')
    html = html.replace('Digite sua contribuição...', 'Type your contribution...')
    html = html.replace('Enviar Contribuição', 'Submit Contribution')
    html = html.replace('RESPOSTAS DA TURMA', 'CLASS RESPONSES')
    html = html.replace('Aguardando envio das contribuições dos alunos...', 'Waiting for student contributions to be submitted...')
    html = html.replace('Liberar Respostas para Alunos', 'Reveal Responses to Students')
    html = html.replace('Ocultar Respostas da Turma', 'Hide Responses')
    
    # Concept check
    html = html.replace('Teste de Fixação de Conceitos', 'Concept Check Quiz')
    html = html.replace('Responda às questões objetivas sobre os tópicos apresentados nos slides teóricos.', 'Answer the objective questions regarding the topics covered in the slides.')
    html = html.replace('Enviar Respostas do Teste', 'Submit Quiz Answers')
    html = html.replace('RESULTADOS DO TESTE (CONCEPT CHECK)', 'QUIZ RESULTS (CONCEPT CHECK)')
    html = html.replace('Resultado Geral da Turma', 'Overall Class Performance')
    html = html.replace('Média de acertos da turma nesta aula.', 'Class average score for this session.')
    html = html.replace('Desempenho por Aluno', 'Performance by Student')
    html = html.replace('Aguardando envios dos alunos para calcular estatísticas...', 'Waiting for student submissions to calculate statistics...')
    
    # Group work
    html = html.replace('Trabalho prático das equipes sobre o cenário clínico-operacional atribuído.', 'Practical team project on the assigned clinical-operational scenario.')
    html = html.replace('Cenário de Modelagem do Comitê', 'Committee Modeling Scenario')
    html = html.replace('Investimento Projetado:', 'Projected Investment:')
    html = html.replace('Retorno Anual Esperado:', 'Expected Annual Benefit:')
    html = html.replace('Custo de Manutenção Anual:', 'Annual Maintenance Cost:')
    html = html.replace('Adoção Esperada:', 'Expected Adoption:')
    html = html.replace('Custo de Risco Estimado:', 'Estimated Risk Cost:')
    html = html.replace('Entregável do Comitê', 'Committee Deliverable')
    html = html.replace('Trabalho em Grupo (Comitê)', 'Group Work (Committee)')
    
    # Risk Matrix Form
    html = html.replace('Matriz de Classificação de Riscos (Aula 1)', 'Risk Classification Matrix (Class 1)')
    html = html.replace('Identifique um risco chave e uma estratégia de mitigação para cada dimensão do framework. Marque o showstopper do projeto.', 'Identify a key risk and a mitigation strategy for each framework dimension. Mark the project\'s showstopper.')
    html = html.replace('Risco Técnico', 'Technical Risk')
    html = html.replace('Mitigação Técnica:', 'Technical Mitigation:')
    html = html.replace('Definir como Showstopper', 'Mark as Showstopper')
    html = html.replace('Risco Operacional', 'Operational Risk')
    html = html.replace('Mitigação Operacional:', 'Operational Mitigation:')
    html = html.replace('Risco Clínico-Cultural', 'Clinical-Cultural Risk')
    html = html.replace('Mitigação Clínica:', 'Clinical Mitigation:')
    html = html.replace('Risco Financeiro', 'Financial Risk')
    html = html.replace('Mitigação Financeira:', 'Financial Mitigation:')
    html = html.replace('Enviar Mapeamento de Risco', 'Submit Risk Mapping')
    html = html.replace('Ex: Custo oculto de integração de EHR ultrapassar USD 200k por site...', 'e.g., Hidden EHR integration costs exceed $200k per site...')
    html = html.replace('Ex: Provisionar contingency reserve de 30% para infraestrutura de TI...', 'e.g., Allocate 30% contingency reserve for IT infrastructure...')
    
    # Simulator Form (Class 2)
    html = html.replace('Simulador e Teste de Estresse (Aula 2)', 'Simulator & Stress Test (Class 2)')
    html = html.replace('Calcule o ROI sob três condições com o simulador e justifique a viabilidade financeira.', 'Calculate the ROI under three conditions and justify financial viability.')
    html = html.replace('Visualizar Respostas da Aula 1 (Mapeamento de Riscos)', 'View Class 1 Answers (Risk Mapping)')
    html = html.replace('Parâmetros do Projeto', 'Project Parameters')
    html = html.replace('Investimento Inicial (USD)', 'Initial Investment (USD)')
    html = html.replace('Benefício Anual (USD)', 'Annual Benefit (USD)')
    html = html.replace('Custo de Manutenção Anual (USD)', 'Annual Maintenance Cost (USD)')
    html = html.replace('Custo Estimado de Riscos Ocultos (USD)', 'Estimated Cost of Hidden Risks (USD)')
    html = html.replace('Horizonte Temporal (Anos)', 'Time Horizon (Years)')
    html = html.replace('Resultados do Teste de Estresse', 'Stress Test Results')
    html = html.replace('Métrica', 'Metric')
    html = html.replace('Esperado', 'Expected')
    html = html.replace('Realista', 'Realistic')
    html = html.replace('Pessimista', 'Pessimistic')
    html = html.replace('Adoção (%)', 'Adoption (%)')
    html = html.replace('ROI Total (%)', 'Total ROI (%)')
    html = html.replace('Payback (Anos)', 'Payback (Years)')
    html = html.replace('VPL (USD)', 'NPV (USD)')
    html = html.replace('Enviar Simulação do Projeto', 'Submit Project Simulation')
    
    # Business Case Form (Class 3)
    html = html.replace('Defesa de Business Case & Parecer Executivo (Aula 3)', 'Business Case Defense & Executive Opinion (Class 3)')
    html = html.replace('Estruture o parecer executivo final com base nas simulações sob estresse e recomende a alocação de capital.', 'Structure the final executive opinion based on stressed simulations and recommend capital allocation.')
    html = html.replace('Visualizar Simulação de ROI (Aula 2)', 'View ROI Simulation (Class 2)')
    html = html.replace('Sumário Executivo e Proposta de Valor', 'Executive Summary & Value Proposition')
    html = html.replace('Ex: Esta proposta visa otimizar o fluxo de triagem no pronto-socorro através de...', 'e.g., This proposal aims to optimize Emergency Department triage flows by...')
    html = html.replace('Premissas e Limitações do Modelo', 'Model Assumptions & Limitations')
    html = html.replace('Ex: Assume-se taxa de adoção de 75% pela enfermagem e infraestrutura de Wi-Fi atualizada...', 'e.g., Assumes a 75% nurse adoption rate and upgraded Wi-Fi infrastructure...')
    html = html.replace('Recomendação de Capital (GO / NO-GO)', 'Capital Recommendation (GO / NO-GO)')
    html = html.replace('Recomendar Investimento (GO)', 'Recommend Investment (GO)')
    html = html.replace('Rejeitar Investimento (NO-GO)', 'Reject Investment (NO-GO)')
    html = html.replace('Justificativa e Condições de Execução:', 'Justification & Execution Conditions:')
    html = html.replace('Ex: Recomenda-se o investimento contanto que haja treinamento intensivo da equipe e auditoria...', 'e.g., Investment is recommended provided there is intensive staff training and audit...')
    html = html.replace('Submeter Business Case Final', 'Submit Final Business Case')
    
    # Docente View in Group Work
    html = html.replace('VISÃO GERAL DAS ENTREGAS DOS COMITÊS (EXCLUSIVO DOCENTE)', 'COMMITTEE SUBMISSIONS OVERVIEW (INSTRUCTOR ONLY)')
    html = html.replace('Acompanhamento em tempo real do progresso das modelagens e feedback pedagógico.', 'Real-time tracking of modeling progress and pedagogical feedback.')
    html = html.replace('Equipe 1', 'Group 1')
    html = html.replace('Equipe 2', 'Group 2')
    html = html.replace('Equipe 3', 'Group 3')
    html = html.replace('Equipe 4', 'Group 4')
    html = html.replace('Equipe 5', 'Group 5')
    html = html.replace('Aguardando envios dos comitês...', 'Waiting for committee submissions...')
    html = html.replace('Baixe o modelo estruturado (.docx) para o trabalho final da equipe, preencha os dados e envie por e-mail.', 'Download the structured template (.docx) for the team final project, fill in the data, and submit via email.')
    html = html.replace('Baixar Template', 'Download Template')
    html = html.replace('MODELO DO TRABALHO FINAL (WORD)', 'FINAL PROJECT TEMPLATE (WORD)')
    
    # Whiteboard / Canvas
    html = html.replace('Lousa Interativa Síncrona', 'Synchronous Interactive Whiteboard')
    html = html.replace('Espaço compartilhado para anotações e desenhos livres.', 'Shared space for annotations and free drawings.')
    html = html.replace('Espessura do Pincel:', 'Brush Thickness:')
    html = html.replace('Limpar Lousa', 'Clear Board')
    
    # Reflection Pós-Aula
    html = html.replace('Reflexão Pós-Aula Ao Vivo', 'Post-Class Reflection')
    html = html.replace('Consolidação das premissas e aprendizados individuais.', 'Consolidation of individual assumptions and learning.')
    html = html.replace('Enviar Reflexão Pós-Aula', 'Submit Post-Class Reflection')
    html = html.replace('REFLEXÕES DOS ALUNOS', 'STUDENT REFLECTIONS')
    html = html.replace('Aguardando reflexões das equipes...', 'Waiting for student reflections...')
    
    # References
    html = html.replace('Referências Bibliográficas & Apoio', 'References & Study Materials')
    html = html.replace('Literatura recomendada, artigos científicos e podcasts complementares da disciplina.', 'Recommended literature, scientific articles, and complementary podcasts.')
    html = html.replace('BIBLIOGRAFIA BÁSICA', 'CORE BIBLIOGRAPHY')
    html = html.replace('BIBLIOGRAFIA COMPLEMENTAR', 'SUPPLEMENTARY BIBLIOGRAPHY')
    html = html.replace('PODCASTS RECOMENDADOS DA DISCIPLINA', 'RECOMMENDED PODCASTS')
    html = html.replace('Ouça os debates e análises dos casos clínicos e financeiros de IA na Saúde.', 'Listen to debates and analyses of clinical and financial AI cases in healthcare.')
    html = html.replace('Avaliação de Risco e Inovação na Saúde', 'Risk Assessment & Health Innovation')
    html = html.replace('A Anatomia do ROI em Projetos de IA', 'The Anatomy of ROI in AI Projects')
    html = html.replace('Governança, Barreiras Regulatórias e o Efeito Dominó', 'Governance, Regulatory Barriers, and the Domino Effect')
    
    # Student Roster Dialog
    html = html.replace('Alunos Cadastrados na Disciplina', 'Registered Students in this Course')
    html = html.replace('Fechar', 'Close')
    
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("Translated index.html saved successfully!")

def translate_js():
    input_path = "public/app.js"
    output_path = "us/public/app.js"
    
    with open(input_path, "r", encoding="utf-8") as f:
        js = f.read()
    
    # Toasts and alerts
    js = js.replace('showToast("Acesso autorizado!", "success")', 'showToast("Access authorized!", "success")')
    js = js.replace('showToast("Senha incorreta (digite seu e-mail cadastrado)!", "error")', 'showToast("Incorrect password (enter your registered email)!", "error")')
    js = js.replace('showToast("Desconectado com sucesso.", "info")', 'showToast("Logged out successfully.", "info")')
    js = js.replace('showToast("Resposta de check-in enviada!", "success")', 'showToast("Check-in response submitted!", "success")')
    js = js.replace('showToast("Sua resposta foi enviada!", "success")', 'showToast("Your response has been submitted!", "success")')
    js = js.replace('showToast("Mapeamento de riscos enviado com sucesso!", "success")', 'showToast("Risk mapping submitted successfully!", "success")')
    js = js.replace('showToast("Simulação enviada com sucesso!", "success")', 'showToast("Simulation submitted successfully!", "success")')
    js = js.replace('showToast("Business Case final submetido!", "success")', 'showToast("Final Business Case submitted!", "success")')
    js = js.replace('showToast("Comentário e nota salvos!", "success")', 'showToast("Comment and grade saved!", "success")')
    js = js.replace('showToast("Por favor, preencha o comentário antes de salvar.", "warning")', 'showToast("Please enter a comment before saving.", "warning")')
    js = js.replace('showToast("Quadro limpo com sucesso.", "info")', 'showToast("Whiteboard cleared successfully.", "info")')
    js = js.replace('showToast("Erro ao carregar dados.", "error")', 'showToast("Error loading data.", "error")')
    
    # Date formatting/UI
    js = js.replace('pt-BR', 'en-US')
    js = js.replace('pt-br', 'en-us')
    
    # Local currency R$ -> $
    js = js.replace('R$ ${(prevData.investment || 0).toLocaleString(\'pt-BR\')}', '$${(prevData.investment || 0).toLocaleString(\'en-US\')}')
    js = js.replace('R$ ${(prevData.benefit || 0).toLocaleString(\'pt-BR\')}', '$${(prevData.benefit || 0).toLocaleString(\'en-US\')}')
    js = js.replace('R$ ${(prevData.maintenance || 0).toLocaleString(\'pt-BR\')}', '$${(prevData.maintenance || 0).toLocaleString(\'en-US\')}')
    js = js.replace('R$ ${(prevData.risk || 0).toLocaleString(\'pt-BR\')}', '$${(prevData.risk || 0).toLocaleString(\'en-US\')}')
    
    js = js.replace('R$ ${(submission.investment || 0).toLocaleString(\'pt-BR\')}', '$${(submission.investment || 0).toLocaleString(\'en-US\')}')
    js = js.replace('R$ ${(submission.benefit || 0).toLocaleString(\'pt-BR\')}', '$${(submission.benefit || 0).toLocaleString(\'en-US\')}')
    js = js.replace('R$ ${(submission.maintenance || 0).toLocaleString(\'pt-BR\')}', '$${(submission.maintenance || 0).toLocaleString(\'en-US\')}')
    js = js.replace('R$ ${(submission.risk || 0).toLocaleString(\'pt-BR\')}', '$${(submission.risk || 0).toLocaleString(\'en-US\')}')
    
    js = js.replace('\'R$ 0\'', '\'$0\'')
    js = js.replace('\'R$ \' +', '\'$ \' +')
    
    # Fallback and texts
    js = js.replace('Aguardando respostas das equipes...', 'Waiting for team responses...')
    js = js.replace('Nenhuma nota de condução definida para este slide.', 'No presentation notes defined for this slide.')
    js = js.replace('Carregando pergunta...', 'Loading question...')
    js = js.replace('Outro slide.', 'Viewing a different slide.')
    js = js.replace('Re-sincronizar', 'Re-sync')
    js = js.replace('Carregando...', 'Loading...')
    js = js.replace('Sair', 'Logout')
    js = js.replace('DIA', 'CLASS')
    js = js.replace('DIA 1', 'CLASS 1')
    js = js.replace('DIA 2', 'CLASS 2')
    js = js.replace('DIA 3', 'CLASS 3')
    js = js.replace('visitante', 'visitor')
    js = js.replace('Aguardando reflexões das equipes...', 'Waiting for team reflections...')
    js = js.replace('Equipe', 'Group')
    js = js.replace('Equipe ${s.group}', 'Group ${s.group}')
    js = js.replace('Professora', 'Professor')
    js = js.replace('Professor', 'Professor')
    js = js.replace('Salvar Feedback Individual', 'Save Individual Feedback')
    js = js.replace('Nota atribuída', 'Assigned Grade')
    js = js.replace('Excluir', 'Delete')
    js = js.replace('Destacar', 'Highlight')
    js = js.replace('Fixar', 'Pin')
    js = js.replace('Ocultar', 'Hide')
    js = js.replace('Ver Respostas', 'View Responses')
    js = js.replace('Esconder Respostas', 'Hide Responses')
    js = js.replace('gabarito', 'answer key')
    js = js.replace('votos', 'votes')
    js = js.replace('voto', 'vote')
    
    # Class IDs mapping (aula1 -> class1 etc.)
    js = js.replace('"aula1"', '"class1"')
    js = js.replace('"aula2"', '"class2"')
    js = js.replace('"aula3"', '"class3"')
    js = js.replace('\'aula1\'', '\'class1\'')
    js = js.replace('\'aula2\'', '\'class2\'')
    js = js.replace('\'aula3\'', '\'class3\'')
    
    # Financial results UI strings
    js = js.replace('Investimento Inicial:', 'Initial Investment:')
    js = js.replace('Benefício Anual:', 'Annual Benefit:')
    js = js.replace('Custo de Manutenção Anual:', 'Annual Maintenance Cost:')
    js = js.replace('Custos de Risco Oculto:', 'Hidden Risk Costs:')
    js = js.replace('Custos de Risco:', 'Risk Costs:')
    js = js.replace('Investimento:', 'Investment:')
    js = js.replace('Manutenção Anual:', 'Annual Maintenance:')
    
    # Table data parsing & formatting
    js = js.replace('VPL Esperado', 'Expected NPV')
    js = js.replace('VPL Realista', 'Realistic NPV')
    js = js.replace('VPL Pessimista', 'Pessimistic NPV')
    js = js.replace('Payback Esperado', 'Expected Payback')
    js = js.replace('Payback Realista', 'Realistic Payback')
    js = js.replace('Payback Pessimista', 'Pessimistic Payback')
    
    # Quiz grading message
    js = js.replace('Você acertou', 'You got')
    js = js.replace('de', 'out of')
    js = js.replace('questões', 'questions')
    
    # Student Roster Title
    js = js.replace('Alunos Cadastrados na Disciplina (${roster.length})', 'Registered Students in this Course (${roster.length})')
    
    # Dynamic slide rendering replacement to support typography slides (fallbacks for missing images)
    slide_render_target = '        if (appState.slideViewMode === "image" && slide.image && !isTextSlide) {\n            slideViewport.innerHTML = `<div class="slide-image-container"><img src="${slide.image}" class="slide-img" alt="${slide.title}"></div>`;\n        } else {\n            slideViewport.innerHTML = `<div class="slide-transcript-container">${slide.content}</div>`;\n        }'
    slide_render_replacement = '        if (appState.slideViewMode === "image" && slide.image && !isTextSlide) {\n            slideViewport.innerHTML = `<div class="slide-image-container" style="display:flex; flex-direction:column; justify-content:center; align-items:center; width:100%; height:100%;"><img src="${slide.image}" class="slide-img" alt="${slide.title}" onerror="this.style.display=\\\'none\\\'; this.parentElement.style.display=\\\'none\\\'; document.getElementById(\\\'slideViewportTextFallback\\\').style.display=\\\'block\\\';"></div><div id="slideViewportTextFallback" class="slide-transcript-container" style="display:none; width:100%; height:100%; box-sizing:border-box; overflow-y:auto;">${slide.content}</div>`;\n        } else {\n            slideViewport.innerHTML = `<div class="slide-transcript-container">${slide.content}</div>`;\n        }'
    
    js = js.replace(slide_render_target, slide_render_replacement)
    
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(js)
    print("Translated app.js saved successfully!")

if __name__ == "__main__":
    translate_html()
    translate_js()

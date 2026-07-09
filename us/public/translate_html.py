import os

filepath = "/Users/faila/Library/CloudStorage/GoogleDrive-failapereira@gmail.com/My Drive/MOINHOS/us/public/index.html"

with open(filepath, 'r', encoding='utf-8') as f:
    html = f.read()

# Define the precise search & replace pairs
replacements = [
    # General UI Terms
    ("Trabalho em Group Colaborativo", "Collaborative Team Work"),
    ("Trabalho em Grupo", "Group Work"),
    ("Grupo 1", "Group 1"),
    ("Grupo 2", "Group 2"),
    ("Grupo 3", "Group 3"),
    ("Grupo 4", "Group 4"),
    ("Grupo 5", "Group 5"),
    ("4. Grupos", "4. Groups"),
    ("Grupo 4: IA em Radiologia", "Group 4"),
    ("Lista de Alunos e Groups (38 Alunos)", "Student Roster & Groups (38 Students)"),
    ("Respostas Enviadas!", "Answers Submitted!"),
    ("Preencha a matriz de risco mapeando 4 categorias e defina o Showstopper.", "Fill in the risk matrix mapping the 4 dimensions and define the Showstopper."),
    ("Responder Check-in", "Submit Check-in"),
    ("Enviar Check-in", "Submit Check-in"),
    ("Resposta da Atividade ao Vivo", "Live Activity Response"),
    ("Selecione...", "Select..."),
    ("Trabalho_Final_Template.docx", "Final_Project_Template.docx"),
    ("Feedback da Professor:", "Instructor Feedback:"),
    ("Painel de Controle Docente", "Instructor Control Panel"),
    ("Defina o tempo limite para a atividade:", "Set activity time limit:"),
    ("Zerar", "Reset"),
    ("Aula 1 (Matriz)", "Class 1 (Matrix)"),
    ("Aula 2 (ROI)", "Class 2 (ROI)"),
    ("Aula 3 (BC)", "Class 3 (Business Case)"),
    ("Custo/Hora da equipe envolvida", "Hourly cost of the team involved"),
    ("Ex: R$ 150/hora", "e.g., $150/hour"),
    ("Fonte de cada dado (estimativa / benchmark / dado real do caso)", "Source of each data point (estimate / benchmark / case data)"),
    ("Ex: Volume retirado do caso real (InRad); Custo de riscos estimado com base em processos passados...", "e.g., Volume taken from case study; Risk cost estimated based on historical events..."),
    ("O presente caso visa...", "This business case aims to..."),
    ("Problema & Contexto Hospitalar", "Problem & Hospital Context"),
    ("Atualmente, o fluxo operacional apresenta...", "Currently, the operational workflow suffers from..."),
    ("Com base no teste de estresse, o ROI realista...", "Based on the stress testing, the realistic ROI..."),
    ("GO</strong> (Aprovado)", "GO</strong> (Approved)"),
    ("NO-GO</strong> (Rejeitado)", "NO-GO</strong> (Rejected)"),
    ("CONDICIONAL</strong> (Aprovado com condicionantes)", "CONDITIONAL</strong> (Approved with conditions)"),
    ("Submit Reflection Final", "Submit Final Reflection"),
    ("Ex: 80.000 exames/ano", "e.g., 80,000 exams/year"),
    ("Ex: 5 anos", "e.g., 5 years"),
    ("Inserido dinamicamente via JS", "Dynamically inserted via JS"),
    ("Painel \"Premissas Utilizadas\"", "\"Assumptions Used\" Panel")
]

for old, new in replacements:
    html = html.replace(old, new)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(html)

print("HTML translation complete!")

import os

filepath = "/Users/faila/Library/CloudStorage/GoogleDrive-failapereira@gmail.com/My Drive/MOINHOS/us/public/app.js"

with open(filepath, 'r', encoding='utf-8') as f:
    js = f.read()

# Define the precise search & replace pairs for app.js
replacements = [
    # Whiteboard status
    ("Lousa Aberta (Desenhe na tela!)", "Whiteboard Open (Draw on the screen!)"),
    ("Apenas Leitura (Aluno)", "Read-Only (Student)"),
    ("actName = \"Lousa\"", "actName = \"Whiteboard\""),
    ("actName = \"Enquete\"", "actName = \"Poll\""),
    
    # ROI Label
    ("label: 'Retorno sobre Investimento (ROI %)'", "label: 'Return on Investment (ROI %)'"),
    
    # Student fallback name and submission toasts
    ('const studentName = activeStudent ? activeStudent.name : "Aluno";', 'const studentName = activeStudent ? activeStudent.name : "Student";'),
    ('showToast("Enviando trabalho...", "info");', 'showToast("Submitting project...", "info");'),
    ('showToast("Trabalho enviado com sucesso!", "success");', 'showToast("Project submitted successfully!", "success");'),
    ('showToast("Erro ao submeter trabalho.", "error");', 'showToast("Error submitting project.", "error");'),
    ('submittedBy || "Aluno"', 'submittedBy || "Student"'),
    ('submissionStatus.innerText = `Enviado por ${result.data.submittedBy || \'Group\'}`;', 'submissionStatus.innerText = `Submitted by ${result.data.submittedBy || \'Group\'}`;'),
    ('submissionStatus.innerText = "Pendente";', 'submissionStatus.innerText = "Pending";'),
    
    # Search placeholder
    ('searchInput.placeholder = isProf ? "Buscar aluno por nome ou email..." : "Buscar aluno por nome...";', 'searchInput.placeholder = isProf ? "Search student by name or email..." : "Search student by name...";'),
    
    # Readings header and placeholder
    ('Estudos Recentes e Leituras Recomendadas para esta Aula', 'Recent Studies & Recommended Readings for this Class'),
    ('Sem leituras recomendadas cadastradas para esta aula.', 'No recommended readings registered for this class.'),
    
    # API endpoints (aula1/aula2 -> class1/class2)
    ('/api/submissions/aula1/', '/api/submissions/class1/'),
    ('/api/submissions/aula2/', '/api/submissions/class2/'),
    
    # Previous submissions summary details
    ('<strong>Initial Investment:</strong> R$', '<strong>Initial Investment:</strong> $'),
    ('<strong>Annual Benefit:</strong> R$', '<strong>Annual Benefit:</strong> $'),
    ('<strong>Annual Maintenance Cost:</strong> R$', '<strong>Annual Maintenance Cost:</strong> $'),
    ('<strong>Hidden Risk Costs:</strong> R$', '<strong>Hidden Risk Costs:</strong> $'),
    ('<strong>Horizonte Temporal:</strong>', '<strong>Time Horizon:</strong>'),
    (' anos', ' years'),
    ('Ponto de Quebra (Break Point)', 'Break Point'),
    ('Pessimistic Scenario', 'Pessimistic Scenario'),
    ('Realistic Scenario', 'Realistic Scenario'),
    ('None (Viable in all)', 'None (Viable in all)')
]

for old, new in replacements:
    js = js.replace(old, new)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(js)

print("JS translation complete!")

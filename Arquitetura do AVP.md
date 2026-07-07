# Arquitetura do Ambiente Virtual do Projeto (AVP)

Disciplina: Avaliação de Riscos e Investimentos (ROI) — MBA em IA, Faculdade Moinhos de Vento

## 1. O que é o AVP

O AVP é a plataforma online onde os grupos realizam todo o Projeto Prático, substituindo PowerPoint, Excel e Word por formulários e calculadoras nativas. Cada grupo acessa com um código fornecido pelo professor e navega por três módulos, um por etapa, com salvamento automático.

## 2. Telas e fluxo

**Tela 1 — Acesso do Grupo**
Campo único: código do grupo (gerado pelo professor antes da Aula 1). Sem necessidade de senha individual, reduzindo fricção para alunos de MBA com agendas apertadas.

**Tela 2 — Painel do Grupo**
Mostra as três etapas em formato de trilha (como uma barra de progresso), o status de cada uma (não iniciada / em andamento / enviada), um cronômetro da aula corrente e um botão "Continuar" que leva direto ao módulo ativo.

**Tela 3 — Módulo Etapa 1: Mapeamento de Riscos**
Formulário com os quatro quadrantes (Técnicos, Operacionais, de Confiança, Financeiros), um campo de texto por quadrante e um campo separado para os *showstoppers*. Envio único por grupo; qualquer integrante pode editar até o envio final.

**Tela 4 — Módulo Etapa 2: Calculadora de ROI**
Campos de entrada (investimento inicial, ganhos/economias projetados) replicados em três colunas — Esperado, Realista, Pessimista/Catastrófico. O sistema calcula o ROI de cada cenário em tempo real e exibe os resultados anteriores da Etapa 1 como referência. Campo de texto para a justificativa do "ponto de quebra".

**Tela 5 — Módulo Etapa 3: Business Case**
Formulário estruturado com as seções obrigatórias (Sumário Executivo, Problema e Contexto, Solução Proposta, Análise Financeira, Riscos e Mitigações, Recomendação Final). Os dados de risco (Etapa 1) e os números de ROI (Etapa 2) aparecem pré-carregados como referência, evitando retrabalho. Contador de caracteres equivalente ao limite de duas páginas. Seletor de decisão final: GO / NO-GO / CONDICIONAL.

**Tela 6 — Painel do Professor**
Visão consolidada de todos os grupos: status de envio por etapa, respostas completas, decisão final de cada grupo e exportação dos dados (CSV/PDF) para correção e feedback.

## 3. Como sustentar isso sem infraestrutura pesada

Como você priorizou algo simples e independente (sem TI, sem servidor para manter), três caminhos são realistas, do mais simples ao mais flexível:

1. **Google Forms + Google Sheets, com cara própria.** Um formulário por etapa, com lógica condicional nativa do Google Forms. As respostas caem automaticamente em uma planilha que funciona como o "painel do professor". É gratuito, não exige código e você mesma consegue editar os formulários. Limitação: a calculadora de ROI em tempo real e o pré-carregamento de dados entre etapas não existem nativamente — o cálculo do ROI ficaria a cargo do aluno preencher números já calculados, ou você adiciona uma planilha auxiliar com fórmulas.

2. **Site próprio simples (como o protótipo entregue) + Google Sheets como banco de dados.** O front-end (HTML/CSS/JS, como o protótipo) fica hospedado gratuitamente (ex: Netlify, GitHub Pages) e os formulários enviam os dados para uma planilha Google via um pequeno script (Google Apps Script, gratuito, sem servidor próprio). Isso preserva a experiência completa — calculadora de ROI automática, dados pré-carregados entre etapas — com custo zero de hospedagem. É o caminho que mantém o protótipo funcional como ele é hoje, exigindo apenas a conexão final com a planilha.

3. **Plataforma no-code (Tally, Glide ou Softr) sobre Google Sheets/Airtable.** Meio-termo entre os dois: interface mais polida que Google Forms, lógica condicional e cálculos simples, sem exigir programação. Exige uma assinatura paga a partir de determinado volume de respostas, mas reduz a dependência de manutenção técnica no futuro.

Recomendação: começar pelo caminho 2, usando o protótipo entregue como front-end e uma planilha Google como armazenamento. Se a manutenção exigir menos dependência técnica ao longo do tempo, migrar para o caminho 3.

## 4. Próximos passos sugeridos

- Validar o protótipo com a visão de uma turma piloto antes de conectar a um banco de dados real.
- Definir quem mantém o AVP entre semestres (você, monitoria, ou TI da Faculdade).
- Decidir se o código de grupo é gerado manualmente ou automaticamente a cada turma.

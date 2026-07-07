# Prompt para o Anti-Gravity — Atualização do Ambiente Virtual da Disciplina

**Como usar este documento:** copie o conteúdo abaixo (a partir de "CONTEXTO") direto no Anti-Gravity como instrução de trabalho. Ele já está estruturado para o agente executar em etapas.

---

## CONTEXTO

Você vai atualizar o ambiente virtual de aprendizagem da disciplina **Avaliação de Riscos e Investimentos com ROI**, MBA em Inteligência Artificial Aplicada à Saúde, Faculdade Moinhos de Vento. O ambiente foi construído em torno do manual `Apresentacoes_e_Dinamicas_Completo.pdf` (3 aulas, cada uma com slides, notas de condução do docente, dinâmicas interativas síncronas e quiz de validação).

**Restrição importante:** dois arquivos já foram entregues aos alunos e **não podem ser alterados**: `Avaliação de Riscos e Investimentos com ROI Slides Alunos.pptx` e `Trabalho_Final_Template.docx`. Todo o trabalho abaixo deve acontecer na estrutura de conteúdo do **ambiente** (a mesma lógica de dados que gerou o manual de dinâmicas), não nesses dois arquivos.

Padrão de campo a preservar em cada bloco novo ou editado: `Bloco` | `Tempo Estimado` | `Conteúdo do Slide` | `Notas de Condução (Exclusivo Docente)` | quando houver interação: `Tipo de Dinâmica Interativa` | `Pergunta Síncrona` | `Opções de Resposta`. Tom de voz: segunda pessoa do plural ("vocês"), registro executivo, direto, sem jargão desnecessário — o mesmo tom já usado no restante do manual.

Execute nesta ordem: **Parte A (correções obrigatórias) → Parte B (conteúdo novo por aula) → Parte C (painel de apoio ao trabalho final) → Parte D (checagem final)**.

---

## PARTE A — Correções Obrigatórias (aplicar antes de tudo)

| # | Problema | Correção |
|---|----------|----------|
| A1 | O framework de 4 categorias de risco está inconsistente: o slide já entregue aos alunos e o gabarito do quiz da Aula 1 dizem "Técnico, Operacional, Financeiro, **Regulatório**"; mas os 4 exercícios de classificação de risco e o `Trabalho_Final_Template.docx` (já entregue, vale nota) usam "Técnico, Operacional, **Clínico-Cultural**, Financeiro". | Padronizar o ambiente (dinâmicas, gabarito do quiz, matriz) em **Técnico / Operacional / Clínico-Cultural / Financeiro**, pois é isso que será exigido na correção do trabalho final. Adicionar, na nota de condução da Aula 1 (bloco "Framework de Categorização de Riscos"), uma frase de transição reconhecendo a variação: *"No material impresso que vocês receberam, a quarta categoria aparece como 'Regulatório'. Na prática desta disciplina e no template do trabalho final, tratamos essa dimensão dentro de 'Clínico-Cultural', porque na saúde a resistência regulatória quase sempre vem acompanhada de resistência cultural da equipe assistencial. Usem Clínico-Cultural no trabalho de vocês."* |
| A2 | Dados financeiros fora de escala no cenário do **Grupo 4 (IA em Radiologia)**: CAPEX de R$ 800.000, mas Benefício Operacional Anual de R$ 80.000.000 e Custo de Riscos Mapeados de R$ 50.000.000 — cem vezes acima da ordem de grandeza dos outros 4 grupos. Isso quebra o simulador de ROI/VPL/Payback. | Corrigir para uma ordem de grandeza plausível e coerente com os demais grupos, por exemplo: Benefício Operacional Anual **R$ 1.200.000** e Custo Esperado de Riscos Mapeados **R$ 500.000** (ajustar livremente, mantendo a proporção com CAPEX de R$ 800.000 e OPEX de R$ 150.000). |
| A3 | Campo vazio (`None`) no **Grupo 5 (Prontuário Eletrônico Integrado)**, variável "Custo Esperado de Riscos Mapeados". | Preencher com **R$ 2.000.000**, valor já citado no próprio texto do caso como custo de contingência de go-live. |
| A4 | Datas das 3 aulas registradas em julho de **2025**, um ano antes da "Data de Publicação: Julho de 2026" que consta na capa do manual. | Atualizar as três datas propostas (Aula 1, 2 e 3) para o ano correto da turma vigente. |

---

## PARTE B — Conteúdo Novo por Aula

### B1. Aula 2 — Novo bloco de abertura: fundamentação metodológica

**Posição:** inserir logo após "Objetivos e Agenda" (Slide 3) e antes de "Avaliação de Risco como Defesa Institucional" (Slide 4 atual).

- **Bloco:** Fundamentação Metodológica | **Tempo estimado:** 6 min
- **Título do slide:** Como os Hospitais Calculam ROI?
- **Conteúdo do slide:**
  - Metodologia internacionalmente reconhecida, referendada pela AHRQ (*Agency for Healthcare Research and Quality*, EUA) em seu *Health IT Costs and Benefits Toolkit*.
  - Fórmula-base: **ROI = (Benefícios Financeiros − Investimento) ÷ Investimento**
  - Complementada por 4 métricas de apoio: **Payback, VPL (Valor Presente Líquido), TIR (Taxa Interna de Retorno) e Análise de Sensibilidade.**
  - Não é uma criação da disciplina: é o padrão que qualquer CFO reconhece e vai cobrar.
- **Notas de Condução:**
  > "Antes de entrarmos na matemática do ROI abrangente, preciso que vocês saibam de onde ela vem. Não é uma metodologia proprietária da nossa disciplina: é o padrão usado internacionalmente para avaliar investimentos em tecnologia de saúde, formalizado pela AHRQ nos Estados Unidos. A fórmula-base é simples: ROI é igual aos benefícios financeiros menos o investimento, dividido pelo investimento. O que a torna robusta não é a fórmula em si, mas o que vem depois dela: o Payback nos diz quando o dinheiro volta, o VPL traz os fluxos futuros a valor presente, a TIR compara a taxa de retorno do projeto com o custo de capital da instituição, e a análise de sensibilidade nos mostra o que acontece quando as premissas mudam. Quando vocês apresentarem um business case usando essas quatro métricas juntas, estarão falando a língua que qualquer diretoria financeira já conhece e espera ouvir."

### B2. Aula 2 — Separar benefício financeiro de benefício estratégico

**Posição:** logo após B1.

> Nota ao Anti-Gravity: o título "ROI Inteligente" da Aula 2 já está impresso no slide entregue aos alunos — não renomear o título da aula. A partir daqui, toda explicação do conceito deve deixar claro que "ROI Inteligente" é um guarda-chuva para duas coisas que não devem ser somadas cegamente: ROI Financeiro (quantificável) e Benefícios Estratégicos (não quantificáveis diretamente, mas decisivos).

- **Bloco:** Bloco 2: ROI Invisível | **Tempo estimado:** 5 min
- **Título do slide:** ROI Financeiro + Benefícios Estratégicos
- **Conteúdo do slide:**
  - **Benefícios Financeiros** (entram na fórmula do ROI): redução de custos, aumento de receita, produtividade / horas economizadas.
  - **Benefícios Estratégicos** (não entram na fórmula, mas entram na decisão): segurança do paciente, experiência do paciente, redução de burnout, reputação institucional, compliance regulatório.
- **Notas de Condução:**
  > "Um erro comum de quem está começando é jogar tudo dentro do número do ROI, incluindo coisas como reputação e satisfação do paciente. Isso é um erro técnico, porque não são números auditáveis, e é um erro estratégico, porque diminui a credibilidade do business case diante do CFO. Vamos separar em duas colunas. Na financeira, entra tudo que pode virar reais: redução de custo, aumento de receita, ganho de produtividade. Na estratégica, entram os benefícios que sustentam a decisão mas que vocês nunca deveriam forçar dentro da fórmula de ROI: segurança do paciente, experiência do paciente, redução de burnout da equipe, reputação e conformidade regulatória. Um bom business case apresenta as duas colunas lado a lado, nunca uma disfarçada de outra."

### B3. Aula 2 — "O que entra no ROI?" + Matriz de Monetização

**Posição:** logo após B2.

- **Bloco:** Bloco 2: ROI Invisível | **Tempo estimado:** 6 min
- **Título do slide:** O que Entra no ROI? A Matriz de Monetização
- **Tabela 1 — O que entra / não entra no cálculo:**

  | Entra no cálculo | Não entra no cálculo |
  |---|---|
  | Economia de horas da equipe | Satisfação do paciente |
  | Redução de glosas | Cultura organizacional |
  | Redução de readmissões (quando monetizada por convênio/DRG) | Reputação institucional |
  | Receita adicional por novo volume/serviço | Equidade em saúde |

- **Tabela 2 — Matriz de Monetização:**

  | Benefício | Pode monetizar? |
  |---|---|
  | Tempo médico | Sim |
  | Tempo de enfermagem | Sim |
  | Burnout | Parcialmente (via turnover e absenteísmo) |
  | Mortalidade | Não diretamente (mas os eventos evitados sim) |
  | Segurança do paciente | Não diretamente (mas os eventos adversos evitados sim) |
  | Reputação | Muito difícil |

- **Notas de Condução:**
  > "Toda turma me pergunta a mesma coisa nesse ponto: isso entra ou não entra na planilha? Vamos resolver com duas tabelas. A primeira separa o que efetivamente compõe o numerador do ROI do que fica de fora, mesmo sendo real e importante. A segunda é mais sutil: existem benefícios que parecem impossíveis de monetizar, mas têm uma porta de entrada indireta. Burnout não entra direto, mas vira turnover, e turnover tem custo de recrutamento e retreinamento perfeitamente mensurável. Mortalidade e segurança do paciente raramente entram como número direto, mas os eventos adversos que eles evitam, sim. Essa é a disciplina de tradução que separa um analista júnior de um verdadeiro guardião da viabilidade."

### B4. Aula 2 — Qual premissa mais influencia o ROI (causalidade e sensibilidade)

**Posição:** dentro do Bloco 1: Testes de Estresse, logo após "O que é um Teste de Estresse Financeiro" (Slide 5 atual) e antes do caso de Telemetria.

- **Bloco:** Bloco 1: Testes de Estresse | **Tempo estimado:** 8 min
- **Título do slide:** Qual Premissa Mais Influencia o ROI?
- **Conteúdo do slide:**
  - Cadeia causal 1: **Adoção → Economia → ROI**
  - Cadeia causal 2: **Treinamento → Adoção → ROI**
  - Pergunta-chave: "Se vocês só pudessem melhorar UMA variável do projeto, qual teria mais efeito sobre o ROI final?"
- **Tipo de Dinâmica Interativa:** Enquete Multicritério
- **Pergunta Síncrona:** "No cenário do seu grupo, qual variável, se cair 10%, mais destrói o ROI: adoção clínica, custo de manutenção, ou benefício operacional esperado?"
- **Notas de Condução:**
  > "Análise de sensibilidade não é rodar o cenário pessimista uma vez e arquivar. É perguntar, variável por variável, qual delas o projeto é mais sensível. Olhem essas duas cadeias causais. Na primeira, a adoção clínica impacta diretamente a economia gerada, que impacta o ROI. Na segunda, o treinamento impacta a adoção, que por sua vez impacta o ROI — um efeito indireto, mas real. Essa é uma habilidade de raciocínio causal, não só de planilha: antes de aprovar um investimento, vocês precisam saber qual alavanca, se puxada, muda o resultado. Isso muda completamente a conversa com o fornecedor, porque agora vocês sabem exatamente o que negociar: mais suporte de adoção, mais treinamento, ou menos custo fixo."

### B5. Aula 2 — O ROI como intervalo, não como número fixo

**Posição:** logo após B4, antes do caso de Telemetria (ou integrar ao debrief "O que Mudou o Resultado", Slide 19 atual).

- **Bloco:** Bloco 1: Testes de Estresse | **Tempo estimado:** 4 min
- **Título do slide:** O ROI Não É um Número. É um Intervalo.
- **Conteúdo do slide:**
  - ROI esperado: **35%**
  - Intervalo provável: **18% – 46%**
  - Frase-chave: *"Um ROI apresentado sem intervalo de confiança é uma promessa de marketing disfarçada de matemática financeira."*
- **Notas de Condução:**
  > "Até agora, cada grupo calculou um número único de ROI. Isso é o primeiro passo, não o último. No mundo real, vocês nunca vão apresentar um ROI de 35% sem contexto. Vão apresentar um ROI esperado de 35%, com um intervalo provável entre 18 e 46%, dependendo da taxa de adoção e dos custos de infraestrutura que discutimos. Essa é a diferença entre um analista que entende risco e um vendedor que só repete o número do fornecedor. Quando o conselho perguntar 'e se a adoção for menor', vocês já vão ter a resposta pronta, porque já rodaram o intervalo."

### B6. Aula 2 — ROI Esperado vs. ROI Observado (a equação da adoção)

**Posição:** logo após B5, fechando a fundamentação teórica antes dos casos reais (Telemetria, DermAssist, Farmácia).

- **Bloco:** Bloco 1: Testes de Estresse | **Tempo estimado:** 7 min
- **Título do slide:** ROI Esperado vs. ROI Observado: A Equação da Adoção
- **Conteúdo do slide:**
  - Conceito: **exposição teórica** (o que a tecnologia consegue fazer) vs. **exposição observada** (o que ela realmente faz em uso real). Dado real de mercado: em tarefas administrativas, sistemas de IA têm capacidade técnica para automatizar a maior parte da tarefa, mas o uso observado em escala real ainda é uma fração bem menor disso.
  - Exemplo prático: *"O fornecedor promete 40 horas economizadas por mês. Na prática, a equipe entrega 12 horas."*
  - Equação central: **ROI observado = ROI esperado × Taxa de adoção**
  - Consequência direta: com 45% de adoção, o ROI jamais alcança o número da proposta comercial, mesmo que a tecnologia funcione perfeitamente.
- **Notas de Condução:**
  > "Existe uma diferença enorme entre o que uma tecnologia é capaz de fazer e o que ela de fato faz dentro da sua instituição. Chamamos isso de exposição teórica versus exposição observada. Um fornecedor vai te mostrar o teto técnico da ferramenta. Mas o uso real, em produção, dentro da cultura e dos processos do seu hospital, é sempre uma fração disso. Essa lacuna tem nome: taxa de adoção. E ela não é um detalhe, é multiplicativa. ROI observado é igual ao ROI esperado multiplicado pela taxa de adoção. Se a adoção for de 45%, não importa quão bom seja o algoritmo, o retorno real nunca vai chegar perto do que está na proposta comercial. A partir de hoje, toda vez que alguém apresentar um número de ROI, a primeira pergunta de vocês deve ser: essa é a taxa de adoção esperada, ou a taxa de adoção observada em um caso real parecido com o meu?"

### B7. Aula 2 — Nova dinâmica em grupo: Use, Compose ou Build?

**Posição:** logo após B6, antes do caso de Telemetria. Pode substituir o tempo hoje alocado a "Coragem Analítica vs. Moda Tecnológica" (Slide 8 atual), se for preciso abrir espaço na carga horária.

- **Bloco:** Bloco 1: Testes de Estresse | **Tempo estimado:** 12 min
- **Título do slide:** Use, Compose ou Build: Qual Gera Mais ROI?
- **Setup (conteúdo do slide):** cada grupo recebe 3 opções de solução para o mesmo problema clínico do seu cenário:
  - **Use** — SaaS pronto de mercado: alavancagem máxima, diferenciação mínima, baixo custo, alta velocidade, baixo controle.
  - **Compose** — construção sobre API de modelo de fronteira com contexto próprio: alavancagem e diferenciação médias, custo e velocidade equilibrados.
  - **Build** — modelo treinado internamente: alavancagem baixa, diferenciação máxima, alto custo, menor velocidade, maior controle.
- **Comando:** "Qual das três opções gera o maior ROI para o cenário do seu grupo? Justifiquem em 3 frases."
- **Tipo de Dinâmica Interativa:** Trabalho em pequenos grupos + Enquete Multicritério final
- **Pergunta Síncrona:** "Depois da discussão em grupo: qual modelo de implementação (Use, Compose ou Build) vocês escolheriam para o cenário da sua equipe?"
- **Notas de Condução:**
  > "Nem todo projeto de IA em saúde precisa ser construído do zero, e essa é uma das decisões mais mal compreendidas em comitês executivos. Existem três caminhos. Use é contratar uma solução pronta: ganha-se velocidade e paga-se menos, mas não há diferenciação frente à concorrência e a dependência do fornecedor é total. Compose é construir em cima de um modelo de fronteira já existente, adaptando ao seu contexto: custo e velocidade ficam no meio do caminho, com alguma diferenciação. Build é treinar seu próprio modelo: máximo controle e diferenciação, ao maior custo e à menor velocidade de entrega. Não existe resposta certa fora de contexto. Um hospital que só precisa de triagem administrativa provavelmente não deveria treinar um modelo próprio. Um hospital que quer um diferencial competitivo de longo prazo pode precisar. Levem essa decisão para o cenário do grupo de vocês e defendam a escolha com a mesma disciplina analítica que usamos no resto da disciplina."

### B8. Aula 1 — Reforço de coerência do framework de risco

**Posição:** já coberto pela correção A1. Confirmar que a nota de transição da correção A1 está ativa no bloco "Framework de Categorização de Riscos" (Slide 8 atual) antes de seguir para os 4 exercícios de classificação (Slides 12–15 atuais).

### B9. Aula 3 — Framework ROI-5 (framework autoral de encerramento)

**Posição:** inserir logo antes de "Workshop do Projeto Final · Business Case" (Slide 18 atual) e depois de "Rubrica e Critérios de Avaliação" (Slide 17 atual). É a síntese de tudo que foi ensinado nas 3 aulas.

- **Bloco:** Trabalho em Grupo | **Tempo estimado:** 8 min
- **Título do slide:** Framework ROI-5: As 5 Perguntas Antes do GO
- **Conteúdo do slide** — cinco perguntas, nesta ordem, antes de aprovar qualquer investimento em IA:
  1. **Resolve um problema relevante?** (conecta com Aula 1: risco aparente vs. oculto, matriz de impacto)
  2. **O benefício pode ser monetizado?** (conecta com B3: matriz de monetização)
  3. **O risco foi quantificado?** (conecta com Aula 1: framework de 4 categorias)
  4. **A organização conseguirá adotar?** (conecta com B6: ROI observado = ROI esperado × adoção)
  5. **O ROI permanece positivo após o teste de estresse?** (conecta com Aula 2: cenário pessimista)
  - Resultado: **GO** ou **NO-GO**.
- **Notas de Condução:**
  > "Chegamos ao fechamento da disciplina, e eu quero deixar vocês com uma ferramenta que cabe em um post-it, mas carrega três aulas inteiras de raciocínio. Chamo de Framework ROI-5: cinco perguntas, sempre nessa ordem, antes de aprovar qualquer investimento em inteligência artificial na sua instituição. Primeiro: isso resolve um problema relevante, ou é solução atrás de problema? Segundo: o benefício pode ser monetizado, ou estamos prometendo algo que nunca vai virar número auditável? Terceiro: o risco foi quantificado nas quatro categorias que vimos na Aula 1? Quarto: a organização realmente vai adotar isso, ou vamos comprar uma ferramenta que ninguém usa? Quinto: depois do teste de estresse, o ROI ainda é positivo, ou só é positivo no cenário otimista da proposta comercial? Se as cinco respostas forem sólidas, o caminho é GO. Se qualquer uma delas falhar sem um plano de mitigação real, é NO-GO, e dizer não, aqui, é tão válido quanto dizer sim."

### B10. Aula 3 — Nova dinâmica: "Comitê Executivo: Você Aprovaria Esse Investimento?"

**Posição:** inserir logo após a enquete "Escolha a Solução Vencedora" (Slide 16 atual) e antes de "Rubrica e Critérios de Avaliação" (Slide 17 atual). Se necessário abrir espaço na carga horária, reduzir o tempo hoje alocado a "Consultoria em Grupo no Portal" (Slide 19 atual, 25 min).

- **Bloco:** Bloco 2: Matriz de Decisão Multifatorial | **Tempo estimado:** 15–18 min
- **Título do slide:** Comitê Executivo: Você Aprovaria Esse Investimento?
- **Tipo de Dinâmica Interativa:** Simulação de comitê + apresentação oral curta + votação
- **Setup (conteúdo do slide) — cenário de simulação:**
  - Investimento: **R$ 5.000.000**
  - ROI projetado: **32%**
  - Payback: **4 anos**
  - Mas: baixo engajamento médico projetado, integração técnica difícil com sistemas legados, fornecedor novo no mercado sem histórico de implantação em hospitais de porte semelhante.
- **Comando:** "Vocês são o comitê executivo. A decisão não é recalcular o ROI, é decidir: GO ou NO-GO, e defender a decisão em 90 segundos usando o Framework ROI-5."
- **Mecânica:**
  1. Grupos recebem o cenário e 5 minutos para aplicar as 5 perguntas do Framework ROI-5.
  2. Cada grupo apresenta a decisão (GO/NO-GO) em até 90 segundos, citando obrigatoriamente ao menos 2 das 5 perguntas na justificativa.
  3. Enquete final ao vivo: "Depois de ouvir as defesas dos grupos, qual seria a sua decisão pessoal: GO ou NO-GO?"
  4. Debrief do facilitador: não existe gabarito de decisão certa — o critério de avaliação é a qualidade da defesa, não a decisão em si.
- **Pergunta Síncrona (enquete final):** "Depois de ouvir as defesas dos grupos, qual seria a sua decisão pessoal: GO ou NO-GO?"
- **Notas de Condução:**
  > "Essa é a atividade mais próxima da vida real que vocês vão viver nesta disciplina. Em um comitê executivo de verdade, ninguém entrega uma planilha limpa pedindo para você recalcular o ROI. Você recebe um resumo, muitas vezes incompleto, com sinais contraditórios, e precisa decidir. Olhem o cenário: ROI de 32%, payback de 4 anos, números que parecem bons no papel. Mas o engajamento médico projetado é baixo, a integração técnica é difícil, e o fornecedor é novo, sem histórico comprovado em hospitais do porte de vocês. A pergunta não é 'o ROI é positivo?'. É 'vocês apostariam a credibilidade profissional de vocês nesse GO?'. Usem as cinco perguntas do framework, não para chegar a uma resposta óbvia, mas para estruturar o argumento. Vocês têm 5 minutos de discussão e 90 segundos de defesa. Esse é o tempo real que um CFO ocupado vai dar a vocês numa reunião de comitê."

---

## PARTE C — Painel de Apoio ao Trabalho Final (sem alterar o .docx entregue)

Como `Trabalho_Final_Template.docx` já foi entregue e não pode ser alterado, criar **dentro do portal** dois painéis complementares de apoio ao preenchimento — o conteúdo gerado neles é copiado manualmente pelo aluno para o Word.

### C1. Painel "Premissas Utilizadas"
Campos: Volume (pacientes/exames por período) · Taxa de Adoção assumida · Horizonte de Análise (anos) · Custo/Hora da equipe envolvida · Fonte de cada dado (estimativa da equipe / benchmark de mercado / dado real do caso).

Instrução ao aluno: *"Documentem aqui as premissas antes de escrever o Sumário Executivo. Um ROI defensável é um ROI cujas premissas alguém de fora conseguiria auditar."*

### C2. Painel "Limitações"
Pergunta guia: *"O que pode fazer o ROI deste projeto não acontecer?"*

Instrução ao aluno: listar no mínimo 2 limitações reais (não hipotéticas) do próprio business case, conectando explicitamente com as perguntas 4 e 5 do Framework ROI-5 (B9).

---

## PARTE D — Checagem Final (executar por último)

1. Confirmar que as correções da Parte A foram aplicadas **antes** de qualquer outra mudança — A2 e A3 quebram o simulador se não forem corrigidas primeiro.
2. Recalcular a carga horária total da Aula 2 após os acréscimos de B1 a B7 (soma aproximada de +36 a +40 min). Comparar com a carga horária total do Plano de Ensino (24h para as 3 aulas síncronas + atividades assíncronas) e sinalizar quais blocos antigos podem ser encurtados ou movidos para leitura assíncrona, caso ultrapasse o previsto.
3. Confirmar que nenhuma alteração foi feita em `Avaliação de Riscos e Investimentos com ROI Slides Alunos.pptx` nem em `Trabalho_Final_Template.docx`.
4. Confirmar que os novos blocos seguem o padrão de campos do manual original (`Bloco`, `Tempo Estimado`, `Conteúdo do Slide`, `Notas de Condução`, e os campos de dinâmica interativa quando aplicável).
5. Gerar um changelog curto do que foi alterado, para a professora revisar antes de publicar para a turma.

---

## PARTE E — Auditoria e Ajuste das Notas de Condução (Aulas 1, 2 e 3)

**Metodologia:** cada uma das ~74 notas de condução do manual foi comparada com o título e o conteúdo real do respectivo slide. A maior parte está bem alinhada e não precisa de alteração. Mas foi encontrado um padrão real de bug em vários pontos das Aulas 2 e 3: a nota de um slide descreve, na verdade, o assunto de um slide vizinho (nota deslocada). Isso faz o docente falar ao vivo sobre o tema errado se seguir o roteiro literalmente. Abaixo estão só os blocos que precisam de correção, com o texto pronto para substituir. Marcação de severidade: **[BUG]** = a nota descreve um assunto diferente do slide; **[AJUSTE]** = a nota está no tema certo mas é genérica demais e pode ficar mais específica.

### E.1 — Aula 1

Revisão completa: apenas o slide "Framework de Categorização de Riscos" precisa de ajuste, e essa correção já está coberta na **Parte A, item A1** (padronizar em Técnico / Operacional / Clínico-Cultural / Financeiro). Os demais 27 blocos de notas da Aula 1 foram revisados individualmente e estão corretos, bem escritos e alinhados aos seus respectivos slides — **não alterar**.

### E.2 — Aula 2

**[BUG] Slide "Objetivos e Agenda"** — a nota atual é, na verdade, uma pergunta de check-in que pertence ao icebreaker, não uma descrição de objetivos e agenda.
> **Nova nota:** "Nosso objetivo hoje é sair da teoria do risco e entrar na matemática do ROI. Vocês vão aprender a rodar um teste de estresse financeiro e a calcular o ROI abrangente, aquele que inclui os custos que a proposta comercial nunca menciona. A agenda tem dois blocos: primeiro, testes de estresse; depois, a matemática do ROI invisível, com casos reais de telemetria, dermatologia e farmácia. Ao final, cada grupo vai submeter uma mini planilha de ROI — hoje vocês calculam, não só ouvem."

**[BUG] Slide "Avaliação de Risco como Defesa Institucional"** — a nota atual descreve objetivos da aula, não o tema do "veto dos dados".
> **Nova nota:** "Esse é o mantra do nosso segundo encontro: dizer não, quando os dados apontam para isso, também é entregar valor. Avaliação de risco não existe para travar a inovação, existe para proteger a instituição de investimentos que a infraestrutura ou a cultura organizacional ainda não sustentam. O papel de vocês como guardiões da viabilidade não é aprovar tudo que chega bonito na proposta comercial, é ter a coragem analítica de vetar o que os números mostram que não vai funcionar."

**[BUG] Slide "O Erro do ROI de Curto Prazo"** — a nota atual descreve uma dinâmica de lousa que não pertence a este slide.
> **Nova nota:** "Aqui mora um dos vieses mais caros da gestão de saúde: olhar só a planilha do mês seguinte. Um projeto de prevenção, como triagem precoce ou telemetria contínua, raramente devolve o investimento no primeiro trimestre. Os benefícios de prevenção aparecem no ano 2 ou 3, quando a curva de eventos evitados começa a compensar o investimento inicial. Se vocês avaliarem um projeto de saúde digital só pelo fluxo de caixa de curto prazo, vão sistematicamente rejeitar exatamente os projetos que mais protegem o paciente e a instituição no longo prazo."

**[BUG] Slide "Caso Integrado · Automação de Farmácia"** — a nota atual descreve uma cadeia de dados de imagem/PACS, sem relação com farmácia.
> **Nova nota:** "Automação de farmácia é um dos casos mais diretos de ROI abrangente, porque cada erro de dispensação evitado tem valor financeiro e clínico simultâneo. Dispensadores robóticos reduzem o erro humano de troca de medicamento e dose, mas o retorno real depende de dois fatores que a proposta comercial raramente detalha: a integração com o sistema de prescrição legado, que se falhar propaga o erro em vez de eliminá-lo, e a curva de confiança da equipe farmacêutica, que pode resistir ao novo fluxo de trabalho. O benefício técnico só vira ROI quando os dois se resolvem."

**[BUG] Slide "Leitura Recomendada: Nassou & Moukadem (2025)"** — a nota atual descreve o caso Google DermAssist (já coberto em slide anterior), não o artigo de Nassou & Moukadem.
> **Nova nota:** "A leitura de Nassou e Moukadem (2025) revisa como a inteligência artificial se integra ao controle de gestão hospitalar, indo além do caso clínico isolado para pensar governança financeira e operacional de forma sistêmica. É uma boa ponte entre o que vimos até aqui, caso a caso, e o que vamos construir na Aula 3: uma visão de portfólio, não só de projeto único."

**[AJUSTE] Slide "Reflexão Final — Aula 2"** — a nota descreve uma pergunta diferente da pergunta síncrona real configurada no slide ("Em uma palavra: o que você passa a enxergar agora que antes era invisível?").
> **Nova nota:** "Peço que respondam no painel, em uma palavra: o que vocês passam a enxergar agora que antes era invisível? Não precisa ser sofisticado. Pode ser 'adoção', pode ser 'infraestrutura', pode ser 'glosa'. O que importa é que, a partir de hoje, esse termo vai aparecer na cabeça de vocês toda vez que alguém apresentar um ROI bonito demais para ser verdade."

Os demais 16 blocos de notas da Aula 2 foram revisados e estão alinhados aos seus slides — não alterar.

### E.3 — Aula 3

**[BUG] Slide "Icebreaker · O que Trava a Diretoria"** — a nota atual descreve os objetivos da aula, não o icebreaker.
> **Nova nota:** "Peço que respondam, em uma palavra: o que mais trava a aprovação de um bom projeto na diretoria de vocês? Não filtrem a resposta. Pode ser 'burocracia', pode ser 'medo', pode ser 'CFO'. Essa nuvem de palavras vai nos dizer muito sobre os obstáculos reais de governança que vocês enfrentam, e vamos usar isso como ponto de partida para a aula de hoje."

**[BUG] Slide "Objetivos e Agenda"** — a nota atual é a pergunta de check-in que pertence ao icebreaker.
> **Nova nota:** "Hoje é o nosso terceiro e último encontro síncrono, e o objetivo é converter tudo que vocês aprenderam sobre risco e ROI em um Business Case que resista a uma sala de conselho. Vocês vão sair sabendo estruturar esse business case e montar uma matriz de decisão multifatorial para comparar fornecedores de forma isenta. Essa aula prepara diretamente o Projeto Prático em Grupo, que vale 35% da nota — a maior alavanca avaliativa da disciplina. Prestem atenção redobrada."

**[AJUSTE] Slide "Falar a Língua dos Stakeholders Financeiros"** — a nota é genérica; pode reforçar diretamente a sequência objetividade → evidência → mitigação que está no slide.
> **Nova nota:** "Reparem na ordem dessas três palavras: objetividade, evidência, mitigação de perdas. Não é acaso. Comecem pela perda evitada, nunca pela tecnologia em si — um CFO não se importa com o modelo de IA, se importa com o que deixa de sair do caixa. Depois, tragam evidência: todo número precisa de uma premissa auditável por trás. Só no final, mitigação de perdas como conclusão lógica do argumento. Essa sequência, nessa ordem, é o que separa um pitch de um business case."

**[AJUSTE] Slide "Leitura Recomendada: Miri & Mayo (2025)"** — a nota é genérica; pode citar a tese central do artigo e conectar com o template do trabalho final.
> **Nova nota:** "O artigo de Miri e Mayo (2025), 'Patients Aren't Datasets', defende que gerar ROI por automação só é legítimo quando feito com responsabilidade clínica. Usem essa leitura como guia de estrutura: um business case de alto impacto cabe em duas páginas — resumo executivo, gargalo assistencial, solução proposta, matriz de mitigação de riscos, simulação financeira sob estresse e recomendação de capital. Não por coincidência, essa é exatamente a estrutura do Trabalho_Final_Template.docx que vocês vão preencher."

**[BUG] Slide "Qual Argumento Convence seu CFO?"** — a nota atual descreve o caso Mayo Clinic AI-ECG, que pertence ao próximo slide.
> **Nova nota:** "Escrevam uma frase só. Não um parágrafo, uma frase: o argumento que mais convenceria o CFO de vocês a aprovar o investimento. A turma vai poder curtir as respostas mais fortes. Esse exercício parece simples, mas é o teste real: se vocês não conseguem resumir o valor do projeto em uma frase, é sinal de que o argumento ainda não está claro nem para vocês mesmos."

**[BUG] Slide "Caso Real Internacional · Mayo Clinic AI-ECG (EAGLE)"** — a nota atual descreve a matriz de decisão ponderada, que pertence ao Bloco 2 mais adiante.
> **Nova nota:** "O ensaio EAGLE da Mayo Clinic é o contraponto perfeito ao case do IBM Watson que vimos na Aula 1. O ROI teórico era de 250%, mas caiu para 41% na prática, e o payback subiu de menos de 1 ano para 2,8 anos, quando descobriram que a revisão médica levava 20 minutos em vez de 5, e que cada site de implantação custava USD 200 mil a mais em integração. A lição não é que o projeto falhou. É que um problema bem definido, com desfecho mensurável e governança desde o início, produz um business case robusto mesmo quando o número final é bem menor que o prometido."

**[BUG] Slide "Lastro Real Brasil · IA Clínica em Ação"** — a nota atual descreve uma dinâmica de lousa com matriz ponderada, sem relação com os casos Laura/Neonpass.
> **Nova nota:** "Dois casos brasileiros, dois desfechos concretos. O Robô Laura reduziu o tempo entre suspeita de sepse e a primeira dose de antibiótico de 13 horas para 2h58, e cada hora a menos nesse intervalo tem correlação direta com sobrevida. O Neonpass, no Einstein, mostrou que só 35,4% das chamadas de pacientes exigiam de fato a enfermagem, devolvendo tempo assistencial que estava sendo consumido por triagem manual. Em nenhum dos dois casos o ganho veio só da tecnologia: veio da tecnologia combinada com redesenho de processo."

**[AJUSTE] Slide "Além do Preço"** — a nota é genérica; pode conectar diretamente com o conceito de custo total de propriedade.
> **Nova nota:** "A solução mais barata da proposta comercial pode ser a mais cara nos próximos três anos, se ela gerar retrabalho, resistência da equipe ou upgrade de infraestrutura não previsto. Preço é um critério dentro da matriz de decisão, não o critério que decide sozinho. Antes de pontuar qualquer fornecedor, perguntem: qual o custo total de propriedade em três anos, não só o valor da proposta inicial?"

**[BUG] Slide "Como Calcular a Pontuação Ponderada"** — a nota atual só anuncia o arquivo do template, sem explicar a fórmula de cálculo que é o próprio título do slide.
> **Nova nota:** "A conta é simples, mas precisa ser feita na ordem certa. Primeiro, definam os critérios relevantes: custo total, risco clínico, escalabilidade, o que fizer sentido para o cenário de vocês. Segundo, atribuam o peso de cada critério antes de olhar para as soluções — essa ordem é o que evita viés de confirmação. Terceiro, pontuem cada solução de 1 a 5 em cada critério. Quarto, calculem a pontuação final somando nota vezes peso de cada critério. Quinto, comparem: a maior pontuação ponderada vence, e se o voto do coração de vocês divergir do resultado da matriz, é hora de investigar esse viés emocional antes de decidir."

**[BUG] Slide "Governança da Inovação"** — a nota atual repete a leitura de Laura/Neonpass já coberta em slide anterior, sem falar de governança.
> **Nova nota:** "Governança não é burocracia, é proteção — da instituição e de quem decide. Isso significa três coisas na prática: critérios definidos antes da avaliação, nunca depois; rastreabilidade de quem decidiu, com base em quê, e quando; e documentação que aguenta ser revisitada seis meses depois, quando alguém perguntar por que aquele fornecedor foi escolhido. Um comitê que consegue responder essas três perguntas está protegido. Um que não consegue, está exposto, mesmo que a decisão tenha sido tecnicamente correta."

**[BUG] Slide "Escolha a Solução Vencedora"** — a nota atual descreve logística de entrega final, não orienta a votação ao vivo do slide.
> **Nova nota:** "Com base na matriz de decisão ponderada que construímos, vote agora: entre as três opções apresentadas, qual seria a vencedora? Antes de votar, lembrem da armadilha: a opção de menor preço inicial nem sempre é a de maior pontuação ponderada, porque o risco de integração e a fragilidade do fornecedor também entram na conta. Deixem a matriz decidir, não o instinto."

**[BUG] Slide "Rubrica e Critérios de Avaliação"** — a nota atual parabeniza submissões que ainda não aconteceram nesse ponto da aula (o workshop final vem depois); precisa explicar a rubrica de fato.
> **Nova nota:** "O Projeto Prático em Grupo vale 35% da nota, a maior fatia da avaliação da disciplina, e a nota mínima de aprovação é 70% na média ponderada geral. O que separa um business case nota máxima de um mediano não é a sofisticação da tecnologia escolhida pelo grupo, é a defensabilidade das premissas e a qualidade da narrativa executiva: números auditáveis, riscos quantificados nas quatro categorias que vimos na Aula 1, e uma recomendação de GO ou NO-GO que resiste a perguntas difíceis do comitê."

**[BUG] Slide "Workshop do Projeto Final · Business Case"** — a nota atual é uma pergunta de reflexão de encerramento, não a instrução do checklist do workshop.
> **Nova nota:** "A partir de agora é mão na massa. Usem os próximos minutos para avançar o checklist do trabalho final: simulação de fluxo mapeada, teste de estresse aplicado, ROI abrangente calculado com pelo menos dois riscos invisíveis, e a justificativa de cinco partes para o conselho já esboçada. Definam também os papéis dentro do grupo agora, não na véspera da entrega."

**[BUG] Slide "Consultoria em Grupo no Portal"** — a nota atual é um comentário de encerramento ("parabéns a todos"), não a instrução da consultoria ao vivo.
> **Nova nota:** "Esse é o momento de consultoria ao vivo. Avancem a tese de investimento do grupo de vocês no portal e registrem as dúvidas específicas na aba de consultoria — vou circular entre os grupos para orientar diretamente. Aproveitem esse tempo para testar a robustez do argumento de vocês antes da entrega final: é mais barato encontrar a fragilidade agora do que na frente da banca."

Os demais 9 blocos de notas da Aula 3 (incluindo capa, "Reflexão Final · Encerramento", "Síntese da Disciplina", "Mantra Final", "Referências" e "Guardiões da Viabilidade") foram revisados e estão alinhados aos seus slides — não alterar.

### E.4 — Checagem específica da Parte E

- Depois de aplicar as correções acima, ler a sequência completa de notas de cada aula em voz alta (ou pedir ao Anti-Gravity para simular a leitura) e confirmar que nenhuma nota menciona um assunto, caso ou dado que pertence a outro slide.
- Onde a nota corrigida menciona "Trabalho_Final_Template.docx" (Miri & Mayo, Aula 3), confirmar que o nome do arquivo está exatamente igual ao arquivo já entregue aos alunos.
- Estas correções de nota não alteram nenhum texto visível nos slides do `.pptx` já entregue — afetam apenas o roteiro do docente dentro do ambiente.

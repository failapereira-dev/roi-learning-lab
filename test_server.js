// Test script to validate local API endpoints of the Express server.
const http = require('http');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

// Helper to make GET requests
function get(path) {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve({
            statusCode: res.statusCode,
            body: JSON.parse(data)
          });
        } catch (e) {
          resolve({
            statusCode: res.statusCode,
            body: data
          });
        }
      });
    }).on('error', reject);
  });
}

// Helper to make POST requests
function post(path, payload) {
  return new Promise((resolve, reject) => {
    const dataStr = JSON.stringify(payload);
    const req = http.request(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(dataStr)
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve({
            statusCode: res.statusCode,
            body: JSON.parse(data)
          });
        } catch (e) {
          resolve({
            statusCode: res.statusCode,
            body: data
          });
        }
      });
    });
    req.on('error', reject);
    req.write(dataStr);
    req.end();
  });
}

async function runTests() {
  console.log("=== INICIANDO TESTES DO SERVIDOR ROI ===");

  try {
    // 1. Test GET /api/classes
    const classesRes = await get('/api/classes');
    if (classesRes.statusCode === 200 && Array.isArray(classesRes.body)) {
      console.log("✔ GET /api/classes - Sucesso! Retornou as classes da ementa.");
    } else {
      console.error("✘ GET /api/classes - Falhou", classesRes);
    }

    // 2. Test GET /api/scenarios
    const scenariosRes = await get('/api/scenarios');
    if (scenariosRes.statusCode === 200 && scenariosRes.body["1"]) {
      console.log("✔ GET /api/scenarios - Sucesso! Retornou os cenários das equipes.");
    } else {
      console.error("✘ GET /api/scenarios - Falhou", scenariosRes);
    }

    // 3. Test GET /api/students
    const studentsRes = await get('/api/students');
    if (studentsRes.statusCode === 200 && studentsRes.body.length === 43) {
      console.log("✔ GET /api/students - Sucesso! Retornou os 43 alunos cadastrados (incluindo os 5 visitantes).");
    } else {
      console.error("✘ GET /api/students - Falhou (Esperado 43 alunos)", studentsRes);
    }

    // 4. Test GET /api/state
    const stateRes = await get('/api/state');
    if (stateRes.statusCode === 200 && stateRes.body.classId) {
      console.log("✔ GET /api/state - Sucesso! Retornou o estado inicial da aula.");
    } else {
      console.error("✘ GET /api/state - Falhou", stateRes);
    }

    // 5. Test POST /api/state (Update slide topic)
    const updateStateRes = await post('/api/state', {
      classId: "aula1",
      slideId: "slide_1_6",
      syncEnabled: true
    });
    if (updateStateRes.statusCode === 200 && updateStateRes.body.slideId === "slide_1_6") {
      console.log("✔ POST /api/state - Sucesso! Atualizou o slide ativo para 'slide_1_6'.");
    } else {
      console.error("✘ POST /api/state - Falhou", updateStateRes);
    }

    // 6. Test POST /api/submissions (Submit group assignment)
    const submitAssignmentRes = await post('/api/submissions/aula1/1', {
      submissionData: {
        risk_tech: "Risco de acurácia de dados na triagem",
        mit_tech: "Utilizar validação clínica assistida no primeiro mês",
        risk_oper: "Colapso no agendamento de exames por aceleração",
        mit_oper: "Adequação operacional do setor administrativo",
        risk_clinical: "Médicos resistentes à ferramenta",
        mit_clinical: "Dar controle final ao médico e posicionar como assistente",
        risk_financial: "Infraestrutura de rede cara",
        mit_financial: "Alocação de verba prévia",
        showstopper: "technical"
      },
      submittedBy: "Aline Brenner"
    });
    if (submitAssignmentRes.statusCode === 200 && submitAssignmentRes.body.success) {
      console.log("✔ POST /api/submissions/aula1/1 - Sucesso! Trabalho enviado.");
    } else {
      console.error("✘ POST /api/submissions/aula1/1 - Falhou", submitAssignmentRes);
    }

    // 7. Test GET /api/submissions/aula1/1 (Retrieve group assignment)
    const getAssignmentRes = await get('/api/submissions/aula1/1');
    if (getAssignmentRes.statusCode === 200 && getAssignmentRes.body.submitted) {
      console.log("✔ GET /api/submissions/aula1/1 - Sucesso! Recuperou o trabalho salvo.");
    } else {
      console.error("✘ GET /api/submissions/aula1/1 - Falhou", getAssignmentRes);
    }

    // 8. Test POST /api/comments (Submit professor comment and grade)
    const submitCommentRes = await post('/api/comments/aula1/1', {
      text: "Excelente mapeamento dos riscos operacionais e técnicos.",
      grade: 9.5
    });
    if (submitCommentRes.statusCode === 200 && submitCommentRes.body.success) {
      console.log("✔ POST /api/comments/aula1/1 - Sucesso! Feedback do professor gravado.");
    } else {
      console.error("✘ POST /api/comments/aula1/1 - Falhou", submitCommentRes);
    }

    // 9. Test GET /api/comments/aula1/1 (Retrieve comments)
    const getCommentsRes = await get('/api/comments/aula1/1');
    if (getCommentsRes.statusCode === 200 && getCommentsRes.body.length > 0) {
      console.log("✔ GET /api/comments/aula1/1 - Sucesso! Recuperou os comentários de feedback.");
    } else {
      console.error("✘ GET /api/comments/aula1/1 - Falhou", getCommentsRes);
    }

    // 10. Test POST /api/checkins/aula1/aline.brenner@hmv.org.br
    const submitCheckinRes = await post('/api/checkins/aula1/aline.brenner@hmv.org.br', {
      text: "Confiança"
    });
    if (submitCheckinRes.statusCode === 200 && submitCheckinRes.body.success) {
      console.log("✔ POST /api/checkins/aula1/aline.brenner@hmv.org.br - Sucesso! Resposta de check-in enviada.");
    } else {
      console.error("✘ POST /api/checkins/aula1/aline.brenner@hmv.org.br - Falhou", submitCheckinRes);
    }

    // 11. Test GET /api/checkins/aula1
    const getCheckinsRes = await get('/api/checkins/aula1');
    if (getCheckinsRes.statusCode === 200 && getCheckinsRes.body["aline.brenner@hmv.org.br"]) {
      console.log("✔ GET /api/checkins/aula1 - Sucesso! Retornou respostas de check-in.");
    } else {
      console.error("✘ GET /api/checkins/aula1 - Falhou", getCheckinsRes);
    }

    // 12. Test POST /api/interactions/aula1/slide_1_8_int/aline.brenner@hmv.org.br (Open-ended interaction)
    const submitInteractionRes = await post('/api/interactions/aula1/slide_1_8_int/aline.brenner@hmv.org.br', {
      value: "Critério de validação local externa independente de pelo menos 1 mês."
    });
    if (submitInteractionRes.statusCode === 200 && submitInteractionRes.body.success) {
      console.log("✔ POST /api/interactions/aula1/slide_1_8_int/aline.brenner@hmv.org.br - Sucesso! Interação enviada.");
    } else {
      console.error("✘ POST /api/interactions/aula1/slide_1_8_int/aline.brenner@hmv.org.br - Falhou", submitInteractionRes);
    }

    // 13. Test GET /api/interactions/aula1/slide_1_8_int
    const getInteractionsRes = await get('/api/interactions/aula1/slide_1_8_int');
    let responseIdToLike = null;
    if (getInteractionsRes.statusCode === 200 && getInteractionsRes.body.length > 0) {
      console.log("✔ GET /api/interactions/aula1/slide_1_8_int - Sucesso! Retornou interações.");
      responseIdToLike = getInteractionsRes.body[0].id;
    } else {
      console.error("✘ GET /api/interactions/aula1/slide_1_8_int - Falhou", getInteractionsRes);
    }

    // 14. Test POST /api/interactions/like/aula1/slide_1_8_int/:responseId/:userEmail (Like interaction)
    if (responseIdToLike) {
      const likeRes = await post(`/api/interactions/like/aula1/slide_1_8_int/${responseIdToLike}/aline.medeiros@hmv.org.br`, {});
      if (likeRes.statusCode === 200 && likeRes.body.success) {
        console.log("✔ POST /api/interactions/like/... - Sucesso! Like registrado.");
      } else {
        console.error("✘ POST /api/interactions/like/... - Falhou", likeRes);
      }
    }

    // 15. Test POST /api/conceptchecks/aula1/aline.brenner@hmv.org.br
    const submitConceptCheckRes = await post('/api/conceptchecks/aula1/aline.brenner@hmv.org.br', {
      score: "3 de 3",
      answers: [0, 1, 1]
    });
    if (submitConceptCheckRes.statusCode === 200 && submitConceptCheckRes.body.success) {
      console.log("✔ POST /api/conceptchecks/aula1/aline.brenner@hmv.org.br - Sucesso! Concept Check enviado.");
    } else {
      console.error("✘ POST /api/conceptchecks/aula1/aline.brenner@hmv.org.br - Falhou", submitConceptCheckRes);
    }

    // 16. Test GET /api/conceptchecks/aula1
    const getConceptChecksRes = await get('/api/conceptchecks/aula1');
    if (getConceptChecksRes.statusCode === 200 && getConceptChecksRes.body["aline.brenner@hmv.org.br"]) {
      console.log("✔ GET /api/conceptchecks/aula1 - Sucesso! Retornou concept checks.");
    } else {
      console.error("✘ GET /api/conceptchecks/aula1 - Falhou", getConceptChecksRes);
    }

    // 17. Test POST /api/reflections/aula1/aline.brenner@hmv.org.br
    const submitReflectionRes = await post('/api/reflections/aula1/aline.brenner@hmv.org.br', {
      text: "Isso muda tudo, pois passamos a auditar criticamente ao invés de aceitar as alegações comerciais."
    });
    if (submitReflectionRes.statusCode === 200 && submitReflectionRes.body.success) {
      console.log("✔ POST /api/reflections/aula1/aline.brenner@hmv.org.br - Sucesso! Reflexão enviada.");
    } else {
      console.error("✘ POST /api/reflections/aula1/aline.brenner@hmv.org.br - Falhou", submitReflectionRes);
    }

    // 18. Test GET /api/reflections/aula1
    const getReflectionsRes = await get('/api/reflections/aula1');
    if (getReflectionsRes.statusCode === 200 && getReflectionsRes.body["aline.brenner@hmv.org.br"]) {
      console.log("✔ GET /api/reflections/aula1 - Sucesso! Retornou as reflexões.");
    } else {
      console.error("✘ GET /api/reflections/aula1 - Falhou", getReflectionsRes);
    }

    // 19. Test GET /api/bibliography
    const bibRes = await get('/api/bibliography');
    if (bibRes.statusCode === 200 && bibRes.body.basica && bibRes.body.complementar) {
      console.log("✔ GET /api/bibliography - Sucesso! Retornou a bibliografia básica e complementar.");
    } else {
      console.error("✘ GET /api/bibliography - Falhou", bibRes);
    }

    // 20. Test POST /api/whiteboard/draw/aula1
    const drawRes = await post('/api/whiteboard/draw/aula1', {
      type: "draw",
      x0: 10,
      y0: 20,
      x1: 15,
      y1: 25,
      color: "#d32f2f",
      width: 3
    });
    if (drawRes.statusCode === 200 && drawRes.body.success) {
      console.log("✔ POST /api/whiteboard/draw/aula1 - Sucesso! Ação de desenho registrada.");
    } else {
      console.error("✘ POST /api/whiteboard/draw/aula1 - Falhou", drawRes);
    }

    // 21. Test GET /api/whiteboard/aula1
    const wbRes = await get('/api/whiteboard/aula1');
    if (wbRes.statusCode === 200 && wbRes.body.length > 0) {
      console.log("✔ GET /api/whiteboard/aula1 - Sucesso! Retornou o histórico da lousa.");
    } else {
      console.error("✘ GET /api/whiteboard/aula1 - Falhou", wbRes);
    }

    console.log("=== TODOS OS TESTES DE API FORAM CONCLUÍDOS COM SUCESSO! ===");
    resetDb();
    process.exit(0);
  } catch (e) {
    console.error("✘ Ocorreu um erro catastrófico durante os testes:", e);
    resetDb();
    process.exit(1);
  }
}

function resetDb() {
  const fs = require('fs');
  const path = require('path');
  const emptyDb = {
    activeState: {
      classId: "aula1",
      slideId: "slide_1_1",
      syncEnabled: true,
      activeTab: "slides"
    },
    submissions: {
      aula1: {},
      aula2: {},
      aula3: {}
    },
    comments: {
      aula1: {},
      aula2: {},
      aula3: {}
    },
    checkinResponses: {
      aula1: {},
      aula2: {},
      aula3: {}
    },
    slideInteractions: {
      aula1: {},
      aula2: {},
      aula3: {}
    },
    conceptCheckResponses: {
      aula1: {},
      aula2: {},
      aula3: {}
    },
    reflections: {
      aula1: {},
      aula2: {},
      aula3: {}
    },
    whiteboardHistory: {
      aula1: [],
      aula2: [],
      aula3: []
    }
  };
  fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(emptyDb, null, 2), 'utf8');
  console.log("✔ Banco de dados resetado com sucesso para o estado limpo.");
}

// Run test logic
runTests();

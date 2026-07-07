/* AVP - Ambiente Virtual do Projeto
   Protótipo de demonstração. Persistência via localStorage (somente para fins de teste local).
   Em produção, substituir as funções loadGroups/saveGroups por chamadas a uma planilha
   conectada via Google Apps Script (ver "Arquitetura do AVP.md"). */

const STORAGE_KEY = "avp_grupos_v1";
let currentGroup = null;

function loadGroups() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function saveGroups(groups) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(groups));
}

function getGroupData(code) {
  const groups = loadGroups();
  if (!groups[code]) {
    groups[code] = {
      etapa1: { status: "nao-iniciada", data: {} },
      etapa2: { status: "nao-iniciada", data: {} },
      etapa3: { status: "nao-iniciada", data: {} }
    };
    saveGroups(groups);
  }
  return groups[code];
}

function updateGroupData(code, etapa, patch) {
  const groups = loadGroups();
  Object.assign(groups[code][etapa].data, patch);
  if (groups[code][etapa].status === "nao-iniciada") {
    groups[code][etapa].status = "em-andamento";
  }
  saveGroups(groups);
}

function submitEtapa(code, etapa) {
  const groups = loadGroups();
  groups[code][etapa].status = "enviada";
  saveGroups(groups);
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById("screen-" + id).classList.add("active");
  document.getElementById("topbarGroup").textContent = currentGroup ? ("Grupo: " + currentGroup) : "";
  if (id === "dashboard") renderDashboard();
  if (id === "etapa1") renderEtapa1();
  if (id === "etapa2") renderEtapa2();
  if (id === "etapa3") renderEtapa3();
  if (id === "professor") renderProfessor();
}

function statusLabel(status) {
  if (status === "enviada") return "Enviada";
  if (status === "em-andamento") return "Em andamento";
  return "Não iniciada";
}

function statusClass(status) {
  if (status === "enviada") return "enviada";
  if (status === "em-andamento") return "em-andamento";
  return "";
}

function renderDashboard() {
  document.getElementById("dashGroupName").textContent = currentGroup;
  const gd = getGroupData(currentGroup);
  [1, 2, 3].forEach(n => {
    const etapa = "etapa" + n;
    const tag = document.getElementById("status-" + n);
    tag.textContent = statusLabel(gd[etapa].status);
    tag.className = "status-tag " + statusClass(gd[etapa].status);
  });
}

/* ---------- ETAPA 1 ---------- */
function renderEtapa1() {
  const gd = getGroupData(currentGroup);
  const d = gd.etapa1.data;
  document.getElementById("risco-tecnico").value = d["risco-tecnico"] || "";
  document.getElementById("risco-operacional").value = d["risco-operacional"] || "";
  document.getElementById("risco-confianca").value = d["risco-confianca"] || "";
  document.getElementById("risco-financeiro").value = d["risco-financeiro"] || "";
  document.getElementById("showstoppers").value = d["showstoppers"] || "";
  document.getElementById("autosave1").textContent = "";
}

function wireEtapa1Autosave() {
  ["risco-tecnico", "risco-operacional", "risco-confianca", "risco-financeiro", "showstoppers"].forEach(id => {
    document.getElementById(id).addEventListener("input", e => {
      updateGroupData(currentGroup, "etapa1", { [id]: e.target.value });
      const msg = document.getElementById("autosave1");
      msg.textContent = "Salvo automaticamente.";
      clearTimeout(msg._t);
      msg._t = setTimeout(() => { msg.textContent = ""; }, 1500);
    });
  });
}

document.getElementById("btnEnviarEtapa1").addEventListener("click", () => {
  submitEtapa(currentGroup, "etapa1");
  showScreen("dashboard");
});

/* ---------- ETAPA 2 ---------- */
function calcRoi(invId, ganhoId, resultId) {
  const inv = parseFloat(document.getElementById(invId).value);
  const ganho = parseFloat(document.getElementById(ganhoId).value);
  const out = document.getElementById(resultId);
  if (isNaN(inv) || inv <= 0 || isNaN(ganho)) {
    out.textContent = "—";
    return null;
  }
  const roi = ((ganho - inv) / inv) * 100;
  out.textContent = roi.toFixed(1) + "%";
  return roi;
}

function renderEtapa2() {
  const gd = getGroupData(currentGroup);
  const d = gd.etapa2.data;
  ["inv-esperado", "ganho-esperado", "inv-realista", "ganho-realista", "inv-pessimista", "ganho-pessimista"].forEach(id => {
    document.getElementById(id).value = d[id] || "";
  });
  document.getElementById("ponto-quebra").value = d["ponto-quebra"] || "";
  calcRoi("inv-esperado", "ganho-esperado", "roi-esperado");
  calcRoi("inv-realista", "ganho-realista", "roi-realista");
  calcRoi("inv-pessimista", "ganho-pessimista", "roi-pessimista");
  document.getElementById("autosave2").textContent = "";

  const etapa1 = gd.etapa1;
  const refBox = document.getElementById("refShowstoppers");
  if (etapa1.status === "enviada" && etapa1.data.showstoppers) {
    refBox.textContent = etapa1.data.showstoppers;
  } else {
    refBox.textContent = "Etapa 1 ainda não enviada.";
  }
}

function wireEtapa2Autosave() {
  const pairs = [
    ["inv-esperado", "ganho-esperado", "roi-esperado"],
    ["inv-realista", "ganho-realista", "roi-realista"],
    ["inv-pessimista", "ganho-pessimista", "roi-pessimista"]
  ];
  pairs.forEach(([invId, ganhoId, resultId]) => {
    [invId, ganhoId].forEach(id => {
      document.getElementById(id).addEventListener("input", e => {
        calcRoi(invId, ganhoId, resultId);
        updateGroupData(currentGroup, "etapa2", { [id]: e.target.value });
        flashAutosave("autosave2");
      });
    });
  });
  document.getElementById("ponto-quebra").addEventListener("input", e => {
    updateGroupData(currentGroup, "etapa2", { "ponto-quebra": e.target.value });
    flashAutosave("autosave2");
  });
}

document.getElementById("btnEnviarEtapa2").addEventListener("click", () => {
  submitEtapa(currentGroup, "etapa2");
  showScreen("dashboard");
});

function flashAutosave(id) {
  const msg = document.getElementById(id);
  msg.textContent = "Salvo automaticamente.";
  clearTimeout(msg._t);
  msg._t = setTimeout(() => { msg.textContent = ""; }, 1500);
}

/* ---------- ETAPA 3 ---------- */
function renderEtapa3() {
  const gd = getGroupData(currentGroup);
  const d = gd.etapa3.data;
  document.querySelectorAll(".bc-field").forEach(field => {
    field.value = d[field.dataset.section] || "";
  });
  const decisaoSalva = d["decisao"];
  document.querySelectorAll('input[name="decisao"]').forEach(r => {
    r.checked = (r.value === decisaoSalva);
  });
  updateCharCount();
  document.getElementById("autosave3").textContent = "";

  const etapa2 = gd.etapa2;
  const refBox = document.getElementById("refRoi");
  if (etapa2.status === "enviada") {
    const d2 = etapa2.data;
    const partes = [];
    ["esperado", "realista", "pessimista"].forEach(cenario => {
      const inv = parseFloat(d2["inv-" + cenario]);
      const ganho = parseFloat(d2["ganho-" + cenario]);
      if (!isNaN(inv) && inv > 0 && !isNaN(ganho)) {
        const roi = (((ganho - inv) / inv) * 100).toFixed(1);
        partes.push(cenario.charAt(0).toUpperCase() + cenario.slice(1) + ": " + roi + "%");
      }
    });
    refBox.textContent = partes.length ? partes.join(" · ") : "Etapa 2 enviada, mas sem valores suficientes para calcular o ROI.";
  } else {
    refBox.textContent = "Etapa 2 ainda não enviada.";
  }
}

function updateCharCount() {
  let total = 0;
  document.querySelectorAll(".bc-field").forEach(f => total += f.value.length);
  document.getElementById("charCount").textContent = total;
}

function wireEtapa3Autosave() {
  document.querySelectorAll(".bc-field").forEach(field => {
    field.addEventListener("input", e => {
      updateGroupData(currentGroup, "etapa3", { [field.dataset.section]: e.target.value });
      updateCharCount();
      flashAutosave("autosave3");
    });
  });
  document.querySelectorAll('input[name="decisao"]').forEach(r => {
    r.addEventListener("change", e => {
      updateGroupData(currentGroup, "etapa3", { decisao: e.target.value });
      flashAutosave("autosave3");
    });
  });
}

document.getElementById("btnEnviarEtapa3").addEventListener("click", () => {
  submitEtapa(currentGroup, "etapa3");
  showScreen("dashboard");
});

/* ---------- PAINEL DO PROFESSOR ---------- */
function renderProfessor() {
  const groups = loadGroups();
  const tbody = document.getElementById("tabelaProfessorBody");
  tbody.innerHTML = "";
  const codes = Object.keys(groups).sort();
  if (codes.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="muted">Nenhum grupo cadastrado ainda neste navegador.</td></tr>';
    return;
  }
  codes.forEach(code => {
    const g = groups[code];
    const decisao = (g.etapa3.status === "enviada" && g.etapa3.data.decisao) ? g.etapa3.data.decisao : "—";
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${code}</td>
      <td>${statusLabel(g.etapa1.status)}</td>
      <td>${statusLabel(g.etapa2.status)}</td>
      <td>${statusLabel(g.etapa3.status)}</td>
      <td>${decisao}</td>
    `;
    tbody.appendChild(tr);
  });
}

document.getElementById("btnExportarCsv").addEventListener("click", () => {
  const groups = loadGroups();
  const codes = Object.keys(groups).sort();
  let csv = "Grupo,Etapa 1,Etapa 2,Etapa 3,Decisao Final\n";
  codes.forEach(code => {
    const g = groups[code];
    const decisao = (g.etapa3.status === "enviada" && g.etapa3.data.decisao) ? g.etapa3.data.decisao : "";
    csv += `${code},${statusLabel(g.etapa1.status)},${statusLabel(g.etapa2.status)},${statusLabel(g.etapa3.status)},${decisao}\n`;
  });
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "avp_painel_professor.csv";
  a.click();
  URL.revokeObjectURL(url);
});

/* ---------- NAVEGAÇÃO GERAL ---------- */
document.getElementById("btnEntrar").addEventListener("click", () => {
  const input = document.getElementById("groupCode");
  const code = input.value.trim().toUpperCase();
  const errorEl = document.getElementById("loginError");
  if (code.length < 3) {
    errorEl.textContent = "Digite um código de grupo válido (mínimo 3 caracteres).";
    return;
  }
  errorEl.textContent = "";
  currentGroup = code;
  getGroupData(currentGroup);
  showScreen("dashboard");
});

document.getElementById("groupCode").addEventListener("keydown", e => {
  if (e.key === "Enter") document.getElementById("btnEntrar").click();
});

document.getElementById("btnSairGrupo").addEventListener("click", () => {
  currentGroup = null;
  document.getElementById("groupCode").value = "";
  showScreen("login");
});

document.getElementById("btnIrProfessor").addEventListener("click", () => showScreen("professor"));

document.querySelectorAll("[data-goto]").forEach(el => {
  el.addEventListener("click", () => showScreen(el.dataset.goto));
});

wireEtapa1Autosave();
wireEtapa2Autosave();
wireEtapa3Autosave();

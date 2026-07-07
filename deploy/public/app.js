// Application State
let appState = {
    classes: [],
    scenarios: {},
    students: [],
    activeClassId: "aula1",
    activeSlideId: "slide_1_1",
    activeTab: "checkin", // "checkin", "slides", "conceptcheck", "groupwork", "reflection", "references"
    currentUser: "group1", // 'group1'...'group5' or 'professor'
    liveSyncEnabled: true,
    serverState: { classId: "aula1", slideId: "slide_1_1", syncEnabled: true, activeTab: "checkin" },
    chartInstance: null,
    slideViewMode: "image", // "image" or "transcript"
    liveData: {
        checkins: {},
        slideInteractions: [],
        conceptChecks: {},
        reflections: {},
        submissions: {}
    },
    localConceptAnswers: [] // Stores local choices before submitting concept check
};

let timerInterval = null;

// DOM Elements
const loginOverlay = document.getElementById("loginOverlay");
const loginForm = document.getElementById("loginForm");
const loginUserSelect = document.getElementById("loginUserSelect");
const loginPassword = document.getElementById("loginPassword");
const currentUserDisplay = document.getElementById("currentUserDisplay");
const btnLogout = document.getElementById("btnLogout");
const btnLiveSync = document.getElementById("btnLiveSync");
const btnShowSlideImage = document.getElementById("btnShowSlideImage");
const btnShowSlideTranscript = document.getElementById("btnShowSlideTranscript");
const currentLectureText = document.getElementById("currentLectureText");
const slideViewport = document.getElementById("slideViewport");
const slideInteractiveViewport = document.getElementById("slideInteractiveViewport");
const slideListContainer = document.getElementById("slideListContainer");
const classNavContainer = document.getElementById("classNavContainer");
const workspacePanel = document.getElementById("workspacePanel");
const btnToggleWorkspace = document.getElementById("btnToggleWorkspace");
const studentWorkspace = document.getElementById("studentWorkspace");
const professorWorkspace = document.getElementById("professorWorkspace");
const currentGroupName = document.getElementById("currentGroupName");
const groupScenarioDescription = document.getElementById("groupScenarioDescription");
const submissionStatus = document.getElementById("submissionStatus");
const overrideSyncWarning = document.getElementById("overrideSyncWarning");
const btnResumeSync = document.getElementById("btnResumeSync");

// Slide Player Controls
const btnPrevSlide = document.getElementById("btnPrevSlide");
const btnNextSlide = document.getElementById("btnNextSlide");
const slideIndicatorText = document.getElementById("slideIndicatorText");
const btnTogglePresentationMode = document.getElementById("btnTogglePresentationMode");
const presentationPanel = document.getElementById("presentationPanel");

// Activity Containers (Trabalho em Grupo)
const activity1Container = document.getElementById("activity1Container");
const activity2Container = document.getElementById("activity2Container");
const activity3Container = document.getElementById("activity3Container");
const studentFeedbackBox = document.getElementById("studentFeedbackBox");
const studentFeedbackMessages = document.getElementById("studentFeedbackMessages");

// Professor controls
const profSyncToggle = document.getElementById("profSyncToggle");
const profPrevSlide = document.getElementById("profPrevSlide");
const profNextSlide = document.getElementById("profNextSlide");
const profSlideIndicator = document.getElementById("profSlideIndicator");
const inspectorGroupsNav = document.getElementById("inspectorGroupsNav");
const submissionDetailViewer = document.getElementById("submissionDetailViewer");

// Roster Modal
const rosterModal = document.getElementById("rosterModal");
const btnOpenRoster = document.getElementById("btnOpenRoster");
const btnCloseRoster = document.getElementById("btnCloseRoster");
const rosterSearchInput = document.getElementById("rosterSearchInput");

// Initialize Application
async function init() {
    try {
        showToast("Inicializando Navigator...", "info");
        
        // Fetch static content from server
        const [classesRes, scenariosRes, studentsRes, stateRes] = await Promise.all([
            fetch('/api/classes'),
            fetch('/api/scenarios'),
            fetch('/api/students'),
            fetch('/api/state')
        ]);
        
        appState.classes = await classesRes.json();
        appState.scenarios = await scenariosRes.json();
        appState.students = await studentsRes.json();
        
        const state = await stateRes.json();
        appState.serverState = state;
        appState.activeClassId = state.classId;
        appState.activeSlideId = state.slideId;
        appState.activeTab = state.activeTab || "checkin";
        
        // Populate login user select dynamically
        populateLoginUserSelect();
        
        // Restore session or show login overlay
        const savedUser = sessionStorage.getItem("currentUser");
        if (savedUser) {
            appState.currentUser = savedUser;
            updateCurrentUserUI();
            loginOverlay.classList.add("hidden");
            
            // Auto-disable live sync if switching to professor, since professor CONTROLS the slides
            if (appState.currentUser === 'professor') {
                appState.liveSyncEnabled = false;
                btnLiveSync.classList.remove('active');
                btnLiveSync.style.display = "none";
            }
        } else {
            appState.currentUser = "";
            updateCurrentUserUI();
            loginOverlay.classList.remove("hidden");
        }
        
        // Setup Server-Sent Events for real-time synchronization
        setupLiveSync();
        
        // Populate student roster in modal
        populateRoster();
        
        // Setup Event Listeners
        setupEventListeners();
        
        // Perform initial UI render
        renderTabs();
        
        // Render workspace after sidebar to ensure scenarios exist
        renderSidebar();
        renderActivePhase();
        updateWorkspaceView();
        
        showToast("Navigator pronto para a aula!", "success");
    } catch (e) {
        console.error("Initialization error", e);
        showToast("Erro ao carregar dados do servidor.", "error");
    }
}

// Populate login user select dropdown dynamically
function populateLoginUserSelect() {
    loginUserSelect.innerHTML = "";
    
    // Group students by group
    const groups = {};
    appState.students.forEach(s => {
        if (!groups[s.group]) {
            groups[s.group] = [];
        }
        groups[s.group].push(s);
    });
    
    // Sort groups
    const sortedGroupIds = Object.keys(groups).sort();
    
    // For each group, create an optgroup
    sortedGroupIds.forEach(gid => {
        const optgroup = document.createElement("optgroup");
        optgroup.label = `Equipe ${gid} (${appState.scenarios[gid] ? appState.scenarios[gid].title.split(': ')[1] : ''})`;
        
        groups[gid].forEach(student => {
            const opt = document.createElement("option");
            opt.value = student.email;
            opt.innerText = student.name;
            optgroup.appendChild(opt);
        });
        
        loginUserSelect.appendChild(optgroup);
    });
    
    // Add professor option at the end
    const profOpt = document.createElement("option");
    profOpt.value = "professor";
    profOpt.className = "prof-option";
    profOpt.innerText = "Professora (F. Santos)";
    loginUserSelect.appendChild(profOpt);
}

// Handle User Login
function handleUserLogin(userId) {
    appState.currentUser = userId;
    sessionStorage.setItem("currentUser", userId);
    
    // Auto-disable live sync if switching to professor, since professor CONTROLS the slides
    if (appState.currentUser === 'professor') {
        appState.liveSyncEnabled = false;
        btnLiveSync.classList.remove('active');
        btnLiveSync.style.display = "none";
    } else {
        btnLiveSync.style.display = "flex";
        appState.liveSyncEnabled = true;
        btnLiveSync.classList.add('active');
        
        // Sync immediately to server state
        if (appState.serverState.syncEnabled) {
            appState.activeClassId = appState.serverState.classId;
            appState.activeSlideId = appState.serverState.slideId;
            appState.activeTab = appState.serverState.activeTab || "checkin";
            renderTabs();
            renderSidebar();
            renderActivePhase();
            overrideSyncWarning.style.display = "none";
        }
    }
    
    updateCurrentUserUI();
    updateWorkspaceView();
}

// Update Current User display UI in the header
function updateCurrentUserUI() {
    if (!appState.currentUser) {
        currentUserDisplay.innerHTML = `<i class="fa-solid fa-user-circle"></i> Desconectado`;
        return;
    }
    
    if (appState.currentUser === 'professor') {
        currentUserDisplay.innerHTML = `<i class="fa-solid fa-user-tie" style="color: var(--gold);"></i> <strong>Professora</strong>`;
    } else {
        const student = appState.students.find(s => s.email === appState.currentUser);
        const displayName = student ? student.name : appState.currentUser;
        const groupNum = student ? student.group : "?";
        currentUserDisplay.innerHTML = `<i class="fa-solid fa-user" style="color: var(--clinical-color);"></i> <strong>${displayName}</strong> <span style="font-size:0.75rem; color:var(--text-secondary);">(Equipe ${groupNum})</span>`;
    }
}

// Setup EventSource for real-time state sync
function setupLiveSync() {
    const eventSource = new EventSource('/api/sync');
    
    eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const state = data.activeState;
        
        appState.serverState = state;
        appState.liveData = {
            checkins: data.checkins || {},
            slideInteractions: data.slideInteractions || [],
            conceptChecks: data.conceptChecks || {},
            reflections: data.reflections || {},
            submissions: data.submissions || {}
        };
        
        // Update countdown timer state
        updateCountdownTimer();
        
        // Update professor dashboard sync checkbox if professor role
        if (appState.currentUser === 'professor') {
            profSyncToggle.checked = state.syncEnabled;
        }
        
        // Update header indicator
        const activeClass = appState.classes.find(c => c.id === state.classId);
        if (activeClass) {
            currentLectureText.innerText = activeClass.title;
        }
        
        // Apply sync if enabled by student
        if (appState.liveSyncEnabled && state.syncEnabled && appState.currentUser !== 'professor') {
            appState.activeClassId = state.classId;
            appState.activeSlideId = state.slideId;
            appState.activeTab = state.activeTab || "checkin";
            
            // Re-render components
            renderTabs();
            renderSidebar();
            renderActivePhase();
            updateWorkspaceView();
            
            overrideSyncWarning.style.display = "none";
        } else {
            // Re-render active results even if manual navigation, to see live updates
            renderActivePhaseResults();
            if (appState.currentUser === 'professor') {
                renderSubmissionsInspector();
            }
        }
        
        // Highlight active live slide in the sidebar
        updateLiveSlideIndicators();
    };

    eventSource.addEventListener('whiteboard_update', (event) => {
        try {
            const data = JSON.parse(event.data);
            if (data.classId === appState.activeClassId) {
                handleIncomingWhiteboardAction(data.action);
            }
        } catch (err) {
            console.error("Error parsing whiteboard update:", err);
        }
    });
    
    eventSource.onerror = (e) => {
        console.warn("SSE connection lost. Reconnecting...", e);
    };
}

// Whiteboard variables & functions
let whiteboardCtx = null;
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let whiteboardInitialized = false;

function checkWhiteboardDrawingPermission() {
    const activeClass = appState.classes.find(c => c.id === appState.activeClassId);
    const slide = activeClass ? activeClass.slides.find(s => s.id === appState.activeSlideId) : null;
    return appState.currentUser === 'professor' || (slide && slide.allowStudentDraw);
}

function setupWhiteboardCanvas() {
    const canvas = document.getElementById("whiteboardCanvas");
    const container = document.querySelector(".canvas-wrapper");
    if (!canvas || !container) return;

    // Set fixed logical coordinates
    canvas.width = 1000;
    canvas.height = 600;

    whiteboardCtx = canvas.getContext("2d");
    whiteboardCtx.lineCap = "round";
    whiteboardCtx.lineJoin = "round";

    // Set UI depending on role
    const controls = document.getElementById("whiteboardControls");
    const status = document.getElementById("whiteboardStatus");

    const activeClass = appState.classes.find(c => c.id === appState.activeClassId);
    const slide = activeClass ? activeClass.slides.find(s => s.id === appState.activeSlideId) : null;
    const allowStudentDraw = slide && slide.allowStudentDraw;

    if (appState.currentUser === 'professor') {
        if (controls) controls.style.display = "block";
        if (status) {
            status.innerHTML = `<i class="fa-solid fa-pen"></i> Professora Desenhando`;
            status.style.backgroundColor = "var(--clinical-color)";
            status.style.color = "#fff";
        }
    } else if (allowStudentDraw) {
        if (controls) controls.style.display = "none";
        if (status) {
            status.innerHTML = `<i class="fa-solid fa-pen-fancy"></i> Lousa Aberta (Desenhe na tela!)`;
            status.style.backgroundColor = "var(--clinical-color)";
            status.style.color = "#fff";
        }
    } else {
        if (controls) controls.style.display = "none";
        if (status) {
            status.innerHTML = `<i class="fa-solid fa-lock"></i> Apenas Leitura (Aluno)`;
            status.style.backgroundColor = "var(--border-color)";
            status.style.color = "var(--text-secondary)";
        }
    }

    // Load whiteboard history from server
    fetch(`/api/whiteboard/${appState.activeClassId}`)
        .then(res => res.json())
        .then(history => {
            // Clear local canvas
            whiteboardCtx.clearRect(0, 0, canvas.width, canvas.height);
            // Draw all lines from history
            history.forEach(action => {
                drawActionOnCanvas(action);
            });
        })
        .catch(err => console.error("Error loading whiteboard history:", err));

    // Register drawing event listeners (only once)
    if (!whiteboardInitialized) {
        // Professor / Student draws
        canvas.addEventListener("mousedown", startDrawing);
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mouseup", stopDrawing);
        canvas.addEventListener("mouseout", stopDrawing);

        canvas.addEventListener("touchstart", startDrawingTouch, { passive: false });
        canvas.addEventListener("touchmove", drawTouch, { passive: false });
        canvas.addEventListener("touchend", stopDrawing);

        // Clear button
        const btnClear = document.getElementById("btnClearWhiteboard");
        if (btnClear) {
            btnClear.addEventListener("click", () => {
                if (appState.currentUser !== 'professor') return;
                fetch(`/api/whiteboard/draw/${appState.activeClassId}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ type: "clear" })
                }).catch(err => console.error("Error clearing whiteboard:", err));
            });
        }

        whiteboardInitialized = true;
    }
}

function startDrawing(e) {
    if (!checkWhiteboardDrawingPermission()) return;
    isDrawing = true;
    const { x, y } = getLogicalCoords(e);
    lastX = x;
    lastY = y;
}

function startDrawingTouch(e) {
    if (!checkWhiteboardDrawingPermission()) return;
    e.preventDefault();
    isDrawing = true;
    const touch = e.touches[0];
    const { x, y } = getLogicalCoords(touch);
    lastX = x;
    lastY = y;
}

function draw(e) {
    if (!isDrawing || !checkWhiteboardDrawingPermission()) return;
    const { x, y } = getLogicalCoords(e);
    
    // Draw locally and post to server
    const isProfessor = appState.currentUser === 'professor';
    const action = {
        type: "draw",
        x0: lastX,
        y0: lastY,
        x1: x,
        y1: y,
        color: isProfessor ? "#d32f2f" : "#0284c7",
        width: 3
    };

    drawActionOnCanvas(action);
    postWhiteboardAction(action);

    lastX = x;
    lastY = y;
}

function drawTouch(e) {
    if (!isDrawing || !checkWhiteboardDrawingPermission()) return;
    e.preventDefault();
    const touch = e.touches[0];
    const { x, y } = getLogicalCoords(touch);

    const isProfessor = appState.currentUser === 'professor';
    const action = {
        type: "draw",
        x0: lastX,
        y0: lastY,
        x1: x,
        y1: y,
        color: isProfessor ? "#d32f2f" : "#0284c7",
        width: 3
    };

    drawActionOnCanvas(action);
    postWhiteboardAction(action);

    lastX = x;
    lastY = y;
}

function stopDrawing() {
    isDrawing = false;
}

function getLogicalCoords(e) {
    const canvas = document.getElementById("whiteboardCanvas");
    const rect = canvas.getBoundingClientRect();
    
    // Get mouse/touch relative to canvas bounding box
    const clientX = e.clientX || e.pageX;
    const clientY = e.clientY || e.pageY;
    
    const clickX = clientX - rect.left;
    const clickY = clientY - rect.top;

    // Scale to logical 1000x600 size
    const logicalX = (clickX / rect.width) * canvas.width;
    const logicalY = (clickY / rect.height) * canvas.height;

    return { x: logicalX, y: logicalY };
}

function drawActionOnCanvas(action) {
    if (!whiteboardCtx) return;
    
    if (action.type === "clear") {
        const canvas = document.getElementById("whiteboardCanvas");
        if (canvas) {
            whiteboardCtx.clearRect(0, 0, canvas.width, canvas.height);
        }
    } else if (action.type === "draw") {
        whiteboardCtx.beginPath();
        whiteboardCtx.strokeStyle = action.color || "#d32f2f";
        whiteboardCtx.lineWidth = action.width || 3;
        whiteboardCtx.moveTo(action.x0, action.y0);
        whiteboardCtx.lineTo(action.x1, action.y1);
        whiteboardCtx.stroke();
        whiteboardCtx.closePath();
    }
}

function postWhiteboardAction(action) {
    fetch(`/api/whiteboard/draw/${appState.activeClassId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(action)
    }).catch(err => console.error("Error saving whiteboard action:", err));
}

function handleIncomingWhiteboardAction(action) {
    // Render immediately if the whiteboard is currently visible
    const canvas = document.getElementById("whiteboardCanvas");
    const whiteboardViewport = document.getElementById("whiteboardViewport");
    if (canvas && whiteboardCtx && whiteboardViewport && whiteboardViewport.style.display !== "none") {
        drawActionOnCanvas(action);
    }
}

function updateLiveSlideIndicators() {
    document.querySelectorAll('.slide-item').forEach(item => {
        const slideId = item.getAttribute('data-slide');
        if (slideId === appState.serverState.slideId && appState.serverState.syncEnabled) {
            item.classList.add('live-topic');
        } else {
            item.classList.remove('live-topic');
        }
    });
}

function updateCountdownTimer() {
    const timerContainer = document.getElementById("slideTimerContainer");
    if (!timerContainer) return;
    
    const timerEnd = appState.serverState ? appState.serverState.timerEnd : null;
    
    if (!timerEnd) {
        timerContainer.style.display = "none";
        timerContainer.innerHTML = "";
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        return;
    }
    
    const tick = () => {
        const remainingMs = timerEnd - Date.now();
        if (remainingMs <= 0) {
            timerContainer.style.display = "inline-flex";
            timerContainer.innerHTML = `<span class="slide-timer-badge"><i class="fa-solid fa-hourglass-end"></i> Tempo Esgotado</span>`;
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
            }
            return;
        }
        
        const totalSec = Math.ceil(remainingMs / 1000);
        const mins = Math.floor(totalSec / 60);
        const secs = totalSec % 60;
        const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        
        timerContainer.style.display = "inline-flex";
        timerContainer.innerHTML = `<span class="slide-timer-badge"><i class="fa-solid fa-clock"></i> ${timeStr}</span>`;
    };
    
    tick();
    
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    timerInterval = setInterval(tick, 1000);
}

// Event Listeners setup
function setupEventListeners() {
    // Login form submission
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const selectedUser = loginUserSelect.value;
        const password = loginPassword.value.trim();
        
        let isValid = false;
        if (selectedUser === 'professor') {
            isValid = (password.toLowerCase() === 'professor' || password.toLowerCase() === 'professor@hmv.org.br');
        } else {
            const student = appState.students.find(s => s.email === selectedUser);
            if (student && password.toLowerCase() === student.email.toLowerCase()) {
                isValid = true;
            }
        }
        
        if (isValid) {
            handleUserLogin(selectedUser);
            loginPassword.value = "";
            loginOverlay.classList.add("hidden");
            showToast("Acesso autorizado!", "success");
        } else {
            showToast("Senha incorreta (digite seu e-mail cadastrado)!", "error");
        }
    });
    
    // Logout button click
    btnLogout.addEventListener("click", () => {
        sessionStorage.removeItem("currentUser");
        appState.currentUser = "";
        updateCurrentUserUI();
        loginOverlay.classList.remove("hidden");
        showToast("Desconectado com sucesso.", "info");
    });
    
    // Live sync button toggle
    btnLiveSync.addEventListener("click", () => {
        appState.liveSyncEnabled = !appState.liveSyncEnabled;
        if (appState.liveSyncEnabled) {
            btnLiveSync.classList.add('active');
            showToast("Sincronização de slides ativada.", "success");
            
            // Sync instantly
            if (appState.serverState.syncEnabled) {
                appState.activeClassId = appState.serverState.classId;
                appState.activeSlideId = appState.serverState.slideId;
                appState.activeTab = appState.serverState.activeTab || "checkin";
                renderTabs();
                renderSidebar();
                renderActivePhase();
                updateWorkspaceView();
                overrideSyncWarning.style.display = "none";
            }
        } else {
            btnLiveSync.classList.remove('active');
            showToast("Sincronização desativada. Navegação livre.", "info");
        }
    });
    
    // Resume sync alert button
    btnResumeSync.addEventListener("click", () => {
        appState.liveSyncEnabled = true;
        btnLiveSync.classList.add('active');
        appState.activeClassId = appState.serverState.classId;
        appState.activeSlideId = appState.serverState.slideId;
        appState.activeTab = appState.serverState.activeTab || "checkin";
        renderTabs();
        renderSidebar();
        renderActivePhase();
        updateWorkspaceView();
        overrideSyncWarning.style.display = "none";
        showToast("Sincronizado com a professora.", "success");
    });
    
    // Class Day navigation clicks (Manual Sidebar override)
    classNavContainer.addEventListener("click", (e) => {
        const btn = e.target.closest(".class-nav-btn");
        if (!btn) return;
        
        const selectedClassId = btn.getAttribute("data-class");
        appState.activeClassId = selectedClassId;
        
        // Pick first slide of that class
        const targetClass = appState.classes.find(c => c.id === selectedClassId);
        if (targetClass && targetClass.slides.length > 0) {
            appState.activeSlideId = targetClass.slides[0].id;
        }
        
        // Reset quiz answers
        appState.localConceptAnswers = [];
        
        // Check manual sync status
        handleManualNavigation();
        
        renderSidebar();
        renderActivePhase();
        updateWorkspaceView();
    });
    
    // Slide Player bottom navigation buttons
    btnPrevSlide.addEventListener("click", () => navigateSlide(-1));
    btnNextSlide.addEventListener("click", () => navigateSlide(1));
    
    // Slide View Mode buttons (Image vs Transcript)
    btnShowSlideImage.addEventListener("click", () => {
        appState.slideViewMode = "image";
        btnShowSlideImage.classList.add("active");
        btnShowSlideTranscript.classList.remove("active");
        renderSlideContent();
        showToast("Modo de exibição: Imagem do Slide", "info");
    });
    
    btnShowSlideTranscript.addEventListener("click", () => {
        appState.slideViewMode = "transcript";
        btnShowSlideTranscript.classList.add("active");
        btnShowSlideImage.classList.remove("active");
        renderSlideContent();
        showToast("Modo de exibição: Transcrição em Texto", "info");
    });
    
    // Workspace panel toggle
    btnToggleWorkspace.addEventListener("click", () => {
        const isCollapsed = workspacePanel.classList.toggle("collapsed");
        if (isCollapsed) {
            btnToggleWorkspace.classList.remove("btn-primary");
            btnToggleWorkspace.classList.add("btn-secondary");
            showToast("Painel de Interação ocultado.", "info");
        } else {
            btnToggleWorkspace.classList.remove("btn-secondary");
            btnToggleWorkspace.classList.add("btn-primary");
            showToast("Painel de Interação visível.", "info");
        }
    });
    
    // Fullscreen / Projection mode toggle
    btnTogglePresentationMode.addEventListener("click", () => {
        const isFullscreen = presentationPanel.classList.toggle("fullscreen-mode");
        
        if (isFullscreen) {
            btnTogglePresentationMode.innerHTML = `<i class="fa-solid fa-compress"></i> Sair da Projeção`;
            showToast("Modo Projeção ativado (pressione ESC para sair).", "info");
            
            if (presentationPanel.requestFullscreen) {
                presentationPanel.requestFullscreen().catch(() => {});
            }
        } else {
            btnTogglePresentationMode.innerHTML = `<i class="fa-solid fa-expand"></i> Projetar Slide`;
            if (document.exitFullscreen && document.fullscreenElement) {
                document.exitFullscreen().catch(() => {});
            }
        }
    });
    
    // Watch for Esc key to exit fullscreen correctly
    document.addEventListener("fullscreenchange", () => {
        if (!document.fullscreenElement && presentationPanel.classList.contains("fullscreen-mode")) {
            presentationPanel.classList.remove("fullscreen-mode");
            btnTogglePresentationMode.innerHTML = `<i class="fa-solid fa-expand"></i> Projetar Slide`;
        }
    });
    
    // Roster Modal Toggle
    btnOpenRoster.addEventListener("click", () => {
        populateRoster();
        rosterModal.style.display = "flex";
    });
    btnCloseRoster.addEventListener("click", () => { rosterModal.style.display = "none"; });
    rosterModal.addEventListener("click", (e) => {
        if (e.target === rosterModal) rosterModal.style.display = "none";
    });
    rosterSearchInput.addEventListener("input", filterRoster);
    
    // Top Tabs Event Listeners (Student Switch tabs manually if sync disabled)
    document.getElementById("phaseTabs").addEventListener("click", (e) => {
        const btn = e.target.closest(".phase-tab-btn");
        if (!btn) return;
        
        const phase = btn.getAttribute("data-phase");
        appState.activeTab = phase;
        
        handleManualNavigation();
        
        // If professor, changing tab forces sync state
        if (appState.currentUser === 'professor') {
            updateServerState({ activeTab: phase });
        }
        
        renderTabs();
        renderActivePhase();
        updateWorkspaceView();
    });
    
    // Student Form: Check-in Submit
    document.getElementById("formCheckinSubmit").addEventListener("submit", async (e) => {
        e.preventDefault();
        const userEmail = appState.currentUser;
        
        // Find checked or written value
        let textVal = "";
        const textInput = document.getElementById("checkinTextAnswer");
        if (textInput) {
            textVal = textInput.value;
        } else {
            const checkedRad = document.querySelector('input[name="checkinABAnswer"]:checked');
            if (checkedRad) textVal = checkedRad.value;
        }
        
        if (!textVal) {
            showToast("Por favor, preencha a resposta.", "error");
            return;
        }
        
        try {
            showToast("Enviando check-in...", "info");
            const res = await fetch(`/api/checkins/${appState.activeClassId}/${userEmail}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: textVal })
            });
            if (res.ok) {
                showToast("Check-in enviado com sucesso!", "success");
                renderActivePhase();
            } else {
                showToast("Erro ao submeter check-in.", "error");
            }
        } catch (err) {
            console.error(err);
            showToast("Erro de rede.", "error");
        }
    });

    // Student Form: Slide Interaction Submit
    document.getElementById("formSlideIntSubmit").addEventListener("submit", async (e) => {
        e.preventDefault();
        const userEmail = appState.currentUser;
        
        let value = "";
        const quizSel = document.querySelector('input[name="slideQuizChoice"]:checked');
        const pollSel = document.querySelector('input[name="slidePollABChoice"]:checked');
        const openText = document.getElementById("slideIntOpenText");
        
        if (quizSel) {
            value = parseInt(quizSel.value);
        } else if (pollSel) {
            value = parseInt(pollSel.value);
        } else if (openText) {
            value = openText.value.trim();
        }
        
        if (value === undefined || value === "") {
            showToast("Por favor, responda à atividade.", "error");
            return;
        }
        
        try {
            showToast("Enviando resposta...", "info");
            const res = await fetch(`/api/interactions/${appState.activeClassId}/${appState.activeSlideId}/${userEmail}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ value: value })
            });
            if (res.ok) {
                showToast("Resposta enviada!", "success");
                if (openText) openText.value = "";
                renderActivePhase();
            } else {
                showToast("Erro ao enviar.", "error");
            }
        } catch (err) {
            console.error(err);
        }
    });

    // Student Form: Reflection Submit
    document.getElementById("formReflectionSubmit").addEventListener("submit", async (e) => {
        e.preventDefault();
        const userEmail = appState.currentUser;
        const textVal = document.getElementById("reflectionText").value.trim();
        
        if (!textVal) return;
        
        try {
            showToast("Enviando reflexão...", "info");
            const res = await fetch(`/api/reflections/${appState.activeClassId}/${userEmail}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: textVal })
            });
            if (res.ok) {
                showToast("Reflexão enviada!", "success");
                renderActivePhase();
            } else {
                showToast("Erro ao salvar.", "error");
            }
        } catch (err) {
            console.error(err);
        }
    });
    
    // Activity 1 Form Submit (Risk Matrix)
    document.getElementById("formActivity1").addEventListener("submit", async (e) => {
        e.preventDefault();
        const activeStudent = appState.students.find(s => s.email === appState.currentUser);
        const groupId = activeStudent ? activeStudent.group : 1;
        
        const data = {
            risk_tech: document.getElementById("risk_tech").value,
            mit_tech: document.getElementById("mit_tech").value,
            risk_oper: document.getElementById("risk_oper").value,
            mit_oper: document.getElementById("mit_oper").value,
            risk_clinical: document.getElementById("risk_clinical").value,
            mit_clinical: document.getElementById("mit_clinical").value,
            risk_financial: document.getElementById("risk_financial").value,
            mit_financial: document.getElementById("mit_financial").value,
            showstopper: document.querySelector('input[name="showstopper"]:checked').value
        };
        
        await submitAssignment("aula1", groupId, data);
    });
    
    // Activity 2 Simulator Live inputs
    const simInputs = ["sim_investment", "sim_benefit", "sim_maintenance", "sim_risk", "sim_years"];
    simInputs.forEach(id => {
        document.getElementById(id).addEventListener("input", runSimulationCalculations);
    });
    
    // Activity 2 Form Submit (ROI Simulation)
    document.getElementById("formActivity2").addEventListener("submit", async (e) => {
        e.preventDefault();
        const activeStudent = appState.students.find(s => s.email === appState.currentUser);
        const groupId = activeStudent ? activeStudent.group : 1;
        
        const data = {
            investment: parseFloat(document.getElementById("sim_investment").value),
            benefit: parseFloat(document.getElementById("sim_benefit").value),
            maintenance: parseFloat(document.getElementById("sim_maintenance").value),
            risk: parseFloat(document.getElementById("sim_risk").value),
            years: parseInt(document.getElementById("sim_years").value),
            breakPoint: document.getElementById("breakPointScenario").value,
            justification: document.getElementById("simulationJustification").value,
            metrics: {
                expected: {
                    roi: document.getElementById("calc_roi_exp").innerText,
                    payback: document.getElementById("calc_pb_exp").innerText,
                    vpl: document.getElementById("calc_vpl_exp").innerText
                },
                realistic: {
                    roi: document.getElementById("calc_roi_real").innerText,
                    payback: document.getElementById("calc_pb_real").innerText,
                    vpl: document.getElementById("calc_vpl_real").innerText
                },
                pessimistic: {
                    roi: document.getElementById("calc_roi_pess").innerText,
                    payback: document.getElementById("calc_pb_pess").innerText,
                    vpl: document.getElementById("calc_vpl_pess").innerText
                }
            }
        };
        
        await submitAssignment("aula2", groupId, data);
    });
    
    // Activity 3 Form Submit (Business Case)
    document.getElementById("formActivity3").addEventListener("submit", async (e) => {
        e.preventDefault();
        const activeStudent = appState.students.find(s => s.email === appState.currentUser);
        const groupId = activeStudent ? activeStudent.group : 1;
        
        const checkedRec = document.querySelector('input[name="bc_recommendation"]:checked');
        if (!checkedRec) {
            showToast("Por favor, selecione uma recomendação final.", "error");
            return;
        }
        
        const data = {
            summary: document.getElementById("bc_summary").value,
            problem: document.getElementById("bc_problem").value,
            solution: document.getElementById("bc_solution").value,
            finance: document.getElementById("bc_finance").value,
            risks: document.getElementById("bc_risks").value,
            recommendation: checkedRec.value,
            rec_justification: document.getElementById("bc_rec_justification").value,
            prem_volume: document.getElementById("bc_prem_volume").value,
            prem_adoption: document.getElementById("bc_prem_adoption").value,
            prem_horizon: document.getElementById("bc_prem_horizon").value,
            prem_cost: document.getElementById("bc_prem_cost").value,
            prem_source: document.getElementById("bc_prem_source").value,
            lim_text: document.getElementById("bc_lim_text").value
        };
        
        await submitAssignment("aula3", groupId, data);
    });
    
    // Professor Sync checkbox toggle
    profSyncToggle.addEventListener("change", async (e) => {
        const checked = e.target.checked;
        await updateServerState({ syncEnabled: checked });
        showToast(checked ? "Sincronização global ativada." : "Sincronização global desativada.", "info");
    });
    
    // Professor Timer buttons
    const btnProfTimer1 = document.getElementById("btnProfTimer1");
    const btnProfTimer2 = document.getElementById("btnProfTimer2");
    const btnProfTimer5 = document.getElementById("btnProfTimer5");
    const btnProfTimerClear = document.getElementById("btnProfTimerClear");
    
    if (btnProfTimer1) btnProfTimer1.addEventListener("click", () => startTimerOnServer(1));
    if (btnProfTimer2) btnProfTimer2.addEventListener("click", () => startTimerOnServer(2));
    if (btnProfTimer5) btnProfTimer5.addEventListener("click", () => startTimerOnServer(5));
    if (btnProfTimerClear) btnProfTimerClear.addEventListener("click", () => startTimerOnServer(null));
    
    // Professor navigation clicks
    profPrevSlide.addEventListener("click", () => navigateProfessorSlide(-1));
    profNextSlide.addEventListener("click", () => navigateProfessorSlide(1));
    
    // Professor live phase buttons
    document.getElementById("btnProfPhaseCheckin").addEventListener("click", () => changeProfessorPhase("checkin"));
    document.getElementById("btnProfPhaseSlides").addEventListener("click", () => changeProfessorPhase("slides"));
    document.getElementById("btnProfPhaseQuiz").addEventListener("click", () => changeProfessorPhase("conceptcheck"));
    document.getElementById("btnProfPhaseGW").addEventListener("click", () => changeProfessorPhase("groupwork"));
    document.getElementById("btnProfPhaseReflect").addEventListener("click", () => changeProfessorPhase("reflection"));
    
    // Subclass selector in Professor dashboard
    document.querySelectorAll(".sub-tab-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            document.querySelectorAll(".sub-tab-btn").forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            renderSubmissionsInspector();
        });
    });
}

// Handle manual clicks to show warning if deviated
function handleManualNavigation() {
    if (appState.currentUser !== 'professor' && appState.serverState.syncEnabled) {
        if (appState.activeClassId !== appState.serverState.classId || 
            appState.activeSlideId !== appState.serverState.slideId || 
            appState.activeTab !== appState.serverState.activeTab) {
            appState.liveSyncEnabled = false;
            btnLiveSync.classList.remove('active');
            overrideSyncWarning.style.display = "flex";
        } else {
            appState.liveSyncEnabled = true;
            btnLiveSync.classList.add('active');
            overrideSyncWarning.style.display = "none";
        }
    }
}

// Navigate current slide (used by slides player footer buttons)
async function navigateSlide(dir) {
    const activeClass = appState.classes.find(c => c.id === appState.activeClassId);
    if (!activeClass) return;
    
    const currentIndex = activeClass.slides.findIndex(s => s.id === appState.activeSlideId);
    const nextIndex = currentIndex + dir;
    
    if (nextIndex >= 0 && nextIndex < activeClass.slides.length) {
        appState.activeSlideId = activeClass.slides[nextIndex].id;
        
        handleManualNavigation();
        
        // If the professor navigates, sync automatically
        if (appState.currentUser === 'professor') {
            await updateServerState({
                classId: appState.activeClassId,
                slideId: appState.activeSlideId
            });
        }
        
        renderSidebar();
        renderActivePhase();
        updateWorkspaceView();
    }
}

// Triggered by professor navigating next/prev slide in the dashboard
async function navigateProfessorSlide(dir) {
    const activeClass = appState.classes.find(c => c.id === appState.activeClassId);
    if (!activeClass) return;
    
    let currentIndex = activeClass.slides.findIndex(s => s.id === appState.serverState.slideId);
    if (currentIndex === -1) currentIndex = 0;
    
    let nextIndex = currentIndex + dir;
    if (nextIndex >= 0 && nextIndex < activeClass.slides.length) {
        const nextSlide = activeClass.slides[nextIndex];
        
        appState.activeSlideId = nextSlide.id;
        
        renderSidebar();
        renderActivePhase();
        updateWorkspaceView();
        
        await updateServerState({
            classId: appState.activeClassId,
            slideId: nextSlide.id
        });
        
        updateProfessorDashboardControls();
    }
}

// Switch professor phase
async function changeProfessorPhase(phase) {
    appState.activeTab = phase;
    
    // Pick correct default slide if switching to slides
    if (phase === "slides") {
        const activeClass = appState.classes.find(c => c.id === appState.activeClassId);
        if (activeClass && activeClass.slides.length > 0) {
            appState.activeSlideId = activeClass.slides[0].id;
        }
    }
    
    renderTabs();
    renderSidebar();
    renderActivePhase();
    updateWorkspaceView();
    
    await updateServerState({
        activeTab: phase,
        slideId: appState.activeSlideId
    });
}

async function startTimerOnServer(minutes) {
    const timerEnd = minutes ? Date.now() + minutes * 60 * 1000 : null;
    try {
        await updateServerState({ timerEnd });
        showToast(minutes ? `Cronômetro de ${minutes} min iniciado!` : "Cronômetro zerado!", "info");
    } catch (e) {
        console.error("Error setting timer on server:", e);
    }
}

// Update UI display of professor slides controls
function updateProfessorDashboardControls() {
    const activeClass = appState.classes.find(c => c.id === appState.activeClassId);
    if (!activeClass) return;
    
    let currentIndex = activeClass.slides.findIndex(s => s.id === appState.activeSlideId);
    if (currentIndex === -1) currentIndex = 0;
    
    profSlideIndicator.innerText = `Slide ${currentIndex + 1} / ${activeClass.slides.length}`;
}

// Highlight active phase buttons in professor dashboard
function highlightProfPhaseButtons() {
    const phases = {
        checkin: "btnProfPhaseCheckin",
        slides: "btnProfPhaseSlides",
        conceptcheck: "btnProfPhaseQuiz",
        groupwork: "btnProfPhaseGW",
        reflection: "btnProfPhaseReflect"
    };
    
    Object.entries(phases).forEach(([phase, btnId]) => {
        const btn = document.getElementById(btnId);
        if (!btn) return;
        if (appState.activeTab === phase) {
            btn.classList.add("btn-primary");
            btn.classList.remove("btn-secondary");
        } else {
            btn.classList.remove("btn-primary");
            btn.classList.add("btn-secondary");
        }
    });
}

// Update state on server
async function updateServerState(updates) {
    try {
        const body = {
            classId: appState.activeClassId,
            slideId: appState.activeSlideId,
            syncEnabled: appState.serverState.syncEnabled,
            activeTab: appState.activeTab,
            ...updates
        };
        
        const res = await fetch('/api/state', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        appState.serverState = await res.json();
    } catch (e) {
        console.error("Error updating server state", e);
    }
}

// Render Top Tabs Bar
function renderTabs() {
    document.querySelectorAll(".phase-tab-btn").forEach(btn => {
        if (btn.getAttribute("data-phase") === appState.activeTab) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
}

// Sidebar loader
function renderSidebar() {
    // 1. Highlight class tab button
    document.querySelectorAll(".class-nav-btn").forEach(btn => {
        if (btn.getAttribute("data-class") === appState.activeClassId) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
    
    // 2. Populate slide list in sidebar
    slideListContainer.innerHTML = "";
    const activeClass = appState.classes.find(c => c.id === appState.activeClassId);
    if (activeClass) {
        activeClass.slides.forEach((slide, idx) => {
            let thumbHTML = "";
            if (slide.isInteractive) {
                let icon = "fa-gamepad";
                let actName = "Atividade";
                if (slide.interactionType === "wordcloud") {
                    icon = "fa-cloud";
                    actName = "Nuvem";
                } else if (slide.interactionType === "whiteboard") {
                    icon = "fa-chalkboard-user";
                    actName = "Lousa";
                } else if (slide.interactionType === "poll" || slide.interactionType === "poll_ab") {
                    icon = "fa-square-poll-vertical";
                    actName = "Enquete";
                } else if (slide.interactionType === "quiz") {
                    icon = "fa-circle-question";
                    actName = "Quiz";
                } else if (slide.interactionType === "open_ended") {
                    icon = "fa-comments";
                    actName = "Mural";
                }
                thumbHTML = `
                    <div class="slide-thumb-preview" style="background: linear-gradient(135deg, #0284c7, #0369a1); display: flex; flex-direction: column; align-items: center; justify-content: center; color: #ffffff; gap: 0.15rem;">
                        <i class="fa-solid ${icon}" style="font-size: 1rem; color: rgba(255, 255, 255, 0.95); margin-top: 0.2rem;"></i>
                        <span style="font-size: 0.58rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3px; line-height: 1; margin-bottom: 0.1rem;">${actName}</span>
                    </div>`;
            } else if (slide.image) {
                thumbHTML = `<img src="${slide.image}" class="slide-thumb-preview" alt="${slide.title}">`;
            } else {
                thumbHTML = `
                    <div class="slide-thumb-preview" style="background: #f1f5f9; display: flex; align-items: center; justify-content: center;">
                        <i class="fa-solid fa-file-lines" style="color: var(--text-muted); font-size: 1rem;"></i>
                    </div>`;
            }

            const btn = document.createElement("button");
            btn.className = `slide-item ${slide.id === appState.activeSlideId ? 'active' : ''}`;
            btn.setAttribute("data-slide", slide.id);
            btn.title = slide.title;
            btn.innerHTML = `
                <div class="slide-thumb-wrapper">
                    <span class="slide-num-badge">${idx + 1}</span>
                    ${thumbHTML}
                </div>
            `;
            
            btn.addEventListener("click", () => {
                appState.activeSlideId = slide.id;
                handleManualNavigation();
                
                // If professor, clicking navigates and broadcasts sync
                if (appState.currentUser === 'professor') {
                    updateServerState({
                        classId: appState.activeClassId,
                        slideId: appState.activeSlideId
                    });
                }
                
                renderSidebar();
                renderActivePhase();
                updateWorkspaceView();
            });
            
            slideListContainer.appendChild(btn);
        });
    }
    
    updateLiveSlideIndicators();
    
    if (appState.currentUser === 'professor') {
        updateProfessorDashboardControls();
    }
}

// Main Dynamic Phase Switcher
function renderActivePhase() {
    // Hide all phase panels
    document.getElementById("checkinPhase").style.display = "none";
    presentationPanel.style.display = "none";
    document.getElementById("conceptCheckPhase").style.display = "none";
    document.getElementById("groupworkPhase").style.display = "none";
    document.getElementById("reflectionPhase").style.display = "none";
    document.getElementById("referencesPhase").style.display = "none";
    
    // Toggle sidebar topics container
    const sidebarSlideSection = document.getElementById("sidebarSlideSection");
    if (appState.activeTab === "slides") {
        sidebarSlideSection.style.display = "block";
    } else {
        sidebarSlideSection.style.display = "none";
    }
    
    // Show active panel
    if (appState.activeTab === "checkin") {
        document.getElementById("checkinPhase").style.display = "flex";
        renderCheckinPhase();
    } else if (appState.activeTab === "slides") {
        presentationPanel.style.display = "flex";
        renderSlideContent();
    } else if (appState.activeTab === "conceptcheck") {
        document.getElementById("conceptCheckPhase").style.display = "flex";
        renderConceptCheckPhase();
    } else if (appState.activeTab === "groupwork") {
        document.getElementById("groupworkPhase").style.display = "flex";
        renderGroupWorkPhase();
    } else if (appState.activeTab === "reflection") {
        document.getElementById("reflectionPhase").style.display = "flex";
        renderReflectionPhase();
    } else if (appState.activeTab === "references") {
        document.getElementById("referencesPhase").style.display = "flex";
        renderReferencesPhase();
    }
}

// Switch workspace view and display panels according to active phase and user role
function updateWorkspaceView() {
    const isProfessor = appState.currentUser === 'professor';
    
    if (isProfessor) {
        studentWorkspace.style.display = "none";
        professorWorkspace.style.display = "flex";
        
        const profSlideNavCard = document.getElementById("profSlideNavCard");
        if (profSlideNavCard) {
            profSlideNavCard.style.display = appState.activeTab === "slides" ? "block" : "none";
        }
        
        const profTimerCard = document.getElementById("profTimerCard");
        if (profTimerCard) {
            profTimerCard.style.display = (appState.activeTab === "slides" || appState.activeTab === "checkin" || appState.activeTab === "conceptcheck") ? "block" : "none";
        }
        
        highlightProfPhaseButtons();
        renderSubmissionsInspector();
    } else {
        studentWorkspace.style.display = "flex";
        professorWorkspace.style.display = "none";
        
        const activeStudent = appState.students.find(s => s.email === appState.currentUser);
        const groupNum = activeStudent ? activeStudent.group : 1;
        
        // Update group name header
        if (currentGroupName) {
            currentGroupName.innerText = `Equipe ${groupNum}`;
        }
        
        // Load active group scenario description
        const scenario = appState.scenarios[groupNum];
        if (groupScenarioDescription && scenario) {
            let html = `<strong>${scenario.title}</strong><br>${scenario.description}`;
            if (scenario.caseStudy) {
                html += `
                    <details class="scenario-details" style="margin-top: 0.75rem; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; padding: 0.6rem 0.8rem;">
                        <summary style="font-weight: 600; cursor: pointer; color: var(--clinical-color); font-size: 0.85rem; display: flex; align-items: center; gap: 0.4rem; list-style: none; outline: none;">
                            <i class="fa-solid fa-file-invoice-dollar" style="color: var(--gold);"></i> Estudo de Caso Detalhado (Discussão de Riscos & ROI)
                        </summary>
                        <div class="case-study-content" style="margin-top: 0.6rem; font-size: 0.8rem; line-height: 1.4; color: var(--text-primary);">
                            ${scenario.caseStudy}
                        </div>
                    </details>
                `;
            }
            groupScenarioDescription.innerHTML = html;
        }
        
        // Map tab to student sub-container element IDs
        const containerMap = {
            checkin: "studentCheckinContainer",
            slides: "studentSlideIntContainer",
            conceptcheck: "studentConceptCheckContainer",
            reflection: "studentReflectionContainer",
            references: "studentReferencesContainer"
        };
        
        // Hide all student workspace sub-containers
        Object.values(containerMap).forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = "none";
        });
        
        if (activity1Container) activity1Container.style.display = "none";
        if (activity2Container) activity2Container.style.display = "none";
        if (activity3Container) activity3Container.style.display = "none";
        
        // Show the active sub-container
        if (appState.activeTab === "groupwork") {
            if (appState.activeClassId === "aula1" && activity1Container) {
                activity1Container.style.display = "block";
            } else if (appState.activeClassId === "aula2" && activity2Container) {
                activity2Container.style.display = "block";
                if (scenario) {
                    setupSimulatorInputs(scenario);
                }
            } else if (appState.activeClassId === "aula3" && activity3Container) {
                activity3Container.style.display = "block";
                const limitationsPanel = document.getElementById("bc_limitations_panel");
                if (limitationsPanel) {
                    const isAtBCSubmission = (appState.activeSlideId === "slide_3_16" || appState.activeSlideId === "slide_3_17" || appState.activeSlideId === "slide_3_18" || appState.activeSlideId === "slide_3_19" || appState.activeSlideId === "slide_3_20" || appState.activeSlideId === "slide_3_22" || appState.activeSlideId === "slide_3_15_b" || appState.activeSlideId === "slide_3_14_a");
                    limitationsPanel.style.display = isAtBCSubmission ? "block" : "none";
                }
            }
            
            // Load saved submission state for group work
            loadSavedSubmission(appState.activeClassId, groupNum);
        } else {
            const targetContainerId = containerMap[appState.activeTab];
            const targetContainer = document.getElementById(targetContainerId);
            if (targetContainer) {
                targetContainer.style.display = "block";
                
                // Render inputs/forms for student active tab
                if (appState.activeTab === "checkin") {
                    renderStudentCheckinForm();
                } else if (appState.activeTab === "slides") {
                    renderStudentSlideIntForm();
                } else if (appState.activeTab === "reflection") {
                    renderStudentReflectionForm();
                }
            }
        }
        
        // Load feedback from professor if any
        loadProfessorFeedback(appState.activeClassId, groupNum);
    }
}

// Helper to trigger rendering of results only (useful inside SSE broadcasts)
function renderActivePhaseResults() {
    if (appState.activeTab === "checkin") {
        renderCheckinResults();
    } else if (appState.activeTab === "slides") {
        renderSlideInteractionResults();
    } else if (appState.activeTab === "reflection") {
        renderReflectionResults();
    }
}

// RENDER PHASE: 1. Check-in & Icebreaker
function renderCheckinPhase() {
    const activeClass = appState.classes.find(c => c.id === appState.activeClassId);
    if (!activeClass || !activeClass.checkin) return;
    
    // Update title
    document.getElementById("checkinQuestionTitle").innerText = activeClass.checkin.question;
    renderCheckinResults();
}

function renderCheckinResults() {
    const activeClass = appState.classes.find(c => c.id === appState.activeClassId);
    if (!activeClass || !activeClass.checkin) return;
    
    const resultsContainer = document.getElementById("checkinResultsContainer");
    const checkinData = appState.liveData.checkins || {};
    
    resultsContainer.innerHTML = "";
    
    if (activeClass.checkin.type === "wordcloud") {
        // Draw word cloud
        const cloudDiv = document.createElement("div");
        cloudDiv.className = "word-cloud-container";
        cloudDiv.id = "checkinWordCloud";
        resultsContainer.appendChild(cloudDiv);
        drawWordCloud("checkinWordCloud", checkinData);
    } else if (activeClass.checkin.type === "poll_ab" || activeClass.checkin.type === "poll") {
        const options = activeClass.checkin.options || ["Opção A", "Opção B"];
        const counts = Array(options.length).fill(0);
        let total = 0;
        
        Object.values(checkinData).forEach(ans => {
            const val = ans.text;
            if (typeof val === 'string' && val.length === 1) {
                const idx = val.charCodeAt(0) - 65; // A=0, B=1, ...
                if (idx >= 0 && idx < counts.length) {
                    counts[idx]++;
                    total++;
                }
            }
        });
        
        let pollHTML = `<div class="poll-ab-wrapper" style="width: 100%; max-width: 550px; margin: 0 auto;">`;
        options.forEach((opt, idx) => {
            const count = counts[idx];
            const pct = total > 0 ? Math.round((count / total) * 100) : 0;
            const pollColors = ['#0284c7', '#10b981', '#7b1fa2', '#ef6c00', '#ec4899', '#f59e0b', '#3b82f6'];
            const color = pollColors[idx % pollColors.length];
            pollHTML += `
                <div class="poll-ab-option" style="padding: 0.6rem; border-left: 4px solid ${color}; border-top: 1px solid var(--border-color); border-right: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); border-radius: 4px 6px 6px 4px;">
                    <span class="poll-ab-label">${opt}</span>
                    <span class="poll-ab-pct">${pct}% (${count} votos)</span>
                </div>
                <div class="poll-ab-bar-container" style="height:6px; margin-bottom:0.8rem; border-radius: 3px; overflow: hidden; background: rgba(0,0,0,0.05);">
                    <div class="poll-ab-bar" style="width: ${pct}%; background-color: ${color}; height: 100%;"></div>
                </div>
            `;
        });
        pollHTML += `</div>`;
        resultsContainer.innerHTML = pollHTML;
    }
}

// Render student input check-in form in the right workspace panel
function renderStudentCheckinForm() {
    const activeClass = appState.classes.find(c => c.id === appState.activeClassId);
    if (!activeClass || !activeClass.checkin) return;
    
    const userEmail = appState.currentUser;
    const hasSubmitted = !!(appState.liveData.checkins && appState.liveData.checkins[userEmail]);
    const sub = hasSubmitted ? appState.liveData.checkins[userEmail] : null;
    const subText = sub ? sub.text : "";
    
    const inputGroup = document.getElementById("checkinInputGroup");
    if (!inputGroup) return;

    // Check if we already have the correct form rendered to avoid erasing user typing
    const lastRenderedClassId = inputGroup.getAttribute("data-class-id");
    const lastRenderedSub = inputGroup.getAttribute("data-last-sub");
    const isAlreadyRendered = lastRenderedClassId === appState.activeClassId && lastRenderedSub === subText;
    
    // Check if the actual inputs exist in DOM (in case it was cleared or toggled)
    const hasTextInput = !!document.getElementById("checkinTextAnswer");
    const hasRadioInput = !!document.querySelector('input[name="checkinABAnswer"]');
    const isPollType = activeClass.checkin.type === "poll_ab" || activeClass.checkin.type === "poll";
    const inputsExist = (activeClass.checkin.type === "wordcloud" && hasTextInput) || 
                       (isPollType && hasRadioInput);
                       
    if (isAlreadyRendered && inputsExist) {
        // Already rendered and correct state, don't recreate to avoid erasing input
        return;
    }
    
    // Otherwise, render and update attributes
    inputGroup.setAttribute("data-class-id", appState.activeClassId);
    inputGroup.setAttribute("data-last-sub", subText);
    
    inputGroup.innerHTML = "";
    
    const submitBtn = document.querySelector("#studentCheckinContainer button[type='submit']");
    if (submitBtn) submitBtn.style.display = "block";
    
    let htmlContent = "";
    
    if (hasSubmitted) {
        htmlContent += `
            <div class="status-notice" style="margin-bottom: 1rem; padding: 0.6rem 0.8rem; border-radius: 6px; background-color: rgba(16, 185, 129, 0.1); border-left: 3px solid var(--clinical-color); font-size: 0.8rem; color: #065f46; font-weight: 500; display: flex; align-items: center; gap: 0.5rem;">
                <i class="fa-solid fa-circle-check" style="color: var(--clinical-color);"></i>
                <span>Resposta enviada! Você pode alterá-la e reenviar se desejar.</span>
            </div>
        `;
        if (submitBtn) {
            submitBtn.innerHTML = `<i class="fa-solid fa-arrows-rotate"></i> Atualizar Resposta`;
        }
    } else {
        if (submitBtn) {
            submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Enviar Check-in`;
        }
    }
    
    if (activeClass.checkin.type === "wordcloud") {
        htmlContent += `
            <label for="checkinTextAnswer"><strong>${activeClass.checkin.question}</strong></label>
            <input type="text" id="checkinTextAnswer" class="form-control" placeholder="Escreva uma palavra..." required max-length="25" value="${subText.replace(/"/g, '&quot;')}">
        `;
    } else if (activeClass.checkin.type === "poll_ab" || activeClass.checkin.type === "poll") {
        const options = activeClass.checkin.options || ["Opção A", "Opção B"];
        let optionsHTML = "";
        options.forEach((opt, idx) => {
            const charCode = String.fromCharCode(65 + idx);
            const isChecked = (subText === charCode) ? "checked" : "";
            const classes = ["go", "conditional", "critical", "go", "conditional"];
            const classStr = classes[idx % classes.length];
            optionsHTML += `
                <label class="radio-label ${classStr}" style="width: 100%; border: 1px solid var(--border-color); background: var(--bg-card);">
                    <input type="radio" name="checkinABAnswer" value="${charCode}" required ${isChecked}> ${opt}
                </label>
            `;
        });
        
        htmlContent += `
            <label><strong>${activeClass.checkin.question}</strong></label>
            <div class="radio-group" style="flex-direction: column; gap: 0.6rem;">
                ${optionsHTML}
            </div>
        `;
    }
    
    inputGroup.innerHTML = htmlContent;
}


// RENDER PHASE: 2. Slides & Content Viewer
function renderSlideContent() {
    const activeClass = appState.classes.find(c => c.id === appState.activeClassId);
    if (!activeClass) return;
    
    const slide = activeClass.slides.find(s => s.id === appState.activeSlideId);
    if (!slide) return;
    
    // Slide progression stats
    const slideIndex = activeClass.slides.findIndex(s => s.id === slide.id);
    const totalSlides = activeClass.slides.length;
    const progressPct = totalSlides > 0 ? Math.round(((slideIndex + 1) / totalSlides) * 100) : 0;
    
    const slideBlockInfo = document.getElementById("slideBlockInfo");
    const slideTimeEst = document.getElementById("slideTimeEst");
    const slideProgressBar = document.getElementById("slideProgressBar");
    const slideProgressText = document.getElementById("slideProgressText");
    
    if (slideBlockInfo) slideBlockInfo.innerText = `Bloco: ${slide.block || "Introdução"}`;
    if (slideTimeEst) slideTimeEst.innerText = `(Tempo: ${slide.estimatedTime || "2 min"})`;
    if (slideProgressBar) slideProgressBar.style.width = `${progressPct}%`;
    if (slideProgressText) slideProgressText.innerText = `${progressPct}%`;
    
    // Update Slide Notes for professor
    const profSlideNotesContent = document.getElementById("profSlideNotesContent");
    const profSlideNotesCard = document.getElementById("profSlideNotesCard");
    if (appState.currentUser === 'professor') {
        if (profSlideNotesCard) profSlideNotesCard.style.display = "block";
        if (profSlideNotesContent) {
            if (slide.notes) {
                let formattedNotes = slide.notes
                    .replace(/\n/g, "<br>")
                    .replace(/(Fala sugerida:)/gi, "<strong>$1</strong>")
                    .replace(/(Sugestão visual:)/gi, "<strong>$1</strong>");
                profSlideNotesContent.innerHTML = formattedNotes;
            } else {
                profSlideNotesContent.innerHTML = `<em>Nenhuma nota de condução definida para este slide.</em>`;
            }
        }
    } else {
        if (profSlideNotesCard) profSlideNotesCard.style.display = "none";
    }
    
    // Toggle Interactive vs standard slide viewport vs whiteboard vs view mode controls
    const whiteboardViewport = document.getElementById("whiteboardViewport");
    const btnShowSlideImage = document.getElementById("btnShowSlideImage");
    const btnShowSlideTranscript = document.getElementById("btnShowSlideTranscript");
    
    const isTextSlide = slide.id.endsWith("_read") || slide.id.endsWith("_ref") || (slide.content && (slide.content.includes("class=\"read-link\"") || slide.content.includes("class=\"references-list-page\"")));
    
    if (btnShowSlideImage && btnShowSlideTranscript) {
        if (slide.interactionType === "whiteboard" || isTextSlide) {
            btnShowSlideImage.style.display = "none";
            btnShowSlideTranscript.style.display = "none";
        } else {
            btnShowSlideImage.style.display = "inline-flex";
            btnShowSlideTranscript.style.display = "inline-flex";
        }
    }
    
    if (slide.interactionType === "whiteboard") {
        slideViewport.style.display = "none";
        slideInteractiveViewport.style.display = "none";
        if (whiteboardViewport) whiteboardViewport.style.display = "flex";
        setupWhiteboardCanvas();
    } else if (slide.isInteractive) {
        if (whiteboardViewport) whiteboardViewport.style.display = "none";
        
        if (appState.slideViewMode === "transcript") {
            slideViewport.style.display = "flex";
            slideInteractiveViewport.style.display = "none";
            slideViewport.innerHTML = `<div class="slide-transcript-container">${slide.content || `<h3>${slide.title}</h3><p>${slide.question}</p>`}</div>`;
        } else {
            slideViewport.style.display = "none";
            slideInteractiveViewport.style.display = "flex";
            document.getElementById("slideIntQuestionTitle").innerText = slide.question;
            renderSlideInteractionResults();
        }
    } else {
        if (whiteboardViewport) whiteboardViewport.style.display = "none";
        slideInteractiveViewport.style.display = "none";
        slideViewport.style.display = "flex";
        
        if (appState.slideViewMode === "image" && slide.image && !isTextSlide) {
            slideViewport.innerHTML = `<div class="slide-image-container"><img src="${slide.image}" class="slide-img" alt="${slide.title}"></div>`;
        } else {
            slideViewport.innerHTML = `<div class="slide-transcript-container">${slide.content}</div>`;
        }
    }
    
    // Update slide indicator in footer
    slideIndicatorText.innerText = `Slide ${slideIndex + 1} / ${activeClass.slides.length}`;
}

// Render dynamic results inside interactive slide view
function renderSlideInteractionResults() {
    const activeClass = appState.classes.find(c => c.id === appState.activeClassId);
    if (!activeClass) return;
    
    const slide = activeClass.slides.find(s => s.id === appState.activeSlideId);
    if (!slide || !slide.isInteractive) return;
    
    const resultsContainer = document.getElementById("slideIntResultsContainer");
    resultsContainer.innerHTML = "";
    
    const interactions = appState.liveData.slideInteractions || [];
    
    // Update participation counter
    const participationCounter = document.getElementById("slideParticipationCounter");
    if (participationCounter) {
        participationCounter.innerHTML = `<i class="fa-solid fa-users"></i> ${interactions.length} respostas`;
    }
    
    if (slide.interactionType === "quiz" || slide.interactionType === "poll_ab" || slide.interactionType === "poll") {
        // Draw vote distribution bars
        const counts = Array(slide.options ? slide.options.length : 2).fill(0);
        let total = 0;
        
        interactions.forEach(ans => {
            const idx = parseInt(ans.value);
            if (idx >= 0 && idx < counts.length) {
                counts[idx]++;
                total++;
            }
        });
        
        const wrapper = document.createElement("div");
        wrapper.className = "poll-ab-wrapper";
        wrapper.style.width = "100%";
        wrapper.style.maxWidth = "550px";
        
        const isAnsweredByProfessorOrEnd = appState.currentUser === 'professor' || 
            (appState.currentUser !== 'professor' && interactions.some(x => x.userEmail === appState.currentUser));
        
        slide.options.forEach((opt, idx) => {
            const count = counts[idx];
            const pct = total > 0 ? Math.round((count / total) * 100) : 0;
            const hasCorrectAnswer = slide.correctAnswerIndex !== undefined;
            const isCorrect = hasCorrectAnswer && idx === slide.correctAnswerIndex;
            const isQuizCorrectReveal = slide.interactionType === "quiz" && isAnsweredByProfessorOrEnd;
            const isPollCorrectReveal = (slide.interactionType === "poll" || slide.interactionType === "poll_ab") && appState.serverState.revealAnswers;
            const showCheck = (isQuizCorrectReveal || isPollCorrectReveal) && isCorrect;
            
            let color = "var(--gold)";
            const pollColors = ['#0284c7', '#10b981', '#7b1fa2', '#ef6c00', '#ec4899', '#f59e0b', '#3b82f6'];
            
            if (isQuizCorrectReveal || isPollCorrectReveal) {
                color = isCorrect ? "var(--clinical-color)" : "var(--text-muted)";
            } else if (slide.interactionType === "poll_ab" || slide.interactionType === "poll") {
                color = pollColors[idx % pollColors.length];
            }
            
            const itemHTML = `
                <div class="poll-ab-option" style="padding: 0.6rem; border-left: 4px solid ${color}; border-top: 1px solid var(--border-color); border-right: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); border-radius: 4px 6px 6px 4px; ${isCorrect && (isQuizCorrectReveal || isPollCorrectReveal) ? 'background: rgba(16, 185, 129, 0.05);' : ''}">
                    <span class="poll-ab-label" style="${isCorrect && (isQuizCorrectReveal || isPollCorrectReveal) ? 'font-weight: 700;' : ''}">${opt} ${showCheck ? ' <i class="fa-solid fa-check-circle" style="color:var(--clinical-color)"></i>' : ''}</span>
                    <span class="poll-ab-pct" style="${isCorrect && (isQuizCorrectReveal || isPollCorrectReveal) ? 'font-weight: 700; color: var(--clinical-color);' : ''}">${pct}% (${count} votos)</span>
                </div>
                <div class="poll-ab-bar-container" style="height:6px; margin-bottom:0.8rem; border-radius: 3px; overflow: hidden; background: rgba(0,0,0,0.05);">
                    <div class="poll-ab-bar" style="width: ${pct}%; background-color: ${color}; height: 100%;"></div>
                </div>
            `;
            wrapper.innerHTML += itemHTML;
        });
        
        resultsContainer.appendChild(wrapper);
        
        if (appState.currentUser === 'professor' && slide.correctAnswerIndex !== undefined) {
            const isRevealed = appState.serverState.revealAnswers;
            const revealBtn = document.createElement("button");
            revealBtn.className = "btn btn-icon-text sync-btn";
            revealBtn.style.marginTop = "1rem";
            revealBtn.style.alignSelf = "center";
            revealBtn.style.backgroundColor = isRevealed ? "var(--warning)" : "var(--clinical-color)";
            revealBtn.style.color = "#ffffff";
            revealBtn.innerHTML = isRevealed 
                ? `<i class="fa-solid fa-eye-slash"></i> Ocultar Resposta Correta` 
                : `<i class="fa-solid fa-eye"></i> Revelar Resposta Correta`;
            
            revealBtn.addEventListener("click", () => {
                updateServerState({ revealAnswers: !isRevealed });
            });
            
            wrapper.appendChild(revealBtn);
            wrapper.style.display = "flex";
            wrapper.style.flexDirection = "column";
        }
    } else if (slide.interactionType === "open_ended" || slide.interactionType === "qa") {
        if (interactions.length === 0) {
            resultsContainer.innerHTML = `<p class="placeholder-text"><i class="fa-solid fa-hourglass-half"></i> Aguardando respostas das equipes...</p>`;
            return;
        }
        
        const grid = document.createElement("div");
        grid.className = "open-responses-grid";
        grid.style.width = "100%";
        grid.style.maxHeight = "380px";
        grid.style.overflowY = "auto";
        grid.style.padding = "0.2rem";
        
        // Sort interactions
        let sorted = [...interactions];
        if (slide.interactionType === "qa") {
            sorted.sort((a, b) => {
                if (a.pinned && !b.pinned) return -1;
                if (!a.pinned && b.pinned) return 1;
                return (b.likes ? b.likes.length : 0) - (a.likes ? a.likes.length : 0);
            });
        } else {
            sorted.sort((a, b) => (b.likes ? b.likes.length : 0) - (a.likes ? a.likes.length : 0));
        }
        
        const userEmail = appState.currentUser;
        const isProfessor = userEmail === 'professor';
        
        sorted.forEach(ans => {
            // Skip hidden cards for normal students
            if (ans.hidden && !isProfessor) {
                return;
            }
            
            const hasLiked = ans.likes && ans.likes.includes(userEmail);
            const likeCount = ans.likes ? ans.likes.length : 0;
            
            const card = document.createElement("div");
            card.className = "open-response-card";
            
            // Add status classes
            if (ans.pinned) card.classList.add("response-card-pinned");
            if (ans.highlighted) card.classList.add("response-card-highlighted");
            if (ans.answered) card.classList.add("response-card-answered");
            if (ans.hidden) card.classList.add("response-card-hidden");
            
            // Render moderation badges
            let badgesHTML = "";
            if (ans.pinned) {
                badgesHTML += `<span class="mod-badge mod-badge-pinned"><i class="fa-solid fa-thumbtack"></i> Fixada</span>`;
            } else if (ans.highlighted) {
                badgesHTML += `<span class="mod-badge mod-badge-highlighted"><i class="fa-solid fa-star"></i> Destacada</span>`;
            } else if (ans.hidden) {
                badgesHTML += `<span class="mod-badge mod-badge-hidden"><i class="fa-solid fa-eye-slash"></i> Oculta</span>`;
            } else if (ans.answered) {
                badgesHTML += `<span class="mod-badge mod-badge-answered"><i class="fa-solid fa-check"></i> Respondida</span>`;
            }
            
            // Moderation Controls Row for Professor
            let modControlsHTML = "";
            if (isProfessor) {
                if (slide.interactionType === "qa") {
                    modControlsHTML = `
                        <div class="mod-controls-row">
                            <button class="btn-mod-action btn-pin-toggle ${ans.pinned ? 'active-pin' : ''}" data-id="${ans.id}" title="Fixar/Desfixar">
                                <i class="fa-solid fa-thumbtack"></i> ${ans.pinned ? 'Desfixar' : 'Fixar'}
                            </button>
                            <button class="btn-mod-action btn-answer-toggle ${ans.answered ? 'active-answer' : ''}" data-id="${ans.id}" title="Marcar como Respondido">
                                <i class="fa-solid fa-check"></i> ${ans.answered ? 'Desmarcar' : 'Respondida'}
                            </button>
                            <button class="btn-mod-action btn-hide-toggle ${ans.hidden ? 'active-hide' : ''}" data-id="${ans.id}" title="Ocultar/Exibir">
                                <i class="fa-solid ${ans.hidden ? 'fa-eye' : 'fa-eye-slash'}"></i> ${ans.hidden ? 'Exibir' : 'Ocultar'}
                            </button>
                        </div>
                    `;
                } else {
                    // open_ended
                    modControlsHTML = `
                        <div class="mod-controls-row">
                            <button class="btn-mod-action btn-highlight-toggle ${ans.highlighted ? 'active-highlight' : ''}" data-id="${ans.id}" title="Destacar/Remover Destaque">
                                <i class="fa-solid fa-star"></i> ${ans.highlighted ? 'Desfazer' : 'Destacar'}
                            </button>
                            <button class="btn-mod-action btn-hide-toggle ${ans.hidden ? 'active-hide' : ''}" data-id="${ans.id}" title="Ocultar/Exibir">
                                <i class="fa-solid ${ans.hidden ? 'fa-eye' : 'fa-eye-slash'}"></i> ${ans.hidden ? 'Exibir' : 'Ocultar'}
                            </button>
                        </div>
                    `;
                }
            }
            
            const authorText = slide.interactionType === "qa" 
                ? `${ans.studentName || 'Visitante'} (Equipe ${ans.groupId})`
                : `Equipe ${ans.groupId}`;
            
            card.innerHTML = `
                ${badgesHTML}
                <p style="margin-top: ${badgesHTML ? '1.5rem' : '0'};">"${ans.value}"</p>
                <div class="open-response-footer">
                    <span class="open-response-author">${authorText}</span>
                    <button class="like-button ${hasLiked ? 'liked' : ''}" data-id="${ans.id}" ${isProfessor ? 'disabled' : ''}>
                        <i class="${hasLiked ? 'fa-solid' : 'fa-regular'} fa-thumbs-up"></i> 
                        <span>${likeCount}</span>
                    </button>
                </div>
                ${modControlsHTML}
            `;
            
            // Bind click events
            if (!isProfessor) {
                const btn = card.querySelector(".like-button");
                if (btn) {
                    btn.addEventListener("click", () => handleLikeInteraction(ans.id));
                }
            } else {
                const btnHide = card.querySelector(".btn-hide-toggle");
                if (btnHide) btnHide.addEventListener("click", () => handleToggleHide(ans.id));
                
                const btnHighlight = card.querySelector(".btn-highlight-toggle");
                if (btnHighlight) btnHighlight.addEventListener("click", () => handleToggleHighlight(ans.id));
                
                const btnPin = card.querySelector(".btn-pin-toggle");
                if (btnPin) btnPin.addEventListener("click", () => handleTogglePin(ans.id));
                
                const btnAnswer = card.querySelector(".btn-answer-toggle");
                if (btnAnswer) btnAnswer.addEventListener("click", () => handleToggleAnswer(ans.id));
            }
            
            grid.appendChild(card);
        });
        
        resultsContainer.appendChild(grid);
    } else if (slide.interactionType === "wordcloud") {
        if (interactions.length === 0) {
            resultsContainer.innerHTML = `<p class="placeholder-text"><i class="fa-solid fa-hourglass-half"></i> Aguardando respostas das equipes...</p>`;
            return;
        }
        
        // Count frequencies of words and gather likes
        const frequencies = {};
        const wordLikes = {}; // cleanWord -> Set of userEmails who liked it
        
        interactions.forEach(ans => {
            const val = (ans.value || "").trim();
            if (!val) return;
            const words = val.split(/\s+/);
            words.forEach(w => {
                const clean = w.toUpperCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim();
                if (clean.length > 2) {
                    frequencies[clean] = (frequencies[clean] || 0) + 1;
                    if (!wordLikes[clean]) {
                        wordLikes[clean] = new Set();
                    }
                    if (ans.likes) {
                        ans.likes.forEach(liker => wordLikes[clean].add(liker));
                    }
                }
            });
        });
        
        if (Object.keys(frequencies).length === 0) {
            resultsContainer.innerHTML = `<p class="placeholder-text"><i class="fa-solid fa-hourglass-half"></i> Aguardando respostas das equipes...</p>`;
            return;
        }
        
        const wrapper = document.createElement("div");
        wrapper.className = "wordcloud-wrapper";
        wrapper.style.display = "block";
        wrapper.style.textAlign = "center";
        wrapper.style.padding = "2.5rem";
        wrapper.style.width = "100%";
        wrapper.style.lineHeight = "2.6";
        
        // Determine max frequency to scale fonts
        const maxFreq = Math.max(...Object.values(frequencies));
        const uniqueWordCount = Object.keys(frequencies).length;
        
        // Adaptive font sizing configurations
        let baseFontSize = 1.1;
        let scalingFactor = 1.4;
        if (uniqueWordCount > 35) {
            baseFontSize = 0.8;
            scalingFactor = 0.8;
        } else if (uniqueWordCount > 20) {
            baseFontSize = 0.95;
            scalingFactor = 1.1;
        }
        
        // Render each word
        Object.entries(frequencies).forEach(([word, freq]) => {
            const size = baseFontSize + (freq / maxFreq) * scalingFactor;
            const colors = [
                "var(--clinical-color)", // Hospital blue
                "var(--gold)", // Gold/Yellow
                "#ef4444", // Alert red
                "#06b6d4", // Sky blue
                "#0f766e", // Teal
                "#6366f1"  // Indigo
            ];
            const hash = word.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const color = colors[hash % colors.length];
            
            const wordSpan = document.createElement("span");
            wordSpan.style.fontSize = `${size}rem`;
            wordSpan.style.color = color;
            wordSpan.style.fontWeight = "bold";
            wordSpan.style.padding = "0.2rem 0.7rem";
            wordSpan.style.margin = "0.3rem 0.6rem";
            wordSpan.style.borderRadius = "8px";
            wordSpan.style.transition = "all 0.2s ease";
            wordSpan.style.cursor = "pointer";
            wordSpan.style.display = "inline-block";
            wordSpan.style.wordBreak = "keep-all";
            wordSpan.style.whiteSpace = "nowrap";
            wordSpan.style.userSelect = "none";
            
            const textNode = document.createTextNode(word);
            wordSpan.appendChild(textNode);
            
            // Likes badge
            const likesList = wordLikes[word] ? Array.from(wordLikes[word]) : [];
            const likesCount = likesList.length;
            const userHasLiked = likesList.includes(appState.currentUser);
            
            if (likesCount > 0) {
                const badge = document.createElement("span");
                badge.style.display = "inline-flex";
                badge.style.alignItems = "center";
                badge.style.justifyContent = "center";
                badge.style.gap = "3px";
                badge.style.background = userHasLiked ? "rgba(15, 118, 110, 0.15)" : "rgba(251, 191, 36, 0.1)";
                badge.style.border = userHasLiked ? "1px solid rgba(15, 118, 110, 0.3)" : "1px solid rgba(251, 191, 36, 0.2)";
                badge.style.padding = "2px 6px";
                badge.style.borderRadius = "20px";
                badge.style.fontSize = "0.55em";
                badge.style.marginLeft = "6px";
                badge.style.color = userHasLiked ? "var(--clinical-color)" : "var(--gold)";
                badge.style.fontWeight = "bold";
                badge.style.verticalAlign = "middle";
                badge.innerHTML = `<i class="fa-solid fa-thumbs-up"></i> ${likesCount}`;
                wordSpan.appendChild(badge);
            }
            
            wordSpan.title = `Clique duplo para curtir/remover curtida · ${freq} ${freq === 1 ? 'resposta' : 'respostas'}`;
            
            wordSpan.addEventListener("mouseenter", () => {
                wordSpan.style.transform = "scale(1.15)";
                wordSpan.style.textShadow = "0 0 10px rgba(0,0,0,0.1)";
            });
            wordSpan.addEventListener("mouseleave", () => {
                wordSpan.style.transform = "scale(1)";
                wordSpan.style.textShadow = "none";
            });
            
            // Double click / Double tap to like slide interaction word
            let lastTap = 0;
            wordSpan.addEventListener("click", (e) => {
                const now = Date.now();
                if (now - lastTap < 300) {
                    e.stopPropagation();
                    e.preventDefault();
                    handleWordLike("interaction", appState.activeClassId, slide.id, word);
                }
                lastTap = now;
            });
            wordSpan.addEventListener("dblclick", (e) => {
                e.stopPropagation();
                handleWordLike("interaction", appState.activeClassId, slide.id, word);
            });
            
            wrapper.appendChild(wordSpan);
        });
        
        resultsContainer.appendChild(wrapper);
    }
}

// Upvote slide answer
async function handleLikeInteraction(responseId) {
    const userEmail = appState.currentUser;
    try {
        const res = await fetch(`/api/interactions/like/${appState.activeClassId}/${appState.activeSlideId}/${responseId}/${userEmail}`, {
            method: 'POST'
        });
        if (res.ok) {
            const updated = await res.json();
            appState.liveData.slideInteractions = updated.data;
            renderSlideInteractionResults();
        }
    } catch (e) {
        console.error(e);
    }
}

// Double-click to like a word in the word cloud
async function handleWordLike(type, classId, slideId, word) {
    const userEmail = appState.currentUser;
    if (userEmail === 'professor') {
        showToast("Professores não votam nas interações.", "error");
        return;
    }
    
    let url = "";
    if (type === "checkin") {
        url = `/api/checkins/like/${classId}/${encodeURIComponent(word)}/${encodeURIComponent(userEmail)}`;
    } else {
        url = `/api/interactions/like-word/${classId}/${slideId}/${encodeURIComponent(word)}/${encodeURIComponent(userEmail)}`;
    }
    
    try {
        const res = await fetch(url, { method: "POST" });
        if (res.ok) {
            const data = await res.json();
            if (data.success) {
                showToast(`Você curtiu a palavra "${word}"!`, "success");
                if (type === "checkin") {
                    appState.liveData.checkins = data.data;
                    renderCheckinResults();
                } else {
                    appState.liveData.slideInteractions = data.data;
                    renderSlideInteractionResults();
                }
            }
        }
    } catch (err) {
        console.error("Error liking word:", err);
    }
}

// Professor moderation toggles
async function handleToggleHide(responseId) {
    try {
        const res = await fetch(`/api/interactions/hide/${appState.activeClassId}/${appState.activeSlideId}/${responseId}`, {
            method: 'POST'
        });
        if (res.ok) {
            const data = await res.json();
            appState.liveData.slideInteractions = data.data;
            renderSlideInteractionResults();
            showToast("Status de exibição atualizado", "success");
        }
    } catch (e) {
        console.error(e);
    }
}

async function handleToggleHighlight(responseId) {
    try {
        const res = await fetch(`/api/interactions/highlight/${appState.activeClassId}/${appState.activeSlideId}/${responseId}`, {
            method: 'POST'
        });
        if (res.ok) {
            const data = await res.json();
            appState.liveData.slideInteractions = data.data;
            renderSlideInteractionResults();
            showToast("Status de destaque atualizado", "success");
        }
    } catch (e) {
        console.error(e);
    }
}

async function handleTogglePin(responseId) {
    try {
        const res = await fetch(`/api/interactions/pin/${appState.activeClassId}/${appState.activeSlideId}/${responseId}`, {
            method: 'POST'
        });
        if (res.ok) {
            const data = await res.json();
            appState.liveData.slideInteractions = data.data;
            renderSlideInteractionResults();
            showToast("Status de fixação atualizado", "success");
        }
    } catch (e) {
        console.error(e);
    }
}

async function handleToggleAnswer(responseId) {
    try {
        const res = await fetch(`/api/interactions/answer/${appState.activeClassId}/${appState.activeSlideId}/${responseId}`, {
            method: 'POST'
        });
        if (res.ok) {
            const data = await res.json();
            appState.liveData.slideInteractions = data.data;
            renderSlideInteractionResults();
            showToast("Status de resposta atualizado", "success");
        }
    } catch (e) {
        console.error(e);
    }
}

// Student slide interaction form rendering
function renderStudentSlideIntForm() {
    const activeClass = appState.classes.find(c => c.id === appState.activeClassId);
    if (!activeClass) return;
    
    const slide = activeClass.slides.find(s => s.id === appState.activeSlideId);
    const inputGroup = document.getElementById("slideIntInputGroup");
    inputGroup.innerHTML = "";
    
    const submitBtn = document.querySelector("#studentSlideIntContainer button[type='submit']");
    
    if (!slide || !slide.isInteractive) {
        inputGroup.innerHTML = `
            <div class="highlight-box" style="background: rgba(2, 132, 199, 0.02); margin: 0;">
                <p style="margin: 0; font-size: 0.8rem; text-align: center;"><i class="fa-solid fa-circle-info"></i> Slide padrão. Acompanhe a explicação da professora.</p>
            </div>
        `;
        if (submitBtn) submitBtn.style.display = "none";
        return;
    }
    
    const userEmail = appState.currentUser;
    const existingAns = appState.liveData.slideInteractions && appState.liveData.slideInteractions.find(x => x.userEmail === userEmail);
    const isQA = slide.interactionType === "qa";
    
    if (existingAns && !isQA) {
        inputGroup.innerHTML = `
            <div class="highlight-box" style="border-left-color: var(--clinical-color); background: rgba(16, 185, 129, 0.03);">
                <strong>Sua resposta enviada:</strong>
                <p style="margin: 0; font-size: 0.85rem; font-weight: 600; color: var(--clinical-color);">
                    ${slide.interactionType === 'open_ended' || slide.interactionType === 'wordcloud' ? `"${existingAns.value}"` : slide.options[existingAns.value]}
                </p>
            </div>
            <p style="font-size: 0.75rem; color: var(--text-secondary); text-align: center;">Curta as respostas dos colegas na tela ao lado!</p>
        `;
        if (submitBtn) submitBtn.style.display = "none";
    } else {
        if (submitBtn) submitBtn.style.display = "block";
        document.getElementById("slideIntDescription").innerText = isQA
            ? "Envie suas dúvidas ou comentários sobre a aula no espaço abaixo."
            : "Responda à pergunta da professora.";
        
        if (slide.interactionType === "quiz" || slide.interactionType === "poll_ab" || slide.interactionType === "poll") {
            let optionsHTML = "";
            const isPoll = slide.interactionType === "poll" || slide.interactionType === "poll_ab";
            slide.options.forEach((opt, idx) => {
                const activeClassStr = isPoll ? (idx === 0 ? "go" : "conditional") : "conditional";
                const radioName = isPoll ? "slidePollABChoice" : "slideQuizChoice";
                
                optionsHTML += `
                    <label class="radio-label ${activeClassStr}" style="width: 100%; border: 1px solid var(--border-color); background: var(--bg-card);">
                        <input type="radio" name="${radioName}" value="${idx}" required> ${opt}
                    </label>
                `;
            });
            inputGroup.innerHTML = `
                <label><strong>${slide.question}</strong></label>
                <div class="radio-group" style="flex-direction: column; gap: 0.6rem;">
                    ${optionsHTML}
                </div>
            `;
        } else if (slide.interactionType === "open_ended" || slide.interactionType === "qa" || slide.interactionType === "wordcloud") {
            const isWordcloud = slide.interactionType === "wordcloud";
            const placeholder = isWordcloud ? 'Ex: Confiança' : (isQA ? 'Ex: Qual a taxa de desconto recomendada?' : 'Ex: Rigor metodológico e testes paralelos...');
            const helpText = isWordcloud ? 'Envie uma única palavra.' : 'Máximo 100 caracteres. Seja sucinto e objetivo.';
            const maxLen = isWordcloud ? 30 : 100;
            
            inputGroup.innerHTML = `
                <label for="slideIntOpenText"><strong>${slide.question}</strong></label>
                <span class="help-text">${helpText}</span>
                <input type="text" id="slideIntOpenText" required maxlength="${maxLen}" placeholder="${placeholder}" class="form-control" style="width: 100%; padding: 0.6rem; border: 1px solid var(--border-color); border-radius: 6px; background: var(--bg-card); color: var(--text-main);">
            `;
        }
    }
}

// RENDER PHASE: 3. Concept Check
function renderConceptCheckPhase() {
    const activeClass = appState.classes.find(c => c.id === appState.activeClassId);
    if (!activeClass || !activeClass.conceptCheck) return;
    
    const container = document.getElementById("conceptQuestionsList");
    container.innerHTML = "";
    
    const scoreContainer = document.getElementById("conceptScoreContainer");
    scoreContainer.style.display = "none";
    
    const userEmail = appState.currentUser;
    const savedQuiz = appState.liveData.conceptChecks && appState.liveData.conceptChecks[userEmail];
    
    // If submitted and student, show score and hide/don't render questions
    if (savedQuiz && appState.currentUser !== 'professor') {
        scoreContainer.style.display = "block";
        document.getElementById("conceptScoreText").innerText = `Você acertou ${savedQuiz.score} de ${activeClass.conceptCheck.length} questões.`;
        return;
    }
    
    activeClass.conceptCheck.forEach((q, qIdx) => {
        const card = document.createElement("div");
        card.className = "concept-question-card";
        
        let optionsHTML = "";
        q.options.forEach((opt, oIdx) => {
            let optClass = "";
            let icon = "";
            
            if (savedQuiz) {
                const selectedIdx = savedQuiz.answers[qIdx];
                const isCorrect = oIdx === q.correctAnswerIndex;
                const isSelected = oIdx === selectedIdx;
                
                if (isCorrect) {
                    optClass = "correct";
                    icon = `<i class="fa-solid fa-check-circle" style="margin-left:auto;"></i>`;
                } else if (isSelected) {
                    optClass = "incorrect";
                    icon = `<i class="fa-solid fa-times-circle" style="margin-left:auto;"></i>`;
                }
            } else {
                const isSelected = appState.localConceptAnswers[qIdx] === oIdx;
                if (isSelected) optClass = "selected";
            }
            
            optionsHTML += `
                <div class="concept-option-item ${optClass}" data-q="${qIdx}" data-o="${oIdx}">
                    <span>${String.fromCharCode(65 + oIdx)}) ${opt}</span>
                    ${icon}
                </div>
            `;
        });
        
        card.innerHTML = `
            <h4>Questão ${qIdx + 1}: ${q.question}</h4>
            <div class="concept-options-list">
                ${optionsHTML}
            </div>
        `;
        
        // Add click events to options if not submitted
        if (!savedQuiz && appState.currentUser !== 'professor') {
            card.querySelectorAll(".concept-option-item").forEach(item => {
                item.addEventListener("click", () => {
                    const q = parseInt(item.getAttribute("data-q"));
                    const o = parseInt(item.getAttribute("data-o"));
                    
                    appState.localConceptAnswers[q] = o;
                    renderConceptCheckPhase();
                });
            });
        }
        
        container.appendChild(card);
    });
    
    // If not submitted, add Submit Button
    if (!savedQuiz && appState.currentUser !== 'professor') {
        const subBtn = document.createElement("button");
        subBtn.className = "btn btn-primary btn-block";
        subBtn.style.marginTop = "1rem";
        subBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Enviar Questionário`;
        subBtn.addEventListener("click", submitConceptCheckQuiz);
        container.appendChild(subBtn);
    }
    
    // If submitted, show score
    if (savedQuiz) {
        scoreContainer.style.display = "block";
        document.getElementById("conceptScoreText").innerText = appState.currentUser === 'professor' ? `Resultado do questionário.` : `Você acertou ${savedQuiz.score} de ${activeClass.conceptCheck.length} questões.`;
    }
}

// Student submit concept check quiz
async function submitConceptCheckQuiz() {
    const activeClass = appState.classes.find(c => c.id === appState.activeClassId);
    if (!activeClass) return;
    
    const countQ = activeClass.conceptCheck.length;
    
    // Check if all answered
    for (let i = 0; i < countQ; i++) {
        if (appState.localConceptAnswers[i] === undefined) {
            showToast(`Por favor, responda à Questão ${i + 1}.`, "error");
            return;
        }
    }
    
    // Calculate score
    let score = 0;
    activeClass.conceptCheck.forEach((q, idx) => {
        if (appState.localConceptAnswers[idx] === q.correctAnswerIndex) {
            score++;
        }
    });
    
    const userEmail = appState.currentUser;
    try {
        showToast("Enviando questionário...", "info");
        const res = await fetch(`/api/conceptchecks/${appState.activeClassId}/${userEmail}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                score: `${score}`,
                answers: appState.localConceptAnswers
            })
        });
        if (res.ok) {
            showToast("Concept Check enviado!", "success");
            renderConceptCheckPhase();
        } else {
            showToast("Erro ao submeter.", "error");
        }
    } catch (err) {
        console.error(err);
    }
}

// RENDER PHASE: 4. Trabalho em Grupo (Instructions render)
function renderGroupWorkPhase() {
    const gwScenarioTitle = document.getElementById("gwScenarioTitle");
    const gwScenarioDesc = document.getElementById("gwScenarioDesc");
    const gwInstructionsList = document.getElementById("gwInstructionsList");
    
    // Custom instructions list based on Class
    gwInstructionsList.innerHTML = "";
    if (appState.activeClassId === "aula1") {
        gwInstructionsList.innerHTML = `
            <li>Preencha a matriz de risco mapeando 1 risco relevante para cada um dos 4 pilares estratégicos.</li>
            <li>Insira uma proposta sólida de mitigação para cada pilar.</li>
            <li>Marque qual risco representa o <strong>Showstopper</strong> crítico da viabilidade do projeto.</li>
            <li>Submeta o formulário para a nota final da primeira aula.</li>
        `;
    } else if (appState.activeClassId === "aula2") {
        gwInstructionsList.innerHTML = `
            <li>Use o simulador financeiro no painel direito. Insira os parâmetros do seu projeto assistencial.</li>
            <li>Simule o VPL, ROI e Payback sob condições <strong>Esperada</strong> (90% adoção), <strong>Realista</strong> (70%) e <strong>Pessimista</strong> (45% + riscos).</li>
            <li>Aponte em qual cenário o investimento se quebra e justifique os fatores determinantes na caixa de texto.</li>
        `;
    } else if (appState.activeClassId === "aula3") {
        gwInstructionsList.innerHTML = `
            <li>Elabore um Business Case estruturado de 2 páginas compilando o problema, solução e resultados financeiros estressados.</li>
            <li>Redija os 5 tópicos obrigatórios para decisão executiva do conselho.</li>
            <li>Tome uma recomendação executiva final: <strong>GO</strong>, <strong>NO-GO</strong> ou <strong>CONDICIONAL</strong> justificando as condicionantes de mitigação.</li>
        `;
    }

    if (appState.currentUser === 'professor') {
        // Professor view: Show all team scenarios
        gwScenarioTitle.style.display = "none";
        gwScenarioDesc.style.display = "none";
        
        let profContainer = document.getElementById("gwProfScenariosContainer");
        if (!profContainer) {
            profContainer = document.createElement("div");
            profContainer.id = "gwProfScenariosContainer";
            profContainer.style.marginTop = "1rem";
            profContainer.style.display = "flex";
            profContainer.style.flexDirection = "column";
            profContainer.style.gap = "1rem";
            gwScenarioDesc.parentNode.insertBefore(profContainer, gwScenarioDesc.nextSibling);
        }
        
        profContainer.style.display = "flex";
        profContainer.innerHTML = "";
        
        Object.entries(appState.scenarios).forEach(([grpNum, scenario]) => {
            const card = document.createElement("div");
            card.style.background = "var(--bg-card)";
            card.style.borderLeft = "4px solid var(--gold)";
            card.style.padding = "1rem";
            card.style.borderRadius = "6px";
            card.style.border = "1px solid var(--border-color)";
            card.style.borderLeftWidth = "4px";
            
            card.innerHTML = `
                <h4 style="margin: 0 0 0.5rem 0; color: var(--text-main); font-size: 1rem; border: none; padding: 0;">
                    Equipe ${grpNum}: ${scenario.title.split(': ')[1] || scenario.title}
                </h4>
                <p style="margin: 0; font-size: 0.85rem; line-height: 1.5; color: var(--text-secondary);">
                    ${scenario.description}
                </p>
            `;
            profContainer.appendChild(card);
        });
    } else {
        // Student view: Show only their team's scenario
        const activeStudent = appState.students.find(s => s.email === appState.currentUser);
        const groupNum = activeStudent ? activeStudent.group : 1;
        const scenario = appState.scenarios[groupNum];
        
        gwScenarioTitle.style.display = "block";
        gwScenarioDesc.style.display = "block";
        
        const profContainer = document.getElementById("gwProfScenariosContainer");
        if (profContainer) {
            profContainer.style.display = "none";
        }
        
        if (scenario) {
            gwScenarioTitle.innerText = `Equipe ${groupNum}: ${scenario.title.split(': ')[1] || scenario.title}`;
            gwScenarioDesc.innerText = scenario.description;
        }
    }
}

// RENDER PHASE: 5. Reflexão Pós-Aula
function renderReflectionPhase() {
    const activeClass = appState.classes.find(c => c.id === appState.activeClassId);
    if (!activeClass || !activeClass.reflection) return;
    
    document.getElementById("reflectionQuestionTitle").innerText = activeClass.reflection.question;
    renderReflectionResults();
}

function renderReflectionResults() {
    const resultsContainer = document.getElementById("reflectionDisplayContainer");
    resultsContainer.innerHTML = "";
    
    const reflections = appState.liveData.reflections || {};
    
    const activeClass = appState.classes.find(c => c.id === appState.activeClassId);
    if (!activeClass || !activeClass.reflection) return;
    
    if (activeClass.reflection.type === "wordcloud") {
        const wcDiv = document.createElement("div");
        wcDiv.id = "reflectionWordCloudCanvas";
        wcDiv.className = "word-cloud-canvas-container";
        resultsContainer.appendChild(wcDiv);
        
        drawWordCloud("reflectionWordCloudCanvas", reflections);
    } else {
        if (Object.keys(reflections).length === 0) {
            resultsContainer.innerHTML = `<p class="placeholder-text"><i class="fa-solid fa-hourglass-half"></i> Aguardando reflexões das equipes...</p>`;
            return;
        }
        
        Object.entries(reflections).forEach(([grpId, data]) => {
            const card = document.createElement("div");
            card.className = "feedback-card";
            card.style.borderLeft = "4px solid var(--gold)";
            card.style.background = "var(--bg-card)";
            card.style.marginBottom = "0.75rem";
            
            const student = appState.students.find(s => s.email === grpId);
            const displayName = student ? `${student.name} (Equipe ${student.group})` : grpId;
            
            card.innerHTML = `
                <div class="comment-meta">
                    <span style="font-weight: 700; color: var(--gold);">${displayName}</span>
                    <span>${new Date(data.submittedAt).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p style="font-style: italic;">"${data.text}"</p>
            `;
            resultsContainer.appendChild(card);
        });
    }
}

function renderStudentReflectionForm() {
    const activeClass = appState.classes.find(c => c.id === appState.activeClassId);
    if (!activeClass || !activeClass.reflection) return;
    
    const userEmail = appState.currentUser;
    const hasSubmitted = !!(appState.liveData.reflections && appState.liveData.reflections[userEmail]);
    
    const inputGroup = document.getElementById("studentReflectionContainer");
    const textarea = document.getElementById("reflectionText");
    const submitBtn = inputGroup.querySelector("button[type='submit']");
    const label = inputGroup.querySelector("label[for='reflectionText']");
    const formDescription = inputGroup.querySelector(".description");
    
    const isWordCloud = activeClass.reflection.type === "wordcloud";
    
    if (isWordCloud) {
        if (formDescription) {
            formDescription.innerText = "Responda à reflexão enviando apenas uma palavra para compor a nuvem de palavras da turma.";
        }
        if (label) {
            label.innerText = "Sua Palavra-Chave (Sem espaços, máximo 25 caracteres):";
        }
        textarea.rows = 2;
        textarea.placeholder = "Ex: Viabilidade";
        textarea.maxLength = 25;
        
        // Remove spaces while typing
        if (!textarea.hasWordCloudListener) {
            textarea.addEventListener("input", function() {
                this.value = this.value.replace(/\s+/g, "");
            });
            textarea.hasWordCloudListener = true;
        }
    } else {
        if (formDescription) {
            formDescription.innerText = "Escreva suas reflexões de auto-avaliação do dia de hoje para o feedback da professora.";
        }
        if (label) {
            label.innerText = "Sua Reflexão (máximo 500 palavras):";
        }
        textarea.rows = 6;
        textarea.placeholder = "Com a aula de hoje, percebi que o ROI real exige avaliar além do marketing. Para o nosso projeto, a mitigação crítica deve ser...";
        textarea.removeAttribute("maxLength");
    }
    
    if (hasSubmitted) {
        const sub = appState.liveData.reflections[userEmail];
        textarea.value = sub.text;
        textarea.disabled = true;
        if (submitBtn) submitBtn.style.display = "none";
        
        // Show feedback message
        let noticeBox = inputGroup.querySelector(".reflection-submitted-notice");
        if (!noticeBox) {
            noticeBox = document.createElement("div");
            noticeBox.className = "reflection-submitted-notice highlight-box";
            noticeBox.style.borderLeftColor = "var(--clinical-color)";
            noticeBox.style.background = "rgba(16, 185, 129, 0.03)";
            noticeBox.style.marginTop = "1rem";
            noticeBox.innerHTML = `<p style="margin:0; color:var(--clinical-color); font-weight:600;"><i class="fa-solid fa-circle-check"></i> Reflexão enviada com sucesso!</p>`;
            inputGroup.appendChild(noticeBox);
        }
    } else {
        textarea.value = "";
        textarea.disabled = false;
        if (submitBtn) submitBtn.style.display = "block";
        const oldNotice = inputGroup.querySelector(".reflection-submitted-notice");
        if (oldNotice) oldNotice.remove();
    }
}

// RENDER PHASE: 6. Referências Bibliográficas
function renderReferencesPhase() {
    const activeClass = appState.classes.find(c => c.id === appState.activeClassId);
    if (!activeClass) return;
    
    const container = document.getElementById("referencesListContainer");
    container.innerHTML = "";
    
    // 1. Recommended readings header
    const recommendedHeader = document.createElement("h3");
    recommendedHeader.innerHTML = `<i class="fa-solid fa-graduation-cap" style="color: var(--clinical-color);"></i> Estudos Recentes e Leituras Recomendadas para esta Aula`;
    recommendedHeader.style.fontSize = "1.1rem";
    recommendedHeader.style.marginBottom = "1rem";
    recommendedHeader.style.marginTop = "0.5rem";
    recommendedHeader.style.borderBottom = "2px solid var(--border-color)";
    recommendedHeader.style.paddingBottom = "0.4rem";
    container.appendChild(recommendedHeader);

    if (!activeClass.references || activeClass.references.length === 0) {
        const p = document.createElement("p");
        p.className = "placeholder-text";
        p.innerText = "Sem leituras recomendadas cadastradas para esta aula.";
        container.appendChild(p);
    } else {
        activeClass.references.forEach(ref => {
            const card = document.createElement("div");
            card.className = "reference-card";
            
            let extraHTML = "";
            if (ref.suggestion) {
                extraHTML += `
                    <div class="reference-suggestion" style="margin-top: 0.6rem; padding: 0.6rem 0.8rem; background: rgba(2, 132, 199, 0.04); border-left: 3px solid var(--gold); border-radius: 4px; font-size: 0.8rem; color: var(--text-primary); line-height: 1.4;">
                        <strong><i class="fa-regular fa-lightbulb" style="color: var(--gold);"></i> Sugestão de Uso em Aula:</strong> ${ref.suggestion}
                    </div>
                `;
            }
            if (ref.readingTime) {
                extraHTML += `
                    <div class="reference-time" style="margin-top: 0.3rem; font-size: 0.75rem; color: var(--text-secondary); display: flex; align-items: center; gap: 0.3rem; padding-left: 0.2rem;">
                        <i class="fa-regular fa-clock" style="color: var(--clinical-color);"></i>
                        <span><strong>Tempo de Leitura Recomendado:</strong> ${ref.readingTime}</span>
                    </div>
                `;
            }
            
            card.innerHTML = `
                <div class="reference-citation" style="font-weight: 500;">${ref.citation}</div>
                ${extraHTML}
                <a href="${ref.link}" target="_blank" class="reference-link" style="margin-top: 0.75rem; display: inline-block;">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Acessar publicação oficial
                </a>
            `;
            container.appendChild(card);
        });
    }

    // 2. Fetch and render syllabus bibliography
    fetch('/api/bibliography')
        .then(res => res.json())
        .then(bib => {
            const bibHeader = document.createElement("h3");
            bibHeader.innerHTML = `<i class="fa-solid fa-book" style="color: var(--gold);"></i> Plano de Ensino: Bibliografia Completa`;
            bibHeader.style.fontSize = "1.1rem";
            bibHeader.style.marginBottom = "1rem";
            bibHeader.style.marginTop = "2rem";
            bibHeader.style.borderBottom = "2px solid var(--border-color)";
            bibHeader.style.paddingBottom = "0.4rem";
            container.appendChild(bibHeader);

            const grid = document.createElement("div");
            grid.style.display = "grid";
            grid.style.gridTemplateColumns = "1fr 1fr";
            grid.style.gap = "1.5rem";
            grid.style.marginTop = "1rem";
            
            // Sub-grid for Basica
            const basicaCol = document.createElement("div");
            basicaCol.innerHTML = `<h4 style="font-size:0.95rem; margin-bottom:0.8rem; color:var(--clinical-color); border:none; padding:0;"><i class="fa-solid fa-bookmark"></i> Bibliografia Básica</h4>`;
            bib.basica.forEach(item => {
                const itemDiv = document.createElement("div");
                itemDiv.className = "reference-card";
                itemDiv.style.padding = "0.8rem";
                itemDiv.style.marginBottom = "0.6rem";
                itemDiv.style.fontSize = "0.8rem";
                itemDiv.style.lineHeight = "1.4";
                itemDiv.innerText = item.citation;
                basicaCol.appendChild(itemDiv);
            });
            grid.appendChild(basicaCol);

            // Sub-grid for Complementar
            const complementarCol = document.createElement("div");
            complementarCol.innerHTML = `<h4 style="font-size:0.95rem; margin-bottom:0.8rem; color:var(--gold); border:none; padding:0;"><i class="fa-regular fa-bookmark"></i> Bibliografia Complementar</h4>`;
            
            const compListContainer = document.createElement("div");
            compListContainer.style.maxHeight = "500px";
            compListContainer.style.overflowY = "auto";
            compListContainer.style.paddingRight = "0.5rem";
            
            bib.complementar.forEach(item => {
                const itemDiv = document.createElement("div");
                itemDiv.className = "reference-card";
                itemDiv.style.padding = "0.8rem";
                itemDiv.style.marginBottom = "0.6rem";
                itemDiv.style.fontSize = "0.8rem";
                itemDiv.style.lineHeight = "1.4";
                itemDiv.innerText = item.citation;
                compListContainer.appendChild(itemDiv);
            });
            complementarCol.appendChild(compListContainer);
            grid.appendChild(complementarCol);

            container.appendChild(grid);
        })
        .catch(err => console.error("Error loading syllabus bibliography:", err));
}


// Populate simulator inputs with default values from group scenario
function setupSimulatorInputs(scenario) {
    const invInput = document.getElementById("sim_investment");
    
    if (parseFloat(invInput.value) === 0 || invInput.getAttribute("data-loaded-for") !== appState.currentUser) {
        document.getElementById("sim_investment").value = scenario.investment;
        document.getElementById("sim_benefit").value = scenario.annualBenefit;
        document.getElementById("sim_maintenance").value = scenario.annualCost;
        document.getElementById("sim_risk").value = scenario.riskCost;
        document.getElementById("sim_years").value = 5;
        invInput.setAttribute("data-loaded-for", appState.currentUser);
        runSimulationCalculations();
    }
}

// Interactive Simulation Calculator
function runSimulationCalculations() {
    const investment = parseFloat(document.getElementById("sim_investment").value) || 0;
    const benefit = parseFloat(document.getElementById("sim_benefit").value) || 0;
    const maintenance = parseFloat(document.getElementById("sim_maintenance").value) || 0;
    const riskCost = parseFloat(document.getElementById("sim_risk").value) || 0;
    const years = parseInt(document.getElementById("sim_years").value) || 5;
    
    const r = 0.10; // Discount rate (10%)
    
    const configs = {
        expected: { adoption: 0.90, riskMultiplier: 0.0 },
        realistic: { adoption: 0.70, riskMultiplier: 0.5 },
        pessimistic: { adoption: 0.45, riskMultiplier: 1.0 }
    };
    
    const results = {};
    
    for (const key in configs) {
        const config = configs[key];
        const annualNetBenefit = (benefit * config.adoption) - maintenance - ((riskCost * config.riskMultiplier * (1 - config.adoption)) / years);
        
        let npv = -investment;
        for (let t = 1; t <= years; t++) {
            npv += annualNetBenefit / Math.pow(1 + r, t);
        }
        
        const totalProfit = (annualNetBenefit * years) - investment;
        const roi = investment > 0 ? (totalProfit / investment) * 100 : 0;
        const payback = annualNetBenefit > 0 ? (investment / annualNetBenefit) : Infinity;
        
        results[key] = { roi, payback, npv };
    }
    
    updateMetricUI("calc_roi_exp", results.expected.roi, "%");
    updateMetricUI("calc_roi_real", results.realistic.roi, "%");
    updateMetricUI("calc_roi_pess", results.pessimistic.roi, "%");
    
    updateMetricUI("calc_pb_exp", results.expected.payback, " anos");
    updateMetricUI("calc_pb_real", results.realistic.payback, " anos");
    updateMetricUI("calc_pb_pess", results.pessimistic.payback, " anos");
    
    updateMetricUI("calc_vpl_exp", results.expected.npv, "$");
    updateMetricUI("calc_vpl_real", results.realistic.npv, "$");
    updateMetricUI("calc_vpl_pess", results.pessimistic.npv, "$");
    
    renderChart(results.expected.roi, results.realistic.roi, results.pessimistic.roi);
}

function updateMetricUI(elementId, val, unit) {
    const el = document.getElementById(elementId);
    if (!el) return;
    
    if (val === Infinity || isNaN(val) || val < -9999) {
        el.innerText = "Inviável";
        el.style.color = "var(--danger)";
    } else {
        if (unit === "%") {
            el.innerText = `${val.toFixed(1)}%`;
            el.style.color = val >= 0 ? "var(--clinical-color)" : "var(--danger)";
        } else if (unit === "$") {
            el.innerText = `USD ${val.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
            el.style.color = val >= 0 ? "var(--clinical-color)" : "var(--danger)";
        } else {
            el.innerText = `${val.toFixed(1)}${unit}`;
            el.style.color = "var(--text-primary)";
        }
    }
}

// Chart.js renderer for ROI simulation comparison
function renderChart(expRoi, realRoi, pessRoi) {
    const canvas = document.getElementById('chartROI');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    if (appState.chartInstance) {
        appState.chartInstance.destroy();
    }
    
    const values = [
        isFinite(expRoi) ? parseFloat(expRoi.toFixed(1)) : 0,
        isFinite(realRoi) ? parseFloat(realRoi.toFixed(1)) : 0,
        isFinite(pessRoi) ? parseFloat(pessRoi.toFixed(1)) : 0
    ];
    
    appState.chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Esperado (90%)', 'Realista (70%)', 'Pessimista (45%)'],
            datasets: [{
                label: 'Retorno sobre Investimento (ROI %)',
                data: values,
                backgroundColor: [
                    'rgba(16, 185, 129, 0.4)',  // Green
                    'rgba(2, 132, 199, 0.4)',   // Blue
                    'rgba(239, 108, 0, 0.4)'    // Amber
                ],
                borderColor: [
                    '#10b981',
                    '#0284c7',
                    '#ef6c00'
                ],
                borderWidth: 2,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    grid: { color: 'rgba(0, 0, 0, 0.05)' },
                    ticks: { color: '#4a5c7a', callback: (value) => `${value}%` }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#4a5c7a' }
                }
            }
        }
    });
}

// Submit assignment to database
async function submitAssignment(classId, groupId, data) {
    try {
        const activeStudent = appState.students.find(s => s.email === appState.currentUser);
        const studentName = activeStudent ? activeStudent.name : "Aluno";
        
        showToast("Enviando trabalho...", "info");
        const res = await fetch(`/api/submissions/${classId}/${groupId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                submissionData: data,
                submittedBy: studentName
            })
        });
        
        if (res.ok) {
            showToast("Trabalho enviado com sucesso!", "success");
            loadSavedSubmission(classId, groupId);
        } else {
            showToast("Erro ao submeter trabalho.", "error");
        }
    } catch (e) {
        console.error(e);
        showToast("Erro de conexão com o servidor.", "error");
    }
}

// Load previous submissions to restore state for students
async function loadSavedSubmission(classId, groupId) {
    try {
        const res = await fetch(`/api/submissions/${classId}/${groupId}`);
        const result = await res.json();
        
        resetForms();

        // Carry-over logic from previous dynamics
        if (classId === "aula2") {
            try {
                const prevRes = await fetch(`/api/submissions/aula1/${groupId}`);
                const prevResult = await prevRes.json();
                const prevContainer = document.getElementById("prevSubmissionAula1");
                const prevContent = document.getElementById("prevSubmissionAula1Content");
                if (prevResult.submitted) {
                    const prevData = prevResult.data.submissionData || prevResult.data;
                    prevContent.innerHTML = `
                        <div class="prev-submission-field">
                            <span class="prev-submission-label">Risco Técnico & Mitigação</span>
                            <div class="prev-submission-value"><strong>Risco:</strong> ${prevData.risk_tech || 'Não informado'}<br><strong>Mitigação:</strong> ${prevData.mit_tech || 'Não informada'}</div>
                        </div>
                        <div class="prev-submission-field">
                            <span class="prev-submission-label">Risco Operacional & Mitigação</span>
                            <div class="prev-submission-value"><strong>Risco:</strong> ${prevData.risk_oper || 'Não informado'}<br><strong>Mitigação:</strong> ${prevData.mit_oper || 'Não informada'}</div>
                        </div>
                        <div class="prev-submission-field">
                            <span class="prev-submission-label">Risco Clínico-Cultural & Mitigação</span>
                            <div class="prev-submission-value"><strong>Risco:</strong> ${prevData.risk_clinical || 'Não informado'}<br><strong>Mitigação:</strong> ${prevData.mit_clinical || 'Não informada'}</div>
                        </div>
                        <div class="prev-submission-field">
                            <span class="prev-submission-label">Risco Financeiro & Mitigação</span>
                            <div class="prev-submission-value"><strong>Risco:</strong> ${prevData.risk_financial || 'Não informado'}<br><strong>Mitigação:</strong> ${prevData.mit_financial || 'Não informada'}</div>
                        </div>
                        <div class="prev-submission-field">
                            <span class="prev-submission-label">Fator Crítico de Decisão (Showstopper)</span>
                            <div class="prev-submission-value">Mapeado como showstopper: ${prevData.showstopper === 'technical' ? 'Risco Técnico' : prevData.showstopper === 'operational' ? 'Risco Operacional' : prevData.showstopper === 'clinical' ? 'Risco Clínico' : prevData.showstopper === 'financial' ? 'Risco Financeiro' : 'Nenhum'}</div>
                        </div>
                    `;
                    if (prevContainer) prevContainer.style.display = "block";
                } else {
                    if (prevContainer) prevContainer.style.display = "none";
                }
            } catch (e) {
                console.error("Error loading Aula 1 submission in Aula 2", e);
            }
        } else if (classId === "aula3") {
            try {
                const prevRes = await fetch(`/api/submissions/aula2/${groupId}`);
                const prevResult = await prevRes.json();
                const prevContainer = document.getElementById("prevSubmissionAula2");
                const prevContent = document.getElementById("prevSubmissionAula2Content");
                if (prevResult.submitted) {
                    const prevData = prevResult.data.submissionData || prevResult.data;
                    prevContent.innerHTML = `
                        <div class="prev-submission-field">
                            <span class="prev-submission-label">Parâmetros de Simulação de ROI</span>
                            <div class="prev-submission-value">
                                <strong>Investimento Inicial:</strong> R$ ${(prevData.investment || 0).toLocaleString('pt-BR')}<br>
                                <strong>Benefício Anual:</strong> R$ ${(prevData.benefit || 0).toLocaleString('pt-BR')}<br>
                                <strong>Custo de Manutenção Anual:</strong> R$ ${(prevData.maintenance || 0).toLocaleString('pt-BR')}<br>
                                <strong>Custos de Risco Oculto:</strong> R$ ${(prevData.risk || 0).toLocaleString('pt-BR')}<br>
                                <strong>Horizonte Temporal:</strong> ${prevData.years || 5} anos
                            </div>
                        </div>
                        <div class="prev-submission-field">
                            <span class="prev-submission-label">Ponto de Quebra (Break Point)</span>
                            <div class="prev-submission-value">
                                ${prevData.breakPoint === 'pessimistic' ? 'Cenário Pessimista' : (prevData.breakPoint === 'realistic' ? 'Cenário Realista' : 'Nenhum (Viável em todos)')}
                            </div>
                        </div>
                        <div class="prev-submission-field">
                            <span class="prev-submission-label">Justificativa da Simulação</span>
                            <div class="prev-submission-value">${prevData.justification || 'Não informada'}</div>
                        </div>
                    `;
                    if (prevContainer) prevContainer.style.display = "block";
                } else {
                    if (prevContainer) prevContainer.style.display = "none";
                }
            } catch (e) {
                console.error("Error loading Aula 2 submission in Aula 3", e);
            }
        }
        
        const submitBtn1 = document.querySelector("#activity1Container button[type='submit']");
        const submitBtn2 = document.querySelector("#activity2Container button[type='submit']");
        const submitBtn3 = document.querySelector("#activity3Container button[type='submit']");
        
        if (result.submitted) {
            submissionStatus.innerText = `Enviado por ${result.data.submittedBy || 'Equipe'}`;
            submissionStatus.className = "badge submitted";
            
            const data = result.data.submissionData || result.data;
            
            if (classId === "aula1") {
                document.getElementById("risk_tech").value = data.risk_tech || "";
                document.getElementById("mit_tech").value = data.mit_tech || "";
                document.getElementById("risk_oper").value = data.risk_oper || "";
                document.getElementById("mit_oper").value = data.mit_oper || "";
                document.getElementById("risk_clinical").value = data.risk_clinical || "";
                document.getElementById("mit_clinical").value = data.mit_clinical || "";
                document.getElementById("risk_financial").value = data.risk_financial || "";
                document.getElementById("mit_financial").value = data.mit_financial || "";
                
                const showstopperRadio = document.querySelector(`input[name="showstopper"][value="${data.showstopper}"]`);
                if (showstopperRadio) showstopperRadio.checked = true;
                
                setGroupFormDisabled("formActivity1", true);
                if (submitBtn1) submitBtn1.style.display = "none";
            } else if (classId === "aula2") {
                document.getElementById("sim_investment").value = data.investment || 0;
                document.getElementById("sim_benefit").value = data.benefit || 0;
                document.getElementById("sim_maintenance").value = data.maintenance || 0;
                document.getElementById("sim_risk").value = data.risk || 0;
                document.getElementById("sim_years").value = data.years || 5;
                document.getElementById("breakPointScenario").value = data.breakPoint || "";
                document.getElementById("simulationJustification").value = data.justification || "";
                
                setGroupFormDisabled("activity2Container", true);
                if (submitBtn2) submitBtn2.style.display = "none";
                runSimulationCalculations();
            } else if (classId === "aula3") {
                document.getElementById("bc_summary").value = data.summary || "";
                document.getElementById("bc_problem").value = data.problem || "";
                document.getElementById("bc_solution").value = data.solution || "";
                document.getElementById("bc_finance").value = data.finance || "";
                document.getElementById("bc_risks").value = data.risks || "";
                document.getElementById("bc_rec_justification").value = data.rec_justification || "";
                document.getElementById("bc_prem_volume").value = data.prem_volume || "";
                document.getElementById("bc_prem_adoption").value = data.prem_adoption || "";
                document.getElementById("bc_prem_horizon").value = data.prem_horizon || "";
                document.getElementById("bc_prem_cost").value = data.prem_cost || "";
                document.getElementById("bc_prem_source").value = data.prem_source || "";
                document.getElementById("bc_lim_text").value = data.lim_text || "";
                
                const recRadio = document.querySelector(`input[name="bc_recommendation"][value="${data.recommendation}"]`);
                if (recRadio) recRadio.checked = true;
                
                setGroupFormDisabled("formActivity3", true);
                if (submitBtn3) submitBtn3.style.display = "none";
            }
        } else {
            submissionStatus.innerText = "Pendente";
            submissionStatus.className = "badge";
            
            resetForms();
            
            // Re-apply scenario defaults for Aula 2 if not submitted
            const scenario = appState.scenarios[groupNum];
            if (classId === "aula2" && scenario) {
                document.getElementById("sim_investment").value = scenario.investment;
                document.getElementById("sim_benefit").value = scenario.annualBenefit;
                document.getElementById("sim_maintenance").value = scenario.annualCost;
                document.getElementById("sim_risk").value = scenario.riskCost;
                document.getElementById("sim_years").value = 5;
                document.getElementById("sim_investment").removeAttribute("data-loaded-for"); // force reload check if user changes
                runSimulationCalculations();
            }
            
            setGroupFormDisabled("formActivity1", false);
            setGroupFormDisabled("activity2Container", false);
            setGroupFormDisabled("formActivity3", false);
            
            if (submitBtn1) submitBtn1.style.display = "block";
            if (submitBtn2) submitBtn2.style.display = "block";
            if (submitBtn3) submitBtn3.style.display = "block";
        }
    } catch (e) {
        console.error("Error loading saved submission", e);
    }
}

function setGroupFormDisabled(elementId, disabled) {
    const parent = document.getElementById(elementId);
    if (!parent) return;
    parent.querySelectorAll("textarea, input, select").forEach(el => {
        el.disabled = disabled;
    });
}

// Reset all form inputs to empty
function resetForms() {
    document.getElementById("formActivity1").reset();
    document.getElementById("formActivity3").reset();
    
    document.querySelectorAll('input[name="showstopper"]').forEach(r => r.checked = false);
    document.querySelectorAll('input[name="bc_recommendation"]').forEach(r => r.checked = false);
    
    document.getElementById("breakPointScenario").value = "";
    document.getElementById("simulationJustification").value = "";

    const prev1 = document.getElementById("prevSubmissionAula1");
    if (prev1) prev1.style.display = "none";
    const prev2 = document.getElementById("prevSubmissionAula2");
    if (prev2) prev2.style.display = "none";
}

// Fetch comments and grades for student display
async function loadProfessorFeedback(classId, groupId) {
    try {
        const res = await fetch(`/api/comments/${classId}/${groupId}`);
        const comments = await res.json();
        
        if (comments.length > 0) {
            studentFeedbackBox.style.display = "block";
            studentFeedbackMessages.innerHTML = "";
            
            comments.forEach(comment => {
                const card = document.createElement("div");
                card.className = "feedback-card";
                
                const dateStr = new Date(comment.timestamp).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });
                
                card.innerHTML = `
                    <div class="comment-meta">
                        <span>Professora Faila Santos • ${dateStr}</span>
                        ${comment.grade ? `<span class="comment-grade" style="background:var(--gold); color:#fff;">Nota: ${comment.grade}</span>` : ''}
                    </div>
                    <p>${comment.text}</p>
                `;
                studentFeedbackMessages.appendChild(card);
            });
        } else {
            studentFeedbackBox.style.display = "none";
        }
    } catch (e) {
        console.error("Error loading professor feedback", e);
    }
}

// Roster Populator (Modal)
function populateRoster() {
    const isProf = appState.currentUser === 'professor';
    
    // Dynamically update search input placeholder depending on role
    const searchInput = document.getElementById("rosterSearchInput");
    if (searchInput) {
        searchInput.placeholder = isProf ? "Buscar aluno por nome ou email..." : "Buscar aluno por nome...";
    }

    for (let i = 1; i <= 5; i++) {
        const list = document.getElementById(`rosterList${i}`);
        if (!list) continue;
        list.innerHTML = "";
        
        const groupStudents = appState.students.filter(s => s.group === i);
        groupStudents.forEach(s => {
            const li = document.createElement("li");
            if (isProf) {
                li.innerHTML = `<span>${s.name}</span><span class="email">${s.email}</span>`;
            } else {
                li.innerHTML = `<span>${s.name}</span>`;
            }
            list.appendChild(li);
        });
    }
}

// Filter students roster by search term
function filterRoster() {
    const isProf = appState.currentUser === 'professor';
    const query = rosterSearchInput.value.toLowerCase();
    
    for (let i = 1; i <= 5; i++) {
        const list = document.getElementById(`rosterList${i}`);
        const section = document.querySelector(`.roster-group-section[data-group="${i}"]`);
        let matches = 0;
        
        const groupStudents = appState.students.filter(s => s.group === i);
        list.innerHTML = "";
        
        groupStudents.forEach(s => {
            const matchName = s.name.toLowerCase().includes(query);
            const matchEmail = isProf && s.email.toLowerCase().includes(query);
            if (matchName || matchEmail) {
                const li = document.createElement("li");
                if (isProf) {
                    li.innerHTML = `<span>${s.name}</span><span class="email">${s.email}</span>`;
                } else {
                    li.innerHTML = `<span>${s.name}</span>`;
                }
                list.appendChild(li);
                matches++;
            }
        });
        
        section.style.display = matches > 0 ? "block" : "none";
    }
}

// PROFESSOR INSPECTOR LOGIC
let selectedInspectClass = "aula1";
let selectedInspectGroup = 1;

async function renderSubmissionsInspector() {
    const activeSubTab = document.querySelector(".sub-tab-btn.active");
    selectedInspectClass = activeSubTab ? activeSubTab.getAttribute("data-subclass") : "aula1";
    
    const res = await fetch(`/api/submissions/${selectedInspectClass}`);
    const submissions = await res.json();
    
    inspectorGroupsNav.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
        const btn = document.createElement("button");
        const isSubmitted = !!submissions[i];
        btn.className = `inspect-group-btn ${isSubmitted ? 'submitted' : ''} ${selectedInspectGroup === i ? 'active' : ''}`;
        btn.innerHTML = `
            <span>Equipe ${i}</span>
            <span class="badge-dot"></span>
        `;
        
        btn.addEventListener("click", () => {
            selectedInspectGroup = i;
            renderSubmissionsInspector();
        });
        inspectorGroupsNav.appendChild(btn);
    }
    
    const submission = submissions[selectedInspectGroup];
    renderSubmissionDetails(submission, selectedInspectClass, selectedInspectGroup);
}

function renderSubmissionDetails(submission, classId, groupId) {
    if (!submission) {
        submissionDetailViewer.innerHTML = `
            <div class="inspect-submission-card">
                <h4>Equipe ${groupId} - Submissão Pendente</h4>
                <p class="placeholder-text"><i class="fa-solid fa-hourglass-half"></i> Esta equipe ainda não enviou a atividade para a ${classId === 'aula1' ? 'Aula 1' : classId === 'aula2' ? 'Aula 2' : 'Aula 3'}.</p>
            </div>
        `;
        return;
    }
    
    const submittedTime = new Date(submission.submittedAt).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });
    
    let detailsHTML = "";
    
    if (classId === "aula1") {
        detailsHTML = `
            <div class="inspect-submission-card">
                <h4>Equipe ${groupId} - Matriz de Riscos (Enviado às ${submittedTime})</h4>
                
                <div class="inspect-item-value ${submission.showstopper === 'technical' ? 'inspect-showstopper' : ''}">
                    <h6>Risco Técnico ${submission.showstopper === 'technical' ? '(SHOWSTOPPER)' : ''}</h6>
                    <p><strong>Risco:</strong> ${submission.risk_tech}</p>
                    <p><strong>Mitigação:</strong> ${submission.mit_tech}</p>
                </div>
                
                <div class="inspect-item-value ${submission.showstopper === 'operational' ? 'inspect-showstopper' : ''}">
                    <h6>Risco Operacional ${submission.showstopper === 'operational' ? '(SHOWSTOPPER)' : ''}</h6>
                    <p><strong>Risco:</strong> ${submission.risk_oper}</p>
                    <p><strong>Mitigação:</strong> ${submission.mit_oper}</p>
                </div>
                
                <div class="inspect-item-value ${submission.showstopper === 'clinical' ? 'inspect-showstopper' : ''}">
                    <h6>Risco Clínico-Cultural ${submission.showstopper === 'clinical' ? '(SHOWSTOPPER)' : ''}</h6>
                    <p><strong>Risco:</strong> ${submission.risk_clinical}</p>
                    <p><strong>Mitigação:</strong> ${submission.mit_clinical}</p>
                </div>
                
                <div class="inspect-item-value ${submission.showstopper === 'financial' ? 'inspect-showstopper' : ''}">
                    <h6>Risco Financeiro ${submission.showstopper === 'financial' ? '(SHOWSTOPPER)' : ''}</h6>
                    <p><strong>Risco:</strong> ${submission.risk_financial}</p>
                    <p><strong>Mitigação:</strong> ${submission.mit_financial}</p>
                </div>
            </div>
        `;
    } else if (classId === "aula2") {
        detailsHTML = `
            <div class="inspect-submission-card">
                <h4>Equipe ${groupId} - Teste de Estresse ROI (Enviado às ${submittedTime})</h4>
                
                <div class="inspect-item-value">
                    <h6>Parâmetros de Simulação Submetidos</h6>
                    <p><strong>Investimento:</strong> USD ${submission.investment.toLocaleString()}</p>
                    <p><strong>Benefício Anual:</strong> USD ${submission.benefit.toLocaleString()}</p>
                    <p><strong>Manutenção Anual:</strong> USD ${submission.maintenance.toLocaleString()}</p>
                    <p><strong>Custos de Risco:</strong> USD ${submission.risk.toLocaleString()}</p>
                    <p><strong>Anos de Análise:</strong> ${submission.years} anos</p>
                </div>

                <div class="inspect-roi-grid">
                    <div class="inspect-roi-card expected">
                        <h6>ROI Esperado</h6>
                        <span>${submission.metrics.expected.roi}</span><br>
                        <small>${submission.metrics.expected.vpl}</small>
                    </div>
                    <div class="inspect-roi-card realistic">
                        <h6>ROI Realista</h6>
                        <span>${submission.metrics.realistic.roi}</span><br>
                        <small>${submission.metrics.realistic.vpl}</small>
                    </div>
                    <div class="inspect-roi-card pessimistic">
                        <h6>ROI Pessimista</h6>
                        <span>${submission.metrics.pessimistic.roi}</span><br>
                        <small>${submission.metrics.pessimistic.vpl}</small>
                    </div>
                </div>

                <div class="inspect-item-value">
                    <h6>Ponto de Quebra Mapeado</h6>
                    <p>${submission.breakPoint === 'realistic' ? 'Cenário Realista' : submission.breakPoint === 'pessimistic' ? 'Cenário Pessimista' : 'Nenhum'}</p>
                </div>

                <div class="inspect-item-value">
                    <h6>Justificativa de Estresse</h6>
                    <p>${submission.justification}</p>
                </div>
            </div>
        `;
    } else if (classId === "aula3") {
        const recClass = submission.recommendation === 'GO' ? 'color-clinical' : submission.recommendation === 'NO-GO' ? 'color-financial' : 'color-tech';
        detailsHTML = `
            <div class="inspect-submission-card">
                <h4>Equipe ${groupId} - Business Case Final (Enviado às ${submittedTime})</h4>
                
                <div class="inspect-item-value">
                    <h6>1. Sumário Executivo</h6>
                    <p>${submission.summary}</p>
                </div>

                <div class="inspect-item-value">
                    <h6>2. Problema & Contexto</h6>
                    <p>${submission.problem}</p>
                </div>

                <div class="inspect-item-value">
                    <h6>3. Solução Proposta</h6>
                    <p>${submission.solution}</p>
                </div>

                <div class="inspect-item-value">
                    <h6>4. Análise Financeira sob Estresse</h6>
                    <p>${submission.finance}</p>
                </div>

                <div class="inspect-item-value">
                    <h6>5. Riscos e Mitigações</h6>
                    <p>${submission.risks}</p>
                </div>
                <div class="inspect-item-value">
                    <h6>Painel de Apoio: Premissas Utilizadas</h6>
                    <p><strong>Volume:</strong> ${submission.prem_volume || 'Não preenchido'}</p>
                    <p><strong>Taxa de Adoção:</strong> ${submission.prem_adoption || 'Não preenchido'}</p>
                    <p><strong>Horizonte de Análise:</strong> ${submission.prem_horizon || 'Não preenchido'}</p>
                    <p><strong>Custo/Hora Equipe:</strong> ${submission.prem_cost || 'Não preenchido'}</p>
                    <p><strong>Fonte de cada dado:</strong> ${submission.prem_source || 'Não preenchido'}</p>
                </div>
                <div class="inspect-item-value">
                    <h6>Painel de Apoio: Limitações do Projeto</h6>
                    <p>${submission.lim_text || 'Não preenchido'}</p>
                </div>

                <div class="inspect-item-value">
                    <h6>6. Recomendação Final de Investimento</h6>
                    <p class="${recClass}"><strong>${submission.recommendation}</strong></p>
                    <p class="mt-2"><strong>Condições/Justificativa:</strong><br>${submission.rec_justification}</p>
                </div>
            </div>
        `;
    }
    
    detailsHTML += `
        <form id="formProfFeedback" class="feedback-editor-form">
            <h5><i class="fa-solid fa-pen-nib"></i> Fornecer Feedback Docente</h5>
            
            <div class="grade-input-container" style="display: none;">
                <label for="profGrade">Nota da Atividade (0-10):</label>
                <input type="number" id="profGrade" class="grade-input" min="0" max="10" step="0.1" placeholder="9.5">
            </div>
            
            <div class="form-group">
                <label for="profComment">Comentários e Orientações:</label>
                <textarea id="profComment" required rows="3" placeholder="Parabéns pelo mapeamento. A mitigação foi muito bem estruturada..."></textarea>
            </div>
            
            <button type="submit" class="btn btn-primary btn-sm"><i class="fa-solid fa-paper-plane"></i> Salvar Feedback</button>
        </form>
    `;
    
    submissionDetailViewer.innerHTML = detailsHTML;
    
    document.getElementById("formProfFeedback").addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const commentText = document.getElementById("profComment").value;
        const grade = parseFloat(document.getElementById("profGrade").value) || null;
        
        try {
            showToast("Salvando feedback...", "info");
            const res = await fetch(`/api/comments/${classId}/${groupId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: commentText, grade: grade })
            });
            
            if (res.ok) {
                showToast("Feedback salvo com sucesso!", "success");
                document.getElementById("profComment").value = "";
                document.getElementById("profGrade").value = "";
            } else {
                showToast("Erro ao salvar feedback.", "error");
            }
        } catch (err) {
            console.error(err);
            showToast("Erro de conexão ao enviar feedback.", "error");
        }
    });
}

// Custom Tag Cloud implementation for Check-ins and Interactive Slides
function drawWordCloud(elementId, submissions) {
    const container = document.getElementById(elementId);
    if (!container) return;
    container.innerHTML = "";
    
    // Count word frequencies and gather likes
    const freq = {};
    const wordLikes = {}; // cleanWord -> Set of userEmails who liked it
    
    Object.values(submissions).forEach(sub => {
        if (!sub || !sub.text) return;
        const words = sub.text.trim().split(/\s+/);
        words.forEach(w => {
            const clean = w.toUpperCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim();
            if (clean.length > 2) {
                freq[clean] = (freq[clean] || 0) + 1;
                if (!wordLikes[clean]) {
                    wordLikes[clean] = new Set();
                }
                if (sub.likes) {
                    sub.likes.forEach(liker => wordLikes[clean].add(liker));
                }
            }
        });
    });
    
    if (Object.keys(freq).length === 0) {
        container.innerHTML = `<p class="placeholder-text"><i class="fa-solid fa-hourglass-half"></i> Nenhuma palavra enviada pelas equipes ainda...</p>`;
        return;
    }
    
    const wrapper = document.createElement("div");
    wrapper.className = "wordcloud-wrapper";
    wrapper.style.display = "block";
    wrapper.style.textAlign = "center";
    wrapper.style.padding = "2.5rem";
    wrapper.style.width = "100%";
    wrapper.style.lineHeight = "2.6";
    
    const maxFreq = Math.max(...Object.values(freq));
    const uniqueWordCount = Object.keys(freq).length;
    
    // Adaptive font sizing configurations
    let baseFontSize = 1.1;
    let scalingFactor = 1.4;
    if (uniqueWordCount > 35) {
        baseFontSize = 0.8;
        scalingFactor = 0.8;
    } else if (uniqueWordCount > 20) {
        baseFontSize = 0.95;
        scalingFactor = 1.1;
    }
    
    Object.entries(freq).forEach(([word, count]) => {
        const size = baseFontSize + (count / maxFreq) * scalingFactor;
        const colors = [
            "var(--clinical-color)", // Hospital blue
            "var(--gold)", // Gold/Yellow
            "#ef4444", // Alert red
            "#06b6d4", // Sky blue
            "#0f766e", // Teal
            "#6366f1"  // Indigo
        ];
        const hash = word.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const color = colors[hash % colors.length];
        
        const wordSpan = document.createElement("span");
        wordSpan.style.fontSize = `${size}rem`;
        wordSpan.style.color = color;
        wordSpan.style.fontWeight = "bold";
        wordSpan.style.padding = "0.2rem 0.7rem";
        wordSpan.style.margin = "0.3rem 0.6rem";
        wordSpan.style.borderRadius = "8px";
        wordSpan.style.transition = "all 0.2s ease";
        wordSpan.style.cursor = "pointer";
        wordSpan.style.display = "inline-block";
        wordSpan.style.wordBreak = "keep-all";
        wordSpan.style.whiteSpace = "nowrap";
        wordSpan.style.userSelect = "none";
        
        const textNode = document.createTextNode(word);
        wordSpan.appendChild(textNode);
        
        // Likes badge
        const likesList = wordLikes[word] ? Array.from(wordLikes[word]) : [];
        const likesCount = likesList.length;
        const userHasLiked = likesList.includes(appState.currentUser);
        
        if (likesCount > 0) {
            const badge = document.createElement("span");
            badge.style.display = "inline-flex";
            badge.style.alignItems = "center";
            badge.style.justifyContent = "center";
            badge.style.gap = "3px";
            badge.style.background = userHasLiked ? "rgba(15, 118, 110, 0.15)" : "rgba(251, 191, 36, 0.1)";
            badge.style.border = userHasLiked ? "1px solid rgba(15, 118, 110, 0.3)" : "1px solid rgba(251, 191, 36, 0.2)";
            badge.style.padding = "2px 6px";
            badge.style.borderRadius = "20px";
            badge.style.fontSize = "0.55em";
            badge.style.marginLeft = "6px";
            badge.style.color = userHasLiked ? "var(--clinical-color)" : "var(--gold)";
            badge.style.fontWeight = "bold";
            badge.style.verticalAlign = "middle";
            badge.innerHTML = `<i class="fa-solid fa-thumbs-up"></i> ${likesCount}`;
            wordSpan.appendChild(badge);
        }
        
        wordSpan.title = `Clique duplo para curtir/remover curtida · ${count} ${count === 1 ? 'resposta' : 'respostas'}`;
        
        wordSpan.addEventListener("mouseenter", () => {
            wordSpan.style.transform = "scale(1.15)";
            wordSpan.style.textShadow = "0 0 10px rgba(0,0,0,0.1)";
        });
        wordSpan.addEventListener("mouseleave", () => {
            wordSpan.style.transform = "scale(1)";
            wordSpan.style.textShadow = "none";
        });
        
        // Double click / Double tap to like
        let lastTap = 0;
        wordSpan.addEventListener("click", (e) => {
            const now = Date.now();
            if (now - lastTap < 300) {
                e.stopPropagation();
                e.preventDefault();
                if (elementId.includes("checkin")) {
                    handleWordLike("checkin", appState.activeClassId, null, word);
                } else if (elementId.includes("reflection")) {
                    showToast("Reflexões não suportam curtidas individuais.", "info");
                }
            }
            lastTap = now;
        });
        wordSpan.addEventListener("dblclick", (e) => {
            e.stopPropagation();
            if (elementId.includes("checkin")) {
                handleWordLike("checkin", appState.activeClassId, null, word);
            } else if (elementId.includes("reflection")) {
                showToast("Reflexões não suportam curtidas individuais.", "info");
            }
        });
        
        wrapper.appendChild(wordSpan);
    });
    
    container.appendChild(wrapper);
}

// Toast Notifications Helper
function showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    
    let icon = "fa-info-circle";
    if (type === "success") icon = "fa-check-circle";
    if (type === "error") icon = "fa-exclamation-circle";
    
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add("toast-fade-out");
        toast.addEventListener("animationend", () => {
            toast.remove();
        });
    }, 4000);
}

// Run application initialization
window.addEventListener("DOMContentLoaded", init);

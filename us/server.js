const express = require('express');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Store SSE connections
let sseClients = [];

// SSE (Server-Sent Events) route for real-time presentation synchronization
app.get('/api/sync', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  // Send current aggregated state immediately upon connection
  const state = db.getState();
  const data = {
    activeState: state,
    checkins: db.getCheckins(state.classId),
    slideInteractions: db.getSlideInteractions(state.classId, state.slideId),
    conceptChecks: db.getConceptChecks(state.classId),
    reflections: db.getReflections(state.classId),
    submissions: db.getSubmissions(state.classId)
  };
  res.write(`data: ${JSON.stringify(data)}\n\n`);

  sseClients.push(res);

  req.on('close', () => {
    sseClients = sseClients.filter(client => client !== res);
  });
});

// Broadcast aggregated state to all connected clients
function broadcastUpdate() {
  const state = db.getState();
  const data = {
    activeState: state,
    checkins: db.getCheckins(state.classId),
    slideInteractions: db.getSlideInteractions(state.classId, state.slideId),
    conceptChecks: db.getConceptChecks(state.classId),
    reflections: db.getReflections(state.classId),
    submissions: db.getSubmissions(state.classId)
  };
  sseClients.forEach(client => {
    client.write(`data: ${JSON.stringify(data)}\n\n`);
  });
}

// REST APIs
app.get('/api/classes', (req, res) => {
  res.json(db.classesContent);
});

app.get('/api/scenarios', (req, res) => {
  res.json(db.scenarios);
});

app.get('/api/students', (req, res) => {
  res.json(db.students);
});

app.get('/api/state', (req, res) => {
  res.json(db.getState());
});

app.post('/api/state', (req, res) => {
  const { classId, slideId, syncEnabled, activeTab, timerEnd, revealAnswers } = req.body;
  const updates = {};
  if (classId) updates.classId = classId;
  if (slideId) {
    updates.slideId = slideId;
    updates.revealAnswers = false; // Reset reveal state on slide change
  }
  if (syncEnabled !== undefined) updates.syncEnabled = syncEnabled;
  if (activeTab) updates.activeTab = activeTab;
  if (timerEnd !== undefined) updates.timerEnd = timerEnd;
  if (revealAnswers !== undefined) updates.revealAnswers = revealAnswers;
  
  const updated = db.updateState(updates);
  broadcastUpdate();
  res.json(updated);
});

// Group Submissions APIs
app.get('/api/submissions/:classId', (req, res) => {
  const { classId } = req.params;
  res.json(db.getSubmissions(classId));
});

app.get('/api/submissions/:classId/:groupId', (req, res) => {
  const { classId, groupId } = req.params;
  const { studentEmail } = req.query;
  const submission = db.getSubmission(classId, groupId, studentEmail);
  if (!submission) {
    return res.json({ submitted: false });
  }
  res.json({ submitted: true, data: submission });
});

app.post('/api/submissions/:classId/:groupId', (req, res) => {
  const { classId, groupId } = req.params;
  const { submissionData, submittedBy, studentEmail } = req.body;
  
  if (!submissionData) {
    return res.status(400).json({ error: "Submission data is required" });
  }
  
  const saved = db.saveSubmission(classId, groupId, studentEmail, submissionData, submittedBy);
  broadcastUpdate();
  res.json({ success: true, data: saved });
});

// Comments & Feedback APIs
app.get('/api/comments/:classId/:groupId', (req, res) => {
  const { classId, groupId } = req.params;
  const { studentEmail } = req.query;
  res.json(db.getComments(classId, groupId, studentEmail));
});

app.post('/api/comments/:classId/:groupId', (req, res) => {
  const { classId, groupId } = req.params;
  const { text, grade, studentEmail } = req.body;
  
  if (!text) {
    return res.status(400).json({ error: "Comment text is required" });
  }
  
  const saved = db.saveComment(classId, groupId, studentEmail, text, grade);
  broadcastUpdate();
  res.json({ success: true, comments: saved });
});

// Check-in API endpoints
app.get('/api/checkins/:classId', (req, res) => {
  const { classId } = req.params;
  res.json(db.getCheckins(classId));
});

app.post('/api/checkins/:classId/:userEmail', (req, res) => {
  const { classId, userEmail } = req.params;
  const { text } = req.body;
  const saved = db.saveCheckinResponse(classId, userEmail, text);
  broadcastUpdate();
  res.json({ success: true, data: saved });
});

// Interactive Slide responses
app.get('/api/interactions/:classId/:slideId', (req, res) => {
  const { classId, slideId } = req.params;
  res.json(db.getSlideInteractions(classId, slideId));
});

app.post('/api/interactions/:classId/:slideId/:userEmail', (req, res) => {
  const { classId, slideId, userEmail } = req.params;
  const { value } = req.body;
  const saved = db.saveSlideInteraction(classId, slideId, userEmail, value);
  broadcastUpdate();
  res.json({ success: true, data: saved });
});

app.post('/api/interactions/like/:classId/:slideId/:responseId/:userEmail', (req, res) => {
  const { classId, slideId, responseId, userEmail } = req.params;
  const saved = db.likeSlideInteraction(classId, slideId, responseId, userEmail);
  broadcastUpdate();
  res.json({ success: true, data: saved });
});

app.post('/api/checkins/like/:classId/:word/:userEmail', (req, res) => {
  const { classId, word, userEmail } = req.params;
  const saved = db.likeCheckinWord(classId, word, userEmail);
  broadcastUpdate();
  res.json({ success: true, data: saved });
});

app.post('/api/interactions/like-word/:classId/:slideId/:word/:userEmail', (req, res) => {
  const { classId, slideId, word, userEmail } = req.params;
  const saved = db.likeSlideInteractionWord(classId, slideId, word, userEmail);
  broadcastUpdate();
  res.json({ success: true, data: saved });
});

app.post('/api/interactions/hide/:classId/:slideId/:responseId', (req, res) => {
  const { classId, slideId, responseId } = req.params;
  const saved = db.toggleHideSlideInteraction(classId, slideId, responseId);
  broadcastUpdate();
  res.json({ success: true, data: saved });
});

app.post('/api/interactions/highlight/:classId/:slideId/:responseId', (req, res) => {
  const { classId, slideId, responseId } = req.params;
  const saved = db.toggleHighlightSlideInteraction(classId, slideId, responseId);
  broadcastUpdate();
  res.json({ success: true, data: saved });
});

app.post('/api/interactions/answer/:classId/:slideId/:responseId', (req, res) => {
  const { classId, slideId, responseId } = req.params;
  const saved = db.toggleAnswerSlideInteraction(classId, slideId, responseId);
  broadcastUpdate();
  res.json({ success: true, data: saved });
});

app.post('/api/interactions/pin/:classId/:slideId/:responseId', (req, res) => {
  const { classId, slideId, responseId } = req.params;
  const saved = db.togglePinSlideInteraction(classId, slideId, responseId);
  broadcastUpdate();
  res.json({ success: true, data: saved });
});

// Concept Check responses
app.get('/api/conceptchecks/:classId', (req, res) => {
  const { classId } = req.params;
  res.json(db.getConceptChecks(classId));
});

app.post('/api/conceptchecks/:classId/:userEmail', (req, res) => {
  const { classId, userEmail } = req.params;
  const { score, answers } = req.body;
  const saved = db.saveConceptCheckResponse(classId, userEmail, score, answers);
  broadcastUpdate();
  res.json({ success: true, data: saved });
});

// Reflections
app.get('/api/reflections/:classId', (req, res) => {
  const { classId } = req.params;
  res.json(db.getReflections(classId));
});

app.post('/api/reflections/:classId/:userEmail', (req, res) => {
  const { classId, userEmail } = req.params;
  const { text } = req.body;
  const saved = db.saveReflection(classId, userEmail, text);
  broadcastUpdate();
  res.json({ success: true, data: saved });
});

// GET whiteboard history
app.get('/api/whiteboard/:classId', (req, res) => {
  const { classId } = req.params;
  res.json(db.getWhiteboardHistory(classId));
});

// POST whiteboard drawing action or clear
app.post('/api/whiteboard/draw/:classId', (req, res) => {
  const { classId } = req.params;
  const action = req.body;
  
  if (action.type === 'clear') {
    db.clearWhiteboardHistory(classId);
  } else {
    db.addWhiteboardAction(classId, action);
  }
  
  // Broadcast drawing actions to all connected SSE clients
  sseClients.forEach(client => {
    client.write(`event: whiteboard_update\ndata: ${JSON.stringify({ classId, action })}\n\n`);
  });
  
  res.json({ success: true });
});

// GET bibliography
app.get('/api/bibliography', (req, res) => {
  res.json(db.syllabusBibliography);
});

// Fallback to serve index.html for any frontend routing (SPA style)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`   US ROI Learning Lab Server is running locally!`);
  console.log(`   Access the portal at: http://localhost:${PORT}`);
  console.log(`===================================================`);
});

const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'db.json');

const students = [
  { name: "Student Group 1", email: "student1", group: 1 },
  { name: "Student Group 2", email: "student2", group: 2 },
  { name: "Student Group 3", email: "student3", group: 3 },
  { name: "Student Group 4", email: "student4", group: 4 },
  { name: "Student Group 5", email: "student5", group: 5 }
];

// Mapped US C-Suite Group Scenarios
const scenarios = {
  "1": {
    "title": "Group 1: Emergency Triage AI",
    "description": "Implementation of an AI system for automated patient triage in the Emergency Department (120k annual visits).",
    "investment": 1500000,
    "annualBenefit": 300000,
    "annualCost": 50000,
    "adoptionRate": 80,
    "riskCost": 350000,
    "caseStudy": "<strong>Clinical Setting:</strong> St. Teresa Medical Center's Emergency Department handles 120,000 patient visits annually. Triage is currently performed manually using the Emergency Severity Index (ESI), averaging 24 minutes per patient (target is under 10 minutes). This delay causes critical boarding issues, patients leaving without being seen (LWBS), and liability exposure.<br><br><strong>Proposed Solution:</strong> Deploy a voice-enabled ambient AI triage assistant. The tool captures the patient's chief complaint and initial vitals, suggesting an ESI triage level for nursing validation.<br><br><strong>Financial & Risk Context:</strong> Initial CAPEX is $1,500,000, with expected annual benefits of $300,000 from workflow acceleration and lower LWBS rates. However, clinical staff warn of false negatives (e.g., misclassifying atypical cardiac symptoms as low acuity). A 0.5% clinical error rate under this volume exposes the hospital to estimated annual malpractice liability of $350,000. Nurses also warn of alert fatigue and EHR click friction."
  },
  "2": {
    "title": "Group 2: Robotic Pharmacy Dispensing",
    "description": "Automation with robotic dispensers for the central hospital pharmacy (10k dispenses/month).",
    "investment": 1800000,
    "annualBenefit": 320000,
    "annualCost": 60000,
    "adoptionRate": 90,
    "riskCost": 400000,
    "caseStudy": "<strong>Clinical Setting:</strong> A major academic medical center's central pharmacy dispenses 10,000 medication doses monthly. The baseline dispensing error rate is 1.8%, leading to adverse drug events (ADEs), extended length of stay, and CMS penalties.<br><br><strong>Proposed Solution:</strong> Deploy robotic unit-dose dispensing machines integrated with the EHR prescription workflow.<br><br><strong>Financial & Risk Context:</strong> CAPEX is $1,800,000. Annual benefit of $320,000 comes from reducing 6 pharmacist/tech FTEs. However, IT warns of high integration complexity with the legacy EHR database. A mechanical or software failure in the robot would paralyze medication distribution, requiring emergency backup staffing at an estimated risk cost of $400,000. Pharmacists also express resistance due to changes in workflow."
  },
  "3": {
    "title": "Group 3: Continuous Wireless Telemetry",
    "description": "Continuous ward monitoring using wearable wireless patches (80 General Medicine beds).",
    "investment": 1200000,
    "annualBenefit": 280000,
    "annualCost": 40000,
    "adoptionRate": 75,
    "riskCost": 300000,
    "caseStudy": "<strong>Clinical Setting:</strong> A cardiovascular hospital has 80 general medicine beds. Post-operative patients are monitored intermittently, leading to delayed recognition of clinical deterioration and avoidable ICU readmissions.<br><br><strong>Proposed Solution:</strong> Deployed wearable wireless patches that continuously stream heart rate, respiratory rate, and oxygen levels to a central nursing dashboard.<br><br><strong>Financial & Risk Context:</strong> CAPEX is $1,200,000, with $280,000 in annual benefit from lower ICU readmission rates (avoiding CMS penalties). However, the hospital Wi-Fi network suffers from dead zones. Signal drops create false alarms, triggering alarm fatigue. The risk cost of a missed deterioration event is priced at $300,000. Nurses are also resistant to wearing receiver pagers."
  },
  "4": {
    "title": "Group 4: Autonomous Diabetic Retinopathy Screening",
    "description": "Autonomous AI screening for diabetic retinopathy in primary care clinics (80k annual screenings).",
    "investment": 1000000,
    "annualBenefit": 1200000,
    "annualCost": 150000,
    "adoptionRate": 85,
    "riskCost": 500000,
    "caseStudy": "<strong>Clinical Setting:</strong> A primary care network handles 80,000 diabetic patients. Annual retinal exams are referred to external ophthalmologists, but compliance is under 30% due to scheduling friction, leading to preventable vision loss.<br><br><strong>Proposed Solution:</strong> Install autonomous AI retinal cameras (like IDx-DR) directly in primary care clinics.<br><br><strong>Financial & Risk Context:</strong> CAPEX is $1,000,000. Expected benefit is $1,200,000 annually from billing reimbursement and closed gaps in care. However, IT warns of HIPAA vulnerabilities in cloud-based image storage. If the primary care physician rejects the workflow due to additional patient setup time, or if diagnostic inaccuracies lead to a missed diagnosis, the risk cost is estimated at $500,000."
  },
  "5": {
    "title": "Group 5: Integrated EHR Documentation Copilot",
    "description": "EHR documentation copilot using generative AI for clinical notes (500-bed hospital system).",
    "investment": 2500000,
    "annualBenefit": 600000,
    "annualCost": 200000,
    "adoptionRate": 70,
    "riskCost": 2000000,
    "caseStudy": "<strong>Clinical Setting:</strong> A 500-bed hospital system struggles with physician burnout, with doctors spending 2 hours on EHR documentation for every hour of patient care. This delays billing submissions and reduces patient throughput.<br><br><strong>Proposed Solution:</strong> Deploy a generative AI EHR assistant (like Nuance DAX) that drafts clinical notes from ambient conversations.<br><br><strong>Financial & Risk Context:</strong> CAPEX is $2,500,000, with $600,000 in annual benefit from lower charting hours. However, compliance warns of AI hallucinations (drafting incorrect clinical details). If a hallucinated note leads to a billing audit or a medical error, the risk cost is estimated at $2,000,000 (legal and regulatory fines). Clinician trust is a major barrier."
  }
};

// Full course slides structure translated to English
const classesContent = [
  {
    "id": "class1",
    "title": "Class 1: Foundations of Risk in Healthcare AI",
    "date": "July 8, 2026",
    "description": "Understand the hidden nature of risk in digital health innovations, distinguish apparent from hidden risks, and map cascade effects using the Domino Effect framework.",
    "checkin": {
      "type": "wordcloud",
      "question": "In one word: Think of a technology that promised clinical efficiency but delivered frustration."
    },
    "conceptCheck": [
      {
        "question": "What are the four risk dimensions of the risk taxonomy framework?",
        "options": [
          "Technical, Operational, Financial, Regulatory",
          "Clinical, Hospital, Legal, Economic",
          "Technological, Administrative, Reputation, Strategic"
        ],
        "correctAnswerIndex": 0
      },
      {
        "question": "What defines a 'hidden risk' in healthcare innovation?",
        "options": [
          "Information security breaches and data leaks",
          "Technical, operational, and regulatory friction that commercial proposals omit",
          "Unidentified insurance claims denials"
        ],
        "correctAnswerIndex": 1
      },
      {
        "question": "In the MD Anderson IBM Watson Oncology case, why did the expected ROI fail to materialize?",
        "options": [
          "The diagnostic accuracy was below 50%",
          "Due to workflow friction, lack of EHR integration, and demographics incompatibility",
          "The software license price doubled in the second year"
        ],
        "correctAnswerIndex": 1
      }
    ],
    "reflection": {
      "type": "open",
      "question": "How does adopting the 'Guardian of Viability' mindset change your perspective on clinical software acquisition?"
    },
    "references": [
      {
        "citation": "IBM Watson · IEEE Spectrum (2019)",
        "url": "https://spectrum.ieee.org/how-ibm-watson-overpromised-and-underdelivered-on-ai-health-care"
      },
      {
        "citation": "IBM Watson · STAT News, unsafe recommendations (2017)",
        "url": "https://www.statnews.com/2017/09/05/watson-ibm-cancer/"
      },
      {
        "citation": "IBM Watson · MD Anderson, JNCI (2017)",
        "url": "https://academic.oup.com/jnci/article/109/5/djx113/3847623"
      }
    ],
    "slides": [
      {
        "id": "slide_1_1",
        "image": "/slides/slide_1_1.png",
        "title": "Welcome to ROI & Risk Assessment",
        "block": "Introduction",
        "estimatedTime": "2 min",
        "notes": "<strong>Suggested Notes:</strong> Welcome to the MBA in AI Applied to Health. Today we begin our course on Risk Assessment and ROI. Our focus is C-suite governance and financial modeling, moving our attention from marketing claims to real mathematical and operational parameters.",
        "content": "<h3>Risk Assessment & Healthcare ROI</h3><p>MBA in AI Applied to Health</p><p>US Healthcare Innovation Lab</p><p>Instructor: Faila Santos, PhD</p>"
      },
      {
        "id": "slide_1_4",
        "image": "/slides/slide_1_4.png",
        "title": "Agenda & Objectives · Class 1",
        "block": "Introduction",
        "estimatedTime": "3 min",
        "notes": "<strong>Suggested Notes:</strong> Our objective today is learning to separate apparent risks from hidden risks, master the probability vs. impact matrix, and trace a domino effect. Active participation in the enquetes represents 15% of your final grade.",
        "content": "<h3>Objectives & Agenda</h3><p><b>Core Goal:</b> Learn to separate apparent from hidden risks, utilize the impact matrix, and map a domino effect.</p><p><b>Agenda:</b> 2 lecture blocks + IBM Watson case review + committee group work + reflection.</p><p><b>Grading:</b> Portal interactions and enquetes account for 15% of the final grade.</p>"
      },
      {
        "id": "slide_1_3",
        "image": "/slides/slide_1_3.png",
        "title": "Icebreaker · The Tech Backfire",
        "block": "Opening",
        "estimatedTime": "8 min",
        "isInteractive": true,
        "interactionType": "wordcloud",
        "question": "In one word: Think of a technology that promised clinical efficiency but delivered frustration.",
        "notes": "<strong>Suggested Notes:</strong> Let's start with our opening interactive dynamic. Enter a single word describing a digital health technology that promised a lot but delivered frustration in your daily routine. It could be a slow EHR, a dropped telemedicine app, or warning alerts that interrupt patient care.",
        "content": "<h3>Icebreaker · The Tech Backfire</h3><p>In one word: Think of a technology that promised clinical efficiency but delivered frustration.</p><p>Submit your response in the portal to generate our live word cloud.</p>"
      },
      {
        "id": "slide_1_5",
        "image": "/slides/slide_1_5.png",
        "title": "The Guardian of Viability",
        "block": "Block 1: Risk Identity",
        "estimatedTime": "5 min",
        "notes": "<strong>Suggested Notes:</strong> As analysts and leaders, our role is to act as the Guardians of Viability. This does not mean blocking innovation; it means ensuring that technology survives contact with clinical reality.",
        "content": "<h3>The Guardian of Viability</h3><p><i>\"Choose the solution validated by data, not the one sold by marketing.\"</i></p><p>From spreadsheets to governance: your role is to protect the organization from bad software decisions and ensure tech survives clinical workflows.</p>"
      },
      {
        "id": "slide_1_6",
        "image": "/slides/slide_1_6.png",
        "title": "Apparent vs. Hidden Risks",
        "block": "Block 1: Risk Identity",
        "estimatedTime": "5 min",
        "notes": "<strong>Suggested Notes:</strong> Apparent risk is what everyone sees in the commercial proposal: license cost and implementation timeline. Hidden risks are what actually sink projects: IT infrastructure redesign, compliance audits, and clinician workflow resistance.",
        "content": "<h3>Apparent vs. Hidden Risks</h3><p><b>Apparent Risk:</b> What is visible on the spreadsheet (software licenses, implementation timeline).</p><p><b>Hidden Risk:</b> Unseen technical, operational, and regulatory friction that appears post-deployment.</p>"
      },
      {
        "id": "slide_1_7",
        "title": "The Iceberg Metaphor",
        "block": "Block 1: Risk Identity",
        "estimatedTime": "5 min",
        "notes": "<strong>Suggested Notes:</strong> Think of clinical software like an iceberg. Acquisition is the visible tip. The submerged mass represents training, support, and integrations. Buying wireless cardiac patches without updating the hospital Wi-Fi network is a classic example.",
        "content": "<h3>The Iceberg Metaphor</h3><p>Clinical software costs behave like an iceberg.</p><p>Visible Tip (10%): Direct software acquisition costs.</p><p>Submerged Mass (90%): Training, infrastructure upgrades, and integration overheads.</p>"
      },
      {
        "id": "slide_1_8",
        "image": "/slides/slide_1_8.png",
        "title": "Risk Categorization Framework",
        "block": "Block 1: Risk Identity",
        "estimatedTime": "6 min",
        "notes": "<strong>Suggested Notes:</strong> To guide our analysis, we categorize risks into four areas: Technical, Operational, Financial, and Regulatory. A clinically perfect algorithm is useless if it violates HIPAA regulations or causes alert fatigue that frustrates nurses.",
        "content": "<h3>Risk Categorization Framework</h3><p>Always map at least one risk in each category during C-suite reviews:</p><ul><li><b>Technical:</b> Integrations, EHR interoperability, data latency.</li><li><b>Operational:</b> Workflow adaptation, clinician alert fatigue, adoption rate.</li><li><b>Financial:</b> Hidden maintenance costs, claim denials, realized ROI.</li><li><b>Regulatory:</b> HIPAA compliance, FDA clearances, CMS penalties.</li></ul>"
      },
      {
        "id": "slide_1_9",
        "image": "/slides/slide_1_9.png",
        "title": "Probability vs. Impact in Medicine",
        "block": "Block 1: Risk Identity",
        "estimatedTime": "5 min",
        "notes": "<strong>Suggested Notes:</strong> The classic impact matrix requires calibration in healthcare. Sepsis or clinical errors have zero tolerance. A rare clinical error with severe patient impact belongs in the red quadrant, even if the probability is just 0.1%. Clinical impact always overrides statistical probability.",
        "content": "<h3>Probability vs. Impact in Medicine</h3><p>In clinical governance, low probability never neutralizes high clinical impact.</p><p>A rare event with severe patient outcomes belongs in the high-priority RED quadrant.</p>"
      },
      {
        "id": "slide_1_10",
        "title": "Transition to Whiteboard",
        "block": "Block 1: Risk Identity",
        "estimatedTime": "5 min",
        "notes": "<strong>Suggested Notes:</strong> Let's move to the interactive whiteboard to plot and classify real-world risks on our matrix.",
        "content": "<h3>Interactive Risk Mapping</h3><p>Prepare to plot and classify synchronous clinical, technical, and operational risks on the severity matrix.</p>"
      },
      {
        "id": "slide_1_10_ whiteboard",
        "title": "Interactive Whiteboard",
        "block": "Block 1: Risk Identity",
        "estimatedTime": "10 min",
        "notes": "<strong>Suggested Notes:</strong> Let's use the interactive whiteboard to plot Watson's failure points across our four risk dimensions.",
        "content": "<h3>Whiteboard: Watson Failure Points</h3><p>Draw and classify Watson's risks on the interactive board.</p>"
      },
      {
        "id": "slide_1_11",
        "image": "/slides/slide_1_11.png",
        "title": "Classify the Risk · Interactive Activity",
        "block": "Block 1: Risk Identity",
        "estimatedTime": "5 min",
        "notes": "<strong>Suggested Notes:</strong> For each risk, we define a response: Accept (✅) for low risks, Monitor (👁️) to track changes, Mitigate (🛠️) to actively reduce impact, and Avoid (🚫) for critical clinical risks. Let's launch four interactive scenarios for you to classify live.",
        "content": "<h3>Classify the Risk</h3><p>Vote in the portal to calibrate risk quadrants for new hospital systems.</p>"
      },
      {
        "id": "slide_1_12_a",
        "title": "Classify Risk 1: Technical",
        "block": "Block 1: Risk Identity",
        "estimatedTime": "8 min",
        "notes": "<strong>Suggested Notes (Gabarito: AVOID):</strong> Technical Scenario: The emergency triage AI has a 1% false negative rate for acute MI. This means 1 out of 100 atypical heart attacks is incorrectly categorized. The correct answer is AVOID (red), as this false negative creates a direct risk of patient death.",
        "content": "<h3>Classify Technical Risk</h3><p><strong>Scenario:</strong> Emergency triage AI has a 1% false negative rate in patients with atypical myocardial infarction symptoms.</p><p>Command: \"Vote on which quadrant of the matrix this risk falls into.\"</p>",
        "isInteractive": true,
        "interactionType": "poll",
        "question": "Technical Risk: Triage AI has 1% false negative rate for atypical MI. Which quadrant does it fall into?",
        "options": [
          "Accept (Low Probability & Low Impact)",
          "Monitor (Medium Probability & Low Impact)",
          "Mitigate (High Probability or Medium Impact)",
          "Avoid (High Probability & High Impact / Critical)"
        ]
      },
      {
        "id": "slide_1_12_b",
        "title": "Classify Risk 2: Operational",
        "block": "Block 1: Risk Identity",
        "estimatedTime": "8 min",
        "notes": "<strong>Suggested Notes (Gabarito: MITIGATE):</strong> Operational Scenario: MRI AI reports speed up diagnostic output, which immediately causes reception and parking lot overflows. The correct answer is MITIGATE (orange/yellow). While not an immediate clinical threat, it impacts operations and requires rescheduling or parking expansions.",
        "content": "<h3>Classify Operational Risk</h3><p><strong>Scenario:</strong> Faster MRI scan report times lead to downstream parking lot and reception desk overflows during peak hours.</p><p>Command: \"Vote on which quadrant of the matrix this risk falls into.\"</p>",
        "isInteractive": true,
        "interactionType": "poll",
        "question": "Operational Risk: Accelerated MRI report times cause reception desk and parking lot overflows. Which quadrant does it fall into?",
        "options": [
          "Accept (Low Probability & Low Impact)",
          "Monitor (Medium Probability & Low Impact)",
          "Mitigate (High Probability or Medium Impact)",
          "Avoid (High Probability & High Impact / Critical)"
        ]
      },
      {
        "id": "slide_1_12_c",
        "title": "Classify Risk 3: Regulatory",
        "block": "Block 1: Risk Identity",
        "estimatedTime": "8 min",
        "notes": "<strong>Suggested Notes (Gabarito: AVOID):</strong> Regulatory Scenario: Launching a clinical support tool without FDA clearance or SOC 2 compliance. The correct answer is AVOID (red), as operating without regulatory approval exposes the hospital to immediate suspension and severe legal liability.",
        "content": "<h3>Classify Regulatory Risk</h3><p><strong>Scenario:</strong> Launching a diagnostic AI tool without FDA clearance or HIPAA validation, risking regulatory fines and service suspension.</p><p>Command: \"Vote on which quadrant of the matrix this risk falls into.\"</p>",
        "isInteractive": true,
        "interactionType": "poll",
        "question": "Regulatory Risk: Launching AI without FDA clearance or HIPAA validation. Which quadrant does it fall into?",
        "options": [
          "Accept (Low Probability & Low Impact)",
          "Monitor (Medium Probability & Low Impact)",
          "Mitigate (High Probability or Medium Impact)",
          "Avoid (High Probability & High Impact / Critical)"
        ]
      },
      {
        "id": "slide_1_12_d",
        "title": "Classify Risk 4: Financial",
        "block": "Block 1: Risk Identity",
        "estimatedTime": "8 min",
        "notes": "<strong>Suggested Notes (Gabarito: MONITOR):</strong> Financial Scenario: Wireless cardiac telemetry patches require a large, unplanned hospital Wi-Fi network upgrade. The correct answer is MONITOR (yellow/green), as this hidden infrastructure cost is predictable and manageable if tracked in the budget.",
        "content": "<h3>Classify Financial Risk</h3><p><strong>Scenario:</strong> Unplanned hospital Wi-Fi network upgrade required to support continuous wireless telemetry patches.</p><p>Command: \"Vote on which quadrant of the matrix this risk falls into.\"</p>",
        "isInteractive": true,
        "interactionType": "poll",
        "question": "Financial Risk: Unplanned hospital Wi-Fi network upgrade required to support continuous wireless telemetry patches. Which quadrant does it fall into?",
        "options": [
          "Accept (Low Probability & Low Impact)",
          "Monitor (Medium Probability & Low Impact)",
          "Mitigate (High Probability or Medium Impact)",
          "Avoid (High Probability & High Impact / Critical)"
        ]
      },
      {
        "id": "slide_1_13",
        "image": "/slides/slide_1_13.png",
        "title": "The Speed That Hurts",
        "block": "Block 2: Flow Dynamics",
        "estimatedTime": "5 min",
        "notes": "<strong>Suggested Notes:</strong> A fundamental workflow concept: optimizing locally without planning the global flow only shifts the bottleneck. Speeding up one step without preparing the rest of the hospital creates serious clinical and operational risks downstream.",
        "content": "<h3>The Speed That Hurts</h3><p>Excessive local efficiency can create clinical risk downstream.</p><p>Accelerating one stage of a workflow without preparing the rest creates secondary bottlenecks and systemic delays.</p>"
      },
      {
        "id": "slide_1_14",
        "image": "/slides/slide_1_14.png",
        "title": "Secondary Bottlenecks",
        "block": "Block 2: Flow Dynamics",
        "estimatedTime": "5 min",
        "notes": "<strong>Suggested Notes:</strong> The critical question for any vendor: if I triple report output speed with AI, what happens to downstream consult bookings or inpatient bed allocations? Local speed doesn't solve the bottleneck; it just shifts the point of saturation.",
        "content": "<h3>Secondary Bottlenecks</h3><p>When you speed up triage or diagnosis, where does the operational pressure migrate?</p><p>Common secondary bottlenecks: billing and insurance claims, return visits scheduling, pharmacy wait times, bed ociosities.</p>"
      },
      {
        "id": "slide_1_15",
        "title": "Where Does Your Workflow Break?",
        "block": "Block 2: Flow Dynamics",
        "estimatedTime": "8 min",
        "isInteractive": true,
        "interactionType": "wordcloud",
        "question": "Describe a secondary bottleneck you have seen arise after a workflow improvement.",
        "notes": "<strong>Suggested Notes:</strong> Access the portal and describe in a few words a secondary bottleneck you have witnessed after a technology deployment. Upvote your colleagues' contributions.",
        "content": "<h3>Where does your workflow break?</h3><p>Share a real case of a secondary bottleneck post-implementation that you have seen in your healthcare routine.</p>"
      },
      {
        "id": "slide_1_16",
        "image": "/slides/slide_1_16.png",
        "title": "Case Study: IBM Watson for Oncology",
        "block": "Case Study",
        "estimatedTime": "15 min",
        "notes": "<strong>Suggested Notes:</strong> Let's review the IBM Watson case. MD Anderson invested $62M in Watson to assist in oncology recommendations. Why did it fail? It recommended unsafe regimens because it was trained on synthetic cases, not real EHR datasets, and it ignored local physician workflows.",
        "content": "<h3>Case Study: IBM Watson for Oncology</h3><p>MD Anderson Cancer Center's $62M oncology AI initiative was desupported in 2022.</p><p><b>Failure Points:</b> Ignored local clinical guidelines, was trained on synthetic clinical cases, and suffered extreme clinician friction.</p>"
      },
      {
        "id": "slide_1_17",
        "image": "/slides/slide_1_17.png",
        "title": "Integrated Case: MRI Report AI",
        "block": "Case Study",
        "estimatedTime": "10 min",
        "notes": "<strong>Suggested Notes:</strong> In the US clinical space, accelerating MRI scans with deep learning shows strong technical potential. However, the real ROI depends on the hospital's capacity to handle this high throughput and coordinate subsequent specialist appointments.",
        "content": "<h3>Integrated Case: MRI Report AI</h3><p>MRI scan report acceleration with deep learning increases diagnostic throughput.</p><p>The downstream impact migrates to reception desk congestion and billing auditor bottlenecks.</p>"
      },
      {
        "id": "slide_1_17_read",
        "title": "Quick Reading: MRI Report AI in the US",
        "block": "Case Study",
        "estimatedTime": "5 min",
        "notes": "<strong>Suggested Notes:</strong> Take 5 minutes to read the deployment study of MRI report AI. Observe the operational workflow indicators before we begin our discussion.",
        "content": "<h3>Quick Reading: MRI Report AI in the US</h3><p>Review and discuss the operational impact of clinical AI models deployed for medical imaging in US health systems.</p>"
      },
      {
        "id": "slide_1_17_dyn",
        "title": "Interactive: High-Throughput Bottlenecks",
        "block": "Case Study",
        "estimatedTime": "8 min",
        "isInteractive": true,
        "interactionType": "poll",
        "question": "If AI triples MRI report speeds, where does the clinical workflow collapse first?",
        "notes": "<strong>Suggested Notes:</strong> Vote in the live enquete: if AI triples report speeds, which hospital sector collapses first? Tip: While there is no single answer, billing/claim audits and specialist consult backlogs are often much harder to solve than reception desk congestion.",
        "content": "<h3>Interactive: High-Throughput Bottlenecks</h3><p>Vote in the live enquete regarding the immediate operational bottlenecks that arise after diagnostic AI acceleration.</p>",
        "options": [
          "Physical congestion of reception desk and parking lot",
          "Overload of primary doctors attempting to review positive findings",
          "Internal billing audit and insurance claim processing"
        ]
      },
      {
        "id": "slide_1_18",
        "title": "The Domino Effect Visualized",
        "block": "Case Study",
        "estimatedTime": "5 min",
        "notes": "<strong>Suggested Notes:</strong> Here is the Domino Effect in action. In the Watson case, the goal was diagnosis. But the chain reaction — lack of EHR integration, physician rejection, and operational overhead — collapsed the entire investment. Every ignored workflow step knocks down the next, turning expected ROI into a liability.",
        "content": "<h3>The Domino Effect Visualized</h3><p>How an initial change in technical assumptions propagates across the entire operational and financial chain.</p>"
      },
      {
        "id": "slide_1_19",
        "title": "Group Work: Domino Effect Mapping",
        "block": "Group Work",
        "estimatedTime": "15 min",
        "notes": "<strong>Suggested Notes:</strong> We will now begin our group work. Access the Group Work tab, analyze your assigned case study, build your Domino Effect map, and submit the Risk Classification Matrix.",
        "content": "<h3>Group Work: Domino Effect Mapping</h3><p>Team Project: analyze the clinical scenario, map the chain of effects, and fill in the Risk Matrix in the portal.</p>"
      },
      {
        "id": "slide_1_20",
        "title": "Case Debrief",
        "block": "Case Study",
        "estimatedTime": "10 min",
        "notes": "<strong>Suggested Notes:</strong> Excellent submissions. Many groups focused on technical hardware/software risks, but overlooked billing audits and clinician alert fatigue. Let's discuss these operational gaps.",
        "content": "<h3>Case Debrief</h3><p>Instructor-led discussion regarding workflow gaps, bottlenecks, and redundancies mapped in the committee submissions.</p>"
      },
      {
        "id": "slide_1_21",
        "title": "Final Reflection",
        "block": "Closing",
        "estimatedTime": "8 min",
        "isInteractive": true,
        "interactionType": "wordcloud",
        "question": "How does the \"Guardian of Viability\" perspective change your approach to clinical software acquisition?",
        "notes": "<strong>Suggested Notes:</strong> To close, please respond in the portal: how does shifting to the 'Guardian of Viability' mindset change your criteria for evaluating new medical software?",
        "content": "<h3>Final Reflection</h3><p>Respond in the portal: How does the \"Guardian of Viability\" perspective change your approach to clinical software acquisition?</p>"
      },
      {
        "id": "slide_1_22",
        "image": "/slides/slide_1_22.png",
        "title": "Key Takeaways & Bridge to Class 2",
        "block": "Closing",
        "estimatedTime": "5 min",
        "notes": "<strong>Suggested Notes:</strong> Class 1 summary: hidden risks outweigh apparent ones, bottlenecks shift rather than disappear, and simulation is mandatory. Next class, we dive into the math of the invisible ROI.",
        "content": "<h3>Key Takeaways from Class 1</h3><ul><li>Hidden risks always outweigh apparent risks.</li><li>Bottlenecks shift along the workflow chain.</li><li>Flow simulation and stress testing are mandatory before contracting.</li></ul>"
      },
      {
        "id": "slide_1_23_ref",
        "title": "Class References & Sources",
        "block": "Closing",
        "estimatedTime": "2 min",
        "notes": "<strong>Suggested Notes:</strong> We have provided links to the Watson and MRI AI studies in the portal references. Happy studying, and see you in the next session.",
        "content": "<h3>Bibliography & Sources</h3><p>IBM Watson for Oncology · MD Anderson & IEEE Spectrum</p><p>Clinical AI & Imaging Reports · US Health System Cases</p>"
      }
    ]
  },
  {
    "id": "class2",
    "title": "Class 2: Operational Simulation & ROI Stress Testing",
    "date": "July 15, 2026",
    "description": "Utilize operational parameters to stress test ROI models. Mappings include the Adoption Equation and Loss Avoidance vs. Pure Savings.",
    "checkin": {
      "type": "poll_ab",
      "question": "Which cost is most frequently underestimated in clinical software proposals?",
      "options": [
        "Hidden IT infrastructure OPEX (network, integrations, compliance)",
        "Clinical training and adoption support for medical staff"
      ]
    },
    "conceptCheck": [
      {
        "question": "What is the Adoption Equation?",
        "options": [
          "Realized ROI = Expected ROI * Adoption Rate",
          "Adoption = IT Budget * Number of Licences",
          "ROI = (Benefit - Cost) / Investment"
        ],
        "correctAnswerIndex": 0
      },
      {
        "question": "What is 'Loss Avoidance' (or Risk Avoidance) in healthcare ROI?",
        "options": [
          "Pure financial savings on software licenses",
          "Financial benefit achieved by preventing adverse events or regulatory penalties",
          "A tax reduction strategy"
        ],
        "correctAnswerIndex": 1
      }
    ],
    "reflection": {
      "type": "open",
      "question": "How can you defend a project whose primary return is Loss Avoidance rather than direct operational savings?"
    },
    "references": [
      {
        "citation": "AHRQ Health IT ROI Framework (2020)",
        "url": "https://www.ahrq.gov/health-it/index.html"
      }
    ],
    "slides": [
  {
    "id": "slide_2_1",
    "title": "Capa da Aula",
    "image": "/slides/slide_2_1.png",
    "block": "Introduction",
    "estimatedTime": "2 min",
    "notes": "<strong>Suggested Notes:</strong> Welcome to our second session. Today we will dive deep into modeling the comprehensive ROI. We will learn how to price the invisible, estimate savings from avoided adverse events, and run stress tests.",
    "content": "<h3>Mitigation of Risk & the Anatomy of Smart ROI</h3><p>Making the invisible quantifiable</p><p>Instructor: Faila Santos, PhD</p>"
  },
  {
    "id": "slide_2_2",
    "title": "Icebreaker · The Cost That No One Added",
    "image": "/slides/slide_2_2.png",
    "block": "Opening",
    "estimatedTime": "8 min",
    "isInteractive": true,
    "interactionType": "poll_ab",
    "question": "Which of these costs do you think most frequently 'disappears' from project spreadsheets?",
    "options": [
      "Network / Infrastructure Works",
      "Staff Training",
      "Operational Rework",
      "Insurance Claim Denials",
      "Legal / Compliance"
    ],
    "notes": "<strong>Suggested Notes:</strong> Let's start with our check-in poll. Answer in the portal: which of these costs do you think most frequently 'disappears' from project spreadsheets: Network/Works, Training, Rework, Denials, or Legal?",
    "content": "<h3>Icebreaker · The Cost That No One Added</h3><p>Which of these costs do you think most frequently 'disappears' from project spreadsheets?</p><p>Vote in the portal.</p>"
  },
  {
    "id": "slide_2_3",
    "title": "Objectives and Agenda",
    "image": "/slides/slide_2_3.png",
    "block": "Introduction",
    "estimatedTime": "5 min",
    "notes": "<strong>Suggested Notes:</strong> Our goal today is to move from the theory of risk to the mathematics of ROI. You will learn to run a financial stress test and calculate comprehensive ROI—the one that includes the costs commercial proposals never mention. The agenda has two blocks: first, stress testing; second, the math of invisible ROI, with real cases in telemetry, dermatology, and pharmacy. Finally, each group will submit a mini ROI spreadsheet—today you calculate, not just listen.",
    "content": "<h3>Objectives and Agenda</h3><p><b>What you will know:</b> How to run a financial stress test and calculate comprehensive ROI, including operational risks and indirect costs.</p><p><b>Agenda:</b> Block 1 (Stress Tests) + Block 2 (Invisible ROI) + Dynamic Group Simulation in the committees.</p>"
  },
  {
    "id": "slide_2_4",
    "title": "Risk Assessment as Institutional Defense",
    "image": "/slides/slide_2_4.png",
    "block": "Introduction",
    "estimatedTime": "5 min",
    "notes": "<strong>Suggested Notes:</strong> This is the mantra of our second session: saying no, when data points to it, is also delivering value. Risk assessment doesn't exist to block innovation; it exists to protect the institution from investments that the infrastructure or culture cannot support. Your role as a guardian of viability is to have the analytical courage to veto what the numbers show will not work.",
    "content": "<h3>Risk Assessment as Institutional Defense</h3><p><i>\"Making data-driven decisions means having the courage to choose what works, not just what is trendy.\"</i></p><p>Data veto: saying 'no' with solid justification is also delivering value. Protecting the institution from investments its infrastructure cannot support is leadership, not resistance.</p>"
  },
  {
    "id": "slide_2_5",
    "title": "What is a Financial Stress Test",
    "image": "/slides/slide_2_5.png",
    "block": "Block 1: Stress Tests",
    "estimatedTime": "8 min",
    "notes": "<strong>Suggested Notes:</strong> A financial stress test consists of simulating the project's budget resilience under the worst possible assumptions before the GO. The vendor's nominal ROI calculation always assumes a perfect world. The stress test forces three questions: What if clinical adoption is halved? What if the network needs an upgrade? What if physical construction is required?",
    "content": "<h3>What is a Financial Stress Test?</h3><p><b>Definition:</b> Evaluating the budget resilience of the project by simulating the worst-case scenarios of costs and clinical adoption.</p><p>The 3 key questions of a stress test:</p><ol><li>What if clinical adoption by the medical staff drops to 50%?</li><li>What if the network requires an infrastructure upgrade?</li><li>What if physical construction and ward adaptation are needed?</li></ol>"
  },
  {
    "id": "slide_2_6",
    "title": "Hidden Infrastructure Costs",
    "image": "/slides/slide_2_6.png",
    "block": "Block 1: Stress Tests",
    "estimatedTime": "6 min",
    "notes": "<strong>Suggested Notes:</strong> The foundation that supports the AI project doesn't appear on the software invoice. The software price is rarely the largest cost of the project. Below the surface, we have network and connectivity, EHR integration, construction works, staff training, cybersecurity, support, and continuous model monitoring. Ignoring this is what destroys the real ROI.",
    "content": "<h3>Hidden Infrastructure Costs</h3><p>The foundation supporting the project does not appear on the software invoice.</p><p>Costs below the surface:</p><ul><li>Network and connectivity</li><li>Integration with the electronic health record (EHR)</li><li>Construction and physical adaptation</li><li>Staff training and process change</li><li>Cybersecurity and compliance</li><li>Support, maintenance, and continuous model monitoring</li></ul>"
  },
  {
    "id": "slide_2_7",
    "title": "Integrated Case Study · Ward Telemetry",
    "image": "/slides/slide_2_7.png",
    "block": "Block 2: Invisible ROI",
    "estimatedTime": "8 min",
    "notes": "<strong>Suggested Notes:</strong> Let's analyze telemetry in general wards. Buying AI-powered vital signs sensors seems like a simple investment. The hidden cost in the studied case ($1.5 million) involved upgrading the hospital's physical Wi-Fi network to support real-time data without drops (technical latency risk), and creating a central nursing hub to receive alerts (operational risk). Without these, the clinical patches lose all diagnostic purpose and become pure waste.",
    "content": "<h3>Integrated Case: Wireless Bed Telemetry</h3><p><b>The Case:</b> Promising telemetry solution with excellent clinical evaluation. Hidden cost: network infrastructure and central monitoring hub—not just the sensors.</p><p><b>Real Grounding (US):</b> Implementing real-time telemetry and adapting hospital beds in a regional facility required significant structural network investment. Telemetry requires physical readiness, not just equipment purchase.</p>"
  },
  {
    "id": "slide_2_8",
    "title": "Analytical Courage vs. Tech Trend",
    "image": "/slides/slide_2_8.png",
    "block": "Block 2: Invisible ROI",
    "estimatedTime": "8 min",
    "isInteractive": true,
    "interactionType": "open_ended",
    "question": "Which hidden cost do you underestimate the most in your projects and why?",
    "notes": "<strong>Suggested Notes:</strong> Answer in the synchronous dynamic: which hidden cost do you underestimate the most in your projects and why? Preferring a functional solution on installed infrastructure over a shiny trend requires analytical courage. Recognizing the blind spot is the first step of mitigation.",
    "content": "<h3>Analytical Courage vs. Tech Trend</h3><p>Which hidden cost do you underestimate the most in your projects and why?</p><p>Respond on the portal mural to discuss the top answers recognized by the class.</p>"
  },
  {
    "id": "slide_2_9",
    "title": "International Case Study · Google DermAssist",
    "image": "/slides/slide_2_9.png",
    "block": "Block 2: Invisible ROI",
    "estimatedTime": "8 min",
    "notes": "<strong>Suggested Notes:</strong> Google DermAssist is a great example of regulatory risk. The system suggests potential skin conditions from photos and symptoms. However, while it obtained CE marking in the EU, it faced regulatory hurdles and caution from the FDA in the US. Furthermore, ethical questions arose regarding performance bias on darker skin tones. A clear example of how regulatory risks and algorithmic bias impact commercial viability.",
    "content": "<h3>International Case Study: Google DermAssist</h3><p>Dermatology AI tool that suggests conditions from photos and symptoms. CE Class I in the EU; not evaluated by the FDA; not a diagnostic tool.</p><p><b>Bias and Validation Risk:</b> Criticisms regarding low representation of darker skin tones (bias risk), limited clinical validation, and self-diagnosis risks. Due diligence requires asking if it was validated on your specific population.</p>"
  },
  {
    "id": "slide_2_10",
    "title": "The Short-Term ROI Fallacy",
    "image": "/slides/slide_2_10.png",
    "block": "Block 2: Invisible ROI",
    "estimatedTime": "5 min",
    "notes": "<strong>Suggested Notes:</strong> Here lies one of the most expensive biases in healthcare management: looking only at next month's spreadsheet. A prevention project, like early screening or continuous telemetry, rarely returns the investment in the first quarter. Prevention benefits appear in year 2 or 3, when the curve of avoided events starts to compensate for the initial cost. If you evaluate digital health projects solely on short-term cash flow, you will systematically reject the very projects that protect patients and the institution the most.",
    "content": "<h3>The Short-Term ROI Fallacy</h3><p>Evaluating AI projects solely by first-year cash flow penalizes innovations aimed at long-term safety gains.</p><p>The greatest benefits of AI in healthcare (avoiding readmissions, preventing sepsis) generate incremental value over horizons longer than 24 months.</p>"
  },
  {
    "id": "slide_2_11",
    "title": "Invisible Risks · Part 1",
    "image": "/slides/slide_2_11.png",
    "block": "Block 2: Invisible ROI",
    "estimatedTime": "6 min",
    "notes": "<strong>Suggested Notes:</strong> The invisible risks with the greatest clinical and financial weight are decision support failures that induce medication errors and severe adverse events. In the standard hospital flow, each major adverse event has a high estimated cost (additional ICU days, repeated tests, new therapies). Avoiding these through AI alerts is a real indirect revenue driver. Additionally, documentation failures trigger insurance claim denials that silently erode revenue.",
    "content": "<h3>Invisible Risks · Part 1</h3><p><b>Medication Errors and Adverse Events:</b> Direct additional clinical costs (prolonged stay, ICU) and insurance claim denials that damage cash flow.</p><p><b>Insurance Claim Denials:</b> Registration errors generate denials that don't appear in the project spreadsheet but erode the bottom line.</p>"
  },
  {
    "id": "slide_2_12",
    "title": "Invisible Risks · Part 2",
    "image": "/slides/slide_2_12.png",
    "block": "Block 2: Invisible ROI",
    "estimatedTime": "6 min",
    "notes": "<strong>Suggested Notes:</strong> The second layer of invisible risks consists of legal liabilities. A medication error induced by an AI false negative can lead to complex malpractice lawsuits and fines. Professional liability insurance and dedicated legal counsel are real OPEX items that must be included. Add to that reputation costs and operational rework.",
    "content": "<h3>Invisible Risks · Part 2</h3><p><b>Legal Costs and Liability:</b> Lawsuits from adverse clinical outcomes induced or missed by algorithmic support.</p><p><b>Reputation and Image:</b> Institutional reputation costs are hard to quantify but devastating when they materialize.</p><p><b>Operational Rework:</b> Inefficiencies generated by poorly implemented solutions that consume time and resources outside the budget.</p>"
  },
  {
    "id": "slide_2_13",
    "title": "Turning Prevention into Value",
    "image": "/slides/slide_2_13.png",
    "block": "Block 2: Invisible ROI",
    "estimatedTime": "8 min",
    "notes": "<strong>Suggested Notes:</strong> How do we monetize prevention? The mental formula to calculate value generated by loss avoidance is: historical annual frequency of the event multiplied by the average financial cost of each event, weighted by the expected efficacy of the AI system. For example: if a hospital has 100 high-cost dispensing errors per year, each costing $5k in waste and retreatment, and the pharmacy AI avoids 80% of them, the savings generated are $400k annually.",
    "content": "<h3>Turning Prevention into Value</h3><p><b>Loss Avoidance Formula:</b></p><p>$$\\text{Avoided Value} = (\\text{Event Freq.}) \\times (\\text{Cost per Event}) \\times (\\text{AI Efficacy Rate})$$</p><p>Add avoided risks to the direct return of the solution to obtain the comprehensive ROI. Remember: defensible ROI is auditable ROI, with explicit assumptions.</p>"
  },
  {
    "id": "slide_2_14",
    "title": "Integrated Case Study · Pharmacy Automation",
    "image": "/slides/slide_2_14.png",
    "block": "Block 2: Invisible ROI",
    "estimatedTime": "8 min",
    "notes": "<strong>Suggested Notes:</strong> Pharmacy automation is one of the most direct cases of comprehensive ROI, because each avoided dispensing error has financial and clinical value simultaneously. Robotic dispensers reduce human error, but the actual return depends on two factors: integration with legacy prescription systems, and the trust curve of the pharmacy staff. Technical benefits only turn into ROI when both are resolved.",
    "content": "<h3>Integrated Case: Pharmacy Automation</h3><p><b>The Case:</b> Robotic dispensing and predictive AI inventory management for high-cost drugs.</p><p><b>Visible benefit:</b> Reduction in waste due to batch expiration and inventory shrinkage.</p><p><b>Invisible risk:</b> Operational resistance from pharmacists to the new electronic verification workflow.</p>"
  },
  {
    "id": "slide_2_15",
    "title": "Pharmacy Case Study · How Prevention Turns into ROI",
    "image": "/slides/slide_2_15.png",
    "block": "Block 2: Invisible ROI",
    "estimatedTime": "8 min",
    "notes": "<strong>Suggested Notes:</strong> This slide visually summarizes the pharmacy workflow where prevention turns into ROI. On the left, automation with electronic dispensers guarantees secure storage, control, and auditable dispensing. On the right, computerized traceability reduces rework and expiration losses.",
    "content": "<h3>Integrated Case: How Prevention turns into ROI</h3><p>Value flowchart in hospital pharmacy:</p><ul><li><b>Electronic Dispenser:</b> Secure storage, correct and auditable dispensing, full traceability.</li><li><b>Computerized Traceability:</b> Identification, registration, integration, and audit reports.</li><li><b>Impact:</b> 47.9% reduction in expiration losses and 70% in emergency purchases.</li></ul>"
  },
  {
    "id": "slide_2_16",
    "title": "Dynamic · Comprehensive ROI Calculation",
    "image": "/slides/slide_2_16.png",
    "block": "Group Work",
    "estimatedTime": "40 min",
    "notes": "<strong>Suggested Notes:</strong> Time to work on the committee simulators. Access the portal in your groups. Use the comprehensive ROI simulator by entering the economic assumptions of your committee's scenario, evaluate the NPV in optimistic and stressed adoption scenarios, and submit the financial analysis.",
    "content": "<h3>Dynamic: Financial Simulation in Committees</h3><p>Practical Group Work: Access the ROI simulator in the portal, fill in the economic assumptions for CAPEX, OPEX, and risks, and submit the committee's viability analysis.</p><ol><li>Receive your committee's scenario</li><li>Calculate conventional ROI</li><li>Add invisible risks</li><li>Present the difference in real ROI</li></ol>"
  },
  {
    "id": "slide_2_17",
    "title": "Debrief · What Shifted the Result",
    "image": "/slides/slide_2_17.png",
    "block": "Case Study",
    "estimatedTime": "15 min",
    "notes": "<strong>Suggested Notes:</strong> Congratulations on your financial submissions. Group 4 concluded that the project is unfeasible in the realistic scenario due to high CAPEX and maintenance, while Group 1 justified the resilience of the payback even under low adoption. Let's debate these strategic conclusions.",
    "content": "<h3>Debrief: What altered the project's NPV?</h3><p>Comparative analysis of payback rates and NPV achieved in the simulators by each team under engagement stress scenarios.</p><p>Compare visible-only ROI with comprehensive ROI: the same solution changes its verdict when the invisible enters the equation.</p>"
  },
  {
    "id": "slide_2_18",
    "title": "Final Reflection",
    "image": "/slides/slide_2_18.png",
    "block": "Closing",
    "estimatedTime": "8 min",
    "isInteractive": true,
    "interactionType": "open_ended",
    "question": "Which financial or operational variable has become a priority in your feasibility analysis?",
    "notes": "<strong>Suggested Notes:</strong> Please respond in the panel, in one word: what do you now see that was previously invisible? It doesn't have to be sophisticated. It can be 'adoption', 'infrastructure', 'denial'. What matters is that, from today on, this term will appear in your head every time someone presents an ROI that is too good to be true.",
    "content": "<h3>Final Reflection</h3><p>Respond in the portal: In one word, what do you now see that was previously invisible?</p><p>Everyone's words will form a live word cloud.</p>"
  },
  {
    "id": "slide_2_19",
    "title": "Key Takeaways & Bridge to Class 3",
    "image": "/slides/slide_2_19.png",
    "block": "Closing",
    "estimatedTime": "5 min",
    "notes": "<strong>Suggested Notes:</strong> In summary, end-user clinical engagement is the critical variable of real ROI, and risk pricing must be transparently included in the budget spreadsheet. Prepare for the governance guidelines of Class 3.",
    "content": "<h3>Key Takeaways from Class 2</h3><ul><li>Observed ROI depends on the adoption rate of the clinical staff.</li><li>Loss Avoidance calculation financially quantifies healthcare safety.</li><li>The stress test defines the breaking point before committing capital.</li></ul><p>Data veto: choose the solution that data approves, not the one marketing sells.</p>"
  },
  {
    "id": "slide_2_20_ref",
    "title": "Class References & Sources",
    "image": "/slides/slide_2_20.png",
    "block": "Closing",
    "estimatedTime": "2 min",
    "notes": "<strong>Suggested Notes:</strong> The bibliography for Block 2 of economic-financial modeling under risk is available in the portal. All academic links and national case studies are active for reference and citation in your final reports.",
    "content": "<h3>References & Sources</h3><ul><li>Google DermAssist: <a href=\"https://blog.google/technology/health/ai-dermatology-preview-io-2021\" target=\"_blank\">Google Blog (2021)</a> & <a href=\"https://www.wired.com/story/google-ai-skin-conditions-medical-device/\" target=\"_blank\">WIRED (2021)</a></li><li>Telemetry: <a href=\"https://www.correiobraziliense.com.br\" target=\"_blank\">UTI Sobradinho Regional Hospital (2026)</a></li><li>Dermatology AI: <a href=\"https://arxiv.org/abs/2106.07725\" target=\"_blank\">Skin Tone Disparities, arXiv (2021)</a></li><li>Pharmacy: <a href=\"https://www.ahrq.gov/health-it/tools-and-resources/costs-and-benefits-toolkit.html\" target=\"_blank\">JBES (2022) & RSD (2021)</a></li></ul>"
  }
]
  },
  {
    "id": "class3",
    "title": "Class 3: Decision Governance & Final Business Case",
    "date": "July 22, 2026",
    "description": "Master C-suite governance, the ROI-5 framework, and defend capital allocation recommendations to C-level executives.",
    "checkin": {
      "type": "wordcloud",
      "question": "In one word: What is the biggest barrier to approving digital health investments in your C-suite?"
    },
    "conceptCheck": [
      {
        "question": "What is the primary objective of the ROI-5 framework?",
        "options": [
          "To secure budget approval by structuring a comprehensive 5-dimension proposal",
          "To estimate the technical accuracy of deep learning models",
          "To calculate depreciation schedules"
        ],
        "correctAnswerIndex": 0
      },
      {
        "question": "In Mayo Clinic's EAGLE trial (AI ECG), what was the key finding regarding clinical adoption?",
        "options": [
          "Clinician usage was high because it integrated seamlessly into routine ECG screen flows",
          "Doctors rejected it completely due to poor UI",
          "The system was only used by administrative staff"
        ],
        "correctAnswerIndex": 0
      }
    ],
    "reflection": {
      "type": "open",
      "question": "How will you apply the ROI-5 framework in your next digital health proposal?"
    },
    "references": [
      {
        "citation": "Mayo Clinic EAGLE Trial (2022)",
        "url": "https://www.mayoclinic.org"
      }
    ],
    "slides": [
      {
        "id": "slide_3_1",
        "image": "/slides/slide_3_1.png",
        "title": "Governance & Capital Allocation",
        "block": "Introduction",
        "estimatedTime": "5 min",
        "notes": "<strong>Suggested Notes:</strong> Today we discuss C-suite governance. In health systems, resources are limited. We must pitch projects effectively using the ROI-5 framework to convince the CIO, CMO, and CFO.",
        "content": "<h3>C-Suite Decision Governance</h3><p>Convincing the C-Suite: How to align clinical outcomes with financial sustainability.</p>"
      },
      {
        "id": "slide_3_2",
        "image": "/slides/slide_3_2.png",
        "title": "The ROI-5 Framework",
        "block": "Block 1: Governance",
        "estimatedTime": "10 min",
        "notes": "<strong>Suggested Notes:</strong> The ROI-5 framework addresses 5 critical C-suite dimensions: Clinical impact, Operational workflow, Technical integration, Financial return, and Regulatory compliance.",
        "content": "<h3>The ROI-5 Framework</h3><p>Construct your C-suite proposal addressing these five pillars:</p><ol><li><b>Clinical Quality:</b> Patient outcomes, safety.</li><li><b>Operational Flow:</b> Staff productivity, clinician burnout.</li><li><b>Technical Feasibility:</b> Interoperability, EHR integration.</li><li><b>Financial Return:</b> CAPEX/OPEX, Payback, Loss Avoidance.</li><li><b>Compliance/Regulatory:</b> HIPAA, FDA, liability exposure.</li></ol>"
      },
      {
        "id": "slide_3_3",
        "title": "Mayo Clinic's EAGLE Trial (AI-ECG)",
        "block": "Block 2: Case Study",
        "estimatedTime": "15 min",
        "notes": "<strong>Suggested Notes:</strong> Mayo Clinic's EAGLE trial analyzed an AI model detecting low ejection fraction from standard ECGs. By integrating the AI alert directly into the clinical workflow, they achieved high clinician adoption and improved early detection.",
        "content": "<h3>Mayo Clinic's EAGLE Trial (AI-ECG)</h3><p><b>Context:</b> AI tool scanning standard ECGs to identify low ejection fraction (heart failure risk).</p><p><b>Success Factor:</b> Integration into daily screening workflows, demonstrating high physician adoption and clinical utility.</p>"
      },
      {
        "id": "slide_3_4",
        "title": "Speaking the Language of the CFO",
        "block": "Block 1: Business Language",
        "estimatedTime": "6 min",
        "notes": "<strong>Suggested Notes:</strong> CFOs care about cash flow, not technical model metrics like F1-scores. Focus on objectivity, defensible assumptions, and risk mitigation. Frame the return in terms of bed-days saved or avoided claims.",
        "content": "<h3>Speaking the Language of the CFO</h3><p><b>Objectivity:</b> Avoid technical AI jargon. Focus on OPEX reduction, ICU length of stay, and billing denials.</p><p><b>Defensible Assumptions:</b> Every projected benefit must be backed by evidence from similar historical implementations.</p>"
      },
      {
        "id": "slide_3_5",
        "title": "From Marketing to Mathematical Proof",
        "block": "Block 1: Business Language",
        "estimatedTime": "10 min",
        "notes": "<strong>Suggested Notes:</strong> To secure approval, move the board from marketing hype to mathematical proof. Define the bottleneck, quantify the current baseline loss, map the AI's impact, calculate the Risk Cost, and run stress testing.",
        "content": "<h3>From Marketing to Proof</h3><p>The logical path to C-suite investment approval:</p><ol><li><b>Bottleneck Definition:</b> What clinical or operational flow is broken?</li><li><b>Baseline Cost:</b> How much does this bottleneck cost the system today?</li><li><b>Proposed Redesign:</b> How does the AI tool restructure the workflow?</li><li><b>Risk Cost Pricing:</b> What is the priced cost of technical/operational risks?</li><li><b>Stress Feasibility:</b> Does the NPV remain positive under pessimistic stress?</li></ol>"
      },
      {
        "id": "slide_3_5_pic",
        "title": "The Logical Structure of the Argument",
        "block": "Block 1: Business Language",
        "estimatedTime": "5 min",
        "notes": "<strong>Suggested Notes:</strong> Think of this flow as the skeleton of your business case. Jumping straight to the ROI sensitivity without establishing the baseline bottleneck destroys the credibility of your proposal.",
        "content": "<h3>The Logical Structure of the Argument</h3><p>Decision sustainability chain: Bottleneck &rarr; Baseline Loss &rarr; Redesigned Workflow &rarr; Priced Risk &rarr; Stressed Return.</p>"
      },
      {
        "id": "slide_3_6",
        "title": "International Case: Mayo Clinic AI-ECG (EAGLE)",
        "block": "Case Study",
        "estimatedTime": "15 min",
        "notes": "<strong>Suggested Notes:</strong> Mayo Clinic's EAGLE trial analyzed an AI model detecting low ejection fraction from standard ECGs. By integrating the AI alert directly into the clinical workflow, they achieved high clinician adoption and improved early detection.",
        "content": "<h3>Mayo Clinic's EAGLE Trial (AI-ECG)</h3><p><b>Context:</b> AI tool scanning standard ECGs to identify low ejection fraction (heart failure risk).</p><p><b>Success Factor:</b> Integration into daily screening workflows, demonstrating high physician adoption and clinical utility.</p>"
      },
      {
        "id": "slide_3_7",
        "title": "Which Argument Convinces Your CFO?",
        "block": "Block 1: Business Language",
        "estimatedTime": "8 min",
        "isInteractive": true,
        "interactionType": "wordcloud",
        "question": "Share in the portal the most persuasive clinical or financial argument for investment approval.",
        "notes": "<strong>Suggested Notes:</strong> Submit one sentence that would convince your CFO to approve a digital health investment. The class will upvote the strongest arguments.",
        "content": "<h3>Which argument convinces your CFO?</h3><p>Share in the portal the most persuasive clinical or financial argument for investment approval.</p>"
      },
      {
        "id": "slide_3_8",
        "title": "Clinical AI in Action: US Clinical Equivalents",
        "block": "Case Study",
        "estimatedTime": "12 min",
        "notes": "<strong>Suggested Notes:</strong> Let's look at clinical AI implementations. In sepsis detection, automated alerts reduce time-to-treatment. In documentation, ambient AI (like Nuance DAX) reduces clinical documentation hours, returning clinical time to patients.",
        "content": "<h3>Clinical AI in Action</h3><p><b>Predictive Sepsis Alerts:</b> Automated early alerts reduce time-to-antibiotics, saving lives and ICU bed-days.</p><p><b>Ambient AI Documentation (Nuance DAX):</b> Reduces clinical charting time by up to 50%, mitigating physician burnout.</p>"
      },
      {
        "id": "slide_3_9",
        "title": "Quick Reading: Clinical AI Integration Cases",
        "block": "Case Study",
        "estimatedTime": "5 min",
        "notes": "<strong>Suggested Notes:</strong> Read the case summaries for clinical documentation and predictive sepsis detection. Note how hours saved and bed-days prevented translate into financial value.",
        "content": "<h3>Quick Reading: Clinical AI Cases</h3><p>Review and discuss operational metrics, physician adoption, and billing impacts of clinical documentation AI and predictive alerts in US hospitals.</p>"
      },
      {
        "id": "slide_3_9_dyn",
        "title": "Interactive: Translating Clinical Outcomes",
        "block": "Case Study",
        "estimatedTime": "8 min",
        "isInteractive": true,
        "interactionType": "poll",
        "question": "In your business case defense, which indicator holds the most weight with the CFO?",
        "notes": "<strong>Suggested Notes:</strong> Vote: when presenting to the CFO, which value dimension is most persuasive? ICU bed-day reduction, surgical throughput increase, or compliance/HIPAA risk mitigation? Tip: direct cost savings (bed-days) are easiest to audit.",
        "content": "<h3>Interactive: Translating Clinical Outcomes</h3><p>Vote in the live enquete regarding executive persuasion under budget constraints.</p>",
        "options": [
          "Direct cost reduction (e.g., ICU bed-days saved, length of stay reduction)",
          "Revenue generation (e.g., surgical throughput optimization, case-mix index increase)",
          "Regulatory penalty avoidance (e.g., HIPAA fines prevented, CMS penalties avoided)"
        ]
      },
      {
        "id": "slide_3_10",
        "title": "Beyond the Nominal Price",
        "block": "Block 2: Decision Matrix",
        "estimatedTime": "8 min",
        "notes": "<strong>Suggested Notes:</strong> The cheapest option can become the most expensive over 3 years if it causes integration delays or user rejection. A Weighted Decision Matrix protects against nominal price bias by pricing TCO.",
        "content": "<h3>Beyond the Nominal Price</h3><p>The cheapest software (nominal price) can yield the highest Total Cost of Ownership (TCO) due to poor API integration and clinician resistance.</p><p>A Weighted Decision Matrix ensures objective vendor selection.</p>"
      },
      {
        "id": "slide_3_11",
        "title": "Building a Weighted Decision Matrix",
        "block": "Block 2: Decision Matrix",
        "estimatedTime": "10 min",
        "notes": "<strong>Suggested Notes:</strong> Establish the criteria and weights of the decision matrix before scoring vendor proposals. This prevents selection bias and secures technical alignment.",
        "content": "<h3>Building a Weighted Decision Matrix</h3><p><b>Governance Rule:</b> Define criteria and weight values <i>before</i> evaluating market vendor proposals.</p><p>Eliminates confirmation bias and emotional choices.</p>"
      },
      {
        "id": "slide_3_12",
        "title": "How to Calculate the Weighted Score",
        "block": "Block 2: Decision Matrix",
        "estimatedTime": "8 min",
        "notes": "<strong>Suggested Notes:</strong> To calculate: define criteria (TCO, risk, usability), assign weights (sum to 100%), score vendors 1-5, and sum the weight × score products. The highest weighted score wins.",
        "content": "<h3>How to Calculate the Weighted Score</h3><p>Methodology steps:</p><ol><li>Define criteria (TCO, risk profile, usability, SLA support).</li><li>Assign weights (totaling 100%).</li><li>Score vendors (scale 1 to 5).</li><li>Sum the (score &times; weight) products to find the technical winner.</li></ol>"
      },
      {
        "id": "slide_3_13",
        "title": "Governance in Health Innovation",
        "block": "Block 2: Decision Matrix",
        "estimatedTime": "10 min",
        "notes": "<strong>Suggested Notes:</strong> Governance is institutional protection. It requires transparent criteria, auditability of scores, and documentation that justifies vendor selection to board auditors.",
        "content": "<h3>Innovation Governance</h3><p>Ensure explicit and auditable vendor selection:</p><ul><li><b>Transparency:</b> Documented mathematical justification for choice.</li><li><b>Auditability:</b> Traceability of scores assigned by the technical review committee.</li><li><b>Legal Safety:</b> Solid audit trail defending the purchase to the board.</li></ul>"
      },
      {
        "id": "slide_3_14",
        "title": "Choose the Winning Solution",
        "block": "Block 2: Decision Matrix",
        "estimatedTime": "8 min",
        "isInteractive": true,
        "interactionType": "poll",
        "question": "Based on the technical scores, which vendor should be contracted?",
        "notes": "<strong>Suggested Notes:</strong> Vote: based on the weighted scores on the board, which vendor wins? Correct answer: Vendor B (moderate price, high usability, strong SLA). Vendor A is cheap but has high risk; Vendor C is safe but too expensive.",
        "content": "<h3>Choose the Winning Solution</h3><p>Vote in the live enquete based on the technical scores calculated by the committee.</p>",
        "options": [
          "Vendor A (Low initial price, high regulatory/accuracy risk)",
          "Vendor B (Moderate price, high usability, and robust SLA support)",
          "Vendor C (High initial price, excellent compliance, and full risk mitigation)"
        ]
      },
      {
        "id": "slide_3_14_a",
        "title": "Executive Committee: Would You Approve This Investment?",
        "block": "Block 2: Decision Matrix",
        "estimatedTime": "15 min",
        "isInteractive": true,
        "interactionType": "poll",
        "question": "As the board, would you approve this investment: GO or NO-GO?",
        "notes": "<strong>Suggested Notes:</strong> As the board, would you approve this $5M project with 32% expected ROI but high risk? Answer: Under strict governance, it's a NO-GO due to low physician buy-in. A GO requires a risk-sharing contract with the vendor.",
        "content": "<h3>Executive Committee Decision</h3><p><b>Investment:</b> $5,000,000 | <b>Expected ROI:</b> 32% | <b>Payback:</b> 4 years</p><p><b>Additional Risks:</b> Low projected physician adoption, complex legacy integrations, new vendor with no similar reference sites.</p><p>Command: \"Apply the ROI-5 framework to decide: GO or NO-GO, and defend your recommendation in 90 seconds.\"</p>",
        "options": [
          "GO (Approve investment with structured workflow mitigation plans)",
          "NO-GO (Reject investment due to high adoption and integration risks)"
        ]
      },
      {
        "id": "slide_3_15",
        "title": "Final Project Rubric & Guidelines",
        "block": "Group Work",
        "estimatedTime": "10 min",
        "notes": "<strong>Suggested Notes:</strong> Your Final Project (Executive Business Case) represents 35% of your grade. A top-tier business case needs defensible assumptions, priced risk costs, and a clear GO/NO-GO recommendation.",
        "content": "<h3>Final Project: Executive Business Case</h3><p><b>Weight:</b> 35% of final grade | Minimum passing grade: 7.0/10.</p><p>Evaluation criteria:</p><ol><li>Rigor analítico na simulação do simulador.</li><li>Comprehensive risk mapping across the 4 categories.</li><li>Defensibility of assumptions (Loss Avoidance/TCO) and clear recommendation.</li></ol>"
      },
      {
        "id": "slide_3_15_b",
        "title": "The ROI-5 Framework: 5 Questions Before the GO",
        "block": "Group Work",
        "estimatedTime": "10 min",
        "notes": "<strong>Suggested Notes:</strong> The ROI-5 framework: 5 questions before approving any AI investment: 1. Strategic fit? 2. Monetizable benefits? 3. Quantified risk cost? 4. Operational adoption? 5. Positive stressed ROI? If all 5 pass, it's a GO.",
        "content": "<h3>The ROI-5 Framework</h3><p>Five questions to answer before approving any healthcare AI investment:</p><ol><li><b>Does it solve a relevant bottleneck?</b> (Strategic alignment)</li><li><b>Can benefits be monetized?</b> (Financial monetization)</li><li><b>Have risks been priced?</b> (Risk cost calculation)</li><li><b>Can the organization adopt it?</b> (Adoption rate multiplier)</li><li><b>Does the ROI remain positive under stress?</b> (Stress resiliency)</li></ol>"
      },
      {
        "id": "slide_3_16",
        "title": "Final Project Workshop: Business Case Development",
        "block": "Group Work",
        "estimatedTime": "20 min",
        "notes": "<strong>Suggested Notes:</strong> Use the next minutes to work with your team on the Final Project template. Outline the problem, the baseline loss, the AI redesign, and calculate the stressed ROI.",
        "content": "<h3>Executive Business Case Workshop</h3><p>Command: Work with your team on the final template. Build your GO/NO-GO case, applying TCO, Loss Avoidance, and the 4-dimension risk framework.</p>"
      },
      {
        "id": "slide_3_17",
        "title": "Team Consultation Session",
        "block": "Group Work",
        "estimatedTime": "15 min",
        "notes": "<strong>Suggested Notes:</strong> This is live consulting. Submit your specific modeling and risk questions in the portal; I will visit each group to help refine your cases.",
        "content": "<h3>Team Consultation Session</h3><p>Use this time to submit financial modeling and risk pricing questions to the instructor in the portal.</p>"
      },
      {
        "id": "slide_3_18",
        "title": "Final Reflection · Course Closure",
        "block": "Closing",
        "estimatedTime": "8 min",
        "isInteractive": true,
        "interactionType": "wordcloud",
        "question": "As a guardian of viability, what professional commitment do you make?",
        "notes": "<strong>Suggested Notes:</strong> To complete your interactive activities, submit your final reflection: 'As a guardian of viability, my commitment from today is...'",
        "content": "<h3>Final Course Reflection</h3><p>Respond in the portal: As a guardian of viability, what professional commitment do you make to guide digital health governance?</p>"
      },
      {
        "id": "slide_3_19",
        "title": "Course Synthesis & Next Steps",
        "block": "Closing",
        "estimatedTime": "5 min",
        "notes": "<strong>Suggested Notes:</strong> Summary of our journey: we learned to expose downstream bottlenecks, model ROI based on adoption, and build board-ready business cases. Listen to the final podcast episode.",
        "content": "<h3>Course Synthesis: The 3 Pillars</h3><ol><li><b>See the Unseen:</b> Hidden risks exceed apparent ones. Bottlenecks shift rather than disappear. Simulation is mandatory.</li><li><b>Quantify the Invisible:</b> Adoption dictates realized return. Prevented adverse events save hard dollars (Loss Avoidance).</li><li><b>Defend with Evidence:</b> C-suite approval requires a business-aligned proposal: Weighted Decision Matrices and 2-page cases.</li></ol>"
      },
      {
        "id": "slide_3_20",
        "title": "Course Mantra",
        "block": "Closing",
        "estimatedTime": "5 min",
        "notes": "<strong>Suggested Notes:</strong> I leave you with our core guide: data-driven leadership means having the courage to invest in what works, not just what is trendy.",
        "content": "<h3>Course Mantra</h3><p><i>\"Making data-driven decisions means having the courage to choose what works, not just what is trending in the market.\"</i></p>"
      },
      {
        "id": "slide_3_21_ref",
        "title": "Class References & Sources",
        "block": "Closing",
        "estimatedTime": "2 min",
        "notes": "<strong>Suggested Notes:</strong> Governance references and case studies are organized in the References tab for your permanent use. Good luck on the final deliverables.",
        "content": "<h3>Class References & Sources</h3><p>Mayo Clinic EAGLE Trial (AI-ECG)</p><p>Sepsis & Ambient AI Documentation Integration Case Studies</p>"
      },
      {
        "id": "slide_3_22",
        "title": "Guardians of Viability",
        "block": "Closing",
        "estimatedTime": "2 min",
        "notes": "<strong>Suggested Notes:</strong> Congratulations! You are now equipped to lead technology investment reviews with clinical, operational, and mathematical excellence. Success on your projects!",
        "content": "<h3>Congratulations to the new Guardians of Viability!</h3><p>You leave this course ready to see the unseen, quantify the invisible, and defend digital health investments with mathematical rigor.</p>"
      }
    ]
  }
];

// Helper functions (readData/writeData) exactly matching the backend DB
function readData() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initialDb = {
        activeState: { classId: "class1", slideId: "slide_1_1", syncEnabled: true, activeTab: "checkin", revealAnswers: false, timerEnd: null },
        submissions: { class1: {}, class2: {}, class3: {} },
        comments: { class1: {}, class2: {}, class3: {} },
        checkinResponses: { class1: {}, class2: {}, class3: {} },
        slideInteractions: { class1: {}, class2: {}, class3: {} },
        conceptCheckResponses: { class1: {}, class2: {}, class3: {} },
        reflections: { class1: {}, class2: {}, class3: {} },
        whiteboardHistory: { class1: [], class2: [], class3: [] }
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf-8');
      return initialDb;
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    return parsed;
  } catch (err) {
    console.error("Error reading database file:", err);
    return {};
  }
}

function writeData(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error("Error writing database file:", err);
  }
}

function getState() {
  const db = readData();
  return db.activeState;
}

function updateState(updates) {
  const db = readData();
  db.activeState = { ...db.activeState, ...updates };
  writeData(db);
  return db.activeState;
}

function getSubmissions(classId) {
  const db = readData();
  return db.submissions[classId] || {};
}

function getSubmission(classId, groupId, studentEmail) {
  const db = readData();
  const groupSubmissions = (db.submissions[classId] || {})[groupId] || {};
  if (studentEmail && studentEmail.toLowerCase().trim() === 'professor') {
    return groupSubmissions;
  }
  if (studentEmail) {
    return groupSubmissions[studentEmail] || null;
  }
  const keys = Object.keys(groupSubmissions);
  return keys.length > 0 ? groupSubmissions[keys[0]] : null;
}

function saveSubmission(classId, groupId, studentEmail, submissionData, submittedBy) {
  const db = readData();
  if (!db.submissions[classId]) db.submissions[classId] = {};
  if (!db.submissions[classId][groupId]) db.submissions[classId][groupId] = {};
  
  const emailKey = studentEmail || "anonymous";
  db.submissions[classId][groupId][emailKey] = {
    ...submissionData,
    submittedBy: submittedBy || "Team Student",
    submittedAt: new Date().toISOString()
  };
  
  writeData(db);
  return db.submissions[classId][groupId][emailKey];
}

function getComments(classId, groupId, studentEmail) {
  const db = readData();
  const classComments = db.comments[classId] || {};
  const groupComments = classComments[groupId] || {};
  
  if (studentEmail) {
    return groupComments[studentEmail] || [];
  }
  const keys = Object.keys(groupComments);
  return keys.length > 0 ? groupComments[keys[0]] : [];
}

function saveComment(classId, groupId, studentEmail, text, grade) {
  const db = readData();
  if (!db.comments[classId]) db.comments[classId] = {};
  if (!db.comments[classId][groupId]) db.comments[classId][groupId] = {};
  
  const emailKey = studentEmail || "anonymous";
  if (!db.comments[classId][groupId][emailKey]) {
    db.comments[classId][groupId][emailKey] = [];
  }
  const newComment = {
    text,
    grade: grade || null,
    timestamp: new Date().toISOString()
  };
  db.comments[classId][groupId][emailKey].push(newComment);
  
  writeData(db);
  return db.comments[classId][groupId][emailKey];
}

function getCheckins(classId) {
  const db = readData();
  return db.checkinResponses[classId] || {};
}

function saveCheckinResponse(classId, userEmail, text) {
  const db = readData();
  if (!db.checkinResponses[classId]) db.checkinResponses[classId] = {};
  
  const formattedEmail = userEmail.toLowerCase().trim();
  const student = students.find(s => s.email.toLowerCase().trim() === formattedEmail);
  const studentName = student ? student.name : "Visitor Student";
  const group = student ? student.group : "Visitor";
  
  db.checkinResponses[classId][formattedEmail] = {
    text: text.trim(),
    studentName,
    group,
    likes: 0,
    likedBy: [],
    timestamp: new Date().toISOString()
  };
  
  writeData(db);
  return db.checkinResponses[classId][formattedEmail];
}

function getSlideInteractions(classId, slideId) {
  const db = readData();
  const classInt = db.slideInteractions[classId] || {};
  return classInt[slideId] || {};
}

function saveSlideInteraction(classId, slideId, userEmail, value) {
  const db = readData();
  if (!db.slideInteractions[classId]) db.slideInteractions[classId] = {};
  if (!db.slideInteractions[classId][slideId]) db.slideInteractions[classId][slideId] = {};
  
  const formattedEmail = userEmail.toLowerCase().trim();
  const student = students.find(s => s.email.toLowerCase().trim() === formattedEmail);
  const studentName = student ? student.name : "Visitor Student";
  const group = student ? student.group : "Visitor";
  
  db.slideInteractions[classId][slideId][formattedEmail] = {
    value: value.trim(),
    studentName,
    group,
    likes: 0,
    likedBy: [],
    timestamp: new Date().toISOString()
  };
  
  writeData(db);
  return db.slideInteractions[classId][slideId][formattedEmail];
}

function likeSlideInteraction(classId, slideId, responseId, userEmail) {
  const db = readData();
  const formattedEmail = userEmail.toLowerCase().trim();
  const classInt = db.slideInteractions[classId] || {};
  const slideInt = classInt[slideId] || {};
  
  if (slideInt[responseId]) {
    const resp = slideInt[responseId];
    if (!resp.likedBy) resp.likedBy = [];
    
    if (resp.likedBy.includes(formattedEmail)) {
      resp.likedBy = resp.likedBy.filter(email => email !== formattedEmail);
      resp.likes = Math.max(0, resp.likes - 1);
    } else {
      resp.likedBy.push(formattedEmail);
      resp.likes += 1;
    }
    
    writeData(db);
    return resp;
  }
  return null;
}

function likeCheckinWord(classId, word, userEmail) {
  const db = readData();
  const formattedEmail = userEmail.toLowerCase().trim();
  const responses = db.checkinResponses[classId] || {};
  
  Object.values(responses).forEach(resp => {
    if (resp.text.toLowerCase().trim() === word.toLowerCase().trim()) {
      if (!resp.likedBy) resp.likedBy = [];
      if (resp.likedBy.includes(formattedEmail)) {
        resp.likedBy = resp.likedBy.filter(email => email !== formattedEmail);
        resp.likes = Math.max(0, resp.likes - 1);
      } else {
        resp.likedBy.push(formattedEmail);
        resp.likes += 1;
      }
    }
  });
  
  writeData(db);
  return responses;
}

function likeSlideInteractionWord(classId, slideId, word, userEmail) {
  const db = readData();
  const formattedEmail = userEmail.toLowerCase().trim();
  const interactions = db.slideInteractions[classId]?.[slideId] || {};
  
  Object.values(interactions).forEach(resp => {
    if (resp.value.toLowerCase().trim() === word.toLowerCase().trim()) {
      if (!resp.likedBy) resp.likedBy = [];
      if (resp.likedBy.includes(formattedEmail)) {
        resp.likedBy = resp.likedBy.filter(email => email !== formattedEmail);
        resp.likes = Math.max(0, resp.likes - 1);
      } else {
        resp.likedBy.push(formattedEmail);
        resp.likes += 1;
      }
    }
  });
  
  writeData(db);
  return interactions;
}

function toggleHideSlideInteraction(classId, slideId, responseId) {
  const db = readData();
  const resp = db.slideInteractions[classId]?.[slideId]?.[responseId];
  if (resp) {
    resp.hidden = !resp.hidden;
    writeData(db);
    return resp;
  }
  return null;
}

function toggleHighlightSlideInteraction(classId, slideId, responseId) {
  const db = readData();
  const resp = db.slideInteractions[classId]?.[slideId]?.[responseId];
  if (resp) {
    resp.highlighted = !resp.highlighted;
    writeData(db);
    return resp;
  }
  return null;
}

function togglePinSlideInteraction(classId, slideId, responseId) {
  const db = readData();
  const resp = db.slideInteractions[classId]?.[slideId]?.[responseId];
  if (resp) {
    resp.pinned = !resp.pinned;
    writeData(db);
    return resp;
  }
  return null;
}

function deleteSlideInteraction(classId, slideId, responseId) {
  const db = readData();
  if (db.slideInteractions[classId]?.[slideId]?.[responseId]) {
    delete db.slideInteractions[classId][slideId][responseId];
    writeData(db);
    return true;
  }
  return false;
}

function deleteCheckinResponse(classId, userEmail) {
  const db = readData();
  if (db.checkinResponses[classId]?.[userEmail]) {
    delete db.checkinResponses[classId][userEmail];
    writeData(db);
    return true;
  }
  return false;
}

function getConceptChecks(classId) {
  const db = readData();
  return db.conceptCheckResponses[classId] || {};
}

function saveConceptCheckResponse(classId, userEmail, score, answers) {
  const db = readData();
  if (!db.conceptCheckResponses[classId]) db.conceptCheckResponses[classId] = {};
  
  const formattedEmail = userEmail.toLowerCase().trim();
  const student = students.find(s => s.email.toLowerCase().trim() === formattedEmail);
  const studentName = student ? student.name : "Visitor Student";
  const group = student ? student.group : "Visitor";
  
  db.conceptCheckResponses[classId][formattedEmail] = {
    score,
    answers,
    studentName,
    group,
    timestamp: new Date().toISOString()
  };
  
  writeData(db);
  return db.conceptCheckResponses[classId][formattedEmail];
}

function getReflections(classId) {
  const db = readData();
  return db.reflections[classId] || {};
}

function saveReflection(classId, userEmail, text) {
  const db = readData();
  if (!db.reflections[classId]) db.reflections[classId] = {};
  
  const formattedEmail = userEmail.toLowerCase().trim();
  const student = students.find(s => s.email.toLowerCase().trim() === formattedEmail);
  const studentName = student ? student.name : "Visitor Student";
  const group = student ? student.group : "Visitor";
  
  db.reflections[classId][formattedEmail] = {
    text: text.trim(),
    studentName,
    group,
    timestamp: new Date().toISOString()
  };
  
  writeData(db);
  return db.reflections[classId][formattedEmail];
}

function getWhiteboardHistory(classId) {
  const db = readData();
  return db.whiteboardHistory[classId] || [];
}

function addWhiteboardAction(classId, drawData) {
  const db = readData();
  if (!db.whiteboardHistory[classId]) db.whiteboardHistory[classId] = [];
  db.whiteboardHistory[classId].push(drawData);
  writeData(db);
  return db.whiteboardHistory[classId];
}

function clearWhiteboardHistory(classId) {
  const db = readData();
  db.whiteboardHistory[classId] = [];
  writeData(db);
  return [];
}

module.exports = {
  students,
  scenarios,
  classesContent,
  getState,
  updateState,
  getSubmissions,
  getSubmission,
  saveSubmission,
  getComments,
  saveComment,
  getCheckins,
  saveCheckinResponse,
  deleteCheckinResponse,
  getSlideInteractions,
  saveSlideInteraction,
  likeSlideInteraction,
  likeCheckinWord,
  likeSlideInteractionWord,
  toggleHideSlideInteraction,
  toggleHighlightSlideInteraction,
  togglePinSlideInteraction,
  deleteSlideInteraction,
  getConceptChecks,
  saveConceptCheckResponse,
  getReflections,
  saveReflection,
  getWhiteboardHistory,
  addWhiteboardAction,
  clearWhiteboardHistory
};

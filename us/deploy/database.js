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
        "image": "/slides/slide_2_1.png",
        "title": "Simulation & Stress Testing",
        "block": "Introduction",
        "estimatedTime": "5 min",
        "notes": "<strong>Suggested Notes:</strong> Today we will focus on simulation and stress testing. A commercial proposal shows a stable, ideal state. We must stress test this proposal using realistic clinical variables and clinician adoption rates.",
        "content": "<h3>Operational Simulation & ROI Stress Testing</h3><p>Moving from ideal business plans to stressed financial models in health systems.</p>"
      },
      {
        "id": "slide_2_2",
        "image": "/slides/slide_2_2.png",
        "title": "The Adoption Equation",
        "block": "Block 1: ROI Modeling",
        "estimatedTime": "8 min",
        "notes": "<strong>Suggested Notes:</strong> The fundamental rule of digital health ROI: Realized ROI is Expected ROI multiplied by the clinician adoption rate. If doctors only use the ambient AI tool 50% of the time, you only realize 50% of the ROI.",
        "content": "<h3>The Adoption Equation</h3><p>$$\\text{Realized ROI} = \\text{Expected ROI} \\times \\text{Adoption Rate}$$</p><p>A tool with 100% theoretical ROI and 20% clinical adoption yields a 20% return. Clinician friction is a direct financial cost.</p>"
      },
      {
        "id": "slide_2_3",
        "title": "Check-in: The Bottleneck",
        "block": "Opening",
        "estimatedTime": "5 min",
        "notes": "<strong>Suggested Notes:</strong> Let's run our check-in. In your experience, what is the biggest operational bottleneck when introducing a new clinical application?",
        "content": "<h3>Check-in: The Bottleneck</h3><p>What is the biggest operational hurdle when deploying a new clinical software?</p>"
      },
      {
        "id": "slide_2_3_a",
        "title": "How do Health Systems Calculate ROI?",
        "block": "Block 1: ROI Modeling",
        "estimatedTime": "6 min",
        "notes": "<strong>Suggested Notes:</strong> Before we look at the math, where does it come from? It's the international standard for health IT evaluation, formal-ized by the AHRQ. We calculate ROI, Payback, NPV, and IRR, and run sensitivity analyses to stress-test our premises.",
        "content": "<h3>How do Health Systems Calculate ROI?</h3><p>Based on the international standard AHRQ Health IT Costs and Benefits Toolkit.</p><p>Formula: ROI = (Financial Benefits − Investment) ÷ Investment</p><p>Supported by 4 key metrics: Payback Period, NPV (Net Present Value), IRR (Internal Rate of Return), and Sensitivity Analysis.</p>"
      },
      {
        "id": "slide_2_3_b",
        "title": "Financial ROI vs. Strategic Benefits",
        "block": "Block 1: ROI Modeling",
        "estimatedTime": "5 min",
        "notes": "<strong>Suggested Notes:</strong> Don't mix clinical quality or patient satisfaction directly into the ROI formula. Keep them in two columns. Financial column for hard savings/revenue; Strategic column for quality, experience, and compliance.",
        "content": "<h3>Financial ROI + Strategic Benefits</h3><p><b>Financial Benefits (enter the ROI formula):</b> cost reductions, revenue gains, staff productivity.</p><p><b>Strategic Benefits (inform the decision, but stay out of the formula):</b> patient safety, physician burnout reduction, brand reputation, compliance.</p>"
      },
      {
        "id": "slide_2_3_c",
        "title": "What enters the ROI? The Monetization Matrix",
        "block": "Block 1: ROI Modeling",
        "estimatedTime": "5 min",
        "notes": "<strong>Suggested Notes:</strong> We separate what directly enters the ROI numerator from what stays out. Indirect benefits like physician burnout reduction can be monetized indirectly via clinical staff turnover costs (recruiting and retraining).",
        "content": "<h3>What enters the ROI?</h3><p><b>Direct Savings:</b> Supply waste reduction, beds freed, claims denials prevented.</p><p><b>Indirect Monetization:</b> Staff burnout reduced (measured as lower turnover costs), clinical errors prevented (measured as avoided malpractice payouts).</p>"
      },
      {
        "id": "slide_2_4",
        "title": "Risk Assessment as Institutional Defense",
        "block": "Block 1: ROI Modeling",
        "estimatedTime": "8 min",
        "notes": "<strong>Suggested Notes:</strong> Risk mapping is not just about identifying threats; it's a financial defense. We calculate the Risk Cost: (probability) × (impact) × (mitigation coefficient). This converts uncertainty into a clear line item on the spreadsheet.",
        "content": "<h3>Risk Cost Calculation</h3><p>$$\\text{Risk Cost} = \\text{Probability} \\times \\text{Financial Impact} \\times (1 - \\text{Mitigation Effectiveness})$$</p><p>Risk Cost acts as a discount factor on expected benefits. Unmitigated risks directly erode the financial return."
      },
      {
        "id": "slide_2_5",
        "image": "/slides/slide_2_5.png",
        "title": "What is a Financial Stress Test?",
        "block": "Block 1: ROI Modeling",
        "estimatedTime": "6 min",
        "notes": "<strong>Suggested Notes:</strong> A stress test evaluates how the project's financial feasibility behaves under degraded conditions. We never model a single scenario. We stress test the variables that the vendor assumes are ideal.",
        "content": "<h3>Financial Stress Testing</h3><p>Modeling financial feasibility under degraded conditions.</p><p>Key stress variables: lower clinical adoption, extended integration timeline, higher implementation OPEX, and unexpected risk costs.</p>"
      },
      {
        "id": "slide_2_5_a",
        "title": "Which Assumption Most Influences the ROI?",
        "block": "Block 1: ROI Modeling",
        "estimatedTime": "8 min",
        "isInteractive": true,
        "interactionType": "poll",
        "question": "Which assumption is most volatile and has the highest sensitivity in health IT projects?",
        "notes": "<strong>Suggested Notes:</strong> Vote: in your experience, which assumption is most volatile and has the highest sensitivity in health IT projects? Clinical adoption rate, software license price, or hardware maintenance?",
        "content": "<h3>Which Assumption Most Influences the ROI?</h3><p>Vote in the live enquete regarding variable sensitivity in clinical software models.</p>",
        "options": [
          "Clinician adoption rate and daily usage",
          "Software license price and contract escalation",
          "Hardware maintenance and hosting costs"
        ]
      },
      {
        "id": "slide_2_5_b",
        "title": "ROI is not a Single Number. It is a Range.",
        "block": "Block 1: ROI Modeling",
        "estimatedTime": "6 min",
        "notes": "<strong>Suggested Notes:</strong> Never present a single ROI percentage. Present a range. Expected (90% adoption), Realistic (70% adoption), and Pessimistic (45% adoption + Risk Cost). The CFO wants to see that the project remains viable even under stress.",
        "content": "<h3>ROI is a Range, Not a Number</h3><p>Always present three scenarios to the C-suite:</p><ul><li><b>Expected:</b> High adoption, zero risk costs. (The sales pitch)</li><li><b>Realistic:</b> Average adoption, mitigated risks. (The baseline)</li><li><b>Pessimistic:</b> Low adoption, realized risk costs. (The stress test)</li></ul>"
      },
      {
        "id": "slide_2_5_c",
        "title": "Expected vs. Realized ROI: The Adoption Equation",
        "block": "Block 1: ROI Modeling",
        "estimatedTime": "8 min",
        "notes": "<strong>Suggested Notes:</strong> We formalize this mathematically. Realized ROI equals Expected ROI times the adoption rate. Adoption is not a qualitative metric; it is a multiplier of your financial return.",
        "content": "<h3>The Adoption Equation</h3><p>$$\\text{Realized ROI} = \\text{Expected ROI} \\times \\text{Adoption Rate}$$</p><p>Clinician adoption is a direct financial variable. If usage falls to 40%, 60% of the projected benefits vanish immediately."
      },
      {
        "id": "slide_2_5_d",
        "title": "Use, Compose ou Build: Qual Gera Mais ROI?",
        "block": "Block 1: ROI Modeling",
        "estimatedTime": "8 min",
        "isInteractive": true,
        "interactionType": "poll",
        "question": "Which architecture strategy yields the most sustainable ROI for a mid-sized health system?",
        "notes": "<strong>Suggested Notes:</strong> Vote: when selecting architecture, which strategy is more cost-effective? Use (buying commercial off-the-shelf), Compose (API-integrating multiple niche systems), or Build (developing custom in-house software)?",
        "content": "<h3>Use, Compose, or Build?</h3><p>Vote on the preferred architecture strategy for digital health integration.</p>",
        "options": [
          "Use: Buying commercial off-the-shelf (COTS) software (low setup, high licensing)",
          "Compose: Integrating niche API-based solutions (moderate cost, high integration overhead)",
          "Build: Custom in-house software development (high initial CAPEX, custom strategic value)"
        ]
      },
      {
        "id": "slide_2_5_stress_pic",
        "title": "Operational Stress Simulation",
        "block": "Block 1: ROI Modeling",
        "estimatedTime": "5 min",
        "notes": "<strong>Suggested Notes:</strong> Now let's open the simulator in the portal. We will plug in these variables and see how NPV, Payback, and ROI shift under stress.",
        "content": "<h3>Operational Stress Simulator</h3><p>Prepare to input parameters and run stress scenarios on the financial model.</p>"
      },
      {
        "id": "slide_2_6",
        "title": "Integrated Case: Wireless Bed Telemetry",
        "block": "Case Study",
        "estimatedTime": "15 min",
        "notes": "<strong>Suggested Notes:</strong> Let's review the telemetry case. Standard telemetry is expensive. Wireless patches promise to expand monitoring to general beds. However, without Wi-Fi network updates, signal dropouts trigger false alarms, causing nurse fatigue and liability risks.",
        "content": "<h3>Case: Wireless Cardiac Telemetry</h3><p>Expanding telemetry monitoring to general wards via wireless patches.</p><p><b>Operational Friction:</b> Poor Wi-Fi coverage leads to signal drops, generating false warning alerts, alarm fatigue, and patient safety risks.</p>"
      },
      {
        "id": "slide_2_7",
        "title": "Case Study: Google DermAssist",
        "block": "Case Study",
        "estimatedTime": "12 min",
        "notes": "<strong>Suggested Notes:</strong> Google DermAssist uses deep learning to identify skin conditions. However, validation trials revealed that accuracy dropped significantly on darker skin tones. Implementing it without accounting for local patient demographics introduces a major regulatory and clinical risk.",
        "content": "<h3>Case: Google DermAssist</h3><p>AI tool for skin conditions identification.</p><p><b>Failure Point:</b> Model validation revealed poor generalizability and bias on darker skin tones, creating immediate clinical and liability risks.</p>"
      },
      {
        "id": "slide_2_10",
        "title": "The Short-Term ROI Fallacy",
        "block": "Block 2: Invisible Risks",
        "estimatedTime": "8 min",
        "notes": "<strong>Suggested Notes:</strong> CFOs often demand a payback under 1 year. In clinical software, this is a trap. Accelerated timelines compromise training and integration, causing workflow rejection and negative long-term ROI.",
        "content": "<h3>The Short-Term ROI Fallacy</h3><p>Demanding a payback period under 1 year leads to rushed implementations, poor clinical training, and eventual system rejection.</p>"
      },
      {
        "id": "slide_2_11",
        "title": "Invisible Risks · Part 1",
        "block": "Block 2: Invisible Risks",
        "estimatedTime": "8 min",
        "notes": "<strong>Suggested Notes:</strong> We discuss two major invisible risks: data drift and API changes. A model that works perfectly today will degrade as patient demographics change or EHR vendor APIs update.",
        "content": "<h3>Invisible Risks: Data Drift & API Changes</h3><p><b>Data Drift:</b> AI model performance degrades over time as clinical practice patterns or patient populations change.</p><p><b>API Fragility:</b> EHR version upgrades can break AI integrations, requiring custom patch engineering.</p>"
      },
      {
        "id": "slide_2_12",
        "title": "Invisible Risks · Part 2",
        "block": "Block 2: Invisible Risks",
        "estimatedTime": "8 min",
        "notes": "<strong>Suggested Notes:</strong> The second set of invisible risks includes vendor lock-in and clinical liability. Replacing a deeply integrated system is incredibly expensive, and the hospital retains ultimate malpractice liability if the AI fails.",
        "content": "<h3>Invisible Risks: Lock-in & Liability</h3><p><b>Vendor Lock-in:</b> High cost of switching vendors once patient data is locked in a proprietary database.</p><p><b>Clinical Liability:</b> The health system, not the AI vendor, bears the legal burden for diagnostic errors.</p>"
      },
      {
        "id": "slide_2_13",
        "title": "Turning Prevention into Value",
        "block": "Block 2: Invisible Risks",
        "estimatedTime": "10 min",
        "notes": "<strong>Suggested Notes:</strong> How do you monetize prevention? We map the avoided cost of adverse events. For instance, preventing one ICU readmission saves $15,000. Under a capitated or value-based model, this is a direct financial benefit.",
        "content": "<h3>Monetizing Prevention (Loss Avoidance)</h3><p>Calculate the savings of prevented adverse events:</p><p>$$\\text{Savings} = \\text{Event Rate} \\times \\text{Cost per Event} \\times \\text{Reduction Rate}$$</p><p>In value-based care, avoiding readmissions is a core driver of financial health.</p>"
      },
      {
        "id": "slide_2_14",
        "title": "Case: Robotic Pharmacy Dispensing",
        "block": "Case Study",
        "estimatedTime": "10 min",
        "notes": "<strong>Suggested Notes:</strong> Robotic dispensing centralizes medication preparation, reducing errors. However, integration with old EHR prescription modules is highly complex. A mechanical pane paralyzes drug distribution, requiring emergency staff backups.",
        "content": "<h3>Case: Robotic Pharmacy Dispensing</h3><p>Automated robotic dispensing centrally units drug doses.</p><p><b>Technical Risk:</b> High integration complexity with legacy EHR databases.</p><p><b>Operational Risk:</b> Equipment failure paralyzes pharmacy output, requiring emergency backup staffing.</p>"
      },
      {
        "id": "slide_2_14_read",
        "title": "Quick Reading: Robotic Pharmacy in US Hospitals",
        "block": "Case Study",
        "estimatedTime": "5 min",
        "notes": "<strong>Suggested Notes:</strong> Read the study on robotic pharmacy integrations. Analyze the operational metrics and integration timelines before we begin the simulation.",
        "content": "<h3>Quick Reading: Robotic Pharmacy in the US</h3><p>Review and discuss integration challenges, TCO, and workflow re-engineering in automated hospital pharmacies.</p>"
      },
      {
        "id": "slide_2_14_dyn",
        "title": "Interactive: Inventory Bottlenecks on the Whiteboard",
        "block": "Case Study",
        "estimatedTime": "8 min",
        "notes": "<strong>Suggested Notes:</strong> Let's use the whiteboard to map how pharmacy robot delays propagate through nursing floors and delay patient discharges.",
        "content": "<h3>Inventory Bottlenecks</h3><p>The instructor will map the medication distribution workflow and locate points of failure on the board.</p>"
      },
      {
        "id": "slide_2_15",
        "title": "Recommended Reading: AHRQ Toolkit",
        "block": "Case Study",
        "estimatedTime": "5 min",
        "notes": "<strong>Suggested Notes:</strong> The AHRQ Toolkit provides structured guidelines and spreadsheets for health IT financial modeling. Review this toolkit to defend your final business case.",
        "content": "<h3>AHRQ Health IT ROI Toolkit</h3><p>Review the guidelines and spreadsheets provided by the Agency for Healthcare Research and Quality for clinical software evaluation.</p>"
      },
      {
        "id": "slide_2_16",
        "title": "Group Work: Comprehensive ROI Simulation",
        "block": "Group Work",
        "estimatedTime": "15 min",
        "notes": "<strong>Suggested Notes:</strong> Move to your groups. Open the Group Work tab and use the simulator to model your assigned scenario. Stress test the adoption rate and input your calculated Risk Costs.",
        "content": "<h3>Group Work: ROI Stress Testing</h3><p>Team project: open the simulator in the 'Group Work' tab, model your scenario under three adoption rates, and submit your ROI simulation.</p>"
      },
      {
        "id": "slide_2_17",
        "title": "Debrief: What Shifted the Result?",
        "block": "Case Study",
        "estimatedTime": "10 min",
        "notes": "<strong>Suggested Notes:</strong> Let's review the simulations. Most groups saw their ROI turn negative in the pessimistic scenario because they didn't mitigate hidden costs. Let's discuss how to address this.",
        "content": "<h3>Case Debrief</h3><p>Discussion of simulation outcomes: how adoption rate and hidden risks shift the project's break point.</p>"
      },
      {
        "id": "slide_2_18",
        "title": "Final Reflection",
        "block": "Closing",
        "estimatedTime": "8 min",
        "isInteractive": true,
        "interactionType": "wordcloud",
        "question": "Which metric holds the most weight in your capital approval process?",
        "notes": "<strong>Suggested Notes:</strong> Please submit your reflection: as an innovation leader, which financial or clinical metric holds the most weight when deciding to approve or reject a new project?",
        "content": "<h3>Final Reflection</h3><p>Respond in the portal: Which metric (NPV, Payback, Adoption Rate, or Risk Cost) holds the most weight in your capital approval process?</p>"
      },
      {
        "id": "slide_2_19",
        "title": "Key Takeaways & Bridge to Class 3",
        "block": "Closing",
        "estimatedTime": "5 min",
        "notes": "<strong>Suggested Notes:</strong> Summary of Class 2: ROI is a range, adoption is a direct multiplier, and Loss Avoidance has hard value. Next class, we discuss decision governance and pitching to the C-suite.",
        "content": "<h3>Key Takeaways from Class 2</h3><ul><li>ROI is a range of outcomes, not a single static number.</li><li>Adoption rate is a direct multiplier of realized financial return.</li><li>Loss Avoidance has quantifiable value in value-based care.</li></ul>"
      },
      {
        "id": "slide_2_20_ref",
        "title": "Class References & Sources",
        "block": "Closing",
        "estimatedTime": "2 min",
        "notes": "<strong>Suggested Notes:</strong> We have updated the portal references with links to the AHRQ toolkit and case studies discussed today. See you in the final session.",
        "content": "<h3>References & Sources</h3><p>Google DermAssist Dermatology AI Generalizability Study</p><p>AHRQ Health IT Costs and Benefits Toolkit</p>"
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
  const classSubs = db.submissions[classId] || {};
  
  if (studentEmail && studentEmail.toLowerCase().trim() === 'professor') {
    return classSubs[groupId];
  }
  
  const student = students.find(s => s.email.toLowerCase().trim() === studentEmail?.toLowerCase().trim());
  if (student && student.group == groupId) {
    return classSubs[groupId];
  }
  return null;
}

function saveSubmission(classId, groupId, studentEmail, submissionData, submittedBy) {
  const db = readData();
  if (!db.submissions[classId]) db.submissions[classId] = {};
  
  db.submissions[classId][groupId] = {
    ...submissionData,
    submittedBy,
    studentEmail,
    timestamp: new Date().toISOString()
  };
  
  writeData(db);
  return db.submissions[classId][groupId];
}

function getComments(classId, groupId, studentEmail) {
  const db = readData();
  const classComments = db.comments[classId] || {};
  return classComments[groupId] || { text: "", grade: null };
}

function saveComment(classId, groupId, studentEmail, text, grade) {
  const db = readData();
  if (!db.comments[classId]) db.comments[classId] = {};
  db.comments[classId][groupId] = { text, grade, timestamp: new Date().toISOString() };
  writeData(db);
  return db.comments[classId][groupId];
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

const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'db.json');

// Simplified Student Roster: 1 student per group/committee
const students = [
  { name: "Student 1", email: "student1@example.com", group: 1 },
  { name: "Student 2", email: "student2@example.com", group: 2 },
  { name: "Student 3", email: "student3@example.com", group: 3 },
  { name: "Student 4", email: "student4@example.com", group: 4 },
  { name: "Student 5", email: "student5@example.com", group: 5 }
];

// US Healthcare C-Suite Committee Scenarios
const scenarios = {
  "1": {
    "title": "Group 1: Ambient AI Documentation (DAX)",
    "description": "Deploying an ambient AI scribe (Nuance DAX) across 150 primary care clinics to reduce physician documentation burden and physician burnout.",
    "investment": 1200000,
    "annualBenefit": 400000,
    "annualCost": 80000,
    "adoptionRate": 75,
    "riskCost": 250000,
    "caseStudy": "<strong>Clinical & Operational Context:</strong> Mercy Health Network operates 150 primary care clinics. Primary care physicians spend an average of 2.1 hours per day on electronic health record (EHR) documentation outside clinical hours (known as 'pajama time'), leading to a 48% physician burnout rate and reduced patient throughput.<br><br><strong>Proposed Solution:</strong> Deploy Nuance DAX, an ambient AI scribe that listens to patient-clinician conversations via a mobile app and automatically drafts structured clinical notes in the EHR for physician review and signature.<br><br><strong>Governance Analysis:</strong> The projected capital investment is $1.2M, with $400k in annual recurring benefits from increased patient volume (due to shorter documentation times) and reduced physician turnover. However, the committee has identified technical hurdles: API integration with their legacy Epic system is highly sensitive, and any transcription errors (e.g., misinterpreting medication dosages or allergy declarations) could pose clinical risks. The risk cost is estimated at $250k due to potential malpractice claims. Operationally, nurses and physicians express concern about patients' discomfort with having their conversations recorded, which could affect clinical trust."
  },
  "2": {
    "title": "Group 2: Predictive Sepsis Detection AI",
    "description": "Implementation of a predictive sepsis detection model integrated into the EHR of a 400-bed hospital system.",
    "investment": 750000,
    "annualBenefit": 300000,
    "annualCost": 40000,
    "adoptionRate": 80,
    "riskCost": 350000,
    "caseStudy": "<strong>Clinical & Operational Context:</strong> A 400-bed tertiary hospital system experiences high sepsis-related mortality rates. Sepsis clinical identification is often delayed due to manual tracking of vital signs and laboratory results, leading to extended ICU stays and high hospital costs.<br><br><strong>Proposed Solution:</strong> Integrate an EHR-embedded predictive sepsis model that continuously scans patient laboratory results and vital signs in real-time, sending automatic alerts to the rapid response team when a patient's risk score exceeds the clinical threshold.<br><br><strong>Governance Analysis:</strong> The capital investment is estimated at $750k. The projected annual benefit is $300k, primarily achieved by reducing ICU length of stay (LOS) and avoiding CMS penalties for hospital-acquired conditions. However, the IT security department raises technical concerns about system downtime. Operationally, clinicians worry about extreme alert fatigue, as historical data shows that similar alert thresholds yield up to 60% false positive alerts. The estimated risk cost of clinical negligence or delayed treatment due to alarm desensitization is $350k."
  },
  "3": {
    "title": "Group 3: Autonomous Diabetic Retinopathy Screening",
    "description": "Deploying autonomous AI screening (IDx-DR) in primary care clinics to detect diabetic retinopathy without specialist intervention.",
    "investment": 950000,
    "annualBenefit": 350000,
    "annualCost": 90000,
    "adoptionRate": 85,
    "riskCost": 400000,
    "caseStudy": "<strong>Clinical & Operational Context:</strong> An outpatient endocrinology and primary care network manages over 12,000 diabetic patients. Annual diabetic retinopathy eye exams are recommended, but only 40% of patients comply due to lack of local ophthalmologists, transport issues, and long referral delays.<br><br><strong>Proposed Solution:</strong> Deploy IDx-DR, an autonomous AI diagnostic system, in primary care clinics. Primary care staff take fundus photos, and the FDA-cleared AI analyzes the images locally to output a diagnostic result (refer/no-refer) in less than a minute.<br><br><strong>Governance Analysis:</strong> The project demands a capital expenditure (CAPEX) of $950k, with $90k in annual software licensing and maintenance costs. The annual benefits of $350k are driven by new billing codes (CPT 92250-TC) under Medicare, and increased clinical patient flow. On the technical side, the quality of fundus imaging is highly technician-dependent, and old imaging equipment might lead to ungradable results. Operative risk involves delayed diagnosis for patients with other underlying eye diseases, leading to an estimated liability/risk cost of $400k."
  },
  "4": {
    "title": "Group 4: NLP for Prior Authorization Automation",
    "description": "NLP model implementation to automate prior authorization requests with major US commercial insurers.",
    "investment": 600000,
    "annualBenefit": 280000,
    "annualCost": 30000,
    "adoptionRate": 70,
    "riskCost": 200000,
    "caseStudy": "<strong>Clinical & Operational Context:</strong> A multi-specialty medical group processes 45,000 prior authorization (PA) requests annually. The process is manual, tedious, and prone to transcription errors, leading to a 15% initial insurer rejection rate, delayed patient care, and administrative inefficiencies.<br><br><strong>Proposed Solution:</strong> Implement a Natural Language Processing (NLP) engine that parses physician notes and clinical summaries, automatically extracts relevant diagnosis codes and medical necessity indicators, and pre-populates insurer PA forms.<br><br><strong>Governance Analysis:</strong> The initial investment is $600k, with $30k in annual costs. The projected annual benefit is $280k, achieved by reducing insurance denial rates, expediting patient care, and reducing administrative staff overhead. A major technical risk is the variation in prior auth requirements across different payers (UnitedHealthcare, Aetna, Humana, etc.), which requires frequent model fine-tuning. Operational risk involves billing staff over-relying on the AI's auto-generated claims, leading to compliance audits and Medicare penalties (estimated risk cost of $200k)."
  },
  "5": {
    "title": "Group 5: ED Patient Flow Predictive Engine",
    "description": "Predictive AI model to forecast Emergency Department patient boarding, ambulance diversion, and staffing requirements.",
    "investment": 1100000,
    "annualBenefit": 500000,
    "annualCost": 100000,
    "adoptionRate": 75,
    "riskCost": 300000,
    "caseStudy": "<strong>Clinical & Operational Context:</strong> A large metropolitan hospital Emergency Department (ED) handles 80,000 annual visits. The ED experiences severe boarding bottlenecks, long wait times (mean of 6.2 hours), and frequent ambulance diversion protocols, causing significant revenue loss and clinician burnout.<br><br><strong>Proposed Solution:</strong> Deploy a machine learning-based forecasting engine that integrates with EHR data to predict patient admission probabilities, inpatient bed availability, and ED patient surges 12 to 24 hours in advance.<br><br><strong>Governance Analysis:</strong> The capital expenditure is $1.1M, with $100k in annual costs. The project yields a $500k annual benefit by reducing ED length of stay, optimizing nurse staffing, and preventing ambulance diversion. Technical risk involves data latency between the EHR and the predictive engine. Operationally, the hospital's charge nurses must trust the AI's recommendations when coordinating bed allocations, as false alarms could disrupt hospital workflows and lead to clinical incidents (estimated risk cost of $300k)."
  }
};

// Curriculum Bibliography in English
const syllabusBibliography = {
  basica: [
    { citation: "TOPOL, E. Deep Medicine: How Artificial Intelligence Can Make Healthcare Human Again. New York: Basic Books, 2019." },
    { citation: "DAMODARAN, A. Investment Valuation: Tools and Techniques for Determining the Value of Any Asset. 4th ed. Hoboken: Wiley, 2024." },
    { citation: "HUBBARD, D. W. How to Measure Anything: Finding the Value of Intangibles in Business. 4th ed. Hoboken: Wiley, 2024." },
    { citation: "CLEVERLEY, W. O.; CLEVERLEY, J. O.; SONG, P. H. Essentials of Health Care Finance. 9th ed. Jones & Bartlett Learning, 2023." }
  ],
  complementar: [
    { citation: "CHAR, D. S.; SHAH, N. H.; MAGNUS, D. Implementing Machine Learning in Health Care. New England Journal of Medicine, v. 378, n. 11, p. 981-983, 2018." },
    { citation: "OBERMEYER, Z. et al. Dissecting racial bias in an algorithm used to manage the health of populations. Science, v. 366, n. 6464, p. 447-453, 2019." },
    { citation: "HUBBARD, D. W. The Failure of Risk Management: Why It's Broken and How to Fix It. 2nd ed. Hoboken: Wiley, 2020." }
  ]
};

// English Classes & Slides Content
const classesContent = [
  {
    "id": "class1",
    "title": "Class 1: Risk Assessment & Foundations in Health Innovation",
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
        "title": "Welcome to ROI & Risk Assessment",
        "block": "Introduction",
        "estimatedTime": "2 min",
        "notes": "<strong>Suggested Notes:</strong> Welcome to the MBA in AI Applied to Health. Today we begin our course on Risk Assessment and ROI. Our focus is C-suite governance and financial modeling, moving our attention from marketing claims to real mathematical and operational parameters.",
        "content": "<h3>Risk Assessment & Healthcare ROI</h3><p>MBA in AI Applied to Health</p><p>Instructor: Dra. Faila Santos</p>"
      },
      {
        "id": "slide_1_2",
        "title": "Your Instructor: Faila Santos, PhD",
        "block": "Introduction",
        "estimatedTime": "5 min",
        "notes": "<strong>Suggested Notes:</strong> Before we begin, a brief introduction. I am Faila Santos, a healthcare executive with over 20 years of experience in digital health and clinical informatics in both the US and Brazil. I am dedicated to helping you lead innovation safely across clinical, financial, and operational boundaries.",
        "content": "<h3>Faila Santos, PhD</h3><p>Healthcare Executive and Senior Digital Health Advisor with 20+ years of US-global experience.</p><p>PhD and Master's from University of St. Augustine for Health Sciences, Senior Digital Health Advisor at HIMSS.</p>"
      },
      {
        "id": "slide_1_3",
        "title": "Icebreaker: The Tech Backfire",
        "block": "Opening",
        "estimatedTime": "8 min",
        "isInteractive": true,
        "interactionType": "wordcloud",
        "question": "In one word: Think of a technology that promised clinical efficiency but delivered frustration.",
        "notes": "<strong>Suggested Notes:</strong> Let's start with our opening interactive dynamic. Enter a single word describing a digital health technology that promised a lot but delivered frustration in your daily routine. It could be a slow EHR, a dropped telemedicine app, or warning alerts that interrupt patient care.",
        "content": "<h3>Icebreaker: The Tech Backfire</h3><p>In one word: Think of a technology that promised clinical efficiency but delivered frustration.</p><p>Submit your response in the portal to generate our live word cloud.</p>"
      },
      {
        "id": "slide_1_4",
        "title": "Agenda & Objectives",
        "block": "Introduction",
        "estimatedTime": "3 min",
        "notes": "<strong>Suggested Notes:</strong> Our objective today is learning to separate apparent risks from hidden risks, master the probability vs. impact matrix, and trace a domino effect. Active participation in the enquetes represents 15% of your final grade.",
        "content": "<h3>Objectives & Agenda</h3><p><b>Core Goal:</b> Learn to separate apparent from hidden risks, utilize the impact matrix, and map a domino effect.</p><p><b>Agenda:</b> 2 lecture blocks + IBM Watson case review + committee group work + reflection.</p><p><b>Grading:</b> Portal interactions and enquetes account for 15% of the final grade.</p>"
      },
      {
        "id": "slide_1_5",
        "title": "The Guardian of Viability",
        "block": "Block 1: Risk Identity",
        "estimatedTime": "5 min",
        "notes": "<strong>Suggested Notes:</strong> As analysts and leaders, our role is to act as the Guardians of Viability. This does not mean blocking innovation; it means ensuring that technology survives contact with clinical reality.",
        "content": "<h3>The Guardian of Viability</h3><p><i>\"Choose the solution validated by data, not the one sold by marketing.\"</i></p><p>From spreadsheets to governance: your role is to protect the organization from bad software decisions and ensure tech survives clinical workflows.</p>"
      },
      {
        "id": "slide_1_6",
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
        "title": "Four Dimensions of US Healthcare Risk",
        "block": "Block 1: Risk Identity",
        "estimatedTime": "6 min",
        "notes": "<strong>Suggested Notes:</strong> To guide our analysis, we categorize risks into four areas: Technical, Operational, Financial, and Regulatory. A clinically perfect algorithm is useless if it violates HIPAA regulations or causes alert fatigue that frustrates nurses.",
        "content": "<h3>Four Dimensions of US Healthcare Risk</h3><p>Always map at least one risk in each category during C-suite reviews:</p><ul><li><b>Technical:</b> Integrations, EHR interoperability, data latency.</li><li><b>Operational:</b> Workflow adaptation, clinician alert fatigue, adoption rate.</li><li><b>Financial:</b> Hidden maintenance costs, claim denials, realized ROI.</li><li><b>Regulatory:</b> HIPAA compliance, FDA clearances, CMS penalties.</li></ul>"
      },
      {
        "id": "slide_1_9",
        "title": "Probability vs. Impact in Medicine",
        "block": "Block 1: Risk Identity",
        "estimatedTime": "5 min",
        "notes": "<strong>Suggested Notes:</strong> The classic impact matrix requires calibration in healthcare. Sepsis or clinical errors have zero tolerance. A rare clinical error with severe patient impact belongs in the red quadrant, even if the probability is just 0.1%. Clinical impact always overrides statistical probability.",
        "content": "<h3>Probability vs. Impact in Medicine</h3><p>In clinical governance, low probability never neutralizes high clinical impact.</p><p>A rare event with severe patient outcomes belongs in the high-priority RED quadrant.</p>"
      },
      {
        "id": "slide_1_10",
        "title": "Core Case: IBM Watson for Oncology",
        "block": "Block 2: Case Review",
        "estimatedTime": "15 min",
        "notes": "<strong>Suggested Notes:</strong> Let's review the IBM Watson case. MD Anderson invested $62M in Watson to assist in oncology recommendations. Why did it fail? It recommended unsafe regimens because it was trained on synthetic cases, not real EHR datasets, and it ignored local physician workflows.",
        "content": "<h3>Case Study: IBM Watson for Oncology</h3><p>MD Anderson Cancer Center's $62M oncology AI initiative was desupported in 2022.</p><p><b>Failure Points:</b> Ignored local clinical guidelines, was trained on synthetic clinical cases, and suffered extreme clinician friction.</p>"
      },
      {
        "id": "slide_1_11",
        "title": "Whiteboard: Mapping Failure Points",
        "block": "Block 2: Case Review",
        "estimatedTime": "10 min",
        "notes": "<strong>Suggested Notes:</strong> Let's use the interactive whiteboard to plot Watson's failure points across our four risk dimensions.",
        "content": "<h3>Whiteboard: Watson Failure Points</h3><p>Draw and classify Watson's risks on the interactive board.</p>"
      },
      {
        "id": "slide_1_12",
        "title": "Intro to Committee Simulation",
        "block": "Interactive Workshop",
        "estimatedTime": "5 min",
        "notes": "<strong>Suggested Notes:</strong> We will now transition to the Group Work tab. You will represent C-suite committees and analyze a specific digital health case. Evaluate the CAPEX, the expected benefits, and the risk costs.",
        "content": "<h3>C-Suite Committee Workshop</h3><p>Select the 'Group Work' tab. Analyze your assigned US case study (Ambient AI, Sepsis alert, Retinopathy screening, NLP PA, or ED flow) and submit your risk assessment.</p>"
      }
    ]
  },
  {
    "id": "class2",
    "title": "Class 2: Operational Simulation & ROI Stress Testing",
    "date": "July 15, 2026",
    "description": "Utilize operational parameters to stress test ROI models. Mappings include the Adoption Equation and Loss Avoidance vs. Pure Savings.",
    "checkin": {
      "type": "wordcloud",
      "question": "What is the biggest operational hurdle when deploying a new clinical software?"
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
        "title": "Simulation & Stress Testing",
        "block": "Introduction",
        "estimatedTime": "5 min",
        "notes": "<strong>Suggested Notes:</strong> Today we will focus on simulation and stress testing. A commercial proposal shows a stable, ideal state. We must stress test this proposal using realistic clinical variables and clinician adoption rates.",
        "content": "<h3>Operational Simulation & ROI Stress Testing</h3><p>Moving from ideal business plans to stressed financial models in health systems.</p>"
      },
      {
        "id": "slide_2_2",
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
        "isInteractive": true,
        "interactionType": "wordcloud",
        "question": "What is the biggest operational hurdle when deploying a new clinical software?",
        "notes": "<strong>Suggested Notes:</strong> Let's run our check-in. In your experience, what is the biggest operational bottleneck when introducing a new clinical application?",
        "content": "<h3>Check-in: The Bottleneck</h3><p>What is the biggest operational hurdle when deploying a new clinical software?</p>"
      },
      {
        "id": "slide_2_4",
        "title": "Sepsis AI & Alert Fatigue",
        "block": "Block 2: US Cases",
        "estimatedTime": "12 min",
        "notes": "<strong>Suggested Notes:</strong> Let's review the Sepsis AI alert issues. Alerts that fire constantly trigger desensitization, causing clinicians to ignore critical patient alarms. This leads to clinical failures and liability costs.",
        "content": "<h3>Epic Sepsis AI Validation Issues</h3><p>Studies show Epic's proprietary sepsis model suffered from high alert fatigue and low specificity in real hospital environments.</p><p><b>Result:</b> Alert fatigue leads to nurse desensitization, clinical delays, and liability risks.</p>"
      },
      {
        "id": "slide_2_5",
        "title": "Loss Avoidance vs. Pure Savings",
        "block": "Block 1: ROI Modeling",
        "estimatedTime": "10 min",
        "notes": "<strong>Suggested Notes:</strong> US healthcare models focus heavily on Loss Avoidance. Preventing CMS penalties, hospital-acquired infections, and malpractice claims represents a massive financial return, even if it doesn't reduce operating expenses.",
        "content": "<h3>Loss Avoidance vs. Pure Savings</h3><p><b>Pure Savings:</b> Staff reductions, lower license costs (OPEX reduction).</p><p><b>Loss Avoidance:</b> Financial savings achieved by avoiding negative outcomes (e.g., preventing ICU admissions, avoiding readmission penalties).</p>"
      },
      {
        "id": "slide_2_6",
        "title": "Interactive Committee Simulation",
        "block": "Interactive Workshop",
        "estimatedTime": "15 min",
        "notes": "<strong>Suggested Notes:</strong> Access the Group Work tab. Input your stress parameters (adoption rate, risk cost) into the calculator and observe the simulated financial return.",
        "content": "<h3>Interactive Simulation Workshop</h3><p>Simulate financial stress testing on your assigned US healthcare scenarios in the 'Group Work' tab.</p>"
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
      "question": "What is the most critical metric a Health System CFO looks for?"
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
        "title": "Governance & Capital Allocation",
        "block": "Introduction",
        "estimatedTime": "5 min",
        "notes": "<strong>Suggested Notes:</strong> Today we discuss C-suite governance. In health systems, resources are limited. We must pitch projects effectively using the ROI-5 framework to convince the CIO, CMO, and CFO.",
        "content": "<h3>C-Suite Decision Governance</h3><p>Convincing the C-Suite: How to align clinical outcomes with financial sustainability.</p>"
      },
      {
        "id": "slide_3_2",
        "title": "The ROI-5 Framework",
        "block": "Block 1: Governance",
        "estimatedTime": "10 min",
        "notes": "<strong>Suggested Notes:</strong> The ROI-5 framework addresses 5 critical C-suite dimensions: Clinical impact, Operational workflow, Technical integration, Financial return, and Regulatory compliance.",
        "content": "<h3>The ROI-5 Framework</h3><p>Construct your C-suite proposal addressing these five pillars:</p><ol><li><b>Clinical Quality:</b> Patient outcomes, safety.</li><li><b>Operational Flow:</b> Staff productivity, clinician burnout.</li><li><b>Technical Feasibility:</b> Interoperability, EHR integration.</li><li><b>Financial Return:</b> CAPEX/OPEX, Payback, Loss Avoidance.</li><li><b>Compliance/Regulatory:</b> HIPAA, FDA, liability exposure.</li></ol>"
      },
      {
        "id": "slide_3_3",
        "title": "Mayo Clinic's EAGLE Trial (AI-ECG)",
        "block": "Block 2: US Cases",
        "estimatedTime": "15 min",
        "notes": "<strong>Suggested Notes:</strong> Mayo Clinic's EAGLE trial analyzed an AI model detecting low ejection fraction from standard ECGs. By integrating the AI alert directly into the clinical workflow, they achieved high clinician adoption and improved early detection.",
        "content": "<h3>Mayo Clinic's EAGLE Trial (AI-ECG)</h3><p><b>Context:</b> AI tool scanning standard ECGs to identify low ejection fraction (heart failure risk).</p><p><b>Success Factor:</b> Integration into daily screening workflows, demonstrating high physician adoption and clinical utility.</p>"
      },
      {
        "id": "slide_3_4",
        "title": "Final Committee Decisions",
        "block": "Interactive Workshop",
        "estimatedTime": "20 min",
        "notes": "<strong>Suggested Notes:</strong> Time to compile your final Business Case. Discuss the GO/NO-GO recommendation for capital allocation and submit your executive summary.",
        "content": "<h3>Final Committee Deliverable</h3><p>Complete the Business Case structure in the 'Group Work' tab, formulate your capital recommendation, and click Submit.</p>"
      }
    ]
  }
];

// File I/O Helpers matching root database.js
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
    
    // Auto-migrate structure if needed
    let updated = false;
    if (!parsed.activeState) {
      parsed.activeState = { classId: "class1", slideId: "slide_1_1", syncEnabled: true, activeTab: "checkin", revealAnswers: false, timerEnd: null };
      updated = true;
    }
    if (!parsed.submissions) { parsed.submissions = { class1: {}, class2: {}, class3: {} }; updated = true; }
    if (!parsed.comments) { parsed.comments = { class1: {}, class2: {}, class3: {} }; updated = true; }
    if (!parsed.checkinResponses) { parsed.checkinResponses = { class1: {}, class2: {}, class3: {} }; updated = true; }
    if (!parsed.slideInteractions) { parsed.slideInteractions = { class1: {}, class2: {}, class3: {} }; updated = true; }
    if (!parsed.conceptCheckResponses) { parsed.conceptCheckResponses = { class1: {}, class2: {}, class3: {} }; updated = true; }
    if (!parsed.reflections) { parsed.reflections = { class1: {}, class2: {}, class3: {} }; updated = true; }
    if (!parsed.whiteboardHistory) { parsed.whiteboardHistory = { class1: [], class2: [], class3: [] }; updated = true; }
    
    if (updated) {
      fs.writeFileSync(DB_FILE, JSON.stringify(parsed, null, 2), 'utf-8');
    }
    return parsed;
  } catch (e) {
    console.error("Error reading db.json, returning default English db structure", e);
    return {
      activeState: { classId: "class1", slideId: "slide_1_1", syncEnabled: true, activeTab: "checkin", revealAnswers: false, timerEnd: null },
      submissions: { class1: {}, class2: {}, class3: {} },
      comments: { class1: {}, class2: {}, class3: {} },
      checkinResponses: { class1: {}, class2: {}, class3: {} },
      slideInteractions: { class1: {}, class2: {}, class3: {} },
      conceptCheckResponses: { class1: {}, class2: {}, class3: {} },
      reflections: { class1: {}, class2: {}, class3: {} },
      whiteboardHistory: { class1: [], class2: [], class3: [] }
    };
  }
}

function writeData(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (e) {
    console.error("Error writing to db.json", e);
    return false;
  }
}

module.exports = {
  students,
  scenarios,
  classesContent,
  syllabusBibliography,
  getState: () => {
    const data = readData();
    return data.activeState;
  },
  updateState: (newState) => {
    const data = readData();
    data.activeState = { ...data.activeState, ...newState };
    writeData(data);
    return data.activeState;
  },
  getSubmissions: (classId) => {
    const data = readData();
    return data.submissions[classId] || {};
  },
  getSubmission: (classId, groupId, studentEmail) => {
    const data = readData();
    const groupSubmissions = (data.submissions[classId] || {})[groupId] || {};
    if (studentEmail) {
      return groupSubmissions[studentEmail] || null;
    }
    const keys = Object.keys(groupSubmissions);
    return keys.length > 0 ? groupSubmissions[keys[0]] : null;
  },
  saveSubmission: (classId, groupId, studentEmail, submissionData, submittedBy) => {
    const data = readData();
    if (!data.submissions[classId]) {
      data.submissions[classId] = {};
    }
    if (!data.submissions[classId][groupId]) {
      data.submissions[classId][groupId] = {};
    }
    const emailKey = studentEmail || "anonymous";
    data.submissions[classId][groupId][emailKey] = {
      ...submissionData,
      submittedBy: submittedBy || "Team Member",
      submittedAt: new Date().toISOString()
    };
    writeData(data);
    return data.submissions[classId][groupId][emailKey];
  },
  getComments: (classId, groupId, studentEmail) => {
    const data = readData();
    const groupComments = (data.comments[classId] || {})[groupId] || {};
    if (studentEmail) {
      return groupComments[studentEmail] || [];
    }
    const keys = Object.keys(groupComments);
    return keys.length > 0 ? groupComments[keys[0]] : [];
  },
  saveComment: (classId, groupId, studentEmail, commentText, grade) => {
    const data = readData();
    if (!data.comments[classId]) {
      data.comments[classId] = {};
    }
    if (!data.comments[classId][groupId]) {
      data.comments[classId][groupId] = {};
    }
    const emailKey = studentEmail || "anonymous";
    if (!data.comments[classId][groupId][emailKey]) {
      data.comments[classId][groupId][emailKey] = [];
    }
    const newComment = {
      text: commentText,
      grade: grade || null,
      timestamp: new Date().toISOString()
    };
    data.comments[classId][groupId][emailKey].push(newComment);
    writeData(data);
    return data.comments[classId][groupId][emailKey];
  },
  getCheckins: (classId) => {
    const data = readData();
    return data.checkinResponses[classId] || {};
  },
  saveCheckinResponse: (classId, userEmail, text) => {
    const data = readData();
    if (!data.checkinResponses[classId]) {
      data.checkinResponses[classId] = {};
    }
    data.checkinResponses[classId][userEmail] = {
      text: text,
      likes: []
    };
    writeData(data);
    return data.checkinResponses[classId][userEmail];
  },
  likeCheckinWord: (classId, word, userEmail) => {
    const data = readData();
    const checkinData = data.checkinResponses[classId] || {};
    // Find the original response matching the word submitted
    Object.keys(checkinData).forEach(email => {
      const resp = checkinData[email];
      if (resp && resp.text && resp.text.toLowerCase().trim() === word.toLowerCase().trim()) {
        if (!resp.likes) resp.likes = [];
        if (!resp.likes.includes(userEmail)) {
          resp.likes.push(userEmail);
        } else {
          // Unlike
          resp.likes = resp.likes.filter(e => e !== userEmail);
        }
      }
    });
    writeData(data);
    return checkinData;
  },
  getSlideInteractions: (classId, slideId) => {
    const data = readData();
    const classInteractions = data.slideInteractions[classId] || {};
    return classInteractions[slideId] || {};
  },
  saveSlideInteraction: (classId, slideId, userEmail, value) => {
    const data = readData();
    if (!data.slideInteractions[classId]) {
      data.slideInteractions[classId] = {};
    }
    if (!data.slideInteractions[classId][slideId]) {
      data.slideInteractions[classId][slideId] = {};
    }
    const responseId = `resp_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    data.slideInteractions[classId][slideId][responseId] = {
      id: responseId,
      email: userEmail,
      value: value,
      timestamp: new Date().toISOString(),
      likes: [],
      hidden: false,
      highlight: false,
      answered: false,
      pinned: false
    };
    writeData(data);
    return data.slideInteractions[classId][slideId][responseId];
  },
  likeSlideInteraction: (classId, slideId, responseId, userEmail) => {
    const data = readData();
    const interaction = ((data.slideInteractions[classId] || {})[slideId] || {})[responseId];
    if (interaction) {
      if (!interaction.likes) interaction.likes = [];
      if (!interaction.likes.includes(userEmail)) {
        interaction.likes.push(userEmail);
      } else {
        interaction.likes = interaction.likes.filter(e => e !== userEmail);
      }
      writeData(data);
    }
    return (data.slideInteractions[classId] || {})[slideId] || {};
  },
  likeSlideInteractionWord: (classId, slideId, word, userEmail) => {
    const data = readData();
    const slideData = (data.slideInteractions[classId] || {})[slideId] || {};
    Object.keys(slideData).forEach(respId => {
      const resp = slideData[respId];
      if (resp && resp.value && resp.value.toLowerCase().trim() === word.toLowerCase().trim()) {
        if (!resp.likes) resp.likes = [];
        if (!resp.likes.includes(userEmail)) {
          resp.likes.push(userEmail);
        } else {
          resp.likes = resp.likes.filter(e => e !== userEmail);
        }
      }
    });
    writeData(data);
    return slideData;
  },
  toggleHideSlideInteraction: (classId, slideId, responseId) => {
    const data = readData();
    const interaction = ((data.slideInteractions[classId] || {})[slideId] || {})[responseId];
    if (interaction) {
      interaction.hidden = !interaction.hidden;
      writeData(data);
    }
    return (data.slideInteractions[classId] || {})[slideId] || {};
  },
  toggleHighlightSlideInteraction: (classId, slideId, responseId) => {
    const data = readData();
    const interaction = ((data.slideInteractions[classId] || {})[slideId] || {})[responseId];
    if (interaction) {
      interaction.highlight = !interaction.highlight;
      writeData(data);
    }
    return (data.slideInteractions[classId] || {})[slideId] || {};
  },
  toggleAnswerSlideInteraction: (classId, slideId, responseId) => {
    const data = readData();
    const interaction = ((data.slideInteractions[classId] || {})[slideId] || {})[responseId];
    if (interaction) {
      interaction.answered = !interaction.answered;
      writeData(data);
    }
    return (data.slideInteractions[classId] || {})[slideId] || {};
  },
  togglePinSlideInteraction: (classId, slideId, responseId) => {
    const data = readData();
    const interaction = ((data.slideInteractions[classId] || {})[slideId] || {})[responseId];
    if (interaction) {
      interaction.pinned = !interaction.pinned;
      writeData(data);
    }
    return (data.slideInteractions[classId] || {})[slideId] || {};
  },
  getConceptChecks: (classId) => {
    const data = readData();
    return data.conceptCheckResponses[classId] || {};
  },
  saveConceptCheckResponse: (classId, userEmail, score, answers) => {
    const data = readData();
    if (!data.conceptCheckResponses[classId]) {
      data.conceptCheckResponses[classId] = {};
    }
    data.conceptCheckResponses[classId][userEmail] = {
      score: score,
      answers: answers,
      timestamp: new Date().toISOString()
    };
    writeData(data);
    return data.conceptCheckResponses[classId][userEmail];
  },
  getReflections: (classId) => {
    const data = readData();
    return data.reflections[classId] || {};
  },
  saveReflection: (classId, userEmail, text) => {
    const data = readData();
    if (!data.reflections[classId]) {
      data.reflections[classId] = {};
    }
    data.reflections[classId][userEmail] = {
      text: text,
      timestamp: new Date().toISOString()
    };
    writeData(data);
    return data.reflections[classId][userEmail];
  },
  getWhiteboardHistory: (classId) => {
    const data = readData();
    return data.whiteboardHistory[classId] || [];
  },
  addWhiteboardAction: (classId, action) => {
    const data = readData();
    if (!data.whiteboardHistory[classId]) {
      data.whiteboardHistory[classId] = [];
    }
    data.whiteboardHistory[classId].push(action);
    writeData(data);
    return data.whiteboardHistory[classId];
  },
  clearWhiteboardHistory: (classId) => {
    const data = readData();
    data.whiteboardHistory[classId] = [];
    writeData(data);
    return [];
  }
};

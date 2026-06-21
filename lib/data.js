export const profile = {
  name: "Hemanth Naga Venkata Sai Kata",
  shortName: "Hemanth Kata",
  role: "Full Stack Developer",
  since: "2023",
  location: "Hyderabad, India",
  email: "katahemanth999@gmail.com",
  phone: "+91 84648 69686",
  github: "https://github.com/hemanthkata",
  linkedin: "https://linkedin.com/in/hemanth-kata",
  intro:
    "I'm Hemanth — a Full Stack Developer based in Hyderabad, building modern, scalable, and production-grade web applications. I work across Python/FastAPI, Odoo ERP, and Java/Spring Boot, shipping clean APIs, optimized databases, and cloud-deployed systems serving 500+ daily users.",
  bio: [
    "I'm a results-driven Full Stack Developer with 2+ years of experience building and deploying scalable web applications. My core strength is backend engineering — designing async APIs, optimizing databases, and architecting systems that hold up in production.",
    "Day to day I work across three ecosystems: Python (FastAPI, Odoo), Java (Spring Boot, Hibernate), and modern React frontends. I've shipped 20+ REST APIs, built 10+ custom ERP modules, and migrated 100K+ records with 99.9% accuracy.",
    "I care about clean, reusable code, measurable performance wins, and collaborating across cross-functional teams to deliver high-performance solutions. I'm currently open to full-time roles and freelance projects.",
  ],
};

export const stats = [
  { value: "2+", label: "Years Experience" },
  { value: "20+", label: "REST APIs Built" },
  { value: "10+", label: "Custom Modules" },
  { value: "100K+", label: "Records Migrated" },
];

export const services = [
  {
    slug: "python-fastapi",
    title: "Python / FastAPI",
    tagline: "Async backends & microservices",
    tags: ["FastAPI (Async)", "Pydantic", "Celery", "SQLAlchemy"],
    desc: "Async microservices, JWT/OAuth2 auth, background task queues, and OpenAPI-documented REST endpoints.",
    overview:
      "I build high-performance Python backends using FastAPI's async/await model. From schema validation with Pydantic to background processing with Celery + Redis, I architect services that scale and stay maintainable.",
    capabilities: [
      "Async REST API design with FastAPI and full OpenAPI/Swagger docs",
      "JWT & OAuth2 authentication with role-based access control",
      "Celery + Redis background task queues for emails, reports & sync jobs",
      "SQLAlchemy ORM with Alembic migrations and PostgreSQL tuning",
      "Webhook handlers and third-party integrations (Stripe, payment gateways)",
    ],
    stack: ["FastAPI", "Python", "Pydantic", "Celery", "Redis", "SQLAlchemy", "PostgreSQL"],
  },
  {
    slug: "odoo-erp",
    title: "Odoo ERP",
    tagline: "Custom modules & ERP customization",
    tags: ["Odoo 17", "QWeb / PDF", "Python ORM", "XML Views"],
    desc: "Custom module development, ERP customization, workflow automation, and multi-instance production deployment.",
    overview:
      "I deliver the full Odoo implementation lifecycle — from requirements gathering and custom module development through deployment, upgrades, and production troubleshooting on Odoo 17 Community Edition.",
    capabilities: [
      "Custom module development across HR, Accounting, CRM, Sales, Inventory & Helpdesk",
      "QWeb PDF reporting with wizard-based filter interfaces",
      "Multi-stage approval workflows, scheduled & automated actions",
      "Record rules, ACLs & field-level security for sensitive data",
      "Multi-instance Odoo server management: Nginx, SSL/TLS, systemd, WebSocket",
    ],
    stack: ["Odoo 17", "Python ORM", "QWeb", "XML", "PostgreSQL", "Nginx", "Linux"],
  },
  {
    slug: "java-spring-boot",
    title: "Java / Spring Boot",
    tagline: "Enterprise microservices",
    tags: ["Spring Boot", "Hibernate", "Spring Security", "REST"],
    desc: "Enterprise microservices, RBAC, Hibernate data layers, and zero-downtime schema migrations.",
    overview:
      "I build and maintain enterprise-grade Spring Boot microservices — secure REST APIs, Hibernate data layers with complex relational schemas, and CI/CD-driven deployments with full observability.",
    capabilities: [
      "Spring Boot microservices for service management & incident routing",
      "RESTful APIs secured with Spring Security (OAuth2 / JWT / RBAC)",
      "Hibernate ORM data layers with zero-downtime schema migrations",
      "Jenkins CI/CD pipelines with Docker on AWS EC2",
      "Monitoring with Splunk & AppDynamics, RCA documentation for L2/L3 incidents",
    ],
    stack: ["Java 11", "Spring Boot", "Hibernate", "Spring Security", "Jenkins", "Oracle DB"],
  },
  {
    slug: "frontend",
    title: "Frontend Development",
    tagline: "React interfaces & responsive UI",
    tags: ["React.js", "Tailwind CSS", "Responsive", "JavaScript"],
    desc: "Responsive, cross-browser interfaces that consume REST APIs with real-time WebSocket features.",
    overview:
      "I craft responsive, accessible React frontends that consume REST APIs and surface real-time data — with clean component architecture and pixel-attentive, cross-browser layouts.",
    capabilities: [
      "React.js SPAs with reusable component architecture",
      "Tailwind CSS responsive, cross-browser, mobile-first layouts",
      "Real-time UI with WebSocket integration",
      "Form-driven CRUD interfaces consuming REST/GraphQL APIs",
      "Performance-minded rendering and clean state management",
    ],
    stack: ["React.js", "JavaScript (ES6+)", "Tailwind CSS", "HTML5", "CSS3"],
  },
  {
    slug: "databases",
    title: "Databases",
    tagline: "Design, tuning & optimization",
    tags: ["PostgreSQL", "MySQL", "Redis", "Indexing"],
    desc: "Query optimization & indexing — reduced average API response time from 2.3s to 0.4s.",
    overview:
      "I design relational schemas for complex domains and tune them for speed. Strategic indexing and query restructuring have cut average API response times from 2.3s to 0.4s in production.",
    capabilities: [
      "PostgreSQL schema design for complex relational structures",
      "Query optimization & strategic indexing (2.3s → 0.4s response times)",
      "Redis caching for high-traffic endpoints",
      "ETL pipelines & data migration (100K+ records, 99.9% accuracy)",
      "Alembic-style migrations with zero downtime",
    ],
    stack: ["PostgreSQL", "MySQL", "Redis", "MongoDB", "Alembic"],
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    tagline: "Containers, CI/CD & deployment",
    tags: ["AWS (EC2/S3/RDS)", "Docker", "CI/CD", "Nginx"],
    desc: "Containerized deployments, GitHub Actions pipelines, Nginx reverse proxy, SSL/TLS, and Linux administration.",
    overview:
      "I take applications from local to production — containerized with Docker, deployed on AWS, automated with CI/CD pipelines, and fronted by Nginx with SSL/TLS.",
    capabilities: [
      "Docker containerization of full-stack applications",
      "CI/CD pipelines via GitHub Actions & Jenkins",
      "AWS deployment (EC2, S3, RDS, CloudWatch)",
      "Nginx reverse proxy, SSL/TLS via Let's Encrypt, systemd services",
      "Linux (Ubuntu) administration & secure remote deployment",
    ],
    stack: ["AWS", "Docker", "GitHub Actions", "Jenkins", "Nginx", "Linux"],
  },
];

export const experience = [
  {
    role: "Software Developer",
    company: "KCS Tech",
    period: "Apr 2025 – Present",
    location: "Hyderabad, Telangana",
    points: [
      "Built & maintained full-stack apps across 15+ core modules (Sales, Inventory, HR, Accounting, CRM) serving 500+ daily users, cutting processing time by 70%.",
      "Designed & deployed 20+ secure RESTful APIs integrating 8+ third-party services (Razorpay, PayU, FedEx, DHL) with OAuth2 & JWT.",
      "Optimized PostgreSQL queries — reduced response time from 2.3s to 0.4s via strategic indexing and query restructuring.",
      "Engineered Spring Boot microservices with RBAC (Spring Security), Jenkins CI/CD, and Splunk/AppDynamics monitoring for L2/L3 incident resolution.",
      "Migrated 100K+ records from legacy systems with 99.9% accuracy; built ETL pipelines for continuous data synchronization.",
      "Configured 50+ automated background workflows and scheduled jobs, reducing manual effort by 70%.",
    ],
    stack: ["Python", "FastAPI", "Odoo 17", "Java", "Spring Boot", "PostgreSQL", "React.js", "AWS"],
  },
  {
    role: "Java Full Stack Developer Intern",
    company: "The Tap Academy",
    period: "Jun 2023 – Jan 2024",
    location: "Hyderabad, Telangana",
    points: [
      "Completed intensive full stack training: Core Java, Spring Boot, Hibernate, REST APIs, HTML/CSS, JavaScript.",
      "Built full-stack projects applying MVC architecture, DTO pattern, CRUD operations, and MySQL integration.",
      "Developed an Employee Management CRUD app — Spring Boot backend, Hibernate data layer, React.js frontend.",
    ],
    stack: ["Java", "Spring Boot", "Hibernate", "MySQL", "React.js"],
  },
  {
    role: "Java & Web Development Intern",
    company: "VeriTech Software IT Services",
    period: "Jan 2024 – Apr 2024",
    location: "Remote",
    points: [
      "Developed a Snake game in Java (Swing) with collision detection and difficulty-based scoring.",
      "Built a console ATM interface simulating core banking operations with input validation.",
      "Built responsive landing pages with cross-browser compatibility using HTML5 & CSS3.",
    ],
    stack: ["Java", "HTML5", "CSS3", "JavaScript"],
  },
];

export const projects = [
  {
    slug: "pos-application",
    name: "POS Application",
    tag: "In Development",
    year: "2025",
    role: "Full Stack Developer",
    desc: "Cloud-based Point-of-Sale system — FastAPI async backend + React.js cashier UI, Stripe payments, Celery task queues, PDF invoicing, and a sales analytics dashboard.",
    overview:
      "A cloud-based Point-of-Sale system architected end-to-end to demonstrate full-stack capability. A FastAPI async backend powers a React.js cashier interface, with Stripe checkout, Celery background processing, and AWS deployment.",
    features: [
      "Product catalog CRUD, real-time shopping cart & order processing workflow",
      "JWT-based customer authentication and secure session handling",
      "Stripe payment gateway with secure checkout & webhook payment confirmation",
      "Celery task queues for asynchronous email & invoice delivery",
      "PDF invoice generation and sales analytics dashboard with date-range filtering",
      "CSV/JSON data exports and product performance reports",
      "Containerized with Docker; deploying to AWS (EC2/RDS/S3) via GitHub Actions CI/CD",
    ],
    metrics: [
      { value: "End-to-end", label: "Full-stack build" },
      { value: "Stripe", label: "Payments integrated" },
      { value: "Docker", label: "Containerized" },
    ],
    stack: ["FastAPI", "React.js", "PostgreSQL", "Redis", "Celery", "Stripe", "Docker", "AWS"],
  },
  {
    slug: "helpdesk-analytics",
    name: "Helpdesk Analytics & PDF Reporting",
    tag: "Odoo 17",
    year: "2025",
    role: "Odoo Developer",
    desc: "Comprehensive helpdesk analytics module with SLA tracking, pivot/graph views, wizard-based filtering, and a professional QWeb PDF report — with field-level security for client roles.",
    overview:
      "A production Odoo 17 module built on top of Odoo's helpdesk, adding SLA compliance tracking, rich analytics views, and professional PDF reporting — with careful field-level security so sensitive metrics stay internal.",
    features: [
      "SLA compliance tracking with ticket resolution metrics & team statistics",
      "Pivot and graph views for priority distribution analysis",
      "Wizard model for report filtering by date range, team & ticket priority",
      "Professional QWeb PDF report rendered via wkhtmltopdf",
      "Field-level security (record rules + ACLs) restricting TAT data from client roles",
      "Resolved SQL errors with computed fields in pivot/graph views",
    ],
    metrics: [
      { value: "SLA", label: "Tracking built-in" },
      { value: "QWeb PDF", label: "Custom reporting" },
      { value: "ACL", label: "Field-level security" },
    ],
    stack: ["Odoo 17", "Python", "QWeb", "PostgreSQL", "Wizard Models", "XML"],
  },
  {
    slug: "team-weekly-plan",
    name: "Team Weekly Plan Module",
    tag: "Odoo 17",
    year: "2025",
    role: "Odoo Developer",
    desc: "Custom Odoo module for weekly task planning with a multi-stage approval workflow (Draft → Submitted → Approved), manager supervision, and automated email notifications.",
    overview:
      "A custom team_weekly_plan module built from scratch, providing weekly task planning and management with a full multi-stage approval workflow and role-based supervision.",
    features: [
      "Multi-stage approval workflow: Draft → Submitted → Approved / Rejected",
      "Team manager supervision and role-based access control",
      "Automated email notifications via Python-rendered mail.mail records",
      "Task status tracking across the planning lifecycle",
      "Resolved Odoo 17-specific mail template rendering issues during development",
    ],
    metrics: [
      { value: "4-stage", label: "Approval workflow" },
      { value: "Automated", label: "Email notifications" },
      { value: "RBAC", label: "Role-based access" },
    ],
    stack: ["Odoo 17", "Python ORM", "XML Views", "QWeb", "Mail Templates"],
  },
  {
    slug: "gait-recognition",
    name: "Thief Detection via Multiview Gait Recognition",
    tag: "Research · Published",
    year: "2023",
    role: "Researcher / Developer",
    desc: "Multi-angle posture-based gait recognition system using Graph Convolutional Neural Networks (GCNN). Research paper accepted by the MIC journal.",
    overview:
      "A machine-learning research project developing a multi-angle, posture-based gait recognition system. Leveraging Graph Convolutional Neural Networks (GCNN) for improved thief-detection accuracy across surveillance feeds. The work was published in the MIC journal.",
    features: [
      "Multi-angle posture-based gait recognition pipeline",
      "Graph Convolutional Neural Networks (GCNN) for enhanced accuracy",
      "Image processing & feature extraction with OpenCV",
      "ML classification using SVM and CNN techniques",
      "Research paper accepted and published by the MIC journal",
    ],
    metrics: [
      { value: "Published", label: "MIC Journal" },
      { value: "GCNN", label: "Deep learning" },
      { value: "Multi-view", label: "Gait analysis" },
    ],
    stack: ["Python", "GCNN", "OpenCV", "SVM", "CNN"],
  },
];

export const mlProjects = [
  {
    slug: "visionary-object-detection",
    name: "Visionary — Real-Time Object Detection & Tracking",
    tag: "Computer Vision",
    year: "2024",
    role: "ML Engineer",
    desc: "Real-time multi-object detection & tracking pipeline running at 60 FPS — detects 80+ classes and tracks them across frames with persistent IDs.",
    overview:
      "An end-to-end computer-vision system combining YOLOv8 detection with DeepSORT tracking, optimized with TensorRT for real-time inference. Served behind a FastAPI gateway with a live WebSocket video stream.",
    features: [
      "YOLOv8 object detection across 80+ COCO classes at 60 FPS",
      "DeepSORT multi-object tracking with persistent re-identification",
      "TensorRT + ONNX optimization for low-latency GPU inference",
      "Real-time RTSP/WebRTC video ingestion and annotated streaming",
      "FastAPI inference service with Prometheus metrics & Docker deployment",
    ],
    metrics: [
      { value: "60 FPS", label: "Real-time inference" },
      { value: "80+", label: "Object classes" },
      { value: "TensorRT", label: "GPU-optimized" },
    ],
    stack: ["PyTorch", "YOLOv8", "OpenCV", "DeepSORT", "TensorRT", "ONNX", "FastAPI", "Docker"],
  },
  {
    slug: "documind-rag-assistant",
    name: "DocuMind — RAG Document Q&A Assistant",
    tag: "NLP / LLM",
    year: "2024",
    role: "ML Engineer",
    desc: "Retrieval-Augmented Generation assistant that answers questions over thousands of documents with grounded, cited responses.",
    overview:
      "A production RAG pipeline that ingests PDFs, chunks and embeds them into a FAISS vector store, and answers user questions with an LLM — returning grounded answers with source citations to prevent hallucination.",
    features: [
      "Document ingestion, chunking & embedding with Sentence-Transformers",
      "FAISS vector store with hybrid semantic + keyword retrieval",
      "LangChain orchestration over OpenAI / LLaMA models",
      "Citation-grounded answers with source highlighting",
      "Streaming responses via FastAPI + a Streamlit chat UI",
      "Re-ranking with cross-encoders for higher answer precision",
    ],
    metrics: [
      { value: "RAG", label: "Grounded answers" },
      { value: "FAISS", label: "Vector search" },
      { value: "LangChain", label: "LLM orchestration" },
    ],
    stack: ["LangChain", "Hugging Face", "FAISS", "Sentence-Transformers", "OpenAI", "PyTorch", "FastAPI", "Streamlit"],
  },
  {
    slug: "sentinel-nlp",
    name: "SentinelNLP — Large-Scale Sentiment & Intent Analysis",
    tag: "NLP",
    year: "2023",
    role: "ML Engineer",
    desc: "Fine-tuned transformer pipeline classifying sentiment and intent across millions of reviews in a streaming data architecture.",
    overview:
      "A scalable NLP platform that fine-tunes BERT for sentiment and intent classification, then serves predictions over a Kafka + Spark streaming pipeline to process millions of text records per day.",
    features: [
      "Fine-tuned BERT / RoBERTa with Hugging Face Transformers",
      "spaCy preprocessing, tokenization & entity extraction",
      "Kafka + Spark Structured Streaming for millions of records/day",
      "Multi-label intent classification with calibrated confidence",
      "MLflow experiment tracking and model registry",
    ],
    metrics: [
      { value: "94%", label: "F1 score" },
      { value: "1M+/day", label: "Records processed" },
      { value: "BERT", label: "Transformer model" },
    ],
    stack: ["Transformers", "BERT", "PyTorch", "spaCy", "Hugging Face", "Kafka", "Spark", "MLflow"],
  },
  {
    slug: "mediscan-segmentation",
    name: "MediScan — Medical Image Segmentation",
    tag: "Deep Learning · Healthcare",
    year: "2023",
    role: "ML Researcher",
    desc: "U-Net based segmentation of tumors and organs from MRI/CT scans with clinical-grade accuracy.",
    overview:
      "A medical imaging deep-learning system using a U-Net architecture (via MONAI) to segment tumors and anatomical structures from volumetric MRI/CT scans, with a full preprocessing and augmentation pipeline.",
    features: [
      "3D U-Net segmentation built on TensorFlow/Keras & MONAI",
      "DICOM/NIfTI volume loading and intensity normalization",
      "Heavy data augmentation (elastic, affine, intensity) for generalization",
      "Dice + Tversky loss for class-imbalanced segmentation",
      "Inference API exporting segmentation masks & volume metrics",
    ],
    metrics: [
      { value: "0.91", label: "Dice score" },
      { value: "U-Net", label: "Architecture" },
      { value: "3D", label: "Volumetric scans" },
    ],
    stack: ["TensorFlow", "Keras", "MONAI", "OpenCV", "NumPy", "nibabel", "scikit-image"],
  },
  {
    slug: "reco-engine",
    name: "RecoEngine — Hybrid Recommendation System",
    tag: "Recommender Systems",
    year: "2024",
    role: "ML Engineer",
    desc: "Hybrid recommender combining collaborative filtering and content-based models to personalize at scale with sub-50ms serving.",
    overview:
      "A hybrid recommendation engine that blends matrix-factorization collaborative filtering with content-based embeddings, served from a Redis feature cache for sub-50ms personalized recommendations.",
    features: [
      "Collaborative filtering with TensorFlow Recommenders & implicit ALS",
      "Content-based embeddings with LightFM hybrid model",
      "Candidate generation + ranking two-stage architecture",
      "Redis online feature store for low-latency serving",
      "Offline evaluation with NDCG, recall@k and A/B testing harness",
    ],
    metrics: [
      { value: "<50ms", label: "Serving latency" },
      { value: "+32%", label: "CTR uplift" },
      { value: "Hybrid", label: "CF + content" },
    ],
    stack: ["TensorFlow Recommenders", "LightFM", "implicit", "scikit-learn", "Redis", "Spark", "Pandas"],
  },
  {
    slug: "echovoice-speech",
    name: "EchoVoice — Speech-to-Text & Voice Assistant",
    tag: "Speech / Audio",
    year: "2024",
    role: "ML Engineer",
    desc: "Real-time speech transcription and voice command system powered by Whisper with streaming low-latency output.",
    overview:
      "A real-time speech system built on OpenAI Whisper for transcription, with a voice-activity-detection front end and a WebRTC streaming pipeline delivering live captions and voice commands.",
    features: [
      "Whisper-based transcription fine-tuned for domain vocabulary",
      "Voice Activity Detection (VAD) for low-latency streaming",
      "torchaudio feature extraction & noise reduction",
      "Real-time WebRTC audio ingestion with FastAPI backend",
      "Intent parsing layer for voice-command execution",
    ],
    metrics: [
      { value: "Whisper", label: "ASR model" },
      { value: "Real-time", label: "Streaming" },
      { value: "<300ms", label: "Latency" },
    ],
    stack: ["Whisper", "PyTorch", "torchaudio", "Transformers", "WebRTC", "FastAPI"],
  },
  {
    slug: "artforge-diffusion",
    name: "ArtForge — Generative Image Synthesis",
    tag: "Generative AI",
    year: "2024",
    role: "ML Engineer",
    desc: "Text-to-image generation platform built on Stable Diffusion with fine-tuning, ControlNet guidance, and prompt management.",
    overview:
      "A generative-AI image platform using Stable Diffusion via the Diffusers library, with LoRA fine-tuning, ControlNet for structural guidance, and CLIP-based prompt scoring for quality control.",
    features: [
      "Stable Diffusion text-to-image with the 🤗 Diffusers pipeline",
      "LoRA fine-tuning for custom styles & subjects",
      "ControlNet conditioning (pose, depth, edges) for guided generation",
      "CLIP-based prompt/image alignment scoring",
      "GPU batch inference queue with a FastAPI gallery backend",
    ],
    metrics: [
      { value: "Diffusion", label: "Generative model" },
      { value: "LoRA", label: "Fine-tuned" },
      { value: "ControlNet", label: "Guided synthesis" },
    ],
    stack: ["Stable Diffusion", "PyTorch", "Diffusers", "ControlNet", "CLIP", "Transformers", "FastAPI"],
  },
  {
    slug: "forecastiq-timeseries",
    name: "ForecastIQ — Time-Series Forecasting Platform",
    tag: "Forecasting",
    year: "2023",
    role: "ML Engineer",
    desc: "Demand & financial forecasting platform combining classical statistical models with LSTM and gradient-boosted ensembles.",
    overview:
      "A forecasting platform that benchmarks Prophet, ARIMA, LSTM and XGBoost on demand/financial series, then ensembles the best per-series models with automated backtesting and confidence intervals.",
    features: [
      "Multi-model benchmark: Prophet, ARIMA (statsmodels), LSTM, XGBoost",
      "LSTM sequence models built in PyTorch for nonlinear trends",
      "Automated feature engineering on lags, seasonality & holidays",
      "Walk-forward backtesting with confidence intervals",
      "Per-series automatic model selection & ensembling",
    ],
    metrics: [
      { value: "Ensemble", label: "Multi-model" },
      { value: "LSTM", label: "Deep forecasting" },
      { value: "Backtested", label: "Walk-forward" },
    ],
    stack: ["PyTorch", "Prophet", "statsmodels", "XGBoost", "scikit-learn", "Pandas", "NumPy"],
  },
  {
    slug: "autolane-adas",
    name: "AutoLane — Lane & Object Perception for ADAS",
    tag: "Computer Vision · Autonomous",
    year: "2023",
    role: "ML Researcher",
    desc: "Perception stack for advanced driver assistance — lane segmentation and object detection validated in the CARLA simulator.",
    overview:
      "An ADAS perception module performing lane-line segmentation and on-road object detection, trained on driving datasets and validated in the CARLA autonomous-driving simulator.",
    features: [
      "Semantic segmentation for lane and drivable-area detection",
      "Object detection for vehicles, pedestrians & signs",
      "OpenCV perspective transform for bird's-eye lane fitting",
      "Training & validation loops in PyTorch with mixed precision",
      "Closed-loop testing inside the CARLA simulator",
    ],
    metrics: [
      { value: "ADAS", label: "Perception stack" },
      { value: "CARLA", label: "Sim-validated" },
      { value: "Real-time", label: "Inference" },
    ],
    stack: ["PyTorch", "OpenCV", "Segmentation", "CARLA", "NumPy", "Albumentations"],
  },
  {
    slug: "fraudguard-detection",
    name: "FraudGuard — Real-Time Fraud Detection",
    tag: "ML · Anomaly Detection",
    year: "2024",
    role: "ML Engineer",
    desc: "Streaming fraud-detection system scoring transactions in real time with gradient-boosted models and anomaly detection.",
    overview:
      "A real-time fraud detection pipeline that scores financial transactions on a Kafka stream using gradient-boosted ensembles and an autoencoder anomaly detector, backed by an online feature store.",
    features: [
      "XGBoost + LightGBM ensemble for supervised fraud scoring",
      "Autoencoder (TensorFlow) anomaly detection for novel fraud patterns",
      "Kafka streaming with sub-second transaction scoring",
      "Online feature store with rolling aggregations",
      "SHAP explainability for flagged transactions",
    ],
    metrics: [
      { value: "0.97", label: "ROC-AUC" },
      { value: "<1s", label: "Scoring latency" },
      { value: "Streaming", label: "Real-time" },
    ],
    stack: ["XGBoost", "LightGBM", "TensorFlow", "scikit-learn", "Kafka", "SHAP", "Pandas"],
  },
];

export const allProjects = [...projects, ...mlProjects];

export const resumes = [
  {
    label: "Python / Full Stack",
    desc: "FastAPI, Odoo, React, PostgreSQL, AWS",
    file: "/resume/Hemanth_Kata_Python.pdf",
  },
  {
    label: "Odoo Developer",
    desc: "Odoo 17, custom modules, QWeb, ERP",
    file: "/resume/Hemanth_Kata_Odoo.pdf",
  },
  {
    label: "Java Developer",
    desc: "Spring Boot, Hibernate, microservices",
    file: "/resume/Hemanth_Kata_Java.pdf",
  },
];

// extended case-study content, keyed by project slug
export const projectDetails = {
  "pos-application": {
    challenge:
      "Small retailers needed an affordable, cloud-based POS that worked in real time across multiple terminals without expensive proprietary hardware or lock-in.",
    approach: [
      "Designed a FastAPI async backend with a clean domain layer for products, carts, orders and payments.",
      "Built a React.js cashier UI consuming REST endpoints with optimistic updates for a snappy checkout.",
      "Integrated Stripe with webhook handlers to reconcile payment state reliably, even on network drops.",
      "Offloaded invoicing and email to Celery + Redis so checkout stays instant under load.",
    ],
    impact:
      "Delivered an end-to-end POS that processes orders, payments and invoices in real time, containerized for one-command deployment to AWS.",
  },
  "helpdesk-analytics": {
    challenge:
      "Support leads had no visibility into SLA compliance, and sensitive turn-around-time metrics were leaking into client-facing views.",
    approach: [
      "Extended Odoo's helpdesk with computed SLA fields and pivot/graph analytics views.",
      "Built a wizard model to filter reports by date range, team and ticket priority.",
      "Rendered a professional QWeb PDF report via wkhtmltopdf for stakeholder distribution.",
      "Locked down TAT data with record rules and ACLs so only internal roles could see it.",
    ],
    impact:
      "Gave managers real-time SLA insight while keeping confidential metrics secure, replacing manual spreadsheet reporting entirely.",
  },
  "team-weekly-plan": {
    challenge:
      "Teams tracked weekly plans in scattered spreadsheets with no approval trail and no visibility for managers.",
    approach: [
      "Built a custom team_weekly_plan module from scratch with a Draft → Submitted → Approved/Rejected state machine.",
      "Added manager supervision and role-based access so the right people approve the right plans.",
      "Automated stage-change email notifications via Python-rendered mail.mail records.",
      "Resolved Odoo 17-specific mail template rendering issues encountered during rollout.",
    ],
    impact:
      "Replaced ad-hoc planning with a governed, auditable workflow and automated notifications, improving accountability across teams.",
  },
  "gait-recognition": {
    challenge:
      "Identifying suspects from surveillance is hard when faces are obscured — but gait (the way a person walks) is unique and viewable from afar.",
    approach: [
      "Captured multi-angle posture sequences and modeled the body as a graph of joints.",
      "Applied Graph Convolutional Neural Networks (GCNN) to learn discriminative gait features.",
      "Combined CNN feature extraction with SVM classification for robust recognition.",
      "Used OpenCV for preprocessing, silhouette extraction and feature engineering.",
    ],
    impact:
      "Achieved improved multi-view recognition accuracy; the research was peer-reviewed and published in the MIC journal.",
  },
  "visionary-object-detection": {
    challenge:
      "Standard detection models lose object identity across frames and rarely hit real-time speeds on live video feeds.",
    approach: [
      "Paired YOLOv8 detection with a DeepSORT tracker for persistent per-object IDs.",
      "Optimized inference with TensorRT + ONNX to reach 60 FPS on a single GPU.",
      "Built an RTSP/WebRTC ingestion layer for live annotated streaming.",
      "Exposed the pipeline behind FastAPI with Prometheus metrics and Docker packaging.",
    ],
    impact:
      "A production-ready perception service that detects 80+ classes and tracks them reliably in real time across live camera feeds.",
  },
  "documind-rag-assistant": {
    challenge:
      "LLMs hallucinate and can't answer questions about private documents they were never trained on.",
    approach: [
      "Built an ingestion pipeline that chunks and embeds PDFs with Sentence-Transformers.",
      "Stored vectors in FAISS with hybrid semantic + keyword retrieval and cross-encoder re-ranking.",
      "Orchestrated retrieval-augmented generation with LangChain over OpenAI / LLaMA models.",
      "Returned grounded answers with inline source citations to keep responses verifiable.",
    ],
    impact:
      "Lets users chat with thousands of documents and get accurate, cited answers — eliminating hallucination on private knowledge bases.",
  },
  "sentinel-nlp": {
    challenge:
      "Analyzing customer sentiment and intent across millions of daily reviews demanded both accuracy and streaming throughput.",
    approach: [
      "Fine-tuned BERT/RoBERTa with Hugging Face Transformers for sentiment + multi-label intent.",
      "Used spaCy for preprocessing, tokenization and entity extraction.",
      "Served predictions over a Kafka + Spark Structured Streaming pipeline.",
      "Tracked experiments and versioned models with MLflow.",
    ],
    impact:
      "Processed 1M+ records/day at 94% F1, turning raw feedback into real-time, actionable sentiment and intent signals.",
  },
  "mediscan-segmentation": {
    challenge:
      "Manually delineating tumors and organs on 3D scans is slow, subjective and error-prone for clinicians.",
    approach: [
      "Built a 3D U-Net with TensorFlow/Keras and MONAI for volumetric segmentation.",
      "Loaded DICOM/NIfTI volumes with intensity normalization and heavy augmentation.",
      "Trained with Dice + Tversky loss to handle severe class imbalance.",
      "Exposed an inference API returning segmentation masks and volume metrics.",
    ],
    impact:
      "Reached a 0.91 Dice score, providing fast, consistent segmentation to assist clinical diagnosis and treatment planning.",
  },
  "reco-engine": {
    challenge:
      "Personalization needs both behavioral signals and content understanding — and must serve recommendations in milliseconds.",
    approach: [
      "Combined collaborative filtering (TF Recommenders, implicit ALS) with content embeddings (LightFM).",
      "Used a two-stage candidate-generation + ranking architecture.",
      "Served features from a Redis online store for sub-50ms latency.",
      "Validated offline with NDCG/recall@k plus an online A/B testing harness.",
    ],
    impact:
      "Lifted click-through rate by 32% while serving personalized recommendations in under 50ms.",
  },
  "echovoice-speech": {
    challenge:
      "Voice interfaces need accurate, low-latency transcription that holds up against noise and domain jargon.",
    approach: [
      "Fine-tuned Whisper for domain vocabulary and accents.",
      "Added Voice Activity Detection for low-latency streaming transcription.",
      "Processed audio with torchaudio (noise reduction, feature extraction).",
      "Built a WebRTC ingestion layer with a FastAPI backend and an intent-parsing stage.",
    ],
    impact:
      "Delivered real-time captions and voice commands at sub-300ms latency, robust to background noise.",
  },
  "artforge-diffusion": {
    challenge:
      "Off-the-shelf image generators lack brand-specific style control and structural guidance for production use.",
    approach: [
      "Built text-to-image generation on Stable Diffusion via the Diffusers pipeline.",
      "Fine-tuned styles and subjects with LoRA for brand consistency.",
      "Added ControlNet conditioning (pose/depth/edges) for guided composition.",
      "Scored prompt/image alignment with CLIP and queued GPU batch inference.",
    ],
    impact:
      "Enabled controllable, on-brand image generation at scale through a gallery API with quality scoring.",
  },
  "forecastiq-timeseries": {
    challenge:
      "No single forecasting model wins across diverse demand and financial series — and accuracy needs honest validation.",
    approach: [
      "Benchmarked Prophet, ARIMA, LSTM (PyTorch) and XGBoost per series.",
      "Engineered lag, seasonality and holiday features automatically.",
      "Validated with walk-forward backtesting and confidence intervals.",
      "Auto-selected and ensembled the best model per series.",
    ],
    impact:
      "Produced robust, backtested forecasts with uncertainty bounds, outperforming any single-model baseline.",
  },
  "autolane-adas": {
    challenge:
      "Driver-assistance perception must detect lanes and obstacles reliably — and be testable without real-world risk.",
    approach: [
      "Trained semantic segmentation for lane and drivable-area detection.",
      "Added object detection for vehicles, pedestrians and signs.",
      "Applied OpenCV perspective transforms for bird's-eye lane fitting.",
      "Validated the stack in closed-loop runs inside the CARLA simulator.",
    ],
    impact:
      "A real-time ADAS perception module validated safely in simulation before any on-road deployment.",
  },
  "fraudguard-detection": {
    challenge:
      "Fraud evolves constantly, so detection must catch both known patterns and novel anomalies in real time — and explain its decisions.",
    approach: [
      "Built an XGBoost + LightGBM ensemble for supervised fraud scoring.",
      "Added a TensorFlow autoencoder for unsupervised anomaly detection.",
      "Scored transactions on a Kafka stream with an online feature store.",
      "Used SHAP to explain every flagged transaction for analysts.",
    ],
    impact:
      "Reached 0.97 ROC-AUC with sub-second scoring and transparent, explainable fraud alerts.",
  },
};

export function getProjectDetails(slug) {
  return projectDetails[slug];
}

export const marqueeSkills = [
  "Python", "FastAPI", "Odoo 17", "Java 11", "Spring Boot", "React.js",
  "PostgreSQL", "Docker", "AWS", "Redis", "Celery", "Hibernate",
  "JWT / OAuth2", "Tailwind CSS", "Nginx", "CI/CD",
];

export const certifications = [
  "AWS Academy Cloud Foundations",
  "AWS Academy Machine Learning Foundations",
  "Azure Data Engineer Associate",
  "PCAP: Python — Cisco / OpenEDG",
  "DevOps Foundation — Infosys",
  "Design Thinking for Innovation",
];

export const education = [
  {
    degree: "B.Tech — Computer Science & Engineering",
    school: "Dhanekula Institute of Engineering and Technology",
    period: "2019 – 2023",
  },
  {
    degree: "Java Full Stack Development Bootcamp",
    school: "The Tap Academy",
    period: "2023",
  },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Experience", href: "/experience" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

export function getProject(slug) {
  return allProjects.find((p) => p.slug === slug);
}
export function getService(slug) {
  return services.find((s) => s.slug === slug);
}

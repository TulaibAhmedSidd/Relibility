You are an expert full-stack engineer, elite B2B conversion strategist, and Technical SEO Architect. Rebuild the complete Next.js (App Router, React 19) + MongoDB (Mongoose) web application for "Reliability Quality Solutions" (RQS). The primary, non-negotiable objective of this rebuild is to rank #1 on US search engines for high-value engineering consultancies and generate high-intent inbound corporate sales leads.

### 1. High-Conversion Lead Capture Engine (CRO Architecture)
Corporate engineering directors do not fill out long generic contact forms when their assembly lines are failing. Build a frictionless conversion system:
- Sticky Navigation Utility: The header must feature an ultra-clear, high-contrast action button labeled "Request Expert Consultation" or "Get Critical Support".
- Contextual Inline Inline RFQ (Request for Quote) Modules: Insert a clean, 3-step lightweight micro-form inside every major service category. Fields must collect: Name, Corporate Email, Phone, Company Name, Industry Sector (Aerospace, Semiconductor, EV Battery, Medical Devices, Consumer Electronics), and an expanding text box for "Technical Requirements / Problem Statement".
- Floating Rapid-Response Widget: Replace the generic floating icon with a proactive "Engineering Desk Support" component. When clicked, it expands a beautiful sliding pane that allows an engineer to submit an urgent callback request directly logged into the MongoDB 'Leads' collection.
- Persistent Urgency & Proof Callouts: Place localized, highly technical trust anchors right beside lead forms (e.g., "Over 25 years of Fortune 100/500 engineering leadership", "AUSA National Standards Compliant").

### 2. High-Performance Programmatic Technical SEO Architecture
To ensure top rankings in the USA, implement structural and metadata configurations directly into the code:
- Semantic HTML & Dynamic Meta Structures: Generate dynamic title tags and meta descriptions pulled directly from the MongoDB content store for every route. Title formats must strictly target high-intent transactional search patterns: "[Service Name] Consulting Services in USA | RQS" or "Expert [Standard/Test Name] Compliance Engineering".
- Automatic Schema Markup (JSON-LD): Inject structured corporate schema and entity schemas within the layout file. This includes:
  * 'ProfessionalService' schema capturing core corporate variables (phone, geo-location, address).
  * 'Person' schema for founder Shams Jawaid, explicitly linking his recognized industry publications (e.g., IEEE Annual Reliability Symposium papers, Digital Equipment Corp, Quantum Corp) to establish maximum E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) with search engines.
- Performance and Core Web Vitals Optimization: The coding tool must output optimized images, clean semantic Tailwind code, minimal layout shifts, and perfect desktop/mobile accessibility scores to maximize ranking signals.

### 3. Database Schema Evolution (MongoDB + Mongoose Models)
Expand the database layer to manage SEO attributes and track inbound enterprise leads seamlessly from a single source:

1. 'ThemeConfig':
   - Fields: { primaryColor: String, secondaryColor: String, contactPhone: String, corporateEmail: String, headOfficeAddress: String }
2. 'PageContent' (With Embedded SEO Controls):
   - Fields: { pageKey: String, sectionKey: String, title: String, subtitle: String, bodyText: String, jsonArrayData: Array, seoTitle: String, seoDescription: String, keywords: [String] }
3. 'Leads' (Inbound Sales Database):
   - Fields: { name: String, corporateEmail: String, phone: String, companyName: String, industrySector: String, technicalDetails: String, submissionSourceUrl: String, status: { type: String, default: 'New' }, createdAt: { type: Date, default: Date.now } }

#### API Endpoints Required:
- 'app/api/leads/route.ts': Handles POST requests from frontend forms to securely validate and save lead entries into MongoDB, with basic response flags for the UI to display success states.
- 'app/api/content/route.ts' & 'app/api/theme/route.ts': Content/Theme retrieval and storage endpoints powering the dynamic pages and the administrative panel.

### 4. Search-Optimized Page Content Matrix
All generated page structures must dynamically map highly targeted industry search keywords seamlessly into the UI:

#### A. Core Landing Hub & Services Array
Optimize explicitly for critical search keys across the US industrial landscape:
1. Product Qualification Standards Landing: Heavily target: JEDEC, Bellcore, IEC, MIL-STD-883, Telcordia, UL, Semiconductors, EV/Lithium-Ion Battery Testing, and EVT/DVT workflows.
2. Quality Management Systems (QMS): Highly optimize text arrays for: QMS Implementation, Certified Quality Engineer (CQE), Supplier Quality Engineer (SQE), Yield Optimization, and ISO 9001:2015 / ISO 14001 frameworks.
3. Reliability Engineering & NPI: Structure copy for: New Product Introduction (NPI) Reliability Modeling, Reliasoft/Relex software implementation, HALT/HASS thermal testing, 4 & 8 Corner Stress testing, and DFMEA/PFMEA risk profiling.
4. Manufacturing Process Control: Focus text paths cleanly on: PCBA Line Audits, Automated Optical Inspection (AOI), Solder Reflow Optimization, and Statistical Process Control (SPC) Data Logging.
5. Technical Training & Instruction: Direct alignment with queries regarding: Semiconductor Thermal Analysis, Electronic Cooling Architecture, and Vibration Test Equipment Selection.

#### B. Inbound Admin Lead Dashboard ('/admin/leads')
Build a highly functional management panel interface specifically to review and track captured client leads:
- Build a responsive data table layout streaming item entries securely from the 'Leads' collection.
- Display columns for: Submission Date, Client Name, Company, Target Industry, and Technical Requirements text excerpt.
- Include instant interactive dropdown fields to change Lead Status tracking flags ('New', 'Contacted', 'Qualified', 'Archived').

### 5. Technical Stack Directives
Execute this builds with Next.js App Router using full TypeScript integrity. Style using Tailwind CSS variables mapped precisely from the MongoDB theme parameters to enable easy adjustments via the admin workspace. Maintain flawless responsiveness from small mobile interfaces up to massive ultra-wide monitors. Initialize the codebase and start building now.
import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

const downloadText = (filename, text) => {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

function useMermaid(diagramCode) {
  const ref = useRef(null);
  useEffect(() => {
    if (!diagramCode || !ref.current) return;
    const el = ref.current;
    const code = diagramCode.replace(/^```mermaid\n?|```$/g, "");
    const id = `mmd-${Math.random().toString(36).slice(2)}`;
    el.innerHTML = `<div class="mermaid" id="${id}">${code}</div>`;
    mermaid.initialize({ startOnLoad: false, securityLevel: "loose" });
    mermaid.run({ nodes: [el] });
  }, [diagramCode]);
  return ref;
}

async function callDigitalTwin(userPrompt, deliverableType) {
  const now = new Date();
  const ymd = now.toISOString().slice(0, 10);
  const intake = [
    "Objective: Generate BA/PM/Agile/SE/ML artefacts as if by Siddarth",
    `User request: ${userPrompt}`,
    `Deliverable bias: ${deliverableType || "auto"}`,
    "Assumptions: clarify scope, stakeholders, constraints",
    "Success: actionable templates + visuals + RAID + decisions",
  ]
    .map((x) => `- ${x}`)
    .join("\n");

  const plan = [
    "**Phase 1 – Discovery:** Stakeholders, problem framing, constraints",
    "**Phase 2 – Options & Roadmap:** BA/SE options, backlog, milestones",
    "**Phase 3 – Build-Measure:** Iterations with stories/AC, diagrams",
    "**Phase 4 – UAT & Readiness:** Test strategy, training, comms",
    "**Phase 5 – Go-Live & Hypercare:** cutover plan, KPIs, monitoring",
  ].join("\n");

  const gantt = `\n\n\n\n\n\n\n\n\n\n\n\n\n```mermaid\ngantt\n  title Delivery Plan (High Level)\n  dateFormat  YYYY-MM-DD\n  section Initiation\n  Discovery & Stakeholders        :active, a1, ${ymd}, 7d\n  Business Case & Options         :a2, after a1, 7d\n  section Delivery Setup\n  Roadmap & Backlog               :a3, after a2, 10d\n  Architecture & Interfaces       :a4, after a2, 10d\n  section Build & Test\n  Iteration 1                     :a5, after a3, 14d\n  Iteration 2                     :a6, after a5, 14d\n  UAT & Readiness                 :a7, after a6, 10d\n  section Launch\n  Go-Live & Hypercare             :a8, after a7, 7d\n```\n`;

  const mindmap = `\n```mermaid\nmindmap\n  root((Goal))\n    Context\n      Business drivers\n      Users & personas\n      Constraints\n    Workstreams\n      BA\n        Discovery\n        Requirements\n        BPMN\n      PM\n        Plan\n        RAID\n        Comms\n      Agile\n        Roadmap\n        Epics/Stories\n      Solutions\n        Options\n        Integration spec\n      ML\n        Data readiness\n        Baseline & metrics\n        MLOps\n    Deliverables\n      BRD\n      WBS\n      Architecture diagram\n      Test strategy\n      Change plan\n```\n`;

  const arch = `\n```mermaid\nflowchart LR\n  U[End Users] -->|Web/App| FE[Frontend (Next.js)]\n  FE --> API[(Backend API - FastAPI)]\n  API --> INT[Integration Layer / iPaaS]\n  API --> DB[(Operational DB)]\n  INT --> SaaS[(SaaS/ERP/CRM)]\n  INT --> DWH[(Analytics DWH)]\n  API --> AUTH[(AuthN/Z)]\n  subgraph ML\n    FS[Feature Store] --> MLR[Model Registry]\n    MLR --> SVC[Model Serving]\n  end\n  DB --> FS\n  SVC --> API\n```\n`;

  const proc = `\n```mermaid\nflowchart TD\n  A[Capture Requirement] --> B[Classify (BA/PM/Agile/SE/ML)]\n  B -->|BA| C[Generate BRD Template]\n  B -->|PM| D[Generate WBS/RAID]\n  B -->|Agile| E[Epics/Stories/AC]\n  B -->|SE| F[Options & Interface Spec]\n  B -->|ML| G[ML Canvas & Pipeline]\n  C & D & E & F & G --> H[Assemble Pack + Diagrams + Mindmap]\n  H --> I{User Review}\n  I -->|Refine| B\n  I -->|Approve| J[Export DOCX/PDF/MD]\n```\n`;

  const deliverables = [
    {
      title: "Business Requirements Document (Draft)",
      type: "BRD",
      markdown: `# BRD\n\n## 1. Executive Summary\nDrafted from: \n> ${userPrompt}\n\n## 2. Scope\n- In-scope: ...\n- Out-of-scope: ...\n\n## 3. Stakeholders\n- Sponsor, SMEs, Users\n\n## 4. Functional Requirements\n- FR-001 ...\n\n## 5. Non-Functional Requirements\n- Availability, Security, Privacy, Accessibility\n\n## 6. Risks & Assumptions\n- R-01 ...\n\n## 7. Acceptance Criteria\n- Given/When/Then ...\n\n## 8. Next Steps\n- Clarify data sources, integrations, constraints\n`,
      docx: "",
      pdf: "",
    },
    {
      title: "RAID Log (Initial)",
      type: "RAID",
      markdown:
        "| ID | Type | Description | Likelihood | Impact | Owner | Mitigation |\n|---|---|---|---|---|---|---|\n| R-01 | Risk | Data quality issues | Medium | High | BA | Profiling + validation |\n| A-01 | Assumption | Vendor APIs stable | n/a | n/a | SE | Confirm in RFI |\n| I-01 | Issue | Env parity gaps | Medium | Medium | Eng | Align IaC |\n| D-01 | Decision | SaaS over custom build | n/a | n/a | SteerCo | TCO vs time-to-value |",
      docx: "",
      pdf: "",
    },
  ];

  return {
    intake_summary: intake,
    plan_markdown: plan,
    plan_gantt_mermaid: gantt,
    mindmap_mermaid: mindmap,
    architecture_mermaid: arch,
    process_mermaid: proc,
    deliverables,
    raid_table_markdown: deliverables[1].markdown,
    decision_log_markdown:
      "| Date | Decision | Context | Alternatives | Rationale |\n|---|---|---|---|---|\n| YYYY-MM-DD | Adopt SaaS | Time-to-value | Custom, Hybrid | Lower TCO, faster delivery |",
    export_suggestions: ["DOCX", "PDF", "Markdown"],
  };
}

export default function DigitalTwinApp() {
  const [prompt, setPrompt] = useState("");
  const [dtype, setDtype] = useState("auto");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState("Plan");

  const ganttRef = useMermaid(result?.plan_gantt_mermaid || "");
  const mindmapRef = useMermaid(result?.mindmap_mermaid || "");
  const archRef = useMermaid(result?.architecture_mermaid || "");
  const procRef = useMermaid(result?.process_mermaid || "");

  const onGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const data = await callDigitalTwin(prompt, dtype);
      setResult(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-6xl mx-auto p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Siddarth Digital Twin</h1>
          <p className="text-sm text-slate-600">Ask for BA/PM/Agile/SE/ML deliverables. The agent will plan, mindmap, and diagram the approach—then generate templates as if it were you.</p>
        </header>

        <section className="bg-white rounded-2xl shadow p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <textarea
              className="w-full md:flex-1 border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={3}
              placeholder="e.g., Create a BRD and epics to implement a SaaS claims platform with D365/Coupa integrations, plus a plan and visuals."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="flex gap-2 items-center">
              <select
                className="border rounded-xl p-2"
                value={dtype}
                onChange={(e) => setDtype(e.target.value)}
              >
                <option value="auto">Auto</option>
                <option value="BA">BA</option>
                <option value="PM">PM</option>
                <option value="Agile">Agile</option>
                <option value="SE">Solutions Eng</option>
                <option value="ML">ML</option>
              </select>
              <button
                onClick={onGenerate}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Generating…" : "Generate"}
              </button>
            </div>
          </div>
        </section>

        {result && (
          <>
            <nav className="flex flex-wrap gap-2 mb-4">
              {["Plan", "Mindmap", "Architecture", "Process", "Deliverables", "RAID", "Decisions"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-full border ${
                    activeTab === tab ? "bg-indigo-600 text-white border-indigo-600" : "bg-white hover:bg-slate-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>

            {activeTab === "Plan" && (
              <section className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl shadow p-4">
                  <h3 className="font-semibold mb-2">Intake Summary</h3>
                  <pre className="text-sm whitespace-pre-wrap">{result.intake_summary}</pre>
                  <h3 className="font-semibold mt-4 mb-2">Plan (Markdown)</h3>
                  <pre className="text-sm whitespace-pre-wrap">{result.plan_markdown}</pre>
                </div>
                <div className="bg-white rounded-2xl shadow p-4">
                  <h3 className="font-semibold mb-2">Plan – Gantt (Mermaid)</h3>
                  <div ref={ganttRef} className="overflow-auto" />
                </div>
              </section>
            )}

            {activeTab === "Mindmap" && (
              <section className="bg-white rounded-2xl shadow p-4">
                <h3 className="font-semibold mb-2">Mindmap (Mermaid)</h3>
                <div ref={mindmapRef} className="overflow-auto" />
              </section>
            )}

            {activeTab === "Architecture" && (
              <section className="bg-white rounded-2xl shadow p-4">
                <h3 className="font-semibold mb-2">Architecture (Mermaid)</h3>
                <div ref={archRef} className="overflow-auto" />
              </section>
            )}

            {activeTab === "Process" && (
              <section className="bg-white rounded-2xl shadow p-4">
                <h3 className="font-semibold mb-2">Process (Mermaid)</h3>
                <div ref={procRef} className="overflow-auto" />
              </section>
            )}

            {activeTab === "Deliverables" && (
              <section className="bg-white rounded-2xl shadow p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Deliverables</h3>
                  <button
                    className="px-3 py-1.5 rounded-lg border"
                    onClick={() => downloadText("digital-twin-output.json", JSON.stringify(result, null, 2))}
                  >
                    Download JSON
                  </button>
                </div>
                <ul className="space-y-4">
                  {result.deliverables?.map((d, idx) => (
                    <li key={idx} className="border rounded-2xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{d.title}</h4>
                          <p className="text-xs text-slate-500">Type: {d.type}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            className="px-2 py-1 rounded-lg border"
                            onClick={() => downloadText(`${d.type || "deliverable"}.md`, d.markdown || "")}
                          >
                            Download .md
                          </button>
                        </div>
                      </div>
                      <pre className="text-sm mt-3 whitespace-pre-wrap">{d.markdown}</pre>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {activeTab === "RAID" && (
              <section className="bg-white rounded-2xl shadow p-4">
                <h3 className="font-semibold mb-2">RAID</h3>
                <pre className="text-sm whitespace-pre-wrap">{result.raid_table_markdown}</pre>
              </section>
            )}

            {activeTab === "Decisions" && (
              <section className="bg-white rounded-2xl shadow p-4">
                <h3 className="font-semibold mb-2">Decision Log</h3>
                <pre className="text-sm whitespace-pre-wrap">{result.decision_log_markdown}</pre>
              </section>
            )}
          </>
        )}

        <footer className="text-xs text-slate-500 mt-10">
          <p>
            Starter UI only. Replace the mock with a real API that implements the JSON contract from your system prompt
            (plan + mindmap + diagrams + deliverables + RAID + decisions).
          </p>
        </footer>
      </div>
    </div>
  );
}
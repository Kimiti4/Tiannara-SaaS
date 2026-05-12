import { useState } from "react";
import { Card, Button, Textarea, Badge, LoadingState, EmptyState } from "../components";

const API_BASE = "/api";

export default function DiscoveryLab() {
  const [question, setQuestion] = useState(
    "How can prosthetic grip stability be improved under fatigue?"
  );
  const [text, setText] = useState(
    "Grip stability depends on damping and stiffness. Higher damping reduces slip risk. Fatigue increases tremor and reduces control precision."
  );
  const [source, setSource] = useState("gui_input");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  async function handleAnalyze(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`${API_BASE}/discovery/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          text,
          source,
        }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || `Request failed with status ${res.status}`);
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Failed to run discovery analysis.");
    } finally {
      setLoading(false);
    }
  }

  const report = result?.report || null;
  const safety = report?.safety_gate || null;
  const claims = report?.claims || [];
  const hypotheses = report?.hypotheses || [];
  const experiments = report?.experiments || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold text-white mb-2">Discovery Lab</h1>
        <p className="text-slate-400">
          Ask a research question, provide source text, and let Tiannara generate
          claims, hypotheses, experiment ideas, and a safety review.
        </p>
      </section>

      {/* Input Form */}
      <Card>
        <form onSubmit={handleAnalyze} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Research Question
            </label>
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={3}
              placeholder="Enter your research question..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Source Text / Context
            </label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              placeholder="Provide background information or context..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Data Source
            </label>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            >
              <option value="gui_input">GUI Input</option>
              <option value="prosthetic_sensor">Prosthetic Sensor Data</option>
              <option value="research_paper">Research Paper</option>
              <option value="clinical_trial">Clinical Trial</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={loading} variant="primary">
              {loading ? "Analyzing..." : "Run Analysis"}
            </Button>
            <Button 
              type="button" 
              onClick={() => {
                setQuestion("");
                setText("");
                setResult(null);
                setError("");
              }}
              variant="secondary"
            >
              Clear
            </Button>
          </div>
        </form>
      </Card>

      {/* Error Message */}
      {error && (
        <div className="rounded-2xl border border-rose-800/60 bg-rose-950/20 p-4 text-rose-300">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Loading State */}
      {loading && <LoadingState message="Running discovery analysis..." />}

      {/* Results */}
      {result && !loading && (
        <div className="space-y-6">
          {/* Safety Gate */}
          {safety && (
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                Safety Review
                <Badge variant={safety.approved ? "success" : "danger"}>
                  {safety.approved ? "Approved" : "Flagged"}
                </Badge>
              </h3>
              <p className="text-slate-300">{safety.reasoning}</p>
              {safety.risks && safety.risks.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-slate-400">Identified Risks:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
                    {safety.risks.map((risk, idx) => (
                      <li key={idx}>{risk}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          )}

          {/* Claims */}
          {claims.length > 0 && (
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4">Extracted Claims</h3>
              <div className="space-y-3">
                {claims.map((claim, idx) => (
                  <div key={idx} className="border-l-2 border-cyan-500 pl-4 py-2">
                    <p className="text-slate-200">{claim.text}</p>
                    {claim.confidence && (
                      <p className="text-xs text-slate-500 mt-1">
                        Confidence: {(claim.confidence * 100).toFixed(0)}%
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Hypotheses */}
          {hypotheses.length > 0 && (
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4">Generated Hypotheses</h3>
              <div className="space-y-3">
                {hypotheses.map((hyp, idx) => (
                  <div key={idx} className="bg-slate-950/50 rounded-xl p-4 border border-slate-800">
                    <p className="text-slate-200 font-medium">{hyp.statement}</p>
                    {hyp.testable && (
                      <Badge variant="info" className="mt-2">Testable</Badge>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Experiments */}
          {experiments.length > 0 && (
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4">Suggested Experiments</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {experiments.map((exp, idx) => (
                  <div key={idx} className="bg-slate-950/50 rounded-xl p-4 border border-slate-800">
                    <h4 className="text-white font-medium mb-2">{exp.name || `Experiment ${idx + 1}`}</h4>
                    <p className="text-sm text-slate-300 mb-3">{exp.description}</p>
                    {exp.variables && exp.variables.length > 0 && (
                      <div className="text-xs text-slate-500">
                        <strong>Variables:</strong> {exp.variables.join(", ")}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* No Results */}
          {claims.length === 0 && hypotheses.length === 0 && experiments.length === 0 && (
            <EmptyState
              title="No results generated"
              description="Try providing more detailed context or rephrasing your question."
            />
          )}
        </div>
      )}

      {/* Initial Empty State */}
      {!result && !loading && !error && (
        <EmptyState
          title="Ready to analyze"
          description="Enter a research question and source text above to get started."
        />
      )}
    </div>
  );
}

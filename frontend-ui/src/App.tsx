// src/App.tsx
import { useState } from "react";
import QueryInput from "./components/QueryInput";
import ResultTable from "./components/ResultTable";
import ResultChart from "./components/ResultChart";
import { simulateFHIR } from "./api"; 
import type { Patient } from "./types";

function App() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [summary, setSummary] = useState<Record<string, number>>({});
  const [fhir, setFhir] = useState<any>(null);

  const handleSearch = async (query: string) => {
    try {
      const data = await simulateFHIR(query);
      setPatients(data.patients || []);
      setSummary(data.summary || {});
      setFhir(data.fhir || null);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch results from backend.");
    }
  };

  return (
  <div className="w-full p-6">
    <div className="flex justify-center">
    <h1 className="text-3xl font-bold text-center mb-6">
      AI on FHIR - Query Engine
    </h1>
    </div>

    <div className="max-w-3xl mx-auto">
      <QueryInput onSearch={handleSearch} />
      <ResultChart summary={summary} />
      <ResultTable patients={patients} />
      {fhir && (
        <div className="mt-6">
          <h2 className="font-semibold text-lg mb-2">FHIR Request</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {JSON.stringify(fhir, null, 2)}
          </pre>
        </div>
      )}
    </div>
  </div>
);
}

export default App;

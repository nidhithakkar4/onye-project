import type { Patient } from "../types";

interface Props {
  patients: Patient[];
}

function ResultTable({ patients }: Props) {
  return (
    <div className="mt-4">
      <h2 className="font-semibold text-lg mb-2">Patients</h2>
      {(!patients || patients.length === 0) ? (
        <p className="text-gray-600 italic">No patients in the simulated database matched the query.</p>
      ) : (
        <table className="w-full border text-left">
          <thead>
            <tr>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Age</th>
              <th className="border px-2 py-1">Condition</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p, index) => (
              <tr key={index}>
                <td className="border px-2 py-1">{p.name}</td>
                <td className="border px-2 py-1">{p.age}</td>
                <td className="border px-2 py-1">{p.condition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ResultTable;

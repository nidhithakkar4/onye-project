import type { Patient } from "./types";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  summary: Record<string, number>;
}

function ResultChart({ summary }: Props) {
  if (!summary || Object.keys(summary).length === 0) return null;

  const data = Object.entries(summary).map(([condition, count]) => ({
    condition,
    count,
  }));

  return (
    <div className="mt-4">
      <h2 className="font-semibold text-lg mb-2">Condition Summary</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="condition" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ResultChart;

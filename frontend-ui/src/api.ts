export async function simulateFHIR(query: string) {
  const response = await fetch("http://localhost:5000/api/parse", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch results from backend.");
  }

  return response.json();
}

export async function fetchMetrics() {
  // const res = await fetch("http://127.0.0.1:8000/metrics");
  const res = await fetch("https://cardio-ai-5md2.onrender.com/metrics");

  if (!res.ok) {
    throw new Error("Metrics API failed");
  }

  return await res.json();
}

export async function fetchMetrics() {
  // const res = await fetch("http://127.0.0.1:8000/metrics");
  const res = "https://YOUR-BACKEND.onrender.com";


  if (!res.ok) {
    throw new Error("Metrics API failed");
  }

  return await res.json();
}

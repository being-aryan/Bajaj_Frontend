import { useState } from "react";
import Head from "next/head";

export default function Home() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const options = ["Alphabets", "Numbers", "Highest Alphabet"];

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        throw new Error("Invalid JSON format");
      }

      const res = await fetch("https://22-bcs-14462-aryan-bajaj-finserv-backend.vercel.app/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedInput),
      });
      const result = await res.json();
      setResponse(result);
    } catch (error) {
      alert("Invalid JSON input");
    }
  };

  return (
    <>
      <Head>
        <title>22BCS14462</title>
      </Head>
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-xl font-bold mb-4">Bajaj Finserv Health Dev Challenge</h1>
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          rows="5"
          placeholder='Enter JSON, e.g. { "data": ["A","C","z"] }'
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
        />
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>

        {response && (
          <div className="mt-4">
            <h2 className="text-lg font-bold">Response</h2>
            <select
              multiple
              className="block w-full p-2 border border-gray-300 rounded"
              onChange={(e) =>
                setSelectedFilters(
                  [...e.target.options]
                    .filter((option) => option.selected)
                    .map((option) => option.value)
                )
              }
            >
              {options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            <div className="mt-2 p-4 border border-gray-300 rounded">
              {selectedFilters.includes("Numbers") && <p>Numbers: {JSON.stringify(response.numbers)}</p>}
              {selectedFilters.includes("Alphabets") && <p>Alphabets: {JSON.stringify(response.alphabets)}</p>}
              {selectedFilters.includes("Highest Alphabet") && <p>Highest Alphabet: {JSON.stringify(response.highest_alphabet)}</p>}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
import { useState } from "react";

interface Props {
  onSearch: (query: string) => void;
}

const SUGGESTIONS = [
  "Show me all diabetic patients over 50",
  "List cancer patients under 40",
  "Find asthma patients above 30",
  "List all patients of age 25 with diabetes",
  "Show all the patients younger than 60 who have asthma",
];

function QueryInput({ onSearch }: Props) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
  };

  const filteredSuggestions = SUGGESTIONS.filter((s) =>
    s.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative w-full max-w-[1600px] mx-auto"> {/* Changed to max-w-[1600px] */}
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col items-center">
        <input
          type="text"
          placeholder="Enter query"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />

        {showSuggestions && query && filteredSuggestions.length > 0 && (
          <div className="relative w-full mt-2" style={{ minHeight: "60px" }}>
            <ul
              className="absolute z-1000 border border-gray-100 rounded-xl shadow-lg w-full max-h-60 overflow-y-auto"
              style={{
                top: 0,
                left: 0,
                backgroundColor: "#bfbfbf",
                color: "#000000",
                fontSize: "16px",
                opacity: 1,
                visibility: "visible",
                listStyle: "none",
              }}
            >
              {filteredSuggestions.map((s, i) => (
                <li
                  key={i}
                  onClick={() => handleSuggestionClick(s)}
                  className="p-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="submit"
          className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default QueryInput;
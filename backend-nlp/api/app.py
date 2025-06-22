from flask import Flask, request, jsonify
from flask_cors import CORS
from nlp_utils import extract_info, simulate_fhir_request

from flask_cors import CORS
app = Flask(__name__)
CORS(app) 

@app.route("/api/parse", methods=["POST"])
def parse_query():
    data = request.get_json()
    query = data.get("query", "")
    parsed = extract_info(query)
    fhir_response = simulate_fhir_request(parsed)

    # Simulated patient database
    all_patients = [
        {"name": "John Doe", "age": 55, "condition": "diabetic"},
        {"name": "Jane Smith", "age": 60, "condition": "cancer"},
        {"name": "Alex Ray", "age": 35, "condition": "cancer"},
        {"name": "Priya Kumar", "age": 25, "condition": "asthma"},
        {"name": "Ravi Verma", "age": 40, "condition": "diabetic"},
    ]

    # Filter by age and condition
    filtered = []
    age = parsed.get("age")
    operator = parsed.get("age_operator", ">")
    condition = parsed.get("condition")

    for p in all_patients:
        if condition and condition not in p["condition"].lower():
            continue

        if age is not None:
            if operator == ">" and p["age"] <= age:
                continue
            if operator == "<" and p["age"] >= age:
                continue
            if operator == "=" and p["age"] != age:
                continue

        filtered.append(p)

    # Summary for chart
    summary = {condition: len(filtered)}

    return jsonify({
        "patients": filtered,
        "summary": summary,
        "fhir": fhir_response
    })


if __name__ == "__main__":
    app.run(debug=True)

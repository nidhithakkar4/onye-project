import spacy

nlp = spacy.load("en_core_web_sm")

def extract_info(text):
    doc = nlp(text)
    age = None
    condition = None
    intent = None
    age_operator = '>'  # Default operator

    text_lower = text.lower()

    # Intent detection
    if any(keyword in text_lower for keyword in ["show", "list", "find"]):
        intent = "search"

    # Age comparison
    if any(x in text_lower for x in ["under", "below", "younger than"]):
        age_operator = '<'
    elif any(x in text_lower for x in ["over", "above", "older than"]):
        age_operator = '>'
    elif any(x in text_lower for x in ["of age", "age is", "age equal", "exact age", "age ="]):
        age_operator = '='

    # Extract entities
    for ent in doc.ents:
        if ent.label_ == "CARDINAL":
            try:
                age_candidate = int(ent.text)
                age = age_candidate
            except ValueError:
                pass
        if ent.label_ in ["DISEASE", "NORP", "CONDITION"] or any(x in ent.text.lower() for x in ["diabet", "cancer", "asthma"]):
            condition = ent.text.lower()

    if condition is None:
        for token in doc:
            if token.text.lower() in ["diabetes", "diabetic", "cancer", "asthma"]:
                condition = token.text.lower()

    if age is None:
        for token in doc:
            if token.text.isdigit():
                age = int(token.text)

    return {
        "intent": intent,
        "age": age,
        "age_operator": age_operator,
        "condition": condition
    }

def simulate_fhir_request(parsed_info):
    age = parsed_info.get("age")
    age_operator = parsed_info.get("age_operator", ">")
    condition = parsed_info.get("condition")

    request = {
        "resourceType": "Bundle",
        "type": "searchset",
        "entry": []
    }

    if age is not None:
        request["entry"].append({
            "resource": {
                "resourceType": "Patient",
                "criteria": {
                    "age": f"{age_operator} {age}"
                }
            }
        })

    if condition:
        request["entry"].append({
            "resource": {
                "resourceType": "Condition",
                "criteria": {
                    "code": condition
                }
            }
        })

    return request

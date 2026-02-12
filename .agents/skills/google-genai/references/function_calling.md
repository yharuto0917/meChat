# Function Calling with Google GenAI

## Overview

Function calling lets Gemini suggest structured tool calls instead of plain text. Your app executes the tool and can send the result back for a final response.

## Basic Function Calling

### Define a Function

```python
from google import genai
from google.genai import types

# Function declaration as JSON Schema
get_weather = {
    "name": "get_weather",
    "description": "Get the current weather for a location",
    "parameters": {
        "type": "object",
        "properties": {
            "location": {
                "type": "string",
                "description": "City and country, e.g., Tokyo, Japan",
            },
            "unit": {
                "type": "string",
                "enum": ["celsius", "fahrenheit"],
                "description": "Temperature unit",
            },
        },
        "required": ["location"],
    },
}

client = genai.Client()

tools = types.Tool(function_declarations=[get_weather])
config = types.GenerateContentConfig(tools=[tools])
```

### Use Function in Model

```python
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="What's the weather in Tokyo?",
    config=config,
)

function_call = response.candidates[0].content.parts[0].function_call
print(function_call.name)
print(function_call.args)
```

## Function Calling Flow

### Complete Flow with Response

```python
from google import genai
from google.genai import types

client = genai.Client()

tool = types.Tool(function_declarations=[
    {
        "name": "calculate",
        "description": "Perform a mathematical calculation",
        "parameters": {
            "type": "object",
            "properties": {
                "expression": {"type": "string"}
            },
            "required": ["expression"],
        },
    }
])

config = types.GenerateContentConfig(tools=[tool])
contents = [types.Content(role="user", parts=[types.Part(text="What's 123 * 456?")])]

# 1) Ask the model
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=contents,
    config=config,
)

function_call = response.candidates[0].content.parts[0].function_call

# 2) Execute the function (your code)
result = eval(function_call.args["expression"])  # Use safely in production

# 3) Send the function response back
function_response_part = types.Part.from_function_response(
    name=function_call.name,
    response={"result": result},
)

contents.append(response.candidates[0].content)
contents.append(types.Content(role="user", parts=[function_response_part]))

final_response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=contents,
    config=config,
)

print(final_response.text)
```

## Multiple Functions

```python
query_database = {
    "name": "query_database",
    "description": "Query customer database",
    "parameters": {
        "type": "object",
        "properties": {
            "table": {"type": "string"},
            "filters": {"type": "object"},
        },
        "required": ["table"],
    },
}

send_email = {
    "name": "send_email",
    "description": "Send an email",
    "parameters": {
        "type": "object",
        "properties": {
            "to": {"type": "string"},
            "subject": {"type": "string"},
            "body": {"type": "string"},
        },
        "required": ["to", "subject", "body"],
    },
}

multi_tool = types.Tool(function_declarations=[query_database, send_email])
config = types.GenerateContentConfig(tools=[multi_tool])
```

## Structured Data Extraction

```python
extract_person = {
    "name": "extract_person_info",
    "description": "Extract person information from text",
    "parameters": {
        "type": "object",
        "properties": {
            "name": {"type": "string"},
            "age": {"type": "integer"},
            "occupation": {"type": "string"},
            "company": {"type": "string"},
        },
        "required": ["name"],
    },
}

config = types.GenerateContentConfig(
    tools=[types.Tool(function_declarations=[extract_person])]
)

text = "John Doe is a 35-year-old software engineer working at Google."
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=text,
    config=config,
)

function_call = response.candidates[0].content.parts[0].function_call
extracted_data = dict(function_call.args)
```

## Advanced Patterns

### Function Calling with Enums

```python
classify_sentiment = {
    "name": "classify_sentiment",
    "description": "Classify text sentiment",
    "parameters": {
        "type": "object",
        "properties": {
            "text": {"type": "string"},
            "sentiment": {
                "type": "string",
                "enum": ["positive", "negative", "neutral"],
            },
            "confidence": {"type": "number"},
        },
        "required": ["text", "sentiment"],
    },
}
```

### Nested Objects

```python
extract_meeting = {
    "name": "extract_meeting_info",
    "description": "Extract meeting information",
    "parameters": {
        "type": "object",
        "properties": {
            "title": {"type": "string"},
            "attendees": {
                "type": "array",
                "items": {"type": "string"},
            },
            "action_items": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "task": {"type": "string"},
                        "assignee": {"type": "string"},
                        "deadline": {"type": "string"},
                    },
                },
            },
        },
        "required": ["title"],
    },
}
```

### Arrays and Lists

```python
extract_products = {
    "name": "extract_products",
    "description": "Extract product list from text",
    "parameters": {
        "type": "object",
        "properties": {
            "products": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "name": {"type": "string"},
                        "price": {"type": "number"},
                        "category": {"type": "string"},
                    },
                },
            }
        },
    },
}
```

## Error Handling

```python
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=prompt,
    config=config,
)

function_call = response.candidates[0].content.parts[0].function_call
if not function_call:
    print("Text response:", response.text)
```

## Best Practices

- **Clear descriptions:** Be specific about what the function does and the expected parameters.
- **Strong typing:** Use precise types (`integer`, `number`, `enum`) to reduce errors.
- **Limit toolset:** Provide only the tools needed for the current task.
- **Low temperature:** Keep temperature low for deterministic tool calls.
- **Validation:** Confirm high-impact tool calls with the user before executing.

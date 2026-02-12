#!/usr/bin/env python3
"""
Function calling example using Google GenAI SDK.
Demonstrates how to use function calling for structured data extraction.
"""

import json
import os
from google import genai
from google.genai import types


def get_client() -> genai.Client:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY environment variable not set")
    return genai.Client(api_key=api_key)


def find_function_call(response):
    for candidate in response.candidates:
        for part in candidate.content.parts:
            if part.function_call:
                return part.function_call
    return None


get_weather_declaration = {
    "name": "get_weather",
    "description": "Get the current weather for a location",
    "parameters": {
        "type": "object",
        "properties": {
            "location": {
                "type": "string",
                "description": "The city and country, e.g. Tokyo, Japan",
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


def extract_structured_data(
    text: str,
    schema: dict,
    model_name: str = "gemini-2.5-flash",
) -> dict:
    """
    Extract structured data from text using function calling.

    Args:
        text: Input text to extract data from
        schema: JSON schema defining the structure to extract
        model_name: Model to use

    Returns:
        Extracted structured data
    """
    client = get_client()

    function_decl = {
        "name": "extract_data",
        "description": "Extract structured data from text",
        "parameters": {
            "type": "object",
            "properties": {
                key: {
                    "type": value.get("type", "string"),
                    "description": value.get("description", ""),
                }
                for key, value in schema.get("properties", {}).items()
            },
            "required": schema.get("required", []),
        },
    }

    tools = types.Tool(function_declarations=[function_decl])
    config = types.GenerateContentConfig(tools=[tools])

    response = client.models.generate_content(
        model=model_name,
        contents=text,
        config=config,
    )

    function_call = find_function_call(response)
    if function_call:
        return dict(function_call.args)

    return {}


def function_calling_flow(prompt: str, model_name: str = "gemini-2.5-flash"):
    """
    Demonstrate a function calling flow with a tool response.

    Args:
        prompt: User prompt
        model_name: Model to use
    """
    client = get_client()

    tools = types.Tool(function_declarations=[get_weather_declaration])
    config = types.GenerateContentConfig(tools=[tools])

    contents = [types.Content(role="user", parts=[types.Part(text=prompt)])]
    response = client.models.generate_content(
        model=model_name,
        contents=contents,
        config=config,
    )

    function_call = find_function_call(response)
    if not function_call:
        print(f"Response: {response.text}")
        return

    print(f"Function called: {function_call.name}")
    print(f"Arguments: {dict(function_call.args)}")

    function_result = {
        "temperature": 22,
        "condition": "Sunny",
        "humidity": 60,
    }

    function_response_part = types.Part.from_function_response(
        name=function_call.name,
        response={"result": function_result},
    )

    contents.append(response.candidates[0].content)
    contents.append(types.Content(role="user", parts=[function_response_part]))

    final_response = client.models.generate_content(
        model=model_name,
        contents=contents,
        config=config,
    )

    print(f"\nFinal response: {final_response.text}")


if __name__ == "__main__":
    print("Example 1: Structured Data Extraction")
    sample_text = "John Doe, 30 years old, works as a software engineer at Google."
    sample_schema = {
        "properties": {
            "name": {"description": "Person's full name"},
            "age": {"description": "Person's age", "type": "integer"},
            "occupation": {"description": "Person's job title"},
            "company": {"description": "Company name"},
        },
        "required": ["name", "age"],
    }

    result = extract_structured_data(sample_text, sample_schema)
    print(json.dumps(result, indent=2))

    print("\nExample 2: Function Calling Flow")
    function_calling_flow("What's the weather like in Tokyo?")

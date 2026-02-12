#!/usr/bin/env python3
"""
Basic text generation example using Google GenAI SDK.
Demonstrates simple text generation with the Gemini API.
"""

import os
from google import genai


def generate_text(prompt: str, model_name: str = "gemini-2.5-flash") -> str:
    """
    Generate text using Gemini API.

    Args:
        prompt: The input prompt
        model_name: Model to use (default: gemini-2.5-flash)

    Returns:
        Generated text
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY environment variable not set")

    client = genai.Client(api_key=api_key)
    response = client.models.generate_content(model=model_name, contents=prompt)

    return response.text


if __name__ == "__main__":
    prompt = "Explain quantum computing in simple terms."
    result = generate_text(prompt)
    print(result)

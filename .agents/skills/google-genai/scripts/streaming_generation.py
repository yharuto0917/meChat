#!/usr/bin/env python3
"""
Streaming text generation example using Google GenAI SDK.
Demonstrates how to stream responses for real-time output.
"""

import os
from google import genai


def stream_text(prompt: str, model_name: str = "gemini-2.5-flash"):
    """
    Stream text generation using Gemini API.

    Args:
        prompt: The input prompt
        model_name: Model to use (default: gemini-2.5-flash)

    Yields:
        Text chunks as they are generated
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY environment variable not set")

    client = genai.Client(api_key=api_key)

    stream = client.models.generate_content_stream(
        model=model_name,
        contents=prompt,
    )

    for chunk in stream:
        if chunk.text:
            yield chunk.text


if __name__ == "__main__":
    prompt = "Write a short story about a robot learning to paint."

    print("Streaming response:")
    for chunk in stream_text(prompt):
        print(chunk, end="", flush=True)
    print("\n")

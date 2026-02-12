#!/usr/bin/env python3
"""
Image analysis example using Google GenAI SDK.
Demonstrates multimodal capabilities with image input.
"""

import os
from PIL import Image
from google import genai


def analyze_image(
    image_path: str,
    prompt: str = "Describe this image in detail.",
    model_name: str = "gemini-2.5-flash",
) -> str:
    """
    Analyze an image using Gemini API.

    Args:
        image_path: Path to the image file
        prompt: Custom prompt for image analysis
        model_name: Model to use (default: gemini-2.5-flash)

    Returns:
        Analysis result
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY environment variable not set")

    client = genai.Client(api_key=api_key)
    image = Image.open(image_path)

    response = client.models.generate_content(
        model=model_name,
        contents=[image, prompt],
    )

    return response.text


def analyze_multiple_images(
    image_paths: list[str],
    prompt: str,
    model_name: str = "gemini-2.5-flash",
) -> str:
    """
    Analyze multiple images together using Gemini API.

    Args:
        image_paths: List of paths to image files
        prompt: Prompt for multi-image analysis
        model_name: Model to use

    Returns:
        Analysis result
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY environment variable not set")

    client = genai.Client(api_key=api_key)
    images = [Image.open(path) for path in image_paths]

    contents = images + [prompt]
    response = client.models.generate_content(
        model=model_name,
        contents=contents,
    )

    return response.text


if __name__ == "__main__":
    import sys

    if len(sys.argv) < 2:
        print("Usage: python image_analysis.py <image_path>")
        sys.exit(1)

    image_path = sys.argv[1]
    result = analyze_image(image_path)
    print(f"Image Analysis:\n{result}")

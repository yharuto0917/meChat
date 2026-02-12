#!/usr/bin/env python3
"""
Multimodal chat example using Google GenAI SDK.
Demonstrates chat with text, images, and other modalities.
"""

import os
from PIL import Image
from google import genai


def multimodal_chat_session(model_name: str = "gemini-2.5-flash"):
    """
    Create an interactive multimodal chat session.

    Args:
        model_name: Model to use
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY environment variable not set")

    client = genai.Client(api_key=api_key)
    return client.chats.create(model=model_name)


def send_text_message(chat, message: str) -> str:
    """Send a text message in the chat."""
    response = chat.send_message(message)
    return response.text


def send_image_message(chat, image_path: str, message: str) -> str:
    """Send a message with an image in the chat."""
    image = Image.open(image_path)
    response = chat.send_message([image, message])
    return response.text


def get_chat_history(chat):
    """Get the full chat history."""
    return chat.get_history()


if __name__ == "__main__":
    print("Starting multimodal chat session...")
    chat = multimodal_chat_session()

    print("\n--- Conversation ---")

    response = send_text_message(chat, "Hello! Can you help me with image analysis?")
    print("User: Hello! Can you help me with image analysis?")
    print(f"AI: {response}\n")

    response = send_text_message(chat, "Great! I'll send you an image in a moment.")
    print("User: Great! I'll send you an image in a moment.")
    print(f"AI: {response}\n")

    print("\n--- Chat History ---")
    for message in get_chat_history(chat):
        role = "User" if message.role == "user" else "AI"
        text_part = next((part.text for part in message.parts if part.text), None)
        content = text_part if text_part else "[Image/Media]"
        print(f"{role}: {content}")

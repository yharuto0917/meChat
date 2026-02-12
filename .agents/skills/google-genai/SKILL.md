---
name: google-genai
description: "Comprehensive toolkit for working with Google's Gemini API using the Google GenAI SDK. Use when Claude needs to: (1) Generate, summarize, or analyze text using Gemini models, (2) Process images, audio, or video with multimodal capabilities, (3) Extract structured data using function calling or structured outputs, (4) Implement streaming text generation, (5) Build chat applications with context, or (6) Integrate Gemini API into any project. Includes example scripts, API reference, best practices, and detailed guides for multimodal processing and function calling."
---

# Google GenAI SDK

Comprehensive toolkit for integrating Google's Gemini API using the `google-genai` Python SDK.

## Overview

Use this skill to work with Gemini models for text generation, multimodal processing (images, audio, video, PDFs), structured outputs, and chat applications. The skill provides ready-to-use example scripts, API reference notes, and production-focused best practices.

## Quick Start

### Installation

```bash
uv add google-genai
```

### Basic Usage

```python
from google import genai

client = genai.Client()

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="Explain quantum computing simply",
)
print(response.text)
```

### Get API Key

1. Visit https://aistudio.google.com/app/apikey
2. Create or select a project
3. Generate an API key
4. Set environment variable: `export GEMINI_API_KEY="your-key"`

## Common Tasks

### Text Generation and Summarization

Use for generating, summarizing, or transforming text.

**Example scripts:**
- `scripts/basic_generation.py` - Simple text generation
- `scripts/streaming_generation.py` - Stream responses for better UX

**Quick example:**
```python
from google.genai import types

config = types.GenerateContentConfig(
    temperature=0.7,
    max_output_tokens=500,
)

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=f"Summarize this text: {long_text}",
    config=config,
)
```

### Image Analysis

Analyze images, extract text (OCR), or answer questions about visual content.

**Example script:** `scripts/image_analysis.py`

**Quick example:**
```python
from PIL import Image

image = Image.open("photo.jpg")
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=[image, "What's in this image?"],
)
```

**Common tasks:**
- Image description and captioning
- OCR text extraction
- Object detection and counting
- Visual question answering
- Multi-image comparison

### Structured Data Extraction (Function Calling)

Extract structured JSON data from unstructured text using function calling.

**Example script:** `scripts/function_calling.py`

**Quick example:**
```python
from google.genai import types

extract_person = {
    "name": "extract_person",
    "description": "Extract person info",
    "parameters": {
        "type": "object",
        "properties": {
            "name": {"type": "string"},
            "age": {"type": "integer"},
            "occupation": {"type": "string"},
        },
        "required": ["name"],
    },
}

tools = types.Tool(function_declarations=[extract_person])
config = types.GenerateContentConfig(tools=[tools])

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="John Doe is 30 and works as an engineer",
    config=config,
)

function_call = response.candidates[0].content.parts[0].function_call
data = dict(function_call.args)
```

### Chat Applications

Build conversational applications with context management.

**Example script:** `scripts/multimodal_chat.py`

**Quick example:**
```python
chat = client.chats.create(model="gemini-2.5-flash")

response = chat.send_message("Hello!")
print(response.text)

response = chat.send_message("What did I just say?")
print(response.text)
```

### Streaming Responses

Stream long responses for better user experience.

**Example script:** `scripts/streaming_generation.py`

**Quick example:**
```python
stream = client.models.generate_content_stream(
    model="gemini-2.5-flash",
    contents=prompt,
)

for chunk in stream:
    print(chunk.text, end="", flush=True)
```

## Model Selection

Choose the right model for your use case:

- **gemini-2.5-flash**: Best price-performance, general tasks (recommended default)
- **gemini-2.5-pro**: Highest quality, complex reasoning, long context
- **gemini-2.0-flash**: Fast and cost-efficient, high-volume tasks
- **gemini-2.0-flash-lite**: Lowest cost for lightweight workloads
- **gemini-embedding-001**: Text embeddings for retrieval and similarity
- **gemini-3-flash-preview**: Next-gen preview model for fast iteration (experimental)
- **gemini-3-pro-preview**: Next-gen preview model for highest quality (experimental)

See the official model list for the latest stable and preview variants.

## Advanced Features

### Multimodal Processing

Process images, audio, video, and PDFs alongside text.

**See:** `references/multimodal.md` for comprehensive guide

**Capabilities:**
- Image analysis and OCR
- Audio transcription and analysis
- Video understanding and summarization
- PDF document processing
- Multi-file processing

### Function Calling

Enable structured outputs and tool use.

**See:** `references/function_calling.md` for detailed guide

**Use cases:**
- Structured data extraction
- API integration (weather, database, email)
- Multi-step workflows
- Classification and categorization

### Safety and Content Filtering

Configure content safety settings per request.

**Example:**
```python
from google.genai import types

config = types.GenerateContentConfig(
    safety_settings=[
        types.SafetySetting(
            category=types.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold=types.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        )
    ]
)

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=prompt,
    config=config,
)
```

## Error Handling

**Common patterns:**

```python
import time

max_retries = 3
for attempt in range(max_retries):
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )
        break
    except Exception as exc:
        status = getattr(exc, "status_code", None)
        if status in (429, 503) and attempt < max_retries - 1:
            time.sleep(2 ** attempt)
            continue
        raise

if response.prompt_feedback and response.prompt_feedback.block_reason:
    print(f"Content blocked: {response.prompt_feedback.block_reason}")
```

## Reference Documentation

Detailed guides available in `references/` directory:

- **`api_reference.md`**: Core SDK usage, models, parameters, authentication
- **`best_practices.md`**: Prompting, error handling, performance and cost tips
- **`multimodal.md`**: Image, audio, video, and PDF processing with examples
- **`function_calling.md`**: Structured data extraction, tools, schemas

## Example Scripts

Ready-to-use scripts in `scripts/` directory:

- **`basic_generation.py`**: Simple text generation
- **`streaming_generation.py`**: Streaming responses
- **`image_analysis.py`**: Image processing and analysis
- **`function_calling.py`**: Structured data extraction
- **`multimodal_chat.py`**: Chat with multimodal inputs

All scripts include error handling and can be run directly or used as templates.

## Usage Tips

**When to use which approach:**

- **Simple one-off generation**: Use `basic_generation.py` pattern
- **Long-form content**: Use streaming (`streaming_generation.py`)
- **Structured output**: Use function calling (`function_calling.py`)
- **Multi-turn conversation**: Use chat (`multimodal_chat.py`)
- **Images/media**: Use multimodal inputs (see `multimodal.md`)

**Performance:**
- Use `gemini-2.5-flash` for best price-performance
- Use `gemini-2.5-pro` for quality and complex reasoning
- Use `gemini-3-flash-preview` or `gemini-3-pro-preview` when you want next-gen previews
- Set `max_output_tokens` to limit costs
- Use streaming for long outputs

**Security:**
- Always use environment variables for API keys
- Never commit keys to version control
- Sanitize user inputs before sending
- Review safety settings for your use case

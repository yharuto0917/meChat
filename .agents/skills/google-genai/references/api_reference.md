# Google GenAI API Reference

## Available Models (Common)

Use the models page for the latest names and capabilities. Common choices:

- **gemini-2.5-flash**: Best price-performance, general tasks
- **gemini-2.5-pro**: Highest quality, long context and reasoning
- **gemini-2.0-flash**: Fast, cost-efficient, high volume
- **gemini-2.0-flash-lite**: Lowest cost for lightweight tasks
- **gemini-embedding-001**: Text embeddings

Preview models (for experimentation):
- **gemini-3-flash-preview**: Next-gen preview model for fast iteration
- **gemini-3-pro-preview**: Next-gen preview model for highest quality

## Core SDK Usage

### Client Setup

```python
from google import genai

# Reads GEMINI_API_KEY from environment by default.
client = genai.Client()
```

### Generate Content

```python
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="Explain how AI works in a few words",
)
print(response.text)
```

### Generation Config

```python
from google.genai import types

config = types.GenerateContentConfig(
    temperature=0.7,
    top_p=0.95,
    top_k=40,
    max_output_tokens=1024,
    stop_sequences=["<END>"],
    system_instruction="You are a concise assistant.",
)

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=prompt,
    config=config,
)
```

### Structured Outputs (JSON)

```python
from google.genai import types

schema = {
    "type": "object",
    "properties": {
        "title": {"type": "string"},
        "summary": {"type": "string"},
    },
    "required": ["title", "summary"],
}

config = types.GenerateContentConfig(
    response_mime_type="application/json",
    response_json_schema=schema,
)

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="Summarize the article into JSON",
    config=config,
)
```

### Safety Settings

```python
from google.genai import types

config = types.GenerateContentConfig(
    safety_settings=[
        types.SafetySetting(
            category=types.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold=types.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        ),
        types.SafetySetting(
            category=types.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold=types.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        ),
    ]
)

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=prompt,
    config=config,
)
```

## Streaming

```python
stream = client.models.generate_content_stream(
    model="gemini-2.5-flash",
    contents="Write a short story about a robot",
)

for chunk in stream:
    print(chunk.text, end="")
```

## Chat

```python
chat = client.chats.create(model="gemini-2.5-flash")

response = chat.send_message("I have 2 dogs in my house.")
print(response.text)

response = chat.send_message("How many paws are in my house?")
print(response.text)

for message in chat.get_history():
    print(f"{message.role}: {message.parts[0].text}")
```

## Multimodal Inputs

```python
from PIL import Image

image = Image.open("photo.jpg")
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=[image, "Describe this image"],
)
print(response.text)
```

## Files API

```python
file = client.files.upload(file="audio.mp3")
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=["Transcribe this audio", file],
)
print(response.text)

for f in client.files.list():
    print(f.name)

client.files.delete(name=file.name)
```

## Token Counting

```python
response = client.models.count_tokens(
    model="gemini-2.5-flash",
    contents=["Count tokens in this sentence"],
)
print(response.total_tokens)
```

## Embeddings

```python
response = client.models.embed_content(
    model="gemini-embedding-001",
    contents="What is the meaning of life?",
)
print(response.embeddings)
```

## Authentication

- Set `GEMINI_API_KEY` in your environment: `export GEMINI_API_KEY="your-api-key"`
- Or pass explicitly: `genai.Client(api_key="...")`

## Rate Limits

Rate limits vary by model and billing tier. Check the rate limits guide for current values.

## Error Handling

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
    print(f"Blocked: {response.prompt_feedback.block_reason}")
```

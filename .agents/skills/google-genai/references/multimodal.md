# Multimodal Processing with Google GenAI

## Overview

Gemini models support multimodal inputs including:
- Text
- Images (JPEG, PNG, WebP, HEIC, HEIF)
- Audio (WAV, MP3, AIFF, AAC, OGG, FLAC)
- Video (MP4, MPEG, MOV, AVI, WebM)
- PDF documents

## Image Processing

### Basic Image Analysis

```python
from google import genai
from PIL import Image

client = genai.Client()
image = Image.open("photo.jpg")

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=[image, "Describe this image"],
)
print(response.text)
```

### Multiple Images

```python
image1 = Image.open("before.jpg")
image2 = Image.open("after.jpg")

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=[image1, image2, "What are the differences?"],
)
```

### Image URLs

```python
import requests
from google.genai import types

image_bytes = requests.get("https://example.com/image.jpg", timeout=10).content
image_part = types.Part.from_bytes(data=image_bytes, mime_type="image/jpeg")

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=[image_part, "Describe this image"],
)
```

### Specific Image Tasks

**Object detection:**
```python
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=[image, "List all objects visible in this image"],
)
```

**OCR (Text extraction):**
```python
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=[image, "Extract all text from this image"],
)
```

## Audio Processing

### Upload and Analyze Audio

```python
audio_file = client.files.upload(file="audio.mp3")

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=["Transcribe this audio", audio_file],
)
print(response.text)
```

### Inline Audio

```python
from google.genai import types

with open("short_clip.mp3", "rb") as f:
    audio_bytes = f.read()

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=[
        "Summarize this audio",
        types.Part.from_bytes(data=audio_bytes, mime_type="audio/mp3"),
    ],
)
```

## Video Processing

### Upload and Analyze Video

```python
import time

video_file = client.files.upload(file="video.mp4")

while video_file.state.name == "PROCESSING":
    time.sleep(2)
    video_file = client.files.get(name=video_file.name)

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=["Summarize this video", video_file],
)
```

## PDF Processing

```python
doc_file = client.files.upload(file="document.pdf")

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=["Summarize this document", doc_file],
)
```

## File Upload API

### Upload Files

```python
file = client.files.upload(file="path/to/file.jpg")
print(file.name)
print(file.uri)
```

### List Uploaded Files

```python
for file in client.files.list():
    print(file.name)
```

### Delete Files

```python
client.files.delete(name=file.name)
```

## Combined Multimodal Inputs

### Text + Image + Audio

```python
image = Image.open("slide.jpg")
audio_file = client.files.upload(file="narration.mp3")

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=[image, audio_file, "Summarize this slide and narration"],
)
```

## Supported Formats and Limits

Supported formats include common image, audio, video, and PDF types. Size and duration limits vary by model and region. Use the Files API for uploads larger than 20 MB and consult the official docs for current limits.

## Best Practices

### Optimize Image Quality

```python
from PIL import Image

def optimize_image(image_path, max_size=(1024, 1024)):
    image = Image.open(image_path)
    if image.size[0] > max_size[0] or image.size[1] > max_size[1]:
        image.thumbnail(max_size, Image.LANCZOS)
    return image
```

### Handle Large Files

```python
import time

def wait_for_file(client, file):
    while file.state.name == "PROCESSING":
        time.sleep(2)
        file = client.files.get(name=file.name)
    return file
```

### Structured Multimodal Output

```python
from google.genai import types

schema = {
    "type": "object",
    "properties": {
        "product_name": {"type": "string"},
        "category": {"type": "string"},
        "visible_features": {"type": "array", "items": {"type": "string"}},
    },
    "required": ["product_name"],
}

config = types.GenerateContentConfig(
    response_mime_type="application/json",
    response_json_schema=schema,
)

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=[image, "Analyze this product image"],
    config=config,
)
```

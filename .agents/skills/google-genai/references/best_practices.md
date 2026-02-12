# Best Practices for Google GenAI SDK

## Prompt Engineering

### Structure Your Prompts

**Clear instructions:**
```python
prompt = """
Task: Summarize the following text in 3 bullet points.
Focus on: Main ideas, key decisions, action items.

Text: [your text here]
"""
```

**Use examples (few-shot prompting):**
```python
prompt = """
Extract person information from text.

Example 1:
Text: "Alice Smith is a 30-year-old engineer at Google."
Output: {"name": "Alice Smith", "age": 30, "occupation": "engineer", "company": "Google"}

Example 2:
Text: "Bob Johnson, 25, works as a designer."
Output: {"name": "Bob Johnson", "age": 25, "occupation": "designer", "company": null}

Now extract from:
Text: "Charlie Brown is 28 and teaches at MIT."
"""
```

**Break down complex tasks:**
```python
from google import genai

client = genai.Client()

prompt1 = "Summarize this document in 3 paragraphs: [document]"
summary = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=prompt1,
).text

prompt2 = f"Based on this summary, extract 5 key terms: {summary}"
key_terms = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=prompt2,
).text
```

### Optimize Temperature and Sampling

**Temperature guide:**
- **0.0-0.3**: Deterministic, factual tasks (data extraction, classification)
- **0.4-0.7**: Balanced creativity and coherence (general writing, summaries)
- **0.8-1.0**: Creative tasks (brainstorming, creative writing)

```python
from google.genai import types

config = types.GenerateContentConfig(temperature=0.1)
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=prompt,
    config=config,
)
```

### Use System Instructions

```python
from google.genai import types

config = types.GenerateContentConfig(
    system_instruction="You are a helpful assistant that responds in JSON."
)

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=prompt,
    config=config,
)
```

## Error Handling and Reliability

### Implement Retry Logic

```python
import time

def generate_with_retry(client, prompt, model="gemini-2.5-flash", max_retries=3):
    for attempt in range(max_retries):
        try:
            return client.models.generate_content(model=model, contents=prompt)
        except Exception as exc:
            status = getattr(exc, "status_code", None)
            if status in (429, 503) and attempt < max_retries - 1:
                time.sleep(2 ** attempt)
                continue
            raise

    raise RuntimeError("Max retries exceeded")
```

### Validate Responses

```python
def safe_generate(client, prompt, model="gemini-2.5-flash"):
    response = client.models.generate_content(model=model, contents=prompt)

    if response.prompt_feedback and response.prompt_feedback.block_reason:
        raise ValueError(f"Content blocked: {response.prompt_feedback.block_reason}")

    if not response.text:
        raise ValueError("Empty response received")

    return response.text
```

### Handle Safety Ratings

```python
def check_safety_ratings(response):
    for candidate in response.candidates:
        for rating in candidate.safety_ratings:
            if rating.probability not in ["NEGLIGIBLE", "LOW"]:
                print(f"Warning: {rating.category} rated {rating.probability}")
    return response.text
```

## Performance Optimization

### Use Streaming for Long Responses

```python
stream = client.models.generate_content_stream(
    model="gemini-2.5-flash",
    contents=prompt,
)

for chunk in stream:
    print(chunk.text, end="", flush=True)
```

### Batch Similar Requests

```python
items = ["item1", "item2", "item3"]

combined_prompt = """
Analyze each item and provide results in JSON format:

{items}

Output format: {{"results": [{{"item": 1, "analysis": "..."}}, ...]}}
""".format(items="\n".join(f"{i+1}. {item}" for i, item in enumerate(items)))

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=combined_prompt,
)
```

### Cache Repeated Context

- For short-lived conversations, use chat sessions to avoid re-sending context.
- For large repeated context, use explicit caching (`client.caches.create`) when available.

```python
chat = client.chats.create(model="gemini-2.5-flash")
chat.send_message("Context: [large background]")
response = chat.send_message("Question about the context")
```

## Cost Optimization

### Choose the Right Model

```python
fast_model = "gemini-2.5-flash"
quality_model = "gemini-2.5-pro"

model = quality_model if is_complex_task(prompt) else fast_model
response = client.models.generate_content(model=model, contents=prompt)
```

### Limit Output Tokens

```python
from google.genai import types

config = types.GenerateContentConfig(max_output_tokens=500)
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=prompt,
    config=config,
)
```

### Monitor Usage

```python
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=prompt,
)

if response.usage_metadata:
    print(response.usage_metadata)
```

## Security and Privacy

### Sanitize User Input

```python
def sanitize_input(user_input):
    sanitized = user_input.replace("Ignore previous instructions", "")
    return sanitized[:10000]
```

### Don't Send Sensitive Data

```python
# Bad: Sending sensitive data
prompt = f"Analyze this customer data: {customer_pii}"

# Good: Anonymize or aggregate first
anonymized_data = anonymize(customer_pii)
prompt = f"Analyze this anonymized data: {anonymized_data}"
```

### Use Environment Variables for Keys

```python
from google import genai
import os

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
```

## Testing and Debugging

### Test with Various Inputs

```python
test_cases = [
    "Normal input",
    "",  # Empty
    "Very " * 1000 + "long input",
    "Special chars: <>&\"'",
]

for test in test_cases:
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=test,
        )
        print(f"✓ Passed: {test[:50]}")
    except Exception as exc:
        print(f"✗ Failed: {test[:50]} - {exc}")
```

### Log Requests and Responses

```python
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

def generate_with_logging(client, prompt, model="gemini-2.5-flash"):
    logger.debug("Request: %s", prompt[:100])
    response = client.models.generate_content(model=model, contents=prompt)
    logger.debug("Response: %s", response.text[:100])
    return response
```

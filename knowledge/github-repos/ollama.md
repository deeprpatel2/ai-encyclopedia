# Ollama — Run LLMs Locally

> Get up and running with DeepSeek, Llama 4, Qwen, Mistral, Gemma and other models locally. 163,800+ stars. The Docker of AI models.

| Field | Value |
|-------|-------|
| **URL** | https://github.com/ollama/ollama |
| **Stars** | 163,800+ |
| **Language** | Go |
| **Topics** | local-llm, ollama, inference, open-source, ai-tools |
| **Added** | 2026-03-02 |

---

## What Is Ollama?

Ollama is the **default way to run LLMs locally** in 2026. Like Docker but for AI models — you pull models by name, run them with one command, and interact via CLI or REST API. No cloud required.

## How It Works

```bash
# Install (macOS)
brew install ollama

# Pull and run a model
ollama run llama3.2          # Meta Llama 3.2
ollama run deepseek-v3       # DeepSeek V3
ollama run mistral           # Mistral
ollama run qwen2.5           # Alibaba Qwen 2.5

# That's it. You're running AI locally.
```

## Supported Models (2026)

| Model | Provider | Size Options |
|-------|----------|-------------|
| Llama 4 | Meta | Scout, Maverick |
| DeepSeek V3/R1 | DeepSeek | Various quants |
| Qwen 2.5/3 | Alibaba | 0.5B to 72B |
| Mistral / Mistral Large 3 | Mistral AI | 7B to large |
| Gemma 3 | Google | 2B, 7B, 27B |
| GLM-5 | Z.AI | 744B (quantized) |
| GPT-OSS | OpenAI | Open source variant |
| Kimi-K2.5 | Moonshot AI | Latest |
| Nemotron 3 | NVIDIA | Enterprise-focused |
| Phi-4 | Microsoft | Compact, efficient |

## Key Features

- **One-Command Install**: `brew install ollama` or `curl` script
- **Docker-like UX**: `ollama pull`, `ollama run`, `ollama list`
- **REST API**: `localhost:11434` — compatible with OpenAI API format
- **Python/JS SDKs**: Official libraries for integration
- **Flash Attention**: Enabled by default in 2026 for faster inference
- **Ollama Cloud**: Push custom models to share across devices
- **Modelfile**: Customize models (system prompt, parameters, layers)
- **Cross-Platform**: macOS, Linux, Windows

## Performance on Mac Mini M4

| Model Size | Quantization | Tokens/sec | RAM Needed |
|-----------|-------------|-----------|-----------|
| 8B | Q4 | 18-22 t/s | ~5 GB |
| 14B | Q4 | ~10 t/s | ~8 GB |
| 30B | Q4 | ~5 t/s | ~18 GB |
| 70B | Q4 | ~2 t/s | ~40 GB |

**Rule of thumb:** Model GB ≈ RAM needed. 32GB Mac Mini handles up to 30B models comfortably.

## API Usage

### REST API

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.2",
  "prompt": "Explain quantum computing"
}'
```

### Python SDK

```python
import ollama

response = ollama.chat(model='deepseek-r1', messages=[
    {'role': 'user', 'content': 'Write a Python function to sort a list'}
])
print(response['message']['content'])
```

### OpenAI-Compatible Endpoint

```python
from openai import OpenAI

client = OpenAI(base_url="http://localhost:11434/v1", api_key="unused")
response = client.chat.completions.create(
    model="llama3.2",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

## Use Cases

- **Privacy-First AI**: All data stays on your machine
- **Offline AI**: Works without internet after model download
- **Development & Testing**: Test against multiple models locally
- **Cost Savings**: No API costs after initial download
- **OpenClaw Backend**: Popular choice for local model hosting with OpenClaw
- **Edge AI**: Deploy on devices, servers, IoT

## Key Takeaways

- **What it solves:** Run any open-source LLM locally with zero friction
- **Think of it as:** Docker for AI models
- **Best for:** Developers who want local, private, free AI inference
- **Maturity:** 163,800+ stars — the standard for local LLM inference
- **Hardware:** Mac Mini M4 with 32GB+ is the sweet spot

## Related Sources

- [OpenClaw](./openclaw.md) — uses Ollama for local models
- [DeepSeek](./deepseek.md) — popular model to run via Ollama
- [Mac Mini AI Setup](../articles/mac-mini-local-ai.md)
- [Open Source LLMs](../articles/open-source-llms-2026.md)
- Topic: [ai-landscape-2026](../topics/ai-landscape-2026.md)

---

*Last processed: 2026-03-02*

# DeepSeek — Open-Source AI Models from China

> DeepSeek-V3 (671B MoE) and DeepSeek-R1 (reasoning model) — trained for $6M, rivaling GPT-4 and o1. The models that proved you don't need $100M to build frontier AI. Open-weight, MIT licensed.

| Field | Value |
|-------|-------|
| **URL** | https://github.com/deepseek-ai/DeepSeek-V3 |
| **Stars** | 70,000+ (V3) |
| **Language** | Python |
| **Creator** | DeepSeek (Chinese AI startup) |
| **Topics** | llm, open-source, chinese-ai, deepseek, reasoning, moe |
| **Added** | 2026-03-02 |

---

## What Is DeepSeek?

DeepSeek is a Chinese AI startup that released open-weight language models rivaling the best closed models at a fraction of the cost. Their V3 model cost ~$6M to train (vs $100M+ for GPT-4), proving that frontier AI doesn't require massive budgets.

## Model Family

| Model | Params | Type | Key Strength |
|-------|--------|------|-------------|
| **DeepSeek-V3** | 671B total, 37B active | MoE | General-purpose, competitive with GPT-4 |
| **DeepSeek-R1** | Reasoning model | Chain-of-thought | Beats OpenAI o1 on math and coding |
| **DeepSeek-V3.1** | Hybrid | Thinking + non-thinking modes | Released Aug 2025, MIT licensed |
| **DeepSeek-V3.2** | Latest | Enhanced | Expected March 2026, trained on latest Nvidia chips |

## Why DeepSeek Matters

### The $6M Model That Shook the Industry

- **V3 cost $6M to train** — GPT-4 cost $100M+
- **Used ~10x less compute** than Meta's comparable Llama 3.1
- **Open-weight + MIT licensed** — free to use commercially
- Proved that **algorithmic efficiency** can beat brute-force compute scaling

### R1 Benchmark Performance

| Benchmark | DeepSeek-R1 | OpenAI o1 | GPT-4o |
|-----------|------------|-----------|--------|
| AIME (Math) | **79.8%** | 79.2% | — |
| MATH-500 | **97.4%** | 96.4% | — |
| Codeforces | **2029 Elo** | 1891 | — |
| MMLU | 90.8% | — | 90.8% |

## Architecture: Mixture of Experts (MoE)

```
671B Total Parameters
    └── 37B Active per token (only ~5.5% activated)
    └── Efficient routing selects which expert networks to use
    └── Massive knowledge capacity with manageable compute
```

**Why MoE matters:** You get the knowledge of a 671B model but only pay the compute cost of a 37B model per inference.

## How to Use

### Via API (Cheapest Cloud Option)

```python
from openai import OpenAI

client = OpenAI(
    api_key="your-deepseek-key",
    base_url="https://api.deepseek.com"
)

response = client.chat.completions.create(
    model="deepseek-chat",  # V3
    messages=[{"role": "user", "content": "Explain MoE architecture"}]
)
```

### Via Ollama (Local)

```bash
ollama run deepseek-v3    # Requires significant RAM
ollama run deepseek-r1    # Reasoning model
```

### Self-Hosted

Both V3 and R1 are open-weight — you can download and deploy them on your own infrastructure. Requires multi-GPU setup for full-size models.

## Impact on AI Landscape

- **Most liked model on Hugging Face** of all time
- **Shifted geopolitics of AI** — proved China can compete with US labs
- **Inspired efficiency-first approach** — the industry pivoted from "just scale up" to "be smarter"
- **Open-source movement:** Forced Meta, Google, and others to release more open models
- **Top Hugging Face models** are no longer majority US-developed

## Use Cases

- **Cost-Effective AI**: 90%+ cheaper than GPT-4 for comparable quality
- **Math & Reasoning**: R1 is best-in-class for mathematical and logical reasoning
- **Coding**: 2029 Elo on Codeforces — strong for code generation
- **Self-Hosting**: Full control over your AI infrastructure
- **Research**: Open weights enable academic study and fine-tuning

## Key Takeaways

- **What it solves:** Frontier AI accessible to everyone, not just Big Tech
- **Cost:** $6M training vs $100M+ for competitors
- **Architecture:** MoE — 671B total, 37B active per token
- **License:** MIT — commercially usable
- **Maturity:** Established, rapidly iterating (V3 → V3.1 → V3.2 in months)
- **Run locally:** Via Ollama (needs significant RAM) or cloud API

## Related Sources

- [Ollama](./ollama.md) — run DeepSeek locally
- [Hugging Face](./hugging-face.md) — where DeepSeek models are hosted
- [Open Source LLMs Roundup](../articles/open-source-llms-2026.md)
- Topic: [ai-landscape-2026](../topics/ai-landscape-2026.md)

---

*Last processed: 2026-03-02*

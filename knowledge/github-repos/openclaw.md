# OpenClaw — Open Source Personal AI Agent

> Your own personal AI assistant. Any OS. Any Platform. The lobster way. 248,500+ stars — the viral open-source project that caused a Mac Mini shortage.

| Field | Value |
|-------|-------|
| **URL** | https://github.com/openclaw/openclaw |
| **Stars** | 248,500+ |
| **Language** | TypeScript |
| **Creator** | Peter Steinberger |
| **Topics** | ai-agents, open-source, personal-assistant, messaging, openclaw |
| **Added** | 2026-03-02 |

---

## What Is OpenClaw?

OpenClaw (formerly Clawdbot/Moltbot) is a **free, open-source autonomous AI agent** that you run on your own devices. It uses LLMs (Claude, OpenAI, etc.) as its brain and messaging platforms as its interface. Think of it as your personal AI assistant that lives on your hardware and talks to you on WhatsApp, Telegram, Slack, Discord — wherever you already are.

**Why it went viral:** In late January 2026, OpenClaw exploded from obscurity to 248K+ stars in weeks. The concept of running your own AI agent 24/7 on a Mac Mini captured imaginations and literally caused an Apple Mac Mini shortage.

## Key Features

- **Multi-Platform Messaging**: WhatsApp, Telegram, Slack, Discord, Google Chat, Signal, iMessage, Teams, Matrix, IRC, LINE, and 10+ more
- **Voice Support**: Speak and listen on macOS, iOS, Android
- **Live Canvas**: Real-time interactive canvas you control
- **Skills System**: Extensible via community-built skills (similar to plugins)
- **Self-Hosted**: Runs on your hardware — your data stays with you
- **Agent Framework**: Sends API calls to Claude, OpenAI, or other model providers
- **Always-On**: Designed to run 24/7 on devices like Mac Mini

## How It Works

```
Your Device (Mac Mini, laptop, server)
    └── OpenClaw Agent (TypeScript)
         ├── LLM Provider (Claude API / OpenAI API)
         ├── Messaging Bridge (WhatsApp, Telegram, etc.)
         ├── Skills (extensible plugins)
         └── Memory (persistent context)
```

**Important:** OpenClaw doesn't run AI models locally — it's an agent framework that orchestrates API calls to cloud LLM providers. The Mac Mini serves as an always-on host.

## How to Use

### Quick Start

```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw
# Follow setup instructions for your messaging platform
```

### Mac Mini Setup (Most Popular)

The $599 Mac Mini M4 is the most popular host. See the full guide at the repo for:
1. Install OpenClaw
2. Configure your LLM provider (Claude API key or OpenAI key)
3. Connect your messaging platforms
4. Set up skills for your use cases
5. Run 24/7

## The Cultural Phenomenon

- **248,500+ GitHub stars** — one of the fastest-growing open-source projects ever
- **Caused a Mac Mini shortage** — delivery times stretched from days to 6 weeks
- **8,900+ community members** building skills and integrations
- Creator Peter Steinberger announced joining OpenAI in Feb 2026
- Project moving to an open-source foundation for long-term governance

## Security Considerations

Cisco's AI security research team found that some third-party OpenClaw skills can perform data exfiltration and prompt injection without user awareness. **Always vet third-party skills** before installing.

## Use Cases

- **Personal AI Assistant**: 24/7 assistant on your messaging apps
- **Business Automation**: Automate customer support, scheduling, research
- **Smart Home Hub**: Control devices and manage routines via chat
- **Development Assistant**: Code review, debugging, deployment via Slack/Discord
- **Research Agent**: Continuous information gathering and summarization

## Key Takeaways

- **What it solves:** Personal AI assistant that lives on your devices and uses your messaging apps
- **Best for:** Anyone who wants a 24/7 AI assistant without depending on a single platform
- **Not a local model runner:** It's an agent framework that calls cloud APIs
- **Maturity:** Extremely high — 248K+ stars, massive community, moving to foundation
- **Cost:** Free software + LLM API costs + hardware (Mac Mini $599+)

## Related Sources

- [Mac Mini AI Setup Guide](../articles/mac-mini-local-ai.md)
- [Oh My OpenCode](./oh-my-opencode.md)
- Topic: [ai-agents-2026](../topics/ai-landscape-2026.md)

---

*Last processed: 2026-03-02*

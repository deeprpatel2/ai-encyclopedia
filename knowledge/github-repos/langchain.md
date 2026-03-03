# LangChain & LangGraph — The Agent Engineering Platform

> The definitive framework for building AI agents and RAG pipelines. 128,000+ stars. In 2026, LangChain shifted from chains to agents with LangGraph as the primary orchestration layer.

| Field | Value |
|-------|-------|
| **URL** | https://github.com/langchain-ai/langchain |
| **Stars** | 128,000+ (LangChain) / 25,400+ (LangGraph) |
| **Language** | Python |
| **Topics** | ai-agents, langchain, langgraph, rag, framework, llm |
| **Added** | 2026-03-02 |

---

## What Is LangChain?

LangChain is the **agent engineering platform** — a Python/TypeScript framework for building AI applications powered by LLMs. In 2026, it's evolved from a simple "chain" library into a full ecosystem:

| Component | What It Does | Stars |
|-----------|-------------|-------|
| **LangChain** | Core framework — integrations, document loaders, vector stores | 128K+ |
| **LangGraph** | Agent orchestration — stateful, multi-actor graphs | 25K+ |
| **LangSmith** | Observability platform — trace, evaluate, debug agents | SaaS |
| **LangServe** | Deployment — serve agents as REST APIs | Part of ecosystem |

## 2026 Strategic Shift: Chains → Agents

The core LangChain library now serves as the **integration layer** (model connectors, document loaders, vector stores), while **LangGraph** is where you build the actual agent logic.

## LangGraph — Agent Orchestration

LangGraph lets you build agents as **directed graphs** with state, cycles, and human-in-the-loop:

```python
from langgraph.graph import StateGraph

# Define your agent as a graph
graph = StateGraph(AgentState)
graph.add_node("think", think_node)
graph.add_node("act", act_node)
graph.add_node("observe", observe_node)

# Add edges (control flow)
graph.add_edge("think", "act")
graph.add_edge("act", "observe")
graph.add_conditional_edges("observe", should_continue)

agent = graph.compile()
```

### Supported Agent Patterns

- **ReAct** — Reason + Act loop (most common)
- **Plan-and-Execute** — Plan all steps first, then execute
- **Reflection** — Agent reviews and improves its own output
- **Multi-Agent** — Multiple specialized agents collaborating
- **Human-in-the-Loop** — Checkpoints where humans approve actions

## Core LangChain Capabilities

### RAG (Retrieval-Augmented Generation)

```python
from langchain_community.document_loaders import WebBaseLoader
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings

# Load documents
docs = WebBaseLoader("https://example.com").load()

# Create vector store
vectorstore = FAISS.from_documents(docs, OpenAIEmbeddings())

# Query
results = vectorstore.similarity_search("your question")
```

- **100+ document formats** supported
- **50+ vector databases** (Pinecone, Weaviate, Chroma, FAISS, etc.)
- Built-in text splitters, embedding integrations

### Tool Integration

```python
from langchain_core.tools import tool

@tool
def search_database(query: str) -> str:
    """Search the product database."""
    return db.search(query)
```

## LangSmith — Observability

LangSmith evolved into a full platform for debugging and evaluating agents:

- **Tracing**: See every step your agent takes
- **Evaluation**: Automated testing of agent outputs
- **Polly**: AI assistant inside LangSmith that helps debug
- **LangSmith Fetch**: CLI tool for terminal-based trace access
- **Datasets**: Create test datasets from production traces

## How to Use

### Install

```bash
pip install langchain langchain-openai langgraph
```

### Simple Agent

```python
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent

model = ChatOpenAI(model="gpt-4")
tools = [search_database, calculator]

agent = create_react_agent(model, tools)
result = agent.invoke({"messages": [("user", "What's our best-selling product?")]})
```

## Use Cases

- **RAG Applications**: Q&A over documents, knowledge bases, codebases
- **Autonomous Agents**: Agents that plan, execute, and self-correct
- **Multi-Agent Systems**: Teams of specialized AI agents
- **Data Pipelines**: ETL with AI-powered transformation
- **Customer Support**: AI agents with tool access and memory
- **Research Assistants**: Agents that search, analyze, and synthesize

## Key Takeaways

- **What it solves:** Complete framework for building AI agents and RAG pipelines
- **2026 focus:** LangGraph for agents, LangChain for integrations
- **Killer feature:** Stateful agent graphs with cycles and human-in-the-loop
- **Ecosystem:** 100+ doc loaders, 50+ vector stores, all major LLM providers
- **Maturity:** 128K+ stars, production-proven, extensive documentation

## Related Sources

- [CrewAI](./crewai.md) — alternative multi-agent framework
- [Oh My OpenCode](./oh-my-opencode.md) — AI coding with multi-agent support
- [Hugging Face](./hugging-face.md) — model hosting platform
- Topic: [ai-landscape-2026](../topics/ai-landscape-2026.md)

---

*Last processed: 2026-03-02*

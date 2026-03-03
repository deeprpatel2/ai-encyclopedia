# CrewAI — Multi-Agent Orchestration Framework

> Framework for orchestrating role-playing, autonomous AI agents. 45,000+ stars. Dual architecture: Crews (autonomous agents) + Flows (event-driven workflows). 2-3x faster than comparable frameworks.

| Field | Value |
|-------|-------|
| **URL** | https://github.com/crewAIInc/crewAI |
| **Stars** | 45,000+ |
| **Language** | Python |
| **Topics** | ai-agents, multi-agent, orchestration, crewai, framework |
| **Added** | 2026-03-02 |

---

## What Is CrewAI?

CrewAI is the leading framework for building **teams of AI agents** that collaborate to solve complex tasks. Each agent has a role, goal, and backstory — think of it as assembling a virtual team where each member is an AI specialist.

## Dual Architecture

### Crews — Autonomous Agent Teams

```python
from crewai import Agent, Task, Crew

researcher = Agent(
    role="Senior Research Analyst",
    goal="Uncover cutting-edge AI developments",
    backstory="You're a veteran AI researcher at a top tech company.",
    tools=[search_tool, web_scraper]
)

writer = Agent(
    role="Tech Content Writer",
    goal="Write engaging technical content",
    backstory="You're a skilled writer who makes complex topics accessible."
)

research_task = Task(
    description="Research the latest AI agent frameworks",
    agent=researcher
)

write_task = Task(
    description="Write a comprehensive guide based on the research",
    agent=writer
)

crew = Crew(
    agents=[researcher, writer],
    tasks=[research_task, write_task],
    verbose=True
)

result = crew.kickoff()
```

### Flows — Event-Driven Workflows

```python
from crewai import Flow

flow = Flow()

@flow.start()
def collect_data():
    return fetch_data_from_api()

@flow.listen(collect_data)
def analyze_data(data):
    return crew.kickoff(inputs={"data": data})

@flow.listen(analyze_data)
def generate_report(analysis):
    return create_pdf(analysis)

flow.kickoff()
```

## Execution Strategies

| Strategy | How It Works | Use Case |
|----------|-------------|----------|
| **Sequential** | Agents execute one after another | Pipeline tasks |
| **Hierarchical** | Manager agent delegates to workers | Complex projects |
| **Parallel** | Agents work simultaneously | Independent tasks |
| **Conditional** | Logic-based routing | Decision workflows |

## Memory System

CrewAI agents have access to:
- **Short-term memory**: Current task context
- **Long-term memory**: Persistent across sessions
- **Entity memory**: Knowledge about people, places, concepts
- **Contextual memory**: Shared between agents in a crew

## How to Use

```bash
pip install crewai crewai-tools
```

## Use Cases

- **Research Teams**: Researcher + Analyst + Writer agents
- **Customer Support**: Router + Specialist + QA agents
- **Content Pipeline**: Researcher + Writer + Editor + SEO agents
- **Data Analysis**: Collector + Analyzer + Visualizer agents
- **Software Development**: Architect + Developer + Tester agents

## CrewAI vs LangGraph

| Feature | CrewAI | LangGraph |
|---------|--------|-----------|
| **Paradigm** | Role-based agents | Graph-based state machines |
| **Ease of use** | Higher-level, more intuitive | Lower-level, more control |
| **Memory** | Built-in multi-type memory | Custom state management |
| **Best for** | Team-based collaboration | Complex control flow |
| **Performance** | 2-3x faster (benchmarks) | Flexible but more setup |

## Key Takeaways

- **What it solves:** Building teams of AI agents that collaborate autonomously
- **Killer feature:** Role-based agent design with built-in memory and delegation
- **Best for:** Teams who think in terms of "who does what" rather than "what flows where"
- **Maturity:** 45K+ stars, AWS integration, production-proven
- **Differentiator:** Dual architecture — Crews for autonomy, Flows for control

## Related Sources

- [LangChain / LangGraph](./langchain.md) — alternative agent framework
- [Oh My OpenCode](./oh-my-opencode.md) — multi-agent coding
- Topic: [ai-landscape-2026](../topics/ai-landscape-2026.md)

---

*Last processed: 2026-03-02*

# Ollama Integration Setup Guide

This guide explains how to set up and configure LegalEase to use local Ollama instead of cloud-based AI providers.

## Prerequisites

- Ollama installed on your system ([Download Ollama](https://ollama.ai))
- Python 3.8+ (Backend)
- Node.js 18+ (Frontend)

## Installation Steps

### 1. Install Ollama

Download and install Ollama from https://ollama.ai

### 2. Pull a Model

Pull the recommended model (Mistral) or another model of your choice:

```bash
# Pull Mistral model (recommended for legal/compliance tasks)
ollama pull mistral

# Alternative models:
ollama pull llama2          # Meta's Llama 2
ollama pull neural-chat     # Intel's Neural Chat (faster)
ollama pull openchat        # OpenChat
```

### 3. Start Ollama Server

Start the Ollama server (it will run on localhost:11434 by default):

```bash
ollama serve
```

Or on Windows:
```powershell
# Ollama typically runs automatically on Windows
# If not, run from the Ollama installation directory
ollama serve
```

Verify it's running:
```bash
curl http://localhost:11434/api/tags
```

## Backend Configuration

### Backend Environment Variables

Create or update your backend `.env` file:

```bash
# Remove these if present:
# OPENAI_API_KEY=
# GOOGLE_API_KEY=

# Add these for Ollama:
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=mistral
AI_PROVIDER=ollama
```

### Backend Dependencies

Update `backend/requirements.txt` to replace OpenAI and Google dependencies:

```bash
# Remove:
# openai>=1.0.0
# google-generativeai>=0.3.0

# Add:
httpx>=0.24.0
```

Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

## Frontend Configuration

### Frontend Environment Variables

Create or update your frontend `.env.local` file:

```bash
# Remove if present:
# OPENAI_API_KEY=

# Add these for Ollama:
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=mistral
```

### Frontend Dependencies

Remove OpenAI package:
```bash
cd frontend
npm uninstall openai
# or
pnpm remove openai
```

## Running the Application

### 1. Start Ollama Server

```bash
ollama serve
```

### 2. Start Backend Server

```bash
cd backend
python main.py
```

This will start the FastAPI server with Ollama integration.

### 3. Start Frontend Dev Server

```bash
cd frontend
npm run dev
# or
pnpm dev
```

Visit http://localhost:3000 in your browser.

## Model Recommendations

### For Legal & Compliance Tasks

**Mistral (Recommended)**
- Good balance of speed and quality
- ~7B parameters
- ~4GB memory requirements
- Pulls: `ollama pull mistral`

**Llama 2 Chat**
- More comprehensive responses
- ~13B parameters (requires 8GB+ memory)
- Pulls: `ollama pull llama2`

**Neural Chat**
- Faster inference
- ~7B parameters
- ~3.8GB memory requirements
- Pulls: `ollama pull neural-chat`

### Memory Requirements

| Model | Size | Memory | Speed |
|-------|------|--------|-------|
| mistral | 7B | ~4GB | Fast |
| neural-chat | 7B | ~3.8GB | Very Fast |
| llama2 | 13B | ~8GB | Medium |
| openchat | 7B | ~4GB | Fast |

## Troubleshooting

### Connection Issues

**Error: "Could not connect to Ollama at http://localhost:11434"**

1. Verify Ollama is running:
```bash
curl http://localhost:11434/api/tags
```

2. Check if Ollama is on a different port (update `OLLAMA_BASE_URL` if needed)

3. For remote Ollama servers, update the URL:
```bash
OLLAMA_BASE_URL=http://your-server-ip:11434
```

### Model Not Found

**Error: "model not found"**

Pull the model:
```bash
ollama pull mistral
```

List available models:
```bash
ollama list
```

### Memory Issues

If Ollama crashes or is slow:
1. Use a smaller model
2. Increase system RAM
3. Close other applications

## API Reference

### Ollama Generate API

The backend and frontend now use the Ollama `/api/generate` endpoint:

```typescript
// Frontend - API call to route handler
POST /api/chat
{
  messages: ChatMessage[],
  agentId: string,
  context: string
}

// Backend - Direct Ollama call
POST http://localhost:11434/api/generate
{
  model: "mistral",
  prompt: "Your prompt here",
  temperature: 0.3,
  stream: false
}
```

## Performance Tips

1. **Use SSD Storage**: Ollama performs better with SSDs
2. **Adequate RAM**: Ensure system has sufficient RAM for the model size
3. **GPU Acceleration**: Install CUDA/Metal drivers for GPU support
4. **Smaller Models First**: Start with Mistral, upgrade to Llama2 if needed
5. **Batch Requests**: Combine multiple short requests to improve throughput

## Advanced Configuration

### Custom Model Parameters

Edit environment variables:
```bash
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=mistral
```

### Using Different Models

Change just the model name:
```bash
# Switch to llama2
OLLAMA_MODEL=llama2

# or neural-chat
OLLAMA_MODEL=neural-chat
```

## Support & Documentation

- Ollama Official Docs: https://ollama.ai
- Model Library: https://ollama.ai/library
- GitHub: https://github.com/ollama/ollama

## Migration Notes

This setup replaces:
- `OpenAI API` → `Local Ollama`
- `Google Gemini API` → `Local Ollama`

No other code changes are required. All AI agents work identically with Ollama backend.

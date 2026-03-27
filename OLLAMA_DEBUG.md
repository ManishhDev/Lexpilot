# Ollama Response Issue - Troubleshooting & Solution

## Problem
Chat is stuck on "writing..." and not returning responses. The Ollama model generation is timing out after 2 minutes.

## Root Cause
The Mistral model (7.2B parameters) is taking too long to generate responses on your system. This could be due to:
- No GPU acceleration (CPU-only inference is slow)
- System resource constraints
- Model size too large for available RAM

## Solutions

### ✅ Solution 1: Use a Faster Model (Recommended)

Switch to `phi:latest` which is much faster (3B parameters):

#### Option A: Update Environment Variables

**Backend `.env`:**
```bash
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=phi
AI_PROVIDER=ollama
```

**Frontend `.env.local`:**
```bash
NEXT_PUBLIC_OLLAMA_MODEL=phi
OLLAMA_MODEL=phi
```

#### Option B: Update Config File

Edit `backend/core/config.py`:
```python
OLLAMA_MODEL: str = "phi"  # Changed from "mistral"
```

#### Option C: Runtime Override

Just restart Ollama to use the new model or pass it as environment variable at startup.

### ✅ Solution 2: Use Neural Chat (Good Balance)

If Phi is too simple, try `neural-chat:latest`:
```bash
OLLAMA_MODEL=neural-chat
```

### Model Performance Comparison

| Model | Size | Speed | Quality | Lines/Min |
|-------|------|-------|---------|-----------|
| **phi** | 3B | ⚡ Very Fast | Good | ~12-15 |
| **neural-chat** | 7B | ⚡ Fast | Very Good | ~8-10 |
| **mistral** | 7.2B | 🐢 Slow | Excellent | ~3-5 |
| **llama3** | 8B | 🐢 Slow | Excellent | ~2-4 |
| **codellama** | 7B | 🐢 Slow | Code-focused | ~3-5 |

### ✅ Solution 3: Increase Timeout (Temporary Fix)

If you want to keep Mistral, increase the timeout in the chat route:

**File: `frontend/app/api/chat/route.ts`**

Find this line:
```typescript
const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 minute timeout
```

Change to:
```typescript
const timeoutId = setTimeout(() => controller.abort(), 300000); // 5 minute timeout
```

### ✅ Solution 4: Enable GPU Acceleration

For faster responses, enable GPU support in Ollama:

**Windows (NVIDIA GPU):**
1. Install CUDA toolkit
2. Restart Ollama - it will auto-detect GPU
3. Check: `ollama list` should show GPU usage

**Mac:**
1. Metal acceleration is automatic
2. Restart Ollama

**Linux:**
1. Install NVIDIA CUDA toolkit
2. Or install AMD ROCm for AMD GPUs

## Recommended Step-by-Step Fix

1. **Stop current services** (frontend, backend)

2. **Update Backend `.env`:**
   ```bash
   OLLAMA_MODEL=phi
   ```

3. **Update Frontend `.env.local`:**
   ```bash
   OLLAMA_MODEL=phi
   NEXT_PUBLIC_OLLAMA_MODEL=phi
   ```

4. **Restart services:**
   ```bash
   # Terminal 1 - Backend
   cd backend
   python main.py

   # Terminal 2 - Frontend  
   cd frontend
   npm run dev
   ```

5. **Test the chat** - responses should be much faster now!

## Testing Response Time

Use the test script to check response time with different models:

```bash
# Test current model
cd backend
python test_ollama.py
```

## Debug Logs

To see detailed what's happening:

1. **Check Browser Console:**
   - Open DevTools (F12)
   - Go to Console tab
   - Try sending a message
   - Look for error messages

2. **Check Backend Logs:**
   - Look for log messages showing:
     - "Calling Ollama API with model: phi"
     - "Ollama response received"

3. **Check Network Tab:**
   - Open DevTools
   - Go to Network tab
   - Filter by "chat"
   - Click the request to see response time

## Expected Response Times (After Fix)

| Model | First Response | Subsequent Response |
|-------|---|---|
| Phi | 5-8 seconds | 2-4 seconds |
| Neural Chat | 8-12 seconds | 3-6 seconds |
| Mistral | 15-30+ seconds | 5-15 seconds |

## If Still Not Working

1. Verify Ollama is still running:
   ```bash
   curl http://localhost:11434/api/tags
   ```

2. Check if model is loaded:
   ```bash
   ollama list
   ```

3. Try pulling the model again:
   ```bash
   ollama pull phi
   ```

4. Restart Ollama completely:
   - Kill the process
   - Run `ollama serve` again

5. Check system resources:
   - CPU usage
   - Memory usage (need at least 4GB free)
   - Disk space

## Support

For more model options, visit: https://ollama.ai/library

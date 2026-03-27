#!/usr/bin/env python3
"""
Test Ollama API connectivity from backend
Run this to verify Ollama is working properly with the backend
"""

import httpx
import json
import asyncio

OLLAMA_BASE_URL = "http://localhost:11434"
OLLAMA_MODEL = "mistral"

async def test_ollama_connection():
    """Test if Ollama is reachable and models are available"""
    async with httpx.AsyncClient() as client:
        try:
            # Test 1: Check if Ollama is running
            print("🔍 Testing Ollama connection...")
            response = await client.get(f"{OLLAMA_BASE_URL}/api/tags")
            
            if response.status_code == 200:
                models = response.json()
                print("✅ Ollama is running!")
                print(f"📋 Available models: {len(models.get('models', []))}")
                
                for model in models.get('models', []):
                    print(f"   - {model['name']}")
                
                # Check if our default model is available
                model_names = [m['name'] for m in models.get('models', [])]
                if any(OLLAMA_MODEL in name for name in model_names):
                    print(f"✅ Model '{OLLAMA_MODEL}' is available!")
                else:
                    print(f"⚠️  Model '{OLLAMA_MODEL}' not found. Available: {model_names}")
                    
            else:
                print(f"❌ Ollama API returned status: {response.status_code}")
                
        except httpx.ConnectError:
            print(f"❌ Could not connect to Ollama at {OLLAMA_BASE_URL}")
            print("   Make sure Ollama is running: `ollama serve`")
            return False
        except Exception as e:
            print(f"❌ Error: {e}")
            return False

async def test_ollama_generate():
    """Test if Ollama can generate responses"""
    async with httpx.AsyncClient() as client:
        try:
            print("\n🔍 Testing Ollama generation...")
            
            prompt = """You are a helpful assistant. Answer briefly.
            
Question: What is 2+2?

Answer:"""
            
            response = await client.post(
                f"{OLLAMA_BASE_URL}/api/generate",
                json={
                    "model": OLLAMA_MODEL,
                    "prompt": prompt,
                    "stream": False,
                    "temperature": 0.3,
                },
                timeout=120.0
            )
            
            if response.status_code == 200:
                data = response.json()
                result = data.get('response', '').strip()
                print("✅ Ollama generation working!")
                print(f"📝 Sample response: {result[:100]}...")
                return True
            else:
                print(f"❌ Generation failed with status: {response.status_code}")
                print(f"   Response: {response.text[:200]}")
                return False
                
        except httpx.TimeoutException:
            print("❌ Ollama generation timed out after 2 minutes")
            print("   Model might be too large or system too slow")
            return False
        except Exception as e:
            print(f"❌ Error: {e}")
            return False

async def main():
    print("=" * 60)
    print("Ollama Backend Connectivity Test")
    print("=" * 60)
    
    await test_ollama_connection()
    await test_ollama_generate()
    
    print("=" * 60)
    print("✅ All tests passed! Ollama is ready for use.")
    print("=" * 60)

if __name__ == "__main__":
    asyncio.run(main())

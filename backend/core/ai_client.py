"""Unified AI client for Ollama local LLM"""
from typing import Optional, Any, Dict
import httpx
import asyncio
from .config import settings

class AIClient:
    """AI client for Ollama local LLM"""
    
    def __init__(self, provider: str = "ollama"):
        """Initialize AI client with Ollama"""
        self.provider = provider.lower()
        if self.provider != "ollama":
            raise ValueError(f"This client only supports Ollama. Got: {self.provider}")
        self.base_url = settings.OLLAMA_BASE_URL
        self.model = settings.OLLAMA_MODEL
        self.client = httpx.AsyncClient()
    
    async def generate_content(self, prompt: str, temperature: float = 0.7) -> str:
        """Generate content using Ollama local model"""
        try:
            response = await self.client.post(
                f"{self.base_url}/api/generate",
                json={
                    "model": self.model,
                    "prompt": prompt,
                    "temperature": temperature,
                    "stream": False,
                },
                timeout=300.0  # 5 minute timeout for generation
            )
            response.raise_for_status()
            result = response.json()
            return result.get("response", "")
        except httpx.ConnectError:
            raise Exception(f"Could not connect to Ollama at {self.base_url}. Make sure Ollama is running.")
        except Exception as e:
            raise Exception(f"Error generating content with Ollama: {str(e)}")
    
    async def generate_with_system_prompt(self, system_prompt: str, user_message: str, temperature: float = 0.3) -> str:
        """Generate content with system prompt guidance"""
        try:
            combined_prompt = f"{system_prompt}\n\nUser: {user_message}\n\nAssistant:"
            return await self.generate_content(combined_prompt, temperature)
        except Exception as e:
            raise Exception(f"Error generating content with Ollama: {str(e)}")
    
    def get_browser_agent(self, task: str):
        """Get a configured browser agent with Ollama LLM"""
        raise NotImplementedError("Browser automation with Ollama requires additional setup. Use generate_content instead.")
    
    async def close(self):
        """Close the HTTP client"""
        await self.client.aclose()

# Global instance with Ollama
ai_client = AIClient()

def get_ai_client(provider: Optional[str] = None) -> AIClient:
    """Get AI client instance (Ollama only)"""
    global ai_client
    if provider and provider.lower() != "ollama":
        raise ValueError(f"Only Ollama provider is supported. Got: {provider}")
    return ai_client

# Example usage:
# async def example():
#     client = get_ai_client()  # Gets Ollama
#     response = await client.generate_content("Your prompt here")
#     print(response)
#     await client.close() 
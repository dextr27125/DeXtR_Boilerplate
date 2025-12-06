import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateChatResponse, type ChatMessage } from '@/lib/ai/gemini';
import { checkRateLimit, aiRateLimiter } from '@/lib/ai/rate-limiter';
import { db } from '@/lib/db';
import { aiUsage } from '@/lib/db/schema';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check rate limit
    const rateLimit = await checkRateLimit(user.id, aiRateLimiter);

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimit.limit.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': rateLimit.reset.toString(),
            'Retry-After': Math.ceil((rateLimit.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    const { message, history = [] } = await req.json() as {
      message: string;
      history?: ChatMessage[];
    };

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Generate response using Gemini
    const result = await generateChatResponse(message, history);

    // Log usage for analytics
    if (result.usage) {
      await db.insert(aiUsage).values({
        userId: user.id,
        model: 'gemini-2.0-flash',
        promptTokens: result.usage.promptTokenCount || 0,
        completionTokens: result.usage.candidatesTokenCount || 0,
        totalTokens: result.usage.totalTokenCount || 0,
        usageDate: new Date().toISOString().split('T')[0],
      });
    }

    return NextResponse.json(
      {
        response: result.text,
        usage: result.usage
          ? {
              promptTokens: result.usage.promptTokenCount,
              completionTokens: result.usage.candidatesTokenCount,
              totalTokens: result.usage.totalTokenCount,
            }
          : null,
      },
      {
        headers: {
          'X-RateLimit-Limit': rateLimit.limit.toString(),
          'X-RateLimit-Remaining': (rateLimit.remaining - 1).toString(),
        },
      }
    );
  } catch (error) {
    console.error('AI chat error:', error);
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}

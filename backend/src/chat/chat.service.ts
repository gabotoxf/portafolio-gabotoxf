import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';

@Injectable()
export class ChatService {
  private genAI: GoogleGenerativeAI;
  private groq: Groq;

  constructor(private configService: ConfigService) {
    const geminiKey = this.configService.get<string>('GEMINI_API_KEY');
    const groqKey = this.configService.get<string>('GROQ_API_KEY');

    if (!geminiKey) console.warn('GEMINI_API_KEY not found');
    if (!groqKey) console.warn('GROQ_API_KEY not found');

    if (geminiKey) {
      this.genAI = new GoogleGenerativeAI(geminiKey);
    }
    if (groqKey) {
      this.groq = new Groq({ apiKey: groqKey });
    }
  }

  async sendMessage(body: any): Promise<any> {
    // Intentar primero con Groq (Principal)
    if (this.groq) {
      try {
        const response = await this.groq.chat.completions.create({
          model: body.model || 'llama-3.3-70b-versatile',
          messages: body.messages,
          max_tokens: body.max_tokens || 500,
          temperature: body.temperature || 0.7,
        });

        console.log('Chat completed using Groq (Primary)');
        return {
          choices: [
            {
              message: {
                role: 'assistant',
                content: response.choices[0]?.message?.content || '',
              },
            },
          ],
        };
      } catch (error) {
        console.error('Groq API Error, falling back to Gemini:', error);
      }
    }

    // Fallback a Gemini (Secundario)
    if (this.genAI) {
      try {
        const model = this.genAI.getGenerativeModel({
          model: 'gemini-1.5-flash',
        });

        const systemMessage = body.messages.find((m: any) => m.role === 'system');
        const chatMessages = body.messages.filter((m: any) => m.role !== 'system');

        const history = chatMessages
          .slice(0, -1)
          .map((m: any) => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }],
          }))
          .filter((_, i, arr) => !(i === 0 && arr[0].role === 'model'));

        const lastMessage = chatMessages[chatMessages.length - 1].content;

        const chat = model.startChat({
          systemInstruction: {
            role: 'system',
            parts: [{ text: systemMessage?.content || '' }],
          },
          history,
          generationConfig: { maxOutputTokens: body.max_tokens || 500 },
        });

        const result = await chat.sendMessage(lastMessage);

        console.log('Chat completed using Gemini (Fallback)');
        return {
          choices: [
            {
              message: {
                role: 'assistant',
                content: result.response.text(),
              },
            },
          ],
        };
      } catch (error) {
        console.error('Gemini API Error:', error);
        throw new Error(`Ambos proveedores fallaron. Error de Gemini: ${error.message}`);
      }
    }

    throw new Error('No se han configurado proveedores de chat (Groq o Gemini).');
  }
}
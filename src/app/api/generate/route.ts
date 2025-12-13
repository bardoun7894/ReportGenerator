import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface GenerateRequest {
  title: string;
  domain?: string;
  targetAudience?: string[];
  location?: string;
  participantsCount?: number;
  executors?: string;
  duration?: string;
  schoolName?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();

    if (!body.title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    // Map audience IDs to Arabic labels
    const audienceMap: Record<string, string> = {
      students: 'الطلاب',
      teachers: 'المعلمين',
      female_teachers: 'المعلمات',
      parents: 'أولياء الأمور',
      admin: 'الإدارة',
      community: 'المجتمع',
    };

    const audienceLabels = body.targetAudience?.map(a => audienceMap[a] || a).join('، ') || '';

    const prompt = `أنت مساعد تربوي متخصص في كتابة تقارير الأنشطة المدرسية باللغة العربية الفصحى.

بيانات الفعالية:
- اسم الفعالية: ${body.title}
- المجال: ${body.domain || 'غير محدد'}
- المستفيدون: ${audienceLabels || 'غير محدد'}
- مكان التنفيذ: ${body.location || 'غير محدد'}
- عدد المستفيدين: ${body.participantsCount || 'غير محدد'}
- المنفذون: ${body.executors || 'غير محدد'}
- مدة التنفيذ: ${body.duration || 'غير محدد'}

المطلوب:
أنشئ محتوى تقرير مدرسي يتضمن:

1. وصف الفعالية (فقرة واحدة مختصرة تصف الفعالية وأهميتها)

2. خطوات التنفيذ (4-6 خطوات مرقمة بالأرقام العربية مثل: ١، ٢، ٣)

3. أهداف الفعالية (3-4 أهداف قصيرة وواضحة)

أجب بصيغة JSON فقط كالتالي:
{
  "description": "وصف الفعالية هنا...",
  "executionSteps": "١. الخطوة الأولى.\\n٢. الخطوة الثانية.\\n٣. الخطوة الثالثة.",
  "objectives": ["الهدف الأول", "الهدف الثاني", "الهدف الثالث"]
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'أنت مساعد تربوي متخصص في كتابة التقارير المدرسية باللغة العربية. أجب دائمًا بصيغة JSON صحيحة فقط.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = completion.choices[0]?.message?.content || '';

    // Parse the JSON response
    let parsed;
    try {
      // Remove markdown code blocks if present
      const jsonContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(jsonContent);
    } catch {
      // If parsing fails, return a fallback
      console.error('Failed to parse AI response:', content);
      return NextResponse.json({
        description: 'فعالية تربوية متميزة تهدف إلى إثراء البيئة التعليمية وتعزيز مهارات المشاركين.',
        executionSteps: '١. التخطيط والإعداد للفعالية.\n٢. تنفيذ الأنشطة المتنوعة.\n٣. تكريم المشاركين والمتميزين.',
        objectives: [
          'تعزيز مهارات المشاركين',
          'إثراء البيئة التعليمية',
          'تحقيق التفاعل الإيجابي',
        ],
      });
    }

    return NextResponse.json({
      description: parsed.description || '',
      executionSteps: parsed.executionSteps || '',
      objectives: parsed.objectives || [],
    });
  } catch (error) {
    console.error('Generate API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}

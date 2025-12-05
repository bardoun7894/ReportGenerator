"use client";

import { useState } from "react";
import { Zap, Plus, Trash2, GripVertical } from "lucide-react";
import { useWizardStore, EnhancedText } from "@/stores/wizard-store";
import AISuggestionBox from "@/components/ai/AISuggestionBox";

export default function StepResults() {
          const { formData, updateFormData } = useWizardStore();
          const [activeIndex, setActiveIndex] = useState<number | null>(null);
          const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);

          const results = formData.results || [{ original: "", enhanced: "", isAIEnhanced: false }];

          const updateResult = (index: number, value: string) => {
                    const updated = [...results];
                    updated[index] = { ...updated[index], original: value };
                    updateFormData({ results: updated });
          };

          const addResult = () => {
                    updateFormData({
                              results: [...results, { original: "", enhanced: "", isAIEnhanced: false }],
                    });
          };

          const removeResult = (index: number) => {
                    if (results.length > 1) {
                              const updated = results.filter((_, i) => i !== index);
                              updateFormData({ results: updated });
                    }
          };

          const handleAIEnhance = async (index: number) => {
                    const text = results[index].original;
                    if (!text.trim()) return;

                    setActiveIndex(index);
                    setTimeout(() => {
                              const enhanced = `تحقق ${text} بنجاح تام وفق المعايير المحددة مع مشاركة فعالة من جميع الأطراف المعنية.`;
                              setAiSuggestion(enhanced);
                    }, 1000);
          };

          const acceptSuggestion = () => {
                    if (activeIndex !== null && aiSuggestion) {
                              const updated = [...results];
                              updated[activeIndex] = {
                                        original: results[activeIndex].original,
                                        enhanced: aiSuggestion,
                                        isAIEnhanced: true,
                                        acceptedAt: new Date(),
                              };
                              updateFormData({ results: updated });
                              setActiveIndex(null);
                              setAiSuggestion(null);
                    }
          };

          const rejectSuggestion = () => {
                    setActiveIndex(null);
                    setAiSuggestion(null);
          };

          return (
                    <div>
                              <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                                        <span>نتائج الفعالية</span>
                                        <span>📊</span>
                              </h2>
                              <div className="flex items-center gap-2 text-white/60 mb-8">
                                        <Zap className="w-4 h-4 text-ai" />
                                        <p>اكتب النتائج بشكل مختصر وسيحسّنها الذكاء الاصطناعي</p>
                              </div>

                              <div className="space-y-4">
                                        {results.map((result, index) => (
                                                  <div key={index} className="space-y-3">
                                                            <div className="flex items-start gap-3">
                                                                      <div className="pt-3 text-white/30 cursor-grab">
                                                                                <GripVertical className="w-5 h-5" />
                                                                      </div>
                                                                      <div className="flex-1">
                                                                                <div className="relative">
                                                                                          <input
                                                                                                    type="text"
                                                                                                    value={result.isAIEnhanced ? result.enhanced : result.original}
                                                                                                    onChange={(e) => updateResult(index, e.target.value)}
                                                                                                    placeholder="مثال: زيادة الوعي لدى الطلاب"
                                                                                                    className={`form-input pr-12 ${result.isAIEnhanced ? 'border-ai/50' : ''}`}
                                                                                                    disabled={result.isAIEnhanced}
                                                                                          />
                                                                                          {!result.isAIEnhanced && (
                                                                                                    <button
                                                                                                              type="button"
                                                                                                              onClick={() => handleAIEnhance(index)}
                                                                                                              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 text-ai hover:bg-ai/20 rounded-lg transition-colors"
                                                                                                    >
                                                                                                              <Zap className="w-5 h-5" />
                                                                                                    </button>
                                                                                          )}
                                                                                          {result.isAIEnhanced && (
                                                                                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-ai text-xs">
                                                                                                              <span>🤖</span>
                                                                                                              <span>محسّن</span>
                                                                                                    </div>
                                                                                          )}
                                                                                </div>
                                                                      </div>
                                                                      {results.length > 1 && (
                                                                                <button
                                                                                          type="button"
                                                                                          onClick={() => removeResult(index)}
                                                                                          className="pt-3 text-white/30 hover:text-red-400 transition-colors"
                                                                                >
                                                                                          <Trash2 className="w-5 h-5" />
                                                                                </button>
                                                                      )}
                                                            </div>
                                                            {activeIndex === index && aiSuggestion && (
                                                                      <AISuggestionBox
                                                                                suggestion={aiSuggestion}
                                                                                onAccept={acceptSuggestion}
                                                                                onEdit={() => { }}
                                                                                onReject={rejectSuggestion}
                                                                      />
                                                            )}
                                                  </div>
                                        ))}
                                        <button
                                                  type="button"
                                                  onClick={addResult}
                                                  className="flex items-center gap-2 text-primary hover:text-primary-hover transition-colors px-4 py-3"
                                        >
                                                  <Plus className="w-5 h-5" />
                                                  <span>إضافة نتيجة أخرى</span>
                                        </button>
                              </div>
                    </div>
          );
}

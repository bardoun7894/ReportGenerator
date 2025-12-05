"use client";

import { useState } from "react";
import { Zap, Plus, Trash2 } from "lucide-react";
import { useWizardStore } from "@/stores/wizard-store";
import AISuggestionBox from "@/components/ai/AISuggestionBox";

export default function StepRecommendations() {
          const { formData, updateFormData } = useWizardStore();
          const [activeIndex, setActiveIndex] = useState<number | null>(null);
          const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);

          const recommendations = formData.recommendations || [];

          const updateRecommendation = (index: number, value: string) => {
                    const updated = [...recommendations];
                    updated[index] = { ...updated[index], original: value };
                    updateFormData({ recommendations: updated });
          };

          const addRecommendation = () => {
                    updateFormData({
                              recommendations: [...recommendations, { original: "", enhanced: "", isAIEnhanced: false }],
                    });
          };

          const removeRecommendation = (index: number) => {
                    const updated = recommendations.filter((_, i) => i !== index);
                    updateFormData({ recommendations: updated });
          };

          const handleAIEnhance = async (index: number) => {
                    const text = recommendations[index].original;
                    if (!text.trim()) return;

                    setActiveIndex(index);
                    setTimeout(() => {
                              const enhanced = `نوصي ب${text} وذلك لتعزيز جودة العملية التعليمية وتحقيق الأهداف المرجوة.`;
                              setAiSuggestion(enhanced);
                    }, 1000);
          };

          const acceptSuggestion = () => {
                    if (activeIndex !== null && aiSuggestion) {
                              const updated = [...recommendations];
                              updated[activeIndex] = {
                                        original: recommendations[activeIndex].original,
                                        enhanced: aiSuggestion,
                                        isAIEnhanced: true,
                                        acceptedAt: new Date(),
                              };
                              updateFormData({ recommendations: updated });
                              setActiveIndex(null);
                              setAiSuggestion(null);
                    }
          };

          return (
                    <div>
                              <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                                        <span>التوصيات</span>
                                        <span>💡</span>
                              </h2>
                              <p className="text-white/60 mb-8">
                                        أضف توصيات للتطوير المستقبلي <span className="text-white/40">(اختياري)</span>
                              </p>

                              <div className="space-y-4">
                                        {recommendations.length === 0 ? (
                                                  <div className="text-center py-8 text-white/40">
                                                            <p className="mb-4">لا توجد توصيات حالياً</p>
                                                  </div>
                                        ) : (
                                                  recommendations.map((rec, index) => (
                                                            <div key={index} className="space-y-3">
                                                                      <div className="flex items-start gap-3">
                                                                                <div className="flex-1">
                                                                                          <div className="relative">
                                                                                                    <input
                                                                                                              type="text"
                                                                                                              value={rec.isAIEnhanced ? rec.enhanced : rec.original}
                                                                                                              onChange={(e) => updateRecommendation(index, e.target.value)}
                                                                                                              placeholder="مثال: تكرار الفعالية سنوياً"
                                                                                                              className={`form-input pr-12 ${rec.isAIEnhanced ? 'border-ai/50' : ''}`}
                                                                                                              disabled={rec.isAIEnhanced}
                                                                                                    />
                                                                                                    {!rec.isAIEnhanced && (
                                                                                                              <button
                                                                                                                        type="button"
                                                                                                                        onClick={() => handleAIEnhance(index)}
                                                                                                                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 text-ai hover:bg-ai/20 rounded-lg transition-colors"
                                                                                                              >
                                                                                                                        <Zap className="w-5 h-5" />
                                                                                                              </button>
                                                                                                    )}
                                                                                                    {rec.isAIEnhanced && (
                                                                                                              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-ai text-xs">
                                                                                                                        <span>🤖</span>
                                                                                                                        <span>محسّن</span>
                                                                                                              </div>
                                                                                                    )}
                                                                                          </div>
                                                                                </div>
                                                                                <button
                                                                                          type="button"
                                                                                          onClick={() => removeRecommendation(index)}
                                                                                          className="pt-3 text-white/30 hover:text-red-400 transition-colors"
                                                                                >
                                                                                          <Trash2 className="w-5 h-5" />
                                                                                </button>
                                                                      </div>
                                                                      {activeIndex === index && aiSuggestion && (
                                                                                <AISuggestionBox
                                                                                          suggestion={aiSuggestion}
                                                                                          onAccept={acceptSuggestion}
                                                                                          onEdit={() => { }}
                                                                                          onReject={() => { setActiveIndex(null); setAiSuggestion(null); }}
                                                                                />
                                                                      )}
                                                            </div>
                                                  ))
                                        )}

                                        <button
                                                  type="button"
                                                  onClick={addRecommendation}
                                                  className="flex items-center gap-2 text-primary hover:text-primary-hover transition-colors px-4 py-3"
                                        >
                                                  <Plus className="w-5 h-5" />
                                                  <span>إضافة توصية</span>
                                        </button>
                              </div>
                    </div>
          );
}

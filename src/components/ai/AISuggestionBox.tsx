"use client";

interface AISuggestionBoxProps {
          suggestion: string;
          onAccept: () => void;
          onEdit: () => void;
          onReject: () => void;
          isLoading?: boolean;
}

export default function AISuggestionBox({
          suggestion,
          onAccept,
          onEdit,
          onReject,
          isLoading = false,
}: AISuggestionBoxProps) {
          if (isLoading) {
                    return (
                              <div className="ai-suggestion-box flex items-center gap-3">
                                        <div className="animate-spin w-5 h-5 border-2 border-ai border-t-transparent rounded-full" />
                                        <span className="text-ai">جاري تحسين النص...</span>
                              </div>
                    );
          }

          return (
                    <div className="ai-suggestion-box mr-8">
                              <div className="flex items-start gap-2 mb-4">
                                        <span className="text-lg">🤖</span>
                                        <div>
                                                  <span className="text-ai text-sm font-medium">الصياغة المحسّنة:</span>
                                                  <p className="text-white mt-2 leading-relaxed">{suggestion}</p>
                                        </div>
                              </div>

                              <div className="flex justify-end gap-3">
                                        <button
                                                  type="button"
                                                  onClick={onReject}
                                                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/70 hover:text-red-400 transition-colors"
                                        >
                                                  <span>✗</span>
                                                  <span>رفض</span>
                                        </button>
                                        <button
                                                  type="button"
                                                  onClick={onEdit}
                                                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-accent/20 text-white/70 hover:text-accent transition-colors"
                                        >
                                                  <span>✏️</span>
                                                  <span>تعديل</span>
                                        </button>
                                        <button
                                                  type="button"
                                                  onClick={onAccept}
                                                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary transition-colors"
                                        >
                                                  <span>✓</span>
                                                  <span>قبول</span>
                                        </button>
                              </div>
                    </div>
          );
}

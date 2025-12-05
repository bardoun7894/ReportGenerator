// Helper functions for template display

// Map audience IDs to Arabic labels
export const AUDIENCE_LABELS: Record<string, string> = {
          'students': 'الطلاب',
          'teachers': 'المعلمين',
          'parents': 'أولياء الأمور',
          'staff': 'الموظفين',
          'community': 'المجتمع المحلي',
          'administrators': 'الإداريين',
};

// Convert audience ID to Arabic label
export function getAudienceLabel(audienceId: string): string {
          return AUDIENCE_LABELS[audienceId] || audienceId;
}

// Convert array of audience IDs to Arabic labels
export function getAudienceLabels(audiences: string[]): string[] {
          return audiences.map(getAudienceLabel);
}

// Parse execution steps from text to array (splits by ١. ٢. ٣. etc or newlines)
export function parseExecutionSteps(text: string | undefined): string[] {
          if (!text) return [];

          // First try to split by Arabic numbered patterns (١. ٢. ٣. etc)
          const arabicNumberPattern = /[١٢٣٤٥٦٧٨٩٠]+\.\s*/g;

          // Check if text contains Arabic numbers
          if (arabicNumberPattern.test(text)) {
                    // Split by Arabic numbers and filter empty
                    const parts = text.split(/[١٢٣٤٥٦٧٨٩٠]+\.\s*/).filter(s => s.trim());
                    if (parts.length > 1) return parts.map(s => s.trim());
          }

          // Try to split by Western numbered patterns (1. 2. 3. etc)
          const westernNumberPattern = /\d+\.\s*/g;
          if (westernNumberPattern.test(text)) {
                    const parts = text.split(/\d+\.\s*/).filter(s => s.trim());
                    if (parts.length > 1) return parts.map(s => s.trim());
          }

          // Try newlines
          const lines = text.split('\n').filter(s => s.trim());
          if (lines.length > 1) return lines.map(s => s.trim());

          // Return as single item if no splits found
          return [text.trim()];
}

// Extract description (first part before numbered steps)
export function extractDescription(text: string | undefined): string {
          if (!text) return '';

          // Find where numbered steps start (Arabic or Western)
          const arabicMatch = text.match(/[١٢٣٤٥٦٧٨٩٠]+\.\s/);
          const westernMatch = text.match(/\d+\.\s/);

          let cutIndex = text.length;
          if (arabicMatch && arabicMatch.index !== undefined) {
                    cutIndex = Math.min(cutIndex, arabicMatch.index);
          }
          if (westernMatch && westernMatch.index !== undefined) {
                    cutIndex = Math.min(cutIndex, westernMatch.index);
          }

          return text.substring(0, cutIndex).trim();
}

// Extract only the numbered steps (without description)
export function extractSteps(text: string | undefined): string[] {
          if (!text) return [];

          const description = extractDescription(text);
          const stepsText = text.substring(description.length).trim();

          if (!stepsText) return [];

          return parseExecutionSteps(stepsText);
}

export interface EvaluationItem {
  id: string;
  text: string;
  category: string;
}

export interface FormSection {
  title: string;
  items: string[];
}

export enum EvaluationStatus {
  Achieved = 'achieved',
  PartiallyAchieved = 'partially',
  NotAchieved = 'not_achieved',
}
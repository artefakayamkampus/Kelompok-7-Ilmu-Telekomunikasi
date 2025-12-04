export interface AnalysisResult {
  classification: 'Candaan' | 'Penindasan' | 'Aman';
  score: number;
  feedback: string;
}

export enum AnalyzeStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
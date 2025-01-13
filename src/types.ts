export interface Measurement {
  id: number;
  size: number;
  type: 'ring' | 'circumference';
  date: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
}
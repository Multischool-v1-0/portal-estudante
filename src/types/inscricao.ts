export type StudyLevel = "Ensino Médio" | "Ensino Superior" | "ensino médio " | "Ensino médio ";
export type Period = "Manhã" | "Tarde" | "Noite";

export interface Enrollment {
  id: string;
  studentId: string;
  institution: string;
  faculdade?: string;   
  course: string;
  period: Period;
  studyLevel: StudyLevel;
  enrolledAt: string; 
}

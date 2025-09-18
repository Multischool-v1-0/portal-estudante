import { Enrollment } from "@/types/inscricao";

export const mockEnrollments: Enrollment[] = [
  {
    id: "enr-1",
    studentId: "stu-1",
    institution: "ISPTEC",
    faculdade: "Engenharia e Tecnologia",
    course: "Engenharia Informática",
    period: "Manhã",
    studyLevel: "Ensino Superior",
    enrolledAt: "2025-08-01",
  },
  {
    id: "enr-2",
    studentId: "stu-2",
    institution: "IMIL",
    course: "Técnico de Contabilidade",
    period: "Tarde",
    studyLevel: "Ensino Médio",
    enrolledAt: "2025-08-02",
  },
];

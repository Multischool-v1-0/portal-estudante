import { Student } from "@/types/student";

export const mockStudents: Student[] = [
  {
    id: "stu-1",
    fullName: "Ana de Assis Correia Diogo",
    phoneNumber: "+244912345678",
    address: "Luanda, Angola",
    bilheteIdentidade: "00654321LA042",
    declaracaoMedio: undefined,
    certificadoSuperior: "/files/certificados/ana.pdf",
    profilePhoto: "/images/students/ana.jpg",
  },
  {
    id: "stu-2",
    fullName: "João Silva Santos",
    phoneNumber: "+244923456789",
    address: "Benguela, Angola",
    bilheteIdentidade: "00765432BE021",
    declaracaoMedio: "/files/declaracoes/joao.pdf",
    certificadoSuperior: undefined,
    profilePhoto: undefined,
  },
];

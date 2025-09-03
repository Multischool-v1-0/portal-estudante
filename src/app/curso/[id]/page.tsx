'use client';
import React from "react";
import { useParams, useRouter } from "next/navigation";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import bgHero from "@/assets/backgrounds/instituicoes/impal_default.png";
import Button from "@/components/ui/Button";
// Types
interface Subject {
  subject: string;
  hours: number;
}

interface Semester {
  "1º Semestre": Subject[];
  "2º Semestre": Subject[];
}

interface Curriculum {
  "1º ano": Semester;
  "2º ano": Semester;
  "3º ano"?: Semester;
  "4º ano"?: Semester;
}

interface CourseData {
  name: string;
  relation: string;
  duration: string;
  students: string;
  image: string;
  curriculum: Curriculum;
  requirements: string[];
}

// Função para converter slug de volta para nome do curso
const slugToCourseMapping: { [key: string]: string } = {
  electrotecnia: "Electrotecnia",
  mecanica: "Mecânica",
  informatica: "Informática",
  "construcao-civil": "Construção Civil",
  "quimica-industrial": "Química Industrial",
  metalomecanica: "Metalomecânica",
  refrigeracao: "Refrigeração",
  soldadura: "Soldadura",
  contabilidade: "Contabilidade",
  administracao: "Administração",
  secretariado: "Secretariado",
  quimica: "Química",
  enfermagem: "Enfermagem",
  farmacia: "Farmácia",
  telecomunicacoes: "Telecomunicações",
  electronica: "Electrónica",
  "redes-sistemas": "Redes e Sistemas",
  programacao: "Programação",
  "design-grafico": "Design Gráfico",
  multimedia: "Multimédia",
  medicina: "Medicina",
  engenharia: "Engenharia",
  direito: "Direito",
  economia: "Economia",
  arquitectura: "Arquitectura",
  ciencias: "Ciências",
  letras: "Letras",
  psicologia: "Psicologia",
  "engenharia-informatica": "Engenharia Informática",
  gestao: "Gestão",
  marketing: "Marketing",
  design: "Design",
  educacao: "Educação",
  saude: "Saúde",
  "comunicacao-social": "Comunicação Social",
};

// Função para gerar dados genéricos do curso baseado no nome
const generateCourseData = (courseName: string): CourseData => {
  const courseDisplayNames: { [key: string]: string } = {
    Electrotecnia: "Técnico de Electrotecnia",
    Mecânica: "Técnico de Mecânica Industrial",
    Informática: "Técnico de Informática",
    "Construção Civil": "Técnico de Construção Civil",
    "Química Industrial": "Técnico de Química Industrial",
    Metalomecânica: "Técnico de Metalomecânica",
    Refrigeração: "Técnico de Refrigeração",
    Soldadura: "Técnico de Soldadura",
    Contabilidade: "Contabilidade e Gestão",
    Administração: "Técnico de Administração",
    Secretariado: "Técnico de Secretariado",
    Química: "Técnico de Química",
    Enfermagem: "Técnico de Enfermagem",
    Farmácia: "Técnico de Farmácia",
    Telecomunicações: "Técnico de Telecomunicações",
    Electrónica: "Técnico de Electronica",
    "Redes e Sistemas": "Técnico de Redes e Sistemas",
    Programação: "Técnico de Programação",
    "Design Gráfico": "Técnico de Design Gráfico",
    Multimédia: "Técnico de Multimédia",
    Medicina: "Medicina",
    Engenharia: "Engenharia",
    Direito: "Direito",
    Economia: "Técnico de Economia",
    Arquitectura: "Arquitectura",
    Ciências: "Ciências",
    Letras: "Letras",
    Psicologia: "Psicologia",
    "Engenharia Informática": "Engenharia Informática",
    Gestão: "Gestão Empresarial",
    Marketing: "Marketing",
    Design: "Design",
    Educação: "Educação",
    Saúde: "Saúde",
    "Comunicação Social": "Comunicação Social",
  };

  // Determinar se é curso técnico ou superior baseado no nome
  const isTechnical =
    courseName.includes("Técnico") ||
    [
      "Contabilidade",
      "Administração",
      "Secretariado",
      "Química",
      "Enfermagem",
      "Farmácia",
      "Telecomunicações",
      "Electrónica",
      "Redes e Sistemas",
      "Programação",
      "Design Gráfico",
      "Multimédia",
    ].includes(courseName);

  const duration = isTechnical ? "3 anos" : "4-5 anos";
  const department = isTechnical ? "Instituto Politécnico" : "Universidade";
  const students = Math.floor(Math.random() * 300) + 100; // Número aleatório entre 100-400

  const curriculum: Curriculum = {
    "1º ano": {
      "1º Semestre": [
        { subject: `Fundamentos de ${courseName}`, hours: 60 },
        { subject: "Matemática Aplicada", hours: 45 },
        { subject: "Comunicação em Português", hours: 30 },
        { subject: "Inglês Técnico", hours: 30 },
        { subject: `Introdução à ${courseName}`, hours: 45 },
      ],
      "2º Semestre": [
        { subject: `${courseName} I`, hours: 60 },
        { subject: "Física Aplicada", hours: 45 },
        { subject: "Metodologia de Investigação", hours: 30 },
        { subject: "Informática", hours: 40 },
        { subject: `Laboratório de ${courseName}`, hours: 50 },
      ],
    },
    "2º ano": {
      "1º Semestre": [
        { subject: `${courseName} II`, hours: 60 },
        { subject: "Gestão e Organização", hours: 45 },
        { subject: `Tecnologias de ${courseName}`, hours: 50 },
      ],
      "2º Semestre": [
        { subject: `${courseName} Avançada`, hours: 60 },
        { subject: "projecto I", hours: 45 },
        { subject: "Estágio I", hours: 100 },
      ],
    },
  };

  // Adicionar 3º ano apenas para cursos superiores
  if (!isTechnical) {
    curriculum["3º ano"] = {
      "1º Semestre": [
        { subject: `${courseName} Especializada`, hours: 60 },
        { subject: "projecto II", hours: 80 },
      ],
      "2º Semestre": [
        { subject: "projecto Final", hours: 120 },
        { subject: "Estágio Profissional", hours: 200 },
      ],
    };
  }

  return {
    name: courseDisplayNames[courseName] || courseName,
    relation: `${department}`,
    duration: duration,
    students: `${students} estudantes - 2024`,
    image: `${bgHero.src}`,
    curriculum,
    requirements: [
      "BI frente e verso (escaneado)",
      "Fotografia tipo passe (escaneada)",
      isTechnical
        ? "Declaração do ensino secundário com notas discriminadas"
        : "Certificado do ensino médio",
      "Atestado médico válido",
      "Cartão de vacina",
    ],
  };
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  }
  html, body {
    margin: 0;
    padding: 0;
  }
`;

const Container = styled.div`
  width: 100vw;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100vh;
`;

const Header = styled.div`
  position: relative;
  height: 300px;
  overflow: hidden;
`;

const HeaderImage = styled.div<{ $imageUrl?: string }>`
  width: 100%;
  height: 100%;
  background: ${({ $imageUrl }) =>
    $imageUrl
      ? `url(${$imageUrl}) center/cover no-repeat`
      : `linear-gradient(135deg, rgba(124, 116, 175, 0.8), rgba(164, 149, 211, 0.8))`};
  background-color: #e9ecef;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  font-size: 18px;

  &:hover {
    background: white;
  }
`;

const InfoCard = styled.div`
  background: ${(props) => props.theme.colors.background};
  margin: -60px 20px 20px;
  border-radius: 20px;
  padding: 30px 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 5;
`;

const InfoHeader = styled.div`
  margin-bottom: 20px;
`;

const InfoLabel = styled.p`
  color: ${(props) => props.theme.colors.foreground};
  font-size: 14px;
  margin: 0 0 5px 0;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
`;

const CourseName = styled.h1`
  font-size: 22px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: ${(props) => props.theme.colors.textBlack};
  margin: 0 0 8px 0;
`;

const CourseRelation = styled.p`
  color: ${(props) => props.theme.colors.foreground};
  font-size: 14px;
  margin: 0 0 10px 0;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
`;

const InfoStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${(props) => props.theme.colors.primary};
  font-size: 14px;
`;

const StatIcon = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #e9ecef;
`;

const YearTabs = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0 20px 0;
  overflow-x: auto;
  padding-bottom: 5px;
`;

const YearTab = styled.button<{ $active: boolean }>`
  background: ${(props) => (props.$active ? "#7c74af" : "transparent")};
  color: ${(props) => (props.$active ? "white" : "#6c757d")};
  border: ${(props) => (props.$active ? "none" : "1px solid #dee2e6")};
  border-radius: 25px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => (props.$active ? "#7c74af" : "#f8f9fa")};
  }
`;

const SemesterSection = styled.div`
  margin-bottom: 30px;
`;

const SemesterTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.textBlack};
  margin: 0 0 15px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HoursLabel = styled.span`
  font-size: 14px;
  color: #6c757d;
  font-weight: 500;
`;

const SubjectsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SubjectItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
`;

const SubjectName = styled.span`
  color: #495057;
  font-size: 13px;
`;

const SubjectHours = styled.span`
  color: #6c757d;
  font-size: 14px;
  font-weight: 500;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 30px 0;
`;

const EnrollButton = styled.button`
  background: linear-gradient(135deg, #7c74af, #a495d3);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(124, 116, 175, 0.4);
  }
`;

const RequirementsButton = styled.button`
  background: transparent;
  color: #7c74af;
  border: 2px solid #7c74af;
  border-radius: 50px;
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #7c74af;
    color: white;
  }
`;

const CourseDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const [activeYear, setActiveYear] =
    React.useState<keyof Curriculum>("1º ano");
  const [showRequirements, setShowRequirements] = React.useState(false);

  const courseSlug = params.id as string;
  const courseName = slugToCourseMapping[courseSlug];

  if (!courseName) {
    return (
      <Container>
        <div style={{ padding: "40px 20px", textAlign: "center" }}>
          <h2>Curso não encontrado</h2>
          <button onClick={() => router.back()}>Voltar</button>
        </div>
      </Container>
    );
  }

  const courseData = generateCourseData(courseName);

  const handleBack = () => {
    router.back();
  };

  const handleEnroll = () => {
    // Implementar lógica de matrícula
    alert(`Redirecionando para matrícula do curso: ${courseData.name}`);
  };

  const handleShowRequirements = () => {
    setShowRequirements(!showRequirements);
  };

  const availableYears = Object.keys(courseData.curriculum) as Array<
    keyof Curriculum
  >;

  // Get current year curriculum safely
  const currentYearCurriculum = courseData.curriculum[activeYear];

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <HeaderImage $imageUrl={courseData.image}>
            <BackButton onClick={handleBack}>←</BackButton>
          </HeaderImage>
        </Header>

        <InfoCard>
          <InfoHeader>
            <InfoLabel>Informações</InfoLabel>
            <CourseName>{courseData.name}</CourseName>
            <CourseRelation>Rel: {courseData.relation}</CourseRelation>

            <InfoStats>
              <StatItem>
                {/* <StatIcon /> */}
                Duração: {courseData.duration}
              </StatItem>
              <StatItem>
                <span>{courseData.students}</span>
              </StatItem>
            </InfoStats>
          </InfoHeader>

          <YearTabs>
            {availableYears.map((year) => (
              <YearTab
                key={year}
                $active={activeYear === year}
                onClick={() => setActiveYear(year)}
              >
                {year}
              </YearTab>
            ))}
          </YearTabs>

          {currentYearCurriculum && (
            <div>
              {Object.entries(currentYearCurriculum).map(
                ([semester, subjects]) => (
                  <SemesterSection key={semester}>
                    <SemesterTitle>
                      {semester}
                      <HoursLabel>Carga horária</HoursLabel>
                    </SemesterTitle>
                    <SubjectsList>
                      {subjects.map((subject: Subject, index: number) => (
                        <SubjectItem key={index}>
                          <SubjectName>{subject.subject}</SubjectName>
                          <SubjectHours>{subject.hours}</SubjectHours>
                        </SubjectItem>
                      ))}
                    </SubjectsList>
                  </SemesterSection>
                )
              )}
            </div>
          )}

          {showRequirements && (
            <div
              style={{
                marginTop: "20px",
                padding: "20px",
                background: "#f8f9fa",
                borderRadius: "12px",
              }}
            >
              <h4 style={{ marginBottom: "15px", color: "#2c3e50" }}>
                Requisitos para inscrição:
              </h4>
              <ul style={{ paddingLeft: "20px", color: "#495057" }}>
                {courseData.requirements.map((req, index) => (
                  <li key={index} style={{ marginBottom: "8px" }}>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <ActionButtons>
            <Button
              bgColor="background"
              textColor="#6C5F8D"
              text="Ver requisitos"
              hasBorder={true}
              onClick={handleShowRequirements}
            >
              {showRequirements ? "Ocultar requisitos" : "Ver requisitos"}
            </Button>
            <Button
              bgColor="primary"
              textColor="#FFFFFF"
              text="Fazer matrícula"
              href="/registo"
              hasBorder={false}
            ></Button>
            {/* <RequirementsButton onClick={handleShowRequirements}>
              {showRequirements ? "Ocultar requisitos" : "Ver requisitos"}
            </RequirementsButton> */}
          </ActionButtons>
        </InfoCard>
      </Container>
    </>
  );
};

export default CourseDetailPage;

'use client';

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styled from "styled-components";
import PageContainer from "@/components/Losangos";
import Header from "@/components/ui/HeaderWelcome";

// Importar tipos e utils
import { Institution, InstituicaoData } from "@/types/institutions";
import { isDarkColor } from "@/utils/colors";

// Dados mockados com cores definidas
const instituicoesData: Record<string, InstituicaoData> = {
  "ensino-medio": {
    title: "Instituições de Ensino Médio",
    totalCount: 980,
    institutions: [
      {
        id: "1",
        name: "IMIL",
        fullName: "Instituto Médio Industrial de Luanda (Makarenko)",
        courses: 8,
        location: "Luanda",
        logo: "/assets/logos/imil.png",
        color: "#E74C3C", // Vermelho
        description: "Instituto focado em formação industrial",
      },
      {
        id: "2",
        name: "IMPAL",
        fullName: "Instituto Médio Politécnico Alda Lara",
        courses: 10,
        location: "Luanda",
        logo: "/assets/logos/impal.png",
        color: "#3498DB", // Azul
        description: "Instituto politécnico de referência",
      },
      {
        id: "3",
        name: "IMPTEL",
        fullName: "Instituto Médio Politécnico de Tecnologias de Luanda",
        courses: 7,
        location: "Luanda",
        logo: "/assets/logos/imptel.png",
        color: "#E67E22", // Laranja
        description: "Especializado em tecnologias",
      },
      {
        id: "4",
        name: "ITEL",
        fullName: "Instituto de Telecomunicações",
        courses: 7,
        location: "Luanda",
        logo: "/assets/logos/itel.png",
        color: "#2ECC71", // Verde
        description: "Instituto de telecomunicações",
      },
      {
        id: "5",
        name: "IMEL",
        fullName: "Instituto Médio de Economia de Luanda",
        courses: 7,
        location: "Luanda",
        logo: "/assets/logos/imel.png",
        color: "#9B59B6", // Roxo
        description: "Formação em economia e gestão",
      },
    ],
  },
  "ensino-superior": {
    title: "Instituições de Ensino Superior",
    totalCount: 230,
    institutions: [
      {
        id: "1",
        name: "UAN",
        fullName: "Universidade Agostinho Neto",
        courses: 45,
        location: "Luanda",
        logo: "/assets/logos/uan.png",
        color: "#1ABC9C", // Turquesa
        description: "Principal universidade pública de Angola",
      },
      {
        id: "2",
        name: "ISCTE",
        fullName: "Instituto Universitário de Lisboa - Angola",
        courses: 12,
        location: "Luanda",
        logo: "/assets/logos/iscte.png",
        color: "#34495E", // Azul escuro
        description: "Campus internacional do ISCTE",
      },
      {
        id: "3",
        name: "UCM",
        fullName: "Universidade Católica de Moçambique",
        courses: 18,
        location: "Luanda",
        logo: "/assets/logos/ucm.png",
        color: "#F39C12", // Dourado
        description: "Universidade católica de referência",
      },
    ],
  },
};

// Styled Components
const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  z-index: 99999999;
`;

const Content = styled.div`
  flex: 1;
  padding: 0 20px 20px 20px;
  display: flex;
  flex-direction: column;
`;

const SearchContainer = styled.div`
  width: 90vw;
  position: relative;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 85%;
  padding: 15px 0px 15px 50px;
  background: #e8e8e8;
  border: none;
  border-radius: 25px;
  font-size: 16px; /* ↑ evita o zoom automático no iOS */
  color: #666;
  font-weight: ${(props) => props.theme.fonts.weight.light};
  outline: none; /* remove a borda azul ao focar */

  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: none;   /* garante que não apareça */
    box-shadow: none; /* remove qualquer sombra que alguns browsers aplicam */
  }
`;


const SearchIcon = styled.div`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 18px;
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const FilterText = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 16px;
  text-decoration: underline;
  cursor: pointer;
`;

const ResultsCount = styled.div`
  color: #333;
  font-weight: 600;
  font-size: 16px;
`;

const InstitutionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex: 1;
`;

const InstitutionCard = styled.div`
  background: ${(props) => props.theme.colors.background};
  border-radius: 25px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

const LogoContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
`;

const LogoPlaceholder = styled.div<{ $color: string }>`
  width: 100%;
  height: 100%;
  background: ${(props) => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (isDarkColor(props.$color) ? "white" : "#333")};
  font-weight: bold;
  font-size: 18px;
`;

const InstitutionInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const InstitutionName = styled.h3`
  font-size: 0.85rem;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  color: ${(props) => props.theme.colors.textBlack};
  margin: 0;
  line-height: 1.2;
`;

const InstitutionDetails = styled.p`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.primary};
  margin: 0;
  line-height: 1.3;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid ${(props) => props.theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #666;
`;

export default function InstituicoesPage() {
  const params = useParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const tipo = params.tipo as string;
  const data = instituicoesData[tipo];

  // Simular carregamento durante a pesquisa/filtragem
  useEffect(() => {
    if (searchTerm) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800); // Simular tempo de busca
      
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [searchTerm]);

  // Filtrar instituições baseado na pesquisa
  const filteredInstitutions =
    data?.institutions.filter(
      (institution) =>
        institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        institution.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        institution.location.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleInstitutionClick = (institution: Institution) => {
    // Navegar para detalhes da instituição (sem spinner aqui)
    console.log("Navegando para:", institution.name);
    router.push(`/instituicoes/${tipo}/${institution.id}`);
  };

  const handleFilterClick = () => {
    console.log("Abrir filtros");
    // Implementar modal de filtros
  };

  const handleBackClick = () => {
    // Navegar para a página explore
    router.push("/explore");
  };

  if (!data) {
    return (
      <PageContainer>
        <Header
          variant="text"
          title="Instituições de Ensino"
          onBackClick={handleBackClick}
        />
        <Container>
          <ErrorMessage>
            <h2>Tipo de instituição não encontrado</h2>
            <p>O tipo &quot;{tipo}&quot; não é válido.</p>
          </ErrorMessage>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header
        variant="text"
        title={data.title}
        onBackClick={handleBackClick}
      />
      <Container>
        <Content>
          <SearchContainer>
            <SearchIcon>🔍</SearchIcon>
            <SearchInput
              type="text"
              placeholder="Pesquisar por curso"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>

          <FilterSection>
            <FilterText onClick={handleFilterClick}>Ordenar por:</FilterText>
            <ResultsCount>
              {isLoading ? "..." : `${filteredInstitutions.length} resultado${filteredInstitutions.length !== 1 ? "s" : ""}`}
            </ResultsCount>
          </FilterSection>

          {isLoading ? (
            <LoadingSpinner>
              <Spinner />
            </LoadingSpinner>
          ) : (
            <InstitutionsList>
              {filteredInstitutions.map((institution) => (
                <InstitutionCard
                  key={institution.id}
                  onClick={() => handleInstitutionClick(institution)}
                >
                  <LogoContainer>
                    <LogoPlaceholder $color={institution.color}>
                      {institution.name.substring(0, 2)}
                    </LogoPlaceholder>
                  </LogoContainer>

                  <InstitutionInfo>
                    <InstitutionName>
                      {institution.name} - {institution.fullName}
                    </InstitutionName>
                    <InstitutionDetails>
                      {institution.courses} cursos - {institution.location}
                    </InstitutionDetails>
                  </InstitutionInfo>
                </InstitutionCard>
              ))}

              {filteredInstitutions.length === 0 && searchTerm && !isLoading && (
                <ErrorMessage>
                  <h3>Nenhum resultado encontrado</h3>
                  <p>Tente pesquisar com termos diferentes</p>
                </ErrorMessage>
              )}
            </InstitutionsList>
          )}
        </Content>
      </Container>
    </PageContainer>
  );
}
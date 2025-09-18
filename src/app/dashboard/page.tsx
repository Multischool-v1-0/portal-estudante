"use client";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Header from "@/components/ui/HeaderGeneral";
import { CreditCard, StudentCard } from "@/components/ui/Cards";
import MenuGrid, { MenuSection } from "@/components/ui/menuGrid";
import RecentSection, { CardType } from "@/components/ui/RecentSection";
import { SimpleCard } from "@/components/ActivityCard";
import BottomMenu from "@/components/ui/BottomMenu";
import { ActivityCard } from "@/components/ActivityCard";
import { useRouter } from "next/navigation";
import { mockStudentCardData } from "@/mocks/studentCard";

// Tipos principais usados nas actividades
interface Activity {
  id: string;
  title: string;
  institution: string;
  status: "pendente" | "em_curso" | "concluido" | "vencida" | "publicada";
  date: string;
  icon?: string;
  description?: string;
}

interface ExameAcessoData {
  activities: Activity[];
}

// ---- Styled Components ----
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${(props) => props.theme.colors.background};
  font-family: ${(props) => props.theme.fonts.family.poppins};
  overflow-x: hidden;
`;

const Content = styled.div`
  padding: 20px;
  padding-bottom: 100px; // espaço para o BottomMenu
`;

const CardSlideContainer = styled.div`
  width: 100%;
  overflow: hidden; // esconde o overflow mas ainda mostra parte do próximo cartão
  position: relative;
  touch-action: pan-y;
  margin-bottom: 20px;
  padding: 0 15px; // padding lateral alinhado com layout
`;

const CardSlideWrapper = styled.div`
  display: flex;
  align-items: stretch;
  height: 100%;
  will-change: transform; // optimização para animação
`;

const CardSlideItem = styled.div`
  flex: 0 0 auto;
  box-sizing: border-box;
  border-radius: 12px;
  overflow: visible;
`;

const ActivitiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 23vh;
  overflow: auto;
`;

const ActivityCardWrapper = styled.div`
  width: 100%;
`;

export default function Home() {
  const [activeSection, setActiveSection] = useState<MenuSection>("recentes");
  const [currentCardSlide, setCurrentCardSlide] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  
  // variáveis de controlo do drag
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartTranslateRef = useRef(0);
  const translateRef = useRef(0);
  
  // ---- Configurações ajustáveis ----
  const totalCards = 2; // mudar caso aumente número de cartões
  const ITEM_PERCENT = 0.87; // % de largura ocupada por cada cartão (ajusta para mostrar parte do próximo)
  const GAP = 16; // espaço entre cartões em px
  const SIDE_PADDING = 15; // deve coincidir com padding do Container
  
  const router = useRouter();
  
  // Determina o tipo de cartão ativo
  const activeCardType: CardType = currentCardSlide === 0 ? "credit" : "student";
  
  // ---- Dados mock para testes ----
  // Dados para cartão de crédito
  const creditActivitiesData: ExameAcessoData = {
    activities: [
      {
        id: "1",
        title: "Propina de Julho",
        institution: "SECAD",
        status: "pendente",
        date: "-65.203 kz",
        icon: "exam",
      },
      {
        id: "2",
        title: "Propina de Agosto",
        institution: "ISPTEC",
        status: "em_curso",
        date: "-87.000 kz",
        icon: "course",
      },
    ],
  };
  
  // Dados para cards para a secção do cartão de estudante
  const studentActivitiesData: ExameAcessoData = {
    activities: [
      {
        id: "3",
        title: "Nota 1PP - Gestão de...",
        institution: "10 min",
        status: "publicada",
        date: "16/20",
        icon: "grade",
      },
      {
        id: "4",
        title: "Exame Programação III",
        institution: "15 jul",
        status: "pendente",
        date: "08:30",
        icon: "exam",
      },
    ],
  };
  
  const propinasData = [
    { id: "1", title: "Propina de julho", status: "em_atraso" as const, amount: "62.090 kz" },
    { id: "2", title: "Propina de junho", status: "pagamento_adiado" as const, amount: "54.000 kz" },
    { id: "3", title: "Propina de maio", status: "pendente" as const, amount: "54.000 kz" },
    { id: "4", title: "Propina de abril", status: "pendente" as const, amount: "54.000 kz" },
    { id: "5", title: "Propina de março", status: "pendente" as const, amount: "54.000 kz" },
  ];
  
  // Seleciona os dados de atividade baseado no cartão activo
  const currentActivitiesData = activeCardType === "credit" ? creditActivitiesData : studentActivitiesData;

  // ---- Ajusta largura dos cartões dinamicamente e aplica transição ----
  useEffect(() => {
    const compute = () => {
      const c = containerRef.current;
      if (!c) return;
      const containerWidth = c.clientWidth;
      const computedItemWidth = Math.round(containerWidth * ITEM_PERCENT);
      setItemWidth(computedItemWidth);
      const x = -currentCardSlide * (computedItemWidth + GAP);
      translateRef.current = x;
      if (wrapperRef.current && !isDraggingRef.current) {
        wrapperRef.current.style.transition = "transform 0.32s ease-out";
        wrapperRef.current.style.transform = `translateX(${x}px)`;
        // timeout remove transição para não "quebrar"o drag seguinte
        window.setTimeout(() => {
          if (wrapperRef.current) wrapperRef.current.style.transition = "";
        }, 320);
      }
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [currentCardSlide]);

  // ---- Eventos de drag horizontal ----
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button && e.button !== 0) return; // só botão esquerdo
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartTranslateRef.current = translateRef.current;
    if (wrapperRef.current) wrapperRef.current.style.transition = "none";
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const delta = e.clientX - dragStartXRef.current;
    const newTranslate = dragStartTranslateRef.current + delta;
    const maxTranslate = 0;
    const minTranslate = -((totalCards - 1) * (itemWidth + GAP));
    // aplica "resistência" quando ultrapassa limites
    let applied = newTranslate;
    if (newTranslate > maxTranslate) applied = maxTranslate + (newTranslate - maxTranslate) * 0.28;
    if (newTranslate < minTranslate) applied = minTranslate + (newTranslate - minTranslate) * 0.28;
    translateRef.current = applied;
    if (wrapperRef.current) wrapperRef.current.style.transform = `translateX(${applied}px)`;
  };

  // ---- Finaliza drag e faz snap para cartão mais próximo ----
  const endDragAndSnap = (pointerId?: number, releaseTarget?: Element | null) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const itemPlusGap = itemWidth + GAP;
    if (itemPlusGap === 0) return;
    const rawIndex = Math.round(-translateRef.current / itemPlusGap);
    const clampedIndex = Math.max(0, Math.min(rawIndex, totalCards - 1));
    setCurrentCardSlide(clampedIndex);
    const finalX = -clampedIndex * itemPlusGap;
    translateRef.current = finalX;
    if (wrapperRef.current) {
      wrapperRef.current.style.transition = "transform 0.32s ease-out";
      wrapperRef.current.style.transform = `translateX(${finalX}px)`;
      window.setTimeout(() => {
        if (wrapperRef.current) wrapperRef.current.style.transition = "";
      }, 320);
    }
    try {
      if (releaseTarget && pointerId !== undefined) {
        (releaseTarget as Element).releasePointerCapture(pointerId);
      }
    } catch {}
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    endDragAndSnap(e.pointerId, e.currentTarget);
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    endDragAndSnap(e.pointerId, e.currentTarget);
  };

  // ---- Navegação directa para um cartão específico ----
  const goToCardSlide = (index: number) => {
    const clamped = Math.max(0, Math.min(index, totalCards - 1));
    setCurrentCardSlide(clamped);
    const x = -clamped * (itemWidth + GAP);
    translateRef.current = x;
    if (wrapperRef.current) {
      wrapperRef.current.style.transition = "transform 0.32s ease-out";
      wrapperRef.current.style.transform = `translateX(${x}px)`;
      window.setTimeout(() => {
        if (wrapperRef.current) wrapperRef.current.style.transition = "";
      }, 320);
    }
  };

  // ---- Handlers de clique ----
  const handlePropinasClick = (propina: any) => {
    console.log("Propina clicked:", propina);
  };

  const handleActivityClick = (activity: Activity) => {
    console.log("Activity clicked:", activity);
    switch (activity.title) {
      case "Exame de Acesso":
        router.push(`/candidato/atividade/exame/${activity.id}`);
        break;
      case "Curso Preparatório":
        router.push(`/candidato/atividade/curso/${activity.id}`);
        break;
      default:
        router.push(`/candidato/atividade/${activity.id}`);
    }
  };

  const handleSectionChange = (section: MenuSection) => {
    // Para cartão de estudante, redirecionar para páginas específicas
    if (activeCardType === "student") {
      if (section === "propinas") {
        router.push("/movimentos");
        return;
      }
      if (section === "consulta") {
        router.push("/documentos");
        return;
      }
    }
    
    setActiveSection(section);
  };

  // ---- Render ----
  return (
    <Container>
      <Header />
      <Content>
        {/* Carrossel de cartões */}
        <CardSlideContainer
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
        >
          <CardSlideWrapper ref={wrapperRef} style={{ gap: `${GAP}px` }}>
            <CardSlideItem style={{ width: itemWidth ? `${itemWidth}px` : "78%" }}>
              <CreditCard />
            </CardSlideItem>
            <CardSlideItem style={{ width: itemWidth ? `${itemWidth}px` : "78%" }}>
              <StudentCard studentData={mockStudentCardData} />
            </CardSlideItem>
          </CardSlideWrapper>
        </CardSlideContainer>

        {/* Secção de actividades */}
        {activeSection !== "propinas" && (
          <ActivitiesContainer>
            {currentActivitiesData.activities.map((activity) => (
              <ActivityCardWrapper key={activity.id}>
                <ActivityCard
                  title={activity.title}
                  institution={activity.institution}
                  status={activity.status}
                  date={activity.date}
                  onClick={() => handleActivityClick(activity)}
                />
              </ActivityCardWrapper>
            ))}
          </ActivitiesContainer>
        )}

        {/* Menu principal */}
        <MenuGrid 
          activeSection={activeSection} 
          onSectionChange={handleSectionChange} 
          activeCard={activeCardType}
        />

        {/* Renderiza secções condicionais */}
        {activeSection === "recentes" || activeSection === "pendencias" ? (
          <RecentSection 
            variant={activeSection === "pendencias" ? "pendencias" : "recentes"} 
            activeCard={activeCardType}
          />
        ) : activeSection === "propinas" ? (
          <div>
            {propinasData.map((propina) => (
              <div key={propina.id} style={{ marginBottom: "12px" }}>
                <SimpleCard
                  title={propina.title}
                  status={propina.status}
                  amount={propina.amount}
                  onClick={() => handlePropinasClick(propina)}
                />
              </div>
            ))}
          </div>
        ) : null}
      </Content>
      <BottomMenu />
    </Container>
  );
}
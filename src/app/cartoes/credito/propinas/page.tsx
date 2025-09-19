"use client";

import styled from "styled-components";
import { useState } from "react";
import BottomMenu from "@/components/ui/BottomMenu";
import Header from "@/components/ui/HeaderGeneral";
import { mockInstitutions } from "@/mocks/institutions";
import UserAvatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { SimpleCard } from "@/components/ActivityCard";
import { AlertModal } from "@/components/AlertModal";
import Bg from "@/assets/backgrounds/candidato/bg_6.jpeg";

// Styled Components
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const Top = styled.div`
  width: 100%;
`;

const Info = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  gap: 12px; // controla espaço entre avatar e textos
  margin: 10px 0; // reduz separação vertical
`;

const Avatar = styled.div`
  flex-shrink: 0; // evita o avatar esticar
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Texts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Text1 = styled.p`
  font-size: 14px;
  line-height: 1.2;
  margin: 0;
`;

const Text2 = styled.p`
  font-size: 11px;
  line-height: 1.2;
  margin: 5px 0 0 0;
  color: ${(props) => props.theme.colors.foreground};
`;

const ButtonGroup = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
`;

const Pendentes = styled.div`
  width: 90%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin: 40px 0 130px 0;
  overflow-y: scroll;
`;

export default function Propinas() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePage = () => {
    setIsModalOpen(true);
  };

  // Handle modal confirm action
  const handleConfirm = () => {
    router.push(`propinas/adiantamento`);
    setIsModalOpen(false); 
  };

  // Handle modal cancel or close action
  const handleClose = () => {
    setIsModalOpen(false);
  };
  const propinasData = [
    {
      id: "1",
      title: "Propina de julho",
      status: "em_atraso" as const,
      amount: "62.090 kz",
    },
    {
      id: "2",
      title: "Propina de junho",
      status: "pagamento_adiado" as const,
      amount: "54.000 kz",
    },
    {
      id: "3",
      title: "Propina de maio",
      status: "pendente" as const,
      amount: "54.000 kz",
    },
    {
      id: "4",
      title: "Propina de abril",
      status: "pendente" as const,
      amount: "54.000 kz",
    },
    {
      id: "5",
      title: "Propina de março",
      status: "pendente" as const,
      amount: "54.000 kz",
    },
  ];

  const handlePropinasClick = (propina: (typeof propinasData)[number]) => {};

  // exemplo: pega a primeira instituição
  const institution = mockInstitutions[0];

  return (
    <Container>
      <Top>
        <Header variant="withBack" title="Propinas" />
      </Top>

      <Info>
        <Avatar>
          <UserAvatar size={65} name={institution?.name} />
        </Avatar>
        <Texts>
          <Text1>{institution.fullName}</Text1>
          <Text2>{institution.location}</Text2>
        </Texts>
      </Info>
      <ButtonGroup>
        <Button
          bgColor="background"
          textColor="#6C5F8D"
          text="Solicitação de adiantamento"
          hasBorder={true}
          onClick={handlePage}
        />
      </ButtonGroup>

      <Pendentes>
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
      </Pendentes>
      <BottomMenu />
      <AlertModal
        isOpen={isModalOpen}
        title="Não consegue pagar agora?"
        message="Solicite o adiantamento da propina deste mês e mantenha o acesso às aulas."
        imageUrl={Bg.src} // Replace with the actual image path
        confirmText="Solicitar adiantamento"
        confirmButtonProps={{
          bgColor: "primary",
          textColor: "#FFFFFF",
          hasBorder: false,
        }}
        variant="image"
        cancelText="Cancelar"
        showCancelButton={true}
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
    </Container>
  );
}

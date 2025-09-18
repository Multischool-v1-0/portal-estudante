"use client";

import styled from "styled-components";
import BottomMenu from "@/components/ui/BottomMenu";
import Header from "@/components/ui/HeaderGeneral";
import { mockInstitutions } from "@/mocks/institutions";
import UserAvatar from "@/components/ui/Avatar";

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

export default function Pagamentos() {
  // exemplo: pega a primeira instituição
  const institution = mockInstitutions[0];

  return (
    <Container>
      <Top>
        <Header variant="withBack" title="Instituição" />
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
    </Container>
  );
}

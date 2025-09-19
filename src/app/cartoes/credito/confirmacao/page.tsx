"use client";

import styled from "styled-components";
import BottomMenu from "@/components/ui/BottomMenu";
import Header from "@/components/ui/HeaderGeneral";
import BackgroundVectors from "@/components/Bg_vectors";
import Image from "next/image";
import { mockStudents } from "@/mocks/student";

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

const Photo = styled.div`
  width: 150px;
  height: 190px;
  background: #000;
  position: relative;
  border-radius: 120px;
  margin: 20px 0 0 0
`;

export default function Instituicao() {
  const student = mockStudents.find((s) => s.id === "stu-1");
  return (
    <BackgroundVectors>
      <Container>
        <Top>
          <Header variant="withBack" title="Confirmação" />
        </Top>
        <Photo>
          {student?.profilePhoto && (
            <Image
              src={student.profilePhoto}
              alt={student.fullName}
              fill
              style={{ objectFit: "cover", borderRadius: "5px" }}
            />
          )}
        </Photo>
        <BottomMenu />
      </Container>
    </BackgroundVectors>
  );
}

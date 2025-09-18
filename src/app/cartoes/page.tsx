"use client";

import BottomMenu from "@/components/ui/BottomMenu";
import CreditCard, { StudentCard, TraineeCard } from "@/components/ui/Cards";
import Header from "@/components/ui/HeaderGeneral";
import { mockStudentCardData, mockTraineeCardData } from "@/mocks/studentCard";
import { useRouter } from "next/navigation";
import styled from "styled-components";

// Styled components
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header2 = styled.div`
  width: 100%;
`;

const Cards = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 120px;
`;
const Onclick = styled.div``;

export default function Cartões() {
  const router = useRouter();

  const handleClickCredit = () => {
    router.push(`cartoes/credito/`);
  };
  const handleClickStudent = () => {
    router.push(`cartoes/credito/`);
  };
  const handleClickTrainee = () => {
    router.push(`cartoes/credito/`);
  };

  return (
    <>
      <Container>
        <Header2>
          <Header variant="withBack" title="Os meus cartões" />
        </Header2>
        <Cards>
          <Onclick onClick={handleClickCredit}>
            <CreditCard />
          </Onclick>
          <Onclick onClick={handleClickStudent}>
            <StudentCard studentData={mockStudentCardData} />
          </Onclick>
          <Onclick onClick={handleClickTrainee}>
            <TraineeCard traineeData={mockTraineeCardData} />
          </Onclick>
        </Cards>
        <BottomMenu />
      </Container>
    </>
  );
}

import styled from 'styled-components';
import Button from './ui/Button';

interface AlertModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
}

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px 24px 24px;
  width: 100%;
  max-width: 340px;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: #f0f0f0;
    color: #666;
  }
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin: 0 0 16px 0;
  text-align: center;
  font-family: ${props => props.theme.fonts.family.poppins};
`;

const Message = styled.p`
  font-size: 16px;
  color: ${props => props.theme.colors.textBlack};
  margin: 0 0 24px 0;
  text-align: center;
  line-height: 1.4;
  font-family: ${props => props.theme.fonts.family.poppins};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ConfirmButton = styled.div`
  width: 100%;
`;

const CancelButton = styled.div`
  width: 100%;
`;

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
  onClose
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContainer>
        <CloseButton onClick={onClose}>
          ×
        </CloseButton>
        
        <Title>{title}</Title>
        <Message>{message}</Message>
        
        <ButtonContainer>
          <ConfirmButton>
            <Button
              bgColor="primary"
              textColor="background"
              text={confirmText}
              hasBorder={false}
              onClick={onConfirm}
            />
          </ConfirmButton>
          
          <CancelButton>
            <Button
              bgColor="background"
              textColor="primary"
              text={cancelText}
              hasBorder={true}
              onClick={onCancel}
            />
          </CancelButton>
        </ButtonContainer>
      </ModalContainer>
    </Overlay>
  );
};

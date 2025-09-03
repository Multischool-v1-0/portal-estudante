import styled from 'styled-components';

interface OptionCardProps {
  variant: 'primary' | 'secondary' | 'disabled';
  status: 'disponivel' | 'indisponivel';
  title: string;
  subtitle?: string;
  date?: string;
  onClick?: () => void;
  size?: 'normal' | 'large' | 'tall';
}

const CardContainer = styled.div<{ 
  variant: OptionCardProps['variant']; 
  disabled: boolean;
  size: OptionCardProps['size'];
}>`
  background: ${props => {
    if (props.variant === 'primary') return 'linear-gradient(135deg, #9B92C2, #9B92C2)';
    if (props.variant === 'secondary') return 'linear-gradient(135deg, #D9D9EC, #D9D9EC)';
    if (props.variant === 'disabled') return 'linear-gradient(135deg, #897BB0, #897BB0)';
    return '#ffffff';
  }};
  color: ${props => props.variant === 'secondary' ? '#374151' : '#ffffff'};
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  position: relative;
  display: flex;
  flex-direction: column;
  height: auto;
  
  &:hover {
    transform: ${props => props.disabled ? 'none' : 'translateY(-1px)'};
    box-shadow: ${props => props.disabled ? '0 2px 8px rgba(0, 0, 0, 0.1)' : '0 4px 12px rgba(0, 0, 0, 0.15)'};
  }
`;

const StatusBadge = styled.div<{ status: OptionCardProps['status'] }>`
  background-color: ${props => {
    if (props.status === 'disponivel') return '#d1fae5';
    if (props.status === 'indisponivel') return '#fecaca';
    return '#f3f4f6';
  }};
  color: ${props => {
    if (props.status === 'disponivel') return '#065f46';
    if (props.status === 'indisponivel') return '#991b1b';
    return '#374151';
  }};
  display: inline-block;   
  width: fit-content;      
  align-self: flex-start;  
  margin-bottom: 10px;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 11px;
  font-weight: 600;
  text-transform: capitalize;
`;

const CardTitle = styled.h3<{ 
  variant: OptionCardProps['variant']}>`
  font-size: ${props => {
    if (props.variant === 'primary') return '20px';
    if (props.variant === 'secondary' || 'disabled') return '14px';
    return '#f3f4f6';
  }};;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  margin: 0 0 4px 0;
  line-height: 1.2;
`;

const CardSubtitle = styled.p`
  font-size: 13px;
  margin: 2px 0 0 0;
  opacity: 0.8;
  line-height: 1.3;
  font-weight: 400;
`;

const CardDate = styled.p`
  font-size: 13px;
  margin: 8px 0 0 0;
  font-weight: 500;
`;

export const OptionCard: React.FC<OptionCardProps> = ({ 
  variant, 
  status, 
  title, 
  subtitle, 
  date, 
  onClick, 
  size = 'normal' 
}) => {
  const isDisabled = status === 'indisponivel';
  
  return (
    <CardContainer 
      variant={variant} 
      disabled={isDisabled} 
      size={size}
      onClick={!isDisabled ? onClick : undefined}
    >
      <StatusBadge status={status}>
        {status === 'disponivel' ? 'Disponível' : 'Indisponível'}
      </StatusBadge>
      
      <div>
        <CardTitle variant={variant} >{title}</CardTitle>
        {date && <CardDate>{date}</CardDate>}
        {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
      </div>
    </CardContainer>
  );
};
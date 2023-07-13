import styled, {CSSProperties, css} from 'styled-components';
import {Theme, PlusIcon} from 'client-library';

const {gray300, primary500, white} = Theme.palette;

const setColor = (disabled?: boolean) => (disabled ? gray300 : primary500);

export const PlusButtonWrapper = styled.div(({disabled}: {disabled?: boolean}) => {
  return css`
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border: 1px solid ${setColor(disabled)};
    cursor: ${disabled ? 'auto' : 'pointer'};
    background-color: ${white};
    align-self: flex-end;
  `;
});

interface PlusButtonProps {
  onClick: () => void;
  disabled?: boolean;
  style?: CSSProperties;
}

const PlusButton = ({onClick, disabled, style}: PlusButtonProps) => {
  return (
    <PlusButtonWrapper
      onClick={() => {
        if (!disabled) {
          onClick();
        }
      }}
      style={style}
      disabled={disabled}>
      <PlusIcon width="12px" height="12px" stroke={`${setColor(disabled)}`} />
    </PlusButtonWrapper>
  );
};

export default PlusButton;

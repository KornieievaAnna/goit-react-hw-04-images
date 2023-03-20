import {ButtonStyled} from './Button.styled';


export function Button({ loadMore }) {
  return (
    <ButtonStyled type="button" onClick={loadMore}>
      Load more
    </ButtonStyled>
  );
}
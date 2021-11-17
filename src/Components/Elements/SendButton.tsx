import { Button } from '@chakra-ui/button';
import { FC, MouseEventHandler, ReactNode } from 'react';

//Propsの型定義
type PropsType = {
  buttonState: boolean;
  buttonName: string;
  children?: ReactNode;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
};

const SendButton: FC<PropsType> = ({ buttonState, buttonName, children, handleClick }) => {
  return (
    <Button
      isLoading={buttonState}
      loadingText={`${buttonName}中です`}
      disabled={buttonState}
      backgroundColor={'blue.300'}
      color={'gray.100'}
      type="submit"
      _hover={{ backgroundColor: 'blue.500' }}
      _loading={{ backgroundColor: 'green.500' }}
      onClick={handleClick}
    >
      {children || buttonName}
    </Button>
  );
};

SendButton.displayName = 'SendButton';
export default SendButton;

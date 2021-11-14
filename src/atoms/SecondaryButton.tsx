import { Button } from '@chakra-ui/button';
import { FC, MouseEventHandler, ReactNode } from 'react';

//Propsの型定義
type PropsType = {
  buttonState: boolean;
  buttonName: string;
  type?: 'button' | 'submit' | 'reset';
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const SecondaryButton: FC<PropsType> = ({ buttonState, buttonName, type, children, onClick }) => {
  return (
    <Button
      disabled={buttonState}
      backgroundColor={'green.300'}
      color={'gray.100'}
      type={type}
      _hover={{ backgroundColor: 'green.500' }}
      _loading={{ backgroundColor: 'gray.500' }}
      onClick={onClick}
    >
      {children || buttonName}
    </Button>
  );
};

SecondaryButton.displayName = 'SecondaryButton';
export default SecondaryButton;

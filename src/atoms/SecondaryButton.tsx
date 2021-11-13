import { Button } from '@chakra-ui/button';
import { FC, ReactNode } from 'react';

//Propsの型定義
type PropsType = {
  buttonState: boolean;
  buttonName: string;
  type?: 'button' | 'submit' | 'reset';
  children?: ReactNode
};

const SecondaryButton: FC<PropsType> = ({ buttonState, buttonName, type,children }) => {
  return (
    <Button
      isLoading={buttonState}
      loadingText={`${buttonName}中です`}
      disabled={buttonState}
      backgroundColor={'green.300'}
      color={'gray.100'}
      type={type}
      _hover={{ backgroundColor: 'greeb.500' }}
      _loading={{ backgroundColor: 'gray.500' }}
    >
      {children || buttonName}
    </Button>
  );
};

SecondaryButton.displayName = 'SecondaryButton';
export default SecondaryButton;

import { Input } from '@chakra-ui/input';
import { FC, memo } from 'react';

//Propsの型定義
type PropType = {
  variant?: 'outline' | (string & {}) | 'filled' | 'flushed' | 'unstyled';
  placeholder?: string;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

const PrimaryInput: FC<PropType> = memo(({ variant, placeholder, state, setState }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setState(event.target.value);
  };
  return (
    <Input variant={variant} placeholder={placeholder} value={state} onChange={handleChange} />
  );
});

PrimaryInput.displayName = 'PrimaryInput';
export default PrimaryInput;

import { ChangeEventHandler, HTMLInputTypeAttribute, useState } from 'react';

import { Input, Button, InputRightElement, InputGroup } from '@chakra-ui/react';
import { FormInputValueTypes } from '../Modules/types/typeFormInterfase';

const FormInput = <T extends FormInputValueTypes>({
  inputName,
  inputType,
  inputPlaceholder,
  handleChange,
  inputValueState,
  index,
}: {
  inputName: string;
  inputType?: HTMLInputTypeAttribute;
  inputPlaceholder?: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  inputValueState: T;
  index: number;
}): JSX.Element => {
  const [isShow, setIsShow] = useState(false);
  const handleClick = () => setIsShow(!isShow);
  
  return (
    <InputGroup>
      {inputType === 'password' ? (
        // パスワードの時のみ表示
        <>
          <Input
            name={inputName}
            type={isShow ? 'text' : inputType}
            placeholder={inputPlaceholder}
            onChange={handleChange}
            value={inputValueState[`${inputName}`]}
            key={`${inputName}-${index}`}
            pr={'4.5rem'}
          />
          <InputRightElement w="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {isShow ? '隠す' : '表示'}
            </Button>
          </InputRightElement>
        </>
      ) : (
        // 通常表示
        <Input
          name={inputName}
          type={inputType}
          placeholder={inputPlaceholder}
          onChange={handleChange}
          value={inputValueState[`${inputName}`]}
          key={`${inputName}-${index}`}
          pr={'4.5rem'}
        />
      )}
    </InputGroup>
  );
};

FormInput.displayName = 'FormInput';
export default FormInput;

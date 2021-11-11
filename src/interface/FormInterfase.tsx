import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Stack,
  Heading,
  Box,
  Button,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react';

// User import
import { FormInterfasePropTypes, FormInputValueTypes } from './types/typeFormInterfase';

/**
 * # FormInterfase
 *
 * ## description
 * 汎用入力フォーム
 *
 * ## snippet
 * formInterfase : コンポーネント
 * formInterfase-inputParts : inputParts propのオブジェクト
 */
export const FormInterfase = <T extends FormInputValueTypes>({
  formTitle,
  inputParts,
  inputValueState,
  handleSubmit,
  handleChange,
  buttonState,
  buttonName,
}: FormInterfasePropTypes<T>): JSX.Element => {
  const [isShow, setIsShow] = useState(false);
  return (
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={4} px={6}>
      <Box align={'flex-start'}>
        <Heading fontSize="3xl">{formTitle}</Heading>
      </Box>
      <Stack spacing={16} as="form" onSubmit={handleSubmit}>
        <Stack spacing={4}>
          {inputParts.map(
            ({ labelName, nowSetting, inputName, inputType, inputPlaceholder }, index) => {
              return (
                <FormControl>
                  <FormLabel>{labelName}</FormLabel>
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
                          <Button h="1.75rem" size="sm" onClick={() => setIsShow(!isShow)}>
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
                  {typeof nowSetting !== 'undefined' && (
                    <FormHelperText>現在の設定: {nowSetting}</FormHelperText>
                  )}
                </FormControl>
              );
            }
          )}
        </Stack>
        <Button
          disabled={buttonState}
          backgroundColor={'blue.300'}
          color={'gray.100'}
          type="submit"
        >
          {buttonName}
        </Button>
      </Stack>
      {/* </form> */}
    </Stack>
  );
};

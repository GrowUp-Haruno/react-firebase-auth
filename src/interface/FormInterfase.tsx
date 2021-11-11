// User import
import { FormInterfasePropTypes, FormInputValueTypes } from './types/typeFormInterfase';

import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Stack,
  Heading,
  Box,
  Button,
} from '@chakra-ui/react';

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
  return (
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={4} px={6}>
      <Box align={'flex-start'}>
        <Heading fontSize="3xl">{formTitle}</Heading>
      </Box>
      <form onSubmit={handleSubmit}>
        <Stack spacing={12}>
          <Stack spacing={4}>
            {inputParts.map(
              ({ labelName, nowSetting, inputName, inputType, inputPlaceholder }, index) => {
                return (
                  <FormControl>
                    <FormLabel>{labelName}</FormLabel>
                    <Input
                      name={inputName}
                      type={inputType}
                      placeholder={inputPlaceholder}
                      onChange={handleChange}
                      value={inputValueState[`${inputName}`]}
                      key={`${inputName}-${index}`}
                    />
                    {typeof nowSetting !== 'undefined' && (
                      <FormHelperText>現在の設定: {nowSetting}</FormHelperText>
                    )}
                  </FormControl>
                );
              }
            )}
          </Stack>
          <Button disabled={buttonState} backgroundColor={'blue.300'} color={'gray.100'} type="submit">
            {buttonName}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

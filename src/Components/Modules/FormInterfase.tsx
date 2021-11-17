// import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Stack,
  Heading,
  Box,
} from '@chakra-ui/react';

// User import
import { FormInterfasePropTypes, FormInputValueTypes } from './types/typeFormInterfase';
import FormInput from '../Elements/FormInput';
import SendButton from '../Elements/SendButton';

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
    <>
      {typeof formTitle !== 'undefined' && (
        <Box align={'flex-start'}>
          <Heading fontSize="3xl">{formTitle}</Heading>
        </Box>
      )}
      <Stack spacing={12} as="form" onSubmit={handleSubmit}>
        <Stack spacing={4}>
          {inputParts.map(
            ({ labelName, nowSetting, inputName, inputType, inputPlaceholder }, index) => {
              return (
                <FormControl>
                  <FormLabel>{labelName}</FormLabel>
                  <FormInput<T>
                    inputName={inputName}
                    handleChange={handleChange}
                    inputType={inputType}
                    index={index}
                    inputPlaceholder={inputPlaceholder}
                    inputValueState={inputValueState}
                  />
                  {typeof nowSetting !== 'undefined' && (
                    <FormHelperText>現在の設定: {nowSetting}</FormHelperText>
                  )}
                </FormControl>
              );
            }
          )}
        </Stack>
        <SendButton buttonName={buttonName} buttonState={buttonState} />
      </Stack>
    </>
  );
};

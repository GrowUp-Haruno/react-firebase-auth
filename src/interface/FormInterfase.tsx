// User import
import { FormInterfasePropTypes, FormInputValueTypes } from './types/typeFormInterfase';

import { FormControl, FormLabel,Input, FormHelperText } from '@chakra-ui/react';

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
      {formTitle && <h1>{formTitle}</h1>}
      <form onSubmit={handleSubmit}>
        <div>
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
        </div>
        <div>
          <button disabled={buttonState}>{buttonName}</button>
        </div>
      </form>
    </>
  );
};

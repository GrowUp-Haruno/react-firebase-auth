// User import
import { memo } from 'react';
import { FormInterfasePropTypes, FormInputValueTypes } from './types/typeFormInterfase';

export const FormInterfase = memo(
  <T extends FormInputValueTypes>({
    formTitle,
    inputParts,
    inputValueState,
    handleSubmit,
    handleChange,
    buttonDesable,
    buttonName,
  }: FormInterfasePropTypes<T>): JSX.Element => {
    // type inputPartsType<T> = {
    //   labelName: string | undefined;
    //   nowSetting: string | null | undefined;
    //   inputName: keyof T;
    //   inputType: HTMLInputTypeAttribute | undefined;
    //   inputPlaceholder: string | undefined;
    // };

    // const [inputValueState] = useState<ChangeUserTypes>({ phoneNumber: '', userName: '' });

    // const inputParts: Array<inputPartsType<ChangeUserTypes>> = [
    //   {
    //     labelName: 'ユーザー名',
    //     nowSetting: auth.currentUser?.displayName,
    //     inputName: 'phoneNumber',
    //     inputType: 'text',
    //     inputPlaceholder: 'ユーザー名',
    //   },
    //   {
    //     labelName: '電話番号',
    //     nowSetting: auth.currentUser?.phoneNumber,
    //     inputName: 'phoneNumber',
    //     inputPlaceholder: '電話番号',
    //     inputType: 'text',
    //   },
    // ];

    return (
      <>
        {formTitle && <h1>{formTitle}</h1>}
        <form onSubmit={handleSubmit}>
          <div>
            {inputParts.map(({ labelName, nowSetting, inputName, inputType, inputPlaceholder }) => {
              return (
                <>
                  {labelName && (
                    <label>
                      {labelName}
                      {typeof nowSetting !== 'undefined' && <span>現在の設定: {nowSetting}</span>}
                    </label>
                  )}
                  <input
                    name={inputName}
                    type={inputType}
                    placeholder={inputPlaceholder}
                    onChange={handleChange}
                    value={inputValueState[`${inputName}`]}
                  />
                </>
              );
            })}
          </div>
          <div>
            <button disabled={buttonDesable}>{buttonName}</button>
          </div>
        </form>
      </>
    );
  }
);

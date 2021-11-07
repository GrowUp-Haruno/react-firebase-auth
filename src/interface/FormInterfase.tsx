// User import
import { FormInterfasePropTypes, FormInputValueTypes } from './types/typeFormInterfase';

export const FormInterfase = <T extends FormInputValueTypes>({
  formTitle,
  inputParts,
  inputValueState,
  handleSubmit,
  handleChange,
  buttonDesable,
  buttonName,
}: FormInterfasePropTypes<T>): JSX.Element => {
  console.log('FormInterfase called')
  return (
    <>
      {formTitle && <h1>{formTitle}</h1>}
      <form onSubmit={handleSubmit}>
        <div>
          {inputParts.map(
            ({ labelName, nowSetting, inputName, inputType, inputPlaceholder }, index) => {
              return (
                <div>
                  {labelName && (
                    <label>
                      {labelName}
                      {typeof nowSetting !== 'undefined' && <span>(現在の設定: {nowSetting})</span>}
                    </label>
                  )}
                  <input
                    name={inputName}
                    type={inputType}
                    placeholder={inputPlaceholder}
                    onChange={handleChange}
                    value={inputValueState[`${inputName}`]}
                    key={`${inputName}-${index}`}
                  />
                </div>
              );
            }
          )}
        </div>
        <div>
          <button disabled={buttonDesable}>{buttonName}</button>
        </div>
      </form>
    </>
  );
};

import { FC, memo } from 'react';
import Card from '../Elements/Card';
import { auth } from '../../firebase';
import { FormInterfase } from './FormInterfase';
import { useChangeProfile } from './hooks/useChangeProfile';
import { ChangeUserProfileTypes } from './types/typeChangeUserProfile';

export const ChangeProfile: FC = memo(() => {
  const {
    inputValueState,
    buttonState,
    handleChangeObjectState,
    handleSubmit,
  } = useChangeProfile();
  return (
    <Card>
      <FormInterfase<ChangeUserProfileTypes>
        formTitle="ユーザー情報の更新"
        inputParts={[
          {
            labelName: 'ユーザー名',
            inputName: 'userName',
            inputType: 'text',
            nowSetting: auth.currentUser?.displayName,
            inputPlaceholder: 'ユーザー名',
          },
          {
            labelName: 'アバターのURL',
            inputName: 'photoUrl',
            inputType: 'url',
            nowSetting: auth.currentUser?.photoURL,
            inputPlaceholder: 'アバターのURL',
          },
        ]}
        handleSubmit={handleSubmit}
        handleChange={handleChangeObjectState}
        inputValueState={inputValueState}
        buttonName="更新"
        buttonState={buttonState}
      />
    </Card>
  );
});

ChangeProfile.displayName = 'ChangeProfile';

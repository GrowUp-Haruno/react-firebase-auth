import { FC, memo, ReactNode } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

//Propsの型定義
type PropType = {
  isOpen: boolean;
  onClose: () => void;
  modalTitle?: string;
  children: ReactNode;
};

/**
 * ### propテンプレート
 * - isOpen={isOpen} onClose={onClose} modalTitle={""}
 *
 * ### 使用方法
 * - childrenは必須prop
 * - isOpenとonCloseは呼び出し先でchakrauiのカスタムフックuseDisclosure()を用いること
 *
 * ### prop説明
 * - isOpen: boolean;
 * - onClose: () => void;
 * - modalTitle?: string;
 *    - モーダルのタイトル
 *    - 指定しなかった場合は表示されない
 * - children: ReactNode
 */
const PrimaryModal: FC<PropType> = memo(({ isOpen, onClose, modalTitle, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInRight">
      <ModalOverlay />
      <ModalContent>
        {modalTitle && <ModalHeader>{modalTitle}</ModalHeader>}
        <ModalCloseButton />

        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          {/* <Button variant="ghost">Secondary Action</Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

PrimaryModal.displayName = 'PrimaryModal';
export default PrimaryModal;

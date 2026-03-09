import {
  Heading as AriaHeading,
  ModalOverlay as AriaModalOverlay,
  Modal as AriaModal,
  Dialog as AriaDialog,
  Button as AriaButton,
} from "react-aria-components";
import styles from "./Modal.module.css";

import closeIcon from "../../assets/xmark.svg";

export default function Modal({ children, isOpen, setIsOpen }) {
  return (
    <AriaModalOverlay
      className={styles.overlay}
      isDismissable
      isOpen={isOpen}
      onOpenChange={setIsOpen}
    >
      <AriaModal className={styles.modal}>
        <AriaDialog className={styles.dialog}>
          <AriaHeading className={styles.heading} slot="title">
            {children}
          </AriaHeading>
          <AriaButton
            className={styles.button}
            autoFocus
            onPress={() => setIsOpen(false)}
          >
            <img src={closeIcon} alt="close" />
          </AriaButton>
        </AriaDialog>
      </AriaModal>
    </AriaModalOverlay>
  );
}

import { Dispatch, SetStateAction } from "react";
import { SuccessModalUI } from "@components/ui/SuccessModalUI";
import {IQuickLinkDto} from "@/data-contracts.ts";
import {createCopyQuickLink} from "@/helpers/CreateCopyLinks.ts";

type QuickLinksSuccesModalProps = {
  edit: IQuickLinkDto;
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleCloseModal?: () => void;
};

const QuickLinksSuccesModal = ({
  edit,
  isOpen,
  setOpen,
  handleCloseModal,
}: QuickLinksSuccesModalProps) => {
  return (
    <SuccessModalUI
      hasCloseBtn={false}
      errorText={!edit?.salesAvailable && edit?.errorText}
      copyLink={createCopyQuickLink(edit?.id)}
      isOpen={isOpen}
      setOpen={setOpen}
      handleCloseModal={handleCloseModal}
    />
  );
};

export default QuickLinksSuccesModal;

import { createCopyQuickLink } from "@/helpers/CreateCopyLinks.ts"
import { Dispatch, SetStateAction, useState } from "react"
import { ModalUI } from "@components/ui/ModalUI"
import { SuccessModalUI } from "@components/ui/SuccessModalUI"
import QuickLinksResellForm from "./QuickLinksResellForm.tsx"
import { IQuickLinkDto } from '@/data-contracts.ts'

interface QuickLinksResellFormModalProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSuccess?: (...param: any) => void;
  edit?: IQuickLinkDto;
}

const QuickLinksResellFormModal = ({
  isOpen,
  setOpen,
  onSuccess,
  edit,
}: QuickLinksResellFormModalProps) => {
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [idLink, setIdLink] = useState("");

  return (
    <>
      <ModalUI isOpen={isOpen} setOpen={setOpen} maxWidth={800}>
        <h3 className='text-[32px] text-center font-bold mb-8 max-sm:text-base'>
          Создание перепродажной ссылки
        </h3>
        <QuickLinksResellForm
          edit={edit}
          onSuccess={(edited, created) => {
            if (created) {
              onSuccess?.(edited, created);
              setOpen(false);
              setOpenSuccessModal(true);
              setIdLink(edited?.id);
            }
          }}
        />
      </ModalUI>
      <SuccessModalUI
        copyLink={createCopyQuickLink(idLink)}
        isOpen={openSuccessModal}
        setOpen={setOpenSuccessModal}
      />
    </>
  );
};

export default QuickLinksResellFormModal;

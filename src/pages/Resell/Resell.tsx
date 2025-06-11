import QuickLinksResellForm from "@/pages/Quicklinks/components/Forms/QuickLinksResellForm";
import { SuccessModalUI } from "@/components/ui/SuccessModalUI";
import { createCopyQuickLink } from "@/helpers/CreateCopyLinks.ts";
import { useState } from "react";

const Resell = () => {
  const [selectedQuicklink, setSelectedQuicklink] = useState(null);
  const [stateQuickLinksSuccessModal, setStateQuickLinksSuccessModal] =
    useState(false);

  return (
    <section className="pt-[80px] pb-[80px] max-sm:pt-[40px] max-sm:pb-[40px]">
      <div className="container">
        <QuickLinksResellForm
          onSuccess={(edited, created) => {
            if (created) {
              setSelectedQuicklink(edited);
              setStateQuickLinksSuccessModal(true);
            }
          }}
        />
        <SuccessModalUI
          copyLink={createCopyQuickLink(selectedQuicklink?.id)}
          isOpen={stateQuickLinksSuccessModal}
          setOpen={setStateQuickLinksSuccessModal}
        />
      </div>
    </section>
  );
};

export default Resell;

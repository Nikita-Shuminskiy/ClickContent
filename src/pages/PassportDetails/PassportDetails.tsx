import { useState } from "react";
import { WarningModal } from "@/pages/PassportDetails/components/WarningModal.tsx";
import { PassportModal } from "@/pages/PassportDetails/components/PassportModal.tsx";

const PassportDetails = () => {
  const [stateWarningModal, setStateWarningModal] = useState(true);
  const [statePassportModal, setStatePassportModal] = useState(false);

  return (
    <>
      <WarningModal isOpen={stateWarningModal} setOpen={setStateWarningModal} />
      <PassportModal
        isOpen={statePassportModal}
        setOpen={setStatePassportModal}
        setStateWarningModal={setStateWarningModal}
      />
    </>
  );
};

export default PassportDetails;

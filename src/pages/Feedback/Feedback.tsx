import { useState } from "react";
import bgLand from "@/assets/images/all-img/bg-land.jpg";
import FeedbackConfirmModal from "@/pages/Feedback/components/FeedbackConfirmModal.tsx";
import FeedbackModal from "@/pages/Feedback/components/FeedbackModal.tsx";

const Feedback = () => {
  const [isSuccessSubmit, setSuccessSubmit] = useState(false);
  const [isOpenModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="fixed -z-[1] left-0 right-0 top-0 bottom-0 w-full h-full">
        <img
          className="w-full h-full object-cover"
          src={bgLand}
          aria-hidden="true"
          alt="Фон"
        />
      </div>
      <FeedbackModal
        setOpenInfoModal={setOpenModal}
        setStatusForm={setSuccessSubmit}
      />
      <FeedbackConfirmModal
        isOpen={isOpenModal}
        setOpen={setOpenModal}
        isSuccess={isSuccessSubmit}
      />
    </>
  );
};

export default Feedback;

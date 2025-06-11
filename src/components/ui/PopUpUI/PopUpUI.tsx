import { Popover, Transition } from "@headlessui/react";
import React, { useState } from "react";

const PopUpUI = ({ children, buttonRender = null, classNameButton = "" }) => {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const onOpen = () => setOpen(true);
  return (
    <Popover
      onClick={onOpen}
      onBlur={onClose}
      onTouchEnd={onClose}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      className={"max-xs:w-full w-auto relative"}
    >
      <Popover.Button
        className={`w-full pointer-events-none ${
          classNameButton ? classNameButton : ""
        }`}
      >
        {buttonRender ?? <span className="text-2xl">...</span>}
      </Popover.Button>

      <Transition
        autoFocus={true}
        show={open}
        as="div"
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel>{children}</Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default PopUpUI;

import { classNames } from "@/helpers/CssClasses.ts";
import { Menu, MenuItem, MenuItems, Transition } from "@headlessui/react";
import React from "react";
import { Fragment } from "react";

export interface IRowDefinition {
  text: string;
  onClickHandle: (e: any) => void;
}

export type TableUIProps = {
  rows: IRowDefinition[];
  buttonRender: JSX.Element;
};

const DropDownUI = ({ rows, buttonRender }: TableUIProps) => {
  const handleButtonInsideClick = (event) => {
    event.stopPropagation();
  };
  return (
    <Menu
      as='div'
      className='relative inline-block text-left'
      onClick={handleButtonInsideClick}
    >
      <div className='flex flex-column items-center'>
        <Menu.Button onClick={handleButtonInsideClick}>
          {buttonRender}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <MenuItems className='absolute right-0 z-10 mt-2 origin-top-right rounded-[16px] overflow-hidden bg-[#202020] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className='py-1'
          >
            {rows.map((row, index) => (
              <React.Fragment key={`${row.text}-${index}`}>
                <MenuItem>
                  <button
                    type='submit'
                    className={classNames(
                      "flex items-center gap-2 text-white w-full px-4 py-2 text-left hover:bg-white/10",
                    )}
                    onClick={row.onClickHandle}
                  >
                    {row.text}
                  </button>
                </MenuItem>
                {rows.length !== index + 1 && (
                  <hr className='border border-white/5 mx-[10%]' />
                )}
              </React.Fragment>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default DropDownUI;

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";
import { Controller } from "react-hook-form";

export default function SelectUI({ options, placeholder, name, control }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <Listbox value={value ? value : null} onChange={onChange}>
            {({ open }) => (
              <>
                <ListboxButton className="w-full text-left cursor-pointer relative">
                  <span
                    className={`flex flex-col truncate pl-5 py-8 max-sm:py-6 max-sm:text-[14px] max-xs:text-[10px] pr-9 bg-[#1a1a1a] text-[14px] rounded-2xl`}
                  >
                    <span
                      className={`${
                        value ? "text-white" : "text-[#5f5f5f]"
                      } truncate font-firstNeue`}
                    >
                      {value ?? placeholder}
                    </span>
                  </span>
                  <span
                    className={`${
                      open ? "rotate-[135deg]" : "rotate-[-45deg]"
                    } duration-300 pointer-events-none absolute top-[50%] translate-y-[-50%] right-5 w-2 h-2 border-l-2 border-b-2 border-solid border-white`}
                  ></span>
                </ListboxButton>
                <span className="relative -mt-3">
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <ListboxOptions className="absolute overflow-auto w-full mt-1 max-h-60 rounded-2xl bg-[#1A1A1A] text-base shadow-lg ring-1 z-20 ring-black/5 focus:outline-none sm:text-sm">
                      {options.map((option, i) => (
                        <ListboxOption
                          className={
                            "pl-5 pt-2 first:pt-3 pb-2 hover:bg-white/20 cursor-pointer font-firstNeue"
                          }
                          key={i}
                          value={option.value}
                        >
                          {option.option}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </Transition>
                </span>
              </>
            )}
          </Listbox>
        );
      }}
    />
  );
}

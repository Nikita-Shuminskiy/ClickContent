import React, {Fragment} from 'react';
import {Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition} from "@headlessui/react";
import {classNames} from "@/helpers/CssClasses.ts";
import {useUpdateSearchParams} from "@/hooks/useUpdateSearchParams.ts";
import {selectValue} from "@/pages/Dashboard/DashboardElements/IncomeAnalytics/constants.ts";

const Header = ({setIncomeModal, title, keyParams}) => {
    const {params, updateParams} = useUpdateSearchParams()
    const getParamValue = params.get(keyParams);

    const currSelected = selectValue.find(val => val.value === getParamValue) ?? selectValue[0]

    const onChangeSelectPeriod = (data: typeof selectValue[0]) => {
        updateParams({[keyParams]: data.value})
    }
    return (
        <div className='flex items-center justify-between gap-5 mb-5'>
            <h3
                className='text-2xl font-bold max-sm:text-lg cursor-pointer max-sm:pointer-events-none'
                onClick={() => setIncomeModal(true)}
            >
                {title}
            </h3>

            <Listbox value={currSelected} onChange={onChangeSelectPeriod}>
                <div className='relative mt-1'>
                    <ListboxButton className='w-full text-left'>
                        <div className='flex items-center gap-3'>
                    <span className='text-base max-xs:text-xs text-white' style={{textWrap: 'nowrap'} as unknown}>
                      {currSelected.text}
                    </span>
                            <span
                                className='block w-0 h-0 border-solid border-[5px] border-r-transparent border-l-transparent border-b-0 boder-t-white'></span>
                        </div>
                    </ListboxButton>
                    <Transition
                        as={Fragment}
                        leave='transition ease-in duration-100'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <ListboxOptions
                            className='absolute mt-1 max-h-60 w-40 right-0 origin-top-right rounded-[16px] overflow-hidden py-4 px-5 bg-[#202020] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                            {selectValue.map((value, index) => (
                                <ListboxOption
                                    key={`${index}-${value?.text}`}
                                    className={` ${
                                        selectValue.length !== index + 1
                                            ? "border-b border-white/10"
                                            : ""
                                    }`}
                                    value={value}
                                >
                                    <button
                                        className={classNames(
                                            "flex items-center gap-2 text-white w-full py-3 text-left text-sm border-b border-white ",
                                        )}
                                    >
                                        {value.text}
                                    </button>
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
};

export default Header;

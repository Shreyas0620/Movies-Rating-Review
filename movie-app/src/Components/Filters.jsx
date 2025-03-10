import React, { Fragment } from "react";
import { SelectorIcon } from "@heroicons/react/solid";
import { Listbox, Transition } from "@headlessui/react";
import { FaCheck } from "react-icons/fa";
import { LanguageData, RatesData, TimeData, YearData } from "../Data/FilterData";

function Filters(props) {
    const {
        categories,
        category,
        setCategory,
        language,
        setLanguage,
        year,
        setYear,
        times,
        setTimes,
        rate,
        setRates,
    } = props?.data || {};

    const Filter = [
        {
            value: category || { title: "All Categories" },
            onchange: setCategory,
            items: categories?.length > 0
                ? [{ title: "All Categories" }, ...categories]
                : [{ title: "No Category found" }],
        },
        {
            value: language || { title: "All Languages" },
            onchange: setLanguage,
            items: LanguageData || [],
        },
        {
            value: year || { title: "All Years" },
            onchange: setYear,
            items: YearData || [],
        },
        {
            value: rate || { title: "All Rates" },
            onchange: setRates,
            items: RatesData || [],
        },
        {
            value: times || { title: "All Times" },
            onchange: setTimes,
            items: TimeData || [],
        },
    ];

    return (
        <>
            <div className="my-6 bg-dry border text-dryGray border-gray-800 grid md:grid-cols-5 grid-cols-2 lg:gap-2 gap-2 rounded p-6">
                {Filter.map((item, index) => (
                    <Listbox key={index} value={item.value} onChange={item.onchange}>
                        <div className="relative">
                            <Listbox.Button className="relative border border-gray-800 w-full text-white bg-main rounded-lg cursor-default py-4 pl-6 pr-10 text-left text-xs">
                                <span className="block truncate">{item.value?.title}</span>
                                <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-2">
                                    <SelectorIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-800 text-dryGray rounded-md shadow-lg max-h-60 py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                    {item.items.map((option, i) => (
                                        <Listbox.Option
                                            key={i}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                    active ? "bg-subMain text-white" : "text-main"
                                                }`
                                            }
                                            value={option}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <span
                                                        className={`block truncate ${
                                                            selected ? "font-semibold" : "font-normal"
                                                        }`}
                                                    >
                                                        {option.title}
                                                    </span>
                                                    {selected ? (
                                                        <span
                                                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                                active ? "text-white" : "text-subMain"
                                                            }`}
                                                        >
                                                            <FaCheck className="h-5" aria-hidden="true" />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                ))}
            </div>
        </>
    );
}

export default Filters;
"use client";

import React from "react";
import { filters } from "@/data/jobFilters";

const Filters = ({ selectedFilters, handleFilterChange, counts }: any) => {
  return (
    <>
      {filters.map((filter) => (
        <div className="mt-3" key={filter.name}>
          <h1 className="text-lg font-semibold capitalize dark:text-white">
            {filter.label}
          </h1>

          {filter.filters.map((filterValue: string) => (
            <div className="mt-3" key={filterValue}>
              {/* Row: checkbox + label ---- count */}
              <div className="flex items-center justify-between w-full">
                
                {/* Left side: checkbox + label */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    id={filterValue}
                    value={filterValue}
                    checked={(selectedFilters?.[filter.name] || []).includes(filterValue)}
                    onChange={(e) =>
                      handleFilterChange(
                        filter.name,
                        filterValue,
                        e.target.checked
                      )
                    }
                    className="cursor-pointer"
                  />
                  <span className="capitalize text-sm dark:text-gray-300">
                    {filterValue}
                  </span>
                </label>

                {/* Right side: count */}
                <span className="px-2 py-[2px] text-sm bg-slate-200 dark:bg-dark-card rounded-md dark:text-gray-200">
                  {counts?.[filterValue] ?? 0}
                </span>

              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default Filters;

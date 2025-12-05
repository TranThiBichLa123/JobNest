/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { FiBookmark } from "react-icons/fi";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";

const JobList = ({ jobs, loading }: any) => {
  const auth = useContext(AuthContext);
  const { openLoginModal } = useAuthModal();

  const handleApplyClick = (e: React.MouseEvent) => {
    if (!auth?.user) {
      e.preventDefault();
      openLoginModal();
    }
  };

  return !loading ? (
    <>
      {jobs?.length > 0 ? (
        <>
          {jobs.map((job: any) => (
            <motion.div
              key={job.id}
              className="
                bg-white dark:bg-[var(--dark-card)]
                border border-slate-200 dark:border-slate-700
                rounded-xl shadow-sm p-5 mt-5 transition-colors
              "
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {/* Top Row */}
              <div className="flex justify-between items-start gap-4">
                {/* Logo + Info */}
                <div className="flex items-start gap-4">
                  <img
                    src={job.logo_url || "/images/a.png"}
                    alt="logo"
                    className="w-12 h-12 rounded-lg object-cover"
                  />

                  <div>
                    <Link
                      href={`/jobs/${job.id}`}
                      className="hover:text-primary transition"
                    >
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                        {job.title}
                      </h2>
                    </Link>

                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {job.company_name} <span className="mx-2">·</span> 3 days ago
                    </p>

                    {/* Tags */}
                    <div className="flex items-center gap-2 mt-3 flex-wrap text-sm">
                      <span className="px-3 py-1 bg-slate-200 dark:bg-[var(--hover-color)] rounded-md text-gray-700 dark:text-gray-200">
                        {job.type_of_employment}
                      </span>
                      <span className="px-3 py-1 bg-slate-200 dark:bg-[var(--hover-color)] rounded-md text-gray-700 dark:text-gray-200">
                        {job.experience}
                      </span>
                      <span className="px-3 py-1 bg-slate-200 dark:bg-[var(--hover-color)] rounded-md text-gray-700 dark:text-gray-200">
                        {job.experience_level}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Save Job */}
                <button
                  className="
                    flex items-center gap-2 bg-slate-100 
                    dark:bg-[var(--hover-color)]
                    text-gray-600 dark:text-gray-200
                    px-3 py-1.5 rounded-md hover:bg-slate-200
                    dark:hover:bg-[#2f3442] transition text-sm
                  "
                >
                  Save Job <FiBookmark />
                </button>
              </div>

              {/* Description */}
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                {job.description?.slice(0, 250)}...
              </p>

              {/* Bottom Section */}
              <div className="flex flex-wrap justify-between items-center mt-6">
                {/* Salary & Applied */}
                <div className="flex items-center gap-6">
                  <p className="text-gray-800 dark:text-white font-medium">
                    {job.salary_range}
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {" "}
                      / month
                    </span>
                  </p>

                  <p className="text-gray-700 dark:text-gray-300">
                    54{" "}
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      People Applied
                    </span>
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3 mt-4 sm:mt-0">
                  <button
                    className="
                      bg-slate-100 dark:bg-[var(--hover-color)]
                      text-gray-700 dark:text-gray-200
                      px-5 py-2 rounded-md
                      hover:bg-slate-200 dark:hover:bg-[#2f3442]
                      transition
                    "
                  >
                    Message
                  </button>

                  <Link
                    href="/apply"
                    onClick={handleApplyClick}
                    className="
                      bg-cyan-700 hover:bg-cyan-800 text-white
                      px-6 py-2 rounded-md transition font-medium
                    "
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </>
      ) : (
        <div className="flex-center-center mt-5">
          <div className="image-wrapper">
            <img
              src="/images/a.png"
              alt="no results"
              className="mx-auto object-contain h-[350px] w-[350px]"
            />
            <h1 className="text-center mt-5 text-5xl opacity-60">
              Oops! No jobs found
            </h1>
          </div>
        </div>
      )}
    </>
  ) : (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl bg-slate-200 dark:bg-[var(--hover-color)] h-40 mt-4 animate-pulse"
        />
      ))}
    </>
  );
};

export default JobList;

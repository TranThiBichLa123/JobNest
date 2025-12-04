"use client";

import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import {
  FiChevronsRight,
  FiChevronsLeft,
  FiChevronDown,
  FiDelete,
} from "react-icons/fi";
import { BiFilterAlt } from "react-icons/bi";
import Filters from "@/components/Home/Job/Filters";
import JobList from "@/components/Home/Job/JobList";
import { filters } from "@/data/jobFilters";
// SearchFilters might not exist in your project; we'll implement a small inline version below
import useFetch from "@/hooks/useFetch";
import { server } from "@/lib/config";

// Stable mock jobs used when the API returns an empty list. Kept at module scope
// so the array identity doesn't change between renders and cause effect loops.
const MOCK_JOBS = [
  {
    id: "mock-1",
    title: "Frontend Developer",
    company_name: "Acme Corp",
    company_location: "Hanoi, VN",
    logo_url: "/images/j1.png",
    type_of_employment: "Full Time",
    experience: "1 - 2 Years",
    experience_level: "Entry Level",
    description: "Build and maintain user interfaces using React and Next.js.",
    skills: ["React", "TypeScript", "Next.js"],
    salary_range: "$40k -55k",
  },
  {
    id: "mock-2",
    title: "Backend Developer",
    company_name: "Beta Solutions",
    company_location: "Ho Chi Minh City, VN",
    logo_url: "/images/j2.png",
    type_of_employment: "Part Time",
    experience: "2 - 6 Years",
    experience_level: "Mid Level",
    description: "Design REST APIs with Spring Boot and Java.",
    skills: ["Java", "Spring", "SQL"],
    salary_range: "$55k - 85k",
  },
  {
    id: "mock-3",
    title: "UI/UX Designer",
    company_name: "Creative Studio",
    company_location: "Da Nang, VN",
    logo_url: "/images/j3.png",
    type_of_employment: "Contract",
    experience: "2 - 6 Years",
    experience_level: "Mid Level",
    description: "Design interfaces and experiences for web applications.",
    skills: ["Figma", "UX", "Prototyping"],
    salary_range: "$55k - 85k",
  },
  {
    id: "mock-4",
    title: "DevOps Engineer",
    company_name: "CloudOps",
    company_location: "Remote",
    logo_url: "/images/j4.png",
    type_of_employment: "Remote",
    experience: "Over 6 Years",
    experience_level: "Senior Level",
    description: "Maintain CI/CD pipelines and cloud infrastructure.",
    skills: ["AWS", "Docker", "Kubernetes"],
    salary_range: "$115k - 145k",
  },
  {
    id: "mock-5",
    title: "QA Engineer",
    company_name: "QualityWorks",
    company_location: "Hanoi, VN",
    logo_url: "/images/j5.png",
    type_of_employment: "Full Time",
    experience: "1 - 2 Years",
    experience_level: "Entry Level",
    description: "Ensure product quality through testing and automation.",
    skills: ["Selenium", "Testing"],
    salary_range: "$40k -55k",
  },
  {
    id: "mock-6",
    title: "Product Manager",
    company_name: "Prodify",
    company_location: "Hanoi, VN",
    logo_url: "/images/j6.png",
    type_of_employment: "Full Time",
    experience: "2 - 6 Years",
    experience_level: "Mid Level",
    description: "Lead product direction and roadmap.",
    skills: ["Roadmapping", "Stakeholder Management"],
    salary_range: "$85k - 115k",
  },
  {
    id: "mock-7",
    title: "Data Scientist",
    company_name: "Insight Labs",
    company_location: "Ho Chi Minh City, VN",
    logo_url: "/images/j7.png",
    type_of_employment: "Full Time",
    experience: "2 - 6 Years",
    experience_level: "Mid Level",
    description: "Analyze data and build predictive models.",
    skills: ["Python", "ML"],
    salary_range: "$85k - 115k",
  },
  {
    id: "mock-8",
    title: "Mobile Developer",
    company_name: "Appify",
    company_location: "Da Nang, VN",
    logo_url: "/images/j8.png",
    type_of_employment: "Freelance",
    experience: "1 - 2 Years",
    experience_level: "Entry Level",
    description: "Develop mobile apps using React Native.",
    skills: ["React Native", "iOS", "Android"],
    salary_range: "$55k - 85k",
  },
  {
    id: "mock-9",
    title: "System Administrator",
    company_name: "InfraHub",
    company_location: "Remote",
    logo_url: "/images/j9.png",
    type_of_employment: "Remote",
    experience: "Over 6 Years",
    experience_level: "Senior Level",
    description: "Manage servers and networks.",
    skills: ["Linux", "Networking"],
    salary_range: "$115k - 145k",
  },
  {
    id: "mock-10",
    title: "Technical Writer",
    company_name: "DocsCo",
    company_location: "Hanoi, VN",
    logo_url: "/images/l1.png",
    type_of_employment: "Part Time",
    experience: "Under 1 Year",
    experience_level: "Entry Level",
    description: "Write technical documentation and guides.",
    skills: ["Writing", "Markdown"],
    salary_range: "$40k -55k",
  },
  {
    id: "mock-11",
    title: "Sales Engineer",
    company_name: "SalesTech",
    company_location: "Ho Chi Minh City, VN",
    logo_url: "/images/l2.png",
    type_of_employment: "Full Time",
    experience: "2 - 6 Years",
    experience_level: "Mid Level",
    description: "Support sales with technical expertise.",
    skills: ["Pre-sales", "Demos"],
    salary_range: "$85k - 115k",
  },
  {
    id: "mock-12",
    title: "Customer Success",
    company_name: "HappyClients",
    company_location: "Da Nang, VN",
    logo_url: "/images/l3.png",
    type_of_employment: "Full Time",
    experience: "1 - 2 Years",
    experience_level: "Entry Level",
    description: "Ensure customers achieve value from our product.",
    skills: ["Support", "Onboarding"],
    salary_range: "$55k - 85k",
  },
];

export default function JobsPage() {
  const { data: jobs = [], loading } = useFetch(`${server}/api/jobs`);

  // Fallback mock jobs for development / when API returns empty
  // NOTE: the real data comes from `jobs`; we use `MOCK_JOBS` when API returns empty.
  // `MOCK_JOBS` is declared at module scope to keep its identity stable between renders.
  const mockJobs = MOCK_JOBS;

  const allJobs = !loading && jobs.length === 0 ? mockJobs : jobs;

  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  // Autocomplete / Search inputs
  const [searchQueries, setSearchQueries] = useState({ title: "", location: "", type: "" });
  const [showAutoComplete, setShowAutoComplete] = useState({ title: false, location: false, type: false });
  const [autoCompletedResults, setAutoCompletedResults] = useState({ title: [], location: [], type: [] });

  // Mobile filter modal
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const handleCloseFiltermenu = (e: any) => {
    if (e.target.classList && e.target.classList.contains("filter-modal")) setIsFilterMenuOpen(false);
  };

  useEffect(() => {
    setAutoCompletedResults((prev: any) => ({
      ...prev,
      title: filterJobsByField(allJobs, "title", searchQueries.title),
    }));
  }, [allJobs, searchQueries.title]);

  useEffect(() => {
    setAutoCompletedResults((prev: any) => ({
      ...prev,
      location: filterJobsByField(allJobs, "company_location", searchQueries.location),
    }));
  }, [allJobs, searchQueries.location]);

  useEffect(() => {
    setAutoCompletedResults((prev: any) => ({
      ...prev,
      type: filterJobsByField(allJobs, "type_of_employment", searchQueries.type),
    }));
  }, [allJobs, searchQueries.type]);

  function filterJobsByField(jobsList: any[], field: string, q: string) {
    if (!q) return [];
    return jobsList.filter((job: any) => (job[field] || "").toLowerCase().includes(q.toLowerCase()));
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setSearchQueries((prev) => ({ ...prev, [name]: value }));
    setShowAutoComplete((prev) => ({ ...prev, [name]: !!value }));
  };

  const handleItemClick = (name: string, value: string) => {
    setSearchQueries((prev) => ({ ...prev, [name]: value }));
    setShowAutoComplete((prev) => ({ ...prev, [name]: false }));
  };

  const handleFilterChange = (filterName: string, filterValue: string, isChecked: boolean) => {
    setSelectedFilters((prev: any) => {
      const updated = { ...(prev || {}) };
      if (isChecked) updated[filterName] = [...(prev?.[filterName] || []), filterValue];
      else updated[filterName] = (prev?.[filterName] || []).filter((v: string) => v !== filterValue);
      return updated;
    });
    setOffset(0);
  };

  // Combined filtering logic (search + filter checkboxes)
  let jobsToDisplay = allJobs.filter((job: any) => {
    // Search filtering
    let isTitleMatch = true;
    let isLocationMatch = true;
    let isTypeMatch = true;
    if (searchQueries.title) isTitleMatch = (job.title || "").toLowerCase().includes(searchQueries.title.toLowerCase());
    if (searchQueries.location) isLocationMatch = (job.company_location || "").toLowerCase().includes(searchQueries.location.toLowerCase());
    if (searchQueries.type) isTypeMatch = (job.type_of_employment || "").toLowerCase().includes(searchQueries.type.toLowerCase());

    // Filter checkbox logic
    let matchesFilters = true;
    for (const [filterName, selectedValues] of Object.entries(selectedFilters) as [string, string[]][]) {
      if (selectedValues.length > 0 && !selectedValues.includes(job[filterName])) {
        matchesFilters = false;
        break;
      }
    }

    return isTitleMatch && isLocationMatch && isTypeMatch && matchesFilters;
  });

  // counts
  const counts: any = {};
  filters.forEach((f) => {
    f.filters.forEach((value: string) => {
      counts[value] = (allJobs || []).filter((job: any) => job[f.name] === value).length;
    });
  });

  // Pagination
  const [offset, setOffset] = useState(0);
  const jobsPerPage = 4;
  const endOffset = offset + jobsPerPage;
  const currentJobs = jobsToDisplay.slice(offset, endOffset);
  const pageCount = Math.ceil(jobsToDisplay.length / jobsPerPage) || 0;

  const handlePageClick = (e: any) => {
    const newOffset = (e.selected * jobsPerPage) % (jobsToDisplay.length || 1);
    setOffset(newOffset);
  };

  const reset = () => setSearchQueries({ title: "", location: "", type: "" });

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">

      {/* Banner */}
      <div
        className="rounded-lg p-8 text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bg.jpg')" }}
      >
        <h1 className="text-3xl font-bold">Let's find your dream Job</h1>
        <p className="opacity-90">Tuesday, 24 Jan 2023</p>

        {/* Search Filters Inline */}
        <div className="mt-10 px-6 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <input name="title" value={searchQueries.title} onChange={handleInputChange} className="px-4 py-2 rounded-md text-black w-full" placeholder="Job Title..." />
              {showAutoComplete.title && autoCompletedResults.title?.length > 0 && (
                <div className="absolute bg-white shadow mt-1 w-full z-10">
                  {autoCompletedResults.title.slice(0, 6).map((j: any) => (
                    <div key={j.id} className="px-3 py-2 hover:bg-slate-100 cursor-pointer" onClick={() => handleItemClick('title', j.title)}>
                      {j.title}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <input name="location" value={searchQueries.location} onChange={handleInputChange} className="px-4 py-2 rounded-md text-black w-full" placeholder="Location..." />
              {showAutoComplete.location && autoCompletedResults.location?.length > 0 && (
                <div className="absolute bg-white shadow mt-1 w-full z-10">
                  {autoCompletedResults.location.slice(0, 6).map((j: any) => (
                    <div key={j.id} className="px-3 py-2 hover:bg-slate-100 cursor-pointer" onClick={() => handleItemClick('location', j.company_location)}>
                      {j.company_location}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative flex items-center gap-2">
              <input name="type" value={searchQueries.type} onChange={handleInputChange} className="px-4 py-2 rounded-md text-black w-full" placeholder="Type..." />
              <button onClick={() => setSearchQueries({ title: '', location: '', type: '' })} className="bg-primary text-white px-4 py-2 rounded-md">Search</button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="grid md:grid-cols-3 gap-x-14">
          <div className="md:col-span-1 row-start-3 md:row-start-auto h-fit md:sticky top-0">
            <div className={`filter-modal ${isFilterMenuOpen ? 'open' : ''}`} onClick={handleCloseFiltermenu}>
              <div className={`filter-dialog ${isFilterMenuOpen ? 'open' : ''}`}>
                <div className="flex-center-between border-b dark:border-slate-800 md:hidden">
                  <p className="uppercase">Filters</p>
                  <div className="icon-box md:hidden" onClick={() => setIsFilterMenuOpen(false)}>
                    <FiDelete />
                  </div>
                </div>
                <Filters selectedFilters={selectedFilters} handleFilterChange={handleFilterChange} counts={counts} />
              </div>
            </div>
          </div>

          <div className="md:col-span-2 mt-5 md:mt-0 h-fit md:sticky top-0">
            <div className="mt-3">
              <h1 className="text-">{allJobs.length} jobs matched</h1>
            </div>

            <div className="flex-center-between mt-3">
              <div className="flex-align-center gap-4" onClick={() => setIsFilterMenuOpen(true)}>
                <div className="md:hidden icon-box bg-white dark:bg-dark-card card-shadow dark:shadow-none card-bordered !rounded-md">
                  <BiFilterAlt />
                </div>
                <h3 className="text-sm"><span className="text-muted">Showing: </span>{jobsToDisplay.length} Jobs</h3>
              </div>
              <div className="flex-align-center gap-2">
                <p className="text-sm">Sort by:</p>
                <div className="flex-align-center gap-2">
                  <span className="text-sm text-primary">Posted Recently</span>
                  <FiChevronDown />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <JobList jobs={currentJobs} loading={loading} />
            </div>

            {!loading && (
              <div className="mt-5">
                <ReactPaginate
                  breakLabel="..."
                  nextLabel={<FiChevronsRight />}
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={2}
                  pageCount={pageCount}
                  previousLabel={<FiChevronsLeft />}
                  renderOnZeroPageCount={null}
                  containerClassName="wb-pagination"
                  pageClassName="pagination-item"
                  pageLinkClassName="pagination-link"
                  activeClassName="pagination-link-active"
                  previousLinkClassName="prev"
                  nextLinkClassName="next"
                  disabledClassName="disabled"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

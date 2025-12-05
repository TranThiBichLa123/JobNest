"use client";

import { useEffect, useState, useMemo } from "react";
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
import JobSearchBar from "@/components/Home/Hero/JobSearchBar";
// SearchFilters might not exist in your project; we'll implement a small inline version below
import useFetch from "@/hooks/useFetch";
import { server } from "@/lib/config";
import { useSearchParams } from 'next/navigation';

// Stable mock jobs used when the API returns an empty list. Kept at module scope
// so the array identity doesn't change between renders and cause effect loops.
const MOCK_JOBS = [
  {
    id: "mock-1",
    title: "Frontend Developer",
    company_name: "Udemy",
    company_location: "Hanoi, VN",
    logo_url: "/images/j1.png",
    type_of_employment: "Full Time",
    experience: "1 - 2 Years",
    experience_level: "Entry Level",
    description: "Build and maintain user interfaces using React and Next.js.",
    skills: ["React", "TypeScript", "Next.js"],
    salary_range: "$40k -55k",
    category: "Development",
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
    category: "Development",
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
    category: "Design",
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
    category: "Development",
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
    category: "Development",
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
    category: "Project Management",
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
    category: "Development",
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
    category: "Development",
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
    category: "Development",
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
    category: "Marketing",
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
    category: "Marketing",
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
    category: "Customer Service",
  },
];

export default function JobsPage() {
  const { data: jobs = [], loading } = useFetch(`${server}/api/jobs`);
  const searchParams = useSearchParams();

  // Fallback mock jobs for development / when API returns empty
  // NOTE: the real data comes from `jobs`; we use `MOCK_JOBS` when API returns empty.
  // `MOCK_JOBS` is declared at module scope to keep its identity stable between renders.
  const mockJobs = MOCK_JOBS;

  // useMemo to prevent allJobs from creating new array reference every render
  const allJobs = useMemo(() => {
    if (!Array.isArray(jobs)) return mockJobs;
    // Show mock jobs when API returns empty or is still loading with no data
    if (jobs.length === 0) return mockJobs;
    return jobs;
  }, [jobs, mockJobs]);

  // Get current date formatted
  const getCurrentDate = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    return `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  };



  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  // Autocomplete / Search inputs
  const [searchQueries, setSearchQueries] = useState({ title: "", location: "" });
  const [showAutoComplete, setShowAutoComplete] = useState({ title: false, location: false });
  const [autoCompletedResults, setAutoCompletedResults] = useState({ title: [], location: [] });

  // Mobile filter modal
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const handleCloseFiltermenu = (e: any) => {
    if (e.target.classList && e.target.classList.contains("filter-modal")) setIsFilterMenuOpen(false);
  };

  // read query params (category, company, title, location) and prefill search/filters
  useEffect(() => {
    if (!searchParams) return;
    const category = searchParams.get("category");
    const company = searchParams.get("company");
    const title = searchParams.get("title");
    const location = searchParams.get("location");

    if (title) setSearchQueries((prev) => ({ ...prev, title }));
    if (location) setSearchQueries((prev) => ({ ...prev, location }));
    // clicking company cards from Home should prefill the title search with company name
    if (company) setSearchQueries((prev) => ({ ...prev, title: company }));

    if (category) {
      setSelectedFilters((prev) => ({ ...(prev || {}), category: [category] }));
    }
  }, [searchParams]);

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

  // removed `type` text search - type is handled by checkbox filters

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
    if (searchQueries.title) {
      const q = searchQueries.title.toLowerCase();
      isTitleMatch = (job.title || "").toLowerCase().includes(q) || (job.company_name || "").toLowerCase().includes(q);
    }
    if (searchQueries.location) isLocationMatch = (job.company_location || "").toLowerCase().includes(searchQueries.location.toLowerCase());
    // if (searchQueries.type) isTypeMatch = (job.type_of_employment || "").toLowerCase().includes(searchQueries.type.toLowerCase());

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
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const reset = () => setSearchQueries({ title: "", location: "" });

  return (
    <div className="pt-[12vh] min-h-screen bg-white dark:bg-[#0f2137]">
      <div className="w-[92%] mx-auto py-10">

        {/* Banner */}
        <div
          className="rounded-xl -mt-10 text-white bg-cover bg-center dark:bg-gray-800"
          style={{ backgroundImage: "url('/images/bg.jpg')" }}
        >
          <div className="px-6 pt-4">
            <h1 className="font-bold text-2xl">Let's find your dream Job</h1>
            <p>{getCurrentDate()}</p>
          </div>
          {/* Search Filters */}
          <div className="mt-10 ">
            <JobSearchBar
              searchQueries={searchQueries}
              handleInputChange={handleInputChange}
              handleItemClick={handleItemClick}
              showAutoComplete={showAutoComplete}
              autoCompletedResults={autoCompletedResults}
            />
          </div>

        </div>

        <div className="mt-8">
          <div className="grid md:grid-cols-3 gap-x-14">
            <div className="md:col-span-1 row-start-3 md:row-start-auto h-fit md:sticky top-0">
              <div className={`filter-modal ${isFilterMenuOpen ? 'open' : ''}`} onClick={handleCloseFiltermenu}>
                <div className={`filter-dialog ${isFilterMenuOpen ? 'open' : ''}`}>
                  <div className="flex-center-between border-b dark:border-slate-800 md:hidden">
                    <p className="uppercase dark:text-white">Filters</p>
                    <div className="icon-box md:hidden" onClick={() => setIsFilterMenuOpen(false)}>
                      <FiDelete />
                    </div>
                  </div>
                  <Filters selectedFilters={selectedFilters} handleFilterChange={handleFilterChange} counts={counts} />
                </div>
              </div>
            </div>

            <div className="md:col-span-2 mt-5 md:mt-0 h-fit md:sticky top-0">


              <div className="flex items-center justify-between mt-3 w-full">

                {/* Left side */}
                <div
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={() => setIsFilterMenuOpen(true)}
                >
                  <div className="md:hidden icon-box bg-white dark:bg-dark-card card-shadow dark:shadow-none card-bordered !rounded-md">
                    <BiFilterAlt />
                  </div>

                  <h3 className="text-sm dark:text-white">
                    <span className="text-muted dark:text-gray-400">Showing: </span>
                    {jobsToDisplay.length} Jobs
                  </h3>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-2">
                  <p className="text-sm dark:text-gray-300">Sort by:</p>

                  <div className="flex items-center gap-2 cursor-pointer">
                    <span className="text-sm text-primary">Posted Recently</span>
                    <FiChevronDown className="dark:text-gray-300" />
                  </div>
                </div>

              </div>


              <div className="mt-3">
                <JobList jobs={currentJobs} loading={loading} />
                {!loading && jobsToDisplay.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                      No jobs found matching your filters.
                    </p>
                    <button
                      onClick={() => {
                        setSelectedFilters({});
                        setSearchQueries({ title: "", location: "" });
                      }}
                      className="mt-4 px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>

              {!loading && (
  <div className="mt-5 flex justify-center">
    <ReactPaginate
      breakLabel="..."
      nextLabel={<FiChevronsRight />}
      onPageChange={handlePageClick}
      pageRangeDisplayed={2}
      pageCount={pageCount}
      previousLabel={<FiChevronsLeft />}
      renderOnZeroPageCount={null}
      containerClassName="pagination"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      activeClassName="active"
      previousLinkClassName="nav-btn"
      nextLinkClassName="nav-btn"
      disabledClassName="disabled"
    />
  </div>
)}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

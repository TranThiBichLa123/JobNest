package com.jobnest.backend.config;

import com.jobnest.backend.entities.*;
import com.jobnest.backend.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Configuration
@Slf4j
@RequiredArgsConstructor
public class DataSeeder {

    private final UserRepository userRepository;
    private final CandidateProfileRepository candidateProfileRepository;
    private final CompanyRepository companyRepository;
    private final JobRepository jobRepository;
    private final JobCategoryRepository jobCategoryRepository;
    private final ApplicationRepository applicationRepository;
    private final SavedJobRepository savedJobRepository;
    private final CandidateCVRepository candidateCVRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner seedData() {
        return args -> {
            // Check if data already exists
            if (userRepository.count() > 0) {
                log.info("Data already exists. Skipping seed data initialization.");
                return;
            }

            log.info("Starting database seed initialization...");

            try {
                // Step 1: Clear all existing data
                clearAllData();

                // Step 2: Seed Job Categories
                List<JobCategory> categories = seedJobCategories();

                // Step 3: Seed Admin Account
                Account adminAccount = seedAdminAccount();

                // Step 4: Seed Employer Accounts and Companies
                List<Account> employers = seedEmployerAccounts();
                List<Company> companies = seedCompanies(employers);

                // Step 5: Seed Candidate Accounts and Profiles
                List<Account> candidates = seedCandidateAccounts();
                List<CandidateProfile> profiles = seedCandidateProfiles(candidates);

                // Step 6: Seed CVs for Candidates
                List<CandidateCV> cvs = seedCandidateCVs(candidates);

                // Step 7: Seed Jobs
                List<Job> jobs = seedJobs(employers, companies, categories);

                // Step 8: Seed Applications
                seedApplications(candidates, jobs, profiles, cvs);

                // Step 9: Seed Saved Jobs
                seedSavedJobs(candidates, jobs);

                log.info("Database seed initialization completed successfully!");
                log.info("Created: {} admins, {} employers, {} companies, {} candidates, {} job categories, {} jobs",
                        1, employers.size(), companies.size(), candidates.size(), categories.size(), jobs.size());
                
                // Log admin credentials for easy access
                log.info("========================================");
                log.info("ADMIN ACCOUNT CREDENTIALS");
                log.info("========================================");
                log.info("Email: admin@jobnest.com");
                log.info("Password: Admin@123456");
                log.info("Role: ADMIN");
                log.info("========================================");

            } catch (Exception e) {
                log.error("Error during database seeding", e);
                throw new RuntimeException("Failed to seed database", e);
            }
        };
    }

    private void clearAllData() {
        log.info("Clearing all existing data...");
        
        // Order matters - delete dependent tables first
        savedJobRepository.deleteAll();
        applicationRepository.deleteAll();
        candidateCVRepository.deleteAll();
        jobRepository.deleteAll();
        companyRepository.deleteAll();
        candidateProfileRepository.deleteAll();
        jobCategoryRepository.deleteAll();
        userRepository.deleteAll();
        
        log.info("All existing data cleared successfully");
    }

    private List<JobCategory> seedJobCategories() {
        log.info("Seeding job categories...");
        
        List<JobCategory> categories = List.of(
                JobCategory.builder()
                        .name("Software Development")
                        .slug("software-development")
                        .description("Jobs related to software development and programming")
                        .build(),
                JobCategory.builder()
                        .name("Data Science")
                        .slug("data-science")
                        .description("Data science, analytics, and machine learning positions")
                        .build(),
                JobCategory.builder()
                        .name("DevOps")
                        .slug("devops")
                        .description("DevOps engineering and cloud infrastructure roles")
                        .build(),
                JobCategory.builder()
                        .name("UI/UX Design")
                        .slug("ui-ux-design")
                        .description("User interface and user experience design positions")
                        .build(),
                JobCategory.builder()
                        .name("Project Management")
                        .slug("project-management")
                        .description("Project management and agile leadership roles")
                        .build(),
                JobCategory.builder()
                        .name("Business Analysis")
                        .slug("business-analysis")
                        .description("Business analyst and requirements engineering positions")
                        .build(),
                JobCategory.builder()
                        .name("Quality Assurance")
                        .slug("quality-assurance")
                        .description("QA testing and quality engineering roles")
                        .build(),
                JobCategory.builder()
                        .name("Marketing")
                        .slug("marketing")
                        .description("Digital marketing and marketing management positions")
                        .build()
        );
        
        return jobCategoryRepository.saveAll(categories);
    }

    private Account seedAdminAccount() {
        log.info("Seeding admin account...");
        
        Account admin = new Account();
        admin.setUsername("admin");
        admin.setEmail("admin@jobnest.com");
        admin.setPasswordHash(passwordEncoder.encode("Admin@123456"));
        admin.setRole(Account.Role.ADMIN);
        admin.setStatus(Account.AccountStatus.ACTIVE);
        admin.setAvatarUrl("https://api.example.com/avatars/admin.jpg");
        
        return userRepository.save(admin);
    }

    private List<Account> seedEmployerAccounts() {
        log.info("Seeding employer accounts...");
        
        List<Account> employers = new ArrayList<>();
        
        String[][] employerData = {
                {"employer1", "employer1@company.com", "TechCorp HR"},
                {"employer2", "employer2@innovate.com", "InnovateTech HR"},
                {"employer3", "employer3@cloudserv.com", "CloudServe HR"},
                {"employer4", "employer4@dataflows.com", "DataFlows HR"},
                {"employer5", "employer5@designstudio.com", "DesignStudio HR"}
        };
        
        for (String[] data : employerData) {
            Account employer = new Account();
            employer.setUsername(data[0]);
            employer.setEmail(data[1]);
            employer.setPasswordHash(passwordEncoder.encode("Employer@123456"));
            employer.setRole(Account.Role.EMPLOYER);
            employer.setStatus(Account.AccountStatus.ACTIVE);
            employer.setAvatarUrl("https://api.example.com/avatars/" + data[0] + ".jpg");
            
            employers.add(userRepository.save(employer));
        }
        
        return employers;
    }

    private List<Company> seedCompanies(List<Account> employers) {
        log.info("Seeding companies...");
        
        List<Company> companies = new ArrayList<>();
        
        String[][] companyData = {
                {"TechCorp Solutions", "Technology", "123 Tech Street, San Francisco, CA"},
                {"InnovateTech Inc", "Software", "456 Innovation Ave, New York, NY"},
                {"CloudServe Global", "Cloud Services", "789 Cloud Road, Seattle, WA"},
                {"DataFlows Analytics", "Data Science", "321 Data Park, Boston, MA"},
                {"DesignStudio Creative", "Design", "654 Design Boulevard, Los Angeles, CA"}
        };
        
        for (int i = 0; i < companyData.length && i < employers.size(); i++) {
            Company company = new Company();
            company.setEmployerId(employers.get(i).getId());
            company.setName(companyData[i][0]);
            company.setIndustry(companyData[i][1]);
            company.setAddress(companyData[i][2]);
            company.setLogoUrl("https://api.example.com/logos/company" + (i + 1) + ".png");
            company.setVerified(true);
            
            companies.add(companyRepository.save(company));
        }
        
        return companies;
    }

    private List<Account> seedCandidateAccounts() {
        log.info("Seeding candidate accounts...");
        
        List<Account> candidates = new ArrayList<>();
        
        String[][] candidateData = {
                {"candidate1", "john.doe@email.com"},
                {"candidate2", "jane.smith@email.com"},
                {"candidate3", "michael.johnson@email.com"},
                {"candidate4", "sarah.williams@email.com"},
                {"candidate5", "david.brown@email.com"},
                {"candidate6", "emma.davis@email.com"},
                {"candidate7", "robert.miller@email.com"},
                {"candidate8", "lisa.wilson@email.com"},
                {"candidate9", "james.moore@email.com"},
                {"candidate10", "mary.taylor@email.com"}
        };
        
        for (String[] data : candidateData) {
            Account candidate = new Account();
            candidate.setUsername(data[0]);
            candidate.setEmail(data[1]);
            candidate.setPasswordHash(passwordEncoder.encode("Candidate@123456"));
            candidate.setRole(Account.Role.CANDIDATE);
            candidate.setStatus(Account.AccountStatus.ACTIVE);
            candidate.setAvatarUrl("https://api.example.com/avatars/" + data[0] + ".jpg");
            
            candidates.add(userRepository.save(candidate));
        }
        
        return candidates;
    }

    private List<CandidateProfile> seedCandidateProfiles(List<Account> candidates) {
        log.info("Seeding candidate profiles...");
        
        List<CandidateProfile> profiles = new ArrayList<>();
        
        String[][] profileData = {
                {"John Doe", "+1-555-0101", "Senior Software Engineer", "5", "Java, Spring Boot, Python, AWS"},
                {"Jane Smith", "+1-555-0102", "Data Scientist", "4", "Python, Machine Learning, SQL, TensorFlow"},
                {"Michael Johnson", "+1-555-0103", "DevOps Engineer", "6", "Kubernetes, Docker, CI/CD, Terraform"},
                {"Sarah Williams", "+1-555-0104", "UI/UX Designer", "3", "Figma, Adobe XD, Prototyping, User Research"},
                {"David Brown", "+1-555-0105", "Project Manager", "7", "Agile, Scrum, Leadership, Planning"},
                {"Emma Davis", "+1-555-0106", "Business Analyst", "2", "Requirements Gathering, SQL, Business Logic"},
                {"Robert Miller", "+1-555-0107", "QA Engineer", "4", "Automation Testing, Selenium, API Testing"},
                {"Lisa Wilson", "+1-555-0108", "Digital Marketer", "3", "SEO, Content Marketing, Google Analytics"},
                {"James Moore", "+1-555-0109", "Full Stack Developer", "5", "JavaScript, React, Node.js, MongoDB"},
                {"Mary Taylor", "+1-555-0110", "Database Administrator", "6", "PostgreSQL, MySQL, Database Design, Backup"}
        };
        
        for (int i = 0; i < candidates.size() && i < profileData.length; i++) {
            CandidateProfile profile = new CandidateProfile();
            profile.setUser(candidates.get(i));
            profile.setFullName(profileData[i][0]);
            profile.setPhoneNumber(profileData[i][1]);
            profile.setCurrentPosition(profileData[i][2]);
            profile.setYearsOfExperience(profileData[i][3]);
            profile.setSkills(profileData[i][4]);
            profile.setGender(i % 2 == 0 ? CandidateProfile.Gender.MALE : CandidateProfile.Gender.FEMALE);
            profile.setDateOfBirth(LocalDate.of(1990 + (i % 5), 1 + (i % 12), 1 + (i % 28)));
            profile.setAboutMe("Passionate professional with " + profileData[i][3] + " years of experience in " + profileData[i][2]);
            
            profiles.add(candidateProfileRepository.save(profile));
        }
        
        return profiles;
    }

    private List<CandidateCV> seedCandidateCVs(List<Account> candidates) {
        log.info("Seeding candidate CVs...");
        
        List<CandidateCV> cvs = new ArrayList<>();
        
        for (int i = 0; i < candidates.size(); i++) {
            CandidateCV cv1 = new CandidateCV();
            cv1.setCandidateId(candidates.get(i).getId());
            cv1.setTitle("Resume " + (i + 1));
            cv1.setFileName("candidate" + (i + 1) + "_resume1.pdf");
            cv1.setFileUrl("https://api.example.com/cvs/candidate" + (i + 1) + "_resume1.pdf");
            cv1.setFileSize(1024000L + (long)(i * 10000)); // Simulate different file sizes
            cv1.setIsDefault(true);
            
            cvs.add(candidateCVRepository.save(cv1));
            
            // Add a second CV for some candidates
            if (i % 2 == 0) {
                CandidateCV cv2 = new CandidateCV();
                cv2.setCandidateId(candidates.get(i).getId());
                cv2.setTitle("Resume " + (i + 1) + " (Alternative)");
                cv2.setFileName("candidate" + (i + 1) + "_resume2.pdf");
                cv2.setFileUrl("https://api.example.com/cvs/candidate" + (i + 1) + "_resume2.pdf");
                cv2.setFileSize(1024000L + (long)(i * 10000) + 512000);
                cv2.setIsDefault(false);
                
                cvs.add(candidateCVRepository.save(cv2));
            }
        }
        
        return cvs;
    }

    private List<Job> seedJobs(List<Account> employers, List<Company> companies, List<JobCategory> categories) {
        log.info("Seeding jobs...");
        
        List<Job> jobs = new ArrayList<>();
        
        String[][] jobData = {
                // Format: {title, description, experience, education, skills, type, salary_min, salary_max, location, category_index, urgent}
                {"Senior Java Developer", "We are looking for an experienced Java developer with Spring Boot expertise.", "5+ years", "Bachelor's Degree", "Java, Spring Boot, Microservices, AWS", "FULLTIME", "120000", "160000", "San Francisco, CA", "0", "false"},
                {"Data Scientist", "Join our data team to work on machine learning projects.", "3+ years", "Master's Degree", "Python, Machine Learning, SQL, TensorFlow", "FULLTIME", "130000", "170000", "New York, NY", "1", "false"},
                {"DevOps Engineer", "Help us scale our cloud infrastructure with Kubernetes and Docker.", "4+ years", "Bachelor's Degree", "Kubernetes, Docker, CI/CD, AWS", "FULLTIME", "115000", "155000", "Seattle, WA", "2", "true"},
                {"UI/UX Designer", "Design beautiful interfaces for our web and mobile applications.", "2+ years", "Bachelor's Degree", "Figma, Adobe XD, Prototyping, User Research", "FULLTIME", "90000", "130000", "Los Angeles, CA", "3", "false"},
                {"Project Manager", "Lead agile teams and deliver projects on time.", "6+ years", "Bachelor's Degree", "Agile, Scrum, Leadership, Planning", "FULLTIME", "110000", "150000", "Boston, MA", "4", "false"},
                {"Business Analyst", "Analyze business requirements and document solutions.", "2+ years", "Bachelor's Degree", "Requirements Gathering, SQL, Business Logic", "FULLTIME", "80000", "110000", "Chicago, IL", "5", "false"},
                {"QA Engineer", "Ensure quality of our software through comprehensive testing.", "3+ years", "Bachelor's Degree", "Automation Testing, Selenium, API Testing", "FULLTIME", "85000", "120000", "Austin, TX", "6", "false"},
                {"Digital Marketing Manager", "Lead our digital marketing strategy and campaigns.", "4+ years", "Bachelor's Degree", "SEO, Content Marketing, Google Analytics, SEM", "FULLTIME", "95000", "135000", "Denver, CO", "7", "false"},
                {"Junior Frontend Developer", "Help us build responsive web applications.", "1+ years", "Bachelor's Degree", "React, JavaScript, CSS, HTML", "FULLTIME", "65000", "85000", "San Francisco, CA", "0", "true"},
                {"Full Stack Developer Intern", "Learn and contribute to our web development projects.", "0+ years", "Pursuing Bachelor's", "JavaScript, React, Node.js, Basic SQL", "INTERNSHIP", "20000", "30000", "New York, NY", "0", "false"},
                {"Database Administrator", "Manage and optimize our database systems.", "5+ years", "Bachelor's Degree", "PostgreSQL, MySQL, Database Design, Backup", "FULLTIME", "105000", "145000", "Seattle, WA", "2", "false"},
                {"Content Marketing Specialist", "Create engaging content for our marketing channels.", "2+ years", "Bachelor's Degree", "Content Writing, SEO, Social Media, Analytics", "FULLTIME", "70000", "95000", "Los Angeles, CA", "7", "false"},
                {"Backend Developer", "Build scalable backend systems with Python and Django.", "3+ years", "Bachelor's Degree", "Python, Django, PostgreSQL, REST APIs", "FULLTIME", "100000", "140000", "Boston, MA", "0", "false"},
                {"Mobile App Developer", "Develop iOS and Android applications.", "3+ years", "Bachelor's Degree", "Swift, Kotlin, React Native, Mobile UI", "FULLTIME", "110000", "150000", "San Francisco, CA", "0", "false"},
                {"Cloud Solutions Architect", "Design cloud solutions for enterprise clients.", "8+ years", "Bachelor's Degree", "AWS, Azure, Cloud Architecture, Terraform", "FULLTIME", "140000", "180000", "Seattle, WA", "2", "false"}
        };
        
        int jobIndex = 0;
        for (String[] data : jobData) {
            Account employer = employers.get(jobIndex % employers.size());
            Company company = companies.get(jobIndex % companies.size());
            JobCategory category = categories.get(Integer.parseInt(data[9]));
            
            Job job = new Job();
            job.setEmployerId(employer.getId());
            job.setCompanyId(company.getId());
            job.setTitle(data[0]);
            job.setDescription(data[1]);
            job.setCategoryId(category.getId());
            job.setLocation(data[8]);
            job.setType(Job.JobType.valueOf(data[5]));
            job.setExperience(data[2]);
            job.setEducation(data[3]);
            job.setSkills(data[4]);
            job.setMinSalary(Integer.parseInt(data[6]));
            job.setMaxSalary(Integer.parseInt(data[7]));
            job.setIsUrgent(Boolean.parseBoolean(data[10]));
            job.setStatus(Job.JobStatus.ACTIVE);
            job.setExpiresAt(LocalDateTime.now().plusDays(60));
            
            jobs.add(jobRepository.save(job));
            jobIndex++;
        }
        
        return jobs;
    }

    private void seedApplications(List<Account> candidates, List<Job> jobs, List<CandidateProfile> profiles, List<CandidateCV> cvs) {
        log.info("Seeding applications...");
        
        int applicationCount = 0;
        for (int i = 0; i < candidates.size() && i < profiles.size(); i++) {
            // Each candidate applies to 2-4 random jobs
            int applicationsPerCandidate = 2 + (i % 3);
            
            for (int j = 0; j < applicationsPerCandidate && j < jobs.size(); j++) {
                Job job = jobs.get((i + j) % jobs.size());
                CandidateProfile profile = profiles.get(i);
                
                // Find a CV for this candidate (prefer default)
                CandidateCV candidateCV = cvs.stream()
                        .filter(cv -> cv.getCandidateId().equals(profile.getId()) && cv.getIsDefault())
                        .findFirst()
                        .orElseGet(() -> cvs.stream()
                                .filter(cv -> cv.getCandidateId().equals(profile.getId()))
                                .findFirst()
                                .orElse(null));
                
                if (candidateCV != null) {
                    Application application = new Application();
                    application.setJob(job);
                    application.setCandidate(profile);
                    application.setCvId(candidateCV.getId());
                    application.setCoverLetter("I am very interested in this position as it aligns with my skills and experience.");
                    application.setResumeUrl(candidateCV.getFileUrl());
                    
                    // Vary the status
                    Application.ApplicationStatus[] statuses = Application.ApplicationStatus.values();
                    int statusIndex = (i + j) % statuses.length;
                    application.setStatus(statuses[statusIndex]);
                    
                    if (statusIndex > 0) { // If not PENDING, set review time
                        application.setReviewedAt(LocalDateTime.now().minusDays(5));
                    }
                    
                    applicationRepository.save(application);
                    applicationCount++;
                }
            }
        }
        
        log.info("Created {} applications", applicationCount);
    }

    private void seedSavedJobs(List<Account> candidates, List<Job> jobs) {
        log.info("Seeding saved jobs...");
        
        int savedCount = 0;
        for (int i = 0; i < candidates.size(); i++) {
            Account candidate = candidates.get(i);
            
            // Each candidate saves 2-5 jobs
            int jobsToSave = 2 + (i % 4);
            
            for (int j = 0; j < jobsToSave && j < jobs.size(); j++) {
                Job job = jobs.get((i + j * 2) % jobs.size());
                
                SavedJob.SavedJobId savedJobId = new SavedJob.SavedJobId();
                savedJobId.setUserId(candidate.getId());
                savedJobId.setJobId(job.getId());
                
                SavedJob savedJob = new SavedJob();
                savedJob.setId(savedJobId);
                savedJob.setUser(candidate);
                savedJob.setJob(job);
                
                savedJobRepository.save(savedJob);
                savedCount++;
            }
        }
        
        log.info("Created {} saved jobs", savedCount);
    }
}

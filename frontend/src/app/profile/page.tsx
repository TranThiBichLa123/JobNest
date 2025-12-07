"use client";

import { useState, useContext, useEffect } from "react";
import Image from "next/image";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { candidateProfileApi } from "@/lib/api";
import { CandidateProfile } from "@/types/profile";

export default function CandidateProfileForm() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<CandidateProfile>({});
  
  // Form state
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [aboutMe, setAboutMe] = useState("");

  // Wait for auth to load
  useEffect(() => {
    if (!auth?.isLoading && !auth?.user) {
      router.push("/");
    }
  }, [auth, router]);

  // Load profile data
  useEffect(() => {
    if (auth?.user) {
      loadProfile();
    }
  }, [auth?.user]);

  const loadProfile = async () => {
    try {
      const data = await candidateProfileApi.getMyProfile();
      setProfile(data);
      
      // Populate form fields
      setFullName(data.fullName || auth?.user?.username || "");
      setPhoneNumber(data.phoneNumber || "");
      setDateOfBirth(data.dateOfBirth || "");
      // Convert uppercase to capitalized (MALE -> Male)
      setGender(data.gender ? data.gender.charAt(0) + data.gender.slice(1).toLowerCase() : "");
      setCurrentPosition(data.currentPosition || "");
      setYearsOfExperience(data.yearsOfExperience || "");
      setSkills(data.skills || []);
      setAboutMe(data.aboutMe || "");
    } catch (error) {
      console.error("Error loading profile:", error);
      // Initialize with default values if profile doesn't exist
      setFullName(auth?.user?.username || "");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedProfile = await candidateProfileApi.updateMyProfile({
        fullName,
        phoneNumber,
        dateOfBirth,
        gender: gender.toUpperCase(),
        currentPosition,
        yearsOfExperience,
        skills,
        aboutMe,
      });
      
      setProfile(updatedProfile);
      alert("Profile updated successfully!");
    } catch (error: any) {
      console.error("Error updating profile:", error);
      alert(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking auth
  if (auth?.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  // Don't render if not logged in
  if (!auth?.user) {
    return null;
  }

  const handleAvatarChange = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      // Show preview immediately
      setAvatar(URL.createObjectURL(file));
      
      try {
        // Upload to backend
        const result = await candidateProfileApi.uploadAvatar(file);
        
        // Update auth context with new avatar URL
        if (auth?.user) {
          auth.user.avatarUrl = `http://localhost:8080${result.avatarUrl}`;
        }
        
        console.log("Avatar uploaded:", result.message);
      } catch (error: any) {
        console.error("Error uploading avatar:", error);
        alert(error.response?.data?.message || "Failed to upload avatar");
        setAvatar(null); // Reset preview on error
      }
    }
  };

  const avatarUrl = avatar || auth.user.avatarUrl || "/images/default-avatar.png";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 mt-16 px-4 ">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">My Profile</h1>

        {/* Avatar Section */}
        <div className="flex items-center gap-6 mb-10">
          {!imageError && avatarUrl ? (
            <img
              src={avatarUrl}
              width={90}
              height={90}
              alt="avatar"
              className="w-[90px] h-[90px] rounded-full border-2 border-gray-300 dark:border-gray-600 object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-[90px] h-[90px] rounded-full border-2 border-gray-300 dark:border-gray-600 bg-cyan-700 flex items-center justify-center text-white text-2xl font-bold">
              {auth.user.username?.[0]?.toUpperCase() || 'U'}
            </div>
          )}

          <label className="cursor-pointer bg-cyan-700 text-white px-4 py-2 rounded-md hover:bg-cyan-800 transition-colors">
            Upload Avatar
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </label>
        </div>

        {/* Personal Information */}
        <SectionTitle title="Personal Information" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Input 
            label="Full Name" 
            placeholder="Enter your full name" 
            value={fullName}
            onChange={(e: any) => setFullName(e.target.value)}
          />
          <Input 
            label="Email" 
            value={auth.user.email} 
            disabled 
          />

          <Input 
            label="Phone Number" 
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e: any) => setPhoneNumber(e.target.value)}
          />

          <Input 
            label="Date of Birth" 
            type="date"
            value={dateOfBirth}
            onChange={(e: any) => setDateOfBirth(e.target.value)}
          />

          <Select
            label="Gender"
            options={["Male", "Female", "Other"]}
            value={gender}
            onChange={(e: any) => setGender(e.target.value)}
          />
        </div>

        {/* Experience */}
        <SectionTitle title="Experience" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Input 
            label="Current Position" 
            placeholder="e.g., Frontend Developer"
            value={currentPosition}
            onChange={(e: any) => setCurrentPosition(e.target.value)}
          />

          <Select
            label="Years of Experience"
            options={["0", "1", "2", "3", "4", "5+", "10+"]}
            value={yearsOfExperience}
            onChange={(e: any) => setYearsOfExperience(e.target.value)}
          />

          <TagInput 
            label="Key Skills" 
            placeholder="Add a skill…"
            tags={skills}
            setTags={setSkills}
          />
        </div>

        {/* About Me */}
        <SectionTitle title="About Me" />

        <textarea
          className="mt-3 w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-3 h-32 focus:outline-none focus:border-cyan-500"
          placeholder="Write a short introduction about yourself…"
          value={aboutMe}
          onChange={(e) => setAboutMe(e.target.value)}
        />

        {/* Submit Button */}
        <button 
          type="submit"
          disabled={loading}
          className="mt-8 w-full bg-cyan-700 text-white py-3 rounded-lg hover:bg-cyan-800 text-lg font-semibold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

/* ---------------------- Reusable Components ---------------------- */

const Input = ({ label, placeholder, type = "text", ...props }: any) => (
  <div>
    <label className="font-medium dark:text-gray-200">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="mt-1 w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-2 focus:outline-none focus:border-cyan-500"
      {...props}
    />
  </div>
);

const Select = ({ label, options = [], ...props }: any) => (
  <div>
    <label className="font-medium dark:text-gray-200">{label}</label>
    <select
      className="mt-1 w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-2 pr-8 bg-white focus:outline-none focus:border-cyan-500 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMUw2IDZMMTEgMSIgc3Ryb2tlPSIjNkI3MjgwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-[length:12px_8px] bg-[right_0.75rem_center] bg-no-repeat"
      {...props}
    >
      <option value="">Select...</option>
      {options.map((o: string) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  </div>
);

const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="text-xl font-semibold mt-10 border-b dark:border-gray-600 pb-2 dark:text-white">{title}</h2>
);

/* Tag Input Component */
const TagInput = ({ label, placeholder, tags, setTags }: any) => {
  const [input, setInput] = useState("");

  const addTag = () => {
    if (input.trim() !== "") {
      setTags([...tags, input.trim()]);
      setInput("");
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_: any, i: number) => i !== index));
  };

  return (
    <div className="col-span-2">
      <label className="font-medium dark:text-gray-200">{label}</label>

      <div className="flex items-center gap-2 mt-1 border dark:border-gray-600 rounded-md p-2 dark:bg-gray-700">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
          placeholder={placeholder}
          className="flex-1 outline-none bg-transparent dark:text-white"
        />
        <button
          type="button"
          onClick={addTag}
          className="bg-cyan-700 text-white px-3 py-1 rounded-md hover:bg-cyan-800 transition-colors"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((t: string, idx: number) => (
          <span 
            key={idx} 
            className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 rounded-full flex items-center gap-2"
          >
            {t}
            <button
              type="button"
              onClick={() => removeTag(idx)}
              className="text-cyan-600 dark:text-cyan-300 hover:text-cyan-800 dark:hover:text-cyan-100"
            >
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

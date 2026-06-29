import { useCallback, useEffect, useMemo, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../api/api";
import {
  BriefcaseBusiness,
  Building2,
  Check,
  FileText,
  Globe2,
  Lightbulb,
  Link,
  LoaderCircle,
  Plus,
  Save,
  Sparkles,
  Target,
  Trash2,
  Users,
  Wand2,
} from "lucide-react";

const businessTypes = [
  "Freelancer",
  "Agency",
  "Startup",
  "SaaS",
  "Consultant",
  "Sales Team",
  "Marketing Agency",
  "Other",
];

const companySizes = ["Just Me", "2-10", "11-50", "51-200", "200+"];
const targetCompanySizes = ["Startup", "Small Business", "Mid-size", "Enterprise"];

const targetIndustries = [
  "Healthcare",
  "Finance",
  "Education",
  "SaaS",
  "Retail",
  "Real Estate",
  "Manufacturing",
  "E-commerce",
];

const decisionMakers = [
  "Founder",
  "CEO",
  "CTO",
  "HR",
  "Recruiter",
  "Product Manager",
  "Marketing Manager",
  "Sales Director",
];

const initialBusiness = {
  name: "LeadGen AI Studio",
  type: "Startup",
  industry: "AI Software",
  website: "https://leadgenai.com",
  linkedin: "https://linkedin.com/company/leadgen-ai",
  location: "India",
  description: "We build AI-powered software for startups and sales teams.",
  mission: "Helping businesses automate repetitive outreach work using AI.",
  companySize: "2-10",
  usp: "Increase reply rates using AI-personalized outreach.",
};

const initialServices = [
  {
    name: "Android Development",
    description: "Native Android applications using Kotlin and Jetpack Compose.",
  },
  {
    name: "AI Chatbots",
    description: "Custom AI assistants for lead qualification and support.",
  },
];

const initialProblems = [
  {
    problem: "Businesses struggle with manual customer support.",
    solution: "AI chatbot automation.",
  },
  {
    problem: "Businesses need Android apps quickly.",
    solution: "We build MVPs within 30 days.",
  },
];

const initialPortfolio = [
  {
    name: "FinMate",
    description: "AI-powered expense tracker.",
    technologies: "Jetpack Compose, Firebase, ML",
  },
];

const initialTargeting = {
  industries: ["Healthcare", "SaaS"],
  companySizes: ["Startup", "Small Business"],
  decisionMakers: ["Founder", "CEO", "CTO"],
};

export default function Profile() {
  const [business, setBusiness] = useState(initialBusiness);
  const [services, setServices] = useState(initialServices);
  const [problems, setProblems] = useState(initialProblems);
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [targeting, setTargeting] = useState(initialTargeting);
  const [sourceInputs, setSourceInputs] = useState({
    pdf: null,
    companyWebsite: "",
    portfolioWebsite: "",
  });
  const [extracting, setExtracting] = useState(false);
  const [extractError, setExtractError] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saveError, setSaveError] = useState("");
  const [saved, setSaved] = useState(false);

  const businessInitials = useMemo(
    () =>
      business.name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("") || "BP",
    [business.name]
  );

  const completionScore = useMemo(() => {
    const requiredValues = [
      business.name,
      business.type,
      business.description,
      services[0]?.name,
      services[0]?.description,
      problems[0]?.problem,
      problems[0]?.solution,
      portfolio[0]?.name,
      portfolio[0]?.description,
      targeting.industries.length,
      targeting.companySizes.length,
      targeting.decisionMakers.length,
    ];

    const completed = requiredValues.filter(Boolean).length;
    return Math.round((completed / requiredValues.length) * 100);
  }, [business, services, problems, portfolio, targeting]);

  const handleBusinessChange = (event) => {
    const { name, value } = event.target;
    setBusiness((current) => ({
      ...current,
      [name]: value,
    }));
    setSaved(false);
  };

  const updateListItem = (setter, index, field, value) => {
    setter((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      )
    );
    setSaved(false);
  };

  const addListItem = (setter, item) => {
    setter((current) => [...current, item]);
    setSaved(false);
  };

  const removeListItem = (setter, index) => {
    setter((current) => current.filter((_, itemIndex) => itemIndex !== index));
    setSaved(false);
  };

  const toggleTargeting = (group, value) => {
    setTargeting((current) => {
      const selected = current[group];
      return {
        ...current,
        [group]: selected.includes(value)
          ? selected.filter((item) => item !== value)
          : [...selected, value],
      };
    });
    setSaved(false);
  };

  const handleReset = () => {
    setBusiness(initialBusiness);
    setServices(initialServices);
    setProblems(initialProblems);
    setPortfolio(initialPortfolio);
    setTargeting(initialTargeting);
    setSaved(false);
  };

  const applyProfile = useCallback((profile) => {
    if (profile.business) {
      setBusiness((current) => ({
        ...current,
        ...profile.business,
        website:
          profile.business.website ||
          profile.sources?.companyWebsite ||
          current.website,
      }));
    }

    if (Array.isArray(profile.services) && profile.services.length > 0) {
      setServices(profile.services);
    }

    if (profile.targeting) {
      setTargeting((current) => ({
        industries: Array.isArray(profile.targeting.industries)
          ? profile.targeting.industries
          : current.industries,
        companySizes: Array.isArray(profile.targeting.companySizes)
          ? profile.targeting.companySizes
          : current.companySizes,
        decisionMakers: Array.isArray(profile.targeting.decisionMakers)
          ? profile.targeting.decisionMakers
          : current.decisionMakers,
      }));
    }

    if (Array.isArray(profile.problems) && profile.problems.length > 0) {
      setProblems(profile.problems);
    }

    if (Array.isArray(profile.portfolio) && profile.portfolio.length > 0) {
      setPortfolio(profile.portfolio);
    }

    if (profile.sources) {
      setSourceInputs((current) => ({
        ...current,
        companyWebsite: profile.sources.companyWebsite || current.companyWebsite,
        portfolioWebsite: profile.sources.portfolioWebsite || current.portfolioWebsite,
      }));
    }
  }, []);

  useEffect(() => {
    const loadBusinessProfile = async () => {
      try {
        const response = await api.get("/business-profile");
        applyProfile(response.data.profile);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingProfile(false);
      }
    };

    loadBusinessProfile();
  }, [applyProfile]);

  const getCurrentProfilePayload = () => ({
    business,
    services,
    targeting,
    problems,
    portfolio,
    sources: {
      pdfName: sourceInputs.pdf?.name || "",
      companyWebsite: sourceInputs.companyWebsite.trim(),
      portfolioWebsite: sourceInputs.portfolioWebsite.trim(),
    },
  });

  const handleSaveProfile = async () => {
    try {
      setSaveError("");
      const response = await api.put(
        "/business-profile",
        getCurrentProfilePayload()
      );
      applyProfile(response.data.profile);
      setSaved(true);
    } catch (error) {
      setSaveError(
        error.response?.data?.message ||
          "Could not save profile. Check the backend database connection."
      );
    }
  };

  const handleExtractProfile = async () => {
    const hasSource =
      sourceInputs.pdf ||
      sourceInputs.companyWebsite.trim() ||
      sourceInputs.portfolioWebsite.trim();

    if (!hasSource) {
      setExtractError("Upload a PDF or add a company/portfolio website URL.");
      return;
    }

    try {
      setExtracting(true);
      setExtractError("");

      const formData = new FormData();

      if (sourceInputs.pdf) {
        formData.append("pdf", sourceInputs.pdf);
      }

      formData.append("companyWebsite", sourceInputs.companyWebsite.trim());
      formData.append("portfolioWebsite", sourceInputs.portfolioWebsite.trim());

      const response = await api.post("/upload/business-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      applyProfile(response.data.profile);
      setSaved(true);
    } catch (error) {
      setExtractError(
        error.response?.data?.message ||
          "Could not extract profile. Check the backend, Gemini key, and URLs."
      );
    } finally {
      setExtracting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {loadingProfile && (
          <div className="rounded-2xl bg-indigo-50 px-5 py-4 font-semibold text-indigo-700">
            Loading saved business profile...
          </div>
        )}

        <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 p-8 text-white shadow-2xl">
          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-white text-3xl font-black text-indigo-700 shadow-xl">
                {businessInitials}
              </div>

              <div>
                <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-medium text-violet-100">
                  <Sparkles size={15} />
                  Business Profile
                </p>

                <h1 className="text-4xl font-black tracking-tight md:text-5xl">
                  {business.name || "Your Business"}
                </h1>

                <p className="mt-3 max-w-3xl text-lg text-violet-100">
                  Give the outreach AI a clear picture of what you sell, who
                  you serve, and why prospects should reply.
                </p>
              </div>
            </div>

            <div className="w-full rounded-3xl bg-white/15 p-5 backdrop-blur sm:w-72">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-violet-100">
                  Profile readiness
                </span>
                <span className="text-2xl font-black">
                  {completionScore}%
                </span>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-white"
                  style={{ width: `${completionScore}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-6">
            <ProfileSection
              icon={Wand2}
              title="Auto Extract Business Profile"
              description="Upload a PDF or add website links, then let AI fill the outreach profile."
              important
            >
              <div className="grid gap-5 lg:grid-cols-3">
                <label className="rounded-3xl border border-dashed border-indigo-300 bg-indigo-50/60 p-5 transition hover:bg-indigo-50">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-sm">
                      <FileText size={21} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">
                        Upload PDF
                      </p>
                      <p className="text-sm text-gray-500">
                        Company deck, brochure, resume, or portfolio PDF
                      </p>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(event) =>
                      setSourceInputs((current) => ({
                        ...current,
                        pdf: event.target.files?.[0] || null,
                      }))
                    }
                    className="mt-5 block w-full text-sm text-gray-600 file:mr-4 file:rounded-xl file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:font-semibold file:text-white"
                  />
                  {sourceInputs.pdf && (
                    <p className="mt-3 text-sm font-medium text-indigo-700">
                      {sourceInputs.pdf.name}
                    </p>
                  )}
                </label>

                <SourceUrlField
                  icon={Globe2}
                  label="Company Website"
                  placeholder="https://company.com"
                  value={sourceInputs.companyWebsite}
                  onChange={(value) =>
                    setSourceInputs((current) => ({
                      ...current,
                      companyWebsite: value,
                    }))
                  }
                />

                <SourceUrlField
                  icon={Link}
                  label="Portfolio Website"
                  placeholder="https://yourportfolio.com"
                  value={sourceInputs.portfolioWebsite}
                  onChange={(value) =>
                    setSourceInputs((current) => ({
                      ...current,
                      portfolioWebsite: value,
                    }))
                  }
                />
              </div>

              {extractError && (
                <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {extractError}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleExtractProfile}
                  disabled={extracting}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {extracting ? (
                    <LoaderCircle size={18} className="animate-spin" />
                  ) : (
                    <Sparkles size={18} />
                  )}
                  {extracting ? "Extracting..." : "Extract Info"}
                </button>
                <p className="text-sm text-gray-500">
                  Extracted fields are saved automatically and stay editable.
                </p>
              </div>
            </ProfileSection>

            <ProfileSection
              icon={Building2}
              title="1. Basic Information"
              description="These fields identify the business for campaigns and AI personalization."
            >
              <div className="grid gap-5 md:grid-cols-2">
                <TextField
                  label="Business Name"
                  name="name"
                  value={business.name}
                  onChange={handleBusinessChange}
                  required
                />
                <SelectField
                  label="Business Type"
                  name="type"
                  value={business.type}
                  onChange={handleBusinessChange}
                  options={businessTypes}
                  required
                />
                <TextField
                  label="Industry"
                  name="industry"
                  value={business.industry}
                  onChange={handleBusinessChange}
                />
                <TextField
                  label="Website"
                  name="website"
                  value={business.website}
                  onChange={handleBusinessChange}
                />
                <TextField
                  label="LinkedIn"
                  name="linkedin"
                  value={business.linkedin}
                  onChange={handleBusinessChange}
                />
                <TextField
                  label="Location"
                  name="location"
                  value={business.location}
                  onChange={handleBusinessChange}
                />
              </div>
            </ProfileSection>

            <ProfileSection
              icon={Sparkles}
              title="2. About Your Business"
              description="This gives the AI the core context it needs before writing outreach."
              important
            >
              <TextAreaField
                label="Company Description"
                name="description"
                value={business.description}
                onChange={handleBusinessChange}
                placeholder="We build AI-powered software for healthcare startups."
                required
              />
              <TextAreaField
                label="Mission"
                name="mission"
                value={business.mission}
                onChange={handleBusinessChange}
                placeholder="Helping startups automate repetitive work using AI."
              />
              <SelectField
                label="Company Size"
                name="companySize"
                value={business.companySize}
                onChange={handleBusinessChange}
                options={companySizes}
              />
            </ProfileSection>

            <ProfileSection
              icon={BriefcaseBusiness}
              title="3. Services / Products"
              description="Add the offers the AI should mention in lead research and outreach."
              important
            >
              <div className="space-y-4">
                {services.map((service, index) => (
                  <RepeatableCard
                    key={`service-${index}`}
                    title={`Service ${index + 1}`}
                    onRemove={
                      services.length > 1
                        ? () => removeListItem(setServices, index)
                        : null
                    }
                  >
                    <TextField
                      label="Service Name"
                      value={service.name}
                      onChange={(event) =>
                        updateListItem(
                          setServices,
                          index,
                          "name",
                          event.target.value
                        )
                      }
                      placeholder="Android Development"
                    />
                    <TextAreaField
                      label="Description"
                      value={service.description}
                      onChange={(event) =>
                        updateListItem(
                          setServices,
                          index,
                          "description",
                          event.target.value
                        )
                      }
                      placeholder="Native Android applications using Kotlin and Jetpack Compose."
                    />
                  </RepeatableCard>
                ))}

                <AddButton
                  label="Add Service"
                  onClick={() =>
                    addListItem(setServices, {
                      name: "",
                      description: "",
                    })
                  }
                />
              </div>
            </ProfileSection>

            <ProfileSection
              icon={Target}
              title="4. Target Audience"
              description="Define the prospects your campaigns should prioritize."
              important
            >
              <ChipGroup
                label="Industry"
                options={targetIndustries}
                selected={targeting.industries}
                onToggle={(value) => toggleTargeting("industries", value)}
              />
              <ChipGroup
                label="Company Size"
                options={targetCompanySizes}
                selected={targeting.companySizes}
                onToggle={(value) => toggleTargeting("companySizes", value)}
              />
              <ChipGroup
                label="Target Decision Makers"
                options={decisionMakers}
                selected={targeting.decisionMakers}
                onToggle={(value) => toggleTargeting("decisionMakers", value)}
              />
            </ProfileSection>

            <ProfileSection
              icon={Lightbulb}
              title="5. Problems You Solve"
              description="Map prospect pain points to the solution your outreach should pitch."
              important
            >
              <div className="space-y-4">
                {problems.map((item, index) => (
                  <RepeatableCard
                    key={`problem-${index}`}
                    title={`Problem ${index + 1}`}
                    onRemove={
                      problems.length > 1
                        ? () => removeListItem(setProblems, index)
                        : null
                    }
                  >
                    <TextAreaField
                      label="Problem"
                      value={item.problem}
                      onChange={(event) =>
                        updateListItem(
                          setProblems,
                          index,
                          "problem",
                          event.target.value
                        )
                      }
                      placeholder="Businesses struggle with manual customer support."
                    />
                    <TextAreaField
                      label="Solution"
                      value={item.solution}
                      onChange={(event) =>
                        updateListItem(
                          setProblems,
                          index,
                          "solution",
                          event.target.value
                        )
                      }
                      placeholder="AI chatbot automation."
                    />
                  </RepeatableCard>
                ))}

                <AddButton
                  label="Add Problem"
                  onClick={() =>
                    addListItem(setProblems, {
                      problem: "",
                      solution: "",
                    })
                  }
                />
              </div>
            </ProfileSection>

            <ProfileSection
              icon={Wand2}
              title="6. Unique Selling Proposition"
              description="The short reason a prospect should choose your business."
            >
              <TextAreaField
                label="USP"
                name="usp"
                value={business.usp}
                onChange={handleBusinessChange}
                placeholder="Launch MVPs in under 30 days."
              />
            </ProfileSection>

            <ProfileSection
              icon={Globe2}
              title="7. Portfolio"
              description="Add proof points the AI can reference in relevant messages."
              important
            >
              <div className="space-y-4">
                {portfolio.map((project, index) => (
                  <RepeatableCard
                    key={`project-${index}`}
                    title={`Project ${index + 1}`}
                    onRemove={
                      portfolio.length > 1
                        ? () => removeListItem(setPortfolio, index)
                        : null
                    }
                  >
                    <TextField
                      label="Project Name"
                      value={project.name}
                      onChange={(event) =>
                        updateListItem(
                          setPortfolio,
                          index,
                          "name",
                          event.target.value
                        )
                      }
                      placeholder="FinMate"
                    />
                    <TextAreaField
                      label="Description"
                      value={project.description}
                      onChange={(event) =>
                        updateListItem(
                          setPortfolio,
                          index,
                          "description",
                          event.target.value
                        )
                      }
                      placeholder="AI-powered expense tracker."
                    />
                    <TextField
                      label="Technologies"
                      value={project.technologies}
                      onChange={(event) =>
                        updateListItem(
                          setPortfolio,
                          index,
                          "technologies",
                          event.target.value
                        )
                      }
                      placeholder="Jetpack Compose, Firebase, ML"
                    />
                  </RepeatableCard>
                ))}

                <AddButton
                  label="Add Project"
                  onClick={() =>
                    addListItem(setPortfolio, {
                      name: "",
                      description: "",
                      technologies: "",
                    })
                  }
                />
              </div>
            </ProfileSection>
          </div>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    AI Context Summary
                  </h2>
                  <p className="text-sm text-gray-500">
                    Used by outreach generation.
                  </p>
                </div>
                <Sparkles className="text-indigo-600" size={24} />
              </div>

              <div className="mt-5 space-y-4">
                <SummaryItem label="Business Type" value={business.type} />
                <SummaryItem label="Industry" value={business.industry} />
                <SummaryItem label="Company Size" value={business.companySize} />
                <SummaryItem label="Primary Offer" value={services[0]?.name} />
                <SummaryItem
                  label="Target Buyers"
                  value={targeting.decisionMakers.join(", ")}
                />
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">
                Selected Targeting
              </h2>

              <div className="mt-5 space-y-5">
                <MiniChipList label="Industries" items={targeting.industries} />
                <MiniChipList
                  label="Company Sizes"
                  items={targeting.companySizes}
                />
                <MiniChipList
                  label="Decision Makers"
                  items={targeting.decisionMakers}
                />
              </div>
            </section>

            <section className="sticky top-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Users className="text-indigo-600" size={24} />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Save Profile
                  </h2>
                  <p className="text-sm text-gray-500">
                    Keep this business context ready for campaigns.
                  </p>
                </div>
              </div>

              {saved && (
                <div className="mt-5 flex items-center gap-2 rounded-2xl bg-green-100 px-4 py-3 text-sm font-semibold text-green-700">
                  <Check size={17} />
                  Business profile saved
                </div>
              )}

              {saveError && (
                <div className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {saveError}
                </div>
              )}

              <div className="mt-5 space-y-3">
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 font-semibold text-white transition hover:opacity-90"
                >
                  <Save size={18} />
                  Save Business Profile
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full rounded-2xl bg-gray-100 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-200"
                >
                  Reset Demo Data
                </button>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
}

function ProfileSection({ icon: Icon, title, description, important, children }) {
  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <Icon size={22} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">
                {title}
              </h2>
              {important && (
                <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
                  High AI impact
                </span>
              )}
            </div>
            <p className="mt-1 text-gray-500">
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {children}
      </div>
    </section>
  );
}

function SourceUrlField({ icon: Icon, label, placeholder, value, onChange }) {
  return (
    <label className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <Icon size={21} />
        </div>
        <div>
          <p className="font-bold text-gray-900">
            {label}
          </p>
          <p className="text-sm text-gray-500">
            Paste a public URL
          </p>
        </div>
      </div>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-5 w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
      />
    </label>
  );
}

function TextField({
  label,
  value,
  onChange,
  name,
  placeholder,
  required = false,
}) {
  return (
    <label>
      <span className="text-sm font-medium text-gray-600">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  name,
  placeholder,
  required = false,
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-600">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        placeholder={placeholder}
        className="mt-2 w-full resize-none rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
      />
    </label>
  );
}

function SelectField({ label, name, value, onChange, options, required = false }) {
  return (
    <label>
      <span className="text-sm font-medium text-gray-600">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function ChipGroup({ label, options, selected, onToggle }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-600">
        {label}
      </p>
      <div className="mt-3 flex flex-wrap gap-3">
        {options.map((option) => {
          const isSelected = selected.includes(option);

          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                isSelected
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-indigo-300 hover:bg-indigo-50"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RepeatableCard({ title, onRemove, children }) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-slate-50 p-5">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="font-bold text-gray-900">
          {title}
        </h3>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-red-500 transition hover:bg-red-50"
            aria-label={`Remove ${title}`}
          >
            <Trash2 size={17} />
          </button>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {children}
      </div>
    </div>
  );
}

function AddButton({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-2xl border border-dashed border-indigo-300 px-5 py-3 font-semibold text-indigo-700 transition hover:bg-indigo-50"
    >
      <Plus size={18} />
      {label}
    </button>
  );
}

function SummaryItem({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-4 py-3">
      <p className="text-xs font-semibold uppercase text-gray-400">
        {label}
      </p>
      <p className="mt-1 font-semibold text-gray-900">
        {value || "Not added"}
      </p>
    </div>
  );
}

function MiniChipList({ label, items }) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-gray-500">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.length > 0 ? (
          items.map((item) => (
            <span
              key={item}
              className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700"
            >
              {item}
            </span>
          ))
        ) : (
          <span className="text-sm text-gray-400">
            None selected
          </span>
        )}
      </div>
    </div>
  );
}

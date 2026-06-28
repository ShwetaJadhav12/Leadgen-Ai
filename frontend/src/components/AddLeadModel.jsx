import { useState } from "react";
import { uploadLeadPDF , saveLead,} from "../services/leadService";

import {
    Upload,
    Link2,
    UserPlus,
    X,
    FileText,
    ArrowRight,
} from "lucide-react";


export default function AddLeadModal({ open, onClose, onLeadSaved }) {
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [linkedInUrl, setLinkedInUrl] = useState("");
const [loading, setLoading] = useState(false);
const [leadData, setLeadData] = useState(null);

const [error, setError] = useState("");


    if (!open) return null;
    
const handleContinue = async () => {
  if (!selectedFile) {
    alert("Please select a LinkedIn PDF.");
    return;
  }

  try {
    setLoading(true);
    setError("");

    const response = await uploadLeadPDF(selectedFile);

    console.log("AI Response:", response);

    setLeadData(response.lead);

  } catch (err) {
    console.error(err);
    setError("Failed to analyze the PDF.");
  } finally {
    setLoading(false);
  }
};
const handleSaveLead = async () => {
  try {
    setLoading(true);

    await saveLead(leadData);

await onLeadSaved();

alert("Lead Saved Successfully!");

onClose();

    

  } catch (error) {
    console.error(error);
    alert("Failed to save lead.");
  } finally {
    setLoading(false);
  }
};

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">

            <div className="bg-white rounded-[32px] w-full max-w-3xl shadow-2xl p-8 relative animate-in fade-in zoom-in duration-300">

                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 p-2 rounded-xl hover:bg-gray-100"
                >
                    <X size={22} />
                </button>

                <h2 className="text-4xl font-bold">
                    Add New Lead
                </h2>

                <p className="text-gray-500 mt-2 mb-8">
                    Choose how you would like to import your lead.
                </p>

                <div className="grid md:grid-cols-3 gap-6">

                    {/* Upload PDF */}

                    <button
                        onClick={() => setSelectedOption("pdf")}
                        className={`rounded-3xl border-2 p-8 transition-all hover:scale-[1.02]
            ${selectedOption === "pdf"
                                ? "border-violet-600 bg-violet-50"
                                : "border-gray-200"
                            }`}
                    >
                        <Upload
                            size={42}
                            className="mx-auto text-violet-600"
                        />

                        <h3 className="font-bold mt-5">
                            Upload PDF
                        </h3>

                        <p className="text-sm text-gray-500 mt-2">
                            Import LinkedIn Profile PDF
                        </p>

                    </button>

                    {/* LinkedIn */}

                    <button
                        onClick={() => setSelectedOption("url")}
                        className={`rounded-3xl border-2 p-8 transition-all hover:scale-[1.02]
            ${selectedOption === "url"
                                ? "border-violet-600 bg-violet-50"
                                : "border-gray-200"
                            }`}
                    >
                        <Link2
                            size={42}
                            className="mx-auto text-violet-600"
                        />

                        <h3 className="font-bold mt-5">
                            LinkedIn URL
                        </h3>

                        <p className="text-sm text-gray-500 mt-2">
                            Paste profile URL
                        </p>

                    </button>

                    {/* Manual */}

                    <button
                        onClick={() => setSelectedOption("manual")}
                        className={`rounded-3xl border-2 p-8 transition-all hover:scale-[1.02]
            ${selectedOption === "manual"
                                ? "border-violet-600 bg-violet-50"
                                : "border-gray-200"
                            }`}
                    >
                        <UserPlus
                            size={42}
                            className="mx-auto text-violet-600"
                        />

                        <h3 className="font-bold mt-5">
                            Manual Entry
                        </h3>

                        <p className="text-sm text-gray-500 mt-2">
                            Enter details manually
                        </p>

                    </button>

                </div>

                {selectedOption === "pdf" && (

                    <div className="mt-8 rounded-3xl border-2 border-dashed border-violet-300 bg-violet-50 p-10 text-center">

                        <FileText
                            size={60}
                            className="mx-auto text-violet-600"
                        />

                        <h3 className="text-xl font-semibold mt-4">
                            Upload LinkedIn Profile PDF
                        </h3>

                        <p className="text-gray-500 mt-2">
                            Drag & Drop your PDF or browse files
                        </p>

                        <input
                            type="file"
                            accept=".pdf"
                            id="pdfUpload"
                            className="hidden"
                            onChange={(e) => {
                                setSelectedFile(e.target.files[0]);
                            }}
                        />

                        <label
                            htmlFor="pdfUpload"
                            className="
                inline-flex
                mt-6
                px-6
                py-3
                rounded-xl
                bg-gradient-to-r
                from-violet-600
                to-indigo-600
                text-white
                cursor-pointer
                hover:scale-105
                transition
              "
                        >
                            Browse Files
                        </label>
                        {selectedFile && (
  <div className="mt-6 bg-green-50 border border-green-200 rounded-2xl p-4">

    <p className="text-green-700 font-semibold">
      ✓ File Selected
    </p>

    <p className="text-gray-600 mt-1">
      {selectedFile.name}
    </p>

    <p className="text-xs text-gray-500 mt-2">
      Ready for AI analysis
    </p>

  </div>
)}

                    </div>

                )}

                {selectedOption === "url" && (

                    <div className="mt-8">

                       <input
    value={linkedInUrl}
    onChange={(e) => setLinkedInUrl(e.target.value)}
    placeholder="https://linkedin.com/in/john-smith"
    className="w-full border rounded-2xl p-4 outline-none focus:ring-2 focus:ring-violet-500"
/>

                    </div>

                )}

                {selectedOption === "manual" && (

                    <div className="mt-8 grid md:grid-cols-2 gap-4">

                        <input
                            placeholder="Full Name"
                            className="border rounded-xl p-3"
                        />

                        <input
                            placeholder="Role"
                            className="border rounded-xl p-3"
                        />

                        <input
                            placeholder="Company"
                            className="border rounded-xl p-3"
                        />

                        <input
                            placeholder="Industry"
                            className="border rounded-xl p-3"
                        />

                    </div>

                )}
                {leadData && (

<div className="mt-8 bg-white border rounded-3xl p-6 shadow">

<h2 className="text-2xl font-bold">
{leadData.name}
</h2>

<p className="text-gray-500 mt-1">
{leadData.role}
</p>

<p className="mt-2">
🏢 {leadData.company}
</p>

<p className="mt-2">
📍 {leadData.location}
</p>

</div>

)}

                <div className="flex justify-end mt-8">

    {!leadData ? (

<button
    onClick={handleContinue}
    disabled={loading}
    className="..."
>
    {loading ? "Analyzing..." : "Continue"}
</button>

) : (

<button
    onClick={handleSaveLead}
    className="
        bg-gradient-to-r
        from-green-500
        to-emerald-600
        text-white
        px-6
        py-3
        rounded-2xl
    "
>
    Save Lead
</button>

)}

                </div>

            </div>

        </div>
    );
}
import api from "../api/api";

export const uploadLeadPDF = async (file) => {
  const formData = new FormData();

  formData.append("pdf", file);

  const response = await api.post(
    "/upload/pdf",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
export const getLeads = async () => {
  const response = await api.get("/leads");
  return response.data;
};
export const saveLead = async (lead) => {
  const response = await api.post("/leads", lead);
  return response.data;
};
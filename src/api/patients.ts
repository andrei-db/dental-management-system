import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const addPatient = (patient: {
  name: string;
  email: string;
  phone: string;
}) => API.post("/patients", patient);

export const getAllPatients = () => API.get("/patients");

export const deletePatient = (id: string) => API.delete(`/patients/${id}`);

export const updatePatient = (id: string, patient: {
  name: string;
  email: string;
  phone: string;
}) => API.put(`/patients/${id}`, patient);

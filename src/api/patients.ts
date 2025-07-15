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

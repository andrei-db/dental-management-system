import { Navigate } from "react-router-dom";
import type{ ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PublicRoute({ children }: Props) {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/dashboard" /> : <>{children}</>;
}

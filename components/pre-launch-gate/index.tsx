import React from "react";
import { canAccessPrelaunched } from "./actions";
import { PrelaunchedGateForm } from "./form";

const PreLaunchGate = async ({ children }: { children: React.ReactNode }) => {
  const isAllowed = await canAccessPrelaunched();
  return (
    <PrelaunchedGateForm isAllowed={isAllowed}>{children}</PrelaunchedGateForm>
  );
};

export default PreLaunchGate;

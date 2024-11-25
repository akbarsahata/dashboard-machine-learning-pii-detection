"use server";

import { cookies } from "next/headers";

export async function canAccessPrelaunched() {
  const cookieStore = await cookies();
  const savedPin = cookieStore.get(process.env.PRE_LAUNCH_KEY || "prelaunch")?.value;
  return savedPin === process.env.PRE_LAUNCH_PASSWORD;
}

export async function verifyPrelaunchedCode(password: string) {
  const cookieStore = await cookies();
  if (password === process.env.PRE_LAUNCH_PASSWORD) {
    cookieStore.set(process.env.PRE_LAUNCH_KEY || "prelaunch", password);
    return true;
  }
  return false;
}

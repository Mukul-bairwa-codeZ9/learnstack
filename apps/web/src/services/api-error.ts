import type { ApiError } from "@/types/api";

export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong",
): string {
  if (!error) {
    return fallback;
  }

  const apiError = error as Partial<ApiError>;

  if (typeof apiError.message === "string" && apiError.message.trim()) {
    return apiError.message;
  }

  return fallback;
}
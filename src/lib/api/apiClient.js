// /src/lib/api/apiClient.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export async function fetcher(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  // Skip Content-Type header for FormData (file uploads)
  const isFormData = options.body instanceof FormData;
  const headers = {
    ...(!isFormData && { "Content-Type": "application/json" }),
    ...options?.headers,
  };

  // Add request timeout
  const timeout = 8000; // 8 seconds
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      credentials: "include",
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      // Try to parse error as JSON, fallback to text if fails
      const error = await response.json().catch(async () => ({
        message: (await response.text()) || response.statusText,
      }));
      throw {
        message: error.message || "An error occurred",
        status: response.status,
        code: error.code || "UNKNOWN_ERROR",
      };
    }

    // Handle different response types
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      return response.json();
    } else if (
      contentType?.includes("application/octet-stream") ||
      contentType?.includes("application/pdf") ||
      contentType?.match(/^image\//)
    ) {
      return response.blob();
    }
    return response.text();
  } catch (error) {
    clearTimeout(timeoutId);
    console.error("API Client Error:", error);

    // Handle specific error cases
    let errorMessage = "Network error";
    let errorStatus = 500;
    let errorCode = "NETWORK_ERROR";

    if (error.name === "AbortError") {
      errorMessage = "Request timeout";
      errorCode = "TIMEOUT_ERROR";
    } else if (error.message?.includes("Failed to fetch")) {
      errorMessage = "Network connection failed";
      errorCode = "CONNECTION_ERROR";
    } else if (error.message) {
      errorMessage = error.message;
    }

    throw {
      message: errorMessage,
      status: error.status || errorStatus,
      code: error.code || errorCode,
    };
  }
}

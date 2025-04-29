// /src/lib/api/apiClient.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export async function fetcher<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw {
            message: error.message || 'An error occurred',
            status: response.status,
            code: error.code || 'UNKNOWN_ERROR',
        };
    }

    return response.json();
}

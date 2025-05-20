"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function useQueryState(key, defaultValue) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current value from URL
  const currentValue = searchParams.get(key) || defaultValue;
  const [value, setValue] = useState(currentValue);

  // Sync with URL changes
  useEffect(() => {
    const newValue = searchParams.get(key) || defaultValue;
    if (newValue !== value) {
      setValue(newValue);
    }
  }, [searchParams, key]);

  // Update both state and URL
  const updateValue = useCallback(
    (newValue) => {
      setValue(newValue);
      const params = new URLSearchParams(searchParams.toString());

      if (newValue === defaultValue) {
        params.delete(key);
      } else {
        params.set(key, newValue);
      }

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [key, defaultValue, pathname, router, searchParams]
  );

  return [value, updateValue];
}

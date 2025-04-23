// AttendanceTrendChart.jsx
// In a real implementation, use a library like recharts
import React from "react";

export function AttendanceTrendChart({ data }) {
  return (
    <div className="h-64 relative">
      {/* This is a simple placeholder - in a real app use recharts or similar */}
      <div className="flex items-end h-full justify-between gap-2">
        {data.map((item, i) => {
          const total = item.present + item.absent + item.late;
          const percent = total > 0 ? (item.present / total) * 100 : 0;

          return (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-green-500 rounded-t"
                style={{ height: `${percent * 0.6}%` }}
              ></div>
              <div className="text-xs mt-2">
                {new Date(item.date).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

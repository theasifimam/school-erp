"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    subject: "Math",
    A: 90,
    fullMark: 100,
  },
  {
    subject: "Science",
    A: 85,
    fullMark: 100,
  },
  {
    subject: "Writing",
    A: 78,
    fullMark: 100,
  },
  {
    subject: "Teamwork",
    A: 92,
    fullMark: 100,
  },
  {
    subject: "Creativity",
    A: 88,
    fullMark: 100,
  },
  {
    subject: "Leadership",
    A: 76,
    fullMark: 100,
  },
];

export default function SkillsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills Radar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Skills"
                dataKey="A"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

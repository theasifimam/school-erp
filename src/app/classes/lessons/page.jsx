"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, Edit, Trash2 } from "lucide-react";

export default function LessonPlansPage() {
  // Sample lesson plans data
  const lessonPlans = [
    {
      id: "lp-1",
      title: "Introduction to Algebra",
      subject: "Mathematics",
      class: "Class 5-E",
      date: "May 18, 2025",
      status: "Approved",
    },
    {
      id: "lp-2",
      title: "Cell Structure and Function",
      subject: "Science",
      class: "Class 4-D",
      date: "May 20, 2025",
      status: "Draft",
    },
    {
      id: "lp-3",
      title: "Shakespeare's Sonnets",
      subject: "English",
      class: "Class 3-C",
      date: "May 17, 2025",
      status: "Pending Review",
    },
    {
      id: "lp-4",
      title: "World War II Overview",
      subject: "History",
      class: "Class 2-B",
      date: "May 19, 2025",
      status: "Approved",
    },
    {
      id: "lp-5",
      title: "Introduction to Python",
      subject: "Computer Science",
      class: "Class 1-A",
      date: "May 21, 2025",
      status: "Draft",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "Draft":
        return <Badge className="bg-gray-500">Draft</Badge>;
      case "Pending Review":
        return <Badge className="bg-yellow-500">Pending Review</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Lesson Plans</CardTitle>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                className="pl-8 w-64"
                placeholder="Search lesson plans..."
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending Review</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Plan
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/4">Title</TableHead>
              <TableHead className="w-1/6">Subject</TableHead>
              <TableHead className="w-1/6">Class</TableHead>
              <TableHead className="w-1/6">Date</TableHead>
              <TableHead className="w-1/6">Status</TableHead>
              <TableHead className="w-1/6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lessonPlans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell className="font-medium">{plan.title}</TableCell>
                <TableCell>{plan.subject}</TableCell>
                <TableCell>{plan.class}</TableCell>
                <TableCell>{plan.date}</TableCell>
                <TableCell>{getStatusBadge(plan.status)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

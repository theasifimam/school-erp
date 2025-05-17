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
import { Search, Plus, Edit, Trash2 } from "lucide-react";

export default function SubjectsPage() {
  // Sample subjects data
  const subjects = [
    {
      id: "sub-1",
      name: "Mathematics",
      classes: 5,
      teachers: 3,
      curriculum: "Standard",
    },
    {
      id: "sub-2",
      name: "Science",
      classes: 5,
      teachers: 2,
      curriculum: "Enhanced",
    },
    {
      id: "sub-3",
      name: "English",
      classes: 5,
      teachers: 4,
      curriculum: "Standard",
    },
    {
      id: "sub-4",
      name: "History",
      classes: 4,
      teachers: 2,
      curriculum: "Standard",
    },
    {
      id: "sub-5",
      name: "Computer Science",
      classes: 3,
      teachers: 1,
      curriculum: "Advanced",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>All Subjects</CardTitle>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input className="pl-8 w-64" placeholder="Search subjects..." />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Subject
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/4">Subject Name</TableHead>
              <TableHead className="w-1/5">Classes</TableHead>
              <TableHead className="w-1/5">Teachers</TableHead>
              <TableHead className="w-1/5">Curriculum Type</TableHead>
              <TableHead className="w-1/5">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjects.map((subject) => (
              <TableRow key={subject.id}>
                <TableCell className="font-medium">{subject.name}</TableCell>
                <TableCell>{subject.classes}</TableCell>
                <TableCell>{subject.teachers}</TableCell>
                <TableCell>{subject.curriculum}</TableCell>
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

"use client";

import React, { useState, useEffect } from "react";
import {
  Bell,
  Search,
  ChevronDown,
  ArrowUpDown,
  MoreHorizontal,
  X,
  ChevronUp,
  Download,
  Filter,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FacultyPerformance() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedFaculty, setSelectedFaculty] = useState(1);
  const [selectedMetric, setSelectedMetric] = useState("teaching");
  const [toast, setToast] = useState(null);

  // Custom toast notification implementation
  const showNotification = (message) => {
    setToast({ message, id: Date.now() });

    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Sample faculty data
  const facultyData = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      department: "Computer Science",
      rating: 4.8,
      classes: 4,
      publications: 12,
      reviews: 156,
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      department: "Mathematics",
      rating: 4.5,
      classes: 3,
      publications: 8,
      reviews: 112,
    },
    {
      id: 3,
      name: "Dr. Robert Williams",
      department: "Physics",
      rating: 4.7,
      classes: 5,
      publications: 15,
      reviews: 143,
    },
    {
      id: 4,
      name: "Prof. Emily Taylor",
      department: "Chemistry",
      rating: 4.3,
      classes: 4,
      publications: 6,
      reviews: 98,
    },
    {
      id: 5,
      name: "Dr. James Wilson",
      department: "Biology",
      rating: 4.6,
      classes: 3,
      publications: 10,
      reviews: 121,
    },
  ];

  // Performance metrics data
  const performanceData = [
    {
      facultyId: 1,
      teaching: {
        courseEvaluation: 4.9,
        studentSatisfaction: 95,
        attendanceRate: 92,
        courseCompletion: 98,
        quarterlyTrend: [4.7, 4.8, 4.8, 4.9],
      },
      research: {
        publicationsCount: 12,
        citationIndex: 87,
        researchGrants: 3,
        conferenceParticipation: 5,
        quarterlyTrend: [2, 3, 3, 4],
      },
      service: {
        committeesServed: 4,
        mentorship: 7,
        communityEvents: 5,
        peerReviews: 14,
        quarterlyTrend: [8, 10, 12, 14],
      },
    },
    {
      facultyId: 2,
      teaching: {
        courseEvaluation: 4.6,
        studentSatisfaction: 88,
        attendanceRate: 90,
        courseCompletion: 95,
        quarterlyTrend: [4.5, 4.5, 4.6, 4.6],
      },
      research: {
        publicationsCount: 8,
        citationIndex: 62,
        researchGrants: 2,
        conferenceParticipation: 3,
        quarterlyTrend: [1, 2, 2, 3],
      },
      service: {
        committeesServed: 3,
        mentorship: 5,
        communityEvents: 3,
        peerReviews: 9,
        quarterlyTrend: [7, 8, 8, 9],
      },
    },
    {
      facultyId: 3,
      teaching: {
        courseEvaluation: 4.7,
        studentSatisfaction: 91,
        attendanceRate: 89,
        courseCompletion: 97,
        quarterlyTrend: [4.5, 4.6, 4.7, 4.7],
      },
      research: {
        publicationsCount: 15,
        citationIndex: 103,
        researchGrants: 4,
        conferenceParticipation: 7,
        quarterlyTrend: [3, 4, 4, 4],
      },
      service: {
        committeesServed: 5,
        mentorship: 8,
        communityEvents: 4,
        peerReviews: 16,
        quarterlyTrend: [12, 14, 15, 16],
      },
    },
    {
      facultyId: 4,
      teaching: {
        courseEvaluation: 4.3,
        studentSatisfaction: 82,
        attendanceRate: 87,
        courseCompletion: 94,
        quarterlyTrend: [4.2, 4.2, 4.3, 4.3],
      },
      research: {
        publicationsCount: 6,
        citationIndex: 45,
        researchGrants: 1,
        conferenceParticipation: 2,
        quarterlyTrend: [1, 1, 2, 2],
      },
      service: {
        committeesServed: 2,
        mentorship: 4,
        communityEvents: 3,
        peerReviews: 7,
        quarterlyTrend: [5, 6, 6, 7],
      },
    },
    {
      facultyId: 5,
      teaching: {
        courseEvaluation: 4.6,
        studentSatisfaction: 89,
        attendanceRate: 91,
        courseCompletion: 96,
        quarterlyTrend: [4.4, 4.5, 4.5, 4.6],
      },
      research: {
        publicationsCount: 10,
        citationIndex: 78,
        researchGrants: 2,
        conferenceParticipation: 4,
        quarterlyTrend: [2, 2, 3, 3],
      },
      service: {
        committeesServed: 3,
        mentorship: 6,
        communityEvents: 4,
        peerReviews: 11,
        quarterlyTrend: [8, 9, 10, 11],
      },
    },
  ];

  // Sample student review data
  const reviewsData = [
    {
      facultyId: 1,
      reviews: [
        {
          id: 1,
          rating: 5,
          comment: "Excellent teaching style and very approachable.",
          date: "Apr 10, 2025",
        },
        {
          id: 2,
          rating: 5,
          comment: "Dr. Johnson makes complex topics easy to understand.",
          date: "Apr 8, 2025",
        },
        {
          id: 3,
          rating: 4,
          comment: "Great course content, though assignments were challenging.",
          date: "Apr 5, 2025",
        },
      ],
    },
    {
      facultyId: 2,
      reviews: [
        {
          id: 1,
          rating: 4,
          comment: "Clear explanations but could use more practical examples.",
          date: "Apr 9, 2025",
        },
        {
          id: 2,
          rating: 5,
          comment: "Professor Chen is incredibly knowledgeable.",
          date: "Apr 7, 2025",
        },
        {
          id: 3,
          rating: 4,
          comment: "Fair grading and good availability during office hours.",
          date: "Apr 3, 2025",
        },
      ],
    },
    {
      facultyId: 3,
      reviews: [
        {
          id: 1,
          rating: 5,
          comment: "Dr. Williams is passionate about the subject matter.",
          date: "Apr 12, 2025",
        },
        {
          id: 2,
          rating: 5,
          comment: "Very engaging lectures with good demonstrations.",
          date: "Apr 8, 2025",
        },
        {
          id: 3,
          rating: 4,
          comment: "Challenging but rewarding course material.",
          date: "Apr 1, 2025",
        },
      ],
    },
    {
      facultyId: 4,
      reviews: [
        {
          id: 1,
          rating: 4,
          comment: "Good lectures but sometimes moves too quickly.",
          date: "Apr 11, 2025",
        },
        {
          id: 2,
          rating: 4,
          comment: "Interesting experiments and lab sessions.",
          date: "Apr 6, 2025",
        },
        {
          id: 3,
          rating: 5,
          comment: "Prof. Taylor is very helpful during office hours.",
          date: "Apr 2, 2025",
        },
      ],
    },
    {
      facultyId: 5,
      reviews: [
        {
          id: 1,
          rating: 5,
          comment: "Dr. Wilson makes biology fascinating.",
          date: "Apr 14, 2025",
        },
        {
          id: 2,
          rating: 4,
          comment: "Good course structure and organization.",
          date: "Apr 7, 2025",
        },
        {
          id: 3,
          rating: 5,
          comment: "Very responsive to student questions and needs.",
          date: "Apr 4, 2025",
        },
      ],
    },
  ];

  // Get performance data for selected faculty
  const getFacultyPerformance = (facultyId) => {
    return performanceData.find((item) => item.facultyId === facultyId);
  };

  const getFacultyReviews = (facultyId) => {
    return (
      reviewsData.find((item) => item.facultyId === facultyId)?.reviews || []
    );
  };

  // Get selected faculty data
  const selectedFacultyData = facultyData.find(
    (faculty) => faculty.id === selectedFaculty
  );
  const selectedFacultyPerformance = getFacultyPerformance(selectedFaculty);
  const selectedFacultyReviews = getFacultyReviews(selectedFaculty);

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      {/* Toast notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-black text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 animate-fade-in">
          <span>{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="p-1 hover:bg-gray-700 rounded-full"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold">Faculty Performance Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search faculty..."
                className="pl-8 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <button
              onClick={() => showNotification("Notifications checked")}
              className="p-2 rounded-full hover:bg-gray-200"
            >
              <Bell size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-6">
        {/* Performance Alert */}
        <Alert className="mb-6 rounded-xl border border-gray-300 bg-gray-100">
          <AlertTitle className="text-lg font-semibold">
            Performance Review Period
          </AlertTitle>
          <AlertDescription>
            Annual faculty performance reviews are currently in progress.
            Deadline for submissions: May 15, 2025.
          </AlertDescription>
        </Alert>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            { title: "Faculty Members", value: "87", change: "+4" },
            { title: "Average Rating", value: "4.6", change: "+0.2" },
            { title: "Total Publications", value: "342", change: "+28" },
            { title: "Student Reviews", value: "2,541", change: "+157" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
            >
              <h3 className="text-sm font-medium text-gray-500">
                {stat.title}
              </h3>
              <div className="flex items-end gap-2 mt-2">
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className="text-sm text-gray-600">
                  {stat.change} this semester
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs Content */}
        <Tabs
          defaultValue="overview"
          className="mb-6"
          onValueChange={setSelectedTab}
        >
          <TabsList className="grid grid-cols-3 mb-6 rounded-xl bg-gray-100">
            <TabsTrigger value="overview" className="rounded-xl">
              Overview
            </TabsTrigger>
            <TabsTrigger value="performance" className="rounded-xl">
              Performance
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-xl">
              Reviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="rounded-xl border p-4">
            <h2 className="text-xl font-bold mb-4">Department Performance</h2>
            <div className="border rounded-xl p-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Department</th>
                    <th className="text-left py-3 px-4">
                      <div className="flex items-center">
                        Rating
                        <ArrowUpDown size={16} className="ml-1" />
                      </div>
                    </th>
                    <th className="text-left py-3 px-4">Classes</th>
                    <th className="text-left py-3 px-4">Publications</th>
                    <th className="text-left py-3 px-4">Reviews</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {facultyData.map((faculty) => (
                    <tr key={faculty.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{faculty.name}</td>
                      <td className="py-3 px-4">{faculty.department}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`font-medium ${
                            faculty.rating >= 4.5
                              ? "text-green-600"
                              : "text-gray-600"
                          }`}
                        >
                          {faculty.rating}
                        </span>
                      </td>
                      <td className="py-3 px-4">{faculty.classes}</td>
                      <td className="py-3 px-4">{faculty.publications}</td>
                      <td className="py-3 px-4">{faculty.reviews}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => {
                            setSelectedFaculty(faculty.id);
                            setSelectedTab("performance");
                            showNotification(
                              `Viewing details for ${faculty.name}`
                            );
                          }}
                          className="p-1 hover:bg-gray-200 rounded-full"
                        >
                          <MoreHorizontal size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="rounded-xl border p-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Performance Metrics</h2>
              <div className="flex items-center gap-2">
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2"
                  value={selectedFaculty}
                  onChange={(e) => setSelectedFaculty(parseInt(e.target.value))}
                >
                  {facultyData.map((faculty) => (
                    <option key={faculty.id} value={faculty.id}>
                      {faculty.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() =>
                    showNotification("Downloading performance report...")
                  }
                  className="flex items-center gap-1 px-3 py-2 bg-black text-white rounded-lg"
                >
                  <Download size={16} />
                  Export
                </button>
              </div>
            </div>

            {selectedFacultyData && selectedFacultyPerformance && (
              <>
                <div className="bg-gray-50 p-4 rounded-xl mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {selectedFacultyData.name}
                      </h3>
                      <p className="text-gray-600">
                        {selectedFacultyData.department}
                      </p>
                    </div>
                    <div className="bg-black text-white px-4 py-2 rounded-full">
                      Overall Rating: {selectedFacultyData.rating}/5.0
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <button
                    onClick={() => setSelectedMetric("teaching")}
                    className={`border rounded-xl p-4 text-left ${
                      selectedMetric === "teaching"
                        ? "bg-gray-100 border-black"
                        : ""
                    }`}
                  >
                    <h4 className="font-semibold">Teaching Performance</h4>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-lg font-bold">
                        {selectedFacultyPerformance.teaching.courseEvaluation}
                        /5.0
                      </span>
                      <span
                        className={`text-sm ${
                          selectedFacultyPerformance.teaching
                            .quarterlyTrend[3] >=
                          selectedFacultyPerformance.teaching.quarterlyTrend[2]
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {selectedFacultyPerformance.teaching
                          .quarterlyTrend[3] >=
                        selectedFacultyPerformance.teaching.quarterlyTrend[2]
                          ? "↑"
                          : "↓"}{" "}
                        {Math.abs(
                          (selectedFacultyPerformance.teaching
                            .quarterlyTrend[3] -
                            selectedFacultyPerformance.teaching
                              .quarterlyTrend[2]) *
                            100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedMetric("research")}
                    className={`border rounded-xl p-4 text-left ${
                      selectedMetric === "research"
                        ? "bg-gray-100 border-black"
                        : ""
                    }`}
                  >
                    <h4 className="font-semibold">Research Output</h4>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-lg font-bold">
                        {selectedFacultyPerformance.research.publicationsCount}{" "}
                        Publications
                      </span>
                      <span
                        className={`text-sm ${
                          selectedFacultyPerformance.research
                            .quarterlyTrend[3] >=
                          selectedFacultyPerformance.research.quarterlyTrend[2]
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {selectedFacultyPerformance.research
                          .quarterlyTrend[3] >=
                        selectedFacultyPerformance.research.quarterlyTrend[2]
                          ? "↑"
                          : "↓"}{" "}
                        {Math.abs(
                          selectedFacultyPerformance.research
                            .quarterlyTrend[3] -
                            selectedFacultyPerformance.research
                              .quarterlyTrend[2]
                        )}
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedMetric("service")}
                    className={`border rounded-xl p-4 text-left ${
                      selectedMetric === "service"
                        ? "bg-gray-100 border-black"
                        : ""
                    }`}
                  >
                    <h4 className="font-semibold">Service & Engagement</h4>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-lg font-bold">
                        {selectedFacultyPerformance.service.peerReviews}{" "}
                        Activities
                      </span>
                      <span
                        className={`text-sm ${
                          selectedFacultyPerformance.service
                            .quarterlyTrend[3] >=
                          selectedFacultyPerformance.service.quarterlyTrend[2]
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {selectedFacultyPerformance.service.quarterlyTrend[3] >=
                        selectedFacultyPerformance.service.quarterlyTrend[2]
                          ? "↑"
                          : "↓"}{" "}
                        {Math.abs(
                          selectedFacultyPerformance.service.quarterlyTrend[3] -
                            selectedFacultyPerformance.service.quarterlyTrend[2]
                        )}
                      </span>
                    </div>
                  </button>
                </div>

                {selectedMetric === "teaching" && (
                  <div className="border rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Teaching Performance Details
                    </h3>

                    <div className="mb-6">
                      <h4 className="text-md font-medium mb-2">
                        Quarterly Trend (Course Evaluation)
                      </h4>
                      <div className="h-32 bg-gray-50 rounded-lg p-4 flex items-end justify-between">
                        {selectedFacultyPerformance.teaching.quarterlyTrend.map(
                          (value, index) => (
                            <div
                              key={index}
                              className="flex flex-col items-center"
                            >
                              <div
                                className="bg-black w-12 rounded-t-lg"
                                style={{ height: `${value * 15}px` }}
                              ></div>
                              <span className="text-xs mt-2">Q{index + 1}</span>
                              <span className="text-sm font-medium">
                                {value}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <h5 className="text-sm text-gray-500">
                          Course Evaluation
                        </h5>
                        <p className="text-xl font-bold">
                          {selectedFacultyPerformance.teaching.courseEvaluation}
                          /5.0
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <h5 className="text-sm text-gray-500">
                          Student Satisfaction
                        </h5>
                        <p className="text-xl font-bold">
                          {
                            selectedFacultyPerformance.teaching
                              .studentSatisfaction
                          }
                          %
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <h5 className="text-sm text-gray-500">
                          Attendance Rate
                        </h5>
                        <p className="text-xl font-bold">
                          {selectedFacultyPerformance.teaching.attendanceRate}%
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <h5 className="text-sm text-gray-500">
                          Course Completion
                        </h5>
                        <p className="text-xl font-bold">
                          {selectedFacultyPerformance.teaching.courseCompletion}
                          %
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-md font-medium mb-2">
                        Performance Notes
                      </h4>
                      <p className="text-gray-600">
                        {selectedFacultyData.name} has maintained excellent
                        teaching standards this academic year with consistently
                        high course evaluations. Student satisfaction remains in
                        the top quartile of the department. Recommended for
                        teaching excellence recognition.
                      </p>
                    </div>
                  </div>
                )}

                {selectedMetric === "research" && (
                  <div className="border rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Research Output Details
                    </h3>

                    <div className="mb-6">
                      <h4 className="text-md font-medium mb-2">
                        Quarterly Publication Count
                      </h4>
                      <div className="h-32 bg-gray-50 rounded-lg p-4 flex items-end justify-between">
                        {selectedFacultyPerformance.research.quarterlyTrend.map(
                          (value, index) => (
                            <div
                              key={index}
                              className="flex flex-col items-center"
                            >
                              <div
                                className="bg-black w-12 rounded-t-lg"
                                style={{ height: `${value * 8}px` }}
                              ></div>
                              <span className="text-xs mt-2">Q{index + 1}</span>
                              <span className="text-sm font-medium">
                                {value}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <h5 className="text-sm text-gray-500">Publications</h5>
                        <p className="text-xl font-bold">
                          {
                            selectedFacultyPerformance.research
                              .publicationsCount
                          }
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <h5 className="text-sm text-gray-500">
                          Citation Index
                        </h5>
                        <p className="text-xl font-bold">
                          {selectedFacultyPerformance.research.citationIndex}
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <h5 className="text-sm text-gray-500">
                          Research Grants
                        </h5>
                        <p className="text-xl font-bold">
                          {selectedFacultyPerformance.research.researchGrants}
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <h5 className="text-sm text-gray-500">Conferences</h5>
                        <p className="text-xl font-bold">
                          {
                            selectedFacultyPerformance.research
                              .conferenceParticipation
                          }
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-md font-medium mb-2">
                        Research Notes
                      </h4>
                      <p className="text-gray-600">
                        {selectedFacultyData.name} has shown strong research
                        productivity with{" "}
                        {selectedFacultyPerformance.research.publicationsCount}{" "}
                        publications in the current academic year. The citation
                        index indicates good impact in the field. Consider
                        additional research support to maintain momentum.
                      </p>
                    </div>
                  </div>
                )}

                {selectedMetric === "service" && (
                  <div className="border rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Service & Engagement Details
                    </h3>

                    <div className="mb-6">
                      <h4 className="text-md font-medium mb-2">
                        Quarterly Service Activities
                      </h4>
                      <div className="h-32 bg-gray-50 rounded-lg p-4 flex items-end justify-between">
                        {selectedFacultyPerformance.service.quarterlyTrend.map(
                          (value, index) => (
                            <div
                              key={index}
                              className="flex flex-col items-center"
                            >
                              <div
                                className="bg-black w-12 rounded-t-lg"
                                style={{ height: `${value * 2}px` }}
                              ></div>
                              <span className="text-xs mt-2">Q{index + 1}</span>
                              <span className="text-sm font-medium">
                                {value}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <h5 className="text-sm text-gray-500">Committees</h5>
                        <p className="text-xl font-bold">
                          {selectedFacultyPerformance.service.committeesServed}
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <h5 className="text-sm text-gray-500">Mentorship</h5>
                        <p className="text-xl font-bold">
                          {selectedFacultyPerformance.service.mentorship}{" "}
                          Students
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <h5 className="text-sm text-gray-500">
                          Community Events
                        </h5>
                        <p className="text-xl font-bold">
                          {selectedFacultyPerformance.service.communityEvents}
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <h5 className="text-sm text-gray-500">Peer Reviews</h5>
                        <p className="text-xl font-bold">
                          {selectedFacultyPerformance.service.peerReviews}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-md font-medium mb-2">
                        Service Notes
                      </h4>
                      <p className="text-gray-600">
                        {selectedFacultyData.name} has made significant service
                        contributions to the department and broader academic
                        community. Particularly notable is the mentorship of{" "}
                        {selectedFacultyPerformance.service.mentorship} students
                        and participation in{" "}
                        {selectedFacultyPerformance.service.communityEvents}{" "}
                        community outreach events.
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="rounded-xl border p-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Student Reviews</h2>
              <div className="flex items-center gap-2">
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2"
                  value={selectedFaculty}
                  onChange={(e) => setSelectedFaculty(parseInt(e.target.value))}
                >
                  {facultyData.map((faculty) => (
                    <option key={faculty.id} value={faculty.id}>
                      {faculty.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => showNotification("Filter options")}
                  className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <Filter size={16} />
                  Filter
                </button>
              </div>
            </div>

            {selectedFacultyData && (
              <>
                <div className="bg-gray-50 p-4 rounded-xl mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {selectedFacultyData.name}
                      </h3>
                      <p className="text-gray-600">
                        {selectedFacultyData.department}
                      </p>
                    </div>
                    <div className="bg-black text-white px-4 py-2 rounded-full">
                      {selectedFacultyReviews.length} Reviews
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {selectedFacultyReviews.map((review) => (
                    <div key={review.id} className="border rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-lg ${
                                i < review.rating
                                  ? "text-yellow-500"
                                  : "text-gray-300"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                          <span className="ml-2 font-medium">
                            {review.rating}/5
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {review.date}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}

                  <div className="flex justify-center mt-6">
                    <button
                      onClick={() =>
                        showNotification("Loading more reviews...")
                      }
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Load More Reviews
                    </button>
                  </div>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 p-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            © 2025 University Faculty Management System
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => showNotification("Help center opening...")}
              className="text-sm text-gray-600 hover:underline"
            >
              Help
            </button>
            <button
              onClick={() => showNotification("Settings menu opening...")}
              className="text-sm text-gray-600 hover:underline"
            >
              Settings
            </button>
            <button
              onClick={() => showNotification("Feedback form opening...")}
              className="text-sm text-gray-600 hover:underline"
            >
              Feedback
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Search,
  HelpCircle,
  BookOpen,
  Users,
  Settings,
  GraduationCap,
  Phone,
  Mail,
  MessageCircle,
  FileText,
  Video,
  Download,
  ExternalLink,
  Star,
  Clock,
} from "lucide-react";

const HelpFAQPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // FAQ Data organized by categories and roles
  const faqData = {
    general: [
      {
        id: 1,
        question: "How do I log into the School ERP system?",
        answer:
          "You can log in using your assigned username and password provided by the school administration. If you've forgotten your credentials, contact the IT helpdesk or use the 'Forgot Password' link on the login page.",
        category: "general",
        roles: ["all"],
        tags: ["login", "password", "access"],
      },
      {
        id: 2,
        question: "How do I change my password?",
        answer:
          "Go to Settings > Account Settings > Change Password. Enter your current password and your new password twice. Your new password should be at least 8 characters long and include a mix of letters, numbers, and special characters.",
        category: "general",
        roles: ["all"],
        tags: ["password", "security", "account"],
      },
      {
        id: 3,
        question: "What browsers are supported by the ERP system?",
        answer:
          "The ERP system works best with modern browsers including Chrome (recommended), Firefox, Safari, and Edge. Please ensure your browser is updated to the latest version for optimal performance.",
        category: "general",
        roles: ["all"],
        tags: ["browser", "compatibility", "technical"],
      },
      {
        id: 4,
        question: "How do I update my profile information?",
        answer:
          "Navigate to your Profile page and click the 'Edit Profile' button. Update the necessary information and click 'Save Changes'. Some information may require admin approval before being updated.",
        category: "general",
        roles: ["all"],
        tags: ["profile", "update", "personal info"],
      },
    ],
    students: [
      {
        id: 5,
        question: "How can I view my grades and attendance?",
        answer:
          "Go to the Academic section in your dashboard. You'll find your current grades, assignment scores, and attendance percentage. You can also view detailed reports and historical data.",
        category: "academic",
        roles: ["student"],
        tags: ["grades", "attendance", "academic", "reports"],
      },
      {
        id: 6,
        question: "How do I submit assignments online?",
        answer:
          "Navigate to Assignments > Current Assignments. Click on the assignment you want to submit, upload your file (PDF, DOC, or other specified formats), add any comments, and click 'Submit'. You'll receive a confirmation email.",
        category: "academic",
        roles: ["student"],
        tags: ["assignments", "submission", "upload"],
      },
      {
        id: 7,
        question: "How can I access my class schedule and timetable?",
        answer:
          "Your class schedule is available on your dashboard homepage or in the Academic > Timetable section. You can also download it as a PDF or sync it with your personal calendar.",
        category: "academic",
        roles: ["student"],
        tags: ["schedule", "timetable", "classes"],
      },
      {
        id: 8,
        question: "How do I apply for leave or report absence?",
        answer:
          "Go to Student Services > Leave Application. Fill out the form with your reason, dates, and upload any supporting documents if required. Your class teacher and parents will be notified automatically.",
        category: "services",
        roles: ["student"],
        tags: ["leave", "absence", "application"],
      },
    ],
    faculty: [
      {
        id: 9,
        question: "How do I mark attendance for my classes?",
        answer:
          "Go to Teaching > Attendance. Select your class and subject, then mark present/absent for each student. You can also mark attendance using the mobile app with QR code scanning.",
        category: "teaching",
        roles: ["faculty", "hod"],
        tags: ["attendance", "marking", "classes"],
      },
      {
        id: 10,
        question: "How do I create and manage assignments?",
        answer:
          "Navigate to Teaching > Assignments > Create New. Fill in the assignment details, set due dates, attach resources, and assign to specific classes. Students will be automatically notified.",
        category: "teaching",
        roles: ["faculty", "hod"],
        tags: ["assignments", "create", "manage"],
      },
      {
        id: 11,
        question: "How do I enter grades and generate report cards?",
        answer:
          "Go to Grading > Grade Entry. Select your subject and class, enter grades for each student. For report cards, go to Reports > Generate Report Cards and select the term and class.",
        category: "grading",
        roles: ["faculty", "hod"],
        tags: ["grades", "report cards", "evaluation"],
      },
      {
        id: 12,
        question: "How can I communicate with parents and students?",
        answer:
          "Use the Communication Center to send messages, announcements, or schedule parent-teacher meetings. You can send individual messages or broadcast to entire classes.",
        category: "communication",
        roles: ["faculty", "hod"],
        tags: ["communication", "parents", "messages"],
      },
    ],
    parents: [
      {
        id: 13,
        question: "How can I monitor my child's academic progress?",
        answer:
          "Access the Parent Dashboard to view your child's grades, attendance, assignments, and teacher feedback. You'll also receive regular progress reports via email.",
        category: "monitoring",
        roles: ["parent"],
        tags: ["progress", "grades", "monitoring"],
      },
      {
        id: 14,
        question: "How do I schedule parent-teacher meetings?",
        answer:
          "Go to Meetings > Schedule Meeting. Choose your child's teacher, select available time slots, and confirm your appointment. You'll receive calendar invites and reminders.",
        category: "meetings",
        roles: ["parent"],
        tags: ["meetings", "teachers", "appointment"],
      },
      {
        id: 15,
        question: "How can I pay school fees online?",
        answer:
          "Navigate to Payments > Fee Payment. View pending fees, select payment method (credit card, bank transfer, or digital wallet), and complete the transaction. Payment receipts are automatically generated.",
        category: "payments",
        roles: ["parent"],
        tags: ["fees", "payment", "online"],
      },
      {
        id: 16,
        question: "How do I update my contact information?",
        answer:
          "Go to Profile > Edit Profile and update your contact details. Important: Changes to emergency contact information require verification and may need admin approval.",
        category: "profile",
        roles: ["parent"],
        tags: ["contact", "profile", "emergency"],
      },
    ],
    admin: [
      {
        id: 17,
        question: "How do I manage user accounts and permissions?",
        answer:
          "Access Admin Panel > User Management. You can create new accounts, modify permissions, reset passwords, and deactivate accounts. Role-based permissions are automatically applied.",
        category: "administration",
        roles: ["admin", "super_admin"],
        tags: ["users", "permissions", "accounts"],
      },
      {
        id: 18,
        question: "How can I generate system reports and analytics?",
        answer:
          "Go to Reports > System Analytics. Choose from pre-built reports or create custom reports. You can filter by date range, user type, and specific metrics. Export options include PDF, Excel, and CSV.",
        category: "reports",
        roles: ["admin", "super_admin", "principal"],
        tags: ["reports", "analytics", "data"],
      },
      {
        id: 19,
        question: "How do I backup and restore system data?",
        answer:
          "Navigate to System > Backup & Restore. Schedule automatic backups, create manual backups, or restore from previous backup points. All backups are encrypted and stored securely.",
        category: "system",
        roles: ["super_admin"],
        tags: ["backup", "restore", "data"],
      },
      {
        id: 20,
        question: "How can I configure system notifications and alerts?",
        answer:
          "Go to Settings > Notification Settings. Configure email templates, SMS alerts, push notifications, and automated reminders for various system events and deadlines.",
        category: "configuration",
        roles: ["admin", "super_admin"],
        tags: ["notifications", "alerts", "configuration"],
      },
    ],
  };

  // Quick Help Guides
  const quickGuides = [
    {
      title: "Getting Started Guide",
      description: "Complete walkthrough for new users",
      icon: BookOpen,
      type: "pdf",
      roles: ["all"],
    },
    {
      title: "Student Handbook",
      description: "Comprehensive guide for students",
      icon: GraduationCap,
      type: "pdf",
      roles: ["student", "parent"],
    },
    {
      title: "Teacher's Manual",
      description: "Teaching tools and grade management",
      icon: Users,
      type: "pdf",
      roles: ["faculty", "hod"],
    },
    {
      title: "Admin Guide",
      description: "System administration and management",
      icon: Settings,
      type: "pdf",
      roles: ["admin", "super_admin"],
    },
  ];

  // Video Tutorials
  const videoTutorials = [
    {
      title: "System Overview and Navigation",
      duration: "5:30",
      category: "general",
      roles: ["all"],
    },
    {
      title: "Managing Student Grades",
      duration: "8:15",
      category: "teaching",
      roles: ["faculty", "hod"],
    },
    {
      title: "Parent Dashboard Tour",
      duration: "6:45",
      category: "monitoring",
      roles: ["parent"],
    },
    {
      title: "System Administration Basics",
      duration: "12:20",
      category: "administration",
      roles: ["admin", "super_admin"],
    },
  ];

  // Support Contact Information
  const supportContacts = [
    {
      department: "Technical Support",
      phone: "+1 (555) 123-4567",
      email: "tech-support@school.edu",
      hours: "24/7",
      description: "Login issues, system bugs, technical problems",
    },
    {
      department: "Academic Support",
      phone: "+1 (555) 234-5678",
      email: "academic-help@school.edu",
      hours: "8:00 AM - 6:00 PM",
      description: "Grades, assignments, academic records",
    },
    {
      department: "Administrative Support",
      phone: "+1 (555) 345-6789",
      email: "admin-help@school.edu",
      hours: "9:00 AM - 5:00 PM",
      description: "Account management, permissions, system configuration",
    },
    {
      department: "General Inquiries",
      phone: "+1 (555) 456-7890",
      email: "help@school.edu",
      hours: "8:00 AM - 8:00 PM",
      description: "General questions and guidance",
    },
  ];

  // Filter FAQs based on search and category
  const filteredFAQs = () => {
    let allFAQs = [
      ...faqData.general,
      ...faqData.students,
      ...faqData.faculty,
      ...faqData.parents,
      ...faqData.admin,
    ];

    if (searchQuery) {
      allFAQs = allFAQs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    if (selectedCategory !== "all") {
      allFAQs = allFAQs.filter((faq) => faq.category === selectedCategory);
    }

    return allFAQs;
  };

  const categories = [
    {
      id: "all",
      name: "All Categories",
      count: Object.values(faqData).flat().length,
    },
    { id: "general", name: "General", count: faqData.general.length },
    {
      id: "academic",
      name: "Academic",
      count: faqData.students.filter((f) => f.category === "academic").length,
    },
    {
      id: "teaching",
      name: "Teaching",
      count: faqData.faculty.filter((f) => f.category === "teaching").length,
    },
    {
      id: "administration",
      name: "Administration",
      count: faqData.admin.filter((f) => f.category === "administration")
        .length,
    },
    {
      id: "payments",
      name: "Payments",
      count: faqData.parents.filter((f) => f.category === "payments").length,
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-blue-100 p-3 rounded-full">
            <HelpCircle className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold">Help & Support Center</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions, access user guides, and get support
          for the School ERP system
        </p>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for help topics, features, or questions..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="guides">User Guides</TabsTrigger>
          <TabsTrigger value="tutorials">Video Tutorials</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="space-y-6">
          {/* Category Filter */}
          <Card>
            <CardHeader>
              <CardTitle>Browse by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={
                      selectedCategory === category.id ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    {category.name}
                    <Badge variant="secondary" className="ml-1">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* FAQ List */}
          <Card>
            <CardHeader>
              <CardTitle>
                Frequently Asked Questions
                {searchQuery && (
                  <span className="text-sm font-normal text-muted-foreground ml-2">
                    ({filteredFAQs().length} results for "{searchQuery}")
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredFAQs().length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFAQs().map((faq) => (
                    <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-start gap-3 flex-1">
                          <HelpCircle className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                          <span>{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-7 space-y-3">
                          <p className="text-sm text-muted-foreground">
                            {faq.answer}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {faq.tags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-8">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No results found</h3>
                  <p className="text-muted-foreground">
                    Try different keywords or browse by category
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Guides Tab */}
        <TabsContent value="guides" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickGuides.map((guide, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <guide.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{guide.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {guide.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button size="sm" className="flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Download PDF
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          View Online
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Start Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Quick Start Checklist
              </CardTitle>
              <CardDescription>
                Essential steps to get started with the School ERP system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  "Complete your profile setup and verify contact information",
                  "Explore your dashboard and familiarize yourself with the navigation",
                  "Set up notification preferences and privacy settings",
                  "Download the mobile app for on-the-go access",
                  "Join relevant groups and communication channels",
                  "Review role-specific features and capabilities",
                ].map((step, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <span className="text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Video Tutorials Tab */}
        <TabsContent value="tutorials" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videoTutorials.map((video, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 p-3 rounded-lg">
                      <Video className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{video.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {video.duration}
                        </div>
                        <Badge variant="outline">{video.category}</Badge>
                      </div>
                      <Button size="sm" className="flex items-center gap-2">
                        <Video className="h-4 w-4" />
                        Watch Tutorial
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Video Tutorial Library</CardTitle>
              <CardDescription>
                Access our complete collection of training videos and tutorials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Browse our extensive library of video tutorials covering all
                    aspects of the ERP system
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>50+ Tutorial Videos</span>
                    <span>•</span>
                    <span>Updated Weekly</span>
                    <span>•</span>
                    <span>Multiple Languages</span>
                  </div>
                </div>
                <Button className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  View All Tutorials
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Support Tab */}
        <TabsContent value="contact" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportContacts.map((contact, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-blue-600" />
                    {contact.department}
                  </CardTitle>
                  <CardDescription>{contact.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{contact.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Available: {contact.hours}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Phone className="h-4 w-4" />
                      Call Now
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Mail className="h-4 w-4" />
                      Send Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Support Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Live Chat Support</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get instant help from our support team
                </p>
                <Button size="sm" className="w-full">
                  Start Chat
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Submit Ticket</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create a support ticket for complex issues
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Create Ticket
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Community Forum</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect with other users and find answers
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Visit Forum
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Emergency Contact */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Emergency Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-red-700 mb-4">
                For critical system issues affecting multiple users or urgent
                security concerns:
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-red-800 font-medium">
                  <Phone className="h-4 w-4" />
                  Emergency Hotline: +1 (555) 911-HELP
                </div>
                <Badge variant="destructive">Available 24/7</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HelpFAQPage;

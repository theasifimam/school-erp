import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Save, ArrowUpDown, Download } from "lucide-react";

export default function ClassesCurriculumPage() {
  const curriculumTemplates = [
    {
      id: "ct-1",
      name: "Standard Mathematics Curriculum",
      subjects: 1,
      classes: 5,
      units: 12,
    },
    {
      id: "ct-2",
      name: "Enhanced Science Program",
      subjects: 1,
      classes: 5,
      units: 15,
    },
    {
      id: "ct-3",
      name: "Core English Skills",
      subjects: 1,
      classes: 5,
      units: 10,
    },
    {
      id: "ct-4",
      name: "Comprehensive History Timeline",
      subjects: 1,
      classes: 4,
      units: 8,
    },
    {
      id: "ct-5",
      name: "Advanced Computer Science Track",
      subjects: 1,
      classes: 3,
      units: 14,
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
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Curriculum Templates</CardTitle>
              <CardDescription>
                Start with a template or create your own
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {curriculumTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <div>
                      <h3 className="font-medium">{template.name}</h3>
                      <p className="text-sm text-gray-500">
                        {template.subjects} subject, {template.classes} classes,{" "}
                        {template.units} units
                      </p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Create New Curriculum
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Curriculum Builder</CardTitle>
                  <CardDescription>
                    Design your curriculum structure
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Save Draft
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="curriculum-name">Curriculum Name</Label>
                  <Input
                    id="curriculum-name"
                    className="mt-1"
                    placeholder="Enter curriculum name"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Select defaultValue="math">
                    <SelectTrigger id="subject" className="mt-1">
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">Mathematics</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                      <SelectItem value="cs">Computer Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="classes">Classes</Label>
                  <Select defaultValue="class1a">
                    <SelectTrigger id="classes" className="mt-1">
                      <SelectValue placeholder="Select Classes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="class1a">Class 1-A</SelectItem>
                      <SelectItem value="class2b">Class 2-B</SelectItem>
                      <SelectItem value="class3c">Class 3-C</SelectItem>
                      <SelectItem value="class4d">Class 4-D</SelectItem>
                      <SelectItem value="class5e">Class 5-E</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Curriculum Units</Label>
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Unit
                    </Button>
                  </div>
                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-1/12">Order</TableHead>
                            <TableHead className="w-1/3">Unit Name</TableHead>
                            <TableHead className="w-1/6">Duration</TableHead>
                            <TableHead className="w-1/6">Resources</TableHead>
                            <TableHead className="w-1/6">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell className="font-medium">
                              Introduction to Number System
                            </TableCell>
                            <TableCell>2 weeks</TableCell>
                            <TableCell>3 lessons</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="icon">
                                  <ArrowUpDown className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>2</TableCell>
                            <TableCell className="font-medium">
                              Basic Operations
                            </TableCell>
                            <TableCell>3 weeks</TableCell>
                            <TableCell>5 lessons</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="icon">
                                  <ArrowUpDown className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>3</TableCell>
                            <TableCell className="font-medium">
                              Fractions and Decimals
                            </TableCell>
                            <TableCell>4 weeks</TableCell>
                            <TableCell>6 lessons</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="icon">
                                  <ArrowUpDown className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

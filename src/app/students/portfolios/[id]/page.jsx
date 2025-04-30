import { Toaster } from "sonner";

// Import components with proper paths
import PersonalInfo from "../components/PersonalInfo";
import AcademicPerformance from "../components/AcademicPerformance";
import AttendanceSummary from "../components/AttendanceSummary";
import ProjectsShowcase from "../components/ProjectsShowcase";
import SkillsChart from "../components/SkillsChart";
import PortfolioHeader from "../components/PortfolioHeader";

export default function StudentPortfolio() {
  return (
    <div className="container mx-auto px-8 py-8">
      <Toaster />

      <PortfolioHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-1 space-y-6">
          <PersonalInfo />
          <SkillsChart />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <AcademicPerformance />
            <AttendanceSummary />
          </div>

          <ProjectsShowcase />
        </div>
      </div>
    </div>
  );
}


import { 
  AlertTriangle, 
  Clock, 
  FileCheck, 
  FileX 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
}

function StatCard({ title, value, description, icon, trend }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <CardDescription className="text-xs">{description}</CardDescription>
        {trend && (
          <div className={`mt-1 text-xs ${trend.positive ? "text-green-500" : "text-red-500"}`}>
            {trend.positive ? "↑" : "↓"} {trend.value}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function WarrantyStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Active Warranties"
        value="24"
        description="Currently active warranties"
        icon={<FileCheck className="h-4 w-4 text-primary" />}
        trend={{ value: "2 from last month", positive: true }}
      />
      <StatCard
        title="Expiring Soon"
        value="5"
        description="Warranties expiring in 30 days"
        icon={<AlertTriangle className="h-4 w-4 text-orange-400" />}
      />
      <StatCard
        title="Recently Expired"
        value="3"
        description="Expired in the last 30 days"
        icon={<FileX className="h-4 w-4 text-destructive" />}
      />
      <StatCard
        title="Average Warranty"
        value="1.8 yrs"
        description="Average warranty duration"
        icon={<Clock className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
}

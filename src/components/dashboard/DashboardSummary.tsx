
import { CalendarDays, Clock, FileText, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WarrantyStats } from "@/components/warranty/WarrantyStats";
import { Button } from "@/components/ui/button";
import { WarrantyCard } from "@/components/warranty/WarrantyCard";
import { Link } from "react-router-dom";
import { warranties } from "@/data/sampleWarranties";

export function DashboardSummary() {
  // Get the 4 most recently added warranties
  const recentWarranties = [...warranties]
    .sort((a, b) => new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime())
    .slice(0, 4);

  // Get warranties expiring soon (next 30 days)
  const today = new Date();
  const expiringWarranties = warranties
    .filter((warranty) => {
      const expiryDate = new Date(warranty.expiryDate);
      const daysLeft = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return daysLeft > 0 && daysLeft <= 30;
    })
    .sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime())
    .slice(0, 4);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          An overview of your warranty information
        </p>
      </div>

      <WarrantyStats />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-lg">Recent Warranties</CardTitle>
              <CardDescription>Recently added warranty documents</CardDescription>
            </div>
            <ShoppingBag className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {recentWarranties.length > 0 ? (
              <div className="space-y-4">
                {recentWarranties.map((warranty) => (
                  <div key={warranty.id} className="flex items-center gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {warranty.productName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {warranty.brand}
                      </p>
                    </div>
                    <div className="text-right text-xs">
                      <p>
                        {new Date(warranty.purchaseDate).toLocaleDateString()}
                      </p>
                      <p className="text-muted-foreground">{warranty.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                <h3 className="mt-2 text-sm font-medium">No recent warranties</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Add your first warranty to get started
                </p>
                <Button asChild className="mt-4" size="sm">
                  <Link to="/add-warranty">Add Warranty</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-lg">Upcoming Expirations</CardTitle>
              <CardDescription>Warranties expiring in the next 30 days</CardDescription>
            </div>
            <Clock className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {expiringWarranties.length > 0 ? (
              <div className="space-y-4">
                {expiringWarranties.map((warranty) => {
                  const expiryDate = new Date(warranty.expiryDate);
                  const daysLeft = Math.ceil(
                    (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
                  );

                  return (
                    <div key={warranty.id} className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100">
                        <CalendarDays className="h-4 w-4 text-orange-600" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {warranty.productName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {warranty.brand}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-orange-600">
                          {daysLeft} {daysLeft === 1 ? "day" : "days"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {expiryDate.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Clock className="h-8 w-8 text-muted-foreground" />
                <h3 className="mt-2 text-sm font-medium">No upcoming expirations</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  All your warranties are safe for now
                </p>
                <Button asChild variant="outline" className="mt-4" size="sm">
                  <Link to="/warranties">View All Warranties</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Recent Activity</h3>
          <Button variant="outline" size="sm" asChild>
            <Link to="/warranties">View All</Link>
          </Button>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {recentWarranties.map((warranty) => (
            <WarrantyCard key={warranty.id} {...warranty} />
          ))}
        </div>
      </div>
    </div>
  );
}

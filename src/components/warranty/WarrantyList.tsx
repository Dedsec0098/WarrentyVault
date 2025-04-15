
import { useState } from "react";
import { 
  Filter, 
  List, 
  Grid as GridIcon, 
  CheckSquare, 
  Clock, 
  FileX 
} from "lucide-react";
import { WarrantyCard } from "./WarrantyCard";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Sample data
import { warranties } from "@/data/sampleWarranties";

type WarrantyView = "grid" | "list";
type WarrantyStatus = "all" | "active" | "expiring" | "expired";

export function WarrantyList() {
  const [view, setView] = useState<WarrantyView>("grid");
  const [status, setStatus] = useState<WarrantyStatus>("all");
  const [category, setCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter warranties
  const filteredWarranties = warranties.filter((warranty) => {
    // Filter by search query
    if (
      searchQuery &&
      !warranty.productName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !warranty.brand.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by category
    if (category !== "all" && warranty.category !== category) {
      return false;
    }

    // Filter by status
    if (status !== "all") {
      const today = new Date();
      const expiryDate = new Date(warranty.expiryDate);
      const daysLeft = Math.ceil(
        (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (
        (status === "active" && daysLeft <= 0) ||
        (status === "expiring" && (daysLeft <= 0 || daysLeft > 30)) ||
        (status === "expired" && daysLeft > 0)
      ) {
        return false;
      }
    }

    return true;
  });

  const statusOptions = [
    { value: "all", label: "All Warranties", icon: CheckSquare },
    { value: "active", label: "Active", icon: CheckSquare },
    { value: "expiring", label: "Expiring Soon", icon: Clock },
    { value: "expired", label: "Expired", icon: FileX },
  ];

  const categories = ["all", "Electronics", "Appliances", "Furniture", "Automotive", "Other"];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Warranties</h2>
          <p className="text-muted-foreground">
            Manage and track all your product warranties
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Tabs
            defaultValue={view}
            className="w-full sm:w-auto"
            onValueChange={(value) => setView(value as WarrantyView)}
          >
            <TabsList className="grid w-full grid-cols-2 sm:w-auto">
              <TabsTrigger value="grid">
                <GridIcon className="mr-2 h-4 w-4" />
                Grid
              </TabsTrigger>
              <TabsTrigger value="list">
                <List className="mr-2 h-4 w-4" />
                List
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex-1">
          <Input
            placeholder="Search warranties..."
            className="w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Status</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              {statusOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setStatus(option.value as WarrantyStatus)}
                  className={status === option.value ? "bg-secondary" : ""}
                >
                  <option.icon className="mr-2 h-4 w-4" />
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Select
            value={category}
            onValueChange={setCategory}
          >
            <SelectTrigger className="w-32 sm:w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredWarranties.length === 0 ? (
        <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <FileX className="h-10 w-10 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No warranties found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div
          className={cn(
            "fade-in stagger-children",
            view === "grid"
              ? "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "space-y-4"
          )}
        >
          {filteredWarranties.map((warranty) => (
            <WarrantyCard
              key={warranty.id}
              {...warranty}
              className={view === "list" ? "flex flex-row h-32" : ""}
            />
          ))}
        </div>
      )}
    </div>
  );
}


import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface WarrantyCardProps {
  id: string;
  productName: string;
  brand: string;
  purchaseDate: string;
  expiryDate: string;
  category: string;
  image?: string;
  className?: string;
}

export function WarrantyCard({
  id,
  productName,
  brand,
  purchaseDate,
  expiryDate,
  category,
  image,
  className,
}: WarrantyCardProps) {
  // Calculate days left for warranty
  const today = new Date();
  const expiry = new Date(expiryDate);
  const daysLeft = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  // Format dates for display
  const formattedPurchaseDate = new Date(purchaseDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  
  const formattedExpiryDate = new Date(expiryDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link to={`/warranty/${id}`}>
      <Card className={cn("overflow-hidden transition-all hover:shadow-warranty-card", className)}>
        <div className="relative aspect-video w-full overflow-hidden bg-secondary">
          {image ? (
            <img
              src={image}
              alt={productName}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-secondary">
              <span className="text-sm text-muted-foreground">{brand || productName}</span>
            </div>
          )}
          <Badge 
            variant={daysLeft < 30 ? "destructive" : daysLeft < 90 ? "default" : "secondary"}
            className="absolute right-2 top-2"
          >
            {daysLeft <= 0 ? 'Expired' : `${daysLeft} days left`}
          </Badge>
        </div>
        <CardContent className="p-4">
          <div className="space-y-2">
            <div>
              <h3 className="font-medium line-clamp-1">{productName}</h3>
              <p className="text-sm text-muted-foreground">{brand}</p>
            </div>
            <div className="flex flex-col gap-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>Purchased: {formattedPurchaseDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>Expires: {formattedExpiryDate}</span>
              </div>
            </div>
            <Badge variant="outline" className="mt-2">
              {category}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

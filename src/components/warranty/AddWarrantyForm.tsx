
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Camera,
  FileUp, 
  Loader2, 
  Plus, 
  Scan, 
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  productName: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  brand: z.string().min(1, {
    message: "Brand is required.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  purchaseDate: z.string({
    required_error: "Purchase date is required.",
  }),
  expiryDate: z.string({
    required_error: "Expiry date is required.",
  }),
  retailer: z.string().optional(),
  serialNumber: z.string().optional(),
  notes: z.string().optional(),
});

export function AddWarrantyForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      brand: "",
      category: "",
      retailer: "",
      serialNumber: "",
      notes: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Simulate form submission
    console.log(values);
    
    toast({
      title: "Warranty Added",
      description: "Your warranty has been successfully added.",
    });
    
    setTimeout(() => {
      navigate("/warranties");
    }, 1000);
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setFilePreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateOCRScan = () => {
    setIsScanning(true);
    
    // Simulate OCR processing with a delay
    setTimeout(() => {
      setIsScanning(false);
      
      // Populate form with "extracted" data
      form.setValue("productName", "Smart TV XD550");
      form.setValue("brand", "TechVision");
      form.setValue("category", "Electronics");
      form.setValue("retailer", "ElectroMart");
      form.setValue("serialNumber", "TV-2023-78542-XD5");
      form.setValue("purchaseDate", "2023-03-15");
      form.setValue("expiryDate", "2025-03-15");
      
      toast({
        title: "Document Scanned",
        description: "We've extracted the warranty information from your document.",
      });
    }, 2000);
  };

  const removeFile = () => {
    setFilePreview(null);
    setFileName(null);
  };

  const categories = [
    "Electronics",
    "Appliances",
    "Furniture",
    "Automotive",
    "Clothing",
    "Jewelry",
    "Tools",
    "Sports Equipment",
    "Musical Instruments",
    "Other",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Warranty</CardTitle>
        <CardDescription>
          Enter your warranty details or scan your receipt to auto-fill the information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div
              className="relative flex flex-col items-center justify-center rounded-lg border border-dashed p-6 cursor-pointer transition-colors hover:bg-muted/50"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
            >
              <input
                type="file"
                id="file-upload"
                className="absolute inset-0 cursor-pointer opacity-0"
                accept="image/*"
                onChange={handleFileInput}
              />
              
              {filePreview ? (
                <div className="relative w-full">
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden">
                    <img
                      src={filePreview}
                      alt="Receipt preview"
                      className="h-full w-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute right-2 top-2"
                      onClick={removeFile}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    {fileName}
                  </p>
                  <div className="mt-4 flex justify-center">
                    <Button
                      type="button"
                      className="gap-2"
                      onClick={simulateOCRScan}
                      disabled={isScanning}
                    >
                      {isScanning ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Scan className="h-4 w-4" />
                      )}
                      {isScanning ? "Scanning..." : "Extract Data from Image"}
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-4 rounded-full bg-primary/10 p-3">
                    <FileUp className="h-6 w-6 text-primary" />
                  </div>
                  <p className="mb-1 text-sm font-medium">
                    Drag & drop your receipt or warranty
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Or click to browse files (PNG, JPG up to 10MB)
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Button type="button" variant="outline" className="gap-2">
                      <FileUp className="h-4 w-4" />
                      Upload File
                    </Button>
                    <Button type="button" variant="outline" className="gap-2">
                      <Camera className="h-4 w-4" />
                      Take Photo
                    </Button>
                  </div>
                </>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Smart TV XD550" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand*</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Samsung" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category*</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="retailer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Retailer</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Best Buy" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="purchaseDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purchase Date*</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Warranty Expiry Date*</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="serialNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Serial Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. SN12345678" {...field} />
                  </FormControl>
                  <FormDescription>
                    Optional, but helps with warranty claims
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter any additional details about your warranty"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => navigate("/warranties")}>
                Cancel
              </Button>
              <Button type="submit" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Warranty
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

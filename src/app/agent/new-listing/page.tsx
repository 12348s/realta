'use client';


import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Home, Plus, ShoppingCart, Tag, Image as ImageIcon } from 'lucide-react';
import { useListingStore } from '@/store/useListingStore';

// Shadcn imports (assuming they were added correctly)
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
// For toast we will try both standard paths or fallback to alert if not found
import { toast } from '@/components/ui/use-toast';

const navItems = [
  { label: 'Buy', icon: ShoppingCart, active: true },
  { label: 'Sell', icon: Tag, active: false },
];

const amenitiesList = [
  { id: 'swimming_pool', label: 'Swimming Pool' },
  { id: 'gym', label: 'Gym / Fitness Center' },
  { id: 'parking', label: 'Car Parking' },
  { id: 'security', label: 'Security System' },
  { id: 'ac', label: 'Air Conditioning' },
  { id: 'wifi', label: 'Wi-Fi' },
];

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  price: z.string().min(1, "Price is required"),
  bedrooms: z.string().min(1, "Bedrooms is required"),
  bathrooms: z.string().min(1, "Bathrooms is required"),
  area: z.string().min(1, "Area is required"),
  amenities: z.array(z.string()).optional(),
});

export default function AddListingPage() {
  const router = useRouter();
  const addListing = useListingStore((state) => state.addListing);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      address: "",
      price: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
      amenities: [],
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Math.random to generate a unique ID
    const newProperty = {
      propertyId: `prop-${Math.floor(Math.random() * 10000)}`,
      title: values.title,
      price: { range: `$${values.price}` },
      location: { locality: values.address.split(',')[0] || values.address, city: values.address.split(',')[1]?.trim() || 'New City' },
      configurations: `${values.bedrooms} BHK`,
      propertyType: 'Villa',
      images: [{ url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' }], // Placeholder image
      isNew: true,
    };
    
    addListing(newProperty);
    
    // Show Toast
    if (toast) {
      toast({
        description: "Listing added successfully!",
      });
    } else {
      alert("Listing added successfully!");
    }
    
    router.push('/agent/dashboard');
  };

  return (
    <div className="flex h-screen bg-[#F5F0EB] font-sans overflow-hidden">
      {/* SIDEBAR - Exact same as Agent Dashboard */}
      <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col h-full shadow-sm">
        <div className="p-8 pb-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#E8622A] rounded-xl flex items-center justify-center shadow-sm">
              <Home className="w-5 h-5 text-white" fill="currentColor" />
            </div>
            <div>
              <p className="font-heading font-extrabold text-[20px] text-gray-900 leading-none mb-0.5">Realta</p>
              <p className="text-[10px] font-black text-[#E8622A] tracking-widest uppercase">Elite Agent</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map(({ label, icon: Icon, active }) => (
            <button
              key={label}
              className={`w-full flex items-center gap-4 px-6 py-3.5 rounded-full text-[14px] font-bold transition-all text-left ${
                active ? 'bg-[#fae2d6]/80 text-[#E8622A]' : 'text-[#64748b] hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-[18px] h-[18px] ${active ? 'text-[#E8622A]' : 'text-[#8094a8]'}`} strokeWidth={active ? 2.5 : 2} />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-6 space-y-8">
          <button className="w-full flex items-center justify-center gap-2 bg-[#E8622A] hover:bg-[#d45622] text-white font-bold py-3.5 rounded-full transition-colors shadow-sm text-[14px]">
            <Plus className="w-5 h-5" /> Add New Property
          </button>
          <div className="flex items-center gap-4 px-2">
            <Image
              src="https://ui-avatars.com/api/?name=Teresa+Herriot&background=F5F0EB&color=000&size=44"
              alt="Teresa" width={44} height={44} className="rounded-full flex-shrink-0 border border-gray-200"
            />
            <div>
              <p className="font-bold text-[14px] text-gray-900 leading-tight">Teresa Herriot</p>
              <p className="text-[12px] font-medium text-[#8094a8]">Premium Member</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN FORM AREA */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[800px] mx-auto py-12 px-8">
          <div className="mb-10">
            <h1 className="font-heading font-extrabold text-[32px] text-gray-900 mb-2 tracking-tight">Add New Property Listing</h1>
            <p className="text-[#64748b] text-[15px] font-medium">Fill in the information below to list a new property on the Realta platform.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Card 1: Basic Info */}
              <div className="bg-white rounded-[16px] p-8 shadow-sm border border-gray-100">
                <h2 className="font-heading font-extrabold text-[18px] text-gray-900 mb-6">1. Basic Info</h2>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[13px] font-bold text-gray-700">Property Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Modern Villa with Sea View" className="h-12 rounded-xl border-gray-200 focus-visible:ring-[#E8622A]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[13px] font-bold text-gray-700">Location / Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Street, City, State" className="h-12 rounded-xl border-gray-200 focus-visible:ring-[#E8622A]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[13px] font-bold text-gray-700">Price ($)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="500,000" className="h-12 rounded-xl border-gray-200 focus-visible:ring-[#E8622A]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Card 2: Details */}
              <div className="bg-white rounded-[16px] p-8 shadow-sm border border-gray-100">
                <h2 className="font-heading font-extrabold text-[18px] text-gray-900 mb-6">2. Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="bedrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[13px] font-bold text-gray-700">Bedrooms</FormLabel>
                        <FormControl>
                          <Input type="number" className="h-12 rounded-xl border-gray-200 focus-visible:ring-[#E8622A]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bathrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[13px] font-bold text-gray-700">Bathrooms</FormLabel>
                        <FormControl>
                          <Input type="number" className="h-12 rounded-xl border-gray-200 focus-visible:ring-[#E8622A]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[13px] font-bold text-gray-700">Area (sq ft)</FormLabel>
                        <FormControl>
                          <Input type="number" className="h-12 rounded-xl border-gray-200 focus-visible:ring-[#E8622A]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Card 3: Images */}
              <div className="bg-white rounded-[16px] p-8 shadow-sm border border-gray-100">
                <h2 className="font-heading font-extrabold text-[18px] text-gray-900 mb-6">3. Images</h2>
                <div className="border-2 border-dashed border-gray-200 rounded-[16px] h-48 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors">
                  <ImageIcon className="w-10 h-10 text-[#a0afbe] mb-3" />
                  <p className="text-[14px] text-[#64748b] font-medium"><span className="text-[#E8622A] font-bold">Upload a file</span> or drag and drop</p>
                  <p className="text-[12px] text-[#a0afbe] mt-1">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>

              {/* Card 4: Amenities */}
              <div className="bg-white rounded-[16px] p-8 shadow-sm border border-gray-100">
                <h2 className="font-heading font-extrabold text-[18px] text-gray-900 mb-6">4. Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
                  {amenitiesList.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="amenities"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value || []), item.id])
                                    : field.onChange(
                                        field.value?.filter((value) => value !== item.id)
                                      )
                                }}
                                className="border-gray-300 data-[state=checked]:bg-[#E8622A] data-[state=checked]:border-[#E8622A]"
                              />
                            </FormControl>
                            <FormLabel className="text-[14px] font-medium text-gray-700 cursor-pointer">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4 pb-12">
                <button type="submit" className="bg-[#E8622A] hover:bg-[#c04b1c] text-white font-bold py-3.5 px-8 rounded-full transition-colors shadow-md text-[15px]">
                  Publish Listing
                </button>
              </div>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
}

import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NewListingPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center font-sans">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
          <Home className="w-8 h-8 text-primary" />
        </div>
        <h1 className="font-heading font-bold text-2xl text-foreground">Add New Property</h1>
        <p className="text-muted max-w-sm">This feature is coming soon. The property listing form will be available here.</p>
        <Link href="/agent/dashboard" className="inline-block bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 rounded-xl transition-colors">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

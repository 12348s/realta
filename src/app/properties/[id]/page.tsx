import PropertyDetailClient from './PropertyDetailClient';

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  return <PropertyDetailClient propertyId={params.id} />;
}

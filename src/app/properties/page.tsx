import PropertiesClient from './PropertiesClient';

export default function PropertiesPage({
  searchParams,
}: {
  searchParams: { location?: string };
}) {
  return <PropertiesClient initialLocation={searchParams.location} />;
}

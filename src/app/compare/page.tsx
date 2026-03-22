import CompareClient from './CompareClient';

export default function ComparePage({ searchParams }: { searchParams: { id?: string } }) {
  return <CompareClient initialId={searchParams.id} />;
}

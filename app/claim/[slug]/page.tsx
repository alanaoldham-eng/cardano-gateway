import { ClaimFlow } from "@/components/ClaimFlow";
import { getCampaignBySlug } from "@/lib/mockCampaigns";

type ClaimPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ClaimPage({ params }: ClaimPageProps) {
  const { slug } = await params;
  const campaign = getCampaignBySlug(slug);

  return (
    <div className="bg-slate-50">
      <section className="bg-tellus-teal px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-tellus-mint">Claim page</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">Claim a Cardano-native badge concept</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-tellus-mint">
            A QR-ready claim destination for campaigns. v003 stores claims locally and leaves native asset minting for v004.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <ClaimFlow slug={slug} campaign={campaign} />
      </section>
    </div>
  );
}

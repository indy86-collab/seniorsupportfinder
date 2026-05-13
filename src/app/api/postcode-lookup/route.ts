import { findEntryForCouncilNames, looksLikePostcode } from "@/lib/postcode";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postcode = searchParams.get("postcode")?.trim() || "";

  if (!looksLikePostcode(postcode)) {
    return Response.json({ error: "Enter a full UK postcode." }, { status: 400 });
  }

  const response = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    return Response.json({ error: "We could not find that postcode." }, { status: 404 });
  }

  const data = await response.json();
  const result = data?.result;
  const entry = findEntryForCouncilNames([
    result?.admin_district,
    result?.admin_county,
  ]);

  if (!entry) {
    return Response.json(
      {
        error: "We found the postcode, but it does not match a council area in this directory yet.",
        district: result?.admin_district,
        county: result?.admin_county,
      },
      { status: 404 },
    );
  }

  return Response.json({
    slug: entry.slug,
    location: entry.name,
    district: result?.admin_district,
    county: result?.admin_county,
  });
}

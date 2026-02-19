import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json({ reviews: [] });
  }

  try {
    // Places API (New)
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?languageCode=en`,
      {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'reviews',
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      return NextResponse.json({ reviews: [] });
    }

    const data = await res.json();

    if (!data.reviews?.length) {
      return NextResponse.json({ reviews: [] });
    }

    const reviews = data.reviews.map((r: any) => ({
      name: r.authorAttribution?.displayName ?? 'Google Customer',
      rating: r.rating,
      text: r.text?.text ?? '',
      platform: 'Google',
      date: r.relativePublishTimeDescription ?? '',
    }));

    return NextResponse.json({ reviews });
  } catch {
    return NextResponse.json({ reviews: [] });
  }
}

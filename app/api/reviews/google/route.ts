import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json({ reviews: [] });
  }

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}&reviews_sort=newest&language=en`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      return NextResponse.json({ reviews: [] });
    }

    const data = await res.json();

    if (data.status !== 'OK' || !data.result?.reviews?.length) {
      return NextResponse.json({ reviews: [] });
    }

    const reviews = data.result.reviews.map((r: any) => ({
      name: r.author_name,
      rating: r.rating,
      text: r.text,
      platform: 'Google',
      date: r.relative_time_description ?? '',
    }));

    return NextResponse.json({ reviews });
  } catch {
    return NextResponse.json({ reviews: [] });
  }
}

import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';
import { db } from '~/server/db';

type ResponseData = {
    users?: object[];
    offers?: object[];
    funnels?: object[];
    sources?: object[];
    country?: object[];
}
 
export async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  const countries = await db.country.findMany({})

  return NextResponse.json({
    "success": true,
    "data": countries.map(({ id, code }, index) => ({
      "id": id,
      "ISO_2": code
    })),
    "message": "Countries select"
})
}

export const revalidate = 0

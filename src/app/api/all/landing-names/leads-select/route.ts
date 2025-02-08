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

  const countries = await db.funnel.findMany({})

  return NextResponse.json({
    "success": true,
    "data": countries.map(({ id, name }, index) => ({
      "id": id,
      "name": name,
      "group_id": null
})),
    "message": "Countries select"
})
}

export const revalidate = 0

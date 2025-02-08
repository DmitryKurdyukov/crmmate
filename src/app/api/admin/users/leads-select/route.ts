import type { NextApiRequest, NextApiResponse } from 'next'
import { data } from './data';
import { NextResponse } from 'next/server';

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
  return NextResponse.json(data)
}

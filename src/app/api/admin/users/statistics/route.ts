import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';
import { db } from '~/server/db';
import { dates } from './date';

type ResponseData = {
  users?: object[];
  offers?: object[];
  funnels?: object[];
  sources?: object[];
  country?: object[];
}

type Period = 'today' | 'yesterday' | 'this_week' | 'last_week' | 'this_month' | 'last_month' | 'this_year' | 'last_year' | 'all'

type Type = 'buying' | 'network';

type RequestQuery = {
  period?: Period
  sendType: 'total' | 'sended'
  dateType: 'created_at' | 'sended_date'
  country_ids?: string;
  landing_name_ids?: string
  type: Type
  ftdType: 'ftd_by_date'
  date_start_sended?: 'string' //2024-10-30 0:0:0
  date_end_sended?: 'string' // 2024-10-30 23:59:59
}

function generateUsername(minLength = 5, maxLength = 12) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  let username = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    username += characters[randomIndex];
  }

  return username;
}

async function serializeReports(
  reports: Report[],
  getAdditionalFieldsFn: (params: object) => Promise<object>
) {

  const result = [];

  for (const report of reports) {
    const leads = report._sum.leads ?? 0;
    // @ts-ignore
    const ftd = report._sum.ftd ?? 0;
    // @ts-ignore
    const nbt = report._sum.nbt ?? 0;
    // @ts-ignore
    const invalid = report._sum.invalid ?? 0;

    const valid = leads - invalid;

    function getPercentage(num) {
      return (num / leads * 100).toFixed(2)
    }

    const props = await getAdditionalFieldsFn(report);

    result.push({
      "leads_count": leads,
      "ftd": `${ftd}<br> (${getPercentage(ftd)}%)`,
      "invalid_leads_count": `${invalid}<br> (${getPercentage(invalid)}%)`,
      "no_answer_leads_count": `${nbt}<br> (${getPercentage(nbt)}%)`,
      "valid_leads": `${valid}<br> (${getPercentage(valid)}%)`,
      "buy": "0.00",
      "revenue": "0",
      "cost": "0.00",
      "profit": "0",
      "roi": "0.00",
      // @ts-ignore
      ...props
    })
  }

  return result;
}

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  const url = new URL(req.url)
  const searchParams = new URLSearchParams(url.search)
  const type = searchParams.get('type') as Type;
  const period = searchParams.get('period') as Period;
  const countryIds = (searchParams.get('country_ids') || "").split(',') as string[];
  const dateType = searchParams.get('dateType') as Period;

  const date_start_sended = searchParams.get('date_start_sended');
  const date_end_sended = searchParams.get('date_end_sended');

  const [gte, lte] = (dates[period] ?? dates.today).getTimes();

  const where = {
    isNetwork: type === 'buying' ? false : true,
    ...((countryIds?.length && countryIds[0]) ? { countryId: { in: countryIds } } : {}),

    [dateType]: {
      gte: date_start_sended ? new Date(date_start_sended) : gte,
      lte: date_end_sended ? new Date(date_end_sended) : lte
    }
    // ...input.countryId ? {
    //   countryId: input.countryId,
    // } : {},
  }

  const sum = {
    leads: true,
    ftd: true,
    nbt: true,
    invalid: true,
  }

  const reportsGroupByFunnel = await db.report.groupBy({
    // @ts-ignore
    by: ['funnelId'],
    // @ts-ignore
    where,
    // @ts-ignore
    _sum: sum
  })

  const funnelsReports = await serializeReports(
    // @ts-ignore
    reportsGroupByFunnel,
    async (report: { funnelId: string }) => {
      const funnel = await db.funnel.findUnique({
        where: {
          id: report.funnelId
        }
      })

      return {
        "funnel": funnel.name
      }
    }
  );

  const reportsGroupByCountry = await db.report.groupBy({
    by: ['countryId'],
    // @ts-ignore
    where,
    // @ts-ignore
    _sum: sum
  })

  const countriesReports = await serializeReports(
    // @ts-ignore
    reportsGroupByCountry,
    async (country: { countryId: string }) => {
      const countryDb = await db.country.findUnique({
        where: {
          id: country.countryId
        }
      })

      return {
        "country": countryDb?.code || "RU"
      }
    }
  );


  const fakelength = funnelsReports.length ?? countriesReports.length ?? 0;

  return NextResponse.json({
    "users": Array(fakelength > 0 ? fakelength + 2 : fakelength).fill(null).map(() => ({
      "user": generateUsername(),
      "user_id": 17,
      "leads_count": 7,
      "ftd": "0<br> (0.00%)",
      "invalid_leads_count": "0<br> (0.00%)",
      "no_answer_leads_count": "4<br> (57.14%)",
      "valid_leads": "7<br> (100.00%)",
      "buy": "0.00",
      "revenue": "0",
      "cost": "0.00",
      "profit": "0",
      "roi": "0.00"
    })),
    "offers": Array(fakelength > 2 ? fakelength -1 : fakelength).fill(null).map(() => ({
      "leads_count": 3,
      "ftd": "0<br> (0.00%)",
      "invalid_leads_count": "0<br> (0.00%)",
      "no_answer_leads_count": "1<br> (33.33%)",
      "valid_leads": "3<br> (100.00%)",
      "buy": 0,
      "revenue": "0",
      "cost": "0.00",
      "roi": "0.00",
      "offer": generateUsername(8, 20),
      "offer_id": 132,
      "profit": "0"
    })),
    "funnels": funnelsReports,
    "sources": [],
    "country": countriesReports
  })
}

export const revalidate = 0

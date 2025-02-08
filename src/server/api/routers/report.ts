import { formDataToObject } from "@trpc/server/unstable-core-do-not-import";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

function getLastWeek() {
  const date = new Date();
  date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
  return date.toISOString();
}

function getTodayNightTime() {
  const date = new Date();
  date.setHours(23, 59, 0, 0);
  return date.toISOString();
}

export const reportRouter = createTRPCRouter({

  getList: protectedProcedure
    .input(z.object({ countryId: z.string().min(1).optional(), lte: z.string().optional().nullable(), gte: z.string().optional().nullable() }))
    .query(async ({ ctx, input }) => {

      const reports = await ctx.db.report.groupBy({
        by: ['countryId'],
        where: {
          ...input.countryId ? {
            countryId: input.countryId,
          } : {},
          date: {
            gte: input.gte ? new Date(input.gte) : new Date(getLastWeek()),
            lte: input.lte ? new Date(input.lte) : new Date(getTodayNightTime())
          }
        },
        _sum: {
          leads: true,
          ftd: true
        },
        // select: {
        //   country: true
        // }
      })

      const aggregated = await Promise.all(reports.map(async (d) => {
        const country = await ctx.db.country.findFirst({ where: { id: d.countryId } });
        return { ...d._sum, country };
      }))

      return aggregated;
    }),

});

import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const countryRouter = createTRPCRouter({

  getList: protectedProcedure.query(async ({ ctx }) => {
    const countries = await ctx.db.country.findMany({
      orderBy: { name: "asc" },
    });

    return countries;
  }),

});

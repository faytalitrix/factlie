import { User } from "@clerk/nextjs/api";
import { clerkClient } from "@clerk/nextjs";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.imageUrl,
  };
}

export const factliesRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.factlie.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const factlies = await ctx.db.factlie.findMany({
      take: 100,
    });

    const users = (
      await clerkClient.users.getUserList({
      userId: factlies.map((factlie) => factlie.authorId),
      limit: 100
    })).map(filterUserForClient);
  
    return factlies.map((factlie) => {
      const author = users.find((user) => user.id === factlie.authorId);

      if(!author) throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Author not found",
      });
      
      return {
        factlie,
        author: {
          id: author.id,
          username: author.username,
          profileImageUrl: author.profileImageUrl,
        }
      }
    });
  })
});

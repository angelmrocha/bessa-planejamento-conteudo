import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { upsertPostNote, getPostNotesByUser } from "./db";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  posts: router({
    saveNote: publicProcedure
      .input(z.object({
        postId: z.string(),
        userId: z.number(),
        status: z.string().optional(),
        observations: z.string().optional(),
        changes: z.string().optional(),
        publishDate: z.string().optional(),
        performance: z.string().optional()
      }))
      .mutation(async ({ input }) => {
        try {
          const result = await upsertPostNote(input.postId, input.userId, {
            status: input.status,
            observations: input.observations,
            changes: input.changes,
            publishDate: input.publishDate,
            performance: input.performance
          });
          
          return {
            success: true,
            data: result
          };
        } catch (error) {
          console.error("Error saving post note:", error);
          throw error;
        }
      }),
    
    getNotes: publicProcedure
      .input(z.object({
        userId: z.number()
      }))
      .query(async ({ input }) => {
        try {
          const notes = await getPostNotesByUser(input.userId);
          return {
            success: true,
            data: notes
          };
        } catch (error) {
          console.error("Error fetching post notes:", error);
          throw error;
        }
      })
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;

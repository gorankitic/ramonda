// zod
import * as z from "zod";
// prisma
import { Server, Member, Profile, ChannelType } from "@prisma/client";

// zod validation schema
export const serverFormSchema = z.object({
    name: z.string().min(1, { message: "Server name is required." }),
    imageUrl: z.string().min(1, { message: "Image is required." })
});

export type ServerFormSchema = z.infer<typeof serverFormSchema>;

export const channelFormSchema = z.object({
    name: z.string()
        .min(1, { message: "Channel name is required." })
        .refine(name => name !== "general", { message: "Channel name can't be 'general'" }),
    type: z.nativeEnum(ChannelType)
});

export type ChannelFormSchema = z.infer<typeof channelFormSchema>;

export type ServerWithMembersWithProfiles = Server & {
    members: (Member & { profile: Profile })[]
}
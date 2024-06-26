"use server";
import type { EntryType } from "@/types";
import * as contentful from "contentful";

const client = contentful.createClient({
	space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",
	accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_ACCESS_TOKEN || "",
});

export async function fetchEntries(limit?: number): Promise<EntryType[]> {
	const entries = await client.getEntries({
		content_type: "mySite",
		order: ["-sys.createdAt"],
		limit,
	});
	return entries.items as unknown as EntryType[];
}
export async function fetchEntry(id: string): Promise<EntryType> {
	const entry = await client.getEntry(id);
	return entry as unknown as EntryType;
}

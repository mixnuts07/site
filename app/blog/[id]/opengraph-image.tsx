import { fetchEntry } from "@/app/api/contentful";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const revalidate = "force-cache";
export const contentType = "image/png";
export const alt = "ogp";
export const size = {
	width: 1200,
	height: 630,
};

// Image generation
export default async function Image({ params }: { params: { id: string } }) {
	const entry = await fetchEntry(params.id);
	const { title } = entry.fields;
	return new ImageResponse(
		<div
			style={{
				fontSize: 48,
				background: "blue",
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			{title}
		</div>,
	);
}

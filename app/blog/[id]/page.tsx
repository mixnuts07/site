import { fetchEntry } from "@/contentful";
import PostComponent from "@/app/_components/PostComponent";

export default async function Page({ params }: { params: { id: string } }) {
  const entry = await fetchEntry(params.id);
  // const entry = await fetchEntry(params.id);
  const { title, body } = entry.fields;
  const { sys } = entry;
  const updatedAt = sys.updatedAt.split("T")[0];
  return (
    <div className="w-4/5 mx-10">
      <div className="mt-10 flex flex-col justify-center items-center mx-10">
        <h1 className="font-sans font-medium">{title?.toString()}</h1>
        <h1 className="pt-3 pb-10 font-sans font-thin">{updatedAt}</h1>
      </div>
      {/*<div className="[&>p]:mb-8 [&>h1]:font-black">*/}
      <PostComponent props={{title,body, updatedAt}} />
    </div>
  );
}

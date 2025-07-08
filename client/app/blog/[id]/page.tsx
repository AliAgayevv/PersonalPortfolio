import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Get id from the URL server-side
  const { id: blogId } = await params;

  console.log("Blog ID:", blogId);

  return <div>page</div>;
}

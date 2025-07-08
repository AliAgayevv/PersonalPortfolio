import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: blogId } = await params;

  console.log("Blog ID:", blogId);

  return <div>page</div>;
}

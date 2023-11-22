import React from "react";
import { trpc } from "../../ultis/trpc";

export default function Editions() {
  const edition = trpc.edition.get.useQuery();

  if (!edition.data) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <p>{edition.data.name}</p>
    </div>
  )
}

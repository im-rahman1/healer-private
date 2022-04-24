import React from "react";
import { useRouter } from "next/router";

export default function Products() {
  const router = useRouter();
  const products = router.query.products;

  return <div>{products}</div>;
}

import React from "react";
import { useRouter } from "next/router";

export default function Products() {
  const router = useRouter();
  const productType = router.query.productType;

  return <div>{productType}</div>;
}

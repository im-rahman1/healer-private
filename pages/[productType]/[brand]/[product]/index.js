import React from "react";
import {useRouter} from "next/router";

export default function Product() {
  const router = useRouter();
  const productName = router.query.product;

  return <div>{productName}</div>;
}

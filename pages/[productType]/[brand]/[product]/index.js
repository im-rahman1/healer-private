import React from "react";
import { useRouter } from "next/router";

export default function Product() {
  const router = useRouter();
  const productName = router.query.product;
  const productBrand = router.query.brand;
  const type = router.query.productType;

  return (
    <div>
      <div>{productName}</div>
      <div>{productBrand}</div>
      <div>{type}</div>
    </div>
  );
}

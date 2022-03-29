import React from "react";
import {useRouter} from "next/router";

export default function Products() {
  const router = useRouter();
  const brandName = router.query.brand;

  return <div>{brandName}</div>;
}

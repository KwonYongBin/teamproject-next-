"use client";

import { useEffect } from "react";
import { api } from "@/utils/dataFetch.js";

export default function CsrfInit() {
  useEffect(() => {
    api.get("/csrf/create");
  }, []);

  return null;
}

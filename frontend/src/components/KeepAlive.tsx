"use client";

import { useEffect } from "react";

export default function KeepAlive() {
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${url}/health`).catch(() => {});
    const interval = setInterval(() => {
      fetch(`${url}/health`).catch(() => {});
    }, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return null;
}
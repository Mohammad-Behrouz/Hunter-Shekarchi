'use client';

import ShekarciHero from "@/components/ShekarciHero";
import { motion } from "framer-motion";
import { Car, Home, Smartphone, Search } from "lucide-react";
import toast from "react-hot-toast";

export default function HomePage() {
  const handleEstimateClick = () => {
    // نمونه استفاده از toast
    toast.success('در حال ارتباط با هوش مصنوعی...');
  };

  return (
   <ShekarciHero/>
  );
}

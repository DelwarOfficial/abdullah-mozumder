"use client";

import { useLanguage } from "@/i18n/language-context";
import { Hero } from "@/components/home/Hero";
import { SelectedReporting } from "@/components/home/SelectedReporting";
import { NewsDesk } from "@/components/home/NewsDesk";
import { PressClippings } from "@/components/journalism/PressClippings";
import { DarkStatement } from "@/components/home/DarkStatement";
import { Career } from "@/components/home/Career";
import { ProfileSpread } from "@/components/home/ProfileSpread";
import { Credentials } from "@/components/home/Credentials";
import { ReportingAreas } from "@/components/home/ReportingAreas";
import { Education } from "@/components/home/Education";
import { Principles } from "@/components/home/Principles";
import { ContactCTA } from "@/components/home/ContactCTA";

/**
 * Client content tree for the home page. English is server-prerendered
 * (matches SSG HTML); switching to বাংলা re-renders this subtree in place.
 */
export function HomeContent() {
  const { language } = useLanguage();

  return (
    <>
      <Hero locale={language} />
      <SelectedReporting locale={language} />
      <NewsDesk locale={language} />
      <PressClippings />
      <DarkStatement locale={language} />
      <Career locale={language} />
      <ProfileSpread locale={language} />
      <Credentials locale={language} />
      <ReportingAreas locale={language} />
      <Education locale={language} />
      <Principles locale={language} />
      <ContactCTA locale={language} />
    </>
  );
}

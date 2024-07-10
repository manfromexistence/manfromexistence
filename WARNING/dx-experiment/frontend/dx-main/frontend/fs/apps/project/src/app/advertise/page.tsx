import { General } from "@/components";
import { Advertise } from "@/container";
import Link from "next/link";
import React from "react";

const AdvertisePage = () => {
  return (
    <main className="md:w-[85%] w-11/12 mx-auto md:my-10 py-4">
      <div className="grid md:grid-cols-2 pb-8">
        <General.AdvertiseHeading>Context</General.AdvertiseHeading>
        <div>
          <General.AdvertiseParagraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </General.AdvertiseParagraph>
          <General.AdvertiseParagraph>
            I offer sponsorship opportunities to companies and individuals
            interested in reaching the Spanish tech ecosystem and its various
            stakeholders: startup founders and employees, corporates, Venture
            Capital firms, educational institutions, government officials and
            public entities.
          </General.AdvertiseParagraph>
        </div>
      </div>
      <Advertise.AudienceStats />
      <Advertise.Preview />
      <div className="grid md:grid-cols-2 pb-8">
        <General.AdvertiseHeading>Previous sponsors</General.AdvertiseHeading>
        <General.AdvertiseParagraph>
          These companies have previously been Dealflow sponsors:{" "}
          <Link href={"/"} className="border-b-2">
            The SaaS Institute
          </Link>
          ,{" "}
          <Link href={"/"} className="border-b-2">
            Ironhack
          </Link>
          ,{" "}
          <Link href={"/"} className="border-b-2">
            Flixbus
          </Link>
          ,{" "}
          <Link href={"/"} className="border-b-2">
            360 Talent
          </Link>
          ,
          <Link href={"/"} className="border-b-2">
            Chicisimo
          </Link>
          ,{""}
          <Link href={"/"} className="border-b-2">
            The SaaS Institute
          </Link>
          ,{" "}
          <Link href={"/"} className="border-b-2">
            Ironhack
          </Link>
          ,{" "}
          <Link href={"/"} className="border-b-2">
            Flixbus
          </Link>
          ,{" "}
          <Link href={"/"} className="border-b-2">
            360 Talent
          </Link>
          ,
          <Link href={"/"} className="border-b-2">
            Chicisimo
          </Link>
          .
        </General.AdvertiseParagraph>
      </div>

      <div className="grid md:grid-cols-2 md:pb-8">
        <General.AdvertiseHeading>
          Pricing and availability
        </General.AdvertiseHeading>
        <div>
          <p className="pb-3 font-medium text-gray-700 text-lg">
            For more details, please contact me at{" "}
            <Link href="mailto:" className="border-b-2">
              temp@gmail.com
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
};

export default AdvertisePage;

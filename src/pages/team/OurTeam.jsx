import Beams from "@/components/Beams";
import { GridScan } from "@/components/GridScan";
import ChromaGrid from "@/components/outTeam/ChromaGrid";
import TeamHeadsComponent from "@/components/outTeam/TeamHeadsComponent";
import Particles from "@/components/Particles";
import React from "react";

const OurTeam = () => {
  return (
    <div className="min-h-screen w-full bg-black">
      {/* <div className="fixed w-full h-full z-10">
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={45}
        />
      </div> */}
      <div style={{ height: "100%", position: "relative" }}>
        <TeamHeadsComponent />
      </div>
    </div>
  );
};

export default OurTeam;

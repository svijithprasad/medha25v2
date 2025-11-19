import React, { useMemo } from "react";
import "./TeamHeadsComponent.css";
import ChromaGrid from "./ChromaGrid";
import ShinyText from "../ShinyText";

// Shuffle function
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const teamMembers = {
  team: [
    {
      name: "Aditya",
      role: "Website Lead",
      image: "/team/adi.png",
      github: "https://github.com/Appuraj46",
      linkedin: "https://www.linkedin.com/in/appuraj-gs",
      isHead: true,
      borderColor: "#4F46E5",
      gradient: "linear-gradient(145deg, #4F46E5, #000)",
    },
    {
      name: "S Vijith Prasad",
      role: "Website Co-Lead",
      image: "/team/vijith.jpg",
      github: "https://github.com/svijithprasad",
      linkedin: "https://www.linkedin.com/in/s-vijith-prasad-5361032b1/",
      isCoHead: true,
      borderColor: "#10B981",
      gradient: "linear-gradient(210deg, #10B981, #000)",
    },
  ],
};

const editorialTeam = {
  team: [
    {
      name: "Prathap",
      role: "Editorial Lead",
      image: "/team/adi.png",
      github: "https://github.com/Appuraj46",
      linkedin: "https://www.linkedin.com/in/appuraj-gs",
      isHead: true,
      borderColor: "#4F46E5",
      gradient: "linear-gradient(145deg, #4F46E5, #000)",
    },
    {
      name: "Deekshal",
      role: "Editorial Co-Lead",
      image: "/team/deekshal.png",
      github: "https://github.com/pruthvi-123-prog",
      linkedin: "https://linkedin.com/in/pruthvi-suvarna-km",
      isCoHead: true,
      borderColor: "#10B981",
      gradient: "linear-gradient(210deg, #10B981, #000)",
    },
  ],
};


const HeadCard = () => {
  const coordinatorItem = [
    {
      image: "/team/darshan.jpg",
      title: "Darshan T",
      subtitle: "President of MCA Department",
      borderColor: "#8B5CF6",
      gradient: "linear-gradient(225deg, #8B5CF6, #000)",
      linkedin:
        "https://www.linkedin.com/in/chirag-bangera-/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      className: "chroma-card-coordinator",
    },
  ];

  return (
    <div
      style={{ minHeight: "450px", position: "relative", marginBottom: "2rem" }}
    >
      <ChromaGrid
        items={coordinatorItem}
        radius={400}
        damping={0.45}
        fadeOut={0.6}
        ease="power3.out"
      />
    </div>
  );
};

const TeamErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const handleError = (error) => {
      console.error("Team Component Error:", error);
      setHasError(true);
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  if (hasError) {
    return (
      <div className="error-container">
        Failed to load team section. Please refresh the page.
      </div>
    );
  }

  return children;
};

const TeamSection = ({ title, members, shouldShuffle = false }) => {
  // Use useMemo to shuffle members only once per component mount
  // Only shuffle if shouldShuffle is true
  const shuffledMembers = useMemo(() => {
    return shouldShuffle ? shuffleArray(members) : members;
  }, []); // Empty dependency array means shuffle only on mount

  // Separate members into groups from shuffled array
  const leads = shuffledMembers
    .filter((m) => m.isHead || m.isCoHead)
    .sort((a, b) => {
      if (a.isHead) return -1;
      if (b.isHead) return 1;
      return 0;
    });

  const regularMembers = shuffledMembers.filter(
    (m) => !m.isHead && !m.isCoHead
  );

  // Transform to ChromaGrid format with lead class
  const leadsItems = leads.map((member) => ({
    image: member.image,
    title: member.name,
    subtitle: member.role,
    borderColor: member.borderColor,
    gradient: member.gradient,
    github: member.github,
    linkedin: member.linkedin,
    className: "chroma-card-lead",
  }));

  const regularItems = regularMembers.map((member) => ({
    image: member.image,
    title: member.name,
    subtitle: member.role,
    borderColor: member.borderColor,
    gradient: member.gradient,
    github: member.github,
    linkedin: member.linkedin,
  }));

  return (
    <div className="medha-team-section bg-black">
      <h2>{title}</h2>

      {/* Lead and Co-Lead Row - Only show if there are leads */}
      {leadsItems.length > 0 && (
        <div>
          <ChromaGrid
            items={leadsItems}
            radius={600}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
          />
        </div>
      )}

      {/* Regular Team Members - Now shuffled */}
      <div style={{ position: "relative" }}>
        <ChromaGrid
          items={regularItems}
          radius={300}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
        />
      </div>
    </div>
  );
};

const TeamComponent = () => {
  return (
    <TeamErrorBoundary>
      <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
        <ShinyText
          text="OUR TEAM"
          disabled={false}
          speed={3}
          className="
            text-[140px]
            sm:text-[140px]
            md:text-[220px]
            lg:text-[300px]
            xl:text-[380px]
            font-bold
            opacity-20
            select-none
            mix-blend-screen
            leading-none
            text-center
          "
        />
      </div>
      <div className="medha-team-container z-20 bg-black">
        <HeadCard />
        <TeamSection
          title="Website Team"
          members={teamMembers.team}
          shouldShuffle={true}
        />
        <TeamSection
          title="Editorial Team"
          members={editorialTeam.team}
          shouldShuffle={false}
        />
      </div>
    </TeamErrorBoundary>
  );
};

export default React.memo(TeamComponent);

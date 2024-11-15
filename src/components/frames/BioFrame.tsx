import Frame from "../Frame";

const PROJECT_LINKS = {
  dYdX: "https://dydx.trade/trade",
  "Instagram Shopping": "https://about.instagram.com/features/shopping",
  "Wit.ai": "https://wit.ai/",
  Messenger: "https://www.messenger.com/features",
};

const BioFrame = () => {
  const getProjectLink = (project: keyof typeof PROJECT_LINKS) => (
    <a
      href={PROJECT_LINKS[project]}
      target="_blank"
      rel="noreferrer"
      className="border-b-1 border-light border-opacity-10"
    >
      {project}
    </a>
  );

  return (
    <Frame tagName="bio" w={320} className="min-w-[100px] px-4 py-2">
      <p className="leading-[1.1rem]">
        <b>Frontend engineer</b> & yogi based in nyc. Love good design,
        creating, and traveling. Built trading experiences at{" "}
        {getProjectLink("dYdX")}, optimized shopping at{" "}
        {getProjectLink("Instagram Shopping")}, shipped NLP tooling &
        integrations at {getProjectLink("Wit.ai")} (Facebook / Meta AI), and
        made chatting more fun at {getProjectLink("Messenger")}. <b>Open</b> to
        contract & full-time opportunities!
      </p>
    </Frame>
  );
};

export default BioFrame;

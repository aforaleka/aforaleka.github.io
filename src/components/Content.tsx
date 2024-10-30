import React from "react";

import styled from "styled-components";

const PROJECT_LINKS = {
  dYdX: "https://dydx.trade/trade",
  "Instagram Shopping": "https://about.instagram.com/features/shopping",
  "Wit.ai": "https://wit.ai/",
  Messenger: "https://www.messenger.com/features",
};

const OTHER_LINKS = {
  resume: "./aleka_cheung_resume_latest.pdf",
  github: "https://github.com/aforaleka",
  linkedin: "https://www.linkedin.com/in/alekacheung/",
  spotify: "https://open.spotify.com/user/aleka.",
  ig: "https://www.instagram.com/____aleka/",
  email: "mailto:alekacheung@gmail.com",
};

type OtherLink = keyof typeof OTHER_LINKS;

const Content: React.VFC = () => {
  const getProjectLink = (project: keyof typeof PROJECT_LINKS) => (
    <ProjectLink href={PROJECT_LINKS[project]} target="_blank" rel="noreferrer">
      {project}
    </ProjectLink>
  );

  const getOtherLink = (link: OtherLink) => (
    <a href={OTHER_LINKS[link]} target="_blank" rel="noreferrer">
      {link}
    </a>
  );

  return (
    <Wrapper>
      <Section>
        <p>
          Hello hello, I'm <b>Aleka Cheung</b>.
        </p>
        <p>
          <b>Frontend engineer</b> & yogi based in nyc. Love good design,
          creating, and traveling. Built trading experiences at{" "}
          {getProjectLink("dYdX")}, optimized shopping at{" "}
          {getProjectLink("Instagram Shopping")}, shipped NLP integrations at{" "}
          {getProjectLink("Wit.ai")}, and made chat more fun at{" "}
          {getProjectLink("Messenger")}. <b>Open</b> to contract / full-time
          opportunities!
        </p>
      </Section>

      <OtherSection>
        <div>
          {Object.keys(OTHER_LINKS).map((value) =>
            getOtherLink(value as OtherLink)
          )}
          </div>
      </OtherSection>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  max-width: 36rem;
  min-width: 10rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 0 2rem;
  margin: 0 auto;
  z-index: 2;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2;
`;

const ProjectLink = styled.a`
  border-bottom: 2px solid var(--color-text-underline);
`;

const OtherSection = styled(Section)`
  a:not(:first-of-type)::before {
    content: " · ";
  }
`;

export default Content;

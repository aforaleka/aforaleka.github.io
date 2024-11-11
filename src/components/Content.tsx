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
  instagram: "https://www.instagram.com/____aleka/",
  email: "mailto:alekacheung@gmail.com",
};

const Content: React.VFC = () => {
  const getProjectLink = (project: keyof typeof PROJECT_LINKS) => (
    <ProjectLink href={PROJECT_LINKS[project]} target="_blank" rel="noreferrer">
      {project}
    </ProjectLink>
  );

  const getOtherLinks = () =>
    Object.entries(OTHER_LINKS).map(([key, link]) => (
      <a href={link} target="_blank" rel="noreferrer">
        {key}
      </a>
    ));

  return (
    <Wrapper>
      <Section>
        <p>
          Hello hello, I'm
          <Name>Aleka Cheung</Name>
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
        <div>see my {getOtherLinks()}</div>
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
  pointer-events: none;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2;
`;

const Name = styled.h1`
  font-size: 4rem;
  letter-spacing: -2px;
  font-weight: 500;
  line-height: 0.5;

  -webkit-transform: scale(1, 1.1);
  -moz-transform: scale(1, 1.1);
  -ms-transform: scale(1, 1.1);
  -o-transform: scale(1, 1.1);
  transform: scale(1, 1.1);
  transform-origin: 0 0;
  margin-bottom: 0.5rem;
`;

const ProjectLink = styled.a`
  border-bottom: 1px solid var(--color-text-underline);
`;

const OtherSection = styled(Section)`
  a::before {
    content: " · ";
  }
`;

export default Content;

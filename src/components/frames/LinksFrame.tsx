import Frame from "../Frame";

const LINKS = {
  github: "https://github.com/aforaleka",
  linkedin: "https://www.linkedin.com/in/alekacheung/",
  email: "mailto:alekacheung@gmail.com",
};

const LinksFrame = () => (
  <Frame
    tagName="work with me"
    className="font-mono text-xs gap-2 w-fit px-4 py-2"
    resizable={false}
  >
    {Object.entries(LINKS).map(([key, link]) => (
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="after:content-['↗']"
      >
        {key}
      </a>
    ))}
  </Frame>
);

export default LinksFrame;

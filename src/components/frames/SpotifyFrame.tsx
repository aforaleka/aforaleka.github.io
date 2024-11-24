import Frame from "../Frame";

const SpotifyFrame = () => (
  <Frame
    tagName="listen"
    className="bg-[#1F1F1F] min-w-[300px] min-h-[152px] max-h-[152px]"
    resizable={false}
  >
    <iframe
      title="spotify"
      src="https://open.spotify.com/embed/playlist/7tF77olFYsfPektQWDu6bQ?utm_source=generator&theme=0"
      width="100%"
      height="152"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  </Frame>
);

export default SpotifyFrame;

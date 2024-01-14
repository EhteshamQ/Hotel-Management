import ClientComponent from "./ClientComponent";
import { heading1, paragraph, section2 } from "./ServerComponent";

const HeroSection = () => {
  return (
    <ClientComponent
      heading={heading1}
      paragraph={paragraph}
      section2={section2}
    />
  );
};

export default HeroSection;

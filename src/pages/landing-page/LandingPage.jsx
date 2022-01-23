import Footer from "./footer/Footer";
import GetStarted from "./getStarted/GetStarted";
import "./LandingPage.scss";
import Section from "./section/Section";
import SectionItem from "./section/section item/SectionItem";
const sectionData = {
  section1: {
    title: "Get more visibility",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
  },
  section2: {
    title: "Organize your candidates",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
  },
  section3: {
    title: "Verify their abilities",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
  },
};
export default function LandingPage() {
  return (
    <div className="landing-page-section">
      {/* Get started */}
      <GetStarted />
      {/* why us section */}
      <Section>
        <SectionItem
          title={sectionData.section1.title}
          description={sectionData.section1.description}
        />
        <SectionItem
          title={sectionData.section2.title}
          description={sectionData.section2.description}
        />
        <SectionItem
          title={sectionData.section3.title}
          description={sectionData.section3.description}
        />
      </Section>
      {/* Footer */}
      <Footer />
    </div>
  );
}

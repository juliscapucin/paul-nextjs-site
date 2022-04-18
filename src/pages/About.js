import Paragraph from "../components/Paragraph";
import Title from "../components/Title";

import "../styles/pages.scss";

function About() {
  return (
    <section className='section-about'>
      <div className='about-wrapper'>
        <div className='about-image'>
          <img
            src='http://2022.juliscapucin.com/wp-content/uploads/2022/04/Paul-de-Heer.jpeg'
            alt='Paul de Heer'
          />
        </div>
        <div className='about-text'>
          <div className='about-title'>
            <Title text={"About me"} />
          </div>
          <div className='about-paragraph'>
            <Paragraph
              textParagraph={`<p>I have been working as an editor on national and international filmprojects since 2004. I studied film at the School of Arts Utrecht, English (University of Groningen) and PsychoIogy (University of Groningen).<p>I am an active member of the Netherlands association of Cinema Editors (NCE) and the Dutch Academy for Film (DAFF).</p><p>Don't be shy to contact me. I'm always open to making something beautiful together.</p>`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

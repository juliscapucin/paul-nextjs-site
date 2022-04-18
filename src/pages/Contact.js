import Paragraph from "../components/Paragraph";
import Title from "../components/Title";
import Map from "../components/Map";
import "../styles/pages.scss";

function Contact() {
  return (
    <section className='section-contact'>
      <div className='contact-wrapper'>
        <div className='contact-title'>
          <Title text={"Contact"} />
        </div>
        <div className='contact-paragraph'>
          <Paragraph textParagraph='<p>NDSM Plein 155</br>1033 WB, Amsterdam</br>tel: 0031 (0) 6 21 65 44 77</br>@: paul@pauldeheer.com</p><p>My studio is at the NDSM, the beautiful old dockyard area of Amsterdam. You can take a direct ferry from central station.</p>' />
        </div>
      </div>
      <Map />
    </section>
  );
}

export default Contact;

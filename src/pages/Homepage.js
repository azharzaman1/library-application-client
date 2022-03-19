import Container from "../components/Generic/Layout/Container";
import Hero from "../components/Home/Hero";

const Homepage = () => {
  return (
    <div className="">
      <section
        className="homeHero__Section"
        style={{
          backgroundImage: `url(https://i.ibb.co/hFh0JGk/white-waves.png)`,
        }}
      >
        <Container maxWidth="xl">
          <Hero />
        </Container>
      </section>
    </div>
  );
};

export default Homepage;

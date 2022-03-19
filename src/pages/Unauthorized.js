import Chip from "../components/Generic/Chip";
import Heading from "../components/Generic/Heading";
import Container from "../components/Generic/Layout/Container";

const Unauthorized = () => {
  return (
    <div>
      <Container>
        <div className="w-full flex flex-col items-center justify-center min-h-[50vh]">
          <Heading>Unauthorized</Heading>
          <Heading className="mt-3" type="secondary">
            If you are sure you have access, please contact admin
          </Heading>
          <div className="mt-4 flex items-center space-x-2">
            <Chip>azharzaman.001@gmail.com</Chip>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Unauthorized;

import PaymentComponent from "./PaymentWidget/PaymentComponent";
import { Container } from "react-bootstrap";

const PK_TEST =
  "pk_test_51Lx5qsGk9QczIREZpDbqjZyvsaRSPUY0grzLNOYs0TOdQl79nEgyuuZMjflNM5HJ0TGtDGZyVeKV0GCLYF4BcLF700q7sKpf15";

const Home = () => {
  return (
    <Container>
      <PaymentComponent
        keys={{
          stripe: PK_TEST,
        }}
      />
    </Container>
  );
};

export default Home;

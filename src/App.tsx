import { Elements } from "@stripe/react-stripe-js";
import CdrReport from "./components/CdrReport";
import { loadStripe } from "@stripe/stripe-js";



function App() {
  
const stripePromise = loadStripe('pk_test_YourPublicKeyHere');
  return (
     <Elements stripe={stripePromise}>
      <CdrReport />
    </Elements>
  );
}

export default App;

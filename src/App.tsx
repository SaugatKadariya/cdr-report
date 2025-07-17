import { Elements } from "@stripe/react-stripe-js";
import CdrReport from "./components/CdrReport";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function App() {
  return (
    <Elements stripe={stripePromise}>
      <CdrReport />
    </Elements>
  );
}

export default App;

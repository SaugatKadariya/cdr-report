import { Elements } from "@stripe/react-stripe-js";
import CdrReport from "./components/CdrReport";
import { loadStripe } from "@stripe/stripe-js";



function App() {
  
const stripePromise = loadStripe('pk_test_51L52aeDo17ticfh1Y93ZuFF7dMAtZgNk7ZcVuKt1Qgf6BLeJutRhCYaaYrn97L2Ji7zwlEWhMhWyjHKhTrPeEe6U00X2dv48jH');
  return (
     <Elements stripe={stripePromise}>
      <CdrReport />
    </Elements>
  );
}

export default App;

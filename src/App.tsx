import "./App.css";
import { Client } from "./utils/Client";
import { useStateWithAccessors } from "./hooks/useStateWithAccesors";
import { createGettersWithLogging } from "./utils/GettersGenerator";

function App() {
  // Use our custom hook
  const client = useStateWithAccessors<Client>({
    name: "Alice",
    address: "123 Main St",
  }, createGettersWithLogging);

  return (
    <>
      <h2>Client Object</h2>
      <pre>{JSON.stringify(client.state, null, 2)}</pre>
      
      <h1>Client Information</h1>
      <p>Name: {client.getName()}</p>
      <p>Address: {client.getAddress()}</p>
      
      <button onClick={() => client.setName("Charlie")}>
        Change Name to Charlie
      </button>
      <button onClick={() => client.setAddress("789 Pine St")}>
        Change Address
      </button>
    </>
  );
}

export default App;

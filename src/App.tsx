import "./App.css";
import { Client } from "./utils/Client";
import { createGetters } from "./utils/GettersGenerator";
import { createGettersAndSetters } from "./utils/GettersAndSetters";

function App() {
  const client: Client = {
    name: "Alice",
    address: "123 Main St",
  };
  const clientWithGetters = createGetters(client);
  const clientWithBoth = createGettersAndSetters(client);

  return (
    <>
      <h2>Client Object</h2>
      <pre>{JSON.stringify(client, null, 2)}</pre>
      <h1>Client Information</h1>
      
      <h2>Read Only Client</h2>
      <p>Name: {clientWithGetters.getName()}</p>
      <p>Address: {clientWithGetters.getAddress()}</p>
      
      <h2>Client with Both Getters and Setters</h2>
      <p>Name: {clientWithBoth.getName()}</p>
      <p>Address: {clientWithBoth.getAddress()}</p>
      <button onClick={() => clientWithBoth.setName("Charlie")}>Change Name to Charlie</button>
      <button onClick={() => clientWithBoth.setAddress("789 Pine St")}>Change Address</button>
    </>
  );
}

export default App;

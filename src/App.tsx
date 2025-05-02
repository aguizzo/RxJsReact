import "./App.css";
import { Client } from "./utils/Client";
import { createGetters } from "./utils/GettersGenerator";

function App() {
  const client: Client = {
    name: "Alice",
    address: "123 Main St",
  };
  const clientWithGetters = createGetters(client);

  console.log(clientWithGetters);
  return (
    <>
      <h1>Client Information</h1>
      <p>Name: {clientWithGetters.getName()}</p>
      <p>Address: {clientWithGetters.getAddress()}</p>
      <h2>Client Object</h2>
      <pre>{JSON.stringify(client, null, 2)}</pre>
    </>
  );
}

export default App;

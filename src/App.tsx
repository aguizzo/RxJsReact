import "./App.css";
import { Client } from "./utils/Client";
import { useStateWithAccessors } from "./hooks/useStateWithAccesors";
import { makeLoggingAccessors } from "./utils/accessorFactory";
import ObservableExample from "./ObservableExample";
import PokemonSearch from "./PokemonSearch";

function App() {
  const client = useStateWithAccessors<Client>(
    {
      name: "Alice",
      address: "123 Main St",
    },
    makeLoggingAccessors
  );

  return (
    <>
      <h1>Client Information</h1>
      <p>Name: {client.getName()}</p>
      <p>Address: {client.getAddress()}</p>
      <button onClick={() => client.setName("Charlie")}>
        Change Name to Charlie
      </button>
      <button onClick={() => client.setAddress("789 Pine St")}>
        Change Address
      </button>
      <ObservableExample />
      <PokemonSearch />
    </>
  );
}

export default App;

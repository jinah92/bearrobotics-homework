import "./App.css";
import "./styles/tailwind.css";
import Dashboard from "./components/Dashboard";
import { StarredProvider } from "./contexts/StarredContext";
import { LocationProvider } from "./contexts/LocationContext";
import Header from "./components/SearchHeader";
import Title from "./components/Title";

function App() {
  return (
    <StarredProvider>
      <LocationProvider>
        <div className="p-5">
          <Title />
          <Header />
          <Dashboard />
        </div>
      </LocationProvider>
    </StarredProvider>
  );
}

export default App;

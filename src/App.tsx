import Playground from "./components/playground";
import "./App.css";
import { PlaygroundProvider } from "./components/playground/Provider";
function App() {
  return (
    <PlaygroundProvider>
      <Playground />
    </PlaygroundProvider>
  );
}

export default App;

import { Toaster } from "react-hot-toast";
// import Header from "./components/Header";
import SearchContainer from "./components/SearchContainer";
import { SearchProvider } from "./context/SearchContext";

function App() {
  return (
    <SearchProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Toaster position="top-center" />
        {/* <Header /> */}
        <main className="flex-grow flex flex-col items-center">
          <SearchContainer />
        </main>
      </div>
    </SearchProvider>
  );
}

export default App;

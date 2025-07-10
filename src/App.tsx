// Make sure the file exists at src/components/Spreadsheet.tsx or update the path accordingly
// Make sure Spreadsheet.tsx exists in src/components. If not, create it or update the path below.
import Spreadsheet from "./components/Spreadsheet";


export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">📊 React Spreadsheet (Intern Assignment)</h1>
      <h1 className="text-3xl text-red-500 font-bold">Tailwind is working!</h1>

      <Spreadsheet />
    </div>
  );
}

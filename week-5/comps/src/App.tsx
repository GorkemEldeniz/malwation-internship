import Buttons from "./components/Buttons";
import Selects from "./components/Selects";
import Table from "./components/Table/Table";

const data = [
  {
    name: "asd",
    age: 12,
    gender: "male",
    isAdult: false,
  },
  {
    name: "asd",
    age: 12,
    gender: "male",
    isAdult: false,
  },
  {
    name: "asd",
    age: 12,
    gender: "male",
    isAdult: false,
  },
  {
    name: "asd",
    age: 12,
    gender: "male",
    isAdult: false,
  },
];

export type Data = (typeof data)[0];
function App() {
  return (
    <div>
      <h1>Dynamic Custom Table</h1>
      <Table data={data} />
      <Buttons />
      <Selects />
    </div>
  );
}

export default App;

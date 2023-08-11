// import Icon from "./components/ui/Icon";
// import Spinner from "./components/ui/spinner";
import { Button } from "./components/ui/button";
import { Select } from "./components/ui/select";

function App() {
  return (
    <div>
      <Select error required name="gender" size="lg">
        <option value="male">Male</option>
        <option value="female">Female</option>
      </Select>
      <Button loading size="md">
        Hello
        {/* <Icon fill="black" width="10" height="10" id="icon-3" /> */}
        {/* <Spinner fill="blue" /> */}
      </Button>
    </div>
  );
}

export default App;

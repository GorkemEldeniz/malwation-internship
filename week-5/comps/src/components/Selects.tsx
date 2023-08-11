import { Select } from "./ui/select";

function Selects() {
  return (
    <section className="mt-8">
      <h1 className="text-2xl font-bold">Selects</h1>
      <div className="grid w-fit grid-cols-4 gap-5">
        <div>
          <h5>Select Default</h5>
          <Select>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
        </div>
        <div>
          <h5>Select Default Disabled</h5>
          <Select disabled>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
        </div>
        <div>
          <h5>Select Color:Blue</h5>
          <Select color="blue">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
        </div>
        <div>
          <h5>Select Color:Red</h5>
          <Select color="red">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
        </div>
        <div>
          <h5>Select Color:Yellow</h5>
          <Select color="yellow">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
        </div>

        <div>
          <h5>Select Modifier:Blue</h5>
          <Select modifier="blue">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
        </div>
        <div>
          <h5>Select Modifier:Red</h5>
          <Select modifier="red">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
        </div>
        <div>
          <h5>Select Modifier:Yellow</h5>
          <Select modifier="yellow">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
        </div>
        <div>
          <h5>Select Default Error</h5>
          <Select error>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
        </div>
      </div>
    </section>
  );
}

export default Selects;

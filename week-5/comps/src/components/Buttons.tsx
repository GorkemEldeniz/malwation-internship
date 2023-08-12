import { Button } from "./ui/button";

function Buttons() {
  return (
    <section>
      <h1 className="text-2xl font-bold">Buttons</h1>

      <div className="grid w-fit grid-cols-4 gap-5">
        <div>
          <h5>Button Default</h5>
          <Button label="Button" />
        </div>
        <div>
          <h5>Button Default Disabled</h5>
          <Button label="Button" disabled />
        </div>
        <div>
          <h5>Button Color:Blue</h5>
          <Button variant="primary" label="Button" />
        </div>
        <div>
          <h5>Button Color:Blue Disabled</h5>
          <Button disabled variant="primary" label="Button" />
        </div>
        <div>
          <h5>Button Color:Red</h5>
          <Button variant="destructive" label="Button" />
        </div>
        <div>
          <h5>Button Color:Yellow</h5>
          <Button label="Button" variant="alert" />
        </div>
        <div>
          <h5>Button Modifier:Blue</h5>
          <Button label="Button" loader modifier="outline" />
        </div>
        <div>
          <h5>Button Size:SM</h5>
          <Button size="sm" label="Button" />
        </div>
        <div>
          <h5>Button Size:MD</h5>
          <Button size="md" label="Button" />
        </div>
        <div>
          <h5>Button Size:LG</h5>
          <Button size="lg" label="Button" />
        </div>
        <div>
          <h5>Button With Left Icon</h5>
          <Button IconLeft label="Button" />
        </div>
        <div>
          <h5>Button With Right Icon</h5>
          <Button IconRigth label="Button" />
        </div>
        <div>
          <h5>Default Button With Loading statement</h5>
          <Button loader label="Button" />
        </div>
        <div>
          <h5>Color Button With Loading statement</h5>
          <Button variant="primary" loader label="Button" />
        </div>
        <div>
          <h5>Modifier Button With Loading statement</h5>
          <Button modifier="outline" loader label="Button" />
        </div>
      </div>
    </section>
  );
}

export default Buttons;

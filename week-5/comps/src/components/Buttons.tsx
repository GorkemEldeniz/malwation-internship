import { Button } from "./ui/button";
import Icon from "./ui/Icon";

function Buttons() {
  return (
    <section>
      <h1 className="text-2xl font-bold">Buttons</h1>

      <div className="grid w-fit grid-cols-4 gap-5">
        <div>
          <h5>Button Default</h5>
          <Button>Button</Button>
        </div>
        <div>
          <h5>Button Default Disabled</h5>
          <Button disabled>Button</Button>
        </div>
        <div>
          <h5>Button Color:Blue</h5>
          <Button color="blue">Button</Button>
        </div>
        <div>
          <h5>Button Color:Blue Disabled</h5>
          <Button disabled color="blue">
            Button
          </Button>
        </div>
        <div>
          <h5>Button Color:Red</h5>
          <Button color="red">Button</Button>
        </div>
        <div>
          <h5>Button Color:Yellow</h5>
          <Button color="yellow">Button</Button>
        </div>
        <div>
          <h5>Button Modifier:Blue</h5>
          <Button modifier="blue">Button</Button>
        </div>
        <div>
          <h5>Button Modifier:Red</h5>
          <Button modifier="red">Button</Button>
        </div>
        <div>
          <h5>Button Modifier:Yellow</h5>
          <Button modifier="yellow">Button</Button>
        </div>
        <div>
          <h5>Button Size:SM</h5>
          <Button size="sm">Button</Button>
        </div>
        <div>
          <h5>Button Size:MD</h5>
          <Button size="md">Button</Button>
        </div>
        <div>
          <h5>Button Size:LG</h5>
          <Button size="lg">Button</Button>
        </div>
        <div>
          <h5>Button With Icon</h5>
          <Button>
            Button <Icon height="20" width="20" id="icon-1" />
          </Button>
        </div>
        <div>
          <h5>Default Button With Loading statement</h5>
          <Button loading>Button</Button>
        </div>
        <div>
          <h5>Color Button With Loading statement</h5>
          <Button color="blue" loading>
            Button
          </Button>
        </div>
        <div>
          <h5>Modifier Button With Loading statement</h5>
          <Button modifier="blue" loading>
            Button
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Buttons;

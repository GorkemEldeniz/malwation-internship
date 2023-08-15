import Input from "./ui/input";

function Inputs() {
  return (
    <section className="mb-4">
      <h1 className="text-2xl font-bold">Inputs</h1>
      <div className="grid grid-cols-4 gap-2 ">
        <div>
          Default Input
          <Input type="text" />
        </div>
        <div>
          Primary Input
          <Input type="text" variant="primary" />
        </div>
        <div>
          Alert Input
          <Input type="text" variant="alert" />
        </div>
        <div>
          Default Input sm Size
          <Input type="text" size="sm" />
        </div>
        <div>
          Default Input md Size
          <Input type="text" size="md" />
        </div>
        <div>
          Default Input lg Size
          <Input type="text" size="lg" />
        </div>
        <div>
          Default Input Disabled
          <Input type="text" disabled />
        </div>
        <div>
          Default Input with Loader
          <Input type="text" loading />
        </div>
        <div>
          Primary Input with Loader
          <Input type="text" variant="primary" loading />
        </div>
        <div>
          Alert Input with Loader
          <Input type="text" variant="alert" loading />
        </div>
        <div>
          Default Input with Lock Icon
          <Input type="password" mode="secret" />
        </div>
        <div>
          Alert Input with Lock Icon
          <Input type="password" variant="alert" mode="secret" />
        </div>
        <div>
          Primary Input with Email Icon
          <Input type="password" variant="primary" mode="email" />
        </div>
        <div>
          Alert Input with Email Icon
          <Input type="password" variant="alert" mode="email" />
        </div>
        <div>
          Error Input with Email Icon
          <Input type="password" error mode="email" />
        </div>
        <div>
          Default Input with User Icon
          <Input type="text" mode="user" />
        </div>
        <div>
          Primary Input with User Icon
          <Input type="text" variant="primary" mode="user" />
        </div>
        <div>
          Alert Input with Tel Icon
          <Input type="text" variant="alert" mode="tel" />
        </div>
      </div>
    </section>
  );
}

export default Inputs;

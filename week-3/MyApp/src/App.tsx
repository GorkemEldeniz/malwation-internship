import { ReactComponent } from '@assets/react.svg';
import Test from './components/Chart';
import Image from './components/Image';
import Icon from './components/Icon';

export default function App() {
  return (
    <div className="h-[41vh]">
      <Test />
      <Image />
      <ReactComponent />
      <Icon className="hover:fill-red-300" />
    </div>
  );
}

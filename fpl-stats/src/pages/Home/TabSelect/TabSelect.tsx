import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Compare } from '../../Compare/Compare';
import { Players } from '../../Players/Players';
import { Teams } from '../../Teams/Teams';

function TabSelect() {
  return (
    <Tabs
      defaultActiveKey="players"
      id="tab-select-example"
      className="p-2"
      justify
      variant='pills'
    >
        <Tab eventKey="players" title="Players">
            <Players />
        </Tab>
        <Tab eventKey="teams" title="Teams">
            <Teams />
        </Tab>
        <Tab eventKey="compare" title="Compare">
            <Compare />
        </Tab>
    </Tabs>
  );
}

export default TabSelect;

import { FaCloud, FaNewspaper } from "react-icons/fa";
import { IoNewspaper } from "react-icons/io5";
import { MdPushPin } from "react-icons/md";
import { AiFillSchedule } from "react-icons/ai";

export function Dashboard({}) {
  const icons = [
    <IoNewspaper
      style={{ color: "red", backgroundColor: "#ff000042" }}
      className="icon"
    />,
    <MdPushPin
      style={{ color: "yellow", backgroundColor: "#ffd90042" }}
      className="icon"
    />,
    <AiFillSchedule
      style={{ color: "#00ff80", backgroundColor: "#00ff8042" }}
      className="icon"
    />,
  ];
  return (
    <div className="dashboard">
      <div className="dash-col">
        <DashCard text="Total News so far" counter="12.4k" icon={icons[0]} />
        <DashCard text="Total Posts so far" counter="10.6k" icon={icons[1]} />
        <DashCard text="Total Schedule so far" counter="4.3k" icon={icons[2]} />
      </div>
      <StorageCard />
      <PosterCard />
    </div>
  );
}

function DashCard({ text, counter, icon }) {
  return (
    <div className="dashContent">
      {icon}
      <h4>{counter}</h4>
      <p>{text}</p>
    </div>
  );
}

function StorageCard({}) {
  return (
    <div className="storageCard">
      <FaCloud className="icon" />
      <div className="status">
        <h3>78.4%</h3>
        <p>Storage is used</p>
      </div>
      <div className="storageProgress">
        <div className="usage">
          <p>Usage</p>
          <p>7.5GB/10GB</p>
        </div>
        <div className="progessHolder">
          <div className="progres"></div>
        </div>
      </div>
    </div>
  );
}

function PosterCard({}) {
  return (
    <div className="posterCard">
      <table>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Posts</th>
          <th>Campuse</th>
        </tr>
        <tr>
          <td>
            <div>M</div>
          </td>
          <td>Mikael Alehegn</td>
          <td>23.4k</td>
          <td>Tewodros</td>
        </tr>
        <tr>
          <td>
            <div>D</div>
          </td>
          <td>Dr Asrat Shit</td>
          <td>33.2k</td>
          <td>Tewodros</td>
        </tr>
      </table>
    </div>
  );
}

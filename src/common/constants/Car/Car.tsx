import { FaRoad } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { IoSpeedometer } from "react-icons/io5";

export const CAR_CAR_DETAILS = [
  {
    id: 1,
    name: "Top Speed",
    icon: <IoSpeedometer />,
    label: "km/h",
    type: "topSpeed"
  },
  {
    id: 2,
    name: "0-60 mph",
    icon: <FaRoad />,
    label: "s",
    type: "acceleration"
  },
  {
    id: 3,
    name: "Transmission",
    icon: <FaGear />,
    type: "transmission"
  },
  {
    id: 4,
    name: "Horsepower",
    icon: <FaRoad />,
    label: "HP",
    type: "enginePower"
  }
];

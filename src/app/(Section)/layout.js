import Snowfall from "react-snowfall";
import NewNavbar from "../component/layout/NewNavbar";

export default function Section({ children }) {
  return (
    <>
      <NewNavbar />
      {children}
    </>
  );
}

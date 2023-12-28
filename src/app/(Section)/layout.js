import Snowfall from "react-snowfall";
import NewNavbar from "../component/layout/NewNavbar";
import { Toaster } from "react-hot-toast";

export default function Section({ children }) {
  return (
    <>
      <NewNavbar />
      {children}
      <Toaster/>
    </>
  );
}

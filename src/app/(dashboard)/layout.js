import { Toaster } from "react-hot-toast";
import Leftsidebar from "../component/layout/Leftsidebar";

export default function Profo({ children }) {
  return (
    <div>
   <Toaster/>
      <Leftsidebar />
      {children}
    
    </div>
  );
}

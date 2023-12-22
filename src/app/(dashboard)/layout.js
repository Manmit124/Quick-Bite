import { Toaster } from "react-hot-toast";
import Leftsidebar from "../component/layout/Leftsidebar";

export default function Profo({ children }) {
  return (
   
<section className="light">


    <div className="root">
   <Toaster/>
      <Leftsidebar />
      {children}
    
    </div>
    </section>
  
  );
}

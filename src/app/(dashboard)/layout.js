import { Toaster } from "react-hot-toast";
import Leftsidebar from "../component/layout/Leftsidebar";

export default function Profo({ children }) {
  return (
   
<section className="">


    <div className="">
   <Toaster/>
      <Leftsidebar />
      {children}
    
    </div>
    </section>
  
  );
}

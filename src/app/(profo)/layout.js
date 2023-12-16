import Leftsidebar from "../component/layout/Leftsidebar";

export default function Profo({ children }) {
  return (
    <div>
      <Leftsidebar />
      {children}
    </div>
  );
}

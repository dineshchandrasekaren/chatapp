import { MessageSquare } from "lucide-react";

const Logo = ({ size = 22, extraClass = "" }) => (
  <MessageSquare
    size={size}
    className={`text-primary bg-primary/10 p-3 rounded-xl w-max h-max mx-4 ${extraClass}`}
  />
);

export default Logo;

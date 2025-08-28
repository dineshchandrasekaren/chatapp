import { MessageSquare } from "lucide-react";

const Logo = ({ size = 22 }) => (
  <MessageSquare
    size={size}
    className={`text-primary bg-primary/10 p-2.5 rounded-md w-max h-max mx-4`}
  />
);

export default Logo;

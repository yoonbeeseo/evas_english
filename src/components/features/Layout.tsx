import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { FaUserSecret } from "react-icons/fa";

const Layout = ({ user }: { user: null | User }) => {
  const [showing, setShowing] = useState(false);

  const { pathname } = useLocation();
  const navi = useNavigate();
  return (
    <div
      className="h-dvh"
      onDoubleClick={() =>
        !user
          ? !pathname.includes("auth") && setShowing((prev) => !prev)
          : navi("admin")
      }
    >
      <Outlet />
      {!user && showing && !pathname.includes("auth") && (
        <Link
          to="/auth"
          className="fixed bottom-2 right-2 rounded-full size-10 flex-center bg-Gray text-gray-300 dark:text-700"
        >
          <FaUserSecret />
        </Link>
      )}
    </div>
  );
};

export default Layout;

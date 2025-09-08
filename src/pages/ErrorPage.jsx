import { NavLink, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  //   console.log(error);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <p className="text-red-500 font-semibold text-[40px] mb-2">
        {error.status}
      </p>
      <p className="text-xl font-medium mb-4">{error.statusText}</p>
      <NavLink to="/" title="Redirection" className="text-blue-500">
        On ré-essaye ?
      </NavLink>
    </div>
  );
}

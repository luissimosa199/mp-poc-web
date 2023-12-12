import React from "react";

const Header = ({ username }: { username: string }) => {
  return (
    <header className="bg-blue-600 text-white w-full py-4 px-6 flex justify-center items-center">
      <h1 className="text-2xl font-bold">{username}</h1>
    </header>
  );
};

export default Header;

import React from "react";

const Panel = ({
  isSubscribed,
  isLoading,
  handleClick,
}: {
  isSubscribed: boolean;
  isLoading: boolean;
  handleClick: () => Promise<void>;
}) => {
  return (
    <main className="w-full h-screen flex justify-center items-center bg-white">
      <div
        className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-sm mx-4"
        data-v0-t="card"
      >
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-center text-2xl font-semibold leading-none tracking-tight text-black">
            {isLoading
              ? "Cargando..."
              : isSubscribed
              ? "Desactivar Notificaciones"
              : "Activar Notificaciones"}
          </h3>
          <p className="text-center text-sm text-gray-600">
            Activa o desactiva las notificaciones en este dispositivo
          </p>
        </div>
        <div className="p-6 flex justify-center pt-4">
          <button
            type="button"
            onClick={handleClick}
            aria-pressed="false"
            data-state="off"
            className={`${
              isSubscribed ? "bg-blue-600" : "bg-transparent"
            } inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground border border-input hover:bg-accent hover:text-accent-foreground h-10 px-3`}
            aria-label="Toggle notification"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`${
                isSubscribed ? "text-white" : "text-blue-600"
              }  w-6 h-6`}
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              <path d="M4 2C2.8 3.7 2 5.7 2 8"></path>
              <path d="M22 8c0-2.3-.8-4.3-2-6"></path>
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Panel;

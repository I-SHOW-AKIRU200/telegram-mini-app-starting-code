"use client";

const ErrorComponent = () => {
  return (
    <div
      className="h-screen w-[100vw] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/bmc-min-app.appspot.com/o/...utils%2Fgifbmc.gif?alt=media&token=bd7ed4a3-3ec2-4333-be56-b28d2d629c0e")`,
      }}
    >
      <div className="text-black text-3xl font-bold bg-white p-5 rounded-2xl">
        Error Logging In
      </div>
    </div>
  );
};

export default ErrorComponent;

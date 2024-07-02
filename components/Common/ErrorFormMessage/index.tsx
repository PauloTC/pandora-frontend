import React from "react";

interface ErrorComponentProps {
  message?: string;
}

const ErrorFormMessage: React.FC<ErrorComponentProps> = ({ message }) => {
  if (!message) {
    return null;
  }

  return <div className="mt-2 text-red-700 text-xs">{message}</div>;
};

export default ErrorFormMessage;

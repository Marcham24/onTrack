import { useState, createContext, useEffect, useMemo } from "react";
import { sessionRequest } from "./array.service";

export const SessionContext = createContext();

export const SessionContextProvider = ({ children }) => {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rerender, setRerender] = useState(0);

  const retrieveSessions = () => {
    setIsLoading(true);
    setTimeout(() => {
      sessionRequest()
        .then((results) => {
          setIsLoading(false);
          setSessions(results);
          setRerender(0);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
          setRerender(0);
        });
    }, 0);
  };
  useEffect(() => {
    retrieveSessions();
  }, []);
  return (
    <SessionContext.Provider
      value={{ sessions, isLoading, error, rerender, setRerender }}
    >
      {children}
    </SessionContext.Provider>
  );
};

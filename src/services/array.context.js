import { useState, createContext, useEffect, useMemo } from "react";
import { sessionRequest } from "./array.service";

export const SessionContext = createContext();

export const SessionContextProvider = ({ children }) => {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const retrieveSessions = () => {
    setIsLoading(true);
    setTimeout(() => {
      sessionRequest()
        .then((results) => {
          setIsLoading(false);
          setSessions(results);
        })
        .catch((error) => {
          setIsLoading(false);
          setError(error);
        });
    }, 2000);
  };
  useEffect(() => {
    retrieveSessions();
  }, []);
  return (
    <SessionContext.Provider value={{ sessions, isLoading, error }}>
      {children}
    </SessionContext.Provider>
  );
};

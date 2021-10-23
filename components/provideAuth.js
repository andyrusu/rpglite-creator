import { authContext, useProvideAuth } from "../auth/provideAuth.js";

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

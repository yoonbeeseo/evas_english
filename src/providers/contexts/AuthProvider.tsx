import {
  useCallback,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { Auth } from "./Auth.use";
import { auth } from "../../lib/firebase";
import { Loader } from "../../components/ui";
import { bizinfoRef, userRef } from "../../lib";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [initialized, setInitialized] = useState(
    import.meta.env.MODE === "development" ? true : false
  );
  const [user, setUser] = useState<null | User>(null);

  useEffect(() => {
    const sub = auth.onAuthStateChanged(async (fbUser) => {
      if (fbUser) {
        if (fbUser.uid === "Ks8aVRV4MJYIXxtpmXidXndFXQW2") {
          const snap = await userRef.doc(fbUser.uid).get();
          if (snap.data()) {
            const bizsnap = await bizinfoRef(fbUser.uid).get();
            const bizinfos = bizsnap.docs.map((doc) => ({
              ...(doc.data() as Bizinfo),
              id: doc.id,
            }));
            setUser({ ...(snap.data() as User), bizinfos });
          }
        }
      } else {
        setUser(null);
      }
      setTimeout(() => setInitialized(true), 1000);
    });

    return () => {
      sub();
    };
  }, []);

  const [isOnline, setIsOnline] = useState(false);
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  const [bizinfo, setBizinfo] = useState<null | Bizinfo>(null);
  const selectBizinfo = useCallback(
    (payload: Bizinfo) => setBizinfo(payload),
    []
  );

  return (
    <Auth.Provider
      value={{ user, initialized, isOnline, bizinfo, selectBizinfo }}
    >
      {!isOnline && "No Internet connection"}
      {initialized ? children : <Loader />}
    </Auth.Provider>
  );
};

export default AuthProvider;

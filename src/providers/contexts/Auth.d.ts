interface User {
  email: string;
  uid: string;
  bizinfos: Bizinfo[];
}

type Juso = Record<
  | "admCd"
  | "bdKdcd"
  | "bdMgtSn" // unique id
  | "bdNm"
  | "buldMnnm"
  | "buldSlno"
  | "detBdNmList"
  | "emdNm"
  | "emdNo"
  | "engAddr"
  | "jibunAddr"
  | "liNm"
  | "lnbrMnnm"
  | "lnbrSlno"
  | "mtYn"
  | "rn"
  | "rnMgtSn"
  | "roadAddr"
  | "roadAddrPart1"
  | "roadAddrPart2"
  | "sggNm"
  | "siNm"
  | "udrtYn"
  | "zipNo",
  string
>;

interface JusoAddress extends Juso {
  rest: string;
}

interface Bizinfo {
  name: string;
  ceo: string;
  regi: string;
  address: JusoAddress;
  emails: string[];
  tels: string[];
  subjects: string[];
  id: string;
  created_at: Date;
  updated_at: Date;
}

type DBPayload<T, TOMIT = any> = Omit<
  T,
  TOMIT | "id" | "created_at" | "updated_at"
>;

type BizinfoPayload = DBPayload<Bizinfo>;

interface SigninProps {
  email: string;
  password: string;
}

interface FetchJusoResult {
  results: {
    common: Record<
      | "errorMessage"
      | "totalCount"
      | "countPerPage"
      | "errorCode"
      | "currentPage",
      string
    >;
    juso: Juso[];
  };
}

type Func<T = void> = () => T;
type PropsFunc<T = any, R = void> = (props: T) => R;

interface MapItemProps<T = any> {
  item: T;
  index: number;
}

interface FormPayload<T> {
  payload?: T;
  onDone?: PropsFunc<T>;
  onCancel?: Func;
}

interface SelectData<T = any> {
  value: T;
  text: string;
}

interface AuthContext {
  user: null | User;
  initialized: boolean;
  bizinfo: null | Bizinfo;
  selectBizinfo: PropsFunc<Bizinfo>;
}

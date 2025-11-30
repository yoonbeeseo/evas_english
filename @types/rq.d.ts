type ActionMethod = "POST" | "GET" | "PATCH" | "PUT" | "DELETE";

interface MutationFuncProps<T1, T2 = any> {
  method: ActionMethod;
  payload: string | number | T1 | T2;
}

type Juso = Record<
  | "admCd"
  | "bdKdcd"
  | "bdMgtSn"
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
  | "lnBrSlno"
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
interface JusoData {
  hasNextPage: boolean;
  currentPage: number;
  data: Juso[];
  totalCount: number;
}

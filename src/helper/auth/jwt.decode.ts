
import { jwtDecode } from 'jwt-decode';

type JwtPayload = {
  appId: number,
  memuuid: string,
  userUuid: string,
  familyCode: string,
  memberCode: string,
  firstName: string,
  middleName:string,
  lastName: string,
  iat: number,
  exp: number
};

type DecodedResponse = {
  memuuid: string,
  familyCode: string,
  memberCode: string,
  firstName: string,
  lastName: string,
};

export function getMemDetailsFromJwt(token: string): DecodedResponse {
  const decoded = jwtDecode<JwtPayload>(token);

  const memId =
    decoded.memuuid

  if (!memId) {
    throw new Error(`memId not found in JWT payload. Payload: ${JSON.stringify(decoded)}`);
  }

  const memberDetail:any={}
  memberDetail['memuuid']=decoded.memuuid
  memberDetail['familyCode']=decoded.familyCode
  memberDetail['memberCode']=decoded.familyCode
  memberDetail['firstName']=decoded.firstName
  memberDetail['lastName']=decoded.lastName

  return memberDetail;
}

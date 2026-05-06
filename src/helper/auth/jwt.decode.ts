import { jwtDecode } from 'jwt-decode';

type JwtPayload = {
  appId: number,
  memuuid: string,
  userUuid: string,
  familyCode: string,
  memberCode: string,
  firstName: string,
  middleName: string,
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
  let decoded: JwtPayload;

  try {
    decoded = jwtDecode<JwtPayload>(token);
  } catch {
    throw new Error(`Invalid JWT token`);
  }

  if (!decoded.memuuid) {
    throw new Error(`memId not found in JWT payload. Payload: ${JSON.stringify(decoded)}`);
  }

  return {
    memuuid: decoded.memuuid,
    familyCode: decoded.familyCode,
    memberCode: decoded.memberCode,
    firstName: decoded.firstName,
    lastName: decoded.lastName
  };
}
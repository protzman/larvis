import { useDispatch, useSelector } from 'react-redux';
const url = `http://localhost:8080`;
import {
  TokenRequest,
  TokenResponse,
  AcquisitionResponse,
  //TODO RENAME USER OBJECT TO SOMETHING LIKE AUTH'D USER / BASIC USER - EXTEND BASIC USER FOR USER RESPONSE?
  UserResponse,
  UserUpdate,
} from './types';
import { User } from '../types/user';

interface HttpResponse<T> extends Response {
  data?: T;
}

const fetchAsync = async (request: RequestInfo): Promise<Response> => {
  const response = await fetch(request);

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
  return response;
};

// TODO REVISIT AND RENAME
export const fetchToken = async ({
  user_id,
  password,
}: TokenRequest): Promise<TokenResponse> => {
  const response = await fetchAsync(
    new Request(`${url}/token`, {
      method: 'POST',
      body: JSON.stringify({
        user_id,
        password,
      }),
    })
  );
  const data = await response.json();
  return data;
};

export const fetchAcquisitions = async (
  token: string
): Promise<AcquisitionResponse[]> => {
  const response = await fetchAsync(
    new Request(`${url}/acquisitions`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
  );
  const data = await response.json();
  return data;
};

export const fetchUsers = async (token: string): Promise<User[]> => {
  const response = await fetchAsync(
    new Request(`${url}/users`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
  );
  const data = await response.json();
  return data;
};

export const fetchUser = async (
  token: string,
  user_id: string
): Promise<UserResponse> => {
  const response = await fetchAsync(
    new Request(`${url}/users/${user_id}`, {
      method: `GET`,
      headers: { Authorization: `Bearer ${token}` },
    })
  );
  const data = await response.json();
  return data;
};

export const updateUser = async (
  token: string,
  user: UserUpdate
): Promise<UserResponse> => {
  const response = await fetchAsync(
    new Request(`${url}/users/${user.user_id}`, {
      method: `POST`,
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name: user.name,
        password: user.password,
      }),
    })
  );
  const data = await response.json();
  return data;
};

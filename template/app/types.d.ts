interface State {
  fetching: boolean;
  data?: any;
  err: any;
  isLoggedIn: boolean;
  isProfileComplete: boolean;
}
interface UserState extends State {
  data: User;
}
interface NormalizedSchema<P, S> {
  entities: P;
  result: S;
}
interface NormalizedState extends NormalizedSchema<any, any> {}
interface GlobalState {
  network: State;
  auth: State;
}

interface Action {
  type: string;
  payload: any;
}

interface APIDateTime {
  date: string;
  timezone_type: 3;
  timezone: 'UTC';
}

interface User {
  id: number;
  name: string;
  last_name: string;
  birthdate: string;
  avatar: string;
  email: string;
  role: 'admin';
  subscriptions: [
    {
      endpoint: string;
    }
  ];
  created_at: APIDateTime;
  updated_at: APIDateTime;
}
interface APIResponse {
  data: object;
  errors: [];
  success: boolean;
}
interface APILoginRespose extends APIResponse {
  data: {
    token: string;
    vapidPublicKey?: string;
  };
}

interface APISignupResponse extends APILoginRespose {
  data: {
    user: User;
    token: string;
  };
}


import { ViewStyle } from 'react-native'
export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  Auth: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  TabTest: undefined;
  TabTask: undefined;
  TabAuth: undefined;
};

export type TabTaskParamList = {
  TabTaskScreen: undefined;
  TabTask: undefined;
}
export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type MainTabParamList = {
  TabTask: undefined;
  TabAuth: undefined;
};


export type TabLoginParamList = {
  TabLogin: undefined;
}

export type TabRegisterParamList = {
  TabRegister: undefined;
}

export type TabAuthParamList = {
  TabRegisterScreen: undefined;
  TabLoginScreen: undefined;
  TabRegister: undefined;
  TabLogin: undefined;
};

export type PropsParam = {
  onPress?:  void;
}

export type AuthContextData = {
  authData?: AuthData;
  signIn(email:string,password:string): Promise<void>;
  register(email:string,password:string, name:string): Promise<void>;
  signOut(): Promise<void>;
}

export type AuthData = {
  uid: string | undefined
  email: string | null | undefined
  displayName: string | null | undefined
}
export type ButtonParam = {
  onPress? :() => void
  style? :ViewStyle
}
// export type TaskList = {
//   tasks: firebase.firestore.DocumentData
// }
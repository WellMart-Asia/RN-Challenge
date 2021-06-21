export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type TodoContextParamList = {
  data: any,
  addTodo: any,
  onRemove: any,
  onToggle: any,
  onEdit: any
};

export type UserContextParamList = {
  data: any,
  onSetName: any
};
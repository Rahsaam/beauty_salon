interface ISelectOptions {
  label: string;
  value: string;
}

export interface IServiceBox {
  title: string;
  description: string;
  rule: string;
  options: ISelectOptions[];
  placeholder: string;
  selectValue: string;
  setSelectValue: (value: string) => void;
  isSecondInput: boolean;
  secondPlaceHolder?: string;
  secondInputValue?: string;
  setSecondInputValue?: (value: string) => void;
}

export interface IServiceCard {
  title: string;
  description: string;
  onAdd: () => void;
}

export interface IInputBox {
  title: string;
  description?: string;
  rule: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
}

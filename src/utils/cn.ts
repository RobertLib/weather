type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | null
  | boolean
  | undefined;

type ClassDictionary = Record<string, any>;

type ClassArray = ClassValue[];

export default function cn(...inputs: ClassValue[]): string {
  let tmp;
  let str = "";

  for (let i = 0; i < inputs.length; i++) {
    if ((tmp = inputs[i])) {
      if (typeof tmp === "string") {
        str += (str && " ") + tmp;
      }
    }
  }

  return str;
}

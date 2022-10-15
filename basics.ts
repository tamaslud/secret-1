// Primitives: number, string, boolean
// More complex types: arrays, objects
// Function types, parameters

// Primitives

let age: number;

age = 12;

let userName: string | string[];

userName = "Greg";

let isStudent: boolean;

isStudent = true;

// More complex types

let hobbies: string[];

hobbies = ["Motorcycling", "Gaming"];

type Person = {
  name: string;
  age: number;
};

let person: Person;

person = {
  name: "Greg",
  age: 28,
};

// person = {
//   isEmployee: true
// };

let people: Person[];

// Type inference - use it when possible, instead of stating types with d declaration
// Union types - one type or another |

let course: string | number = "React - The Complete Guide";

course = 12341;

// Functions & types

function addNumbers(a: number, b: number) {
  return a + b; // return type is inferred here, from the parameters
}

const addition = (a: number, b: number) => a + b;

// Functions that have no return statement are of type void
function printOutput(value: any) {
  console.log(value);
}

// Generics

function insertAtBeginning<T>(array: T[], value: T) {
  const newArray = [value, ...array];
  return newArray;
}

const demoArray = [1, 2, 3];

const updatedArray = insertAtBeginning(demoArray, -1); // [-1, 1, 2, 3]
const stringArray = insertAtBeginning(["a", "b", "c"], "d");

//updatedArray[0].split(""); - we get an error right away, not only in runtime

class Student {
  //firstName: string;
  //lastName: string;
  //age: number;
  //private courses: string[];

  constructor(
    public firstName: string,
    public lastName: string,
    public age: number,
    private courses: string[]
  ) {}

  enroll(courseName: string) {
    this.courses.push(courseName);
  }

  listCourses() {
    return this.courses.slice();
  }
}

const student = new Student("Max", "Schwarz", 32, ["Angular"]);
student.enroll("React");
// student.listCourses(); => Angular, React

// student.courses => Angular, React

// interface vs type - both can be used to describe object types, but interfaces can be implemented by classes
interface Human {
  firstName: string;
  age: number;

  greet: () => void;
}

let max: Human;

max = {
  firstName: "Max",
  age: 32,
  greet() {
    console.log("Hello!");
  },
};

class Instructor implements Human {
  firstName: string;
  age: number;
  greet() {
    console.log("Hello!!!!");
  }
}

import finder from "./";
import { REQUEST, SUCCESS, ERROR } from "../../../constants/actions/prefixes";

describe("should find string from array", () => {
  let sut = null;
  const prefixStr = "SOME_ACTION";
  const elements = [
    `${prefixStr}${REQUEST}`,
    `${prefixStr}${SUCCESS}`,
    `${prefixStr}${ERROR}`
  ];

  beforeEach(() => {
    sut = new finder();
  });

  it("it should find element in array which contain string with '_SUCCESS' substring", () => {
    expect(sut.findSuccessElement(elements)).toBe(`${prefixStr}${SUCCESS}`);
  });
  it("it should define contain or not array '_SUCCESS' element", () => {
    expect(sut.isExistSuccessElement(elements)).toBe(true);
  });
  it("it should return index of '_SUCCESS' element in array ", () => {
    expect(sut.getIndexOfSuccessElement(elements)).toBe(1);
  });
});

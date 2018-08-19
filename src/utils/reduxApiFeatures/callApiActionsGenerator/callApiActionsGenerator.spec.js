import caaGen from "./";
import { REQUEST, SUCCESS, ERROR } from "../../../constants/actions/prefixes";

describe("callApiActionGenerator generate types by const action prefix", () => {
  let sut = null;
  const prefixStr = "SOME_API_ACTION";

  beforeEach(() => {
    sut = new caaGen();
  });

  it("should generate array with all 3 action types for request", () => {
    const expectArray = [
      `${prefixStr}${REQUEST}`,
      `${prefixStr}${SUCCESS}`,
      `${prefixStr}${ERROR}`
    ];

    const act = sut.getFullArray(prefixStr);
    expect(act).toEqual(expectArray);
  });

  it("should generate REQUEST action with for action prefix", () => {
    const expectedValue = `${prefixStr}${REQUEST}`;

    const act = sut.getRequestAction(prefixStr);
    expect(act).toBe(expectedValue);
  });

  it("should generate SUCCESS action with for action prefix", () => {
    const expectedValue = `${prefixStr}${SUCCESS}`;

    const act = sut.getSuccessAction(prefixStr);
    expect(act).toBe(expectedValue);
  });

  it("should generate ERROR action with for action prefix", () => {
    const expectedValue = `${prefixStr}${ERROR}`;

    const act = sut.getErrorAction(prefixStr);
    expect(act).toBe(expectedValue);
  });
});

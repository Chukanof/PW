import EpBuilder from "./";

const testEnv = {
  protocol: "http",
  subdomain: "",
  domain: "localhost",
  port: ""
};

describe("endpointBuilder utility ", () => {
  let sut = null;
  const env = testEnv;
  const testPath = "test";
  const testDomain = "pw.ru";
  const testSubdomain = "www";
  const testPort = "5000";
  const testProtocol = "ws";

  beforeEach(() => {
    process.env.epb_domain = env.domain;
    process.env.epb_protocol = env.protocol;
    process.env.epb_port = env.port;

    sut = new EpBuilder();
  });

  afterEach(() => {
    delete process.env.epb_domain;
    delete process.env.epb_protocol;
    delete process.env.epb_port;

    sut = null;
  });

  it("can be configured by process.env variables", () => {
    const epbParameters = sut;
    expect(epbParameters.domain).toBe(env.domain);
    expect(epbParameters.protocol).toBe(env.protocol);
    expect(epbParameters.port).toBe(env.port);
  });
  it("can be configured by object passed in costructor", () => {
    const initObj = {
      protocol: "https",
      subdomain: "www",
      domain: "local",
      port: "443"
    };

    sut = new EpBuilder(initObj);

    expect(sut.domain).toBe(initObj.domain);
    expect(sut.protocol).toBe(initObj.protocol);
    expect(sut.port).toBe(initObj.port);
    expect(sut.subdomain).toBe(initObj.subdomain);
  });
  it("should build endpoint by path", () => {
    const domainPort =
      env.port === "" ? env.domain : `${env.domain}:${env.port}`;
    /*prettier-ignore */
    const expStr = `${env.protocol}://${env.subdomain}${domainPort}/${testPath}`;

    expect(sut.getEndpoint(testPath)).toBe(expStr);
  });
  it("should build endpoint by path and domain", () => {
    const domainPort =
      env.port === "" ? testDomain : `${testDomain}:${env.port}`;

    /*prettier-ignore */
    const expStr = `${env.protocol}://${env.subdomain}${domainPort}/${testPath}`;

    expect(sut.getEndpoint(testPath, testDomain)).toBe(expStr);
  });
  it("should build endpoint by path, domain and subdomain", () => {
    const subdomainStr = testSubdomain === "" ? "" : `${testSubdomain}.`;
    const domainPort =
      env.port === "" ? testDomain : `${testDomain}:${env.port}`;

    const expStr = `${env.protocol}://${subdomainStr}${domainPort}/${testPath}`;

    expect(sut.getEndpoint(testPath, testDomain, testSubdomain)).toBe(expStr);
  });
  it("should build endpoint by path, domain, subdomain and port", () => {
    const subdomainStr = testSubdomain === "" ? "" : `${testSubdomain}.`;
    const domainPort =
      testPort === "" ? testDomain : `${testDomain}:${testPort}`;

    const expStr = `${env.protocol}://${subdomainStr}${domainPort}/${testPath}`;

    expect(sut.getEndpoint(testPath, testDomain, testSubdomain, testPort)).toBe(
      expStr
    );
  });
  it("should build endpoint by path, domain, subdomain, port and protocol", () => {
    const subdomainStr = testSubdomain === "" ? "" : `${testSubdomain}.`;
    const domainPort =
      testPort === "" ? testDomain : `${testDomain}:${testPort}`;

    const expStr = `${testProtocol}://${subdomainStr}${domainPort}/${testPath}`;

    expect(
      sut.getEndpoint(
        testPath,
        testDomain,
        testSubdomain,
        testPort,
        testProtocol
      )
    ).toBe(expStr);
  });

  it("should build endpoint by path and subdomain", () => {
    const subdomainStr = testSubdomain === "" ? "" : `${testSubdomain}.`;
    const domainPort =
      env.port === "" ? env.domain : `${env.domain}:${env.port}`;

    const expStr = `${env.protocol}://${subdomainStr}${domainPort}/${testPath}`;

    expect(sut.getEndpoint(testPath, "", testSubdomain)).toBe(expStr);
  });
  it("should build endpoint by path, subdomain and protocol", () => {
    const subdomainStr = testSubdomain === "" ? "" : `${testSubdomain}.`;
    const domainPort =
      env.port === "" ? env.domain : `${env.domain}:${env.port}`;

    const expStr = `${testProtocol}://${subdomainStr}${domainPort}/${testPath}`;

    expect(sut.getEndpoint(testPath, "", testSubdomain, "", testProtocol)).toBe(
      expStr
    );
  });
  it("should remove multiple slashes between domain:port and path", () => {
    const testPath = "//test";

    const domainPort =
      env.port === "" ? env.domain : `${env.domain}:${env.port}`;

    const expStr = `${env.protocol}://${env.subdomain}${domainPort}/test`;

    expect(sut.getEndpoint(testPath)).toBe(expStr);
  });
  it("should remove multiple dots between subdomain and domain", () => {
    const domainPort =
      env.port === "" ? env.domain : `${env.domain}:${env.port}`;

    const expStr = `${env.protocol}://${testSubdomain}.${domainPort}/`;

    expect(sut.getEndpoint("", "", `${testSubdomain}...`)).toBe(expStr);
  });
});

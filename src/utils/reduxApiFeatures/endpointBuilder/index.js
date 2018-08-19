export default class EndpointBuilder {
  constructor(initObj) {
    this.domain = process.env.epb_domain || "localhost";
    this.protocol = process.env.epb_protocol || "http";
    this.subdomain = "";
    this.port = process.env.epb_port || "";

    if (initObj) {
      this.domain = initObj.domain;
      this.protocol = initObj.protocol;
      this.subdomain = initObj.subdomain;
      this.port = initObj.port;
    }
  }

  getEndpoint(
    path,
    domainArg = null,
    subdomainArg = null,
    portArg = null,
    protocolArg = null
  ) {
    const domain = domainArg || this.domain;
    const subdomain = subdomainArg || this.subdomain;
    const port = portArg || this.port;
    const protocol = protocolArg || this.protocol;

    const subdomainStr =
      subdomain === "" ? "" : `${normalizeSubdomain(subdomain)}.`;
    const domainPort = port === "" ? domain : `${domain}:${port}`;

    let domainAndPath = `${domainPort}/${normalizePath(path)}`;
    return `${protocol}://${subdomainStr}${domainAndPath}`;
  }
}

function normalizeSubdomain(str) {
  let end = 0;

  for (let i = str.length - 1; i > 0; i--) {
    const char = str[i];

    if (char !== ".") {
      end = i;
      break;
    }
  }

  return str.substring(0, end + 1);
}

function normalizePath(str) {
  let start = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char !== "/") {
      start = i;
      break;
    }
  }
  return str.substring(start);
}

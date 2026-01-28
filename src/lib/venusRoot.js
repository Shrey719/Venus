class venusRoot {
  constructor(venusRoot = "/") {
    if (venusRoot === "") {
      throw new URIError(`The Venus class must be done as following : \n 
          new Venus("/"),             --> prefix becomes '/'
          new Venus("/some/path/"),   --> prefix becomes '/some/path/'
          new Venus()                 --> prefix becomes '/'
        `)
    }
    this.path = venusRoot;
  }
}

export { venusRoot };

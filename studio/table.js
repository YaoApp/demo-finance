function UnitTest(...args) {
  if (args.length > 0 && args[0] == "throw-test") {
    throw new Exception("I'm a teapot", 418);
  }
  return args;
}



before(function () {
  // disable console output
 
  sinon.stub(console, "log");
  sinon.stub(console, "info");
  sinon.stub(console, "warn");
  sinon.stub(console, "error");
});
after(function () {

  console.log.restore();
  console.info.restore();
  console.warn.restore();
  console.error.restore();
});

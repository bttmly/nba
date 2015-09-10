const expect = require("must");

const sportVu = require("../../src/sport-vu");

describe("#speed", () => {
  it("works", done => {
    sportVu.speed((err, data) => {
      expect(err).to.not.exist();
      done();
    });
  });
});

describe("#touches", () => {
  it("works", done => {
    sportVu.touches((err, data) => {
      expect(err).to.not.exist();
      done();
    });
  });
});

describe("#passing", () => {
  it("works", done => {
    sportVu.passing((err, data) => {
      expect(err).to.not.exist();
      done();
    });
  });
});

describe("#defense", () => {
  it("works", done => {
    sportVu.defense((err, data) => {
      expect(err).to.not.exist();
      done();
    });
  });
});

describe("#rebounding", () => {
  it("works", done => {
    sportVu.rebounding((err, data) => {
      expect(err).to.not.exist();
      done();
    });
  });
});

describe("#drives", () => {
  it("works", done => {
    sportVu.drives((err, data) => {
      expect(err).to.not.exist();
      done();
    });
  });
});

describe("#shooting", () => {
  it("works", done => {
    sportVu.shooting((err, data) => {
      expect(err).to.not.exist();
      done();
    });
  });
});

describe("#catchShoot", () => {
  it("works", done => {
    sportVu.catchShoot((err, data) => {
      expect(err).to.not.exist();
      done();
    });
  });
});

describe("#pullUpShoot", () => {
  it("works", done => {
    sportVu.pullUpShoot((err, data) => {
      expect(err).to.not.exist();
      done();
    });
  });
});


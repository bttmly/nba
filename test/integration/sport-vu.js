const expect = require("must");
delete Object.prototype.must;

const sportVu = require("../../src/sport-vu");

// for interactive inspection
global.SportVuData = {};

describe("#speed", () => {
  it("works", done => {
    sportVu.speed((err, data) => {
      expect(err).to.not.exist();
      global.SportVuData.speed = data;
      done();
    });
  });
});

describe("#touches", () => {
  it("works", done => {
    sportVu.touches((err, data) => {
      expect(err).to.not.exist();
      global.SportVuData.touches = data;
      done();
    });
  });
});

describe("#passing", () => {
  it("works", done => {
    sportVu.passing((err, data) => {
      expect(err).to.not.exist();
      global.SportVuData.passing = data;
      done();
    });
  });
});

describe("#defense", () => {
  it("works", done => {
    sportVu.defense((err, data) => {
      expect(err).to.not.exist();
      global.SportVuData.defense = data;
      done();
    });
  });
});

describe("#rebounding", () => {
  it("works", done => {
    sportVu.rebounding((err, data) => {
      expect(err).to.not.exist();
      global.SportVuData.rebounding = data;
      done();
    });
  });
});

describe("#drives", () => {
  it("works", done => {
    sportVu.drives((err, data) => {
      expect(err).to.not.exist();
      global.SportVuData.drives = data;
      done();
    });
  });
});

describe("#shooting", () => {
  it("works", done => {
    sportVu.shooting((err, data) => {
      expect(err).to.not.exist();
      global.SportVuData.shooting = data;
      done();
    });
  });
});

describe("#catchShoot", () => {
  it("works", done => {
    sportVu.catchShoot((err, data) => {
      expect(err).to.not.exist();
      global.SportVuData.catchShoot = data;
      done();
    });
  });
});

describe("#pullUpShoot", () => {
  it("works", done => {
    sportVu.pullUpShoot((err, data) => {
      expect(err).to.not.exist();
      global.SportVuData.pullUpShoot = data;
      done();
    });
  });
});


class Range {
  constructor(range) {
    const [start, end] = range;

    this.start = start;
    this.end = end;
  }

  contains(range) {
    return this.start <= range.start && this.end >= range.end;
  }

  overlaps(range) {
    return this.start <= range.end && range.start <= this.end;
  }
}

module.exports = {
  Range,
};

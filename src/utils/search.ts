class SearchEngine {
  public getCompatedValue(textValue: string, inputValue: string) {
    return this.compareNoteToSearch(
      this.splitToWords(textValue),
      this.splitToWords(inputValue)
    );
  }

  private splitToWords(str: string) {
    return str
      .split(/[\n,. \-_\(\)?!~+=\[\]\{\}"@<>*\$#]/g)
      .filter((word) => word.length > 0);
  }

  private compareNoteToSearch(noteWords: string[], searchWords: string[]) {
    let comparedValue = 0;
    for (let i = 0; i < searchWords.length; i++) {
      for (let j = 0; j < noteWords.length; j++) {
        comparedValue += this.compareWords(searchWords[i], noteWords[j]);
      }
    }
    return comparedValue;
  }
  private compareWords(first: string, second: string) {
    let splitFirst = this.splitWord(first.toLowerCase(), 2);
    let splitSecond = this.splitWord(second.toLowerCase(), 2);
    let comparedValue = 0;
    for (let i = 0; i < splitFirst.length; i++) {
      for (let j = 0; j < splitSecond.length; j++) {
        if (splitFirst[i] === splitSecond[j]) {
          comparedValue += 1;
        }
      }
    }
    return comparedValue / (splitFirst.length * splitSecond.length);
  }
  private splitWord(word: string, gap: number = 2) {
    let parts = [];

    if (word.length <= 1) {
      parts.push(word);
      return parts;
    }

    for (let i = 0; i < word.length - gap + 1; i++) {
      parts.push(word.substring(i, i + gap));
    }
    return parts;
  }
}

const search = new SearchEngine();

export default search;

declare type Token = [string, string | Array<Token>];

class TextExpander {

  expand(text: string): string[] {
    // text = `(${text})`;
    // let depth = 0;

    text = 'i want to (rent|buy) [an apartment|a villa]';
    const ast = ['multi', [
      ['text', 'I'],
      ['text', 'want'],
      ['text', 'to'],
      ['multi', [
        ['text', 'rent'],
        ['text', 'buy'],
      ]],
      ['option', [
        ['text', 'an apartment'],
        ['text', 'a villa'],
      ]],
    ]];

    return this.generate(ast);
  }

  // generate(token: Token): string[] {
  //
  // }

}

export default TextExpander;

// for (const char of text) {
//   if (char === '(') {
//     depth++;
//     continue;
//   }
//
//   if (char === ')') {
//     depth--;
//     continue;
//   }
//
//   // if (char === '[') {
//   //   depth++;
//   //   continue;
//   // }
//   //
//   // if (char === ']') {
//   //   depth--;
//   //   continue;
//   // }
// }

// return this.roundp(text);

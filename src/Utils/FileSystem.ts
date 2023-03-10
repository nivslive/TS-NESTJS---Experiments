const fs = require('fs-extra');
export default class FileSystem {
    static json(file: string, content: string) {
        fs.outputFile('storage/' + file + '.json', content, err => {
          if(err) {
            throw new Error(err);
          } else {
            console.log('The file was saved!');
          }
        })
      }
    static pick(file: string,): any {
        const data = require(`../../storage/${file}.json`)
        return data;
    }
}
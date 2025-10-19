import fs from "fs"
import rl from "readline"

export default class CsvCleaner {
    filename
    stream
    readline
    iterator

    constructor(filename: string) {
        this.filename = filename
        this.stream = fs.createReadStream(this.filename, { encoding: "utf-8" })
        this.readline = rl.createInterface({ input: this.stream, crlfDelay: Infinity })
        this.iterator = this.readline[Symbol.asyncIterator]()
    }

    destructor() {
        this.readline.close()
        this.stream.close()
    }

    async getCleanedRow() {
        return new Promise(async (resolve, reject) => {
            try {
                const { value, done } = await this.iterator.next()
                if (done) {
                    this.destructor()
                    resolve(null)
                }

                const row = cleanrow(value)

                resolve(row)
            } catch (err) {
                this.destructor()
                console.log(err)
            }
        })
    }
}

function cleanrow(row: any) {
    return {

    }
}
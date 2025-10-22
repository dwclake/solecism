import fs from "fs"
import rl from "readline"

import { sleep } from "./utils"

type Options = { buffer: number, path: string }

/**
 *
 */
export default class CsvCleaner {
    stream
    readline
    iterator
    buffer: number
    cache: any[] = []
    header: string[] = []
    closed = false
    done = false

    constructor({buffer = 10, path}: Options) {
        this.stream = fs.createReadStream(path, { encoding: "utf-8" })
        this.readline = rl.createInterface({ input: this.stream, crlfDelay: Infinity })
        this.iterator = this.readline[Symbol.asyncIterator]()
        this.buffer = buffer

        // Parse CSV column names
        this.iterator.next()
            .then(({value, done}) => {
                if (done) {
                    throw new Error("CSV file is empty")
                }

                this.header = value!
                    .split(",")
                    .map(column => column.trim())
            })
            .catch(error => {throw error})

        this.cleanRows(this.buffer)
            .then()
            .catch(error => { throw error })
    }

    destructor() {
        this.readline.close()
        this.stream.close()
        this.closed = true
    }

    /**
     * Pull a cleaned row from cache, once last row is pulled from cache
     * another set of BUFFER rows will be read from file and cached.
     *
     * @Resolves Cleaned when successful, null when the last rows has been returned.
     *
     * @Rejects thrown errors, when requesting a row after null has been resolved.
     */
    async getCleanedRow() {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.done) {
                    this.destructor()
                    return resolve(null)
                }

                if (this.closed) {
                    return reject(new Error("Attempted to use CsvCleaner after it has been closed"))
                }

                while (this.cache.length <= 0) {
                    await sleep(10)
                }

                const row = this.cache.shift()
                if (this.cache.length <= 0) {
                    this.cleanRows(this.buffer)
                }

                resolve(row)
            } catch (error) {
                reject(error)
            }
        })
    }

    /**
     *
     * @param count
     */
    async cleanRows(count: number) {
        try {
            for (let i = 0; i < count; i++) {
                const { value, done } = await this.iterator.next()
                if (done) {
                    this.done = true
                    break
                }

                const row = this.cleanRow(value!)
                this.cache.push(row)
            }
        } catch (error) {
            this.destructor()
            throw error
        }
    }

    /**
     *
     * @param row
     * @returns Cleaned
     */
    cleanRow(row: string) {
        const cleaned = {} as any

        const values = row
            .split(",")
            .map(value => value.trim())

        this.header.forEach((column, index) => {
            switch (column) {
                case "Frame":
                case "LeftPupilDiameterInMM":
                case "RightPupilDiameterInMM":
                    cleaned[column] = Number(values[index]!)
            }
        })

        return cleaned
    }
}

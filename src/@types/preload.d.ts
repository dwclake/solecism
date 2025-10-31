/**
 *
 * @author dwclake
 */

import { Return, Document } from "@schemas";

export interface Electron {
    document: {
        /**
		 *
		 * @param title
		 * @returns
		 */
        create: (title: string) => Return<Document>;
         /**
		 *
		 * @param id
		 * @returns
		 */
        open: (id: number) => Return<Document>;
        /**
		 *
		 * @param id
		 * @returns
		 */
        save: (id: number, title?: string, content?: string) => Return<Document>;
        /**
		 *
		 * @param id
		 * @param title
		 * @param content
		 * @returns
		 */
        remove: (id: number) => Return<Document>;
    },
    os: {
        /**
         *
         * @returns the current OS
         */
        check: () => string;
        notify: {
            /**
             *
             * @param msg
             */
            send: (msg: string) => void;
        }
    }
}

declare global {
    interface Window {
        electron: Electron;
    }
}

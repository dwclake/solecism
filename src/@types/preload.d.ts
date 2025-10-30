/**
 * @author: dwclake
 * @created: 10-18-2025
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
         * @returns
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

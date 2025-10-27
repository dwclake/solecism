/**
 * @author: dwclake
 * @created: 10-18-2025
 */

import schemas from "@schemas";

export interface Electron {
    document: {
        /**
		 *
		 * @param title
		 * @returns
		 */
        create: (title: string) => schemas.DocumentReturn;
         /**
		 *
		 * @param id
		 * @returns
		 */
        open: (id: number) => schemas.DocumentReturn;
        /**
		 *
		 * @param id
		 * @returns
		 */
        save: (id: number, title?: string, content?: string) => schemas.DocumentReturn;
        /**
		 *
		 * @param id
		 * @param title
		 * @param content
		 * @returns
		 */
        remove: (id: number) => schemas.DocumentReturn;
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

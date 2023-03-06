
import { Column } from ".";

export class TableHeaderSlot {

    /**
     * Column definitions
     */
    cols: Array<Column> = [];
    /**
     * Column mapping (key is column name, value is column object)
     */
    colsMap?: object;
    /**
     * Trigger a table sort
     */
    sort?: (col: string | object) => void;
    /**
     * (Only if using selection) Is row selected? Can directly be assigned new Boolean value which changes selection state
     */
    selected: boolean = false;
    /**
     * Is row expanded? Can directly be assigned new Boolean value which changes expanded state
     */
    expand: boolean = false;
    /**
     * Color name for component from the Quasar Color Palette
     * Default value: grey-8
     */
    color: string = "";
    /**
     * Notify the component that the background is a dark color
     */
    dark: boolean = false;
    /**
     * Dense mode; occupies less space
     */
    dense: boolean = false;
    /**
     * Internal prop passed down to QTr (if used)
     */
    __trClass: string = ""
    /**
     * Internal prop passed down to QTh (if used); Always 'true'
     */
    header: boolean = false;

}

import {
    figureImage,
    figureCaption,
} from "../utils/data.js";
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

    /**
     * Opens the popup. Adds the corresponding listeners.
     * Updates the image and caption that needs to be shown.
     * @param text image title
     * @param imageLink image link
     */
    open({text, imageLink}) {
        figureImage.src = imageLink;
        figureImage.alt = text;
        figureCaption.textContent = text;
        super.open();
    }
}
export default class UserInfo {
    constructor({ nameSelector, jobSelector}) {
        this._nameElement = document.querySelector(nameSelector);
        this._jobElement = document.querySelector(jobSelector);
    }
    /**
     * Returns an object contains user's info
     * @returns object with user's info
     */
    getUserInfo() {
        return {
            userName: this._nameElement.textContent,
            userJob: this._jobElement.textContent,
        };
    }
    /**
     * Updates user's info
     * @param userName user's name
     * @param userJob user's job
     */
    setUserInfo(userName, userJob) {
        this._nameElement.textContent = userName;
        this._jobElement.textContent = userJob;
    }
}
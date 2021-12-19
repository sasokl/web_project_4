export default class UserInfo {
    constructor({ nameSelector, jobSelector, avatarSelector}) {
        this._nameElement = document.querySelector(nameSelector);
        this._jobElement = document.querySelector(jobSelector);
        this._avatarElement = document.querySelector(avatarSelector);
    }
    /**
     * Returns an object contains user's info
     * @returns object with user's info
     */
    getUserInfo() {
        return {
            userName: this._nameElement.textContent,
            userJob: this._jobElement.textContent,
            userAvatarLink: this._avatarElement.src,
        };
    }
    getUserId() {
        return this._id;
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

    /**
     * Updates user's avatar
     * @param avatarLink
     */
    setAvatar(avatarLink) {
        this._avatarElement.src = avatarLink;
    }
    setUserId(id) {
        this._id = id;
    }
}
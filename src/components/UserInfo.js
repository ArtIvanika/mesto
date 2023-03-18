export default class UserInfo{
    constructor({name, info}){
        this._name = name;
        this._info = info
    }

    //возвращает объект с данными пользователя. 
    // Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
   getUserInfo(){
    this._userInfo = {};
    this._userInfo.name = this._name.textContent;
    this._userInfo.info = this._info.textContent;

    return this._userInfo
   }

   // принимает новые данные пользователя и добавляет их на страницу.
   setUserInfo({nameInput, infoInput}){
    this._name.textContent = nameInput;
    this._info.textContent = infoInput
   }
}
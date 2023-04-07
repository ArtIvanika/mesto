export default class UserInfo{
    constructor({name, about, avatar}){
        this._name = name;
        this._about = about;
        this._avatar = avatar
    }

    //возвращает объект с данными пользователя. 
    // Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
   getUserInfo(){
    this._userInfo = {};
    this._userInfo.name = this._name.textContent;
    this._userInfo.about = this._about.textContent;
    this._userInfo.avatar = this._avatar.src

    return this._userInfo
   }

   // принимает новые данные пользователя и добавляет их на страницу.
   setUserInfo({ name, about }){
    this._name.textContent = name;
    this._about.textContent = about;
   }

   // вставляем значения для аватара
   setAvatarInfo({ avatar }) {
    this._avatar.src = avatar;
  }

//   getUserId = () => {
//     return this._userId
//   }
}
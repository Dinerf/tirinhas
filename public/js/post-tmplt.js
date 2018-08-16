var postTemplate;
function createTemplate(text, key, name, uid) {
  postTemplate = `
    <div class="postConteiner border m-2 d-flex" data-conteiner=${key} data-uid=${uid}>
      <div class="post-photo br-circle d-flex align-items-center justify-content-center m-1">
        <img src=${userPhoto}>
      </div>
      <div class="divConteiner w-100 p-1">
        <div class="d-flex justify-content-between">
          <h6 class="user-name">${name}</h6>
          <div class="">
            <i class="far fa-comment" data-post-id=comment${key}></i>
            <i class="far fa-heart mx-3" data-post-id=like${key}></i>
            <div class="btn-group dropleft" id="editDel">
              <button type="button" class="btn-invisible" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
              </button>
              <div class="dropdown-menu p-0">
                <p class="editPost text-center border m-1" data-post-id=edit${key}>Editar</p>
                <p class="deletePost text-center border m-1" data-post-id=del${key}>Excluir</p>
              </div>
            </div>
          </div>
        </div>
        <p class="ownPost">${text}</p>
        </div>
      </div>
    </div>  
  `
}

var followingTemplate;  
function followTemplate(text, key, name, uid) {
  followingTemplate = `
    <div class="postConteiner border m-2 d-flex" data-conteiner=${key} data-uid=${uid}>
      <div class="post-photo br-circle d-flex align-items-center justify-content-center m-1">
        <img src=${userPhoto}>
      </div>
      <div class="divConteiner w-100 p-1">
        <div class="d-flex justify-content-between">
          <h6 class="user-name">${name}</h6>
          <div class="">
            <i class="far fa-comment" data-post-id=comment${key}></i>
            <i class="far fa-heart mx-3" data-post-id=like${key}></i>
          </div>
        </div>
        <p class="ownPost">${text}</p>
        </div>
      </div>
    </div>  
  `
}

var findUserTemplate;
function findTemplate(name, key, button) {
  findUserTemplate = `
    <div class="d-flex align-items-center border-bottom foundUser" data-found="${key}">
      <div class="post-photo br-circle m-2">
        <img src="../../../ImagemGenerica.png" class="generic-image">
      </div>
      <div class="d-flex justify-content-between w-75">
        <h6 class="m-2">${name}</h6>
        <button data-follow="${key}">${button}</button>
      </div>
    </div>
  `
}
var postTemplate;
function createTemplate(text, key, name) {
  postTemplate = `
  <div class="postConteiner border m-2 d-flex" data-conteiner=${key}>
    <div class="post-photo br-circle d-flex align-items-center justify-content-center m-1">
      <img src=${userPhoto}>
    </div>
    <div class="divConteiner w-100 p-1">
      <div class="d-flex justify-content-between">
        <h6 class="user-name">${name}</h6>
        <div class="">
          <i class="far fa-comment" data-post-id=comment${key}></i>
          <i class="far fa-heart mx-3" data-post-id=like${key}></i>
          <div class="btn-group dropleft">
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
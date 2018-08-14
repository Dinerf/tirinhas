var userPhoto;
var userName;
var newPost;

const textPosted = `
  <div class="post-photo br-round d-flex align-items-center justify-content-center m-1">
    <img src="${userPhoto}">
  </div>
  <div class="postConteiner w-100 p-1">
    <div class="d-flex justify-content-between">
      <h6 class="user-name">${userName}</h6>
      <div class="">
        <i class="far fa-comment"></i>
        <i class="far fa-heart mx-3"></i>
        <div class="btn-group dropleft">
          <button type="button" class="btn-invisible" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-ellipsis-v"></i>
          </button>
          <div class="dropdown-menu p-0">
            <p class="editPost text-center border m-1">Editar</p>
            <p class="deletePost text-center border m-1">Excluir</p>
          </div>
        </div>
      </div>
    </div>
    <p class="ownPost">${newPost}</p>
    </div>
  </div>
`
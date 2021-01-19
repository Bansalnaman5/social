{
    let createPost=function(){
        let newpostform=$('#new_post_form');
        newpostform.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/post/create-post',
                data:newpostform.serialize(),
                success:function(data){
                    // console.log(data);
                    let newPost=newPostDom(data.data.posts);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));
                    new Commentsonpost(data.data.posts._id)
                    new handellikes($('.like-button',newPost));
                },
                error: function(err){
                    console.log(err.responseText);
                }
            });
        });
    }
    // method to create post in dom

    let newPostDom=function(post){
        return $(`<li id="post-${post._id}">
                    <p>
                        <small>
                            <a class="delete-post-button" href="/post/destroy/${post._id}">X</a>
                        </small>
                        
                        ${post.content}
                        <br>
                        ${post.user.name}
                        <br>
                        <small>
                                <a class='like-button' data-likes="0" href="/likes/toggle?id=${post._id}&type=Post">
                                    0 Likes
                                </a>
                                
                        </small>
                    </p>      
                    <div class="post-comment-container">
                       
                            <form action="/comments/create-comment" method="post">
                                <input type="text" name="content" placeholder="Type comment">
                                <input type="hidden" name='post' value="${post._id}">
                                <input type="submit" value="Add comment">
                            </form>
                        
                        <div class='show-post-comment'>
                            <ul id="post-commentsof-${post._id}">
                                
                            </ul>
                        </div>
                    </div>              
                </li>`)
                };

        // method to delete post from dom
        let deletePost=function(deleteLink){
            $(deleteLink).click(function(e){
                e.preventDefault();
                $.ajax({
                    type:'get',
                    url:$(deleteLink).prop('href'),//to get the value of href
                    success:function(data){
                        $(`#post-${data.data.post_id}`).remove();
                        new Noty({
                            theme: 'relax',
                            text: "Post Deleted",
                            type: 'success',
                            layout: 'topRight',
                            timeout: 1500
                            
                        }).show();
                    },
                    error:function(err){
                        console.log(err.responseText);
                    }
                });
            });
        }

        let convertpostajax=function(){
            $('#post-list-container>ul>li').each(function(){
                let self=$(this);
                let deletbutton=$(' .delete-post-button',self);
                deletePost(deletbutton);
                let postid=self.prop('id').split("-")[1];
                new Commentsonpost(postid);
            });
        }

    createPost();
    convertpostajax();
}
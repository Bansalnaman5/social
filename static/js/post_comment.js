class commentsonpost{
    constructor(postid){
        this.postid=postid;
        this.postcontainer=$(`#post-${postid}`);
        this.commentform=$(`#post-${postid}-comment-container`);
        this.createcomment(postid);
        let self=this;
        $(' .delete-comment-button',this.postcontainer).each(function(){
            self.deletecomment($(this));
        });
    }
    createcomment(postid){
        let pself=this;
        this.commentform.submit(function(e){
            e.preventDefault();
            let self=this;
            $.ajax({
                type:'post',
                url:'/comments/create-comment',
                data:$(this).serialize(),
                success:function(data){
                    let newComment=pself.newcommentdom(data.data.comment);
                    $(`#post-commentsof-${postid}`).prepend(newComment);
                    pself.deletecomment($(' .delete-comment-button',newComment));

                    new Noty({
                        theme:'relax',
                        text:"comment Published",
                        type:'success',
                        layout:'topRight',
                        timeout:1500
                    }).show();
                },
                error:function(err){
                    console.log(err.responseText);
                }
            });
        });
    }
    newcommentdom(comment){
        return $(`<li id="comment-${comment._id}">  
        <p>         
            <small>
                <a class='delete-comment-button' href="/comments/destroy/${comments._id}">X</a>
            </small>
        ${comments.content}
        <br>
        ${comments.user.name} 
        </p>
    </li>`)
    }
    deletecomment(deletLink){
        $(deletLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get',
                url:$(deletLink).prop('href'),
                success:function(data){
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme:'relax',
                        text:'Comment deleted',
                        type:'success',
                        layout:'topRight',
                        timeout:1500
                    }).show();
                },
                error:function(err){
                    console.log(err.responseText);
                }
            });
        });
    }
}
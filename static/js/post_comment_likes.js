class handellikes{
    constructor(likeableelement){
        this.toggler=likeableelement;
        this.togglecontroler();
    }
    togglecontroler(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self=this;
            $.ajax({
                type:"POST",
                url:$(self).attr('href'),
            })
            .done(function(data){
                let likecount=parseInt($(self).attr('data-likes'));
                if (data.data.deleted==true){
                    likecount-=1;
                }
                else{
                    likecount+=1;
                }
                $(self).attr('data-likes',likecount);
                $(self).html(`${likecount} likes`);
            })
            .fail(function(err){
                console.log("error in completeing likes request",err);
            });
        });
    }
}
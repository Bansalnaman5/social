const queue=require('../config/kue');
const commentmailer=require('../mailers/comments_mailer');

queue.process('commentemails',function(job,done){
    console.log('email worker present sir!! on job');
    commentmailer.newComment(job.data);
    done();
});
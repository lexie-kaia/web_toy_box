const feedFollowBtn = document.querySelector('.feed-follow-btn');
const feedLikeBtn = document.querySelector('.feed-like-btn');

const feedCommentBtn = document.querySelector('.feed-comment-btn');
const feedComment = document.querySelector('.feed-comment');

feedFollowBtn.following = false;
feedFollowBtn.addEventListener('click', function () {
  if (this.following) {
    this.classList.remove('feed-following-btn');
    this.innerHTML = 'Follow';
  } else {
    this.classList.add('feed-following-btn');
    this.innerHTML = 'Following';
  }
  this.following = !this.following;
});

feedLikeBtn.like = false;
feedLikeBtn.addEventListener('click', function () {
  if (this.like) {
    this.classList.remove('active');
    this.innerHTML = '<i class="far fa-heart"></i> 10';
  } else {
    this.classList.add('active');
    this.innerHTML = '<i class="far fa-heart"></i> 11';
  }
  this.like = !this.like;
});

feedCommentBtn.addEventListener('click', () => {
  feedComment.classList.toggle('feed-comment-show');
});

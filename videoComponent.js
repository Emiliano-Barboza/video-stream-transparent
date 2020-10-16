var videoContainer = {
  canvas : '',
  video : '',
  videoImage: '',
  ctx : '',
};
videoContainer.initContainer = function () {
  this.video = document.getElementById('video');
  this.c1 = document.getElementById('canvas1');
  this.c1.width  = document.body.clientWidth;
  this.c1.height = document.body.clientHeight;
  this.ctx1 = this.c1.getContext('2d');
  let self = this;
  this.video.addEventListener('play', function() {
    self.frameLoopCallback();
  }, false);
};
videoContainer.frameLoopCallback = function () {
  if (!this.video.paused && !this.video.ended) {
    this.drawFrame();
    let self = this;
    setTimeout(function() {
      self.frameLoopCallback();
    }, 0);
  }
};
videoContainer.drawFrame = function () {
  this.ctx1.drawImage(this.video, 0, 0, this.video.clientWidth, this.video.clientHeight,
                                  0, 0, this.c1.width, this.c1.height);
  let frame = this.ctx1.getImageData(0, 0, this.c1.width, this.c1.height);
  let l = frame.data.length;

  for (let i = 0; i < l; i += 4) {

    var r = frame.data[i];
    var g = frame.data[i+1];
    var b = frame.data[i+2];

    if(g > 150){
      frame.data[i + 3] = 0;
    }
  }
  this.ctx1.putImageData(frame, 0, 0);
  return;
};
videoContainer.playMaskedVideo = function (url) {
  var source = document.createElement('source');
  source.setAttribute('src', url);
  this.video.appendChild(source);
  this.video.play();
};

window.addEventListener('load', function() {
  videoContainer.initContainer();
  videoContainer.playMaskedVideo("http://upload.wikimedia.org/wikipedia/commons/7/79/Big_Buck_Bunny_small.ogv");
});



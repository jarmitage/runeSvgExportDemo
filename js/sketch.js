var r = new Rune({
  container: "#sketch",
  width:  800,
  height: 400
})

let style = {
  'sw': 0.5, // strokeWidth
  'lc': 0.01 // strokeWidth for laser cut
}

let bar = {
  'w': 35,
  'h': 150,
  'c': new Rune.Color(0,0,0,0),
  'hole':  {
    'n': 2,
    'r': 3,
    'yOff': 10
  }
}

let frame = {
  'h': 12,
  'bars': 4,
  'c': new Rune.Color(0,0,0,0),
  'x':   100,
  'y':   50,
  'off': 14,
  'hole':  {
    'n': 2,
    'r': 4,
    'yOff': bar.hole.yOff
  }
}

let gBars = r.group(frame.x, frame.y)
let gBarHoles = r.group(frame.x, frame.y)

let gFrame = r.group(frame.x, frame.y)
let gFrameHoles = r.group(frame.x, frame.y)

drawBars = (sw) => {

  let holesp = bar.w / (bar.hole.n + 1);

  // marimba bars
  for (var i = 0; i < frame.bars; i++) {

    let barsp = bar.w*i + frame.off*i;

    r.rect(barsp, 0, bar.w, bar.h, gBars)
      .strokeWidth(sw)
      .fill(bar.c)

    // holes

    for (var h = 0; h < bar.hole.n; h++) {

      let hole = holesp * (h + 1) + barsp;

      r.circle(hole, bar.hole.yOff, bar.hole.r, gBarHoles)
        .strokeWidth(sw)
        .fill(bar.c)

      r.circle(hole, bar.h - bar.hole.yOff, bar.hole.r, gBarHoles)
        .strokeWidth(sw)
        .fill(bar.c)
        
    }

  }

}

drawFrame = (sw) => {

  r.rect( -frame.off, 0,
          frame.bars*bar.w + frame.bars*frame.off + frame.off, 
          frame.hole.yOff * 2, 
          gFrame)
    .strokeWidth(sw)
    .fill(frame.c)

  r.rect( -frame.off, bar.h-frame.hole.yOff*2,
          frame.bars*bar.w + frame.bars*frame.off + frame.off, 
          frame.hole.yOff * 2,
          gFrame)
    .strokeWidth(sw)
    .fill(frame.c)

  // holes

  let holesp = bar.w + frame.off

  for (var i = 0; i < frame.bars + 1; i++) {

    let hole = (holesp*i) - (frame.off/2)

    r.circle(hole, frame.hole.yOff, frame.hole.r, gFrameHoles)
      .strokeWidth(sw)
      .fill(frame.c)

    r.circle(hole, bar.h-frame.hole.yOff, frame.hole.r, gFrameHoles)
      .strokeWidth(sw)
      .fill(frame.c)
    
  }

}

gScale = (scale) => {
  gBars.scale(scale)
  gBarHoles.scale(scale)
  gFrame.scale(scale)
  gFrameHoles.scale(scale)
}

scalePpi = (ppi) => gScale (ppi / 25.4)

// editing
drawFrame(style.sw)
drawBars(style.sw)
gScale(2)

// cutting
// drawFrame(style.lc)
// drawBars(style.lc)
// scalePpi(72)

r.draw()

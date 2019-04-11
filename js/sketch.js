var r = new Rune({
  container: "#sketch",
  width:  900,
  height: 400
})

let bar = {
  'w': 20,
  'h': 100,
  'c': new Rune.Color(255,255,255)
}

let bed = {
  'bars': 8,
  'spacing': 7
}

let ins = {
  'x': 50,
  'y': 50,
  'off': 10
}

let bedGroup = r.group(ins.x, ins.y)

r.rect( -ins.off, 
        -ins.off, bed.bars*bar.w + bed.bars*bed.spacing + ins.off, 
        bar.h + ins.off*2, 
        bedGroup
  )
  .fill(bar.c)

for (var i = 0; i < bed.bars; i++) {
  r.rect((bar.w*i) + (bed.spacing*i), 0, bar.w, bar.h, bedGroup)
    .strokeWidth(0.5)
    .fill(bar.c)
}

bedGroup.scale(2.5)

r.draw()

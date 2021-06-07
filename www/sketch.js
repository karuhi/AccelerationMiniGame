// 現在の座標
let accX = 0,
  accY = 0,
  accZ = 0;

let rectCurrentPos = { x: 0, y: 0 };

// 色一覧
let COLOR = {
  Green: [27, 81, 45],
  Blue: [34, 124, 157],
  Yellow: [221, 164, 72],
  Red: [187, 52, 47],
  White: [197, 203, 211],
};
let colorName = ["みどり", "あお", "きいろ", "あか", "しろ"];

// 0:問題出題
// 1:ゲーム開始
let currentPage = 0;

// 背景画像をシャッフルするフラグ
let flag_0 = true;
let flag_1 = true;
let flag_2 = true;

// 最初のカウントダウン
let counts_0 = 150; //300
// ゲーム終了までのカウントダウン
let counts_1 = 300; //300

// 0: 緑,1: 青,2: 黄,3: 赤
let targetNum = 0;
let preBgColor = 0;

let isCorrect = false;

// 半分の幅・高さ
let halfWidth = 0,
  halfHeight = 0;

let rectSize = 50,
  topPer = 30;

let fps = 30;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(fps);
}

function draw() {
  halfWidth = width / 2;
  halfHeight = height / 2;
  background(255, 255, 255);
  noStroke();
  fill(0, 0, 0);
  if (currentPage === 0) {
    let currentCount = Math.round(counts_0 / fps);
    if (flag_2) {
      preBgColor = Math.floor(Math.random() * 4);
      flag_2 = !flag_2;
    }
    fill(COLOR[Object.keys(COLOR)[preBgColor]]);
    rect(0, 0, width, height);
    fill(255, 255, 255);
    // text(`x=${currentCount}`, 10, height - 50);
    if (currentCount < 4) {
      textSize(40);
      textAlign(CENTER);
      if (currentCount == 0) {
        text(`スタート！`, width / 2, height / 2);
      } else text(`${currentCount}`, width / 2, height / 2);
      textSize(12);
      textAlign(LEFT);
    } else {
      if (flag_1) {
        targetNum = Math.floor(Math.random() * 4);
        flag_1 = false;
      }

      textSize(40);
      textAlign(CENTER);
      text(`${colorName[targetNum]}を目指せ！`, width / 2, height / 2);
      textSize(12);
      textAlign(LEFT);
    }
    if (currentCount < 0) {
      currentPage = 1;
    }
    counts_0--;
  } else if (currentPage === 1) {
    draw4Background();

    isCorrect = false;
    if (rectCurrentPos.y < halfHeight) {
      if (rectCurrentPos.x < halfWidth) {
        if (defaultArray[0] == targetNum) {
          console.log("左上あたり");
          isCorrect = true;
        }
      } else {
        if (defaultArray[1] == targetNum) {
          console.log("右上あたり");
          isCorrect = true;
        }
      }
    } else {
      if (rectCurrentPos.x < halfWidth) {
        if (defaultArray[2] == targetNum) {
          console.log("左下あたり");
          isCorrect = true;
        }
      } else {
        if (defaultArray[3] == targetNum) {
          console.log("右下あたり");
          isCorrect = true;
        }
      }
    }
    let currentCount = Math.round(counts_1 / fps);
    fill(COLOR.White);
    textSize(40);
    textAlign(CENTER);
    textStyle(BOLD);
    text(`あと${currentCount}秒`, halfWidth, 80);
    textSize(12);
    textStyle(NORMAL);
    textAlign(LEFT);
    fill(COLOR.White);
    stroke(COLOR[Object.keys(COLOR)[preBgColor]]);
    strokeWeight(4);
    circle(rectCurrentPos.x, rectCurrentPos.y, rectSize);
    strokeWeight(0);
    // rect(rectCurrentPos.x, rectCurrentPos.y, rectSize, rectSize);

    if (currentCount < 1) {
      if (isCorrect) {
        rect(0, 0, width, height);
        textSize(40);
        textAlign(CENTER);
        fill(0, 0, 0);
        text(`せいかい！！！`, width / 2, height / 2);
        textSize(12);
        textAlign(LEFT);
      } else {
        rect(0, 0, width, height);
        textSize(40);
        textAlign(CENTER);
        fill(0, 0, 0);
        text(`まちがい`, width / 2, height / 2);
        textSize(12);
        textAlign(LEFT);
      }
    } else {
      // rectMode(CENTER);
      navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
      rectCurrentPos.x = halfWidth + accX * topPer;
      rectCurrentPos.y = halfHeight + accY * topPer;
      counts_1--;
    }
  }

  fill(0, 0, 0);
  // text(`----------`, 10, 10);
  // text(`x=${accX.toPrecision(4)}`, 10, 30);
  // text(`y=${accY.toPrecision(4)}`, 10, 50);
  // text(`z=${accZ.toPrecision(4)}`, 10, 70);
  // text(`----------`, 10, 90);
  // text(`x=${rectCurrentPos.x}`, 10, 110);
  // text(`y=${rectCurrentPos.y}`, 10, 130);
  // text(`----------`, 10, 150);
  // text(`x=${halfWidth}`, 10, 170);
  // text(`y=${halfHeight}`, 10, 190);
}

let defaultArray = [0, 1, 2, 3];

function suffullArray(array) {
  for (i = array.length; 1 < i; i--) {
    k = Math.floor(Math.random() * i);
    [array[k], array[i - 1]] = [array[i - 1], array[k]];
  }
  return array;
}

function draw4Background() {
  rectMode(CORNER);
  if (flag_0) {
    defaultArray = suffullArray(defaultArray);
    console.log(defaultArray);
    flag_0 = false;
  }
  // 左上
  // console.log(COLOR[Object.keys(COLOR)[Math.floor(Math.random() * 4)]]);
  fill(COLOR[Object.keys(COLOR)[defaultArray[0]]]);
  rect(0, 0, halfWidth, halfHeight);
  // 右上
  fill(COLOR[Object.keys(COLOR)[defaultArray[1]]]);
  rect(halfWidth, 0, halfWidth, halfHeight);
  // 左下
  fill(COLOR[Object.keys(COLOR)[defaultArray[2]]]);
  rect(0, halfHeight, halfWidth, halfHeight);
  // 左上
  fill(COLOR[Object.keys(COLOR)[defaultArray[3]]]);
  rect(halfWidth, halfHeight, halfWidth, halfHeight);
}

function onSuccess(acceleration) {
  accX = acceleration.x;
  accY = acceleration.y;
  accZ = acceleration.z;
}

function onError() {
  console.log("Error!");
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    accX--;
  } else if (keyCode === RIGHT_ARROW) {
    accX++;
  } else if (keyCode === UP_ARROW) {
    accY--;
  } else if (keyCode === DOWN_ARROW) {
    accY++;
  }
}

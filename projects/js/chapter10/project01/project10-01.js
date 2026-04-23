"use strict";
/*    JavaScript 7th Edition
      Chapter 10
      Project 10-01

      Project to create a drag and drop jigsaw puzzle
      Author: 
      Date:   

      Filename: project10-01.js
*/

// Reference to the puzzle board
let puzzleBoard = document.getElementById("puzzleBoard");
// Counter for the zIndex style of each puzzle piece
let zCounter = 1;
// Array of integers from 1 to 48
let intList = new Array(48);
// pointerX and pointerY will contain the initial coordinates of the pointer
// pieceX and pieceY will contain the initial coordinates of a puzzle piece
let pointerX, pointerY, pieceX, pieceY;

// Sort the integers from 1 to 48 in random order
for (let i = 0; i < 48; i++) {
   intList[i] = i + 1;
}
intList.sort(function() {
   return 0.5 - Math.random();
});

// Generate randomly-sorted puzzle pieces
for (let i = 0; i < 48; i++) {
   let piece = document.createElement("img");
   piece.src = "piece" + intList[i] + ".png";
   piece.style.position = "absolute";
   let rowNum = Math.ceil((i + 1) / 8);
   let colNum = (i + 1) - (rowNum - 1) * 8;
   piece.style.top = (rowNum - 1) * 98 + 7 + "px";
   piece.style.left = (colNum - 1) * 98 + 7 + "px";
   piece.draggable = false; // override the default draggability of images
   puzzleBoard.appendChild(piece);
}

// Node list representing the puzzle pieces
let pieces = document.querySelectorAll("div#puzzleBoard img");

// Add pointerdown listener to each puzzle piece
for (let i = 0; i < pieces.length; i++) {
   pieces[i].addEventListener("pointerdown", grabPiece);
}

function grabPiece(e) {
   // Bring this piece to the front
   e.target.style.zIndex = zCounter++;
   // Record where the pointer started
   pointerX = e.clientX;
   pointerY = e.clientY;
   // Record where the piece started
   pieceX = parseInt(e.target.style.left);
   pieceY = parseInt(e.target.style.top);

   // Add move and release listeners
   e.target.setPointerCapture(e.pointerId);
   e.target.addEventListener("pointermove", movePiece);
   e.target.addEventListener("pointerup", dropPiece);
}

function movePiece(e) {
   // Calculate how far the pointer has moved
   let dx = e.clientX - pointerX;
   let dy = e.clientY - pointerY;
   // Move the piece by that amount
   e.target.style.left = pieceX + dx + "px";
   e.target.style.top  = pieceY + dy + "px";
}

function dropPiece(e) {
   // Remove the move and release listeners when dropped
   e.target.removeEventListener("pointermove", movePiece);
   e.target.removeEventListener("pointerup", dropPiece);
}
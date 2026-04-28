"use strict";

/*  JavaScript 7th Edition
    Chapter 12
    Chapter case

    Bonsai Expressions FAQ 
    Author: 
    Date:   

    Filename: js12.js
*/

//run when page is ready 
$( ()=> {
    //animante h1 
    $("section > h1").css({
        fontSize:0,
        opacity:0
    })
    .animate({
        fontSize:"2.3em",
        opacity: 1
    }, 600);

    //reveal queations when page opens 
    $("dl#faq")
    .hide()
    .effect("clip", {
        mode: "show",
        dircection: "horizontal"
    }, 600);
//add click evnts to each question in the FAQ
$("dl#faq dt").click( e => {
        //alternate between hdiing and showing answers 
        let question = $(e.target);
        let answer = $(question.next());
        $(question).toggleClass("hiddenAnswer");

        if($(question).hasClass("hiddenAnswer")){
            $(answer).slideUp(600);
        }
        else{
            $(answer).slideDown(600);
        }
    });

});

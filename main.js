img = "";
status = "";
objects = [];
alarm = "";

function preload(){
    alarm = loadSound("alert.mp3");
}

function setup(){
    canvas = createCanvas(380,380);
    canvas.position(450, 180);
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting object";
}
function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(video, 0,0, 380, 380);
    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for(i = 0; i< objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("baby_found").innerHTML = "Baby Found";
            alarm.stop();
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 10, objects[i].y + 15);
            noFill();
            stroke(r, g, b);           
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
                    }
                
    } 
    if(status == ""){
        alarm.play();
        document.getElementById("baby_found").innerHTML = "Baby not found";
    }
}
Status = "";
bottle_image = "";
objects=[];

function preload()
{
    bottle_image = loadImage('bottles.jpg');
}

function setup()
{
    canvas = createCanvas(400,640);
    canvas.center();
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    object_Detector.detect(bottle_image,gotResults);
}


function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(bottle_image,0,0,400,640);
    if(Status != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill("#fc0303");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x, objects[i].y);
            noFill();
            stroke("#fc0303");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            document.getElementById("status").innerHTML = 'There are 3 big objects but cocossd detects only ' + objects.length + ' objects in this image';
        }
    }
}
Status = "";
fruit_image = "";
objects = [];

function preload()
{
    fruit_image = loadImage('sofa.jpg');
}

function setup()
{
    canvas = createCanvas(640,350);
    canvas.center();
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    object_Detector.detect(fruit_image,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
    draw()
}

function draw()
{
    image(fruit_image,0,0,640,350);
    if(Status != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill("#fc0303");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x, objects[i].y);
            noFill();
            stroke("#fc0303");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            document.getElementById("status").innerHTML = 'There are 2 big objects in this image but cocossd detects only  ' + objects.length + ' object in this image';
        }
    }
}
